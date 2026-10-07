# Field Service CRM Handbook

## Document control

| Field | Value |
| --- | --- |
| Status | Product Discovery closed — WP-25 ready for owner review; TP-01 execution closed |
| Current phase | Technical Proof Remediation — TP-01 launcher and dependency controls |
| Current work package | `WP-25 TP-01 Runtime and Dependency Launcher Remediation` — Ready for Owner Review |
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
14. `22_TP01_MATERIALIZATION_SUPPLY_CHAIN_REVIEW.md`
15. `23_TP01_EXECUTION_ROLES_CHECKPOINT2_AUTHORIZATION.md`
16. `24_TP01_SECURITY_REVIEW_GOVERNANCE_AMENDMENT.md`
17. `25_TP01_EVIDENCE_COMPLETENESS_REMEDIATION.md`
18. `26_TP01_REMATERIALIZED_BINDING_CHECKPOINT2_AUTHORIZATION_DECISION.md`
19. `27_TP01_EXECUTION_IDENTITIES_CHECKPOINT2_AUTHORIZATION.md`
20. `28_TP01_RUNTIME_DEPENDENCY_LAUNCHER_REMEDIATION.md`

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

## WP-19 authorization

After verified WP-18 publication, the owner authorized `WP-19 TP-01 Materialization and
Supply-Chain Review` on 2026-10-07. WP-19 may create only the accepted disposable inventory under
`proofs/tp-01-tenant-boundary/`, generate the 222-case manifest and exact pnpm lockfile, install the
accepted proof-only dependencies with lifecycle scripts disabled, produce private materialization
and supply-chain evidence, perform static/non-proof inventory checks, and use one independent
subagent to validate checkpoint 1. It may not pull/start PostgreSQL, create/apply a database or
schema, bind an application/database port, start HTTP/background processes, execute TP-01 cases,
make proof-result claims, write application code, create provider accounts or paid services,
create infrastructure, select final architecture, or deploy.

## WP-19 checkpoint-1 result

Checkpoint 1 materialized exactly 50 non-dependency files under the accepted disposable proof
path. The proof package and lockfile hashes, 222-case manifest, dependency tree, licenses,
advisories, and file inventory are recorded in `22_TP01_MATERIALIZATION_SUPPLY_CHAIN_REVIEW.md`.
Exact-runtime static manifest and TypeScript checks passed, and the one authorized independent
subagent returned PASS for inventory completeness and consistency.

WP-19 passed checkpoint review and is now accepted for publication. TP-01 was not executed. The proof
operator, checkpoint-2 reproduction validator, and qualified security reviewer remain unassigned;
database-image and execution operations remain closed. Publication authority is limited to the
frozen checkpoint inventory.

## WP-19 acceptance

The owner accepted `WP19-DEC-001` through `WP19-DEC-005` and the checkpoint-1 inventory exactly as
recorded on 2026-10-07 and authorized publication. Acceptance freezes the 50-file disposable proof
inventory, package/lock/manifest hashes, dated supply-chain snapshot, and independent inventory
PASS for checkpoint 1 only. It does not authorize TP-01 execution, treat the inventory review as
independent reproduction or qualified security review, select an application architecture or
dependency, create infrastructure, deploy, or permit customer/live data.

After verified publication, the owner authorized activation of `WP-20 TP-01 Execution Roles and
Checkpoint-2 Authorization` for owner decision documentation only. Execution remains closed until
the proof operator, independent reproduction validator, qualified security reviewer, exact
revision, and artifact hashes are explicitly accepted.

## WP-19 publication result

The frozen 55-path WP-19 inventory was committed as
`01bc6d5 WP-19: accept TP-01 checkpoint-1 materialization` and pushed to `origin/main`. Local
`HEAD`, fetched `origin/main`, and `FETCH_HEAD` were verified at
`01bc6d58fb2c8d1c255e79ebf031faaf53fbb304`. No merge, proof execution, database/image/service,
application coding, infrastructure, deployment, customer/live data, or external configuration
change occurred. WP-19 is `VERIFIED_AND_CLOSED`.

## WP-20 authorization

After verified WP-19 publication, the owner activated `WP-20 TP-01 Execution Roles and
Checkpoint-2 Authorization` on 2026-10-07 for owner decision documentation only. WP-20 may bind
the exact published revision and artifact hashes, propose explicit operator and independent
validator assignments, record the missing qualified security reviewer, define independence and
sign-off controls, assess checkpoint-2 readiness, and prepare the exact later execution-
authorization statement. It may not execute preflight or TP-01, alter the frozen proof inventory,
pull or start an image/container, apply SQL, bind ports, start services, create application code or
infrastructure, select final architecture, deploy, or use customer/live data.

## WP-20 readiness result

WP-20 binds checkpoint 2 to verified commit
`01bc6d58fb2c8d1c255e79ebf031faaf53fbb304`, proof-tree identity, package/lock/case-manifest
hashes, the private 50-entry inventory digest, and the contracted image digest. It proposes the
primary repository agent as operator and a fresh independent reproduction subagent under explicit
separation controls. It does not fabricate the remaining qualified security reviewer.

WP-20 reached `READY_FOR_OWNER_DECISION`; checkpoint 2 remained `NOT_READY` and `NOT_AUTHORIZED`.
At that gate, a named qualified security reviewer and explicit owner dispositions remained
blocking. No proof-root change, preflight, image/container/database/service, TP-01 execution,
application code, infrastructure, deployment, customer/live data, WP-20 staging, commit, or push
occurred.

## WP-20 acceptance and unresolved execution authorization

The owner accepted `WP20-DEC-001` through `WP20-DEC-008` and `TP1-BIND-001` through
`TP1-BIND-007` exactly as recorded on 2026-10-07 and authorized WP-20 publication. The operator and
independent-reproduction role classes are accepted under their stated separation controls.

The supplied security-reviewer name and qualification remained literal placeholders. They do not
identify or qualify a reviewer. Therefore `TP1-ROLE-004`, `TP1-AUTH-005`, and `TP1-AUTH-009`
remain blocking, the attempted checkpoint-2 authorization was invalid under the accepted WP-20
contract, and WP-21 was not activated at that gate. TP-01 execution remains closed.

## WP-20A owner-directed governance amendment

On 2026-10-07 the owner directed a narrow revision for the solo-development context: an independent
security-review subagent may perform TP-01's technical security review, while qualified human
security review is deferred but remains mandatory before production deployment or any real/customer
data. All other WP-20 controls remain unchanged.

The assigned technical security-review identity is `/root/tp01_security_review`. It is separate
from the primary operator and the future reproduction validator and is prohibited from authoring,
operating, reproducing, or mutating TP-01. This amendment does not itself authorize checkpoint 2,
activate WP-21, run a command, accept a proof result, or authorize production.

## WP-20A validation result

The assigned `/root/tp01_security_review` subagent confirmed its read-only, no-author,
no-operator, no-validator scope and accepted the assignment as conditionally suitable for local
synthetic TP-01 only. It confirmed that human production/real-data review must remain mandatory.

Its static review also found three checkpoint-2 evidence blockers: the harness records the expected
database role as a literal instead of measuring the connected role; the evidence verifier checks
only result/audit/reproduction files rather than the complete authorization/environment/image/
fixture/state/cleanup/reviewer packet; and dedicated environment, fixture, and state-integrity
artifacts are not clearly emitted. Local inspection confirmed those findings.

Before owner acceptance, WP-20A reached `READY_FOR_OWNER_DECISION`, while checkpoint 2 remained
`NOT_READY` and `NOT_AUTHORIZED`. Changing the frozen proof to close these gaps changes accepted
hashes and requires a separately authorized remediation/materialization review before execution.

## WP-20A acceptance

The owner accepted `WP20A-DEC-001` through `WP20A-DEC-005`, `TP1-GOV-EX-001` through `005`, and
`TP1-SEC-STATIC-001` through `003` exactly as recorded on 2026-10-07 and authorized publication.
After verified publication, WP-21 may remediate and rematerialize only the disposable TP-01
evidence mechanics, governing documentation, and private evidence. TP-01 execution, images,
containers, databases, services, application coding, final architecture selection, infrastructure,
deployment, and customer/live data remain closed.

## WP-20A publication result

The exact seven-document WP-20A inventory was committed as
`03f0425 WP-20A: accept TP-01 security review amendment` and pushed to `origin/main`. Local
`HEAD`, fetched `origin/main`, and `FETCH_HEAD` were verified at
`03f0425b4089ae1c0173ac911a2f23461eeb6a92`. No proof artifact changed in that publication, and no
execution, runtime resource, application code, infrastructure, deployment, or customer/live data
was involved. WP-20A is `VERIFIED_AND_CLOSED`.

## WP-21 authorization

After verified WP-20A publication, the owner activated `WP-21 TP-01 Evidence Completeness
Remediation and Rematerialization` on 2026-10-07. WP-21 may change only the disposable TP-01 proof,
governing documentation, and ignored private evidence needed to measure actual database identity,
emit dedicated environment/fixture/state-integrity evidence, verify the complete evidence packet,
renew all artifact hashes, and obtain one fresh independent inventory validation.

WP-21 may perform syntax, manifest, TypeScript, hash, inventory, and documentation validation. It
may not execute preflight or TP-01, pull or inspect an image, start a container, create or access a
database, apply SQL, create a fixture, bind a port, start a service, install dependencies, write
application code, select final architecture, create infrastructure, deploy, or use customer/live
data. Publication and checkpoint-2 execution each require a later explicit owner gate.

## WP-21 validation result

WP-21 rematerialized 51 proof files while leaving the lockfile, dependency set, SQL/schema/seed,
runtime/image pins, and 222-case manifest unchanged. Exact-runtime JavaScript syntax, manifest, and
TypeScript no-emit checks passed. The first independent inventory pass found four static defects;
the proof was corrected, all hashes were renewed, and the same single authorized independent
validator returned PASS for 51/51 file/hash consistency and static evidence completeness.

This PASS does not establish database identity, tenant isolation, evidence generation, cleanup
effectiveness, or any TP-01 result because no execution-facing command ran. WP-21 is
accepted for publication, and checkpoint 2 remains `NOT_AUTHORIZED`.

## WP-21 acceptance

The owner accepted WP-21, `WP21-REM-001` through `WP21-REM-005`, and the rematerialized 51-file
proof inventory exactly as recorded on 2026-10-07. Publication is authorized only for the frozen
18-path public inventory. This acceptance does not establish a runtime proof result, restore the
expired WP-20 binding, or authorize checkpoint 2, dependencies, images, containers, databases,
services, application code, final architecture selection, infrastructure, deployment, or
customer/live data.

After verified publication, WP-22 may prepare the exact committed revision/tree/hash binding and
checkpoint-2 authorization decision for owner review only. Execution remains separately closed.

## WP-21 publication result

The exact 18-path WP-21 public inventory was committed as
`e824139 WP-21: accept TP-01 evidence rematerialization` and pushed to `origin/main`. Local `HEAD`,
fetched `origin/main`, and `FETCH_HEAD` were verified at
`e824139d3050e98c06e39d3663ddcae6ac1d02db`. The committed proof tree is
`48ef14bb579d0e4b620dad7c7ef6f8c409445050`. WP-21 is `VERIFIED_AND_CLOSED`.

No TP-01 command, dependency operation, image/container/database/service, application code,
architecture selection, infrastructure, deployment, or customer/live-data operation occurred.

## WP-22 authorization

After verified WP-21 publication, the owner activated `WP-22 TP-01 Rematerialized Binding and
Checkpoint-2 Authorization Decision` on 2026-10-07 for owner-decision documentation only. WP-22
may bind the exact published revision, proof tree, artifact/package/lock/manifest hashes, unchanged
image/runtime contract, role requirements, command order, evidence gates, and an exact future
checkpoint-2 authorization statement.

WP-22 may not create `authorization.json`, appoint or start an execution subagent, run preflight or
any proof/runtime command, install dependencies, use images/containers/databases/services, write
application code, select final architecture, create infrastructure, deploy, or use customer/live
data.

## WP-22 acceptance

The owner accepted `WP22-DEC-001` through `WP22-DEC-008` and `TP1-REBIND-001` through
`TP1-REBIND-010` exactly as recorded on 2026-10-07 and authorized publication of the frozen
seven-path public inventory. The replacement binding is accepted; checkpoint 2 remains separately
closed. After verified publication, WP-23 may instantiate one fresh reproduction-validator identity
and prepare the private checkpoint-2 authorization decision for owner review only.

## WP-22 publication result

The frozen seven-path WP-22 public inventory was committed as
`291aedd WP-22: accept TP-01 rematerialized binding` and pushed to `origin/main`. Local `HEAD`,
fetched `origin/main`, and `FETCH_HEAD` were verified at
`291aedd07c35991c7c677d9e7f94f5f3bc444e61`. WP-22 is `VERIFIED_AND_CLOSED`.

## WP-23 authorization

After verified WP-22 publication, the owner activated `WP-23 TP-01 Execution Identity
Instantiation and Checkpoint-2 Authorization` for owner-decision documentation and private
authorization preparation only. Exactly one fresh reproduction-validator subagent may be created
and recorded. WP-23 may prepare, but not activate, an execution authorization record.

Preflight, dependencies, images, containers, databases, services, TP-01 execution, application
coding, final architecture selection, infrastructure, deployment, and customer/live data remain
closed. WP-23 publication requires the separate owner acceptance recorded below.

## WP-23 acceptance

The owner accepted `WP23-DEC-001` through `WP23-DEC-010`, `TP1-EXEC-BIND-001` through `005`,
the fresh-validator attestation, and the ineffective private draft exactly as recorded on
2026-10-07. Commit/push is authorized only for the frozen seven-path public inventory. WP-24 may
activate only after verified publication under the exact separate execution statement.

## WP-23 publication and WP-24 result

WP-23 was published and remotely verified at
`73b12c2b66b898eb9a43e34d08c6f7d07e84dc43`. WP-24 then activated under the exact controlled
checkpoint-2 boundary and stopped on its first preflight because the proof process resolved Node
`v26.3.1` instead of accepted `v22.23.1`; the pnpm launcher separately reported `v24.19.0`.

No image, container, database, service, fixture, proof case, or reproduction ran. Mandatory cleanup
passed. A later final-verifier invocation correctly rejected the incomplete packet but its pnpm
launcher unexpectedly rematerialized 115 packages from the local store before the verifier ran.
Repeated cleanup removed them. All three reviews and the final disposition are `INCONCLUSIVE`.
WP-24 is closed without retry and establishes no tenant-boundary result.

## WP-25 authorization

The owner accepted the WP-24 stop packet and activated WP-25 for proof-only runtime/dependency
launcher remediation and static validation. WP-25 may restore the exact reviewed dependencies
from the existing local store using offline, frozen-lockfile, ignore-scripts controls; correct the
disposable proof launcher and evidence guards; renew all hashes; and use one fresh independent
static validator.

Registry/network access, dependency-version change, preflight, images, containers, databases,
services, TP-01 execution/reproduction, application coding, architecture selection,
infrastructure, deployment, provider accounts/cost, customer/live data, and Git publication remain
closed.

### WP-25 validation result

The exact launcher now verifies the accepted pnpm-entry hash before execution, uses the accepted
Node `v22.23.1` process and pnpm `11.25.0` entry, refuses proof commands when dependencies are
absent, and preserves dependency metadata during static commands. Structured private evidence
records an exact offline/frozen/ignore-scripts restoration rerun with status `0`, no hash drift,
and an isolated missing-dependency refusal with status `1` before pnpm invocation.

The rematerialized proof contains 52 files. Its artifact-inventory SHA-256 is
`0209ca15cc412e6c0f4d7ef06a7ecb4e74e756c678449f0801deb40c1000ac69`; its supplementary
content-set SHA-256 is `052c2349f79ef36a06d8619a0747588b353d67d5b0c9df9e1735474d6f8d4d2d`.
The package, lockfile, and 222-case manifest remain unchanged.

The one authorized independent validator `/root/wp25_static_validator` first returned `FAIL` with
four actionable static findings. After correction and full hash renewal, the same validator
returned `PASS` with no unresolved finding and zero mutations. No preflight, image, container,
database, service, proof, reproduction, application, architecture, infrastructure, deployment,
provider, customer/live-data, commit, or push action occurred. WP-25 is
`READY_FOR_OWNER_REVIEW`.

## Private execution control

Private execution state is maintained in `internal-local/EXECUTION_CONTROL.md`. That directory is
not client-facing and is ignored by Git. It records current authorization, frozen scope, evidence,
blockers, and the next permitted gate.
