# TP-01 Controlled Recursive-RLS Execution Result

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — Inconclusive; closed without retry; independent public-packet validation PASS |
| Work package | `WP-72 Controlled TP-01 Recursive RLS Execution` |
| Governing decisions | `DEC-201`; `DEC-202`; `DEC-203` |
| Governance publication | `ee7a13e577a460010159d3de58a9bef628ceb1dd` |
| Governance repository tree | `ebd321bfb4569173448c0cb8bcc09edebfd8e0fe` |
| Accepted proof revision | `b89c54023f539a45608b8fc2057faec5db0a0103` |
| Accepted proof repository tree | `3651dcdd91e189a29aad25df83615db3051c54d4` |
| Proof tree | `7542b7459c0296dbbc6cf74636b0efb97201968a` |
| Run ID | `wp72-2026-10-09-01` |
| Owner | Aung Myo Oo |
| Date | 2026-10-09 |
| Outcome | `INCONCLUSIVE_CLOSED_NO_RETRY` |
| Publication | Authorized only for the frozen four-path public inventory |

## Objective and authority boundary

WP-72 authorized exactly one local synthetic attempt of the published acyclic forced-RLS
candidate. It permitted a clean dedicated checkout, one exact offline/frozen/ignore-scripts
dependency restoration, fresh private run material, one effective private authorization,
local-first accepted-image verification, one bounded PostgreSQL runtime, the exact launcher and
three-view reachability gate, database reset and evidence capture, one PRIMARY run, reproduction
only after a complete sealed handoff, three role reviews, fail-closed final verification, and
mandatory cleanup under every outcome.

It did not authorize retry, remediation during execution, dependency-version change, npm or other
internet access, application coding, final architecture selection, infrastructure, deployment,
provider accounts or cost, or customer/live data. The authorization is consumed and cannot be
reused.

## Published binding and preparation result

The WP-71 governance inventory was live-remote verified at
`ee7a13e577a460010159d3de58a9bef628ceb1dd`. The dedicated checkout matched accepted proof revision
`b89c54023f539a45608b8fc2057faec5db0a0103`, accepted proof repository tree
`3651dcdd91e189a29aad25df83615db3051c54d4`, proof tree
`7542b7459c0296dbbc6cf74636b0efb97201968a`, and the accepted 80-file inventory. The later WP-71
governance repository tree is `ebd321bfb4569173448c0cb8bcc09edebfd8e0fe`; the proof bytes remained
bound to the accepted WP-69 revision.

One exact offline/frozen/ignore-scripts restoration reused 115 packages, downloaded zero, ran no
lifecycle scripts, and changed no dependency version. Fresh credentials, canonical database URL,
raw-literal private environment, roles, exact operations, recursive-RLS graph controls, cleanup,
and non-scope were hash-bound in the effective private authorization. Preflight passed. The
accepted PostgreSQL digest for `linux/arm64/v8` was already present locally, so no pull token,
registry request, or other internet access occurred.

## Controlled sequence result

| Stage | Result |
| --- | --- |
| WP-71 publication and live-remote verification | `PASS` |
| Dedicated checkout, revision/tree, and 80-file binding | `PASS` |
| Offline/frozen/ignore-scripts restoration | `PASS`; 115 reused, zero downloaded |
| Fresh run material and effective private authorization | `PASS`; raw values remained private and were later removed |
| Preflight and exact control validation | `PASS` |
| Accepted-image verification | `PASS`; local cache, no pull token or registry access |
| PostgreSQL start and health | `PASS` |
| PRIMARY three-view reachability | `PASS`; exact `127.0.0.1:55432` to `5432/tcp` publication, healthy service, direct TCP open |
| PRIMARY database reset and synthetic fixture | `PASS`; deterministic fixture captured |
| Database-security capture | `PASS`; runtime role non-superuser and `NOBYPASSRLS`, all six protected tables enabled and forced RLS, exact accepted authority-function structure present |
| Frozen 222-case manifest verification | `PASS`; `TP1-C001` through `TP1-C222` present |
| PRIMARY manifest inventory test | `PASS`; one of 223 TAP tests |
| PRIMARY executable proof cases | `STOP`; all 222 returned PostgreSQL `42P18`, `could not determine data type of parameter $12` |
| PRIMARY state-integrity comparison | `UNCHANGED`; equal aggregate and per-organization hashes; unauthorized mutation false |
| Complete PRIMARY packet and sealed handoff | Not created because every executable case stopped before its oracle completed |
| Reproduction | Correctly not authorized or run |
| Mandatory authorization-independent cleanup | `PASS` |
| Private environment, dependency state, and dedicated-checkout removal | `PASS` |
| Independent residual verification | `PASS` |
| Three role reviews | `INCONCLUSIVE_CLOSED_NO_RETRY` recommended |
| Final verifier | `FAIL_CLOSED`; required complete PRIMARY-and-reproduction reachability sequence absent |

## Deviations and findings

| ID | Severity | Finding | Consequence |
| --- | --- | --- | --- |
| `WP72-DEV-001` | Blocking | The manifest inventory test passed, but every executable case `TP1-C001` through `TP1-C222` returned PostgreSQL `42P18`, `could not determine data type of parameter $12`. The retained sanitized stack locates the common failure at the audit insert in `src/audit.ts`, where `$12` is supplied directly to polymorphic `jsonb_build_object` without an explicit type. | No executable case oracle completed; tenant isolation, zero leakage, audit behavior, and combined authorization enforcement remain unmeasured. |
| `WP72-DEV-002` | High | PRIMARY did not produce a complete results/audit packet or sealed handoff, so reproduction had no valid start condition and did not run. | There is no independently reproduced proof result; the run is Inconclusive and non-resumable. |
| `WP72-DEV-003` | Evidence integrity | Final verification rejected the incomplete packet with `RUNTIME_REACHABILITY_PHASE_INCOMPLETE` because the required PRIMARY-and-reproduction sequence was incomplete. | The verifier failed closed as required and no proof result was accepted. |

The formal operational stop is `PRIMARY / PROOF_TEST / CHILD_EXIT_NONZERO`; accepted contract
deviations are empty. The TAP summary is 223 tests, one manifest-inventory pass, and 222 executable-
case failures. Diagnostic output was path-minimized, sanitized, and bounded from 369,756 to 8,192
characters; stderr was empty.

No PostgreSQL `54001` recursive-RLS error was observed during this attempt. Reset, forced-RLS
installation, and database-security capture completed against the revised graph. This is useful
diagnostic progress only: because the audit insert stopped every executable case before its oracle,
it does not establish that recursive authorization behavior, tenant isolation, or zero leakage
passes dynamically.

PRIMARY before/after aggregate SHA-256 remained
`b4dda2b2df9cde6da699be2919744d15e91d051a830a7fcd34fad46515bb7f61`, with matching
per-organization hashes and `unauthorizedMutationDetected=false`. Unchanged tracked state is
integrity evidence for this stopped attempt, not a tenant-boundary result.

## Cleanup, reviews, and evidence custody

Mandatory cleanup removed the PostgreSQL container, proof network and volume, generated output,
and restored dependencies. The private `runtime.env` was retained only for the ordered final-
verifier step and then removed. Residual verification confirmed both proof listeners closed and
all named Docker resources, proof processes, generated output, dependencies, private environment,
and pull token absent. The disposable dedicated checkout was removed. No registry access, provider
account, recurring cost, application mutation, infrastructure, deployment, or customer/live-data
use occurred.

| Role | Canonical identity | Final recommendation |
| --- | --- | --- |
| Primary operator | `/root` | `INCONCLUSIVE_CLOSED_NO_RETRY` |
| Independent reproduction validator | `/root/wp71_reproduction_validator` | Evidence-consistency `PASS`; `INCONCLUSIVE_CLOSED_NO_RETRY`; no reproduction |
| Technical security reviewer | `/root/tp01_security_review` | `INCONCLUSIVE_CLOSED_NO_RETRY`; bounded synthetic review only |

The read-only role-review seal contains 17 entries. Its seal-file SHA-256 is
`64d35104365089edd91c5d3a8fb777cb153609404af403c3ff60af85d997f87e`. Both independent roles
verified the stop meaning and confirmed reproduction must not start. The final private inventory
contains 21 entries:

- aggregate SHA-256: `de8b086d44c105c256b2544090ccaaa59c99f98a85817511bbcac852f78e7a27`;
- inventory-file SHA-256: `f8a8203bc343bb58ac5fb8718988d7cdc90328255a7fe53dc97de6cfabb852d1`.

The packet establishes exact preparation, local accepted-image use without network, passing
reachability/reset/database-security/manifest gates, the uniform audit-insert stop, unchanged
PRIMARY tracked state, correct handoff and reproduction refusal, formal stop accounting, cleanup,
private-material and checkout removal, residual absence, three bounded reviews, and fail-closed
final verification. It establishes no accepted tenant-isolation, zero-leakage, audit, executable-
case, reproduction, architecture, dependency, implementation, production-security, or customer-
data result.

## Remediation controls

| ID | Control | Proposed disposition |
| --- | --- | --- |
| `WP72-REM-001` | Preserve WP-72, its 17-entry seal, three role reviews, and final 21-entry inventory as immutable Inconclusive evidence; never resume, retry, or reinterpret the run as a proof result. | Accept |
| `WP72-REM-002` | Diagnose and correct only the disposable TP-01 audit-detail parameter typing contract at the exact `jsonb_build_object` call reached by all 222 cases. | Accept |
| `WP72-REM-003` | Require an explicit PostgreSQL-compatible type for the audit reason while preserving parameterization, minimized audit content, current allow/deny meanings, and every existing case oracle. | Accept |
| `WP72-REM-004` | Add dependency-free static regression coverage that rejects an untyped polymorphic audit-detail parameter and prevents unreviewed audit-query semantic drift. | Accept |
| `WP72-REM-005` | Preserve the accepted acyclic forced-RLS graph, role/RLS/grant boundaries, launcher, private-environment, image, reachability, reset, evidence-continuity, stop, handoff, cleanup, and no-network controls unless exact static evidence requires a documented change. | Accept |
| `WP72-REM-006` | Renew every affected proof artifact hash and the complete proof inventory, then obtain exactly one fresh independent static validator before any later rebinding or runtime consideration. | Accept |
| `WP72-REM-007` | Keep dependencies, credentials/environments, preflight, images, Docker/Compose runtime, containers, databases, services, cleanup execution, proof/reproduction, application coding, final architecture selection, infrastructure, deployment, provider accounts/cost, network, and customer/live data closed throughout remediation. | Accept |

## Owner dispositions under standing completion authority

| ID | Recommendation | Current state |
| --- | --- | --- |
| `WP72-DEC-001` | Accept `INCONCLUSIVE_CLOSED_NO_RETRY` and `WP72-DEV-001` through `003`. | Accepted |
| `WP72-DEC-002` | Accept preparation, reachability, reset, database-security capture, and manifest verification as passed; accept the one manifest-inventory test as passed and all 222 executable cases as stopped rather than passed. | Accepted |
| `WP72-DEC-003` | Accept that PostgreSQL `54001` was not observed while rejecting any claim that the recursive-RLS remediation, tenant isolation, zero leakage, audit behavior, or combined authorization enforcement passed dynamically. | Accepted |
| `WP72-DEC-004` | Accept that no complete PRIMARY packet or handoff existed and reproduction correctly did not run. | Accepted |
| `WP72-DEC-005` | Accept mandatory cleanup, private-environment and dependency removal, residual verification, and dedicated-checkout removal as passed. | Accepted |
| `WP72-DEC-006` | Accept the three role recommendations, fail-closed final-verifier outcome, 17-entry seal, and final 21-entry private evidence inventory; accept no proof or architecture result. | Accepted |
| `WP72-DEC-007` | After exact public-packet validation and verified publication, activate only bounded proof-only static remediation under `WP72-REM-001` through `007`; keep every runtime, product, architecture, infrastructure, deployment, provider, network, and customer/live-data gate closed. | Accepted |

## Candidate frozen WP-72 public inventory

Publication may include only these four paths after final independent validation and standing-
authority disposition:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/74_TP01_EXECUTION_IDENTITY_RECURSIVE_RLS_AUTHORIZATION_READINESS.md`
4. `docs/75_TP01_CONTROLLED_RECURSIVE_RLS_EXECUTION_RESULT.md`

Private authorization, credentials, evidence, diagnostics, reviews, seals, hashes, inventory, and
controls remain ignored under `internal-local/` and must never be published.

## Validation state and next gate

Root packet validation and fresh independent validator `/root/wp72_final_packet_validator` both
returned `PASS` with no Critical, High, Medium, or Low findings. The independent validator
reproduced all 21 final-inventory entries and aggregate, all 17 sealed review entries, exact
authorization/governance/proof/role bindings, one offline restoration and zero registry use, the
reachability/reset/security evidence, uniform 222-case `42P18` stop, unchanged state, absence of a
handoff or reproduction, three reviews, fail-closed final verification, cleanup and residual
absence, and removal of `runtime.env` and the dedicated checkout. The ignored validation record
has SHA-256 `8cc8c20c22561640dfb6f3fbb7a2280cf01c953f570e127ba562b1b3562841cf`.

Under standing completion authority, WP-72, `WP72-DEV-001` through `003`, `WP72-REM-001` through
`007`, `WP72-DEC-001` through `007`, the three role reviews, cleanup and residual results,
fail-closed final-verifier outcome, 17-entry seal, 21-entry private inventory, and exact frozen
four-path public inventory are accepted. Commit and push are authorized only for that inventory.

If independent validation passes and the exact four-path packet is accepted, committed, pushed,
and live-remote verified, the next gate is bounded proof-only static remediation of the audit JSON
detail parameter typing contract. That package may change only the disposable TP-01 proof,
governing documentation, and private static evidence needed for the explicit type contract,
dependency-free regression tests, complete hash renewal, and exactly one fresh independent static
validator. It must not restore or invoke dependencies, generate credentials or environments, run
preflight, inspect or retrieve images, invoke Docker/Compose, create a database or service, execute
SQL, cleanup, proof, or reproduction, select architecture, implement application code, create
infrastructure, deploy, incur provider cost, use network access, or access customer/live data.

## Verified publication and WP-73 activation

The exact four-path WP-72 inventory was published at
`9abe1c36fd307da136284969f7805067bd92ceda` with repository tree
`fb29597108583f3cb4eea62ae8a82fc0c0d3f63d`. WP-72 is `VERIFIED_AND_CLOSED` as immutable
`INCONCLUSIVE_CLOSED_NO_RETRY` evidence. WP-73 is activated only for the bounded static remediation
described above; it inherits no execution authorization from WP-72.
