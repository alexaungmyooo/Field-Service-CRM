import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { connect } from "node:net";
import { resolve } from "node:path";
import { boundedDiagnosticText, run } from "./command.mjs";
import { assertExecutionAuthorized } from "./execution-authorization.mjs";
import {
  assertComposePublisher,
  assertDockerPortBinding,
  parseComposePsOutput,
} from "./runtime-reachability-contract.mjs";

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
  const compose = assertComposePublisher(
    parseComposePsOutput(run("docker", ["compose", "ps", "--format", "json", "postgres"])),
  );
  const tcpReachability = await assertTcpReachable();
  writeFileSync(
    passPath,
    `${JSON.stringify({
      schemaVersion: 1,
      proof: "TP-01",
      packageId,
      runId,
      status: "PASS",
      docker,
      compose,
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
      status: "FAIL_CLOSED",
      stage: "RUNTIME_REACHABILITY",
      diagnostic,
      commandDiagnostic: error?.diagnostic ?? null,
    }, null, 2)}\n`,
  );
  throw error;
}
