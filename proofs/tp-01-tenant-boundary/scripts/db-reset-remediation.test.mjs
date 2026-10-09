import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  createDatabaseResetComposeInterpolation,
  createDatabaseResetFailureEvidence,
  databaseResetPostSqlStages,
  databaseResetSqlSteps,
} from "./db-reset-contract.mjs";

const realBootstrap = "real-bootstrap-credential-must-never-propagate";
const runtimeCredential = "runtime-credential-must-never-propagate-through-compose";
const databaseUrl = "postgresql://tp01_runtime:secret@127.0.0.1:55432/tp01";
const pullToken = "run-bound-pull-token";
const synthetic = "synthetic-reset-interpolation-0123456789abcdef";
const baseEnvironment = {
  PATH: "/proof/bin",
  DOCKER_CONTEXT: "wp61-bound-context",
  TP01_BOOTSTRAP_PASSWORD: realBootstrap,
  TP01_RUNTIME_PASSWORD: runtimeCredential,
  TP01_DATABASE_URL: databaseUrl,
  TP01_IMAGE_PULL_AUTHORIZATION_TOKEN: pullToken,
  TP01_UNEXPECTED_PRIVATE_VALUE: "must-be-removed",
  PGPASSWORD: "pg-secret",
};
const interpolation = createDatabaseResetComposeInterpolation(baseEnvironment, synthetic);
assert.deepEqual(Object.keys(interpolation.environment).sort(), [
  "DOCKER_CONTEXT",
  "PATH",
  "TP01_BOOTSTRAP_PASSWORD",
]);
assert.equal(interpolation.environment.PATH, "/proof/bin");
assert.equal(interpolation.environment.DOCKER_CONTEXT, "wp61-bound-context");
assert.equal(interpolation.environment.TP01_BOOTSTRAP_PASSWORD, synthetic);
assert.equal(baseEnvironment.TP01_BOOTSTRAP_PASSWORD, realBootstrap);
assert.equal(baseEnvironment.TP01_RUNTIME_PASSWORD, runtimeCredential);
assert.equal(interpolation.evidence.actualBootstrapCredentialPropagated, false);
assert.equal(interpolation.evidence.runtimeCredentialPropagated, false);
assert.equal(interpolation.evidence.databaseUrlPropagated, false);
assert.equal(interpolation.evidence.serviceLifecycleMutationAllowed, false);
assert.equal(interpolation.evidence.interpolationCanAuthenticate, false);
assert.equal(interpolation.evidence.interpolationCanMutateDatabase, false);
assert.equal(interpolation.evidence.valueRetained, false);
const serializedEvidence = JSON.stringify(interpolation.evidence);
for (const forbidden of [realBootstrap, runtimeCredential, databaseUrl, pullToken, synthetic]) {
  assert.equal(serializedEvidence.includes(forbidden), false);
}
assert.throws(
  () => createDatabaseResetComposeInterpolation(baseEnvironment, realBootstrap),
  /must differ/,
);
for (const invalid of ["", "too-short", `${synthetic}\nsecond-line`]) {
  assert.throws(() => createDatabaseResetComposeInterpolation({}, invalid));
}

assert.deepEqual(databaseResetSqlSteps, [
  "001_roles.sql",
  "002_schema.sql",
  "003_rls.sql",
  "004_seed.sql",
]);
assert.deepEqual(databaseResetPostSqlStages, [
  "FIXTURE_EVIDENCE_CAPTURE",
  "FIXTURE_EVIDENCE_WRITE",
  "DATABASE_SECURITY_EVIDENCE_CAPTURE",
  "DATABASE_CONNECTION_EVIDENCE_CAPTURE",
  "DATABASE_SECURITY_EVIDENCE_WRITE",
]);
const noProgress = createDatabaseResetFailureEvidence({
  packageId: "WP-62",
  runId: "wp62-static-fixture",
  phase: "PRIMARY",
  completedSqlSteps: [],
  attemptedSqlStep: null,
  diagnostic: { text: "minimized" },
});
assert.equal(noProgress.progress.partialDatabaseMutationMayHaveOccurred, false);
const partialProgress = createDatabaseResetFailureEvidence({
  packageId: "WP-62",
  runId: "wp62-static-fixture",
  phase: "REPRODUCTION",
  completedSqlSteps: ["001_roles.sql"],
  attemptedSqlStep: "002_schema.sql",
  diagnostic: { text: "minimized" },
});
assert.equal(partialProgress.progress.completedSqlStepCount, 1);
assert.equal(partialProgress.progress.partialDatabaseMutationMayHaveOccurred, true);
assert.equal(partialProgress.stage, "DB_RESET");
assert.equal(partialProgress.code, "DATABASE_RESET_FAILED");
assert.equal(JSON.stringify(partialProgress).includes(synthetic), false);
const postSqlFailure = createDatabaseResetFailureEvidence({
  packageId: "WP-65",
  runId: "wp65-static-fixture",
  phase: "PRIMARY",
  completedSqlSteps: [...databaseResetSqlSteps],
  attemptedSqlStep: null,
  completedPostSqlStages: ["FIXTURE_EVIDENCE_CAPTURE", "FIXTURE_EVIDENCE_WRITE"],
  attemptedPostSqlStage: "DATABASE_SECURITY_EVIDENCE_CAPTURE",
  diagnostic: { text: "minimized" },
});
assert.equal(
  postSqlFailure.progress.attemptedPostSqlStage,
  "DATABASE_SECURITY_EVIDENCE_CAPTURE",
);
assert.equal(postSqlFailure.progress.completedPostSqlStageCount, 2);
assert.throws(() => createDatabaseResetFailureEvidence({
  packageId: "WP-65",
  runId: "wp65-static-fixture",
  phase: "PRIMARY",
  completedSqlSteps: [...databaseResetSqlSteps],
  attemptedSqlStep: null,
  completedPostSqlStages: ["FIXTURE_EVIDENCE_WRITE"],
  attemptedPostSqlStage: null,
  diagnostic: {},
}), /post-SQL sequence/);
assert.throws(() => createDatabaseResetFailureEvidence({
  packageId: "WP-62",
  runId: "wp62-static-fixture",
  phase: "PREFLIGHT",
  completedSqlSteps: [],
  attemptedSqlStep: null,
  diagnostic: {},
}));
assert.throws(() => createDatabaseResetFailureEvidence({
  packageId: "WP-62",
  runId: "wp62-static-fixture",
  phase: "PRIMARY",
  completedSqlSteps: ["002_schema.sql"],
  attemptedSqlStep: null,
  diagnostic: {},
}));

const resetSource = readFileSync("scripts/db-reset.mjs", "utf8");
assert.match(resetSource, /classifyRuntimeReachabilityPhase\(readdirSync\(evidenceDirectory\)\)/);
assert.match(resetSource, /createDatabaseResetComposeInterpolation/);
assert.match(resetSource, /randomBytes\(32\)\.toString\("base64url"\)/);
assert.match(resetSource, /\["compose", "exec", "-T", "postgres", "psql"/);
assert.match(resetSource, /env: composeInterpolation\.environment/);
assert.match(resetSource, /captureFixtureEvidence\(composeInterpolation\.environment\)/);
assert.match(
  resetSource,
  /captureDatabaseSecurityEvidence\([\s\S]*composeInterpolation\.environment,[\s\S]*runtimePassword/,
);
assert.match(resetSource, /stage: "DB_RESET"/);
assert.match(resetSource, /code: "DATABASE_RESET_FAILED"/);
assert.match(resetSource, /evidenceArtifact: failureArtifact/);
assert.match(resetSource, /throw error/);
assert.match(resetSource, /finally/);
assert.match(resetSource, /clearDatabaseEvidenceComposeInterpolation\(composeInterpolation\)/);
assert.doesNotMatch(resetSource, /\["compose", "(?:up|down|start|restart|create|run)"/);

process.stdout.write("WP-65 database-reset remediation static tests passed\n");
