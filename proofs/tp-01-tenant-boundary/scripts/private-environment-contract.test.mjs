import assert from "node:assert/strict";
import {
  parsePrivateEnvironment,
  privateEnvironmentContext,
  privateEnvironmentFailureCodes,
  privateExecutionEnvironment,
  PrivateEnvironmentContractError,
} from "./private-environment-contract.mjs";

const evidenceDirectory = "/private/tmp/Field Service CRM/WP-50 evidence";
const credentialLiteral = "literal $HOME $(id) `id` ; & | # ' \" \\ end";
const lines = [
  "TP01_BOOTSTRAP_PASSWORD=bootstrap-literal",
  `TP01_RUNTIME_PASSWORD=${credentialLiteral}`,
  "TP01_DATABASE_URL=postgresql://tp01_runtime:encoded%24value@127.0.0.1:55432/tp01",
  "TP01_EXECUTION_AUTHORIZATION=AUTHORIZED_BY_LATER_OWNER_PACKAGE",
  "TP01_EXECUTION_PACKAGE=WP-50",
  "TP01_RUN_ID=wp50-static-contract-01",
  `TP01_EVIDENCE_DIR=${evidenceDirectory}`,
  "TP01_PNPM_ENTRY=/private/tmp/runtime with spaces/pnpm.mjs",
  "TP01_NODE_BIN=/private/tmp/runtime with spaces/node",
];
const source = `${lines.join("\n")}\n`;
const parsed = parsePrivateEnvironment(source);

assert.equal(parsed.TP01_EVIDENCE_DIR, evidenceDirectory);
assert.equal(parsed.TP01_RUNTIME_PASSWORD, credentialLiteral);
assert.equal(privateEnvironmentContext(source).evidenceDirectory, evidenceDirectory);
assert.equal(process.env.TP01_RUNTIME_PASSWORD, undefined);

const child = privateExecutionEnvironment(parsed, {
  PATH: "/usr/bin",
  TP01_RUNTIME_PASSWORD: "ambient-must-not-survive",
  TP01_UNREVIEWED_VALUE: "remove-me",
});
assert.equal(child.PATH, "/usr/bin");
assert.equal(child.TP01_RUNTIME_PASSWORD, credentialLiteral);
assert.equal(child.TP01_UNREVIEWED_VALUE, undefined);

function assertCode(candidate, code) {
  assert.throws(
    () => parsePrivateEnvironment(candidate),
    (error) => error instanceof PrivateEnvironmentContractError && error.code === code,
  );
}

assertCode(
  source.replace("TP01_RUN_ID=wp50-static-contract-01\n", ""),
  privateEnvironmentFailureCodes.MISSING_KEY,
);
assertCode(
  source.replace(
    "TP01_RUN_ID=wp50-static-contract-01",
    "TP01_RUN_ID=wp50-static-contract-01\nTP01_RUN_ID=duplicate",
  ),
  privateEnvironmentFailureCodes.DUPLICATE_KEY,
);
assertCode(
  `${source}TP01_UNKNOWN=value\n`,
  privateEnvironmentFailureCodes.UNKNOWN_KEY,
);
assertCode(
  source.replace("TP01_EXECUTION_PACKAGE=WP-50", "TP01_EXECUTION_PACKAGE"),
  privateEnvironmentFailureCodes.LINE,
);
assertCode(
  source.replace(`TP01_EVIDENCE_DIR=${evidenceDirectory}`, "TP01_EVIDENCE_DIR=relative/path"),
  privateEnvironmentFailureCodes.EVIDENCE_DIRECTORY,
);
assertCode(
  source.replace("TP01_RUNTIME_PASSWORD=" + credentialLiteral, "TP01_RUNTIME_PASSWORD="),
  privateEnvironmentFailureCodes.EMPTY_VALUE,
);
assert.equal(
  privateEnvironmentContext(source.replace("TP01_RUN_ID=wp50-static-contract-01", "BROKEN")),
  null,
);

process.stdout.write("WP-50 private environment contract tests passed\n");
