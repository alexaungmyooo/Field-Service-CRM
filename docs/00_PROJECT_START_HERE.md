# Field Service CRM Handbook

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted documentation bootstrap — Product Discovery content remains Draft |
| Current phase | Product Discovery |
| Current work package | `WP-01 Product Vision and Boundaries` — Accepted |
| Application coding | Not authorized |
| Architecture selection | Not authorized |
| Owner | Aung Myo Oo |
| Last updated | 2026-09-30 |

## Purpose

This handbook is the public source of truth for the Field Service CRM product. It must allow a new
engineer or coding agent to understand the product before reading or writing application code.

The project follows this sequence:

```text
Product vision
  -> assumptions and decisions
  -> organization and tenancy model
  -> field-service workflows
  -> business capabilities
  -> domain model
  -> business rules
  -> system requirements
  -> solution architecture
  -> technical proofs
  -> roadmap and work breakdown
  -> implementation
  -> validation
  -> release
```

Implementation must follow accepted product behavior and architecture. It must not silently define
them.

## Reading order

### Phase 1 — Product Discovery

1. `01_PRODUCT_VISION_AND_SCOPE.md`
2. `02_ASSUMPTIONS_AND_DECISIONS.md`
3. `03_MULTI_ORGANIZATION_MODEL.md`
4. `04_WORKFLOW_CATALOG.md`
5. `05_BUSINESS_CAPABILITIES.md`
6. `06_DOMAIN_MODEL.md`
7. `07_BUSINESS_RULES.md`
8. `08_SYSTEM_REQUIREMENTS.md`

All Phase 1 documents are currently Draft unless a section or record says otherwise.

### Later phases

Later accepted work packages may add:

- solution architecture;
- security and multi-tenancy architecture;
- data architecture;
- API architecture;
- administration and dispatch architecture;
- technician mobile and offline architecture;
- integration architecture;
- technical proof plan;
- implementation roadmap;
- feature coverage plan;
- work breakdown structure;
- testing, deployment, and operational runbooks.

Those documents do not yet exist and must not be invented through application scaffolding.

## Document authority

Authority is ordered as follows:

1. Owner-stated product constraints recorded in this handbook.
2. Accepted decisions and business rules.
3. Accepted system requirements.
4. Accepted architecture decisions, when they exist.
5. Work-package authorization.
6. Implementation details.

When lower-level material conflicts with a higher-level authority, stop and reconcile the conflict
before proceeding.

## Status language

| Status | Meaning |
| --- | --- |
| Draft | Incomplete working material |
| Proposed | A candidate requiring owner review |
| Owner-stated | Directly supplied as a governing product fact by the owner |
| Accepted | Approved as the current product or engineering standard |
| Deferred | Valid idea intentionally postponed |
| Rejected | Considered and not selected |
| Superseded | Replaced by a newer identified record |

Document presence does not imply acceptance.

## Current product statement

Field Service CRM is a configurable multi-tenant platform for organizations that sell, schedule,
deliver, document, and manage work at customer locations.

The first domain is Myanmar air-conditioning service. The core product must support residential
and commercial customers, crew-based fieldwork, dynamic on-site diagnosis, installations,
services, repairs, equipment history, inventory, quotations, contracts, external payment evidence,
and organizational control from small businesses through multi-branch enterprises.

## Current phase gate

Product Discovery exits only when:

- the target product and boundaries are accepted;
- the multi-organization and tenant-isolation model is accepted;
- major workflow families and exception outcomes are represented;
- core business capabilities and concepts use consistent language;
- governing business rules are identified;
- system requirements are testable and traceable;
- architecture-significant uncertainties are listed for technical proof;
- no unresolved contradiction prevents architecture work.

Passing Product Discovery authorizes architecture work, not application implementation.

## WP-00 acceptance

The owner accepted the repository and Product Discovery documentation bootstrap on 2026-09-30.
This acceptance confirms the handbook structure, agent rules, private/public control boundary, and
initial draft baseline. It does not accept every Draft requirement, Proposed decision, Proposed
business rule, workflow detail, architecture choice, or implementation scope.

## WP-01 authorization

The owner authorized `WP-01 Product Vision and Boundaries` on 2026-09-30 and explicitly kept
application coding closed. WP-01 may refine the product definition, target organizations, supported
operating models, product surfaces, scope layers, non-goals, success outcomes, and decision
register. It does not authorize architecture selection, application scaffolding, dependencies,
deployment, or external-system changes.

## WP-01 acceptance

The owner accepted the Product Vision and Boundaries baseline on 2026-09-30 and authorized its
publication. Acceptance includes the product mission, target organizations and customers,
supported operating models, product surfaces, scope layers, non-goals, success outcomes, and the
recorded Accepted/Proposed/Open decision dispositions. It does not authorize application coding or
silently accept later workflow, domain, business-rule, system-requirement, or architecture work.

## Private execution control

Private execution state is maintained in `internal-local/EXECUTION_CONTROL.md`. That directory is
not client-facing and is ignored by Git. It records current authorization, frozen scope, evidence,
blockers, and the next permitted gate.
