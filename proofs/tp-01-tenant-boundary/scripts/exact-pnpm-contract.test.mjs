import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import {
  allowedRunScripts,
  assertDependenciesPresent,
  assertDependencyMarkerStateUnchanged,
  assertLauncherPackageAgreement,
  captureDependencyMarkerState,
  classifyExactPnpmArguments,
} from "./exact-pnpm-contract.mjs";

const expectedAllowedRunScripts = [
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
];
assert.deepEqual(allowedRunScripts, expectedAllowedRunScripts);
for (const script of expectedAllowedRunScripts) {
  assert.equal(classifyExactPnpmArguments(["run", script]), "run");
}
assert.equal(
  classifyExactPnpmArguments(["run", "runtime:verify-reachability"]),
  "run",
);
assert.equal(
  allowedRunScripts.filter((name) => name === "runtime:verify-reachability").length,
  1,
);
for (const args of [
  ["run", "runtime:verify-reachability", "--", "extra"],
  ["run", "runtime:verify-reachability "],
  ["run", "runtime_verify_reachability"],
  ["run", "evidence:verify-final"],
]) {
  assert.equal(classifyExactPnpmArguments(args), null);
}
assert.equal(
  classifyExactPnpmArguments(["install", "--offline", "--frozen-lockfile", "--ignore-scripts"]),
  "install",
);
assert.equal(classifyExactPnpmArguments(["list", "--depth", "Infinity", "--json"]), "list");
assert.equal(classifyExactPnpmArguments(["--version"]), "version");
for (const args of [
  ["install", "--frozen-lockfile", "--offline", "--ignore-scripts"],
  ["list", "--depth", "Infinity"],
  ["--version", "--silent"],
]) {
  assert.equal(classifyExactPnpmArguments(args), null);
}

const packageJson = JSON.parse(readFileSync(resolve("package.json"), "utf8"));
assert.equal(assertLauncherPackageAgreement(packageJson.scripts), true);

const root = mkdtempSync(resolve(tmpdir(), "tp01-exact-pnpm-contract-"));
try {
  assert.throws(() => assertDependenciesPresent(root), /dependencies are absent/);
  mkdirSync(resolve(root, "node_modules/.pnpm"), { recursive: true });
  writeFileSync(resolve(root, "node_modules/.modules.yaml"), "modules\n");
  writeFileSync(resolve(root, "node_modules/.pnpm/lock.yaml"), "lock\n");
  assert.doesNotThrow(() => assertDependenciesPresent(root));

  const before = captureDependencyMarkerState(root);
  const unchanged = captureDependencyMarkerState(root);
  assert.equal(assertDependencyMarkerStateUnchanged(before, unchanged), true);

  writeFileSync(resolve(root, "node_modules/.modules.yaml"), "changed\n");
  const changed = captureDependencyMarkerState(root);
  assert.throws(
    () => assertDependencyMarkerStateUnchanged(before, changed),
    /changed dependency metadata/,
  );
} finally {
  rmSync(root, { recursive: true, force: true });
}

process.stdout.write("WP-42 exact pnpm launcher contract static tests passed\n");
