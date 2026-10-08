import { isAbsolute } from "node:path";

export const privateEnvironmentFailureCodes = Object.freeze({
  SOURCE_TYPE: "PRIVATE_ENVIRONMENT_SOURCE_TYPE_INVALID",
  LINE_ENDING: "PRIVATE_ENVIRONMENT_LINE_ENDING_INVALID",
  EMPTY: "PRIVATE_ENVIRONMENT_EMPTY",
  LINE: "PRIVATE_ENVIRONMENT_LINE_INVALID",
  KEY: "PRIVATE_ENVIRONMENT_KEY_INVALID",
  UNKNOWN_KEY: "PRIVATE_ENVIRONMENT_KEY_UNKNOWN",
  DUPLICATE_KEY: "PRIVATE_ENVIRONMENT_KEY_DUPLICATE",
  EMPTY_VALUE: "PRIVATE_ENVIRONMENT_VALUE_EMPTY",
  MISSING_KEY: "PRIVATE_ENVIRONMENT_KEY_MISSING",
  EXECUTION_AUTHORITY: "PRIVATE_ENVIRONMENT_AUTHORITY_INVALID",
  PACKAGE: "PRIVATE_ENVIRONMENT_PACKAGE_INVALID",
  RUN: "PRIVATE_ENVIRONMENT_RUN_INVALID",
  EVIDENCE_DIRECTORY: "PRIVATE_ENVIRONMENT_EVIDENCE_DIRECTORY_INVALID",
  NODE_BINARY: "PRIVATE_ENVIRONMENT_NODE_BINARY_INVALID",
  PNPM_ENTRY: "PRIVATE_ENVIRONMENT_PNPM_ENTRY_INVALID",
});

export const requiredPrivateEnvironmentKeys = Object.freeze([
  "TP01_BOOTSTRAP_PASSWORD",
  "TP01_RUNTIME_PASSWORD",
  "TP01_DATABASE_URL",
  "TP01_EXECUTION_AUTHORIZATION",
  "TP01_EXECUTION_PACKAGE",
  "TP01_RUN_ID",
  "TP01_EVIDENCE_DIR",
  "TP01_PNPM_ENTRY",
  "TP01_NODE_BIN",
]);

export const optionalPrivateEnvironmentKeys = Object.freeze([
  "TP01_IMAGE_PULL_AUTHORIZATION_TOKEN",
]);

const allowedKeys = new Set([
  ...requiredPrivateEnvironmentKeys,
  ...optionalPrivateEnvironmentKeys,
]);
const keyPattern = /^[A-Z][A-Z0-9_]*$/;
const packagePattern = /^WP-[1-9][0-9]*$/;
const runPattern = /^[a-z0-9][a-z0-9-]{2,127}$/;

export class PrivateEnvironmentContractError extends Error {
  constructor(code) {
    super("private environment rejected by the non-evaluating contract");
    this.name = "PrivateEnvironmentContractError";
    this.code = code;
  }
}

function reject(code) {
  throw new PrivateEnvironmentContractError(code);
}

function semanticSource(source) {
  if (typeof source !== "string") reject(privateEnvironmentFailureCodes.SOURCE_TYPE);
  if (source.includes("\0")) reject(privateEnvironmentFailureCodes.LINE);
  const withoutTerminalDelimiter = source.endsWith("\r\n")
    ? source.slice(0, -2)
    : source.endsWith("\n")
      ? source.slice(0, -1)
      : source;
  if (withoutTerminalDelimiter.includes("\r")) {
    reject(privateEnvironmentFailureCodes.LINE_ENDING);
  }
  if (!withoutTerminalDelimiter) reject(privateEnvironmentFailureCodes.EMPTY);
  return withoutTerminalDelimiter;
}

function assertPrivateEnvironmentContext(environment) {
  if (environment.TP01_EXECUTION_AUTHORIZATION !== "AUTHORIZED_BY_LATER_OWNER_PACKAGE") {
    reject(privateEnvironmentFailureCodes.EXECUTION_AUTHORITY);
  }
  if (!packagePattern.test(environment.TP01_EXECUTION_PACKAGE)) {
    reject(privateEnvironmentFailureCodes.PACKAGE);
  }
  if (!runPattern.test(environment.TP01_RUN_ID)) {
    reject(privateEnvironmentFailureCodes.RUN);
  }
  if (!isAbsolute(environment.TP01_EVIDENCE_DIR)) {
    reject(privateEnvironmentFailureCodes.EVIDENCE_DIRECTORY);
  }
  if (!isAbsolute(environment.TP01_NODE_BIN)) {
    reject(privateEnvironmentFailureCodes.NODE_BINARY);
  }
  if (!isAbsolute(environment.TP01_PNPM_ENTRY)) {
    reject(privateEnvironmentFailureCodes.PNPM_ENTRY);
  }
}

export function parsePrivateEnvironment(source) {
  const environment = Object.create(null);
  for (const line of semanticSource(source).split("\n")) {
    if (!line) reject(privateEnvironmentFailureCodes.LINE);
    const separator = line.indexOf("=");
    if (separator < 1) reject(privateEnvironmentFailureCodes.LINE);
    const key = line.slice(0, separator);
    const value = line.slice(separator + 1);
    if (!keyPattern.test(key)) reject(privateEnvironmentFailureCodes.KEY);
    if (!allowedKeys.has(key)) reject(privateEnvironmentFailureCodes.UNKNOWN_KEY);
    if (Object.hasOwn(environment, key)) reject(privateEnvironmentFailureCodes.DUPLICATE_KEY);
    if (!value) reject(privateEnvironmentFailureCodes.EMPTY_VALUE);
    environment[key] = value;
  }
  for (const key of requiredPrivateEnvironmentKeys) {
    if (!Object.hasOwn(environment, key)) reject(privateEnvironmentFailureCodes.MISSING_KEY);
  }
  assertPrivateEnvironmentContext(environment);
  return Object.freeze(environment);
}

export function privateEnvironmentContext(source) {
  try {
    const environment = parsePrivateEnvironment(source);
    return Object.freeze({
      packageId: environment.TP01_EXECUTION_PACKAGE,
      runId: environment.TP01_RUN_ID,
      evidenceDirectory: environment.TP01_EVIDENCE_DIR,
    });
  } catch {
    if (typeof source !== "string" || source.includes("\0")) return null;
    const candidates = Object.create(null);
    const duplicates = new Set();
    for (const line of source.replace(/\r?\n$/, "").split("\n")) {
      const separator = line.indexOf("=");
      if (separator < 1) continue;
      const key = line.slice(0, separator);
      if (!["TP01_EXECUTION_PACKAGE", "TP01_RUN_ID", "TP01_EVIDENCE_DIR"].includes(key)) {
        continue;
      }
      if (Object.hasOwn(candidates, key)) duplicates.add(key);
      else candidates[key] = line.slice(separator + 1);
    }
    if (duplicates.size !== 0) return null;
    if (
      !packagePattern.test(candidates.TP01_EXECUTION_PACKAGE ?? "") ||
      !runPattern.test(candidates.TP01_RUN_ID ?? "") ||
      !isAbsolute(candidates.TP01_EVIDENCE_DIR ?? "")
    ) {
      return null;
    }
    return Object.freeze({
      packageId: candidates.TP01_EXECUTION_PACKAGE,
      runId: candidates.TP01_RUN_ID,
      evidenceDirectory: candidates.TP01_EVIDENCE_DIR,
    });
  }
}

export function privateExecutionEnvironment(environment, baseEnvironment = process.env) {
  const childEnvironment = Object.fromEntries(
    Object.entries(baseEnvironment).filter(([key]) => !key.startsWith("TP01_")),
  );
  for (const key of allowedKeys) {
    if (Object.hasOwn(environment, key)) childEnvironment[key] = environment[key];
  }
  return childEnvironment;
}
