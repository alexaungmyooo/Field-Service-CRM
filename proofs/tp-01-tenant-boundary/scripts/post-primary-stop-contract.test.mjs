import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import {
  assertPostPrimaryReproductionStop,
  assertPostPrimaryHandoffEvidence,
  assertPostPrimaryStopClosure,
  exactPostPrimaryHandoffEntryNames,
  prohibitedPostPrimaryStopArtifacts,
  reproductionReachabilityStop,
} from "./post-primary-stop-contract.mjs";
import {
  appendOperationalStop,
  createDeviationEvidence,
} from "./deviation-contract.mjs";

const context = { packageId: "WP-99", runId: "wp99-static-test-01" };
context.validatorIdentity = "/root/wp99_reproduction_validator";
const primaryDeviations = createDeviationEvidence();

const artifactBytesByName = Object.fromEntries(
  exactPostPrimaryHandoffEntryNames.map((name) => [name, Buffer.from(`fixture:${name}\n`)]),
);
const entries = exactPostPrimaryHandoffEntryNames.map((path) => ({
  path,
  bytes: artifactBytesByName[path].length,
  sha256: createHash("sha256").update(artifactBytesByName[path]).digest("hex"),
}));
const canonical = entries.map((entry) => `${entry.path}\0${entry.bytes}\0${entry.sha256}`).join("\n");
const seal = {
  schemaVersion: 2,
  proof: "TP-01",
  packageId: context.packageId,
  runId: context.runId,
  status: "PRIMARY_HANDOFF_SEALED_READ_ONLY",
  expectedReproductionValidator: context.validatorIdentity,
  entryCount: entries.length,
  aggregateSha256: createHash("sha256").update(canonical).digest("hex"),
  entries,
};
const sealBytes = Buffer.from(`${JSON.stringify(seal)}\n`);
const verification = {
  packageId: context.packageId,
  runId: context.runId,
  status: "PASS",
  expectedValidator: context.validatorIdentity,
  sealSha256: createHash("sha256").update(sealBytes).digest("hex"),
  aggregateSha256: seal.aggregateSha256,
  verifiedEntryCount: seal.entryCount,
};
const verificationBytes = Buffer.from(`${JSON.stringify(verification)}\n`);
const attestation = {
  packageId: context.packageId,
  runId: context.runId,
  status: "PASS",
  validator: context.validatorIdentity,
  verificationSha256: createHash("sha256").update(verificationBytes).digest("hex"),
  sealSha256: verification.sealSha256,
  aggregateSha256: seal.aggregateSha256,
  identityAuthenticatedByCollaboration: true,
  reproductionExecuted: false,
  zeroMutationOfSealedArtifacts: true,
  sealedArtifactsMutated: false,
};
assert.equal(
  assertPostPrimaryHandoffEvidence({
    sealBytes,
    verificationBytes,
    attestation,
    artifactBytesByName,
    context,
  }).seal.status,
  "PRIMARY_HANDOFF_SEALED_READ_ONLY",
);
for (const forbidden of ["deviations.json", "runtime.env"]) {
  const changedSeal = {
    ...seal,
    entryCount: seal.entryCount + 1,
    entries: [...seal.entries, { path: forbidden }],
  };
  assert.throws(() =>
    assertPostPrimaryHandoffEvidence({
      sealBytes: Buffer.from(`${JSON.stringify(changedSeal)}\n`),
      verificationBytes,
      attestation,
      artifactBytesByName,
      context,
    }),
  );
}
assert.throws(() =>
  assertPostPrimaryHandoffEvidence({
    sealBytes,
    verificationBytes,
    attestation,
    artifactBytesByName: {
      ...artifactBytesByName,
      "primary-deviations.json": Buffer.from("mutated\n"),
    },
    context,
  }),
);

const deviations = appendOperationalStop(
  createDeviationEvidence(),
  reproductionReachabilityStop,
);
const reachabilityFailure = {
  schemaVersion: 1,
  proof: "TP-01",
  packageId: context.packageId,
  runId: context.runId,
  phase: "REPRODUCTION",
  status: "FAIL_CLOSED",
  stage: "RUNTIME_REACHABILITY",
  diagnostic: "Docker API access unavailable.",
  commandDiagnostic: null,
};
assert.deepEqual(
  assertPostPrimaryReproductionStop({
    deviations,
    primaryDeviations,
    reachabilityFailure,
    context,
  }),
  {
    primaryDeviationSnapshot: "VALID_RAW_ZERO_STOP_POINT_IN_TIME",
    currentOperationalStop: "VALID_REPRODUCTION_REACHABILITY_STOP",
  },
);
assert.throws(() =>
  assertPostPrimaryReproductionStop({
    deviations: createDeviationEvidence(),
    primaryDeviations,
    reachabilityFailure,
    context,
  }),
);
assert.throws(() =>
  assertPostPrimaryReproductionStop({
    deviations,
    primaryDeviations,
    reachabilityFailure: { ...reachabilityFailure, phase: "PRIMARY" },
    context,
  }),
);

const required = [
  "primary-handoff-seal.json",
  "primary-handoff-verification.json",
  "primary-handoff-validator-attestation.json",
  "primary-deviations.json",
  "primary-runtime-reachability.json",
  "primary-fixture.json",
  "primary-database-security.json",
];
assert.deepEqual(
  assertPostPrimaryStopClosure({
    finalPhase: true,
    presentArtifacts: required,
    claimedStatus: "INCONCLUSIVE",
  }),
  {
    phase: "FINAL_POST_PRIMARY_REPRODUCTION_REACHABILITY_STOP_PACKET",
    status: "INCONCLUSIVE",
    reproduction: "NOT_EXECUTED_REPRODUCTION_REACHABILITY_STOP",
    exitCode: 2,
  },
);
for (const missing of required) {
  assert.throws(() =>
    assertPostPrimaryStopClosure({
      finalPhase: true,
      presentArtifacts: required.filter((name) => name !== missing),
      claimedStatus: "INCONCLUSIVE",
    }),
  );
}
for (const contradiction of prohibitedPostPrimaryStopArtifacts) {
  assert.throws(() =>
    assertPostPrimaryStopClosure({
      finalPhase: true,
      presentArtifacts: [...required, contradiction],
      claimedStatus: "INCONCLUSIVE",
    }),
  );
}
assert.throws(() =>
  assertPostPrimaryStopClosure({
    finalPhase: false,
    presentArtifacts: required,
    claimedStatus: "INCONCLUSIVE",
  }),
);
assert.throws(() =>
  assertPostPrimaryStopClosure({
    finalPhase: true,
    presentArtifacts: required,
    claimedStatus: "PASS",
  }),
);

const verifierSource = readFileSync("scripts/evidence-verify.mjs", "utf8");
const classificationOffset = verifierSource.indexOf("classifyOperationalStops(deviations)");
const primaryReachabilityOffset = verifierSource.indexOf('"primary-runtime-reachability.json"');
const postPrimaryBranchOffset = verifierSource.indexOf(
  'stopClassification === "REPRODUCTION_REACHABILITY_INCONCLUSIVE"',
);
const reproductionReadOffset = verifierSource.indexOf(
  'verifyResults("reproduction-results.jsonl")',
);
assert.ok(classificationOffset >= 0);
assert.ok(primaryReachabilityOffset > classificationOffset);
assert.ok(postPrimaryBranchOffset > classificationOffset);
assert.ok(reproductionReadOffset > postPrimaryBranchOffset);
assert.match(verifierSource, /assertPostPrimaryReproductionStop/);
assert.match(verifierSource, /assertPostPrimaryHandoffEvidence/);
assert.match(verifierSource, /assertPostPrimaryStopClosure/);
assert.match(verifierSource, /assertReproductionContextAuthorizationBinding/);
assert.match(verifierSource, /verifyReproductionContextGate\("PRE_PRIMARY"/);
assert.match(verifierSource, /verifyReproductionContextGate\("PRE_REPRODUCTION"/);
assert.match(verifierSource, /exactPostPrimaryHandoffEntryNames\.map/);
assert.match(verifierSource, /is not bound to its authorized role identity/);
assert.match(verifierSource, /FINAL_POST_PRIMARY_REPRODUCTION_REACHABILITY_STOP_PACKET/);
assert.match(verifierSource, /process\.exitCode = closure\.exitCode/);

process.stdout.write("WP-93 post-primary stop contract tests passed\n");
