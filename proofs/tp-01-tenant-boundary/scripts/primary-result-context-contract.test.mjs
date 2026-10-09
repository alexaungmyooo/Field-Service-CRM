import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  assertPrimaryResultContext,
  minimizePrimaryResultContextFailure,
  primaryResultContextMarkers,
} from "./primary-result-context-contract.mjs";

const scriptsDirectory = dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(
  readFileSync(resolve(scriptsDirectory, "../test/case-manifest.json"), "utf8"),
);
const organizationIds = {
  "org-alpha": "00000000-0000-4000-8000-000000000001",
  "org-bravo": "00000000-0000-4000-8000-000000000002",
  "org-charlie": "00000000-0000-4000-8000-000000000003",
  "org-suspended": "00000000-0000-4000-8000-000000000004",
};

const ordinaryExpected = manifest.cases.find((item) => item.id === "TP1-C001");
const ordinaryRecord = {
  caseId: ordinaryExpected.id,
  authoritativeContext: {
    organizationId: organizationIds[ordinaryExpected.sourceOrganization],
    authoritySource: "MEMBERSHIP",
    purpose: "SYNTHETIC_PROOF",
    correlationId: "00000000-0000-4000-8000-000000000101",
  },
  cleanupReset: primaryResultContextMarkers.ordinaryCleanupReset,
};

assert.equal(
  assertPrimaryResultContext(ordinaryExpected, ordinaryRecord).cleanupReset,
  primaryResultContextMarkers.ordinaryCleanupReset,
);

const deniedExpected = manifest.cases.find((item) => item.id === "TP1-C073");
assert.deepEqual(
  assertPrimaryResultContext(deniedExpected, {
    caseId: deniedExpected.id,
    authoritativeContext: { resolutionDenied: "requested organization is missing or invalid" },
    cleanupReset: primaryResultContextMarkers.ordinaryCleanupReset,
  }).authoritativeContext,
  { resolutionDenied: "requested organization is missing or invalid" },
);

for (const expected of manifest.cases.filter((item) => item.group === "TP1-CASE-008")) {
  const record = {
    caseId: expected.id,
    organizationSequence: expected.organizationSequence,
    authoritativeContext: {
      source: organizationIds[expected.organizationSequence[0]],
      concurrent: organizationIds[expected.organizationSequence[1]],
      restored: organizationIds[expected.organizationSequence[2]],
    },
    cleanupReset: primaryResultContextMarkers.poolCleanupReset,
  };
  assert.equal(
    assertPrimaryResultContext(expected, record).cleanupReset,
    primaryResultContextMarkers.poolCleanupReset,
  );
}

function expectFailure(expected, record, semanticCheck) {
  assert.throws(
    () => assertPrimaryResultContext(expected, record),
    (error) => {
      assert.equal(error.code, "TP1_PRIMARY_RESULT_CONTEXT_INVALID");
      assert.equal(error.caseId, expected.id);
      assert.equal(error.semanticCheck, semanticCheck);
      assert.deepEqual(minimizePrimaryResultContextFailure(error), {
        errorCode: "TP1_PRIMARY_RESULT_CONTEXT_INVALID",
        caseId: expected.id,
        semanticCheck,
      });
      assert.equal(JSON.stringify(minimizePrimaryResultContextFailure(error)).includes("00000000"), false);
      return true;
    },
  );
}

const poolExpected = manifest.cases.find((item) => item.id === "TP1-C199");
const poolRecord = {
  caseId: poolExpected.id,
  organizationSequence: poolExpected.organizationSequence,
  authoritativeContext: {
    source: organizationIds[poolExpected.organizationSequence[0]],
    concurrent: organizationIds[poolExpected.organizationSequence[1]],
    restored: organizationIds[poolExpected.organizationSequence[2]],
  },
  cleanupReset: primaryResultContextMarkers.poolCleanupReset,
};

expectFailure(
  poolExpected,
  { ...poolRecord, cleanupReset: primaryResultContextMarkers.ordinaryCleanupReset },
  "POOL_CLEANUP_RESET",
);
expectFailure(
  ordinaryExpected,
  { ...ordinaryRecord, cleanupReset: primaryResultContextMarkers.poolCleanupReset },
  "ORDINARY_CLEANUP_RESET",
);
expectFailure(poolExpected, { ...poolRecord, authoritativeContext: undefined }, "POOL_CONTEXT_KEYS");
expectFailure(
  poolExpected,
  { ...poolRecord, organizationSequence: ["org-alpha", "org-charlie", "org-alpha"] },
  "POOL_ORGANIZATION_SEQUENCE",
);
expectFailure(
  poolExpected,
  {
    ...poolRecord,
    authoritativeContext: { ...poolRecord.authoritativeContext, restored: organizationIds["org-bravo"] },
  },
  "POOL_CONTEXT_VALUES",
);
expectFailure(
  ordinaryExpected,
  { ...ordinaryRecord, organizationSequence: ["org-alpha"] },
  "ORDINARY_ORGANIZATION_SEQUENCE_ABSENT",
);

assert.deepEqual(minimizePrimaryResultContextFailure(new Error("raw sensitive detail")), {
  errorCode: "PRIMARY_RESULT_SEMANTIC_VALIDATION_FAILED",
  caseId: "UNAVAILABLE",
  semanticCheck: "UNAVAILABLE",
});

const verifierSource = readFileSync(resolve(scriptsDirectory, "evidence-verify.mjs"), "utf8");
assert.match(verifierSource, /assertPrimaryResultContext\(expected, record\)/);
assert.match(verifierSource, /cleanupReset:\s*record\.cleanupReset/);
assert.match(verifierSource, /organizationSequence:\s*record\.organizationSequence/);

process.stdout.write("primary-result context contract tests passed\n");
