import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  bindDatabaseEvidenceSnapshotCapture,
  clearDatabaseEvidenceComposeInterpolation,
  createDatabaseEvidenceComposeInterpolation,
  runDatabaseEvidenceJson,
} from "./database-evidence-compose-contract.mjs";

const realBootstrap = "real-bootstrap-credential-must-never-propagate";
const runtimeCredential = "runtime-credential-must-never-propagate-through-compose";
const databaseUrl = "postgresql://tp01_runtime:secret@127.0.0.1:55432/tp01";
const pullToken = "run-bound-pull-token";
const baseEnvironment = {
  PATH: "/proof/bin",
  DOCKER_CONTEXT: "wp65-bound-context",
  TP01_BOOTSTRAP_PASSWORD: realBootstrap,
  TP01_RUNTIME_PASSWORD: runtimeCredential,
  TP01_DATABASE_URL: databaseUrl,
  TP01_IMAGE_PULL_AUTHORIZATION_TOKEN: pullToken,
  TP01_UNEXPECTED_PRIVATE_VALUE: "must-be-removed",
  PGPASSWORD: "ambient-pg-secret",
};

for (const operation of ["DATABASE_RESET", "PROOF_RUN"]) {
  const synthetic = `synthetic-${operation.toLowerCase()}-interpolation-0123456789abcdef`;
  const interpolation = createDatabaseEvidenceComposeInterpolation(
    baseEnvironment,
    synthetic,
    operation,
  );
  assert.deepEqual(Object.keys(interpolation.environment).sort(), [
    "DOCKER_CONTEXT",
    "PATH",
    "TP01_BOOTSTRAP_PASSWORD",
  ]);
  assert.equal(interpolation.environment.TP01_BOOTSTRAP_PASSWORD, synthetic);
  assert.equal(interpolation.evidence.operation, operation);
  assert.equal(interpolation.evidence.runtimeSecurityPgPasswordScope, "TEMPORARY_CLONE_ONLY");
  const serializedEvidence = JSON.stringify(interpolation.evidence);
  for (const forbidden of [realBootstrap, runtimeCredential, databaseUrl, pullToken, synthetic]) {
    assert.equal(serializedEvidence.includes(forbidden), false);
  }
  clearDatabaseEvidenceComposeInterpolation(interpolation);
  assert.equal(interpolation.environment.TP01_BOOTSTRAP_PASSWORD, undefined);
}

assert.throws(
  () => createDatabaseEvidenceComposeInterpolation(baseEnvironment, realBootstrap, "PROOF_RUN"),
  /must differ/,
);
assert.throws(
  () => createDatabaseEvidenceComposeInterpolation(baseEnvironment, "x".repeat(32), "UNKNOWN"),
  /operation is invalid/,
);

const composeInterpolation = createDatabaseEvidenceComposeInterpolation(
  baseEnvironment,
  "synthetic-query-interpolation-0123456789abcdef",
  "PROOF_RUN",
);
const invocations = [];
const fakeRun = (command, args, options) => {
  invocations.push({ command, args: [...args], environmentAtCall: { ...options.env }, options });
  return '{"ok":true}';
};
assert.deepEqual(
  runDatabaseEvidenceJson({
    runCommand: fakeRun,
    sql: "SELECT bootstrap_evidence;",
    role: "tp01_bootstrap",
    composeEnvironment: composeInterpolation.environment,
  }),
  { ok: true },
);
assert.deepEqual(invocations[0].args, [
  "compose", "exec", "-T", "postgres", "psql", "-X", "-qAt", "-v", "ON_ERROR_STOP=1",
  "-U", "tp01_bootstrap", "-d", "tp01",
]);
assert.equal(invocations[0].command, "docker");
assert.equal(invocations[0].options.env, composeInterpolation.environment);
assert.equal(invocations[0].environmentAtCall.PGPASSWORD, undefined);

assert.deepEqual(
  runDatabaseEvidenceJson({
    runCommand: fakeRun,
    sql: "SELECT runtime_security_evidence;",
    role: "tp01_runtime",
    composeEnvironment: composeInterpolation.environment,
    runtimePassword: runtimeCredential,
  }),
  { ok: true },
);
assert.deepEqual(invocations[1].args, [
  "compose", "exec", "-T", "-e", "PGPASSWORD", "postgres", "psql", "-X", "-qAt", "-v",
  "ON_ERROR_STOP=1", "-U", "tp01_runtime", "-d", "tp01",
]);
assert.notEqual(invocations[1].options.env, composeInterpolation.environment);
assert.equal(invocations[1].environmentAtCall.PGPASSWORD, runtimeCredential);
assert.equal(invocations[1].options.env.PGPASSWORD, undefined);
assert.equal(composeInterpolation.environment.PGPASSWORD, undefined);

let failedRuntimeEnvironment;
assert.throws(() => runDatabaseEvidenceJson({
  runCommand: (_command, _args, options) => {
    failedRuntimeEnvironment = options.env;
    throw new Error("simulated command failure");
  },
  sql: "SELECT failure;",
  role: "tp01_runtime",
  composeEnvironment: composeInterpolation.environment,
  runtimePassword: runtimeCredential,
}), /simulated command failure/);
assert.equal(failedRuntimeEnvironment.PGPASSWORD, undefined);
assert.throws(() => runDatabaseEvidenceJson({
  runCommand: fakeRun,
  sql: "SELECT missing_environment;",
  role: "tp01_bootstrap",
}), /explicit database evidence Compose environment/);
assert.throws(() => runDatabaseEvidenceJson({
  runCommand: fakeRun,
  sql: "SELECT non_minimized_environment;",
  role: "tp01_bootstrap",
  composeEnvironment: baseEnvironment,
}), /not minimized/);

const snapshotEnvironments = [];
const captureSnapshot = bindDatabaseEvidenceSnapshotCapture(
  (environment) => {
    snapshotEnvironments.push(environment);
    return { sequence: snapshotEnvironments.length };
  },
  composeInterpolation.environment,
);
assert.deepEqual(captureSnapshot(), { sequence: 1 });
assert.deepEqual(captureSnapshot(), { sequence: 2 });
assert.deepEqual(snapshotEnvironments, [
  composeInterpolation.environment,
  composeInterpolation.environment,
]);

const databaseEvidenceSource = readFileSync("scripts/database-evidence.mjs", "utf8");
assert.doesNotMatch(databaseEvidenceSource, /env:\s*process\.env/);
const proofRunSource = readFileSync("scripts/proof-run.mjs", "utf8");
assert.match(proofRunSource, /createDatabaseEvidenceComposeInterpolation\([\s\S]*"PROOF_RUN"/);
assert.match(
  proofRunSource,
  /const before = captureGovernedStateSnapshot\("STATE_SNAPSHOT_BEFORE"\)/,
);
assert.match(
  proofRunSource,
  /const after = captureGovernedStateSnapshot\("STATE_SNAPSHOT_AFTER"\)/,
);
assert.match(proofRunSource, /code: "STATE_SNAPSHOT_FAILED"/);
assert.match(proofRunSource, /appendOperationalStop\(deviations/);
assert.match(proofRunSource, /throw error/);
assert.match(proofRunSource, /clearDatabaseEvidenceComposeInterpolation\(composeInterpolation\)/);
assert.doesNotMatch(proofRunSource, /captureStateSnapshot\(\)/);

clearDatabaseEvidenceComposeInterpolation(composeInterpolation);
process.stdout.write("WP-65 database evidence Compose contract tests passed\n");
