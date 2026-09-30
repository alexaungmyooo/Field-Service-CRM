# Architecture Constraints and Options

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — WP-07 option-analysis baseline; no architecture selected |
| Work package | `WP-07 Architecture Constraints and Options` |
| Owner | Aung Myo Oo |
| Last updated | 2026-09-30 |
| Architecture selection | Not authorized |
| Technical-proof execution | Not authorized |
| Application coding | Not authorized |
| Deployment | Not authorized |

## Purpose

Establish the architecture problem before choosing a solution. This document records system
context, trust boundaries, quality-scenario templates, evaluation criteria, credible option
families, trade-offs, dependencies, and a shortlist for later analysis.

The document does **not** choose a programming language, framework, database product, cloud
provider, deployment region, final component structure, or implementation approach. A shortlist is
an invitation to investigate; it is not an accepted architecture decision.

## Governing inputs

- Product Discovery closure and the twenty constraints `ARC-C-001` through `ARC-C-020`
- Accepted behavioral requirements `SR-*`
- Quality-target gates `QR-PERF-001` through `QR-SEC-001`
- Candidate decisions `ADR-CAND-001` through `ADR-CAND-015`
- Candidate proofs `TP-CAND-001` through `TP-CAND-010`
- Readiness risks `RISK-AR-001` through `RISK-AR-010`
- Open inputs, especially `OPEN-008`, `OPEN-013`, `OPEN-021`, `OPEN-028`,
  `OPEN-030` through `OPEN-043`

## Explicit non-scope

- final or accepted architecture;
- vendor or technology shortlist;
- executable prototypes, benchmarks, or security tests;
- schemas, APIs, services, events, migrations, or deployment configuration;
- initial-release capability commitment;
- application scaffolding, code, or runtime dependencies;
- external account, domain, certificate, store, or cloud changes.

## System context

### Human actor groups

| Group | Architecture-relevant interaction |
| --- | --- |
| Customer actors | Submit requests, view appointments/equipment/documents, approve scope, acknowledge work, and provide external-payment evidence within delegated scope |
| Office and dispatch actors | Control customers, requests, schedules, assignments, communication, proposals, follow-ups, and exceptions |
| Field crews | Use assignment-scoped information, capture inspection/work/evidence under weak connectivity, and synchronize attributable outcomes |
| Managers and approvers | Review operational health, exceptions, commercial decisions, payment evidence, contracts, projects, and audit-sensitive actions |
| Store and purchasing actors | Control stock, material demand, receipt, issue, transfer, consumption, return, variance, and custody |
| Organization administrators | Control memberships, branches, policy, configuration, delivery profiles, evidence, and authorized exports |
| Platform operators | Control organization lifecycle, delivery/service health, support cases, releases, and recovery metadata without routine tenant-data access |
| Platform support/security actors | Enter explicit support sessions or review restricted security/audit evidence under stronger controls |

### Product surfaces

| Surface | Context |
| --- | --- |
| Shared Admin Portal | Detailed tenant-aware office, configuration, dispatch, inventory, commercial, project, reporting, and audit work |
| Management Dashboard | Mobile-optimized role-aware summaries, alerts, approvals, trends, and secure navigation to detail |
| Technician experience | Assignment, site/equipment context, field capture, offline work, materials, evidence, tests, outcomes, and follow-up |
| Customer experience | Requests, appointments, approvals, progress, equipment, documents, reminders, and delegated access |
| Organization web identity | Product subdomain or verified custom domain controlling presentation and tenant hint, not authorization |
| Platform operations | Organization directory, lifecycle, delivery state, service health, support cases, controlled sessions, releases, and recovery |
| Branded artifacts | Organization-configured customer, technician, and optional manager application identities produced from shared maintained code |

### External context categories

External systems are not yet selected. Architecture options must account for:

- identity and communication providers;
- mapping/geocoding and address assistance;
- external accounting or document systems;
- MMQR-capable payment providers only as external evidence sources unless later integration is
  accepted;
- application distribution/signing services;
- custom-domain and certificate systems;
- monitoring, backup, recovery, and security services;
- supplier/manufacturer systems and controlled imports/exports.

## Trust boundaries

| ID | Boundary | Required behavior |
| --- | --- | --- |
| `TB-01` | Internet/client to trusted application boundary | Never trust tenant, role, branch, brand, hostname, application identity, or record identifiers without authoritative checks |
| `TB-02` | Organization A to Organization B | Prevent cross-tenant read, write, search, link, export, file, report, notification, integration, and offline effects |
| `TB-03` | Platform authority to tenant authority | Platform role does not create tenant membership; private access requires controlled support session |
| `TB-04` | Online state to offline device state | Cache only permitted scope; revalidate authorization, policy, conflict, and idempotency during synchronization |
| `TB-05` | Operational records to evidence/media | Evidence inherits tenant, subject, sensitivity, retention, and authorization; storage location grants no access |
| `TB-06` | Internal system to external provider | Preserve source, purpose, tenant, mapping, idempotency, failure, reconciliation, privacy, and secret boundaries |
| `TB-07` | Shared product to branded delivery | Branding and configuration may select presentation but cannot change authorization or create divergent business behavior |
| `TB-08` | Operational source to reports/analytics | Derived views preserve scope and definitions and cannot silently rewrite source records |
| `TB-09` | Ordinary operations to privileged/audit operations | Support, export, deletion, recovery, break-glass, and audit access require stronger explicit authority |
| `TB-10` | Current state to historical state | Correction, merge, reversal, reopening, and deletion preserve required prior meaning and attribution |

## Architecture evaluation criteria

Weights remain unaccepted until `OPEN-041`, `OPEN-042`, `OPEN-038`, and `OPEN-039` are
resolved. Every option must still be evaluated against the same criteria.

| ID | Criterion | Evaluation question |
| --- | --- | --- |
| `EVAL-001` | Tenant isolation and security | Can the option make cross-tenant failure difficult, detectable, testable, and recoverable across every path? |
| `EVAL-002` | Domain correctness | Does it preserve accepted business ownership, lifecycle, audit, dynamic scope, and per-unit outcomes? |
| `EVAL-003` | Offline and field resilience | Can it support temporary disconnection, safe synchronization, evidence recovery, and revoked/stale access? |
| `EVAL-004` | Operational simplicity | Can the expected team operate, observe, support, patch, back up, and restore it reliably? |
| `EVAL-005` | Cost and scale elasticity | Is cost proportionate for small tenants while providing credible growth paths for enterprise workload? |
| `EVAL-006` | Change isolation and maintainability | Can domains and product surfaces evolve without widespread regression or tenant-specific forks? |
| `EVAL-007` | Data integrity and consistency | Can it protect approvals, stock, custody, evidence, payment claims, audit, and idempotent effects? |
| `EVAL-008` | Performance and reporting | Can it meet accepted interactive, upload, search, dashboard, report, and history targets under proven load? |
| `EVAL-009` | Delivery flexibility | Can shared, custom-domain, and branded delivery remain compatible and securely tenant-bound? |
| `EVAL-010` | Integration safety | Can external exchange preserve provenance, privacy, retries, reconciliation, and authorization? |
| `EVAL-011` | Reversibility | Can the team change boundaries, providers, deployment shape, or scale strategy without unacceptable migration risk? |
| `EVAL-012` | Evidence and confidence | Which claims are established by accepted requirements, analysis, proof, measurement, or only assumption? |

## Quality-attribute scenario templates

Numeric measures are intentionally marked **TBD**. WP-07 defines the measurement question, not the
answer.

| ID | Quality gate | Scenario template | Measure required before selection |
| --- | --- | --- | --- |
| `QAS-001` | `QR-PERF-001` | Under defined concurrent office/field load, critical create/update/search/dashboard/upload operations complete within accepted percentiles | Operation list, workload, percentile, response/throughput targets |
| `QAS-002` | `QR-SCALE-001` | A defined small, growing, and enterprise tenant portfolio operates without tenant leakage or unacceptable degradation | Tenant/branch/user/record/media/concurrency volumes |
| `QAS-003` | `QR-AVAIL-001` | A dependency or application failure occurs during office and field operation | Availability objective, degraded behavior, maintenance/exclusion rules |
| `QAS-004` | `QR-OFFLINE-001` | A crew works offline while office assignment/policy changes and later reconnects | Offline duration/data size, sync time, conflict/revocation/recovery limits |
| `QAS-005` | `QR-MEDIA-001` | A crew captures required photos/documents on target devices and weak networks | Types, count, size, quality, retry, resume, scan, retention targets |
| `QAS-006` | `QR-RECOVERY-001` | Data/service loss requires recovery with tenant, audit, evidence, and stock consistency | Backup interval, recovery point/time, verification and regional scope |
| `QAS-007` | `QR-DATA-001` | Retention, export, legal hold, anonymization, deletion, and recovery are requested for each record class | Class-specific windows, exceptions, evidence, completion measures |
| `QAS-008` | `QR-L10N-001` | Myanmar and English users search, sort, enter addresses, view currency/time, and generate documents | Fidelity corpus, terminology, fallback and document acceptance |
| `QAS-009` | `QR-ACCESS-001` | Office, management, field, and customer users operate supported surfaces with accessibility needs | Conformance level, task success, keyboard/screen-reader/contrast criteria |
| `QAS-010` | `QR-COMPAT-001` | Supported browser/device/OS/camera/file combinations execute critical journeys | Compatibility matrix, deprecation policy, minimum device constraints |
| `QAS-011` | `QR-OBS-001` | A tenant-scoped failure, security event, sync issue, or delayed job occurs | Detection/diagnosis time, traceability, alert, privacy, retention targets |
| `QAS-012` | `QR-INTEGRATE-001` | External import/export or message delivery is duplicated, delayed, partial, or unavailable | Limits, timeout, retry, idempotency, reconciliation and recovery targets |
| `QAS-013` | `QR-SEC-001` | A hostile or mistaken actor attempts cross-tenant, privilege, support, secret, or evidence misuse | Control, test, logging, response, vulnerability and recovery criteria |

## Concern separation

Architecture must not force one label to answer unrelated decisions. The following concerns are
evaluated separately and then checked for compatibility:

1. application/domain decomposition;
2. tenant and data isolation;
3. identity and authorization;
4. product surfaces and branded delivery;
5. offline state and synchronization;
6. transactional data integrity;
7. evidence and document storage;
8. background work, notifications, and integrations;
9. reporting and analytics;
10. deployment, resilience, backup, and operations.

## Application decomposition options

| ID | Option | Strengths | Costs and risks | Analysis status |
| --- | --- | --- | --- | --- |
| `OPT-DEC-01` | One deployable modular core with explicit domain modules and controlled internal boundaries | Lower operational burden; strong transactional coordination; easier early evolution; suitable for small team | Boundary erosion without governance; scale and release coupling; must prove module/test discipline | Shortlist for deeper analysis |
| `OPT-DEC-02` | Several independently deployed domain services from the first release | Independent scaling/release and stronger runtime boundaries | High distributed consistency, observability, testing, deployment, and support cost; risky with unresolved team/ops constraints | Retain as comparison; not near-term leading hypothesis |
| `OPT-DEC-03` | Modular transactional core plus separately deployable high-risk/high-load supporting subsystems when evidence justifies them | Preserves core consistency while allowing media, async processing, reporting, or delivery workloads to scale separately | Requires clear boundary/contract discipline and may evolve toward accidental complexity | Shortlist as evolutionary candidate |

## Tenant and data-isolation options

| ID | Option | Strengths | Costs and risks | Analysis status |
| --- | --- | --- | --- | --- |
| `OPT-TEN-01` | Shared transactional store with authoritative tenant key and enforced policy on every tenant-owned path | Efficient operations and cross-tenant platform metadata; lower per-tenant cost | Highest consequence from missing predicates/policy bypass; requires pervasive controls and proof | Shortlist only with `TP-CAND-001` |
| `OPT-TEN-02` | Separate logical schema/namespace per organization | Stronger logical separation and tenant-specific maintenance possibilities | Migration/version fan-out, connection/operational burden, cross-tenant platform reporting complexity | Retain for comparison |
| `OPT-TEN-03` | Separate database/store per organization | Strong isolation, export, restore, and large-tenant customization potential | High cost and operational complexity for many small tenants; migrations and pooled reporting harder | Candidate for exceptional/enterprise tier, not assumed default |
| `OPT-TEN-04` | Hybrid shared default with controlled dedicated isolation for qualified tenants | Balances small-tenant economics and enterprise isolation/scale | Two operating models, portability complexity, parity and migration risks | Defer unless commercial/scale evidence requires it |

## Identity and authorization options

| ID | Option | Strengths | Costs and risks | Analysis status |
| --- | --- | --- | --- | --- |
| `OPT-AUTH-01` | Application-owned permission checks built around explicit organization membership and record scope | Direct domain integration and fewer moving parts | Policy duplication and audit gaps if checks scatter across modules/surfaces | Retain only with centralized policy discipline |
| `OPT-AUTH-02` | Central authorization policy component with domain-provided facts and consistent decision logging | Consistency, explainability, testability, and support for complex scopes | Additional design/runtime dependency; fact freshness and availability become critical | Shortlist for security architecture analysis |
| `OPT-AUTH-03` | Provider roles/claims treated as the final business authorization | Simple integration | Cannot safely express tenant, branch, assignment, record state, support session, and separation-of-duty rules | Excluded by `DEC-034` and `SR-SEC-003` |

## Client and delivery options

| ID | Option | Strengths | Costs and risks | Analysis status |
| --- | --- | --- | --- | --- |
| `OPT-CLI-01` | Responsive web experiences for Admin, Management, Technician, and Customer surfaces | Shared delivery, immediate updates, low distribution overhead | Device/offline/background/camera limitations may affect field work and branded apps | Retain for Admin/Management and evaluate other surfaces |
| `OPT-CLI-02` | Responsive Admin/Management plus installable shared field/customer clients from one cross-platform codebase | Better device/offline capability with shared maintenance and branded artifacts | Build/distribution complexity, client state, upgrade/version support | Shortlist for deeper analysis |
| `OPT-CLI-03` | Fully separate native codebases per organization/application | Maximum platform-specific freedom | Violates shared-product/no-fork constraint; extreme parity/security/maintenance cost | Excluded |
| `OPT-CLI-04` | Shared generic clients plus optional branded artifacts using the same maintained application code | Economical default plus white-label capability | Tenant binding, store ownership, version parity, branding validation, and support policy required | Shortlist subject to `OPEN-003`/`OPEN-004` |

## Offline synchronization options

| ID | Option | Strengths | Costs and risks | Analysis status |
| --- | --- | --- | --- | --- |
| `OPT-OFF-01` | Online-first client with durable queued evidence/actions and limited cached assignment context | Lower conflict complexity; supports intermittent upload/retry | Insufficient for long outages or complex multi-step work; stale reads remain | Shortlist for low/offline-minimal scenario |
| `OPT-OFF-02` | Assignment-scoped local working set with explicit operation log/outbox and conflict policies | Supports realistic field workflows and attributable replay | Requires versioning, idempotency, revocation, merge rules, storage security, and strong proof | Leading proof candidate, not selected |
| `OPT-OFF-03` | Broad local-first replica with automatic multi-actor merge | Rich offline capability | Highest data exposure, conflict, policy, migration, and correctness complexity for commercial/stock/audit state | Defer unless accepted offline targets demand it |

## Evidence and document options

| ID | Option | Strengths | Costs and risks | Analysis status |
| --- | --- | --- | --- | --- |
| `OPT-EVD-01` | Store large evidence directly with transactional business data | Simple referential transaction model | Database growth, backup/restore, performance, scanning, and delivery cost | Retain only for small metadata or exceptional artifacts |
| `OPT-EVD-02` | Dedicated object/blob evidence storage with tenant-scoped metadata and authorization in trusted application boundary | Scalable media handling, lifecycle policies, direct upload/download patterns | Must prevent URL/key leakage, orphaned objects, bypass, inconsistent lifecycle, and unsafe content | Shortlist subject to media/security proof |
| `OPT-EVD-03` | External document service owns both files and business-document meaning | Outsourced document features | Risks loss of tenant/control semantics, offline coupling, cost, and provider lock-in | Defer until document/integration scope is accepted |

## Background work and integration options

| ID | Option | Strengths | Costs and risks | Analysis status |
| --- | --- | --- | --- | --- |
| `OPT-INT-01` | Synchronous in-request external calls for most operations | Simple flow for low-risk immediate dependencies | Provider latency/failure couples to core work; retry duplicates and field reliability risks | Limit to explicitly safe dependencies |
| `OPT-INT-02` | Durable background commands/events with transactional intent/outbox and idempotent consumers | Resilient notifications, exports, media, integrations, and derived views | Event/version/operations complexity; eventual consistency must be visible | Shortlist for high-risk asynchronous effects |
| `OPT-INT-03` | Full event-sourced operational model | Complete event history and temporal reconstruction | Very high modeling, projection, migration, debugging, and privacy complexity | Not justified by current evidence; exclude from near-term shortlist |

## Reporting options

| ID | Option | Strengths | Costs and risks | Analysis status |
| --- | --- | --- | --- | --- |
| `OPT-REP-01` | Transactional queries and carefully governed operational views | Simple and current for modest workload | Heavy analytics may affect operational work; complex authorization and definitions | Shortlist for initial operational reporting |
| `OPT-REP-02` | Derived tenant-scoped read models refreshed from governed operational changes | Faster dashboards/search and independent query shapes | Freshness, rebuild, reconciliation, tenant isolation, and operational complexity | Shortlist when quality targets justify it |
| `OPT-REP-03` | Separate analytical warehouse/lake from first release | Powerful long-range analytics and scale | Data duplication, privacy, cost, freshness, governance, and small-team burden | Defer until accepted KPI/scale/integration demand |

## Deployment and resilience options

| ID | Option | Strengths | Costs and risks | Analysis status |
| --- | --- | --- | --- | --- |
| `OPT-DEP-01` | Managed single-region, multi-zone service with tested backup/restore and offline field tolerance | Lower operations/cost; credible first-market baseline | Regional outage and residency/provider availability constraints; requires accepted recovery objectives | Shortlist pending `OPEN-041`/`OPEN-042` |
| `OPT-DEP-02` | Active/passive regional recovery | Stronger regional recovery and controlled failover | Replication, testing, data consistency, cost, and operational maturity | Evaluate after recovery targets |
| `OPT-DEP-03` | Active/active multi-region from first release | Highest geographic availability potential | Highest consistency, conflict, cost, observability, support, and data-residency complexity | Not justified without strict targets |

## White-label delivery options

| ID | Option | Strengths | Costs and risks | Analysis status |
| --- | --- | --- | --- | --- |
| `OPT-WL-01` | Shared product identity only, with tenant branding and domains | Lowest release/support complexity | Does not satisfy optional separately branded application target | Valid base offering, incomplete target |
| `OPT-WL-02` | Automated branded artifacts from shared application code and versioned delivery profiles | Preserves shared product while meeting tenant identity target | Signing/store ownership, build queue, review, release parity, support, and credential controls | Shortlist subject to `TP-CAND-005` |
| `OPT-WL-03` | Tenant-managed forks or independently modified applications | Tenant autonomy | Violates product constraint; security and parity divergence | Excluded |

## Business-data and transactional-consistency options

| ID | Option | Strengths | Costs and risks | Analysis status |
| --- | --- | --- | --- | --- |
| `OPT-DATA-01` | One governed transactional model with domain-module ownership and explicit consistency boundaries | Strong coordination for work, approval, stock, custody, payment evidence, and audit invariants | Broad transactions and shared-model coupling can erode module ownership; reporting load must be controlled | Shortlist for core operational records |
| `OPT-DATA-02` | Independently owned stores per domain with asynchronous coordination for cross-domain work | Strong technical ownership and independent scaling | Distributed transactions, stale decisions, reconciliation, failure handling, and audit reconstruction are costly for current invariants | Retain as comparison; requires accepted boundary and operations evidence |
| `OPT-DATA-03` | Governed transactional operational source plus asynchronous derived views for search, dashboards, reporting, or integration | Keeps operational truth consistent while allowing purpose-specific reads | Requires durable change capture, rebuild, freshness, scope, and reconciliation controls | Shortlist only where measured query or integration needs justify it |

## Cross-option dependency rules

These rules constrain combinations without choosing them. A later proposal must show how every
applicable dependency is satisfied.

| ID | Dependency rule | Related options and evidence |
| --- | --- | --- |
| `OPT-DEP-RULE-001` | No tenancy option is credible unless tenant context is enforced across interactive, background, file, search, report, export, support, and integration paths. | `OPT-TEN-*`, `TB-02`, `TB-03`, `TP-CAND-001` |
| `OPT-DEP-RULE-002` | Client identity, hostname, branding, store artifact, and cached organization hint cannot be the final authorization source. | `OPT-CLI-*`, `OPT-WL-*`, `TB-01`, `TB-07`, `ADR-CAND-003` |
| `OPT-DEP-RULE-003` | Any offline option must define the authorized working set, encryption, local retention, revocation, versioning, idempotency, conflict outcomes, recovery, and audit attribution. | `OPT-OFF-*`, `TB-04`, `QAS-004`, `TP-CAND-002` |
| `OPT-DEP-RULE-004` | Evidence storage and client-upload choices must be evaluated together; storage keys or temporary URLs cannot bypass business-record authorization. | `OPT-EVD-*`, `OPT-CLI-*`, `TB-05`, `QAS-005`, `TP-CAND-003` |
| `OPT-DEP-RULE-005` | Asynchronous effects require durable intent, idempotent handling, visible state, bounded retries, dead-letter/recovery treatment, and reconciliation. | `OPT-INT-02`, `OPT-DATA-03`, `QAS-012` |
| `OPT-DEP-RULE-006` | Derived reports, search models, or analytics must preserve tenant and record scope, definitions, freshness, rebuildability, and reconciliation to operational truth. | `OPT-REP-*`, `OPT-DATA-03`, `TB-08`, `TP-CAND-007` |
| `OPT-DEP-RULE-007` | Deployment/resilience claims are not comparable until geography, provider availability, recovery, availability, scale, budget, and operating capacity are recorded. | `OPT-DEP-*`, `QAS-002`, `QAS-003`, `QAS-006`, `OPEN-038` through `OPEN-042` |
| `OPT-DEP-RULE-008` | Dedicated tenant isolation or branded delivery cannot create different business meanings, security behavior, or unsupported version drift. | `OPT-TEN-03`, `OPT-TEN-04`, `OPT-WL-02`, `ARC-C-003`, `ARC-C-013` |
| `OPT-DEP-RULE-009` | Decomposition must follow accepted business responsibility and consistency needs; it cannot be inferred from screens, tables, teams, or vendor products alone. | `OPT-DEC-*`, `OPT-DATA-*`, `AR-ART-004` |
| `OPT-DEP-RULE-010` | Audit, correction, retention, export, anonymization, deletion, and recovery meanings must be compatible across operational, evidence, offline, derived, and backup copies. | `OPT-DATA-*`, `OPT-EVD-*`, `OPT-OFF-*`, `OPT-REP-*`, `TB-10`, `QAS-007` |

## Whole-system comparison profiles

These profiles expose common trade-offs across option families. They are not complete designs and
none is preferred or accepted.

| ID | Illustrative combination | Where it may fit | Primary concerns | Status |
| --- | --- | --- | --- | --- |
| `OPT-PROFILE-01` | Modular core, shared tenant-aware operational store, responsive administration, bounded installable field client, object evidence, durable background work, operational reporting, managed regional deployment | Small team and mixed small/enterprise tenants when strong policy/testing discipline is achievable | Shared-store isolation consequence, module erosion, reporting contention, offline correctness | Comparative baseline only |
| `OPT-PROFILE-02` | Independently deployed domain services and stores, installable clients, broad asynchronous coordination, derived read models, multi-region operation | Large skilled platform team with strict independent scale/release and recovery needs | Distributed correctness, cost, skills, observability, incident response, privacy, reconciliation | Comparison only; current fit unproven |
| `OPT-PROFILE-03` | Modular transactional core with separately operated media, background, delivery, or read subsystems added only where evidence requires | Evolution from simpler operations while isolating proven risk/load | Boundary and contract governance, two consistency modes, migration timing, subsystem sprawl | Analysis candidate, not selection |

## Bounded analysis shortlist

“Shortlist” means worth carrying into later architecture proposals and proof plans. It does not mean
preferred, selected, accepted, or authorized for implementation.

| ID | Hypothesis retained for later analysis | Required contrary comparison or evidence |
| --- | --- | --- |
| `SHORT-001` | Begin comparison with a modular transactional core and an evidence-driven evolutionary split path. | Compare service-first costs and identify any domain requiring independent scale, release, or failure isolation. |
| `SHORT-002` | Analyze centralized, explainable authorization policy using authoritative organization, membership, assignment, record, and support-session facts. | Compare in-module enforcement and prove that no direct or indirect path bypasses policy. |
| `SHORT-003` | Compare shared tenant-aware isolation with logical/dedicated alternatives and a possible future hybrid migration path. | Threat model, portability/restore analysis, cost model, and `TP-CAND-001`; no default is selected. |
| `SHORT-004` | Analyze responsive Admin and Management surfaces with shared installable Technician/Customer clients where offline, device, or branding needs justify them. | Target-device and workflow evidence plus comparison with responsive-web-only delivery. |
| `SHORT-005` | Analyze an assignment-scoped offline working set with explicit outbox, conflict, revocation, and recovery policies. | Accepted `OPEN-021`, offline targets, and `TP-CAND-002`; compare limited-queue online-first behavior. |
| `SHORT-006` | Analyze dedicated object evidence storage governed by transactional metadata and trusted authorization. | Media targets, threat model, retention/deletion design, cost, and `TP-CAND-003`. |
| `SHORT-007` | Analyze durable asynchronous handling for external and long-running effects while keeping visible operational state. | Failure/reconciliation model and comparison with safe synchronous dependencies. |
| `SHORT-008` | Start reporting analysis with governed operational views and introduce derived read models only for measured need. | Accepted KPI/scale/freshness targets and `TP-CAND-007`. |
| `SHORT-009` | Analyze a managed regional baseline and stronger recovery shapes only after geography and recovery constraints are known. | `OPEN-041`, `OPEN-042`, accepted recovery/availability targets, restore evidence, and cost comparison. |
| `SHORT-010` | Analyze automated branded artifacts from shared code as an optional delivery capability, not a tenant fork. | Store/signing ownership, version/support policy, binding threat model, and `TP-CAND-005`. |

## Missing inputs and stop conditions

| ID | Missing input | Why it changes the result | Stop condition |
| --- | --- | --- | --- |
| `AR-IN-001` | First-market geography, data residency, connectivity, and provider availability (`OPEN-041`) | Changes eligible deployment, identity, messaging, media, backup, mapping, and distribution choices | No vendor, region, or deployment topology selection |
| `AR-IN-002` | Delivery budget, team skills, operating capacity, and support model (`OPEN-042`) | Changes the acceptable number of services, stores, pipelines, platforms, and operational dependencies | No final decomposition or provider selection |
| `AR-IN-003` | Measurable quality targets and proof volumes (`OPEN-038`, `OPEN-039`) | Makes performance, scale, availability, offline, media, recovery, accessibility, and compatibility claims testable | No weighted scoring or final option ranking |
| `AR-IN-004` | Support, customer identity, role/permission, and separation-of-duty rules (`OPEN-008`, `OPEN-013`, `OPEN-030`, `OPEN-032`) | Determines identity, session, authorization, privileged-access, and audit design | No identity/authorization architecture acceptance |
| `AR-IN-005` | Offline conflict policy and mandatory field evidence (`OPEN-021`, `OPEN-033`) | Determines cached scope, edit model, synchronization, storage, and recovery burden | No offline or media architecture acceptance |
| `AR-IN-006` | Retention, deletion, legal hold, export, and document rules (`OPEN-028`, `OPEN-034`, `OPEN-040`) | Determines operational, evidence, backup, audit, privacy, and recovery lifecycle | No final data/evidence lifecycle architecture |
| `AR-IN-007` | Required channels, integrations, KPIs, and accounting boundary (`OPEN-018`, `OPEN-027`, `OPEN-035` through `OPEN-037`) | Determines background work, external contracts, reconciliation, reporting, and data boundaries | No integration/reporting architecture acceptance |
| `AR-IN-008` | Store ownership, shared-app policy, and customer/management surface scope (`OPEN-002` through `OPEN-004`, `OPEN-007`) | Determines artifact count, distribution, versioning, support, navigation, and release operations | No final client/delivery architecture |
| `AR-IN-009` | Required independent review authorities (`OPEN-043`) | Determines which security, privacy, accounting, domain, and operational evidence can close each decision | No affected ADR acceptance without named review path |

## Evidence and confidence language

Later option assessments must label confidence rather than presenting assumptions as facts.

| Level | Meaning | Permitted conclusion |
| --- | --- | --- |
| `CONF-0` | Unexamined hypothesis or missing governing input | Retain as question only |
| `CONF-1` | Reasoned analysis against accepted constraints, without measured or independent evidence | May enter a comparison shortlist |
| `CONF-2` | Traceable model/review plus bounded technical or operational evidence | May support a proposed ADR when all stop conditions are met |
| `CONF-3` | Accepted targets, required proofs, independent reviews, failure/recovery evidence, and owner decision are complete | May support accepted architecture; still does not authorize implementation |

WP-07 options are at `CONF-0` or `CONF-1`. No option reaches `CONF-2` because technical-proof
execution is closed, and none may reach `CONF-3` in this package.

## Architecture-analysis coverage and remaining artifacts

| Required artifact | WP-07 result | Remaining work |
| --- | --- | --- |
| `AR-ART-001` | Actor groups, product surfaces, and external categories documented | Later diagrams may add accepted external actors/providers without changing authority |
| `AR-ART-002` | Initial ten trust boundaries documented | Threat cases, mitigations, abuse cases, and independent security review remain |
| `AR-ART-003` | Concern-level options, combination profiles, criteria, dependencies, and shortlist documented | Weighted comparison waits for `AR-IN-001` through `AR-IN-003` |
| `AR-ART-004` | Decomposition and data-boundary option families documented | Capability-to-responsibility proposals remain |
| `AR-ART-012` | Thirteen quality-scenario templates documented | Numeric targets, workloads, and pass/fail measures remain |
| `AR-ART-013` | Candidate decision dependencies and option IDs established | Proposed ADRs, owners, evidence, consequences, and reversal cost remain |
| `AR-ART-005` through `AR-ART-011` | Not completed by WP-07 | Require later bounded architecture packages |
| `AR-ART-014` | Existing proof candidates referenced | Detailed proof plans and execution authorization remain |

## Recommended next package

After WP-07 owner acceptance and verified publication, the recommended next package is
`WP-08 Security, Tenancy, Identity and Access Architecture` for documentation and architecture
proposal only. It should elaborate `TB-01` through `TB-05` and `TB-09`, `AR-ART-002`,
`AR-ART-005`, `AR-ART-006`, `ADR-CAND-001` through `ADR-CAND-003`, `ADR-CAND-013`, and proof plans
for `TP-CAND-001` and `TP-CAND-009`.

WP-08 should not accept a final architecture, execute proofs, add dependencies, create application
code, or deploy unless the owner separately changes those gates.

## WP-07 acceptance criteria

WP-07 is ready for owner review when:

- system context covers human actors, product surfaces, external categories, and privileged access;
- trust boundaries cover tenant, platform/tenant authority, offline, evidence, external systems,
  white-label delivery, reporting, privileged operations, and history;
- all thirteen `QR-*` records have measurable scenario templates without invented target values;
- alternatives for each major concern have stable IDs, trade-offs, and explicit analysis status;
- cross-option dependencies and whole-system profiles expose compatibility and operational risks;
- shortlist language remains non-binding and every retained hypothesis names missing evidence;
- unresolved geography, budget, skills, operating capacity, quality, scale, security, lifecycle,
  field, integration, reporting, and delivery inputs remain explicit;
- remaining architecture artifacts and the next bounded package are identified; and
- no architecture is selected, no technical proof is executed, and no application code,
  dependency, deployment, or external-system change occurs.

## Acceptance record

The owner accepted WP-07 and authorized publication on 2026-09-30. This acceptance freezes the
option-analysis baseline with each decision, open question, option, hypothesis, confidence level,
and missing input retaining its recorded status. It does not select a final architecture, vendor,
language, framework, database, cloud, region, topology, or implementation approach. Technical-proof
execution, application coding, dependencies, deployment, and external-system changes remain
closed.
