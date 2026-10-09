import { createHash } from "node:crypto";
import { run } from "./command.mjs";
import { assertDatabaseConnectionEnvironment } from "./database-connection-contract.mjs";
import { runDatabaseEvidenceJson } from "./database-evidence-compose-contract.mjs";
import { assertExecutionAuthorized } from "./execution-authorization.mjs";

const { authorization } = assertExecutionAuthorized();
const databaseConnection = assertDatabaseConnectionEnvironment(process.env, authorization);

export function captureDatabaseConnectionEvidence() {
  return databaseConnection;
}

function psqlJson(sql, role, composeEnvironment, runtimePassword) {
  return runDatabaseEvidenceJson({
    runCommand: run,
    sql,
    role,
    composeEnvironment,
    runtimePassword,
  });
}

const stateSql = String.raw`
SELECT jsonb_build_object(
  'organizations', (
    SELECT jsonb_agg(jsonb_build_object(
      'organizationId', organization_id,
      'organizationKey', organization_key,
      'counts', counts,
      'rows', rows
    ) ORDER BY organization_key)
    FROM (
      SELECT o.id AS organization_id, o.display_key AS organization_key,
        jsonb_build_object(
          'resources', (SELECT count(*) FROM tenant.resources r WHERE r.organization_id = o.id),
          'evidenceMetadata', (SELECT count(*) FROM tenant.evidence_metadata e WHERE e.organization_id = o.id),
          'projectionRows', (SELECT count(*) FROM tenant.projection_rows p WHERE p.organization_id = o.id),
          'backgroundJobs', (SELECT count(*) FROM tenant.background_jobs b WHERE b.organization_id = o.id)
        ) AS counts,
        (
          SELECT coalesce(jsonb_agg(row_value ORDER BY kind, id), '[]'::jsonb)
          FROM (
            SELECT 'resource' AS kind, r.id::text AS id,
              jsonb_build_object('resourceKind', r.resource_kind, 'displayKey', r.display_key, 'payload', r.payload) AS row_value
              FROM tenant.resources r WHERE r.organization_id = o.id
            UNION ALL
            SELECT 'evidence', e.id::text,
              jsonb_build_object('owningResourceId', e.owning_resource_id, 'evidenceKind', e.evidence_kind,
                'objectReference', e.object_reference, 'replacementOfId', e.replacement_of_id)
              FROM tenant.evidence_metadata e WHERE e.organization_id = o.id
            UNION ALL
            SELECT 'projection', p.id::text,
              jsonb_build_object('projectionKind', p.projection_kind, 'sourceResourceId', p.source_resource_id,
                'payload', p.payload)
              FROM tenant.projection_rows p WHERE p.organization_id = o.id
            UNION ALL
            SELECT 'background', b.id::text,
              jsonb_build_object('machineSubjectId', b.machine_subject_id, 'purpose', b.purpose,
                'correlationId', b.correlation_id, 'targetResourceId', b.target_resource_id,
                'lifecycleState', b.lifecycle_state)
              FROM tenant.background_jobs b WHERE b.organization_id = o.id
          ) state_rows
        ) AS rows
      FROM platform.organizations o
    ) per_organization
  )
);
`;

export function captureStateSnapshot(composeEnvironment) {
  const raw = psqlJson(stateSql, "tp01_bootstrap", composeEnvironment);
  const organizations = raw.organizations.map((organization) => {
    const canonicalRows = JSON.stringify(organization.rows);
    return {
      organizationId: organization.organizationId,
      organizationKey: organization.organizationKey,
      counts: organization.counts,
      rowCount: organization.rows.length,
      sha256: createHash("sha256").update(canonicalRows).digest("hex"),
    };
  });
  return {
    trackedTables: [
      "tenant.resources",
      "tenant.evidence_metadata",
      "tenant.projection_rows",
      "tenant.background_jobs",
    ],
    expectedAppendOnlyEvidence: ["security.audit_events"],
    organizations,
    aggregateSha256: createHash("sha256").update(JSON.stringify(organizations)).digest("hex"),
  };
}

export function captureFixtureEvidence(composeEnvironment) {
  const state = captureStateSnapshot(composeEnvironment);
  const fixture = psqlJson(String.raw`
    SELECT jsonb_build_object(
      'organizations', (SELECT count(*) FROM platform.organizations),
      'subjects', (SELECT count(*) FROM security.subjects),
      'memberships', (SELECT count(*) FROM security.memberships),
      'platformRoles', (SELECT count(*) FROM security.platform_roles),
      'supportGrants', (SELECT count(*) FROM security.support_grants),
      'machineAuthorities', (SELECT count(*) FROM security.machine_authorities),
      'resources', (SELECT count(*) FROM tenant.resources),
      'evidenceMetadata', (SELECT count(*) FROM tenant.evidence_metadata),
      'projectionRows', (SELECT count(*) FROM tenant.projection_rows),
      'backgroundJobs', (SELECT count(*) FROM tenant.background_jobs),
      'seedAuditEvents', (SELECT count(*) FROM security.audit_events)
    );
  `, "tp01_bootstrap", composeEnvironment);
  return {
    schemaVersion: 1,
    proof: "TP-01",
    generator: "sql/001_roles.sql..sql/004_seed.sql",
    seed: "DETERMINISTIC_SQL_V1",
    dataClassification: "SYNTHETIC_ONLY",
    liveOrCustomerDataUsed: false,
    counts: fixture,
    state,
    fixtureSha256: createHash("sha256")
      .update(JSON.stringify({ counts: fixture, state }))
      .digest("hex"),
  };
}

export function captureDatabaseSecurityEvidence(composeEnvironment, runtimePassword) {
  return psqlJson(String.raw`
    WITH configured AS (
      SELECT
        set_config('app.organization_id', '00000000-0000-4000-8000-000000000001', true),
        set_config('app.subject_id', '10000000-0000-4000-8000-000000000001', true),
        set_config('app.case_id', 'TP1-DATABASE-SECURITY-EVIDENCE', true),
        set_config('app.authority_source', 'MEMBERSHIP', true),
        set_config('app.authority_revision', '1', true),
        set_config('app.purpose', 'SYNTHETIC_PROOF', true),
        set_config('app.proof_clock', '2026-10-07T00:00:00Z', true),
        set_config('app.support_grant_id', '', true),
        set_config('app.machine_job_id', '', true)
    )
    SELECT jsonb_build_object(
      'schemaVersion', 1,
      'proof', 'TP-01',
      'connection', jsonb_build_object(
        'currentUser', current_user,
        'sessionUser', session_user,
        'database', current_database()
      ),
      'role', (
        SELECT to_jsonb(r) FROM (
          SELECT rolname, rolsuper, rolinherit, rolcreaterole, rolcreatedb, rolcanlogin,
            rolreplication, rolbypassrls
          FROM pg_roles WHERE rolname = current_user
        ) r
      ),
      'transactionLocalContext', jsonb_build_object(
        'organizationId', current_setting('app.organization_id', true),
        'subjectId', current_setting('app.subject_id', true),
        'caseId', current_setting('app.case_id', true),
        'authoritySource', current_setting('app.authority_source', true),
        'authorityRevision', current_setting('app.authority_revision', true),
        'purpose', current_setting('app.purpose', true),
        'proofClock', current_setting('app.proof_clock', true)
      ),
      'schemaOwnership', (
        SELECT jsonb_agg(to_jsonb(s) ORDER BY s.schema_name) FROM (
          SELECT n.nspname AS schema_name, pg_get_userbyid(n.nspowner) AS owner
          FROM pg_namespace n WHERE n.nspname IN ('platform', 'security', 'tenant')
        ) s
      ),
      'tableControls', (
        SELECT jsonb_agg(to_jsonb(t) ORDER BY t.schema_name, t.table_name) FROM (
          SELECT n.nspname AS schema_name, c.relname AS table_name,
            pg_get_userbyid(c.relowner) AS owner,
            c.relrowsecurity AS rls_enabled, c.relforcerowsecurity AS rls_forced,
            has_table_privilege(current_user, c.oid, 'SELECT') AS can_select,
            has_table_privilege(current_user, c.oid, 'INSERT') AS can_insert,
            has_table_privilege(current_user, c.oid, 'UPDATE') AS can_update,
            has_table_privilege(current_user, c.oid, 'DELETE') AS can_delete
          FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
          WHERE c.relkind = 'r' AND n.nspname IN ('platform', 'security', 'tenant')
        ) t
      ),
      'policies', (
        SELECT jsonb_agg(to_jsonb(p) ORDER BY p.schemaname, p.tablename, p.policyname)
        FROM pg_policies p WHERE p.schemaname IN ('platform', 'security', 'tenant')
      ),
      'securityFunctions', (
        SELECT jsonb_agg(to_jsonb(f) ORDER BY f.schema_name, f.function_name, f.arguments) FROM (
          SELECT n.nspname AS schema_name, p.proname AS function_name,
            pg_get_function_identity_arguments(p.oid) AS arguments,
            pg_get_userbyid(p.proowner) AS owner, p.prosecdef AS security_definer,
            coalesce(p.proconfig, ARRAY[]::text[]) AS configuration
          FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
          WHERE n.nspname = 'security'
        ) f
      )
    )
    FROM configured;
  `, "tp01_runtime", composeEnvironment, runtimePassword);
}
