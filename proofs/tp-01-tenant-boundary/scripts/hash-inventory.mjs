import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { assertExactNode } from "./runtime-contract.mjs";

assertExactNode();

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = resolve(root, "../..");
const evidenceRoot = resolve(
  repositoryRoot,
  "internal-local/work-packages/TP-01/evidence/materialization",
);
const excluded = new Set(["node_modules", "generated", "dist", ".DS_Store", ".env"]);

function walk(path) {
  const files = [];
  for (const name of readdirSync(path).sort()) {
    if (excluded.has(name)) continue;
    const absolute = resolve(path, name);
    if (statSync(absolute).isDirectory()) files.push(...walk(absolute));
    else files.push(absolute);
  }
  return files;
}

const entries = walk(root).map((absolute) => {
  const bytes = readFileSync(absolute);
  return {
    path: relative(root, absolute),
    bytes: bytes.length,
    sha256: createHash("sha256").update(bytes).digest("hex"),
  };
});
mkdirSync(evidenceRoot, { recursive: true });
writeFileSync(
  resolve(evidenceRoot, "artifact-hashes.json"),
  `${JSON.stringify({ schemaVersion: 1, status: "MATERIALIZED_NOT_EXECUTED", entries }, null, 2)}\n`,
);
process.stdout.write(`hashed ${entries.length} checkpoint-1 files\n`);
