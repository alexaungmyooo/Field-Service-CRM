import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  CONTROL_CONTRACT,
  effectiveAuthorizationHash,
  modeMatches,
  sha256File,
  sourceTextIsNetworkSafe,
  validateAuthorization,
  verifyLedgerText,
} from "./control-launcher.mjs";

export const EXPECTED_PUBLIC_FILES = [
  ".gitignore",
  "AUTHORITY.md",
  "README.md",
  "schemas/artifact-manifest.schema.json",
  "schemas/effective-authorization.schema.json",
  "schemas/final-inventory.schema.json",
  "schemas/operation-ledger-entry.schema.json",
  "schemas/pre-action-receipt.schema.json",
  "test/control-static.test.mjs",
  "tool/control-launcher.mjs",
  "tool/verify-bundle.mjs",
  "tool/verify-control.mjs",
].sort();

function walk(root, directory = root) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(root, path));
    else if (entry.isFile()) files.push(relative(root, path).replaceAll("\\", "/"));
    else throw new Error("NON_REGULAR_PUBLIC_ENTRY");
  }
  return files.sort();
}

function assertMode(path, expected) {
  const actual = statSync(path).mode;
  if (!modeMatches(actual, expected)) throw new Error(`MODE:${path}:${(actual & 0o777).toString(8)}`);
}

function parse(argv) {
  const get = (name) => {
    const indexes = argv.flatMap((value, index) => (value === name ? [index] : []));
    if (indexes.length !== 1 || !argv[indexes[0] + 1]) throw new Error(`ARG:${name}`);
    return argv[indexes[0] + 1];
  };
  return { root: resolve(get("--root")), privateRoot: resolve(get("--private-root")) };
}

function validateReceipt(receipt, auth) {
  if (receipt.schema !== "wave-a-acquisition-pre-action-receipt-v2") throw new Error("RECEIPT_SCHEMA");
  if (receipt.runId !== auth.runId || receipt.head !== auth.publishedRevision || receipt.tree !== auth.repositoryTree) {
    throw new Error("RECEIPT_BINDING");
  }
  if (!Array.isArray(receipt.allowedPaths) || !Array.isArray(receipt.forbiddenPaths)) throw new Error("RECEIPT_PATHS");
  if (receipt.allowedPublicRoot !== CONTROL_CONTRACT.publicRoot || receipt.allowedPrivateRoot !== CONTROL_CONTRACT.privateRoot) {
    throw new Error("RECEIPT_ROOTS");
  }
  if (
    receipt.environmentBoundary?.network !== "PROHIBITED" ||
    receipt.environmentBoundary?.dependencies !== "PROHIBITED" ||
    receipt.environmentBoundary?.runtime !== "PROHIBITED"
  ) {
    throw new Error("RECEIPT_ENVIRONMENT");
  }
  if (!Array.isArray(receipt.processRuntimeResiduals) || !Array.isArray(receipt.ownershipAclEvidence)) {
    throw new Error("RECEIPT_RESIDUALS");
  }
}

function validateSourceCoverage(entries, publicRoot, found) {
  const latest = new Map();
  for (const entry of entries) {
    for (const mutation of entry.pathMutations) {
      if (mutation.authorityClass === "PUBLIC_CONTROL") latest.set(mutation.path, mutation);
    }
  }
  for (const path of found) {
    const mutation = latest.get(path);
    if (!mutation) throw new Error(`SOURCE_LEDGER_MISSING:${path}`);
    if (mutation.operation === "REMOVED" || mutation.afterSha256 !== sha256File(resolve(publicRoot, path))) {
      throw new Error(`SOURCE_LEDGER_HASH:${path}`);
    }
  }
  for (const [path, mutation] of latest) {
    if (!found.includes(path) && mutation.operation !== "REMOVED") throw new Error(`SOURCE_LEDGER_UNEXPECTED:${path}`);
  }
}

function validateFinalInventory(final, auth) {
  if (final.schema !== "wave-a-acquisition-final-inventory-v2" || final.runId !== auth.runId) {
    throw new Error("FINAL_INVENTORY_SCHEMA");
  }
  if (final.stage !== "PRIMARY_SEAL" || !Array.isArray(final.selfExclusions) || !Array.isArray(final.entries)) {
    throw new Error("FINAL_INVENTORY_SHAPE");
  }
  for (const entry of final.entries) {
    for (const field of ["path", "type", "size", "mode", "ownerIdentity", "sha256", "authorityClass", "stage", "publicationClass"]) {
      if (!(field in entry)) throw new Error(`FINAL_INVENTORY_FIELD:${field}`);
    }
    if (entry.stage !== "PRIMARY_SEAL") throw new Error("FINAL_INVENTORY_STAGE");
    if (entry.authorityClass === "PRIVATE_EVIDENCE" && entry.publicationClass !== "NEVER_PUBLISH") {
      throw new Error("FINAL_INVENTORY_PUBLICATION");
    }
  }
}

function verifyChecksumInventory(path) {
  const lines = readFileSync(path, "utf8").split("\n").filter(Boolean);
  for (const line of lines) {
    const match = /^([a-f0-9]{64})  (.+)$/.exec(line);
    if (!match) throw new Error("CHECKSUM_LINE");
    const candidate = resolve(process.cwd(), match[2]);
    if (sha256File(candidate) !== match[1]) throw new Error(`CHECKSUM_MISMATCH:${match[2]}`);
  }
  return lines.length;
}

export function verifyControl(root, privateRoot) {
  if (root !== resolve(process.cwd(), CONTROL_CONTRACT.publicRoot)) throw new Error("PUBLIC_ROOT_BINDING");
  if (privateRoot !== resolve(process.cwd(), CONTROL_CONTRACT.privateRoot)) throw new Error("PRIVATE_ROOT_BINDING");
  const found = walk(root);
  if (JSON.stringify(found) !== JSON.stringify(EXPECTED_PUBLIC_FILES)) throw new Error("PUBLIC_INVENTORY");
  for (const relativePath of found) {
    const path = resolve(root, relativePath);
    const text = readFileSync(path, "utf8");
    if (!sourceTextIsNetworkSafe(text)) throw new Error(`NETWORK_CAPABILITY:${relativePath}`);
    if (relativePath.endsWith(".json")) JSON.parse(text);
  }

  assertMode(privateRoot, 0o700);
  for (const entry of readdirSync(privateRoot, { withFileTypes: true })) {
    if (!entry.isFile()) throw new Error("PRIVATE_NON_FILE");
    assertMode(resolve(privateRoot, entry.name), 0o600);
  }

  const ownerPath = resolve(privateRoot, "owner-authorization.txt");
  const authPath = resolve(privateRoot, "authorization.json");
  const receiptPath = resolve(privateRoot, "pre-action-receipt.json");
  const ledgerPath = resolve(privateRoot, "operation-ledger.ndjson");
  const auth = JSON.parse(readFileSync(authPath, "utf8"));
  validateAuthorization(auth, { allowConsumed: true });
  if (sha256File(ownerPath) !== auth.ownerAuthorizationSha256) throw new Error("OWNER_HASH");
  validateReceipt(JSON.parse(readFileSync(receiptPath, "utf8")), auth);
  const authorityHash = effectiveAuthorizationHash(auth, authPath);
  const ledger = verifyLedgerText(readFileSync(ledgerPath, "utf8"), { authorityHash, runId: auth.runId });
  validateSourceCoverage(ledger, root, found);
  if (auth.state === "CONSUMED") {
    const last = ledger.at(-1);
    if (last.event !== "AUTHORIZATION_CONSUMED" || last.consumedAuthorizationSha256 !== sha256File(authPath)) {
      throw new Error("CONSUMPTION_LEDGER");
    }
    if (!ledger.some((entry) => entry.entryHash === auth.consumptionLedgerEntryHash && entry.event === "INVENTORY_SEAL")) {
      throw new Error("CONSUMPTION_SEAL_BINDING");
    }
    validateFinalInventory(JSON.parse(readFileSync(resolve(privateRoot, "final-inventory.json"), "utf8")), auth);
    verifyChecksumInventory(resolve(privateRoot, "primary-inventory.sha256"));
  }

  const publicEntries = found.map((path) => ({
    path,
    sha256: sha256File(resolve(root, path)),
    size: statSync(resolve(root, path)).size,
  }));
  return {
    result: "PASS",
    authorizationState: auth.state,
    authorityHash,
    publicFiles: found.length,
    privateFiles: readdirSync(privateRoot).length,
    ledgerEntries: ledger.length,
    sourcePathsCovered: found.length,
    publicEntries,
    publicAggregate: createHash("sha256")
      .update(publicEntries.map((entry) => `${entry.sha256}  ${entry.path}`).join("\n"))
      .digest("hex"),
  };
}

function main() {
  const { root, privateRoot } = parse(process.argv.slice(2));
  process.stdout.write(`${JSON.stringify(verifyControl(root, privateRoot))}\n`);
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}
