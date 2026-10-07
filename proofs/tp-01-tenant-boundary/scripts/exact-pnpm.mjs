import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { exactRuntimeEnvironment, inspectExactPnpm } from "./runtime-contract.mjs";

const args = process.argv.slice(2);
const allowedRunScripts = new Set([
  "preflight",
  "matrix:verify",
  "typecheck",
  "evidence:supply-chain",
  "evidence:static",
  "evidence:hash",
  "db:verify-image",
  "db:reset",
  "proof:run",
  "proof:reproduce",
  "evidence:verify",
]);
const exactInstallArgs = ["install", "--offline", "--frozen-lockfile", "--ignore-scripts"];
const exactListArgs = ["list", "--depth", "Infinity", "--json"];
const installMode = JSON.stringify(args) === JSON.stringify(exactInstallArgs);
const listMode = JSON.stringify(args) === JSON.stringify(exactListArgs);
const versionMode = JSON.stringify(args) === JSON.stringify(["--version"]);
const runMode = args.length === 2 && args[0] === "run" && allowedRunScripts.has(args[1]);
const dependencyReadMode = runMode || listMode;

if (!installMode && !versionMode && !dependencyReadMode) {
  throw new Error("exact pnpm launcher rejected an unapproved command shape");
}
if (
  installMode &&
  process.env.TP01_DEPENDENCY_RESTORE_AUTHORIZATION !==
    "WP-25_OFFLINE_FROZEN_IGNORE_SCRIPTS"
) {
  throw new Error("exact dependency restoration is not authorized");
}
if (dependencyReadMode && !existsSync(resolve("node_modules"))) {
  throw new Error("dependencies are absent; refusing automatic materialization for a run command");
}

const pnpm = inspectExactPnpm();
const markerPaths = [
  resolve("node_modules/.modules.yaml"),
  resolve("node_modules/.pnpm/lock.yaml"),
];
const markerState = () =>
  Object.fromEntries(
    markerPaths.map((path) => {
      if (!existsSync(path)) return [path, null];
      const bytes = readFileSync(path);
      return [
        path,
        {
          bytes: bytes.length,
          sha256: createHash("sha256").update(bytes).digest("hex"),
        },
      ];
    }),
  );
const before = dependencyReadMode ? markerState() : null;
const result = spawnSync(process.execPath, [pnpm.entry, ...args], {
  env: exactRuntimeEnvironment(),
  stdio: "inherit",
});
if (result.error) throw result.error;
if (dependencyReadMode && JSON.stringify(before) !== JSON.stringify(markerState())) {
  throw new Error("pnpm run command changed dependency metadata");
}
if (installMode && !existsSync(resolve("node_modules/.modules.yaml"))) {
  throw new Error("offline dependency restoration did not produce pnpm metadata");
}
if (result.status !== 0) process.exit(result.status ?? 1);
