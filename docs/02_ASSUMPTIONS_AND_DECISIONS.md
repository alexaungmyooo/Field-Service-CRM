# Assumptions and Product Decisions

## Document control

| Field | Value |
| --- | --- |
| Status | Draft register |
| Work package | `WP-01 Product Vision and Boundaries` |
| Owner | Aung Myo Oo |
| Last updated | 2026-09-30 |

## Purpose

This register makes uncertainty visible. An assumption permits analysis to continue; it is not an
accepted requirement. A decision controls downstream work only when its status is Owner-stated or
Accepted.

## Owner-stated product constraints

| ID | Statement | Consequence |
| --- | --- | --- |
| `PD-001` | The product serves multiple merchants or organizations. | Multi-tenancy is foundational rather than a later retrofit. |
| `PD-002` | Myanmar field-service jobs commonly involve two or more workers. | Work orders support crews and multiple participants. |
| `PD-003` | Service scope may be determined after the crew inspects equipment on site. | A request does not require a final service type, scope, or price at creation. |
| `PD-004` | One visit may include cleaning, gas refill, repair, and part replacement. | Work orders contain multiple service and material line items. |
| `PD-005` | Equipment may be installed and serviced by different companies. | Equipment identity and lifecycle are independent of installer ownership. |
| `PD-006` | The platform does not integrate with payment providers at present. | No payment initiation, settlement, or wallet API is assumed. |
| `PD-007` | A technician records a photo of the external MMQR payment receipt before marking payment. | Payment evidence is distinct from payment processing and may be mandatory. |
| `PD-008` | The target is not limited to small businesses. | The same core model must support multi-branch and enterprise control. |
| `PD-009` | An organization may use a product subdomain or its own verified domain. | Tenant-aware web delivery and domain ownership verification are product capabilities. |
| `PD-010` | The administration portal may remain one shared platform portal. | Organization access is selected and enforced through tenant membership rather than separate admin deployments. |
| `PD-011` | An organization may request its own customer and technician applications. | White-label application identity, branding, configuration, distribution, and release management are required capabilities. |
| `PD-012` | Owners and management require a quick mobile dashboard, with detailed work continuing in the administration portal. | A role-aware Management Dashboard is required; a separately distributed Manager app remains optional. |

## Working assumptions

| ID | Assumption | Risk | Review trigger |
| --- | --- | --- | --- |
| `PA-001` | A crew leader may operate the field application on behalf of the crew. | Individual attendance or accountability may be incomplete. | Evidence that every worker uses a device or individual action tracking is required. |
| `PA-002` | Small organizations prefer minimal mandatory data entry. | Insufficient history may reduce later reporting quality. | Pilot adoption or incomplete-record evidence. |
| `PA-003` | Connectivity may be intermittent at customer sites. | Online-only work could lose evidence or delay completion. | Network measurements and field-device testing. |
| `PA-004` | Tenants require different price lists, approvals, statuses, and forms. | Excess configuration may make the product difficult to administer. | Workflow comparison across organization sizes. |
| `PA-005` | Myanmar and English interfaces will both be valuable. | Translation and terminology governance add delivery cost. | Market and pilot evidence. |
| `PA-006` | Customer addresses may require landmarks and free-text directions in addition to maps. | Pure geocoding may be unreliable. | Address and dispatch workflow evidence. |
| `PA-007` | The core field-service model can later support industries beyond air-conditioning. | Premature generalization may weaken the initial product. | First non-air-conditioning product evaluation. |

## Proposed decisions

| ID | Proposal | Reason | Status |
| --- | --- | --- | --- |
| `DEC-001` | Use `organization` as the product term and `tenant` as the technical isolation term. | Not every service provider identifies as a merchant. | Proposed |
| `DEC-002` | Keep one configurable work-order model with job templates instead of separate applications for each service type. | Work types share customers, assets, crews, evidence, materials, and outcomes. | Proposed |
| `DEC-003` | Make payment-evidence verification configurable by tenant. | Small tenants may allow direct marking while larger tenants require office verification. | Proposed |
| `DEC-004` | Keep customer-reported history distinct from verified tenant-performed work. | Prevents false attribution and warranty confusion. | Proposed |
| `DEC-005` | Keep public product documents separate from private execution evidence. | Protects operational context while preserving a stable handbook. | Proposed |
| `DEC-006` | Produce organization-branded applications from shared maintained product code rather than tenant-specific forks. | Forks create security, parity, maintenance, and release divergence. | Proposed |
| `DEC-007` | Treat subdomains, custom domains, and branded apps as tenant delivery identities, not authorization controls. | Hostname or application branding cannot replace authenticated tenant membership and backend enforcement. | Proposed |
| `DEC-008` | Require a mobile-optimized Management Dashboard while keeping a separate branded Manager app optional. | Management needs fast visibility without requiring a third native application for every organization. | Accepted |

## Decision lifecycle

```text
Observed problem
  -> assumption or proposal
  -> impact analysis
  -> owner review
  -> accepted/rejected/deferred
  -> affected documents updated
  -> implementation authorization, when applicable
```
