const stopCodePattern = /^[A-Z][A-Z0-9_]{2,63}$/;
const artifactPattern = /^[a-z0-9][a-z0-9.-]{0,127}$/;

export const primaryHandoffSealStop = Object.freeze({
  run: "PRIMARY_HANDOFF",
  stage: "SEAL_PRIMARY_HANDOFF_READ_ONLY",
  code: "PRIMARY_HANDOFF_SEAL_TOOL_FAILED",
  evidenceArtifact: "handoff-seal-failure.json",
});

function isPrimaryHandoffSealStop(record) {
  return Object.entries(primaryHandoffSealStop).every(([key, value]) => record?.[key] === value);
}

function assertOperationalStopRecord(record) {
  const allowedStage =
    (record?.run === "PREFLIGHT" && record?.stage === "PRIVATE_ENVIRONMENT_ACTIVATION") ||
    (record?.run === primaryHandoffSealStop.run &&
      record?.stage === primaryHandoffSealStop.stage &&
      record?.code === primaryHandoffSealStop.code &&
      record?.evidenceArtifact === primaryHandoffSealStop.evidenceArtifact) ||
    (["PRIMARY", "REPRODUCTION"].includes(record?.run) &&
      [
        "TYPESCRIPT_COMPILE",
        "PROOF_TEST",
        "RUNTIME_REACHABILITY",
        "DB_RESET",
        "STATE_SNAPSHOT_BEFORE",
        "STATE_SNAPSHOT_AFTER",
      ].includes(record?.stage));
  if (
    !allowedStage ||
    !stopCodePattern.test(record?.code ?? "") ||
    !artifactPattern.test(record?.evidenceArtifact ?? "") ||
    JSON.stringify(Object.keys(record).sort()) !==
      JSON.stringify(["code", "evidenceArtifact", "run", "stage"])
  ) {
    throw new Error("operational-stop record differs from the minimized contract");
  }
  return record;
}

export function createDeviationEvidence() {
  return {
    schemaVersion: 2,
    proof: "TP-01",
    acceptedContractDeviations: [],
    operationalStops: [],
    semantics: {
      acceptedContractDeviations: "OWNER_ACCEPTED_VARIANCE_FROM_FROZEN_CONTRACT",
      operationalStops: "FAIL_CLOSED_RUNTIME_OR_COMMAND_STOP_NOT_ACCEPTED_AS_VARIANCE",
    },
  };
}

export function appendOperationalStop(document, record) {
  assertDeviationEvidence(document);
  const normalized = {
    run: record?.run,
    stage: record?.stage,
    code: record?.code,
    evidenceArtifact: record?.evidenceArtifact,
  };
  assertOperationalStopRecord(normalized);
  return {
    ...document,
    operationalStops: [...document.operationalStops, normalized],
  };
}

export function assertDeviationEvidence(document, options = {}) {
  if (
    document?.schemaVersion !== 2 ||
    document.proof !== "TP-01" ||
    !Array.isArray(document.acceptedContractDeviations) ||
    !Array.isArray(document.operationalStops) ||
    document.semantics?.acceptedContractDeviations !==
      "OWNER_ACCEPTED_VARIANCE_FROM_FROZEN_CONTRACT" ||
    document.semantics?.operationalStops !==
      "FAIL_CLOSED_RUNTIME_OR_COMMAND_STOP_NOT_ACCEPTED_AS_VARIANCE"
  ) {
    throw new Error("deviation evidence does not separate accepted variances from operational stops");
  }
  for (const record of document.operationalStops) assertOperationalStopRecord(record);
  if (options.requireNoAccepted === true && document.acceptedContractDeviations.length !== 0) {
    throw new Error("unaccepted TP-01 contract deviations are present");
  }
  if (options.requireNoOperationalStops === true && document.operationalStops.length !== 0) {
    throw new Error("TP-01 operational stop evidence prevents a successful result");
  }
  return document;
}

export function classifyOperationalStops(document) {
  assertDeviationEvidence(document, { requireNoAccepted: true });
  if (document.operationalStops.length === 0) return "COMPLETE_REPRODUCTION";
  if (document.operationalStops.length === 1 && isPrimaryHandoffSealStop(document.operationalStops[0])) {
    return "PRIMARY_HANDOFF_INCONCLUSIVE";
  }
  throw new Error("unknown or multiple TP-01 operational stops fail closed");
}
