import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { assertExecutionAuthorized } from "./execution-authorization.mjs";
import { assertDatabaseConnectionEvidence } from "./database-connection-contract.mjs";
import { assertDeviationEvidence } from "./deviation-contract.mjs";
import { assertImageEvidence } from "./image-verification-contract.mjs";
import {
  assertComposeEvidenceContract,
  expectedComposeSemanticVersion,
} from "./remediation-contract.mjs";
import { assertRuntimeReachabilityEvidence } from "./runtime-reachability-contract.mjs";

const { authorization: executionAuthorization, packageId, evidenceDirectory } =
  assertExecutionAuthorized();
const finalPhase = process.argv.includes("--final");
const manifestBytes = readFileSync("test/case-manifest.json");
const manifest = JSON.parse(manifestBytes.toString("utf8"));
const expectedById = new Map(manifest.cases.map((item) => [item.id, item]));
const hashPattern = /^[a-f0-9]{64}$/;
const uuidPattern = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const evidenceFiles = new Map();

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function scanBoundedSecrets(name, bytes) {
  const text = bytes.toString("utf8");
  const forbidden = [
    /postgresql:\/\/[^\s:@]+:[^\s@]+@/i,
    /TP01_(?:BOOTSTRAP|RUNTIME)_PASSWORD\s*[=:]/i,
    /TP01_DATABASE_URL\s*[=:]/i,
    /"(?:password|secret|accessToken|refreshToken)"\s*:\s*"(?!\*{3}|REDACTED|ABSENT)/i,
  ];
  if (forbidden.some((pattern) => pattern.test(text))) {
    throw new Error(`${name} failed the bounded credential scan`);
  }
}

function readEvidence(name, scan = true) {
  const bytes = readFileSync(resolve(evidenceDirectory, name));
  if (scan) scanBoundedSecrets(name, bytes);
  evidenceFiles.set(name, bytes);
  return bytes;
}

function readJson(name) {
  return JSON.parse(readEvidence(name).toString("utf8"));
}

function readJsonLines(name) {
  const bytes = readEvidence(name);
  const records = bytes.toString("utf8").trim().split("\n").filter(Boolean).map((line) => JSON.parse(line));
  return { bytes, records };
}

function requireHash(value, label) {
  if (!hashPattern.test(value ?? "")) throw new Error(`${label} is not a SHA-256 value`);
}

function verifySnapshot(snapshot, label) {
  const expectedTrackedTables = [
    "tenant.resources",
    "tenant.evidence_metadata",
    "tenant.projection_rows",
    "tenant.background_jobs",
  ];
  if (!Array.isArray(snapshot?.organizations) || snapshot.organizations.length !== 4) {
    throw new Error(`${label} must contain four organization snapshots`);
  }
  const expectedOrganizations = ["org-alpha", "org-bravo", "org-charlie", "org-suspended"];
  if (JSON.stringify(snapshot.organizations.map((item) => item.organizationKey).sort()) !==
      JSON.stringify(expectedOrganizations)) {
    throw new Error(`${label} organization inventory differs`);
  }
  if (
    JSON.stringify(snapshot.trackedTables) !== JSON.stringify(expectedTrackedTables) ||
    JSON.stringify(snapshot.expectedAppendOnlyEvidence) !== JSON.stringify(["security.audit_events"])
  ) throw new Error(`${label} tracked state scope differs`);
  for (const organization of snapshot.organizations) {
    requireHash(organization.sha256, `${label} ${organization.organizationKey}`);
    if (!Number.isInteger(organization.rowCount) || organization.rowCount < 0) {
      throw new Error(`${label} ${organization.organizationKey} has an invalid row count`);
    }
    if (typeof organization.counts !== "object" || organization.counts === null) {
      throw new Error(`${label} ${organization.organizationKey} lacks counts`);
    }
  }
  const aggregate = sha256(Buffer.from(JSON.stringify(snapshot.organizations)));
  if (snapshot.aggregateSha256 !== aggregate) {
    throw new Error(`${label} aggregate hash differs from its organization summaries`);
  }
  return aggregate;
}

function stableResult(record) {
  return {
    caseId: record.caseId,
    expected: record.expected,
    actual: record.actual,
    actor: record.actor,
    sourceOrganization: record.sourceOrganization,
    targetOrganization: record.targetOrganization,
    path: record.path,
    policyTrace: record.policyTrace,
    namedAdapter: { adapter: record.namedAdapter?.adapter, outcome: record.namedAdapter?.outcome },
    authoritativeContext: record.authoritativeContext?.resolutionDenied
      ? { resolutionDenied: record.authoritativeContext.resolutionDenied }
      : {
          organizationId: record.authoritativeContext?.organizationId,
          authoritySource: record.authoritativeContext?.authoritySource,
          purpose: record.authoritativeContext?.purpose,
          correlationPresent: Boolean(record.authoritativeContext?.correlationId),
          source: record.authoritativeContext?.source,
          concurrent: record.authoritativeContext?.concurrent,
          restored: record.authoritativeContext?.restored,
        },
    observationOutcomes: record.observations?.map((value) => ({
      mode: value.mode,
      outcome: value.outcome,
      sequence: value.sequence,
      sameConnection: value.sameConnection,
      concurrent: value.concurrent,
      databaseRole: value.databaseRole,
      databaseRoles: value.databaseRoles,
      mutationBeforeHash: value.mutationBeforeHash,
      mutationAfterHash: value.mutationAfterHash,
    })),
  };
}

function verifyResults(name) {
  const { bytes, records } = readJsonLines(name);
  if (records.length !== 222) throw new Error(`${name} must contain 222 records`);
  if (new Set(records.map((record) => record.caseId)).size !== 222) {
    throw new Error(`${name} contains duplicate or missing case IDs`);
  }
  for (let index = 0; index < manifest.cases.length; index += 1) {
    const expected = manifest.cases[index];
    const record = records[index];
    if (!record || record.caseId !== expected.id) throw new Error(`${name} case order differs`);
    if (
      record.expected !== expected.expected ||
      record.actual !== expected.expected ||
      record.actor !== expected.actor ||
      record.sourceOrganization !== expected.sourceOrganization ||
      record.targetOrganization !== expected.targetOrganization ||
      record.path !== expected.path ||
      JSON.stringify(record.policyTrace) !== JSON.stringify(expected.policyTrace)
    ) throw new Error(`${record.caseId} differs from the frozen manifest`);
    if (!record.namedAdapter?.adapter || !record.namedAdapter?.outcome) {
      throw new Error(`${record.caseId} has no named path-adapter evidence`);
    }
    if (!record.authoritativeContext || !record.cleanupReset) {
      throw new Error(`${record.caseId} lacks context or reset evidence`);
    }
    if (expected.group === "TP1-CASE-008") {
      if (
        record.observations?.length !== 2 ||
        record.observations[0]?.sameConnection !== true ||
        record.observations[1]?.concurrent !== true ||
        record.observations.some(
          (observation) =>
            !Array.isArray(observation.databaseRoles) ||
            observation.databaseRoles.length !== observation.sequence?.length ||
            observation.databaseRoles.some((role) => role !== "tp01_runtime"),
        ) ||
        record.observations.some(
          (observation) =>
            !hashPattern.test(observation.mutationBeforeHash ?? "") ||
            observation.mutationBeforeHash !== observation.mutationAfterHash,
        ) ||
        !uuidPattern.test(record.auditReference ?? "")
      ) throw new Error(`${record.caseId} lacks pool/concurrency/audit evidence`);
    } else {
      const modes = record.observations?.map((value) => value.mode);
      if (JSON.stringify(modes) !== JSON.stringify(manifest.enforcementModes)) {
        throw new Error(`${record.caseId} does not contain all four enforcement modes`);
      }
      for (const observation of record.observations) {
        if (!observation.outcome || !observation.reason || !Array.isArray(observation.returnedSyntheticIds)) {
          throw new Error(`${record.caseId} observation is incomplete`);
        }
        if (observation.mode === "RLS_ONLY") {
          if (
            observation.databaseRole !== "tp01_runtime" ||
            !hashPattern.test(observation.mutationBeforeHash) ||
            !hashPattern.test(observation.mutationAfterHash) ||
            observation.mutationBeforeHash !== observation.mutationAfterHash
          ) throw new Error(`${record.caseId} lacks measured RLS identity/state integrity`);
        }
      }
      const combined = record.observations[2];
      if (combined.databaseRole !== "tp01_runtime" || !uuidPattern.test(combined.auditReference ?? "")) {
        throw new Error(`${record.caseId} lacks measured combined DB/audit evidence`);
      }
      if (expected.contextVariant === "retry-same-correlation" && record.retries?.length !== 2) {
        throw new Error(`${record.caseId} lacks two same-correlation attempts`);
      }
    }
  }
  return { bytes, records };
}

function verifyAudit(name) {
  const { bytes, records } = readJsonLines(name);
  if (records.length !== 222 || new Set(records.map((record) => record.case_id)).size !== 222) {
    throw new Error(`${name} must contain one audit verification per case`);
  }
  for (const record of records) {
    const expected = expectedById.get(record.case_id);
    if (!expected || !uuidPattern.test(record.id ?? "")) {
      throw new Error(`${name} contains an invalid audit reference`);
    }
    const expectedDecision = expected.group === "TP1-CASE-008" ? "ALLOW" : expected.expected;
    if (
      record.decision !== expectedDecision ||
      !record.subject_id ||
      !record.authority_source ||
      !record.action ||
      !record.resource_kind ||
      !record.purpose ||
      !uuidPattern.test(record.correlation_id ?? "") ||
      record.details?.synthetic !== true ||
      typeof record.details?.reason !== "string" ||
      JSON.stringify(Object.keys(record.details).sort()) !== JSON.stringify(["reason", "synthetic"])
    ) throw new Error(`${name} contains incomplete, incorrect, or unminimized audit content`);
  }
  return { bytes, records };
}

function verifyState(name, expectedRun) {
  const state = readJson(name);
  if (
    state.schemaVersion !== 1 ||
    state.proof !== "TP-01" ||
    state.run !== expectedRun ||
    state.status !== "UNCHANGED" ||
    state.unauthorizedMutationDetected !== false ||
    state.before?.aggregateSha256 !== state.after?.aggregateSha256 ||
    state.before?.organizations?.length !== 4 ||
    state.after?.organizations?.length !== 4
  ) throw new Error(`${name} does not prove unchanged per-tenant state`);
  verifySnapshot(state.before, `${name} before`);
  verifySnapshot(state.after, `${name} after`);
  return state;
}

const authorization = readJson("authorization.json");
const environment = readJson("environment.json");
const image = readJson("image.json");
const runtimeReachability = readJson("runtime-reachability.json");
const fixture = readJson("fixture.json");
const databaseSecurity = readJson("database-security.json");
const supplyChain = readJson("supply-chain.json");
const deviations = readJson("deviations.json");
const privateManifest = readEvidence("case-manifest.json");
const inventoryBytes = readFileSync(resolve(
  "../../internal-local/work-packages/TP-01/evidence/materialization/artifact-hashes.json",
));
const expectedTools = {
  node: "v22.23.1",
  pnpm: "11.25.0",
  docker: "29.7.2",
  compose: expectedComposeSemanticVersion,
};

assertComposeEvidenceContract({
  normalizedVersion: environment.tools?.compose,
  rawVersion: environment.rawTools?.compose,
  rawStdout: environment.rawTools?.composeStdout,
  expectedVersion: environment.expectedTools?.compose,
});

if (
  authorization.status !== "ACCEPTED_FOR_EXECUTION" ||
  authorization.packageId !== packageId ||
  authorization.proof !== "TP-01" ||
  environment.packageId !== packageId ||
  environment.runId !== authorization.runId ||
  environment.repository?.revision !== authorization.repositoryRevision ||
  environment.repository?.proofPathClean !== true ||
  JSON.stringify(environment.tools) !== JSON.stringify(expectedTools) ||
  JSON.stringify(environment.expectedTools) !== JSON.stringify(expectedTools) ||
  environment.initialState?.listeners?.["127.0.0.1:43101"] !== "CLOSED" ||
  environment.initialState?.listeners?.["127.0.0.1:55432"] !== "CLOSED" ||
  Object.values(environment.initialState?.docker ?? {}).some((value) => value !== "ABSENT") ||
  environment.initialState?.processes !== "ABSENT" ||
  environment.bindings?.authorizationSha256 !== sha256(evidenceFiles.get("authorization.json")) ||
  environment.bindings?.artifactInventorySha256 !== sha256(inventoryBytes) ||
  environment.bindings?.caseManifestSha256 !== sha256(manifestBytes) ||
  sha256(privateManifest) !== sha256(manifestBytes)
) throw new Error("authorization, environment, inventory, revision, or manifest binding differs");

assertImageEvidence(image, executionAuthorization);
assertRuntimeReachabilityEvidence(runtimeReachability, executionAuthorization, "REPRODUCTION");
assertDatabaseConnectionEvidence(environment.databaseConnection, authorization);
assertDatabaseConnectionEvidence(databaseSecurity.connectionContract, authorization);
if (JSON.stringify(environment.databaseConnection) !== JSON.stringify(databaseSecurity.connectionContract)) {
  throw new Error("preflight and database-security connection contracts differ");
}

const expectedCounts = {
  organizations: 4,
  subjects: 10,
  memberships: 8,
  platformRoles: 1,
  supportGrants: 3,
  machineAuthorities: 2,
  resources: 28,
  evidenceMetadata: 4,
  projectionRows: 28,
  backgroundJobs: 4,
  seedAuditEvents: 3,
};
if (
  fixture.dataClassification !== "SYNTHETIC_ONLY" ||
  fixture.liveOrCustomerDataUsed !== false ||
  Object.entries(expectedCounts).some(([name, count]) => fixture.counts?.[name] !== count) ||
  fixture.state?.organizations?.length !== 4
) throw new Error("fixture evidence is not the deterministic synthetic fixture");
verifySnapshot(fixture.state, "fixture state");
const computedFixtureHash = sha256(Buffer.from(JSON.stringify({ counts: fixture.counts, state: fixture.state })));
if (fixture.fixtureSha256 !== computedFixtureHash) throw new Error("fixture hash differs from fixture evidence");

const role = databaseSecurity.role;
if (
  databaseSecurity.connection?.currentUser !== "tp01_runtime" ||
  databaseSecurity.connection?.sessionUser !== "tp01_runtime" ||
  role?.rolname !== "tp01_runtime" ||
  role.rolsuper !== false ||
  role.rolinherit !== false ||
  role.rolbypassrls !== false ||
  role.rolcreatedb !== false ||
  role.rolcreaterole !== false ||
  role.rolreplication !== false ||
  role.rolcanlogin !== true ||
  databaseSecurity.transactionLocalContext?.organizationId !== "00000000-0000-4000-8000-000000000001" ||
  !Array.isArray(databaseSecurity.tableControls) ||
  !Array.isArray(databaseSecurity.policies) ||
  !Array.isArray(databaseSecurity.securityFunctions)
) throw new Error("database runtime identity or catalog security evidence is incomplete");
const expectedContext = {
  organizationId: "00000000-0000-4000-8000-000000000001",
  subjectId: "10000000-0000-4000-8000-000000000001",
  caseId: "TP1-DATABASE-SECURITY-EVIDENCE",
  authoritySource: "MEMBERSHIP",
  authorityRevision: "1",
  purpose: "SYNTHETIC_PROOF",
  proofClock: "2026-10-07T00:00:00Z",
};
if (Object.entries(expectedContext).some(([name, value]) => databaseSecurity.transactionLocalContext?.[name] !== value)) {
  throw new Error("transaction-local database context evidence differs");
}
if (
  databaseSecurity.schemaOwnership?.length !== 3 ||
  databaseSecurity.schemaOwnership.some((schema) => schema.owner !== "tp01_owner")
) throw new Error("schema ownership evidence differs");
const protectedTables = new Set([
  "platform.organizations",
  "tenant.resources",
  "tenant.evidence_metadata",
  "tenant.projection_rows",
  "tenant.background_jobs",
  "security.audit_events",
]);
const observedTables = new Set(databaseSecurity.tableControls.map(
  (table) => `${table.schema_name}.${table.table_name}`,
));
if ([...protectedTables].some((table) => !observedTables.has(table))) {
  throw new Error("one or more protected tables are absent from database security evidence");
}
for (const table of databaseSecurity.tableControls) {
  const qualified = `${table.schema_name}.${table.table_name}`;
  if (table.owner !== "tp01_owner") throw new Error(`${qualified} has an unexpected owner`);
  if (protectedTables.has(qualified) && (!table.rls_enabled || !table.rls_forced)) {
    throw new Error(`${qualified} does not enforce forced RLS`);
  }
}
for (const sensitiveTable of [
  "security.subjects",
  "security.memberships",
  "security.platform_roles",
  "security.support_grants",
  "security.machine_authorities",
]) {
  const table = databaseSecurity.tableControls.find(
    (item) => `${item.schema_name}.${item.table_name}` === sensitiveTable,
  );
  if (!table || table.can_select || table.can_insert || table.can_update || table.can_delete) {
    throw new Error(`${sensitiveTable} exposes an unexpected runtime grant`);
  }
}
const expectedPolicies = new Set([
  "organizations_authority_policy",
  "resources_tenant_policy",
  "evidence_metadata_tenant_policy",
  "projection_rows_tenant_policy",
  "background_jobs_tenant_policy",
  "audit_events_tenant_policy",
]);
if ([...expectedPolicies].some(
  (policy) => !databaseSecurity.policies.some((item) => item.policyname === policy),
)) throw new Error("one or more expected RLS policies are absent");
const expectedSecurityDefiners = new Set([
  "can_access_tenant",
  "can_discover_organization",
  "can_write_audit",
  "has_tenant_authority",
]);
const securityDefiners = databaseSecurity.securityFunctions.filter(
  (item) => item.security_definer === true,
);
if (
  securityDefiners.length !== expectedSecurityDefiners.size ||
  securityDefiners.some((item) => !expectedSecurityDefiners.has(item.function_name))
) throw new Error("security-definer function inventory differs");
for (const functionRecord of securityDefiners) {
  if (
    functionRecord.owner !== "tp01_owner" ||
    functionRecord.security_definer !== true ||
    !functionRecord.configuration.some((value) => value.startsWith("search_path="))
  ) throw new Error(`${functionRecord.function_name} lacks owner/definer/search_path evidence`);
}
const organizationRowVisibility = databaseSecurity.securityFunctions.find(
  (item) => item.function_name === "organization_row_visible",
);
if (
  !organizationRowVisibility ||
  organizationRowVisibility.owner !== "tp01_owner" ||
  organizationRowVisibility.security_definer !== false ||
  !organizationRowVisibility.configuration.some((value) => value.startsWith("search_path="))
) throw new Error("organization row-visibility function lacks owner/invoker/search_path evidence");

if (typeof supplyChain.files !== "object" || supplyChain.files === null) {
  throw new Error("supply-chain evidence is incomplete");
}
const materializationRoot = resolve(
  "../../internal-local/work-packages/TP-01/evidence/materialization",
);
const expectedSupplyChainFiles = [
  "supply-chain-summary.json",
  "dependency-tree.json",
  "licenses.json",
  "audit.json",
];
if (JSON.stringify(Object.keys(supplyChain.files).sort()) !== JSON.stringify(expectedSupplyChainFiles.sort())) {
  throw new Error("supply-chain binding file inventory differs");
}
for (const [name, metadata] of Object.entries(supplyChain.files)) {
  requireHash(metadata.sha256, `supply-chain ${name}`);
  const sourceBytes = readFileSync(resolve(materializationRoot, name));
  if (metadata.bytes !== sourceBytes.length || metadata.sha256 !== sha256(sourceBytes)) {
    throw new Error(`supply-chain binding differs for ${name}`);
  }
}
assertDeviationEvidence(deviations, {
  requireNoAccepted: true,
  requireNoOperationalStops: true,
});

const primary = verifyResults("primary-results.jsonl");
const reproduction = verifyResults("reproduction-results.jsonl");
const primaryAudit = verifyAudit("primary-audit-events.jsonl");
const reproductionAudit = verifyAudit("reproduction-audit-events.jsonl");
const primaryState = verifyState("primary-state.json", "PRIMARY");
const reproductionState = verifyState("reproduction-state.json", "REPRODUCTION");
if (
  primaryState.before.aggregateSha256 !== fixture.state.aggregateSha256 ||
  reproductionState.before.aggregateSha256 !== fixture.state.aggregateSha256
) throw new Error("proof-run state does not match the deterministic fixture state");

const primaryStable = primary.records.map(stableResult);
const reproductionStable = reproduction.records.map(stableResult);
const differences = primaryStable.flatMap((value, index) =>
  JSON.stringify(value) === JSON.stringify(reproductionStable[index])
    ? []
    : [{ caseId: value.caseId, primary: value, reproduction: reproductionStable[index] }],
);
writeFileSync(
  resolve(evidenceDirectory, "reproduction-difference.json"),
  `${JSON.stringify({ status: differences.length ? "DIFFERENT" : "MATCH", differences }, null, 2)}\n`,
);
readEvidence("reproduction-difference.json");
if (differences.length) throw new Error("primary and reproduction semantic results differ");

const combinedAudit = [
  ...primaryAudit.records.map((record) => ({ run: "PRIMARY", ...record })),
  ...reproductionAudit.records.map((record) => ({ run: "REPRODUCTION", ...record })),
];
writeFileSync(
  resolve(evidenceDirectory, "audit-events.jsonl"),
  `${combinedAudit.map((record) => JSON.stringify(record)).join("\n")}\n`,
);
readEvidence("audit-events.jsonl");

const stateIntegrity = {
  schemaVersion: 1,
  proof: "TP-01",
  status: "PASS",
  fixtureAggregateSha256: fixture.state.aggregateSha256,
  primary: primaryState,
  reproduction: reproductionState,
  unauthorizedMutationDetected: false,
};
writeFileSync(
  resolve(evidenceDirectory, "state-integrity.json"),
  `${JSON.stringify(stateIntegrity, null, 2)}\n`,
);
readEvidence("state-integrity.json");

let status = "RESULTS_VERIFIED_PENDING_CLEANUP_AND_REVIEWS";
let reviews = {};
if (finalPhase) {
  const cleanup = readJson("cleanup.json");
  if (
    cleanup.status !== "PASS" ||
    typeof cleanup.before?.processes !== "string" ||
    !["OPEN", "CLOSED"].includes(cleanup.before?.listeners?.["127.0.0.1:43101"]) ||
    cleanup.before?.listeners?.["127.0.0.1:55432"] !== "OPEN" ||
    !cleanup.before?.docker?.containers ||
    !cleanup.before?.docker?.networks ||
    !cleanup.before?.docker?.volumes ||
    cleanup.before?.generated?.dist !== true ||
    cleanup.before?.generated?.nodeModules !== true ||
    typeof cleanup.before?.credentials?.envFile !== "boolean" ||
    cleanup.after?.processes !== "ABSENT" ||
    cleanup.after?.listeners?.["127.0.0.1:43101"] !== "CLOSED" ||
    cleanup.after?.listeners?.["127.0.0.1:55432"] !== "CLOSED" ||
    Object.values(cleanup.after?.docker ?? {}).some((value) => value !== "ABSENT") ||
    cleanup.after?.credentials?.envFile !== "ABSENT" ||
    Object.values(cleanup.after?.generated ?? {}).some((value) => value !== "REMOVED") ||
    cleanup.tools?.globalMutation !== "NONE_PERFORMED_BY_PROOF_SCRIPTS" ||
    cleanup.providers?.accounts !== "NONE" ||
    cleanup.providers?.recurringCost !== "USD 0"
  ) throw new Error("cleanup evidence is incomplete or reports residual state");

  const requiredReviewFields = [
    "Reviewer identity",
    "Canonical task identity",
    "Review date",
    "Method",
    "Evidence inspected",
    "Findings by severity",
    "Unresolved risks",
    "Recommendation",
    "Limitations",
  ];
  for (const reviewerFile of ["operator-review.md", "independent-validation.md", "security-review.md"]) {
    const bytes = readEvidence(reviewerFile);
    const text = bytes.toString("utf8");
    const fields = Object.fromEntries(requiredReviewFields.map((field) => {
      const escaped = field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const value = text.match(new RegExp(`^${escaped}:\\s*(.+)$`, "im"))?.[1]?.trim();
      if (!value) throw new Error(`${reviewerFile} lacks ${field}`);
      return [field, value];
    }));
    const recommendation = fields.Recommendation.toUpperCase();
    if (!new Set(["PASS", "FAIL", "INCONCLUSIVE"]).has(recommendation)) {
      throw new Error(`${reviewerFile} has an invalid recommendation`);
    }
    if (!/^\d{4}-\d{2}-\d{2}(?:T.*Z)?$/.test(fields["Review date"])) {
      throw new Error(`${reviewerFile} has an invalid review date`);
    }
    reviews[reviewerFile] = { ...fields, Recommendation: recommendation };
  }
  const recommendations = Object.values(reviews).map((review) => review.Recommendation);
  status = recommendations.includes("FAIL")
    ? "FAIL"
    : recommendations.includes("INCONCLUSIVE")
      ? "INCONCLUSIVE"
      : "PASS";
}

const conclusion = [
  "# TP-01 Sanitized Conclusion",
  "",
  `- Verification phase: ${finalPhase ? "FINAL_COMPLETE_PACKET" : "INTERIM_RESULTS"}`,
  `- Status: ${status}`,
  "- Case inventory: 222 primary and 222 independent-reproduction records",
  "- Reproduction: semantic match",
  "- Tenant state: unchanged from deterministic synthetic fixture",
  "- Runtime database role: measured as tp01_runtime; catalog controls retained in private evidence",
  "- Customer/live data: none",
  "- Architecture effect: none; proof evidence cannot select the final architecture",
  "- Limitation: local synthetic evidence does not replace the mandatory qualified human review before production or real/customer data",
  "",
].join("\n");
writeFileSync(resolve(evidenceDirectory, "sanitized-conclusion.md"), conclusion);
readEvidence("sanitized-conclusion.md");

const report = {
  schemaVersion: 2,
  proof: "TP-01",
  packageId,
  phase: finalPhase ? "FINAL_COMPLETE_PACKET" : "INTERIM_RESULTS",
  status,
  skippedCases: 0,
  caseCount: 222,
  reproduction: "SEMANTIC_MATCH",
  unauthorizedMutationDetected: false,
  acceptedContractDeviations: deviations.acceptedContractDeviations.length,
  operationalStops: deviations.operationalStops.length,
  credentialScan: "PASS",
  reviews,
  files: Object.fromEntries(
    [...evidenceFiles.entries()].sort(([left], [right]) => left.localeCompare(right)).map(([name, bytes]) => [
      name,
      { bytes: bytes.length, sha256: sha256(bytes) },
    ]),
  ),
};
writeFileSync(
  resolve(evidenceDirectory, "evidence-verification.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);
process.stdout.write(`${JSON.stringify({ status, phase: report.phase, files: Object.keys(report.files).length })}\n`);
if (finalPhase && status !== "PASS") process.exitCode = 2;
