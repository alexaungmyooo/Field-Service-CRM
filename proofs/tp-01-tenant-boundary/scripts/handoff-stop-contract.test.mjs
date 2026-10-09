import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  assertPrimaryHandoffSealStopEvidence,
  assertPrimaryHandoffStopClosure,
  prohibitedPrimaryHandoffStopArtifacts,
} from "./handoff-stop-contract.mjs";

const context = { packageId: "WP-77", runId: "wp77-static-test-01" };
const valid = {
  schemaVersion: 1,
  proof: "TP-01",
  packageId: context.packageId,
  runId: context.runId,
  phase: "PRIMARY_HANDOFF",
  stage: "SEAL_PRIMARY_HANDOFF_READ_ONLY",
  status: "STOP_CONDITION",
  code: "PRIMARY_HANDOFF_SEAL_TOOL_FAILED",
  toolSha256: "a".repeat(64),
  handoffSealCreated: false,
  handoffVerificationCreated: false,
  reproductionValidatorAttestationCreated: false,
  reproductionAuthorized: false,
  reproductionExecuted: false,
  retryAuthorized: false,
  rawStdoutOrStderrRetained: false,
  secretOrCredentialRetained: false,
  disposition: "INCONCLUSIVE_STOPPED_BEFORE_HANDOFF_NO_RETRY",
};

assert.equal(assertPrimaryHandoffSealStopEvidence(valid, context), valid);
for (const [key, value] of Object.entries({
  code: "PRIVATE_SEAL_TOOL_MODULE_IMPORT_FAILED",
  reproductionExecuted: true,
  retryAuthorized: true,
  rawStdoutOrStderrRetained: true,
  secretOrCredentialRetained: true,
  toolSha256: "not-a-hash",
})) {
  assert.throws(() => assertPrimaryHandoffSealStopEvidence({ ...valid, [key]: value }, context));
}
assert.throws(() => assertPrimaryHandoffSealStopEvidence({ ...valid, extra: true }, context));
assert.throws(() =>
  assertPrimaryHandoffSealStopEvidence(valid, { ...context, runId: "different-run" }),
);

assert.deepEqual(
  assertPrimaryHandoffStopClosure({
    finalPhase: true,
    presentArtifacts: ["primary-results.jsonl", "cleanup.json"],
    claimedStatus: "INCONCLUSIVE",
  }),
  {
    phase: "FINAL_PRIMARY_HANDOFF_STOP_PACKET",
    status: "INCONCLUSIVE",
    reproduction: "NOT_EXECUTED_PRIMARY_HANDOFF_STOP",
    exitCode: 2,
  },
);
assert.throws(() =>
  assertPrimaryHandoffStopClosure({
    finalPhase: false,
    presentArtifacts: [],
    claimedStatus: "INCONCLUSIVE",
  }),
);
for (const claimedStatus of ["PASS", "FAIL", "RESULTS_VERIFIED_PENDING_CLEANUP_AND_REVIEWS"]) {
  assert.throws(() =>
    assertPrimaryHandoffStopClosure({
      finalPhase: true,
      presentArtifacts: [],
      claimedStatus,
    }),
  );
}
for (const artifact of prohibitedPrimaryHandoffStopArtifacts) {
  assert.throws(() =>
    assertPrimaryHandoffStopClosure({
      finalPhase: true,
      presentArtifacts: [artifact],
      claimedStatus: "INCONCLUSIVE",
    }),
  );
}

const verifierSource = readFileSync("scripts/evidence-verify.mjs", "utf8");
const classificationOffset = verifierSource.indexOf("classifyOperationalStops(deviations)");
const reachabilityValidationOffset = verifierSource.indexOf("\nassertRuntimeReachabilityEvidence(");
const reproductionReadOffset = verifierSource.indexOf(
  'verifyResults("reproduction-results.jsonl")',
);
assert.ok(classificationOffset >= 0, "final verifier must classify operational stops");
assert.ok(
  reachabilityValidationOffset > classificationOffset,
  "stop classification must precede REPRODUCTION reachability validation",
);
assert.match(
  verifierSource,
  /stopClassification === "PRIMARY_HANDOFF_INCONCLUSIVE" \? "PRIMARY" : "REPRODUCTION"/,
);
assert.ok(
  reproductionReadOffset > classificationOffset,
  "stop classification must precede reproduction evidence reads",
);
assert.match(verifierSource, /process\.exitCode = 2/);
assert.match(verifierSource, /PRIMARY_HANDOFF_INCONCLUSIVE/);
assert.match(verifierSource, /assertPrimaryHandoffStopClosure/);

process.stdout.write("WP-77 handoff-stop contract tests passed\n");
