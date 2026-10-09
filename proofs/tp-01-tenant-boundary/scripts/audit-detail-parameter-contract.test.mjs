import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  assertAuditDetailParameterContract,
  auditInsertColumns,
  auditParameterSlots,
} from "./audit-detail-parameter-contract.mjs";

const read = (path) => readFileSync(path, "utf8");
const sources = {
  auditSource: read("src/audit.ts"),
  schemaSource: read("sql/002_schema.sql"),
  evidenceVerifier: read("scripts/evidence-verify.mjs"),
  proofOracle: read("test/proof.test.ts"),
  rlsSource: read("sql/003_rls.sql"),
  databaseSource: read("src/database.ts"),
  pathExecutor: read("src/path-executor.ts"),
  proofRun: read("scripts/proof-run.mjs"),
  composeSource: read("compose.yaml"),
  caseManifest: read("test/case-manifest.json"),
  typesSource: read("src/types.ts"),
  runtimeContract: read("scripts/runtime-contract.mjs"),
};

assert.deepEqual(auditInsertColumns, [
  "id",
  "organization_id",
  "subject_id",
  "authority_source",
  "action",
  "resource_kind",
  "resource_id",
  "decision",
  "purpose",
  "correlation_id",
  "case_id",
  "details",
]);
assert.deepEqual(
  auditParameterSlots,
  [
    "auditId",
    "context.activeOrganizationId",
    "context.subjectId",
    "context.authoritySource",
    "request.action",
    "request.resourceKind",
    "request.resourceId",
    "decision.outcome",
    "context.purpose",
    "context.correlationId",
    "context.caseId",
    "decision.reason",
  ].map((value, index) => ({ slot: index + 1, value })),
);

const result = assertAuditDetailParameterContract(sources);
assert.deepEqual(result, {
  status: "PASS",
  placeholderCount: 12,
  parameterSlotCount: 12,
  detailsKeys: ["reason", "synthetic"],
  reasonSqlType: "text",
  unchangedArtifactCount: 11,
});

const auditMutation = (before, after) => ({
  ...sources,
  auditSource: sources.auditSource.replace(before, after),
});
assert.throws(
  () => assertAuditDetailParameterContract(auditMutation("$12::text", "$12")),
  /exact typed and minimized SQL contract/,
);
assert.throws(
  () => assertAuditDetailParameterContract(auditMutation("$12::text", "$12::uuid")),
  /exact typed and minimized SQL contract/,
);
assert.throws(
  () => assertAuditDetailParameterContract(auditMutation("$12::text", "${decision.reason}")),
  /must not interpolate executable values/,
);
assert.throws(
  () => assertAuditDetailParameterContract(auditMutation("'synthetic', true", "'synthetic', false")),
  /exact typed and minimized SQL contract/,
);
assert.throws(
  () => assertAuditDetailParameterContract(auditMutation("'synthetic', true", "'synthetic', true, 'extra', $13")),
  /exact typed and minimized SQL contract/,
);
assert.throws(
  () => assertAuditDetailParameterContract(auditMutation("context.caseId,\n          decision.reason", "decision.reason,\n          context.caseId")),
  /12-slot mapping/,
);
assert.throws(
  () => assertAuditDetailParameterContract(auditMutation("$10, $11", "$11, $10")),
  /exact typed and minimized SQL contract/,
);

for (const name of [
  "schemaSource",
  "evidenceVerifier",
  "proofOracle",
  "rlsSource",
  "databaseSource",
  "pathExecutor",
  "proofRun",
  "composeSource",
  "caseManifest",
  "typesSource",
  "runtimeContract",
]) {
  assert.throws(
    () => assertAuditDetailParameterContract({ ...sources, [name]: `${sources[name]}\n# drift` }),
    new RegExp(`${name} changed outside WP-73 scope`),
  );
}

process.stdout.write("WP-73 audit-detail parameter contract tests passed\n");
