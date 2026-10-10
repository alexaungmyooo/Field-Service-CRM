# Remaining Architecture Evidence and Decision Sequence

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — exact publication authorized |
| Work package | `WP-98 Remaining Architecture Evidence and Decision Sequence` |
| Owner | Aung Myo Oo |
| Governing evidence disposition | `DEC-232`, `TP1-EVID-DISP-001` through `018` — Accepted |
| Published WP-97 revision | `f30fbf552407a0a7b9f91ace32201c44f24d7a00` |
| Repository tree | `b326e9b7355f931e13fcaf8109384b6f5449278d` |
| Proof tree | `1e9f75fdc1b221009bc691f54d24ca63f02c8038` |
| Governing decision | `DEC-233` — Accepted |
| Final architecture selection | Not authorized |
| Proof execution/application coding/deployment | Not authorized |
| Date | 2026-10-10 |

## Objective and authority boundary

WP-98 sequences the remaining owner decisions, evidence baselines, technical proofs, specialist
reviews, and architecture decision packets after TP-01. It identifies dependencies and stop
conditions so the project can advance efficiently without treating one successful proof as a
complete architecture decision.

This package does not choose a final architecture, provider, framework, database, identity
service, dependency, deployment topology, client library, or commercial service. It authorizes no
proof preparation or execution, dependency installation, provider account, spend, infrastructure,
application code, deployment, or customer/live-data use.

## Current evidence position

| Area | Current accepted position | Remaining consequence |
| --- | --- | --- |
| Tenant-boundary proof | `PROOF-SPEC-001` is `DECISION_INPUT_ACCEPTED` for the exact bounded WP-96 conclusion. | The executed-proof component of `ADR-READY-001` is satisfied, but the decision remains `NOT_READY`. |
| Authorization/support | TP-01 supplies partial support, machine, platform, record, and audit-path evidence. | `OPEN-008/013/032` and `TP-CAND-009` remain; `ADR-READY-003` remains `NOT_READY`. |
| Architecture shortlist | `SHORTLIST-001` advanced; `SHORTLIST-002` comparative; `003` deferred; `004` rejected initially. | No profile, named set, provider, or stack is selected. |
| Technology candidates | Named web, mobile, server, database, identity, telemetry, and delivery candidates retain their WP-15 dispositions. | Exact versions and dependencies remain unselected; `OPEN-094/096` remain. |
| Quantitative quality | `QBD-001` through `QBD-015` remain evaluation baselines. | TP-01 did not prove performance, offline, media, availability, recovery, cost, localization, or compatibility targets. |
| Production assurance | Bounded automated technical security review is accepted for TP-01. | Qualified human security and legal/privacy review remain mandatory before production or real/customer data. |

## Accepted sequencing principles

| ID | Proposed principle |
| --- | --- |
| `ARCH-EVID-SEQ-001` | Resolve business/security policy inputs before authorizing a proof whose oracle would otherwise invent those policies. |
| `ARCH-EVID-SEQ-002` | Preserve trust-boundary order: tenancy and authorization, identity/session, data consistency, field/offline/evidence, then provider/operations selection. |
| `ARCH-EVID-SEQ-003` | Use domain-expert proposed defaults for owner review when no external client input exists; record assumptions and reversal triggers rather than leaving every question unanswered. |
| `ARCH-EVID-SEQ-004` | Keep qualified legal/privacy, human security, accounting, accessibility, recovery, and operations review where the accepted classification requires expertise that documentation cannot replace. |
| `ARCH-EVID-SEQ-005` | Authorize one risk-family proof at a time unless fixtures, reviewers, cost, cleanup, and result attribution remain independently verifiable. |
| `ARCH-EVID-SEQ-006` | Reuse accepted proof governance, evidence schemas, private custody, launcher, cleanup, and validation lessons; do not recreate controls unless a new risk requires change. |
| `ARCH-EVID-SEQ-007` | Keep proof planning, materialization, execution authorization, result acceptance, architecture disposition, and implementation authorization as separate gates. |
| `ARCH-EVID-SEQ-008` | Permit one documentation package to resolve a coherent group of related policy inputs when each decision remains individually traceable. |
| `ARCH-EVID-SEQ-009` | Mandatory selection gates outrank familiarity, advertised provider features, low entry price, or aggregate scoring. |
| `ARCH-EVID-SEQ-010` | Do not perform hosted or paid proof work until account ownership, cost ceiling, alerts, credential custody, cleanup, and deletion verification are accepted. |
| `ARCH-EVID-SEQ-011` | Keep synthetic data mandatory for proofs; no architecture evidence package may silently authorize real/customer data. |
| `ARCH-EVID-SEQ-012` | Build an `ADR-PACKET-001` through `008` packet only after its required policy, proof, and specialist-review inputs are complete. |
| `ARCH-EVID-SEQ-013` | A `READY` ADR row means ready for owner decision, not accepted architecture or implementation permission. |
| `ARCH-EVID-SEQ-014` | Final architecture selection waits until every applicable mandatory gate has a reviewed disposition and the retained combination is coherent as a whole. |
| `ARCH-EVID-SEQ-015` | Implementation remains a later frozen package even after final architecture acceptance. |

## Recommended remaining sequence

### Sequence A — authorization, identity, and support policy

| Field | Disposition |
| --- | --- |
| Sequence ID | `WP98-SEQ-001` |
| Priority | First |
| Inputs to resolve | `OPEN-008`, `OPEN-013`, `OPEN-032`, `OPEN-045`, `OPEN-046`, `OPEN-047`, machine/support authority portions of `OPEN-048/050/080` |
| Required output | First role-permission and separation-of-duties matrix; support-session approval/masking/logging/break-glass rules; authentication, step-up, recovery, session, revocation, and machine-identity baselines |
| Decisions advanced | `ADR-READY-001`, `ADR-READY-002`, `ADR-READY-003`; entry basis for `TP-CAND-009` and `PROOF-SPEC-011` |
| Why first | Authorization and revocation semantics affect every field, offline, evidence, support, integration, and operational proof. |
| Execution effect | Documentation only; no identity provider or proof is selected or authorized. |

The recommended immediate successor is `WP-99 Authorization, Identity and Support Policy
Baseline` for domain-expert proposal and owner decision documentation only.

### Sequence B — field, offline, evidence, and client acceptance matrix

| Field | Disposition |
| --- | --- |
| Sequence ID | `WP98-SEQ-002` |
| Priority | Second; may be drafted after Sequence A is stable |
| Inputs to resolve | `OPEN-021`, `OPEN-028`, `OPEN-033`, `OPEN-059` through `OPEN-064`, `OPEN-068`, `OPEN-095`, `OPEN-096`, `OPEN-099` |
| Required output | Offline action/conflict matrix; working-set/device/network matrix; evidence/media requirements and lifecycle; MMQR receipt-photo rules; Myanmar/English/accessibility corpus; exact proof thresholds |
| Decisions advanced | `ADR-READY-005`, `006`, `014`, `015`; entry basis for `PROOF-SPEC-002`, `003`, and `004` |
| Stop condition | No field proof until exact target devices, network profiles, corpus, conflict rules, evidence limits, reviewers, and private evidence controls are accepted. |

### Sequence C — data, inventory, reporting, and integration policy

| Field | Disposition |
| --- | --- |
| Sequence ID | `WP98-SEQ-003` |
| Priority | Third; policy analysis may overlap Sequence B without executing proofs |
| Inputs to resolve | `OPEN-027`, `OPEN-036`, `OPEN-051` through `OPEN-058`, `OPEN-069`, `OPEN-070` |
| Required output | Consistency/atomicity matrix; correction/history/lifecycle rules; inventory invariants; KPI/freshness rules; initial integration authority and reconciliation contracts |
| Decisions advanced | `ADR-READY-004`, `007`, `008`, `009`; inputs for `PROOF-SPEC-006`, `010`, and applicable integration proofs |
| Stop condition | No performance or data-boundary proof may invent authoritative ownership, correction, atomicity, freshness, or integration meaning. |

### Sequence D — operating model, provider-proof entry, and specialist assignments

| Field | Disposition |
| --- | --- |
| Sequence ID | `WP98-SEQ-004` |
| Priority | Before any hosted, paid, recovery, connectivity, or provider-comparison proof |
| Inputs to resolve | `OPEN-071` through `OPEN-082`, `OPEN-092`, `OPEN-093`, `OPEN-097`, `OPEN-098`; refresh dated provider/pricing evidence |
| Required output | Environment and release model; workload/cost envelope; backup/restore and incident targets; provider-account and billing custody; reviewer assignments; legal/privacy hold point; connectivity thresholds |
| Decisions advanced | `ADR-READY-010` through `014`, provider and geography evaluation, `QBD-007/008/011/012/015` evidence |
| Stop condition | Legal/privacy review remains mandatory before production residency; provider proof authority remains separate and cost-bound. |

### Sequence E — controlled proof waves

Every proof below remains unapproved until a later exact package satisfies `PSP-CTRL-001` through
`012`, `PROOF-ENTRY-001` through `006`, and the relevant accepted policy inputs.

| Wave | Proof family | Required predecessors | Primary decisions informed |
| --- | --- | --- | --- |
| `WP98-PROOF-WAVE-001` | Authorization expressiveness and managed identity failure behavior: `TP-CAND-009`, `PROOF-SPEC-011` | Sequence A; named candidate/configuration; security/privacy reviewer | `ADR-READY-002/003`, `SEL-GATE-002` |
| `WP98-PROOF-WAVE-002` | Offline synchronization and field state: `PROOF-SPEC-002` | Sequences A and B; exact device/network/conflict matrix | `ADR-READY-005`, `SEL-GATE-004` |
| `WP98-PROOF-WAVE-003` | Evidence/media and external-MMQR receipt-photo lifecycle: `PROOF-SPEC-003` | Sequences B and C; privacy/security review | `ADR-READY-006`, `SEL-GATE-005` |
| `WP98-PROOF-WAVE-004` | Myanmar field-client usability/localization/accessibility: `PROOF-SPEC-004` | Sequence B; accepted corpus and reviewers | `ADR-READY-014/015`, `QBD-014` |
| `WP98-PROOF-WAVE-005` | Performance, scale, reporting freshness, and tenant fairness: `PROOF-SPEC-006` | Sequence C; frozen workloads and candidate boundary | `ADR-READY-004/008`, `QBD-001/002/009/010` |
| `WP98-PROOF-WAVE-006` | Recovery, Myanmar connectivity, provider cost, and exit: `PROOF-SPEC-007` through `010` | Sequences C and D; authorized accounts/cost; legal hold point | `ADR-READY-012`, `SEL-GATE-008/009/010` |
| `WP98-PROOF-WAVE-007` | Custom domains, branded delivery, telemetry, release, and incident evidence: `PROOF-SPEC-005/012` | Sequences B and D; ownership/release policies | `ADR-READY-010/011/013`, `QBD-012/013` |

Waves may be split into smaller exact executions. A later result may fail or narrow a candidate
without invalidating unrelated accepted evidence. No wave is authorized by WP-98.

### Sequence F — ADR packets and architecture selection

| Sequence ID | Package purpose | Entry condition | Authority |
| --- | --- | --- | --- |
| `WP98-SEQ-005` | Tenant, identity, authorization, and data decision packets | Applicable Sequences A/C and proof/review evidence complete | Owner architecture decision only |
| `WP98-SEQ-006` | Field, evidence, client, domain, and branded-delivery decision packets | Applicable Sequence B and proof/review evidence complete | Owner architecture decision only |
| `WP98-SEQ-007` | Inventory, reporting, integration, audit, deployment, recovery, and localization decision packets | Applicable Sequences C/D and proof/review evidence complete | Owner architecture decision only |
| `WP98-SEQ-008` | Coherent architecture synthesis and named-candidate comparison | Mandatory ADR packets complete; current costs/lifecycle/provider evidence refreshed | Final-selection recommendation only |
| `WP98-SEQ-009` | Final architecture selection | Explicit owner gate after complete synthesis | Selects architecture only; does not authorize implementation |
| `WP98-SEQ-010` | Roadmap and first frozen implementation package | Final architecture accepted and separately authorized | May later authorize only its exact implementation scope |

## ADR readiness roadmap

| ADR rows | Next missing evidence family | Earliest sequence that can advance them |
| --- | --- | --- |
| `ADR-READY-001` | Product-policy reconciliation and complete ADR packet; TP-01 proof component already satisfied | Sequence A, then `WP98-SEQ-005` |
| `ADR-READY-002/003` | Identity/session/support policy, authorization matrix, identity/authorization proof and review | Sequence A, Proof Wave 001, then `WP98-SEQ-005` |
| `ADR-READY-004/007/008/009` | Data/inventory/reporting/integration policy and applicable measured evidence | Sequence C, Proof Waves 005/006 as applicable, then `WP98-SEQ-005/007` |
| `ADR-READY-005/006/014/015` | Field/offline/evidence/client matrix and device/corpus proofs | Sequence B, Proof Waves 002 through 004, then `WP98-SEQ-006/007` |
| `ADR-READY-010/011/013` | Domain/branded ownership, release/telemetry/incident policy and proof | Sequences B/D, Proof Wave 007, then `WP98-SEQ-006/007` |
| `ADR-READY-012` | Recovery/connectivity/cost/exit/legal and operations evidence | Sequences C/D, Proof Wave 006, then `WP98-SEQ-007` |

## Package-efficiency controls

| ID | Proposed control |
| --- | --- |
| `WP98-EFF-001` | Group related policy decisions into one review package instead of opening one work package per question. |
| `WP98-EFF-002` | Carry forward accepted governance, private-evidence, cleanup, verification, and publication templates unless a documented new risk requires amendment. |
| `WP98-EFF-003` | Before execution authorization, run static contract validation that covers launcher, environment, runtime access, evidence, cleanup, finalization, and independent-validator context. |
| `WP98-EFF-004` | Stop after the first typed failure; remediate the root contract once and require a regression test before another separately authorized run. |
| `WP98-EFF-005` | Keep one public decision/result summary per package and raw operational material private; do not duplicate full historical evidence into every successor. |
| `WP98-EFF-006` | Use parallel documentation analysis only where decisions do not depend on one another; preserve serial owner gates for conflicting policy and proof authority. |

These controls reduce repetition but do not combine proof execution with result acceptance,
architecture selection, implementation, or deployment.

## Options considered

| ID | Option | Recommendation | Reason |
| --- | --- | --- | --- |
| `WP98-OPT-001` | Follow the trust-first sequence above, with grouped policy packages and separately authorized proof waves. | Advance | Preserves dependency order, small-team fit, and mandatory gates while reducing avoidable package repetition. |
| `WP98-OPT-002` | Select the Node/NestJS/PostgreSQL/provider stack now because TP-01 passed. | Reject | TP-01 proves only its bounded tenant-boundary hypothesis; most mandatory gates remain unproved. |
| `WP98-OPT-003` | Launch all remaining proofs in parallel. | Reject initially | Policy oracles, reviewers, accounts, cost, and shared fixtures are not ready; broad parallel execution would weaken attribution and operations. |
| `WP98-OPT-004` | Stop architecture evidence work and begin application implementation. | Reject | Final architecture and an implementation package remain unauthorized. |

## Risks and stop conditions

| ID | Risk or stop | Required response |
| --- | --- | --- |
| `WP98-RISK-001` | Policy is invented inside a proof. | Stop and return to the applicable Sequence A, B, C, or D owner-decision package. |
| `WP98-RISK-002` | Familiar named technology receives automatic selection. | Apply the same mandatory gates, alternatives, reversal cost, and evidence threshold. |
| `WP98-RISK-003` | Package consolidation hides distinct decisions. | Preserve stable decision IDs, individual status, traceability, and explicit owner disposition. |
| `WP98-RISK-004` | Parallel work creates inconsistent authorization or fixture assumptions. | Serialize dependent baselines; reconcile shared versions before proof authorization. |
| `WP98-RISK-005` | Proof count grows without changing a decision. | Require every proof to name the exact ADR row, falsifiable hypothesis, and decision consequence. |
| `WP98-RISK-006` | Provider evidence becomes stale. | Refresh price, lifecycle, region, service, legal, and support evidence at selection and implementation gates. |
| `WP98-RISK-007` | Architecture acceptance is treated as coding authority. | Require a separate roadmap and frozen implementation package after selection. |

Stop before any next gate if a missing decision would change tenant isolation, authorization,
data ownership, offline conflict, evidence/payment meaning, retention, provider cost, legal/privacy
handling, or audit semantics.

## Accepted owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP98-DEC-001` | Accept `ARCH-EVID-SEQ-001` through `015` as the remaining-evidence sequencing principles. | Accepted |
| `WP98-DEC-002` | Advance `WP98-OPT-001`; reject `WP98-OPT-002`, `WP98-OPT-003`, and `WP98-OPT-004`. | Accepted |
| `WP98-DEC-003` | Accept `WP98-SEQ-001` through `010` as dependency order, not authorization or a delivery-date commitment. | Accepted |
| `WP98-DEC-004` | Accept Proof Waves 001 through 007 as planning groups only; authorize none for preparation or execution. | Accepted |
| `WP98-DEC-005` | Accept `WP98-EFF-001` through `006` to reduce avoidable repetition while preserving separate risk gates. | Accepted |
| `WP98-DEC-006` | Keep every `ADR-READY-*` row `NOT_READY` until its listed policy, proof, specialist-review, and packet inputs are complete. | Accepted |
| `WP98-DEC-007` | Preserve the qualified-human security and legal/privacy gates before production deployment or real/customer data. | Accepted |
| `WP98-DEC-008` | Preserve final architecture selection and every implementation, infrastructure, deployment, provider/cost, and customer/live-data gate as closed. | Accepted |
| `WP98-DEC-009` | Freeze the four-path WP-98 public candidate inventory below; keep `internal-local/` private and untracked. | Accepted |
| `WP98-DEC-010` | After verified WP-98 publication, activate WP-99 for authorization, identity, and support policy baseline documentation only. | Accepted |

## Frozen candidate inventory and next gate

The candidate WP-98 public inventory is exactly:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/100_TP01_ARCHITECTURE_EVIDENCE_DISPOSITION.md`
4. `docs/101_REMAINING_ARCHITECTURE_EVIDENCE_DECISION_SEQUENCE.md`

The owner accepted `DEC-233`, `ARCH-EVID-SEQ-001` through `015`, `WP98-SEQ-001` through `010`,
Proof Waves 001 through 007 as planning only, `WP98-EFF-001` through `006`, and `WP98-DEC-001`
through `010`; advanced `WP98-OPT-001`; rejected `WP98-OPT-002` through `004`; and authorized
commit and push only for the exact four paths above. After verified publication, WP-99 may begin
authorization, identity, and support-policy baseline documentation and option analysis only. Final
architecture selection, proof preparation/execution, application coding, infrastructure,
deployment, provider accounts/cost, and customer/live data remain closed.

## Verified publication and successor activation

The exact four-path WP-98 inventory was committed and published at
`152c23ef1aed636aa7a7f07e2f86b7403b438cfb`, repository tree
`ae3971f25dd60dfac2f7cedfbb41b0d9ab3c38bd`, with unchanged proof tree
`1e9f75fdc1b221009bc691f54d24ca63f02c8038`. WP-98 is closed and its commit/push authority is
consumed.

The owner activated WP-99 for authorization, identity, and support-policy baseline documentation
and option analysis only. WP-99 may propose the policy inputs described by `WP98-SEQ-001`; it may
not prepare or execute Proof Wave 001 or select an identity/authorization implementation.
