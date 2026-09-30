# System Requirements

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted behavioral baseline — quantitative targets and architecture-entry blockers remain open |
| Work package | `WP-05 Business Rules and System Requirements` |
| Last updated | 2026-09-30 |

## Requirement language

- **MUST**: required for conformance.
- **MUST NOT**: prohibited for conformance.
- **SHOULD**: expected unless a documented reason justifies deviation.
- **MAY**: optional behavior.

The owner accepted the behavioral requirement baseline through WP-05. Quantitative targets,
explicitly open policies, architecture-entry blockers, solution architecture, and implementation
remain unaccepted until their later gates.

Each requirement states externally verifiable business behavior and traces to governing discovery
evidence. It does not prescribe a screen, database table, API, service, framework, or deployment
topology. A MUST or MUST NOT requires a passing conformance test. A SHOULD requires either a
passing test or an accepted, documented exception. MAY describes conforming optional behavior.

## Actors

- Platform operator
- Organization owner
- Organization administrator
- Branch manager
- Dispatcher or office staff
- Supervisor
- Crew leader
- Technician or helper
- Storekeeper
- Commercial approver
- Payment-evidence verifier
- Customer contact
- Customer requester, payer, approver, or delegated customer user
- Contract, warranty, quality, or project coordinator
- Purchasing staff or supplier coordinator
- Platform super administrator, support, operations, or security/audit actor
- Integration system

One person may hold several roles. Authorization must evaluate permissions and scope, not job title
alone.

## Multi-tenancy and organization

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-ORG-001` | The system MUST isolate tenant-owned operational data by organization. | `PD-001`, `BR-ORG-001` |
| `SR-ORG-002` | The system MUST authorize organization access through active membership and permission scope. | `BR-ORG-002` |
| `SR-ORG-003` | The system MUST support optional branches under an organization. | `CAP-ORG` |
| `SR-ORG-004` | The system MUST support tenant-specific operational configuration without weakening platform invariants. | `BR-ORG-003` |
| `SR-ORG-005` | The system MUST preserve audit evidence for privileged platform-support access to tenant data. | `BR-AUD-003` |
| `SR-ORG-006` | The system MUST preserve stable organization identity across changes to name, branch structure, domain, brand, plan, and delivery profile. | `DEC-015`, `BR-ORG-010` |
| `SR-ORG-007` | The system MUST keep platform roles and organization memberships as separate authority relationships. | `DEC-012`, `DEC-013`, `BR-ORG-006`, `BR-ORG-008` |
| `SR-ORG-008` | An authenticated identity with multiple memberships MUST operate in one explicit organization context at a time. | `DEC-014`, `BR-ORG-009` |
| `SR-ORG-009` | Membership suspension or revocation MUST block prohibited future access without deleting prior attribution. | `BR-ORG-011`, `BR-CREW-008` |
| `SR-ORG-010` | The system MUST distinguish platform constraints, organization defaults, and permitted branch overrides and MUST expose the effective source to authorized administrators. | `DEC-016`, `BR-ORG-013` |
| `SR-ORG-011` | Platform organization discovery MUST be limited to authorized platform-control metadata and MUST NOT expose ordinary tenant operational records. | `DEC-012`, `BR-ORG-006` |
| `SR-ORG-012` | A support session MUST identify target organization, case/purpose, requester/approver as required, allowed scope, mode, start, expiry, and closure. | `DEC-012`, `BR-ORG-007` |
| `SR-ORG-013` | Support sessions MUST be read-only by default; mutation, export, identity change, deletion, or emergency access MUST require separately authorized elevated scope. | `DEC-012`, `OPEN-008`, `OPEN-013`, `BR-ORG-007` |
| `SR-ORG-014` | Reports, exports, background work, files, notifications, search, integrations, and offline synchronization MUST enforce the same organization boundary as interactive operations. | `BR-ORG-012` |
| `SR-ORG-015` | Tenant-owned records MUST NOT be reassigned across organizations through ordinary update, merge, import, or support activity. | Domain invariant 2, `BR-ORG-001` |
| `SR-ORG-016` | Branch restrictions and cross-branch access MUST be explicit, authorized, scoped, and attributable. | `BR-ORG-004` |

## Tenant delivery and white-label applications

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-DELIVERY-001` | The product MUST provide one shared tenant-aware administration portal rather than requiring a separate admin deployment for every organization. | `PD-010`, `BR-ORG-005` |
| `SR-DELIVERY-002` | The product MUST support mapping an organization to a product subdomain. | `PD-009`, `BR-DELIVERY-001` |
| `SR-DELIVERY-003` | The product MUST support controlled mapping of a verified organization-owned custom domain or subdomain. | `PD-009`, `BR-DELIVERY-001` |
| `SR-DELIVERY-004` | Domain mapping MUST NOT replace authenticated tenant authorization. | `DEC-007`, `BR-DELIVERY-004` |
| `SR-DELIVERY-005` | The product MUST support optional separately branded customer and technician application artifacts for an organization. | `PD-011`, `BR-DELIVERY-002` |
| `SR-DELIVERY-006` | Branded application artifacts MUST derive from shared maintained product code and versioned tenant delivery configuration. | `DEC-006`, `BR-DELIVERY-003`, `BR-DELIVERY-006` |
| `SR-DELIVERY-007` | A branded application MUST resolve its intended tenant safely and MUST NOT permit branding or client configuration to bypass backend authorization. | `BR-DELIVERY-004`, `BR-DELIVERY-005` |
| `SR-DELIVERY-008` | Signing material, provider credentials, and store credentials MUST be stored and operated outside ordinary tenant-editable configuration. | `BR-DELIVERY-007` |
| `SR-DELIVERY-009` | The product MUST provide a role-aware Management Dashboard optimized for quick mobile access. | `PD-012`, `DEC-008`, `BR-DELIVERY-008` |
| `SR-DELIVERY-010` | The Management Dashboard MUST restrict summaries and navigation according to tenant, branch, role, and record authorization. | `BR-DELIVERY-009` |
| `SR-DELIVERY-011` | The Management Dashboard SHOULD provide secure navigation to the relevant detailed Admin Portal view when the authorized user requires more information. | `PD-012` |
| `SR-DELIVERY-012` | The platform MAY distribute the Management Dashboard as a separately branded Manager application without creating a separate management system. | `DEC-008`, `BR-DELIVERY-008` |
| `SR-DELIVERY-013` | Disabling or changing a domain, brand, or application identity MUST NOT change tenant-record ownership or authorization. | `BR-DELIVERY-010`, `BR-DELIVERY-011` |
| `SR-DELIVERY-014` | Authorized platform operators MUST be able to identify the organization, delivery profile, application identity, and compatible product release associated with a branded artifact. | `CAP-DELIVERY`, `BR-DELIVERY-006`, `BR-DELIVERY-012` |
| `SR-DELIVERY-015` | Shared and branded delivery surfaces MUST preserve equivalent authorization, business validation, audit, and tenant-isolation behavior for the same action. | `BR-DELIVERY-003`, `BR-DELIVERY-012` |
| `SR-DELIVERY-016` | Delivery configuration MUST NOT expose signing material, provider credentials, store credentials, or another organization's brand/private configuration to ordinary tenant users. | `BR-DELIVERY-007` |

## Customer, site, and equipment

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-CRM-001` | Authorized users MUST be able to create and maintain customer accounts and contacts. | `CAP-CRM` |
| `SR-SITE-001` | A customer MUST support multiple service sites and site-specific access information. | `CAP-SITE` |
| `SR-ASSET-001` | Authorized users MUST be able to register equipment without knowing or owning its installation record. | `PD-005`, `BR-ASSET-001` |
| `SR-ASSET-002` | Equipment MUST support partial identity with later controlled enrichment or reconciliation. | `BR-ASSET-002` |
| `SR-ASSET-003` | Equipment history MUST identify the source and confidence of historical information. | `BR-ASSET-003` |
| `SR-ASSET-004` | Equipment movement between sites MUST preserve equipment identity and movement history. | `BR-ASSET-004`, `BR-SITE-003` |
| `SR-ASSET-005` | The system MUST connect lifecycle events to equipment, site, responsible provider context, and originating work. | `WF-001`, `CAP-ASSET` |
| `SR-CRM-002` | The system MUST represent requester, contact, payer, approver, equipment owner, site contact, and person present as distinct relationships when they differ. | `DEC-025`, `BR-CRM-001` |
| `SR-CRM-003` | Customer/contact relationship roles MUST support effective periods and source/history when authority or service history depends on them. | `BR-CRM-002` |
| `SR-CRM-004` | The system SHOULD identify potential duplicate customer, contact, site, and equipment records within the organization without blocking permitted urgent work. | `WF-001`, `BR-CRM-003` |
| `SR-CRM-005` | Controlled merge, separation, and correction MUST retain affected source identities, relationships, actor, reason, and audit history. | `BR-CRM-004`, `OPEN-022` |
| `SR-CX-001` | Customer-facing access MUST be granted to an identified customer/site/equipment/action scope and MUST NOT be inferred only from phone number, email address, domain, or application brand. | `CAP-CX`, `BR-CRM-005`, `OPEN-030` |
| `SR-SITE-002` | Service sites MUST support site-specific contacts, landmarks/free-text directions, access instructions, hazards, operating constraints, and communication context. | `PA-006`, `BR-SITE-001` |
| `SR-SITE-003` | Address correction MUST preserve the location context used by historical visits. | `BR-SITE-002` |
| `SR-SITE-004` | Unsafe or unavailable access MUST allow a controlled no-access or blocked outcome without marking work successful. | `WF-013`, `BR-SITE-004` |
| `SR-ASSET-006` | Equipment identity MUST support one or more source-qualified claims such as serial, label, photo, location, customer statement, document, import, or technician observation. | `DEC-026`, `BR-ASSET-006`, `OPEN-023` |
| `SR-ASSET-007` | Conflicting equipment identity claims MUST remain visible until an authorized reconciliation records the selected treatment and history. | `BR-ASSET-007` |
| `SR-ASSET-008` | The system MUST represent equipment ownership, custody, site location, payer responsibility, and service authorization as separate relationships where applicable. | `BR-ASSET-008`, `OPEN-025` |
| `SR-ASSET-009` | Customer-supplied equipment MUST be serviceable without being recorded as tenant stock. | `BR-ASSET-009` |
| `SR-ASSET-010` | When a serialized stocked unit is supplied or installed, the system MUST preserve the link between its stock history and resulting equipment identity. | `BR-ASSET-010`, `CAP-INV` |

## Requests, work orders, and visits

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-REQ-001` | The system MUST preserve the requester's reported need separately from triage, inspection, and diagnosis. | `WF-002`, `BR-REQ-001` |
| `SR-REQ-002` | Request capture MUST support source, requester/contact, site as far as known, reported time, urgency, preferred timing, attachments, and accountable queue/owner. | `WF-002`, `BR-REQ-002` |
| `SR-REQ-003` | The system MUST support duplicate, unsupported, out-of-area, unsafe, referred, declined, cancelled, awaiting-information, and converted request dispositions without deleting the request. | `WF-002`, `WF-009`, `BR-REQ-003` |
| `SR-REQ-004` | Emergency priority and override MUST identify the applied policy, authorizing actor, reason, time, and affected schedule. | `WF-009`, `BR-REQ-004` |
| `SR-WO-001` | Authorized users MUST be able to capture a service request without a final diagnosis, scope, price, or job type. | `PD-003`, `BR-WO-001`, `WF-002` |
| `SR-WO-002` | A work order MUST support multiple equipment units, visits, service activities, and materials. | `PD-004`, `BR-WO-002` |
| `SR-WO-003` | The system MUST distinguish proposed, approved, performed, and tested work. | `BR-WO-003` |
| `SR-WO-004` | The system MUST support full approval, partial approval, rejection, and revision of proposed work. | `WF-002`, `WF-015` |
| `SR-WO-005` | The system MUST support completed, partial, inspection-only, declined, parts-pending, workshop, replacement-recommended, unresolved, disputed, and follow-up outcomes. | `WF-002` |
| `SR-WO-006` | Controlled reopening MUST record authorizer, reason, time, and affected state. | `BR-WO-007` |
| `SR-WO-007` | The system MUST support configurable job templates, forms, checklists, and required evidence. | `DEC-002`, `BR-WO-008` |
| `SR-WO-008` | Service request, work order, visit, work item, performed activity, test result, outcome, disposition, and follow-up MUST have distinct meanings and explicit relationships. | `DEC-018`, `DEC-023`, `BR-WO-009` |
| `SR-WO-009` | Work items, evidence, tests, and outcomes MUST be attributable to the applicable equipment unit or explicit general scope within multi-unit work. | `DEC-020`, `DEC-027`, `BR-WO-010` |
| `SR-WO-010` | Inspection and diagnosis MUST preserve the original reported symptom and identify finding source, actor, time, and equipment/scope. | `BR-WO-011` |
| `SR-WO-011` | Additional or changed chargeable scope MUST reference a new proposal revision and decision before it is treated as approved. | `DEC-019`, `BR-WO-012` |
| `SR-WO-012` | The system MUST block successful completion when required evidence is missing, required testing failed, work remains unsafe, or no permitted unresolved disposition exists. | `DEC-036`, `BR-WO-013`, `BR-WO-014` |
| `SR-WO-013` | Every partial, blocked, failed, deferred, disputed, workshop, replacement, or unresolved outcome MUST support a responsible next action or explicit authorized closure reason. | `WF-002`, `DEC-023`, `BR-WO-006`, `BR-WO-014` |
| `SR-WO-014` | Operational completion, customer acknowledgment, supervisor review, payment-evidence state, and financial closure MUST be recorded independently. | `DEC-021`, `BR-WO-015` |
| `SR-WO-015` | Cancellation, correction, reopening, and duplicate reconciliation MUST preserve prior identities, decisions, evidence, actor, reason, and time. | `DEC-024`, `BR-WO-016` |

## Crew, scheduling, and field operation

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-CREW-001` | A work assignment MUST support multiple workers and one responsible crew leader. | `PD-002`, `BR-CREW-001`, `BR-CREW-002` |
| `SR-CREW-002` | The system MUST distinguish assigned workers from workers who actually participated. | `BR-CREW-003` |
| `SR-CREW-003` | Crew changes MUST retain history, actor, time, and reason. | `BR-CREW-004` |
| `SR-SCHED-001` | Authorized users MUST be able to schedule, dispatch, reassign, reschedule, and cancel work. | `WF-013`, `WF-018` |
| `SR-SCHED-002` | Scheduling SHOULD identify conflicts for workers, crews, vehicles, and other configured resources. | `BR-CREW-005` |
| `SR-FIELD-001` | Field users MUST be able to record arrival, inspection, diagnosis, proposals, activities, materials, evidence, tests, outcomes, and follow-up needs according to permission. | `CAP-FIELD`, `WF-002` |
| `SR-FIELD-002` | Essential field capture SHOULD remain usable during temporary network loss and synchronize safely later. | `PA-003` |
| `SR-CREW-004` | The system MUST allow a worker to be planned or recorded for operations without requiring a login account, while authenticated actions remain attributable to the acting identity. | `DEC-017`, `BR-CREW-006` |
| `SR-CREW-005` | Crew-leader responsibility, permanent team membership, planned assignment, and actual participation MUST remain distinguishable. | `DEC-028`, `BR-CREW-007` |
| `SR-SCHED-003` | Appointment, assignment, dispatch, travel, arrival, work start, pause, departure, visit completion, and work-order completion MUST remain distinguishable where enabled. | `BR-SCHED-001`, `BR-SCHED-005` |
| `SR-SCHED-004` | Rescheduling, reassignment, or conflict override MUST retain the earlier plan, actor, reason, time, and affected workers/resources. | `WF-018`, `BR-SCHED-002`, `BR-SCHED-003` |
| `SR-SCHED-005` | The system MUST support controlled delayed, no-access, unsafe-site, weather-blocked, customer-cancelled, organization-cancelled, and emergency-reassigned outcomes. | `WF-013`, `WF-018`, `BR-SCHED-004` |
| `SR-FIELD-003` | Field capture MUST preserve the organization, assignment/work context, acting identity, actual worker where different, device/source context as required, and capture time. | `CAP-FIELD`, `BR-AUD-005` |
| `SR-FIELD-004` | Field users MUST be able to record work per equipment unit while retaining a visit-level summary. | `PD-004`, `DEC-020`, `BR-WO-010` |
| `SR-FIELD-005` | The system MUST support policy-driven mandatory photos, readings, signatures, checklists, and documents without allowing tenant policy to weaken fixed safety or integrity constraints. | `DEC-035`, `OPEN-033`, `BR-WO-008`, `BR-DOC-003` |

## Commercial approval

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-COMM-001` | The system MUST support tenant service catalogs and price lists. | `CAP-COMM` |
| `SR-COMM-002` | A quotation MUST preserve revisions and the exact revision approved or rejected. | `WF-015` |
| `SR-COMM-003` | The system MUST support configurable internal approval thresholds for price, discount, and scope. | `PA-004` |
| `SR-COMM-004` | Customer approval MUST identify approved items, actor or evidence, time, and applicable proposal revision. | `BR-WO-004`, `BR-WO-005` |
| `SR-COMM-005` | A proposal revision MUST preserve services/materials, quantities, prices, discounts, terms, assumptions, exclusions, validity, currency, and source context applicable to that revision. | `BR-COMM-001` |
| `SR-COMM-006` | The system MUST distinguish internal commercial approval from customer approval and require either or both according to effective policy. | `BR-COMM-002` |
| `SR-COMM-007` | Partial approval MUST authorize only the selected items and quantities and MUST retain rejected or undecided items. | `DEC-019`, `BR-COMM-003`, `BR-COMM-004` |
| `SR-COMM-008` | A new proposal revision MUST NOT alter the recorded content or decision of an earlier revision. | `BR-COMM-005` |
| `SR-COMM-009` | Price, discount, free-work, credit, and other commercial exceptions MUST identify the applicable threshold/policy, decision, actor, reason, and time. | `BR-COMM-006` |
| `SR-COMM-010` | Work performed before required approval MUST be identifiable as an exception and MUST NOT be represented as retroactively approved. | `BR-COMM-007` |
| `SR-COMM-011` | The system MUST keep quotation, service report, invoice, tax document, receipt, payment evidence, and accounting-record meanings distinct. | `BR-COMM-008`, `OPEN-018`, `OPEN-034` |

## Inventory

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-INV-001` | The system MUST support tenant stock locations such as warehouse, branch, vehicle, and crew when enabled. | `CAP-INV` |
| `SR-INV-002` | The system MUST distinguish reservation, issue, consumption, return, transfer, damage, receipt, and adjustment. | `BR-INV-002` |
| `SR-INV-003` | Consumed materials SHOULD connect the work context, equipment when relevant, quantity, cost context, and stock source. | `BR-INV-003` |
| `SR-INV-004` | Cross-tenant stock transactions MUST be prohibited. | `BR-INV-001` |
| `SR-INV-005` | Stock balance MUST be derivable from attributable transactions for one item and stock location. | `DEC-030`, `BR-INV-005` |
| `SR-INV-006` | Stock correction MUST create an authorized adjustment, reversal, or equivalent controlled transaction linked to its reason rather than rewriting history. | `BR-INV-006` |
| `SR-INV-007` | Serialized items MUST retain identity through receipt, reservation, issue, installation, return, transfer, replacement, and disposal when those movements apply. | `BR-INV-007` |
| `SR-INV-008` | The system MUST distinguish organization stock, customer-supplied material, field purchase, and untracked incidental material. | `BR-INV-008` |
| `SR-INV-009` | Negative-stock behavior MUST follow effective tenant policy bounded by controls that prevent cross-tenant, non-attributable, or silently inconsistent balances. | `BR-INV-004`, `BR-INV-005` |
| `SR-PROC-001` | Material requests MUST identify originating work/project/replenishment reason, requested item/quantity, requester, priority, and disposition. | `BR-PROC-001` |
| `SR-PROC-002` | The system MUST distinguish request, approval, order/commitment, receipt, discrepancy, and stock availability. | `BR-PROC-002`, `BR-PROC-003` |
| `SR-PROC-003` | Supplier or subcontractor access and work authority MUST require an explicit governed organization relationship, permission scope, and attribution. | `BR-PROC-005`, `OPEN-029` |
| `SR-CUSTODY-001` | Controlled custody handoff MUST support item identity, sender, receiver, time, condition, purpose, location, and acknowledgment/evidence according to policy. | `WF-007`, `WF-012`, `BR-PROC-004`, `OPEN-019` |

## External payment evidence

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-PAYEVID-001` | The system MUST NOT claim to initiate, process, hold, or settle an external customer payment. | `PD-006`, `BR-PAYEVID-001` |
| `SR-PAYEVID-002` | Authorized administrators MUST be able to configure approved organization or branch MMQR images. | `WF-017` |
| `SR-PAYEVID-003` | When evidence is mandatory, the system MUST prevent a paid outcome until required evidence is attached. | `PD-007`, `BR-PAYEVID-002` |
| `SR-PAYEVID-004` | The system MUST support tenant policy for direct marking or separate office verification. | `DEC-003`, `BR-PAYEVID-003` |
| `SR-PAYEVID-005` | Payment evidence MUST support amount, method, time, reference when available, image, submitter, verifier, and status. | `WF-017` |
| `SR-PAYEVID-006` | Evidence replacement or removal after closure MUST require authorization and audit history. | `BR-PAYEVID-004` |
| `SR-PAYEVID-007` | The system MUST preserve full, partial, pending, credit, submitted, verified, rejected, disputed, adjusted, and refund-related external payment meanings without claiming settlement. | `BR-PAYEVID-005` |
| `SR-PAYEVID-008` | The MMQR displayed for an obligation MUST resolve to the intended effective organization or branch payment configuration. | `BR-PAYEVID-006` |
| `SR-PAYEVID-009` | Verification MUST record evidence-consistency decision, actor, time, reason/discrepancy, and referenced obligation; it MUST NOT claim provider settlement without an accepted integration. | `BR-PAYEVID-007` |
| `SR-PAYEVID-010` | Duplicate, unreadable, mismatched, replaced, removed, and disputed evidence MUST retain review and correction history. | `BR-PAYEVID-008` |
| `SR-PAYEVID-011` | Offline payment-evidence capture MUST remain pending until synchronized validation succeeds and MUST NOT bypass evidence or verification policy. | `BR-PAYEVID-009`, `BR-OFFLINE-002` |

## Contracts, warranty, and follow-up

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-CONTRACT-001` | The system MUST support contracts covering customers, sites, equipment, included work, schedules, and service commitments. | `WF-008`, `CAP-CONTRACT` |
| `SR-WARRANTY-001` | Warranty coverage MUST identify responsible provider, covered work or part, dates, terms, and current status. | `BR-ASSET-005` |
| `SR-REWORK-001` | Complaints and rework MUST link to originating work and equipment when known. | `WF-011` |
| `SR-FOLLOW-001` | Follow-up work MUST preserve its reason and relationship to originating work. | `WF-019` |
| `SR-CONTRACT-002` | A contract MUST preserve accepted versions, effective periods, included/excluded scope, covered customers/sites/equipment, visit obligations, commitments, and responsible parties. | `BR-CONTRACT-001`, `BR-CONTRACT-005` |
| `SR-CONTRACT-003` | Contract-generated work MUST reference the obligation and contract version that generated it. | `WF-008`, `BR-CONTRACT-002` |
| `SR-CONTRACT-004` | Included work and separately chargeable findings MUST remain distinguishable through proposal, approval, performance, and reporting. | `BR-CONTRACT-003` |
| `SR-CONTRACT-005` | Commitment measurement MUST use accepted events for start, pause, resume, attendance, resolution, completion, exception, and breach. | `BR-CONTRACT-004`, `OPEN-017` |
| `SR-WARRANTY-002` | Warranty assessment MUST support accepted, denied, uncertain/pending, third-party, resolved, and disputed states with reason and responsible provider. | `BR-WARRANTY-001`, `BR-WARRANTY-002` |
| `SR-WARRANTY-003` | Covered corrective work and new chargeable work MUST remain separately proposed, approved, performed, and reported. | `BR-WARRANTY-003` |
| `SR-REWORK-002` | Complaint investigation and rework MUST preserve original records/evidence and record review, responsibility decision, resolution, and customer response. | `WF-011`, `BR-WARRANTY-004` |
| `SR-FOLLOW-002` | A follow-up MUST support origin, reason, owner, due date/condition, dependency, priority, status, resulting work, and closure disposition. | `WF-019`, `BR-FOLLOW-001` |
| `SR-FOLLOW-003` | Follow-up generation SHOULD detect accidental duplicates while preserving distinct obligations for different equipment, reasons, or commitments. | `BR-FOLLOW-002` |

## Documents and evidence

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-DOC-001` | Every evidence item MUST identify its organization, subject/business context, evidence type, source/actor, capture/import time, and sensitivity/retention class as required. | `DEC-029`, `BR-DOC-001`, `BR-DOC-003` |
| `SR-DOC-002` | Evidence retrieval, preview, download, export, replacement, redaction, and deletion MUST enforce authority to the underlying business context. | `BR-DOC-002`, `BR-DOC-004` |
| `SR-DOC-003` | Evidence change after approval or closure MUST require permitted authority and preserve prior evidence reference, actor, reason, time, and impact. | `BR-DOC-004` |
| `SR-DOC-004` | Generated business documents MUST identify organization, document type, version/status, business context, generation time, and applicable language/currency/numbering policy. | `BR-DOC-005`, `OPEN-034` |
| `SR-DOC-005` | Document generation or delivery MUST NOT automatically create customer approval, acceptance, payment settlement, or work completion. | `DEC-040`, `BR-DOC-006` |

## Projects and handover

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-PROJECT-001` | The system MUST support a project baseline containing customer context, sites/areas, units as known, accepted scope, milestones, dependencies, responsibilities, schedule, and commercial reference. | `WF-020`, `BR-PROJECT-001` |
| `SR-PROJECT-002` | Project work MUST retain links to individual work orders, visits, equipment, proposals, approvals, materials, tests, evidence, and outcomes. | `BR-PROJECT-002` |
| `SR-PROJECT-003` | A project change MUST preserve proposer, reason, baseline impact, commercial/schedule/resource impact, decision, approved revision, and resulting work. | `BR-PROJECT-003` |
| `SR-PROJECT-004` | Partial handover MUST identify the exact sites, units, scope, tests, documents, acceptance evidence, and outstanding punch-list items included. | `BR-PROJECT-004` |
| `SR-PROJECT-005` | Project completion MUST preserve unresolved punch-list, warranty, retention, payment-evidence, dispute, and follow-up obligations. | `BR-PROJECT-005` |

## Notifications and customer communication

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-NOTIFY-001` | A generated notification MUST identify organization, purpose, recipient/context, channel, template/version, triggering event, requested delivery time, and delivery outcome when available. | `BR-NOTIFY-001` |
| `SR-NOTIFY-002` | Notification selection and content MUST respect authorization, communication preference, consent, privacy, and quiet-period policy where applicable. | `BR-NOTIFY-002`, `OPEN-035` |
| `SR-NOTIFY-003` | Delivery failure, retry, duplication, delay, or customer read status MUST NOT automatically change approval, attendance, payment, acceptance, or completion state. | `BR-REQ-005`, `BR-NOTIFY-003` |
| `SR-NOTIFY-004` | Customer links and notification content MUST NOT expose sensitive tenant/customer data to an incorrectly scoped or unauthenticated recipient. | `BR-NOTIFY-004` |

## Reporting and management

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-REPORT-001` | Reports and dashboards MUST derive from governed operational records and MUST NOT provide a separate method to rewrite operational truth. | `DEC-031`, `BR-REPORT-001` |
| `SR-REPORT-002` | Every published measure MUST have an accepted definition, time basis, tenant/branch scope, inclusion/exclusion rules, and treatment of cancelled, reopened, incomplete, and corrected records. | `BR-REPORT-002`, `OPEN-036` |
| `SR-REPORT-003` | Management summaries, drill-down links, exports, and scheduled reports MUST enforce the viewer's organization, branch, role, and record scope. | `BR-DELIVERY-009`, `BR-REPORT-003` |
| `SR-REPORT-004` | A report discrepancy correction MUST reference corrected source data or a versioned derivation rule and remain attributable. | `BR-REPORT-004` |
| `SR-REPORT-005` | The system MUST NOT provide cross-tenant operational analytics until a separately accepted privacy, aggregation, and anonymization model exists. | `BR-REPORT-005` |

## Import, export, and integrations

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-INTEGRATE-001` | Each import, export, or integration run MUST identify organization, actor/system, purpose, source/destination, mapping/version, start/end time, counts, and outcome. | `BR-INTEGRATE-001` |
| `SR-INTEGRATE-002` | Imported data MUST retain source/provenance and MUST NOT be represented as tenant-verified or tenant-performed without controlled verification. | `BR-INTEGRATE-002` |
| `SR-INTEGRATE-003` | External identifiers MUST be scoped to the source and organization and MUST NOT grant authorization. | `BR-INTEGRATE-003` |
| `SR-INTEGRATE-004` | Integration retry and duplicate delivery MUST be idempotent with respect to business effects or require controlled duplicate resolution. | `BR-INTEGRATE-004` |
| `SR-INTEGRATE-005` | Export/integration selection MUST enforce tenant, branch, role, record, privacy, evidence, and retention restrictions. | `BR-INTEGRATE-005`, `OPEN-037` |
| `SR-INTEGRATE-006` | Partial failure and reconciliation MUST expose which records succeeded, failed, were skipped, or require human resolution without falsely reporting total success. | `BR-INTEGRATE-004` |

## Offline and synchronization

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-OFFLINE-001` | Offline data availability MUST be limited to authorized tenant-scoped assignments and business context needed for permitted field work. | `BR-OFFLINE-001` |
| `SR-OFFLINE-002` | Synchronized changes MUST pass current permitted validation, authorization, evidence, and audit checks before becoming authoritative. | `DEC-037`, `BR-OFFLINE-002` |
| `SR-OFFLINE-003` | Conflicting assignment, approval, scope, evidence, stock, payment-claim, and closure changes MUST fail safely or enter an explicit resolution state. | `OPEN-021`, `BR-OFFLINE-003` |
| `SR-OFFLINE-004` | Synchronization retry MUST NOT duplicate activities, evidence, stock movements, payment claims, approvals, follow-ups, or notifications. | `BR-OFFLINE-004` |
| `SR-OFFLINE-005` | Revoked access, tenant mismatch, expired assignment, or stale policy MUST block unauthorized synchronization while preserving recoverable user-captured evidence for controlled resolution. | `BR-OFFLINE-005` |

## Data lifecycle and privacy

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-DATA-001` | The system MUST apply accepted retention, archive, export, anonymization, deletion, and legal-hold policy by business-record and evidence class. | `DEC-039`, `BR-DATA-001`, `OPEN-028`, `OPEN-040` |
| `SR-DATA-002` | Ordinary deletion MUST be blocked when a record is required by active work, contract, custody, warranty, dispute, audit, support case, or legal hold. | `BR-DATA-002` |
| `SR-DATA-003` | Anonymization or deletion MUST preserve the minimum permitted non-personal operational relationships and audit evidence required by accepted policy. | `BR-DATA-003` |
| `SR-DATA-004` | Customer correction and export actions MUST verify authority, scope the affected data, preserve attribution, and exclude other tenants and unrelated parties. | `BR-DATA-004` |
| `SR-DATA-005` | Logs, tests, analytics, exports, and support evidence MUST minimize unnecessary personal and sensitive information. | `BR-DATA-005` |

## Audit, security, and privacy

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-AUD-001` | The system MUST preserve attributable history for significant status, assignment, scope, approval, evidence, warranty, and stock changes. | `BR-AUD-001` |
| `SR-AUD-002` | Corrections MUST NOT silently erase historical business decisions or values. | `BR-AUD-002` |
| `SR-SEC-001` | Authorization MUST be enforced in trusted service boundaries and MUST NOT rely on client visibility. | `BR-ORG-002` |
| `SR-SEC-002` | Photos, documents, signatures, and payment evidence MUST be accessible only to authorized tenant-scoped users and controlled support roles. | `CAP-DOC`, `CAP-IAM` |
| `SR-PRIV-001` | The system MUST minimize unnecessary personal information in logs, exports, tests, and operational evidence. | `CAP-PLATFORM` |
| `SR-AUD-003` | Automated actions MUST identify the initiating rule, schedule, integration, or platform actor and resulting business action. | `DEC-038`, `BR-AUD-004` |
| `SR-AUD-004` | Audit evidence MUST identify organization, actor/system, effective authority, action, subject, time, source, reason when required, and prior/new business meaning when relevant. | `BR-AUD-005` |
| `SR-AUD-005` | Audit evidence MUST be protected from ordinary tenant editing and cross-tenant access. | `BR-AUD-006` |
| `SR-AUD-006` | Failed authorization, controlled override, support session, export, evidence change, reopening, merge, reversal, and deletion action MUST be auditable according to accepted risk policy. | `BR-AUD-007` |
| `SR-SEC-003` | Authorization MUST evaluate authenticated identity, organization context, membership/platform role, permission, scope, record tenant, record sensitivity/state, and applicable policy rather than job title alone. | `DEC-034`, `BR-ORG-002` |
| `SR-SEC-004` | Client-provided organization, branch, role, hostname, application identity, or record identifier MUST NOT be trusted without authoritative authorization checks. | `BR-DELIVERY-004`, organization boundary invariant 9 |
| `SR-SEC-005` | Secrets, credentials, signing material, recovery material, and privileged support controls MUST NOT be exposed through ordinary tenant configuration, evidence, logs, or exports. | `BR-DELIVERY-007`, `SR-DELIVERY-008` |
| `SR-PRIV-002` | Privileged support, audit, export, and evidence access MUST be limited to accepted purpose and scope and retain reviewable access history. | `DEC-012`, `BR-ORG-007`, `BR-AUD-008` |

## Quality requirements requiring measurable targets

These quality dimensions are mandatory. Their numeric targets remain unresolved and therefore are
explicit architecture-entry blockers; values must not be invented in code.

| ID | Required measurable definition | Current status | Trace |
| --- | --- | --- | --- |
| `QR-PERF-001` | Response-time and throughput targets by critical admin, dashboard, field, search, reporting, and upload operation, including percentile and load conditions | Target required | `OPEN-038` |
| `QR-SCALE-001` | Supported organizations, branches, memberships, customers, equipment, active/completed jobs, stock transactions, projects, attachments, and concurrent users | Target required | `OPEN-039` |
| `QR-AVAIL-001` | Availability objective, maintenance treatment, degraded-mode expectations, and dependency failure behavior by product surface | Target required | `OPEN-038` |
| `QR-OFFLINE-001` | Supported offline duration, cached workload size, synchronization time, retry, conflict, expiry, and device-loss behavior | Target required | `OPEN-021`, `OPEN-038` |
| `QR-MEDIA-001` | Photo/document type, size, compression, quality, count, upload retry, resumability, malware, and retention limits | Target required | `OPEN-033`, `OPEN-038` |
| `QR-RECOVERY-001` | Backup frequency, restore point, restore time, verification, regional failure, and tenant-specific recovery expectations | Target required | `OPEN-038` |
| `QR-DATA-001` | Retention, legal hold, export, archival, anonymization, deletion, and recovery windows by record/evidence class | Target required | `OPEN-028`, `OPEN-040` |
| `QR-L10N-001` | Myanmar/English terminology, Unicode fidelity, search/sort, address, date/time, number, currency, document, and fallback acceptance | Target required | `PA-005`, `OPEN-034` |
| `QR-ACCESS-001` | Accessibility conformance level, keyboard/screen-reader behavior, colour/contrast, and field-device usability criteria | Target required | `OPEN-038` |
| `QR-COMPAT-001` | Supported browsers, operating systems, devices, screen sizes, camera/file capabilities, and deprecation policy | Target required | `OPEN-038` |
| `QR-OBS-001` | Logging, metrics, traces, audit separation, alert latency, incident classification, support diagnostics, and data-minimization targets | Target required | `OPEN-038` |
| `QR-INTEGRATE-001` | Import/export volume, file/API limits, timeout, retry, rate, reconciliation, and delivery guarantees by accepted integration | Target required | `OPEN-037`, `OPEN-038` |
| `QR-SEC-001` | Authentication, session, privileged access, encryption, secret handling, vulnerability response, and security-test acceptance targets | Target required | `OPEN-008`, `OPEN-013`, `OPEN-032` |

## Product acceptance scenarios

| ID | Conformance scenario | Primary requirement trace |
| --- | --- | --- |
| `AT-001` | An actor authorized in Organization A cannot read, search, export, link, update, synchronize, or report Organization B records, including through guessed identifiers or branded clients. | `SR-ORG-001`, `SR-ORG-014`, `SR-ORG-015`, `SR-SEC-004` |
| `AT-002` | Platform support can locate an organization using control metadata, but private records remain unavailable until a scoped, expiring, audited support session is approved. | `SR-ORG-011` through `SR-ORG-013`, `SR-AUD-006` |
| `AT-003` | A work assignment records two or more workers, one leader, a replacement after dispatch, and actual participants without rewriting the original assignment. | `SR-CREW-001` through `SR-CREW-005`, `SR-SCHED-004` |
| `AT-004` | Company B registers and services equipment installed by Company A with unknown serial/date while preserving customer-reported and technician-observed provenance. | `SR-ASSET-001` through `SR-ASSET-008` |
| `AT-005` | A general request reaches site with no diagnosis; inspection proposes cleaning, gas, repair, and a part; the customer partially approves an exact revision; only approved work is treated as authorized. | `SR-REQ-001`, `SR-WO-001`, `SR-WO-011`, `SR-COMM-005` through `SR-COMM-010` |
| `AT-006` | One visit covers several units; some pass, one awaits a part, one fails testing, and the order retains correct per-unit outcomes and follow-ups without false successful completion. | `SR-WO-009`, `SR-WO-012` through `SR-WO-014`, `SR-FIELD-004` |
| `AT-007` | Installation with an optional survey preserves quotation revision, supplied/customer equipment, stock linkage, serial/location, commissioning, partial punch list, warranty, and handover. | `SR-ASSET-010`, `SR-COMM-005`, `SR-INV-007`, `SR-DOC-004`, `SR-PROJECT-004` |
| `AT-008` | Equipment removed for workshop repair preserves condition and every custody handoff through return or final disposition. | `SR-CUSTODY-001`, `SR-WARRANTY-002`, `SR-DOC-001` |
| `AT-009` | Reserved material is issued, partly consumed, returned, and adjusted after variance; derived balance and serialized history reconcile without cross-tenant movement. | `SR-INV-001` through `SR-INV-008` |
| `AT-010` | A customer pays externally using displayed MMQR; paid status is blocked without the required receipt photo; later verification records discrepancy without claiming settlement. | `SR-PAYEVID-001` through `SR-PAYEVID-011` |
| `AT-011` | A technician captures work and photos offline; office reschedules and membership is revoked; synchronization blocks unauthorized/stale effects, avoids duplicates, and preserves recoverable evidence for review. | `SR-OFFLINE-001` through `SR-OFFLINE-005` |
| `AT-012` | A small tenant combines roles with simple policy while an enterprise tenant separates approval and verification; both preserve the same proposal, work, evidence, and audit meanings. | `SR-ORG-004`, `SR-COMM-006`, `SR-PAYEVID-004`, `SR-SEC-003` |
| `AT-013` | Product subdomain, custom domain, shared admin portal, and branded apps resolve intended presentation while authorization prevents cross-tenant access. | `SR-DELIVERY-001` through `SR-DELIVERY-016` |
| `AT-014` | A multi-site project records baseline, multiple crews, materials, approved change, partial handover, failed unit, punch list, and final outstanding obligations. | `SR-PROJECT-001` through `SR-PROJECT-005` |
| `AT-015` | Correction, merge, reopening, evidence replacement, stock adjustment, and deletion attempt retain authority, reasons, prior meaning, and audit evidence. | `SR-CRM-005`, `SR-WO-015`, `SR-INV-006`, `SR-DOC-003`, `SR-DATA-001` through `SR-AUD-006` |

## Architecture-entry blockers

The product, organization, workflow, capability, domain, business-rule, and behavioral requirement
baselines can be reviewed without choosing technology. Architecture must not begin as an accepted
phase until the following materially architecture-significant policies are decided or explicitly
deferred with risk:

- initial role-permission, separation-of-duties, and support-session control matrix;
- canonical-state customization boundary;
- offline conflict, authorization-expiry, and recovery policy;
- evidence/checklist requirements, attachment security, retention, and legal-hold policy;
- equipment identity, duplicate detection, merge, and movement rules;
- customer identity, delegation, consent, and cross-account contact rules;
- commercial/service document, numbering, currency, tax, invoice, and accounting boundary;
- inventory costing, negative stock, procurement, and subcontractor boundaries;
- contract commitment-clock and warranty responsibility policy;
- payment-evidence verification, privacy, correction, and external accounting boundary;
- notification channels, consent, templates, delivery, and retry policy;
- KPI and reporting definitions;
- required import/export and external integration scope;
- white-label build, signing, store ownership, release, support, domain verification, certificate,
  and tenant-routing model;
- initial capability/release disposition;
- all quantitative targets in `QR-PERF-001` through `QR-SEC-001`.

## WP-05 requirement acceptance criteria

The system-requirement baseline is ready for owner review when:

- requirements use normative, externally verifiable language and stable identifiers;
- every requirement traces to a governing product constraint, decision, workflow, capability,
  domain truth/invariant, or business rule;
- tenant isolation and platform support controls apply across interactive and non-interactive work;
- customer/site/equipment, crew, dynamic scope, partial approval, per-unit outcome, inventory,
  contract, warranty, evidence, project, external payment, reporting, integration, offline, privacy,
  and audit behavior are represented;
- failure, missing evidence, conflict, and unresolved outcomes cannot be reported as success;
- product acceptance scenarios cover the governing owner-stated constraints;
- missing quantitative quality values are explicit blockers rather than invented targets;
- architecture and application implementation remain unauthorized.
