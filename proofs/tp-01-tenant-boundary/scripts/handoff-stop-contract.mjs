const hashPattern = /^[a-f0-9]{64}$/;
const packageIdPattern = /^WP-[0-9]+$/;
const runIdPattern = /^wp[0-9]+-[a-z0-9][a-z0-9-]{2,127}$/;

const exactKeys = Object.freeze([
  "code",
  "disposition",
  "handoffSealCreated",
  "handoffVerificationCreated",
  "packageId",
  "phase",
  "proof",
  "rawStdoutOrStderrRetained",
  "reproductionAuthorized",
  "reproductionExecuted",
  "reproductionValidatorAttestationCreated",
  "retryAuthorized",
  "runId",
  "schemaVersion",
  "secretOrCredentialRetained",
  "stage",
  "status",
  "toolSha256",
]);

export const prohibitedPrimaryHandoffStopArtifacts = Object.freeze([
  "primary-handoff-seal.json",
  "primary-handoff-verification.json",
  "primary-handoff-validator-attestation.json",
  "primary-runtime-reachability.json",
  "primary-fixture.json",
  "primary-database-security.json",
  "reproduction-results.jsonl",
  "reproduction-audit-events.jsonl",
  "reproduction-state.json",
  "reproduction-difference.json",
  "audit-events.jsonl",
  "state-integrity.json",
]);

export function assertPrimaryHandoffSealStopEvidence(record, context) {
  if (
    JSON.stringify(Object.keys(record ?? {}).sort()) !== JSON.stringify(exactKeys) ||
    record.schemaVersion !== 1 ||
    record.proof !== "TP-01" ||
    record.packageId !== context?.packageId ||
    record.runId !== context?.runId ||
    !packageIdPattern.test(record.packageId ?? "") ||
    !runIdPattern.test(record.runId ?? "") ||
    record.phase !== "PRIMARY_HANDOFF" ||
    record.stage !== "SEAL_PRIMARY_HANDOFF_READ_ONLY" ||
    record.status !== "STOP_CONDITION" ||
    record.code !== "PRIMARY_HANDOFF_SEAL_TOOL_FAILED" ||
    !hashPattern.test(record.toolSha256 ?? "") ||
    record.handoffSealCreated !== false ||
    record.handoffVerificationCreated !== false ||
    record.reproductionValidatorAttestationCreated !== false ||
    record.reproductionAuthorized !== false ||
    record.reproductionExecuted !== false ||
    record.retryAuthorized !== false ||
    record.rawStdoutOrStderrRetained !== false ||
    record.secretOrCredentialRetained !== false ||
    record.disposition !== "INCONCLUSIVE_STOPPED_BEFORE_HANDOFF_NO_RETRY"
  ) {
    throw new Error("primary-handoff seal-stop evidence differs from the minimized contract");
  }
  return record;
}

export function assertPrimaryHandoffStopClosure({
  finalPhase,
  presentArtifacts,
  claimedStatus,
}) {
  if (finalPhase !== true) {
    throw new Error("a primary-handoff operational stop may be closed only by final verification");
  }
  if (
    !Array.isArray(presentArtifacts) ||
    presentArtifacts.some((name) => typeof name !== "string" || name.length === 0)
  ) {
    throw new Error("primary-handoff closure artifact names are invalid");
  }
  if (claimedStatus !== "INCONCLUSIVE") {
    throw new Error("a primary-handoff operational stop can close only as INCONCLUSIVE");
  }
  const present = new Set(presentArtifacts);
  const contradiction = prohibitedPrimaryHandoffStopArtifacts.find((name) => present.has(name));
  if (contradiction) {
    throw new Error(`handoff or reproduction evidence exists after the primary-handoff stop: ${contradiction}`);
  }
  return Object.freeze({
    phase: "FINAL_PRIMARY_HANDOFF_STOP_PACKET",
    status: "INCONCLUSIVE",
    reproduction: "NOT_EXECUTED_PRIMARY_HANDOFF_STOP",
    exitCode: 2,
  });
}
