import { randomBytes } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { boundedDiagnosticText, run } from "./command.mjs";
import {
  createDatabaseResetComposeInterpolation,
  createDatabaseResetFailureEvidence,
  databaseResetSqlSteps,
} from "./db-reset-contract.mjs";
import {
  appendOperationalStop,
  assertDeviationEvidence,
  createDeviationEvidence,
} from "./deviation-contract.mjs";
import { assertExecutionAuthorized } from "./execution-authorization.mjs";
import {
  assertRuntimeReachabilityEvidence,
  classifyRuntimeReachabilityPhase,
} from "./runtime-reachability-contract.mjs";
import {
  captureDatabaseConnectionEvidence,
  captureDatabaseSecurityEvidence,
  captureFixtureEvidence,
} from "./database-evidence.mjs";

const { authorization, evidenceDirectory } = assertExecutionAuthorized();
const expectedReachabilityPhase = classifyRuntimeReachabilityPhase(readdirSync(evidenceDirectory));
assertRuntimeReachabilityEvidence(
  JSON.parse(readFileSync(resolve(evidenceDirectory, "runtime-reachability.json"), "utf8")),
  authorization,
  expectedReachabilityPhase,
);
const runtimePassword = process.env.TP01_RUNTIME_PASSWORD;
if (!runtimePassword) throw new Error("TP01_RUNTIME_PASSWORD is required");
let syntheticBootstrapPassword = randomBytes(32).toString("base64url");
const composeInterpolation = createDatabaseResetComposeInterpolation(
  process.env,
  syntheticBootstrapPassword,
);
const completedSqlSteps = [];
let attemptedSqlStep = null;
mkdirSync(evidenceDirectory, { recursive: true });

try {
  for (const name of databaseResetSqlSteps) {
    attemptedSqlStep = name;
    const args = ["compose", "exec", "-T", "postgres", "psql", "-U", "tp01_bootstrap", "-d", "tp01"];
    if (name === "001_roles.sql") args.push("--set", `runtime_password=${runtimePassword}`);
    run("docker", args, {
      env: composeInterpolation.environment,
      input: readFileSync(resolve("sql", name), "utf8"),
    });
    completedSqlSteps.push(name);
    attemptedSqlStep = null;
  }
  writeFileSync(
    resolve(evidenceDirectory, "fixture.json"),
    `${JSON.stringify(captureFixtureEvidence(), null, 2)}\n`,
  );
  writeFileSync(
    resolve(evidenceDirectory, "database-security.json"),
    `${JSON.stringify({
      ...captureDatabaseSecurityEvidence(),
      connectionContract: captureDatabaseConnectionEvidence(),
    }, null, 2)}\n`,
  );
} catch (error) {
  const failureArtifact = "database-reset-failure.json";
  const failure = createDatabaseResetFailureEvidence({
    packageId: authorization.packageId,
    runId: authorization.runId,
    phase: expectedReachabilityPhase,
    completedSqlSteps,
    attemptedSqlStep,
    diagnostic: boundedDiagnosticText(
      error?.message,
      undefined,
      [runtimePassword, syntheticBootstrapPassword, process.env.TP01_DATABASE_URL],
      [process.cwd()],
    ),
  });
  const deviationsPath = resolve(evidenceDirectory, "deviations.json");
  const deviations = existsSync(deviationsPath)
    ? assertDeviationEvidence(JSON.parse(readFileSync(deviationsPath, "utf8")))
    : createDeviationEvidence();
  const stopped = appendOperationalStop(deviations, {
    run: expectedReachabilityPhase,
    stage: "DB_RESET",
    code: "DATABASE_RESET_FAILED",
    evidenceArtifact: failureArtifact,
  });
  writeFileSync(
    resolve(evidenceDirectory, failureArtifact),
    `${JSON.stringify(failure, null, 2)}\n`,
    { mode: 0o600 },
  );
  writeFileSync(deviationsPath, `${JSON.stringify(stopped, null, 2)}\n`, { mode: 0o600 });
  throw error;
} finally {
  composeInterpolation.environment.TP01_BOOTSTRAP_PASSWORD = "";
  delete composeInterpolation.environment.TP01_BOOTSTRAP_PASSWORD;
  syntheticBootstrapPassword = null;
}
