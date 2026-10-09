import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  assertComposePublicationSource,
  assertComposePublisher,
  assertDockerPortBinding,
  assertRuntimeReachabilityEvidence,
  parseComposePsOutput,
} from "./runtime-reachability-contract.mjs";

const composeSource = readFileSync("compose.yaml", "utf8");
assertComposePublicationSource(composeSource);
assert.throws(
  () => assertComposePublicationSource("networks:\n  tp01_internal:\n    internal: true\n"),
  /host-publication contract|internal-only/,
);
assert.throws(
  () => assertComposePublicationSource(`${composeSource}\n  internal: true\n`),
  /internal-only/,
);

const portBindings = { "5432/tcp": [{ HostIp: "127.0.0.1", HostPort: "55432" }] };
assert.equal(assertDockerPortBinding(portBindings).publishedPort, 55432);
for (const invalid of [
  { "5432/tcp": [{ HostIp: "0.0.0.0", HostPort: "55432" }] },
  { "5432/tcp": [{ HostIp: "127.0.0.1", HostPort: "0" }] },
  { "5432/tcp": [{ HostIp: "127.0.0.1", HostPort: "55432" }], "5433/tcp": [] },
  { "5432/tcp": null },
  {},
]) assert.throws(() => assertDockerPortBinding(invalid));

const serviceRecord = {
  Service: "postgres",
  State: "running",
  Health: "healthy",
  Publishers: [{ URL: "127.0.0.1", TargetPort: 5432, PublishedPort: 55432, Protocol: "tcp" }],
};
assert.equal(parseComposePsOutput(JSON.stringify(serviceRecord)).Service, "postgres");
assert.equal(parseComposePsOutput(JSON.stringify([serviceRecord])).Health, "healthy");
assert.equal(assertComposePublisher(serviceRecord).publishedPort, 55432);
for (const invalid of [
  { ...serviceRecord, Health: "starting" },
  { ...serviceRecord, Publishers: [{ ...serviceRecord.Publishers[0], URL: "0.0.0.0" }] },
  { ...serviceRecord, Publishers: [{ ...serviceRecord.Publishers[0], PublishedPort: 0 }] },
  { ...serviceRecord, Publishers: [{ ...serviceRecord.Publishers[0], TargetPort: 5433 }] },
  { ...serviceRecord, Publishers: [{ ...serviceRecord.Publishers[0], Protocol: "udp" }] },
  { ...serviceRecord, Publishers: [] },
]) assert.throws(() => assertComposePublisher(invalid));

const authorization = { packageId: "WP-TEST", runId: "test-run" };
const evidence = {
  schemaVersion: 2,
  proof: "TP-01",
  packageId: "WP-TEST",
  runId: "test-run",
  phase: "PRIMARY",
  status: "PASS",
  tcpReachability: "OPEN",
  docker: { targetKey: "5432/tcp", host: "127.0.0.1", publishedPort: 55432 },
  compose: {
    service: "postgres",
    state: "running",
    health: "healthy",
    host: "127.0.0.1",
    targetPort: 5432,
    publishedPort: 55432,
    protocol: "tcp",
  },
  composeInterpolation: {
    source: "EPHEMERAL_SYNTHETIC_REACHABILITY_ONLY",
    purpose: "COMPOSE_CONFIG_INTERPOLATION_FOR_READ_ONLY_PS",
    actualBootstrapCredentialPresentBefore: false,
    actualBootstrapCredentialPropagated: false,
    runtimeCredentialPropagated: false,
    databaseUrlPropagated: false,
    pullTokenPropagated: false,
    serviceMutationAllowed: false,
    valueRetained: false,
  },
};
assert.equal(assertRuntimeReachabilityEvidence(evidence, authorization, "PRIMARY"), evidence);
assert.throws(
  () => assertRuntimeReachabilityEvidence({ ...evidence, runId: "wrong-run" }, authorization),
  /authorized run/,
);
assert.throws(
  () => assertRuntimeReachabilityEvidence(evidence, authorization, "REPRODUCTION"),
  /authorized run/,
);
assert.throws(
  () => assertRuntimeReachabilityEvidence({ ...evidence, tcpReachability: "CLOSED" }, authorization),
  /authorized run/,
);
assert.throws(
  () => assertRuntimeReachabilityEvidence({
    ...evidence,
    composeInterpolation: {
      ...evidence.composeInterpolation,
      actualBootstrapCredentialPropagated: true,
    },
  }, authorization),
  /authorized run/,
);

process.stdout.write("WP-38 runtime reachability contract static tests passed\n");
