# Assumptions and Product Decisions

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted WP-01 baseline — living decision register |
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

## Decision register

| ID | Proposal | Reason | Status |
| --- | --- | --- | --- |
| `DEC-001` | Use `organization` as the product term and `tenant` as the technical isolation term. | Not every service provider identifies as a merchant. | Accepted |
| `DEC-002` | Keep one configurable work-order model with job templates instead of separate applications for each service type. | Work types share customers, assets, crews, evidence, materials, and outcomes. | Proposed |
| `DEC-003` | Make payment-evidence verification configurable by tenant. | Small tenants may allow direct marking while larger tenants require office verification. | Proposed |
| `DEC-004` | Keep customer-reported history distinct from verified tenant-performed work. | Prevents false attribution and warranty confusion. | Proposed |
| `DEC-005` | Keep public product documents separate from private execution evidence. | Protects operational context while preserving a stable handbook. | Accepted |
| `DEC-006` | Produce organization-branded applications from shared maintained product code rather than tenant-specific forks. | Forks create security, parity, maintenance, and release divergence. | Proposed |
| `DEC-007` | Treat subdomains, custom domains, and branded apps as tenant delivery identities, not authorization controls. | Hostname or application branding cannot replace authenticated tenant membership and backend enforcement. | Proposed |
| `DEC-008` | Require a mobile-optimized Management Dashboard while keeping a separate branded Manager app optional. | Management needs fast visibility without requiring a third native application for every organization. | Accepted |
| `DEC-009` | Treat Myanmar air-conditioning service as the initial validation domain while preserving a configurable cross-industry core. | Domain depth is required for a useful first product, while tenant, work, crew, asset, and evidence concepts apply more broadly. | Accepted |
| `DEC-010` | Treat the product as a B2B platform with optional customer-facing delivery, not a public job marketplace. | Each tenant owns its service operation and customer relationship. | Proposed |
| `DEC-011` | Separate core domain scope, operational modules, and delivery/enterprise options without defining commercial tiers yet. | Product completeness and staged delivery are different decisions. | Proposed |
| `DEC-012` | Allow authorized platform roles to discover all organizations while requiring explicit, scoped, time-limited, audited support sessions for private tenant-data access. | Platform operation requires organization visibility, but routine unrestricted tenant-data access would violate the isolation boundary. | Accepted |
| `DEC-013` | Keep platform roles and organization roles as separate authority systems. | Platform employment or support responsibility must not imply tenant operational membership. | Proposed |
| `DEC-014` | Allow one user identity to hold explicit memberships in more than one organization while requiring one active organization context at a time. | Owners, consultants, and service-group staff may legitimately work across organizations without combining their data. | Proposed |
| `DEC-015` | Make branches optional while giving every organization one operational root scope. | Small tenants should not manage artificial complexity, while larger tenants require branch control. | Proposed |
| `DEC-016` | Apply configuration through platform constraints, organization defaults, and explicit branch overrides. | Reusable defaults reduce administration while fixed platform invariants remain unchangeable. | Proposed |
| `DEC-017` | Keep user identity, organization membership, and worker/person records distinct but linkable. | A worker may exist before receiving login access, and one identity may hold different roles across organizations. | Proposed |

## Open decision register

| ID | Question | Decision owner | Required before |
| --- | --- | --- | --- |
| `OPEN-001` | Which non-air-conditioning service industry is the first expansion test? | Product owner | Cross-industry acceptance |
| `OPEN-002` | Will the first customer experience be a web portal, shared app, branded app, or a controlled combination? | Product owner | Customer-surface architecture |
| `OPEN-003` | Will branded applications publish through platform-owned, organization-owned, or both store-account models? | Product owner | White-label release architecture |
| `OPEN-004` | Will a shared generic Technician app be offered alongside branded technician apps? | Product owner | Technician delivery architecture |
| `OPEN-005` | What subscription, limits, modules, and white-label commercial packages will be offered? | Product owner | Commercial launch planning |
| `OPEN-006` | Will customer-owned portable equipment history be supported across service providers? | Product owner | Privacy and data-sharing architecture |
| `OPEN-007` | Which management actions, if any, may be completed directly from the Management Dashboard? | Product owner | Management-surface requirements |
| `OPEN-008` | What approval, tenant notification, masking, action logging, retention, and emergency break-glass rules govern support sessions? | Product owner and security review | Security architecture |
| `OPEN-009` | Which organization lifecycle states and suspension behaviors are included in the first commercial release? | Product owner | Organization lifecycle requirements |
| `OPEN-010` | Can a branch represent a separate legal entity, or only an operational subdivision? | Product owner | Organization/domain acceptance |
| `OPEN-011` | Is multi-organization membership required in the first release or only preserved in the model? | Product owner | Identity architecture |
| `OPEN-012` | Which organization configuration may a branch override, and which settings always inherit? | Product owner | Configuration requirements |
| `OPEN-013` | Which platform-support actions require tenant approval or dual platform approval? | Product owner and security review | Support-access architecture |

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

## WP-01 acceptance record

The owner accepted the WP-01 register dispositions on 2026-09-30. Owner-stated and Accepted records
govern downstream discovery. Proposed and Open records remain unresolved and must not be treated as
accepted behavior.
