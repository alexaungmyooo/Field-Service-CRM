import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

interface HashEntry {
  readonly path: string;
  readonly sha256: string;
}

function sha256(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

export function assertExecutionAuthorized(): void {
  if (process.version !== "v22.23.1") throw new Error("TP-01 requires Node v22.23.1");
  if (process.env.TP01_EXECUTION_AUTHORIZATION !== "AUTHORIZED_BY_LATER_OWNER_PACKAGE") {
    throw new Error("TP-01 execution is not authorized by WP-19");
  }
  const packageId = process.env.TP01_EXECUTION_PACKAGE;
  const evidenceDirectory = process.env.TP01_EVIDENCE_DIR;
  if (!packageId?.startsWith("WP-") || !evidenceDirectory) {
    throw new Error("later execution package and private evidence directory are required");
  }
  const authorization = JSON.parse(
    readFileSync(resolve(evidenceDirectory, "authorization.json"), "utf8"),
  );
  const inventoryPath = resolve(
    "../../internal-local/work-packages/TP-01/evidence/materialization/artifact-hashes.json",
  );
  const inventoryBytes = readFileSync(inventoryPath);
  if (
    authorization.status !== "ACCEPTED_FOR_EXECUTION" ||
    authorization.packageId !== packageId ||
    authorization.proof !== "TP-01" ||
    authorization.artifactInventorySha256 !== sha256(inventoryBytes)
  ) {
    throw new Error("private authorization is not bound to the reviewed TP-01 inventory");
  }
  const inventory = JSON.parse(inventoryBytes.toString("utf8")) as { entries: HashEntry[] };
  for (const entry of inventory.entries) {
    if (sha256(readFileSync(resolve(entry.path))) !== entry.sha256) {
      throw new Error(`reviewed artifact changed: ${entry.path}`);
    }
  }
  const git = spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf8", cwd: resolve("../..") });
  if (git.status !== 0 || git.stdout.trim() !== authorization.repositoryRevision) {
    throw new Error("repository revision differs from the authorized execution revision");
  }
  const dirty = spawnSync("git", ["status", "--porcelain", "--", "proofs/tp-01-tenant-boundary"], {
    encoding: "utf8",
    cwd: resolve("../.."),
  });
  if (dirty.status !== 0 || dirty.stdout.trim()) {
    throw new Error("reviewed TP-01 path must be clean before execution");
  }
}
