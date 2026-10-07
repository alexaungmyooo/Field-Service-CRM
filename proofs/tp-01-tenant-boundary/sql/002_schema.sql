\set ON_ERROR_STOP on

DROP SCHEMA IF EXISTS tenant CASCADE;
DROP SCHEMA IF EXISTS security CASCADE;
DROP SCHEMA IF EXISTS platform CASCADE;

CREATE SCHEMA platform AUTHORIZATION tp01_owner;
CREATE SCHEMA security AUTHORIZATION tp01_owner;
CREATE SCHEMA tenant AUTHORIZATION tp01_owner;

CREATE TABLE platform.organizations (
  id uuid PRIMARY KEY,
  display_key text NOT NULL UNIQUE,
  lifecycle_state text NOT NULL CHECK (lifecycle_state IN ('ACTIVE', 'SUSPENDED'))
);

CREATE TABLE security.subjects (
  id uuid PRIMARY KEY,
  subject_key text NOT NULL UNIQUE,
  subject_kind text NOT NULL CHECK (subject_kind IN ('HUMAN', 'MACHINE', 'DENIED_PROBE'))
);

CREATE TABLE security.memberships (
  id uuid PRIMARY KEY,
  organization_id uuid NOT NULL REFERENCES platform.organizations(id),
  subject_id uuid NOT NULL REFERENCES security.subjects(id),
  lifecycle_state text NOT NULL CHECK (lifecycle_state IN ('ACTIVE', 'REMOVED')),
  revision integer NOT NULL CHECK (revision > 0),
  UNIQUE (organization_id, subject_id)
);

CREATE TABLE security.platform_roles (
  subject_id uuid PRIMARY KEY REFERENCES security.subjects(id),
  role_key text NOT NULL CHECK (role_key IN ('ORGANIZATION_DIRECTORY'))
);

CREATE TABLE security.support_grants (
  id uuid PRIMARY KEY,
  subject_id uuid NOT NULL REFERENCES security.subjects(id),
  organization_id uuid NOT NULL REFERENCES platform.organizations(id),
  access_mode text NOT NULL CHECK (access_mode IN ('READ_ONLY', 'READ_WRITE')),
  resource_scope text[] NOT NULL,
  valid_from timestamptz NOT NULL,
  valid_until timestamptz NOT NULL,
  revoked_at timestamptz,
  CHECK (valid_until > valid_from)
);

CREATE TABLE security.machine_authorities (
  job_id uuid PRIMARY KEY,
  subject_id uuid NOT NULL REFERENCES security.subjects(id),
  organization_id uuid NOT NULL REFERENCES platform.organizations(id),
  purpose text NOT NULL,
  revoked_at timestamptz
);

CREATE TABLE tenant.resources (
  id uuid PRIMARY KEY,
  organization_id uuid NOT NULL REFERENCES platform.organizations(id),
  resource_kind text NOT NULL CHECK (
    resource_kind IN ('CUSTOMER', 'SITE', 'EQUIPMENT', 'JOB', 'VISIT', 'WORKER', 'INVENTORY')
  ),
  display_key text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  UNIQUE (organization_id, display_key),
  UNIQUE (id, organization_id)
);

CREATE TABLE tenant.evidence_metadata (
  id uuid PRIMARY KEY,
  organization_id uuid NOT NULL REFERENCES platform.organizations(id),
  owning_resource_id uuid NOT NULL,
  evidence_kind text NOT NULL,
  object_reference text NOT NULL,
  replacement_of_id uuid REFERENCES tenant.evidence_metadata(id),
  FOREIGN KEY (owning_resource_id, organization_id)
    REFERENCES tenant.resources(id, organization_id)
);

CREATE TABLE tenant.projection_rows (
  id uuid PRIMARY KEY,
  organization_id uuid NOT NULL REFERENCES platform.organizations(id),
  projection_kind text NOT NULL CHECK (
    projection_kind IN ('SEARCH', 'CACHE', 'REPORT', 'EXPORT')
  ),
  source_resource_id uuid NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  FOREIGN KEY (source_resource_id, organization_id)
    REFERENCES tenant.resources(id, organization_id)
);

CREATE TABLE tenant.background_jobs (
  id uuid PRIMARY KEY,
  organization_id uuid NOT NULL REFERENCES platform.organizations(id),
  machine_subject_id uuid NOT NULL REFERENCES security.subjects(id),
  purpose text NOT NULL,
  correlation_id uuid NOT NULL,
  target_resource_id uuid NOT NULL,
  lifecycle_state text NOT NULL CHECK (lifecycle_state IN ('PENDING', 'SUCCEEDED', 'DENIED')),
  FOREIGN KEY (target_resource_id, organization_id)
    REFERENCES tenant.resources(id, organization_id)
);

CREATE TABLE security.audit_events (
  id uuid PRIMARY KEY,
  organization_id uuid,
  subject_id uuid NOT NULL REFERENCES security.subjects(id),
  authority_source text NOT NULL,
  action text NOT NULL,
  resource_kind text NOT NULL,
  resource_id uuid,
  decision text NOT NULL CHECK (decision IN ('ALLOW', 'DENY')),
  purpose text NOT NULL,
  correlation_id uuid NOT NULL,
  case_id text NOT NULL,
  occurred_at timestamptz NOT NULL DEFAULT statement_timestamp(),
  details jsonb NOT NULL DEFAULT '{}'::jsonb
);

ALTER TABLE platform.organizations OWNER TO tp01_owner;
ALTER TABLE security.subjects OWNER TO tp01_owner;
ALTER TABLE security.memberships OWNER TO tp01_owner;
ALTER TABLE security.platform_roles OWNER TO tp01_owner;
ALTER TABLE security.support_grants OWNER TO tp01_owner;
ALTER TABLE security.machine_authorities OWNER TO tp01_owner;
ALTER TABLE tenant.resources OWNER TO tp01_owner;
ALTER TABLE tenant.evidence_metadata OWNER TO tp01_owner;
ALTER TABLE tenant.projection_rows OWNER TO tp01_owner;
ALTER TABLE tenant.background_jobs OWNER TO tp01_owner;
ALTER TABLE security.audit_events OWNER TO tp01_owner;

GRANT USAGE ON SCHEMA platform, security, tenant TO tp01_runtime;
GRANT SELECT ON platform.organizations TO tp01_runtime;
GRANT SELECT, INSERT, UPDATE ON tenant.resources, tenant.evidence_metadata,
  tenant.projection_rows, tenant.background_jobs TO tp01_runtime;
GRANT SELECT, INSERT ON security.audit_events TO tp01_runtime;

REVOKE ALL ON security.subjects, security.memberships, security.platform_roles,
  security.support_grants, security.machine_authorities FROM tp01_runtime;
