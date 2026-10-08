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
assert.throws(() =>
  appendOperationalStop(initial, {
    run: "PREFLIGHT",
    stage: "PROOF_TEST",
    code: "INVALID_STAGE_PAIR",
    evidenceArtifact: "failure.json",
  }),
);
assert.throws(() => appendOperationalStop(initial, {
  run: "PRIMARY",
  stage: "PROOF_TEST",
  code: "contains secret=value",
  evidenceArtifact: "failure.json",
}));
assert.throws(() => assertDeviationEvidence({ ...initial, acceptedContractDeviations: [{}] }, {
  requireNoAccepted: true,
}));

process.stdout.write("WP-46 deviation contract tests passed\n");
