import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { isAbsolute } from "node:path";

export const CONTRACT = Object.freeze({
  revision: "cb8be3d04f31126f80c2dec3ae961a65911033a8",
  tree: "b223a909b96d1c55d7fbe8783be535983d874f97",
  publicRoot: "proofs/wave-a-offline-artifact-acquisition/",
  privateRoot: "internal-local/work-packages/WP-111/",
  runId: "wp111-2026-10-10-01",
  node: Object.freeze({
    path: "/Users/aungmyooo/.nvm/versions/node/v22.23.1/bin/node",
    version: "v22.23.1",
    sha256: "2e3f1286a7eb3736346ed1803e458a0ff909e2b2d5bc746144dcb76970e9b99d",
  }),
});

const HASH = /^[a-f0-9]{64}$/;
const CLOSED_FLAGS = [
  "network", "metadataRetrieval", "download", "artifactAcquisition", "sdkOrCacheMutation",
  "dependencyRestore", "build", "device", "runtime", "proofExecution", "applicationCoding",
  "architectureSelection", "infrastructure", "deployment", "providerOrCost", "customerOrLiveData",
  "commitOrPush",
];
const EXACT_STAGES = ["STATIC_TESTS", "STATIC_VERIFY"];

export function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
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
  const parts = path.replaceAll("\\", "/").split("/");
  if (parts.some((part) => part === "" || part === "." || part === "..")) throw new Error("UNSAFE_PATH");
  return parts.join("/");
}

export function validateSourceEntry(entry) {
  if (entry.scheme !== "https" || entry.port !== 443) throw new Error("SOURCE_TRANSPORT");
  if (!/^[a-z0-9.-]+$/.test(entry.host ?? "") || !entry.host.includes(".")) throw new Error("SOURCE_HOST");
  if (entry.host === "localhost" || /^(127\.|0\.|10\.|192\.168\.|169\.254\.)/.test(entry.host)) {
    throw new Error("SOURCE_PRIVATE_HOST");
  }
  if (!entry.pathPrefix?.startsWith("/") || entry.pathPrefix.includes("..")) throw new Error("SOURCE_PATH");
  if (!Number.isInteger(entry.redirectLimit) || entry.redirectLimit < 0 || entry.redirectLimit > 3) {
    throw new Error("SOURCE_REDIRECT_LIMIT");
  }
  return true;
}

export function validateSourcePolicy(policy) {
  if (policy.schema !== "wave-a-source-policy-v1" || policy.classification !== "SYNTHETIC_STATIC_ONLY") {
    throw new Error("SOURCE_POLICY_CLASS");
  }
  if (!Array.isArray(policy.entries) || policy.entries.length === 0) throw new Error("SOURCE_POLICY_ENTRIES");
  const ids = new Set();
  for (const entry of policy.entries) {
    validateSourceEntry(entry);
    if (!entry.id || ids.has(entry.id)) throw new Error("SOURCE_POLICY_ID");
    ids.add(entry.id);
  }
  return true;
}

export function validateMetadataCommit(commit) {
  if (commit.schema !== "wave-a-metadata-commit-v1" || commit.stage !== "METADATA_COMMITTED") {
    throw new Error("METADATA_SCHEMA");
  }
  if (!HASH.test(commit.sourcePolicySha256 ?? "") || !Array.isArray(commit.entries) || commit.entries.length === 0) {
    throw new Error("METADATA_SHAPE");
  }
  const ids = new Set();
  for (const entry of commit.entries) {
    if (!entry.id || ids.has(entry.id) || !HASH.test(entry.sha256 ?? "") || !Number.isInteger(entry.size) || entry.size < 1) {
      throw new Error("METADATA_ENTRY");
    }
    if (!["EXECUTABLE_PROOF_ARTIFACT", "TRANSITIVE_PROOF_ARTIFACT", "SOURCE_REVIEW_ONLY"].includes(entry.purpose)) {
      throw new Error("METADATA_PURPOSE");
    }
    ids.add(entry.id);
  }
  return true;
}

export function validateAuthorization(auth, now = new Date(), options = {}) {
  if (auth.schema !== "wave-a-acquisition-extension-static-authorization-v1") throw new Error("AUTH_SCHEMA");
  if (auth.runId !== CONTRACT.runId || auth.singleUse !== true) throw new Error("AUTH_STATE");
  if (auth.state === "EFFECTIVE_STATIC_ONLY") {
    if (auth.consumed !== false) throw new Error("AUTH_STATE");
    if (!(new Date(auth.validFrom) <= now && now < new Date(auth.expiresAt))) throw new Error("AUTH_TIME");
  } else if (auth.state === "CONSUMED") {
    if (
      auth.consumed !== true || !HASH.test(auth.effectiveAuthorizationSha256 ?? "") ||
      !HASH.test(auth.primaryInventorySha256 ?? "") || Number.isNaN(Date.parse(auth.consumedAt ?? ""))
    ) throw new Error("AUTH_CONSUMPTION");
    if (options.allowConsumed !== true) throw new Error("AUTH_CONSUMED");
  } else throw new Error("AUTH_STATE");
  if (auth.publishedRevision !== CONTRACT.revision || auth.repositoryTree !== CONTRACT.tree) throw new Error("AUTH_REVISION");
  if (auth.operator !== "/root" || auth.publicRoot !== CONTRACT.publicRoot || auth.privateRoot !== CONTRACT.privateRoot) {
    throw new Error("AUTH_BOUNDARY");
  }
  if (canonicalJson(auth.nodeBinding) !== canonicalJson(CONTRACT.node)) throw new Error("AUTH_NODE");
  if (canonicalJson(auth.allowedStages) !== canonicalJson(EXACT_STAGES)) throw new Error("AUTH_STAGES");
  for (const flag of CLOSED_FLAGS) if (auth.actionFlags?.[flag] !== false) throw new Error(`AUTH_CLOSED:${flag}`);
  for (const flag of ["staticMaterialization", "staticTests", "staticVerify", "sealEvidence", "freshValidator"]) {
    if (auth.actionFlags?.[flag] !== true) throw new Error(`AUTH_REQUIRED:${flag}`);
  }
  if (!Array.isArray(auth.allowedCommands) || auth.allowedCommands.length !== 2) throw new Error("AUTH_COMMANDS");
  return true;
}

export function commandAllowed(auth, stage, executable, args) {
  return auth.allowedStages.includes(stage) && auth.allowedCommands.some((entry) =>
    entry.stage === stage && entry.executable === executable && canonicalJson(entry.arguments) === canonicalJson(args));
}

export function sourceTextIsStaticOnly(text) {
  const forbidden = [
    "node:" + "http", "node:" + "https", "node:" + "net", "node:" + "tls", "node:" + "dns",
    "node:" + "dgram", "fet" + "ch(", "Web" + "Socket", "exec" + "Sync(", "exec" + "File(",
  ];
  return forbidden.every((token) => !text.includes(token));
}

