# TP-01 Recursive Authorization and State-Path Static Remediation

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted under standing completion authority — independent static validation PASS; publication authorized |
| Work package | `WP-69 Recursive Authorization and State-Path Static Remediation` |
| Governing decision | `DEC-200` |
| Governing finding | `WP68-DEV-001` |
| Governing controls | `WP68-REM-001` through `WP68-REM-007` |
| Base publication | `2aa7fabf614ced1eb23240b59debcfcbee12449b` |
| Base repository tree | `9e3741ef0bcfca426cefb3b299d29105e78fdbb8` |
| Base proof tree | `3696a8883d6f3d7eddead1460fc26b0af004d236` |
| Owner | Aung Myo Oo |
| Date | 2026-10-09 |

## Objective and authority

WP-69 prospectively removes the recursive forced-RLS authorization path exposed by immutable
WP-68 while preserving deny-by-default tenant isolation, transaction-local authority context,
active-organization enforcement, all 222 accepted case oracles, and the least-privilege runtime
role. It changes only the disposable TP-01 proof, governing documentation, and ignored private
static evidence needed to specify, test, hash, and review that correction.

WP-69 is static remediation only. It authorizes no package-manager or dependency operation,
credential or private-environment generation/use, preflight, image inspection or retrieval,
Docker/Compose command, pull token, container, database, service, SQL execution, fixture, listener,
cleanup execution, proof/reproduction, execution-evidence verification, network access,
application code, architecture selection, infrastructure, deployment, provider account/cost, or
customer/live-data action. Static PASS is not a TP-01 result and does not authorize a retry.

## Confirmed recursive path

WP-68 reached the following cycle under the non-owner runtime role and forced RLS:

```text
tenant/audit policy
  -> security.can_access_tenant(...)
  -> SELECT platform.organizations
  -> organizations_authority_policy
  -> security.can_discover_organization(...)
  -> security.can_access_tenant(...)
```

Because `platform.organizations` uses both `ENABLE` and `FORCE ROW LEVEL SECURITY`, its owner
cannot silently bypass the policy during the security-definer lifecycle lookup. Re-entry continued
until PostgreSQL returned `54001` (`stack depth limit exceeded`). The failure affected all 222
executable cases before any accepted oracle could pass. WP-69 does not reinterpret the unchanged
state hashes or the stopped cases as isolation evidence.

## Remediation controls

| ID | Control | Candidate result |
| --- | --- | --- |
| `WP69-REM-001` | Preserve WP-68, its provisional-seal mismatch record, renewed 18-entry stop seal, and final 21-entry private inventory as immutable Inconclusive evidence; never resume or rewrite the run. | Satisfied |
| `WP69-REM-002` | Separate tenant-authority validation from organization lifecycle lookup so no authority helper reads `platform.organizations` or re-enters its forced-RLS policy. | Satisfied |
| `WP69-REM-003` | Preserve exact transaction-local organization, subject, revision, purpose, proof-clock, support-grant, and machine-job authority semantics for membership, support, and machine identities. | Satisfied |
| `WP69-REM-004` | Retain active-organization validation, platform-directory authority, inactive-organization denial for tenant discovery, and the non-owner/non-superuser/`NOBYPASSRLS` runtime role. | Satisfied |
| `WP69-REM-005` | Retain `ENABLE` and `FORCE ROW LEVEL SECURITY` on all six protected tables; prohibit RLS disabling, `BYPASSRLS`, owner-role login, widened table grants, or application-side substitution. | Satisfied |
| `WP69-REM-006` | Require final evidence verification to distinguish the security-definer authority functions from the security-invoker organization-row visibility function and require owned fixed search paths. | Satisfied |
| `WP69-REM-007` | Add dependency-free static regression coverage that proves the effective function/policy graph is acyclic and rejects cycle, RLS weakening, owner-login, or frozen semantic drift. | Satisfied |
| `WP69-REM-008` | Renew every affected proof hash and the complete proof inventory, then obtain exactly one fresh independent static validator after final freeze. | Satisfied |
| `WP69-REM-009` | Keep all dependency, runtime, network, product, architecture, infrastructure, deployment, provider, and customer/live-data gates closed. | Satisfied |

## Exact forced-RLS remediation

`security.has_tenant_authority(uuid, text, boolean)` is the new non-recursive security-definer
helper. It validates organization/subject context and the exact membership, support-grant, or
machine-identity authority branch without reading `platform.organizations`. It fails closed when
organization context differs, the subject is absent, a revision is stale, a grant is expired,
revoked, read-only for a write, or outside resource scope, or a machine authority is absent,
revoked, organization-mismatched, or purpose-mismatched.

`security.can_access_tenant(uuid, text, text, boolean)` first requires that helper to pass and then
queries the exact target organization for `lifecycle_state = 'ACTIVE'`. Forced RLS remains active
for that lookup. Its policy now calls
`security.organization_row_visible(uuid, text)`, an owned security-invoker function with a fixed
search path. When the lookup is performed inside the `tp01_owner` security-definer context, the
function admits only that non-login, non-superuser, `NOBYPASSRLS` owner identity. A direct runtime
query retains the caller identity and delegates to bounded organization discovery instead.

`security.can_discover_organization(uuid, text)` remains a security definer. It allows the
platform-directory path only for the exact verified directory role. Tenant-scoped discovery first
requires the actual row lifecycle argument to be `ACTIVE` and then calls the non-recursive
authority helper. It never calls `can_access_tenant` and never reads `platform.organizations`.

The resulting effective graph is:

```text
tenant table policies -> can_access_tenant
audit policy -> can_access_tenant + can_write_audit
can_access_tenant -> has_tenant_authority + organizations_authority_policy
organizations_authority_policy -> organization_row_visible
organization_row_visible -> can_discover_organization
can_discover_organization -> has_tenant_authority
```

No node reaches an ancestor. All new and changed functions retain explicit ownership, public
revocation, bounded runtime execution grants, and fixed search paths. The organization policy uses
the row's actual `id` and `lifecycle_state`; it does not trust caller-supplied row state at the
policy boundary.

## Candidate bindings

| ID | Bound fact |
| --- | --- |
| `WP69-BIND-001` | Base publication is `2aa7fabf614ced1eb23240b59debcfcbee12449b`. |
| `WP69-BIND-002` | Base repository tree is `9e3741ef0bcfca426cefb3b299d29105e78fdbb8`; base proof tree is `3696a8883d6f3d7eddead1460fc26b0af004d236`. |
| `WP69-BIND-003` | Exact static runtime is Node `v22.23.1`; no package manager, dependency, runtime, Docker/database, proof, or network command is part of validation. |
| `WP69-BIND-004` | The renewed proof inventory contains 80 sorted unique files; artifact-inventory SHA-256 is `8cb9082083a4611f0fe2e3e3d61c0306a47ca62b4292e738a4f0c73f64a686e6`. |
| `WP69-BIND-005` | Canonical no-terminal-LF content-set SHA-256 is `aefb6865d7ffb89d906bb7d369b99e9300cb0f1f09581b0a99b8cd7889882f4c`. |
| `WP69-BIND-006` | Proof README SHA-256 is `a9e50f550875841283c55fe5156ca19d3334b2ce4a60b743c6ccd1cdaa0dc369`. |
| `WP69-BIND-007` | `sql/003_rls.sql` SHA-256 is `d2bc5e0498079900854196af3a775c326428c9cf61abd4918f7abe8c2155f642`. |
| `WP69-BIND-008` | `scripts/evidence-verify.mjs` SHA-256 is `2cba02b744b9b65b15997fc6ccc9f16b97d4ff351493993f336f9f58692ec97f`. |
| `WP69-BIND-009` | `scripts/rls-authorization-graph-contract.mjs` SHA-256 is `22b1ec3ee4087f1c17f55e8b2cb3f999083aa1b91473c4e7f7a450b25d107218`. |
| `WP69-BIND-010` | `scripts/rls-authorization-graph-contract.test.mjs` SHA-256 is `63f48331a1190c48b5f64d449088c300749ea45d6940b4e7335ac719d2ac65a2`. |
| `WP69-BIND-011` | `has_tenant_authority` is a security definer with fixed `pg_catalog, security, platform` search path and no organization-table, tenant-access, or organization-discovery call. |
| `WP69-BIND-012` | `can_access_tenant` requires the non-recursive authority helper and retains an exact active-organization lookup under forced RLS. |
| `WP69-BIND-013` | `organization_row_visible` is security invoker, recognizes only the non-login `tp01_owner` for the internal lifecycle lookup, and delegates direct runtime visibility to bounded discovery. |
| `WP69-BIND-014` | `can_discover_organization` retains the platform-directory role branch and requires actual `ACTIVE` row state plus the authority helper for tenant-scoped discovery. |
| `WP69-BIND-015` | All six protected tables retain both `ENABLE` and `FORCE ROW LEVEL SECURITY`; both proof roles remain non-superuser and `NOBYPASSRLS`, and `tp01_owner` remains `NOLOGIN`. |
| `WP69-BIND-016` | Public execution on all governed functions is revoked; the exact runtime function grants and fixed search paths are preserved. |
| `WP69-BIND-017` | The final evidence verifier requires four exact security definers—`can_access_tenant`, `can_discover_organization`, `can_write_audit`, and `has_tenant_authority`—and one owned security-invoker `organization_row_visible`. |
| `WP69-BIND-018` | The static graph contract models every policy/function edge, proves it acyclic, and rejects organization-policy regression, RLS weakening, owner-login drift, and changes to frozen semantic files. |
| `WP69-BIND-019` | Database context/state-hash source SHA-256 remains `9c50fd54740bcfc6c5f16653bc3e77e72d9d8fa41da4e4054037820723b662bf`. |
| `WP69-BIND-020` | Proof test SHA-256 remains `db80f493c6ee3a767f7ceb3c634c4be8691d03e9889608c420a16f0c0dac4000`; the 222-case manifest remains `de4e412a27f35bc96a3858174bcf186ae02f84c08a0e94b28771e3db78a2665f`. |
| `WP69-BIND-021` | Proof runner SHA-256 remains `724b29ce6f294795a6ac7b82fcde925d28406db98c625ad7ab2c3b3f2a7d3d31`; database-evidence helper SHA-256 remains `69909e32c0d58478b782e5198c3a9a08e38b22a0664c49ee653d6cd3318d42c5`. |
| `WP69-BIND-022` | Package `eaf81dc87f1afdf95f42880bcfb60ce744b7ba70e3856d89866905bc510dffc0`, lockfile `752d4154434adc69d6f18021555a368dbfd2d764bf7ed6c37810371b93f6e1af`, Compose `e35dd7d5302c064b365c3030ad02fb8c44e456bbb421ec6d9dd130ebabb01cae`, roles SQL `344ffa0445bd03cf58d66cf62d3c3e898c639bcc994786aebd3347dc6e70f316`, and all non-RLS SQL remain unchanged. |
| `WP69-BIND-023` | Exact Node syntax passed for all 47 `scripts/*.mjs` files; all 15 dependency-free `scripts/*.test.mjs` suites passed. |
| `WP69-BIND-024` | No dependency, credential/environment, preflight, image, Docker/Compose runtime, container, database, service, SQL, fixture, cleanup, proof/reproduction, network, product, architecture, infrastructure, deployment, provider, or customer/live-data action occurred. |
| `WP69-BIND-025` | The sole fresh independent static validator, `/root/wp69_static_validator`, returned `PASS` with no findings and zero mutation over the final freeze. |

The canonical content-set checksum uses sorted inventory order with each entry rendered as
`path + NUL + bytes + NUL + sha256`, joined by LF with no terminal LF.

## Historical disposition

`WP69-HIST-001`: WP-68 and all earlier stopped runs remain immutable and non-resumable. WP-69
changes only the prospective disposable proof candidate. It does not change any private run
packet, seal, review, result, or previously published statement and does not claim that PostgreSQL
`54001` was resolved at runtime.

## Primary dependency-free validation

Primary static validation used exact Node `v22.23.1`. Syntax checks passed for all 47 proof
`scripts/*.mjs` files, and all 15 built-in-only `scripts/*.test.mjs` suites passed. The new suite
confirmed the exact acyclic graph, the non-recursive authority helper, the security-invoker
row-visibility boundary, active-organization and platform-directory semantics, six forced-RLS
tables, unchanged roles and case oracles, exact final-verifier expectations, and fail-closed
rejection of cycle, RLS weakening, owner-login, and frozen-source drift.

The complete 80-file proof inventory and both aggregate hashes were renewed. No dependency,
credential/environment, preflight, image, Docker/Compose runtime, database, SQL, cleanup,
proof/reproduction, evidence-verification, network, application, architecture, infrastructure,
deployment, provider, or customer/live-data command ran.

The sole fresh independent static validator, `/root/wp69_static_validator`, reproduced the frozen
ten-path scope, all 80 inventory entries and both aggregate identities, the 47 syntax checks, all
15 suites, every remediation control and binding, unchanged exclusions, clean whitespace, and an
empty Git index. It returned `PASS` with no Critical, High, Medium, or Low findings and attested
zero mutation. It ran no dependency, package-manager, runtime, Docker/database, SQL, proof,
cleanup, Git-publication, or network action.

## Recommended owner dispositions under standing completion authority

| ID | Recommendation | Current state |
| --- | --- | --- |
| `WP69-DEC-001` | Accept `WP69-REM-001` through `009` only after the sole fresh independent static validator returns `PASS`. | Accepted |
| `WP69-DEC-002` | Accept `WP69-BIND-001` through `025` and the renewed 80-file proof inventory only after complete independent hash reproduction. | Accepted |
| `WP69-DEC-003` | Accept `DEC-200` as a TP-01-only prospective forced-RLS candidate, not an application architecture or production-security decision. | Accepted |
| `WP69-DEC-004` | Preserve WP-68 and every earlier stopped run as immutable, non-resumable Inconclusive evidence. | Accepted |
| `WP69-DEC-005` | After independent PASS and standing-authority acceptance, authorize commit and push only for the exact frozen ten-path inventory below. | Accepted |
| `WP69-DEC-006` | After verified publication, activate WP-70 for published rebinding and reauthorization-readiness documentation only; keep execution and every product/runtime gate closed. | Accepted |

## Candidate frozen public/proof inventory

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/21_TP01_EXACT_EXECUTION_CONTRACT.md`
4. `docs/71_TP01_CONTROLLED_DATABASE_EVIDENCE_CONTINUITY_EXECUTION_RESULT.md`
5. `docs/72_TP01_RECURSIVE_AUTHORIZATION_STATE_PATH_STATIC_REMEDIATION.md`
6. `proofs/tp-01-tenant-boundary/README.md`
7. `proofs/tp-01-tenant-boundary/sql/003_rls.sql`
8. `proofs/tp-01-tenant-boundary/scripts/evidence-verify.mjs`
9. `proofs/tp-01-tenant-boundary/scripts/rls-authorization-graph-contract.mjs`
10. `proofs/tp-01-tenant-boundary/scripts/rls-authorization-graph-contract.test.mjs`

Ignored private inventory and validation evidence remain under `internal-local/` and must never be
published.

## Next gate

WP-69 remains static-only. The sole fresh independent validator returned `PASS`; under standing
completion authority, the recorded controls, bindings, decisions, renewed inventory, and exact
ten-path scope are accepted. Commit and push are authorized only for that inventory.

After live-remote verification, WP-70 may perform published rebinding and reauthorization-
readiness documentation only. WP-70 may not create execution identities or an authorization draft,
restore or invoke dependencies, create credentials or environments, inspect/start images or
runtime services, execute cleanup/proof/reproduction, use network access, change application code,
select architecture, create infrastructure, deploy, incur provider cost, or access customer/live
data.

## Verified publication and WP-70 activation

The exact ten-path inventory was published at
`b89c54023f539a45608b8fc2057faec5db0a0103`; repository tree is
`3651dcdd91e189a29aad25df83615db3051c54d4`, and proof tree is
`7542b7459c0296dbbc6cf74636b0efb97201968a`. This document's committed SHA-256 is
`11fca40acc65e6692a6e35ce5440efd0ce5e2c168aa0d88a91fc247da54a59cc`. The 80-file inventory,
artifact-inventory SHA-256 `8cb9082083a4611f0fe2e3e3d61c0306a47ca62b4292e738a4f0c73f64a686e6`, and canonical
content-set SHA-256 `aefb6865d7ffb89d906bb7d369b99e9300cb0f1f09581b0a99b8cd7889882f4c` remain unchanged.
WP-69 is `VERIFIED_AND_CLOSED`.

WP-70 is activated only for documentation-only published rebinding and reauthorization readiness.
It may record the exact candidate, stopped history, options, roles/no-draft state, and later gates.
It may not change the proof, instantiate identities, prepare an authorization draft, create
materials or runtime state, execute TP-01, use network access, or open any product, architecture,
infrastructure, deployment, provider, or customer/live-data gate.
