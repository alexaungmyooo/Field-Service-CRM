import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { assertExactNode } from "./runtime-contract.mjs";

assertExactNode();

const result = spawnSync(process.execPath, [resolve("node_modules/typescript/bin/tsc"), "--noEmit"], {
  encoding: "utf8",
  stdio: "inherit",
});

if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
