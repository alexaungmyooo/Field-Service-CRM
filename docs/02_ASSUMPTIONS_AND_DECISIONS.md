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
| `DEC-018` | Keep service request, work order, and visit as distinct but linked business records. | One reported need may create multiple controlled jobs, and one job may require multiple site attendances. | Proposed |
| `DEC-019` | Bind customer approval to an exact proposal revision and require changed chargeable scope to be proposed again. | Field scope changes must not silently extend earlier approval. | Proposed |
| `DEC-020` | Record outcomes per equipment or work item as well as for the overall work order. | A multi-unit visit may complete some work while other units remain unresolved. | Proposed |
| `DEC-021` | Keep operational completion, customer acknowledgment, external payment evidence, and payment verification as separate facts. | Work may be complete while acceptance or external settlement evidence remains pending or disputed. | Proposed |
| `DEC-022` | Use a common workflow control envelope with configurable job templates and policy-driven required steps. | Small and large organizations need different governance depth without different core business meanings. | Proposed |
| `DEC-023` | Require every incomplete, failed, or exception outcome to identify a disposition or accountable next action. | Closing a visit must not hide unresolved customer, equipment, safety, material, warranty, or payment obligations. | Proposed |
| `DEC-024` | Treat cancellation, rescheduling, reopening, and correction as history-preserving transitions. | Operational changes must remain attributable instead of overwriting what previously happened. | Proposed |
| `DEC-025` | Keep customer account, contact, service site, and equipment as separate but related concepts. | The payer, approver, equipment owner, site contact, and person present may differ. | Proposed |
| `DEC-026` | Keep equipment identity and lifecycle history independent from the organization that installed or currently services it. | Different providers may install, service, repair, move, or warrant the same equipment. | Proposed |
| `DEC-027` | Allow one work order to contain multiple visits and equipment units while preserving work-item and outcome attribution per unit. | Commercial and field work may be coordinated together without losing equipment-level history. | Proposed |
| `DEC-028` | Keep planned assignment and actual work participation as separate facts. | Crew membership may change, and responsibility must reflect who was assigned and who actually worked. | Proposed |
| `DEC-029` | Make evidence inherit organization ownership and access sensitivity from its business context. | A photo or document must not become broadly visible merely because it is stored in a shared evidence capability. | Proposed |
| `DEC-030` | Treat stock balance as the result of attributable stock transactions rather than an independently rewritten historical fact. | Inventory integrity requires receipt, reservation, issue, use, return, transfer, damage, and adjustment meanings to remain traceable. | Proposed |
| `DEC-031` | Treat dashboards, reports, and derived analytics as views of governed operational records, not independent sources of business truth. | Corrections belong in the authoritative workflow and must flow into reporting. | Proposed |
| `DEC-032` | Define target business capabilities independently from subscription packages and delivery phases. | Product completeness, commercial packaging, and implementation sequencing are different decisions. | Proposed |
| `DEC-033` | Preserve canonical business meanings while allowing tenant-facing labels, optional steps, and governed workflow depth to vary. | Configuration must not make reporting, audit, or integration semantics ambiguous. | Proposed |
| `DEC-034` | Authorize actions through permissions, organization context, scope, record state, and policy rather than job-title labels alone. | One person may hold several roles, while the same title may have different authority across organizations. | Proposed |
| `DEC-035` | Make evidence and checklist requirements policy-driven within fixed safety, audit, and integrity constraints. | Small organizations need simple capture while higher-risk or enterprise work needs stronger evidence. | Proposed |
| `DEC-036` | Prohibit exception, failure, missing-evidence, and unresolved states from being represented as successful completion. | Management and customers must be able to trust completion meaning. | Proposed |
| `DEC-037` | Apply the same business validation and authorization to synchronized offline changes as to online changes. | Temporary disconnection must not create a weaker trust boundary. | Proposed |
| `DEC-038` | Attribute system-generated and automated actions to an identifiable rule, schedule, integration, or platform actor. | Automation must remain explainable and auditable. | Proposed |
| `DEC-039` | Handle deletion, anonymization, reversal, correction, and merge through controlled lifecycle actions rather than ordinary destructive edits. | Historical meaning, privacy duties, and audit evidence require explicit treatment. | Proposed |
| `DEC-040` | Do not infer customer approval, work completion, payment settlement, or acceptance solely from message delivery, document creation, or uploaded evidence. | Supporting evidence and the governed business decision are separate facts. | Proposed |

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
| `OPEN-014` | Which customer approval and acknowledgment methods are acceptable for each risk level? | Product owner | Commercial and evidence requirements |
| `OPEN-015` | Which emergency or safety work may proceed before ordinary customer approval, and under whose authority? | Product owner and legal review | Emergency workflow acceptance |
| `OPEN-016` | Are cancellation, travel, inspection, or no-access charges supported, and what approval is required? | Product owner | Commercial requirements |
| `OPEN-017` | Which events start, pause, resume, and stop contract response and resolution commitments? | Product owner | Contract and SLA requirements |
| `OPEN-018` | Are quotations, invoices, tax documents, and service receipts generated by this product or integrated from accounting? | Product owner and accounting review | Commercial-document scope |
| `OPEN-019` | What chain-of-custody evidence is mandatory when equipment or components leave the customer site? | Product owner | Workshop and custody requirements |
| `OPEN-020` | Which gas type, quantity, leakage, safety, and regulatory details are mandatory in the initial market? | Product owner and domain review | Gas-service requirements |
| `OPEN-021` | Which offline edits may be merged automatically and which conflicts require human resolution? | Product owner and architecture review | Offline synchronization architecture |
| `OPEN-022` | Which customer, site, and equipment attributes participate in duplicate detection, merge, and controlled separation? | Product owner and domain review | Data-quality requirements |
| `OPEN-023` | How is equipment identity handled when serial numbers are absent, duplicated, unreadable, replaced, or component-specific? | Product owner and domain review | Equipment identity requirements |
| `OPEN-024` | May one contact identity be shared across customer accounts, or is each customer-contact relationship independently maintained? | Product owner and privacy review | Customer-domain requirements |
| `OPEN-025` | How are equipment ownership, payer responsibility, site custody, and service authorization changed over time? | Product owner and legal/privacy review | Equipment relationship requirements |
| `OPEN-026` | Which air-conditioning catalog concepts remain specialized and which become configurable reference data for other industries? | Product owner | Cross-industry domain acceptance |
| `OPEN-027` | Which inventory costing, job-cost, margin, tax, and accounting meanings belong in the product? | Product owner and accounting review | Commercial and inventory requirements |
| `OPEN-028` | What retention, archival, export, anonymization, and deletion rules apply to each business-record and evidence class? | Product owner and legal/privacy review | Data-lifecycle architecture |
| `OPEN-029` | Are subcontractors modeled as workers, suppliers, partner organizations, or a distinct controlled relationship? | Product owner | Workforce and supplier requirements |
| `OPEN-030` | What identity and delegation model allows customers to view or act for households, companies, sites, and equipment? | Product owner and security review | Customer-surface requirements |
| `OPEN-031` | Which canonical workflow states may tenants relabel, extend, hide, or map while preserving platform meaning? | Product owner and domain review | Workflow-configuration requirements |
| `OPEN-032` | What is the first accepted role-permission and separation-of-duties matrix? | Product owner and security review | Authorization architecture |
| `OPEN-033` | Which photos, readings, signatures, checklists, and documents are mandatory by work type and risk? | Product owner and domain review | Evidence requirements |
| `OPEN-034` | What numbering, revision, validity, language, currency, and legal-content rules govern commercial and service documents? | Product owner and accounting/legal review | Document requirements |
| `OPEN-035` | Which notification channels, consent rules, quiet periods, templates, retries, and delivery evidence are required? | Product owner and privacy review | Notification architecture |
| `OPEN-036` | Which KPI definitions and management-dashboard measures are accepted as operational truth? | Product owner | Reporting requirements |
| `OPEN-037` | Which import/export formats and external accounting, messaging, mapping, or identity integrations are first required? | Product owner | Integration architecture |
| `OPEN-038` | What measurable performance, availability, recovery, offline, upload, compatibility, and accessibility targets are required? | Product owner and architecture review | Architecture gate |
| `OPEN-039` | What first-release tenant, user, customer, equipment, job, attachment, inventory, project, and concurrency volumes must be proven? | Product owner and architecture review | Scalability proof plan |
| `OPEN-040` | Which records are subject to legal hold, customer export, correction, anonymization, or deletion restrictions? | Product owner and legal/privacy review | Data-lifecycle requirements |

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
