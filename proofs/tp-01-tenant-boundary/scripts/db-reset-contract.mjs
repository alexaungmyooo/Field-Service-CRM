import {
  createDatabaseEvidenceComposeInterpolation,
  databaseEvidenceComposeInterpolationEvidence,
} from "./database-evidence-compose-contract.mjs";

export const databaseResetSqlSteps = Object.freeze([
  "001_roles.sql",
  "002_schema.sql",
  "003_rls.sql",
  "004_seed.sql",
]);

export const databaseResetPostSqlStages = Object.freeze([
  "FIXTURE_EVIDENCE_CAPTURE",
  "FIXTURE_EVIDENCE_WRITE",
  "DATABASE_SECURITY_EVIDENCE_CAPTURE",
  "DATABASE_CONNECTION_EVIDENCE_CAPTURE",
  "DATABASE_SECURITY_EVIDENCE_WRITE",
]);

export const databaseResetComposeInterpolationEvidence =
  databaseEvidenceComposeInterpolationEvidence.DATABASE_RESET;

export function createDatabaseResetComposeInterpolation(
  baseEnvironment,
  syntheticBootstrapPassword,
) {
  return createDatabaseEvidenceComposeInterpolation(
    baseEnvironment,
    syntheticBootstrapPassword,
    "DATABASE_RESET",
  );
}

export function createDatabaseResetFailureEvidence({
  packageId,
  runId,
  phase,
  completedSqlSteps,
  attemptedSqlStep,
  completedPostSqlStages = [],
  attemptedPostSqlStage = null,
  diagnostic,
}) {
  if (!["PRIMARY", "REPRODUCTION"].includes(phase)) {
    throw new Error("database-reset failure phase is invalid");
  }
  if (
    !Array.isArray(completedSqlSteps) ||
    completedSqlSteps.some((name, index) => name !== databaseResetSqlSteps[index]) ||
    (attemptedSqlStep !== null && !databaseResetSqlSteps.includes(attemptedSqlStep))
  ) {
    throw new Error("database-reset failure progress differs from the exact SQL sequence");
  }
  if (
    !Array.isArray(completedPostSqlStages) ||
    completedPostSqlStages.some((stage, index) => stage !== databaseResetPostSqlStages[index]) ||
    (attemptedPostSqlStage !== null &&
      attemptedPostSqlStage !== databaseResetPostSqlStages[completedPostSqlStages.length]) ||
    (completedPostSqlStages.length > 0 && completedSqlSteps.length !== databaseResetSqlSteps.length) ||
    (attemptedPostSqlStage !== null && completedSqlSteps.length !== databaseResetSqlSteps.length)
  ) {
    throw new Error("database-reset failure progress differs from the exact post-SQL sequence");
  }
  return {
    schemaVersion: 1,
    proof: "TP-01",
    packageId,
    runId,
    phase,
    status: "FAIL_CLOSED",
    stage: "DB_RESET",
    code: "DATABASE_RESET_FAILED",
    progress: {
      completedSqlSteps: [...completedSqlSteps],
      completedSqlStepCount: completedSqlSteps.length,
      attemptedSqlStep,
      completedPostSqlStages: [...completedPostSqlStages],
      completedPostSqlStageCount: completedPostSqlStages.length,
      attemptedPostSqlStage,
      partialDatabaseMutationMayHaveOccurred:
        attemptedSqlStep !== null || completedSqlSteps.length > 0,
    },
    composeInterpolation: databaseResetComposeInterpolationEvidence,
    diagnostic,
    retained: {
      rawStdout: false,
      rawStderr: false,
      credentials: false,
      databaseUrl: false,
      interpolationValue: false,
      absolutePaths: false,
    },
  };
}
