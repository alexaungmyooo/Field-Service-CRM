import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path) => readFileSync(resolve(path), "utf8");
const preflight = read("scripts/preflight.mjs");
const databaseEvidence = read("scripts/database-evidence.mjs");
const databaseReset = read("scripts/db-reset.mjs");
const proofRun = read("scripts/proof-run.mjs");
const evidenceVerify = read("scripts/evidence-verify.mjs");
const command = read("scripts/command.mjs");
const databaseSource = read("src/database.ts");
const executionAuthorization = read("scripts/execution-authorization.mjs");
const childExecutionAuthorization = read("src/execution-authorization.ts");
const environmentExample = read(".env.example");

assert.match(preflight, /assertDatabaseConnectionEnvironment\(process\.env, authorization\)/);
assert.equal(
  preflight.indexOf("assertDatabaseConnectionEnvironment(process.env, authorization)") <
    preflight.indexOf("docker\", [\"compose\", \"version\""),
  true,
);
assert.match(preflight, /databaseConnection,/);
assert.match(preflight, /createDeviationEvidence\(\)/);

assert.match(databaseEvidence, /assertDatabaseConnectionEnvironment\(process\.env, authorization\)/);
assert.match(databaseEvidence, /captureDatabaseConnectionEvidence/);
assert.match(databaseReset, /connectionContract: captureDatabaseConnectionEvidence\(\)/);

assert.match(proofRun, /exactDatabaseChildEnvironment\(process\.env, authorization\)/);
assert.match(proofRun, /env: \{ \.\.\.proofEnvironment, TP01_RESULT_FILE: resultFile/);
assert.match(proofRun, /appendOperationalStop\(deviations/);
assert.match(proofRun, /CHILD_EXIT_NONZERO/);

assert.match(
  evidenceVerify,
  /assertDatabaseConnectionEvidence\(environment\.databaseConnection, authorization\)/,
);
assert.match(
  evidenceVerify,
  /assertDatabaseConnectionEvidence\(databaseSecurity\.connectionContract, authorization\)/,
);
assert.match(evidenceVerify, /requireNoOperationalStops: true/);
assert.match(evidenceVerify, /TP01_DATABASE_URL\\s\*\[=:\]/);

assert.match(command, /environment\?\.TP01_DATABASE_URL/);
assert.match(command, /executablePathRetained: false/);
assert.doesNotMatch(command, /executable: sanitizeDiagnosticText\(command\)/);

assert.match(executionAuthorization, /record\.runId !== runId/);
assert.match(executionAuthorization, /record\.effective !== true/);
assert.match(executionAuthorization, /record\.checkpoint2Authorized !== true/);
assert.match(executionAuthorization, /return \{ authorization: record, packageId, runId, evidenceDirectory \}/);
assert.match(childExecutionAuthorization, /const runId = process\.env\.TP01_RUN_ID/);
assert.match(childExecutionAuthorization, /authorization\.runId !== runId/);
assert.match(childExecutionAuthorization, /authorization\.effective !== true/);
assert.match(childExecutionAuthorization, /authorization\.checkpoint2Authorized !== true/);
assert.match(environmentExample, /^TP01_RUNTIME_PASSWORD=$/m);
assert.match(environmentExample, /^TP01_DATABASE_URL=$/m);

assert.match(databaseSource, /TP01_DATABASE_CONNECTION_VALIDATED/);
assert.match(databaseSource, /TP01_DATABASE_AUTHORIZATION_BINDING_SHA256/);
assert.match(databaseSource, /TP01_DATABASE_CHILD_V1/);
assert.match(databaseSource, /validationMarker !== expectedMarker/);
assert.match(databaseSource, /validated TP01_DATABASE_URL is required/);
assert.match(databaseSource, /connectionString: ProofDatabase\.requiredDatabaseUrl\(\)/);
assert.doesNotMatch(databaseSource, /connectionString: process\.env\.TP01_DATABASE_URL/);

process.stdout.write("WP-46 execution environment integration tests passed\n");
