# Data, Consistency, Inventory, Reporting and Integration Policy Baseline

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — verified and closed |
| Work package | `WP-101 Data, Consistency, Inventory, Reporting and Integration Policy Baseline` |
| Owner | Aung Myo Oo |
| Governing sequence | `DEC-233`, `WP98-SEQ-003` — Accepted |
| Governing field baseline | `DEC-235` — Accepted |
| Published WP-100 revision | `48bdecc6adfe1c851bdf178e1fd7c10a5527ce88` |
| Repository tree | `c2e9dfa81754d446df62a846670c6c65ad97d1a2` |
| Proof tree | `1e9f75fdc1b221009bc691f54d24ca63f02c8038` |
| Governing decision | `DEC-236` — Accepted |
| Architecture/provider/dependency selection | Not authorized |
| Proof preparation/execution/application coding | Not authorized |
| Date | 2026-10-10 |

## Objective and authority boundary

WP-101 proposes the first testable policy oracle for authoritative data ownership, history and
correction, consistency/atomicity, inventory/custody, management measures, derived-data freshness,
imports/migrations, tenant portability, and external exchanges.

The package is intentionally usable by a small owner-operated air-conditioning company and a
multi-branch enterprise without creating different business truth. It defines which facts must be
trustworthy and how failure is represented. It does not define tables, schemas, services, event
streams, APIs, file formats, providers, accounting software, report tooling, storage products, or
implementation dependencies.

No proof, dependency, database, account, external integration, import, export, infrastructure,
application code, deployment, spending, or customer/live-data action is authorized.

## Governing inputs

- `DEC-063` through `073`, `DATA-OWN-*`, `DATA-REC-*`, `HIST-CTRL-*`, `CONS-CLASS-*`,
  `CONS-BOUND-*`, `CONS-CTRL-*`, `INV-DATA-*`, `DERIVE-CTRL-*`, `XCHG-DATA-*`, and
  `LIFE-DATA-*` define the accepted proposal envelope without selecting physical architecture.
- `BR-INV-*`, `BR-REPORT-*`, `BR-INTEGRATE-*`, `BR-DATA-*`, `BR-AUD-*`, `SR-INV-*`,
  `SR-REPORT-*`, `SR-INTEGRATE-*`, `SR-DATA-*`, and `SR-AUD-*` supply traceable behavior.
- `QBD-002`, `QBD-008` through `011`, and `QBD-015` remain evaluation baselines, not customer SLAs.
- `DEC-234` supplies authority and separation-of-duty policy; `DEC-235` supplies offline,
  evidence, receipt-photo, and field-client policy.
- `OPEN-027`, `OPEN-036`, `OPEN-051` through `058`, `OPEN-069`, and `OPEN-070` are addressed only
  to the extent recorded below.

## Authoritative data ownership baseline

| ID | Proposed policy |
| --- | --- |
| `DATA-BASE-001` | Every tenant operational record has exactly one authoritative organization boundary and one governing business capability. Physical storage or application surface never changes that authority. |
| `DATA-BASE-002` | Cross-capability relationships use explicit tenant-compatible identities and accepted facts. A referencing capability cannot silently correct or duplicate another capability's authoritative meaning. |
| `DATA-BASE-003` | Platform control, tenant operations, customer-provided claims, evidence content, shared reference data, derived data, security/audit evidence, external exchange, offline copies, and recovery copies remain distinct information classes. |
| `DATA-BASE-004` | Stable identity, display value, external identifier, provenance, verification status, business lifecycle, retention state, and copy state are separate meanings. |
| `DATA-BASE-005` | Customer, site, equipment, payer, owner, custodian, approver, and service-authority relationships are explicit and effective-dated where history matters. |
| `DATA-BASE-006` | Customer/equipment matching creates same-tenant review candidates, never automatic merge authority or cross-tenant visibility. Missing, duplicated, unreadable, or changed serial numbers do not erase equipment history. |
| `DATA-BASE-007` | Tenant-performed work remains distinct from customer-reported, document-derived, imported, manufacturer, and other-provider history. Controlled verification may change confidence, not original provenance. |
| `DATA-BASE-008` | Evidence supports a business fact but is not the fact, approval, payment settlement, work completion, or authorization itself. |
| `DATA-BASE-009` | Search, dashboards, reports, caches, exports, and analytics are derived representations subordinate to governed operational records. |
| `DATA-BASE-010` | Audit/security evidence is protected from ordinary business editing and contains references or minimized details rather than unnecessary copies of tenant content. |
| `DATA-BASE-011` | An offline, integration, export, backup, or recovery copy does not become a new source of business authority. |
| `DATA-BASE-012` | Every retryable or externally visible effect has stable tenant/source/purpose identity, provenance, outcome, and reconciliation state. |
| `DATA-BASE-013` | A record's authoritative owner, steward, sensitivity, retention class, and permitted correction path are discoverable without relying on a UI screen or job-title label. |
| `DATA-BASE-014` | A later physical architecture must demonstrate every accepted ownership and lifecycle invariant; it may not redefine them through schema or service boundaries. |

## History and correction baseline

| Operation | Initial policy | Approval/review baseline |
| --- | --- | --- |
| Ordinary mutable update | Retain attributable before/after history when operational, privacy, commercial, or safety meaning changes | Actor must hold current edit authority |
| Amendment | Add a present-time clarification linked to the original; never pretend it existed earlier | Governing capability authority and reason |
| Supersession/version | Create a new immutable governing revision linked to the prior one | Same approval level required for the new decision |
| Reversal | Create an opposite attributable business effect; preserve the original | Permission for the original effect plus explicit reversal permission |
| Correction | Record incorrect fact, corrected treatment, reason, impact, actor, and time | Supervisor for work; Commercial Approver for approved value; Storekeeper plus independent approver for controlled stock; Payment Verifier for verified claim |
| Reopening | Preserve earlier closure and create a controlled active continuation | Supervisor/Manager with reason; revalidate downstream obligations |
| Merge/separation | Preserve source identities, aliases, provenance, conflicts, and affected links | Same-tenant authorized steward plus independent review for customer/equipment history with material impact |
| Evidence replacement/redaction | Preserve prior reference, reason, authority, affected decisions, and permitted retained evidence | Subject-capability authority plus stronger review after approval, verification, or closure |
| Anonymization/deletion | Follow class policy, dependency/hold/copy checks, and retain only permitted action evidence | Privacy/legal authority remains required before production policy |

| ID | Proposed policy |
| --- | --- |
| `HISTORY-BASE-001` | Proposal revisions, customer approvals, work outcomes, stock movements, serialized custody, payment claims/verifications, generated document revisions, audit events, and lifecycle actions are history-preserving records, not ordinary overwrite fields. |
| `HISTORY-BASE-002` | A correction never changes the recorded actor, source, or time of the original fact. It adds the accepted corrected meaning and relationship. |
| `HISTORY-BASE-003` | Backdating is prohibited except as a separately recorded effective-time correction that preserves record time, actor, source, and reason. |
| `HISTORY-BASE-004` | Reopening or correction re-evaluates affected approval, warranty, notification, inventory, evidence, payment, report, export, and integration obligations. |
| `HISTORY-BASE-005` | High-impact corrections require the separation of duty recorded in WP-99; small organizations may use an explicitly logged combined-role exception only where fixed dual control is not required. |
| `HISTORY-BASE-006` | Merge/separation cannot cross organizations and cannot turn uncertain or third-party history into tenant-performed history. |
| `HISTORY-BASE-007` | Evidence replacement after a decision does not silently validate the earlier decision; affected approval/payment/completion meaning enters review where policy requires. |
| `HISTORY-BASE-008` | History visibility applies the viewer's present authorization and purpose; keeping history does not authorize every user to view it. |
| `HISTORY-BASE-009` | Audit evidence supports reconstruction but does not replace domain-specific correction, version, reversal, or reconciliation records. |
| `HISTORY-BASE-010` | Exact retention and legal sufficiency remain subject to qualified accounting/legal/privacy review before production or real/customer data. |

## Consistency and atomicity matrix

The matrix classifies business success semantics. It does not select database transactions,
aggregate boundaries, queues, locks, or event technology.

| Business effect | Required initial class | Success boundary and failure treatment |
| --- | --- | --- |
| Tenant-owned record creation or link | Immediate invariant | Identity, tenant, governing capability, provenance, and referenced tenant compatibility agree or the effect fails |
| Membership/authority change | Immediate invariant | Governing membership/grant and attributable authority change agree; session/cache revocation may follow as visible pending work |
| Proposal revision and approval | Immediate invariant | Exact immutable revision, amounts/terms, approver authority, decision, and time agree or no approval exists |
| Per-equipment/work-item outcome | Immediate invariant per item | Performed facts, participants, required tests/evidence, outcome, and disposition agree; order summary is derived |
| Work-order closure/reopening | Authoritative workflow | Closure commits only when required item dispositions pass; follow-up, warranty, payment, or notification work may remain explicit pending obligations |
| Stock movement | Immediate invariant | Tenant, item/serial, source/destination/custody, quantity, movement type, actor/reason, and work/project link agree or no movement occurs |
| Serialized supply-to-install transition | Immediate invariant | Stock identity/movement and equipment/component relationship agree; ambiguous transition fails to review |
| Evidence finalization | Authoritative workflow | Content and metadata may be prepared separately; evidence becomes available only when tenant, subject, safety/quality, sensitivity, and lifecycle checks agree |
| External-MMQR payment claim/verification | Authoritative workflow plus external reconciliation | Claim, obligation, evidence, and decision remain separate; policy-required receipt must be available before authoritative paid claim/verification |
| Offline synchronization | Offline provisional | Each effect revalidates current authority/state/policy and becomes accepted, duplicate, pending, conflicted, rejected, or quarantined |
| Report/search/dashboard update | Derived projection | Authoritative source commits first; derivation exposes freshness, failed/rebuilding state, and reconciliation |
| Notification/export/external update | Durable external effect | Internal intent commits before retryable delivery; provider outcome remains separate and unknown outcomes reconcile before retry |
| Import/migration record | Migration quarantine | Raw source, mapping, candidate, validation, duplicate/conflict, and per-record decision exist before authoritative acceptance |
| Retention/anonymization/deletion | Authoritative lifecycle plus propagated work | Governing decision commits with exact scope/holds; every controlled copy reaches verified result or visible unresolved custody state |
| Restore/resumption | Recovery verification | Restored state remains isolated/non-authoritative until tenant, lifecycle, stock, evidence, audit, idempotency, and external-effect checks pass |

| ID | Proposed policy |
| --- | --- |
| `CONSIST-BASE-001` | Never report full success while a required immediate invariant is partial, unknown, or failed. |
| `CONSIST-BASE-002` | A source capability may commit while recoverable downstream work is pending only when the user and accountable operator can see the obligation and its failure state. |
| `CONSIST-BASE-003` | Significant updates assert the observed authoritative version/state; conflicting stale intent never silently wins. |
| `CONSIST-BASE-004` | Stable business-effect identity survives retries, workers, restarts, offline sync, callbacks, and reconciliation. |
| `CONSIST-BASE-005` | Repeating an accepted effect returns the prior result or safe known state rather than creating another business effect. |
| `CONSIST-BASE-006` | Technical retry duplication and domain duplicate candidates remain distinct problems with distinct decisions. |
| `CONSIST-BASE-007` | Ordering-sensitive effects validate a governing version/sequence and never depend only on arrival time or device clock. |
| `CONSIST-BASE-008` | Batch and bulk operations preserve per-record results and cannot conceal partial failure or cross-tenant rejection behind one success. |
| `CONSIST-BASE-009` | Unknown external outcomes enter reconciliation before an irreversible effect is retried. |
| `CONSIST-BASE-010` | Compensation is a new attributable action linked to the original and cannot pretend the original real-world effect did not occur. |
| `CONSIST-BASE-011` | Human resolution is required when automatic treatment could corrupt identity, approval, evidence, custody, stock, payment, or audit meaning. |
| `CONSIST-BASE-012` | Cross-boundary pending, conflict, terminal failure, quarantine, compensation, and reconciliation have named owners and ageing visibility. |
| `CONSIST-BASE-013` | Tenant mismatch always fails closed and is never repaired by fallback tenant, global lookup, or payload-selected remapping. |
| `CONSIST-BASE-014` | Proofs must demonstrate both success and interrupted/retried/duplicate/conflict paths at the same declared business boundary. |

## Inventory, costing, and custody baseline

| ID | Proposed policy |
| --- | --- |
| `INVENTORY-BASE-001` | Receipt, reservation, issue, consumption, return, transfer, damage, adjustment, reversal, replacement, and disposal are distinct attributable movement meanings. |
| `INVENTORY-BASE-002` | On-hand, reserved, available, issued, and variance quantities derive from accepted movements and policy; no ordinary direct balance edit exists. |
| `INVENTORY-BASE-003` | Every movement remains inside one organization and identifies item/serial, source/destination or custody, quantity/unit, actor, reason, time, and linked work/project when applicable. |
| `INVENTORY-BASE-004` | Warehouse, branch, vehicle, crew, workshop, supplier, customer, and site custody are explicit; location and custodian are not interchangeable. |
| `INVENTORY-BASE-005` | Reservation constrains availability but does not claim physical issue or consumption. Expiry/release is attributable. |
| `INVENTORY-BASE-006` | Planned, reserved, issued, consumed, returned, customer-supplied, and field-purchased materials remain distinct and link to exact work/equipment when relevant. |
| `INVENTORY-BASE-007` | Serialized items retain identity and custody through receipt, reservation, issue, installation, return, repair, replacement, and disposal. |
| `INVENTORY-BASE-008` | Competing reservation/issue validates current availability and returns shortage/conflict; it never silently produces negative stock. |
| `INVENTORY-BASE-009` | Initial default prohibits negative stock. A tenant exception may record emergency field consumption as pending inventory resolution, never as invented receipt or hidden balance. |
| `INVENTORY-BASE-010` | Physical count compares custody evidence with derived balance and records variance, investigation, approver, adjustment, and unresolved discrepancy. |
| `INVENTORY-BASE-011` | Correction uses linked adjustment/reversal with reason and separation of duty; the original movement remains reconstructable. |
| `INVENTORY-BASE-012` | Initial product costing may record source-qualified purchase/unit cost, work-item material cost, customer-supplied zero-charge context, and estimated commercial margin for internal management. |
| `INVENTORY-BASE-013` | The product does not initially claim general-ledger truth, statutory inventory valuation, tax filing, depreciation, provider settlement, or audited profit. Accounting-ready export remains distinct from accounting authority. |
| `INVENTORY-BASE-014` | FIFO, weighted-average, specific-identification, tax, currency revaluation, and landed-cost policy remain configuration/accounting-review inputs; quantity/custody truth cannot depend on their selection. |
| `INVENTORY-BASE-015` | Service value, cost estimate, margin estimate, external payment claim, verified claim, and provider/bank settlement remain separate measures. |
| `INVENTORY-BASE-016` | Small tenants may omit formal stock locations and costing, but tracked materials still preserve source/classification and cannot weaken cross-tenant or evidence controls. |

## Management measure and reporting baseline

Every measure is tenant-scoped, versioned, time-bounded, filterable by authorized branch, and
drillable only to records the viewer may access.

| ID | Initial measure definition |
| --- | --- |
| `KPI-BASE-001` | Open work backlog: authoritative work orders not in terminal closed/cancelled state, grouped by current stage and age from accepted intake/creation time. |
| `KPI-BASE-002` | Scheduled visits: effective appointment revisions in the selected period, excluding cancelled revisions and counting reschedules once by current appointment identity. |
| `KPI-BASE-003` | On-time arrival: visits with authoritative arrival within the accepted appointment window divided by eligible arrived visits; customer/office reschedule and missing-arrival exclusions are shown. |
| `KPI-BASE-004` | Completion throughput: work items reaching accepted complete outcome in the period, with reopened/corrected items shown separately and no inference from visit departure alone. |
| `KPI-BASE-005` | First-visit resolution candidate: work orders whose first completed visit resolves every then-approved work item with no unresolved disposition and no rework visit within the versioned observation window. Initial evaluation window is seven days. |
| `KPI-BASE-006` | Rework/warranty return: completed work orders linked to a classified rework, complaint, or warranty visit within the versioned reporting window; ordinary planned follow-up is excluded. |
| `KPI-BASE-007` | Response time: request accepted time to first authoritative arrival, separating customer hold, office hold, cancelled, and emergency cases. |
| `KPI-BASE-008` | Evidence completeness: closed/completion-candidate work items satisfying the effective required-evidence policy divided by eligible items; waived requirements remain separately visible. |
| `KPI-BASE-009` | Inventory health: current shortages, reservation conflicts, unresolved negative/pending consumption, count variances, damaged items, and ageing custody exceptions. |
| `KPI-BASE-010` | Crew utilization planning: assigned visit duration divided by declared available scheduled duration; it is a planning measure, not individual productivity or payroll truth. |
| `KPI-BASE-011` | Commercial service value: accepted proposal/work charge amounts for the selected authoritative state; do not label as revenue, cash received, or settlement. |
| `KPI-BASE-012` | External payment evidence: submitted claims, policy-valid paid claims, independently verified claims, discrepancies, and reversals shown separately; none is bank settlement. |

| ID | Proposed policy |
| --- | --- |
| `REPORT-BASE-001` | Each KPI has definition/version, source families, time basis/timezone, currency/unit, inclusion/exclusion, correction/reopen treatment, owner, and effective date. |
| `REPORT-BASE-002` | Operational dashboards target visible freshness within five minutes under the accepted evaluation workload; stale, delayed, failed, and rebuilding states are explicit. |
| `REPORT-BASE-003` | A report/export records its as-of source cutoff, definition version, scope, generation result, and freshness. |
| `REPORT-BASE-004` | Quantitative reconciliation uses exact source control totals/identities where defined; cross-tenant leakage and duplicate business effects have zero tolerance. |
| `REPORT-BASE-005` | Full rebuild under the accepted evaluation volume targets completion within the four-hour recovery objective; exact workloads must be frozen before proof. |
| `REPORT-BASE-006` | Derived state is reproducible from governed sources and versioned rules; it is never the sole retained truth for a business fact. |
| `REPORT-BASE-007` | Report discrepancy correction changes the authoritative source or a versioned derivation rule and preserves attributable impact; users cannot edit a chart total directly. |
| `REPORT-BASE-008` | Cancelled, reopened, corrected, incomplete, imported, and disputed facts have explicit treatment rather than being silently omitted. |
| `REPORT-BASE-009` | Cross-tenant operational analytics remain prohibited. Platform service-health aggregates must minimize content and cannot expose tenant/customer performance comparison without a later accepted privacy model. |
| `REPORT-BASE-010` | Dashboard cards link to authorized detail where applicable but never reveal counts or identifiers outside the viewer's scope. |
| `REPORT-BASE-011` | Scheduled reports and exports recheck current authority at execution and delivery, not only when configured. |
| `REPORT-BASE-012` | KPI changes use a new definition version and effective date; historical comparisons disclose or reconcile definition changes. |

## Import, migration, export, and tenant portability baseline

| ID | Proposed policy |
| --- | --- |
| `IMPORT-BASE-001` | Initial controlled import candidates are customer/contact, site, equipment claims, catalog/item, opening stock, and explicitly sourced historical-work summaries. Each source class requires its own mapping and validation. |
| `IMPORT-BASE-002` | Raw accepted input is preserved in restricted quarantine with source, organization, custody, hash/identity, received time, mapping version, and retention treatment. |
| `IMPORT-BASE-003` | Normalize to candidates before acceptance; validate tenant, required fields, formats, references, units/currency, duplicate candidates, and unsupported values. |
| `IMPORT-BASE-004` | External identifiers are source-qualified and organization-scoped. They cannot authorize access or become globally unique identity by assumption. |
| `IMPORT-BASE-005` | Imported work/equipment history remains imported or source-reported until controlled verification; never mark it tenant-performed automatically. |
| `IMPORT-BASE-006` | Opening stock requires item/location/custody, quantity/unit, effective time, source evidence, approver, and reconciliation total; it is not a silent direct balance edit. |
| `IMPORT-BASE-007` | Batch status preserves accepted, rejected, skipped, pending, duplicate-candidate, conflicted, and rolled-back results per record. |
| `IMPORT-BASE-008` | Rehearsal uses synthetic or separately authorized isolated copies and freezes counts, transforms, checks, unresolved treatment, cutover, rollback, and acceptance evidence. |
| `IMPORT-BASE-009` | Cutover names authoritative source before/during/after, freeze window, delta handling, rollback point, owner, and acceptance. Uncontrolled dual writing is prohibited. |
| `IMPORT-BASE-010` | An export records requester/authority, tenant/branch/record scope, purpose, format/definition version, source cutoff, destination/custodian, expiry, and result. |
| `IMPORT-BASE-011` | Tenant portability initially covers governed export of tenant-owned operational records, explicit relationship/provenance metadata, eligible evidence/documents, configuration, and unresolved custody limitations; platform secrets and other tenants are excluded. |
| `IMPORT-BASE-012` | Tenant cancellation separates access suspension, export window, legal/contract holds, deletion/anonymization plan, integration/offline/export copies, backup expiry, and verified closure. Exact legal periods require review. |

## Initial integration scope and contract baseline

| Integration class | Initial disposition | Authority boundary |
| --- | --- | --- |
| Governed tenant import/export files | Include as a core capability; exact formats selected later | Per-run tenant authority, mapping/version, validation, result, custody, and expiry |
| Generated service documents and accounting-ready export | Include; not direct accounting authority | Source cutoff and commercial/payment meanings remain explicit |
| In-product worker/customer/manager notifications | Include | Delivery/read never implies approval, attendance, payment, or completion |
| External email, SMS, or messaging transport | Optional after a named contract/provider proof | Tenant consent, recipient, template, rate, content minimization, retry, and terminal failure |
| Map/navigation handoff | Optional external link/handoff | Location disclosure minimized; provider result is not site truth |
| Enterprise identity federation | Defer from initial small-business release; preserve later contract path | External identity claim never grants tenant membership/business authority by itself |
| Public API, tenant webhooks, accounting-system direct sync | Defer until a separately accepted contract and proof | No generic broad credential or unbounded tenant export |
| Supplier/manufacturer/warranty direct exchange | Defer until business owner and authority direction exist | Provider statements retain provenance and require internal acceptance where applicable |
| MMQR/payment gateway or wallet integration | Exclude initially | Product records external payment evidence only and never requests wallet credentials or processes settlement |

| ID | Proposed policy |
| --- | --- |
| `INTEGRATION-BASE-001` | Every integration relationship names business owner, technical owner, tenant/environment scope, purpose, source, destination, direction, data classes, authority meaning, and lifecycle. |
| `INTEGRATION-BASE-002` | Tenant context comes from trusted configuration/current authority, never arbitrary payload, filename, external identifier, hostname, or destination. |
| `INTEGRATION-BASE-003` | Provider delivery, acceptance, read, verification, or settlement claim changes internal business truth only when an accepted contract explicitly authorizes and validates that meaning. |
| `INTEGRATION-BASE-004` | Imported/provider facts retain source and verification status. External IDs are source-qualified and never grant authorization. |
| `INTEGRATION-BASE-005` | Workload identity is least-privilege, tenant/purpose/environment bound, rotatable/revocable, and separate from human or platform-superuser authority. |
| `INTEGRATION-BASE-006` | Contract, schema, mapping, template, policy, and credential versions are explicit, compatible, reviewable, and attributable. |
| `INTEGRATION-BASE-007` | Retry uses stable business-effect identity and bounded timeout, attempts, age, concurrency, backoff, and rate treatment. |
| `INTEGRATION-BASE-008` | An unknown irreversible outcome reconciles before retry; provider timeout never automatically means failure or success. |
| `INTEGRATION-BASE-009` | Partial/batch outcomes preserve per-effect results and never report total success when any required effect is unknown, failed, or unresolved. |
| `INTEGRATION-BASE-010` | Inbound callbacks validate source/trust, endpoint/environment, replay, operation mapping, contract version, timing, and current tenant/business state. |
| `INTEGRATION-BASE-011` | Outbound selection applies current tenant, branch, role, record, purpose, consent, privacy, evidence, retention, and destination restrictions. |
| `INTEGRATION-BASE-012` | Delayed, rejected, terminal, poison, suspended, and reconciliation states have named owners, visibility, retention, and safe manual treatment. |
| `INTEGRATION-BASE-013` | A provider failure never falls back to another tenant, recipient, environment, credential, or mapping. |
| `INTEGRATION-BASE-014` | External custody, expiry/deletion, breach, suspension, credential revocation, unresolved effects, and exit are part of the contract lifecycle. |
| `INTEGRATION-BASE-015` | Diagnostics contain minimized identifiers/state/reasons and protected audit references, not secrets or full payload bodies by default. |
| `INTEGRATION-BASE-016` | Each named integration requires a separate volume/limit/timeout/order/delivery/reconciliation/privacy/support contract and proof before enablement. |

## Copy lifecycle and recovery baseline

| ID | Proposed policy |
| --- | --- |
| `LIFECYCLE-BASE-001` | Every record/evidence/security/copy class has purpose, minimum/maximum retention, archive, hold, export, anonymization, deletion, and recovery treatment before production use. |
| `LIFECYCLE-BASE-002` | Active work, contract, custody, warranty, dispute, support case, audit requirement, or legal hold blocks ordinary deletion for its exact dependency scope. |
| `LIFECYCLE-BASE-003` | A lifecycle request verifies requester, authority, tenant/subject/scope, purpose, affected classes, exclusions, approvals, and notification. |
| `LIFECYCLE-BASE-004` | The action plan inventories authoritative, evidence, derived, offline, export, integration, cache, audit, backup, and recovery copies. |
| `LIFECYCLE-BASE-005` | Deletion/anonymization propagation prevents prohibited data from reappearing through rebuild, stale cache, sync, import replay, export, integration, or restore. |
| `LIFECYCLE-BASE-006` | Legal hold overrides ordinary expiry only for exact protected scope and preserves hold/release authority and access history. |
| `LIFECYCLE-BASE-007` | Anonymization preserves only the permitted non-identifying operational relationships and audit meaning; deletion evidence cannot retain prohibited content. |
| `LIFECYCLE-BASE-008` | Backup residual limitations and expiry are documented; restored state applies current lifecycle filters before ordinary service resumes. |
| `LIFECYCLE-BASE-009` | Tenant-specific restore is not promised until architecture and proof establish isolation, point selection, evidence linkage, derived rebuild, and external-effect reconciliation. |
| `LIFECYCLE-BASE-010` | Retention defaults from WP-100 remain architecture-evaluation values, not legal advice or production authorization. Qualified legal/privacy/accounting review remains mandatory. |

## Open-item disposition

| Open item | Proposed WP-101 disposition | Remaining boundary |
| --- | --- | --- |
| `OPEN-027` | Partially resolve product cost meanings through `INVENTORY-BASE-012` through `015`. | Statutory accounting, tax, valuation method, multi-currency, audited margin, and qualified accounting review remain. |
| `OPEN-036` | Resolve the first management KPI definitions through `KPI-BASE-001` through `012` and `REPORT-BASE-*`. | Tenant additions, payroll/productivity use, commercial commitments, and human review remain. |
| `OPEN-051` | Resolve initial governing-capability ownership through `DATA-BASE-*` and existing `DATA-OWN-*`. | Physical service/data boundaries remain architecture decisions. |
| `OPEN-052` | Resolve initial correction/history treatments and accountable roles through the history matrix and `HISTORY-BASE-*`. | Legal/privacy/accounting sufficiency and tenant thresholds remain review inputs. |
| `OPEN-053` | Resolve business consistency classifications through the atomicity matrix and `CONSIST-BASE-*`. | Physical transaction/message mechanisms remain architecture and proof decisions. |
| `OPEN-054` | Resolve initial import/migration policy through `IMPORT-BASE-001` through `009`. | Named source, exact mapping, volume, isolated data, cutover, and execution remain separately authorized. |
| `OPEN-055` | Resolve initial freshness/rebuild/reconciliation targets through `REPORT-BASE-*`. | Exact frozen load and measured proof remain. |
| `OPEN-056` | Partially resolve portability, cancellation, and restore promises through `IMPORT-BASE-010` through `012` and `LIFECYCLE-BASE-009`. | Exact legal/contract windows and tenant-restore feasibility remain. |
| `OPEN-057` | Partially resolve copy propagation through `LIFECYCLE-BASE-001` through `010`. | Provider-specific deletion/backup behavior and qualified legal/privacy/security review remain. |
| `OPEN-058` | Resolve initial full-history classes and controlled-current-value treatment through the history matrix. | Exact field-level retention and legal evidentiary requirements remain. |
| `OPEN-069` | Resolve the initial integration-class disposition through the scope matrix. | Named provider/channel/system selection remains later and separately cost/proof governed. |
| `OPEN-070` | Resolve the common contract baseline through `INTEGRATION-BASE-001` through `016`. | Each named integration still requires its exact accepted contract and proof. |

## Architecture and proof impact

| Decision/proof | Proposed effect after owner acceptance |
| --- | --- |
| `ADR-READY-004` | Ownership and consistency policy inputs substantially satisfied; physical boundary, scale, review, and ADR packet remain. |
| `ADR-READY-007` | Inventory invariants and costing boundary available; accounting review, named architecture, and inventory proof remain. |
| `ADR-READY-008` | KPI/freshness/rebuild policy available; frozen workload, reporting proof, reconciliation evidence, and ADR packet remain. |
| `ADR-READY-009` | Integration/import common contract available; named integration contracts/providers and applicable proof remain. |
| `WP98-PROOF-WAVE-003/005/006` | Policy oracles become available for later exact proof planning; no proof preparation or execution is authorized. |

## Options considered

| ID | Option | Recommendation | Reason |
| --- | --- | --- | --- |
| `WP101-OPT-001` | Advance one governed operational source per business meaning with immediate local invariants, explicit pending cross-boundary work, reconstructable history, movement-based inventory, derived reporting, and contract-bound integration. | Advance | Preserves trustworthy business meaning while allowing a lean implementation to evolve without hiding partial failure. |
| `WP101-OPT-002` | Let each screen/module keep and correct its own customer, stock, payment, and report truth. | Reject | Creates conflicting records, weak tenant controls, and unreconcilable history. |
| `WP101-OPT-003` | Require one global atomic transaction for every workflow, media operation, report, and external provider effect. | Reject | Real-world/external effects cannot share one reliable boundary and would couple availability and scale unnecessarily. |
| `WP101-OPT-004` | Treat all work as eventually consistent and resolve mismatches later. | Reject | Approval, tenant linkage, stock custody, evidence availability, and paid claims require immediate fail-safe invariants. |

## Risks and proof obligations

| ID | Risk | Required control/evidence |
| --- | --- | --- |
| `WP101-RISK-001` | Policy is mistaken for a service/database decomposition. | Trace every physical choice back to these meanings and keep ADR selection separate. |
| `WP101-RISK-002` | Small-business exceptions weaken high-risk controls. | Explicit combined roles, fixed dual-control actions, attribution, and review. |
| `WP101-RISK-003` | KPI becomes payroll, revenue, or settlement truth. | Exact definition/version, labels, exclusions, source drill-down, and prohibited-meaning tests. |
| `WP101-RISK-004` | Opening stock/import creates fabricated history. | Quarantine, provenance, approval, per-record results, reconciliation, and cutover evidence. |
| `WP101-RISK-005` | Retry duplicates stock, approval, evidence, export, or message effects. | Stable effect identity plus interrupted/unknown/duplicate proof cases. |
| `WP101-RISK-006` | Retention defaults conflict with Myanmar or customer obligations. | Qualified legal/privacy/accounting review before production or real/customer data. |
| `WP101-RISK-007` | Optional integration scope expands into hidden platform dependency. | Per-integration owner, contract, proof, cost, degraded mode, and exit gate. |

## Accepted owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP101-DEC-001` | Accept `DATA-BASE-001` through `014` as the first authoritative ownership policy baseline. | Accepted |
| `WP101-DEC-002` | Accept the history/correction matrix and `HISTORY-BASE-001` through `010`. | Accepted |
| `WP101-DEC-003` | Accept the consistency/atomicity matrix and `CONSIST-BASE-001` through `014`. | Accepted |
| `WP101-DEC-004` | Accept `INVENTORY-BASE-001` through `016`, including the initial costing/non-accounting boundary. | Accepted |
| `WP101-DEC-005` | Accept `KPI-BASE-001` through `012` and `REPORT-BASE-001` through `012`. | Accepted |
| `WP101-DEC-006` | Accept `IMPORT-BASE-001` through `012`, the initial integration-scope matrix, `INTEGRATION-BASE-001` through `016`, and `LIFECYCLE-BASE-001` through `010`. | Accepted |
| `WP101-DEC-007` | Resolve or partially resolve the twelve open items exactly as recorded without treating specialist or named-integration inputs as complete. | Accepted |
| `WP101-DEC-008` | Advance `WP101-OPT-001`; reject `WP101-OPT-002`, `WP101-OPT-003`, and `WP101-OPT-004`. | Accepted |
| `WP101-DEC-009` | Keep `ADR-READY-004/007/008/009` `NOT_READY`; authorize no proof, architecture selection, provider action, or implementation. | Accepted |
| `WP101-DEC-010` | Freeze the four-path WP-101 public candidate inventory and, after verified publication, activate WP-102 Operating Model, Provider-Proof Entry and Specialist Assignment Baseline documentation only. | Accepted |

## Frozen candidate inventory and next gate

The candidate WP-101 public inventory is exactly:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/103_FIELD_OFFLINE_EVIDENCE_CLIENT_ACCEPTANCE_BASELINE.md`
4. `docs/104_DATA_CONSISTENCY_INVENTORY_REPORTING_INTEGRATION_POLICY_BASELINE.md`

The owner accepted `DEC-236`, every baseline and matrix in this document, all recorded open-item
dispositions, and `WP101-DEC-001` through `010`; advanced `WP101-OPT-001`; rejected
`WP101-OPT-002` through `004`; and authorized commit and push only for the exact four paths above.
After verified publication, WP-102 may define the operating model, provider-proof entry, and
specialist assignments. Proof preparation/execution, final architecture selection, application
coding, infrastructure, deployment, provider accounts/cost, and customer/live data remain closed.

## Verified publication and successor activation

The owner accepted the exact WP-101 recommendation and authorized only the frozen four-path public
inventory. It was committed as
`d906640 WP-101: accept data consistency inventory integration baseline` and published at
`d906640863092e80b85cc1855dc74f4f210394c0`, repository tree
`7292dea18c6ef5854fef7679a8ede1ac20a2ff39`, with unchanged proof tree
`1e9f75fdc1b221009bc691f54d24ca63f02c8038`. Local `HEAD`, fetched `origin/main`, and the live
remote main matched. WP-101 is `VERIFIED_AND_CLOSED`; its publication authority is consumed.

WP-102 is active for owner-decision documentation and option analysis only. It may propose the
operating model, environment/release/service/recovery/observability/incident/capacity/supply-chain
controls, provider-proof account/billing limits, network acceptance, and reviewer assignments.
Proof preparation/execution, final architecture selection, application coding, infrastructure,
deployment, provider accounts/cost, and customer/live data remain closed. No WP-102 commit or push
is authorized without later owner acceptance.
