export const expectedRuntimePublisher = Object.freeze({
  host: "127.0.0.1",
  publishedPort: 55432,
  targetPort: 5432,
  protocol: "tcp",
  targetKey: "5432/tcp",
});

export const composeReachabilityInspectionArguments = Object.freeze([
  "compose",
  "ps",
  "--format",
  "json",
  "postgres",
]);

const privateEnvironmentKeys = Object.freeze([
  "TP01_BOOTSTRAP_PASSWORD",
  "TP01_RUNTIME_PASSWORD",
  "TP01_DATABASE_URL",
  "TP01_IMAGE_PULL_AUTHORIZATION_TOKEN",
  "PGPASSWORD",
]);

export function createReachabilityComposeInspection(
  baseEnvironment,
  syntheticBootstrapPassword,
) {
  if (
    typeof syntheticBootstrapPassword !== "string" ||
    syntheticBootstrapPassword.length < 32 ||
    /[\r\n\0]/.test(syntheticBootstrapPassword)
  ) {
    throw new Error("reachability requires a strong single-line ephemeral interpolation value");
  }
  const actualBootstrapPassword = baseEnvironment?.TP01_BOOTSTRAP_PASSWORD;
  if (
    typeof actualBootstrapPassword === "string" &&
    actualBootstrapPassword.length > 0 &&
    actualBootstrapPassword === syntheticBootstrapPassword
  ) {
    throw new Error("reachability interpolation value must differ from the real bootstrap value");
  }
  const environment = { ...(baseEnvironment ?? {}) };
  for (const key of privateEnvironmentKeys) delete environment[key];
  environment.TP01_BOOTSTRAP_PASSWORD = syntheticBootstrapPassword;
  return Object.freeze({
    arguments: composeReachabilityInspectionArguments,
    environment,
    evidence: Object.freeze({
      source: "EPHEMERAL_SYNTHETIC_REACHABILITY_ONLY",
      purpose: "COMPOSE_CONFIG_INTERPOLATION_FOR_READ_ONLY_PS",
      actualBootstrapCredentialPresentBefore:
        typeof actualBootstrapPassword === "string" && actualBootstrapPassword.length > 0,
      actualBootstrapCredentialPropagated: false,
      runtimeCredentialPropagated: false,
      databaseUrlPropagated: false,
      pullTokenPropagated: false,
      serviceMutationAllowed: false,
      valueRetained: false,
    }),
  });
}

export function classifyRuntimeReachabilityPhase(existingEvidenceNames) {
  const names = new Set(existingEvidenceNames ?? []);
  const primaryArtifacts = [
    "primary-results.jsonl",
    "primary-state.json",
    "primary-audit-events.jsonl",
  ];
  const present = primaryArtifacts.filter((name) => names.has(name));
  if (present.length === 0) return "PRIMARY";
  if (present.length === primaryArtifacts.length) return "REPRODUCTION";
  throw new Error("runtime reachability found an incomplete primary evidence packet");
}

export function assertComposePublicationSource(source) {
  if (typeof source !== "string") throw new Error("Compose source must be a string");
  const required = [
    /ports:\s*\n\s*- target: 5432\s*\n\s*published: ["']55432["']\s*\n\s*host_ip: ["']127\.0\.0\.1["']\s*\n\s*protocol: tcp/m,
    /tp01_internal:\s*\n\s*driver: bridge\s*\n\s*driver_opts:\s*\n\s*com\.docker\.network\.bridge\.enable_ip_masquerade: ["']false["']/m,
  ];
  if (required.some((pattern) => !pattern.test(source))) {
    throw new Error("Compose source does not contain the exact host-publication contract");
  }
  if (/^\s*internal:\s*true\s*$/m.test(source)) {
    throw new Error("Compose source cannot combine an internal-only network with host publication");
  }
  return expectedRuntimePublisher;
}

export function parseComposePsOutput(rawOutput) {
  if (typeof rawOutput !== "string" || rawOutput.trim().length === 0) {
    throw new Error("Compose service inspection output is empty");
  }
  const trimmed = rawOutput.trim();
  try {
    const parsed = JSON.parse(trimmed);
    const records = Array.isArray(parsed) ? parsed : [parsed];
    if (records.length !== 1) throw new Error("expected exactly one Compose service record");
    return records[0];
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
    const records = trimmed
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => JSON.parse(line));
    if (records.length !== 1) throw new Error("expected exactly one Compose service record");
    return records[0];
  }
}

export function assertDockerPortBinding(portBindings) {
  const keys = Object.keys(portBindings ?? {}).sort();
  if (JSON.stringify(keys) !== JSON.stringify([expectedRuntimePublisher.targetKey])) {
    throw new Error("Docker port-binding target inventory differs");
  }
  const bindings = portBindings[expectedRuntimePublisher.targetKey];
  if (
    !Array.isArray(bindings) ||
    bindings.length !== 1 ||
    bindings[0]?.HostIp !== expectedRuntimePublisher.host ||
    bindings[0]?.HostPort !== String(expectedRuntimePublisher.publishedPort)
  ) {
    throw new Error("Docker did not publish the exact loopback host binding");
  }
  return Object.freeze({
    targetKey: expectedRuntimePublisher.targetKey,
    host: bindings[0].HostIp,
    publishedPort: Number(bindings[0].HostPort),
  });
}

export function assertComposePublisher(serviceRecord) {
  const publishers = serviceRecord?.Publishers;
  if (
    serviceRecord?.Service !== "postgres" ||
    serviceRecord.State !== "running" ||
    serviceRecord.Health !== "healthy" ||
    !Array.isArray(publishers) ||
    publishers.length !== 1
  ) {
    throw new Error("Compose service state or publisher inventory differs");
  }
  const publisher = publishers[0];
  if (
    publisher.URL !== expectedRuntimePublisher.host ||
    publisher.TargetPort !== expectedRuntimePublisher.targetPort ||
    publisher.PublishedPort !== expectedRuntimePublisher.publishedPort ||
    publisher.Protocol !== expectedRuntimePublisher.protocol
  ) {
    throw new Error("Compose did not report the exact loopback publisher mapping");
  }
  return Object.freeze({
    service: serviceRecord.Service,
    state: serviceRecord.State,
    health: serviceRecord.Health,
    host: publisher.URL,
    targetPort: publisher.TargetPort,
    publishedPort: publisher.PublishedPort,
    protocol: publisher.Protocol,
  });
}

export function assertRuntimeReachabilityEvidence(evidence, authorization, expectedPhase) {
  if (
    evidence?.schemaVersion !== 2 ||
    evidence.proof !== "TP-01" ||
    evidence.status !== "PASS" ||
    evidence.packageId !== authorization?.packageId ||
    evidence.runId !== authorization?.runId ||
    !["PRIMARY", "REPRODUCTION"].includes(evidence.phase) ||
    (expectedPhase !== undefined && evidence.phase !== expectedPhase) ||
    evidence.composeInterpolation?.source !== "EPHEMERAL_SYNTHETIC_REACHABILITY_ONLY" ||
    evidence.composeInterpolation?.purpose !==
      "COMPOSE_CONFIG_INTERPOLATION_FOR_READ_ONLY_PS" ||
    evidence.composeInterpolation?.actualBootstrapCredentialPresentBefore !== false ||
    evidence.composeInterpolation?.actualBootstrapCredentialPropagated !== false ||
    evidence.composeInterpolation?.runtimeCredentialPropagated !== false ||
    evidence.composeInterpolation?.databaseUrlPropagated !== false ||
    evidence.composeInterpolation?.pullTokenPropagated !== false ||
    evidence.composeInterpolation?.serviceMutationAllowed !== false ||
    evidence.composeInterpolation?.valueRetained !== false ||
    evidence.tcpReachability !== "OPEN"
  ) {
    throw new Error("runtime reachability evidence is not bound to the authorized run");
  }
  assertDockerPortBinding({
    [evidence.docker?.targetKey]: [
      {
        HostIp: evidence.docker?.host,
        HostPort: String(evidence.docker?.publishedPort ?? ""),
      },
    ],
  });
  assertComposePublisher({
    Service: evidence.compose?.service,
    State: evidence.compose?.state,
    Health: evidence.compose?.health,
    Publishers: [
      {
        URL: evidence.compose?.host,
        TargetPort: evidence.compose?.targetPort,
        PublishedPort: evidence.compose?.publishedPort,
        Protocol: evidence.compose?.protocol,
      },
    ],
  });
  return evidence;
}
