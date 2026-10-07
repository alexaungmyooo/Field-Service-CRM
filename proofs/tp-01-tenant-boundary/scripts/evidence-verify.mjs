import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { assertExecutionAuthorized } from "./execution-authorization.mjs";

const { evidenceDirectory } = assertExecutionAuthorized();
const manifest = JSON.parse(readFileSync("test/case-manifest.json", "utf8"));
const expectedById = new Map(manifest.cases.map((item) => [item.id, item]));
const hashPattern = /^[a-f0-9]{64}$/;
const uuidPattern = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;

function readJsonLines(name) {
  const bytes = readFileSync(resolve(evidenceDirectory, name));
  const text = bytes.toString("utf8");
  if (/password|secret|token-member|TP01_RUNTIME_PASSWORD/i.test(text)) {
    throw new Error(`${name} failed the bounded secret/identity scan`);
  }
  const records = text.trim().split("\n").filter(Boolean).map((line) => JSON.parse(line));
  return { bytes, records };
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
          ) throw new Error(`${record.caseId} lacks measured RLS state integrity`);
        }
      }
      const combined = record.observations[2];
      if (combined.databaseRole !== "tp01_runtime" || !uuidPattern.test(combined.auditReference ?? "")) {
        throw new Error(`${record.caseId} lacks combined DB/audit evidence`);
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
    ) {
      throw new Error(`${name} contains incomplete, incorrect, or unminimized audit content`);
    }
  }
  return bytes;
}

const primary = verifyResults("primary-results.jsonl");
const reproduction = verifyResults("reproduction-results.jsonl");
const primaryAudit = verifyAudit("primary-audit-events.jsonl");
const reproductionAudit = verifyAudit("reproduction-audit-events.jsonl");
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
if (differences.length) throw new Error("primary and reproduction semantic results differ");

const files = {
  "primary-results.jsonl": primary.bytes,
  "reproduction-results.jsonl": reproduction.bytes,
  "primary-audit-events.jsonl": primaryAudit,
  "reproduction-audit-events.jsonl": reproductionAudit,
};
const report = {
  schemaVersion: 1,
  proof: "TP-01",
  status: "PASS",
  skippedCases: 0,
  caseCount: 222,
  reproduction: "SEMANTIC_MATCH",
  files: Object.fromEntries(
    Object.entries(files).map(([name, bytes]) => [
      name,
      { bytes: bytes.length, sha256: createHash("sha256").update(bytes).digest("hex") },
    ]),
  ),
};
writeFileSync(
  resolve(evidenceDirectory, "evidence-verification.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);
