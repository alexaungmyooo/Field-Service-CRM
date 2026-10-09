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
const authorizationEnvironmentKeys = Object.freeze([
  "TP01_EXECUTION_AUTHORIZATION",
  "TP01_EXECUTION_PACKAGE",
  "TP01_RUN_ID",
  "TP01_EVIDENCE_DIR",
  "TP01_PNPM_ENTRY",
  "TP01_NODE_BIN",
]);

export const privateEnvironmentOperationContract = Object.freeze({
  preflight: Object.freeze({
    launcher: "EXACT_PNPM",
    arguments: Object.freeze(["run", "preflight"]),
    privateValues: Object.freeze([
      "TP01_BOOTSTRAP_PASSWORD",
      "TP01_RUNTIME_PASSWORD",
      "TP01_DATABASE_URL",
    ]),
  }),
  "db:verify-image": Object.freeze({
    launcher: "EXACT_PNPM",
    arguments: Object.freeze(["run", "db:verify-image"]),
    privateValues: Object.freeze(["TP01_IMAGE_PULL_AUTHORIZATION_TOKEN"]),
  }),
  "db:start": Object.freeze({
    launcher: "DOCKER",
    arguments: Object.freeze(["compose", "up", "-d", "--wait", "postgres"]),
    privateValues: Object.freeze(["TP01_BOOTSTRAP_PASSWORD"]),
  }),
  "runtime:verify-reachability": Object.freeze({
    launcher: "EXACT_PNPM",
    arguments: Object.freeze(["run", "runtime:verify-reachability"]),
    privateValues: Object.freeze([]),
  }),
  "db:reset": Object.freeze({
    launcher: "EXACT_PNPM",
    arguments: Object.freeze(["run", "db:reset"]),
    privateValues: Object.freeze(["TP01_RUNTIME_PASSWORD", "TP01_DATABASE_URL"]),
  }),
  "matrix:verify": Object.freeze({
    launcher: "EXACT_PNPM",
    arguments: Object.freeze(["run", "matrix:verify"]),
    privateValues: Object.freeze([]),
  }),
  "proof:run": Object.freeze({
    launcher: "EXACT_PNPM",
    arguments: Object.freeze(["run", "proof:run"]),
    privateValues: Object.freeze(["TP01_RUNTIME_PASSWORD", "TP01_DATABASE_URL"]),
  }),
  "proof:reproduce": Object.freeze({
    launcher: "EXACT_PNPM",
    arguments: Object.freeze(["run", "proof:reproduce"]),
    privateValues: Object.freeze(["TP01_RUNTIME_PASSWORD", "TP01_DATABASE_URL"]),
  }),
  "evidence:verify": Object.freeze({
    launcher: "EXACT_PNPM",
    arguments: Object.freeze(["run", "evidence:verify"]),
    privateValues: Object.freeze([]),
  }),
  cleanup: Object.freeze({
    launcher: "EXACT_NODE",
    script: "cleanup.mjs",
    arguments: Object.freeze([]),
    privateValues: Object.freeze([]),
  }),
  "evidence:verify-final": Object.freeze({
    launcher: "EXACT_NODE",
    script: "evidence-verify.mjs",
    arguments: Object.freeze(["--final"]),
    privateValues: Object.freeze([]),
  }),
});

export function privateEnvironmentForOperation(environment, operation, baseEnvironment) {
  if (!Object.hasOwn(privateEnvironmentOperationContract, operation)) {
    throw new PrivateEnvironmentContractError("PRIVATE_ENVIRONMENT_OPERATION_INVALID");
  }
  const childEnvironment = privateExecutionEnvironment(environment, baseEnvironment);
  const retainedKeys = new Set([
    ...authorizationEnvironmentKeys,
    ...privateEnvironmentOperationContract[operation].privateValues,
  ]);
  for (const key of Object.keys(childEnvironment)) {
    if (key.startsWith("TP01_") && !retainedKeys.has(key)) delete childEnvironment[key];
  }
  return childEnvironment;
}

export function privateEnvironmentOperationCommand(operation) {
  if (!Object.hasOwn(privateEnvironmentOperationContract, operation)) {
    throw new PrivateEnvironmentContractError("PRIVATE_ENVIRONMENT_OPERATION_INVALID");
  }
  const contract = privateEnvironmentOperationContract[operation];
  if (contract.launcher === "EXACT_PNPM") {
    return Object.freeze({
      executable: process.execPath,
      arguments: Object.freeze([
        resolve(launcherDirectory, "exact-pnpm.mjs"),
        ...contract.arguments,
      ]),
    });
  }
  if (contract.launcher === "EXACT_NODE") {
    return Object.freeze({
      executable: process.execPath,
      arguments: Object.freeze([
        resolve(launcherDirectory, contract.script),
        ...contract.arguments,
      ]),
    });
  }
  if (contract.launcher === "DOCKER") {
    return Object.freeze({
      executable: "docker",
      arguments: contract.arguments,
    });
  }
  throw new PrivateEnvironmentContractError("PRIVATE_ENVIRONMENT_OPERATION_INVALID");
}

export function classifyPrivateEnvironmentLaunchArguments(args) {
  if (
    args.length !== 3 ||
    args[0] !== "--environment" ||
    !isAbsolute(args[1]) ||
    !Object.hasOwn(privateEnvironmentOperationContract, args[2])
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

export function launchPrivateEnvironmentOperation(
  source,
  operation,
  {
    spawn = spawnSync,
    authorize = assertExecutionAuthorized,
    baseEnvironment = process.env,
  } = {},
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
  const command = privateEnvironmentOperationCommand(operation);
  const result = spawn(
    command.executable,
    command.arguments,
    {
      cwd: proofRoot,
      env: privateEnvironmentForOperation(environment, operation, baseEnvironment),
      stdio: "inherit",
    },
  );
  if (result.error) {
    throw new PrivateEnvironmentContractError("PRIVATE_ENVIRONMENT_OPERATION_SPAWN_FAILED");
  }
  return result.status ?? 1;
}

export function launchPrivateEnvironmentPreflight(source, options = {}) {
  return launchPrivateEnvironmentOperation(source, "preflight", options);
}

export function main(args = process.argv.slice(2)) {
  assertExactNode();
  let source;
  let context;
  try {
    const launch = classifyPrivateEnvironmentLaunchArguments(args);
    source = readFileSync(launch.environmentPath, "utf8");
    context = privateEnvironmentContext(source);
    return launchPrivateEnvironmentOperation(source, launch.operation);
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
