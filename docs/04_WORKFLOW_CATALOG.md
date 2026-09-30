# Field-Service Workflow Catalog

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted workflow baseline — proposed and open items retain their recorded status |
| Work package | `WP-03 Complete Workflow Catalogue` |
| Last updated | 2026-09-30 |

## Purpose

Define the normal paths, optional paths, decisions, exceptions, and outcomes the platform must be
able to represent. Workflows describe business behavior, not final screens or database tables.

## Scope and boundaries

This catalogue defines target business behavior for:

- customer, site, and equipment intake;
- service, cleaning, diagnosis, repair, gas, installation, relocation, and workshop work;
- crew scheduling, dispatch, field execution, and completion;
- quotations, scope approval, inventory, external payment evidence, and follow-up;
- contracts, warranty, complaints, emergencies, and large multi-site projects.

It does not define user-interface layout, database tables, APIs, integrations, implementation
technology, or release priority. Workflow steps describe business meaning. A small organization may
combine roles and use simple defaults; a large organization may separate roles, approvals, branches,
and evidence requirements without changing that meaning.

## Workflow vocabulary

- **Service request:** a reported or generated need that may still have unknown equipment, scope,
  price, or diagnosis.
- **Work order:** a controlled body of work created to address all or part of a request, contract
  obligation, complaint, project, or follow-up.
- **Visit:** one crew attendance at a site, workshop handoff, or other execution location for a
  work order.
- **Work item:** a proposed, approved, performed, or declined service or material line, normally
  connected to an equipment unit or explicit general scope.
- **Proposal revision:** an immutable version of offered scope, quantities, prices, and conditions.
- **Outcome:** what was achieved for a work item, equipment unit, visit, and overall work order.
- **Disposition:** the controlled next treatment of incomplete, failed, unsafe, disputed, or
  otherwise unresolved work.

A request may create more than one work order. A work order may require more than one visit. A visit
may address more than one equipment unit and contain several work items.

## Universal workflow control envelope

Unless a workflow explicitly narrows it, every workflow must preserve:

1. the authoritative organization and applicable branch scope;
2. the initiating actor, source, time, and business reason;
3. customer, site, equipment, contract, project, or originating-work context as far as known;
4. responsible role or person for the current action;
5. prior state, new state, actor, time, and reason for significant transitions;
6. proposed, approved, performed, tested, and declined scope as separate facts;
7. required evidence and acknowledgments according to tenant policy and work risk;
8. exceptions, failed checks, safety stops, and unresolved obligations;
9. the outcome plus a disposition, accountable owner, and due date when further action is required;
10. links to resulting work, stock movements, commercial records, evidence, and audit events.

Configuration may make a step mandatory, optional, unavailable, or subject to approval. It must not
erase tenant isolation, attribution, historical decisions, or the distinction between approval and
actual performance.

## Common actors

- Customer requester, site contact, payer, or authorized approver
- Organization owner or administrator
- Dispatcher or office staff
- Branch manager or supervisor
- Commercial approver
- Crew leader, technician, or helper
- Storekeeper or purchasing staff
- Payment-evidence verifier
- Contract, warranty, quality, or project coordinator
- Authorized platform support actor operating only through a controlled support session

One person may hold several organization roles. A field crew may contain two or more workers.
Assigned workers and actual participants remain distinguishable.

## Canonical lifecycle meanings

Tenant labels may vary, but the following meanings must remain distinguishable:

### Service request

```text
Captured
  -> Triaged
  -> Awaiting information, scheduling, or customer action
  -> Converted to controlled work, declined, cancelled, duplicate, or closed
```

### Work order and visit

```text
Draft
  -> Ready
  -> Scheduled and dispatched
  -> Arrived / In progress
  -> Paused, blocked, or additional approval required
  -> Outcome recorded
  -> Closed, follow-up created, cancelled, or controlled reopen
```

### Proposal

```text
Draft revision
  -> Internal approval when required
  -> Customer decision
  -> Approved, partially approved, rejected, expired, withdrawn, or superseded
```

### Completion and financial evidence

Operational completion, customer acknowledgment, external payment evidence submission, evidence
verification, and financial closure are separate facts. One must not be inferred automatically
from another unless an accepted tenant policy explicitly permits the transition.

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

**Actors:** requester or customer contact; office staff; crew leader or technician; authorized data
steward.

**Entry and preconditions:** a new or existing customer needs work; a new site is encountered;
equipment is unknown; an installation creates equipment; or a visit discovers unregistered
equipment. Only enough identity to continue safely is required.

**Normal and optional path:**

1. Search within the organization for possible customer, contact, site, and equipment matches.
2. Select an existing record or create only the information currently known.
3. Record customer and site relationships, access directions, preferred contacts, and consent or
   communication preferences when applicable.
4. Identify equipment by available attributes, photos, labels, components, location, and customer
   description.
5. Record information provenance as tenant-verified, customer-reported, document-derived,
   imported, or technician-observed.
6. Link the current request or work without claiming that the servicing organization installed the
   equipment.
7. Enrich or reconcile the record later under controlled correction.

**Decisions, exceptions, and failures:**

- suspected duplicate may be linked temporarily, flagged, or resolved by an authorized user;
- urgent work may continue using a temporary unidentified-equipment reference;
- one physical unit may have conflicting serial, location, ownership, or history claims;
- customer, payer, equipment owner, site contact, and approver may be different parties;
- unsafe or unauthorized access to customer information stops the affected action.

**Outputs and audit:** selected or newly created customer/site/equipment identity; provenance and
confidence; duplicate candidates; relationship changes; reconciliation history; originating actor
and source.

**Trace:** `PD-005`, `DEC-004`, `CAP-CRM`, `CAP-SITE`, `CAP-ASSET`,
`BR-ASSET-001` through `BR-ASSET-004`, `SR-CRM-001`, `SR-SITE-001`, and
`SR-ASSET-001` through `SR-ASSET-005`.

## WF-002 — General service request

**Actors:** requester or customer contact; office staff; dispatcher; supervisor; crew; commercial
approver when required.

**Entry and preconditions:** a need arrives through phone, message, walk-in, customer surface,
contract alert, referral, or staff entry. Final diagnosis, service type, equipment identity, price,
and appointment may all be unknown.

**Normal and optional path:**

1. Capture the reported need in the requester's own words, source, contact, location, urgency,
   preferred timing, and attachments as available.
2. Search for related customers, sites, equipment, contracts, warranties, duplicate requests, and
   recent unresolved work.
3. Triage safety, priority, skills, access, probable duration, and scheduling readiness.
4. Ask for missing information, schedule a survey or visit, create controlled work, or decline with
   a reason.
5. Assign and dispatch a multi-worker crew when ready.
6. At site, confirm contact, equipment, conditions, and actual participants; then inspect and
   diagnose.
7. Create or revise proposed service and material lines per equipment unit.
8. Obtain internal and customer approval as policy requires.
9. Perform approved work, record materials, test results, evidence, and per-unit outcomes.
10. Capture customer acknowledgment, payment-evidence state, and any required follow-up.

**Decisions, exceptions, and failures:**

- request is duplicate, out of service area, unsupported, unsafe, fraudulent, or referred out;
- customer is unreachable, absent, or provides insufficient access;
- only part of the proposed work is approved or affordable;
- crew, specialist, part, tool, or workshop support is unavailable;
- scope changes during work and requires a new proposal revision;
- equipment requires replacement, remains unresolved, fails testing, or is disputed.

**Outputs and audit:** triage and priority; linked or new work order; appointment and assignment;
inspection, proposal revision, approval, performed scope, result, disposition, and communication
history.

**Trace:** `PD-002` through `PD-005`, `DEC-018` through `DEC-023`, `CAP-REQUEST`,
`CAP-WO`, `CAP-FIELD`, `BR-WO-001` through `BR-WO-008`, and `SR-WO-001` through
`SR-FIELD-002`.

## WF-003 — Routine cleaning/service

**Actors:** customer or site contact; dispatcher; crew leader; technician or helper; supervisor
when evidence review is enabled.

**Entry and preconditions:** an on-demand request, recurring reminder, or contract visit identifies
one or more units for routine service. Equipment identity may be complete, partial, or created at
the visit.

**Normal and optional path:**

1. Confirm site access, target units, included service, quoted basis, and crew.
2. Record pre-service condition, reported issues, operating readings, and existing damage.
3. Perform the configured cleaning or maintenance checklist per unit.
4. Record actual participants, labour, materials, photos, readings, and observations.
5. If another fault is found, pause that affected scope and follow inspection/proposal approval
   rather than treating it as already approved routine service.
6. Test each serviced unit and record its individual result.
7. Record customer acknowledgment, recommendations, next-service timing, and completion outcome.

**Decisions, exceptions, and failures:**

- a unit is inaccessible, unsafe, incorrectly identified, or not operating;
- customer excludes a planned unit or adds another unit;
- gas, repair, or replacement is recommended but declined or deferred;
- cleaning cannot be completed due to water, drainage, electrical, access, or site restrictions;
- a unit passes, partly passes, or fails post-service testing independently of other units.

**Outputs and audit:** per-unit checklist; before/after evidence; readings; consumed materials;
discovered issues; proposal/follow-up links; per-unit and visit outcomes; next-service recommendation.

**Trace:** `PD-003`, `PD-004`, `DEC-020`, `CAP-ASSET`, `CAP-WO`, `CAP-FIELD`,
`BR-WO-002` through `BR-WO-008`, and `SR-WO-002` through `SR-FIELD-001`.

## WF-004 — Diagnosis and repair

**Actors:** customer or site contact; dispatcher; crew; specialist; commercial approver;
storekeeper; supervisor.

**Entry and preconditions:** a reported fault, failed test, inspection finding, complaint, or
follow-up requires diagnosis. No final repair scope or price is assumed at entry.

**Normal and optional path:**

1. Confirm symptoms, recent history, previous provider information, and safety conditions.
2. Inspect and test without rewriting customer-reported symptoms as verified diagnosis.
3. Record findings, measurements, diagnosis confidence, recommended options, and consequences of
   deferral.
4. Create a proposal revision for labour, parts, workshop work, replacement, or further diagnosis.
5. Obtain internal approval and customer approval for the exact revision when required.
6. Reserve or issue parts, perform approved repair, and record actual work and participants.
7. Test the equipment, compare expected and actual results, and record warranty implications.
8. Complete, partially complete, arrange follow-up/workshop work, recommend replacement, or record
   controlled unresolved disposition.

**Decisions, exceptions, and failures:**

- symptom cannot be reproduced or diagnosis remains uncertain;
- required specialist, part, tool, manual, or manufacturer support is unavailable;
- customer approves diagnosis but declines repair, or approves only selected work;
- repair reveals additional damage and invalidates the approved revision;
- repair fails testing, creates a safety stop, or would be uneconomic;
- third-party prior work or warranty responsibility is disputed.

**Outputs and audit:** symptom record; findings; diagnosis and confidence; proposal/approval;
reserved and used parts; repair and test evidence; warranty/rework link; outcome and next action.

**Trace:** `PD-003` through `PD-005`, `DEC-019` through `DEC-023`, `CAP-ASSET`,
`CAP-WO`, `CAP-COMM`, `CAP-INV`, `BR-WO-001` through `BR-WO-008`, and
`SR-WO-001` through `SR-COMM-004`.

## WF-005 — Gas/leakage work

**Actors:** customer or site contact; qualified crew; supervisor; commercial approver;
storekeeper when gas stock is controlled.

**Entry and preconditions:** poor cooling, suspected leak, measured condition, planned maintenance,
or approved gas-related service requires qualified inspection. Applicable safety and local
operating rules govern the work.

**Normal and optional path:**

1. Identify the unit, gas type as far as known, symptoms, prior refill or repair history, and
   safety conditions.
2. Record relevant pre-work readings and leakage inspection method.
3. Determine whether work is inspection only, leak testing, leak repair, evacuation, refill, or a
   combined controlled scope.
4. Propose labour, gas quantity basis, parts, and tests; obtain required approval.
5. Perform only approved and qualified work; record actual gas and materials used.
6. Record leak location and repair when found, final readings, operating test, and advice.
7. Update the equipment lifecycle and create follow-up when monitoring or further repair is needed.

**Decisions, exceptions, and failures:**

- gas type, quantity, equipment identity, or prior modification cannot be confirmed;
- refill without leak correction is restricted or requires explicit acknowledgment under policy;
- leak cannot be located or safely repaired on site;
- stock quantity, measurement, tool calibration, or worker qualification is insufficient;
- test fails, recurrent leakage is suspected, or replacement is recommended;
- regulatory or environmental evidence requirements remain governed by `OPEN-020`.

**Outputs and audit:** readings; inspection method; gas and material usage; leak/repair findings;
approval; safety evidence; test result; per-unit outcome; follow-up and warranty implications.

**Trace:** `PD-003`, `PD-004`, `DEC-019`, `DEC-020`, `CAP-FIELD`, `CAP-INV`,
`BR-WO-003` through `BR-WO-008`, `SR-FIELD-001`, `SR-INV-002`, and `OPEN-020`.

## WF-006 — New installation

**Actors:** requester, site contact, owner or consultant, salesperson or office staff, surveyor,
commercial approver, crew, storekeeper, project coordinator.

**Entry and preconditions:** a customer asks to install new or customer-supplied equipment. A site
survey may be performed before quotation, after provisional quotation, or omitted under an accepted
low-risk policy.

**Normal and optional path:**

1. Capture intended site, rooms or areas, customer expectations, equipment supply responsibility,
   timing, and known constraints.
2. When needed, survey capacity, electrical supply, unit positions, drainage, pipe length,
   accessibility, structural conditions, hazards, permissions, and photos.
3. Recommend equipment and installation scope without treating a preliminary estimate as final.
4. Create and revise the quotation; record inclusions, exclusions, assumptions, validity, warranty,
   and customer-supplied items.
5. Obtain internal and customer approval for the exact revision.
6. Reserve company-supplied units and materials or record customer-supplied identities and
   condition.
7. Schedule crew, duration, tools, access, and coordination with other trades.
8. Install, record deviations and actual materials, then identify indoor/outdoor units,
   components, serial numbers, and final locations.
9. Test, commission, capture handover and warranty evidence, and explain operation or maintenance.
10. Record per-unit acceptance, unresolved punch-list items, external payment-evidence state, and
    equipment lifecycle creation.

**Decisions, exceptions, and failures:**

- survey changes capacity, position, materials, price, or feasibility;
- customer changes scope or supplies different equipment after approval;
- access, electrical, structural, weather, permit, or other-trade dependency blocks work;
- equipment is damaged, missing, mismatched, or fails commissioning;
- some units are handed over while others remain incomplete;
- commercial projects transition into `WF-020` without losing per-unit identity.

**Outputs and audit:** survey; quotation revisions; approvals; reservations and consumption;
installed-equipment identities; commissioning results; warranty; handover; punch list; payment and
follow-up links.

**Trace:** `PD-003` through `PD-005`, `DEC-019` through `DEC-023`, `CAP-ASSET`,
`CAP-COMM`, `CAP-INV`, `CAP-PROJECT`, `SR-ASSET-005`, `SR-WO-002`, and
`SR-COMM-001` through `SR-COMM-004`.

## WF-007 — Relocation/uninstallation

**Actors:** customer or site contact; office staff; crew; storekeeper or custodian; commercial
approver.

**Entry and preconditions:** identified or partially identified equipment must be removed,
relocated, stored, disposed, or reinstalled. Ownership and authorization to move it must be recorded
as far as required by policy.

**Normal and optional path:**

1. Confirm source location, target disposition, equipment identity, components, condition, and
   customer authority.
2. Inspect access, safety, recovery needs, packaging, transport, storage, and reinstallation scope.
3. Propose removal, transport, materials, storage, repair, and reinstallation work.
4. Obtain approval; schedule crew, vehicle, tools, destination, and custodian.
5. Record pre-removal condition and component identities.
6. Remove and account for equipment, components, accessories, gas handling, and materials.
7. Transfer custody to the customer, vehicle, warehouse, workshop, disposal process, or destination
   site with attributable handoffs.
8. Reinstall and commission when included, then update location and lifecycle history.

**Decisions, exceptions, and failures:**

- ownership or authorization is disputed;
- equipment identity or component pairing is uncertain;
- damage exists before removal or occurs during work;
- destination is not ready, transport fails, or storage is required;
- removal succeeds but reinstallation is deferred, cancelled, or impossible;
- disposal requires separate approval and evidence.

**Outputs and audit:** condition evidence; approved scope; removal and custody events; component
accounting; location history; storage/workshop record; reinstallation and test result; disposition.

**Trace:** `CAP-ASSET`, `CAP-WO`, `CAP-DOC`, `BR-ASSET-004`, `BR-WO-003` through
`BR-WO-008`, `SR-ASSET-004`, and `SR-AUD-001`.

## WF-008 — Preventive-maintenance contract

**Actors:** customer contract owner; organization contract coordinator; dispatcher; supervisor;
crew; commercial approver.

**Entry and preconditions:** an accepted service contract identifies covered customers, sites,
equipment or scope, dates, included and excluded work, schedule, service commitments, and
responsibilities.

**Normal and optional path:**

1. Create or import the accepted contract version and coverage.
2. Generate visit obligations from frequency, calendar, usage, condition, or manual release.
3. Coordinate customer access and convert each due obligation into controlled work.
4. Schedule an appropriate crew and track response, attendance, or completion commitments.
5. Perform the contract checklist and record per-unit condition, work, materials, evidence, and
   recommendations.
6. Separate included work from chargeable findings and obtain approval for excluded scope.
7. Close the obligation, create corrective follow-up, and update remaining visits or commitments.
8. Monitor overdue obligations, repeated failures, consumption, renewal, suspension, and expiry.

**Decisions, exceptions, and failures:**

- equipment/site is added, removed, replaced, inaccessible, or not covered;
- customer postponement or organization capacity affects commitment clocks;
- contract allowance is exhausted or scope is disputed;
- visit is performed but required evidence or customer acknowledgment is missing;
- emergency or corrective work is needed outside the planned visit;
- SLA clock semantics remain governed by `OPEN-017`.

**Outputs and audit:** contract version and coverage; generated obligation; appointment/work link;
included versus chargeable items; commitment events; visit report; exceptions; renewal or follow-up.

**Trace:** `CAP-CONTRACT`, `CAP-SCHED`, `CAP-WO`, `SR-CONTRACT-001`,
`SR-FOLLOW-001`, and `OPEN-017`.

## WF-009 — Emergency service

**Actors:** requester; dispatcher; supervisor or duty manager; emergency crew; commercial approver
when time permits.

**Entry and preconditions:** a reported safety, business-continuity, critical-equipment, or urgent
service need requires rapid triage. Emergency classification must follow tenant policy rather than
customer wording alone.

**Normal and optional path:**

1. Capture the incident, people/site risk, equipment, impact, contact, and location.
2. Triage immediate safety advice, emergency level, response target, skills, crew availability, and
   authority.
3. Escalate and dispatch a qualified multi-worker crew, potentially overriding ordinary schedule
   under attributable supervisor authority.
4. Inform affected customers and crews of reassignment or delay.
5. On arrival, make the site safe, record condition, inspect, and distinguish stabilization from
   permanent repair.
6. Obtain approval when feasible; use only accepted emergency authority for work that cannot wait.
7. Record actual work, evidence, tests, unresolved risk, handover, and corrective follow-up.

**Decisions, exceptions, and failures:**

- incident is downgraded, referred to emergency services, or outside organizational competence;
- no qualified crew, access, part, or safe working condition is available;
- customer approval cannot be obtained;
- emergency work affects another customer's appointment or contract commitment;
- temporary stabilization succeeds but full repair remains pending;
- pre-approval authority remains governed by `OPEN-015`.

**Outputs and audit:** emergency classification; advice; escalation and dispatch override; affected
schedule records; arrival and safety evidence; authority used; stabilization/repair result; next
action.

**Trace:** `CAP-REQUEST`, `CAP-SCHED`, `CAP-FIELD`, `BR-WO-004`, `SR-SCHED-001`,
`SR-FIELD-001`, and `OPEN-015`.

## WF-010 — Warranty service

**Actors:** customer; office staff; warranty coordinator; supervisor; crew; supplier or
manufacturer contact when applicable.

**Entry and preconditions:** a customer or staff member claims that equipment, a supplied part, or
prior work may be covered. Coverage is not assumed merely because the tenant previously serviced
the equipment.

**Normal and optional path:**

1. Link the claim to equipment, originating work/part, provider, warranty terms, and reported fault
   as far as known.
2. Check dates, coverage, exclusions, prior changes, evidence, and responsible party.
3. Mark preliminary coverage as confirmed, denied, uncertain, or pending third-party review.
4. Schedule inspection or authorized corrective work.
5. Record diagnosis and distinguish covered work from new unrelated or chargeable work.
6. Obtain approval for non-covered additions and perform authorized work.
7. Record materials, tests, customer acknowledgment, recovery from supplier/manufacturer when
   applicable, and final coverage decision.

**Decisions, exceptions, and failures:**

- current tenant was not the installer or warrantor;
- serial, invoice, originating work, or warranty evidence is missing;
- customer modification, misuse, external damage, or third-party work may affect coverage;
- part or labour is covered by different responsible providers;
- urgent work proceeds before final recovery decision;
- customer disputes denial or responsibility.

**Outputs and audit:** claim; coverage assessment and reason; responsible provider; inspection/work
links; covered and chargeable scope; replaced-part identity; recovery status; outcome.

**Trace:** `PD-005`, `CAP-WARRANTY`, `BR-ASSET-005`, `SR-WARRANTY-001`,
`SR-ASSET-003`, and `SR-AUD-001`.

## WF-011 — Complaint and rework

**Actors:** complainant; customer-service or office staff; supervisor or quality manager; original
or independent review crew; commercial approver.

**Entry and preconditions:** dissatisfaction, damage, repeat failure, incomplete work, conduct
issue, price dispute, or claimed defect is reported and linked to originating work where possible.

**Normal and optional path:**

1. Capture the complaint in the customer's words, desired resolution, severity, attachments, and
   related equipment/work.
2. Acknowledge receipt and assign an accountable reviewer with a response target.
3. Preserve the original work record; add investigation evidence rather than rewriting it.
4. Triage safety, service recovery, warranty, commercial, conduct, and escalation needs.
5. Investigate remotely, inspect on site, or obtain independent review.
6. Decide and record responsibility, covered rework, goodwill work, chargeable new work, rejection,
   refund/adjustment request, or further escalation.
7. Schedule and perform approved resolution, then verify the result with the customer.
8. Close only with resolution, documented disagreement, or an explicit escalation path.

**Decisions, exceptions, and failures:**

- originating record or equipment cannot be identified;
- original and review evidence conflict;
- customer refuses access or proposed resolution;
- worker conduct or safety concern requires restricted handling;
- complaint recurs after rework;
- financial refund remains an external/accounting-controlled action, not payment processing.

**Outputs and audit:** complaint case; severity and owner; investigation; responsibility decision;
linked rework/follow-up; communications; resolution evidence; customer response; lessons or quality
action.

**Trace:** `CAP-WARRANTY`, `CAP-AUDIT`, `BR-AUD-001`, `BR-AUD-002`,
`SR-REWORK-001`, and `SR-AUD-001`.

## WF-012 — Workshop repair

**Actors:** customer or site contact; field crew; workshop coordinator or technician; custodian;
storekeeper; dispatcher.

**Entry and preconditions:** equipment or a component must leave the service site for diagnosis,
repair, supplier handling, storage, or replacement evaluation. Customer authority and custody
requirements apply.

**Normal and optional path:**

1. Identify the item and components as far as possible; record condition, accessories, photos, and
   removal reason.
2. Obtain customer acknowledgment and approved estimate basis or diagnostic authorization.
3. Record each custody handoff from site to crew, vehicle, workshop, supplier, storage, and return.
4. Inspect in workshop and create a revised proposal if diagnosis changes scope or price.
5. Obtain approval, reserve/issue parts, repair, and test.
6. Record unrepaired, unrepairable, abandoned, replaced, or disposal disposition when applicable.
7. Schedule return or reinstallation, confirm component identity, commission, and obtain handover.

**Decisions, exceptions, and failures:**

- identity, ownership, accessories, or pre-existing damage is disputed;
- item is lost, damaged, mixed with another item, or transferred without acknowledgment;
- estimate is declined after diagnosis;
- supplier or external specialist receives custody;
- customer delays collection or authorizes disposal;
- mandatory custody evidence remains governed by `OPEN-019`.

**Outputs and audit:** removal record; item condition; custody chain; workshop diagnosis and
proposal; repair/material/test record; storage or supplier handoff; return/reinstallation;
disposition.

**Trace:** `CAP-ASSET`, `CAP-WO`, `CAP-INV`, `CAP-DOC`, `SR-ASSET-005`,
`SR-WO-005`, `SR-AUD-001`, and `OPEN-019`.

## WF-013 — Crew scheduling and dispatch

**Actors:** dispatcher; supervisor or branch manager; crew leader; technicians/helpers; customer
contact; vehicle/tool custodian when enabled.

**Entry and preconditions:** work is sufficiently triaged to identify a time window, site, expected
skills, duration, crew size, priority, and resources, or an emergency override is authorized.

**Normal and optional path:**

1. Review location, branch/service area, priority, customer availability, skills, crew size,
   duration, contractual commitment, parts readiness, vehicle, tools, and existing schedule.
2. Select a permanent team or an ad-hoc set of two or more workers and designate one responsible
   crew leader.
3. Detect worker, crew, vehicle, tool, travel, branch, stock, and time conflicts as configured.
4. Create the appointment and assignment; notify crew and customer according to policy.
5. Record acceptance or acknowledgment when required.
6. Track dispatch, travel, arrival, start, pause, resume, departure, completion, or no-access events.
7. Record actual participants separately from the original assignment.
8. Reassign, extend, add workers, split work, or schedule another visit with history when conditions
   change.

**Decisions, exceptions, and failures:**

- worker absent, unqualified, delayed, or replaced;
- extra worker, specialist, vehicle, tool, or part is needed;
- customer is unreachable, absent, or requests a different time;
- prior job overruns, traffic/weather blocks travel, or emergency work takes priority;
- unsafe site or access prevents attendance;
- crew rejects or does not acknowledge assignment;
- offline status updates conflict with office rescheduling and require safe resolution.

**Outputs and audit:** appointment; crew/leader assignment; resource reservations; conflict and
override reason; notifications; status timestamps; actual participants; reassignment and delay
history.

**Trace:** `PD-002`, `PA-001`, `CAP-SCHED`, `CAP-CREW`, `BR-CREW-001` through
`BR-CREW-005`, `SR-CREW-001` through `SR-SCHED-002`, and `OPEN-021`.

## WF-014 — Parts and inventory

**Actors:** requester or technician; crew leader; storekeeper; purchaser; supervisor; supplier when
procurement is involved.

**Entry and preconditions:** planned or discovered work requires a tracked part, material,
consumable, tool, serialized item, or customer/company-supplied equipment. Inventory tracking may be
simple or fully controlled by tenant policy.

**Normal and optional path:**

1. Identify demand from quotation, work planning, field discovery, replenishment, or contract.
2. Check permitted stock locations such as warehouse, branch, vehicle, crew, or reserved project
   stock.
3. Reserve available quantity or create a material/purchase request for shortage.
4. Approve, pick, issue, transfer, or receive the item with source and destination.
5. Record delivery to the job/crew and actual use per work/equipment context when relevant.
6. Return unused quantity, record damage/loss, replace defective items, or reconcile variance.
7. Release unused reservations and update the work disposition when shortage remains.

**Decisions, exceptions, and failures:**

- insufficient, negative, quarantined, expired, damaged, or wrong stock;
- physical count differs from recorded availability;
- reserved item is consumed by another job under authorized override;
- serialized item identity does not match issue/installation;
- field purchase or customer-supplied material bypasses ordinary stock and requires evidence;
- cross-tenant stock movement is prohibited even when organizations share owners or facilities.

**Outputs and audit:** demand; reservation; issue/transfer/receipt/consumption/return/damage/
adjustment transactions; job/equipment links; approver and reason; shortage and replenishment action.

**Trace:** `CAP-INV`, `CAP-PROC`, `BR-INV-001` through `BR-INV-004`, and
`SR-INV-001` through `SR-INV-004`.

## WF-015 — Quotation and approval

**Actors:** estimator, office staff, crew leader, commercial approver, customer approver, project or
contract coordinator.

**Entry and preconditions:** survey, inspection, diagnosis, contract exception, project change, or
field discovery creates proposed chargeable or approval-controlled scope.

**Normal and optional path:**

1. Build a proposal from services, equipment, parts, quantities, labour, prices, taxes/fees when in
   scope, assumptions, exclusions, validity, schedule, and conditions.
2. Identify the customer, site, equipment/work context, price list, and proposal revision.
3. Apply permitted price/discount rules and route threshold exceptions for internal approval.
4. Present the exact approved revision to an authorized customer approver.
5. Record full approval, item-level partial approval, rejection, request for revision, expiry, or no
   decision.
6. Freeze the decided revision; create a new revision for changed scope, quantity, price, or terms.
7. Convert only approved items into authorized work and material demand.
8. Preserve declined and superseded items for history and follow-up.

**Decisions, exceptions, and failures:**

- approver identity or authority is uncertain;
- price, discount, margin, free work, or credit exceeds authority;
- customer accepts verbally, remotely, by signature, or through another evidence method governed by
  `OPEN-014`;
- proposal expires, is withdrawn, or depends on survey/availability;
- work has already begun before changed chargeable scope is approved;
- quotation/invoice/tax-document boundary remains governed by `OPEN-018`.

**Outputs and audit:** immutable revisions; internal decisions; customer decision by item; evidence;
approved work scope; declined scope; validity and terms; actor, time, and communication history.

**Trace:** `DEC-019`, `CAP-COMM`, `BR-WO-004`, `BR-WO-005`, `SR-WO-004`,
`SR-COMM-001` through `SR-COMM-004`, `OPEN-014`, and `OPEN-018`.

## WF-016 — Completion and customer acceptance

**Actors:** crew leader; actual technicians/helpers; customer/site contact; supervisor or quality
reviewer; office staff.

**Entry and preconditions:** a visit or work order has performed, declined, blocked, or unresolved
scope ready for outcome recording. Completion does not require pretending every proposed item was
performed.

**Normal and optional path:**

1. Reconcile approved, performed, not performed, added, and declined items per equipment unit.
2. Record actual participants, labour/time where enabled, materials, measurements, tests, photos,
   checklists, notes, and safety status.
3. Assign per-item and per-equipment outcomes, then determine the visit and overall work-order
   outcome.
4. Record defects, punch-list items, unresolved risks, removed equipment, warranty, complaint, or
   follow-up needs.
5. Present the service summary and capture customer acknowledgment or the reason it is unavailable.
6. Record external payment-evidence or credit state independently.
7. Submit for supervisor/office review when policy requires it.
8. Close only when required evidence and dispositions exist, or keep the relevant obligation open.

**Decisions, exceptions, and failures:**

- customer is absent, refuses acknowledgment, or disputes scope, price, damage, or result;
- one unit passes while another remains failed or untested;
- required photo, signature, checklist, serial, measurement, or test is missing;
- performed scope differs from approval;
- job is closed incorrectly and needs controlled reopening;
- offline evidence remains unsynchronized or conflicts with office changes.

**Outputs and audit:** reconciliation of scope; per-unit/visit/order outcomes; evidence completeness;
customer acknowledgment/dispute; review decision; follow-up; closure or reopen history.

**Trace:** `DEC-020` through `DEC-024`, `CAP-FIELD`, `CAP-DOC`, `CAP-AUDIT`,
`BR-WO-003` through `BR-WO-008`, `SR-WO-003` through `SR-WO-007`, and
`SR-AUD-001`.

## WF-017 — External payment evidence

**Actors:** customer/payer; crew leader or authorized technician; office staff; payment-evidence
verifier; commercial supervisor.

**Entry and preconditions:** an approved charge, deposit, milestone, completed work, or other
commercial obligation is payable outside the platform. The product does not initiate, hold,
process, or settle the funds.

**Normal and optional path:**

1. Determine the claimed amount due and the organization/branch receiving identity.
2. Display the administrator-approved MMQR image when that external method is selected.
3. Customer pays outside the product using KPay, CBPay, AYA Pay, another MMQR-capable provider,
   cash, bank transfer, credit terms, or another tenant-approved method.
4. Authorized staff records amount, method, payer/payee context, time, reference when available,
   and a photo of the receipt or success evidence.
5. When the active policy requires a receipt photo, block the paid outcome until the photo exists:
   no photo, no paid status.
6. Mark evidence submitted and either allow direct paid marking or route it to an independent
   verifier according to tenant policy.
7. Verify, reject, request replacement, identify duplicate/mismatch, or record partial/pending/
   credit treatment.
8. Preserve later adjustment, refund claim, or correction as a new attributable event.

**Decisions, exceptions, and failures:**

- MMQR image is missing, expired, wrong branch, or not the intended organization;
- receipt is unreadable, incomplete, duplicated, mismatched, or for the wrong amount;
- customer pays partially, pays another method, or receives credit terms;
- field device is offline and evidence cannot yet upload;
- customer claims payment but will not provide required evidence;
- evidence is later replaced or removed only under authorized audited correction;
- verification confirms evidence consistency, not provider settlement.

**Outputs and audit:** obligation reference; MMQR identity shown; evidence image and metadata;
submitter; verification decision and verifier; status history; discrepancy; correction/adjustment
link.

**Trace:** `PD-006`, `PD-007`, `DEC-003`, `DEC-021`, `CAP-PAYEVID`,
`BR-PAYEVID-001` through `BR-PAYEVID-005`, and `SR-PAYEVID-001` through
`SR-PAYEVID-006`.

## WF-018 — Cancellation and rescheduling

**Actors:** customer contact; dispatcher; supervisor; crew leader; commercial or contract
coordinator when charges or commitments are affected.

**Entry and preconditions:** a request, appointment, visit, work order, contract visit, or project
activity cannot continue at its planned time or is no longer required.

**Normal and optional path:**

1. Identify the affected record, requester, reason, timing, current assignment, and work already
   performed or costs already incurred.
2. Determine whether to reschedule, cancel only one visit, cancel remaining work, hold pending
   information, or close as duplicate/declined.
3. Check customer communication, crew travel/arrival, resource reservations, contract commitment,
   deposit, material, and follow-up impact.
4. Obtain approval when policy, value, contract, or already-performed work requires it.
5. Release or reassign crew, vehicle, tool, stock, and time reservations safely.
6. Notify affected people and preserve the previous appointment and assignment history.
7. Create the new appointment or controlled final disposition.

**Decisions, exceptions, and failures:**

- customer cancels after dispatch/arrival or repeatedly provides no access;
- organization cancels due to crew, stock, weather, safety, or emergency priority;
- only part of multi-visit or multi-unit work is cancelled;
- contract commitments or project dependencies are breached;
- cancellation/travel/inspection/no-access charges remain governed by `OPEN-016`;
- offline crew proceeds against an appointment the office changed.

**Outputs and audit:** prior and new schedule; cancellation scope and reason; authorizer; released
resources; notifications; charge decision when applicable; contract/project exception; next action.

**Trace:** `DEC-024`, `CAP-SCHED`, `CAP-AUDIT`, `SR-SCHED-001`, `SR-AUD-001`,
`OPEN-016`, and `OPEN-021`.

## WF-019 — Follow-up and recurring service

**Actors:** crew leader; office staff; dispatcher; supervisor; contract coordinator; customer
contact.

**Entry and preconditions:** inspection, incomplete work, monitoring need, promised return,
parts/specialist dependency, recommended maintenance, contract recurrence, warranty, or complaint
requires future action.

**Normal and optional path:**

1. Record the follow-up reason, originating request/work/visit/equipment, priority, due window,
   responsible owner, and dependency.
2. Decide whether the next action is a reminder, customer contact, material procurement, approval,
   scheduled visit, workshop return, specialist referral, warranty review, or recurring plan.
3. Prevent accidental duplicate follow-ups while allowing distinct obligations for different
   equipment or reasons.
4. Monitor dependency and due status; escalate overdue or unowned obligations.
5. Convert ready follow-up into a linked request, work order, appointment, or contract visit.
6. Carry forward necessary context without copying obsolete scope or assuming new customer approval.
7. Close the follow-up only when completed, no longer required with reason, customer-declined, or
   superseded by another controlled action.

**Decisions, exceptions, and failures:**

- part, specialist, customer response, approval, or site readiness remains pending;
- recurring generation creates a duplicate after manual scheduling;
- responsibility moves between branches, crews, warranty, project, or contract owners;
- recommended work is deferred indefinitely or declined;
- origin record is reopened instead of creating a new visit/work order under policy;
- customer cannot be reached before the due date.

**Outputs and audit:** linked obligation; owner; due date; dependency; reminders/escalations;
converted work; closure reason; recurring-generation history.

**Trace:** `DEC-023`, `CAP-WO`, `CAP-SCHED`, `CAP-CONTRACT`, `SR-FOLLOW-001`,
`SR-REWORK-001`, and `SR-AUD-001`.

## WF-020 — Large multi-site project

**Actors:** customer sponsor; project manager; site coordinators; commercial approver; dispatcher;
multiple crews and leaders; storekeeper/purchaser; quality or handover reviewer.

**Entry and preconditions:** one commercial engagement coordinates many sites, zones, equipment
units, phases, crews, dates, materials, dependencies, milestones, or partial handovers.

**Normal and optional path:**

1. Define project/customer context, sites, scope structure, milestones, responsibilities,
   assumptions, commercial basis, and accepted baseline revision.
2. Survey and identify units/locations as far as known; allow controlled progressive discovery.
3. Plan phases, site readiness, crew capacity, skills, materials, equipment supply, vehicles,
   access, and other-trade dependencies.
4. Create linked work orders and visits while preserving per-site and per-unit identity.
5. Reserve/procure materials and assign multiple crews with one responsible leader per visit.
6. Record progress, actual work, issues, safety events, material use, evidence, tests, and
   punch-list items.
7. Process change requests through revised scope, impact, internal approval, and customer approval.
8. Perform staged testing, quality review, partial handover, milestone acknowledgment, and external
   payment-evidence recording when applicable.
9. Complete final handover while retaining outstanding defect, warranty, retention, or follow-up
   obligations.

**Decisions, exceptions, and failures:**

- site or design is not ready; scope/quantity differs from baseline;
- equipment/material delivery is late, damaged, substituted, or allocated elsewhere;
- crews or branches overlap, dependencies slip, or work must be resequenced;
- customer approves only part of a change;
- one unit/site is handed over while another remains blocked or fails testing;
- progress claim, invoice, tax, retention, and accounting boundaries remain governed by
  `OPEN-018`.

**Outputs and audit:** baseline and revisions; phase/site/unit work links; schedule and dependencies;
resource/material plan; progress evidence; issues/changes; approvals; tests; partial/final handover;
outstanding obligations.

**Trace:** `CAP-PROJECT`, `CAP-SCHED`, `CAP-INV`, `CAP-COMM`, `DEC-019` through
`DEC-023`, `SR-WO-002`, `SR-COMM-002` through `SR-COMM-004`, and `OPEN-018`.

## Common exception catalog

- identity: duplicate, incomplete, conflicting, or incorrectly linked records;
- customer/access: unreachable customer, wrong address, no access, authorization dispute, or
  communication failure;
- workforce/resource: absence, skill gap, overrun, conflicting assignment, vehicle/tool shortage,
  or emergency reassignment;
- safety: unsafe site, unqualified work, hazardous condition, or mandatory stop;
- connectivity: offline capture, upload failure, stale schedule, duplicate submission, or
  synchronization conflict;
- scope/commercial: changed diagnosis, partial approval, expired proposal, threshold exceeded, or
  performed-versus-approved mismatch;
- inventory/custody: shortage, wrong item, variance, damage, loss, unused reservation, or broken
  custody chain;
- quality: failed test, incomplete checklist, missing evidence, recurrent fault, or disputed result;
- financial evidence: missing/unreadable/duplicate/mismatched receipt, partial payment, credit, or
  rejected verification;
- lifecycle: incorrect closure, controlled reopen, duplicate follow-up, cancellation, or unresolved
  obligation;
- coverage: uncertain contract, warranty, third-party responsibility, or excluded scope.

Each exception must end in one of these controlled treatments: correct now; pause and assign an
owner; obtain approval; schedule follow-up; refer/escalate; cancel/decline with reason; close with a
documented unresolved disposition; or reopen under authority. Silent deletion and forced
successful completion are not valid exception handling.

## Cross-workflow acceptance scenarios

The catalogue is only coherent if it can represent all of these scenarios:

1. Company B services or repairs an air conditioner installed by Company A without claiming
   Company A's installation as its own work.
2. A two-person or larger crew attends one visit, with one crew leader and separately recorded
   actual participants.
3. A customer requests general service without a known diagnosis; inspection adds cleaning, gas,
   repair, and part options, of which the customer approves only some.
4. One visit covers several units; some pass, one needs a part, and one is recommended for
   replacement.
5. An installation proceeds with or without a prior survey according to risk and tenant policy, and
   commissioning creates equipment history.
6. Equipment leaves the site for workshop repair and every custody transfer remains attributable.
7. A small owner-operated organization combines dispatcher, approver, and verifier duties while a
   large organization separates them under the same workflow meanings.
8. A customer pays outside the platform through MMQR; required receipt evidence is photographed,
   and paid status is blocked when that photo is absent.
9. Work is operationally complete while customer acknowledgment, payment verification, complaint,
   or follow-up remains open.
10. A multi-site installation project has partial handovers, approved changes, several crews, and
    per-unit history.

## WP-03 acceptance criteria

WP-03 is ready for owner review when:

- all twenty registered workflows identify actors, entry/preconditions, normal and optional paths,
  decisions, exceptions/failures, outputs/audit meaning, and traceability;
- request, work order, visit, work item, proposal revision, outcome, and disposition are distinct;
- crew-based work, actual participation, dynamic on-site scope, partial approval, and per-unit
  results are preserved;
- installation, service, repair, gas, relocation, workshop, emergency, contract, warranty,
  complaint, inventory, payment evidence, follow-up, and project variations are represented;
- incomplete and failure outcomes retain an accountable disposition;
- external payment evidence remains separate from payment processing and required-photo policy is
  explicit;
- the same workflow meanings support small and large organizations with configurable governance;
- open commercial, approval, emergency, SLA, custody, gas, and offline questions remain visible;
- no screen, database, API, architecture, dependency, or application code is selected.
