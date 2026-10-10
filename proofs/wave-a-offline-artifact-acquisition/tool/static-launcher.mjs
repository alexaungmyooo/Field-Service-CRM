import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { commandAllowed, CONTRACT, sha256File, validateAuthorization } from "./contract.mjs";

function parse(argv) {
  const separator = argv.indexOf("--");
  if (separator < 0) throw new Error("ARG_SEPARATOR");
  const options = argv.slice(0, separator);
  const command = argv.slice(separator + 1);
  const value = (name) => {
    const positions = options.flatMap((item, index) => item === name ? [index] : []);
    if (positions.length !== 1 || !options[positions[0] + 1]) throw new Error(`ARG:${name}`);
    return options[positions[0] + 1];
  };
  if (command.length === 0) throw new Error("ARG_COMMAND");
  return { authorization: resolve(value("--authorization")), stage: value("--stage"), executable: command[0], args: command.slice(1) };
}

export function validateNodeBinding(binding) {
  if (binding.path !== CONTRACT.node.path || binding.version !== CONTRACT.node.version || binding.sha256 !== CONTRACT.node.sha256) {
    throw new Error("NODE_BINDING_CONTRACT");
  }
  if (sha256File(binding.path) !== binding.sha256) throw new Error("NODE_BINDING_HASH");
  const version = spawnSync(binding.path, ["--version"], { encoding: "utf8", shell: false });
  if (version.status !== 0 || version.stdout.trim() !== binding.version) throw new Error("NODE_BINDING_VERSION");
  return true;
}

export function runStaticCommand(parsed, now = new Date()) {
  const expectedAuth = resolve(process.cwd(), "internal-local/work-packages/WP-111/authorization.json");
  if (parsed.authorization !== expectedAuth) throw new Error("AUTH_PATH");
  const auth = JSON.parse(readFileSync(parsed.authorization, "utf8"));
  validateAuthorization(auth, now);
  validateNodeBinding(auth.nodeBinding);
  if (!commandAllowed(auth, parsed.stage, parsed.executable, parsed.args)) throw new Error("COMMAND_NOT_ALLOWED");
  const result = spawnSync(parsed.executable, parsed.args, { cwd: process.cwd(), encoding: "utf8", shell: false });
  process.stdout.write(result.stdout ?? "");
  process.stderr.write(result.stderr ?? "");
  if (result.status !== 0) throw new Error(`COMMAND_EXIT:${result.status}`);
  return true;
}

function main() {
  runStaticCommand(parse(process.argv.slice(2)));
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  try { main(); } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}

