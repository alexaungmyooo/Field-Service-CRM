# TP-01 Controlled Reachability Execution Result

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted, published, and closed — Inconclusive; no retry |
| Work package | `WP-41 Controlled TP-01 Reachability Execution` |
| Run ID | `wp41-2026-10-07-01` |
| Governing decision | `DEC-171` |
| Governance publication | `3a5a404cac934af8b4d0397a3da9c09bab3c5068` |
| Execution revision | `ce851445a485883fb6f3ec5572508fb0902a4656` |
| Proof tree | `ad27a2c754b2f7352b3beff314a8e3349758e17a` |
| Result publication | `1901f32e157f0fb70af0570dbd739f41dd18a49a` |
| Owner | Aung Myo Oo |
| Date | 2026-10-07 |
| Final disposition | `INCONCLUSIVE — REACHABILITY COMMAND REJECTED BY FROZEN LAUNCHER; NO RETRY` |

## Authorized boundary

WP-41 authorized one local synthetic attempt using a dedicated exact-revision checkout, primary
operator `/root`, fresh reproduction validator `/root/wp40_reproduction_validator`, technical
security reviewer `/root/tp01_security_review`, exact offline dependencies, a new run-bound private
authorization, local-first image verification, conditional exact-digest registry retrieval only if
the image was absent, the recorded sequence, the exact three-view reachability gate before each
database reset, and mandatory cleanup.

npm and all non-registry internet access, application coding, final architecture selection,
infrastructure, deployment, provider accounts/cost, and customer/live data remained closed. The
effective private authorization SHA-256 was
`4872419771d5760d8289c24d537bbb4d754105aed5e211401049f9da394da1bd`.

## Preparation, image decision, and preflight

| Control | Result |
| --- | --- |
| Dedicated checkout revision/tree | Exact match |
| Fresh reproduction validator | Accepted identity; remained separate and did not reproduce |
| Offline dependency restoration | 115 reused, 0 downloaded, lifecycle scripts disabled |
| Package/lock/manifest | Exact accepted hashes |
| Node / pnpm / Docker / Compose | Exact accepted versions; Compose normalized and raw value `5.4.0` |
| Initial ports/resources/processes | Absent |
| Preflight | PASS |
| Accepted image local presence | Present at exact digest and `linux/arm64/v8` |
| Pull token | Not created |
| Registry or other internet access | None |
| Image verification evidence | PASS; source `LOCAL_CACHE` |

The local-first gate operated as intended. Because the accepted digest was already present, no
conditional pull authority was needed or exercised.

## Blocking reachability-launcher deviation

The bounded PostgreSQL service started and reported healthy. The next required command was:

`$TP01_NODE_BIN scripts/exact-pnpm.mjs run runtime:verify-reachability`

The frozen launcher rejected this command before pnpm or the reachability script started because
`runtime:verify-reachability` is absent from its `allowedRunScripts` set. The mandatory Docker
inspect, Compose publisher, and direct TCP agreement was therefore not recorded in accepted
run-bound evidence.

Cleanup's independent pre-teardown observation later found `127.0.0.1:55432` open. That observation
indicates the corrected source produced a listener during this run, but it is cleanup context—not
the mandatory three-view reachability evidence—and cannot be promoted to a proof result.

| ID | Severity | Deviation | Effect |
| --- | --- | --- | --- |
| `WP41-DEV-001` | Blocking | The exact launcher rejected the authorized `run runtime:verify-reachability` command shape. | Reachability evidence was absent; database reset, primary proof, sealed handoff, and reproduction were prohibited. |

The operator stopped without retry or bypass. No database reset, synthetic fixture, primary case,
primary result, sealed handoff, or reproduction occurred.

## Cleanup, residual verification, and reviews

Mandatory cleanup passed after the stopped command. Direct residual verification found no proof
container, network, volume, process, listener, restored dependency tree, generated output, or
proof-path change. The private runtime credential was removed before final verification and
verified absent. The clean dedicated checkout was then archived after the private evidence packet
was preserved in the main checkout.

| Role | Canonical identity | Recommendation |
| --- | --- | --- |
| Primary operator | `/root` | `INCONCLUSIVE` |
| Fresh reproduction validator | `/root/wp40_reproduction_validator` | `INCONCLUSIVE`; reproduction correctly skipped |
| Technical security reviewer | `/root/tp01_security_review` | `INCONCLUSIVE`; initial credential-removal concern resolved |

The reproduction and security reviewers initially found the private runtime credential pending
removal. After the operator removed it and verified absence, both reviewers confirmed that finding
resolved, found no new issue, and retained `INCONCLUSIVE` because no reachability or proof evidence
exists.

The direct-Node final verifier exited nonzero on missing mandatory
`runtime-reachability.json`. It correctly refused the incomplete packet and no bypass or verifier
retry occurred.

## Private evidence and security meaning

The sealed packet contains 18 inventoried entries plus `evidence-inventory.json`. Every entry byte
count and SHA-256 was reproduced, the bounded credential scan passed, and `runtime.env` is absent.

- Evidence inventory SHA-256:
  `cb376017a50bb7fc3abb52973732d2571d63cdd12a01d557102c27e9081cd75d`
- Inventory aggregate SHA-256:
  `cc8b6599ecd96ccf11e44d5f56f23d8c121b4cf0dc3e3036c66d6dc625e68fd8`

WP-41 establishes exact offline preparation, local-cache image verification without network
access, service startup, fail-closed launcher behavior, credential removal, and successful cleanup
only. It establishes neither tenant-boundary success nor failure and supports no conclusion for
runtime publisher agreement, no-egress behavior, unauthorized reads or mutations, row-level
enforcement, application context enforcement, audit safety, support/machine authority,
concurrency, controlled faults, reproduction, or architecture selection.

The effective authorization was consumed and expired at the stop. WP-41 is non-retryable.

## Proposed remediation controls

| ID | Control | Status |
| --- | --- | --- |
| `WP41-REM-001` | Preserve WP-41 and its 18-entry packet as immutable Inconclusive evidence; never retry or reinterpret it as a tenant-boundary or reachability result. | Accepted |
| `WP41-REM-002` | Add exactly `runtime:verify-reachability` to the frozen launcher's approved run-script set without widening any other command shape. | Accepted |
| `WP41-REM-003` | Add dependency-free tests proving the exact reachability command is allowed, variants remain rejected, missing dependencies still fail closed, and dependency metadata cannot be materialized or changed by run commands. | Accepted |
| `WP41-REM-004` | Reconcile the documented controlled sequence, package scripts, launcher allowlist, and final-verifier evidence requirements as one statically checked command contract. | Accepted |
| `WP41-REM-005` | Renew every affected proof and inventory hash after correction and obtain exactly one fresh independent static validator. | Accepted |
| `WP41-REM-006` | Treat the cleanup-time open listener only as diagnostic context; require a later separately authorized run to produce the complete three-view evidence. | Accepted |
| `WP41-REM-007` | Keep execution, dependencies, Docker/Compose runtime, proof/reproduction, application, architecture, infrastructure, deployment, provider, and customer/live-data gates closed during remediation. | Accepted |

## Recommended owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP41-DEC-001` | Accept the WP-41 Inconclusive disposition and `WP41-DEV-001` exactly as recorded. | Accepted |
| `WP41-DEC-002` | Accept the three Inconclusive role reviews, correctly skipped reproduction, and fail-closed final-verifier result. | Accepted |
| `WP41-DEC-003` | Accept mandatory cleanup, direct residual verification, credential removal, and worktree archival as passed. | Accepted |
| `WP41-DEC-004` | Close WP-41 without retry and accept that it establishes no tenant-boundary, reachability, security, no-egress, or architecture result. | Accepted |
| `WP41-DEC-005` | Accept `WP41-REM-001` through `007` as the next bounded remediation proposal. | Accepted |
| `WP41-DEC-006` | After verified WP-41 publication, activate WP-42 for proof-only exact-launcher/reachability-command contract remediation, renewed hashes, and one fresh independent static validator. | Accepted |
| `WP41-DEC-007` | Keep dependencies, preflight, images, Docker/Compose runtime, containers, databases, services, cleanup execution, proof/reproduction, application coding, final architecture selection, infrastructure, deployment, provider accounts/cost, and customer/live data closed during WP-42. | Accepted |

## Frozen WP-41 public inventory

Owner review and any later publication authorization apply only to these four paths:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/43_TP01_EXECUTION_IDENTITY_REACHABILITY_AUTHORIZATION_READINESS.md`
4. `docs/44_TP01_CONTROLLED_REACHABILITY_EXECUTION_RESULT.md`

Private authorization, credentials, command evidence, reviews, diagnostics, and inventories remain
ignored under `internal-local/` and must not be published.

## Owner acceptance and publication

The owner accepted the complete WP-41 Inconclusive disposition, `WP41-DEV-001`, all three role
reviews, mandatory cleanup and residual verification, credential removal, fail-closed final
verification, the 18-entry private inventory, `WP41-REM-001` through `007`, and `WP41-DEC-001`
through `007`. WP-41 was closed without retry.

The frozen four-path inventory was committed and published at
`1901f32e157f0fb70af0570dbd739f41dd18a49a`; local `HEAD`, cached `origin/main`, and live remote
main matched that revision. WP-42 then activated within its separately bounded proof-only static
remediation authority.

## Next gate

WP-41 is verified, published, and closed. Its effective authorization remains consumed and
expired, and there is no retry authority. Any later execution requires a separately accepted and
published remediated binding, fresh execution readiness, and a new explicit execution gate.
