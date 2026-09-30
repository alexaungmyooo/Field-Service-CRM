# Business Capabilities

## Document control

| Field | Value |
| --- | --- |
| Status | Draft |
| Work package | `WP-04 Business Capabilities and Domain Model` |
| Last updated | 2026-09-30 |

## Purpose

Capabilities describe what the product enables independently from a specific screen, workflow
layout, database, or technology.

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
