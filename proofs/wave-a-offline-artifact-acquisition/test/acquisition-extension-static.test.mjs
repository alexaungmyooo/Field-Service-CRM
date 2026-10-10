import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  canonicalJson, commandAllowed, CONTRACT, sourceTextIsStaticOnly, validateAuthorization,
  validateMetadataCommit, validateSafeRelativePath, validateSourceEntry, validateSourcePolicy,
} from "../tool/contract.mjs";
import { validateNodeBinding } from "../tool/static-launcher.mjs";
import { verifyExtension } from "../tool/verify-extension.mjs";

const root = resolve("proofs/wave-a-offline-artifact-acquisition");
const auth = JSON.parse(readFileSync("internal-local/work-packages/WP-111/authorization.json", "utf8"));

test("canonical JSON is stable", () => assert.equal(canonicalJson({ z: 1, a: 2 }), '{"a":2,"z":1}'));
test("relative paths reject traversal", () => {
  assert.equal(validateSafeRelativePath("schemas/example.json"), "schemas/example.json");
  assert.throws(() => validateSafeRelativePath("../outside"), /UNSAFE_PATH/);
  assert.throws(() => validateSafeRelativePath("/absolute"), /UNSAFE_PATH/);
});
test("synthetic source fixture passes", () => {
  const fixture = JSON.parse(readFileSync(resolve(root, "fixtures/synthetic-source-catalog.json"), "utf8"));
  assert.equal(validateSourcePolicy(fixture), true);
});
test("source transport is HTTPS 443 only", () => {
  assert.throws(() => validateSourceEntry({ scheme: "http", host: "example.invalid", port: 80, pathPrefix: "/", redirectLimit: 0 }), /SOURCE_TRANSPORT/);
});
test("private hosts are rejected", () => {
  assert.throws(() => validateSourceEntry({ scheme: "https", host: "127.0.0.1", port: 443, pathPrefix: "/", redirectLimit: 0 }), /SOURCE_PRIVATE_HOST/);
});
test("redirect limit is bounded", () => {
  assert.throws(() => validateSourceEntry({ scheme: "https", host: "example.invalid", port: 443, pathPrefix: "/", redirectLimit: 4 }), /SOURCE_REDIRECT_LIMIT/);
});
test("synthetic metadata commitment passes", () => {
  const fixture = JSON.parse(readFileSync(resolve(root, "fixtures/synthetic-metadata-commit.json"), "utf8"));
  assert.equal(validateMetadataCommit(fixture), true);
});
test("duplicate metadata identities fail", () => {
  const fixture = JSON.parse(readFileSync(resolve(root, "fixtures/synthetic-metadata-commit.json"), "utf8"));
  fixture.entries.push(structuredClone(fixture.entries[0]));
  assert.throws(() => validateMetadataCommit(fixture), /METADATA_ENTRY/);
});
test("static authorization binds accepted revision, roots and time", () => {
  assert.equal(validateAuthorization(auth, new Date("2026-10-10T11:00:00.000Z"), { allowConsumed: true }), true);
});
test("every acquisition and product action remains closed", () => {
  const changed = structuredClone(auth);
  changed.actionFlags.network = true;
  assert.throws(() => validateAuthorization(changed, new Date("2026-10-10T11:00:00.000Z"), { allowConsumed: true }), /AUTH_CLOSED:network/);
});
test("authorization expires fail closed", () => {
  const effective = structuredClone(auth);
  effective.state = "EFFECTIVE_STATIC_ONLY";
  effective.consumed = false;
  delete effective.consumedAt;
  delete effective.effectiveAuthorizationSha256;
  delete effective.primaryInventorySha256;
  assert.throws(() => validateAuthorization(effective, new Date("2026-10-11T00:00:00.000Z")), /AUTH_TIME/);
});
test("exact Node binding is present", () => assert.equal(validateNodeBinding(CONTRACT.node), true));
test("only exact static commands are allowed", () => {
  assert.equal(commandAllowed(auth, "STATIC_TESTS", CONTRACT.node.path, auth.allowedCommands[0].arguments), true);
  assert.equal(commandAllowed(auth, "METADATA_RETRIEVAL", "/usr/bin/curl", []), false);
});
test("network-capable source tokens fail", () => {
  assert.equal(sourceTextIsStaticOnly('import { readFileSync } from "node:fs";'), true);
  assert.equal(sourceTextIsStaticOnly(`import x from "${"node:" + "https"}";`), false);
  assert.equal(sourceTextIsStaticOnly(`${"fet" + "ch("}\"x\")`), false);
});
test("public inventory and fixtures verify", () => {
  const result = verifyExtension(root);
  assert.equal(result.result, "PASS");
  assert.equal(result.publicFiles, 14);
});
