import { createHash } from "node:crypto";

export const auditInsertColumns = Object.freeze([
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

export const auditParameterSlots = Object.freeze([
  Object.freeze({ slot: 1, value: "auditId" }),
  Object.freeze({ slot: 2, value: "context.activeOrganizationId" }),
  Object.freeze({ slot: 3, value: "context.subjectId" }),
  Object.freeze({ slot: 4, value: "context.authoritySource" }),
  Object.freeze({ slot: 5, value: "request.action" }),
  Object.freeze({ slot: 6, value: "request.resourceKind" }),
  Object.freeze({ slot: 7, value: "request.resourceId" }),
  Object.freeze({ slot: 8, value: "decision.outcome" }),
  Object.freeze({ slot: 9, value: "context.purpose" }),
  Object.freeze({ slot: 10, value: "context.correlationId" }),
  Object.freeze({ slot: 11, value: "context.caseId" }),
  Object.freeze({ slot: 12, value: "decision.reason" }),
]);

const expectedUnchangedSha256 = Object.freeze({
  schemaSource: "8941cb31ca8704f06d9de67913571c3fba5b1d7021efb8c0c78bad9c4f1db4cf",
  evidenceVerifier: "7b8f9987c65e51d7c61c76e63d7b85a4d62e2726dfc81496f8a4980bf18612ef",
  proofOracle: "db80f493c6ee3a767f7ceb3c634c4be8691d03e9889608c420a16f0c0dac4000",
  rlsSource: "d2bc5e0498079900854196af3a775c326428c9cf61abd4918f7abe8c2155f642",
  databaseSource: "9c50fd54740bcfc6c5f16653bc3e77e72d9d8fa41da4e4054037820723b662bf",
  pathExecutor: "e82684f5e45404e6acc7c22666814f8a72ddba098f847a1c0d43cd77f574f845",
  proofRun: "724b29ce6f294795a6ac7b82fcde925d28406db98c625ad7ab2c3b3f2a7d3d31",
  composeSource: "e35dd7d5302c064b365c3030ad02fb8c44e456bbb421ec6d9dd130ebabb01cae",
  caseManifest: "de4e412a27f35bc96a3858174bcf186ae02f84c08a0e94b28771e3db78a2665f",
  typesSource: "de8443b93a17a144db2d6549fa48f2720e41ca2b513a0d91b9a018447912a277",
  runtimeContract: "b2bc0284616389e112f22197b2c7a699a322bab6d29d0950dd39108b661555ff",
});

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function normalizedSql(value) {
  return value.replace(/\s+/g, " ").trim();
}

function recordMethodSource(auditSource) {
  const start = auditSource.indexOf("  async record(");
  const end = auditSource.indexOf("\n  async readSanitized(", start);
  if (start === -1 || end === -1) throw new Error("audit record method is absent or incomplete");
  return auditSource.slice(start, end);
}

function auditInsertContract(recordSource) {
  const match = recordSource.match(/client\.query\(\s*`([\s\S]*?)`\s*,\s*\[([\s\S]*?)\]\s*,?\s*\)/);
  if (!match) throw new Error("audit insert query and parameter array are not statically bound");
  return { query: match[1], parameterArray: match[2] };
}

function assertExactQuery(query) {
  if (query.includes("${")) throw new Error("audit insert must not interpolate executable values");
  const expected = normalizedSql(`
    INSERT INTO security.audit_events (
      id, organization_id, subject_id, authority_source, action,
      resource_kind, resource_id, decision, purpose, correlation_id, case_id, details
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
      jsonb_build_object('reason', $12::text, 'synthetic', true)
    )
  `);
  if (normalizedSql(query) !== expected) {
    throw new Error("audit insert differs from the exact typed and minimized SQL contract");
  }
  const placeholders = query.match(/\$\d+/g) ?? [];
  const expectedPlaceholders = auditParameterSlots.map(({ slot }) => `$${slot}`);
  if (JSON.stringify(placeholders) !== JSON.stringify(expectedPlaceholders)) {
    throw new Error("audit insert placeholder order differs from the 12-slot contract");
  }
}

function assertExactParameterArray(parameterArray) {
  const actual = parameterArray
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const expected = auditParameterSlots.map(({ value }) => value);
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error("audit insert value order differs from the 12-slot mapping");
  }
}

export function assertAuditDetailParameterContract(sources) {
  if (!sources || typeof sources !== "object") throw new Error("proof sources are required");
  for (const name of ["auditSource", ...Object.keys(expectedUnchangedSha256)]) {
    if (typeof sources[name] !== "string" || sources[name].length === 0) {
      throw new Error(`${name} source is absent`);
    }
  }

  const recordSource = recordMethodSource(sources.auditSource);
  const { query, parameterArray } = auditInsertContract(recordSource);
  assertExactQuery(query);
  assertExactParameterArray(parameterArray);

  for (const [name, expected] of Object.entries(expectedUnchangedSha256)) {
    if (sha256(sources[name]) !== expected) throw new Error(`${name} changed outside WP-73 scope`);
  }

  return Object.freeze({
    status: "PASS",
    placeholderCount: 12,
    parameterSlotCount: auditParameterSlots.length,
    detailsKeys: Object.freeze(["reason", "synthetic"]),
    reasonSqlType: "text",
    unchangedArtifactCount: Object.keys(expectedUnchangedSha256).length,
  });
}
