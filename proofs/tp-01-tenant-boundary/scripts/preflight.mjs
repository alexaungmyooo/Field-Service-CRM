import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { arch, hostname, platform, release } from "node:os";
import { createServer } from "node:net";
import { resolve } from "node:path";
import { assertExactNode } from "./runtime-contract.mjs";
import { assertExecutionAuthorized } from "./execution-authorization.mjs";

assertExactNode();
const { packageId, evidenceDirectory } = assertExecutionAuthorized();

const expected = Object.freeze({
  node: "v22.23.1",
  pnpm: "11.25.0",
  docker: "29.7.2",
  compose: "v5.4.0",
});

function command(commandName, args, options = {}) {
  return execFileSync(commandName, args, { encoding: "utf8", ...options }).trim();
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

const repositoryRoot = resolve("../..");
const revision = command("git", ["rev-parse", "HEAD"], { cwd: repositoryRoot });
const tree = command("git", ["rev-parse", "HEAD^{tree}"], { cwd: repositoryRoot });
const proofStatus = command(
  "git",
  ["status", "--porcelain", "--", "proofs/tp-01-tenant-boundary"],
  { cwd: repositoryRoot },
);
if (proofStatus) throw new Error("TP-01 proof path is dirty");

const resourceState = {
  containers: command("docker", [
    "ps", "-a", "--filter", "name=field-service-crm-tp01-postgres", "--format", "{{.ID}}",
  ]),
  networks: command("docker", [
    "network", "ls", "--filter", "name=field-service-crm-tp01", "--format", "{{.ID}}",
  ]),
  volumes: command("docker", [
    "volume", "ls", "--filter", "name=field-service-crm-tp01-postgres-data", "--format", "{{.Name}}",
  ]),
};
if (Object.values(resourceState).some(Boolean)) {
  throw new Error("TP-01 Docker resources already exist before preflight");
}
const processState = spawnSync("pgrep", ["-f", "field-service-crm-tp01"], { encoding: "utf8" });
if (processState.status === 0 && processState.stdout.trim()) {
  throw new Error("TP-01 process already exists before preflight");
}

const inventoryPath = resolve(
  "../../internal-local/work-packages/TP-01/evidence/materialization/artifact-hashes.json",
);
const inventoryBytes = readFileSync(inventoryPath);
const authorizationBytes = readFileSync(resolve(evidenceDirectory, "authorization.json"));
const materializationRoot = resolve(
  "../../internal-local/work-packages/TP-01/evidence/materialization",
);
const supplyChainFiles = [
  "supply-chain-summary.json",
  "dependency-tree.json",
  "licenses.json",
  "audit.json",
];
mkdirSync(evidenceDirectory, { recursive: true });
const hashBytes = (bytes) => createHash("sha256").update(bytes).digest("hex");
const supplyChain = {
  schemaVersion: 1,
  proof: "TP-01",
  source: "CHECKPOINT_1_REVIEWED_MATERIALIZATION",
  files: Object.fromEntries(supplyChainFiles.map((name) => {
    const bytes = readFileSync(resolve(materializationRoot, name));
    return [name, { bytes: bytes.length, sha256: hashBytes(bytes) }];
  })),
};
writeFileSync(
  resolve(evidenceDirectory, "supply-chain.json"),
  `${JSON.stringify(supplyChain, null, 2)}\n`,
);
const caseManifestBytes = readFileSync("test/case-manifest.json");
writeFileSync(resolve(evidenceDirectory, "case-manifest.json"), caseManifestBytes);
if (!existsSync(resolve(evidenceDirectory, "deviations.json"))) {
  writeFileSync(
    resolve(evidenceDirectory, "deviations.json"),
    `${JSON.stringify({ schemaVersion: 1, proof: "TP-01", deviations: [] }, null, 2)}\n`,
  );
}

const environment = {
  schemaVersion: 1,
  proof: "TP-01",
  packageId,
  capturedAt: new Date().toISOString(),
  host: { hostname: hostname(), platform: platform(), release: release(), architecture: arch() },
  tools: observed,
  expectedTools: expected,
  image: {
    reference: "postgres@sha256:afc7e2d441324c0388fa80c3d24f733b4194a4eb7f47dd8ee2b08eb1a24a647c",
    platform: "linux/arm64/v8",
    verified: false,
    verificationArtifact: "image.json",
  },
  repository: { revision, tree, proofPathClean: true },
  bindings: {
    authorizationSha256: hashBytes(authorizationBytes),
    artifactInventorySha256: hashBytes(inventoryBytes),
    caseManifestSha256: hashBytes(caseManifestBytes),
  },
  initialState: {
    listeners: { "127.0.0.1:43101": "CLOSED", "127.0.0.1:55432": "CLOSED" },
    docker: { container: "ABSENT", network: "ABSENT", volume: "ABSENT" },
    processes: "ABSENT",
  },
};
writeFileSync(
  resolve(evidenceDirectory, "environment.json"),
  `${JSON.stringify(environment, null, 2)}\n`,
);

process.stdout.write(`${JSON.stringify({ status: "PASS", observed, revision, tree })}\n`);
