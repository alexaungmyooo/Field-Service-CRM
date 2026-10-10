import { createHash } from "node:crypto";
import {
  assertDeviationAppendOnlyExtension,
  assertDeviationEvidence,
} from "./deviation-contract.mjs";

export const reproductionReachabilityStop = Object.freeze({
  run: "REPRODUCTION",
  stage: "RUNTIME_REACHABILITY",
  code: "RUNTIME_REACHABILITY_FAILED",
  evidenceArtifact: "runtime-reachability-failure.json",
});

export const prohibitedPostPrimaryStopArtifacts = Object.freeze([
  "reproduction-results.jsonl",
  "reproduction-audit-events.jsonl",
  "reproduction-state.json",
  "reproduction-difference.json",
  "audit-events.jsonl",
  "state-integrity.json",
]);

const requiredHandoffArtifacts = Object.freeze([
  "primary-handoff-seal.json",
  "primary-handoff-verification.json",
  "primary-handoff-validator-attestation.json",
  "primary-deviations.json",
  "primary-runtime-reachability.json",
  "primary-fixture.json",
  "primary-database-security.json",
]);

export const exactPostPrimaryHandoffEntryNames = Object.freeze([
  "authorization.json",
  "dependency-restoration.json",
  "image-local-presence.json",
  "environment.json",
  "image.json",
  "supply-chain.json",
  "case-manifest.json",
  "primary-results.jsonl",
  "primary-audit-events.jsonl",
  "primary-state.json",
  "primary-runtime-reachability.json",
  "primary-fixture.json",
  "primary-database-security.json",
  "primary-deviations.json",
  "reproduction-validator-host-access-pre-primary.json",
  "reproduction-validator-host-access-pre-primary-attestation.json",
]);

export function isReproductionReachabilityStop(record) {
  return Object.entries(reproductionReachabilityStop).every(
    ([key, value]) => record?.[key] === value,
  );
}

export function assertPostPrimaryReproductionStop({
  deviations,
  primaryDeviations,
  reachabilityFailure,
  context,
}) {
  const current = assertDeviationEvidence(deviations, { requireNoAccepted: true });
  const primary = assertDeviationEvidence(primaryDeviations, {
    requireNoAccepted: true,
    requireNoOperationalStops: true,
  });
  if (
    current.operationalStops.length !== 1 ||
    !isReproductionReachabilityStop(current.operationalStops[0])
  ) {
    throw new Error("post-primary stop register differs");
  }
  assertDeviationAppendOnlyExtension(primary, current);
  if (
    reachabilityFailure?.schemaVersion !== 1 ||
    reachabilityFailure.proof !== "TP-01" ||
    reachabilityFailure.packageId !== context?.packageId ||
    reachabilityFailure.runId !== context?.runId ||
    reachabilityFailure.phase !== "REPRODUCTION" ||
    reachabilityFailure.status !== "FAIL_CLOSED" ||
    reachabilityFailure.stage !== "RUNTIME_REACHABILITY"
  ) {
    throw new Error("reproduction reachability failure evidence differs");
  }
  return Object.freeze({
    primaryDeviationSnapshot: "VALID_RAW_ZERO_STOP_POINT_IN_TIME",
    currentOperationalStop: "VALID_REPRODUCTION_REACHABILITY_STOP",
  });
}

export function assertPostPrimaryHandoffEvidence({
  sealBytes,
  verificationBytes,
  attestation,
  artifactBytesByName,
  context,
}) {
  const seal = JSON.parse(sealBytes.toString("utf8"));
  const verification = JSON.parse(verificationBytes.toString("utf8"));
  const entryNames = seal.entries?.map((entry) => entry.path) ?? [];
  if (
    JSON.stringify(entryNames) !== JSON.stringify(exactPostPrimaryHandoffEntryNames) ||
    typeof artifactBytesByName !== "object" || artifactBytesByName === null
  ) {
    throw new Error("post-primary handoff inventory differs from the exact contract");
  }
  for (const entry of seal.entries) {
    const bytes = artifactBytesByName[entry.path];
    if (
      !Buffer.isBuffer(bytes) ||
      entry.bytes !== bytes.length ||
      entry.sha256 !== createHash("sha256").update(bytes).digest("hex")
    ) {
      throw new Error(`post-primary sealed artifact differs: ${entry.path}`);
    }
  }
  const canonical = seal.entries
    .map((entry) => `${entry.path}\0${entry.bytes}\0${entry.sha256}`)
    .join("\n");
  if (
    seal.schemaVersion !== 2 ||
    seal.proof !== "TP-01" ||
    seal.packageId !== context?.packageId ||
    seal.runId !== context?.runId ||
    seal.status !== "PRIMARY_HANDOFF_SEALED_READ_ONLY" ||
    seal.expectedReproductionValidator !== context?.validatorIdentity ||
    !entryNames.includes("primary-deviations.json") ||
    entryNames.includes("deviations.json") ||
    entryNames.includes("runtime.env") ||
    new Set(entryNames).size !== entryNames.length ||
    seal.entryCount !== entryNames.length ||
    createHash("sha256").update(canonical).digest("hex") !== seal.aggregateSha256 ||
    verification.status !== "PASS" ||
    verification.packageId !== context?.packageId ||
    verification.runId !== context?.runId ||
    verification.expectedValidator !== context?.validatorIdentity ||
    verification.sealSha256 !== createHash("sha256").update(sealBytes).digest("hex") ||
    verification.aggregateSha256 !== seal.aggregateSha256 ||
    verification.verifiedEntryCount !== seal.entryCount ||
    attestation?.status !== "PASS" ||
    attestation.packageId !== context?.packageId ||
    attestation.runId !== context?.runId ||
    attestation.validator !== context?.validatorIdentity ||
    attestation.verificationSha256 !==
      createHash("sha256").update(verificationBytes).digest("hex") ||
    attestation.sealSha256 !== verification.sealSha256 ||
    attestation.aggregateSha256 !== seal.aggregateSha256 ||
    attestation.identityAuthenticatedByCollaboration !== true ||
    attestation.reproductionExecuted !== false ||
    attestation.zeroMutationOfSealedArtifacts !== true ||
    attestation.sealedArtifactsMutated !== false
  ) {
    throw new Error("post-primary handoff evidence differs from the immutable contract");
  }
  return Object.freeze({ seal, verification, attestation });
}

export function assertPostPrimaryStopClosure({
  finalPhase,
  presentArtifacts,
  claimedStatus,
}) {
  if (finalPhase !== true || claimedStatus !== "INCONCLUSIVE") {
    throw new Error("post-primary stop can close only during final Inconclusive verification");
  }
  if (!Array.isArray(presentArtifacts)) {
    throw new Error("post-primary closure artifact inventory is invalid");
  }
  const present = new Set(presentArtifacts);
  const missing = requiredHandoffArtifacts.find((name) => !present.has(name));
  if (missing) throw new Error(`required primary handoff artifact is absent: ${missing}`);
  const contradiction = prohibitedPostPrimaryStopArtifacts.find((name) => present.has(name));
  if (contradiction) {
    throw new Error(`reproduction evidence exists after the reachability stop: ${contradiction}`);
  }
  return Object.freeze({
    phase: "FINAL_POST_PRIMARY_REPRODUCTION_REACHABILITY_STOP_PACKET",
    status: "INCONCLUSIVE",
    reproduction: "NOT_EXECUTED_REPRODUCTION_REACHABILITY_STOP",
    exitCode: 2,
  });
}
