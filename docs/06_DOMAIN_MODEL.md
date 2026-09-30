# Domain Model

## Document control

| Field | Value |
| --- | --- |
| Status | Draft conceptual model |
| Work package | `WP-04 Business Capabilities and Domain Model` |
| Last updated | 2026-09-30 |

## Purpose

Define the business language, ownership, relationships, and truths that future requirements and
architecture must preserve. These concepts are not database-table specifications.

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

User identity and worker records are related but not necessarily identical. A helper may be recorded
as a worker before receiving a user account.

## Customer and equipment concepts

- **Customer Account:** residential person, household, business, or corporate account receiving service.
- **Contact:** person and communication details associated with a customer or site.
- **Service Site:** physical place where equipment or service activity exists.
- **Equipment:** identifiable serviced asset such as an air-conditioning unit.
- **Equipment Component:** optional child component such as indoor unit, outdoor unit, or compressor.
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
- **Approval:** attributable internal or customer decision about proposed work.
- **Service Activity:** cleaning, refill, repair, installation, testing, or other performed work.
- **Material Usage:** reserved, issued, consumed, returned, damaged, or replaced item movement.
- **Test Result:** evidence that equipment or work met an expected outcome.
- **Job Outcome:** completed, partial, unresolved, declined, follow-up, workshop, replacement, or other conclusion.
- **Follow-up:** controlled later action linked to the originating need and work.

## Commercial and control concepts

- **Service Catalog Item:** reusable description of a service or charge.
- **Price List:** tenant or branch pricing context.
- **Quotation:** versioned commercial proposal.
- **Discount:** authorized reduction with reason and actor.
- **Service Contract:** agreement covering equipment, locations, work, schedule, and commitments.
- **Service Commitment:** response, attendance, resolution, or visit obligation.
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

## Important relationships

```text
Organization owns Branches, Memberships, Configurations, and tenant business records.
Customer has Contacts and Service Sites.
Service Site contains Equipment.
Equipment has Lifecycle Events and may appear in many Work Orders.
Service Request may create one or more Work Orders.
Work Order may have one or more Visits.
Visit has one assigned Crew and actual participating Workers.
Work Order/Visit references Equipment, Activities, Materials, Evidence, and Outcomes.
Proposal contains Services and Materials; Approval references an exact proposal revision.
Warranty references responsible work, supplied part, provider, coverage, and term.
Complaint and Rework reference originating Work Orders and Equipment.
Payment Evidence references the commercial obligation it claims to satisfy.
```

## Domain boundaries

Candidate bounded domains are:

- Organization and identity
- Customer and site
- Equipment lifecycle
- Service intake and work management
- Workforce, scheduling, and dispatch
- Commercial proposal and customer approval
- Contracts and warranty
- Inventory and procurement
- Documents and evidence
- External payment evidence
- Reporting and audit
- Platform operations
- Tenant delivery and application distribution

Final boundaries require solution-architecture review.
