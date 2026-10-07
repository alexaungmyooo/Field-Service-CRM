# Technology Category and Provider-Neutral Candidate Evaluation

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted evaluation baseline |
| Work package | `WP-14 Technology Category and Provider-Neutral Candidate Evaluation` |
| Owner | Aung Myo Oo |
| Final architecture selection | Not authorized |
| Named products/providers | Not authorized |
| Technical-proof execution | Not authorized |
| Application coding/dependencies/deployment | Not authorized |
| Last updated | 2026-10-07 |

## Purpose and boundary

This document evaluates technology categories against the accepted `QBD-*`, `EVAL-BASE-*`,
`SHORTLIST-*`, `ADR-DISP-*`, and `SEL-GATE-*` baseline. It recommends categories to carry into a
later named-candidate evaluation. A category recommendation is not a final architecture, product,
provider, library, dependency, or implementation decision.

## Evaluation principles

| ID | Principle |
| --- | --- |
| `TECH-PRIN-001` | Category fit is evaluated as one coherent system, not by popularity or isolated benchmark. |
| `TECH-PRIN-002` | Tenant, authorization, business, offline, evidence, integration, and recovery gates are mandatory. |
| `TECH-PRIN-003` | Primary categories optimize Profile 001 simplicity; comparative categories preserve Profile 002 growth evidence. |
| `TECH-PRIN-004` | Managed operation is preferred only when geography, cost, skills, exit, and control gates pass. |
| `TECH-PRIN-005` | Open standards and portable data/contracts improve exit but never replace tested recovery and migration. |
| `TECH-PRIN-006` | Named candidates wait for `OPEN-088` through `OPEN-091` and a separate authorization gate. |

## Category evaluation

| ID | Concern | Primary category to evaluate | Comparative category | Defer/reject for initial evaluation | Principal proof or blocker |
| --- | --- | --- | --- | --- | --- |
| `TECH-CAT-001` | Application structure | Modular monolith with explicit capability ownership and internal boundaries | Selectively separated workers/read workloads | Broad independently deployed domain services | Tenant/invariant tests; Profile 001/002 comparison |
| `TECH-CAT-002` | Server runtime | General-purpose long-running application runtime with strong ecosystem and managed hosting compatibility | Function/event runtime for isolated burst/background tasks | Function-per-operation core or orchestration-heavy platform | `OPEN-090`, latency/cost/operations evidence |
| `TECH-CAT-003` | Admin/Management web | Responsive web application with secure server-backed authorization and mobile layout | Installable web packaging where device behavior proves adequate | Separate native management codebase | Browser matrix, accessibility, secure navigation |
| `TECH-CAT-004` | Technician client | Shared cross-platform installed-client category with robust camera/local storage/background support | Installable web client if `TP-CAND-002/003` proves target devices | Separate per-tenant/native forks | `OPEN-091`, offline/media/device proofs |
| `TECH-CAT-005` | Customer client | Responsive/installable shared web category first | Shared cross-platform installed client for push/device/store needs | Per-tenant code forks | Delegation, notification, platform/distribution evidence |
| `TECH-CAT-006` | API boundary | Versioned request/response contract with explicit tenant context, validation, idempotency, and typed schema | Purpose-specific query aggregation for authorized dashboards | Client-driven unrestricted data/query boundary | Authorization, compatibility, rate/error proof |
| `TECH-CAT-007` | Operational data | Relational transactional database category with strong constraints, transactions, indexing, and recovery | Selective purpose-specific derived stores | Document-only core or independent store per domain | `TP-CAND-001/007/008/010` |
| `TECH-CAT-008` | Tenant placement | Shared schema/model with mandatory tenant key/context and defense-in-depth enforcement | Dedicated placement variant only for deferred Profile 003 | Database-per-small-tenant default | Isolation/restore/noisy-neighbor proof |
| `TECH-CAT-009` | Offline local data | Structured embedded local database with transactions, migration, encryption capability, and operation log | Browser-managed structured storage for proven web client | Broad tenant replica/automatic merge | `TP-CAND-002`, device security, upgrade proof |
| `TECH-CAT-010` | Evidence/media | Object/blob storage category plus authoritative relational metadata and controlled transfer | Exceptional small content in operational store | Public file URLs or provider-owned business meaning | `TP-CAND-003`, lifecycle/safety/access proof |
| `TECH-CAT-011` | Background effects | Transactional intent/outbox plus managed durable queue/worker category where needed | Database-backed worker/queue for initial bounded scale | Full event-sourced core | Duplicate/retry/reconciliation and operations proof |
| `TECH-CAT-012` | Identity authentication | Managed identity/authentication category with standards-based integration | Application-owned identity only if managed fit fails | Provider claims as final business authorization | `TP-CAND-009`, recovery/session/cost/geography review |
| `TECH-CAT-013` | Authorization | Application/domain policy component using authoritative facts and centralized decision discipline | Dedicated policy engine category if expressiveness/scale justifies | Roles/claims alone | Permission matrix and `TP-CAND-009` |
| `TECH-CAT-014` | Search/reporting | Operational relational queries/views first; derived read model when `QBD-002/009` evidence requires | Dedicated search/analytics category for measured needs | Warehouse/lake in initial architecture | `TP-CAND-007`, freshness/rebuild/isolation |
| `TECH-CAT-015` | Notifications/integrations | Adapter boundary plus durable effects; managed channel/provider behind contract | Direct synchronous call only for accepted immediate cases | Provider SDK/business meaning spread through core | Contract/retry/privacy proof |
| `TECH-CAT-016` | Observability | Open telemetry/instrumentation conventions with managed or self-operated backend evaluated later | Provider-native instrumentation behind portable context | Payload-rich unrestricted logs | Privacy/access/incident exercise |
| `TECH-CAT-017` | Deployment | Managed application platform/container service category with simple promotion/rollback | Managed container orchestration only when scale/isolation evidence requires | Self-managed complex cluster for initial release | `OPEN-088/089/090`, release/failure proof |
| `TECH-CAT-018` | Configuration/secrets | Environment-bound managed secret/configuration category with versioning, rotation, and audit | Portable encrypted configuration tooling | Secrets in source/client/tenant settings | Security/operations review |
| `TECH-CAT-019` | Backup/recovery | Managed database/object backup primitives plus independently verified restore workflow | Additional controlled export/copy for defined failure modes | Backup feature without restore proof | `TP-CAND-008`, `QBD-008` |
| `TECH-CAT-020` | Build/release | Reproducible automated build/test/sign/promotion category with separated credentials | Manual approval gates over automation | Per-tenant pipelines/source forks | Branded parity, provenance, rollback evidence |

## Coherent category sets

### `TECH-SET-001` — primary Profile 001 evaluation set

- modular monolith application structure;
- general-purpose managed-compatible server runtime;
- responsive Admin/Management web;
- shared installed Technician client and web-first Customer client;
- versioned request/response API contract;
- relational transactional operational data with shared tenant enforcement;
- structured assignment-scoped local store;
- object media plus authoritative metadata;
- transactional intent with the simplest durable worker/queue meeting evidence;
- managed authentication with application/domain authorization;
- operational query/view reporting first;
- adapter-based notifications/integrations;
- portable instrumentation with managed-backend evaluation;
- managed application deployment, secrets, backup primitives, and verified restore.

### `TECH-SET-002` — comparative Profile 002 evaluation set

Keep `TECH-SET-001` business and trust boundaries, then separately evaluate only:

- derived search/report models;
- managed durable queue/worker separation;
- isolated media processing;
- independently scalable integration/notification workers; and
- stronger deployment isolation for proven hotspots.

No separate workload becomes authoritative merely because it is independently operated.

## Category disposition summary

| Disposition | Categories |
| --- | --- |
| Advance primary | `TECH-CAT-001` through `TECH-CAT-020` primary column as one coherent set |
| Comparative | Only the comparative columns justified by Profile 002 evidence |
| Defer | Dedicated tenant placement, dedicated search/analytics, orchestration-heavy deployment, provider-specific optimization |
| Reject initial | Tenant/client source forks, provider claims as authorization, document-only operational core, broad local replica, public evidence URLs, full event-sourced core, function-per-operation core, self-managed complex cluster |

## Named-candidate entry requirements

| ID | Requirement |
| --- | --- |
| `TECH-IN-001` | Resolve `OPEN-088` monetary budget and expected tenant/revenue envelope. |
| `TECH-IN-002` | Resolve `OPEN-089` geography/residency and provider availability. |
| `TECH-IN-003` | Resolve `OPEN-090` demonstrated team language/runtime/framework skills and support market. |
| `TECH-IN-004` | Resolve `OPEN-091` target mobile platforms/distribution constraints. |
| `TECH-IN-005` | Record licensing, support lifecycle, security response, portability, exit, and total operational ownership for each named candidate. |
| `TECH-IN-006` | Define executable proof environments, synthetic data policy, pass criteria, and evidence locations before proof authorization. |

## Risks

| ID | Risk | Control |
| --- | --- | --- |
| `TECH-RISK-001` | “Modular monolith” becomes unstructured coupling | Enforce capability ownership, dependency rules, tests, and extraction seams |
| `TECH-RISK-002` | Managed services create hidden cost/lock-in | Compare total cost, data exit, contracts, limits, and recovery |
| `TECH-RISK-003` | Cross-platform client fails Myanmar devices | Target-device offline/media proof before selection |
| `TECH-RISK-004` | Shared tenant data leaks through indirect paths | Defense-in-depth and `TP-CAND-001` |
| `TECH-RISK-005` | Queue/derived stores add premature operations | Add only for accepted effect or measured target |
| `TECH-RISK-006` | Category recommendation is mistaken for product selection | Separate WP-14 acceptance from later named-candidate and final-selection gates |

## Readiness verdict and next package

Provider-neutral technology-category evaluation is ready for owner review. Named product/provider
evaluation is **not ready** until `TECH-IN-001` through `TECH-IN-004` are resolved. No technical
proof may run without a separate authorization and executable proof package.

After acceptance and publication, recommend `WP-15 Budget, Geography, Team Fit and Named Candidate
Shortlist` for owner decision documentation and named-candidate analysis only. Final architecture
selection, proof execution, coding, dependencies, and deployment remain closed.

## WP-14 acceptance criteria

- categories trace to accepted baselines, Profiles 001/002, gates, risks, and proofs;
- primary and comparative category sets are coherent and provider-neutral;
- defer/reject decisions and evolution triggers are explicit;
- named-candidate entry requirements remain blockers; and
- no named technology/provider, dependency, final architecture, proof, code, deployment, data
  access, or external change is selected or performed.

## Acceptance record

The owner accepted this evaluation baseline and authorized publication on 2026-10-07. Acceptance
advances the provider-neutral category dispositions and coherent sets into named-candidate
analysis. The `TECH-IN-*` requirements remain inputs and controls for WP-15; they are not silently
resolved by this acceptance. No named candidate or final architecture is selected, and technical
proof execution, dependency installation, application coding, and deployment remain closed.
