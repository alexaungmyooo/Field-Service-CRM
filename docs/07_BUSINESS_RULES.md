# Business Rules

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted rule-register baseline — individual rule statuses remain authoritative |
| Work package | `WP-05 Business Rules and System Requirements` |
| Last updated | 2026-09-30 |

## Rule language

Rules marked Owner-stated preserve directly supplied product behavior. Proposed rules require
owner review before they govern architecture or implementation.

Rules are normative business constraints, not implementation instructions. Tenant configuration
may strengthen or select behavior only where a rule allows it; configuration cannot weaken
tenant isolation, authorization, audit, evidence integrity, or historical meaning.

## Organization and security

| ID | Rule | Status |
| --- | --- | --- |
| `BR-ORG-001` | Every tenant-owned operational record must have one authoritative organization boundary. | Proposed |
| `BR-ORG-002` | A user may act inside an organization only through an active authorized membership. | Proposed |
| `BR-ORG-003` | Tenant configuration must not weaken platform isolation, audit, or security invariants. | Proposed |
| `BR-ORG-004` | Branch restrictions and cross-branch access must be explicit and attributable. | Proposed |
| `BR-ORG-005` | One shared administration portal may serve many organizations, but every operation must remain tenant-authorized. | Owner-stated |
| `BR-ORG-006` | Authorized platform roles may discover organization control metadata without receiving routine access to private tenant operational data. | Accepted |
| `BR-ORG-007` | Private tenant-data support access must identify one organization, purpose, permitted scope, mode, start, expiry, and audit history; it is read-only by default. | Accepted |
| `BR-ORG-008` | Platform role assignment must not create organization membership or tenant operational authority. | Proposed |
| `BR-ORG-009` | A user with several memberships must act within one explicit organization context at a time. | Proposed |
| `BR-ORG-010` | Organization identity must survive changes to name, branch structure, domain, brand, plan, and delivery profile. | Proposed |
| `BR-ORG-011` | Organization and membership suspension must stop prohibited future activity without deleting historical attribution. | Proposed |
| `BR-ORG-012` | Background jobs, reports, exports, files, notifications, search, integrations, and offline synchronization must preserve the same tenant boundary as interactive activity. | Proposed |
| `BR-ORG-013` | Effective configuration must identify whether a value comes from platform constraint, organization default, or permitted branch override. | Proposed |

## Tenant delivery and branding

| ID | Rule | Status |
| --- | --- | --- |
| `BR-DELIVERY-001` | An organization may use a product subdomain or a verified custom domain. | Owner-stated |
| `BR-DELIVERY-002` | An organization may have separately branded customer and technician applications. | Owner-stated |
| `BR-DELIVERY-003` | Branded applications must be generated from shared maintained product code, not independently modified tenant forks. | Proposed |
| `BR-DELIVERY-004` | Domain, brand, or application identity must not replace authenticated tenant authorization. | Proposed |
| `BR-DELIVERY-005` | A branded application artifact must be bound to one intended organization unless explicitly designed as a shared multi-organization application. | Proposed |
| `BR-DELIVERY-006` | Brand configuration changes and application releases must be versioned and attributable. | Proposed |
| `BR-DELIVERY-007` | Signing material, provider credentials, and store credentials must not be exposed as ordinary tenant-editable configuration. | Proposed |
| `BR-DELIVERY-008` | The product must provide a role-aware, mobile-optimized Management Dashboard; a separate branded Manager app is optional. | Accepted |
| `BR-DELIVERY-009` | Management summaries and links must respect tenant, branch, role, and record-level authorization. | Proposed |
| `BR-DELIVERY-010` | Removing a domain mapping or branded application must not change ownership of existing tenant business records. | Proposed |
| `BR-DELIVERY-011` | A delivery profile change must not expose capabilities or records that the authenticated actor is not otherwise authorized to use. | Proposed |
| `BR-DELIVERY-012` | A supported application release must preserve compatible business meanings across shared and branded delivery surfaces. | Proposed |

## Customer, site, and equipment

| ID | Rule | Status |
| --- | --- | --- |
| `BR-CRM-001` | Customer account, contact, requester, payer, approver, equipment owner, site contact, and person present must remain separately representable. | Proposed |
| `BR-CRM-002` | Customer/contact relationship roles and effective periods must be explicit when authority or history depends on them. | Proposed |
| `BR-CRM-003` | Potential duplicate customers, contacts, sites, and equipment may be flagged without blocking urgent work under controlled temporary identity. | Proposed |
| `BR-CRM-004` | Merge, separation, and correction must preserve source records, affected relationships, actor, reason, and history. | Proposed |
| `BR-CRM-005` | Customer-facing access must be granted for an explicit customer, site, equipment set, or action scope and must not be inferred from contact details alone. | Proposed |
| `BR-SITE-001` | A customer may use multiple service sites, and site-specific contacts, landmarks, access instructions, hazards, and operating constraints must remain distinguishable. | Proposed |
| `BR-SITE-002` | Address correction must not silently rewrite historical visit location evidence. | Proposed |
| `BR-SITE-003` | Equipment movement between sites must use a lifecycle relationship rather than rewriting all earlier site history. | Proposed |
| `BR-SITE-004` | Site access restrictions and safety conditions may block attendance or work without forcing a successful visit outcome. | Proposed |

| ID | Rule | Status |
| --- | --- | --- |
| `BR-ASSET-001` | Equipment registration must not require the current tenant to be the installer. | Owner-stated |
| `BR-ASSET-002` | Installer, installation date, model, and serial number may initially be unknown. | Proposed |
| `BR-ASSET-003` | Tenant-performed history, customer-reported history, imported evidence, and technician observation must remain distinguishable. | Proposed |
| `BR-ASSET-004` | Moving equipment between sites must preserve its identity and movement history. | Proposed |
| `BR-ASSET-005` | A warranty record must identify responsible provider, covered work or part, term, and status. | Proposed |
| `BR-ASSET-006` | Equipment identity claims may come from labels, serials, photos, location, customer statements, documents, imports, or technician observation and must retain provenance. | Proposed |
| `BR-ASSET-007` | Conflicting or duplicate equipment identity claims must remain traceable until controlled reconciliation. | Proposed |
| `BR-ASSET-008` | Equipment ownership, custody, site location, payer responsibility, and service authorization must be separately representable over time. | Proposed |
| `BR-ASSET-009` | A customer-supplied asset may enter service history without becoming tenant inventory. | Proposed |
| `BR-ASSET-010` | A serialized stocked item supplied or installed for a customer must retain linkage between stock history and resulting equipment identity when both are tracked. | Proposed |

## Service intake and communication

| ID | Rule | Status |
| --- | --- | --- |
| `BR-REQ-001` | A request must preserve the requester's reported need separately from later triage, inspection, and diagnosis. | Proposed |
| `BR-REQ-002` | Request capture must identify source, requester/contact, site as far as known, time, urgency, and current accountable owner or queue. | Proposed |
| `BR-REQ-003` | Duplicate, unsupported, out-of-area, unsafe, declined, referred, and cancelled requests require explicit dispositions rather than deletion. | Proposed |
| `BR-REQ-004` | Emergency priority must follow tenant policy and attributable override authority rather than customer wording alone. | Proposed |
| `BR-REQ-005` | Message delivery, read status, or notification acknowledgment must not by itself prove customer approval, attendance, acceptance, or payment. | Proposed |

## Crew and assignment

| ID | Rule | Status |
| --- | --- | --- |
| `BR-CREW-001` | A work order may be assigned to two or more workers. | Owner-stated |
| `BR-CREW-002` | Every active crew assignment must identify one responsible leader. | Proposed |
| `BR-CREW-003` | Assigned and actually participating workers must be distinguishable. | Proposed |
| `BR-CREW-004` | Crew membership changes after assignment must retain actor, time, and reason. | Proposed |
| `BR-CREW-005` | Scheduling must identify conflicts for workers and other reserved operational resources. | Proposed |
| `BR-CREW-006` | A worker may participate in operations without having a login, but authenticated actions must remain attributable to the acting identity. | Proposed |
| `BR-CREW-007` | Crew leader responsibility and each worker's actual participation must be preserved independently from permanent team membership. | Proposed |
| `BR-CREW-008` | Worker or membership deactivation must not erase past assignments, participation, evidence, approvals, or responsibility. | Proposed |

## Scheduling and dispatch

| ID | Rule | Status |
| --- | --- | --- |
| `BR-SCHED-001` | Appointment, crew assignment, dispatch, travel, arrival, work start, pause, departure, and completion are distinct operational events when tracked. | Proposed |
| `BR-SCHED-002` | Rescheduling or reassignment must preserve the earlier plan, actor, reason, time, and affected resources. | Proposed |
| `BR-SCHED-003` | Resource conflict warnings may be overridden only by permitted authority with a recorded reason. | Proposed |
| `BR-SCHED-004` | Customer no-access, crew delay, weather, unsafe conditions, and emergency reprioritization require explicit operational outcomes and notifications according to policy. | Proposed |
| `BR-SCHED-005` | A visit may be completed, aborted, cancelled, or marked no-access without implying the entire work order is complete. | Proposed |

## Work order and field execution

| ID | Rule | Status |
| --- | --- | --- |
| `BR-WO-001` | A service request may be created without a final diagnosis, service type, price, or complete equipment identity. | Owner-stated |
| `BR-WO-002` | One visit may contain multiple services, repairs, materials, and equipment units. | Owner-stated |
| `BR-WO-003` | Proposed, approved, performed, and tested work must remain distinguishable. | Proposed |
| `BR-WO-004` | Additional chargeable work requires customer approval according to tenant policy. | Proposed |
| `BR-WO-005` | Partial approval must not authorize rejected proposal items. | Proposed |
| `BR-WO-006` | A visit may close with a controlled incomplete outcome only when its required follow-up or disposition is recorded. | Proposed |
| `BR-WO-007` | Reopening a closed job requires authorization, reason, and audit history. | Proposed |
| `BR-WO-008` | Required evidence and checklists depend on job template and tenant policy. | Proposed |
| `BR-WO-009` | Service request, work order, visit, work item, activity, outcome, and follow-up must remain distinct and linked. | Proposed |
| `BR-WO-010` | One work order may contain multiple visits and equipment units, but work items, tests, evidence, and outcomes must remain attributable at the applicable unit or scope. | Proposed |
| `BR-WO-011` | Inspection findings and diagnosis must not rewrite the customer's original reported symptom. | Proposed |
| `BR-WO-012` | A changed chargeable scope must create or reference a new proposal revision before customer approval. | Proposed |
| `BR-WO-013` | Failed testing, missing required evidence, unsafe conditions, and unresolved work must not be represented as successful completion. | Proposed |
| `BR-WO-014` | Every incomplete, blocked, failed, disputed, or deferred outcome must identify a disposition or accountable next action. | Proposed |
| `BR-WO-015` | Operational completion, customer acknowledgment, supervisor review, payment-evidence state, and financial closure must remain separate facts. | Proposed |
| `BR-WO-016` | Cancellation, correction, and reopening must not reuse or erase the identity of earlier work, visits, decisions, or evidence. | Proposed |

## Commercial proposal and approval

| ID | Rule | Status |
| --- | --- | --- |
| `BR-COMM-001` | A proposal revision must preserve offered items, quantities, prices, discounts, terms, assumptions, exclusions, validity, currency, and commercial context. | Proposed |
| `BR-COMM-002` | Internal approval and customer approval are separate decisions when tenant policy requires both. | Proposed |
| `BR-COMM-003` | Customer approval must identify the exact proposal revision, approved and declined items, actor/evidence, and time. | Proposed |
| `BR-COMM-004` | Partial approval authorizes only the selected items and quantities. | Proposed |
| `BR-COMM-005` | A later revision must not change what an earlier revision approved, rejected, expired, or superseded. | Proposed |
| `BR-COMM-006` | Price, discount, free work, credit, and exception authority must be evaluated against effective organization/branch policy and actor scope. | Proposed |
| `BR-COMM-007` | Work performed before required approval must be recorded as an exception and must not fabricate retroactive approval. | Proposed |
| `BR-COMM-008` | Quotation, service report, invoice, tax document, receipt, payment evidence, and accounting record meanings must not be silently combined. | Proposed |

## Inventory

| ID | Rule | Status |
| --- | --- | --- |
| `BR-INV-001` | A stock transaction belongs to one tenant and cannot move quantity across tenants. | Proposed |
| `BR-INV-002` | Reservation, issue, consumption, return, transfer, damage, and adjustment are distinct stock meanings. | Proposed |
| `BR-INV-003` | Material recorded as consumed by work must reference its work context and stock source when inventory tracking is enabled. | Proposed |
| `BR-INV-004` | Negative stock behavior is a tenant policy bounded by platform integrity rules. | Proposed |
| `BR-INV-005` | Stock balance must be derived from attributable transactions for one item and stock location. | Proposed |
| `BR-INV-006` | Stock correction must use adjustment, reversal, or other controlled transaction meaning rather than rewriting transaction history. | Proposed |
| `BR-INV-007` | Serialized item identity must be preserved through receipt, reservation, issue, installation, return, transfer, replacement, and disposal when tracked. | Proposed |
| `BR-INV-008` | Customer-supplied and field-purchased materials must remain distinguishable from organization stock. | Proposed |

## Procurement and custody

| ID | Rule | Status |
| --- | --- | --- |
| `BR-PROC-001` | Material demand must retain its originating work, project, replenishment, or other business reason. | Proposed |
| `BR-PROC-002` | Purchase approval, ordering, supplier commitment, receipt, and stock availability are distinct facts. | Proposed |
| `BR-PROC-003` | Receipt quantity, condition, serialized identity, source, destination, and discrepancy must be attributable when tracked. | Proposed |
| `BR-PROC-004` | Physical custody handoff for customer equipment, serialized items, and removed components must identify item, sender, receiver, time, condition, and purpose according to policy. | Proposed |
| `BR-PROC-005` | Supplier or subcontractor involvement must not grant tenant-system access or work authority without an explicit governed relationship. | Proposed |

## Contracts, warranty, complaints, and follow-up

| ID | Rule | Status |
| --- | --- | --- |
| `BR-CONTRACT-001` | A service contract must identify the customer, covered sites/equipment/scope, effective period, included/excluded work, obligations, and responsible parties. | Proposed |
| `BR-CONTRACT-002` | Contract-generated visits must retain the obligation and accepted contract version that produced them. | Proposed |
| `BR-CONTRACT-003` | Included contract work and separately chargeable findings must remain distinguishable. | Proposed |
| `BR-CONTRACT-004` | Response, attendance, resolution, pause, and completion commitment clocks must use accepted event definitions. | Proposed |
| `BR-CONTRACT-005` | Contract suspension, expiry, renewal, and amendment must not rewrite obligations or work that occurred under earlier terms. | Proposed |
| `BR-WARRANTY-001` | Warranty eligibility must identify the responsible provider and must not be inferred solely from current service history. | Proposed |
| `BR-WARRANTY-002` | Warranty assessment, accepted coverage, denied coverage, pending third-party decision, and customer dispute must remain distinct. | Proposed |
| `BR-WARRANTY-003` | Covered corrective work and new chargeable work discovered during warranty service must remain distinguishable. | Proposed |
| `BR-WARRANTY-004` | Complaint and rework records must preserve the original work and evidence rather than modifying them to match the complaint outcome. | Proposed |
| `BR-FOLLOW-001` | Follow-up must identify origin, reason, responsible owner, due condition/date, dependency, and final disposition. | Proposed |
| `BR-FOLLOW-002` | Follow-up generation must prevent accidental duplication without combining distinct obligations for different equipment or reasons. | Proposed |

## Documents and evidence

| ID | Rule | Status |
| --- | --- | --- |
| `BR-DOC-001` | Every evidence item must belong to one organization and reference an authorized business context. | Proposed |
| `BR-DOC-002` | Evidence access must not exceed the actor's authority to access the underlying business context. | Proposed |
| `BR-DOC-003` | Required evidence must identify type, subject, source/actor, capture time, and applicable work or decision. | Proposed |
| `BR-DOC-004` | Replacing, redacting, removing, or reclassifying evidence must preserve authorization, reason, history, and retention duties. | Proposed |
| `BR-DOC-005` | Generated documents must identify organization, document type, revision/status, business context, and generation time. | Proposed |
| `BR-DOC-006` | Creating or delivering a document must not itself prove customer approval, work acceptance, or external payment settlement. | Proposed |

## Project and handover

| ID | Rule | Status |
| --- | --- | --- |
| `BR-PROJECT-001` | A project baseline must identify accepted scope, sites/areas, units as known, milestones, dependencies, responsibilities, and commercial reference. | Proposed |
| `BR-PROJECT-002` | Project coordination must not replace work-order, visit, equipment, material, proposal, approval, or evidence history. | Proposed |
| `BR-PROJECT-003` | A project change must identify baseline impact, proposer, decision, approved scope, schedule/resource impact, and resulting work. | Proposed |
| `BR-PROJECT-004` | Partial handover must identify exactly which sites, units, scope, tests, documents, and outstanding items were accepted. | Proposed |
| `BR-PROJECT-005` | Final project completion must not silently close unresolved punch-list, warranty, retention, payment-evidence, or follow-up obligations. | Proposed |

## External payment evidence

| ID | Rule | Status |
| --- | --- | --- |
| `BR-PAYEVID-001` | The platform records external payment evidence but does not process the payment. | Owner-stated |
| `BR-PAYEVID-002` | When tenant policy requires a receipt photo, paid status cannot be recorded without one. | Owner-stated |
| `BR-PAYEVID-003` | Evidence submission and payment verification are separate states when verification is enabled. | Proposed |
| `BR-PAYEVID-004` | Payment evidence replacement or removal after job closure requires authorization and audit history. | Proposed |
| `BR-PAYEVID-005` | Full, partial, pending, credit, rejected-evidence, adjustment, and refund meanings must remain distinguishable. | Proposed |
| `BR-PAYEVID-006` | The displayed MMQR identity must belong to the intended organization or branch configuration effective for the obligation. | Proposed |
| `BR-PAYEVID-007` | Payment-evidence verification confirms evidence consistency under tenant policy; it must not claim provider settlement without an accepted integration. | Proposed |
| `BR-PAYEVID-008` | Duplicate, mismatched, unreadable, replaced, or disputed evidence must retain its review and correction history. | Proposed |
| `BR-PAYEVID-009` | Offline capture may preserve a pending payment claim but must not bypass required evidence or verification when synchronized. | Proposed |

## Notifications and communication

| ID | Rule | Status |
| --- | --- | --- |
| `BR-NOTIFY-001` | A notification must identify organization, purpose, intended recipient/context, channel, template/version, triggering event, and delivery state when tracked. | Proposed |
| `BR-NOTIFY-002` | Notification policy must respect authorization, communication preference, consent, privacy, and quiet-period rules where applicable. | Proposed |
| `BR-NOTIFY-003` | Failed, delayed, duplicated, or retried delivery must not silently change the underlying business state. | Proposed |
| `BR-NOTIFY-004` | Sensitive links or content must not disclose tenant or customer data to an unauthenticated or incorrectly scoped recipient. | Proposed |

## Reporting and management

| ID | Rule | Status |
| --- | --- | --- |
| `BR-REPORT-001` | Reports and dashboards must derive from authorized operational records and must not become an independent editable source of truth. | Proposed |
| `BR-REPORT-002` | Every measure must have an accepted definition, time basis, tenant/branch scope, inclusion rules, and treatment of cancelled, reopened, incomplete, and corrected records. | Proposed |
| `BR-REPORT-003` | Management summaries must preserve the viewer's organization, branch, role, and record scope. | Proposed |
| `BR-REPORT-004` | Correction of a report discrepancy must occur in the authoritative record or accepted derivation rule and remain attributable. | Proposed |
| `BR-REPORT-005` | Cross-tenant analytics are prohibited unless a separately accepted privacy, aggregation, and anonymization model authorizes them. | Proposed |

## Import, export, and integration

| ID | Rule | Status |
| --- | --- | --- |
| `BR-INTEGRATE-001` | Every import, export, or integration operation must identify organization, actor/system, purpose, source/destination, mapping/version, time, and outcome. | Proposed |
| `BR-INTEGRATE-002` | Imported facts must retain source and must not be relabeled as tenant-verified or tenant-performed without controlled verification. | Proposed |
| `BR-INTEGRATE-003` | External identifiers must be scoped to their source and organization and must not grant authorization. | Proposed |
| `BR-INTEGRATE-004` | Retry, duplicate delivery, partial failure, and reconciliation must not create duplicate business effects. | Proposed |
| `BR-INTEGRATE-005` | Export and integration scope must apply the same tenant, branch, role, record, privacy, and evidence restrictions as interactive access. | Proposed |

## Offline and synchronization

| ID | Rule | Status |
| --- | --- | --- |
| `BR-OFFLINE-001` | Offline availability must be limited to authorized tenant-scoped work and data needed for the permitted field purpose. | Proposed |
| `BR-OFFLINE-002` | Synchronized changes must satisfy the same validation, authorization, evidence, and audit rules as online changes. | Proposed |
| `BR-OFFLINE-003` | Conflicting assignment, approval, scope, evidence, stock, and closure changes must fail safely or require explicit resolution according to accepted policy. | Proposed |
| `BR-OFFLINE-004` | Synchronization retry must not duplicate activities, evidence, stock movements, payment claims, approvals, or notifications. | Proposed |
| `BR-OFFLINE-005` | Revoked access, tenant mismatch, expired assignment, or stale policy must prevent unauthorized synchronization while preserving recoverable user evidence for controlled resolution. | Proposed |

## Data lifecycle and privacy

| ID | Rule | Status |
| --- | --- | --- |
| `BR-DATA-001` | Retention, archive, export, anonymization, deletion, and legal-hold treatment must be defined by business-record and evidence class. | Proposed |
| `BR-DATA-002` | Ordinary deletion must not remove records needed for active work, contractual obligations, custody, warranty, dispute, audit, or legal hold. | Proposed |
| `BR-DATA-003` | Anonymization or deletion must preserve the minimum non-personal operational and audit meaning required by accepted policy. | Proposed |
| `BR-DATA-004` | Customer correction or export requests must be authorized, scoped, attributable, and must not expose another tenant or unrelated party. | Proposed |
| `BR-DATA-005` | Test, log, analytics, support, and export data must minimize unnecessary personal and sensitive information. | Proposed |

## Audit and history

| ID | Rule | Status |
| --- | --- | --- |
| `BR-AUD-001` | Significant status, assignment, scope, approval, financial-evidence, warranty, and stock changes must be attributable. | Proposed |
| `BR-AUD-002` | Corrections must not erase the historical fact that an earlier value or decision existed. | Proposed |
| `BR-AUD-003` | Platform-support access to tenant data must be exceptional and auditable. | Proposed |
| `BR-AUD-004` | Automated and system-generated actions must identify the initiating rule, schedule, integration, or platform actor. | Proposed |
| `BR-AUD-005` | Audit evidence must identify organization, actor, effective authority, action, subject, prior/new business meaning when relevant, time, reason, and source. | Proposed |
| `BR-AUD-006` | Audit evidence must be protected from ordinary tenant editing and from cross-tenant access. | Proposed |
| `BR-AUD-007` | Failed authorization, controlled override, support session, export, evidence change, reopening, merge, reversal, and deletion action must be auditable according to risk policy. | Proposed |
| `BR-AUD-008` | Audit retention and privileged audit access must follow separately accepted security, privacy, and legal policy. | Proposed |

## WP-05 rule acceptance criteria

The business-rule register is ready for owner review when:

- every rule has a stable ID, normative statement, and explicit status;
- owner-stated payment, crew, dynamic-scope, equipment-history, tenant, delivery, and management
  constraints remain preserved;
- organization, customer/site/equipment, request, scheduling, crew, work, commercial, inventory,
  procurement, contract, warranty, evidence, project, payment, notification, reporting,
  integration, offline, lifecycle, and audit behavior are governed;
- configurable behavior cannot weaken tenant isolation, authorization, history, evidence, or audit;
- failure and unresolved states cannot masquerade as successful completion;
- open policy and measurable-target questions remain visible;
- no implementation technology or architecture is selected.
