import assert from "node:assert/strict";
import {
  CommandExecutionError,
  boundedDiagnosticText,
  diagnosticCharacterLimit,
  run,
  sanitizeDiagnosticText,
} from "./command.mjs";

const secrets = [
  "TP01_BOOTSTRAP_PASSWORD=bootstrap-value",
  "TP01_RUNTIME_PASSWORD: runtime-value",
  'password="quoted-value"',
  "Authorization: Bearer authorization-value",
  "postgresql://proof-user:database-value@127.0.0.1:55432/tp01",
];
const sanitized = sanitizeDiagnosticText(secrets.join("\n"));
for (const forbidden of [
  "bootstrap-value",
  "runtime-value",
  "quoted-value",
  "authorization-value",
  "database-value",
]) {
  assert.equal(sanitized.includes(forbidden), false);
}
assert.match(sanitized, /\[REDACTED\]/);
assert.equal(
  sanitizeDiagnosticText("unlabelled exact-child-secret", ["exact-child-secret"]),
  "unlabelled [REDACTED]",
);
assert.equal(sanitizeDiagnosticText("short ab value", ["ab"]), "short [REDACTED] value");

const oversized = `${"head".repeat(3000)}${"tail".repeat(3000)}`;
const bounded = boundedDiagnosticText(oversized);
assert.equal(bounded.truncated, true);
assert.equal(bounded.text.length <= diagnosticCharacterLimit, true);
assert.match(bounded.text, /SANITIZED DIAGNOSTIC TRUNCATED/);
assert.equal(bounded.originalCharacters, oversized.length);

let observed;
try {
  run(process.execPath, [
    "-e",
    "process.stdout.write('stdout TP01_RUNTIME_PASSWORD=do-not-retain');" +
      "process.stderr.write('stderr unlabelled-child-value');process.exit(7)",
  ], {
    env: { ...process.env, TP01_RUNTIME_PASSWORD: "unlabelled-child-value" },
  });
} catch (error) {
  observed = error;
}
assert.equal(observed instanceof CommandExecutionError, true);
assert.equal(observed.diagnostic.status, 7);
assert.equal(observed.diagnostic.argumentCount, 2);
assert.match(observed.diagnostic.stdout.text, /^stdout TP01_RUNTIME_PASSWORD=\[REDACTED\]$/);
assert.match(observed.diagnostic.stderr.text, /^stderr \[REDACTED\]$/);
assert.equal(observed.diagnostic.stdout.text.includes("do-not-retain"), false);
assert.equal(observed.diagnostic.stderr.text.includes("unlabelled-child-value"), false);
assert.equal(observed.message.includes("do-not-retain"), false);

const argvOnlySecret = "argv-only-secret-value";
let argvFailure;
try {
  run(process.execPath, ["-e", "process.exit(9)", argvOnlySecret]);
} catch (error) {
  argvFailure = error;
}
assert.equal(argvFailure instanceof CommandExecutionError, true);
assert.equal(argvFailure.diagnostic.argumentCount, 3);
assert.equal(JSON.stringify(argvFailure.diagnostic).includes(argvOnlySecret), false);
assert.equal(argvFailure.message.includes(argvOnlySecret), false);

let spawnFailure;
try {
  run("tp01-command-that-must-not-exist", [argvOnlySecret]);
} catch (error) {
  spawnFailure = error;
}
assert.equal(spawnFailure instanceof CommandExecutionError, true);
assert.equal(spawnFailure.diagnostic.status, null);
assert.equal(spawnFailure.diagnostic.argumentCount, 1);
assert.equal(JSON.stringify(spawnFailure.diagnostic).includes(argvOnlySecret), false);
assert.equal(spawnFailure.message.includes(argvOnlySecret), false);

process.stdout.write("WP-31 command diagnostic static tests passed\n");
