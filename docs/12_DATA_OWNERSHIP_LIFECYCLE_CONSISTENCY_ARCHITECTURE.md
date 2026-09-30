# Data Ownership, Lifecycle and Consistency Architecture

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — WP-09 proposal baseline; conceptual proposals remain Proposed |
| Work package | `WP-09 Data Ownership, Lifecycle and Consistency Architecture` |
| Owner | Aung Myo Oo |
| Last updated | 2026-09-30 |
| Architecture selection | Not authorized |
| Technical-proof execution | Not authorized |
| Application coding | Not authorized |
| Deployment | Not authorized |

## Purpose

Propose a technology-neutral data architecture that preserves the accepted business meanings of
tenant ownership, stable identity, provenance, lifecycle, correction history, approvals, work,
inventory, equipment, evidence, external payment claims, derived reporting, offline changes,
imports, retention, deletion, and recovery.

This document describes conceptual authority and consistency. It does not define database tables,
service boundaries, event schemas, storage products, physical tenancy, or executable migrations.
Every `DATA-PROP-*` and `DATA-ADR-PROP-*` record is **Proposed** at `CONF-1`.

## Authorized scope

- information ownership and stewardship classes;
- authoritative business-record responsibility;
- stable identity, provenance, lineage, history, and version meaning;
- business lifecycle versus retention/access/copy lifecycle;
- consistency boundaries and cross-boundary coordination states;
- correction, amendment, supersession, reversal, reopening, merge, and separation;
- customer/equipment identity reconciliation and service-provider-independent history;
- inventory movements, custody, serialized items, and derived balance;
- work, proposal/approval, evidence, and external-payment-claim integrity;
- offline, background, integration, import, and migration idempotency/reconciliation;
- search, reports, dashboards, analytics, exports, caches, and other derived copies;
- retention, legal hold, anonymization, deletion, backup, restore, and verification;
- risks, proposed ADR subjects, and technical-proof plans.

## Explicit non-scope

- accepting a final data, storage, consistency, migration, or recovery architecture;
- selecting a database, object store, queue, search engine, cache, warehouse, lake, cloud, provider,
  replication pattern, or physical tenancy strategy;
- defining executable schemas, tables, columns, keys, indexes, APIs, services, events, migrations,
  retention jobs, backup configuration, or deployment topology;
- choosing exact transaction mechanisms, isolation levels, serialization formats, identifiers,
  cryptographic hashes, or data-partition technology;
- executing migration, integrity, load, reconciliation, backup, restore, or deletion proofs;
- application code, dependencies, deployment, live-data access, or third-party changes.

## Governing baseline

This proposal elaborates but does not replace:

- `ARC-C-001`, `ARC-C-003`, `ARC-C-005` through `ARC-C-010`, and `ARC-C-014` through
  `ARC-C-020`;
- `TB-02`, `TB-04` through `TB-06`, `TB-08`, `TB-09`, and `TB-10`;
- `CAP-ORG`, `CAP-CRM`, `CAP-SITE`, `CAP-ASSET`, `CAP-WO`, `CAP-FIELD`, `CAP-CREW`,
  `CAP-COMM`, `CAP-INV`, `CAP-PROC`, `CAP-PROJECT`, `CAP-DOC`, `CAP-PAYEVID`,
  `CAP-REPORT`, `CAP-INTEGRATE`, `CAP-AUDIT`, and `CAP-PLATFORM`;
- `BR-ORG-001`, `BR-ORG-012`, `BR-CRM-004`, `BR-SITE-002`, `BR-SITE-003`,
  `BR-ASSET-001` through `BR-ASSET-010`, `BR-WO-001` through `BR-WO-016`,
  `BR-INV-001` through `BR-INV-008`, `BR-PROC-001` through `BR-PROC-004`,
  `BR-DOC-001` through `BR-DOC-006`, `BR-PAYEVID-001` through `BR-PAYEVID-009`,
  `BR-REPORT-001` through `BR-REPORT-005`, `BR-INTEGRATE-001` through
  `BR-INTEGRATE-005`, `BR-OFFLINE-001` through `BR-OFFLINE-005`, `BR-DATA-001`
  through `BR-DATA-005`, and `BR-AUD-001` through `BR-AUD-008`;
- `SR-ORG-001`, `SR-ORG-014`, `SR-ORG-015`, `SR-CRM-001` through `SR-CRM-005`,
  `SR-SITE-001` through `SR-SITE-004`, `SR-ASSET-001` through `SR-ASSET-010`,
  `SR-WO-*`, `SR-INV-*`, `SR-CUSTODY-001`, `SR-PAYEVID-*`, `SR-DOC-*`, `SR-REPORT-*`,
  `SR-INTEGRATE-*`, `SR-OFFLINE-*`, `SR-DATA-*`, and `SR-AUD-*`;
- `OPT-DATA-01` through `OPT-DATA-03`, `OPT-EVD-*`, `OPT-INT-*`, `OPT-REP-*`,
  `OPT-OFF-*`, and `OPT-DEP-RULE-005`, `OPT-DEP-RULE-006`, `OPT-DEP-RULE-010`;
- `DATA-AUTH-001` through `DATA-AUTH-009` and `TEN-PATH-003` through `TEN-PATH-009`,
  `TEN-PATH-012`, `TEN-PATH-013`;
- `ADR-CAND-004`, `ADR-CAND-006` through `ADR-CAND-009`, `ADR-CAND-012`,
  `ADR-CAND-013`, `TP-CAND-007`, `TP-CAND-008`, and `TP-CAND-010`;
- unresolved `OPEN-018`, `OPEN-019`, `OPEN-021` through `OPEN-028`, `OPEN-033`,
  `OPEN-034`, `OPEN-036` through `OPEN-040`, `OPEN-049`, and `OPEN-051` through
  `OPEN-058`.

## Data architecture objectives

| ID | Objective | Governing trace |
| --- | --- | --- |
| `DATA-OBJ-001` | Preserve exactly one authoritative organization boundary for every tenant-owned operational record and prevent ordinary cross-tenant reassignment or linking. | `ARC-C-001`, `SR-ORG-001`, `SR-ORG-015` |
| `DATA-OBJ-002` | Give each authoritative business meaning one governing capability while allowing explicit, validated references to other capabilities. | Capability responsibility map, `OPEN-051` |
| `DATA-OBJ-003` | Keep identity, provenance, current state, prior state, business lifecycle, retention state, and derived representations distinct and attributable. | Domain truths 9, 12, 17–20 |
| `DATA-OBJ-004` | Keep accepted invariants within explicit consistency boundaries and expose cross-boundary partial/failure state instead of hiding it. | `DEC-066`, `ARC-C-020` |
| `DATA-OBJ-005` | Preserve proposed, approved, performed, tested, declined, unresolved, corrected, and reopened facts without destructive substitution. | `ARC-C-008`, work requirements |
| `DATA-OBJ-006` | Derive stock balances from attributable movements and preserve serialized identity, custody, correction, and cross-tenant prohibition. | `ARC-C-016`, inventory requirements |
| `DATA-OBJ-007` | Preserve customer/equipment identity claims, provider-independent equipment history, relationships, conflicting evidence, and controlled reconciliation. | `ARC-C-007`, `TP-CAND-010` |
| `DATA-OBJ-008` | Keep evidence and external-payment claims attached to their business context without claiming platform payment settlement. | `ARC-C-009`, `ARC-C-010`, `ARC-C-015` |
| `DATA-OBJ-009` | Make retries, offline synchronization, background effects, imports, integrations, and derived updates idempotent and reconcilable. | `SR-OFFLINE-004`, `QR-INTEGRATE-001` |
| `DATA-OBJ-010` | Keep search, reports, dashboards, analytics, caches, and exports tenant-scoped, freshness-visible, rebuildable, and subordinate to operational truth. | `ARC-C-018`, `TB-08`, `TP-CAND-007` |
| `DATA-OBJ-011` | Apply retention, legal hold, export, anonymization, deletion, and recovery policy across authoritative and controlled copies without erasing required audit meaning. | `ARC-C-017`, `QR-DATA-001` |
| `DATA-OBJ-012` | Verify backup/restore, migration, and reconciliation preserve tenant, business, evidence, stock, and audit invariants before resumed authority. | `QR-RECOVERY-001`, `TP-CAND-008` |

## Meaning separation

| ID | Meaning | Question answered | Must not be confused with |
| --- | --- | --- | --- |
| `DATA-MEAN-001` | Business ownership | Which organization or platform boundary controls this record? | Physical equipment ownership, storage location, or provider tenancy |
| `DATA-MEAN-002` | Governing capability | Which business capability owns the authoritative meaning and valid changes? | Database, service, team, or screen ownership |
| `DATA-MEAN-003` | Stable identity | Which continuing business thing or fact does this record identify? | Display name, external ID, current location, or mutable attributes |
| `DATA-MEAN-004` | Provenance | Who/what supplied the fact, from which source, when, and with what verification/confidence? | Correctness or current authority |
| `DATA-MEAN-005` | Business lifecycle | What meaningful operational state and transition history applies? | Retention or physical-storage state |
| `DATA-MEAN-006` | Historical record | What prior fact, decision, relationship, state, or correction must remain reconstructable? | Editable current snapshot or audit log alone |
| `DATA-MEAN-007` | Evidence | Which file, signature, reading, document, or observation supports a business fact? | The business fact, approval, settlement, or authorization itself |
| `DATA-MEAN-008` | Derived representation | What query/search/report/cache/analytic form was produced from governed sources? | Authoritative operational truth |
| `DATA-MEAN-009` | Retention state | Why and for how long may or must a representation remain, be held, anonymized, or deleted? | Business completion/cancellation |
| `DATA-MEAN-010` | Copy/custody state | Where is an authorized operational, offline, integration, export, backup, or recovery copy and who controls it? | New business ownership or authority |
| `DATA-MEAN-011` | Consistency state | Is a required invariant committed, pending, conflicted, failed, compensated, or reconciled? | User-friendly workflow label alone |
| `DATA-MEAN-012` | Lineage | Which sources, mappings, versions, rules, and operations produced this representation? | Provenance of one human-reported fact alone |

## Information ownership classes

| ID | Class | Examples | Authority boundary | Derived/copy rule |
| --- | --- | --- | --- | --- |
| `DATA-CLASS-001` | Platform control | Organization identity/lifecycle, entitlements, delivery/release state, service health | Authorized platform capability/roles | Must not absorb ordinary tenant business content |
| `DATA-CLASS-002` | Tenant operational | Customers, sites, equipment, jobs, crews, proposals, stock, contracts, projects, claims | One organization plus governing capability and access scope | Every representation preserves tenant and source identity |
| `DATA-CLASS-003` | Customer-provided | Contact/location/equipment statements, approvals, signatures, receipt evidence | Tenant custody plus explicit customer relationship/privacy authority | Source remains customer-provided until controlled verification |
| `DATA-CLASS-004` | Evidence/document content | Photos, readings, signatures, receipts, reports, generated documents | Tenant and underlying business subject plus sensitivity/lifecycle | Storage reference cannot widen access or change subject ownership |
| `DATA-CLASS-005` | Shared reference | Countries, currencies, generic service/equipment taxonomy where accepted | Platform governance or explicitly sourced catalog authority | Cannot silently become tenant operational fact or cross-tenant link |
| `DATA-CLASS-006` | Derived tenant data | Search indexes, dashboards, KPIs, forecasts, summaries, caches | Same tenant/record scope as governed source | Rebuildable, freshness-visible, non-editable as source truth |
| `DATA-CLASS-007` | Security/audit evidence | Authentication, authorization, support, privileged changes, incidents | Restricted platform/tenant audit authority by purpose | Protected from ordinary editing and unnecessary content duplication |
| `DATA-CLASS-008` | External exchange/custody | Imports, exports, provider messages, delivery receipts, external IDs | Source/destination agreement plus tenant/purpose authority | Retain mapping, provenance, custody, reconciliation, expiry/deletion evidence |
| `DATA-CLASS-009` | Offline/device copy | Assignment-scoped work context and captured field changes/evidence | Current authorized tenant/assignment/subject/device context | Temporary bounded copy; sync does not make stale effect authoritative |
| `DATA-CLASS-010` | Backup/recovery copy | Protected operational/evidence/audit copies and restore artifacts | Restricted recovery authority and policy | Never ordinary query source; restored invariants require verification |

## Governing capability and record authority

The following allocates conceptual business authority, not a service/database decomposition.

| ID | Record family | Governing capability | Authoritative responsibility | Key cross-capability references |
| --- | --- | --- | --- | --- |
| `DATA-OWN-001` | Organization, branch, membership, worker relationship | `CAP-ORG` with `CAP-IAM` constraints | Tenant identity/lifecycle and organization relationships | Platform lifecycle, assignments, audit |
| `DATA-OWN-002` | Party, customer account, contact, relationship role | `CAP-CRM` | Customer relationship identity, roles, communication context, duplicate governance | Customer access, sites, approvals, payer/owner roles |
| `DATA-OWN-003` | Site and access/location context | `CAP-SITE` | Service-place identity, address/landmark history, access context | Customer, equipment, appointments, work |
| `DATA-OWN-004` | Equipment, components, claims, relationships, lifecycle events | `CAP-ASSET` | Provider-independent equipment identity, provenance, relationship and lifecycle history | Site/customer, work, stock, warranty, evidence |
| `DATA-OWN-005` | Request, work order, visit, work item, activity, test, outcome, disposition | `CAP-REQUEST`, `CAP-WO`, `CAP-FIELD` by their accepted responsibility | Intake, authorized work coordination, performed facts, per-unit outcome | Customer/site/equipment, crew, approval, stock, evidence |
| `DATA-OWN-006` | Appointment, assignment, crew, actual participation | `CAP-SCHED`, `CAP-CREW` | Planned time/resources and attributable workforce participation | Work, worker, vehicle, branch, offline context |
| `DATA-OWN-007` | Catalog, price, proposal revision, approval, commercial obligation | `CAP-COMM` | Offered/approved commercial scope and exact revision decisions | Work scope, customer approver, payment claim, document |
| `DATA-OWN-008` | Item, serialized item, location, movement, reservation, balance | `CAP-INV` | Material identity, attributable movement/custody truth, derived availability/balance | Work/project consumption, procurement, equipment installation |
| `DATA-OWN-009` | Supplier, material request, purchase/receipt need | `CAP-PROC` | Purchasing need, supplier context, receipt and work/project linkage | Inventory, work, project, evidence |
| `DATA-OWN-010` | Project baseline, phase, milestone, change, handover | `CAP-PROJECT` | Multi-site/unit/project coordination and accepted versions | Work, materials, evidence, commercial approval |
| `DATA-OWN-011` | Evidence item and generated business document | `CAP-DOC` | Evidence metadata/content access/lifecycle and document versions | Subject capability retains business fact/decision meaning |
| `DATA-OWN-012` | External payment claim, receipt evidence link, verification/discrepancy | `CAP-PAYEVID` | Claim and review history without settlement assertion | Commercial obligation, evidence, customer/worker, audit |
| `DATA-OWN-013` | Derived measures, dashboard/report definitions and instances | `CAP-REPORT` | Governed derivation, scope, freshness, presentation, reconciliation | Every source capability; never mutates source |
| `DATA-OWN-014` | Import/export mapping and exchange/reconciliation evidence | `CAP-INTEGRATE` | Source/destination mapping, provenance, exchange state and failure | Governing capability owns imported business acceptance |
| `DATA-OWN-015` | Audit event and investigation evidence | `CAP-AUDIT` | Protected attributable control history and review | References source records but does not replace them |
| `DATA-OWN-016` | Platform lifecycle, recovery operation, service-control record | `CAP-PLATFORM` | Platform-controlled tenant/service/recovery operations | Cannot become tenant operational authority |

`DATA-PROP-001` proposes one governing capability for each authoritative business meaning. A
capability may reference another capability's identity and accepted facts but must not silently
duplicate or correct them through its own copy. Exceptions require resolution of `OPEN-051`.

## Conceptual authoritative-record envelope

This envelope is a reasoning checklist, not a table, document schema, event contract, or API.

| ID | Conceptual fact | Required meaning |
| --- | --- | --- |
| `DATA-REC-001` | Stable record/fact identity | Never reused after cancellation, correction, merge, reversal, or deletion treatment |
| `DATA-REC-002` | Authority class and organization | Platform/shared/tenant class and authoritative tenant where applicable |
| `DATA-REC-003` | Governing capability and record family | Business owner of valid transitions and corrections |
| `DATA-REC-004` | Business subject and explicit relationships | Links use tenant-compatible identities and relationship roles, not ambiguous foreign IDs |
| `DATA-REC-005` | Current business state and version/precondition | State used for controlled transition and concurrency detection |
| `DATA-REC-006` | Provenance and verification/confidence | Actor/source/import/provider/system origin distinct from correctness |
| `DATA-REC-007` | Effective and recorded time | When fact applied versus when it was captured/received, where business meaning requires |
| `DATA-REC-008` | Acting authority and operation identity | Subject/machine, membership/grant, purpose, idempotency/effect identity, and attribution |
| `DATA-REC-009` | Prior/superseding/correction/reversal relationship | Traceable history without identity reuse or silent overwrite |
| `DATA-REC-010` | Evidence/document references | Support facts through governed links; do not embed access authority in file location |
| `DATA-REC-011` | Sensitivity, retention, hold, and deletion class | Policy inputs separate from business lifecycle state |
| `DATA-REC-012` | Derivation/exchange lineage | Source versions, mapping/rule version, freshness/reconciliation state for non-authoritative copies |

`DATA-PROP-002` proposes that every architecture design demonstrate how these conceptual facts are
preserved where applicable, without requiring one physical representation for all record families.

## Lifecycle axes

One status field cannot safely carry every lifecycle meaning.

| ID | Axis | Example states or distinctions | Authority |
| --- | --- | --- | --- |
| `LIFE-AXIS-001` | Business lifecycle | Draft, scheduled, active, completed, cancelled, reopened; or domain-specific accepted states | Governing business capability and accepted transition policy |
| `LIFE-AXIS-002` | Version/history | Current, superseded, corrected, reversed, merged source, separated/restored identity | Governing capability plus protected attribution/history rules |
| `LIFE-AXIS-003` | Verification/confidence | Reported, observed, imported, pending review, verified, disputed, rejected | Domain-specific verifier and provenance policy |
| `LIFE-AXIS-004` | Consistency/reconciliation | Pending, committed, conflicted, failed, retrying, compensated, reconciled, quarantined | Coordinating capability and recovery policy |
| `LIFE-AXIS-005` | Access/security | Active authority, restricted, revoked, support-only, legal/privacy restricted | Identity/security and data-access policy |
| `LIFE-AXIS-006` | Retention/legal | Active retention, archived, legal hold, deletion pending, anonymized, deleted with evidence retained | Accepted data-class policy and authorized lifecycle process |
| `LIFE-AXIS-007` | Copy/custody | Operational, derived, offline, exported, integration-held, backup, recovery staging | Copy controller plus source lifecycle and custody policy |
| `LIFE-AXIS-008` | Evidence/content | Expected, uploading, quarantined, available, rejected, superseded, redacted, deletion pending | Evidence capability constrained by subject and lifecycle policy |

`DATA-PROP-003` proposes explicit lifecycle axes. Business completion does not imply deletion,
retention does not imply ordinary access, a copy does not become authoritative, and a reconciliation
state does not rewrite the underlying business outcome.

## History and correction semantics

| ID | Operation | Proposed meaning | Prohibited shortcut |
| --- | --- | --- | --- |
| `HIST-CTRL-001` | Ordinary update | Change a currently mutable fact under accepted authority and retain risk-appropriate before/after attribution | Treat a significant decision or immutable revision as ordinary edit |
| `HIST-CTRL-002` | Amendment | Add attributable information that clarifies or completes a prior record without pretending it existed earlier | Backdate or replace original provenance silently |
| `HIST-CTRL-003` | Supersession/version | Create a new governing version and mark which prior version it supersedes | Mutate the proposal/document/policy version already decided or issued |
| `HIST-CTRL-004` | Reversal | Record a new opposite business effect linked to the original effect | Delete the stock, commercial, custody, or other movement that occurred |
| `HIST-CTRL-005` | Correction | Record incorrect fact, corrected fact/treatment, actor, authority, time, reason, and affected consequences | Overwrite history so the earlier state and decisions cannot be reconstructed |
| `HIST-CTRL-006` | Reopening | Restore controlled workflow activity with authority/reason while preserving earlier closure and downstream obligations | Pretend the earlier closure never occurred |
| `HIST-CTRL-007` | Merge | Establish surviving identity and explicit source relationships after review; preserve aliases, provenance, conflicts, and affected links | Physically destroy sources or cross tenants automatically |
| `HIST-CTRL-008` | Separation | Reconstruct identities/relationships incorrectly combined, preserving the merge and correction history | Create new unrelated identities without trace to affected facts |
| `HIST-CTRL-009` | Redaction/anonymization | Remove or transform permitted sensitive content while preserving minimum allowed operational/audit relationships | Claim full deletion while recoverable copies or direct identifiers remain outside policy |
| `HIST-CTRL-010` | Deletion | Execute authorized class-specific removal after dependency/hold/recovery checks and retain only permitted deletion evidence | Cascade away active work, contracts, custody, disputes, evidence, or audit obligations silently |

`DATA-PROP-004` proposes these distinct correction operations. Exact approval, notice, independent
review, time-window, and affected-record rules remain blocked by `OPEN-052` and `OPEN-058`.

## Consistency classes

| ID | Class | Meaning | Examples | Required visibility |
| --- | --- | --- | --- | --- |
| `CONS-CLASS-001` | Immediate invariant | Related authoritative facts must satisfy the invariant before business success is confirmed | Record tenant/link compatibility; exact approval revision; attributable stock movement; required receipt photo before paid | Success or safe rejection; no hidden partial state |
| `CONS-CLASS-002` | Authoritative workflow state | One capability commits its authoritative decision and explicitly tracks required downstream work | Closed work creates follow-up; approved scope creates material demand; evidence accepted then document generation pending | Committed source plus pending/failed/retry state |
| `CONS-CLASS-003` | Derived projection | Search/report/cache/dashboard state follows governed source and may lag within accepted target | Search index, management summary, KPI, equipment-history read view | Source version/time, freshness, rebuild/reconcile status |
| `CONS-CLASS-004` | External reconciliation | Internal claim/exchange state is compared with an external system that may be delayed/unavailable | Payment evidence, message delivery, accounting export, supplier/manufacturer response | Sent/received/verified/rejected/discrepant/retry state and source evidence |
| `CONS-CLASS-005` | Offline provisional | Captured field intent/evidence is durable locally but not authoritative until current checks succeed | Activities, photos, readings, material use, outcome captured without network | Pending/syncing/conflicted/rejected/recovered with original capture context |
| `CONS-CLASS-006` | Migration/import quarantine | Incoming records are preserved with source/mapping but excluded from authoritative use until validation/acceptance | Customer/equipment import, opening stock, historical work, contract migration | Batch/record validation, duplicate/conflict, approval, rollback/cutover status |
| `CONS-CLASS-007` | Recovery verification | Restored copies are not authoritative for resumed service until tenant and business invariants reconcile | Database/evidence restore, tenant recovery, derived rebuild | Recovery point, validation coverage, discrepancies, acceptance decision |

`DATA-PROP-005` proposes that every operation and representation declare its consistency class.
“Eventually consistent” alone is insufficient: the owner, allowed lag, visible state, retry,
conflict, reconciliation, and failure outcome must be named.

## Candidate consistency boundaries

These are business invariants to preserve, not selected transactions, tables, services, or event
boundaries. `OPEN-053` must decide which groups require one atomic commit and which permit explicit
pending/compensating states.

| ID | Candidate business boundary | Facts that must agree | Unsafe partial outcome |
| --- | --- | --- | --- |
| `CONS-BOUND-001` | Tenant-owned record creation/link | New identity, authoritative tenant, governing capability, creator/provenance, referenced-record tenants | Record exists without tenant/owner or links foreign tenant |
| `CONS-BOUND-002` | Membership/authority change | Membership lifecycle, role/scope change, actor/approval, revocation intent, audit evidence | Access changes without attributable governing record or remains active unintentionally |
| `CONS-BOUND-003` | Proposal revision decision | Immutable revision, exact items/amounts/terms, approver/delegation, decision/evidence, time | Approval attaches to later/different scope |
| `CONS-BOUND-004` | Field work outcome | Work/visit/equipment item, performed facts, participants, tests, evidence requirements, outcome/disposition | Order appears complete while units/items lack required outcomes or disposition |
| `CONS-BOUND-005` | Stock movement | Tenant, item/serial, source/destination/custody, quantity, movement type, work/project link, actor/reason | Balance changes without movement or cross-tenant/invalid custody effect |
| `CONS-BOUND-006` | Serialized supply/installation | Stock identity/movement, resulting equipment/component identity, site/work link, installer/source provenance | Serialized unit disappears from stock or creates ambiguous equipment identity |
| `CONS-BOUND-007` | Custody handoff | Item/equipment, sender, receiver, location, condition, purpose, time, acknowledgment/evidence | Custody changes without accountable transfer or loses component identity |
| `CONS-BOUND-008` | External payment status | Commercial obligation, claim amount/method/context, required evidence, submitter, verification policy/decision, correction history | Paid/verified state exists without required photo or implies platform settlement |
| `CONS-BOUND-009` | Evidence finalization | Tenant, subject, evidence type/source, content status, sensitivity/retention, actor/time | Available orphan/foreign content or business approval inferred from upload |
| `CONS-BOUND-010` | Equipment/customer reconciliation | Candidates, identity claims/provenance, selected treatment, affected relationships/history, actor/reason | Destructive merge, mixed tenant, lost provider/customer-reported history |
| `CONS-BOUND-011` | Closure/reopening/correction | Prior state, authority/reason, required checks, new state, downstream obligations, audit | History erased or follow-up/payment/dispute/custody obligation silently lost |
| `CONS-BOUND-012` | Project baseline/change/handover | Accepted baseline/version, sites/units/phases, change authority, linked work/materials, partial/final handover | Summary completion hides unfinished units, materials, tests, or punch items |
| `CONS-BOUND-013` | Retention/delete/anonymize | Record class, tenant/subject, authority, holds/dependencies, copy inventory, action result, retained evidence | Primary deleted while unsafe copies remain or required business/audit meaning disappears |

## Cross-boundary coordination options

No one coordination style is selected. A later design must choose per business boundary and show
failure/recovery meaning.

| ID | Option | Suitable condition | Strengths | Costs and risks | Status |
| --- | --- | --- | --- | --- | --- |
| `COORD-OPT-001` | One authoritative consistency boundary | Facts share one business invariant and operational authority | Clear success/failure and simpler integrity reasoning | Coupling and scale if boundary becomes too broad | Retain for immediate invariants; physical mechanism unselected |
| `COORD-OPT-002` | Authoritative commit plus durable downstream intent/outbox | Source decision may commit while notification, projection, export, or other recoverable work follows | Source truth remains stable; retries and visibility possible | Requires idempotency, ordering, monitoring, reconciliation | Retain for analysis; maps `OPT-INT-02` |
| `COORD-OPT-003` | Explicit multi-step process with pending/compensating states | Cross-capability/business steps cannot safely be one atomic boundary | Makes partial progress and business recovery visible | Compensation may not undo real-world action; more states/operations | Retain where business explicitly accepts it |
| `COORD-OPT-004` | Reconciliation-led exchange | External party/system remains independently authoritative | Preserves claim versus external confirmation distinction | Delay, discrepancy, manual review, duplicate mapping | Required for appropriate external claims/exchanges |
| `COORD-OPT-005` | Human-controlled exception resolution | Automatic merge/compensation would destroy identity, evidence, stock, approval, or audit meaning | Safer for ambiguous high-risk conflicts | Operational queue, delay, expertise, clear ownership needed | Retain as explicit failure path |

## Concurrency, idempotency, and replay proposal

| ID | Control | Proposed behavior |
| --- | --- | --- |
| `CONS-CTRL-001` | Version/precondition | Significant update asserts the business version/state it observed; stale conflicting intent cannot silently overwrite newer fact. |
| `CONS-CTRL-002` | Effect identity | Every retryable business effect has a stable operation/effect identity scoped to tenant, source, and business purpose. |
| `CONS-CTRL-003` | Idempotent result | Repeating the same accepted effect returns/reuses the same business outcome or safe known status rather than creating a second effect. |
| `CONS-CTRL-004` | Duplicate distinction | Technical retry deduplication remains separate from business duplicate detection such as two similar customers, claims, or equipment. |
| `CONS-CTRL-005` | Ordering assumption | If order matters, record and validate the governing version/sequence; do not rely on network arrival time alone. |
| `CONS-CTRL-006` | Batch isolation | Batch/import/bulk operations retain per-item identity/result and cannot hide partial cross-tenant or invalid effects behind one success. |
| `CONS-CTRL-007` | Retry policy | Retry only effects classified safe; terminal/business conflicts enter visible resolution instead of infinite automation. |
| `CONS-CTRL-008` | Compensation | Compensation is a new attributable business action linked to original; it never deletes proof that the original effect occurred. |
| `CONS-CTRL-009` | Reconciliation | Compare authoritative source, intended effect, observed target/derived state, and prior attempts; record discrepancy and resolution. |
| `CONS-CTRL-010` | Duplicate side effects | Notification, evidence, approval, stock, payment claim, export, integration, and derived updates each prove duplicate-effect protection. |

`DATA-PROP-006` proposes these controls for all retryable/offline/background/integration paths.
Exact conflict policy, ordering, retention of effect identities, and performance targets remain open.

## Customer and equipment identity integrity

Customer/site/equipment identity is probabilistic in field service: serials may be missing,
duplicated, unreadable, replaced, or reported by different providers and customers.

| ID | Proposed control | Required meaning |
| --- | --- | --- |
| `IDENT-DATA-001` | Stable internal identity | Continue independently of display name, address correction, serial claim, provider, or current location. |
| `IDENT-DATA-002` | Source-qualified claim | Record serial/label/photo/location/customer/document/import/technician/provider claim with source, time, confidence, and verification status. |
| `IDENT-DATA-003` | Multiple/conflicting claims | Preserve disagreements and selected treatment; do not force one current field to erase prior claims. |
| `IDENT-DATA-004` | Duplicate candidate | Similarity identifies a review candidate, not permission to merge or expose a foreign tenant. |
| `IDENT-DATA-005` | Controlled merge | Verify same tenant, authority, surviving identity, source identities, affected relationships, conflicts, reason, and downstream consequences. |
| `IDENT-DATA-006` | Controlled separation | Reconstruct incorrectly combined identities and relationships while preserving the merge/separation chain. |
| `IDENT-DATA-007` | Provider-independent history | Keep current tenant-performed facts separate from customer-reported, document-derived, imported, manufacturer, or other-provider facts. |
| `IDENT-DATA-008` | Time-bounded relationship | Ownership, custody, site location, payer, service authority, contract/warranty, and contact role change with effective history instead of rewriting past context. |
| `IDENT-DATA-009` | Component identity | Indoor/outdoor units, compressors, and replaced components may retain their own claims/history and relationship to parent equipment. |
| `IDENT-DATA-010` | Stock-to-equipment transition | A serialized supplied/installed item preserves its stock identity/movement link when it becomes/references serviced equipment. |
| `IDENT-DATA-011` | Tenant boundary | Similar physical equipment or shared contact across organizations never creates cross-tenant record linkage or visibility by default. |
| `IDENT-DATA-012` | Reconciliation evidence | Record candidates, comparison facts, selected action, actor/authority, time, reason, unresolved conflicts, and affected references. |

`DATA-PROP-007` proposes an identity-claim and reconciliation model rather than a globally trusted
serial number or destructive duplicate removal. Acceptance remains blocked by `OPEN-022` through
`OPEN-025`, `OPEN-051`, and `OPEN-052`.

## Inventory, serialized items, and custody integrity

| ID | Proposed control | Required meaning |
| --- | --- | --- |
| `INV-DATA-001` | Movement authority | Receipt, reservation, issue, consumption, return, transfer, adjustment, damage, and reversal are attributable business movements. |
| `INV-DATA-002` | Derived balance | Available/on-hand/reserved quantities derive from accepted movements and policy; no ordinary direct balance edit. |
| `INV-DATA-003` | Tenant-local movement | Item, source, destination, work/project, actor, and policy context belong to one authorized tenant; cross-tenant transfer is prohibited. |
| `INV-DATA-004` | Location/custody | Warehouse, branch, vehicle, crew, workshop, supplier, site, and customer custody remain explicit and time/order meaningful. |
| `INV-DATA-005` | Serialized identity | Individually identified units preserve identity through receipt, reservation, issue, install, return, repair, replacement, and disposal. |
| `INV-DATA-006` | Reservation versus movement | Reservation constrains availability but does not claim physical issue/consumption occurred. |
| `INV-DATA-007` | Work consumption | Material planned, reserved, issued, actually consumed, returned, or customer-supplied remain distinct facts linked to exact work/equipment where required. |
| `INV-DATA-008` | Correction/reversal | Correct through linked attributable movement/adjustment and reason; preserve prior balance derivation. |
| `INV-DATA-009` | Negative/insufficient stock | Follow accepted tenant policy within fixed integrity controls and expose exception/approval rather than silently invent stock. |
| `INV-DATA-010` | Concurrent demand | Detect competing reservation/issue against current authoritative availability and return safe conflict/shortage outcome. |
| `INV-DATA-011` | Physical reconciliation | Compare count/custody evidence to derived balance and record variance, investigation, authorized adjustment, and unresolved discrepancy. |
| `INV-DATA-012` | Cost boundary | Preserve quantity/identity truth independently from unresolved costing, margin, tax, or accounting meanings under `OPEN-027`. |

`DATA-PROP-008` proposes movements as inventory truth and balance as a reconcilable derivation. It
does not select ledger tables, locking, isolation level, costing, or stock-allocation technology.

## Work, commercial, and project consistency

| ID | Proposed control | Required meaning |
| --- | --- | --- |
| `WORK-DATA-001` | Request versus work | A request may precede diagnosis/scope/asset/price; conversion preserves the originating need and does not rewrite it as performed work. |
| `WORK-DATA-002` | Order/visit/unit/item distinction | One order may have many visits/units/items; each retains its own scope, evidence, test, outcome, and disposition. |
| `WORK-DATA-003` | Proposal revision | Decisions bind exact immutable revision/items/terms; later discoveries require a new attributable revision/treatment. |
| `WORK-DATA-004` | Approval versus performance | Approved/declined scope remains distinct from performed/not-performed/tested/failed/unresolved facts. |
| `WORK-DATA-005` | Assignment versus participation | Planned crew/leader and actual participating workers remain independently attributable across changes. |
| `WORK-DATA-006` | Completion versus obligations | Completion/closure does not erase follow-up, warranty, complaint, payment, custody, contract, punch-list, or dispute obligations. |
| `WORK-DATA-007` | Reopening/correction | Preserve earlier outcome/closure, authority/reason, changed facts, and downstream effect review. |
| `WORK-DATA-008` | Project version | Baseline, change request, phase/milestone, linked work/material progress, and partial/final handover retain explicit versions and per-unit truth. |
| `WORK-DATA-009` | Cancellation/reschedule | Preserve original plan/commitments, affected scope, authorizer/reason, released resources, notifications, and resulting obligations. |
| `WORK-DATA-010` | Cross-capability link | Work references customer/site/equipment/crew/commercial/stock/evidence identities but cannot silently mutate their authoritative meaning. |

`DATA-PROP-009` proposes these distinctions as data invariants across every delivery surface. It
does not define workflow tables, aggregate roots, services, or event streams.

## Workflow consistency coverage

| ID | Workflow trace | Primary data integrity concern |
| --- | --- | --- |
| `DATA-WF-001` | `WF-001`, `WF-002` | Partial customer/site/equipment identity, provenance, duplicate candidates, request-to-work links |
| `DATA-WF-002` | `WF-003` through `WF-005` | Per-unit scope, findings, diagnosis, materials, evidence, tests, changed approval, outcome/disposition |
| `DATA-WF-003` | `WF-006`, `WF-007` | Survey/version, supplied/installed identity, stock-to-equipment link, movement/custody, commissioning/handover |
| `DATA-WF-004` | `WF-008` through `WF-011` | Contract/version/obligation, emergency authority, warranty responsibility, complaint/rework linkage |
| `DATA-WF-005` | `WF-012` | Equipment/component identity, condition, custody chain, revised diagnosis/proposal, return/disposition |
| `DATA-WF-006` | `WF-013` | Appointment version, assignment/leader, actual participation, resource conflict, reschedule/offline conflict |
| `DATA-WF-007` | `WF-014` | Demand, reservation, movement, serialization, work consumption, balance, variance, replenishment |
| `DATA-WF-008` | `WF-015`, `WF-016` | Immutable proposal revision, exact decisions, evidence completeness, per-unit outcome, acknowledgment, closure/reopen |
| `DATA-WF-009` | `WF-017`, `WF-018`, `WF-019` | External claim/evidence/verification, cancellation history, continuing obligation and recurring-generation lineage |
| `DATA-WF-010` | `WF-020` | Project baseline/change, site/unit structure, work/material coordination, partial progress, punch list and handover |

## Evidence, documents, and external-payment claims

| ID | Proposed control | Required meaning |
| --- | --- | --- |
| `EVD-DATA-001` | Evidence metadata authority | Identify tenant, subject/business context, type, source/actor, capture/import time, sensitivity, retention, and content lifecycle. |
| `EVD-DATA-002` | Content versus fact | File/signature/reading/document supports a fact; upload/generation alone does not create approval, work completion, payment, or settlement. |
| `EVD-DATA-003` | Content finalization | Available evidence must match authoritative metadata/tenant/subject and accepted safety state; orphan/rejected content is reconcilable. |
| `EVD-DATA-004` | Version/replacement | Replacement/redaction/deletion after approval/closure records prior reference, actor, reason, time, authority, and affected business decision. |
| `EVD-DATA-005` | Multi-fact reference | One evidence item may support several explicit facts within compatible authority; shared content reference never merges tenant ownership. |
| `EVD-DATA-006` | Generated document version | Preserve organization, type, revision/status, business context/source versions, generation time, and language/currency/numbering policy. |
| `EVD-DATA-007` | Payment claim | Record amount/method/payer/payee/time/reference and commercial obligation as a claim about external payment, not platform settlement. |
| `EVD-DATA-008` | Required receipt | If effective policy requires photo, paid status cannot become authoritative until qualifying evidence is attached and available. |
| `EVD-DATA-009` | Verification | Verifier decision, evidence/claim version, discrepancy/replacement/partial treatment, actor/time, and reason remain distinct from submission. |
| `EVD-DATA-010` | Correction | Paid/verified rejection, replacement, or correction preserves prior claim/evidence/decision and never pretends the platform moved funds. |

`DATA-PROP-010` proposes separate metadata/content/business-fact lifecycles and a claim-versus-
settlement boundary. It does not select object storage, document format, upload mechanism, or media
processing technology.

## Derived search, reporting, dashboard, and cache data

| ID | Proposed control | Required meaning |
| --- | --- | --- |
| `DERIVE-CTRL-001` | Source identity/version | Derived item identifies governed source or derivation inputs sufficiently for rebuild/reconciliation. |
| `DERIVE-CTRL-002` | Tenant/record scope | Derivation preserves source tenant and authorization scope; aggregation does not reveal excluded records/tenants. |
| `DERIVE-CTRL-003` | Definition/version | KPI, status mapping, inclusion/exclusion, time basis, currency, and correction treatment are versioned/governed. |
| `DERIVE-CTRL-004` | Freshness | Record/communicate last successful source position/time and accepted lag; never imply real-time when stale. |
| `DERIVE-CTRL-005` | Rebuildability | Recreate from authoritative sources and governed definition without treating current projection as sole truth. |
| `DERIVE-CTRL-006` | Reconciliation | Detect missing/duplicate/out-of-order/stale derivation and compare totals/identities to authoritative control measures. |
| `DERIVE-CTRL-007` | Failure visibility | Delayed/failed/rebuilding state is observable and does not silently serve unsafe cross-tenant or materially false result. |
| `DERIVE-CTRL-008` | Non-authoritative edits | Search/report/dashboard/cache cannot directly correct operational records; correction uses governing capability. |
| `DERIVE-CTRL-009` | Retention/deletion propagation | Update/remove derived representations according to source lifecycle, hold, anonymization, deletion, and rebuild policy. |
| `DERIVE-CTRL-010` | Export lineage | Export identifies request scope, definition/source cutoff, generation/custody/expiry, and reconciliation status where required. |

`DATA-PROP-011` proposes governed derived representations. Whether a derived model is justified
remains dependent on accepted `OPEN-036`, `OPEN-038`, `OPEN-039`, and `OPEN-055` targets.

## Offline, background, integration, import, and migration data

| ID | Proposed control | Required meaning |
| --- | --- | --- |
| `XCHG-DATA-001` | Operation origin | Preserve tenant, source, actor/machine, assignment/purpose, capture time, operation identity, and policy/schema/mapping version as applicable. |
| `XCHG-DATA-002` | Provisional versus authoritative | Offline/import/integration data remains pending/quarantined until governing validation, authorization, and consistency checks succeed. |
| `XCHG-DATA-003` | Current validation | Synchronization/consumption rechecks tenant, authority, resource state, version/precondition, evidence, and current policy. |
| `XCHG-DATA-004` | Per-effect idempotency | Retry recognizes already accepted/rejected/pending effect and avoids duplicate work, approval, evidence, stock, claim, notification, or projection. |
| `XCHG-DATA-005` | Conflict classification | Distinguish safe duplicate, stale update, concurrent edit, authority loss, tenant mismatch, business conflict, mapping error, and unavailable dependency. |
| `XCHG-DATA-006` | Recoverable capture | Rejected/revoked offline evidence remains quarantined for controlled review without attaching to wrong record or becoming accepted work. |
| `XCHG-DATA-007` | External source mapping | External IDs are source-qualified and tenant-scoped; mapping changes/history remain attributable and do not grant authority. |
| `XCHG-DATA-008` | Import staging | Preserve raw accepted source/custody, normalized candidate, validation results, duplicates/conflicts, proposed mapping, and acceptance decision. |
| `XCHG-DATA-009` | Migration rehearsal | Define inventory/counts, transformations, validation/reconciliation, unresolved treatment, cutover/rollback, and evidence before authoritative switch. |
| `XCHG-DATA-010` | Batch outcome | Retain batch plus per-record accepted/rejected/pending/conflicted result and reason; never hide partial result as global success. |
| `XCHG-DATA-011` | Provenance preservation | Imported history remains imported/document/provider/customer-reported until controlled verification; never relabel as tenant-performed. |
| `XCHG-DATA-012` | Cutover authority | Name source of truth before/during/after cutover, freeze/change handling, rollback point, and owner acceptance; avoid dual uncontrolled writers. |

`DATA-PROP-012` proposes quarantine-to-acceptance and visible reconciliation. Exact migration/import
rules remain blocked by `OPEN-054`; no migration or data access is authorized.

## Retention, legal hold, export, anonymization, and deletion

| ID | Proposed control | Required meaning |
| --- | --- | --- |
| `LIFE-DATA-001` | Class policy | Map record/evidence/security/copy class to purpose, minimum/maximum retention, archive, hold, export, anonymization, deletion, and recovery rules. |
| `LIFE-DATA-002` | Policy source/version | Preserve jurisdiction/tenant/platform policy basis and effective version without allowing tenant settings to weaken fixed obligations. |
| `LIFE-DATA-003` | Dependency/hold check | Block ordinary deletion when active work, contract, custody, warranty, dispute, support case, audit, or legal hold requires the record. |
| `LIFE-DATA-004` | Authorized request | Verify requester/authority, tenant/subject/scope, purpose, identity, affected classes, exclusions, and notification/approval. |
| `LIFE-DATA-005` | Copy inventory | Identify authoritative, evidence, derived, offline, export, integration, cache, audit, backup, and recovery representations affected. |
| `LIFE-DATA-006` | Lifecycle plan | Define immediate action, delayed/recovery window, propagation, external custody, irreversible step, exception, and verification evidence. |
| `LIFE-DATA-007` | Anonymization | Remove direct/indirect identification to accepted standard while preserving only permitted non-personal operational/audit relationships. |
| `LIFE-DATA-008` | Deletion evidence | Retain only permitted evidence that authorized deletion occurred—without retaining the prohibited content itself. |
| `LIFE-DATA-009` | Derived/cache/offline propagation | Prevent deleted/anonymized data from reappearing through rebuild, stale cache, device sync, or projection replay. |
| `LIFE-DATA-010` | Integration/export custody | Notify/request deletion where obligations allow, record external response/limitation, expire controlled exports, and expose incomplete custody resolution. |
| `LIFE-DATA-011` | Backup treatment | Apply accepted expiration/cryptographic or restoration filtering strategy and prevent ordinary browse; document temporary residual limitations. |
| `LIFE-DATA-012` | Legal hold | Override ordinary deletion/expiry for exact protected scope while limiting access and preserving hold/release authority/history. |

`DATA-PROP-013` proposes one class-driven lifecycle plan across copies. It does not decide legal
requirements, periods, anonymization standard, or backup-deletion mechanism. Those remain blocked by
`OPEN-028`, `OPEN-040`, `OPEN-049`, `OPEN-056`, and `OPEN-057`.

## Backup, restore, and recovery integrity

| ID | Proposed control | Required meaning |
| --- | --- | --- |
| `REC-DATA-001` | Recovery inventory | Identify authoritative records, evidence, audit, configuration, secrets/references, derived rebuild sources, and dependencies required for coherent recovery. |
| `REC-DATA-002` | Scope/point | Define environment, tenant/global scope, recovery point, included classes, and expected missing/later effects. |
| `REC-DATA-003` | Protected custody | Restrict backup/recovery access, movement, retention, and diagnostics; custody is not business browsing authority. |
| `REC-DATA-004` | Restore isolation | Restore first into controlled boundary where appropriate and prevent accidental production/external effects during verification. |
| `REC-DATA-005` | Tenant isolation verification | Prove restored identities, links, files, derived state, and permissions do not cross organizations/environments. |
| `REC-DATA-006` | Business invariant verification | Reconcile work/approval, stock, evidence/payment, equipment identity, custody, audit, lifecycle, and idempotency control measures. |
| `REC-DATA-007` | External/async reconciliation | Determine which messages/notifications/integrations occurred before/after point and avoid duplicated or lost real-world effects. |
| `REC-DATA-008` | Derived rebuild | Recreate search/report/cache state from restored governed sources and show freshness/rebuild status. |
| `REC-DATA-009` | Lifecycle filtering | Respect current legal hold/deletion/anonymization obligations so restore does not silently re-publish prohibited data. |
| `REC-DATA-010` | Acceptance/resumption | Record validation coverage, discrepancies, risk owner, acceptance decision, resumed authority, and follow-up reconciliation. |

`DATA-PROP-014` proposes recovery verification before restored data resumes authoritative service.
It does not select backup media, replication, region, tooling, or recovery topology.

## Failure and reconciliation outcomes

| ID | Outcome | Meaning | Required owner/action |
| --- | --- | --- | --- |
| `RECON-STATE-001` | Pending | Accepted intent exists but required effect/validation has not completed | Coordinating capability, due/retry/visibility |
| `RECON-STATE-002` | Duplicate/no new effect | Same technical/business effect was already handled | Link prior result and preserve attempt evidence |
| `RECON-STATE-003` | Stale/precondition failed | Source changed since actor/client observed it | Refresh and deliberate retry/revision; no overwrite |
| `RECON-STATE-004` | Authority rejected | Tenant/membership/assignment/purpose/action is no longer permitted | Deny authoritative effect; controlled recovery for captured evidence |
| `RECON-STATE-005` | Business conflict | Concurrent or incompatible business facts require policy/human choice | Named domain owner, candidate treatments, preserved evidence |
| `RECON-STATE-006` | Mapping/identity conflict | External/import/offline identity cannot be safely matched | Quarantine; reconcile claims/mapping without forced merge |
| `RECON-STATE-007` | Dependency unavailable | External or downstream destination cannot complete now | Durable retry or explicit terminal state; source truth unchanged |
| `RECON-STATE-008` | Partially completed | Some independently valid effects completed and others did not | Show exact completed/pending/failed effects; compensate only by policy |
| `RECON-STATE-009` | Compensated/reversed | A new governed action treated a prior effect but did not erase it | Preserve original/compensation relationship and remaining obligations |
| `RECON-STATE-010` | Quarantined | Data/content is retained under restricted custody but unavailable as authoritative business fact | Validation/review owner, expiry, accept/reject treatment |
| `RECON-STATE-011` | Reconciled | Discrepancy has a documented selected treatment and authoritative state | Actor/authority/reason/time plus affected references |
| `RECON-STATE-012` | Unrecoverable/escalated | Automated/manual recovery cannot safely complete within policy | Incident/domain decision, containment, customer/tenant treatment, audit |

`DATA-PROP-015` proposes this shared recovery vocabulary while keeping domain-specific business
outcomes distinct. A generic “failed” flag is insufficient for operational recovery.

## Data risk register

| ID | Risk | Consequence | Proposed treatment | Stop condition |
| --- | --- | --- | --- | --- |
| `DATA-RISK-001` | Physical model chosen before business authority | Tables/services become accidental source of truth | Freeze conceptual owner/invariant map first | No schema/service selection in WP-09 |
| `DATA-RISK-002` | Missing tenant on indirect path | Cross-tenant leak/link/effect | WP-08 context controls plus record-tenant/link invariant and negative proof | No data architecture acceptance without `TP-CAND-001` |
| `DATA-RISK-003` | Silent last-write-wins | Approved/performed/stock/evidence history lost | Preconditions, versions, controlled correction/conflict | No conflict policy acceptance before `OPEN-021`/`OPEN-053` |
| `DATA-RISK-004` | Destructive customer/equipment merge | Wrong service history, ownership, approval, privacy | Claims/provenance, candidates, controlled merge/separation | No merge implementation before `OPEN-022`/`OPEN-023`/`OPEN-052` |
| `DATA-RISK-005` | Direct stock balance edit | Custody/material truth irreconcilable | Movements/reversals and physical reconciliation | No inventory design without movement invariant proof plan |
| `DATA-RISK-006` | Evidence content and metadata diverge | Orphan, wrong tenant/subject, false completion/payment | Finalization/reconciliation and subject authorization | No evidence architecture acceptance before media/lifecycle policies |
| `DATA-RISK-007` | Retry creates duplicate business effects | Double stock, claim, approval, notification, work | Stable effect identity and per-effect idempotency | No offline/integration acceptance without duplicate proof |
| `DATA-RISK-008` | Derived view becomes competing truth | Reports correct records silently or show stale/foreign results | Governed lineage, freshness, rebuild, source correction | No derived architecture acceptance before `OPEN-055` |
| `DATA-RISK-009` | Import relabels uncertain history as verified | False service/warranty/equipment/customer claims | Quarantine/provenance/validation/cutover evidence | No migration execution before `OPEN-054` |
| `DATA-RISK-010` | Delete/anonymize only primary copy | Privacy/legal obligation incomplete or data reappears | Copy inventory and class-driven lifecycle propagation | No lifecycle acceptance before `OPEN-028`/`OPEN-040`/`OPEN-057` |
| `DATA-RISK-011` | Restore replays stale/deleted/duplicate/cross-tenant state | Corruption, privacy breach, repeated real-world effects | Isolated restore, invariant/external/lifecycle verification | No recovery acceptance without `TP-CAND-008` |
| `DATA-RISK-012` | One global transaction assumed or rejected dogmatically | Either operational coupling or hidden partial corruption | Decide per invariant using `CONS-BOUND-*` and explicit recovery | No final boundary before `OPEN-053` |

## Proposed architecture decision records

These are proposal subjects for later owner/domain/security/privacy/accounting review. None is an
accepted ADR or physical design.

| ID | Proposed decision subject | Proposal summary | Confidence | Acceptance blockers |
| --- | --- | --- | --- | --- |
| `DATA-ADR-PROP-001` | Business-record authority | One tenant boundary and governing capability per authoritative business meaning with explicit references. | `CONF-1` | `OPEN-051`, final capability/boundary review |
| `DATA-ADR-PROP-002` | Identity/provenance/history model | Stable identity plus source-qualified claims and controlled amendment/version/reversal/merge/separation. | `CONF-1` | `OPEN-022` through `OPEN-025`, `OPEN-052`, `OPEN-058` |
| `DATA-ADR-PROP-003` | Consistency classification | Declare immediate, authoritative-workflow, derived, external, offline, migration, or recovery consistency per effect. | `CONF-1` | `OPEN-053`, quality targets, technical boundary proposal |
| `DATA-ADR-PROP-004` | Cross-boundary coordination | Use explicit source commit, pending/retry/compensation/reconciliation semantics according to accepted invariant. | `CONF-1` | `OPEN-053`, integration/offline architecture, proof evidence |
| `DATA-ADR-PROP-005` | Inventory and custody | Authoritative attributable movements/corrections with derived balance and preserved serialized/custody identity. | `CONF-1` | `OPEN-019`, `OPEN-027`, inventory proof |
| `DATA-ADR-PROP-006` | Evidence/payment data boundary | Separate metadata/content/business fact and external payment claim/evidence/verification from settlement. | `CONF-1` | `OPEN-028`, `OPEN-033`, `OPEN-034`, media/lifecycle architecture |
| `DATA-ADR-PROP-007` | Derived data | Tenant-scoped versioned definitions, freshness, rebuild, reconciliation, and non-authoritative correction. | `CONF-1` | `OPEN-036`, `OPEN-038`, `OPEN-039`, `OPEN-055`, `TP-CAND-007` |
| `DATA-ADR-PROP-008` | Import/migration | Quarantine, provenance, per-record validation, reconciliation, cutover/rollback, and owner acceptance. | `CONF-1` | `OPEN-054`, source inventory, authorized proof |
| `DATA-ADR-PROP-009` | Retention and copy lifecycle | Class-driven hold/export/anonymization/deletion plan across source, derived, device, exchange, audit, and backup copies. | `CONF-1` | `OPEN-028`, `OPEN-040`, `OPEN-049`, `OPEN-056` through `OPEN-058` |
| `DATA-ADR-PROP-010` | Backup/restore authority | Controlled copy plus isolated restore and invariant/lifecycle/external-effect verification before resumption. | `CONF-1` | Recovery targets, topology proposal, `TP-CAND-008` |

No proposal selects `OPT-DATA-01` through `OPT-DATA-03`, a physical tenancy option, database,
storage/queue/search/reporting product, event sourcing, service boundary, or migration tool.

## Technical-proof plans — execution closed

These plans specify future evidence only. WP-09 does not create test data, environments, scripts,
schemas, benchmarks, backups, restores, imports, migrations, or executable proofs.

### `DATA-TP-PLAN-001` — equipment/customer identity and history proof

| Field | Plan |
| --- | --- |
| Maps to | `TP-CAND-010`, `ADR-CAND-004`, `DATA-ADR-PROP-002` |
| Claim | High-volume customer/equipment history, partial/conflicting identity claims, duplicate candidates, merge/separation, and provider-independent provenance remain correct and performant. |
| Cases | Missing/duplicate/unreadable/replaced serials; multi-unit sites; different installer/servicer; component replacement; wrong merge then separation; cross-tenant candidate; long history |
| Evidence | Invariant results, history reconstruction, source/provenance retention, tenant-negative cases, accepted volume/latency measures, reviewer conclusion |
| Entry gate | Accepted identity/merge policy, target volumes/performance, selected technical proposal, isolated data set |
| Pass gate | No identity/history/provenance loss or cross-tenant link; results meet accepted correctness and performance targets |

### `DATA-TP-PLAN-002` — inventory movement and reconciliation proof

| Field | Plan |
| --- | --- |
| Maps to | `ADR-CAND-007`, `DATA-ADR-PROP-005` |
| Claim | Concurrent reservation/issue/use/return/transfer/adjustment/reversal preserves tenant, quantity, serialization, custody, idempotency, and reconcilable balance. |
| Cases | Competing demand, retry, partial use/return, wrong serial, vehicle/crew custody, negative policy, physical variance, reversal, cross-tenant attempt |
| Evidence | Movement/balance reconciliation, duplicate prevention, concurrency outcomes, custody/serial trace, exception visibility, independent review |
| Entry gate | Accepted stock/costing/correction policy, volumes, chosen technical proposal, isolated test inventory |
| Pass gate | Every balance derives from accepted movements; no cross-tenant/duplicate/lost movement and discrepancies remain resolvable |

### `DATA-TP-PLAN-003` — derived data correctness and rebuild proof

| Field | Plan |
| --- | --- |
| Maps to | `TP-CAND-007`, `ADR-CAND-008`, `DATA-ADR-PROP-007` |
| Claim | Search, dashboard, report, and management projections meet accepted scope, definition, freshness, scale, rebuild, and reconciliation targets. |
| Cases | Create/update/correction/reversal/delete, branch restriction, late/out-of-order/duplicate change, rebuild during live changes, stale cache, tenant negative case |
| Evidence | Source/projection control totals, freshness/rebuild measurements, authorization tests, discrepancy detection/recovery, KPI definition review |
| Entry gate | Accepted KPIs/volumes/targets and selected derived-data proposal |
| Pass gate | No unauthorized result; definitions reconcile to source and accepted lag/rebuild targets are met |

### `DATA-TP-PLAN-004` — import and migration proof

| Field | Plan |
| --- | --- |
| Maps to | `ADR-CAND-004`, `DATA-ADR-PROP-008` |
| Claim | Source data can be inventoried, mapped, quarantined, validated, deduplicated, reconciled, cut over, and rolled back without tenant, identity, provenance, history, or effect corruption. |
| Cases | Invalid/missing tenant, duplicate customer/equipment, conflicting serial, opening stock, historical work, orphan evidence, external IDs, partial batch, repeated run, cutover change |
| Evidence | Source/target counts and control totals, per-record outcomes, mapping/version evidence, invariant checks, unresolved queue, rollback rehearsal, acceptance report |
| Entry gate | Accepted `OPEN-054` policy, known source, authorized isolated copy, selected technical approach |
| Pass gate | Every source record has accepted/rejected/quarantined outcome; accepted records satisfy invariants and rerun/rollback is controlled |

### `DATA-TP-PLAN-005` — lifecycle propagation and deletion proof

| Field | Plan |
| --- | --- |
| Maps to | `ADR-CAND-006`, `ADR-CAND-013`, `DATA-ADR-PROP-009` |
| Claim | Hold/export/anonymization/deletion policy applies correctly across authoritative, evidence, derived, cache, offline, integration, audit, export, and backup representations. |
| Cases | Active dependency, legal hold, revoked device, stale projection, generated document, external export, expired backup, restore after deletion, anonymized relationships |
| Evidence | Copy inventory, lifecycle decisions, propagation/exception results, non-reappearance checks, retained-minimum review, privacy/security/legal conclusion |
| Entry gate | Accepted class policy and legal/privacy rules, selected copy architecture, isolated synthetic data |
| Pass gate | No prohibited copy remains or reappears outside documented accepted residual policy; required business/audit meaning remains |

### `DATA-TP-PLAN-006` — backup/restore consistency proof

| Field | Plan |
| --- | --- |
| Maps to | `TP-CAND-008`, `ADR-CAND-012`, `DATA-ADR-PROP-010` |
| Claim | Backup and restore meet accepted recovery objectives and preserve tenant, work/approval, stock, evidence/payment, identity, audit, lifecycle, and external-effect consistency. |
| Cases | Point-in-time gap, evidence/data mismatch, partial dependency loss, tenant-specific need, derived rebuild, queued effects, deleted/held data, wrong environment, regional failure scenario |
| Evidence | Recovery timing/point, inventory, invariant/control totals, tenant-negative checks, external-effect reconciliation, lifecycle filtering, acceptance and unresolved-risk record |
| Entry gate | Accepted recovery objectives, selected topology, authorized isolated recovery environment |
| Pass gate | Recovery targets and all mandatory invariant/lifecycle checks pass before controlled service resumption |

## Unresolved inputs and stop conditions

| ID | Required input | Governing questions | Stop condition |
| --- | --- | --- | --- |
| `DATA-IN-001` | Governing capability and stewardship exceptions | `OPEN-051` | No accepted responsibility/service/data boundary |
| `DATA-IN-002` | Duplicate identity, merge/separation, equipment claim, relationship change policy | `OPEN-022` through `OPEN-025`, `OPEN-052` | No identity reconciliation architecture acceptance |
| `DATA-IN-003` | Correction/reversal/reopening/version and independent-review matrix | `OPEN-052`, `OPEN-058` | No history architecture acceptance |
| `DATA-IN-004` | Atomic versus pending/compensating/reconciliation decisions | `OPEN-021`, `OPEN-053` | No final consistency boundary or cross-boundary coordination acceptance |
| `DATA-IN-005` | Custody, costing, accounting, payment, document, and evidence policy | `OPEN-018`, `OPEN-019`, `OPEN-027`, `OPEN-033`, `OPEN-034` | No final inventory/evidence/commercial data architecture |
| `DATA-IN-006` | KPI definitions, freshness, scale, performance, and rebuild targets | `OPEN-036`, `OPEN-038`, `OPEN-039`, `OPEN-055` | No derived-data option selection or proof execution |
| `DATA-IN-007` | Integration formats, volumes, guarantees, and reconciliation | `OPEN-037`, `QR-INTEGRATE-001` | No exchange/event architecture acceptance |
| `DATA-IN-008` | Import/migration sources, policy, cutover, rollback, and acceptance | `OPEN-054` | No migration design or execution |
| `DATA-IN-009` | Retention, legal hold, sensitivity, export, anonymization, deletion, and copy propagation | `OPEN-028`, `OPEN-040`, `OPEN-049`, `OPEN-056` through `OPEN-058` | No lifecycle architecture acceptance |
| `DATA-IN-010` | Recovery point/time, tenant restore, regional scope, verification, and resume policy | `OPEN-038`, `OPEN-041`, `OPEN-056`, `QR-RECOVERY-001` | No backup/restore architecture acceptance or proof |
| `DATA-IN-011` | Delivery budget, team skills, operating/support capacity, and data volumes/change rates | `OPEN-039`, `OPEN-042` | No technology/service/topology selection |
| `DATA-IN-012` | Required domain, accounting, privacy, legal, security, and independent review authorities | `OPEN-043` | No affected ADR acceptance without named review/evidence |

## Architecture-artifact coverage

| Artifact | WP-09 contribution | Remaining work |
| --- | --- | --- |
| `AR-ART-004` | Governing capability/record authority map, consistency boundaries, cross-boundary options | Technical responsibility/component alternatives and accepted decision |
| `AR-ART-006` | Ownership classes, record envelope, lifecycle axes, retention/copy/recovery proposal | Accepted class policy, physical tenancy/lifecycle mechanics, legal/privacy review |
| `AR-ART-007` | Offline provisional/reconciliation/idempotency data rules | Full field/offline architecture and `TP-CAND-002` execution |
| `AR-ART-008` | Evidence metadata/content/fact and external-payment data lifecycle | Media architecture, target limits, redaction/scan/storage proposal, proof |
| `AR-ART-009` | Exchange/import/migration lineage, idempotency, quarantine, reconciliation | Integration/notification contracts and selected boundary |
| `AR-ART-011` | Backup/restore data inventory and invariant/lifecycle verification | Resilience topology, observability, accepted recovery objectives, proof |
| `AR-ART-013` | Ten proposed data ADR subjects with confidence/blockers | Alternatives/consequences/reversal cost, selected proposals, owner/reviewer decisions |
| `AR-ART-014` | Six proof plans with claims, cases, evidence, entry/pass gates | Separate authorization, executable designs/environments, proof results |

## Recommended next package

After WP-09 owner acceptance and verified publication, the recommended next package is
`WP-10 Field, Offline, Evidence and Client Delivery Architecture` for documentation and
architecture proposal only. It should elaborate `AR-ART-007`, `AR-ART-008`, `AR-ART-010`, field
working sets, synchronization/conflict/recovery, device/media constraints, Technician and Customer
experience boundaries, custom-domain tenant routing, branded artifacts, version compatibility, and
proof plans for `TP-CAND-002`, `TP-CAND-003`, `TP-CAND-005`, and `TP-CAND-006`.

WP-10 should not select client frameworks, media/storage providers, build/distribution services,
domain/certificate providers, final architecture, or technology; execute proofs; add dependencies;
create application code; or deploy unless the owner separately changes those gates.

## WP-09 acceptance criteria

WP-09 is ready for owner review when:

- business ownership, governing capability, stable identity, provenance, lifecycle, history,
  evidence, derived state, retention, copy custody, consistency state, and lineage are distinct;
- every authoritative business family has one conceptual owner without declaring a physical
  service/database boundary;
- immediate invariants and cross-boundary pending/retry/compensation/reconciliation options are
  explicit for tenant links, approvals, work, inventory, custody, payment evidence, identity,
  closure, projects, and lifecycle actions;
- correction, amendment, supersession, reversal, reopening, merge, separation, anonymization, and
  deletion preserve required attribution and prior meaning;
- customer/equipment identity, stock/serialization/custody, evidence/payment, derived data,
  offline/integration/import/migration, copy lifecycle, and recovery integrity are covered;
- concurrency, idempotency, replay, partial failure, quarantine, and reconciliation outcomes are
  explicit and testable;
- risks, proposed ADRs, unresolved inputs, artifact coverage, and proof plans are traceable;
- every conceptual proposal remains Proposed `CONF-1` and names blockers; and
- no database/storage/service/migration technology or architecture is selected, no proof is
  executed, and no code, dependency, publication, deployment, live-data access, or external-system
  change occurs.

## Acceptance record

The owner accepted WP-09 and authorized publication on 2026-09-30. This acceptance freezes the
data-ownership/lifecycle/consistency proposal baseline while every `DATA-PROP-*`,
`DATA-ADR-PROP-*`, option, open question, proof plan, and unresolved input retains its recorded
non-final status. It does not accept an architecture or ADR, select a database/storage/service or
migration technology, execute a proof, access or mutate data, or authorize application coding,
dependencies, deployment, or external-system changes.
