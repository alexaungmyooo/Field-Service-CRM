import { spawnSync } from "node:child_process";
import { homedir } from "node:os";
import { basename } from "node:path";
import { pathToFileURL } from "node:url";

export const diagnosticCharacterLimit = 8192;

const secretKeyPattern =
  "(?:TP01_(?:BOOTSTRAP|RUNTIME)_PASSWORD|TP01_DATABASE_URL|password|secret|token|authorization|api[_-]?key)";

export function minimizeExecutable(command) {
  const value = typeof command === "string" ? command : String(command);
  const executable = sanitizeDiagnosticText(basename(value));
  return Object.freeze({
    executable,
    executablePathClass: value === basename(value) ? "COMMAND_NAME" : "PATH_MINIMIZED",
    executablePathRetained: false,
  });
}

export function sanitizeDiagnosticText(value, sensitiveValues = [], localPaths = []) {
  const text = typeof value === "string" ? value : value == null ? "" : String(value);
  let sanitized = text;
  const exactSensitiveValues = [...new Set(sensitiveValues)]
    .filter((sensitiveValue) => typeof sensitiveValue === "string" && sensitiveValue.length > 0)
    .sort((left, right) => right.length - left.length);
  for (const sensitiveValue of exactSensitiveValues) {
    sanitized = sanitized.replaceAll(sensitiveValue, "[REDACTED]");
  }
  const exactLocalPaths = [...new Set(localPaths)]
    .filter((localPath) => typeof localPath === "string" && localPath.length > 0)
    .sort((left, right) => right.length - left.length);
  for (const localPath of exactLocalPaths) {
    sanitized = sanitized.replaceAll(localPath, "[LOCAL_PATH]");
  }
  return sanitized
    .replace(
      /\b(postgres(?:ql)?:\/\/[^\s:/@]+:)([^\s@]+)(@)/gi,
      "$1[REDACTED]$3",
    )
    .replace(/\b(Bearer\s+)[A-Za-z0-9._~+/=-]+/gi, "$1[REDACTED]")
    .replace(
      new RegExp(
        `(\\b${secretKeyPattern}\\b\\s*[=:]\\s*)(?:"[^"\\r\\n]*"|'[^'\\r\\n]*'|[^\\s,;\\r\\n]+)`,
        "gi",
      ),
      "$1[REDACTED]",
    );
}

function safeHead(text, length) {
  let value = text.slice(0, length);
  const last = value.charCodeAt(value.length - 1);
  if (last >= 0xd800 && last <= 0xdbff) value = value.slice(0, -1);
  return value;
}

function safeTail(text, length) {
  let value = text.slice(-length);
  const first = value.charCodeAt(0);
  if (first >= 0xdc00 && first <= 0xdfff) value = value.slice(1);
  return value;
}

export function boundedDiagnosticText(
  value,
  limit = diagnosticCharacterLimit,
  sensitiveValues = [],
  localPaths = [],
) {
  if (!Number.isInteger(limit) || limit < 256) {
    throw new Error("diagnostic character limit must be an integer of at least 256");
  }
  const original = typeof value === "string" ? value : value == null ? "" : String(value);
  const sanitized = sanitizeDiagnosticText(original, sensitiveValues, localPaths);
  const marker = "\n...[SANITIZED DIAGNOSTIC TRUNCATED]...\n";
  let text = sanitized;
  let truncated = false;
  if (sanitized.length > limit) {
    const available = limit - marker.length;
    const headLength = Math.ceil(available / 2);
    const tailLength = Math.floor(available / 2);
    text = `${safeHead(sanitized, headLength)}${marker}${safeTail(sanitized, tailLength)}`;
    truncated = true;
  }
  return {
    text,
    truncated,
    sanitizationApplied: sanitized !== original,
    originalCharacters: original.length,
    originalUtf8Bytes: Buffer.byteLength(original),
    retainedCharacters: text.length,
    retainedUtf8Bytes: Buffer.byteLength(text),
    characterLimit: limit,
  };
}

export class CommandExecutionError extends Error {
  constructor(command, args, result, environment = process.env) {
    const status = result.status ?? result.signal ?? "SPAWN_ERROR";
    const minimizedExecutable = minimizeExecutable(command);
    const sensitiveValues = [
      environment?.TP01_BOOTSTRAP_PASSWORD,
      environment?.TP01_RUNTIME_PASSWORD,
      environment?.TP01_DATABASE_URL,
      environment?.TP01_IMAGE_PULL_AUTHORIZATION_TOKEN,
      environment?.PGPASSWORD,
    ];
    const localPaths = [homedir(), process.cwd(), pathToFileURL(process.cwd()).href];
    const stdout = boundedDiagnosticText(
      result.stdout,
      diagnosticCharacterLimit,
      sensitiveValues,
      localPaths,
    );
    const stderr = boundedDiagnosticText(
      result.stderr ?? result.error?.message,
      diagnosticCharacterLimit,
      sensitiveValues,
      localPaths,
    );
    super(
      `${minimizedExecutable.executable} failed (${status})` +
        (stderr.text ? `\n${stderr.text}` : ""),
    );
    this.name = "CommandExecutionError";
    this.diagnostic = Object.freeze({
      schemaVersion: 2,
      status: result.status,
      signal: result.signal,
      ...minimizedExecutable,
      argumentCount: args.length,
      stdout,
      stderr,
    });
  }
}

export function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
    stdio: options.input ? ["pipe", "pipe", "pipe"] : "pipe",
    ...options,
  });
  if (result.error || result.status !== 0) {
    throw new CommandExecutionError(command, args, result, options.env ?? process.env);
  }
  return result.stdout.trim();
}
