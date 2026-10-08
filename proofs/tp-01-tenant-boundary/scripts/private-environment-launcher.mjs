import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  appendOperationalStop,
  assertDeviationEvidence,
  createDeviationEvidence,
} from "./deviation-contract.mjs";
import {
  assertExecutionAuthorized,
  assertExecutionContextAuthorized,
} from "./execution-authorization.mjs";
import { assertExactNode } from "./runtime-contract.mjs";
import {
  parsePrivateEnvironment,
  privateEnvironmentContext,
  privateExecutionEnvironment,
  PrivateEnvironmentContractError,
} from "./private-environment-contract.mjs";

const activationFailureArtifact = "private-environment-activation-failure.json";
const launcherDirectory = dirname(fileURLToPath(import.meta.url));
const proofRoot = resolve(launcherDirectory, "..");

export function classifyPrivateEnvironmentLaunchArguments(args) {
  if (
    args.length !== 3 ||
    args[0] !== "--environment" ||
    !isAbsolute(args[1]) ||
    args[2] !== "preflight"
  ) {
    throw new PrivateEnvironmentContractError("PRIVATE_ENVIRONMENT_LAUNCH_SHAPE_INVALID");
  }
  return Object.freeze({ environmentPath: args[1], operation: args[2] });
}

export function activationFailureDocument(context, code) {
  return {
    schemaVersion: 1,
    proof: "TP-01",
    packageId: context.packageId,
    runId: context.runId,
    status: "FAIL_CLOSED",
    classification: "PRIVATE_ENVIRONMENT_ACTIVATION_FAILURE",
    stage: "PRIVATE_ENVIRONMENT_ACTIVATION",
    code,
    diagnostic: "Private environment activation failed the exact non-evaluating contract.",
    evidenceArtifact: activationFailureArtifact,
    retained: {
      environmentValues: false,
      credentials: false,
      databaseUrl: false,
      absolutePaths: false,
    },
  };
}

export function writeActivationFailureEvidence(context, code) {
  const failure = activationFailureDocument(context, code);
  const failurePath = resolve(context.evidenceDirectory, activationFailureArtifact);
  const deviationsPath = resolve(context.evidenceDirectory, "deviations.json");
  const deviations = existsSync(deviationsPath)
    ? assertDeviationEvidence(JSON.parse(readFileSync(deviationsPath, "utf8")))
    : createDeviationEvidence();
  const stopped = appendOperationalStop(deviations, {
    run: "PREFLIGHT",
    stage: "PRIVATE_ENVIRONMENT_ACTIVATION",
    code,
    evidenceArtifact: activationFailureArtifact,
  });
  writeFileSync(failurePath, `${JSON.stringify(failure, null, 2)}\n`, { mode: 0o600 });
  writeFileSync(deviationsPath, `${JSON.stringify(stopped, null, 2)}\n`, { mode: 0o600 });
  return Object.freeze({ failurePath, deviationsPath });
}

export function launchPrivateEnvironmentPreflight(
  source,
  { spawn = spawnSync, authorize = assertExecutionAuthorized } = {},
) {
  const environment = parsePrivateEnvironment(source);
  if (environment.TP01_NODE_BIN !== process.execPath) {
    throw new PrivateEnvironmentContractError("PRIVATE_ENVIRONMENT_NODE_BINARY_MISMATCH");
  }
  let authorization;
  try {
    ({ authorization } = authorize(environment));
  } catch {
    throw new PrivateEnvironmentContractError("PRIVATE_ENVIRONMENT_AUTHORIZATION_REJECTED");
  }
  if (
    authorization.launchers?.node?.path !== environment.TP01_NODE_BIN ||
    authorization.launchers?.pnpm?.entry !== environment.TP01_PNPM_ENTRY
  ) {
    throw new PrivateEnvironmentContractError("PRIVATE_ENVIRONMENT_LAUNCHER_BINDING_MISMATCH");
  }
  const result = spawn(
    process.execPath,
    [resolve(launcherDirectory, "exact-pnpm.mjs"), "run", "preflight"],
    {
      cwd: proofRoot,
      env: privateExecutionEnvironment(environment),
      stdio: "inherit",
    },
  );
  if (result.error) {
    throw new PrivateEnvironmentContractError("PRIVATE_ENVIRONMENT_PREFLIGHT_SPAWN_FAILED");
  }
  return result.status ?? 1;
}

export function main(args = process.argv.slice(2)) {
  assertExactNode();
  let source;
  let context;
  try {
    const launch = classifyPrivateEnvironmentLaunchArguments(args);
    source = readFileSync(launch.environmentPath, "utf8");
    context = privateEnvironmentContext(source);
    return launchPrivateEnvironmentPreflight(source);
  } catch (error) {
    const code =
      error instanceof PrivateEnvironmentContractError
        ? error.code
        : "PRIVATE_ENVIRONMENT_ACTIVATION_INTERNAL_ERROR";
    if (context) {
      try {
        assertExecutionContextAuthorized(context);
        writeActivationFailureEvidence(context, code);
      } catch {
        context = null;
      }
    }
    process.stderr.write(
      `${JSON.stringify({ status: "FAIL_CLOSED", stage: "PRIVATE_ENVIRONMENT_ACTIVATION", code })}\n`,
    );
    return 1;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  process.exitCode = main();
}
