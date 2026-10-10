import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import {
  assertReproductionContextAuthorizationBinding,
  assertReproductionContextAttestation,
  assertReproductionContextReceipt,
  reproductionContextAttestationArtifacts,
  reproductionContextReceiptArtifacts,
  reproductionContextStages,
} from "./reproduction-context-contract.mjs";

const context = {
  packageId: "WP-99", runId: "wp99-static-test-01",
  validatorIdentity: "/root/wp99_reproduction_validator", validatorProcessUid: 501,
  dockerExecutablePath: "/usr/local/bin/docker", dockerExecutableSha256: "b".repeat(64),
  stage: "PRE_PRIMARY", observedAt: "2026-10-10T00:05:00.000Z",
};
const authorization = {
  roles: { reproductionValidator: context.validatorIdentity },
  reproductionValidatorHostAccess: {
    validatorIdentity: context.validatorIdentity,
    validatorProcessUid: context.validatorProcessUid,
    dockerExecutablePath: context.dockerExecutablePath,
    dockerExecutableSha256: context.dockerExecutableSha256,
    maxAgeMinutes: 15,
    dockerContext: "desktop-linux",
    dockerClientVersion: "29.7.2",
    dockerServerVersion: "29.7.2",
    identityAuthenticatedByTool: false,
    externalValidatorAttestationRequired: true,
    singleUseEachPhase: true,
    networkAuthorized: false,
    registryAuthorized: false,
    imageInspectionAuthorized: false,
    runtimeResourceInspectionAuthorized: false,
  },
};
assert.equal(assertReproductionContextAuthorizationBinding(authorization), authorization.reproductionValidatorHostAccess);
for (const mutation of [
  { maxAgeMinutes: 16 }, { dockerContext: "default" }, { networkAuthorized: true },
  { dockerExecutableSha256: "not-a-hash" },
]) {
  assert.throws(() => assertReproductionContextAuthorizationBinding({
    ...authorization,
    reproductionValidatorHostAccess: { ...authorization.reproductionValidatorHostAccess, ...mutation },
  }));
}

const receipt = {
  schemaVersion: 1, proof: "TP-01", packageId: context.packageId, runId: context.runId,
  phase: context.stage, status: "READY", expectedValidator: context.validatorIdentity,
  validatorProcessUid: context.validatorProcessUid, identityAuthenticatedByTool: false,
  externalValidatorAttestationRequired: true,
  capturedAt: "2026-10-10T00:00:00.000Z", expiresAt: "2026-10-10T00:15:00.000Z",
  maxAgeMinutes: 15, singleUse: true,
  consumedByStage: "RUN_EXACT_PRIVATE_LAUNCHER_PREFLIGHT",
  docker: {
    executablePath: context.dockerExecutablePath,
    executableSha256: context.dockerExecutableSha256,
    context: "desktop-linux", clientVersion: "29.7.2", serverVersion: "29.7.2",
    localApiHandshake: "PASS",
  },
  prohibitedObservation: {
    networkAccess: false, registryAccess: false, imageInspection: false,
    containerInspection: false, networkInspection: false, volumeInspection: false,
    databaseOrServiceInspection: false,
  },
};
assert.equal(assertReproductionContextReceipt(receipt, context), receipt);
for (const stage of reproductionContextStages) {
  const staged = {
    ...receipt,
    phase: stage,
    consumedByStage: stage === "PRE_PRIMARY"
      ? "RUN_EXACT_PRIVATE_LAUNCHER_PREFLIGHT" : "REPRODUCTION_RUNTIME_REACHABILITY",
  };
  assert.equal(assertReproductionContextReceipt(staged, { ...context, stage }), staged);
}
for (const mutation of [
  { validatorProcessUid: 502 }, { identityAuthenticatedByTool: true }, { singleUse: false },
  { maxAgeMinutes: 16 }, { docker: { ...receipt.docker, clientVersion: "29.7.1" } },
  { prohibitedObservation: { ...receipt.prohibitedObservation, networkAccess: true } },
]) assert.throws(() => assertReproductionContextReceipt({ ...receipt, ...mutation }, context));
assert.throws(() => assertReproductionContextReceipt({ ...receipt, expiresAt: "2026-10-10T00:15:00.001Z" }, context));
assert.throws(() => assertReproductionContextReceipt({ ...receipt, extra: true }, context));

const receiptBytes = Buffer.from(`${JSON.stringify(receipt, null, 2)}\n`);
const attestation = {
  schemaVersion: 1, proof: "TP-01", packageId: context.packageId, runId: context.runId,
  phase: context.stage, status: "PASS", canonicalTaskIdentity: context.validatorIdentity,
  receiptSha256: createHash("sha256").update(receiptBytes).digest("hex"),
  identityAuthenticatedByTool: false, hostAccessObservedInValidatorContext: true,
  independencePreserved: true, singleUse: true, networkUsed: false,
  runtimeResourcesInspected: false,
};
assert.equal(assertReproductionContextAttestation(attestation, receiptBytes, context), attestation);
for (const mutation of [
  { receiptSha256: "c".repeat(64) }, { canonicalTaskIdentity: "/root/different" },
  { hostAccessObservedInValidatorContext: false }, { independencePreserved: false },
  { networkUsed: true },
]) assert.throws(() => assertReproductionContextAttestation({ ...attestation, ...mutation }, receiptBytes, context));

assert.equal(reproductionContextReceiptArtifacts.PRE_PRIMARY, "reproduction-validator-host-access-pre-primary.json");
assert.equal(reproductionContextAttestationArtifacts.PRE_REPRODUCTION, "reproduction-validator-host-access-pre-reproduction-attestation.json");
const executionAuthorizationSource = readFileSync("scripts/execution-authorization.mjs", "utf8");
assert.match(executionAuthorizationSource, /assertReproductionContextAuthorizationBinding\(record\)/);

process.stdout.write("WP-93 reproduction-context contract tests passed\n");
