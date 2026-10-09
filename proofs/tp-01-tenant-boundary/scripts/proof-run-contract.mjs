export const proofRunStateSnapshotStages = Object.freeze([
  "STATE_SNAPSHOT_BEFORE",
  "STATE_SNAPSHOT_AFTER",
]);

export function createProofRunStateSnapshotFailureEvidence({
  packageId,
  runId,
  run,
  stage,
  diagnostic,
  composeInterpolation,
}) {
  if (!["PRIMARY", "REPRODUCTION"].includes(run)) {
    throw new Error("proof-run state snapshot failure run is invalid");
  }
  if (!proofRunStateSnapshotStages.includes(stage)) {
    throw new Error("proof-run state snapshot failure stage is invalid");
  }
  return {
    schemaVersion: 1,
    proof: "TP-01",
    packageId,
    runId,
    run,
    status: "FAIL_CLOSED",
    stage,
    code: "STATE_SNAPSHOT_FAILED",
    dataClassification: "SYNTHETIC_PROOF_DIAGNOSTIC_ONLY",
    customerOrLiveDataAuthorized: false,
    composeInterpolation,
    diagnostic,
    retained: {
      rawStdout: false,
      rawStderr: false,
      credentials: false,
      databaseUrl: false,
      interpolationValue: false,
      absolutePaths: false,
    },
  };
}
