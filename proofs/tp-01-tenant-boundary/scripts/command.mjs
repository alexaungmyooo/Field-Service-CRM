import { spawnSync } from "node:child_process";

export const diagnosticCharacterLimit = 8192;

const secretKeyPattern =
  "(?:TP01_(?:BOOTSTRAP|RUNTIME)_PASSWORD|password|secret|token|authorization|api[_-]?key)";

export function sanitizeDiagnosticText(value, sensitiveValues = []) {
  const text = typeof value === "string" ? value : value == null ? "" : String(value);
  let sanitized = text;
  const exactSensitiveValues = [...new Set(sensitiveValues)]
    .filter((sensitiveValue) => typeof sensitiveValue === "string" && sensitiveValue.length > 0)
    .sort((left, right) => right.length - left.length);
  for (const sensitiveValue of exactSensitiveValues) {
    sanitized = sanitized.replaceAll(sensitiveValue, "[REDACTED]");
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
) {
  if (!Number.isInteger(limit) || limit < 256) {
    throw new Error("diagnostic character limit must be an integer of at least 256");
  }
  const original = typeof value === "string" ? value : value == null ? "" : String(value);
  const sanitized = sanitizeDiagnosticText(original, sensitiveValues);
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
    const sensitiveValues = [
      environment?.TP01_BOOTSTRAP_PASSWORD,
      environment?.TP01_RUNTIME_PASSWORD,
      environment?.PGPASSWORD,
    ];
    const stdout = boundedDiagnosticText(result.stdout, diagnosticCharacterLimit, sensitiveValues);
    const stderr = boundedDiagnosticText(
      result.stderr ?? result.error?.message,
      diagnosticCharacterLimit,
      sensitiveValues,
    );
    super(
      `${sanitizeDiagnosticText(command)} failed (${status})` +
        (stderr.text ? `\n${stderr.text}` : ""),
    );
    this.name = "CommandExecutionError";
    this.diagnostic = Object.freeze({
      schemaVersion: 1,
      status: result.status,
      signal: result.signal,
      executable: sanitizeDiagnosticText(command),
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
