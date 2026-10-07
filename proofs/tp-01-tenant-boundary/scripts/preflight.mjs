import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { createServer } from "node:net";
import { resolve } from "node:path";
import { assertExactNode } from "./runtime-contract.mjs";
import { assertExecutionAuthorized } from "./execution-authorization.mjs";

assertExactNode();
assertExecutionAuthorized();

const expected = Object.freeze({
  node: "v22.23.1",
  pnpm: "11.25.0",
  docker: "29.7.2",
  compose: "v5.4.0",
});

function command(command, args) {
  return execFileSync(command, args, { encoding: "utf8" }).trim();
}

async function assertPortFree(port) {
  await new Promise((resolvePromise, rejectPromise) => {
    const server = createServer();
    server.once("error", rejectPromise);
    server.listen({ host: "127.0.0.1", port }, () => {
      server.close(resolvePromise);
    });
  });
}

const observed = {
  node: process.version,
  pnpm: command("pnpm", ["--version"]),
  docker: command("docker", ["version", "--format", "{{.Client.Version}}"]),
  compose: command("docker", ["compose", "version", "--short"]),
};

for (const [name, value] of Object.entries(expected)) {
  if (observed[name] !== value) {
    throw new Error(`${name} mismatch: expected ${value}, observed ${observed[name]}`);
  }
}

for (const path of ["package.json", "tsconfig.json", "compose.yaml", "test/case-manifest.json"]) {
  if (!existsSync(resolve(path))) {
    throw new Error(`missing materialized artifact: ${path}`);
  }
}

await assertPortFree(43101);
await assertPortFree(55432);

process.stdout.write(`${JSON.stringify({ status: "PASS", observed })}\n`);
