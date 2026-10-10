import { createHash } from "node:crypto";

const hashPattern = /^[a-f0-9]{64}$/;
const packagePattern = /^WP-[0-9]+$/;
const runPattern = /^wp[0-9]+-[a-z0-9][a-z0-9-]{2,127}$/;

export const reproductionContextStages = Object.freeze(["PRE_PRIMARY", "PRE_REPRODUCTION"]);

export const reproductionContextReceiptArtifacts = Object.freeze({
  PRE_PRIMARY: "reproduction-validator-host-access-pre-primary.json",
  PRE_REPRODUCTION: "reproduction-validator-host-access-pre-reproduction.json",
});

export const reproductionContextAttestationArtifacts = Object.freeze({
  PRE_PRIMARY: "reproduction-validator-host-access-pre-primary-attestation.json",
  PRE_REPRODUCTION: "reproduction-validator-host-access-pre-reproduction-attestation.json",
});

const receiptKeys = Object.freeze([
  "capturedAt", "consumedByStage", "docker", "expectedValidator", "expiresAt",
  "externalValidatorAttestationRequired", "identityAuthenticatedByTool", "maxAgeMinutes",
  "packageId", "phase", "prohibitedObservation", "proof", "runId", "schemaVersion",
  "singleUse", "status", "validatorProcessUid",
].sort());

const prohibitedObservationKeys = Object.freeze([
  "containerInspection", "databaseOrServiceInspection", "imageInspection", "networkAccess",
  "networkInspection", "registryAccess", "volumeInspection",
].sort());

const attestationKeys = Object.freeze([
  "canonicalTaskIdentity", "hostAccessObservedInValidatorContext", "identityAuthenticatedByTool",
  "independencePreserved", "networkUsed", "packageId", "phase", "proof", "receiptSha256",
  "runId", "runtimeResourcesInspected", "schemaVersion", "singleUse", "status",
].sort());

export function assertReproductionContextAuthorizationBinding(authorization) {
  const binding = authorization?.reproductionValidatorHostAccess;
  if (
    binding?.validatorIdentity !== authorization?.roles?.reproductionValidator ||
    typeof binding.validatorIdentity !== "string" ||
    !Number.isSafeInteger(binding.validatorProcessUid) || binding.validatorProcessUid < 0 ||
    typeof binding.dockerExecutablePath !== "string" ||
    !binding.dockerExecutablePath.startsWith("/") ||
    !hashPattern.test(binding.dockerExecutableSha256 ?? "") ||
    binding.maxAgeMinutes !== 15 || binding.dockerContext !== "desktop-linux" ||
    binding.dockerClientVersion !== "29.7.2" || binding.dockerServerVersion !== "29.7.2" ||
    binding.identityAuthenticatedByTool !== false ||
    binding.externalValidatorAttestationRequired !== true || binding.singleUseEachPhase !== true ||
    binding.networkAuthorized !== false || binding.registryAuthorized !== false ||
    binding.imageInspectionAuthorized !== false || binding.runtimeResourceInspectionAuthorized !== false
  ) {
    throw new Error("reproduction-context authorization binding differs");
  }
  return binding;
}

export function assertReproductionContextReceipt(
  record,
  {
    packageId, runId, validatorIdentity, validatorProcessUid, dockerExecutablePath,
    dockerExecutableSha256, stage, observedAt,
  },
) {
  const capturedAt = Date.parse(record?.capturedAt ?? "");
  const expiresAt = Date.parse(record?.expiresAt ?? "");
  const observed = Date.parse(observedAt ?? "");
  if (
    JSON.stringify(Object.keys(record ?? {}).sort()) !== JSON.stringify(receiptKeys) ||
    record.schemaVersion !== 1 || record.proof !== "TP-01" || record.packageId !== packageId ||
    record.runId !== runId || !packagePattern.test(record.packageId ?? "") ||
    !runPattern.test(record.runId ?? "") || record.expectedValidator !== validatorIdentity ||
    record.validatorProcessUid !== validatorProcessUid || !reproductionContextStages.includes(stage) ||
    record.phase !== stage || record.status !== "READY" ||
    record.identityAuthenticatedByTool !== false ||
    record.externalValidatorAttestationRequired !== true || record.maxAgeMinutes !== 15 ||
    record.singleUse !== true ||
    record.consumedByStage !== (stage === "PRE_PRIMARY"
      ? "RUN_EXACT_PRIVATE_LAUNCHER_PREFLIGHT" : "REPRODUCTION_RUNTIME_REACHABILITY") ||
    record.docker?.executablePath !== dockerExecutablePath ||
    record.docker?.executableSha256 !== dockerExecutableSha256 ||
    record.docker?.context !== "desktop-linux" || record.docker?.clientVersion !== "29.7.2" ||
    record.docker?.serverVersion !== "29.7.2" || record.docker?.localApiHandshake !== "PASS" ||
    JSON.stringify(Object.keys(record.prohibitedObservation ?? {}).sort()) !==
      JSON.stringify(prohibitedObservationKeys) ||
    Object.values(record.prohibitedObservation).some((value) => value !== false) ||
    !Number.isFinite(capturedAt) || !Number.isFinite(expiresAt) || !Number.isFinite(observed) ||
    expiresAt - capturedAt !== 900_000 || observed < capturedAt || observed > expiresAt
  ) {
    throw new Error("reproduction-context readiness receipt differs or is not current at its gate");
  }
  return record;
}

export function assertReproductionContextAttestation(
  record,
  receiptBytes,
  { packageId, runId, validatorIdentity, stage },
) {
  if (
    !Buffer.isBuffer(receiptBytes) ||
    JSON.stringify(Object.keys(record ?? {}).sort()) !== JSON.stringify(attestationKeys) ||
    record.schemaVersion !== 1 || record.proof !== "TP-01" || record.packageId !== packageId ||
    record.runId !== runId || record.phase !== stage ||
    !reproductionContextStages.includes(record.phase) || record.status !== "PASS" ||
    record.canonicalTaskIdentity !== validatorIdentity ||
    record.receiptSha256 !== createHash("sha256").update(receiptBytes).digest("hex") ||
    record.identityAuthenticatedByTool !== false ||
    record.hostAccessObservedInValidatorContext !== true || record.independencePreserved !== true ||
    record.singleUse !== true || record.networkUsed !== false ||
    record.runtimeResourcesInspected !== false
  ) {
    throw new Error("reproduction-context external task attestation differs");
  }
  return record;
}
