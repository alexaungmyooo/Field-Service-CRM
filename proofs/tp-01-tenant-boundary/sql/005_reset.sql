\set ON_ERROR_STOP on

BEGIN;
TRUNCATE TABLE
  security.audit_events,
  tenant.background_jobs,
  tenant.projection_rows,
  tenant.evidence_metadata,
  tenant.resources,
  security.machine_authorities,
  security.support_grants,
  security.platform_roles,
  security.memberships,
  security.subjects,
  platform.organizations
CASCADE;
COMMIT;

\ir 004_seed.sql
