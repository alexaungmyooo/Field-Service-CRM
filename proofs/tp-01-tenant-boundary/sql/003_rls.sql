\set ON_ERROR_STOP on

CREATE OR REPLACE FUNCTION security.context_text(setting_name text)
RETURNS text LANGUAGE sql STABLE AS $$
  SELECT NULLIF(current_setting(setting_name, true), '')
$$;

CREATE OR REPLACE FUNCTION security.context_uuid(setting_name text)
RETURNS uuid LANGUAGE sql STABLE AS $$
  SELECT security.context_text(setting_name)::uuid
$$;

CREATE OR REPLACE FUNCTION security.can_access_tenant(
  target_organization_id uuid,
  requested_action text,
  requested_resource_kind text,
  requested_write boolean
)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, security, platform
AS $$
DECLARE
  authority text := security.context_text('app.authority_source');
  current_org uuid := security.context_uuid('app.organization_id');
  current_subject uuid := security.context_uuid('app.subject_id');
  current_revision integer := security.context_text('app.authority_revision')::integer;
  proof_clock timestamptz := security.context_text('app.proof_clock')::timestamptz;
BEGIN
  IF target_organization_id IS DISTINCT FROM current_org OR current_subject IS NULL THEN
    RETURN false;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM platform.organizations o
    WHERE o.id = target_organization_id AND o.lifecycle_state = 'ACTIVE'
  ) THEN
    RETURN false;
  END IF;
  IF authority = 'MEMBERSHIP' THEN
    RETURN EXISTS (
      SELECT 1 FROM security.memberships m
      WHERE m.organization_id = target_organization_id
        AND m.subject_id = current_subject
        AND m.lifecycle_state = 'ACTIVE'
        AND m.revision = current_revision
    );
  ELSIF authority = 'SUPPORT_GRANT' THEN
    RETURN EXISTS (
      SELECT 1 FROM security.support_grants g
      WHERE g.id = security.context_uuid('app.support_grant_id')
        AND g.organization_id = target_organization_id
        AND g.subject_id = current_subject
        AND g.valid_from <= proof_clock AND g.valid_until > proof_clock
        AND g.revoked_at IS NULL
        AND requested_resource_kind = ANY(g.resource_scope)
        AND (NOT requested_write OR g.access_mode = 'READ_WRITE')
    );
  ELSIF authority = 'MACHINE_IDENTITY' THEN
    RETURN EXISTS (
      SELECT 1 FROM security.machine_authorities m
      WHERE m.job_id = security.context_uuid('app.machine_job_id')
        AND m.organization_id = target_organization_id
        AND m.subject_id = current_subject
        AND m.purpose = security.context_text('app.purpose')
        AND m.revoked_at IS NULL
    );
  END IF;
  RETURN false;
END
$$;

CREATE OR REPLACE FUNCTION security.can_discover_organization(target_organization_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, security
AS $$
  SELECT
    (
      security.context_text('app.authority_source') = 'PLATFORM_DIRECTORY'
      AND EXISTS (
        SELECT 1 FROM security.platform_roles r
        WHERE r.subject_id = security.context_uuid('app.subject_id')
          AND r.role_key = 'ORGANIZATION_DIRECTORY'
      )
    )
    OR security.can_access_tenant(target_organization_id, 'DISCOVER', 'ORGANIZATION_DIRECTORY', false)
$$;

CREATE OR REPLACE FUNCTION security.can_write_audit(target_organization_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, security
AS $$
  SELECT EXISTS (
    SELECT 1 FROM security.subjects s
    WHERE s.id = security.context_uuid('app.subject_id')
  ) AND (
    target_organization_id = security.context_uuid('app.organization_id')
    OR (
      target_organization_id IS NULL
      AND security.context_text('app.authority_source') = 'PLATFORM_DIRECTORY'
    )
  )
$$;

ALTER FUNCTION security.context_text(text) OWNER TO tp01_owner;
ALTER FUNCTION security.context_uuid(text) OWNER TO tp01_owner;
ALTER FUNCTION security.can_access_tenant(uuid, text, text, boolean) OWNER TO tp01_owner;
ALTER FUNCTION security.can_discover_organization(uuid) OWNER TO tp01_owner;
ALTER FUNCTION security.can_write_audit(uuid) OWNER TO tp01_owner;
REVOKE ALL ON FUNCTION security.context_text(text), security.context_uuid(text),
  security.can_access_tenant(uuid, text, text, boolean),
  security.can_discover_organization(uuid), security.can_write_audit(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION security.context_text(text), security.context_uuid(text),
  security.can_access_tenant(uuid, text, text, boolean),
  security.can_discover_organization(uuid), security.can_write_audit(uuid) TO tp01_runtime;

ALTER TABLE platform.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.organizations FORCE ROW LEVEL SECURITY;
CREATE POLICY organizations_authority_policy ON platform.organizations
  USING (security.can_discover_organization(id));

ALTER TABLE tenant.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant.resources FORCE ROW LEVEL SECURITY;
CREATE POLICY resources_tenant_policy ON tenant.resources
  USING (security.can_access_tenant(organization_id, 'READ', resource_kind, false))
  WITH CHECK (security.can_access_tenant(organization_id, 'CREATE', resource_kind, true));

ALTER TABLE tenant.evidence_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant.evidence_metadata FORCE ROW LEVEL SECURITY;
CREATE POLICY evidence_metadata_tenant_policy ON tenant.evidence_metadata
  USING (security.can_access_tenant(organization_id, 'READ', 'EVIDENCE_METADATA', false))
  WITH CHECK (security.can_access_tenant(organization_id, 'CREATE', 'EVIDENCE_METADATA', true));

ALTER TABLE tenant.projection_rows ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant.projection_rows FORCE ROW LEVEL SECURITY;
CREATE POLICY projection_rows_tenant_policy ON tenant.projection_rows
  USING (security.can_access_tenant(organization_id, 'READ', 'PROJECTION', false))
  WITH CHECK (security.can_access_tenant(organization_id, 'CREATE', 'PROJECTION', true));

ALTER TABLE tenant.background_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant.background_jobs FORCE ROW LEVEL SECURITY;
CREATE POLICY background_jobs_tenant_policy ON tenant.background_jobs
  USING (security.can_access_tenant(organization_id, 'READ', 'BACKGROUND_JOB', false))
  WITH CHECK (security.can_access_tenant(organization_id, 'UPDATE', 'BACKGROUND_JOB', true));

ALTER TABLE security.audit_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE security.audit_events FORCE ROW LEVEL SECURITY;
CREATE POLICY audit_events_tenant_policy ON security.audit_events
  USING (
    (subject_id = security.context_uuid('app.subject_id')
      AND organization_id IS NOT DISTINCT FROM security.context_uuid('app.organization_id'))
    OR security.can_access_tenant(organization_id, 'READ', 'AUDIT_EVENT', false)
  )
  WITH CHECK (security.can_write_audit(organization_id));
