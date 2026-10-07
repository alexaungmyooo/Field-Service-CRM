# TP-01 Materialization and Supply-Chain Review

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted checkpoint-1 materialization baseline; not executed |
| Work package | `WP-19 TP-01 Materialization and Supply-Chain Review` |
| Proof checkpoint | `TP1-CHK-001` |
| Governing contract | Accepted `WP-18`, `TP1-DEC-001` through `TP1-DEC-010` |
| Independent inventory validation | PASS |
| Technical-proof execution | Not authorized and not performed |
| Application coding/infrastructure/final architecture/deployment | Not authorized |
| Owner | Aung Myo Oo |
| Evidence snapshot | 2026-10-07 |

## Outcome and authority boundary

WP-19 materialized the exact disposable TP-01 checkpoint-1 inventory under
`proofs/tp-01-tenant-boundary/`. It generated and reviewed the lockfile, installed the accepted
proof-only dependencies with lifecycle scripts disabled, froze the 222-case manifest, collected
private dependency/license/advisory/hash evidence, performed static validation, and obtained one
independent inventory review.

This is not a TP-01 result. No database image was pulled or started; no schema or fixture was
applied; no HTTP or background process was started; no proof case, preflight, reproduction, or
evidence-verification run occurred. The materialized source is disposable proof code, not
application code or an accepted application architecture.

## Governing references

- Proof governance: `PGD-001` through `PGD-010`, `PGE-001` through `PGE-010`, and
  `TP1-POLICY-001` through `TP1-POLICY-010`.
- Exact contract: `TP1-DEC-001` through `TP1-DEC-010`, `TP1-AUTH-001` through `009`,
  `TP1-CASE-001` through `008`, and `TP1-CHK-001`.
- Product/security constraints: `BR-ORG-001` through `006`, `SR-ORG-001` through `014`,
  `SEC-INV-001` through `015`, and `DEC-012`.
- Current owner authorization: `DEC-143`.

## Frozen materialized inventory

The checkpoint contains exactly 50 non-dependency files. The private hash inventory binds every
path and byte sequence. `node_modules/` and all raw evidence are ignored and are not publication
inventory.

### Root and configuration — 7 files

`.env.example`, `.gitignore`, `README.md`, `compose.yaml`, `package.json`, `pnpm-lock.yaml`, and
`tsconfig.json`.

### Materialization and future-command scripts — 17 files

`scripts/case-contract.mjs`, `scripts/checkpoint-static-evidence.mjs`, `scripts/cleanup.mjs`,
`scripts/command.mjs`, `scripts/db-reset.mjs`, `scripts/db-verify-image.mjs`,
`scripts/evidence-verify.mjs`, `scripts/execution-authorization.mjs`,
`scripts/hash-inventory.mjs`, `scripts/materialize-case-manifest.mjs`,
`scripts/materialize-dependencies.mjs`, `scripts/preflight.mjs`, `scripts/proof-run.mjs`,
`scripts/runtime-contract.mjs`, `scripts/supply-chain-evidence.mjs`,
`scripts/typecheck.mjs`, and `scripts/verify-case-manifest.mjs`.

### Disposable proof SQL — 5 files

`sql/001_roles.sql`, `sql/002_schema.sql`, `sql/003_rls.sql`, `sql/004_seed.sql`, and
`sql/005_reset.sql`.

### Disposable proof source — 16 files

`src/app.ts`, `src/audit.ts`, `src/background.ts`, `src/context.ts`, `src/database.ts`,
`src/execution-authorization.ts`, `src/machine.ts`, `src/main.ts`, `src/path-executor.ts`,
`src/platform-directory.ts`, `src/policy.ts`, `src/proof-contract.ts`, `src/repository.ts`,
`src/support.ts`, `src/synthetic-directory.ts`, and `src/types.ts`.

### Frozen case and future-test inventory — 5 files

`test/case-input.ts`, `test/case-manifest.json`, `test/manifest-types.ts`, `test/proof.test.ts`, and
`test/result-writer.ts`.

The category totals are 7 + 17 + 5 + 16 + 5 = 50. The machine-readable private hash inventory,
not this prose grouping, is the exact path and digest authority.

## Dependency and supply-chain snapshot

All ten direct dependency versions match the accepted WP-18 contract. Both dependency commands ran
under Node.js `22.23.1` and pnpm `11.25.0` with `--ignore-scripts`:

- lock generation: `install --lockfile-only --ignore-scripts` — exit 0;
- exact installation: `install --frozen-lockfile --ignore-scripts` — exit 0.

| Evidence | Result |
| --- | --- |
| `package.json` SHA-256 | `04e932e37c06e2becdbc6c6255585f8a9f602e474facfe73872583a9aba61c75` |
| `pnpm-lock.yaml` SHA-256 | `752d4154434adc69d6f18021555a368dbfd2d764bf7ed6c37810371b93f6e1af` |
| Lock dependency records | 115 total dependencies reported by audit metadata |
| Advisory snapshot | 0 info, low, moderate, high, or critical vulnerabilities |
| License entries | MIT 97; BSD-3-Clause 2; ISC 7; Apache-2.0 3; 0BSD 1 |
| Package scripts during install | Disabled for both commands |

The advisory result is a dated registry snapshot, not a permanent safety guarantee. A later
execution authorization must expire if any reviewed package, lockfile, integrity, or governing
contract changes.

## Frozen case manifest and static validation

The generated manifest contains exactly 222 unique cases and has SHA-256
`de4e412a27f35bc96a3858174bcf186ae02f84c08a0e94b28771e3db78a2665f`.

| Case group | Count |
| --- | ---: |
| Allowed ordinary tenant paths | 24 |
| Ordered cross-tenant attempts | 48 |
| Context faults | 64 |
| Support grants | 32 |
| Platform directory boundary | 6 |
| Machine/background authority | 8 |
| Removed/suspended authority | 16 |
| Pool reuse and concurrent context | 24 |
| Total | 222 |

Static manifest verification and TypeScript typechecking passed under the exact Node.js runtime.
No test runner, database path, network service, or TP-01 case was invoked.

## Materialized guardrails

The inventory contains fail-closed future execution authorization checks. A future execution
package must bind the accepted package, repository revision, clean proof path, complete artifact
inventory hash, and every artifact digest before any executable proof command can continue.
Materialized controls also cover:

- server-authoritative organization and authority context;
- application-only, forced-RLS-only, combined, and controlled-fault modes;
- separate runtime/bootstrap roles and composite tenant references;
- all eight required path families, including background, support, platform, evidence, projection,
  and audit paths;
- deterministic retries, pool reuse, concurrent context, and mutation state hashes;
- persisted minimized audit-event evidence; and
- cleanup checks for processes, listeners, ports, containers, networks, volumes, generated
  credentials, installed proof dependencies, and provider/global residue.

These are reviewable mechanics only. Their behavior remains unmeasured until checkpoint 2 is
separately authorized and executed.

## Independent checkpoint-1 inventory validation

The one authorized independent subagent performed a read-only inventory review. Earlier review
findings were corrected within the materialization boundary, after which the same reviewer issued
a final PASS for `TP1-CHK-001`:

> The 50-file inventory is complete, unique, and hash-consistent; static and supply-chain evidence
> is consistent; the 222-case manifest is complete; and the identified seed, audit, path coverage,
> authorization, concurrency, state-hash, evidence, SQL handling, and cleanup issues are resolved.

The PASS is checkpoint inventory validation only. It is not proof execution, independent
reproduction, qualified security review, architecture acceptance, or implementation authorization.

## Runtime-correction record

An initial package-manager wrapper exposed a runtime other than the accepted Node.js `22.23.1`.
That output was rejected as contract evidence. Materialization was repeated through the exact
accepted Node executable, and the authoritative private evidence records Node.js `22.23.1`, pnpm
`11.25.0`, both lifecycle-disabled commands, and successful exit status. No lifecycle script or
proof command ran during the correction.

## Readiness and remaining blockers

Checkpoint 1 is `READY_FOR_OWNER_REVIEW`. TP-01 execution remains `NOT_AUTHORIZED` and
`NOT_READY` because:

- the exact checkpoint-1 revision and hashes have not yet been accepted and published;
- the proof operator is unassigned;
- the independent reproduction validator for checkpoint 2 is unassigned;
- the qualified security reviewer is unassigned;
- database-image verification/pull/start and all proof commands remain closed; and
- no explicit checkpoint-2 execution authorization exists.

The checkpoint-1 subagent cannot automatically become the later reproduction validator, and its
inventory PASS cannot replace qualified security review.

## Owner decision sheet

The owner accepted each recommendation exactly as recorded on 2026-10-07.

| ID | Recommendation | Effect if accepted | Status |
| --- | --- | --- | --- |
| `WP19-DEC-001` | Accept the exact 50-file checkpoint inventory and recorded hashes. | Freezes the disposable materialization baseline for publication. | Accepted |
| `WP19-DEC-002` | Accept the exact package/lock/manifest hashes and the dated supply-chain snapshot. | Makes dependency drift or artifact drift expire the checkpoint. | Accepted |
| `WP19-DEC-003` | Accept the independent inventory PASS only for `TP1-CHK-001`. | Closes inventory validation without claiming proof/security acceptance. | Accepted |
| `WP19-DEC-004` | Keep TP-01 execution closed until roles, revision/hashes, and checkpoint-2 authority are explicit. | Prevents checkpoint-1 acceptance from becoming implicit execution authority. | Accepted |
| `WP19-DEC-005` | Treat this proof inventory as disposable and non-application. | Prevents proof mechanics from silently selecting the product architecture. | Accepted |

## Acceptance criteria and next gate

WP-19 is ready for owner review because:

- creation and dependency installation stayed within the authorized proof-only boundary;
- the exact direct dependencies and generated lockfile are frozen and hashed;
- lifecycle scripts were disabled;
- the 222-case manifest and all 50 files are hash-consistent;
- static checks and supply-chain collection succeeded;
- the one authorized independent inventory review passed;
- raw evidence and dependencies remain ignored/private; and
- no prohibited proof execution or product/infrastructure action occurred.

If the owner accepts WP-19 and separately authorizes publication, the next package should assign
the three required checkpoint-2 roles and prepare an exact execution authorization. Merely
publishing WP-19 must not run TP-01 or authorize checkpoint 2.

## Acceptance record

The owner accepted `WP19-DEC-001` through `WP19-DEC-005` and the checkpoint-1 inventory exactly as
recorded on 2026-10-07 and authorized commit and push. Acceptance is limited to the disposable
materialization baseline and independent inventory review. TP-01 execution, independent
reproduction, qualified security acceptance, application coding, provider accounts, paid
services, infrastructure, final architecture selection, deployment, and customer/live data remain
closed.
