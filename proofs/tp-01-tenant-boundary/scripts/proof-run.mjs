import { rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { run } from "./command.mjs";
import { assertExecutionAuthorized } from "./execution-authorization.mjs";
import { captureStateSnapshot } from "./database-evidence.mjs";

const { evidenceDirectory } = assertExecutionAuthorized();
const resultFile = process.argv[2];
if (!resultFile || !["primary-results.jsonl", "reproduction-results.jsonl"].includes(resultFile)) {
  throw new Error("result filename must be primary-results.jsonl or reproduction-results.jsonl");
}
rmSync(resolve(evidenceDirectory, resultFile), { force: true });
const auditFile = resultFile === "primary-results.jsonl"
  ? "primary-audit-events.jsonl"
  : "reproduction-audit-events.jsonl";
rmSync(resolve(evidenceDirectory, auditFile), { force: true });
const stateFile = resultFile === "primary-results.jsonl"
  ? "primary-state.json"
  : "reproduction-state.json";
const before = captureStateSnapshot();
run(process.execPath, [resolve("node_modules/typescript/bin/tsc"), "--outDir", "dist"]);
let executionError;
try {
  run(process.execPath, ["--test", "--test-concurrency=1", resolve("dist/test/proof.test.js")], {
    env: { ...process.env, TP01_RESULT_FILE: resultFile, TP01_AUDIT_FILE: auditFile },
  });
} catch (error) {
  executionError = error;
}
const after = captureStateSnapshot();
const unchanged = before.aggregateSha256 === after.aggregateSha256;
writeFileSync(
  resolve(evidenceDirectory, stateFile),
  `${JSON.stringify({
    schemaVersion: 1,
    proof: "TP-01",
    run: resultFile.startsWith("primary") ? "PRIMARY" : "REPRODUCTION",
    before,
    after,
    unauthorizedMutationDetected: !unchanged,
    status: unchanged ? "UNCHANGED" : "CHANGED",
  }, null, 2)}\n`,
);
if (executionError) throw executionError;
if (!unchanged) throw new Error(`${stateFile} detected tenant-state mutation`);
