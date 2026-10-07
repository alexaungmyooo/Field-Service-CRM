import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { assertExactNode, inspectExactPnpm } from "./runtime-contract.mjs";

assertExactNode();
const pnpm = inspectExactPnpm();
const evidenceRoot = resolve("../../internal-local/work-packages/TP-01/evidence/materialization");
function capture(name, args) {
  const result = spawnSync(process.execPath, args, { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
  return { name, command: [process.execPath, ...args], status: result.status, stdout: result.stdout, stderr: result.stderr };
}
const checks = [
  capture("runtime-contract-syntax", ["--check", "scripts/runtime-contract.mjs"]),
  capture("exact-pnpm-syntax", ["--check", "scripts/exact-pnpm.mjs"]),
  capture("preflight-syntax", ["--check", "scripts/preflight.mjs"]),
  capture("exact-pnpm-version", ["scripts/exact-pnpm.mjs", "--version"]),
  capture("manifest", ["scripts/verify-case-manifest.mjs"]),
  capture("typecheck", ["scripts/typecheck.mjs"]),
];
if (checks.some((check) => check.status !== 0)) throw new Error("checkpoint static validation failed");
mkdirSync(evidenceRoot, { recursive: true });
writeFileSync(
  resolve(evidenceRoot, "static-validation.json"),
  `${JSON.stringify({ schemaVersion: 1, status: "PASS", node: process.version, pnpm, checks }, null, 2)}\n`,
);
process.stdout.write("static checkpoint evidence recorded\n");
