import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { assertExactNode } from "./runtime-contract.mjs";

assertExactNode();
const pnpmEntry = process.env.TP01_PNPM_ENTRY;
if (!pnpmEntry) throw new Error("TP01_PNPM_ENTRY is required");
const evidenceRoot = resolve("../../internal-local/work-packages/TP-01/evidence/materialization");

function install(args) {
  const result = spawnSync(process.execPath, [pnpmEntry, "install", ...args], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  return {
    command: [process.execPath, pnpmEntry, "install", ...args],
    status: result.status,
    signal: result.signal,
    stdout: result.stdout,
    stderr: result.stderr,
  };
}

const lockfileOnly = install(["--lockfile-only", "--ignore-scripts"]);
if (lockfileOnly.status !== 0) throw new Error(lockfileOnly.stderr || "lockfile-only install failed");
const frozen = install(["--frozen-lockfile", "--ignore-scripts"]);
if (frozen.status !== 0) throw new Error(frozen.stderr || "frozen install failed");
mkdirSync(evidenceRoot, { recursive: true });
writeFileSync(
  resolve(evidenceRoot, "dependency-materialization.json"),
  `${JSON.stringify(
    {
      schemaVersion: 1,
      status: "MATERIALIZED_NOT_EXECUTED",
      node: process.version,
      lifecycleScripts: "DISABLED_BY_BOTH_COMMANDS",
      lockfileOnly,
      frozen,
    },
    null,
    2,
  )}\n`,
);
process.stdout.write("dependency materialization evidence recorded\n");
