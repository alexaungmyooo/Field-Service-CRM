import { createHash } from "node:crypto";

export const expectedDatabaseConnection = Object.freeze({
  protocol: "postgresql:",
  hostname: "127.0.0.1",
  port: 55432,
  database: "tp01",
  username: "tp01_runtime",
});

const authorizationConnectionKeys = [
  "databaseUrlSha256",
  "database",
  "hostname",
  "port",
  "protocol",
  "runtimeCredentialSha256",
  "schemaVersion",
  "username",
];

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

function authorizationDatabaseBinding(authorization) {
  const connection = authorization?.databaseConnection;
  if (
    authorization?.status !== "ACCEPTED_FOR_EXECUTION" ||
    authorization?.effective !== true ||
    authorization?.checkpoint2Authorized !== true ||
    !authorization?.packageId?.startsWith("WP-") ||
    !authorization?.runId ||
    connection?.schemaVersion !== 1 ||
    Object.entries(expectedDatabaseConnection).some(([name, value]) => connection[name] !== value) ||
    !/^[a-f0-9]{64}$/.test(connection?.runtimeCredentialSha256 ?? "") ||
    !/^[a-f0-9]{64}$/.test(connection?.databaseUrlSha256 ?? "") ||
    JSON.stringify(Object.keys(connection).sort()) !==
      JSON.stringify([...authorizationConnectionKeys].sort())
  ) {
    throw new Error("effective authorization lacks the exact run-bound database binding");
  }
  return Object.freeze({
    packageId: authorization.packageId,
    runId: authorization.runId,
    connection,
    sha256: sha256(JSON.stringify({
      packageId: authorization.packageId,
      runId: authorization.runId,
      connection,
    })),
  });
}

function decode(value, label) {
  try {
    return decodeURIComponent(value);
  } catch {
    throw new Error(`TP01_DATABASE_URL ${label} is not valid percent-encoding`);
  }
}

export function buildExactDatabaseUrl(runtimePassword) {
  if (typeof runtimePassword !== "string" || runtimePassword.length < 32) {
    throw new Error("TP01_RUNTIME_PASSWORD must contain at least 32 characters");
  }
  return `postgresql://${expectedDatabaseConnection.username}:${encodeURIComponent(runtimePassword)}` +
    `@${expectedDatabaseConnection.hostname}:${expectedDatabaseConnection.port}` +
    `/${expectedDatabaseConnection.database}`;
}

export function assertDatabaseConnectionEnvironment(environment = process.env, authorization) {
  const databaseUrl = environment.TP01_DATABASE_URL;
  const runtimePassword = environment.TP01_RUNTIME_PASSWORD;
  if (typeof databaseUrl !== "string" || databaseUrl.length === 0) {
    throw new Error("TP01_DATABASE_URL is required; database defaults and fallbacks are prohibited");
  }
  if (typeof runtimePassword !== "string" || runtimePassword.length < 32) {
    throw new Error("TP01_RUNTIME_PASSWORD must contain at least 32 characters");
  }
  const binding = authorizationDatabaseBinding(authorization);
  if (
    environment.TP01_EXECUTION_PACKAGE !== binding.packageId ||
    environment.TP01_RUN_ID !== binding.runId
  ) {
    throw new Error("database environment differs from the authorized package or run");
  }

  let parsed;
  try {
    parsed = new URL(databaseUrl);
  } catch {
    throw new Error("TP01_DATABASE_URL is not a valid absolute URL");
  }
  const observed = {
    protocol: parsed.protocol,
    hostname: parsed.hostname,
    port: Number(parsed.port),
    database: decode(parsed.pathname.replace(/^\//, ""), "database"),
    username: decode(parsed.username, "username"),
  };
  if (
    Object.entries(expectedDatabaseConnection).some(([name, value]) => observed[name] !== value) ||
    parsed.pathname.split("/").length !== 2 ||
    parsed.search !== "" ||
    parsed.hash !== "" ||
    decode(parsed.password, "password") !== runtimePassword ||
    databaseUrl !== buildExactDatabaseUrl(runtimePassword)
  ) {
    throw new Error("TP01_DATABASE_URL differs from the exact run-bound database contract");
  }
  if (
    sha256(runtimePassword) !== binding.connection.runtimeCredentialSha256 ||
    sha256(databaseUrl) !== binding.connection.databaseUrlSha256
  ) {
    throw new Error("database credential or URL differs from the effective authorization");
  }

  return Object.freeze({
    schemaVersion: 2,
    proof: "TP-01",
    status: "PASS",
    packageId: binding.packageId,
    runId: binding.runId,
    authorizationDatabaseBindingSha256: binding.sha256,
    sourceEnvironmentVariable: "TP01_DATABASE_URL",
    ...expectedDatabaseConnection,
    runtimeCredentialBound: true,
    secretRetained: false,
    defaultsOrFallbacksAllowed: false,
  });
}

function childValidationMarker(environment, authorizationDatabaseBindingSha256) {
  return sha256([
    "TP01_DATABASE_CHILD_V1",
    environment.TP01_EXECUTION_PACKAGE,
    environment.TP01_RUN_ID,
    environment.TP01_DATABASE_URL,
    environment.TP01_RUNTIME_PASSWORD,
    authorizationDatabaseBindingSha256,
  ].join("\0"));
}

export function exactDatabaseChildEnvironment(environment = process.env, authorization) {
  const evidence = assertDatabaseConnectionEnvironment(environment, authorization);
  return {
    ...environment,
    TP01_DATABASE_URL: environment.TP01_DATABASE_URL,
    TP01_DATABASE_AUTHORIZATION_BINDING_SHA256: evidence.authorizationDatabaseBindingSha256,
    TP01_DATABASE_CONNECTION_VALIDATED: childValidationMarker(
      environment,
      evidence.authorizationDatabaseBindingSha256,
    ),
  };
}

export function assertDatabaseConnectionEvidence(evidence, authorization) {
  const binding = authorizationDatabaseBinding(authorization);
  const expectedKeys = [
    "authorizationDatabaseBindingSha256",
    "database",
    "defaultsOrFallbacksAllowed",
    "hostname",
    "port",
    "packageId",
    "proof",
    "protocol",
    "runtimeCredentialBound",
    "runId",
    "schemaVersion",
    "secretRetained",
    "sourceEnvironmentVariable",
    "status",
    "username",
  ];
  if (
    evidence?.schemaVersion !== 2 ||
    evidence.proof !== "TP-01" ||
    evidence.status !== "PASS" ||
    evidence.packageId !== binding.packageId ||
    evidence.runId !== binding.runId ||
    evidence.authorizationDatabaseBindingSha256 !== binding.sha256 ||
    evidence.sourceEnvironmentVariable !== "TP01_DATABASE_URL" ||
    Object.entries(expectedDatabaseConnection).some(([name, value]) => evidence[name] !== value) ||
    evidence.runtimeCredentialBound !== true ||
    evidence.secretRetained !== false ||
    evidence.defaultsOrFallbacksAllowed !== false ||
    JSON.stringify(Object.keys(evidence).sort()) !== JSON.stringify([...expectedKeys].sort())
  ) {
    throw new Error("database-connection evidence differs from the exact non-secret contract");
  }
  return evidence;
}
