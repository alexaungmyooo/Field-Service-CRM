# Domain Model

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted conceptual baseline — proposed and open items retain their recorded status |
| Work package | `WP-04 Business Capabilities and Domain Model` |
| Last updated | 2026-09-30 |

## Purpose

Define the business language, ownership, relationships, and truths that future requirements and
architecture must preserve. These concepts are not database-table specifications.

The model uses business concepts, not implementation entities. A concept may later span several
technical components, and several related concepts may share one implementation boundary. WP-04
does not make that architecture decision.

## Modeling conventions

- **Identity** answers which continuing business thing a record represents.
- **Relationship** answers how two concepts are connected for a purpose and period.
- **Authority** answers who may make or approve a business decision.
- **Provenance** answers who supplied information, from which source, when, and with what confidence.
- **Lifecycle** answers which business states and transitions remain meaningful over time.
- **History** preserves prior facts, decisions, actors, and corrections rather than overwriting them
  without evidence.
- **Ownership** identifies the organization or platform boundary controlling a record; it does not
  necessarily mean legal ownership of the physical object described.

## Domain truths

1. An organization is an independent operational and data-ownership boundary.
2. A customer may have multiple contacts, sites, and equipment units.
3. Equipment belongs in the customer's operational context, not to the installing service provider.
4. Installation, inspection, service, repair, relocation, and warranty work are lifecycle events.
5. A service request may begin without a known diagnosis, final scope, price, or equipment identity.
6. A work order may cover multiple equipment units and multiple work activities.
7. A crew may contain multiple workers and one responsible leader.
8. Proposed work, approved work, performed work, and verified outcome are distinct facts.
9. Customer-reported history is not the same as tenant-verified work history.
10. External payment evidence is not proof that the platform processed or settled a payment.
11. Closing a job does not erase unresolved follow-up, warranty, payment, or dispute obligations.
12. Significant business changes must remain attributable and auditable.
13. A customer account, contact, site, equipment owner, payer, approver, and person present at a
    visit may represent different parties.
14. Planned assignment and actual participation are separate facts.
15. One work order may coordinate several visits and equipment units while each unit retains its
    own work items, tests, evidence, and outcomes.
16. A proposal decision applies to one exact revision and does not authorize later changed scope.
17. Evidence inherits tenant ownership and sensitivity from the business context it supports.
18. Stock balance is derived from attributable stock movements; correction does not erase the
    transactions that produced an earlier balance.
19. Reports and dashboards derive meaning from operational records and do not become competing
    sources of truth.
20. An unresolved outcome requires a disposition, responsible owner, or explicit accepted closure
    reason.

## Organization concepts

- **Platform:** trusted SaaS boundary.
- **Organization/Tenant:** independent service provider and data boundary.
- **Branch:** optional operating subdivision.
- **User:** authenticated human identity.
- **Membership:** user's relationship, roles, and scope within an organization.
- **Employee/Worker:** person participating in the tenant's operation.
- **Team:** continuing organizational grouping.
- **Crew:** workers assigned together for a job or period.
- **Crew Leader:** accountable field participant for a crew assignment.
- **Delivery Profile:** organization-approved domains, brand assets, application identities,
  capabilities, and release configuration.
- **Domain Mapping:** verified association between a host name and an organization delivery profile.
- **Branded Application:** tenant-configured customer or technician application artifact produced
  from the shared product codebase.
- **Distribution Identity:** stable store or platform identifier for a branded application.
- **Platform Role Assignment:** authority to perform identified platform-level operations; it does
  not create organization membership.
- **Support Case:** platform-controlled record of a tenant assistance or incident need.
- **Support Session:** explicit, scoped, temporary, auditable access into one organization for a
  permitted support purpose.

User identity and worker records are related but not necessarily identical. A helper may be recorded
as a worker before receiving a user account.

## Customer and equipment concepts

- **Party:** a person, household, organization, or other identified participant that may hold a
  relationship role.
- **Customer Account:** residential person, household, business, or corporate account receiving service.
- **Contact:** person and communication details associated with a customer or site.
- **Customer Relationship Role:** time-bounded role such as requester, payer, approver, equipment
  owner, tenant/occupant, site contact, facilities manager, or person present.
- **Service Site:** physical place where equipment or service activity exists.
- **Equipment:** identifiable serviced asset such as an air-conditioning unit.
- **Equipment Component:** optional child component such as indoor unit, outdoor unit, or compressor.
- **Equipment Identity Claim:** serial, label, photo, location, customer statement, prior document,
  or technician observation used to identify or reconcile equipment.
- **Equipment Relationship:** time-bounded ownership, custody, location, contract coverage, or
  service authorization involving equipment and another party or site.
- **Equipment Provenance:** source and confidence of identity or historical information.
- **Lifecycle Event:** installation, movement, inspection, service, repair, replacement, or disposition.
- **Warranty Coverage:** responsibility and terms tied to equipment, work, or a supplied part.

## Service-operation concepts

- **Service Request:** customer's reported need or internally generated maintenance need.
- **Triage:** urgency, initial classification, and scheduling readiness assessment.
- **Appointment:** intended time window for a visit.
- **Work Order:** controlled body of authorized operational work.
- **Visit:** a crew's attendance at a site for a work order.
- **Assignment:** responsibility granted to a crew, leader, workers, vehicle, or branch.
- **Inspection:** observed conditions and measurements.
- **Diagnosis:** professional conclusion about a problem or required action.
- **Proposal:** services, materials, quantities, prices, and conditions offered for approval.
- **Proposal Revision:** immutable version of a proposal presented for internal or customer decision.
- **Approval:** attributable internal or customer decision about proposed work.
- **Work Item:** one service, material, equipment, charge, or other scope line as proposed,
  approved, performed, declined, or unresolved.
- **Service Activity:** cleaning, refill, repair, installation, testing, or other performed work.
- **Material Usage:** reserved, issued, consumed, returned, damaged, or replaced item movement.
- **Test Result:** evidence that equipment or work met an expected outcome.
- **Job Outcome:** completed, partial, unresolved, declined, follow-up, workshop, replacement, or other conclusion.
- **Disposition:** controlled treatment and responsible next action for incomplete, failed,
  blocked, unsafe, disputed, or otherwise unresolved work.
- **Follow-up:** controlled later action linked to the originating need and work.

## Commercial and control concepts

- **Service Catalog Item:** reusable description of a service or charge.
- **Price List:** tenant or branch pricing context.
- **Quotation:** versioned commercial proposal.
- **Discount:** authorized reduction with reason and actor.
- **Service Contract:** agreement covering equipment, locations, work, schedule, and commitments.
- **Service Commitment:** response, attendance, resolution, or visit obligation.
- **Commercial Obligation:** amount or non-monetary commitment claimed to be due under approved
  work, contract, deposit, milestone, adjustment, or credit terms.
- **External Payment Claim:** assertion that a customer paid some or all of a commercial obligation
  outside the platform.
- **External Payment Evidence:** photo and metadata supporting a payment claim.
- **Payment Verification:** authorized decision that evidence reconciles with an external record.
- **Complaint:** customer-reported dissatisfaction or claimed defect.
- **Rework:** corrective work linked to earlier work.
- **Audit Event:** immutable attribution of a significant action or state change.

## Inventory concepts

- **Item:** service part, material, consumable, tool, or sellable equipment definition.
- **Serialized Item:** individually identified equipment or part.
- **Stock Location:** warehouse, branch, vehicle, crew, or other controlled holding point.
- **Stock Balance:** derived quantity for an item and stock location.
- **Stock Transaction:** receipt, reservation, issue, consumption, return, transfer, adjustment, or damage.
- **Material Request:** demand created before or during work.
- **Supplier:** external source of items or subcontracted work.
- **Custody Handoff:** attributable transfer of physical responsibility for equipment, components,
  serialized stock, or customer property.

## Project, communication, and evidence concepts

- **Project:** coordinated commercial and operational context for multiple sites, units, phases,
  milestones, crews, materials, changes, or handovers.
- **Project Baseline:** accepted scope, quantity, schedule, commercial, and responsibility reference
  against which changes and progress are compared.
- **Phase/Milestone:** planned grouping or measurable project point with dependencies and acceptance.
- **Change Request:** proposed change to an accepted project or work baseline with impact and
  decision history.
- **Punch-List Item:** specific incomplete, defective, or verification item remaining before or
  after partial handover.
- **Communication Record:** attributable operational or customer communication, delivery attempt,
  and result.
- **Notification:** policy-driven message or reminder generated for a defined purpose and recipient.
- **Evidence Item:** photo, file, signature, measurement, scan, or other captured support for a
  business fact or decision.
- **Business Document:** versioned human-readable artifact such as quotation, service report,
  handover, warranty record, or export.
- **Customer Access Grant:** controlled authority for an identified customer user to view or act for
  a customer account, site, equipment set, or approval responsibility.

## Important relationships

```text
Organization owns Branches, Memberships, Configurations, and tenant business records.
User Identity receives organization authority only through Membership.
Worker may link to User Identity but keeps independent employment/participation history.
Customer Account has time-bounded relationships to Parties, Contacts, and Service Sites.
Equipment has time-bounded ownership, custody, location, and service-authorization relationships.
Equipment has Lifecycle Events and may appear in many Work Orders.
Service Request may create one or more Work Orders.
Work Order may have one or more Visits.
Visit has planned Assignments and actual participating Workers.
Work Order and Visit reference Equipment, Work Items, Activities, Materials, Evidence, and Outcomes.
Proposal contains proposed Work Items; Approval references one exact Proposal Revision.
Performed Work Items reference Approval when approval was required.
Material Usage references Work Context and Stock Transactions when inventory is enabled.
Warranty references responsible Work, supplied Part, Provider, Coverage, and Term.
Complaint and Rework reference originating Work Orders and Equipment.
External Payment Claim references the Commercial Obligation it claims to satisfy.
Payment Evidence supports a Payment Claim; Verification records a review decision, not settlement.
Project coordinates Work Orders, Visits, Equipment, Materials, Changes, and Handovers.
Evidence Item belongs to an Organization and inherits access context from its subject.
```

## Relationship rules

1. Relationship roles are explicit and time-bounded where they can change. Historical work retains
   the relationship context that applied when the event occurred.
2. A customer account may represent a household, person, business, or corporate service
   relationship; this does not force every related contact to become the same legal party.
3. Equipment location may change. A service site relationship must preserve effective timing and
   movement provenance rather than rewriting all prior history.
4. The organization performing work, original installer, equipment owner, warrantor, supplier,
   payer, and approver may all differ.
5. A service request describes need; work order describes controlled work; visit describes one
   attendance; work item describes scope; activity describes actual performance.
6. An appointment plans time. Assignment plans responsibility. Participation records who actually
   worked. None substitutes for the others.
7. Customer approval applies to the exact proposal revision and item set recorded by the decision.
8. A work-order outcome summarizes work but does not replace per-equipment and per-item outcomes.
9. A follow-up creates a continuing obligation linked to origin; it must not copy stale approval.
10. Evidence may support many business facts only through explicit relationships and authorized
    access; a shared file reference does not merge tenant ownership.
11. An item describes something stocked, supplied, or consumed; equipment describes a physical
    asset in a service lifecycle. A serialized stocked unit may become or reference equipment when
    supplied/installed, while customer-supplied equipment may never be tenant stock.
12. A service catalog item describes reusable offered scope; a work item records scope for one
    specific business context; a service activity records what was actually done.

## Identity and provenance

### Stable identity

- Organization identity survives name, domain, branch, subscription, and brand changes.
- Customer identity survives contact-detail and relationship changes.
- Site identity survives address corrections while moves or materially different locations require
  an explicit decision.
- Equipment identity survives service, relocation, repair, component replacement, and provider
  changes unless authorized reconciliation determines records represented different physical units.
- Work, proposal revision, approval, stock transaction, evidence, and audit identities are not
  reused after cancellation or correction.

### Provenance classes

| Provenance | Meaning |
| --- | --- |
| Tenant-performed | The current organization performed and recorded the activity |
| Technician-observed | An authorized worker directly observed the condition or identifier |
| Customer-reported | A customer or site representative supplied the information |
| Document-derived | Information was interpreted from an identified document or image |
| Imported | Information came from an identified external source or migration |
| Provider-reported | Another service provider, supplier, or manufacturer supplied the information |
| System-derived | The value is calculated from governed source records and derivation rules |

Provenance does not automatically establish correctness. Confidence, verification status,
conflicting claims, and later reconciliation may be recorded without deleting the original source.

## Conceptual lifecycle distinctions

| Concern | States or distinctions that must remain meaningful |
| --- | --- |
| Membership | Invited, active, limited/suspended, revoked; historical actions remain attributable |
| Service request | Captured, triaged, awaiting action, converted, declined, duplicate, cancelled, closed |
| Work order | Draft, ready, scheduled, active, paused/blocked, outcome recorded, closed, cancelled, reopened |
| Visit | Planned, dispatched, travelling, arrived, in progress, paused, completed, aborted, no access |
| Proposal revision | Draft, internally pending/approved, customer pending, approved, partially approved, rejected, expired, withdrawn, superseded |
| Work item | Proposed, approved, declined, performed, not performed, tested, failed, unresolved |
| Follow-up | Open, waiting on dependency, ready, scheduled, completed, declined, cancelled, superseded |
| Warranty claim | Reported, assessing, accepted, denied, pending third party, resolved, disputed |
| Stock transaction | Recorded business movement with reversal/correction linkage; not mutable lifecycle balance |
| Payment claim/evidence | Required, pending, submitted, verified, rejected, replacement requested, disputed, corrected |
| Project | Proposed, approved, active, on hold, partially handed over, completed, cancelled, retained |

These are conceptual meanings, not a final status-code list. Requirements may standardize or
configure labels while preserving the distinctions accepted by the workflow model.

## Business-record responsibility map

| Responsibility | Authoritative concepts | Coordinating capability |
| --- | --- | --- |
| Organization authority | Organization, branch, membership, worker, role/scope, support session | `CAP-ORG`, `CAP-IAM`, `CAP-PLATFORM` |
| Customer relationship | Party, customer account, contact, relationship role, communication | `CAP-CRM`, `CAP-CX` |
| Location and equipment | Service site, equipment, component, identity claim, relationship, lifecycle event | `CAP-SITE`, `CAP-ASSET` |
| Intake and field work | Service request, triage, work order, visit, inspection, diagnosis, work item, activity, test, outcome, disposition | `CAP-REQUEST`, `CAP-WO`, `CAP-FIELD` |
| Workforce coordination | Worker, skill, team, crew, appointment, assignment, participation | `CAP-CREW`, `CAP-SCHED` |
| Commercial decision | Catalog item, price list, proposal revision, approval, discount, obligation | `CAP-COMM` |
| Contract and quality | Contract, commitment, warranty, complaint, rework, follow-up | `CAP-CONTRACT`, `CAP-WARRANTY` |
| Materials and supply | Item, serialized item, stock location, stock transaction, material request, supplier, custody handoff | `CAP-INV`, `CAP-PROC` |
| Project coordination | Project, baseline, phase, milestone, change request, punch list, handover | `CAP-PROJECT` |
| External payment evidence | Payment claim, receipt evidence, verification, discrepancy, correction | `CAP-PAYEVID` |
| Evidence and control | Evidence item, business document, audit event, report/derived measure | `CAP-DOC`, `CAP-AUDIT`, `CAP-REPORT` |
| Delivery and exchange | Delivery profile, domain mapping, branded application, distribution identity, import/export mapping | `CAP-DELIVERY`, `CAP-INTEGRATE` |

This map assigns business responsibility, not technical service ownership.

## Domain invariants

1. Every tenant-owned operational concept has one authoritative organization boundary.
2. Tenant-owned identity cannot be reassigned to another organization through an ordinary edit.
3. Platform role assignment does not imply organization membership.
4. Removing access does not delete historical work, participation, approval, or audit attribution.
5. Customer, contact, site, equipment, payer, approver, and requester identities remain separately
   representable.
6. Equipment registration never requires the current tenant to be its installer.
7. Conflicting equipment identity claims remain traceable until controlled reconciliation.
8. Customer-reported or imported history is not relabeled as tenant-performed history.
9. Planned crew assignment and actual participation remain separately attributable.
10. Approved, declined, performed, unperformed, tested, and failed work scope remain distinguishable.
11. Later proposal revisions do not change what an earlier approval authorized.
12. Closing a visit does not close unresolved follow-up, warranty, complaint, custody, payment, or
    project obligations automatically.
13. Work on several units may have different per-unit outcomes under one visit/order.
14. Stock balance changes only through attributable business movements or controlled correction.
15. Cross-tenant stock movement and tenant-record linking are prohibited by default.
16. Evidence access never becomes broader than the authorized context of the fact it supports.
17. Required receipt-photo policy blocks paid status when evidence is absent.
18. Payment verification does not claim that the platform settled funds.
19. Reports and dashboards cannot silently correct operational records.
20. Cancellation, merge, correction, reopening, reversal, and anonymization preserve required
    historical meaning and authority.

## Workflow trace examples

| Scenario | Primary concepts |
| --- | --- |
| Unknown air conditioner serviced by a new provider (`WF-001`, `WF-002`) | Customer account, site, equipment identity claim, provenance, request, work order |
| Dynamic repair with partial approval (`WF-004`, `WF-015`) | Inspection, diagnosis, proposal revision, approval by item, activity, test, disposition |
| Multi-worker field visit (`WF-013`, `WF-016`) | Appointment, assignment, crew leader, planned workers, actual participation, outcome |
| New installation (`WF-006`) | Survey, proposal, supplied equipment, equipment identity, installation lifecycle event, commissioning |
| Workshop repair (`WF-012`) | Equipment/component, custody handoff, diagnosis, proposal revision, workshop activity, return |
| External MMQR evidence (`WF-017`) | Commercial obligation, external payment claim, receipt evidence, verification decision |
| Multi-site project (`WF-020`) | Project baseline, site/unit structure, work orders, visits, materials, changes, milestones, handovers |

## Open modeling questions

- `OPEN-022`: duplicate detection, merge, and controlled separation.
- `OPEN-023`: equipment identity without reliable unique serial numbers.
- `OPEN-024`: contact identity shared across customer accounts.
- `OPEN-025`: changing equipment ownership, custody, payer, and service authorization.
- `OPEN-026`: air-conditioning specialization versus configurable shared reference data.
- `OPEN-027`: costing, margin, tax, job-cost, and accounting boundary.
- `OPEN-028`: retention, archival, export, anonymization, and deletion by record class.
- `OPEN-029`: subcontractor relationship and authority.
- `OPEN-030`: customer identity and delegated access.

## Domain boundaries

Candidate business domains are:

- Organization and identity
- Customer and site
- Equipment lifecycle
- Service intake and work management
- Workforce, scheduling, and dispatch
- Commercial proposal and customer approval
- Contracts and warranty
- Inventory and procurement
- Projects and handover
- Documents and evidence
- External payment evidence
- Customer self-service and communication
- Reporting and audit
- Platform operations
- Tenant delivery and application distribution

These are responsibility groupings, not accepted technical services or database boundaries. Final
architecture boundaries require later solution-architecture review.

## WP-04 domain acceptance criteria

The conceptual domain model is ready for owner review when:

- shared business terms are defined independently from tables, screens, and services;
- organization, customer, site, equipment, work, commercial, workforce, inventory, project,
  evidence, payment, and delivery concepts are covered;
- identity, relationship, authority, provenance, lifecycle, history, and ownership are explicit;
- installer, service provider, owner, payer, approver, site contact, and requester may differ;
- request, work order, visit, assignment, participation, work item, activity, outcome, disposition,
  and follow-up meanings remain distinct;
- important relationship and lifecycle distinctions are visible;
- capability responsibility and workflow examples are traceable;
- domain invariants protect tenant isolation, historical attribution, per-unit outcomes, inventory,
  evidence, and external payment meaning;
- unresolved domain questions remain visible;
- no schema, API, service, architecture, or application technology is selected.
