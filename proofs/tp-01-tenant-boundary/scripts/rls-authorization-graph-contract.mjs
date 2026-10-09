import { createHash } from "node:crypto";

const expectedUnchangedSha256 = Object.freeze({
  databaseSource: "9c50fd54740bcfc6c5f16653bc3e77e72d9d8fa41da4e4054037820723b662bf",
  proofTest: "db80f493c6ee3a767f7ceb3c634c4be8691d03e9889608c420a16f0c0dac4000",
  caseManifest: "de4e412a27f35bc96a3858174bcf186ae02f84c08a0e94b28771e3db78a2665f",
  proofRun: "724b29ce6f294795a6ac7b82fcde925d28406db98c625ad7ab2c3b3f2a7d3d31",
  databaseEvidence: "69909e32c0d58478b782e5198c3a9a08e38b22a0664c49ee653d6cd3318d42c5",
});

function requireMatch(value, pattern, message) {
  if (!pattern.test(value)) throw new Error(message);
}

function requireNoMatch(value, pattern, message) {
  if (pattern.test(value)) throw new Error(message);
}

function functionDefinition(sql, name) {
  const start = sql.indexOf(`CREATE OR REPLACE FUNCTION security.${name}(`);
  if (start === -1) throw new Error(`security.${name} is absent`);
  const end = sql.indexOf("$$;", start);
  if (end === -1) throw new Error(`security.${name} is incomplete`);
  return sql.slice(start, end + 3);
}

export function assertAcyclicGraph(graph) {
  const visiting = new Set();
  const visited = new Set();

  function visit(node, path) {
    if (visiting.has(node)) throw new Error(`authorization graph cycle: ${[...path, node].join(" -> ")}`);
    if (visited.has(node)) return;
    visiting.add(node);
    for (const dependency of graph[node] ?? []) visit(dependency, [...path, node]);
    visiting.delete(node);
    visited.add(node);
  }

  for (const node of Object.keys(graph)) visit(node, []);
  return true;
}

export function effectiveAuthorizationGraph() {
  return Object.freeze({
    tenant_table_policies: ["can_access_tenant"],
    audit_events_tenant_policy: ["can_access_tenant", "can_write_audit"],
    can_access_tenant: ["has_tenant_authority", "organizations_authority_policy"],
    organizations_authority_policy: ["organization_row_visible"],
    organization_row_visible: ["can_discover_organization"],
    can_discover_organization: ["has_tenant_authority"],
    can_write_audit: [],
    has_tenant_authority: [],
  });
}

export function assertRlsAuthorizationGraphContract(sources) {
  const { rlsSql, rolesSql, evidenceVerifier } = sources;
  for (const [name, value] of Object.entries(sources)) {
    if (typeof value !== "string" || value.length === 0) throw new Error(`${name} source is absent`);
  }

  requireMatch(
    rolesSql,
    /CREATE ROLE tp01_owner NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOBYPASSRLS;/,
    "tp01_owner must remain non-login and unable to bypass RLS",
  );
  requireMatch(
    rolesSql,
    /CREATE ROLE tp01_runtime LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOBYPASSRLS;/,
    "tp01_runtime must remain a non-owner unable to bypass RLS",
  );
  requireNoMatch(rolesSql, /(?:^|\s)BYPASSRLS\b/m, "unexpected RLS-bypass authority");

  const authority = functionDefinition(rlsSql, "has_tenant_authority");
  requireMatch(authority, /SECURITY DEFINER/, "authority helper must be a security definer");
  requireMatch(authority, /SET search_path = pg_catalog, security, platform/, "authority helper search path differs");
  requireMatch(authority, /target_organization_id IS DISTINCT FROM current_org OR current_subject IS NULL/, "authority helper must fail closed on context mismatch");
  for (const source of ["MEMBERSHIP", "SUPPORT_GRANT", "MACHINE_IDENTITY"]) {
    requireMatch(authority, new RegExp(`authority = '${source}'`), `${source} authority branch is absent`);
  }
  requireNoMatch(authority, /platform\.organizations|can_access_tenant|can_discover_organization/, "authority helper re-enters organization RLS");

  const access = functionDefinition(rlsSql, "can_access_tenant");
  requireMatch(access, /security\.has_tenant_authority\(/, "tenant access must use the non-recursive authority helper");
  requireMatch(access, /FROM platform\.organizations o[\s\S]*o\.lifecycle_state = 'ACTIVE'/, "tenant access must retain active-organization validation");
  requireNoMatch(access, /security\.can_discover_organization\(/, "tenant access must not call organization discovery");

  const visibility = functionDefinition(rlsSql, "organization_row_visible");
  requireNoMatch(visibility, /SECURITY DEFINER/, "row visibility must retain caller identity");
  requireMatch(visibility, /current_user = 'tp01_owner'/, "row visibility must identify the non-login definer owner");
  requireMatch(visibility, /security\.can_discover_organization\(target_organization_id, target_lifecycle_state\)/, "runtime row visibility must use bounded discovery");
  requireNoMatch(visibility, /can_access_tenant|platform\.organizations/, "row visibility re-enters tenant access");

  const discovery = functionDefinition(rlsSql, "can_discover_organization");
  requireMatch(discovery, /target_lifecycle_state text/, "discovery must receive the governed lifecycle state");
  requireMatch(discovery, /authority_source'\) = 'PLATFORM_DIRECTORY'/, "platform-directory authority branch is absent");
  requireMatch(discovery, /target_lifecycle_state IS DISTINCT FROM 'ACTIVE'/, "tenant discovery must deny inactive organizations");
  requireMatch(discovery, /security\.has_tenant_authority\([\s\S]*'ORGANIZATION_DIRECTORY',[\s\S]*false/, "tenant discovery must use bounded directory authority");
  requireNoMatch(discovery, /can_access_tenant|platform\.organizations/, "organization discovery re-enters tenant access or organization RLS");

  requireMatch(
    rlsSql,
    /ALTER TABLE platform\.organizations ENABLE ROW LEVEL SECURITY;\s*ALTER TABLE platform\.organizations FORCE ROW LEVEL SECURITY;\s*CREATE POLICY organizations_authority_policy ON platform\.organizations\s*USING \(security\.organization_row_visible\(id, lifecycle_state\)\);/,
    "organization RLS policy is not the exact acyclic contract",
  );
  for (const table of ["tenant.resources", "tenant.evidence_metadata", "tenant.projection_rows", "tenant.background_jobs", "security.audit_events"]) {
    const escaped = table.replace(".", "\\.");
    requireMatch(rlsSql, new RegExp(`ALTER TABLE ${escaped} ENABLE ROW LEVEL SECURITY;\\s*ALTER TABLE ${escaped} FORCE ROW LEVEL SECURITY;`), `${table} must retain forced RLS`);
  }
  requireNoMatch(rlsSql, /NO FORCE ROW LEVEL SECURITY|DISABLE ROW LEVEL SECURITY/, "RLS weakening is prohibited");
  requireMatch(rlsSql, /REVOKE ALL ON FUNCTION[\s\S]*security\.has_tenant_authority\(uuid, text, boolean\)[\s\S]*security\.organization_row_visible\(uuid, text\)[\s\S]*FROM PUBLIC;/, "new functions must be revoked from PUBLIC");
  requireMatch(rlsSql, /GRANT EXECUTE ON FUNCTION[\s\S]*security\.has_tenant_authority\(uuid, text, boolean\)[\s\S]*security\.organization_row_visible\(uuid, text\)[\s\S]*TO tp01_runtime;/, "runtime execute grants differ");

  requireMatch(evidenceVerifier, /"has_tenant_authority"/, "final verifier must require the authority helper");
  requireMatch(evidenceVerifier, /item\.security_definer === true/, "final verifier must reject unexpected security definers");
  requireMatch(evidenceVerifier, /function_name === "organization_row_visible"/, "final verifier must require row visibility evidence");
  requireMatch(evidenceVerifier, /organizationRowVisibility\.security_definer !== false/, "final verifier must require invoker row visibility");
  requireMatch(evidenceVerifier, /!table\.rls_enabled \|\| !table\.rls_forced/, "final verifier must retain forced-RLS enforcement");

  for (const [name, expected] of Object.entries(expectedUnchangedSha256)) {
    const actual = createHash("sha256").update(sources[name]).digest("hex");
    if (actual !== expected) throw new Error(`${name} changed outside WP-69 scope`);
  }

  assertAcyclicGraph(effectiveAuthorizationGraph());
  return {
    status: "PASS",
    protectedForcedRlsTables: 6,
    unchangedCaseCount: 222,
    graph: effectiveAuthorizationGraph(),
  };
}
