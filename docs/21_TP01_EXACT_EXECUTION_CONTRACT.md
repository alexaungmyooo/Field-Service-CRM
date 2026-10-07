# TP-01 Exact Execution Contract

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted TP-01 exact-contract baseline |
| Work package | `WP-18 TP-01 Exact Execution Contract` |
| Proof | `TP-01 Tenant Boundary and Authorization Contract` |
| Source | `PROOF-SPEC-001`, accepted WP-17 governance |
| Evidence snapshot | 2026-10-07 |
| Authorization readiness | `CHECKPOINT_1_VERIFIED_AND_CLOSED`; execution `NOT_READY` |
| Technical-proof execution | Not authorized |
| Dependency installation/artifact creation | Checkpoint 1 authorized and completed; further change closed |
| Application coding/infrastructure/final architecture/deployment | Not authorized |
| Last updated | 2026-10-07 |

## Purpose and authority boundary

This package makes the proposed TP-01 execution contract exact enough for an owner decision. It
pins the proof-only path, direct dependency versions and integrity, local runtime/database
boundary, proof schema meanings, context/enforcement mechanisms, 222-case matrix, commands,
resource/network limits, evidence, cleanup, and readiness blockers.

This is documentation and authorization-readiness analysis only. It creates no proof directory,
manifest, lockfile, source, schema, container, database, process, credential, account, charge, or
measurement. It does not resolve or install any dependency, pull or start the database image, run
a command from the proposed contract, or accept an architecture. Every pinned item is TP-01-only;
none becomes an application dependency or final architecture selection.

## Governing decisions

- `PGD-001` through `PGD-010`, `DEC-128` through `DEC-134`, `PGE-001` through `010`, and
  `TP1-POLICY-001` through `010` are accepted governance.
- `TP1-AUTH-001` through `009` define the information required before execution.
- Tenant isolation and fail-closed server-authoritative context are mandatory gates.
- TP-01 remains local-only, synthetic, provider-neutral, and zero-provider-cost.
- `OPEN-032` remains open; the proof-only policy is not the final product permission matrix.
- Operator, independent validator, and security reviewer roles remain mandatory and separate.

## Owner decision sheet

Every recommendation remains Proposed until the owner accepts, revises, defers, or rejects it.

| ID | Recommended TP-01-only decision | Effect if accepted | Status |
| --- | --- | --- | --- |
| `TP1-DEC-001` | Pin local Node.js `22.23.1` and pnpm `11.25.0`. | Uses installed, version-verified tooling; no runtime/package-manager installation is authorized. | Accepted |
| `TP1-DEC-002` | Pin the exact direct package inventory and integrity in this package. | Freezes direct proof candidates only; generated transitive lockfile still requires review. | Accepted |
| `TP1-DEC-003` | Pin PostgreSQL `18.6-bookworm` at OCI index digest `sha256:afc7e2d441324c0388fa80c3d24f733b4194a4eb7f47dd8ee2b08eb1a24a647c`, platform `linux/arm64/v8`. | Defines an ephemeral local database image; download/start remain unauthorized. | Accepted |
| `TP1-DEC-004` | Pin the proof-only repository root to `proofs/tp-01-tenant-boundary/` and raw evidence to ignored `internal-local/work-packages/TP-01/evidence/`. | Keeps disposable proof artifacts outside application paths and raw evidence private. | Accepted |
| `TP1-DEC-005` | Test application-layer context enforcement and PostgreSQL forced row-level security together and separately. | Exposes single-layer and combined failures without selecting the production enforcement design. | Accepted |
| `TP1-DEC-006` | Freeze the eight path families and 222 generated cases in this contract. | No path or case may be silently skipped or added after results are observed. | Accepted |
| `TP1-DEC-007` | Pin loopback/local-bridge networking, USD 0 provider spend, four-hour primary-run limit, and the stated CPU/memory/storage ceiling. | Bounds resource and external-system exposure. | Accepted |
| `TP1-DEC-008` | Require a materialization checkpoint before execution. | Lockfile, transitive inventory, licenses, vulnerabilities, file hashes, and executable case manifest must be reviewed first. | Accepted |
| `TP1-DEC-009` | Keep execution blocked until the operator, independent validator, and security reviewer are explicitly assigned and accepted. | Preserves WP-17 independence and specialist-review requirements. | Accepted |
| `TP1-DEC-010` | Expire this contract if any pinned version/digest, governing policy, case oracle, host architecture, or required role changes before authorization. | Prevents stale “exact” evidence from authorizing a different proof. | Accepted |

## Read-only local environment evidence

Observed on 2026-10-07; no installation or configuration change occurred.

| ID | Item | Observed value | Contract consequence |
| --- | --- | --- | --- |
| `TP1-ENV-001` | Host | macOS `26.6.2`, Darwin `25.6.0`, `arm64` | TP-01 primary execution platform if later authorized |
| `TP1-ENV-002` | Node.js | `/Users/aungmyooo/.nvm/versions/node/v22.23.1/bin/node`, `v22.23.1` | Exact installed runtime; preflight must match |
| `TP1-ENV-003` | Corepack | `0.34.6` | Observed only; no prepare/activate command authorized |
| `TP1-ENV-004` | pnpm | `11.25.0` | Exact observed package manager; preflight must match |
| `TP1-ENV-005` | Docker client/engine | `29.7.2`, Linux engine, `aarch64` | Local container boundary is available but unused |
| `TP1-ENV-006` | Docker Compose | `v5.4.0` | Exact proposed orchestration command surface |
| `TP1-ENV-007` | Host PostgreSQL | `psql` and `postgres` not found | No host database installation should be added for TP-01 |
| `TP1-ENV-008` | Git | `2.54.0` | Repository/evidence revision attribution |

Changing host architecture requires a new image manifest decision. A later runtime security update
within Node 22 or PostgreSQL 18 requires a contract revision; this document never authorizes using
“latest”.

## Exact direct dependency inventory

All versions are exact, without caret or tilde ranges. Registry integrity was read on 2026-10-07.
No package was downloaded or installed.

| ID | Package | Version | Role | License | Registry integrity |
| --- | --- | --- | --- | --- | --- |
| `TP1-DEP-001` | `@nestjs/common` | `12.1.2` | Context guards/decorators and HTTP application model | MIT | `sha512-e2tvLcEaG18sJy5IXrdSLv0ZBpR5djWxypCLkLuMAEFCvVPYL1lEIhvAMBkarlg+ZA8tbZN40J0tFurUl9NpdA==` |
| `TP1-DEP-002` | `@nestjs/core` | `12.1.2` | Module/request lifecycle and execution context | MIT | `sha512-ieNRDv6P6dLsF/wMz9IUjwnyQbj7/Oluq1FXe3Xhje7TFSKPprLc83QniA2I6tjkr7YVDosdL2Dj7CVv9kU8og==` |
| `TP1-DEP-003` | `@nestjs/platform-express` | `12.1.2` | Local loopback HTTP adapter | MIT | `sha512-//ftPv5+UONizm5zcme/AP91EFo1EsqFFyC2I3HC2w8swYVXadHKW1L3A2mgUuOhM1sdKkd2gzjQmL9504x85Q==` |
| `TP1-DEP-004` | `reflect-metadata` | `0.2.2` | NestJS decorator metadata peer | Apache-2.0 | `sha512-urBwgfrvVP/eAyXx4hluJivBKzuEbSQs9rKWCrCkbSxNv8mxPcUZKeuoF3Uy4mJl3Lwprp6yy5/39VWigZ4K6Q==` |
| `TP1-DEP-005` | `rxjs` | `7.8.2` | NestJS runtime peer | Apache-2.0 | `sha512-dhKf903U/PQZY6boNNtAGdWbG85WAbjT/1xYoZIC7FAY0yWapOBQVsVrDl58W86//e1VpMNBtRV4MaXfdMySFA==` |
| `TP1-DEP-006` | `pg` | `8.23.1` | Explicit parameterized PostgreSQL access and pooling | MIT | `sha512-aL96AHANtWjPLDOLqnhx+ngp9+UK7ETEU8VJrDCGvsSSi/mGLcWYsS6Herg7lmaBJe4uwrfqsa7gTEFaSizDoQ==` |
| `TP1-DEP-007` | `@nestjs/testing` | `12.1.2` | Proof module construction and controlled overrides | MIT | `sha512-JgetYeGHGK6iUEztXyiQLOfYLWqUgAyexLMzhuAMasgLiDgYShh/PoRESE9tzpRZo4eWKme3uSZ9DFR6Myuojw==` |
| `TP1-DEP-008` | `typescript` | `6.0.3` | Exact compiler; NestJS 12 migration family | Apache-2.0 | `sha512-y2TvuxSZPDyQakkFRPZHKFm+KKVqIisdg9/CZwm9ftvKXLP8NRWj38/ODjNbr43SsoXqNuAisEf1GdCxqWcdBw==` |
| `TP1-DEP-009` | `@types/node` | `22.20.5` | Node 22 type declarations | MIT | `sha512-U2+DNr+wSjpsTS/wZGYHq7GcwfuSmKiKvoPvK22zwTlRhU91yOniN4qRR5KhIjvif7ysw/dz/hKmfDH0Ris4aA==` |
| `TP1-DEP-010` | `@types/pg` | `8.23.1` | PostgreSQL client declarations | MIT | `sha512-fKVHpikPdg4GKks3JuLEhvwSyvwzF23hnabPy6DD8ljVbC7+6J5dQzdv4arV6jqq57djnMgs1HKBxX4P8aBI3A==` |

`pnpm@11.25.0` is the package-manager control, not a project dependency. Its registry integrity is
`sha512-XN6SW08HX3Jetx+64YpC/+eEUkeJ8ZthxzHLhyHsKKruFg4BqNWvT+2ypCzb8wDv4j2zVrDUoXtNY+EfirfJVg==`.

The proof deliberately excludes the Nest CLI, ORM, migration framework, validation/transform
packages, authentication provider/SDK, telemetry SDK, cloud SDK, queue, cache, object storage, and
application business libraries. Transitive dependencies are not frozen until the later lockfile
materialization checkpoint.

## Exact database image

| ID | Field | Frozen value |
| --- | --- | --- |
| `TP1-DBIMG-001` | Image | Official `docker.io/library/postgres:18.6-bookworm` |
| `TP1-DBIMG-002` | OCI index digest | `sha256:afc7e2d441324c0388fa80c3d24f733b4194a4eb7f47dd8ee2b08eb1a24a647c` |
| `TP1-DBIMG-003` | Required platform | `linux/arm64/v8` |
| `TP1-DBIMG-004` | arm64 manifest observed | `sha256:67ba68a22dc7d5af3627b7e0f33d10bbefad07562ff9703b3a6c2de247649129` |
| `TP1-DBIMG-005` | Image source revision | `docker-library/postgres` revision `e00e1bd34ec5c8a8e7ad89b273b3d42efaf6d5bc` |
| `TP1-DBIMG-006` | Persistence | Ephemeral proof-only named volume; always removed at cleanup |
| `TP1-DBIMG-007` | Host binding | `127.0.0.1:55432` to container `5432`; never `0.0.0.0` |

The later materialization checkpoint must verify that the pulled image resolves to the same index
and platform manifest before any database starts. A changed digest expires this contract.

## Exact proof-only paths

No path in this section currently exists.

| ID | Proposed path | Purpose |
| --- | --- | --- |
| `TP1-PATHSPEC-001` | `proofs/tp-01-tenant-boundary/README.md` | Scope, authority, commands, non-production warning |
| `TP1-PATHSPEC-002` | `proofs/tp-01-tenant-boundary/package.json` | Exact direct versions and scripts only |
| `TP1-PATHSPEC-003` | `proofs/tp-01-tenant-boundary/pnpm-lock.yaml` | Reviewed transitive dependency freeze |
| `TP1-PATHSPEC-004` | `proofs/tp-01-tenant-boundary/tsconfig.json` | Strict NodeNext/ESM proof compiler configuration |
| `TP1-PATHSPEC-005` | `proofs/tp-01-tenant-boundary/compose.yaml` | Digest-pinned ephemeral PostgreSQL only |
| `TP1-PATHSPEC-006` | `proofs/tp-01-tenant-boundary/sql/` | Proof-only roles, schema, RLS, seed, and reset scripts |
| `TP1-PATHSPEC-007` | `proofs/tp-01-tenant-boundary/src/` | Context, authorization, repository, background, support, audit, and path adapters |
| `TP1-PATHSPEC-008` | `proofs/tp-01-tenant-boundary/test/` | Generator, oracle, 222-case manifest, negative/adversarial tests |
| `TP1-PATHSPEC-009` | `proofs/tp-01-tenant-boundary/scripts/` | Preflight, materialize, run, verify, and cleanup scripts |
| `TP1-PATHSPEC-010` | `proofs/tp-01-tenant-boundary/generated/` | Ignored local run outputs; never raw accepted evidence |
| `TP1-PATHSPEC-011` | `internal-local/work-packages/TP-01/evidence/<run-id>/` | Private immutable run evidence and reviews |

WP-18 authorizes none of these creations. Future authorization must add only this proof root and
private evidence root to the frozen inventory; existing application/document files remain outside
the execution boundary except for separately authorized status/evidence updates.

## Proof-only runtime and database model

### Runtime contexts

| ID | Required context fact |
| --- | --- |
| `TP1-CTX-001` | Opaque synthetic actor identity resolved by a test-only server adapter, never a real identity token |
| `TP1-CTX-002` | Active organization resolved from server-owned synthetic memberships, not accepted from hostname/header alone |
| `TP1-CTX-003` | Authority source: membership, platform-directory role, support grant, or machine identity |
| `TP1-CTX-004` | Action, resource type/id/organization, scope, purpose, request/job correlation, and proof case ID |
| `TP1-CTX-005` | Membership/grant lifecycle and revision used to detect removed, expired, revoked, stale, or conflicting authority |

### Minimal proof schema meanings

| ID | Proof-only record | Isolation purpose |
| --- | --- | --- |
| `TP1-SCHEMA-001` | Platform organization directory | Prove directory authority cannot read tenant operational rows |
| `TP1-SCHEMA-002` | Synthetic subjects, memberships, platform roles, and support grants | Resolve authority source and lifecycle |
| `TP1-SCHEMA-003` | Generic tenant resources representing customer/site/equipment/job/visit/worker/inventory | Exercise ordinary query/mutation/reference paths without selecting product tables |
| `TP1-SCHEMA-004` | Evidence metadata and owning resource reference | Exercise evidence authorization without binary media |
| `TP1-SCHEMA-005` | Search/cache/report/export projection rows and export artifacts metadata | Exercise derived/hydrated/download paths |
| `TP1-SCHEMA-006` | Background jobs and attempts | Exercise machine identity, payload tenant, retry, and replay |
| `TP1-SCHEMA-007` | Security/audit events | Prove attribution and minimized content |

Names and columns created later are disposable proof mechanics, not the product domain schema.

### Enforcement modes

| ID | Mode | Required behavior |
| --- | --- | --- |
| `TP1-MODE-001` | Application context enforcement | Guard/context/repository boundary rejects invalid authority and always supplies authoritative organization context |
| `TP1-MODE-002` | PostgreSQL forced RLS | Non-owner, non-superuser, non-`BYPASSRLS` runtime role; `ENABLE` and `FORCE ROW LEVEL SECURITY`; transaction-local organization/authority context |
| `TP1-MODE-003` | Combined defense in depth | Application and database controls active; pool checkout/transaction reset prevents context leakage |
| `TP1-MODE-004` | Controlled negative fault | One layer is deliberately bypassed only in dedicated proof cases to show the other layer's protection/limitation; never represented as an allowed production mode |

The bootstrap/schema owner credential must never be used by the HTTP or background runtime. Runtime
connections use a distinct least-privilege role. Every case begins a transaction, sets verified
proof context transaction-locally, performs one bounded operation, and rolls back or verifies the
expected mutation before deterministic reset.

## Frozen 222-case matrix

The executable manifest must contain exactly 222 stable case IDs before the primary run.

| ID | Case group | Derivation | Count |
| --- | --- | --- | ---: |
| `TP1-CASE-001` | Allowed ordinary tenant paths | 3 active organizations × 8 path families | 24 |
| `TP1-CASE-002` | Ordered cross-tenant attempts | 6 ordered source/target organization pairs × 8 path families | 48 |
| `TP1-CASE-003` | Context faults | 8 fault variants × 8 path families | 64 |
| `TP1-CASE-004` | Support grants | 8 grant variants × 4 support-relevant path families | 32 |
| `TP1-CASE-005` | Platform directory boundary | 6 platform/tenant discovery and forbidden-data cases | 6 |
| `TP1-CASE-006` | Machine/background authority | 8 tenant/purpose/replay/retry cases | 8 |
| `TP1-CASE-007` | Removed/suspended authority | 2 actor/organization lifecycle variants × 8 path families | 16 |
| `TP1-CASE-008` | Pool reuse and concurrent context | 3 ordered tenant sequences × 8 path families | 24 |
|  | Total |  | 222 |

### Eight path families

The matrix uses the accepted `TP1-PATH-001` through `008`: interactive command/query,
data-access/repository, background/queued operation, search/cache/report/export, evidence metadata,
platform directory, support session, and audit/log/error.

### Eight context-fault variants

| ID | Fault variant |
| --- | --- |
| `TP1-FAULT-001` | Missing active organization |
| `TP1-FAULT-002` | Malformed organization/resource identifier |
| `TP1-FAULT-003` | Client organization conflicts with server membership context |
| `TP1-FAULT-004` | Removed or stale membership revision |
| `TP1-FAULT-005` | Host/subdomain claims a different organization |
| `TP1-FAULT-006` | Cached/local context from a prior organization |
| `TP1-FAULT-007` | Resource reference belongs to another organization |
| `TP1-FAULT-008` | Missing/unverified authority source or purpose |

### Eight support-grant variants

| ID | Variant | Expected result |
| --- | --- | --- |
| `TP1-SUPPORT-001` | Active correct-tenant read scope | Allowed only for declared read action/resource |
| `TP1-SUPPORT-002` | No grant | Denied |
| `TP1-SUPPORT-003` | Expired grant | Denied |
| `TP1-SUPPORT-004` | Revoked grant | Denied |
| `TP1-SUPPORT-005` | Wrong organization | Denied |
| `TP1-SUPPORT-006` | Write attempted with read-only grant | Denied |
| `TP1-SUPPORT-007` | Resource outside grant scope | Denied |
| `TP1-SUPPORT-008` | Grant identifier/client claim without server record | Denied |

All cases must record expected/actual decision, HTTP/job result, returned synthetic identifiers,
mutation before/after hash, audit reference, database role/context, enforcement mode, duration, and
cleanup/reset result. No primary-run case may be skipped. A generator or manifest change creates a
new contract revision before re-run.

## Exact local resource and network envelope

| ID | Resource | Maximum/constraint |
| --- | --- | --- |
| `TP1-LIMIT-001` | Provider spend/accounts | USD 0; none |
| `TP1-LIMIT-002` | PostgreSQL container | 1 CPU, 1 GiB memory, 256 PIDs |
| `TP1-LIMIT-003` | Proof database/storage | 1 database, 2 GiB maximum ephemeral volume |
| `TP1-LIMIT-004` | Application processes | One HTTP process and one bounded background-worker process; no daemon after run |
| `TP1-LIMIT-005` | Ports | `127.0.0.1:43101` HTTP and `127.0.0.1:55432` PostgreSQL only |
| `TP1-LIMIT-006` | Primary run | Four hours elapsed maximum; abort on limit or uncontrolled retry |
| `TP1-LIMIT-007` | Materialization network | Later authorization may allow npm registry and Docker registry metadata/artifact retrieval only |
| `TP1-LIMIT-008` | Proof-run network | No internet/provider access; loopback and isolated local Docker bridge only |
| `TP1-LIMIT-009` | Data | Deterministic synthetic fixture only; no customer/live/production-derived data |
| `TP1-LIMIT-010` | Concurrency | Bounded generated pool-reuse/concurrency cases only; not a load/performance proof |

## Materialized command contract

WP-19 materialized the command scripts. Only lock/dependency materialization, supply-chain
collection, manifest verification, hashing, and TypeScript static checking were authorized and
performed for checkpoint 1. Image, database, preflight, proof, reproduction, evidence-verification,
and cleanup commands remain unauthorized to run.

| ID | Stage | Exact command interface | Required result |
| --- | --- | --- | --- |
| `TP1-CMD-001` | Preflight | `pnpm run preflight` | Verify repository revision, host/architecture, Node/pnpm/Docker/Compose versions, ports, clean proof path, ignored evidence path, zero active proof resources |
| `TP1-CMD-002` | Lock materialization | `pnpm install --lockfile-only --ignore-scripts` | Create lockfile only in authorized materialization phase; no lifecycle scripts |
| `TP1-CMD-003` | Supply-chain inventory | `pnpm run evidence:supply-chain` | Direct/transitive versions, integrity, licenses, advisories, and lock hash for review |
| `TP1-CMD-004` | Dependency materialization | `pnpm install --frozen-lockfile --ignore-scripts` | Install exactly reviewed lockfile only after checkpoint approval |
| `TP1-CMD-005` | Image verification | `pnpm run db:verify-image` | Resolve/pull only accepted digest/platform and record manifest evidence |
| `TP1-CMD-006` | Database start | `docker compose up -d --wait postgres` | One healthy bounded digest-pinned local container |
| `TP1-CMD-007` | Schema/fixture | `pnpm run db:reset` | Recreate proof roles/schema/policies/seed and emit deterministic fixture hash |
| `TP1-CMD-008` | Matrix freeze check | `pnpm run matrix:verify` | Exactly 222 unique cases and expected outcomes match the accepted contract/hash |
| `TP1-CMD-009` | Primary run | `pnpm run proof:run` | Execute all cases once and emit raw machine-readable evidence |
| `TP1-CMD-010` | Reproduction | `pnpm run proof:reproduce` | Independent validator repeats from reset using same revision/lock/image/case manifest |
| `TP1-CMD-011` | Evidence verification | `pnpm run evidence:verify` | Hashes, completeness, zero skipped cases, secret/privacy scan, before/after state, and outcome summary |
| `TP1-CMD-012` | Cleanup | `pnpm run cleanup` | Stop/remove processes, container, network, volume, generated secrets/temp files; record residual check |

The future scripts must avoid shell expansion of secrets, write raw evidence only to the ignored
private path, and stop on the first contract/environment violation. A command change after
materialization requires a reviewed revision before the primary run.

## Private evidence contract

| ID | Required private artifact |
| --- | --- |
| `TP1-EVID-001` | `authorization.json`: accepted package/revision, exact scope, roles, limits, and timestamps |
| `TP1-EVID-002` | `environment.json`: host/tool/image versions and digests, repository revision, clean/dirty state |
| `TP1-EVID-003` | `supply-chain.json`: direct/transitive packages, integrity, licenses, advisories, lock hash |
| `TP1-EVID-004` | `fixture.json`: generator/seed, synthetic record counts, fixture hash, absence-of-live-data attestation |
| `TP1-EVID-005` | `case-manifest.json`: exactly 222 cases, oracles, path/policy traces, manifest hash |
| `TP1-EVID-006` | `primary-results.jsonl`: one immutable result per case plus process/database evidence references |
| `TP1-EVID-007` | `reproduction-results.jsonl`: independent run and difference report |
| `TP1-EVID-008` | `audit-events.jsonl` and sanitized logs/errors: attribution and leakage review inputs |
| `TP1-EVID-009` | `state-integrity.json`: before/after per-tenant counts/hashes and unauthorized-mutation checks |
| `TP1-EVID-010` | `cleanup.json`: resources/files/processes/ports/volumes/credentials before and after cleanup |
| `TP1-EVID-011` | `operator-review.md`, `independent-validation.md`, and `security-review.md` |
| `TP1-EVID-012` | `sanitized-conclusion.md`: measurement, failures, limitations, residual risks, expiry, decision effect |

Raw evidence is never committed. The sanitized conclusion is not public until separately reviewed
and authorized for publication.

## Roles and unresolved assignments

| Role | Required assignment | Current state | Execution consequence |
| --- | --- | --- | --- |
| Proof owner | Aung Myo Oo | Identified | May own authorization/stop/cleanup; cannot independently validate own operated run |
| Proof operator | Named person or explicitly authorized primary agent | `UNASSIGNED` | Blocking |
| Independent validator | Different person or separately authorized independent agent that did not author/operate primary run | `UNASSIGNED` | Blocking |
| TP-01 technical security reviewer | Independent security-review subagent with tenant-isolation/authorization review scope | `/root/tp01_security_review` assigned by `DEC-147` | May review local synthetic TP-01 evidence only; must not operate, reproduce, or mutate the proof |
| Production/real-data security reviewer | Named qualified human reviewer | Deferred | Mandatory before production deployment or any real/customer data; not a TP-01 execution blocker under `TP1-GOV-EX-001` |
| Owner decision | Aung Myo Oo | Identified | Occurs only after reviewed evidence; not proof execution |

WP-18 does not silently appoint an agent or claim unavailable specialist capacity. `OPEN-097`
therefore remains open for named execution assignments.

## Two-checkpoint future authorization

| ID | Checkpoint | May occur only after explicit later authorization | Exit condition |
| --- | --- | --- | --- |
| `TP1-CHK-001` | Materialization | Create only the frozen proof path; resolve direct/transitive dependencies; generate lockfile, source/schema/tests/scripts, case manifest, and hashes; inspect licenses/advisories; do not run TP-01 | Independent inventory review accepts exact artifacts or returns revisions |
| `TP1-CHK-002` | Execution | Reverify the accepted lock/dependency tree, obtain the verified image, start the bounded local environment, and run primary/reproduction/evidence/cleanup commands | Reviewed pass/fail/inconclusive package; no architecture decision implied |

Authorization for checkpoint 1 does not authorize checkpoint 2. WP-19 created the lockfile,
transitive dependency graph, executable case hash, and proof artifact hashes and obtained the
authorized independent inventory review. The owner accepted and published those artifacts in
verified WP-19; that checkpoint still grants no execution authority.

## Cleanup and recovery contract

| ID | Required cleanup verification |
| --- | --- |
| `TP1-CLEAN-001` | Stop HTTP/background processes and prove no listener remains on `43101`. |
| `TP1-CLEAN-002` | `docker compose down --volumes --remove-orphans`; prove no TP-01 container/network/volume remains and `55432` is closed. |
| `TP1-CLEAN-003` | Delete generated local database credentials, environment files, temporary outputs, caches specifically created for TP-01, and unaccepted materialization residue. |
| `TP1-CLEAN-004` | Preserve only the authorized proof source/lock and private evidence required by the package; record hashes and retention status. |
| `TP1-CLEAN-005` | Confirm no account, provider resource, recurring charge, background daemon, altered global package/tool version, or customer/live data exists. |
| `TP1-CLEAN-006` | If cleanup cannot be verified, classify the package Failed/Aborted and stop before any further proof. |

## Authorization-readiness ledger

| ID | Requirement | State | Blocker/action |
| --- | --- | --- | --- |
| `TP1-READY-001` | Accepted governance and proof-only policy | Ready | WP-17 accepted |
| `TP1-READY-002` | Exact direct runtime/package versions and integrity | Accepted for checkpoint 1 | Accepted in WP-18 and materialized exactly in WP-19 |
| `TP1-READY-003` | Exact database image/digest/platform | Contract ready; execution recheck required | Image pull/verification remains closed until checkpoint 2 |
| `TP1-READY-004` | Exact proof/evidence paths and non-scope | Accepted for checkpoint 1 | Materialized only in accepted disposable/private paths |
| `TP1-READY-005` | Exact context/schema/enforcement-mode contract | Accepted for checkpoint 1 | Materialized as disposable proof mechanics; not executed |
| `TP1-READY-006` | Exact 222-case matrix and oracle rules | Accepted for checkpoint 1 | 222-case manifest frozen and hashed |
| `TP1-READY-007` | Exact command/resource/network/cleanup contract | Accepted checkpoint-1 inventory; execution gap found | Security review found that full evidence-packet verification is not implemented |
| `TP1-READY-008` | Generated lockfile/transitive/license/advisory inventory | Accepted for checkpoint 1 | Lock, tree, licenses, audit, and hashes recorded |
| `TP1-READY-009` | Proof source/schema/scripts/case-manifest hashes | Published checkpoint baseline | Exact 50-file inventory is bound to verified commit `01bc6d58fb2c8d1c255e79ebf031faaf53fbb304` |
| `TP1-READY-010` | Named proof operator | Accepted role class | `TP1-OPERATOR-PRIMARY`; exact execution-turn task identity must be recorded before preflight |
| `TP1-READY-011` | Named independent validator | Accepted role class; identity pending | Fresh `TP1-VALIDATOR-REPRO` canonical identity must be recorded and differ from operator |
| `TP1-READY-012` | Independent TP-01 technical security reviewer | Assigned and scope-confirmed | `/root/tp01_security_review`; read-only, no-author, no-operator, no-validator attestation recorded |
| `TP1-READY-013` | Explicit materialization authorization | Complete | Owner authorized WP-19 checkpoint 1; no execution authority |
| `TP1-READY-014` | Explicit execution authorization | Not ready | WP-20A is accepted for publication; WP-21 remediation and a later new exact authorization remain required |
| `TP1-READY-015` | Complete measured security evidence packet | Not ready | Actual DB role is not measured; verifier omits authorization/environment/image/fixture/state/cleanup/reviewer checks; dedicated environment/fixture/state files are missing |

## Risks and stop conditions

| ID | Risk | Mandatory control/stop |
| --- | --- | --- |
| `TP1-CONTRACT-RISK-001` | Exact direct versions hide mutable transitives | Lockfile materialization and review before install/run |
| `TP1-CONTRACT-RISK-002` | New package/image release makes evidence stale | Exact integrity/digest; expire on any proposed change |
| `TP1-CONTRACT-RISK-003` | Database owner bypasses RLS | Separate bootstrap and runtime roles; `FORCE RLS`; runtime role assertions |
| `TP1-CONTRACT-RISK-004` | Connection-pool tenant context leaks | Transaction-local context plus 24 dedicated reuse/concurrency cases |
| `TP1-CONTRACT-RISK-005` | Test-only token/tenant headers appear secure | Server-owned synthetic identity mapping; client/host tenant is untrusted input |
| `TP1-CONTRACT-RISK-006` | 222 cases provide false completeness | Independent adversarial gap review; TP-01 conclusion limited to declared paths |
| `TP1-CONTRACT-RISK-007` | Local proof is generalized to cloud/managed identity | Explicit provider/identity exclusion and later proof requirements |
| `TP1-CONTRACT-RISK-008` | Proof code becomes application foundation | Disposable path and later implementation reauthorization under `DEC-133` |
| `TP1-CONTRACT-RISK-009` | Automated technical review is treated as production security acceptance | Label TP-01 review as automated/limited; require qualified human review before production or real/customer data |
| `TP1-CONTRACT-RISK-010` | Container/dependency operation starts without authority | Two checkpoints and explicit authorization per checkpoint |
| `TP1-CONTRACT-RISK-011` | Literal expected role is mistaken for measured database identity | Query and retain actual role/attributes/ownership/grants/RLS evidence before any security conclusion |
| `TP1-CONTRACT-RISK-012` | Partial verifier PASS is treated as complete evidence acceptance | Require one verifier/report to bind and validate the full `TP1-EVID-001` through `012` packet |

Stop immediately if a version/digest/path/case/oracle differs, network leaves the allowed boundary,
live/customer data appears, an unauthorized process/resource is required, a reviewer role is
missing, a test path decides product policy, evidence cannot be retained safely, or cleanup cannot
be verified.

## Dated source register

All external sources were read on 2026-10-07. Registry/package/image facts must be refreshed at a
later authorization checkpoint; a changed value requires owner review.

| ID | Official source | Evidence used |
| --- | --- | --- |
| `TP1-SRC-001` | [Node.js releases](https://nodejs.org/en/about/previous-releases) | Node 22 LTS lifecycle and supported-release guidance |
| `TP1-SRC-002` | [Node.js 22 archive](https://nodejs.org/en/download/archive/v22) | Exact `22.23.1` release existence and signed-release archive |
| `TP1-SRC-003` | [NestJS migration guide](https://docs.nestjs.com/migration-guide) | NestJS 12 Node runtime and TypeScript 6 migration requirements |
| `TP1-SRC-004` | [NestJS core package](https://www.npmjs.com/package/@nestjs/core) | Exact framework version, peers, license, and registry integrity evidence |
| `TP1-SRC-005` | [TypeScript package](https://www.npmjs.com/package/typescript) | Exact compiler version/license/integrity evidence |
| `TP1-SRC-006` | [node-postgres package](https://www.npmjs.com/package/pg) | Exact client version, engine, license, and integrity evidence |
| `TP1-SRC-007` | [PostgreSQL versioning policy](https://www.postgresql.org/support/versioning/) | PostgreSQL 18.6 support and current-minor guidance |
| `TP1-SRC-008` | [Docker Official Image for PostgreSQL](https://hub.docker.com/_/postgres) | Official image identity and supported architecture source |
| `TP1-SRC-009` | [Docker PostgreSQL image source](https://github.com/docker-library/postgres) | Image build-source provenance |
| `TP1-SRC-010` | [pnpm package](https://www.npmjs.com/package/pnpm) | Exact package-manager engine, license, and integrity evidence |

## Readiness verdict and next gate

WP-18 is accepted and published as the exact contract. WP-19 checkpoint 1 is
`VERIFIED_AND_CLOSED`; TP-01 execution remains `NOT_READY` and `NOT_AUTHORIZED`.

The disposable proof artifacts, lockfile, transitive/license/advisory inventory, case-manifest
hash, and independent checkpoint-1 inventory validation now exist. Execution remains blocked
because the operator and checkpoint-2 independent validator are not yet accepted, the qualified
security reviewer is unassigned, and no explicit checkpoint-2 execution authorization exists.

The exact checkpoint evidence and proposed owner dispositions are recorded in
`22_TP01_MATERIALIZATION_SUPPLY_CHAIN_REVIEW.md`. The role proposals, exact revision/hash binding,
and checkpoint-2 authorization-readiness decision are recorded separately in
`23_TP01_EXECUTION_ROLES_CHECKPOINT2_AUTHORIZATION.md`.

## WP-18 acceptance criteria

WP-18 is ready for owner decision when:

- every `TP1-AUTH-*` input has an exact proposal or an explicit blocking state;
- runtime/package/image versions and integrity are dated and source-qualified;
- proof-only paths, schema meanings, context, enforcement modes, 222 cases, commands, resources,
  evidence, and cleanup are bounded and reproducible;
- direct versions are not misrepresented as a reviewed transitive lockfile;
- operator, independent validator, security reviewer, materialization, and execution gates remain
  visible and closed;
- every technology choice is explicitly TP-01-only and not a final application selection; and
- no proof artifact, dependency, image, container, database, process, account, cost,
  infrastructure, application code, deployment, data access, or external mutation occurs.

## Acceptance record

The owner accepted all WP-18 recommendations and dispositions exactly as recorded on 2026-10-07
and authorized publication. `TP1-DEC-001` through `TP1-DEC-010` and `DEC-136` through `DEC-142`
are accepted as TP-01-only contract baselines. The exact direct versions, image digest, paths,
context/schema meanings, enforcement modes, 222 cases, limits, commands, evidence, checkpoints,
cleanup, and readiness ledger are accepted for controlled materialization planning. TP-01 remains
not ready to execute. Acceptance does not install dependencies, create proof artifacts, pull/start
the database image, authorize either checkpoint, select application architecture/dependencies,
create infrastructure, deploy, or permit customer/live data.
