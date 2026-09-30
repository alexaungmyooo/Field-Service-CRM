# Field-Service Workflow Catalog

## Document control

| Field | Value |
| --- | --- |
| Status | Draft workflow hypotheses |
| Work package | `WP-03 Complete Workflow Catalogue` |
| Last updated | 2026-09-28 |

## Purpose

Define the normal paths, optional paths, decisions, exceptions, and outcomes the platform must be
able to represent. Workflows describe business behavior, not final screens or database tables.

## Common work-order lifecycle

```text
Request captured
  -> customer/site/equipment identified as far as known
  -> urgency and appointment needs recorded
  -> crew scheduled and dispatched
  -> crew arrives and inspects
  -> scope, services, parts, and price are proposed or revised
  -> customer approves all, part, or none
  -> approved work is performed
  -> equipment is tested and evidence captured
  -> completed, partially completed, unresolved, or follow-up outcome is recorded
  -> customer confirmation is captured when required
  -> external payment evidence or credit outcome is recorded
  -> work is closed or a controlled follow-up is created
```

No single job must traverse every step. Tenant policy and job template determine which steps are
mandatory, optional, or unavailable.

## Workflow register

| ID | Workflow | Primary outcome |
| --- | --- | --- |
| `WF-001` | Customer and equipment onboarding | Customer, site, contacts, and known equipment are identifiable. |
| `WF-002` | General service request | An uncertain customer need becomes controlled field work. |
| `WF-003` | Routine cleaning/service | Routine work and discovered issues are recorded per unit. |
| `WF-004` | Diagnosis and repair | A reported fault is diagnosed, approved, repaired, or given a controlled outcome. |
| `WF-005` | Gas/leakage work | Inspection, leak response, refill, quantity, and test results are attributable. |
| `WF-006` | New installation | Survey, quotation, material, installation, commissioning, asset creation, and warranty connect. |
| `WF-007` | Relocation/uninstallation | Equipment removal, movement, storage, reinstallation, and status remain traceable. |
| `WF-008` | Preventive-maintenance contract | Contract obligations generate and track planned visits. |
| `WF-009` | Emergency service | Priority assessment and dispatch override normal scheduling safely. |
| `WF-010` | Warranty service | Coverage and responsibility are determined for specific work or parts. |
| `WF-011` | Complaint and rework | A complaint links to original work and receives a controlled resolution. |
| `WF-012` | Workshop repair | Removed equipment or components remain traceable through return or disposition. |
| `WF-013` | Crew scheduling and dispatch | The responsible crew, leader, vehicle, time, and conflicts are controlled. |
| `WF-014` | Parts and inventory | Material demand, reservation, issue, use, return, damage, and replenishment are recorded. |
| `WF-015` | Quotation and approval | Proposed scope and price receive traceable internal and customer decisions. |
| `WF-016` | Completion and customer acceptance | Work, tests, evidence, outcome, and acknowledgment are preserved. |
| `WF-017` | External payment evidence | External payment proof is submitted and optionally verified without processing funds. |
| `WF-018` | Cancellation and rescheduling | Operational change retains reason, actor, history, and next action. |
| `WF-019` | Follow-up and recurring service | A completed or incomplete visit produces the correct next action. |
| `WF-020` | Large multi-site project | Many units, crews, dates, materials, milestones, and handovers remain coordinated. |

## WF-001 — Customer and equipment onboarding

### Entry paths

- New customer contacts the organization.
- Existing customer uses a new location.
- Existing location contains unregistered equipment.
- Equipment is created automatically from the organization's completed installation.
- Existing equipment is registered during a service visit despite unknown installation history.

### Minimum behavior

1. Search existing customer, contact, site, and equipment records.
2. Avoid accidental duplicates without preventing urgent work.
3. Create only the information currently known.
4. Allow equipment brand, model, serial number, installer, and installation date to be unknown.
5. Record whether history is tenant-verified, customer-reported, document-derived, or technician-observed.

### Outcomes

- Existing equipment selected.
- New equipment registered.
- Temporary unidentified equipment reference created for later reconciliation.
- Duplicate candidate flagged for authorized review.

## WF-002 — General service request

### Normal path

1. Capture the reported need in the customer's own words.
2. Record contact, location, known equipment, urgency, preferred time, and attachments as available.
3. Do not require a final diagnosis, service type, or price.
4. Schedule a crew or leave the request awaiting scheduling.
5. At the site, identify equipment and record inspection findings.
6. Add proposed service and material line items per equipment unit.
7. Present the total and record customer approval, partial approval, or rejection.
8. Perform only approved work unless an emergency policy permits otherwise.
9. Record results, testing, evidence, and follow-up needs.

### Possible outcomes

- Completed and externally paid
- Completed with payment evidence awaiting verification
- Completed on credit or payment pending
- Partially completed
- Inspection only
- Customer declined proposed work
- Required part unavailable
- Specialist or additional crew required
- Workshop repair required
- Replacement recommended
- Unable to repair
- Return visit scheduled
- Customer dispute

## WF-006 — New installation

### Optional and normal stages

1. Capture inquiry and proposed site.
2. Perform an optional site survey.
3. Record room/site conditions, recommended capacity, electrical needs, positions, accessibility,
   pipe length, materials, hazards, and photos.
4. Build and revise a quotation.
5. Record internal and customer approval when required.
6. Reserve company-supplied equipment and materials or record customer-supplied equipment.
7. Schedule the crew, vehicle, tools, and duration.
8. Install indoor/outdoor units and materials.
9. Record serial numbers and final locations.
10. Test and commission the installation.
11. Record customer handover, warranty, evidence, and external payment outcome.
12. Create or update the equipment lifecycle record.

### Project variation

A commercial project may contain many units, locations, phases, crews, partial handovers, change
orders, and progress claims while each unit retains its own equipment identity.

## WF-013 — Crew scheduling and dispatch

### Scheduling behavior

- Assign a permanent team or multiple selected workers.
- Identify one responsible crew leader.
- Allow ad-hoc additions and replacements with history.
- Associate vehicle, tools, skills, branch, and stock when applicable.
- detect worker, crew, vehicle, and time conflicts.
- Record assignment, acceptance, travel, arrival, work, pause, completion, and cancellation events
  according to tenant policy.

### Exceptions

- Worker absent
- Crew reassigned
- Extra worker required
- Job overruns the appointment
- Vehicle unavailable
- Customer unreachable or absent
- Weather, access, or safety prevents work
- Emergency work takes priority

## WF-017 — External payment evidence

### Normal path

1. Determine the amount due from approved and completed chargeable items.
2. Display the authorized organization or branch MMQR when applicable.
3. Customer pays outside the platform.
4. Authorized worker captures a photo of the receipt or success evidence.
5. Record amount, method, timestamp, and reference where available.
6. Prevent a paid outcome when the active policy requires evidence and none exists.
7. Either mark paid directly or submit evidence for office verification according to tenant policy.

### Outcomes

- Evidence submitted
- Paid and verified
- Partially paid
- Payment pending
- Corporate credit
- Evidence rejected
- Duplicate or mismatched evidence suspected
- Adjustment or refund recorded through a later controlled workflow

The platform does not initiate or settle the transaction.

## Common exception catalog

- Duplicate customer, site, equipment, or request
- Incorrect contact or address
- Customer unavailable
- Crew unavailable or delayed
- Unsafe site
- Weak or unavailable connectivity
- Scope changes after work begins
- Customer approves only part of the proposal
- Price or discount exceeds worker authority
- Required part unavailable
- Part reserved but not used
- Equipment removed from site
- Work fails testing
- Customer disputes completion or price
- Evidence missing or unreadable
- Job closed incorrectly and requires controlled reopening
- Follow-up accidentally duplicated
- Contract or warranty coverage is uncertain

## Workflow completion gate

This catalog is not accepted until every workflow has actors, preconditions, normal steps, optional
steps, decisions, exceptions, outputs, audit events, and requirement traceability.
