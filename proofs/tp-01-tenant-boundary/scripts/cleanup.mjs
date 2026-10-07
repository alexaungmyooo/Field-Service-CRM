import { spawnSync } from "node:child_process";
import { existsSync, rmSync, writeFileSync } from "node:fs";
import { connect } from "node:net";
import { resolve } from "node:path";
import { run } from "./command.mjs";
import { assertExecutionAuthorized } from "./execution-authorization.mjs";

const { evidenceDirectory } = assertExecutionAuthorized();

function assertPortClosed(port) {
  return new Promise((resolvePromise, rejectPromise) => {
    const socket = connect({ host: "127.0.0.1", port });
    socket.setTimeout(1_000);
    socket.once("connect", () => {
      socket.destroy();
      rejectPromise(new Error(`port ${port} remains open`));
    });
    socket.once("timeout", () => {
      socket.destroy();
      rejectPromise(new Error(`port ${port} closure could not be verified`));
    });
    socket.once("error", (error) => {
      if (error.code === "ECONNREFUSED") resolvePromise();
      else rejectPromise(error);
    });
  });
}

run("docker", ["compose", "down", "--volumes", "--remove-orphans"]);
for (const path of [resolve("dist"), resolve("generated"), resolve(".env"), resolve("node_modules")]) {
  rmSync(path, { recursive: true, force: true });
}
await Promise.all([assertPortClosed(43101), assertPortClosed(55432)]);

const residuals = {
  containers: run("docker", [
    "ps", "-a", "--filter", "name=field-service-crm-tp01-postgres", "--format", "{{.ID}}",
  ]),
  networks: run("docker", [
    "network", "ls", "--filter", "name=field-service-crm-tp01", "--format", "{{.ID}}",
  ]),
  volumes: run("docker", [
    "volume", "ls", "--filter", "name=field-service-crm-tp01-postgres-data", "--format", "{{.Name}}",
  ]),
};
if (Object.values(residuals).some(Boolean)) throw new Error("TP-01 Docker resources remain");
const processCheck = spawnSync("pgrep", ["-f", "field-service-crm-tp01"], { encoding: "utf8" });
if (processCheck.status === 0 && processCheck.stdout.trim()) {
  throw new Error("TP-01 process remains after cleanup");
}
if (existsSync(resolve(".env"))) throw new Error("generated TP-01 credential file remains");

const cleanup = {
  status: "PASS",
  processes: "ABSENT",
  listeners: { "127.0.0.1:43101": "CLOSED", "127.0.0.1:55432": "CLOSED" },
  docker: { container: "ABSENT", network: "ABSENT", volume: "ABSENT" },
  generated: { dist: "REMOVED", generated: "REMOVED", nodeModules: "REMOVED" },
  credentials: { envFile: "ABSENT", processEndsAfterRecord: true },
  tools: { node: process.version, globalMutation: "NONE_PERFORMED_BY_PROOF_SCRIPTS" },
  providers: { accounts: "NONE", recurringCost: "USD 0" },
  retained: ["proof source", "pnpm-lock.yaml", "private reviewed evidence"],
};
writeFileSync(resolve(evidenceDirectory, "cleanup.json"), `${JSON.stringify(cleanup, null, 2)}\n`);
