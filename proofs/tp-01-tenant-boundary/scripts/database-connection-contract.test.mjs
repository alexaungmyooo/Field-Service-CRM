import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  assertDatabaseConnectionEnvironment,
  assertDatabaseConnectionEvidence,
  buildExactDatabaseUrl,
  exactDatabaseChildEnvironment,
  expectedDatabaseConnection,
} from "./database-connection-contract.mjs";

const runtimePassword = "runtime-password-value-that-is-long-enough+/=";
const databaseUrl = buildExactDatabaseUrl(runtimePassword);
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const authorization = {
  status: "ACCEPTED_FOR_EXECUTION",
  effective: true,
  checkpoint2Authorized: true,
  packageId: "WP-TEST",
  runId: "wp-test-run-01",
  databaseConnection: {
    schemaVersion: 1,
    ...expectedDatabaseConnection,
    runtimeCredentialSha256: sha256(runtimePassword),
    databaseUrlSha256: sha256(databaseUrl),
  },
};
const environment = {
  TP01_EXECUTION_PACKAGE: authorization.packageId,
  TP01_RUN_ID: authorization.runId,
  TP01_RUNTIME_PASSWORD: runtimePassword,
  TP01_DATABASE_URL: databaseUrl,
};
const evidence = assertDatabaseConnectionEnvironment(environment, authorization);
assert.deepEqual(
  {
    protocol: evidence.protocol,
    hostname: evidence.hostname,
    port: evidence.port,
    database: evidence.database,
    username: evidence.username,
  },
  expectedDatabaseConnection,
);
assert.equal(evidence.secretRetained, false);
assert.equal(JSON.stringify(evidence).includes(runtimePassword), false);
assert.equal(JSON.stringify(evidence).includes(databaseUrl), false);
assert.equal(evidence.packageId, authorization.packageId);
assert.equal(evidence.runId, authorization.runId);
assert.match(evidence.authorizationDatabaseBindingSha256, /^[a-f0-9]{64}$/);
assert.equal(assertDatabaseConnectionEvidence(evidence, authorization), evidence);
const childEnvironment = exactDatabaseChildEnvironment(environment, authorization);
assert.equal(childEnvironment.TP01_DATABASE_URL, databaseUrl);
assert.match(childEnvironment.TP01_DATABASE_AUTHORIZATION_BINDING_SHA256, /^[a-f0-9]{64}$/);
assert.match(childEnvironment.TP01_DATABASE_CONNECTION_VALIDATED, /^[a-f0-9]{64}$/);
assert.notEqual(childEnvironment.TP01_DATABASE_CONNECTION_VALIDATED, "EXACT_RUN_BOUND_V1");

const invalidEnvironments = [
  {},
  { TP01_RUNTIME_PASSWORD: runtimePassword },
  { TP01_DATABASE_URL: databaseUrl },
  { ...environment, TP01_DATABASE_URL: databaseUrl.replace("postgresql:", "postgres:") },
  { ...environment, TP01_DATABASE_URL: databaseUrl.replace("127.0.0.1", "localhost") },
  { ...environment, TP01_DATABASE_URL: databaseUrl.replace("55432", "5432") },
  { ...environment, TP01_DATABASE_URL: databaseUrl.replace("/tp01", "/other") },
  { ...environment, TP01_DATABASE_URL: databaseUrl.replace("tp01_runtime", "postgres") },
  { ...environment, TP01_DATABASE_URL: databaseUrl.replace(encodeURIComponent(runtimePassword), "wrong-password-value-that-is-long-enough") },
  { ...environment, TP01_DATABASE_URL: `${databaseUrl}?sslmode=disable` },
  { ...environment, TP01_DATABASE_URL: `${databaseUrl}#fragment` },
];
for (const invalid of invalidEnvironments) {
  assert.throws(() => assertDatabaseConnectionEnvironment(invalid, authorization));
}
assert.throws(() => assertDatabaseConnectionEnvironment(environment, undefined));
assert.throws(() => assertDatabaseConnectionEnvironment(
  { ...environment, TP01_EXECUTION_PACKAGE: "WP-OTHER" },
  authorization,
));
assert.throws(() => assertDatabaseConnectionEnvironment(
  { ...environment, TP01_RUN_ID: "wp-other-run" },
  authorization,
));
assert.throws(() => assertDatabaseConnectionEnvironment(environment, {
  ...authorization,
  databaseConnection: {
    ...authorization.databaseConnection,
    runtimeCredentialSha256: "0".repeat(64),
  },
}));
assert.throws(() => assertDatabaseConnectionEnvironment(environment, {
  ...authorization,
  databaseConnection: {
    ...authorization.databaseConnection,
    databaseUrlSha256: "0".repeat(64),
  },
}));
assert.throws(() => assertDatabaseConnectionEvidence(
  { ...evidence, password: "retained" },
  authorization,
));
assert.throws(() => assertDatabaseConnectionEvidence({ ...evidence, port: 5432 }, authorization));

process.stdout.write("WP-46 database connection contract tests passed\n");
