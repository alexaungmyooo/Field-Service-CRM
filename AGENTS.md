# Field Service CRM Repository Instructions

## Entry point

Read `docs/00_PROJECT_START_HERE.md` before changing this repository. It defines the current phase,
document order, authority, and active gates.

For architecture work, read the applicable accepted product baselines before editing architecture
documents:

- `docs/01_PRODUCT_VISION_AND_SCOPE.md`
- `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
- `docs/03_MULTI_ORGANIZATION_MODEL.md`
- `docs/04_WORKFLOW_CATALOG.md`
- `docs/05_BUSINESS_CAPABILITIES.md`
- `docs/06_DOMAIN_MODEL.md`
- `docs/07_BUSINESS_RULES.md`
- `docs/08_SYSTEM_REQUIREMENTS.md`
- `docs/09_PRODUCT_DISCOVERY_CLOSURE_AND_ARCHITECTURE_READINESS.md`
- `docs/10_ARCHITECTURE_CONSTRAINTS_AND_OPTIONS.md`
- `docs/11_SECURITY_TENANCY_IDENTITY_ACCESS_ARCHITECTURE.md`
- `docs/12_DATA_OWNERSHIP_LIFECYCLE_CONSISTENCY_ARCHITECTURE.md`
- `docs/13_FIELD_OFFLINE_EVIDENCE_CLIENT_DELIVERY_ARCHITECTURE.md`
- `docs/14_INTEGRATION_DEPLOYMENT_RESILIENCE_OPERATIONS_ARCHITECTURE.md`

Architecture-analysis authorization does not authorize architecture selection. Option documents
must identify alternatives, evidence, assumptions, risks, unresolved inputs, and reversal cost
without presenting a preferred option as accepted.

Architecture proposals remain Proposed until a later architecture-selection gate explicitly
accepts them. A conceptual control model does not authorize a provider, library, data-store pattern,
schema, API, service, application dependency, technical proof, or implementation.

Data-architecture proposals must distinguish business ownership, authoritative source, derived
state, evidence, history, retention state, and physical storage. They must not turn conceptual
records into tables or service boundaries before architecture selection.

Field/client proposals must preserve one shared maintained product, server-authoritative tenant and
permission checks, provisional offline intent, recoverable evidence, and explicit release/version
compatibility. Branding, hostname, application identity, and local cache are never authorization.

Integration/operations proposals must preserve source-qualified tenant context, authoritative
business ownership, idempotent and reconcilable effects, environment/data/credential separation,
safe degraded behavior, verified recovery, minimized observability data, and attributable release
and incident operations. Operational custody is not tenant-data browsing authority.

## Current authorization boundary

Application implementation is not authorized unless a later accepted work package explicitly
authorizes one frozen implementation package. Closing Product Discovery or authorizing architecture
analysis does not authorize application scaffolding, database/cloud selection, runtime
dependencies, deployment configuration, technical-proof execution, or external-system changes.

Discussion findings are not automatically accepted requirements. Preserve the status of Draft,
Proposed, Owner-stated, Accepted, Superseded, Deferred, and Rejected items. Never silently promote
an assumption to an accepted decision.

## Product boundaries

- The product is a multi-tenant platform. Tenant isolation is a non-negotiable trust boundary.
- The initial domain is Myanmar air-conditioning field service, but the core model must not make
  air-conditioning the only possible service industry.
- A field job may be assigned to a crew with multiple workers, not only one technician.
- Work scope may be discovered and changed at the customer site.
- Equipment may be installed, serviced, and repaired by different providers.
- The platform records external MMQR payment evidence; it does not currently process payments.
- Small and large organizations use the same core domain with configuration and governance depth.

These statements are governing discovery constraints. Detailed behavior remains subject to the
status recorded in the product documents.

## Documentation rules

- Use stable identifiers for workflows, capabilities, business rules, decisions, and requirements.
- State scope and non-scope explicitly.
- Record normal paths, optional paths, exception paths, and failure outcomes.
- Keep business concepts independent from database tables and UI screens during discovery.
- Requirements must be testable and trace to workflows, capabilities, domain concepts, or accepted
  decisions.
- Record uncertainty in the assumptions and decisions document rather than hiding it.
- Update every affected governing document before implementation when accepted business behavior
  changes.

## Agentic execution rules

- Every implementation package must have a stable ID, objective, owner, scope, non-scope,
  dependencies, acceptance criteria, evidence location, and next gate.
- Work only inside the authorized path boundary.
- Stop when a missing decision would materially change business behavior, tenancy, authorization,
  data ownership, security, offline synchronization, financial evidence, or audit meaning.
- Low-risk documentation work may combine implementation and validation when the limitation is
  recorded.
- High-risk work involving tenant isolation, authorization, migrations, offline conflict handling,
  inventory integrity, audit records, or production release requires independent validation when
  capacity permits.
- Implementation permission does not imply permission to commit, push, merge, deploy, mutate live
  data, or change third-party configuration.
- Preserve unrelated work and never use destructive Git operations without explicit authorization.

## Private execution control

`internal-local/` is intentionally ignored by Git. It contains private authorization, evidence,
operational notes, and work-package history. Do not move its contents into public documentation.

The current private control record is `internal-local/EXECUTION_CONTROL.md`. An untracked prompt
does not authorize repository mutation, publication, deployment, or external-system changes.

## Completion report

For every completed package, report:

- outcome and current gate;
- exact changed files;
- governing requirement, workflow, rule, decision, and package references;
- validation performed and results;
- unverified areas and limitations;
- remaining risks and blockers;
- whether any commit, push, merge, deployment, data mutation, or external-system change occurred.
