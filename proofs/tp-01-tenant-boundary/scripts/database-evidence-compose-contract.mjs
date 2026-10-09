const operationDefinitions = Object.freeze({
  DATABASE_RESET: Object.freeze({
    source: "EPHEMERAL_SYNTHETIC_DATABASE_RESET_ONLY",
  }),
  PROOF_RUN: Object.freeze({
    source: "EPHEMERAL_SYNTHETIC_PROOF_RUN_ONLY",
  }),
});

function operationEvidence(operation, definition) {
  return Object.freeze({
    source: definition.source,
    purpose: "COMPOSE_CONFIG_INTERPOLATION_FOR_EXISTING_SERVICE_EXEC",
    operation,
    actualBootstrapCredentialPropagated: false,
    runtimeCredentialPropagated: false,
    databaseUrlPropagated: false,
    pullTokenPropagated: false,
    pgPasswordPropagated: false,
    runtimeSecurityPgPasswordScope: "TEMPORARY_CLONE_ONLY",
    serviceLifecycleMutationAllowed: false,
    interpolationCanAuthenticate: false,
    interpolationCanMutateDatabase: false,
    valueRetained: false,
  });
}

export const databaseEvidenceComposeInterpolationEvidence = Object.freeze(
  Object.fromEntries(
    Object.entries(operationDefinitions).map(([operation, definition]) => [
      operation,
      operationEvidence(operation, definition),
    ]),
  ),
);

function assertSyntheticInterpolationValue(value) {
  if (typeof value !== "string" || value.length < 32 || /[\r\n\0]/.test(value)) {
    throw new Error("database evidence requires a strong single-line synthetic interpolation value");
  }
}

function assertMinimizedComposeEnvironment(environment) {
  if (!environment || typeof environment !== "object") {
    throw new Error("an explicit database evidence Compose environment is required");
  }
  if (
    typeof environment.TP01_BOOTSTRAP_PASSWORD !== "string" ||
    environment.TP01_BOOTSTRAP_PASSWORD.length < 32 ||
    Object.keys(environment).some(
      (key) =>
        (key.startsWith("TP01_") && key !== "TP01_BOOTSTRAP_PASSWORD") || key === "PGPASSWORD",
    )
  ) {
    throw new Error("database evidence Compose environment is not minimized");
  }
}

export function createDatabaseEvidenceComposeInterpolation(
  baseEnvironment,
  syntheticBootstrapPassword,
  operation,
) {
  const definition = operationDefinitions[operation];
  if (!definition) throw new Error("database evidence Compose operation is invalid");
  assertSyntheticInterpolationValue(syntheticBootstrapPassword);
  const actualBootstrapPassword = baseEnvironment?.TP01_BOOTSTRAP_PASSWORD;
  if (
    typeof actualBootstrapPassword === "string" &&
    actualBootstrapPassword.length > 0 &&
    actualBootstrapPassword === syntheticBootstrapPassword
  ) {
    throw new Error("database evidence interpolation must differ from the real bootstrap credential");
  }
  const environment = { ...(baseEnvironment ?? {}) };
  for (const key of Object.keys(environment)) {
    if (key.startsWith("TP01_") || key === "PGPASSWORD") delete environment[key];
  }
  environment.TP01_BOOTSTRAP_PASSWORD = syntheticBootstrapPassword;
  return Object.freeze({
    environment,
    evidence: databaseEvidenceComposeInterpolationEvidence[operation],
  });
}

export function clearDatabaseEvidenceComposeInterpolation(interpolation) {
  if (interpolation?.environment) {
    interpolation.environment.TP01_BOOTSTRAP_PASSWORD = "";
    delete interpolation.environment.TP01_BOOTSTRAP_PASSWORD;
  }
}

export function createRuntimeSecurityComposeEnvironment(composeEnvironment, runtimePassword) {
  assertMinimizedComposeEnvironment(composeEnvironment);
  if (typeof runtimePassword !== "string" || runtimePassword.length === 0) {
    throw new Error("runtime security evidence requires the runtime credential");
  }
  return { ...composeEnvironment, PGPASSWORD: runtimePassword };
}

export function clearRuntimeSecurityComposeEnvironment(environment) {
  if (environment) {
    environment.PGPASSWORD = "";
    delete environment.PGPASSWORD;
  }
}

export function bindDatabaseEvidenceSnapshotCapture(captureSnapshot, composeEnvironment) {
  if (typeof captureSnapshot !== "function") {
    throw new Error("database evidence snapshot capture must be callable");
  }
  assertMinimizedComposeEnvironment(composeEnvironment);
  return () => captureSnapshot(composeEnvironment);
}

export function runDatabaseEvidenceJson({
  runCommand,
  sql,
  role,
  composeEnvironment,
  runtimePassword,
}) {
  if (typeof runCommand !== "function") throw new Error("database evidence requires a command runner");
  assertMinimizedComposeEnvironment(composeEnvironment);
  const runtime = role === "tp01_runtime";
  if (!runtime && role !== "tp01_bootstrap") {
    throw new Error("database evidence role is invalid");
  }
  const environment = runtime
    ? createRuntimeSecurityComposeEnvironment(composeEnvironment, runtimePassword)
    : composeEnvironment;
  const injectedEnvironment = runtime ? ["-e", "PGPASSWORD"] : [];
  try {
    const output = runCommand(
      "docker",
      [
        "compose",
        "exec",
        "-T",
        ...injectedEnvironment,
        "postgres",
        "psql",
        "-X",
        "-qAt",
        "-v",
        "ON_ERROR_STOP=1",
        "-U",
        role,
        "-d",
        "tp01",
      ],
      { input: sql, env: environment },
    );
    return JSON.parse(output);
  } finally {
    if (runtime) clearRuntimeSecurityComposeEnvironment(environment);
  }
}
