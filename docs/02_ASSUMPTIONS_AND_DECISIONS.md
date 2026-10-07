# Assumptions and Product Decisions

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted WP-01 baseline — living decision register |
| Work package | `WP-01 Product Vision and Boundaries` |
| Owner | Aung Myo Oo |
| Last updated | 2026-10-07 |

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
| `DEC-041` | Close Product Discovery only through explicit owner acceptance that assigns every unresolved item to a later decision gate. | An open item may remain without blocking architecture analysis when its owner, deadline, impact, and stop condition are explicit. | Proposed |
| `DEC-042` | Treat authorization for architecture analysis, architecture selection, technical proofs, and application implementation as separate gates. | Readiness to analyze options does not authorize selecting or building a solution. | Proposed |
| `DEC-043` | Require solution architecture to preserve accepted product meanings and trace every material trade-off to governing constraints and requirements. | Technology must implement the product rather than silently redefine it. | Proposed |
| `DEC-044` | Begin architecture work with cross-cutting trust and field-risk concerns before detailed application decomposition. | Tenant isolation, authorization, offline conflict, evidence, audit, and white-label delivery are expensive to retrofit. | Proposed |
| `DEC-045` | Require architecture artifacts, ADRs, risk analysis, and technical-proof evidence before architecture selection is accepted. | A diagram or preferred stack alone is insufficient evidence for implementation authorization. | Proposed |
| `DEC-046` | Define initial-release capability disposition separately from the accepted target product and before implementation-roadmap approval. | The complete target model must not force every capability into the first commercial release. | Proposed |
| `DEC-047` | Keep Product Discovery, architecture documentation, technical proofs, roadmap approval, and implementation packages independently publishable and reviewable. | Smaller controlled gates make changes, risks, and authority visible. | Proposed |
| `DEC-048` | Approve `WP-07 Architecture Constraints and Options` as the first architecture-analysis package with documentation and option analysis only. | The owner explicitly authorized this bounded sequence after verified Product Discovery closure. | Accepted |
| `DEC-049` | Compare credible architecture families against the same traceable constraint, quality, cost, team, operability, security, and reversibility criteria before shortlisting. | Consistent evaluation prevents preference-driven selection. | Proposed |
| `DEC-050` | Evaluate application decomposition, tenant/data isolation, client delivery, offline synchronization, evidence storage, reporting, and deployment as related but separately decidable concerns. | One fashionable architecture label does not answer every risk. | Proposed |
| `DEC-051` | Use measurable quality-attribute scenarios and risk evidence to decide architecture fitness. | Feature completeness alone cannot validate performance, availability, offline, recovery, privacy, or operational suitability. | Proposed |
| `DEC-052` | Keep vendor and technology shortlisting closed until geography, residency, budget, skills, operating model, and quality-target inputs are recorded. | Those inputs materially change architecture fit and total cost. | Proposed |
| `DEC-053` | Approve `WP-08 Security, Tenancy, Identity and Access Architecture` for documentation and architecture proposal only after verified WP-07 publication. | The owner explicitly authorized the bounded next architecture package while keeping selection, proofs, coding, and deployment closed. | Accepted |
| `DEC-054` | Carry an authoritative server-resolved security context through every interactive and non-interactive operation and deny when required context is missing, inconsistent, expired, or unauthorized. | Tenant and authority checks cannot depend on client hints or only the initial request boundary. | Proposed |
| `DEC-055` | Keep authenticated identity, organization membership, worker, customer relationship, platform role, support grant, and machine identity as separate authority concepts. | One person or process may hold several relationships; combining them creates privilege and historical-attribution errors. | Proposed |
| `DEC-056` | Evaluate authorization as an explainable decision over subject, action, resource, organization, scope, record state/sensitivity, policy, and purpose rather than role name alone. | Roles are permission groupings, not sufficient proof of access to a particular action or record. | Proposed |
| `DEC-057` | Model platform support access as an explicit temporary grant, read-only by default, without tenant-password sharing or silent impersonation. | Platform authority must not become routine tenant authority, and privileged access must remain attributable and reviewable. | Proposed |
| `DEC-058` | Require defense-in-depth tenant enforcement and negative isolation testing across interactive, background, search, file, report, export, notification, integration, cache, and offline paths. | A control at only one layer cannot protect the full product surface. | Proposed |
| `DEC-059` | Apply risk-based authentication, session, recovery, and step-up requirements, with stronger treatment for platform, ownership, export, deletion, credential, and support-elevation actions. | Compromise impact differs by actor and action, while exact methods and assurance levels remain unresolved. | Proposed |
| `DEC-060` | Protect security and audit evidence from ordinary business editing and expose it only through purpose-limited, scoped, reviewable authority. | Audit evidence is itself sensitive and must not become an unrestricted platform or tenant data view. | Proposed |
| `DEC-061` | Give workloads and integrations distinct, least-privilege machine identities and explicit tenant/purpose context instead of sharing human credentials. | Background and external paths require attribution, rotation, revocation, and containment independent of human sessions. | Proposed |
| `DEC-062` | Approve `WP-09 Data Ownership, Lifecycle and Consistency Architecture` for documentation and architecture proposal only after verified WP-08 publication. | The owner explicitly authorized the bounded next architecture package while keeping selection, proofs, coding, and deployment closed. | Accepted |
| `DEC-063` | Assign every authoritative business record one organization boundary and one governing business capability while allowing explicit references across capabilities. | Shared responsibility without an authoritative owner creates conflicting truth and weakens tenant enforcement. | Proposed |
| `DEC-064` | Preserve stable identity, provenance, business lifecycle, history, retention state, and derived representations as separate data meanings. | A current row or screen state cannot safely represent every historical, legal, and analytical concern. | Proposed |
| `DEC-065` | Represent significant correction through attributable amendment, supersession, reversal, merge/separation, or reconciliation relationships rather than silent historical overwrite. | Work, approvals, stock, evidence, payment claims, and audit meaning must remain reconstructable. | Proposed |
| `DEC-066` | Keep invariants that must succeed or fail together inside one explicit consistency boundary; represent cross-boundary progress and failure as visible recoverable state. | Hidden partial success corrupts business meaning, while forcing every workflow into one global transaction prevents safe evolution. | Proposed |
| `DEC-067` | Require idempotent effect identity and replay-safe handling for retries, offline synchronization, background work, imports, integrations, and derived updates. | Networks and workers retry; duplicated approvals, stock, evidence, claims, and notifications are unacceptable. | Proposed |
| `DEC-068` | Keep stock movements and controlled corrections authoritative and treat stock balances as derived, reconcilable state. | Direct balance editing would erase custody and material history. | Proposed |
| `DEC-069` | Preserve customer/equipment identity claims, provenance, conflicting candidates, and source records through merge, separation, and reconciliation. | Missing/duplicate serials and third-party history make destructive deduplication unsafe. | Proposed |
| `DEC-070` | Keep search, dashboards, reports, analytics, and integration projections derived, tenant-scoped, freshness-visible, rebuildable, and reconcilable to operational truth. | Derived views must improve reads without becoming competing editable truth. | Proposed |
| `DEC-071` | Apply retention, legal hold, export, anonymization, deletion, and recovery policy by record/evidence class across authoritative, derived, offline, integration, audit, and backup copies. | Deleting only the primary representation does not satisfy lifecycle obligations or preserve required history. | Proposed |
| `DEC-072` | Quarantine and reconcile untrusted imports/migrations before they become authoritative, retaining source, mapping, validation, and cutover evidence. | Imported identifiers and histories may be incomplete, conflicting, duplicated, or incorrectly tenant-bound. | Proposed |
| `DEC-073` | Treat backup, recovery, cache, and replica copies as controlled representations rather than new business authority and verify restored invariants before service resumption. | Operational copies must not silently fork tenant truth or reintroduce deleted, stale, or cross-tenant state. | Proposed |
| `DEC-074` | Approve `WP-10 Field, Offline, Evidence and Client Delivery Architecture` for documentation and architecture proposal only after verified WP-09 publication. | The owner explicitly authorized the bounded next architecture package while keeping selection, proofs, coding, and deployment closed. | Accepted |
| `DEC-075` | Analyze assignment-scoped field working sets and bounded offline actions before considering a broad local replica. | Field crews need resilient work under weak connectivity, but broad tenant copies increase leakage, conflict, and revocation risk. | Proposed |
| `DEC-076` | Treat offline-captured actions and evidence as durable provisional intent until current tenant, authority, assignment, state, policy, evidence, and consistency checks succeed during synchronization. | Device capture must survive connectivity loss without bypassing current business or security rules. | Proposed |
| `DEC-077` | Give every retryable field/media operation stable identity, dependency, local state, synchronization result, and recoverable conflict treatment. | Retried uploads and actions must not duplicate work, evidence, stock, payment claims, approvals, or notifications. | Proposed |
| `DEC-078` | Separate evidence business metadata, local content, upload/finalization, safety/quality status, availability, replacement, and retention lifecycle. | A photo existing on a device or object store does not yet make it valid evidence for a business decision. | Proposed |
| `DEC-079` | Produce shared generic and optional branded customer/technician/manager artifacts from one maintained product behavior and governed delivery profiles, without tenant source forks. | White-label delivery must not multiply business logic, security behavior, or unsupported versions. | Proposed |
| `DEC-080` | Treat hostname, custom domain, application identifier, brand, deep link, and cached organization choice only as tenant-routing/presentation hints that require authoritative tenant and user authorization. | Delivery identity cannot safely grant tenant access. | Proposed |
| `DEC-081` | Make delivery-profile and client-version compatibility explicit, observable, and fail-safe across shared and branded artifacts. | Stale clients/configuration must not silently perform unsupported or insecure behavior. | Proposed |
| `DEC-082` | Minimize and protect field/customer local data, bind it to authorized tenant/subject/device context, and support policy-driven revocation, expiry, loss, and controlled cleanup. | Offline capability increases private-data exposure and stale-authority risk. | Proposed |
| `DEC-083` | Keep Admin, Management, Technician, Customer, and public/tenant web responsibilities distinct while reusing common governed capabilities and authorization. | One client should not gain another surface's authority or create separate business truth. | Proposed |
| `DEC-084` | Model media capture/upload as resumable, observable, idempotent work with user-visible queued, uploading, failed, quarantined, available, and replacement states. | Myanmar field connectivity and device limitations require recovery without false evidence completeness. | Proposed |
| `DEC-085` | Approve `WP-11 Integration, Deployment, Resilience and Operations Architecture` for documentation and architecture proposal only after verified WP-10 publication. | The owner explicitly authorized the bounded next architecture package while keeping selection, proofs, coding, and deployment closed. | Accepted |
| `DEC-086` | Require every external exchange to identify organization, source, destination, purpose, actor/workload, contract/mapping version, operation identity, timing, and outcome. | Integration must preserve tenant context, provenance, authorization, audit, and reconciliation rather than becoming an opaque data pipe. | Proposed |
| `DEC-087` | Keep governed internal business records authoritative unless a separately accepted integration contract explicitly defines a validated external authority or claim. | Provider acknowledgment, message delivery, imported content, or webhook receipt must not silently redefine work, approval, payment, inventory, or customer truth. | Proposed |
| `DEC-088` | Use durable asynchronous intent with idempotent handling, visible state, bounded retry, terminal failure, and reconciliation when a business action does not require an immediate external result. | External latency and outages must not corrupt core work or create duplicate effects. | Proposed |
| `DEC-089` | Limit synchronous external dependency to cases whose accepted business contract requires an immediate result and defines timeout, safe failure, retry, and fallback behavior. | Coupling every user action to provider availability would make field and office work fragile. | Proposed |
| `DEC-090` | Separate development, test, proof, staging, and production authority, data, identities, credentials, endpoints, and operational evidence. | Environment confusion and reuse of production data or credentials can breach tenant isolation and invalidate testing. | Proposed |
| `DEC-091` | Promote attributable versioned product artifacts and configuration through explicit compatibility, approval, verification, rollback, and recovery gates. | A release is a controlled operational change, not an untracked file or mutable environment state. | Proposed |
| `DEC-092` | Define dependency-specific degraded modes and make partial, delayed, unavailable, and recovered behavior visible without falsely reporting business success. | The platform must continue safe work where possible while preserving exact obligations during dependency failure. | Proposed |
| `DEC-093` | Treat backups as controlled copies and restored state as untrusted until isolated verification proves tenant, lifecycle, audit, evidence, stock, idempotency, and external-effect invariants. | Backup completion alone does not prove recoverability or safe resumption. | Proposed |
| `DEC-094` | Correlate operations across interactive, background, integration, media, synchronization, and recovery paths while minimizing tenant/customer content and separating audit from diagnostics. | Support and incident response require traceability without creating a second unrestricted data store. | Proposed |
| `DEC-095` | Give operational and production access named least-privilege identities, explicit purpose/environment scope, time bounds where applicable, and attributable change/access evidence. | Infrastructure or operational custody must not become routine tenant-data browsing authority. | Proposed |
| `DEC-096` | Govern incidents through explicit detection, severity, containment, investigation, tenant/customer communication, recovery, verification, and review states. | Service restoration without impact understanding, evidence, or follow-up leaves security and business risk unresolved. | Proposed |
| `DEC-097` | Define capacity, quotas, backpressure, workload isolation, and cost visibility against accepted small-to-enterprise demand without changing canonical business behavior by tenant size. | One tenant or background workload must not exhaust shared resources or force unaffordable over-provisioning. | Proposed |
| `DEC-098` | Inventory and govern external services, runtime components, build inputs, artifacts, and operational dependencies through ownership, supported versions, vulnerability response, change evidence, and exit treatment. | Unowned or obsolete dependencies create security, continuity, and provider-lock-in risk. | Proposed |
| `DEC-099` | Approve `WP-12 Architecture Synthesis, Quality Targets and Selection Readiness` for documentation and option analysis only after verified WP-11 publication. | The owner explicitly authorized synthesis while keeping architecture selection, proofs, coding, and deployment closed. | Accepted |
| `DEC-100` | Evaluate complete architecture combinations against one common set of product constraints, planning targets, risks, operating capacity, cost, evidence, and reversal criteria. | Optimizing isolated technology choices can produce an incoherent or unoperable system. | Proposed |
| `DEC-101` | Keep owner-stated/accepted requirements, proposed planning baselines, measured proof results, and accepted architecture decisions visibly distinct. | A convenient estimate must not become an accidental commitment or architecture decision. | Proposed |
| `DEC-102` | Prefer the least operationally complex combination that satisfies accepted tenant, business, field, evidence, recovery, scale, and delivery constraints with credible growth paths. | The team and early customers cannot fund complexity that lacks demonstrated benefit. | Proposed |
| `DEC-103` | Require every shortlisted combination to preserve later separation, scale, provider change, and dedicated-tenant paths without promising zero-cost migration. | Small-to-enterprise support needs evolution without premature maximum complexity. | Proposed |
| `DEC-104` | Sequence architecture decisions by trust and invariant dependency before provider, framework, or deployment-product selection. | Technology evaluation is meaningful only after tenant, authority, data, offline, evidence, integration, and operations boundaries are coherent. | Proposed |
| `DEC-105` | Mark architecture selection not ready while required quality targets, operating constraints, decision owners, and proof entry conditions remain unresolved. | A stack choice made without measurable fitness and operating context would be preference rather than evidence. | Proposed |
| `DEC-106` | Approve `WP-13 Quality Baseline and Architecture Shortlist Decision` for owner decision documentation only after verified WP-12 publication. | The owner authorized a bounded decision package while keeping final selection, proof execution, coding, and deployment closed. | Accepted |
| `DEC-107` | Treat accepted WP-13 numeric values as architecture-evaluation baselines rather than customer SLAs or production commitments until independently approved for those purposes. | Evaluation needs concrete loads and targets without silently creating commercial promises. | Accepted |
| `DEC-108` | Advance the operationally simple governed platform profile as the primary evaluation profile and the selectively separated workload profile as a comparative/evolution profile. | Current evidence favors low operational complexity while retaining a measured growth path. | Accepted |
| `DEC-109` | Defer dedicated enterprise placement until an accepted tenant/residency/isolation need exists and reject the highly distributed profile for the initial architecture. | Neither profile's cost and complexity is justified by current targets. | Accepted |
| `DEC-110` | Keep the initial integration envelope minimal: no payment-provider integration, and no accounting or other external system is required until separately prioritized and contracted. | The accepted product records external payment evidence, and unneeded integrations would delay field-service value. | Accepted |
| `DEC-111` | Require tenant-isolation, authorization, offline synchronization, evidence/media, branded delivery, domain routing, scale/reporting, and recovery evidence before final architecture acceptance as applicable to shortlisted candidates. | These risks cannot be closed by document analysis alone. | Accepted |
| `DEC-112` | Prefer managed operational capabilities where they meet accepted gates, budget, geography, reversibility, and team skills, without transferring product accountability to providers. | A small team needs low operational burden but cannot outsource tenant or business correctness. | Accepted |
| `DEC-113` | Approve `WP-14 Technology Category and Provider-Neutral Candidate Evaluation` for documentation and option analysis only after verified WP-13 publication. | The owner authorized category comparison while keeping final selection, named providers, proofs, coding, and deployment closed. | Accepted |
| `DEC-114` | Evaluate technology categories as a coherent fit to `SHORTLIST-001` and comparative `SHORTLIST-002`, not as isolated popularity choices. | A collection of individually attractive tools may violate the accepted simplicity, consistency, offline, or operating constraints. | Proposed |
| `DEC-115` | Keep named vendors/products and dependency installation outside category evaluation until budget, geography/residency, evidence requirements, and a later named-candidate gate are resolved. | Provider fitness and total cost cannot be judged from category analysis alone. | Proposed |
| `DEC-116` | Approve `WP-15 Budget, Geography, Team Fit and Named Candidate Shortlist` for owner decision documentation and named-candidate analysis after verified WP-14 publication. | The owner authorized named analysis while keeping final selection, proofs, dependencies, coding, and deployment closed. | Accepted |
| `DEC-117` | Use a USD 300 monthly target and USD 500 monthly owner-review threshold for recurring initial-commercial provider cost, subject to the exclusions and revenue controls in WP-15. | A concrete but revisable envelope lets a self-funded small team reject architecture that needs enterprise spend before revenue evidence. | Accepted |
| `DEC-118` | Use Singapore as the initial production hosting and data-residency evaluation geography, subject to legal/privacy review and measured Myanmar connectivity. | It provides the common nearby region with the strongest current coverage across the shortlisted providers. | Accepted |
| `DEC-119` | Treat Android as the mandatory first installed Technician target, keep iOS build compatibility for a later release decision, and keep Customer and Management delivery web-first. | This limits initial distribution cost while preserving the shared multi-platform and branded-delivery path. | Accepted |
| `DEC-120` | Limit the initial maintained application stack to the team's evidenced TypeScript/Node/React and Dart/Flutter families unless a candidate proves a material gate advantage. | Reusing demonstrated delivery skills reduces learning and operating load for an owner-led team. | Accepted |
| `DEC-121` | Advance a portable TypeScript/Flutter/PostgreSQL core and a small Singapore provider shortlist only for later proof planning; do not treat any candidate as selected. | The shortlist must narrow evaluation without bypassing tenant, offline, evidence, recovery, cost, or independent-review gates. | Accepted |

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
| `OPEN-041` | Which deployment geography, data-residency, connectivity, and provider-availability constraints apply to the first market? | Product owner and architecture review | Architecture option evaluation |
| `OPEN-042` | What delivery budget, operating capacity, support model, and team-skill constraints govern architecture choice? | Product owner | Architecture option evaluation |
| `OPEN-043` | Which architecture decisions require independent security, privacy, accounting, or domain review before acceptance? | Product owner | Architecture governance |
| `OPEN-045` | Which authentication methods, assurance levels, and step-up requirements apply to each human actor, surface, and high-risk action? | Product owner and security review | Identity architecture acceptance |
| `OPEN-046` | What proof, notification, delay, dual-control, and recovery rules govern credential reset, identity change, account recovery, and suspected compromise? | Product owner and security review | Account-recovery architecture acceptance |
| `OPEN-047` | What session, device, offline authorization, token lifetime, inactivity, concurrency, and revocation expectations apply by actor and risk? | Product owner and security review | Session architecture acceptance |
| `OPEN-048` | Which background workloads and integrations require machine identities, tenant binding, secret rotation, workload attestation, or external federation? | Architecture and security review | Machine-identity architecture acceptance |
| `OPEN-049` | Which tenant and customer data classes require masking, field-level restriction, download controls, or stronger purpose limitation? | Product owner and privacy/security review | Data-access architecture acceptance |
| `OPEN-050` | What security-event detection, response, tenant notification, evidence retention, and privileged investigation rules are required? | Product owner and security/privacy review | Security operations architecture acceptance |
| `OPEN-051` | Which business records have one governing capability, and which cross-capability references or shared concepts require explicit stewardship exceptions? | Product owner, domain, and architecture review | Data ownership architecture acceptance |
| `OPEN-052` | Which corrections, reversals, merges, separations, reopenings, and evidence replacements require reasons, approval, notification, time limits, or independent review? | Product owner, domain, accounting, and privacy review | Historical correction architecture acceptance |
| `OPEN-053` | Which multi-record business operations must commit atomically, and which may use explicit pending, compensating, or reconciliation states? | Product owner and architecture review | Consistency-boundary architecture acceptance |
| `OPEN-054` | What validation, quarantine, mapping, duplicate treatment, cutover, rollback, and acceptance evidence govern imports and migrations? | Product owner, domain, and architecture review | Migration/import architecture acceptance |
| `OPEN-055` | What freshness, lag, rebuild time, reconciliation tolerance, and failure visibility are accepted for search, dashboards, reports, and other derived data? | Product owner and architecture review | Derived-data architecture acceptance |
| `OPEN-056` | What tenant export, portability, tenant-specific restore, cancellation, deletion verification, and recovery-window obligations apply? | Product owner and legal/privacy review | Tenant lifecycle architecture acceptance |
| `OPEN-057` | How do retention, legal hold, anonymization, deletion, and consent withdrawal propagate to backups, audit evidence, offline devices, integrations, and derived copies? | Product owner and legal/privacy/security review | Copy-lifecycle architecture acceptance |
| `OPEN-058` | Which records and fields require immutable versions or full change history, and which may retain only governed current value plus audit evidence? | Product owner, domain, accounting, and legal/privacy review | Record-history architecture acceptance |
| `OPEN-059` | Which browser, operating-system, device, camera, storage, screen-size, background-execution, and performance combinations must each client surface support? | Product owner and architecture review | Client technology and compatibility acceptance |
| `OPEN-060` | What offline duration, assignment count, record/media volume, local storage, synchronization time, and degraded-mode behavior must field clients support? | Product owner and architecture review | Offline architecture and proof acceptance |
| `OPEN-061` | Which offline actions may auto-apply, which require conflict resolution, and which are prohibited by record type, state, authority, or risk? | Product owner, domain, security, and architecture review | Synchronization policy acceptance |
| `OPEN-062` | Which evidence types, counts, metadata, quality, size, compression, editing, watermark, retry, resumability, safety scan, and retention rules apply by work/risk type? | Product owner, domain, security, and architecture review | Evidence/media architecture acceptance |
| `OPEN-063` | What device enrollment, local encryption, authentication, lock, root/jailbreak, backup, screen capture, remote revocation/wipe, and lost-device policy is required? | Product owner and security review | Field/customer device-security acceptance |
| `OPEN-064` | What client-version support window, forced/security upgrade, backward compatibility, configuration compatibility, deprecation, and offline-upgrade policy is required? | Product owner, support, and architecture review | Client release architecture acceptance |
| `OPEN-065` | Who owns branded-app store accounts, signing identities, credentials, reviews, releases, support, analytics, legal listings, and emergency updates? | Product owner and operations review | White-label delivery architecture acceptance |
| `OPEN-066` | Who owns product/custom-domain verification, certificates, DNS change, collision prevention, deep/universal links, renewal, suspension, and removal? | Product owner, security, and operations review | Domain-routing architecture acceptance |
| `OPEN-067` | Which notification channels, background behaviors, deep links, consent, quiet periods, retry, delivery evidence, and sensitive-content restrictions apply to each client? | Product owner, privacy, and architecture review | Client notification architecture acceptance |
| `OPEN-068` | What Myanmar/English terminology, Unicode, address, currency/time, document, accessibility, and field-usability acceptance corpus applies to each client surface? | Product owner, domain, accessibility, and architecture review | Client experience acceptance |
| `OPEN-069` | Which external systems, notification channels, identity/mapping/accounting services, imports, exports, and provider relationships belong to the first release, and who owns each relationship? | Product owner, operations, and architecture review | Integration scope acceptance |
| `OPEN-070` | For each integration, what authority direction, contract/version, mapping, volumes, limits, timeout, retry, ordering, duplicate, reconciliation, privacy, and support guarantees apply? | Product owner, domain, security, and architecture review | Integration contract acceptance |
| `OPEN-071` | What development, test, proof, staging, and production environment model, access, data policy, parity, promotion, and retention controls are required? | Engineering, security, privacy, and operations review | Environment architecture acceptance |
| `OPEN-072` | What deployable-unit, change sequencing, compatibility, maintenance-window, rollback, and roll-forward behavior is required for application, configuration, data, client, and integration changes? | Engineering and operations review | Release/deployment architecture acceptance |
| `OPEN-073` | What numeric availability, dependency, latency, queue-age, degraded-mode, maintenance, and support-hour objectives apply to each critical workflow and surface? | Product owner, operations, and architecture review | Availability architecture acceptance |
| `OPEN-074` | What backup inventory, frequency, recovery point/time, retention, isolation, encryption/key, immutability, geography, tenant-granularity, and restore-verification targets apply? | Product owner, security, privacy, and operations review | Backup/recovery architecture acceptance |
| `OPEN-075` | Which metrics, logs, traces, events, audit evidence, synthetic checks, alert thresholds, retention, masking, tenant views, and diagnostic access are required? | Operations, security, privacy, and support review | Observability architecture acceptance |
| `OPEN-076` | What incident severity, on-call/support hours, escalation, containment, communication, regulatory/tenant notification, recovery, and post-incident rules apply? | Product owner, security, privacy/legal, and operations review | Incident-management acceptance |
| `OPEN-077` | What workload forecasts, concurrency, queue/media/report volumes, growth, burst, quotas, backpressure, resource isolation, and cost budgets must be supported? | Product owner, finance, operations, and architecture review | Capacity/cost architecture acceptance |
| `OPEN-078` | What release frequency, change window, approval, progressive delivery, feature/configuration control, emergency disable, rollback, and evidence requirements apply? | Product owner, engineering, security, and operations review | Release-governance acceptance |
| `OPEN-079` | Which workflows require documented manual/degraded operation, customer communication, data capture, later reconciliation, and business-continuity exercises? | Product owner, domain, and operations review | Continuity/degraded-mode acceptance |
| `OPEN-080` | Which production, platform, support, database/storage, network, backup, secret, build, and provider operations require dual control, step-up, session recording, review, or tenant notification? | Security, privacy, and operations review | Privileged-operations acceptance |
| `OPEN-081` | What service ownership, runbook, escalation, support boundary, vendor-support, status-page, maintenance, and end-of-life responsibilities exist for every operational dependency? | Product owner and operations review | Operating-model acceptance |
| `OPEN-082` | What component inventory, provenance, signing, vulnerability severity/remediation, patch cadence, exception, artifact retention, and dependency-exit requirements apply? | Security, engineering, and operations review | Supply-chain and lifecycle acceptance |
| `OPEN-087` | What evidence threshold and reviewer set are required to move a proposal from `CONF-1` to `CONF-2` and then to accepted architecture? | Product owner and architecture governance | Selection gate acceptance |
| `OPEN-092` | What measured Singapore-to-Myanmar latency, packet-loss, mobile-device, and weak-network results are acceptable for the named deployment candidates? | Architecture and field-device proof review | Geography/provider proof gate |
| `OPEN-093` | What Myanmar and Singapore legal/privacy terms, customer notices, contracts, and cross-border handling apply to tenant data and evidence? | Owner and qualified legal/privacy review | Production residency approval |
| `OPEN-094` | Which managed identity candidate satisfies tenant mapping, account recovery, support access, export, pricing, and fail-safe session requirements? | Security review and later proof | Identity selection |
| `OPEN-095` | What measured evidence size, retention, retrieval, and egress profile should drive object-storage cost and lifecycle comparison? | Product, privacy, and cost review | Provider cost model |
| `OPEN-096` | Which exact database access and offline storage libraries best preserve tenant enforcement, migrations, encryption, and testability? | Architecture/security review and later proof | Dependency selection |

## Resolved question register

| ID | Resolution | Decision | Resolved date |
| --- | --- | --- | --- |
| `OPEN-044` | Begin with WP-07 documentation and option analysis; keep selection, proof execution, coding, and deployment closed. | `DEC-048` | 2026-09-30 |
| `OPEN-083` | Accept `QBD-001` through `QBD-015` as architecture-evaluation baselines, not SLAs or production commitments. | `DEC-107` | 2026-10-01 |
| `OPEN-084` | Accept the qualitative lean-team, managed-capability, supported-hours, and release evaluation envelope; monetary budget remains `OPEN-088`. | `DEC-112`, `EVAL-BASE-009`, `EVAL-BASE-010`, `EVAL-BASE-012` | 2026-10-01 |
| `OPEN-085` | Advance `SHORTLIST-001`, retain `SHORTLIST-002` as comparative, defer `SHORTLIST-003`, and reject `SHORTLIST-004` for the initial architecture. | `DEC-108`, `DEC-109` | 2026-10-01 |
| `OPEN-086` | Accept `ADR-DISP-001` through `ADR-DISP-015` as the review/proof classification; exact `CONF-2` evidence remains under `OPEN-087`. | `DEC-111` | 2026-10-01 |
| `OPEN-088` | Accept `BUDGET-BASE-001` through `006` as the monetary and commercial-control evaluation baseline; no permission to spend or production cost proof is implied. | `DEC-117` | 2026-10-07 |
| `OPEN-089` | Accept `GEO-BASE-001` through `006` with Singapore as the initial evaluation geography; legal/privacy approval and measured connectivity remain open. | `DEC-118`, `OPEN-092`, `OPEN-093` | 2026-10-07 |
| `OPEN-090` | Accept `TEAM-BASE-001` through `006` as the team/runtime evaluation baseline. | `DEC-120` | 2026-10-07 |
| `OPEN-091` | Accept `CLIENT-BASE-001` through `005` as the initial client-platform and distribution evaluation baseline. | `DEC-119` | 2026-10-07 |

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
