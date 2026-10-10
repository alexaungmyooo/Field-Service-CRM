import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { assertExactNode } from "./runtime-contract.mjs";
import { assertReproductionContextAuthorizationBinding } from "./reproduction-context-contract.mjs";

export function assertExecutionContextAuthorized({ packageId, runId, evidenceDirectory }) {
  if (!packageId?.startsWith("WP-") || !runId || !evidenceDirectory) {
    throw new Error("Later execution package, run ID, and private evidence directory are required");
  }
  const record = JSON.parse(
    readFileSync(resolve(evidenceDirectory, "authorization.json"), "utf8"),
  );
  const inventoryPath = resolve(
    "../../internal-local/work-packages/TP-01/evidence/materialization/artifact-hashes.json",
  );
  const inventoryBytes = readFileSync(inventoryPath);
  const inventorySha256 = createHash("sha256").update(inventoryBytes).digest("hex");
  if (
    record.status !== "ACCEPTED_FOR_EXECUTION" ||
    record.effective !== true ||
    record.checkpoint2Authorized !== true ||
    record.packageId !== packageId ||
    record.runId !== runId ||
    record.proof !== "TP-01" ||
    record.artifactInventorySha256 !== inventorySha256
  ) {
    throw new Error("Private authorization record does not match the requested execution package");
  }
  assertReproductionContextAuthorizationBinding(record);
  const inventory = JSON.parse(inventoryBytes.toString("utf8"));
  for (const entry of inventory.entries) {
    const actual = createHash("sha256").update(readFileSync(resolve(entry.path))).digest("hex");
    if (actual !== entry.sha256) throw new Error(`reviewed artifact changed: ${entry.path}`);
  }
  const repositoryRoot = resolve("../..");
  const revision = spawnSync("git", ["rev-parse", "HEAD"], {
    cwd: repositoryRoot,
    encoding: "utf8",
  });
  if (revision.status !== 0 || revision.stdout.trim() !== record.repositoryRevision) {
    throw new Error("repository revision differs from the authorized execution revision");
  }
  const dirty = spawnSync(
    "git",
    ["status", "--porcelain", "--", "proofs/tp-01-tenant-boundary"],
    { cwd: repositoryRoot, encoding: "utf8" },
  );
  if (dirty.status !== 0 || dirty.stdout.trim()) {
    throw new Error("reviewed TP-01 path must be clean before execution");
  }
  return { authorization: record, packageId, runId, evidenceDirectory };
}

export function assertExecutionAuthorized(environment = process.env) {
  assertExactNode();
  if (environment.TP01_EXECUTION_AUTHORIZATION !== "AUTHORIZED_BY_LATER_OWNER_PACKAGE") {
    throw new Error("TP-01 execution is not authorized by WP-19");
  }
  return assertExecutionContextAuthorized({
    packageId: environment.TP01_EXECUTION_PACKAGE,
    runId: environment.TP01_RUN_ID,
    evidenceDirectory: environment.TP01_EVIDENCE_DIR,
  });
}
