export const expectedComposeSemanticVersion = "5.4.0";

export function composeVersionFromStdout(rawStdout) {
  if (typeof rawStdout !== "string") {
    throw new Error("Compose version stdout must be a string");
  }
  const match = /^([^\r\n]+)(?:\r?\n)?$/.exec(rawStdout);
  if (!match) {
    throw new Error("Compose version stdout must contain exactly one non-empty line");
  }
  return match[1];
}

export function normalizeComposeSemanticVersion(rawVersion) {
  if (typeof rawVersion !== "string") {
    throw new Error("Compose version must be a string");
  }
  const match = /^(?:v)?(\d+\.\d+\.\d+)$/.exec(rawVersion);
  if (!match) {
    throw new Error(`invalid Compose semantic version: ${rawVersion}`);
  }
  return match[1];
}

export function assertExactComposeVersion(
  rawVersion,
  expectedVersion = expectedComposeSemanticVersion,
) {
  const normalizedVersion = normalizeComposeSemanticVersion(rawVersion);
  if (normalizedVersion !== expectedVersion) {
    throw new Error(
      `compose mismatch: expected ${expectedVersion}, observed ${rawVersion} ` +
        `(normalized ${normalizedVersion})`,
    );
  }
  return normalizedVersion;
}

export function assertComposeEvidenceContract({
  normalizedVersion,
  rawVersion,
  rawStdout,
  expectedVersion = expectedComposeSemanticVersion,
}) {
  const semanticLine = composeVersionFromStdout(rawStdout);
  if (semanticLine !== rawVersion) {
    throw new Error(
      `Compose raw evidence mismatch: stdout contains ${semanticLine}, raw field contains ${rawVersion}`,
    );
  }
  const normalized = assertExactComposeVersion(rawVersion, expectedVersion);
  if (normalizedVersion !== normalized) {
    throw new Error(
      `Compose normalized evidence mismatch: expected ${normalized}, observed ${normalizedVersion}`,
    );
  }
  return normalized;
}

export function cleanupComposeEnvironment(baseEnvironment, syntheticBootstrapPassword) {
  const existingBootstrapPassword = baseEnvironment.TP01_BOOTSTRAP_PASSWORD;
  const usesSyntheticValue =
    typeof existingBootstrapPassword !== "string" || existingBootstrapPassword.length === 0;
  if (
    usesSyntheticValue &&
    (typeof syntheticBootstrapPassword !== "string" || syntheticBootstrapPassword.length === 0)
  ) {
    throw new Error("cleanup requires a non-empty ephemeral interpolation value");
  }
  return {
    environment: {
      ...baseEnvironment,
      TP01_BOOTSTRAP_PASSWORD: usesSyntheticValue
        ? syntheticBootstrapPassword
        : existingBootstrapPassword,
    },
    interpolationSource: usesSyntheticValue
      ? "EPHEMERAL_SYNTHETIC_CLEANUP_ONLY"
      : "EXISTING_RUN_ENVIRONMENT",
  };
}
