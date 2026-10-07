# TP-01 Evidence Completeness Remediation and Rematerialization

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted for publication — static inventory PASS; execution closed |
| Work package | `WP-21 TP-01 Evidence Completeness Remediation and Rematerialization` |
| Governing decisions | `DEC-148`, `DEC-149`, `WP20A-DEC-004` |
| Governing findings | `TP1-SEC-STATIC-001` through `003` |
| Owner | Aung Myo Oo |
| Date | 2026-10-07 |
| TP-01 execution | Not authorized |

## Objective

Close the three accepted static evidence blockers without running TP-01. Rematerialize the
disposable proof so a later checkpoint-2 package can measure rather than assume database identity,
emit all dedicated evidence artifacts, and distinguish interim result verification from a final
complete-packet PASS.

## Authorized scope

WP-21 may change only:

- `proofs/tp-01-tenant-boundary/` evidence-generation, evidence-verification, cleanup, and measured
  database-identity mechanics;
- governing public documentation needed to describe the remediated contract and expired bindings;
- ignored private authorization, validation, static-check, hash, and independent inventory-review
  evidence; and
- the exact artifact inventory and hashes that bind a later execution proposal.

One fresh independent subagent may validate the completed rematerialized inventory read-only.

## Closed scope

WP-21 does not authorize:

- `preflight`, image verification, Docker, Compose, SQL, database, fixture, HTTP/background
  service, listener, proof-case, reproduction, evidence-verification, or cleanup execution;
- image pull/inspection, container/network/volume creation, database access, or port binding;
- dependency or lockfile installation/change, lifecycle scripts, provider accounts, paid services,
  infrastructure, deployment, external configuration, or customer/live data;
- application code, final architecture selection, proof outcome claims, checkpoint-2 execution
  authorization, commit, push, merge, or publication; or
- changing the accepted 222-case manifest, case oracles, direct/transitive dependency set, pinned
  Node/pnpm/Docker/Compose/PostgreSQL versions, image digest/platform, or resource limits.

## Remediation dispositions

| ID | Finding | Materialized correction | Verification requirement | State |
| --- | --- | --- | --- | --- |
| `WP21-REM-001` | `TP1-SEC-STATIC-001` | Query `current_user` on the runtime connection for each database-backed observation; emit catalog evidence for session/current role, role attributes, schema/table ownership, privileges, forced RLS, policies, security-definer ownership/search path, and transaction-local context. | Static type/syntax review plus later runtime evidence; no literal may originate the observation field. | Materialized, not run |
| `WP21-REM-002` | `TP1-SEC-STATIC-002` | Bind authorization, environment, image, supply chain, fixture, manifest, database security, primary/reproduction results, audits, state, deviations, cleanup, reviews, conclusion, and hashes. Interim verification cannot emit final PASS; `evidence:verify-final` requires cleanup and all three reviews. | Static control-flow/inventory review now; later execution and security review. | Materialized, not run |
| `WP21-REM-003` | `TP1-SEC-STATIC-003` | Preflight emits `environment.json`; reset emits `fixture.json`; each run emits a per-tenant snapshot; interim verification emits `state-integrity.json`. | Exact artifact-name and schema checks plus later runtime generation. | Materialized, not run |
| `WP21-REM-004` | Cleanup evidence described only final state. | `cleanup.json` records relevant pre-cleanup state and verifies absence of processes, listeners, Docker resources, generated files, and local credentials after cleanup. | Final verifier rejects missing/residual cleanup state. | Materialized, not run |
| `WP21-REM-005` | The old binding covered incomplete evidence mechanics. | Renew the full proof inventory, package hash, content-set identity, and inventory digest after static validation; defer the Git tree/revision until an authorized publication commit exists. | Exact hashes recorded below and independently reproduced; publication binding still pending. | Static inventory PASS |

## Evidence lifecycle

The remediated later-execution sequence is:

1. fail-closed authorization and preflight emit environment, manifest, supply-chain binding, and
   explicit deviation evidence;
2. verified image evidence is captured before database start;
3. deterministic reset emits fixture and measured database-security evidence;
4. primary and independent reproduction each capture before/after per-organization state;
5. `evidence:verify` validates results and emits combined audit, semantic-difference,
   state-integrity, and interim conclusion artifacts with a non-final status;
6. cleanup records before/after resource state and removes bounded generated resources;
7. operator, reproduction-validator, and independent technical-security review records are added;
8. `evidence:verify-final` validates the complete packet and is the only interface capable of
   emitting final PASS; it requires structured identity/date/method/evidence/findings/risk/
   recommendation/limitation fields and propagates any reviewer FAIL or INCONCLUSIVE; and
9. the owner separately accepts, rejects, or requests remediation. No architecture decision is
   automatic.

Every execution-facing step above remains closed in WP-21.

## Frozen behaviors preserved

- The case manifest remains exactly 222 cases with hash
  `de4e412a27f35bc96a3858174bcf186ae02f84c08a0e94b28771e3db78a2665f`.
- Primary and reproduction remain role-separated and semantically compared.
- The database runtime remains least-privilege `tp01_runtime`; measured evidence supplements rather
  than weakens forced-RLS and application-policy expectations.
- Synthetic data, zero customer/live data, zero provider accounts/cost, local-only resources,
  fail-closed stops, mandatory cleanup, and zero-tolerance cross-tenant outcomes remain unchanged.
- Qualified human security review remains mandatory before production or any real/customer data.

## Rematerialized binding

The rematerialized proof contains 51 non-dependency files. Eleven proof files differ from the
published WP-19 baseline: ten tracked files changed and one evidence helper was added. The
lockfile, dependency set, SQL/schema/policy/seed files, case contract, and 222-case manifest did not
change.

| Binding | Required value |
| --- | --- |
| Repository base | `03f0425b4089ae1c0173ac911a2f23461eeb6a92` plus uncommitted WP-21 owner-review inventory |
| Proof file count | `51` |
| Proof content-set SHA-256 | `ed1f8c66a7d37ef5921dd5bcf81a13d6fb305be64bd45a27fc6c1dee4d05b7d0` |
| Git proof-tree identity | Pending an owner-authorized publication commit; no Git object was created in WP-21 |
| Package SHA-256 | `d10a8e2e5bfeb170cfb6f29485a5376689ad4e73dcbc68c62cc7348ffc4dcc1e` |
| Lockfile SHA-256 | `752d4154434adc69d6f18021555a368dbfd2d764bf7ed6c37810371b93f6e1af` — unchanged |
| Case-manifest SHA-256 | `de4e412a27f35bc96a3858174bcf186ae02f84c08a0e94b28771e3db78a2665f` |
| Artifact-inventory SHA-256 | `adc82a94eb98d4cd76227de3d963c80e386cf5c7927be3487b2cb5a54ce73547` |
| Static-validation SHA-256 | `b6ec96149fc497e197854e261fb154818cdf1a4cd378d3003532fdb89ff6caa6` |
| Independent inventory validator | `/root/wp21_independent_inventory` — PASS after remediation revalidation |

The proof content-set value is a supplementary review checksum, not a Git tree ID. It is SHA-256
over the UTF-8 sequence of inventory entries in stored order, where each entry is
`path + NUL + decimal byte count + NUL + file SHA-256`, entries are separated by one LF, and there
is no terminal LF. The canonical binding artifact remains the complete private inventory and its
SHA-256; a later authorized commit must separately supply the Git proof-tree identity.

## Frozen WP-21 public inventory

The owner-review inventory contains exactly these 18 public paths.

Governing documentation:

- `AGENTS.md`
- `docs/00_PROJECT_START_HERE.md`
- `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
- `docs/21_TP01_EXACT_EXECUTION_CONTRACT.md`
- `docs/23_TP01_EXECUTION_ROLES_CHECKPOINT2_AUTHORIZATION.md`
- `docs/24_TP01_SECURITY_REVIEW_GOVERNANCE_AMENDMENT.md`
- `docs/25_TP01_EVIDENCE_COMPLETENESS_REMEDIATION.md`

Disposable proof:

- `proofs/tp-01-tenant-boundary/README.md`
- `proofs/tp-01-tenant-boundary/package.json`
- `proofs/tp-01-tenant-boundary/scripts/cleanup.mjs`
- `proofs/tp-01-tenant-boundary/scripts/database-evidence.mjs`
- `proofs/tp-01-tenant-boundary/scripts/db-reset.mjs`
- `proofs/tp-01-tenant-boundary/scripts/evidence-verify.mjs`
- `proofs/tp-01-tenant-boundary/scripts/preflight.mjs`
- `proofs/tp-01-tenant-boundary/scripts/proof-run.mjs`
- `proofs/tp-01-tenant-boundary/src/database.ts`
- `proofs/tp-01-tenant-boundary/src/path-executor.ts`
- `proofs/tp-01-tenant-boundary/test/proof.test.ts`

Ignored private control, hash, static-validation, and independent-review evidence is not part of a
future public commit and must never be staged.

The earlier `TP1-BIND-001` through `TP1-BIND-006` execution proposal is expired by proof drift and
must not authorize execution. A later owner-accepted and published binding must name the exact
committed revision after WP-21 publication.

## Independent inventory validation

The single authorized validator `/root/wp21_independent_inventory` remained read-only and made no
file, Git, dependency, runtime, proof, or external change. Its first review returned FAIL with two
high, one medium, and one low static finding: database identity was not tied to each observed
connection, final PASS ignored reviewer dispositions, cleanup pre-state was not validated, and the
supplementary content-set algorithm was undocumented.

WP-21 corrected all four findings and renewed every affected hash. The same validator then returned
PASS for 51/51 inventory byte/hash consistency, exact per-operation identity provenance, pool-role
evidence, structured review parsing and non-pass propagation, pre/post cleanup validation,
documented checksum canonicalization, unchanged dependencies/lock/SQL/cases, and governing-scope
accuracy. It found no new blocker.

The independent PASS covers static materialization and inventory completeness only. It does not
prove runtime behavior, tenant isolation, database identity, generated evidence, cleanup
effectiveness, or any TP-01 outcome.

## Validation plan

WP-21 validation is limited to:

- JavaScript syntax parsing with no script execution side effects;
- the exact-runtime manifest verifier;
- the exact-runtime TypeScript no-emit check;
- source inspection for actual database-identity query provenance and evidence-packet coverage;
- unchanged lockfile/dependency/case-manifest verification;
- renewed artifact hashing and proof-tree calculation;
- documentation/reference/diff checks; and
- one fresh independent read-only inventory validation after all remediation is frozen.

These checks may establish materialization completeness; they cannot establish any runtime proof
result.

## Next gate

Bounded validation and the one fresh independent inventory review are complete. The owner accepted
WP-21 for publication. Even after publication, checkpoint 2 remains separately closed until a new
exact revision/binding, fresh reproduction-validator identity, authorization record, and explicit
execution statement are accepted.

## Acceptance record

The owner accepted WP-21, `WP21-REM-001` through `WP21-REM-005`, and the rematerialized 51-file
inventory exactly as recorded on 2026-10-07. The owner authorized commit and push of only the
frozen 18-path public inventory. After verified publication, WP-22 may prepare the rematerialized
revision/tree/hash binding and checkpoint-2 authorization decision for owner review only.

This acceptance does not authorize TP-01 execution, dependency installation/change, an image,
container, database, service, application code, final architecture selection, infrastructure,
deployment, customer/live data, or any proof-result claim.

## Publication result

The frozen 18-path inventory was committed as
`e824139 WP-21: accept TP-01 evidence rematerialization` and remotely verified at
`e824139d3050e98c06e39d3663ddcae6ac1d02db`. The resulting proof Git tree is
`48ef14bb579d0e4b620dad7c7ef6f8c409445050`. Publication did not execute TP-01 or cross any closed
runtime, product, architecture-selection, infrastructure, deployment, or real-data gate.

WP-21 is `VERIFIED_AND_CLOSED`. WP-22 is activated for owner-decision documentation only.
