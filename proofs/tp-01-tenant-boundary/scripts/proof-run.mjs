import { randomBytes } from "node:crypto";
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { boundedDiagnosticText, run } from "./command.mjs";
import { exactDatabaseChildEnvironment } from "./database-connection-contract.mjs";
import {
  bindDatabaseEvidenceSnapshotCapture,
  clearDatabaseEvidenceComposeInterpolation,
  createDatabaseEvidenceComposeInterpolation,
} from "./database-evidence-compose-contract.mjs";
import { appendOperationalStop } from "./deviation-contract.mjs";
import { assertExecutionAuthorized } from "./execution-authorization.mjs";
import { captureStateSnapshot } from "./database-evidence.mjs";
import { createProofRunStateSnapshotFailureEvidence } from "./proof-run-contract.mjs";

const { authorization, evidenceDirectory } = assertExecutionAuthorized();
const proofEnvironment = exactDatabaseChildEnvironment(process.env, authorization);
const resultFile = process.argv[2];
if (!resultFile || !["primary-results.jsonl", "reproduction-results.jsonl"].includes(resultFile)) {
  throw new Error("result filename must be primary-results.jsonl or reproduction-results.jsonl");
}
const runPhase = resultFile.startsWith("primary") ? "PRIMARY" : "REPRODUCTION";
rmSync(resolve(evidenceDirectory, resultFile), { force: true });
const auditFile = resultFile === "primary-results.jsonl"
  ? "primary-audit-events.jsonl"
  : "reproduction-audit-events.jsonl";
rmSync(resolve(evidenceDirectory, auditFile), { force: true });
const stateFile = resultFile === "primary-results.jsonl"
  ? "primary-state.json"
  : "reproduction-state.json";
const failureFile = resultFile === "primary-results.jsonl"
  ? "primary-execution-failure.json"
  : "reproduction-execution-failure.json";
rmSync(resolve(evidenceDirectory, failureFile), { force: true });
const snapshotFailureFile = resultFile === "primary-results.jsonl"
  ? "primary-state-snapshot-failure.json"
  : "reproduction-state-snapshot-failure.json";
rmSync(resolve(evidenceDirectory, snapshotFailureFile), { force: true });
let syntheticBootstrapPassword = randomBytes(32).toString("base64url");
const composeInterpolation = createDatabaseEvidenceComposeInterpolation(
  process.env,
  syntheticBootstrapPassword,
  "PROOF_RUN",
);
const captureProofRunStateSnapshot = bindDatabaseEvidenceSnapshotCapture(
  captureStateSnapshot,
  composeInterpolation.environment,
);
function captureGovernedStateSnapshot(stage) {
  try {
    return captureProofRunStateSnapshot();
  } catch (error) {
    const failure = createProofRunStateSnapshotFailureEvidence({
      packageId: authorization.packageId,
      runId: authorization.runId,
      run: runPhase,
      stage,
      composeInterpolation: composeInterpolation.evidence,
      diagnostic: error?.diagnostic ?? boundedDiagnosticText(
        error?.message,
        undefined,
        [
          process.env.TP01_BOOTSTRAP_PASSWORD,
          process.env.TP01_RUNTIME_PASSWORD,
          process.env.TP01_DATABASE_URL,
          process.env.TP01_IMAGE_PULL_AUTHORIZATION_TOKEN,
          syntheticBootstrapPassword,
        ],
        [process.cwd()],
      ),
    });
    writeFileSync(
      resolve(evidenceDirectory, snapshotFailureFile),
      `${JSON.stringify(failure, null, 2)}\n`,
      { mode: 0o600 },
    );
    const deviationsPath = resolve(evidenceDirectory, "deviations.json");
    const deviations = JSON.parse(readFileSync(deviationsPath, "utf8"));
    writeFileSync(
      deviationsPath,
      `${JSON.stringify(appendOperationalStop(deviations, {
        run: runPhase,
        stage,
        code: "STATE_SNAPSHOT_FAILED",
        evidenceArtifact: snapshotFailureFile,
      }), null, 2)}\n`,
      { mode: 0o600 },
    );
    throw error;
  }
}
try {
  const before = captureGovernedStateSnapshot("STATE_SNAPSHOT_BEFORE");
  let executionError;
  let executionPhase = "TYPESCRIPT_COMPILE";
  try {
    run(process.execPath, [resolve("node_modules/typescript/bin/tsc"), "--outDir", "dist"]);
    executionPhase = "PROOF_TEST";
    run(process.execPath, ["--test", "--test-concurrency=1", resolve("dist/test/proof.test.js")], {
      env: { ...proofEnvironment, TP01_RESULT_FILE: resultFile, TP01_AUDIT_FILE: auditFile },
    });
  } catch (error) {
    executionError = error;
    writeFileSync(
      resolve(evidenceDirectory, failureFile),
      `${JSON.stringify({
        schemaVersion: 1,
        proof: "TP-01",
        run: resultFile.startsWith("primary") ? "PRIMARY" : "REPRODUCTION",
        dataClassification: "SYNTHETIC_PROOF_DIAGNOSTIC_ONLY",
        customerOrLiveDataAuthorized: false,
        capturedAt: new Date().toISOString(),
        executionPhase,
        failure: error?.diagnostic ?? {
          schemaVersion: 2,
          status: null,
          signal: null,
          executable: "UNKNOWN",
          executablePathClass: "UNKNOWN",
          executablePathRetained: false,
          argumentCount: 0,
          stdout: null,
          stderr: null,
          unavailableReason: "NON_COMMAND_EXECUTION_ERROR",
        },
      }, null, 2)}\n`,
    );
    const deviationsPath = resolve(evidenceDirectory, "deviations.json");
    const deviations = JSON.parse(readFileSync(deviationsPath, "utf8"));
    writeFileSync(
      deviationsPath,
      `${JSON.stringify(appendOperationalStop(deviations, {
        run: resultFile.startsWith("primary") ? "PRIMARY" : "REPRODUCTION",
        stage: executionPhase,
        code: error?.diagnostic ? "CHILD_EXIT_NONZERO" : "PROOF_RUN_ERROR",
        evidenceArtifact: failureFile,
      }), null, 2)}\n`,
    );
  }
  const after = captureGovernedStateSnapshot("STATE_SNAPSHOT_AFTER");
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
} finally {
  clearDatabaseEvidenceComposeInterpolation(composeInterpolation);
  syntheticBootstrapPassword = null;
}
