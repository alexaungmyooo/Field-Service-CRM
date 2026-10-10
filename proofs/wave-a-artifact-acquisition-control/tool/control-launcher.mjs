import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  closeSync,
  fsyncSync,
  openSync,
  readdirSync,
  readFileSync,
  statSync,
  truncateSync,
  writeSync,
} from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const CONTROL_CONTRACT = Object.freeze({
  publicRoot: "proofs/wave-a-artifact-acquisition-control/",
  privateRoot: "internal-local/work-packages/WP-109/",
  authorizationPath: "internal-local/work-packages/WP-109/authorization.json",
  ledgerPath: "internal-local/work-packages/WP-109/operation-ledger.ndjson",
  inventoryPath: "internal-local/work-packages/WP-109/primary-inventory.sha256",
  finalInventoryPath: "internal-local/work-packages/WP-109/final-inventory.json",
  revision: "f17ba0474d3a40f7f46aab05226b67f720f0d574",
  tree: "41b8cb5ae1e9b3a84ae579f27de851b7c63b7d4c",
});

const CLOSED_FLAGS = [
  "network",
  "download",
  "artifactAcquisition",
  "sdkOrCacheMutation",
  "dependencyRestore",
  "waveAProofMaterialization",
  "build",
  "device",
  "runtime",
  "proofExecution",
  "applicationCoding",
  "architectureSelection",
  "infrastructure",
  "deployment",
  "providerOrCost",
  "customerOrLiveData",
  "commitOrPush",
];

const EXECUTION_STAGES = new Set([
  "STATIC_BUNDLE_SELF_TEST",
  "STATIC_TESTS",
  "STATIC_CONTROL_VERIFY",
  "PRIMARY_SEAL",
]);
const LEDGER_STAGES = new Set(["BOOTSTRAP", "SOURCE_MATERIALIZATION", ...EXECUTION_STAGES]);
const LEDGER_EVENTS = new Set([
  "AUTHORIZATION_BOUND",
  "NODE_BOUND",
  "PATH_MUTATION",
  "COMMAND_INTENT",
  "COMMAND_RESULT",
  "INVENTORY_SEAL",
  "AUTHORIZATION_CONSUMED",
]);
const MUTATION_OPERATIONS = new Set(["CREATED", "UPDATED", "REMOVED", "UNCHANGED_BASELINE"]);
const HASH = /^[a-f0-9]{64}$/;

export function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

export function sha256Text(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function sha256File(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

export function validateSafeRelativePath(path) {
  if (!path || isAbsolute(path) || path.includes("\0")) throw new Error("UNSAFE_PATH");
  const normalized = path.replaceAll("\\", "/");
  if (normalized.split("/").some((part) => part === ".." || part === "" || part === ".")) {
    throw new Error("UNSAFE_PATH");
  }
  return normalized;
}

export function modeMatches(actualMode, expectedMode) {
  return (actualMode & 0o777) === expectedMode;
}

export function sourceTextIsNetworkSafe(text) {
  return !/node:(http|https|http2|net|tls|dns|dgram)|\bfetch\s*\(|\bWebSocket\b/.test(text);
}

export function validateCleanupTargets(paths, allowedRoot) {
  const root = resolve(allowedRoot);
  for (const path of paths) {
    const candidate = resolve(path);
    if (candidate === root || !candidate.startsWith(`${root}/`)) throw new Error("CLEANUP_PATH");
  }
  return true;
}

function sameMembers(left, right) {
  return canonicalJson([...left].sort()) === canonicalJson([...right].sort());
}

export function validateAuthorization(auth, options = {}) {
  const now = options.now ?? new Date();
  const allowConsumed = options.allowConsumed === true;
  if (auth.schema !== "wave-a-acquisition-effective-authorization-v2") throw new Error("AUTH_SCHEMA");
  if (auth.singleUse !== true) throw new Error("AUTH_SINGLE_USE");
  if (auth.state === "EFFECTIVE") {
    if (auth.consumed !== false) throw new Error("AUTH_STATE");
  } else if (auth.state === "CONSUMED") {
    if (
      auth.consumed !== true ||
      !HASH.test(auth.effectiveAuthorizationSha256 ?? "") ||
      !HASH.test(auth.consumptionLedgerEntryHash ?? "") ||
      Number.isNaN(Date.parse(auth.consumedAt ?? ""))
    ) {
      throw new Error("AUTH_CONSUMPTION");
    }
    if (!allowConsumed) throw new Error("AUTH_CONSUMED");
  } else {
    throw new Error("AUTH_STATE");
  }
  if (auth.publishedRevision !== CONTROL_CONTRACT.revision) throw new Error("AUTH_REVISION");
  if (auth.repositoryTree !== CONTROL_CONTRACT.tree) throw new Error("AUTH_TREE");
  if (auth.operator !== "/root") throw new Error("AUTH_OPERATOR");
  if (auth.state === "EFFECTIVE" && !(new Date(auth.validFrom) <= now && now < new Date(auth.expiresAt))) {
    throw new Error("AUTH_TIME");
  }
  if (auth.allowedPublicRoot !== CONTROL_CONTRACT.publicRoot) throw new Error("AUTH_PUBLIC_ROOT");
  if (auth.allowedPrivateRoot !== CONTROL_CONTRACT.privateRoot) throw new Error("AUTH_PRIVATE_ROOT");
  if (auth.expectedAuthorizationPath !== CONTROL_CONTRACT.authorizationPath) throw new Error("AUTH_AUTHORIZATION_PATH");
  if (auth.expectedLedgerPath !== CONTROL_CONTRACT.ledgerPath) throw new Error("AUTH_LEDGER_PATH");
  if (auth.expectedInventoryPath !== CONTROL_CONTRACT.inventoryPath) throw new Error("AUTH_INVENTORY_PATH");
  if (auth.expectedFinalInventoryPath !== CONTROL_CONTRACT.finalInventoryPath) {
    throw new Error("AUTH_FINAL_INVENTORY_PATH");
  }
  if (!sameMembers(auth.allowedStages ?? [], EXECUTION_STAGES)) throw new Error("AUTH_STAGES");
  for (const flag of CLOSED_FLAGS) {
    if (auth.actionFlags?.[flag] !== false) throw new Error(`AUTH_CLOSED_FLAG:${flag}`);
  }
  if (options.requiredFlag && auth.actionFlags?.[options.requiredFlag] !== true) {
    throw new Error(`AUTH_REQUIRED_FLAG:${options.requiredFlag}`);
  }
  if (!auth.nodeBinding?.path || !auth.nodeBinding?.version || !HASH.test(auth.nodeBinding?.sha256 ?? "")) {
    throw new Error("AUTH_NODE_BINDING");
  }
  if (!Array.isArray(auth.allowedCommands) || auth.allowedCommands.length === 0) throw new Error("AUTH_COMMANDS");
  for (const command of auth.allowedCommands) {
    if (!EXECUTION_STAGES.has(command.stage) || command.stage === "PRIMARY_SEAL") throw new Error("AUTH_COMMAND_STAGE");
    if (!command.executable || !Array.isArray(command.arguments)) throw new Error("AUTH_COMMAND");
  }
  return true;
}

export function effectiveAuthorizationHash(auth, authorizationPath) {
  if (auth.state === "CONSUMED") return auth.effectiveAuthorizationSha256;
  return sha256File(authorizationPath);
}

export function computeEntryHash(entry) {
  const payload = { ...entry };
  delete payload.entryHash;
  return sha256Text(canonicalJson(payload));
}

function validateMutation(mutation) {
  validateSafeRelativePath(mutation.path);
  if (!MUTATION_OPERATIONS.has(mutation.operation)) throw new Error("LEDGER_MUTATION_OPERATION");
  if (mutation.beforeSha256 !== null && !HASH.test(mutation.beforeSha256 ?? "")) throw new Error("LEDGER_MUTATION_BEFORE");
  if (mutation.afterSha256 !== null && !HASH.test(mutation.afterSha256 ?? "")) throw new Error("LEDGER_MUTATION_AFTER");
  if (!new Set(["PUBLIC_CONTROL", "PRIVATE_EVIDENCE"]).has(mutation.authorityClass)) {
    throw new Error("LEDGER_MUTATION_CLASS");
  }
}

export function verifyLedgerText(text, options = {}) {
  const authorityHash = options.authorityHash;
  const expectedRunId = options.runId;
  if (!HASH.test(authorityHash ?? "")) throw new Error("LEDGER_AUTHORITY_INPUT");
  const lines = text.split("\n").filter(Boolean);
  if (lines.length === 0) throw new Error("LEDGER_EMPTY");
  let previous = authorityHash;
  let runId = expectedRunId ?? null;
  const entries = lines.map((line, index) => {
    const entry = JSON.parse(line);
    if (entry.sequence !== index) throw new Error("LEDGER_SEQUENCE");
    if (runId === null) runId = entry.runId;
    if (entry.runId !== runId) throw new Error("LEDGER_RUN_ID");
    if (entry.authorityHash !== authorityHash) throw new Error("LEDGER_AUTHORITY_HASH");
    if (entry.previousHash !== previous) throw new Error("LEDGER_CHAIN");
    if (!LEDGER_STAGES.has(entry.stage)) throw new Error("LEDGER_STAGE");
    if (!LEDGER_EVENTS.has(entry.event)) throw new Error("LEDGER_EVENT");
    if (!Array.isArray(entry.pathMutations)) throw new Error("LEDGER_MUTATIONS_REQUIRED");
    entry.pathMutations.forEach(validateMutation);
    if (entry.event === "PATH_MUTATION" && entry.pathMutations.length === 0) throw new Error("LEDGER_MUTATION_EMPTY");
    if (entry.event === "COMMAND_RESULT") {
      if (!Number.isInteger(entry.exitCode) || !HASH.test(entry.stdoutSha256 ?? "") || !HASH.test(entry.stderrSha256 ?? "")) {
        throw new Error("LEDGER_COMMAND_RESULT");
      }
    }
    if (computeEntryHash(entry) !== entry.entryHash) throw new Error("LEDGER_HASH");
    previous = entry.entryHash;
    return entry;
  });
  return entries;
}

export function commandIsAllowed(auth, stage, executable, args) {
  return auth.allowedStages.includes(stage) && auth.allowedCommands.some(
    (candidate) =>
      candidate.stage === stage &&
      candidate.executable === executable &&
      canonicalJson(candidate.arguments) === canonicalJson(args),
  );
}

export function validateInvocationBinding(parsed, auth, cwd = process.cwd()) {
  const expectedAuthorization = resolve(cwd, CONTROL_CONTRACT.authorizationPath);
  const expectedLedger = resolve(cwd, CONTROL_CONTRACT.ledgerPath);
  if (resolve(parsed.authorizationPath) !== expectedAuthorization) throw new Error("LAUNCHER_AUTH_PATH");
  if (resolve(parsed.ledgerPath) !== expectedLedger) throw new Error("LAUNCHER_LEDGER_PATH");
  if (!auth.allowedStages.includes(parsed.stage) || !EXECUTION_STAGES.has(parsed.stage)) throw new Error("LAUNCHER_STAGE");
  return true;
}

export function consumedAuthorization(auth, authorityHash, ledgerEntryHash, consumedAt) {
  if (auth.state !== "EFFECTIVE" || auth.consumed !== false) throw new Error("AUTH_NOT_EFFECTIVE");
  if (!HASH.test(authorityHash) || !HASH.test(ledgerEntryHash)) throw new Error("AUTH_CONSUME_HASH");
  return {
    ...auth,
    state: "CONSUMED",
    consumed: true,
    consumedAt,
    effectiveAuthorizationSha256: authorityHash,
    consumptionLedgerEntryHash: ledgerEntryHash,
  };
}

function assertMode(path, expected) {
  const actual = statSync(path).mode;
  if (!modeMatches(actual, expected)) throw new Error(`MODE:${path}:${(actual & 0o777).toString(8)}`);
}

function appendLedger(path, entry) {
  assertMode(path, 0o600);
  const descriptor = openSync(path, "a");
  try {
    writeSync(descriptor, `${canonicalJson(entry)}\n`);
    fsyncSync(descriptor);
  } finally {
    closeSync(descriptor);
  }
}

function walkFiles(root, directory = root) {
  const paths = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) paths.push(...walkFiles(root, path));
    else if (entry.isFile()) paths.push(path);
    else throw new Error("INVENTORY_NON_REGULAR_ENTRY");
  }
  return paths.sort();
}

function snapshotPublic(publicRoot) {
  return new Map(walkFiles(publicRoot).map((path) => [relative(publicRoot, path).replaceAll("\\", "/"), sha256File(path)]));
}

function diffSnapshots(before, after) {
  const mutations = [];
  for (const path of [...new Set([...before.keys(), ...after.keys()])].sort()) {
    const beforeSha256 = before.get(path) ?? null;
    const afterSha256 = after.get(path) ?? null;
    if (beforeSha256 === afterSha256) continue;
    mutations.push({
      path,
      operation: beforeSha256 === null ? "CREATED" : afterSha256 === null ? "REMOVED" : "UPDATED",
      beforeSha256,
      afterSha256,
      authorityClass: "PUBLIC_CONTROL",
    });
  }
  return mutations;
}

function writeSecureFile(path, content) {
  assertMode(path, 0o600);
  const descriptor = openSync(path, "r+");
  try {
    truncateSync(path, 0);
    writeSync(descriptor, content);
    fsyncSync(descriptor);
  } finally {
    closeSync(descriptor);
  }
}

function nextEntry(ledgerPath, authorityHash, runId, base) {
  const entries = verifyLedgerText(readFileSync(ledgerPath, "utf8"), { authorityHash, runId });
  const last = entries.at(-1);
  const entry = {
    ...base,
    authorityHash,
    pathMutations: base.pathMutations ?? [],
    previousHash: last.entryHash,
    runId,
    sequence: last.sequence + 1,
  };
  return { ...entry, entryHash: computeEntryHash(entry) };
}

function parseArguments(argv) {
  const separator = argv.indexOf("--");
  if (separator < 0) throw new Error("ARG_SEPARATOR");
  const options = argv.slice(0, separator);
  const command = argv.slice(separator + 1);
  const get = (name) => {
    const indexes = options.flatMap((value, index) => (value === name ? [index] : []));
    if (indexes.length !== 1 || !options[indexes[0] + 1]) throw new Error(`ARG:${name}`);
    return options[indexes[0] + 1];
  };
  if (command.length === 0) throw new Error("ARG_COMMAND");
  return {
    authorizationPath: get("--authorization"),
    ledgerPath: get("--ledger"),
    stage: get("--stage"),
    executable: command[0],
    commandArguments: command.slice(1),
  };
}

function parseSealArguments(argv) {
  const get = (name) => {
    const indexes = argv.flatMap((value, index) => (value === name ? [index] : []));
    if (indexes.length !== 1 || !argv[indexes[0] + 1]) throw new Error(`ARG:${name}`);
    return argv[indexes[0] + 1];
  };
  return {
    authorizationPath: get("--authorization"),
    ledgerPath: get("--ledger"),
    stage: get("--stage"),
    inventoryPath: resolve(get("--seal-inventory")),
    finalInventoryPath: resolve(get("--final-inventory")),
    publicRoot: resolve(get("--root")),
    privateRoot: resolve(get("--private-root")),
  };
}

function validateBoundNode(auth) {
  const nodePath = resolve(process.execPath);
  if (nodePath !== resolve(auth.nodeBinding.path)) throw new Error("NODE_PATH");
  if (process.version !== auth.nodeBinding.version) throw new Error("NODE_VERSION");
  if (sha256File(nodePath) !== auth.nodeBinding.sha256) throw new Error("NODE_HASH");
}

function finalInventory(publicRoot, privateRoot) {
  const excluded = new Set([
    resolve(privateRoot, "primary-inventory.sha256"),
    resolve(privateRoot, "final-inventory.json"),
    resolve(privateRoot, "validator-attestation.md"),
    resolve(privateRoot, "independent-validation.md"),
  ]);
  const records = [
    ...walkFiles(publicRoot).map((path) => ({ path, authorityClass: "PUBLIC_CONTROL", publicationClass: "PUBLISHABLE_CANDIDATE" })),
    ...walkFiles(privateRoot)
      .filter((path) => !excluded.has(resolve(path)))
      .map((path) => ({ path, authorityClass: "PRIVATE_EVIDENCE", publicationClass: "NEVER_PUBLISH" })),
  ];
  return {
    schema: "wave-a-acquisition-final-inventory-v2",
    runId: "wp109-2026-10-10-01",
    stage: "PRIMARY_SEAL",
    selfExclusions: [
      "internal-local/work-packages/WP-109/primary-inventory.sha256",
      "internal-local/work-packages/WP-109/final-inventory.json",
      "internal-local/work-packages/WP-109/validator-attestation.md",
      "internal-local/work-packages/WP-109/independent-validation.md",
    ],
    entries: records
      .map(({ path, authorityClass, publicationClass }) => {
        const stat = statSync(path);
        return {
          path: relative(process.cwd(), path).replaceAll("\\", "/"),
          type: "file",
          size: stat.size,
          mode: `0${(stat.mode & 0o777).toString(8).padStart(3, "0")}`,
          ownerIdentity: `uid:${stat.uid}`,
          sha256: sha256File(path),
          authorityClass,
          stage: "PRIMARY_SEAL",
          publicationClass,
        };
      })
      .sort((left, right) => left.path.localeCompare(right.path)),
  };
}

function checksumInventory(publicRoot, privateRoot, finalInventoryPath, inventoryPath) {
  const excluded = new Set([
    resolve(inventoryPath),
    resolve(privateRoot, "validator-attestation.md"),
    resolve(privateRoot, "independent-validation.md"),
  ]);
  const paths = [...walkFiles(publicRoot), ...walkFiles(privateRoot)].filter((path) => !excluded.has(resolve(path)));
  if (!paths.includes(finalInventoryPath)) throw new Error("FINAL_INVENTORY_MISSING");
  return `${paths
    .map((path) => `${sha256File(path)}  ${relative(process.cwd(), path).replaceAll("\\", "/")}`)
    .sort()
    .join("\n")}\n`;
}

function sealInventory(argv) {
  const parsed = parseSealArguments(argv);
  const auth = JSON.parse(readFileSync(parsed.authorizationPath, "utf8"));
  validateAuthorization(auth, { requiredFlag: "sealInventory" });
  validateInvocationBinding(parsed, auth);
  if (parsed.stage !== "PRIMARY_SEAL") throw new Error("SEAL_STAGE");
  validateBoundNode(auth);
  const expectedPublic = resolve(process.cwd(), CONTROL_CONTRACT.publicRoot);
  const expectedPrivate = resolve(process.cwd(), CONTROL_CONTRACT.privateRoot);
  if (parsed.publicRoot !== expectedPublic || parsed.privateRoot !== expectedPrivate) throw new Error("SEAL_ROOT");
  if (parsed.inventoryPath !== resolve(process.cwd(), CONTROL_CONTRACT.inventoryPath)) throw new Error("SEAL_INVENTORY_PATH");
  if (parsed.finalInventoryPath !== resolve(process.cwd(), CONTROL_CONTRACT.finalInventoryPath)) {
    throw new Error("SEAL_FINAL_INVENTORY_PATH");
  }
  assertMode(expectedPrivate, 0o700);
  const authorityHash = effectiveAuthorizationHash(auth, parsed.authorizationPath);
  const publicSnapshot = snapshotPublic(expectedPublic);
  const sealEntry = nextEntry(parsed.ledgerPath, authorityHash, auth.runId, {
    event: "INVENTORY_SEAL",
    stage: parsed.stage,
    timestamp: new Date().toISOString(),
    pathMutations: [],
    publicAggregate: sha256Text([...publicSnapshot.entries()].map(([path, hash]) => `${hash}  ${path}`).join("\n")),
  });
  appendLedger(parsed.ledgerPath, sealEntry);
  const consumed = consumedAuthorization(auth, authorityHash, sealEntry.entryHash, new Date().toISOString());
  const beforeAuthHash = sha256File(parsed.authorizationPath);
  writeSecureFile(parsed.authorizationPath, `${JSON.stringify(consumed, null, 2)}\n`);
  const consumedEntry = nextEntry(parsed.ledgerPath, authorityHash, auth.runId, {
    event: "AUTHORIZATION_CONSUMED",
    stage: parsed.stage,
    timestamp: consumed.consumedAt,
    consumedAuthorizationSha256: sha256File(parsed.authorizationPath),
    pathMutations: [
      {
        path: CONTROL_CONTRACT.authorizationPath,
        operation: "UPDATED",
        beforeSha256: beforeAuthHash,
        afterSha256: sha256File(parsed.authorizationPath),
        authorityClass: "PRIVATE_EVIDENCE",
      },
    ],
  });
  appendLedger(parsed.ledgerPath, consumedEntry);
  const final = finalInventory(expectedPublic, expectedPrivate);
  writeSecureFile(parsed.finalInventoryPath, `${JSON.stringify(final, null, 2)}\n`);
  writeSecureFile(parsed.inventoryPath, checksumInventory(expectedPublic, expectedPrivate, parsed.finalInventoryPath, parsed.inventoryPath));
  process.stdout.write(
    `${JSON.stringify({
      result: "SEALED_AUTHORITY_CONSUMED",
      entries: readFileSync(parsed.inventoryPath, "utf8").split("\n").filter(Boolean).length,
      inventorySha256: sha256File(parsed.inventoryPath),
      finalInventorySha256: sha256File(parsed.finalInventoryPath),
      finalLedgerEntryHash: consumedEntry.entryHash,
      effectiveAuthorizationSha256: authorityHash,
    })}\n`,
  );
}

function main() {
  const parsed = parseArguments(process.argv.slice(2));
  const auth = JSON.parse(readFileSync(parsed.authorizationPath, "utf8"));
  validateAuthorization(auth, { requiredFlag: "runDependencyFreeStaticChecks" });
  validateInvocationBinding(parsed, auth);
  validateBoundNode(auth);
  if (!commandIsAllowed(auth, parsed.stage, parsed.executable, parsed.commandArguments)) throw new Error("COMMAND_NOT_ALLOWED");
  const authorityHash = effectiveAuthorizationHash(auth, parsed.authorizationPath);
  const ledger = verifyLedgerText(readFileSync(parsed.ledgerPath, "utf8"), { authorityHash, runId: auth.runId });
  if (ledger.at(-1).event === "AUTHORIZATION_CONSUMED") throw new Error("AUTH_CONSUMED");
  const publicRoot = resolve(process.cwd(), CONTROL_CONTRACT.publicRoot);
  const before = snapshotPublic(publicRoot);
  const intent = nextEntry(parsed.ledgerPath, authorityHash, auth.runId, {
    arguments: parsed.commandArguments,
    event: "COMMAND_INTENT",
    executable: parsed.executable,
    executableSha256: sha256File(parsed.executable),
    stage: parsed.stage,
    timestamp: new Date().toISOString(),
    pathMutations: [],
  });
  appendLedger(parsed.ledgerPath, intent);

  const environment = { ...process.env };
  for (const key of ["HTTP_PROXY", "HTTPS_PROXY", "ALL_PROXY", "http_proxy", "https_proxy", "all_proxy"]) delete environment[key];
  environment.NO_PROXY = "*";
  const result = spawnSync(parsed.executable, parsed.commandArguments, {
    cwd: process.cwd(),
    encoding: "utf8",
    env: environment,
    maxBuffer: 1024 * 1024,
    timeout: 60_000,
  });
  const stdout = result.stdout ?? "";
  const stderr = result.stderr ?? "";
  const mutations = diffSnapshots(before, snapshotPublic(publicRoot));
  const exitCode = mutations.length > 0 ? 125 : Number.isInteger(result.status) ? result.status : 125;
  const outcome = nextEntry(parsed.ledgerPath, authorityHash, auth.runId, {
    arguments: parsed.commandArguments,
    event: "COMMAND_RESULT",
    executable: parsed.executable,
    exitCode,
    stage: parsed.stage,
    stderrSha256: sha256Text(stderr),
    stdoutSha256: sha256Text(stdout),
    timestamp: new Date().toISOString(),
    pathMutations: mutations,
  });
  appendLedger(parsed.ledgerPath, outcome);
  process.stdout.write(stdout);
  process.stderr.write(stderr);
  if (mutations.length > 0) process.stderr.write("UNEXPECTED_COMMAND_MUTATION\n");
  process.exitCode = exitCode;
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : "";
if (invokedPath === resolve(fileURLToPath(import.meta.url))) {
  try {
    if (process.argv.includes("--seal-inventory")) sealInventory(process.argv.slice(2));
    else main();
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 125;
  }
}
