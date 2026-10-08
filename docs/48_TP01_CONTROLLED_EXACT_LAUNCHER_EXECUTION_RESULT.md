# TP-01 Controlled Exact Launcher Execution Result

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — Inconclusive, closed without retry; publication authorized |
| Work package | `WP-45 Controlled TP-01 Exact Launcher Execution` |
| Governing decision | `DEC-175` |
| Governance publication | `7c27bb50f1becd4b5c808f30aab7d68c277d2458` |
| Accepted proof revision | `0f2100b869bbb8e466c906b3a0d4213e827ef4cf` |
| Proof tree | `1777020c393fd3a63134eac99d878b66261523eb` |
| Run ID | `wp45-2026-10-08-01` |
| Owner | Aung Myo Oo |
| Date | 2026-10-08 |
| Outcome | `INCONCLUSIVE_CLOSED_NO_RETRY` |
| Publication | Authorized; verification pending |

## Objective and authority boundary

WP-45 authorized exactly one local synthetic attempt of the accepted TP-01 proof. It permitted a
clean detached checkout, exact offline dependency restoration, a new effective private
authorization, local-first image verification, the accepted PostgreSQL container, the exact
launcher, the three-view reachability gate before every reset, one primary run, a later
role-separated reproduction only after a valid sealed primary handoff, fail-closed verification,
and mandatory cleanup.

The package did not authorize retry, proof modification, dependency-version change, npm or general
internet access, application coding, architecture selection, infrastructure, deployment, provider
accounts or cost, or customer/live data. WP-45 publication also remains a separate owner gate.

## Governance and preparation result

The accepted WP-44 four-path inventory was committed as
`7c27bb5 WP-44: accept execution identity readiness` and pushed to `origin/main`. Local `HEAD`,
cached `origin/main`, and live remote main were verified at
`7c27bb50f1becd4b5c808f30aab7d68c277d2458` before WP-45 activation.

The dedicated checkout matched the exact accepted revision and proof tree. All 62 reviewed proof
artifact hashes passed before dependency restoration. The first offline restoration invocation was
blocked by restricted access to pnpm's existing local-store SQLite database and produced no
`node_modules`. The same exact offline/frozen/ignore-scripts command then ran with local-store
filesystem access, reused 115 packages, downloaded zero packages, ran no lifecycle scripts, and
preserved the accepted lockfile and package hashes. This was an execution-environment access
correction before preflight, not a dependency or proof change.

The accepted image digest and `linux/arm64/v8` platform were already local. No pull token was
created and no registry, npm, or other internet access occurred. The effective private
authorization bound WP-45, the run ID, governance publication, proof revision/tree, reviewed
inventory, exact launchers, accepted roles, local-image result, cleanup, and non-scope.

## Controlled sequence result

| Stage | Result |
| --- | --- |
| Clean exact-revision checkout and 62-file binding | `PASS` |
| Offline/frozen/ignore-scripts dependency restoration | `PASS`; 115 reused, zero downloaded |
| Effective private authorization | `PASS`; run-bound and later consumed |
| Preflight | `PASS`; Node 22.23.1, pnpm 11.25.0, Docker 29.7.2, Compose 5.4.0 |
| Local-first image verification | `PASS`; local cache, exact digest/platform, no network |
| PostgreSQL start and health | `PASS` |
| Primary three-view reachability gate | `PASS`; Docker mapping, Compose publisher, and TCP |
| Synthetic database reset and security capture | `PASS` |
| Frozen case manifest | `PASS`; 222 cases at the accepted hash |
| Primary proof | `STOP`; inventory test passed, all 222 executable cases failed `ECONNREFUSED` |
| Primary state-integrity capture | `PASS`; tracked tenant state unchanged |
| Sealed reproduction handoff | Not created; no valid primary result packet |
| Reproduction | Correctly skipped |
| Interim complete-packet verification | Not run; packet was incomplete |
| Mandatory cleanup and residual verification | `PASS` |
| Three role reviews | `INCONCLUSIVE` |
| Direct-Node final verifier | Failed closed on absent `primary-results.jsonl` |

## Blocking deviations and review findings

| ID | Severity | Finding | Consequence |
| --- | --- | --- | --- |
| `WP45-DEV-001` | Blocking | The private run environment omitted `TP01_DATABASE_URL`. The proof's node-postgres pool therefore fell back to its default endpoint instead of the accepted `127.0.0.1:55432` publisher. | All 222 executable primary cases returned `ECONNREFUSED`; no valid primary or reproduction result exists. |
| `WP45-DEV-002` | Medium | `deviations.json` remained the preflight-created empty accepted-deviation list even though the stopped run had a separately recorded operational deviation. | The evidence meanings are recoverable from `stop-condition.json`, but the two deviation classes are not explicitly reconciled. |
| `WP45-DEV-003` | Low | The bounded diagnostic sanitized credentials and worktree paths but retained the absolute exact-Node executable path. | No credential or customer data leaked, but path minimization is incomplete. |

The three-view reachability gate proves that the accepted host publication was observable at that
instant. It does not prove that the proof child received the correct database endpoint. The proof
source accepts an optional `TP01_DATABASE_URL`, while preflight did not require or validate it and
the private credential preparation supplied only the two passwords. That contract gap is the
direct cause of the stop.

## State, cleanup, and role separation

The primary runner captured the same aggregate hash before and after its failed child. Four
synthetic organizations retained the same row counts and per-organization hashes;
`unauthorizedMutationDetected` is false. This is stopped-run integrity evidence, not a tenant-
isolation result.

Mandatory cleanup removed the container, no-masquerade bridge network, tmpfs volume, private
credential file, generated output, and restored dependencies. Direct residual verification found
ports 43101 and 55432 closed and all named Docker resources absent. The clean disposable checkout
was then removed. No provider account, recurring cost, external system, application code, or
customer/live data was involved.

| Role | Canonical identity | Recommendation |
| --- | --- | --- |
| Primary operator | `/root` | `INCONCLUSIVE` |
| Independent reproduction validator | `/root/wp44_reproduction_validator` | `INCONCLUSIVE`; reproduction correctly skipped; all 17 sealed hashes passed |
| Technical security reviewer | `/root/tp01_security_review` | `INCONCLUSIVE`; all 17 sealed hashes passed; two packet-quality findings recorded |

The validator and security reviewer inspected the immutable stopped-run packet read-only. Neither
executed the proof, operated Docker or dependencies, accessed the network, or changed public/proof
files. The security review remains bounded local technical evidence and is not qualified human
production security acceptance.

## Private evidence and result meaning

The final private inventory contains 22 entries plus `evidence-inventory.json`:

- inventory SHA-256:
  `e3d36af32695e4d2c6ff0a9e3272a4422b837f87f33f9f1cdd18f5dd14b3a15f`;
- aggregate SHA-256:
  `2de858c58d472f5c692c44443071f0b43d4d96ed1e0ecb6504f7237fb1f7119d`.

The packet establishes exact preparation, local-cache image verification without network access,
healthy service start, a successful three-view host reachability measurement, deterministic
fixture materialization, unchanged tracked state after the failed child, fail-closed stopping, and
complete cleanup. It establishes neither tenant-boundary success nor tenant-boundary failure and
supports no architecture or implementation selection. The effective authorization is consumed
and expired; the run cannot resume.

## Proposed remediation controls

| ID | Control | Status |
| --- | --- | --- |
| `WP45-REM-001` | Preserve WP-45 and its 22-entry packet as immutable Inconclusive evidence; never retry or reinterpret it as a tenant-boundary result. | Proposed |
| `WP45-REM-002` | Make an exact run-bound `TP01_DATABASE_URL` mandatory, with no node-postgres default or fallback path. | Proposed |
| `WP45-REM-003` | Validate before service use that the parsed URL has `postgresql`, `127.0.0.1`, port `55432`, database `tp01`, user `tp01_runtime`, and the generated runtime credential without retaining the secret in evidence. | Proposed |
| `WP45-REM-004` | Bind preflight, reset/security capture, proof children, reproduction children, and final verification to one shared database-connection contract and record only minimized non-secret metadata. | Proposed |
| `WP45-REM-005` | Add dependency-free tests for absent, malformed, wrong-host, wrong-port, wrong-database, wrong-user, and child-environment propagation cases. | Proposed |
| `WP45-REM-006` | Reconcile accepted business deviations with runtime stop deviations through distinct evidence fields so an empty accepted-deviation list cannot hide an operational stop. | Proposed |
| `WP45-REM-007` | Minimize or explicitly justify the retained launcher executable path while preserving actionable bounded diagnostics. | Proposed |
| `WP45-REM-008` | Renew every affected proof/inventory hash and obtain exactly one fresh independent static validator while all runtime and product gates remain closed. | Proposed |

## Recommended owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP45-DEC-001` | Accept the WP-45 Inconclusive disposition and `WP45-DEV-001` through `003` exactly as recorded. | Accepted |
| `WP45-DEC-002` | Accept the three Inconclusive role reviews, correctly skipped reproduction, and fail-closed final-verifier result. | Accepted |
| `WP45-DEC-003` | Accept mandatory cleanup, residual verification, credential/dependency removal, and disposable-checkout removal as passed. | Accepted |
| `WP45-DEC-004` | Close WP-45 without retry and accept that it establishes no tenant-boundary, security, no-egress, architecture, or implementation result. | Accepted |
| `WP45-DEC-005` | Accept the 22-entry private inventory and `WP45-REM-001` through `008` as the next bounded remediation proposal. | Accepted |
| `WP45-DEC-006` | After verified WP-45 publication, activate WP-46 for proof-only database-connection environment and diagnostic-metadata static remediation, renewed hashes, and one fresh independent static validator. | Accepted |
| `WP45-DEC-007` | Keep dependencies, preflight, images, Docker/Compose runtime, containers, databases, services, cleanup execution, proof/reproduction, application coding, final architecture selection, infrastructure, deployment, provider accounts/cost, and customer/live data closed during WP-46. | Accepted |

## Frozen WP-45 public inventory

Owner review and any later publication authorization apply only to these four paths:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/47_TP01_EXECUTION_IDENTITY_LAUNCHER_AUTHORIZATION_READINESS.md`
4. `docs/48_TP01_CONTROLLED_EXACT_LAUNCHER_EXECUTION_RESULT.md`

Private authorization, credentials, command evidence, diagnostics, reviews, hashes, and inventory
remain ignored under `internal-local/` and must not be published.

## Owner acceptance and publication authorization

The owner accepted the complete WP-45 Inconclusive disposition, all three deviations and role
reviews, mandatory cleanup and residual verification, fail-closed final verification, the
22-entry private inventory, all eight remediation controls, and all seven owner dispositions.
WP-45 is closed without retry. Publication authority is limited to the frozen four paths above.

After verified publication, WP-46 may perform only the accepted proof-only static remediation,
renewed hashing, and one fresh independent static validation. WP-46 runtime, dependency,
application, architecture, infrastructure, deployment, provider, network, and customer/live-data
gates remain closed.

## Next gate

WP-45 is accepted and closed without retry. Commit and push are authorized only for its frozen
four-path public inventory. WP-46 activates only after that publication is remotely verified; its
later publication requires a separate owner acceptance.
