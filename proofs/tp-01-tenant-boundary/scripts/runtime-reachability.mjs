import { randomBytes } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { connect } from "node:net";
import { resolve } from "node:path";
import { boundedDiagnosticText, run } from "./command.mjs";
import { assertExecutionAuthorized } from "./execution-authorization.mjs";
import {
  assertComposePublisher,
  assertDockerPortBinding,
  classifyRuntimeReachabilityPhase,
  createReachabilityComposeInspection,
  parseComposePsOutput,
} from "./runtime-reachability-contract.mjs";
import {
  appendOperationalStop,
  assertDeviationEvidence,
  createDeviationEvidence,
} from "./deviation-contract.mjs";

const { authorization, evidenceDirectory, packageId } = assertExecutionAuthorized();
const runId = process.env.TP01_RUN_ID;
if (!runId || runId !== authorization.runId) {
  throw new Error("runtime reachability is not bound to the authorized run");
}
mkdirSync(evidenceDirectory, { recursive: true });
const passPath = resolve(evidenceDirectory, "runtime-reachability.json");
const failurePath = resolve(evidenceDirectory, "runtime-reachability-failure.json");
rmSync(passPath, { force: true });
rmSync(failurePath, { force: true });
const phase = classifyRuntimeReachabilityPhase(readdirSync(evidenceDirectory));

function assertTcpReachable() {
  return new Promise((resolvePromise, rejectPromise) => {
    const socket = connect({ host: "127.0.0.1", port: 55432 });
    socket.setTimeout(3_000);
    socket.once("connect", () => {
      socket.destroy();
      resolvePromise("OPEN");
    });
    socket.once("timeout", () => {
      socket.destroy();
      rejectPromise(new Error("accepted loopback endpoint timed out"));
    });
    socket.once("error", (error) => {
      socket.destroy();
      rejectPromise(error);
    });
  });
}

let composeInterpolationEvidence = null;
try {
  const docker = assertDockerPortBinding(
    JSON.parse(
      run("docker", [
        "inspect",
        "--format",
        "{{json .NetworkSettings.Ports}}",
        "field-service-crm-tp01-postgres",
      ]),
    ),
  );
  const composeInspection = createReachabilityComposeInspection(
    process.env,
    randomBytes(32).toString("base64url"),
  );
  composeInterpolationEvidence = composeInspection.evidence;
  let composeOutput;
  try {
    composeOutput = run("docker", composeInspection.arguments, {
      env: composeInspection.environment,
    });
  } finally {
    composeInspection.environment.TP01_BOOTSTRAP_PASSWORD = "";
    delete composeInspection.environment.TP01_BOOTSTRAP_PASSWORD;
  }
  const compose = assertComposePublisher(parseComposePsOutput(composeOutput));
  const tcpReachability = await assertTcpReachable();
  writeFileSync(
    passPath,
    `${JSON.stringify({
      schemaVersion: 2,
      proof: "TP-01",
      packageId,
      runId,
      phase,
      status: "PASS",
      docker,
      compose,
      composeInterpolation: composeInspection.evidence,
      tcpReachability,
    }, null, 2)}\n`,
  );
} catch (error) {
  const diagnostic = boundedDiagnosticText(error?.message ?? String(error));
  writeFileSync(
    failurePath,
    `${JSON.stringify({
      schemaVersion: 1,
      proof: "TP-01",
      packageId,
      runId,
      phase,
      status: "FAIL_CLOSED",
      stage: "RUNTIME_REACHABILITY",
      composeInterpolation: composeInterpolationEvidence,
      diagnostic,
      commandDiagnostic: error?.diagnostic ?? null,
    }, null, 2)}\n`,
  );
  const deviationsPath = resolve(evidenceDirectory, "deviations.json");
  const deviations = existsSync(deviationsPath)
    ? assertDeviationEvidence(JSON.parse(readFileSync(deviationsPath, "utf8")))
    : createDeviationEvidence();
  const stopped = appendOperationalStop(deviations, {
    run: phase,
    stage: "RUNTIME_REACHABILITY",
    code: "RUNTIME_REACHABILITY_FAILED",
    evidenceArtifact: "runtime-reachability-failure.json",
  });
  writeFileSync(deviationsPath, `${JSON.stringify(stopped, null, 2)}\n`);
  throw error;
}
