import { rmSync } from "node:fs";
import { resolve } from "node:path";
import { run } from "./command.mjs";
import { assertExecutionAuthorized } from "./execution-authorization.mjs";

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
run(process.execPath, [resolve("node_modules/typescript/bin/tsc"), "--outDir", "dist"]);
run(process.execPath, ["--test", "--test-concurrency=1", resolve("dist/test/proof.test.js")], {
  env: { ...process.env, TP01_RESULT_FILE: resultFile, TP01_AUDIT_FILE: auditFile },
});
