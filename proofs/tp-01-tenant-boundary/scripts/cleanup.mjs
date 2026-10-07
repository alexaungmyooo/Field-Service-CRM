import { spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { existsSync, rmSync, writeFileSync } from "node:fs";
import { connect } from "node:net";
import { resolve } from "node:path";
import { run } from "./command.mjs";
import { assertExecutionAuthorized } from "./execution-authorization.mjs";
import { cleanupComposeEnvironment } from "./remediation-contract.mjs";

const { evidenceDirectory } = assertExecutionAuthorized();

function observePort(port) {
  return new Promise((resolvePromise, rejectPromise) => {
    const socket = connect({ host: "127.0.0.1", port });
    socket.setTimeout(1_000);
    socket.once("connect", () => {
      socket.destroy();
      resolvePromise("OPEN");
    });
    socket.once("timeout", () => {
      socket.destroy();
      rejectPromise(new Error(`port ${port} state could not be verified`));
    });
    socket.once("error", (error) => {
      if (error.code === "ECONNREFUSED") resolvePromise("CLOSED");
      else rejectPromise(error);
    });
  });
}

const dockerState = () => ({
  containers: run("docker", [
    "ps", "-a", "--filter", "name=field-service-crm-tp01-postgres", "--format", "{{.ID}}",
  ]),
  networks: run("docker", [
    "network", "ls", "--filter", "name=field-service-crm-tp01", "--format", "{{.ID}}",
  ]),
  volumes: run("docker", [
    "volume", "ls", "--filter", "name=field-service-crm-tp01-postgres-data", "--format", "{{.Name}}",
  ]),
});

const before = {
  processes: (() => {
    const observed = spawnSync("pgrep", ["-f", "field-service-crm-tp01"], { encoding: "utf8" });
    return observed.status === 0 && observed.stdout.trim() ? observed.stdout.trim() : "ABSENT";
  })(),
  listeners: {
    "127.0.0.1:43101": await observePort(43101),
    "127.0.0.1:55432": await observePort(55432),
  },
  docker: dockerState(),
  generated: {
    dist: existsSync(resolve("dist")),
    generated: existsSync(resolve("generated")),
    nodeModules: existsSync(resolve("node_modules")),
  },
  credentials: { envFile: existsSync(resolve(".env")) },
};

const cleanupInterpolation = cleanupComposeEnvironment(
  process.env,
  randomBytes(32).toString("base64url"),
);
try {
  run("docker", ["compose", "down", "--volumes", "--remove-orphans"], {
    env: cleanupInterpolation.environment,
  });
} finally {
  cleanupInterpolation.environment.TP01_BOOTSTRAP_PASSWORD = "";
  delete cleanupInterpolation.environment.TP01_BOOTSTRAP_PASSWORD;
}
for (const path of [resolve("dist"), resolve("generated"), resolve(".env"), resolve("node_modules")]) {
  rmSync(path, { recursive: true, force: true });
}
const closedPorts = await Promise.all([observePort(43101), observePort(55432)]);
if (closedPorts.some((state) => state !== "CLOSED")) {
  throw new Error("TP-01 listener remains after cleanup");
}

const residuals = dockerState();
if (Object.values(residuals).some(Boolean)) throw new Error("TP-01 Docker resources remain");
const processCheck = spawnSync("pgrep", ["-f", "field-service-crm-tp01"], { encoding: "utf8" });
if (processCheck.status === 0 && processCheck.stdout.trim()) {
  throw new Error("TP-01 process remains after cleanup");
}
if (existsSync(resolve(".env"))) throw new Error("generated TP-01 credential file remains");

const cleanup = {
  schemaVersion: 1,
  proof: "TP-01",
  status: "PASS",
  before,
  after: {
    processes: "ABSENT",
    listeners: { "127.0.0.1:43101": "CLOSED", "127.0.0.1:55432": "CLOSED" },
    docker: { container: "ABSENT", network: "ABSENT", volume: "ABSENT" },
    generated: { dist: "REMOVED", generated: "REMOVED", nodeModules: "REMOVED" },
    credentials: { envFile: "ABSENT", processEndsAfterRecord: true },
  },
  tools: { node: process.version, globalMutation: "NONE_PERFORMED_BY_PROOF_SCRIPTS" },
  composeInterpolation: {
    source: cleanupInterpolation.interpolationSource,
    valueRetained: false,
  },
  providers: { accounts: "NONE", recurringCost: "USD 0" },
  retained: ["proof source", "pnpm-lock.yaml", "private reviewed evidence"],
};
writeFileSync(resolve(evidenceDirectory, "cleanup.json"), `${JSON.stringify(cleanup, null, 2)}\n`);
