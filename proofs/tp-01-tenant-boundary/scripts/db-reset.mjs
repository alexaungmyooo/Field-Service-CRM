import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { run } from "./command.mjs";
import { assertExecutionAuthorized } from "./execution-authorization.mjs";
import {
  captureDatabaseSecurityEvidence,
  captureFixtureEvidence,
} from "./database-evidence.mjs";

const { evidenceDirectory } = assertExecutionAuthorized();
const runtimePassword = process.env.TP01_RUNTIME_PASSWORD;
if (!runtimePassword) throw new Error("TP01_RUNTIME_PASSWORD is required");
for (const name of ["001_roles.sql", "002_schema.sql", "003_rls.sql", "004_seed.sql"]) {
  const args = ["compose", "exec", "-T", "postgres", "psql", "-U", "tp01_bootstrap", "-d", "tp01"];
  if (name === "001_roles.sql") args.push("--set", `runtime_password=${runtimePassword}`);
  run("docker", args, { input: readFileSync(resolve("sql", name), "utf8") });
}
mkdirSync(evidenceDirectory, { recursive: true });
writeFileSync(
  resolve(evidenceDirectory, "fixture.json"),
  `${JSON.stringify(captureFixtureEvidence(), null, 2)}\n`,
);
writeFileSync(
  resolve(evidenceDirectory, "database-security.json"),
  `${JSON.stringify(captureDatabaseSecurityEvidence(), null, 2)}\n`,
);
