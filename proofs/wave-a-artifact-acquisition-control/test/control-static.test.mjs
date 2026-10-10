import assert from "node:assert/strict";
import test from "node:test";
import {
  canonicalJson,
  commandIsAllowed,
  computeEntryHash,
  consumedAuthorization,
  modeMatches,
  sha256Text,
  sourceTextIsNetworkSafe,
  validateAuthorization,
  validateCleanupTargets,
  validateInvocationBinding,
  validateSafeRelativePath,
  verifyLedgerText,
} from "../tool/control-launcher.mjs";
import { validateArtifactManifest } from "../tool/verify-bundle.mjs";

const authorityHash = "a".repeat(64);
const root = "/repo";
const baseAuth = {
  schema: "wave-a-acquisition-effective-authorization-v2",
  runId: "wp109-2026-10-10-01",
  checkpoint: "WP-109_ACQUISITION_CONTROL_CONTRACT_REMEDIATION",
  state: "EFFECTIVE",
  singleUse: true,
  consumed: false,
  ownerAuthorizationSha256: "b".repeat(64),
  publishedRevision: "f17ba0474d3a40f7f46aab05226b67f720f0d574",
  repositoryTree: "41b8cb5ae1e9b3a84ae579f27de851b7c63b7d4c",
  operator: "/root",
  validFrom: "2026-10-10T09:00:00.000Z",
  expiresAt: "2026-10-10T11:00:00.000Z",
  allowedPublicRoot: "proofs/wave-a-artifact-acquisition-control/",
  allowedPrivateRoot: "internal-local/work-packages/WP-109/",
  expectedAuthorizationPath: "internal-local/work-packages/WP-109/authorization.json",
  expectedLedgerPath: "internal-local/work-packages/WP-109/operation-ledger.ndjson",
  expectedInventoryPath: "internal-local/work-packages/WP-109/primary-inventory.sha256",
  expectedFinalInventoryPath: "internal-local/work-packages/WP-109/final-inventory.json",
  allowedStages: ["STATIC_BUNDLE_SELF_TEST", "STATIC_TESTS", "STATIC_CONTROL_VERIFY", "PRIMARY_SEAL"],
  authorizedPublicPaths: Array.from({ length: 12 }, (_, index) => `path-${index}`),
  nodeBinding: { path: "/exact/node", version: "v1.2.3", sha256: "0".repeat(64) },
  allowedCommands: [
    { stage: "STATIC_TESTS", executable: "/exact/node", arguments: ["--test", "/exact/test.mjs"] },
  ],
  actionFlags: {
    staticRemediation: true,
    runDependencyFreeStaticChecks: true,
    sealInventory: true,
    createFreshValidator: true,
    network: false,
    download: false,
    artifactAcquisition: false,
    sdkOrCacheMutation: false,
    dependencyRestore: false,
    waveAProofMaterialization: false,
    build: false,
    device: false,
    runtime: false,
    proofExecution: false,
    applicationCoding: false,
    architectureSelection: false,
    infrastructure: false,
    deployment: false,
    providerOrCost: false,
    customerOrLiveData: false,
    commitOrPush: false,
  },
};

function ledgerEntry(payload) {
  return { ...payload, entryHash: computeEntryHash(payload) };
}

test("canonical JSON sorts object keys", () => {
  assert.equal(canonicalJson({ z: 1, a: 2 }), '{"a":2,"z":1}');
});

test("SHA-256 is deterministic", () => {
  assert.equal(sha256Text("wp109"), sha256Text("wp109"));
  assert.equal(sha256Text("wp109").length, 64);
});

test("safe relative paths reject traversal and absolutes", () => {
  assert.equal(validateSafeRelativePath("schemas/test.json"), "schemas/test.json");
  assert.throws(() => validateSafeRelativePath("../secret"), /UNSAFE_PATH/);
  assert.throws(() => validateSafeRelativePath("/absolute"), /UNSAFE_PATH/);
});

test("mode checks are exact", () => {
  assert.equal(modeMatches(0o100600, 0o600), true);
  assert.equal(modeMatches(0o100644, 0o600), false);
});

test("cleanup targets remain below the authorized root", () => {
  assert.equal(validateCleanupTargets(["/proof/tmp/a", "/proof/tmp/b"], "/proof/tmp"), true);
  assert.throws(() => validateCleanupTargets(["/proof/other"], "/proof/tmp"), /CLEANUP_PATH/);
  assert.throws(() => validateCleanupTargets(["/proof/tmp"], "/proof/tmp"), /CLEANUP_PATH/);
});

test("network-capable imports and calls fail static policy", () => {
  assert.equal(sourceTextIsNetworkSafe('import { readFileSync } from "node:fs";'), true);
  assert.equal(sourceTextIsNetworkSafe(`import transport from "${"node:" + "https"}";`), false);
  assert.equal(sourceTextIsNetworkSafe(`${"fet" + "ch"}("invalid")`), false);
});

test("effective authorization accepts its exact time window", () => {
  assert.equal(
    validateAuthorization(baseAuth, {
      now: new Date("2026-10-10T10:00:00.000Z"),
      requiredFlag: "runDependencyFreeStaticChecks",
    }),
    true,
  );
  assert.throws(
    () => validateAuthorization(baseAuth, { now: new Date("2026-10-10T12:00:00.000Z") }),
    /AUTH_TIME/,
  );
});

test("consumed authority fails every executable validation", () => {
  const consumed = consumedAuthorization(baseAuth, authorityHash, "c".repeat(64), "2026-10-10T10:01:00.000Z");
  assert.throws(() => validateAuthorization(consumed), /AUTH_CONSUMED/);
  assert.equal(validateAuthorization(consumed, { allowConsumed: true }), true);
});

test("closed authority flags fail closed", () => {
  const changed = structuredClone(baseAuth);
  changed.actionFlags.network = true;
  assert.throws(() => validateAuthorization(changed), /AUTH_CLOSED_FLAG:network/);
});

test("the exact four-stage set is mandatory", () => {
  const changed = structuredClone(baseAuth);
  changed.allowedStages.push("ARBITRARY_STAGE");
  assert.throws(() => validateAuthorization(changed), /AUTH_STAGES/);
});

test("command allowlist binds stage, executable and exact arguments", () => {
  assert.equal(commandIsAllowed(baseAuth, "STATIC_TESTS", "/exact/node", ["--test", "/exact/test.mjs"]), true);
  assert.equal(commandIsAllowed(baseAuth, "STATIC_CONTROL_VERIFY", "/exact/node", ["--test", "/exact/test.mjs"]), false);
  assert.equal(commandIsAllowed(baseAuth, "STATIC_TESTS", "/exact/node", ["--test"]), false);
});

test("launcher binds authorization and ledger to exact accepted paths", () => {
  assert.equal(
    validateInvocationBinding(
      {
        authorizationPath: "/repo/internal-local/work-packages/WP-109/authorization.json",
        ledgerPath: "/repo/internal-local/work-packages/WP-109/operation-ledger.ndjson",
        stage: "STATIC_TESTS",
      },
      baseAuth,
      root,
    ),
    true,
  );
  assert.throws(
    () =>
      validateInvocationBinding(
        {
          authorizationPath: "/repo/other.json",
          ledgerPath: "/repo/internal-local/work-packages/WP-109/operation-ledger.ndjson",
          stage: "STATIC_TESTS",
        },
        baseAuth,
        root,
      ),
    /LAUNCHER_AUTH_PATH/,
  );
});

test("launcher rejects an unauthorized stage", () => {
  assert.throws(
    () =>
      validateInvocationBinding(
        {
          authorizationPath: "/repo/internal-local/work-packages/WP-109/authorization.json",
          ledgerPath: "/repo/internal-local/work-packages/WP-109/operation-ledger.ndjson",
          stage: "DOWNLOAD",
        },
        baseAuth,
        root,
      ),
    /LAUNCHER_STAGE/,
  );
});

test("ledger binds its first link and every entry to effective authority", () => {
  const first = ledgerEntry({
    authorityHash,
    event: "AUTHORIZATION_BOUND",
    pathMutations: [],
    previousHash: authorityHash,
    runId: "wp109-test",
    sequence: 0,
    stage: "BOOTSTRAP",
    timestamp: "2026-10-10T00:00:00.000Z",
  });
  const second = ledgerEntry({
    authorityHash,
    event: "PATH_MUTATION",
    pathMutations: [
      {
        path: "README.md",
        operation: "UPDATED",
        beforeSha256: "b".repeat(64),
        afterSha256: "c".repeat(64),
        authorityClass: "PUBLIC_CONTROL",
      },
    ],
    previousHash: first.entryHash,
    runId: first.runId,
    sequence: 1,
    stage: "SOURCE_MATERIALIZATION",
    timestamp: "2026-10-10T00:00:01.000Z",
  });
  assert.equal(
    verifyLedgerText(`${canonicalJson(first)}\n${canonicalJson(second)}\n`, {
      authorityHash,
      runId: "wp109-test",
    }).length,
    2,
  );
  assert.throws(
    () => verifyLedgerText(`${canonicalJson(first)}\n`, { authorityHash: "d".repeat(64) }),
    /LEDGER_AUTHORITY_HASH|LEDGER_CHAIN/,
  );
});

test("ledger requires explicit resulting-path mutations", () => {
  const invalidPayload = {
    authorityHash,
    event: "AUTHORIZATION_BOUND",
    previousHash: authorityHash,
    runId: "wp109-test",
    sequence: 0,
    stage: "BOOTSTRAP",
    timestamp: "2026-10-10T00:00:00.000Z",
  };
  const invalid = ledgerEntry(invalidPayload);
  assert.throws(
    () => verifyLedgerText(`${canonicalJson(invalid)}\n`, { authorityHash }),
    /LEDGER_MUTATIONS_REQUIRED/,
  );
});

test("single-use consumption binds the effective hash and seal entry", () => {
  const consumed = consumedAuthorization(baseAuth, authorityHash, "c".repeat(64), "2026-10-10T10:01:00.000Z");
  assert.equal(consumed.state, "CONSUMED");
  assert.equal(consumed.consumed, true);
  assert.equal(consumed.effectiveAuthorizationSha256, authorityHash);
  assert.equal(consumed.consumptionLedgerEntryHash, "c".repeat(64));
});

test("synthetic artifact manifest passes without acquired artifacts", () => {
  const manifest = {
    schema: "wave-a-offline-artifact-manifest-v1",
    bundleId: "synthetic",
    classification: "PROOF_ONLY_NOT_APPLICATION_DEPENDENCIES",
    artifacts: [
      {
        id: "fixture",
        version: "0-test",
        source: "synthetic://fixture",
        sha256: "0".repeat(64),
        size: 1,
        class: "SOURCE_REVIEW_ONLY",
        license: "SYNTHETIC",
      },
    ],
  };
  assert.equal(validateArtifactManifest(manifest), true);
});

test("duplicate artifact identity fails", () => {
  const artifact = {
    id: "fixture",
    version: "0-test",
    source: "synthetic://fixture",
    sha256: "0".repeat(64),
    size: 1,
    class: "SOURCE_REVIEW_ONLY",
    license: "SYNTHETIC",
  };
  assert.throws(
    () =>
      validateArtifactManifest({
        schema: "wave-a-offline-artifact-manifest-v1",
        bundleId: "synthetic",
        classification: "PROOF_ONLY_NOT_APPLICATION_DEPENDENCIES",
        artifacts: [artifact, artifact],
      }),
    /MANIFEST_DUPLICATE/,
  );
});
