export const databaseResetSqlSteps = Object.freeze([
  "001_roles.sql",
  "002_schema.sql",
  "003_rls.sql",
  "004_seed.sql",
]);

export const databaseResetComposeInterpolationEvidence = Object.freeze({
  source: "EPHEMERAL_SYNTHETIC_DATABASE_RESET_ONLY",
  purpose: "COMPOSE_CONFIG_INTERPOLATION_FOR_EXISTING_SERVICE_EXEC",
  actualBootstrapCredentialPropagated: false,
  runtimeCredentialPropagated: false,
  databaseUrlPropagated: false,
  pullTokenPropagated: false,
  pgPasswordPropagated: false,
  serviceLifecycleMutationAllowed: false,
  interpolationCanAuthenticate: false,
  interpolationCanMutateDatabase: false,
  valueRetained: false,
});

function assertSyntheticInterpolationValue(value) {
  if (typeof value !== "string" || value.length < 32 || /[\r\n\0]/.test(value)) {
    throw new Error("database reset requires a strong single-line synthetic interpolation value");
  }
}

export function createDatabaseResetComposeInterpolation(
  baseEnvironment,
  syntheticBootstrapPassword,
) {
  assertSyntheticInterpolationValue(syntheticBootstrapPassword);
  const actualBootstrapPassword = baseEnvironment?.TP01_BOOTSTRAP_PASSWORD;
  if (
    typeof actualBootstrapPassword === "string" &&
    actualBootstrapPassword.length > 0 &&
    actualBootstrapPassword === syntheticBootstrapPassword
  ) {
    throw new Error("database-reset interpolation must differ from the real bootstrap credential");
  }
  const environment = { ...(baseEnvironment ?? {}) };
  for (const key of Object.keys(environment)) {
    if (key.startsWith("TP01_") || key === "PGPASSWORD") delete environment[key];
  }
  environment.TP01_BOOTSTRAP_PASSWORD = syntheticBootstrapPassword;
  return Object.freeze({
    environment,
    evidence: databaseResetComposeInterpolationEvidence,
  });
}

export function createDatabaseResetFailureEvidence({
  packageId,
  runId,
  phase,
  completedSqlSteps,
  attemptedSqlStep,
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
