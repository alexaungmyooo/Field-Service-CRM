# Field Service CRM Handbook

## Document control

| Field | Value |
| --- | --- |
| Status | Product Discovery closed — WP-18 accepted for publication |
| Current phase | Solution Architecture — TP-01 exact execution contract |
| Current work package | `WP-18 TP-01 Exact Execution Contract` — Accepted for publication |
| Application coding | Not authorized |
| Architecture selection | Not authorized |
| Owner | Aung Myo Oo |
| Last updated | 2026-10-07 |

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
7. `15_ARCHITECTURE_SYNTHESIS_QUALITY_TARGETS_SELECTION_READINESS.md`
8. `16_QUALITY_BASELINE_ARCHITECTURE_SHORTLIST_DECISION.md`
9. `17_TECHNOLOGY_CATEGORY_PROVIDER_NEUTRAL_EVALUATION.md`
10. `18_BUDGET_GEOGRAPHY_TEAM_FIT_NAMED_CANDIDATE_SHORTLIST.md`
11. `19_NAMED_CANDIDATE_PROOF_SPECIFICATIONS_ARCHITECTURE_DECISION_READINESS.md`
12. `20_PROOF_GOVERNANCE_DECISIONS_FIRST_TECHNICAL_PROOF_AUTHORIZATION.md`
13. `21_TP01_EXACT_EXECUTION_CONTRACT.md`

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

## WP-12 authorization

After verified WP-11 publication, the owner authorized `WP-12 Architecture Synthesis, Quality
Targets and Selection Readiness` for documentation and option analysis only. WP-12 may reconcile
WP-07 through WP-11 proposals, audit contradictions and missing coverage, propose explicit planning
target bands, assemble end-to-end option combinations, compare them against common criteria,
sequence ADR and proof dependencies, and issue a selection-readiness verdict. Architecture
selection, technical-proof execution, application coding, dependencies, deployment, and
external-system changes remain closed.

## WP-12 acceptance

The owner accepted the Architecture Synthesis, Quality Targets and Selection Readiness baseline on
2026-10-01 and authorized its publication. Acceptance confirms the synthesis principles,
consistency audit, planning horizons, non-binding planning target bands, mandatory selection gates,
unselected end-to-end option profiles, comparison, ADR/proof sequence, consolidated risks,
selection-evidence template, unresolved inputs, and `NOT READY` architecture-selection verdict.
Planning targets remain Proposed and option profiles remain unselected. Acceptance does not open
architecture selection, accept an ADR, target, shortlist, technology, provider, framework,
database, runtime, or topology; execute proofs; or authorize application coding, dependencies,
deployment, or external-system changes.

## WP-13 authorization

After verified WP-12 publication, the owner authorized `WP-13 Quality Baseline and Architecture
Shortlist Decision` for owner decision documentation only. WP-13 may recommend dispositions for
the planning baselines and horizons, define a first-release evaluation envelope, decide which
end-to-end profiles should advance or be deferred/rejected, classify ADR review/proof needs, and
recommend the next bounded evaluation package. Final architecture selection, technical-proof
execution, application coding, dependencies, deployment, and external-system changes remain
closed.

## WP-13 acceptance and owner decisions

The owner accepted WP-13 on 2026-10-01 and authorized publication. `QBD-001` through `QBD-015`
are accepted as architecture-evaluation baselines, not customer SLAs or production commitments.
`EVAL-BASE-001` through `EVAL-BASE-012` are accepted while monetary budget `OPEN-088` and
geography/residency `OPEN-089` remain open. `SHORTLIST-001` advances as the primary evaluation
profile, `SHORTLIST-002` remains comparative, `SHORTLIST-003` is deferred, and
`SHORTLIST-004` is rejected for the initial architecture. `ADR-DISP-001` through
`ADR-DISP-015` are accepted as the review/proof classification. Final architecture selection,
technical-proof execution, application coding, dependencies, deployment, and external-system
changes remain closed.

## WP-14 authorization

After verified WP-13 publication, the owner authorized `WP-14 Technology Category and
Provider-Neutral Candidate Evaluation` for documentation and option analysis only. WP-14 may
compare provider-neutral client, application/runtime, API, identity, operational data, offline,
media, background work, reporting, observability, deployment, and recovery categories against the
accepted evaluation baselines and Profiles 001/002. Final architecture selection, named-provider
commitment, technical-proof execution, application coding, dependencies, deployment, and
external-system changes remain closed.

## WP-14 acceptance

The owner accepted WP-14 on 2026-10-07 and authorized publication. Acceptance confirms the six
evaluation principles, twenty provider-neutral technology-category dispositions, two coherent
category sets, named-candidate entry requirements, risks, and defer/reject boundaries as the
baseline for named-candidate analysis. It does not select a provider, product, framework,
dependency, database, runtime, client technology, deployment topology, or final architecture;
execute a technical proof; or authorize application coding or deployment. After verified
publication, WP-15 may document owner planning decisions and analyze named candidates only.

## WP-15 authorization

After verified WP-14 publication, the owner authorized `WP-15 Budget, Geography, Team Fit and
Named Candidate Shortlist` on 2026-10-07 for owner decision documentation and named-candidate
analysis only. WP-15 may recommend explicit budget, geography/residency, team-fit, and client
platform baselines; inspect dated official provider/product evidence; and narrow candidates for a
later decision or proof package. It may not select a final architecture or dependency, execute a
technical proof, install dependencies, write application code, create infrastructure, deploy, or
change an external system.

## WP-15 acceptance

The owner accepted all WP-15 recommendations and dispositions exactly as recorded on 2026-10-07
and authorized publication. `BUDGET-BASE-001` through `006`, `GEO-BASE-001` through `006`,
`TEAM-BASE-001` through `006`, and `CLIENT-BASE-001` through `005` become accepted architecture-
evaluation baselines. The `NAMED-TECH-*`, `NAMED-PROV-*`, and `NAMED-SET-*` dispositions are
accepted shortlist controls, not final technology or architecture selections. After verified
publication, WP-16 may specify named-candidate proofs and architecture-decision readiness only.
Technical-proof execution, dependency installation, application coding, final architecture
selection, infrastructure creation, and deployment remain closed.

## WP-16 authorization

After verified WP-15 publication, the owner authorized `WP-16 Named Candidate Proof
Specifications and Architecture Decision Readiness` on 2026-10-07 for documentation and proof
planning only. WP-16 may define bounded proof specifications, synthetic fixtures, pass/fail
criteria, evidence and review requirements, cost/duration controls, sequencing, cleanup, and the
evidence needed for each candidate architecture decision. It may not authorize or execute a proof,
open or change a provider account, incur cost, install a dependency, create executable code or
infrastructure, select a final architecture, deploy, or use customer/live data.

## WP-16 acceptance

The owner accepted WP-16 on 2026-10-07 and authorized publication. Acceptance confirms the proof
state model, common proof contract, comparable-candidate envelope, synthetic fixtures, twelve proof
specifications, WP-15 proof traceability, evidence and review plan, proof-wave dependencies,
cost/cleanup controls, fifteen architecture-decision readiness rows, evidence-packet requirements,
selection-readiness rules, risks, unresolved inputs, and the `NOT_READY` selection verdict.
`DEC-123` through `DEC-126` become accepted proof-governance baselines. Acceptance does not
authorize any proof, executable artifact, dependency, provider account, cost, infrastructure,
final architecture selection, application coding, deployment, or customer/live-data use.

## WP-17 authorization

After verified WP-16 publication, the owner authorized `WP-17 Proof Governance Decisions and First
Technical Proof Authorization` on 2026-10-07 for owner decision documentation only. WP-17 may
recommend proof-evidence thresholds, reviewer independence, proof-account/cost controls, the first
proof candidate, its bounded synthetic policy and future execution contract, stop conditions, and
the exact later authorization gate. It may not authorize or execute the proof, create a harness or
schema, install dependencies, open or modify accounts, incur cost, create infrastructure, select a
final architecture, write application code, deploy, or use customer/live data.

## WP-17 acceptance

The owner accepted every WP-17 recommendation and disposition exactly as recorded on 2026-10-07
and authorized publication. `PGD-001` through `PGD-010` and `DEC-128` through `DEC-134` become
accepted proof-governance and first-proof authorization-planning baselines. Acceptance confirms
the evidence threshold, independent role model, TP-01 priority and local/synthetic boundary,
proof-only policy, zero-tolerance tenant outcome, disposable-artifact rule, non-passing outcomes,
and separate exact execution authorization. It does not authorize TP-01 execution, a harness,
schema, dependency installation, local service, provider account, cost, infrastructure, final
architecture selection, application coding, deployment, or customer/live-data use.

## WP-18 authorization

After verified WP-17 publication, the owner authorized `WP-18 TP-01 Exact Execution Contract` on
2026-10-07 for owner decision documentation and authorization-readiness only. WP-18 may inspect
read-only local tool availability and current official lifecycle/package/image evidence; recommend
exact proof-only versions, paths, dependency inventory, local environment, synthetic case matrix,
commands, resource limits, evidence, reviewers, cleanup, and remaining blockers; and issue an
execution-readiness verdict. It may not create proof artifacts, resolve/install dependencies,
download/start a container image, run TP-01, open or modify provider accounts, incur cost, create
infrastructure, select final architecture, write application code, deploy, or use customer/live
data.

## WP-18 acceptance

The owner accepted every WP-18 recommendation and disposition exactly as recorded on 2026-10-07
and authorized publication. `TP1-DEC-001` through `TP1-DEC-010` and `DEC-136` through `DEC-142`
become accepted TP-01-only contract baselines. Acceptance confirms the exact direct tool/package
versions, database image digest, proof/evidence paths, context and schema meanings, enforcement
modes, 222-case matrix, resource/network limits, command interfaces, evidence, two checkpoints,
cleanup, risks, and `NOT_READY` execution verdict. It does not create or install the proof,
authorize materialization or execution, accept a final architecture/dependency, create application
code or infrastructure, deploy, or permit customer/live data.

## Private execution control

Private execution state is maintained in `internal-local/EXECUTION_CONTROL.md`. That directory is
not client-facing and is ignored by Git. It records current authorization, frozen scope, evidence,
blockers, and the next permitted gate.
