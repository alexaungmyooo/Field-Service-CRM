import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  assertAcyclicGraph,
  assertRlsAuthorizationGraphContract,
} from "./rls-authorization-graph-contract.mjs";

const read = (path) => readFileSync(path, "utf8");
const sources = {
  rlsSql: read("sql/003_rls.sql"),
  rolesSql: read("sql/001_roles.sql"),
  evidenceVerifier: read("scripts/evidence-verify.mjs"),
  databaseSource: read("src/database.ts"),
  proofTest: read("test/proof.test.ts"),
  caseManifest: read("test/case-manifest.json"),
  proofRun: read("scripts/proof-run.mjs"),
  databaseEvidence: read("scripts/database-evidence.mjs"),
};

const result = assertRlsAuthorizationGraphContract(sources);
assert.equal(result.status, "PASS");
assert.equal(result.protectedForcedRlsTables, 6);
assert.equal(result.unchangedCaseCount, 222);

assert.throws(
  () => assertAcyclicGraph({
    organizations_policy: ["can_discover"],
    can_discover: ["can_access"],
    can_access: ["organizations_policy"],
  }),
  /authorization graph cycle/,
);
assert.throws(
  () => assertRlsAuthorizationGraphContract({
    ...sources,
    rlsSql: sources.rlsSql.replace(
      "security.organization_row_visible(id, lifecycle_state)",
      "security.can_discover_organization(id, lifecycle_state)",
    ),
  }),
  /exact acyclic contract/,
);
assert.throws(
  () => assertRlsAuthorizationGraphContract({
    ...sources,
    rlsSql: sources.rlsSql.replace(
      "ALTER TABLE platform.organizations FORCE ROW LEVEL SECURITY;",
      "ALTER TABLE platform.organizations NO FORCE ROW LEVEL SECURITY;",
    ),
  }),
  /exact acyclic contract|RLS weakening/,
);
assert.throws(
  () => assertRlsAuthorizationGraphContract({
    ...sources,
    rolesSql: sources.rolesSql.replace("tp01_owner NOLOGIN", "tp01_owner LOGIN"),
  }),
  /tp01_owner must remain non-login/,
);
assert.throws(
  () => assertRlsAuthorizationGraphContract({
    ...sources,
    rolesSql: `${sources.rolesSql}\nALTER ROLE tp01_runtime BYPASSRLS;`,
  }),
  /unexpected RLS-bypass authority/,
);
assert.throws(
  () => assertRlsAuthorizationGraphContract({
    ...sources,
    databaseSource: `${sources.databaseSource}\n// drift`,
  }),
  /databaseSource changed outside WP-69 scope/,
);

process.stdout.write("WP-69 RLS authorization graph contract tests passed\n");
