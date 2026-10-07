import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { delimiter, dirname, isAbsolute } from "node:path";

export const expectedNodeVersion = "v22.23.1";
export const expectedPnpmVersion = "11.25.0";
export const expectedNodeSha256 =
  "2e3f1286a7eb3736346ed1803e458a0ff909e2b2d5bc746144dcb76970e9b99d";
export const expectedPnpmEntrySha256 =
  "ff3224d46b47fbb24a7e9fe15fededef7e00892d07d4e376b6762d4899906bfd";

export function assertExactNode() {
  if (process.version !== expectedNodeVersion) {
    throw new Error(
      `Node runtime mismatch: expected ${expectedNodeVersion}, received ${process.version}`,
    );
  }
  const actualSha256 = createHash("sha256").update(readFileSync(process.execPath)).digest("hex");
  if (actualSha256 !== expectedNodeSha256) {
    throw new Error(
      `Node binary hash mismatch: expected ${expectedNodeSha256}, received ${actualSha256}`,
    );
  }
}

export function exactRuntimeEnvironment() {
  assertExactNode();
  return {
    ...process.env,
    PATH: `${dirname(process.execPath)}${delimiter}${process.env.PATH ?? ""}`,
    COREPACK_ENABLE_DOWNLOAD_PROMPT: "0",
    npm_config_ignore_scripts: "true",
    npm_config_offline: "true",
    pnpm_config_ignore_scripts: "true",
    pnpm_config_offline: "true",
  };
}

export function inspectExactPnpm() {
  const entry = process.env.TP01_PNPM_ENTRY;
  if (!entry || !isAbsolute(entry) || !existsSync(entry)) {
    throw new Error("TP01_PNPM_ENTRY must identify an existing absolute pnpm.mjs path");
  }
  const bytes = readFileSync(entry);
  const sha256 = createHash("sha256").update(bytes).digest("hex");
  if (sha256 !== expectedPnpmEntrySha256) {
    throw new Error(
      `pnpm entry hash mismatch: expected ${expectedPnpmEntrySha256}, received ${sha256}`,
    );
  }
  const result = spawnSync(process.execPath, [entry, "--version"], {
    encoding: "utf8",
    env: exactRuntimeEnvironment(),
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`exact pnpm version check failed (${result.status ?? result.signal})`);
  }
  const version = result.stdout.trim();
  if (version !== expectedPnpmVersion) {
    throw new Error(`pnpm mismatch: expected ${expectedPnpmVersion}, observed ${version}`);
  }
  return {
    entry,
    version,
    sha256,
    node: process.execPath,
  };
}
