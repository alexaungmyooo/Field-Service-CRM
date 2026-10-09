import assert from "node:assert/strict";
import {
  appendOperationalStop,
  assertDeviationEvidence,
  createDeviationEvidence,
} from "./deviation-contract.mjs";

const initial = createDeviationEvidence();
assert.equal(assertDeviationEvidence(initial), initial);
assert.equal(initial.acceptedContractDeviations.length, 0);
assert.equal(initial.operationalStops.length, 0);
assert.equal(
  assertDeviationEvidence(initial, { requireNoAccepted: true, requireNoOperationalStops: true }),
  initial,
);

const stopped = appendOperationalStop(initial, {
  run: "PRIMARY",
  stage: "PROOF_TEST",
  code: "CHILD_EXIT_NONZERO",
  evidenceArtifact: "primary-execution-failure.json",
});
assert.equal(initial.operationalStops.length, 0);
assert.equal(stopped.operationalStops.length, 1);
assert.throws(() => assertDeviationEvidence(stopped, { requireNoOperationalStops: true }));
const activationStopped = appendOperationalStop(initial, {
  run: "PREFLIGHT",
  stage: "PRIVATE_ENVIRONMENT_ACTIVATION",
  code: "PRIVATE_ENVIRONMENT_KEY_MISSING",
  evidenceArtifact: "private-environment-activation-failure.json",
});
assert.equal(activationStopped.operationalStops.length, 1);
for (const run of ["PRIMARY", "REPRODUCTION"]) {
  const reachabilityStopped = appendOperationalStop(initial, {
    run,
    stage: "RUNTIME_REACHABILITY",
    code: "RUNTIME_REACHABILITY_FAILED",
    evidenceArtifact: "runtime-reachability-failure.json",
  });
  assert.equal(reachabilityStopped.operationalStops[0].run, run);
  assert.equal(reachabilityStopped.operationalStops[0].stage, "RUNTIME_REACHABILITY");
  const resetStopped = appendOperationalStop(initial, {
    run,
    stage: "DB_RESET",
    code: "DATABASE_RESET_FAILED",
    evidenceArtifact: "database-reset-failure.json",
  });
  assert.equal(resetStopped.operationalStops[0].run, run);
  assert.equal(resetStopped.operationalStops[0].stage, "DB_RESET");
  assert.throws(() => assertDeviationEvidence(resetStopped, { requireNoOperationalStops: true }));
  for (const stage of ["STATE_SNAPSHOT_BEFORE", "STATE_SNAPSHOT_AFTER"]) {
    const snapshotStopped = appendOperationalStop(initial, {
      run,
      stage,
      code: "STATE_SNAPSHOT_FAILED",
      evidenceArtifact: `${run.toLowerCase()}-state-snapshot-failure.json`,
    });
    assert.equal(snapshotStopped.operationalStops.length, 1);
    assert.equal(snapshotStopped.operationalStops[0].stage, stage);
    assert.throws(() =>
      assertDeviationEvidence(snapshotStopped, { requireNoOperationalStops: true }),
    );
  }
}
assert.throws(() =>
  appendOperationalStop(initial, {
    run: "PREFLIGHT",
    stage: "PROOF_TEST",
    code: "INVALID_STAGE_PAIR",
    evidenceArtifact: "failure.json",
  }),
);
assert.throws(() =>
  appendOperationalStop(initial, {
    run: "PREFLIGHT",
    stage: "DB_RESET",
    code: "INVALID_STAGE_PAIR",
    evidenceArtifact: "database-reset-failure.json",
  }),
);
assert.throws(() =>
  appendOperationalStop(initial, {
    run: "PREFLIGHT",
    stage: "RUNTIME_REACHABILITY",
    code: "INVALID_STAGE_PAIR",
    evidenceArtifact: "runtime-reachability-failure.json",
  }),
);
assert.throws(() => appendOperationalStop(initial, {
  run: "PRIMARY",
  stage: "PROOF_TEST",
  code: "contains secret=value",
  evidenceArtifact: "failure.json",
}));
assert.throws(() => appendOperationalStop(initial, {
  run: "PRIMARY",
  stage: "DB_RESET",
  code: "bad-code",
  evidenceArtifact: "database-reset-failure.json",
}));
assert.throws(() => appendOperationalStop(initial, {
  run: "PRIMARY",
  stage: "DB_RESET",
  code: "DATABASE_RESET_FAILED",
  evidenceArtifact: "../database-reset-failure.json",
}));
assert.throws(() => assertDeviationEvidence({ ...initial, acceptedContractDeviations: [{}] }, {
  requireNoAccepted: true,
}));

process.stdout.write("WP-61 deviation contract tests passed\n");
