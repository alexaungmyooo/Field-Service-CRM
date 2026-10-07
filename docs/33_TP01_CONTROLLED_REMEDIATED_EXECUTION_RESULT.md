# TP-01 Controlled Remediated Execution Result

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted, published, and closed — Inconclusive; no retry |
| Work package | `WP-30 Controlled TP-01 Remediated Execution` |
| Run ID | `wp30-2026-10-07-01` |
| Governing decision | `DEC-160` |
| Execution revision | `8b4ad940ed2b1266b89cbd04f006873d4fe8b407` |
| Proof tree | `26e1ebf2572b24064fa61963d6db6f656fdc6d09` |
| Owner | Aung Myo Oo |
| Date | 2026-10-07 |
| Final disposition | `INCONCLUSIVE — PRIMARY EXECUTION FAILED; NO RETRY` |

## Authorized boundary

WP-30 authorized one local synthetic attempt with:

- one dedicated checkout at the exact published WP-28 proof revision;
- primary operator `/root`;
- exactly one fresh reproduction validator `/root/wp30_reproduction_validator`;
- technical security reviewer `/root/tp01_security_review`;
- exact offline/frozen/ignore-scripts dependency restoration from the existing local store;
- a new run-bound effective private authorization;
- conditional Docker-registry retrieval only because the exact accepted digest was absent;
- the recorded checkpoint-2 sequence and mandatory cleanup; and
- no npm/other internet, application coding, architecture selection, infrastructure, deployment,
  provider account/cost, or customer/live data.

The effective authorization SHA-256 is
`7f2e89fd9b957694765768057965ca07c155e7213b9d4ac1949d1c2870d525b7`.

## Preparation and preflight

| Control | Result |
| --- | --- |
| Dedicated checkout revision/tree | Exact match |
| Proof path | Clean |
| Fresh reproduction identity | Attested; no action before handoff |
| Dependency restoration | 115 reused, zero downloaded, no lifecycle scripts |
| Package and lockfile | Exact accepted hashes |
| Restored lockfile | Exact accepted hash |
| Preflight | PASS |
| Node / pnpm / Docker | Exact accepted versions |
| Compose | Raw `5.4.0`; normalized exact `5.4.0`; stdout retained |
| Initial ports/resources/processes | Absent |

The accepted PostgreSQL digest was not local. The conditionally authorized digest-only retrieval
completed and verified `linux/arm64/v8`. No npm or other internet access occurred.

## Database and manifest stages

The bounded PostgreSQL container became healthy. Deterministic reset emitted fixture and measured
database-security evidence. The runtime identity was `tp01_runtime`, without superuser or
`BYPASSRLS`; expected ownership, forced RLS, grants, policies, security-definer search paths, and
transaction-local context were observed.

The frozen 222-case manifest verified with SHA-256
`de4e412a27f35bc96a3858174bcf186ae02f84c08a0e94b28771e3db78a2665f`.

These are setup/configuration controls, not behavioral tenant-isolation results.

## Primary execution stop

The one authorized primary proof command compiled the proof and then started the Node test process.
That process exited with status 1 before producing `primary-results.jsonl` or
`primary-audit-events.jsonl`. The wrapper retained stderr but discarded failed-child stdout, so the
exact test or assertion is unavailable without an unauthorized retry.

The primary before/after tracked-state aggregate remained
`b4dda2b2df9cde6da699be2919744d15e91d051a830a7fcd34fad46515bb7f61`, with
`unauthorizedMutationDetected: false`. This does not prove absence of unauthorized reads or audit
leakage.

No sealed primary packet existed. Reproduction was correctly prohibited and did not run.

## Recorded deviations

| ID | Severity | Deviation | Effect |
| --- | --- | --- | --- |
| `WP30-DEV-001` | Blocking | Primary test process exited 1 before primary result/audit JSONL existed. | No behavioral result or sealed handoff; reproduction prohibited |
| `WP30-DEV-002` | High | The command wrapper discarded failed-child stdout. | Exact failing assertion and cause are unavailable without prohibited retry |
| `WP30-DEV-003` | Blocking | Final verifier still hard-codes Compose `v5.4.0` rather than accepted normalized `5.4.0` plus raw evidence. | Final verification rejects the environment binding before completeness evaluation |

## Cleanup and residual state

Mandatory cleanup passed after the primary failure. It removed the container, isolated network,
ephemeral volume, restored dependencies, generated output, and credential file. Both proof ports
were closed and no proof process remained.

A separate read-only residual query confirmed the same zero-resource state. The disposable managed
checkout was then archived. The exact accepted PostgreSQL image remains in the non-running local
Docker cache; the accepted cleanup interface does not remove the verified image. No provider
account or cost exists.

## Role reviews and final verification

| Role | Canonical identity | Recommendation |
| --- | --- | --- |
| Primary operator | `/root` | `INCONCLUSIVE` |
| Fresh reproduction validator | `/root/wp30_reproduction_validator` | `INCONCLUSIVE` |
| Technical security reviewer | `/root/tp01_security_review` | `INCONCLUSIVE` |

The direct-Node final verifier exited nonzero on its stale Compose binding. The packet is
independently incomplete because primary and reproduction result/audit streams, reproduction state,
and state-integrity evidence do not exist. A verifier correction cannot turn this stopped run into
a result.

## Private evidence packet

The retained packet contains 19 inventoried evidence files plus `evidence-inventory.json`. Every
entry byte count and SHA-256 was reproduced. Inventory SHA-256:

`7c47a3ecaa36ceb3be780c565218fabb8b103914c7d8dfd7828457e64225f883`

No password, customer data, production data, or runtime tenant data is retained.

## Security meaning

WP-30 establishes neither tenant-boundary success nor tenant-boundary failure. It establishes only
bounded preparation, measured database configuration, unchanged tracked tenant state after an
unidentified runner failure, fail-closed verification, and successful cleanup.

No conclusion is supported for the 222 behavioral outcomes, unauthorized-read prevention,
cross-tenant mutation denial, audit attribution/leakage, controlled-fault behavior, support or
machine authority, pool reuse/concurrency, or reproduction agreement.

The effective WP-30 authorization expired at the stop. WP-30 is non-retryable.

## Proposed remediation controls

| ID | Control | Status |
| --- | --- | --- |
| `WP30-REM-001` | Preserve WP-30 and its 19-entry packet as immutable Inconclusive evidence; never retry or reinterpret it as a proof result. | Accepted |
| `WP30-REM-002` | Make the proof runner retain bounded, sanitized failed-child stdout and stderr in a dedicated failure artifact before propagating nonzero status. | Accepted |
| `WP30-REM-003` | Ensure diagnostic retention cannot include credentials, customer/live data, or unbounded output and is covered by dependency-free static tests. | Accepted |
| `WP30-REM-004` | Make final-verifier Compose validation consume the same normalization contract as preflight and verify normalized plus raw fields consistently. | Accepted |
| `WP30-REM-005` | Add pure static cases for `5.4.0`, `v5.4.0`, raw stdout framing, malformed/drifted values, and verifier/preflight agreement. | Accepted |
| `WP30-REM-006` | Renew the complete proof inventory and obtain one fresh independent static validator before any new binding or execution decision. | Accepted |

## Recommended owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP30-DEC-001` | Accept the WP-30 Inconclusive disposition and `WP30-DEV-001` through `003` exactly as recorded. | Accepted |
| `WP30-DEC-002` | Accept the three Inconclusive role reviews and fail-closed final-verifier result. | Accepted |
| `WP30-DEC-003` | Accept mandatory cleanup and direct residual verification as passed. | Accepted |
| `WP30-DEC-004` | Close WP-30 without retry and accept that it establishes no tenant-boundary or architecture result. | Accepted |
| `WP30-DEC-005` | Accept `WP30-REM-001` through `006` as the next bounded remediation proposal. | Accepted |
| `WP30-DEC-006` | After verified WP-30 publication, activate WP-31 for proof-only failure-diagnostic and final-verifier static remediation, renewed hashes, and one fresh independent static validator. | Accepted |
| `WP30-DEC-007` | Keep dependencies, preflight, images, containers, databases, services, cleanup execution, proof/reproduction, application coding, final architecture selection, infrastructure, deployment, provider accounts/cost, and customer/live data closed during WP-31. | Accepted |

## Frozen WP-30 public inventory

Owner review and any later publication authorization apply only to these four paths:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/32_TP01_REMEDIATED_REBINDING_REAUTHORIZATION_READINESS.md`
4. `docs/33_TP01_CONTROLLED_REMEDIATED_EXECUTION_RESULT.md`

Private authorization, credentials, command evidence, role reviews, and evidence inventory remain
ignored under `internal-local/` and must not be published.

## Acceptance and publication

On 2026-10-07, the owner accepted the complete Inconclusive stop packet, all deviations, role
reviews, cleanup/residual and fail-closed verifier outcomes, 19-entry private inventory,
`WP30-REM-001` through `006`, and `WP30-DEC-001` through `007`. WP-30 was closed without retry.

The frozen four-path inventory was committed as
`138ff4a WP-30: record controlled remediated execution` and pushed to `origin/main`. Local `HEAD`,
cached `origin/main`, and live remote main matched
`138ff4ae8548d9ee61707a1c714a352e6af9d320`. WP-31 then activated under the accepted static-only
boundary. No later remediation changes the immutable WP-30 evidence or disposition.
