import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { assertDeviationEvidence } from "./deviation-contract.mjs";
import {
  activationFailureDocument,
  classifyPrivateEnvironmentLaunchArguments,
  launchPrivateEnvironmentPreflight,
  writeActivationFailureEvidence,
} from "./private-environment-launcher.mjs";

const tempRoot = mkdtempSync(resolve(tmpdir(), "tp01 wp50 static "));
try {
  const evidenceDirectory = resolve(tempRoot, "evidence path with spaces");
  mkdirSync(evidenceDirectory);
  const context = { packageId: "WP-50", runId: "wp50-static-contract-01", evidenceDirectory };
  const secretLiteral = "credential-$HOME-$(id)-`id`-;&|#";
  const urlLiteral = "postgresql://tp01_runtime:secret@127.0.0.1:55432/tp01";
  const source = [
    "TP01_BOOTSTRAP_PASSWORD=bootstrap-literal",
    `TP01_RUNTIME_PASSWORD=${secretLiteral}`,
    `TP01_DATABASE_URL=${urlLiteral}`,
    "TP01_EXECUTION_AUTHORIZATION=AUTHORIZED_BY_LATER_OWNER_PACKAGE",
    "TP01_EXECUTION_PACKAGE=WP-50",
    "TP01_RUN_ID=wp50-static-contract-01",
    `TP01_EVIDENCE_DIR=${evidenceDirectory}`,
    "TP01_PNPM_ENTRY=/private/tmp/runtime with spaces/pnpm.mjs",
    `TP01_NODE_BIN=${process.execPath}`,
  ].join("\n");

  assert.deepEqual(
    classifyPrivateEnvironmentLaunchArguments([
      "--environment",
      resolve(tempRoot, "runtime environment.env"),
      "preflight",
    ]).operation,
    "preflight",
  );
  assert.throws(() => classifyPrivateEnvironmentLaunchArguments(["preflight"]));
  assert.throws(() =>
    classifyPrivateEnvironmentLaunchArguments(["--environment", "relative.env", "preflight"]),
  );
  assert.throws(() =>
    classifyPrivateEnvironmentLaunchArguments([
      "--environment",
      resolve(tempRoot, "runtime.env"),
      "proof:run",
    ]),
  );

  let observed;
  const status = launchPrivateEnvironmentPreflight(source, {
    authorize: (environment) => {
      assert.equal(environment.TP01_EXECUTION_PACKAGE, "WP-50");
      return {
        authorization: {
          launchers: {
            node: { path: process.execPath },
            pnpm: { entry: "/private/tmp/runtime with spaces/pnpm.mjs" },
          },
        },
      };
    },
    spawn: (executable, args, options) => {
      observed = { executable, args, options };
      return { status: 0 };
    },
  });
  assert.equal(status, 0);
  assert.equal(observed.executable, process.execPath);
  assert.deepEqual(observed.args.slice(-2), ["run", "preflight"]);
  assert.equal(observed.options.env.TP01_RUNTIME_PASSWORD, secretLiteral);
  assert.equal(observed.options.env.TP01_EVIDENCE_DIR, evidenceDirectory);
  assert.throws(
    () =>
      launchPrivateEnvironmentPreflight(source, {
        authorize: () => {
          throw new Error("authorization details must not escape");
        },
        spawn: () => {
          throw new Error("spawn must remain unreachable");
        },
      }),
    (error) => error.code === "PRIVATE_ENVIRONMENT_AUTHORIZATION_REJECTED",
  );
  assert.throws(
    () =>
      launchPrivateEnvironmentPreflight(source, {
        authorize: () => ({
          authorization: {
            launchers: {
              node: { path: "/wrong/node" },
              pnpm: { entry: "/wrong/pnpm.mjs" },
            },
          },
        }),
        spawn: () => {
          throw new Error("spawn must remain unreachable");
        },
      }),
    (error) => error.code === "PRIVATE_ENVIRONMENT_LAUNCHER_BINDING_MISMATCH",
  );

  const failure = activationFailureDocument(context, "PRIVATE_ENVIRONMENT_KEY_MISSING");
  assert.equal(JSON.stringify(failure).includes(secretLiteral), false);
  assert.equal(JSON.stringify(failure).includes(urlLiteral), false);
  assert.equal(JSON.stringify(failure).includes(evidenceDirectory), false);

  const { failurePath, deviationsPath } = writeActivationFailureEvidence(
    context,
    "PRIVATE_ENVIRONMENT_KEY_MISSING",
  );
  const retained = `${readFileSync(failurePath, "utf8")}\n${readFileSync(deviationsPath, "utf8")}`;
  assert.equal(retained.includes(secretLiteral), false);
  assert.equal(retained.includes(urlLiteral), false);
  assert.equal(retained.includes(evidenceDirectory), false);
  const deviations = JSON.parse(readFileSync(deviationsPath, "utf8"));
  assert.equal(assertDeviationEvidence(deviations).operationalStops.length, 1);
  assert.equal(deviations.operationalStops[0].run, "PREFLIGHT");
  assert.equal(deviations.operationalStops[0].stage, "PRIVATE_ENVIRONMENT_ACTIVATION");
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}

process.stdout.write("WP-50 private environment launcher tests passed\n");
