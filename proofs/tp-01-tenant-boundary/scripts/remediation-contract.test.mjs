import assert from "node:assert/strict";
import {
  assertComposeEvidenceContract,
  assertExactComposeVersion,
  cleanupComposeEnvironment,
  composeVersionFromStdout,
  normalizeComposeSemanticVersion,
} from "./remediation-contract.mjs";

assert.equal(composeVersionFromStdout("5.4.0"), "5.4.0");
assert.equal(composeVersionFromStdout("v5.4.0\n"), "v5.4.0");
assert.equal(composeVersionFromStdout("5.4.0\r\n"), "5.4.0");
for (const invalidOutput of ["", "\n", "5.4.0\n\n", "5.4.0\nextra\n"]) {
  assert.throws(() => composeVersionFromStdout(invalidOutput), /exactly one non-empty line/);
}

assert.equal(normalizeComposeSemanticVersion("5.4.0"), "5.4.0");
assert.equal(normalizeComposeSemanticVersion("v5.4.0"), "5.4.0");
assert.equal(assertExactComposeVersion("5.4.0"), "5.4.0");
assert.equal(assertExactComposeVersion("v5.4.0"), "5.4.0");
assert.equal(
  assertComposeEvidenceContract({
    normalizedVersion: "5.4.0",
    rawVersion: "5.4.0",
    rawStdout: "5.4.0\n",
  }),
  "5.4.0",
);
assert.equal(
  assertComposeEvidenceContract({
    normalizedVersion: "5.4.0",
    rawVersion: "v5.4.0",
    rawStdout: "v5.4.0\r\n",
  }),
  "5.4.0",
);

for (const invalid of ["V5.4.0", "vv5.4.0", " 5.4.0", "5.4.0 ", "5.4", "5.4.0-beta"]) {
  assert.throws(() => normalizeComposeSemanticVersion(invalid));
}
assert.throws(() => assertExactComposeVersion("v5.4.1"), /compose mismatch/);
assert.throws(
  () => assertExactComposeVersion(composeVersionFromStdout(" 5.4.0 \n")),
  /invalid Compose semantic version/,
);
assert.throws(
  () => assertComposeEvidenceContract({
    normalizedVersion: "5.4.0",
    rawVersion: "v5.4.0",
    rawStdout: "5.4.0\n",
  }),
  /raw evidence mismatch/,
);
assert.throws(
  () => assertComposeEvidenceContract({
    normalizedVersion: "v5.4.0",
    rawVersion: "v5.4.0",
    rawStdout: "v5.4.0\n",
  }),
  /normalized evidence mismatch/,
);
assert.throws(
  () => assertComposeEvidenceContract({
    normalizedVersion: "5.4.0",
    rawVersion: "5.4.1",
    rawStdout: "5.4.1\n",
  }),
  /compose mismatch/,
);

const originalEnvironment = { PATH: "/proof/bin" };
const synthetic = "ephemeral-static-test-value";
const absentCredential = cleanupComposeEnvironment(originalEnvironment, synthetic);
assert.equal(absentCredential.environment.TP01_BOOTSTRAP_PASSWORD, synthetic);
assert.equal(absentCredential.interpolationSource, "EPHEMERAL_SYNTHETIC_CLEANUP_ONLY");
assert.equal(originalEnvironment.TP01_BOOTSTRAP_PASSWORD, undefined);

const existingCredential = cleanupComposeEnvironment(
  { PATH: "/proof/bin", TP01_BOOTSTRAP_PASSWORD: "existing-value" },
  synthetic,
);
assert.equal(existingCredential.environment.TP01_BOOTSTRAP_PASSWORD, "existing-value");
assert.equal(existingCredential.interpolationSource, "EXISTING_RUN_ENVIRONMENT");
assert.throws(() => cleanupComposeEnvironment({}, ""), /non-empty ephemeral/);

process.stdout.write("WP-31 Compose evidence contract static tests passed\n");
