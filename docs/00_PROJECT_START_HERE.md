# Field Service CRM Handbook

## Document control

| Field | Value |
| --- | --- |
| Status | Product Discovery closed — WP-11 ready for owner review |
| Current phase | Solution Architecture — Integration, deployment, resilience, and operations proposal |
| Current work package | `WP-11 Integration, Deployment, Resilience and Operations Architecture` — Ready for owner review |
| Application coding | Not authorized |
| Architecture selection | Not authorized |
| Owner | Aung Myo Oo |
| Last updated | 2026-10-01 |

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
9. `09_PRODUCT_DISCOVERY_CLOSURE_AND_ARCHITECTURE_READINESS.md`

All Phase 1 documents are currently Draft unless a section or record says otherwise.

### Phase 2 — Solution Architecture

1. `09_PRODUCT_DISCOVERY_CLOSURE_AND_ARCHITECTURE_READINESS.md`
2. `10_ARCHITECTURE_CONSTRAINTS_AND_OPTIONS.md`
3. `11_SECURITY_TENANCY_IDENTITY_ACCESS_ARCHITECTURE.md`
4. `12_DATA_OWNERSHIP_LIFECYCLE_CONSISTENCY_ARCHITECTURE.md`
5. `13_FIELD_OFFLINE_EVIDENCE_CLIENT_DELIVERY_ARCHITECTURE.md`
6. `14_INTEGRATION_DEPLOYMENT_RESILIENCE_OPERATIONS_ARCHITECTURE.md`

Current and later accepted work packages may add or mature:

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

## WP-02 authorization

After verified WP-01 publication, the owner authorized activation of `WP-02 Multi-Organization
Foundation` and kept application coding closed. WP-02 defines platform and tenant authority,
organization lifecycle, membership and worker identity, branches, roles and access scope,
configuration inheritance, platform organization visibility, controlled support sessions, data
ownership classes, and tenant delivery profiles. It does not select implementation technology.

## WP-02 acceptance

The owner accepted the Multi-Organization Foundation baseline on 2026-09-30 and authorized its
publication. Acceptance confirms the platform/tenant boundary, stable organization identity,
optional branch model, membership and worker distinction, configuration layers, organization
directory boundary, controlled support-session model, data-ownership classes, delivery profiles,
and the recorded Accepted/Proposed/Open decision dispositions. It does not silently accept each
Proposed decision or resolve each Open question, and it does not authorize application coding,
architecture selection, dependencies, deployment, or external-system changes.

## WP-03 authorization

After verified WP-02 publication, the owner authorized activation of `WP-03 Complete Workflow
Catalogue` and kept application coding closed. WP-03 defines end-to-end field-service workflow
families, actors, entry conditions, normal and optional paths, decisions, exception and failure
outcomes, outputs, audit expectations, and traceability. It may refine the living decision register
but does not define application screens, database design, APIs, architecture, or implementation.

## WP-03 acceptance

The owner accepted the Complete Workflow Catalogue baseline on 2026-09-30 and authorized its
publication. Acceptance confirms the twenty workflow families, common business vocabulary,
control envelope, lifecycle meanings, normal and optional paths, exceptions, failure treatments,
outputs, audit expectations, acceptance scenarios, and the recorded Accepted/Proposed/Open
decision dispositions. It does not silently accept each Proposed decision or resolve each Open
question, and it does not authorize application coding, architecture selection, dependencies,
deployment, or external-system changes.

## WP-04 authorization

After verified WP-03 publication, the owner authorized activation of `WP-04 Business Capabilities
and Domain Model` and kept application coding closed. WP-04 defines the stable capability map,
capability responsibilities and boundaries, workflow-to-capability traceability, shared business
language, conceptual relationships, ownership, provenance, lifecycle meaning, and domain
invariants. It does not define database schemas, service boundaries, APIs, user interfaces,
architecture, technology, or release commitments.

## WP-04 acceptance

The owner accepted the Business Capabilities and Domain Model baseline on 2026-09-30 and authorized
its publication. Acceptance confirms the capability catalogue, responsibility boundaries,
workflow traces, shared business language, conceptual relationships, provenance classes, lifecycle
distinctions, responsibility map, domain invariants, and the recorded Accepted/Proposed/Open
decision dispositions. It does not silently accept each Proposed decision or resolve each Open
question, and it does not authorize application coding, architecture selection, dependencies,
deployment, or external-system changes.

## WP-05 authorization

After verified WP-04 publication, the owner authorized activation of `WP-05 Business Rules and
System Requirements` and kept application coding closed. WP-05 defines governing business rules,
testable system behavior, requirement traceability, acceptance scenarios, and unresolved
quality-target gates derived from the accepted product, organization, workflow, capability, and
domain baselines. It does not define architecture, database schemas, APIs, frameworks, cloud
services, deployment, or implementation work.

## WP-05 acceptance

The owner accepted the Business Rules and System Requirements baseline on 2026-09-30 and authorized
its publication. Acceptance confirms the rule register with its recorded statuses, normative
behavioral requirements, traceability, quality-target gate register, product acceptance scenarios,
architecture-entry blockers, and the recorded Accepted/Proposed/Open decision dispositions. It does
not silently promote Proposed rules or decisions, resolve Open questions, supply missing
quantitative targets, close Product Discovery, or authorize architecture selection, architecture
implementation, application coding, dependencies, deployment, or external-system changes.

## WP-06 authorization

After verified WP-05 publication, the owner authorized activation of `WP-06 Product Discovery
Closure and Architecture Readiness` while keeping application coding and architecture
implementation closed. WP-06 may assess the Product Discovery exit criteria, classify unresolved
decisions by later gate, freeze architecture constraints, define required architecture artifacts,
identify candidate ADRs and technical proofs, and recommend the next documentation work package.
It does not select technologies, approve a solution architecture, scaffold applications, add
dependencies, deploy, or mutate external systems.

## WP-06 acceptance and Product Discovery closure

The owner accepted WP-06 on 2026-09-30, authorized publication, and explicitly closed Product
Discovery after verified publication. Acceptance confirms the exit assessment, later-gate
assignments for unresolved items, frozen architecture constraints, required architecture evidence,
candidate decision/proof inventories, risk register, governance gates, and recommended
documentation sequence. Proposed and Open records retain their status. Closure does not authorize
architecture analysis until the separately authorized WP-07 activation, and it does not authorize
architecture selection, technical-proof execution, application coding, dependencies, deployment,
or external-system changes.

## WP-07 authorization

After verified WP-06 publication and Product Discovery closure, the owner authorized
`WP-07 Architecture Constraints and Options` for documentation and option analysis only.
WP-07 may establish context, trust boundaries, quality-scenario templates, evaluation criteria,
credible architecture alternatives, trade-offs, dependencies, and a recommended analysis
shortlist. Architecture selection, technical-proof execution, application coding, dependencies,
deployment, and external-system changes remain closed.

## WP-07 acceptance

The owner accepted the Architecture Constraints and Options baseline on 2026-09-30 and authorized
its publication. Acceptance confirms the system context, trust boundaries, common evaluation
criteria, quality-scenario templates, concern-level alternatives, dependency rules, comparison
profiles, non-binding shortlist, missing-input stop conditions, confidence language, coverage
assessment, and recommended next documentation package. It does not promote Proposed decisions,
resolve remaining Open questions, choose an architecture or technology, authorize technical-proof
execution, or authorize application coding, dependencies, deployment, or external-system changes.

## WP-08 authorization

After verified WP-07 publication, the owner authorized `WP-08 Security, Tenancy, Identity and
Access Architecture` for documentation and architecture proposal only. WP-08 may elaborate the
tenant trust boundary, identity and authority relationships, tenant-context enforcement,
authorization decisions, privileged platform and support access, customer delegation, session and
machine identity concerns, audit/security evidence, threat cases, and proof plans. Architecture
selection, technical-proof execution, application coding, dependencies, deployment, and
external-system changes remain closed.

## WP-08 acceptance

The owner accepted the Security, Tenancy, Identity and Access Architecture proposal baseline on
2026-09-30 and authorized its publication. Acceptance confirms the bounded subject/authority,
security-context, tenant-enforcement, authorization, platform/support, customer-delegation,
machine, offline, evidence, cross-cutting control, threat, audit, proposed-ADR, proof-plan, and
missing-input analysis. Every conceptual architecture proposal and ADR retains Proposed `CONF-1`
status. Acceptance does not choose a final architecture, provider, protocol, token, data-store
pattern, policy implementation, or technology; execute proofs; or authorize application coding,
dependencies, deployment, or external-system changes.

## WP-09 authorization

After verified WP-08 publication, the owner authorized `WP-09 Data Ownership, Lifecycle and
Consistency Architecture` for documentation and architecture proposal only. WP-09 may elaborate
business-record ownership and authority, conceptual consistency boundaries, identity/provenance,
correction/reversal/merge history, lifecycle/retention/export/deletion, inventory and equipment
integrity, evidence and external-payment claims, offline/external reconciliation, derived data,
migration/import, backup/recovery meaning, risks, and proof plans. Architecture selection,
technical-proof execution, application coding, dependencies, deployment, and external-system
changes remain closed.

## WP-09 acceptance

The owner accepted the Data Ownership, Lifecycle and Consistency Architecture proposal baseline on
2026-09-30 and authorized its publication. Acceptance confirms the bounded ownership, record
authority, lifecycle, history/correction, consistency, coordination, identity, inventory,
work/project, evidence/payment, derived-data, exchange/migration, retention/copy, recovery,
reconciliation, risk, proposed-ADR, proof-plan, and missing-input analysis. Every conceptual
architecture proposal and ADR retains Proposed `CONF-1` status. Acceptance does not choose a final
architecture, database, storage or messaging product, service/event boundary, physical tenancy,
migration technology, or recovery topology; execute proofs; or authorize application coding,
dependencies, deployment, or external-system changes.

## WP-10 authorization

After verified WP-09 publication, the owner authorized `WP-10 Field, Offline, Evidence and Client
Delivery Architecture` for documentation and architecture proposal only. WP-10 may elaborate
client-surface responsibilities, assignment-scoped field working sets, offline capture and
synchronization, conflict/revocation/recovery, evidence/media lifecycle, weak-network/device
constraints, customer/technician access, product/custom-domain tenant routing, shared and branded
artifacts, delivery profiles, release/version compatibility, threats, and proof plans. Architecture
selection, technical-proof execution, application coding, dependencies, deployment, and
external-system changes remain closed.

## WP-10 acceptance

The owner accepted the Field, Offline, Evidence and Client Delivery Architecture proposal baseline
on 2026-09-30 and authorized its publication. Acceptance confirms the bounded client-surface,
field working-set, provisional offline operation, synchronization, conflict/revocation/recovery,
device/local-data, evidence/media, external-payment evidence, tenant-routing, delivery-profile,
shared/branded artifact, compatibility, notification/navigation, threat, proposed-ADR, proof-plan,
and unresolved-input analysis. Every conceptual architecture proposal and ADR retains Proposed
`CONF-1` status. Acceptance does not choose a final architecture, client framework, local database,
media/storage, build/signing/store, domain/certificate, notification, analytics, or deployment
technology; execute proofs; or authorize application coding, dependencies, deployment, or
external-system changes.

## WP-11 authorization

After verified WP-10 publication, the owner authorized `WP-11 Integration, Deployment, Resilience
and Operations Architecture` for documentation and architecture proposal only. WP-11 may elaborate
external integration contracts and trust, notification delivery, synchronous/asynchronous effects,
retries and reconciliation, environment and release boundaries, deployment-change safety,
dependency/degraded behavior, availability, backup/restore/recovery, observability, incident and
support operations, capacity/cost governance, risks, and proof plans. Architecture selection,
technical-proof execution, application coding, dependencies, deployment, and external-system
changes remain closed.

## WP-11 acceptance

The owner accepted the Integration, Deployment, Resilience and Operations Architecture proposal
baseline on 2026-10-01 and authorized its publication. Acceptance confirms the bounded integration
class, authority, exchange, contract, effect/reconciliation, notification, environment,
release/deployment change, dependency/degraded-mode, availability, backup/restore, observability,
incident, privileged-operations, capacity/cost, supply-chain, threat, proposed-ADR, proof-plan, and
unresolved-input analysis. Every conceptual architecture proposal and ADR retains Proposed
`CONF-1` status. Acceptance does not choose a final architecture, provider, topology, runtime,
messaging, integration, observability, backup, build, deployment, security, or support technology;
execute proofs; or authorize application coding, dependencies, deployment, or external-system
changes.

## Private execution control

Private execution state is maintained in `internal-local/EXECUTION_CONTROL.md`. That directory is
not client-facing and is ignored by Git. It records current authorization, frozen scope, evidence,
blockers, and the next permitted gate.
