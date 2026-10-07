import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

export const allowedRunScripts = Object.freeze([
  "preflight",
  "matrix:verify",
  "typecheck",
  "evidence:supply-chain",
  "evidence:static",
  "evidence:hash",
  "db:verify-image",
  "runtime:verify-reachability",
  "db:reset",
  "proof:run",
  "proof:reproduce",
  "evidence:verify",
]);

const allowedRunScriptSet = new Set(allowedRunScripts);
const exactInstallArgs = Object.freeze([
  "install",
  "--offline",
  "--frozen-lockfile",
  "--ignore-scripts",
]);
const exactListArgs = Object.freeze(["list", "--depth", "Infinity", "--json"]);

export function classifyExactPnpmArguments(args) {
  if (JSON.stringify(args) === JSON.stringify(exactInstallArgs)) return "install";
  if (JSON.stringify(args) === JSON.stringify(exactListArgs)) return "list";
  if (JSON.stringify(args) === JSON.stringify(["--version"])) return "version";
  if (args.length === 2 && args[0] === "run" && allowedRunScriptSet.has(args[1])) return "run";
  return null;
}

export function assertLauncherPackageAgreement(packageScripts) {
  if (typeof packageScripts !== "object" || packageScripts === null) {
    throw new Error("package scripts are required for launcher agreement");
  }
  for (const script of allowedRunScripts) {
    if (typeof packageScripts[script] !== "string" || packageScripts[script].length === 0) {
      throw new Error(`launcher-approved package script is missing: ${script}`);
    }
  }
  if (packageScripts["runtime:verify-reachability"] !== "node scripts/runtime-reachability.mjs") {
    throw new Error("runtime reachability package command differs from the accepted command");
  }
  return true;
}

export function assertDependenciesPresent(root = process.cwd()) {
  if (!existsSync(resolve(root, "node_modules"))) {
    throw new Error("dependencies are absent; refusing automatic materialization for a run command");
  }
}

export function captureDependencyMarkerState(root = process.cwd()) {
  const markerPaths = [
    resolve(root, "node_modules/.modules.yaml"),
    resolve(root, "node_modules/.pnpm/lock.yaml"),
  ];
  return Object.fromEntries(
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
}

export function assertDependencyMarkerStateUnchanged(before, after) {
  if (JSON.stringify(before) !== JSON.stringify(after)) {
    throw new Error("pnpm run command changed dependency metadata");
  }
  return true;
}
