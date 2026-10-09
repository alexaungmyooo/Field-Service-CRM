import assert from "node:assert/strict";
import {
  createProofRunStateSnapshotFailureEvidence,
  proofRunStateSnapshotStages,
} from "./proof-run-contract.mjs";

assert.deepEqual(proofRunStateSnapshotStages, [
  "STATE_SNAPSHOT_BEFORE",
  "STATE_SNAPSHOT_AFTER",
]);
for (const run of ["PRIMARY", "REPRODUCTION"]) {
  for (const stage of proofRunStateSnapshotStages) {
    const evidence = createProofRunStateSnapshotFailureEvidence({
      packageId: "WP-65",
      runId: "wp65-static-fixture",
      run,
      stage,
      diagnostic: { text: "minimized" },
      composeInterpolation: { valueRetained: false },
    });
    assert.equal(evidence.run, run);
    assert.equal(evidence.stage, stage);
    assert.equal(evidence.code, "STATE_SNAPSHOT_FAILED");
    assert.equal(evidence.status, "FAIL_CLOSED");
    assert.equal(evidence.retained.credentials, false);
    assert.equal(evidence.retained.interpolationValue, false);
  }
}
assert.throws(() => createProofRunStateSnapshotFailureEvidence({
  run: "PREFLIGHT",
  stage: "STATE_SNAPSHOT_BEFORE",
}), /run is invalid/);
assert.throws(() => createProofRunStateSnapshotFailureEvidence({
  run: "PRIMARY",
  stage: "PROOF_TEST",
}), /stage is invalid/);

process.stdout.write("WP-65 proof-run state snapshot contract tests passed\n");
