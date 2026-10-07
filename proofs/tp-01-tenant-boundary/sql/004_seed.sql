\set ON_ERROR_STOP on

INSERT INTO platform.organizations (id, display_key, lifecycle_state) VALUES
  ('00000000-0000-4000-8000-000000000001', 'org-alpha', 'ACTIVE'),
  ('00000000-0000-4000-8000-000000000002', 'org-bravo', 'ACTIVE'),
  ('00000000-0000-4000-8000-000000000003', 'org-charlie', 'ACTIVE'),
  ('00000000-0000-4000-8000-000000000004', 'org-suspended', 'SUSPENDED');

INSERT INTO security.subjects (id, subject_key, subject_kind) VALUES
  ('10000000-0000-4000-8000-000000000001', 'member-org-alpha', 'HUMAN'),
  ('10000000-0000-4000-8000-000000000002', 'member-org-bravo', 'HUMAN'),
  ('10000000-0000-4000-8000-000000000003', 'member-org-charlie', 'HUMAN'),
  ('10000000-0000-4000-8000-000000000004', 'multi-org-member', 'HUMAN'),
  ('10000000-0000-4000-8000-000000000005', 'removed-member', 'HUMAN'),
  ('10000000-0000-4000-8000-000000000006', 'member-org-suspended', 'HUMAN'),
  ('10000000-0000-4000-8000-000000000007', 'platform-directory-operator', 'HUMAN'),
  ('10000000-0000-4000-8000-000000000008', 'support-operator', 'HUMAN'),
  ('10000000-0000-4000-8000-000000000009', 'machine-worker-alpha', 'MACHINE'),
  ('10000000-0000-4000-8000-000000000010', 'denied-probe', 'DENIED_PROBE');

INSERT INTO security.memberships (id, organization_id, subject_id, lifecycle_state, revision) VALUES
  ('20000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', 'ACTIVE', 1),
  ('20000000-0000-4000-8000-000000000002', '00000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000002', 'ACTIVE', 1),
  ('20000000-0000-4000-8000-000000000003', '00000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000003', 'ACTIVE', 1),
  ('20000000-0000-4000-8000-000000000004', '00000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000004', 'ACTIVE', 1),
  ('20000000-0000-4000-8000-000000000005', '00000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000004', 'ACTIVE', 1),
  ('20000000-0000-4000-8000-000000000008', '00000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000004', 'ACTIVE', 1),
  ('20000000-0000-4000-8000-000000000006', '00000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000005', 'REMOVED', 2),
  ('20000000-0000-4000-8000-000000000007', '00000000-0000-4000-8000-000000000004', '10000000-0000-4000-8000-000000000006', 'ACTIVE', 1);

INSERT INTO security.platform_roles (subject_id, role_key) VALUES
  ('10000000-0000-4000-8000-000000000007', 'ORGANIZATION_DIRECTORY');

INSERT INTO security.support_grants (
  id, subject_id, organization_id, access_mode, resource_scope, valid_from, valid_until, revoked_at
) VALUES
  ('30000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000008', '00000000-0000-4000-8000-000000000001', 'READ_ONLY', ARRAY['CUSTOMER','SITE','EQUIPMENT','JOB','EVIDENCE_METADATA'], '2026-01-01T00:00:00Z', '2027-01-01T00:00:00Z', NULL),
  ('30000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000008', '00000000-0000-4000-8000-000000000001', 'READ_ONLY', ARRAY['JOB'], '2025-01-01T00:00:00Z', '2025-12-31T00:00:00Z', NULL),
  ('30000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000008', '00000000-0000-4000-8000-000000000001', 'READ_ONLY', ARRAY['JOB'], '2026-01-01T00:00:00Z', '2027-01-01T00:00:00Z', '2026-10-01T00:00:00Z');

INSERT INTO security.machine_authorities (job_id, subject_id, organization_id, purpose, revoked_at) VALUES
  ('40000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000009', '00000000-0000-4000-8000-000000000001', 'SYNTHETIC_JOB_REFRESH', NULL),
  ('40000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000009', '00000000-0000-4000-8000-000000000001', 'SYNTHETIC_JOB_REFRESH', '2026-10-01T00:00:00Z');

INSERT INTO tenant.resources (id, organization_id, resource_kind, display_key, payload)
SELECT
  (substr(md5(o.display_key || ':' || k.kind), 1, 8) || '-' || substr(md5(o.display_key || ':' || k.kind), 9, 4) || '-4' || substr(md5(o.display_key || ':' || k.kind), 14, 3) || '-8' || substr(md5(o.display_key || ':' || k.kind), 18, 3) || '-' || substr(md5(o.display_key || ':' || k.kind), 21, 12))::uuid,
  o.id, k.kind, o.display_key || '-' || lower(k.kind),
  jsonb_build_object('synthetic', true, 'label', o.display_key || ' ' || k.kind)
FROM platform.organizations o
CROSS JOIN (VALUES ('CUSTOMER'), ('SITE'), ('EQUIPMENT'), ('JOB'), ('VISIT'), ('WORKER'), ('INVENTORY')) AS k(kind);

INSERT INTO tenant.evidence_metadata (id, organization_id, owning_resource_id, evidence_kind, object_reference)
SELECT
  (substr(md5(r.display_key || ':evidence'), 1, 8) || '-' || substr(md5(r.display_key || ':evidence'), 9, 4) || '-4' || substr(md5(r.display_key || ':evidence'), 14, 3) || '-8' || substr(md5(r.display_key || ':evidence'), 18, 3) || '-' || substr(md5(r.display_key || ':evidence'), 21, 12))::uuid,
  r.organization_id, r.id, 'MMQR_RECEIPT_METADATA', 'synthetic://not-a-real-object/' || r.display_key
FROM tenant.resources r WHERE r.resource_kind = 'JOB';

INSERT INTO tenant.projection_rows (id, organization_id, projection_kind, source_resource_id, payload)
SELECT
  (substr(md5(r.display_key || ':projection'), 1, 8) || '-' || substr(md5(r.display_key || ':projection'), 9, 4) || '-4' || substr(md5(r.display_key || ':projection'), 14, 3) || '-8' || substr(md5(r.display_key || ':projection'), 18, 3) || '-' || substr(md5(r.display_key || ':projection'), 21, 12))::uuid,
  r.organization_id, 'SEARCH', r.id,
  jsonb_build_object('synthetic', true, 'searchKey', r.display_key)
FROM tenant.resources r;

INSERT INTO tenant.background_jobs (
  id, organization_id, machine_subject_id, purpose, correlation_id, target_resource_id, lifecycle_state
)
SELECT CASE r.display_key
    WHEN 'org-alpha-job' THEN '40000000-0000-4000-8000-000000000001'::uuid
    WHEN 'org-bravo-job' THEN '40000000-0000-4000-8000-000000000003'::uuid
    WHEN 'org-charlie-job' THEN '40000000-0000-4000-8000-000000000004'::uuid
    ELSE '40000000-0000-4000-8000-000000000005'::uuid
  END,
  organization_id,
  '10000000-0000-4000-8000-000000000009', 'SYNTHETIC_JOB_REFRESH',
  CASE r.display_key
    WHEN 'org-alpha-job' THEN '50000000-0000-4000-8000-000000000001'::uuid
    WHEN 'org-bravo-job' THEN '50000000-0000-4000-8000-000000000003'::uuid
    WHEN 'org-charlie-job' THEN '50000000-0000-4000-8000-000000000004'::uuid
    ELSE '50000000-0000-4000-8000-000000000005'::uuid
  END,
  id, 'PENDING'
FROM tenant.resources r WHERE r.resource_kind = 'JOB';

INSERT INTO security.audit_events (
  id, organization_id, subject_id, authority_source, action, resource_kind,
  resource_id, decision, purpose, correlation_id, case_id, details
) VALUES
  ('60000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', 'MEMBERSHIP', 'READ', 'AUDIT_EVENT', NULL, 'ALLOW', 'SYNTHETIC_PROOF', '50000000-0000-4000-8000-000000000011', 'seed-org-alpha', '{"synthetic":true}'),
  ('60000000-0000-4000-8000-000000000002', '00000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000002', 'MEMBERSHIP', 'READ', 'AUDIT_EVENT', NULL, 'ALLOW', 'SYNTHETIC_PROOF', '50000000-0000-4000-8000-000000000012', 'seed-org-bravo', '{"synthetic":true}'),
  ('60000000-0000-4000-8000-000000000003', '00000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000003', 'MEMBERSHIP', 'READ', 'AUDIT_EVENT', NULL, 'ALLOW', 'SYNTHETIC_PROOF', '50000000-0000-4000-8000-000000000013', 'seed-org-charlie', '{"synthetic":true}');
