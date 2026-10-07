import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { assertExactNode } from "./runtime-contract.mjs";

assertExactNode();

const pnpmEntry = process.env.TP01_PNPM_ENTRY ?? process.env.npm_execpath;
if (!pnpmEntry) {
  throw new Error("Set TP01_PNPM_ENTRY or run through the pinned pnpm command");
}

function runPnpm(args) {
  return spawnSync(process.execPath, [pnpmEntry, ...args], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
}

const evidenceRoot = resolve(
  "../../internal-local/work-packages/TP-01/evidence/materialization",
);
mkdirSync(evidenceRoot, { recursive: true });

function capture(name, args) {
  const result = runPnpm(args);
  const record = {
    command: [process.execPath, pnpmEntry, ...args],
    status: result.status,
    signal: result.signal,
    stdout: result.stdout,
    stderr: result.stderr,
  };
  writeFileSync(resolve(evidenceRoot, `${name}.json`), `${JSON.stringify(record, null, 2)}\n`);
  return record;
}

const tree = capture("dependency-tree", ["list", "--depth", "Infinity", "--json"]);
const licenses = capture("licenses", ["licenses", "list", "--json"]);
const audit = capture("audit", ["audit", "--json"]);
const lock = readFileSync("pnpm-lock.yaml");
const packageFile = readFileSync("package.json");
const summary = {
  schemaVersion: 1,
  status: "MATERIALIZED_NOT_EXECUTED",
  node: process.version,
  pnpm: runPnpm(["--version"]).stdout.trim(),
  lockSha256: createHash("sha256").update(lock).digest("hex"),
  packageSha256: createHash("sha256").update(packageFile).digest("hex"),
  commands: {
    dependencyTree: tree.status,
    licenses: licenses.status,
    audit: audit.status,
  },
};
writeFileSync(resolve(evidenceRoot, "supply-chain-summary.json"), `${JSON.stringify(summary, null, 2)}\n`);
process.stdout.write(`${JSON.stringify(summary)}\n`);
