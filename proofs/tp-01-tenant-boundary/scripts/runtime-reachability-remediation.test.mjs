import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  classifyRuntimeReachabilityPhase,
  composeReachabilityInspectionArguments,
  createReachabilityComposeInspection,
} from "./runtime-reachability-contract.mjs";

assert.deepEqual(composeReachabilityInspectionArguments, [
  "compose",
  "ps",
  "--format",
  "json",
  "postgres",
]);
assert.equal(composeReachabilityInspectionArguments.includes("up"), false);
assert.equal(composeReachabilityInspectionArguments.includes("down"), false);

const realBootstrap = "real-bootstrap-credential-must-never-propagate";
const synthetic = "synthetic-interpolation-value-0123456789abcdef";
const baseEnvironment = {
  PATH: "/proof/bin",
  TP01_BOOTSTRAP_PASSWORD: realBootstrap,
  TP01_RUNTIME_PASSWORD: "runtime-secret",
  TP01_DATABASE_URL: "postgresql://tp01_runtime:secret@127.0.0.1:55432/tp01",
  TP01_IMAGE_PULL_AUTHORIZATION_TOKEN: "pull-token",
  PGPASSWORD: "pg-secret",
};
const inspection = createReachabilityComposeInspection(baseEnvironment, synthetic);
assert.equal(inspection.environment.TP01_BOOTSTRAP_PASSWORD, synthetic);
assert.equal(inspection.environment.TP01_RUNTIME_PASSWORD, undefined);
assert.equal(inspection.environment.TP01_DATABASE_URL, undefined);
assert.equal(inspection.environment.TP01_IMAGE_PULL_AUTHORIZATION_TOKEN, undefined);
assert.equal(inspection.environment.PGPASSWORD, undefined);
assert.equal(inspection.environment.PATH, "/proof/bin");
assert.equal(baseEnvironment.TP01_BOOTSTRAP_PASSWORD, realBootstrap);
assert.equal(inspection.evidence.actualBootstrapCredentialPresentBefore, true);
assert.equal(inspection.evidence.actualBootstrapCredentialPropagated, false);
assert.equal(inspection.evidence.serviceMutationAllowed, false);
assert.equal(inspection.evidence.valueRetained, false);
assert.equal(JSON.stringify(inspection.evidence).includes(realBootstrap), false);
assert.equal(JSON.stringify(inspection.evidence).includes(synthetic), false);
assert.throws(
  () => createReachabilityComposeInspection(baseEnvironment, realBootstrap),
  /must differ/,
);
for (const invalid of ["", "too-short", `${synthetic}\nsecond-line`]) {
  assert.throws(() => createReachabilityComposeInspection({}, invalid));
}

assert.equal(classifyRuntimeReachabilityPhase([]), "PRIMARY");
assert.equal(
  classifyRuntimeReachabilityPhase([
    "primary-results.jsonl",
    "primary-state.json",
    "primary-audit-events.jsonl",
  ]),
  "REPRODUCTION",
);
assert.throws(
  () => classifyRuntimeReachabilityPhase(["primary-results.jsonl"]),
  /incomplete primary evidence packet/,
);

const source = readFileSync("scripts/runtime-reachability.mjs", "utf8");
const resetSource = readFileSync("scripts/db-reset.mjs", "utf8");
const verifierSource = readFileSync("scripts/evidence-verify.mjs", "utf8");
assert.match(source, /createReachabilityComposeInspection/);
assert.match(source, /run\("docker", composeInspection\.arguments, \{/);
assert.match(source, /delete composeInspection\.environment\.TP01_BOOTSTRAP_PASSWORD/);
assert.match(source, /composeInterpolation: composeInterpolationEvidence/);
assert.match(source, /stage: "RUNTIME_REACHABILITY"/);
assert.match(source, /code: "RUNTIME_REACHABILITY_FAILED"/);
assert.doesNotMatch(source, /\["compose", "up"/);
assert.doesNotMatch(source, /\["compose", "down"/);
assert.match(resetSource, /classifyRuntimeReachabilityPhase\(readdirSync\(evidenceDirectory\)\)/);
assert.match(resetSource, /expectedReachabilityPhase/);
assert.match(
  verifierSource,
  /stopClassification === "PRIMARY_HANDOFF_INCONCLUSIVE" \? "PRIMARY" : "REPRODUCTION"/,
);
assert.ok(
  verifierSource.indexOf("classifyOperationalStops(deviations)") <
    verifierSource.indexOf("assertRuntimeReachabilityEvidence("),
  "operational stops must be classified before phase-specific reachability validation",
);

process.stdout.write("WP-77 reachability and handoff-stop compatibility tests passed\n");
