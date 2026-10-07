# TP-01 Controlled Conditional Image Execution Result

## Document control

| Field | Value |
| --- | --- |
| Status | Ready for Owner Review — Inconclusive; no retry |
| Work package | `WP-37 Controlled TP-01 Conditional Image Execution` |
| Run ID | `wp37-2026-10-07-01` |
| Governing decision | `DEC-167` |
| Governance publication | `91b65c4ee5307416792aae2da2182775c054df5a` |
| Execution revision | `7fd5f57a2c121dbaa35995501e019a8609a6b0a3` |
| Proof tree | `a0e146ec6cf5759b08346d8f6ac9bc1dfeee215b` |
| Owner | Aung Myo Oo |
| Date | 2026-10-07 |
| Final disposition | `INCONCLUSIVE — HOST PORT NOT PUBLISHED; NO RETRY` |

## Authorized boundary

WP-37 authorized one local synthetic attempt using a dedicated exact-revision checkout, primary
operator `/root`, fresh reproduction validator `/root/wp36_reproduction_validator`, technical
security reviewer `/root/tp01_security_review`, exact offline dependencies, a new run-bound private
authorization, local-first image verification, conditional exact-digest registry retrieval only if
the image was absent, the recorded controlled sequence, and mandatory cleanup.

npm and all non-registry internet access, application coding, final architecture selection,
infrastructure, deployment, provider accounts/cost, and customer/live data remained closed. The
effective private authorization SHA-256 was
`e234cda310d3c663569031f45c29c1aaadb4b8bb5c8442bf27f2e706e5b4a9d3`.

## Preparation, local image decision, and preflight

| Control | Result |
| --- | --- |
| Dedicated checkout revision/tree | Exact match |
| Fresh reproduction validator | Accepted identity; remained separate and idle before primary handoff |
| Offline dependency restoration | 115 reused, 0 downloaded, lifecycle scripts disabled |
| Package/lock/manifest | Exact accepted hashes |
| Node / pnpm / Docker / Compose | Exact accepted versions; raw and normalized Compose evidence retained |
| Initial ports/resources/processes | Absent |
| Preflight | PASS |
| Accepted image local presence | Present at exact digest and `linux/arm64/v8` |
| Pull token | Not created |
| Registry or other internet access | None |
| Image verification evidence | PASS; source `LOCAL_CACHE` |

The local-first gate operated as intended. Because the accepted digest was already present, no
conditional pull authority was needed or exercised.

## Database preparation and blocking primary failure

Compose created the proof network, tmpfs-backed volume, and PostgreSQL container. The container
reported healthy, accepted internal database connections, and allowed database reset, security
capture, fixture creation, and verification of the frozen 222-case matrix.

The required host endpoint was nevertheless unavailable. Compose publisher evidence reported
target port `5432` with `PublishedPort: 0` and summarized the port as `5432/tcp`; the expected
`127.0.0.1:55432` listener remained closed. The primary runner attempted the frozen matrix, but all
222 executable cases received `ECONNREFUSED 127.0.0.1:55432`. It emitted bounded sanitized failure
diagnostics but no valid primary result packet.

| ID | Severity | Deviation | Effect |
| --- | --- | --- | --- |
| `WP37-DEV-001` | Blocking | The internally healthy database container did not publish the accepted loopback host binding. | Primary measurement was unavailable; sealed handoff and reproduction were prohibited. |

Container-internal health did not establish host reachability. Successful fixture creation and
matrix integrity do not establish any tenant-boundary behavior when the primary runner could not
connect.

## Fail-closed stop, cleanup, and reviews

The operator stopped WP-37 without retry. No sealed primary packet was created. The reproduction
validator correctly did not execute the proof and instead reviewed the stop packet only.

Mandatory cleanup passed. Direct residual verification found no proof container, network, volume,
process, listener, restored dependency tree, generated output, proof environment, or private
runtime credential. The pre-existing accepted image remains only as shared local cache state and
was outside the authorized cleanup-removal scope. The clean dedicated checkout was archived after
revision/tree and generated-state verification.

| Role | Canonical identity | Recommendation |
| --- | --- | --- |
| Primary operator | `/root` | `INCONCLUSIVE` |
| Fresh reproduction validator | `/root/wp36_reproduction_validator` | `INCONCLUSIVE`; reproduction correctly skipped |
| Technical security reviewer | `/root/tp01_security_review` | `INCONCLUSIVE`; one medium diagnostic-minimization finding |

The direct-Node final verifier exited nonzero on blocking unaccepted deviation `WP37-DEV-001`,
correctly refusing the incomplete packet. No bypass or verifier retry occurred.

The technical security reviewer also recorded a medium residual risk: the bounded failure artifact
contained local filesystem/user paths and omitted most child output, although the bounded scan
found no retained runtime credential value. This does not change the blocking disposition, but any
remediation must further minimize local path disclosure while preserving the actionable cause.

## Private evidence and security meaning

The packet contains 22 inventoried evidence files plus `evidence-inventory.json`. Every recorded
entry byte count and SHA-256 was reproduced, the aggregate hash matched, the bounded credential
scan passed, and `runtime.env` was absent before inventory sealing. Inventory aggregate SHA-256:

`551cea0087f02576ed30a68b243752888663a22ed7068f7b08814306b7f67d48`

WP-37 establishes exact offline preparation, local-cache image verification without network
access, database fixture preparation, fail-closed primary behavior, and successful cleanup only.
It establishes neither tenant-boundary success nor failure and supports no conclusion for
unauthorized reads or mutations, row-level enforcement, application context enforcement, audit
safety, support/machine authority, concurrency, controlled faults, reproduction, or architecture
selection.

The effective authorization was consumed and expired at the stop. WP-37 is non-retryable.

## Proposed remediation controls

| ID | Control | Status |
| --- | --- | --- |
| `WP37-REM-001` | Preserve WP-37 and its 22-entry packet as immutable Inconclusive evidence; never retry or reinterpret it as a tenant-boundary result. | Proposed |
| `WP37-REM-002` | Add a post-start, pre-fixture reachability gate that requires the exact loopback endpoint to accept a database connection before any primary measurement. | Proposed |
| `WP37-REM-003` | Verify the effective Docker publisher mapping from runtime inspection and require exact `127.0.0.1:55432 -> 5432/tcp`; reject missing, wildcard, wrong-port, or zero-port publication. | Proposed |
| `WP37-REM-004` | Keep container-internal health and host reachability as separate evidence controls; neither may substitute for the other. | Proposed |
| `WP37-REM-005` | Retain only bounded sanitized publisher and connection diagnostics on failure; redact local user/worktree paths and exclude credentials, raw environment, and unrestricted logs. | Proposed |
| `WP37-REM-006` | Diagnose and correct the disposable proof's publication interface, add dependency-free static contract tests where possible, and require controlled runtime validation only under a later explicit gate. | Proposed |
| `WP37-REM-007` | Renew all affected proof hashes and obtain one fresh independent static validator before any new rebinding or execution decision. | Proposed |

## Recommended owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP37-DEC-001` | Accept the WP-37 Inconclusive disposition and `WP37-DEV-001` exactly as recorded. | Proposed |
| `WP37-DEC-002` | Accept the three Inconclusive role reviews, skipped reproduction, and fail-closed final-verifier result. | Proposed |
| `WP37-DEC-003` | Accept mandatory cleanup, direct residual verification, runtime-credential removal, and worktree archival as passed. | Proposed |
| `WP37-DEC-004` | Close WP-37 without retry and accept that it establishes no tenant-boundary, security, or architecture result. | Proposed |
| `WP37-DEC-005` | Accept `WP37-REM-001` through `007` as the next bounded remediation proposal. | Proposed |
| `WP37-DEC-006` | After verified WP-37 publication, activate WP-38 for proof-only host-port publication and reachability remediation, renewed hashes, and one fresh independent static validator. | Proposed |
| `WP37-DEC-007` | Keep dependencies, preflight, images, Docker/Compose runtime, containers, databases, services, cleanup execution, proof/reproduction, application coding, final architecture selection, infrastructure, deployment, provider accounts/cost, and customer/live data closed during WP-38. | Proposed |

## Frozen WP-37 public inventory

Owner review and any later publication authorization apply only to these four paths:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/39_TP01_EXECUTION_IDENTITY_CONDITIONAL_PULL_AUTHORIZATION_READINESS.md`
4. `docs/40_TP01_CONTROLLED_CONDITIONAL_IMAGE_EXECUTION_RESULT.md`

Private authorization, credentials, command evidence, reviews, diagnostics, and inventories remain
ignored under `internal-local/` and must not be published.

## Next gate

WP-37 stops at owner evidence disposition. No retry, remediation, dependency/runtime action,
proof/reproduction, commit, push, or later package is authorized. If the owner accepts the complete
packet and proposed dispositions, the exact frozen four-path public inventory may be published;
only after verified publication may WP-38 be activated under a new explicit scope.
