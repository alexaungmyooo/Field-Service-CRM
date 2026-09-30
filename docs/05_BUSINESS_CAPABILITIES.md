# Business Capabilities

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted capability baseline — proposed and open items retain their recorded status |
| Work package | `WP-04 Business Capabilities and Domain Model` |
| Last updated | 2026-09-30 |

## Purpose

Capabilities describe what the product enables independently from a specific screen, workflow
layout, database, or technology.

A capability is a durable business responsibility. It is not a menu item, application, team,
subscription tier, service, database, or implementation milestone. Several product surfaces may use
one capability, and one workflow may coordinate several capabilities.

## Capability map

| ID | Capability | Scope summary |
| --- | --- | --- |
| `CAP-ORG` | Organization administration | Tenants, branches, memberships, teams, configuration, branding, and lifecycle |
| `CAP-IAM` | Identity and access | Authentication boundary, roles, permissions, scope, support access, and audit |
| `CAP-CRM` | Customer relationship management | Customers, contacts, communication context, preferences, and history |
| `CAP-SITE` | Customer sites | Locations, access instructions, landmarks, contacts, and operating constraints |
| `CAP-ASSET` | Equipment lifecycle | Identity, attributes, location, provenance, service history, movement, and status |
| `CAP-REQUEST` | Service intake | Requests, reported problems, urgency, attachments, triage, and duplication control |
| `CAP-SCHED` | Scheduling and dispatch | Appointments, capacity, conflicts, crews, vehicles, reassignment, and status |
| `CAP-CREW` | Workforce and crew operations | Workers, skills, leaders, participation, attendance, labour, and responsibility |
| `CAP-WO` | Work-order management | Visits, inspections, diagnosis, dynamic scope, activities, outcomes, and follow-up |
| `CAP-FIELD` | Field execution | Mobile work, offline capture, checklists, photos, notes, signatures, and testing |
| `CAP-COMM` | Commercial proposal and approval | Service catalog, prices, quotations, revisions, discounts, and acceptance |
| `CAP-CONTRACT` | Contracts and preventive maintenance | Coverage, included work, recurring schedules, commitments, renewal, and exceptions |
| `CAP-WARRANTY` | Warranty, complaint, and rework | Coverage, responsibility, claims, linked rework, and repeat-problem analysis |
| `CAP-INV` | Inventory and material control | Items, stock locations, reservation, issue, use, return, transfer, and adjustment |
| `CAP-PROC` | Purchasing and suppliers | Material requests, suppliers, purchase flow, receipt, and job linkage |
| `CAP-PROJECT` | Large-project operations | Phases, many units, crews, materials, progress, changes, and handover |
| `CAP-DOC` | Documents and evidence | Templates, photos, files, reports, evidence policy, access, and retention |
| `CAP-PAYEVID` | External payment evidence | MMQR display, receipt evidence, verification, partial payment, and audit |
| `CAP-NOTIFY` | Communication and notifications | Operational alerts, reminders, customer updates, and delivery status |
| `CAP-REPORT` | Reporting and analytics | Operational, service, workforce, inventory, contract, and management insights |
| `CAP-INTEGRATE` | Import, export, and integrations | Controlled exchange with accounting, messaging, mapping, and other systems |
| `CAP-AUDIT` | Audit and operational control | Attributable changes, approvals, reopening, support access, and investigations |
| `CAP-PLATFORM` | Platform operations | Tenant lifecycle, configuration safety, monitoring, backup, recovery, and support |
| `CAP-DELIVERY` | Tenant delivery and white-label applications | Product subdomains, verified custom domains, brand profiles, customer/technician app builds, distribution, versions, and release parity |
| `CAP-CX` | Customer self-service and engagement | Customer requests, appointment visibility, approvals, documents, equipment visibility, reminders, and controlled delegation |

## Capability responsibility catalogue

### Platform, organization, identity, and delivery

| ID | Owned business responsibility | Boundary / explicitly not owned | Primary workflow trace |
| --- | --- | --- | --- |
| `CAP-ORG` | Organization identity, lifecycle, branches, memberships, workers, teams, organization configuration, and operating scope | Does not grant authentication or define platform-support access by itself | All tenant workflows; especially `WF-013`, `WF-018`, and `WF-020` |
| `CAP-IAM` | Authenticated identity context, membership authority, roles, permissions, branch/record scope, separation of duties, and controlled support access | Does not own tenant business records or infer authority from branding, job title, or client visibility | Applies to `WF-001` through `WF-020` |
| `CAP-PLATFORM` | Tenant provisioning and lifecycle controls, platform policy, operational health, support cases, backup/recovery responsibility, and controlled platform administration | Does not make platform staff ordinary tenant members or owners of tenant data | Organization lifecycle and controlled support; cross-cutting |
| `CAP-DELIVERY` | Tenant delivery profiles, product/custom domains, brand configuration, application identities, compatible releases, and distribution governance | Does not create tenant authorization, separate product forks, or tenant-owned source code | Cross-cutting delivery of admin, management, technician, and customer experiences |
| `CAP-AUDIT` | Attributable history for significant actions, approvals, corrections, support access, reopening, and investigations | Does not replace the authoritative business record or permit silent historical rewriting | Applies to every workflow; especially `WF-011`, `WF-016`, `WF-017`, and `WF-018` |

### Customer, site, equipment, and engagement

| ID | Owned business responsibility | Boundary / explicitly not owned | Primary workflow trace |
| --- | --- | --- | --- |
| `CAP-CRM` | Customer accounts, contacts, relationship roles, communication context, preferences, history, and duplicate governance | Does not assume customer, contact, payer, approver, equipment owner, and site contact are the same party | `WF-001`, `WF-002`, `WF-011`, and `WF-019` |
| `CAP-SITE` | Service locations, address/landmark context, access instructions, operating constraints, site contacts, and site history | Does not own equipment identity or work execution merely because work occurs at the site | `WF-001`, `WF-002`, `WF-006` through `WF-009`, and `WF-020` |
| `CAP-ASSET` | Equipment identity, components, provenance, current service context, location history, condition, and lifecycle events | Does not imply the servicing organization installed, owns, or knows the full history of equipment | `WF-001`, `WF-003` through `WF-007`, `WF-010`, `WF-012`, and `WF-020` |
| `CAP-CX` | Controlled customer requests, appointments, approvals, progress, documents, equipment views, reminders, and delegated access | Does not replace tenant authorization, office control, or the customer's relationship to the servicing organization | `WF-002`, `WF-006`, `WF-008`, `WF-011`, `WF-015` through `WF-019` |
| `CAP-NOTIFY` | Policy-driven operational/customer messages, reminders, escalation, delivery status, and communication evidence | Does not make message delivery proof of approval, attendance, payment, or completed work | `WF-002`, `WF-008`, `WF-009`, `WF-013`, `WF-018`, and `WF-019` |

### Service intake, coordination, and field execution

| ID | Owned business responsibility | Boundary / explicitly not owned | Primary workflow trace |
| --- | --- | --- | --- |
| `CAP-REQUEST` | Intake source, reported need, triage, urgency, duplication, scheduling readiness, and conversion or disposition | Does not require final diagnosis, price, equipment identity, or work authorization at capture | `WF-002`, `WF-009`, `WF-010`, and `WF-011` |
| `CAP-SCHED` | Appointments, capacity, dispatch, travel/arrival events, conflicts, rescheduling, and resource coordination | Does not prove actual participation or completed work | `WF-008`, `WF-009`, `WF-013`, `WF-018`, `WF-019`, and `WF-020` |
| `CAP-CREW` | Workers, skills, teams, ad-hoc crews, leaders, planned assignments, actual participation, and labour responsibility | Does not make every worker a user or treat planned assignment as proof of attendance | `WF-002` through `WF-013`, `WF-016`, and `WF-020` |
| `CAP-WO` | Work orders, visits, inspection, diagnosis, work items, dynamic scope, performance, outcomes, dispositions, reopening, and follow-up linkage | Does not own customer identity, stock truth, external payment settlement, or proposal pricing policy | `WF-002` through `WF-012`, `WF-016`, `WF-018`, and `WF-019` |
| `CAP-FIELD` | Technician/crew execution context, offline-capable capture, checklists, readings, notes, photos, signatures, tests, and handover evidence | Does not decide commercial authority or turn captured evidence into automatic approval | `WF-002` through `WF-013`, `WF-016`, `WF-017`, and `WF-020` |

### Commercial, contracts, warranty, projects, and payment evidence

| ID | Owned business responsibility | Boundary / explicitly not owned | Primary workflow trace |
| --- | --- | --- | --- |
| `CAP-COMM` | Service catalog, price context, proposals, revisions, discounts, internal decisions, customer approval, and commercial exceptions | Does not silently authorize changed field scope or define statutory accounting documents | `WF-002`, `WF-004` through `WF-007`, `WF-015`, and `WF-020` |
| `CAP-CONTRACT` | Service agreements, covered customers/sites/equipment, included work, visit obligations, commitments, exceptions, renewal, and expiry | Does not make uncovered findings included or define commitment clocks without accepted policy | `WF-008`, `WF-009`, `WF-018`, and `WF-019` |
| `CAP-WARRANTY` | Warranty coverage, responsible provider, claims, complaints, investigations, rework, recovery, and repeat-problem analysis | Does not assume the current tenant is the warrantor or erase original work evidence | `WF-004`, `WF-010`, `WF-011`, and `WF-019` |
| `CAP-PROJECT` | Project baseline, sites/zones, phases, milestones, dependencies, progress, changes, punch lists, and staged handover | Does not replace equipment-level work history, proposals, stock transactions, or individual visits | `WF-006`, `WF-007`, `WF-014` through `WF-016`, and `WF-020` |
| `CAP-PAYEVID` | External payment claims, approved MMQR display, receipt evidence, submission, verification, discrepancy, partial/pending/credit states, and correction history | Does not initiate, hold, process, settle, or independently confirm provider funds | `WF-002`, `WF-006`, `WF-016`, `WF-017`, and `WF-020` |

### Materials, evidence, reporting, and exchange

| ID | Owned business responsibility | Boundary / explicitly not owned | Primary workflow trace |
| --- | --- | --- | --- |
| `CAP-INV` | Items, serialized stock, stock locations, reservations, receipts, issues, consumption, returns, transfers, damage, adjustments, and derived balances | Does not permit cross-tenant movement or rewrite transaction history through balance editing | `WF-004` through `WF-007`, `WF-012`, `WF-014`, and `WF-020` |
| `CAP-PROC` | Material requests, supplier context, purchasing need, approval, ordering, receipt, and job/project linkage | Does not become full accounts payable, supplier accounting, or statutory procurement without later scope | `WF-004`, `WF-006`, `WF-012`, `WF-014`, and `WF-020` |
| `CAP-DOC` | Business documents, photos, files, signatures, generated service reports, evidence policy, sensitivity, retention class, and access inheritance | Does not own the business meaning of the work, approval, payment claim, or stock event it evidences | Applies to every workflow; especially `WF-006`, `WF-011`, `WF-012`, `WF-016`, and `WF-017` |
| `CAP-REPORT` | Role-aware operational summaries, exceptions, trends, service history, workforce, inventory, contracts, project progress, and management insights | Does not become an editable source of operational truth or bypass record-level authorization | Derived from every workflow and shown through management/admin surfaces |
| `CAP-INTEGRATE` | Governed import, export, mapping, synchronization, and exchange evidence for approved external systems | Does not transfer authority, weaken tenant isolation, or treat external data as trusted without provenance | Cross-cutting; especially customer/equipment import, notifications, accounting exchange, and reporting export |

## Capability interaction rules

1. `CAP-REQUEST` records a need; `CAP-WO` controls work created to address it.
2. `CAP-SCHED` plans attendance; `CAP-CREW` identifies assigned and actual people;
   `CAP-FIELD` captures execution.
3. `CAP-COMM` owns offered and approved commercial scope; `CAP-WO` owns performed work and
   outcomes.
4. `CAP-INV` owns stock movement truth; work and projects reference resulting transactions.
5. `CAP-DOC` controls evidence storage and access meaning; the originating capability owns the
   business decision evidenced.
6. `CAP-PAYEVID` records an external payment claim and review, not settlement.
7. `CAP-REPORT` and `CAP-AUDIT` observe governed business activity but do not replace its source.
8. `CAP-IAM` and `CAP-ORG` constrain every capability; no capability creates cross-tenant access.
9. `CAP-DELIVERY` changes how an experience is branded or distributed, not business ownership.
10. `CAP-INTEGRATE` preserves source, mapping, tenant, authority, and failure evidence for every
    exchange.

## Capability use by organization depth

| Concern | Small organization | Growing or enterprise organization |
| --- | --- | --- |
| Roles | One person may perform intake, dispatch, approval, and verification | Duties may be separated with thresholds and independent review |
| Branches | Root organization scope with branch features hidden | Branch, region, warehouse, and cross-branch governance |
| Workflow | Simple defaults and fewer mandatory reviews | Templates, approvals, contracts, quality gates, and exceptions |
| Inventory | Optional basic material recording | Reservations, multiple stock locations, procurement, and reconciliation |
| Customer delivery | Phone/message plus optional portal | Delegated customer users, approvals, documents, and multi-site views |
| Reporting | Daily workload, incomplete work, and payment evidence | Consolidated branch, contract, SLA, margin, project, and audit analysis |

The capability meaning stays the same. Configuration changes governance depth, not the definition
of the business fact.

## Capability principles

1. Capabilities may be enabled, simplified, or governed by tenant configuration, but platform
   security and data-integrity rules remain fixed.
2. A feature may support several capabilities; this does not merge their ownership.
3. Reporting does not become the authoritative owner of operational data.
4. Payment evidence does not become payment processing.
5. Equipment lifecycle does not imply that one tenant owns the physical equipment or its complete
   cross-provider history.
6. Mobile field execution and office administration are separate experiences over the same trusted
   business state.
7. Tenant branding and delivery identity do not create a separate product fork or authorization
   boundary.

## Capability maturity

Each capability will later receive one of these delivery dispositions:

- Foundation
- Standard
- Advanced
- Enterprise
- Deferred
- Excluded

Disposition affects delivery planning, not the correctness of the target domain model.

WP-04 does not assign those dispositions. Capability prioritization, packaging, and roadmap are
later gates.

## WP-04 capability acceptance criteria

The capability catalogue is ready for owner review when:

- each target capability has a stable identifier, owned responsibility, explicit boundary, and
  workflow trace;
- organization, identity, platform, and delivery responsibilities remain distinct;
- customer, site, equipment, request, scheduling, crew, work, field, commercial, inventory,
  contract, warranty, project, evidence, payment, reporting, and exchange responsibilities are
  covered;
- workflow coordination does not merge ownership of the underlying business facts;
- small and enterprise organizations use the same capability meanings with different governance
  depth;
- capability scope is independent from screens, services, subscriptions, and implementation order;
- no architecture or application technology is selected.
