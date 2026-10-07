import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { exactRuntimeEnvironment, inspectExactPnpm } from "./runtime-contract.mjs";
import {
  assertDependenciesPresent,
  assertDependencyMarkerStateUnchanged,
  assertLauncherPackageAgreement,
  captureDependencyMarkerState,
  classifyExactPnpmArguments,
} from "./exact-pnpm-contract.mjs";

const args = process.argv.slice(2);
const mode = classifyExactPnpmArguments(args);
const installMode = mode === "install";
const dependencyReadMode = mode === "run" || mode === "list";

if (!mode) {
  throw new Error("exact pnpm launcher rejected an unapproved command shape");
}
if (
  installMode &&
  process.env.TP01_DEPENDENCY_RESTORE_AUTHORIZATION !==
    "WP-25_OFFLINE_FROZEN_IGNORE_SCRIPTS"
) {
  throw new Error("exact dependency restoration is not authorized");
}
if (dependencyReadMode) {
  assertDependenciesPresent();
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
  assertLauncherPackageAgreement(packageJson.scripts);
}

const pnpm = inspectExactPnpm();
const before = dependencyReadMode ? captureDependencyMarkerState() : null;
const result = spawnSync(process.execPath, [pnpm.entry, ...args], {
  env: exactRuntimeEnvironment(),
  stdio: "inherit",
});
if (result.error) throw result.error;
if (dependencyReadMode) {
  assertDependencyMarkerStateUnchanged(before, captureDependencyMarkerState());
}
if (installMode && !existsSync("node_modules/.modules.yaml")) {
  throw new Error("offline dependency restoration did not produce pnpm metadata");
}
if (result.status !== 0) process.exit(result.status ?? 1);
