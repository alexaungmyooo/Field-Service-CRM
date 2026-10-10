# Architecture Proof-Wave Priority and Authorization Sequence

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — verified and closed |
| Work package | `WP-103 Architecture Proof-Wave Priority and Authorization Sequence` |
| Owner | Aung Myo Oo |
| Governing sequence | `DEC-233`, `WP98-SEQ-005` through `WP98-SEQ-007` — Accepted planning |
| Governing policy baselines | `DEC-234` through `DEC-237` — Accepted |
| Published WP-102 revision | `f02196a02f4b3e4ba71a8608c330cecc7f310eb9` |
| Repository tree | `c689b548023bada8a6fca452153a331830669fa0` |
| Accepted TP-01 proof tree | `1e9f75fdc1b221009bc691f54d24ca63f02c8038` |
| Governing decision | `DEC-238` — Accepted |
| Proof preparation/materialization/execution | Not authorized |
| Provider account/cost/network/infrastructure | Not authorized |
| Architecture selection/application coding/deployment | Not authorized |
| Date | 2026-10-10 |

## Objective and authority boundary

WP-103 turns the twelve previously specified proofs and seven planning waves into the smallest
credible remaining sequence. It reuses the accepted TP-01 result, combines compatible local field
proofs, delays provider spending until portable candidates survive local gates, keeps optional
white-label work conditional, and separates every proof's contract, execution, result acceptance,
and architecture disposition.

This package decides priority and authorization order only. It does not create a proof harness,
dependency manifest, device session, fixture, provider account, credential, environment, network
request, resource, cost, evidence, measurement, architecture decision, or application code.

## Governing evidence and constraints

- WP-96/97 accepted TP-01 as bounded synthetic evidence for `PROOF-SPEC-001`; it is not rerun or
  broadened by this package.
- WP-99 through WP-102 now supply the authorization, field, data, integration, operations, proof-
  entry, cost, network, and reviewer policy that earlier proof plans lacked.
- `NAMED-SET-001` DigitalOcean Singapore and `NAMED-SET-002` Google Cloud Singapore remain the two
  advancing comparable provider sets. `NAMED-SET-003` AWS Singapore remains comparative only.
- Named technologies and providers remain candidates, not selected architecture or accepted
  application dependencies.
- `PSP-CTRL-001` through `012`, `PROOF-ENTRY-001` through `006`, `PROVIDER-PROOF-BASE-001` through
  `014`, and `REVIEW-BASE-001` through `008` apply to every later proof authorization.

## Accepted-evidence reuse controls

| ID | Proposed policy |
| --- | --- |
| `PROOF-REUSE-001` | Preserve WP-96 TP-01 as `DECISION_INPUT_ACCEPTED` only for the exact tenant-context/RLS/authorization paths, fixture, versions, and proof tree it executed. |
| `PROOF-REUSE-002` | Do not rerun TP-01 merely to produce newer timestamps or combine it with a different hypothesis. A material architecture/control change requires a separately justified replacement proof. |
| `PROOF-REUSE-003` | Reuse the TP-01 negative corpus, evidence schema, cleanup/finalization lessons, and immutable result as inputs; do not copy its runtime authority or private credentials. |
| `PROOF-REUSE-004` | Managed-identity, offline, media, physical-device, performance, provider, recovery, network, cost, exit, telemetry, and release claims remain outside TP-01 evidence. |
| `PROOF-REUSE-005` | Carry forward accepted proof governance templates, typed stop/finalization controls, static contract checks, and private/public evidence separation unless a new risk requires a documented change. |
| `PROOF-REUSE-006` | A prior proof's dependency, account, checkout, credential, authorization, token, resource, or operator identity is never reusable authority. |
| `PROOF-REUSE-007` | A later proof may cite accepted policy and prior measured evidence but must identify exact untested assumptions and changed candidate surfaces. |
| `PROOF-REUSE-008` | Architecture packets distinguish inherited accepted evidence, new measurements, unverified assumptions, reviewer findings, and owner decisions. |

## Proof-specification disposition

| ID | Existing proof | WP-103 disposition | Remaining use |
| --- | --- | --- | --- |
| `PROOF-DISP-001` | `PROOF-SPEC-001` tenant context/authorization | Bounded executed component satisfied by TP-01; do not rerun wholesale | Reuse negative cases in identity, offline, media, scale, export, support, and provider waves; architecture packet still needs policy/ADR synthesis |
| `PROOF-DISP-002` | `PROOF-SPEC-002` offline queue/conflict/revocation | Mandatory; combine into Wave A | Compare advancing Drift/SQLite and comparative sqflite only where the exact contract preserves fair evidence |
| `PROOF-DISP-003` | `PROOF-SPEC-003` private/resumable evidence and MMQR receipt | Split mandatory | Local capture/queue/interruption/replacement in Wave A; hosted object policy/access/recovery/cost in Wave D |
| `PROOF-DISP-004` | `PROOF-SPEC-004` Myanmar/English/accessibility/device usability | Mandatory; combine into Wave A | Physical supported-floor and typical Android devices plus web critical-task corpus |
| `PROOF-DISP-005` | `PROOF-SPEC-005` domains/branded artifacts | Conditional Wave E | Defer until initial-release custom-domain/branded distribution has a real owner/demand; preserve server-authoritative routing design meanwhile |
| `PROOF-DISP-006` | `PROOF-SPEC-006` performance/fairness/freshness | Mandatory Wave C | Prove portable server/API/PostgreSQL boundary locally before hosted comparison; provider confirmation follows in Wave D |
| `PROOF-DISP-007` | `PROOF-SPEC-007` backup/restore | Mandatory Wave D | Execute separately against every provider set that may reach final selection |
| `PROOF-DISP-008` | `PROOF-SPEC-008` Singapore–Myanmar connectivity | Mandatory Wave D | Same endpoint/artifact and WP-102 network thresholds for both advancing provider sets |
| `PROOF-DISP-009` | `PROOF-SPEC-009` cost/operations | Mandatory Wave D | One normalized cost worksheet per retained provider plus measured proof bill/cleanup residuals |
| `PROOF-DISP-010` | `PROOF-SPEC-010` exit/export | Mandatory Wave D | Export identity/data/evidence/configuration/audit state and verify counts/hashes/usability/deletion limits |
| `PROOF-DISP-011` | `PROOF-SPEC-011` managed identity | Mandatory Wave B | Compare advancing Google Cloud Identity Platform with Cognito only if comparative value survives exact account/cost/reviewer gate |
| `PROOF-DISP-012` | `PROOF-SPEC-012` telemetry/release | Split | Minimum redaction/provenance/rollback/alert evidence in Wave D; branded/store matrix remains conditional Wave E |

## Reduced proof-wave sequence

| Priority ID | Wave | Objective | Proof coverage | Execution position |
| --- | --- | --- | --- | --- |
| `PROOF-WAVE-PRIORITY-001` | Wave A — Field Client and Offline | Falsify the riskiest provider-neutral field assumptions on real devices before cloud spending | `PROOF-SPEC-002`, local portion of `003`, `004` | First mandatory wave |
| `PROOF-WAVE-PRIORITY-002` | Wave B — Managed Identity and Authorization | Prove external identity failure/recovery/session behavior while product tenant/permission authority remains server-owned | `PROOF-SPEC-011` plus applicable reused `001` cases | Second; may be planned alongside Wave C but separately authorized |
| `PROOF-WAVE-PRIORITY-003` | Wave C — Portable Core, Data and Scale | Prove the portable server/API/PostgreSQL boundary, tenant fairness, inventory invariants, derived freshness, and initial/growth performance locally | `PROOF-SPEC-006` plus policy-derived inventory/reporting cases | Third; complete before provider load comparison |
| `PROOF-WAVE-PRIORITY-004` | Wave D — Comparative Provider Fitness | Compare the two advancing Singapore provider sets using the same frozen artifact, fixture, workload, evidence schema, and normalized costs | hosted `003`, provider confirmation for `006`, `007` through `010`, minimum `012` | Fourth and final mandatory measured wave before ADR synthesis |
| `PROOF-WAVE-PRIORITY-005` | Wave E — Optional Branded Delivery | Prove custom domains, branded artifacts/store/signing, extended telemetry, and release behavior only when feature ownership and demand justify it | `PROOF-SPEC-005`, remaining `012` | Conditional; not a blocker for initial shared-product architecture selection when explicitly deferred |

### Wave A — Field Client and Offline

| Field | Required decision before any later execution authorization |
| --- | --- |
| Candidate boundary | Exact Flutter/Dart/Android versions; advancing Drift/SQLite and fair comparative sqflite scope; local encryption/key approach under evaluation; synthetic server/evidence endpoint only |
| Physical matrix | Exact supported-floor and typical Android models/builds; low-storage, camera denial, background restriction, process death, reboot, clock skew, and weak/severe/recovery network profiles |
| Required corpus | 48-hour/20-assignment/200-operation/100-media working set; crew participation; changed scope; material use; receipt photo; conflicts; revocation; migration/corruption/recovery; Myanmar/English/accessibility tasks |
| Mandatory reviewers | Owner/domain/locale, fresh independent reproducer, separately accepted technical security review, qualified accessibility review before public conformance claim |
| Pass boundary | Meets `QBD-003` through `006` and WP-100 policy with no silent loss, unauthorized acceptance, false completion/paid/evidence state, unrecoverable queue, or cross-tenant content |
| Stop boundary | No exact physical device, local-store/key candidate, independent role, dependency integrity, or safe cleanup means no execution |

### Wave B — Managed Identity and Authorization

| Field | Required decision before any later execution authorization |
| --- | --- |
| Candidate boundary | Exact advancing managed-identity configuration; comparative Cognito only if it can be evaluated within the same authority/recovery/export/cost contract |
| Required corpus | Product organization mapping, membership revocation, tenant switching, session expiry, step-up, recovery, support elevation, provider outage, duplicate identity, export/exit, wrong-environment and cross-tenant negative cases |
| Mandatory reviewers | Fresh independent reproducer, separately accepted independent technical security reviewer, privacy review for identity/export claims |
| Pass boundary | Product remains authoritative for organization/membership/permission; every provider failure/recovery path fails safely; pricing/export/exit limitations are explicit |
| Stop boundary | No exact account/configuration, recovery policy, data/export contract, cost ceiling, or reviewer authority means no provider identity action |

### Wave C — Portable Core, Data and Scale

| Field | Required decision before any later execution authorization |
| --- | --- |
| Candidate boundary | Exact Node LTS/NestJS/OpenAPI/PostgreSQL candidate versions and portable local execution topology; no hosted provider comparison yet |
| Required workload | `QTB-009` initial horizon, declared scaled/growth method, `QTB-010` large-tenant case, interactive/reporting/offline-sync/media-metadata/inventory/integration queues, noisy-neighbor and rebuild/reconciliation cases |
| Mandatory reviewers | Fresh independent reproducer plus data/architecture/operations review; security review for tenant/fairness paths reusing TP-01 controls |
| Pass boundary | Meets `QBD-001/002/009/010/011`, preserves tenant enforcement and WP-101 invariants, exposes saturation/headroom/queue/freshness limits, and produces a portable artifact for Wave D |
| Stop boundary | No representative generator, accepted scaling method, exact versions, deterministic reset, workload cost ceiling, or invariant oracle means no benchmark |

### Wave D — Comparative Provider Fitness

| Field | Required decision before any later execution authorization |
| --- | --- |
| Candidates | `NAMED-SET-001` DigitalOcean Singapore and `NAMED-SET-002` Google Cloud Singapore. AWS `NAMED-SET-003` runs only if both advancing sets fail a mandatory gate or an owner-accepted enterprise question justifies comparison. |
| Fairness | Same portable artifact/revision, synthetic fixtures, load/network profiles, evidence schema, observation window, cost lines, result definitions, and cleanup verification except documented provider-required differences |
| Mandatory cases | Private media/evidence, provider load confirmation, backup/restore, Myanmar connectivity, cost, exit/export/deletion, minimum telemetry/redaction/alert, release/rollback, provider outage, quota, and residual billing |
| Account/cost | Separate exact execution authorization per provider; default WP-102 USD 25/seven-day proof ceiling applies unless owner revises; aggregate ceiling remains USD 100/month |
| Mandatory reviewers | Fresh independent reproducer; recovery/operations, security, privacy/data-exit, owner/finance, and Myanmar network review according to the exact provider proof |
| Pass boundary | Every mandatory gate produces comparable reviewed evidence; one provider cannot pass through undocumented convenience, omitted cost, unverified cleanup, or different workload |
| Stop boundary | Missing qualified review, legal/privacy production approval, account/billing custody, budget alerts, cleanup/deletion, or exact endpoint prevents only the affected execution/production claim; no silent substitute provider |

### Wave E — Conditional branded delivery

Wave E remains deferred unless the owner records a real initial-release requirement for custom
domains, tenant-branded Technician/Customer artifacts, store/signing ownership, or an extended
release/telemetry matrix. Deferral preserves shared subdomains, shared Technician application,
responsive customer web, Admin Portal, and Management Dashboard. It does not remove the accepted
future white-label capability.

## Proof blockers and readiness classifications

| ID | Blocker | Affected wave | Required closure |
| --- | --- | --- | --- |
| `PROOF-BLOCKER-001` | Exact proof candidate versions/configurations not frozen | A–D | Later exact contract with authoritative version/integrity evidence |
| `PROOF-BLOCKER-002` | Physical Android devices/builds and accessibility reviewer not named | A | Exact inventory plus accepted reviewer authority |
| `PROOF-BLOCKER-003` | Local encryption/key/corruption-recovery candidate not selected for evaluation | A | Exact candidate comparison contract; selection remains later |
| `PROOF-BLOCKER-004` | Managed identity accounts/configuration/export/recovery terms not frozen | B | Exact no-customer-data account and proof contract |
| `PROOF-BLOCKER-005` | Portable core workload generator/reset/invariant oracle not materialized | C | Separately authorized proof-only materialization and static validation |
| `PROOF-BLOCKER-006` | Provider accounts, billing owner evidence, alerts, credentials, and cleanup paths do not exist | D | Separate provider-specific authorization after Wave C artifact freeze |
| `PROOF-BLOCKER-007` | Qualified privacy/legal cross-border reviewer not named | D production-residency claim | Review may remain a final production gate, but no legal/residency approval may be claimed |
| `PROOF-BLOCKER-008` | Qualified security/accessibility/accounting specialists are not automatically assigned | A–D where specified | Name/qualify the required human or obtain an explicit bounded owner exception where repository governance permits |
| `PROOF-BLOCKER-009` | White-label/store/domain ownership and customer demand absent | E | Keep deferred until owner accepts feature ownership and commercial need |
| `PROOF-BLOCKER-010` | Application coding remains closed | All | Proof-only disposable artifacts require exact authorization and must not become product implementation by reuse |

Current classification:

- Wave A: `READY_FOR_EXACT_CONTRACT_DECISION`, not ready for materialization or execution.
- Wave B: `POLICY_READY_ACCOUNT_AND_REVIEW_BLOCKED`.
- Wave C: `READY_FOR_EXACT_CONTRACT_DECISION`, not ready for materialization or execution.
- Wave D: `BLOCKED_BY_WAVE_C_ARTIFACT_AND_PROVIDER_AUTHORITY`.
- Wave E: `CONDITIONALLY_DEFERRED`.

## Minimum authorization sequence per measured wave

The sequence reduces repetitive packages while preserving materially different authority gates.

| ID | Required gate |
| --- | --- |
| `PROOF-SEQUENCE-BASE-001` | Owner accepts the wave hypothesis, candidates, priority, non-scope, required reviewers, budget class, and whether the proof is mandatory or conditional. |
| `PROOF-SEQUENCE-BASE-002` | One exact-contract/materialization-readiness package freezes versions, paths, dependencies/integrity, fixtures, workloads, commands, evidence, roles, stop/cleanup, and public inventory. |
| `PROOF-SEQUENCE-BASE-003` | Low-risk proof-only files and dependencies may be materialized in that same package only when the owner explicitly authorizes the exact paths/sources and independent static validation; runtime remains closed. |
| `PROOF-SEQUENCE-BASE-004` | Hosted account/project/resource creation, credentials, network, registry/package retrieval, and cost always require explicit exact authorization; documentation approval never implies them. |
| `PROOF-SEQUENCE-BASE-005` | A separate execution authorization binds one run ID, accepted revision/hashes, roles, effective private authorization, device/account/environment, cost/network limits, sequence, evidence, cleanup, and expiry. |
| `PROOF-SEQUENCE-BASE-006` | Execution stops after the first typed failure, unauthorized deviation, expired/missing binding, cost/network breach, evidence gap, reviewer-independence failure, or unsafe cleanup condition. |
| `PROOF-SEQUENCE-BASE-007` | Mandatory cleanup/residual/cost/credential verification runs under every outcome and cannot depend on successful preflight or proof completion. |
| `PROOF-SEQUENCE-BASE-008` | The stopped or completed run is immutable and non-resumable; remediation changes only the proof contract/artifacts under a new package and regression validation. |
| `PROOF-SEQUENCE-BASE-009` | Result acceptance is a separate owner gate after primary, independent reproduction/validation, required specialist findings, final verifier, and complete evidence inventory. |
| `PROOF-SEQUENCE-BASE-010` | A PASS becomes bounded architecture evidence only through a separately accepted disposition; FAIL/INCONCLUSIVE cannot be rewritten as support for the candidate. |
| `PROOF-SEQUENCE-BASE-011` | Compatible proofs may share a fixture generator or evidence schema, but not one effective authorization, account authority, result, or conclusion unless the exact combined contract defines every hypothesis and stop condition. |
| `PROOF-SEQUENCE-BASE-012` | Parallel planning is allowed; execution order follows the dependency sequence and never exposes one operator/account/device to conflicting simultaneous proof custody. |
| `PROOF-SEQUENCE-BASE-013` | Publication includes only reviewed public contracts/results; private credentials, raw evidence, provider identifiers, device identifiers, and operational receipts remain ignored. |
| `PROOF-SEQUENCE-BASE-014` | No proof artifact or dependency becomes application code through convenience. Reuse requires a later implementation package, supply-chain review, and product-quality validation. |

## Architecture-decision sequence after proofs

| Stage | Required output | Authority effect |
| --- | --- | --- |
| `ADR-STAGE-001` | Per-wave result disposition and updated `ADR-READY-*` ledger | Evidence classification only |
| `ADR-STAGE-002` | Complete ADR packets with alternatives, policy trace, measured evidence, specialist findings, cost, operations, risks, and reversal path | Ready for owner architecture choice, not yet selected |
| `ADR-STAGE-003` | Coherent end-to-end comparison of the retained architecture sets | Recommendation only |
| `ADR-STAGE-004` | Explicit owner final-architecture selection with unresolved production gates | Architecture accepted; coding still closed |
| `ADR-STAGE-005` | Frozen first implementation package with scope, architecture references, acceptance tests, security validation, dependency/materialization, and delivery gates | Only this later gate may open application coding |

## Options considered

| ID | Option | Recommendation | Reason |
| --- | --- | --- | --- |
| `WP103-OPT-001` | Advance four mandatory measured waves plus one conditional white-label wave, reusing TP-01 and delaying provider spending until portable local gates pass. | Advance | Minimizes cost and repetition while preserving every architecture-significant unknown. |
| `WP103-OPT-002` | Execute all twelve proof specifications independently across all three providers. | Reject | Duplicates fixtures/evidence, spends before local falsification, and adds comparison without decision value. |
| `WP103-OPT-003` | Skip proofs and select the documented preferred stack now. | Reject | Offline, identity, scale, recovery, network, cost, and exit remain unmeasured. |
| `WP103-OPT-004` | Begin application coding and treat implementation tests as architecture proofs. | Reject | Mixes disposable evaluation with product commitment and bypasses architecture selection. |

## Risks and controls

| ID | Risk | Required control |
| --- | --- | --- |
| `WP103-RISK-001` | Combined Wave A hides which candidate or hypothesis failed. | Candidate-tagged cases, identical corpus, per-hypothesis results, and independent comparison. |
| `WP103-RISK-002` | Local Wave C performance does not predict provider behavior. | Use it only to reject portable-boundary defects; repeat provider-relevant confirmation in Wave D. |
| `WP103-RISK-003` | Two provider proofs exceed time/cost. | Local gates first, fixed per-provider ceiling, same artifact/evidence, stop after mandatory failure, AWS conditional only. |
| `WP103-RISK-004` | Reviewer absence creates endless planning. | Keep only the affected execution/production claim closed, name exact role by contract, never fabricate qualification. |
| `WP103-RISK-005` | Optional white-label work blocks initial shared product. | Explicit Wave E deferral and architecture compatibility requirement without execution. |
| `WP103-RISK-006` | Proof harness becomes undeclared application foundation. | Disposable path boundary, no production dependencies, later implementation authorization required for any reuse. |

## Accepted owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP103-DEC-001` | Accept `PROOF-REUSE-001` through `008` and preserve WP-96 TP-01 without wholesale rerun. | Accepted |
| `WP103-DEC-002` | Accept `PROOF-DISP-001` through `012` as the disposition of all existing proof specifications. | Accepted |
| `WP103-DEC-003` | Accept `PROOF-WAVE-PRIORITY-001` through `005`, with Waves A–D mandatory and Wave E conditionally deferred. | Accepted |
| `WP103-DEC-004` | Advance Wave A first; permit Wave B/C planning in parallel only through later separately accepted documentation packages. | Accepted |
| `WP103-DEC-005` | Keep DigitalOcean and Google Cloud provider sets advancing for Wave D; keep AWS comparative and execute it only on an accepted trigger. | Accepted |
| `WP103-DEC-006` | Accept `PROOF-BLOCKER-001` through `010` and the recorded readiness classifications without treating any proof as prepared or authorized. | Accepted |
| `WP103-DEC-007` | Accept `PROOF-SEQUENCE-BASE-001` through `014` as the minimum later authorization sequence. | Accepted |
| `WP103-DEC-008` | Advance `WP103-OPT-001`; reject `WP103-OPT-002`, `WP103-OPT-003`, and `WP103-OPT-004`. | Accepted |
| `WP103-DEC-009` | Keep final architecture selection and application coding closed through `ADR-STAGE-004/005`; authorize no proof/provider/cost/network action. | Accepted |
| `WP103-DEC-010` | Freeze the four-path WP-103 public candidate inventory and, after verified publication, activate WP-104 Wave A Exact Contract and Proof-Only Materialization Readiness for documentation and proof planning only. | Accepted |

## Frozen candidate inventory and next gate

The candidate WP-103 public inventory is exactly:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/105_OPERATING_MODEL_PROVIDER_PROOF_ENTRY_SPECIALIST_ASSIGNMENT_BASELINE.md`
4. `docs/106_ARCHITECTURE_PROOF_WAVE_PRIORITY_AUTHORIZATION_SEQUENCE.md`

The owner accepted `DEC-238`, all reuse/specification/wave/blocker/readiness/authorization/ADR-
stage dispositions, and `WP103-DEC-001` through `010`; advanced `WP103-OPT-001`; rejected
`WP103-OPT-002` through `004`; and authorized commit and push only for the exact four paths above.
After verified publication, WP-104 may prepare only the exact Wave A contract,
candidate/version/device/reviewer decision, disposable path inventory, dependency and fixture
plan, evidence schema, stop/cleanup design, and later materialization authorization wording. Proof
materialization, dependency installation, device operation, execution, provider/network/cost,
final architecture selection, application coding, infrastructure, deployment, and customer/live
data remain closed.

## Verified publication and successor activation

The exact four-path WP-103 public inventory was committed and published at
`e9b0e78e54ccec48b8de4b5731431e2e12ea5f8c`, repository tree
`0171012ac9424f70824a3406ba41feba8e84d1c6`. Local `HEAD`, fetched `origin/main`, and live remote
main matched. WP-103 is verified and closed; its publication authority is consumed.

WP-104 is active for Wave A exact-contract and proof-only materialization-readiness documentation
and proof planning only. It does not authorize proof files, dependencies, materialization, device
operation, execution, provider/network/cost, architecture selection, application coding,
infrastructure, deployment, or customer/live data.
