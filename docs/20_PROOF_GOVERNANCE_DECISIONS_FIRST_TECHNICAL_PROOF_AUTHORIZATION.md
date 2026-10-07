# Proof Governance Decisions and First Technical Proof Authorization

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted owner-decision baseline |
| Work package | `WP-17 Proof Governance Decisions and First Technical Proof Authorization` |
| Owner | Aung Myo Oo |
| First proof candidate | `PROOF-SPEC-001` tenant boundary and authorization |
| Proof authorization | Proposed only — not authorized |
| Technical-proof execution | Not authorized |
| Final architecture selection | Not authorized |
| Application coding/dependencies/infrastructure/deployment | Not authorized |
| Last updated | 2026-10-07 |

## Purpose and authority boundary

This package presents the governance decisions needed before technical proofs and prepares one
bounded authorization proposal for the first proof. It answers what counts as decision evidence,
how independent validation works for an owner-led team, which proof should go first, what that proof
may and may not test, and what a later execution package must freeze.

This is owner decision documentation only. The proposed authorization below is not active. It does
not permit a proof harness, source file, schema, dependency manifest or installation, container,
local service, provider account, credential, charge, infrastructure, command execution, measurement,
architecture selection, application code, or deployment. The first proof remains
`SPECIFIED_ONLY`.

## Governing inputs

- The multi-tenant platform boundary in `PD-001`, `ORG-INV-*`, `BR-AUTH-*`, and accepted security
  and system requirements is non-negotiable.
- `DEC-012` separates platform organization discovery from explicit, scoped, time-limited,
  attributable support access to tenant data.
- `DEC-111`, `ADR-DISP-001`, `ADR-DISP-003`, and `SEL-GATE-001/002` require tenant-isolation and
  authorization evidence before final architecture acceptance.
- `DEC-123` through `DEC-126`, `PROOF-ENTRY-001` through `006`, and `PSP-CTRL-001` through `012`
  govern all proofs.
- `PROOF-SPEC-001` is the accepted proof specification; `ADR-READY-001/003` remain `NOT_READY`.
- `BUDGET-BASE-002` is a ceiling, not permission to spend. Customer/live data is prohibited.

## Owner decision sheet

Every recommendation remains Proposed until the owner accepts, revises, defers, or rejects it.

| ID | Recommended decision | Effect if accepted | Status |
| --- | --- | --- | --- |
| `PGD-001` | Adopt the evidence-acceptance threshold in this package for every technical proof. | Resolves `OPEN-087` for proof-result governance, while specialist decision review remains per `ADR-DISP-*`. | Accepted |
| `PGD-002` | Separate proof operator, independent validator, specialist reviewer, and owner decision roles. | Establishes independence criteria; named assignments remain required in each execution package under `OPEN-097`. | Accepted |
| `PGD-003` | Use `PROOF-SPEC-001` as the first technical-proof authorization candidate. | Prioritizes the non-negotiable tenant boundary without selecting a stack or architecture. | Accepted |
| `PGD-004` | Keep the first proof local-only, provider-neutral, synthetic, and zero-provider-cost. | No provider account, paid service, managed identity, cloud region, or infrastructure is authorized; `OPEN-098` remains for hosted proofs. | Accepted |
| `PGD-005` | Adopt `TP1-POLICY-001` through `010` only as the proof authorization policy. | Allows isolation testing without resolving the final role-permission matrix in `OPEN-032`. | Accepted |
| `PGD-006` | Require every complete generated positive and negative case in the frozen matrix to pass, with zero unauthorized disclosure or mutation. | Makes a single tenant-boundary breach a proof failure rather than a score deduction. | Accepted |
| `PGD-007` | Require an independent validator to reproduce the run and review missing-path/adversarial coverage before any result reaches owner decision. | A self-reported successful run remains `MEASURED_UNREVIEWED`. | Accepted |
| `PGD-008` | Keep proof artifacts disposable under one later-authorized proof-only path and prohibit product reuse without implementation authorization. | Prevents proof design from silently becoming the application baseline. | Accepted |
| `PGD-009` | Treat fail, aborted, expired, and inconclusive as non-passing outcomes; only reviewed evidence may become decision input. | Preserves the WP-16 state model and blocks preference-based advancement. | Accepted |
| `PGD-010` | Require a separate execution package to freeze exact versions, dependencies, commands, resource limits, operators, reviewers, evidence paths, and cleanup before the first proof may run. | Acceptance/publication of WP-17 still does not authorize execution. | Accepted |

## Evidence-acceptance threshold

A result may move from `MEASURED_UNREVIEWED` to `REVIEWED` only when every applicable item passes.

| ID | Required evidence |
| --- | --- |
| `PGE-001` | The executed package matches the authorized candidate, versions, configuration, paths, commands, fixture seed/version, resource ceiling, duration, and prohibition list. |
| `PGE-002` | A machine-readable manifest identifies repository revision, dependency lock hash, environment/tool versions, timestamps, operator, evidence files, and cryptographic hashes. |
| `PGE-003` | The complete predeclared case matrix records expected and actual authorization outcome, authoritative tenant context, resource tenant, actor, path, result, and audit reference. |
| `PGE-004` | Reproducible raw output, failure output, relevant sanitized logs, coverage inventory, and before/after authoritative state are retained privately. |
| `PGE-005` | No secret, credential, personal data, customer data, production identifier, or sensitive unrestricted diagnostic output exists in public evidence. |
| `PGE-006` | Every deviation, skipped case, flaky result, changed threshold, unavailable path, and operator intervention is visible and classified before review. |
| `PGE-007` | The independent validator reproduces the authorized run from the recorded instructions and separately checks missing-path and adversarial coverage. |
| `PGE-008` | Required specialist reviewers record scope, evidence inspected, pass/fail/inconclusive opinion, limitations, conflicts, and date. |
| `PGE-009` | Cleanup and residual-state evidence is complete, including processes/services, files, credentials, accounts/resources, costs, and retained evidence. |
| `PGE-010` | The sanitized conclusion distinguishes measurement, inference, unresolved risk, decision consequence, evidence age, and trigger for re-proof. |

Failure of an evidence-control item does not prove the candidate failed technically; it makes the
result `INCONCLUSIVE`, `ABORTED`, or `MEASURED_UNREVIEWED` until corrected and re-reviewed.

## Review roles and independence

| ID | Role | Responsibility | Independence requirement |
| --- | --- | --- | --- |
| `PGR-001` | Proof owner | Own scope, authorization request, budget/time boundary, stop decision, and cleanup accountability | May not unilaterally accept the result as architecture evidence |
| `PGR-002` | Proof operator | Build and run only the frozen proof package; record deviations and raw evidence | May not be the independent validator for the same result |
| `PGR-003` | Independent validator | Reproduce the run; inspect negative coverage, omissions, determinism, provenance, and cleanup | Must not author the harness or operate the primary run |
| `PGR-004` | Security specialist reviewer | Assess threat coverage, tenant context, authorization, support access, logging leakage, and residual security risk | Must have explicit security-review scope; automated review alone is insufficient for final security acceptance |
| `PGR-005` | Privacy/legal specialist reviewer | Review data/residency/retention/legal concerns when applicable | Required only where the decision classification calls for it; cannot be replaced by a technical measurement |
| `PGR-006` | Domain/field/operations reviewer | Review business meaning, device/network, recovery, cost, or operations where applicable | Must be independent of the claim being accepted when the classification requires it |
| `PGR-007` | Product owner | Accept, reject, defer, or condition the reviewed conclusion and later architecture decision | Acceptance must identify the exact evidence packet and remaining exceptions |

For the first proof, `PGR-001`, `PGR-002`, `PGR-003`, `PGR-004`, and `PGR-007` are required.
One person may hold proof-owner and operator roles, but the independent validator must be a separate
review role. The named assignments, availability, and any conflict must be frozen before execution.
This role model partially answers `OPEN-097`; it does not invent currently unavailable people or
waive qualified specialist review.

## Why the tenant-boundary proof is first

| Criterion | `PROOF-SPEC-001` consequence |
| --- | --- |
| Trust severity | Cross-tenant disclosure or mutation breaks the platform's non-negotiable boundary. |
| Architectural leverage | Tenant context affects HTTP, background work, data access, cache, search, export, media metadata, audit, and support paths. |
| Reversal value | Failure before provider selection avoids coupling an unsafe pattern to cloud, mobile, or deployment work. |
| Independence from open inputs | A bounded proof policy can test isolation mechanics without deciding commercial roles, hosted provider, legal residency, device matrix, or final schema. |
| Cost | A future local-only disposable proof can avoid provider accounts and provider spend. |
| Decision impact | Reviewed evidence informs `ADR-READY-001` and `ADR-READY-003`; it does not accept either ADR. |

Offline/mobile, evidence binary transfer, localization, connectivity, provider recovery/cost, and
branded delivery remain later proofs. They are not less important; they depend on a safe tenant
and authorization boundary.

## Proposed first-proof authorization

| Field | Proposed frozen value |
| --- | --- |
| Proof package | `TP-01 Tenant Boundary and Authorization Contract` |
| Source specification | `PROOF-SPEC-001` |
| Proposed state after owner execution authorization | `AUTHORIZED_NOT_STARTED` |
| Objective | Falsify the claim that every tested operation requires authoritative, consistent tenant and authority context and cannot cross its permitted organization/resource boundary |
| Architecture decision input | `ADR-READY-001`, `ADR-READY-003` only |
| Candidate boundary | Portable modular-monolith server/data-access pattern represented by the advancing TypeScript/Node/PostgreSQL category; no provider or final framework/library selection |
| Environment | Isolated local non-production environment only; exact runtime/database versions and mechanism wait for the execution package |
| Data | Deterministic synthetic fixture only; customer/live/production-derived data prohibited |
| Provider spend | USD 0; no cloud or paid service |
| External systems | None |
| Evidence location | Private path to be frozen under `internal-local/work-packages/TP-01/`; sanitized conclusion only may later become public |
| Execution authority | Not granted by WP-17 |

### Proof-only authorization policy

These records are test oracles for TP-01 only. They neither define final commercial roles nor
resolve `OPEN-032`.

| ID | Proof-only policy invariant |
| --- | --- |
| `TP1-POLICY-001` | Every operation has server-resolved actor, active organization, authority source, action, resource identity/organization, purpose, and correlation context. |
| `TP1-POLICY-002` | Missing, malformed, stale, conflicting, client-only, or unverifiable tenant context denies before business data is returned or mutated. |
| `TP1-POLICY-003` | Ordinary tenant authority applies only within the actor's active organization membership and permitted scope. |
| `TP1-POLICY-004` | Multi-organization membership never combines organizations; an explicit authorized context change is required. |
| `TP1-POLICY-005` | Platform organization-directory authority does not grant tenant operational-record authority. |
| `TP1-POLICY-006` | Support access requires an active, scoped, time-limited grant; it is read-only by default and fully attributed. |
| `TP1-POLICY-007` | Machine/background operations require distinct identity, organization, purpose, job/correlation identity, and least privilege. |
| `TP1-POLICY-008` | Resource lookups, caches, search/report/export inputs, and evidence metadata are bound to authoritative tenant context before result construction. |
| `TP1-POLICY-009` | Denial and privileged access produce minimized attributable security/audit evidence without leaking protected record content. |
| `TP1-POLICY-010` | No test path treats hostname, subdomain, custom domain, branded application identity, client-supplied identifier, or local cache as authorization. |

### Synthetic fixture classes

| ID | Fixture requirement |
| --- | --- |
| `TP1-FIX-001` | Three organizations with intentionally colliding/similar human labels and resource keys plus one suspended organization. |
| `TP1-FIX-002` | Single-organization user, multi-organization user, removed membership, worker without login, customer identity, platform directory role, support grant, and machine identity. |
| `TP1-FIX-003` | Customer, site, equipment, service request, work order, visit, crew, inventory reference, external-payment evidence metadata, audit record, and export request in each organization. |
| `TP1-FIX-004` | Active, expired, revoked, wrong-scope, wrong-organization, read-only, and absent support grants. |
| `TP1-FIX-005` | Valid, missing, malformed, stale, conflicting, switched, spoofed-host, and client-overridden tenant-context variants. |

No real receipt photo or other binary evidence is required. TP-01 tests evidence metadata and
authorization references only; binary transfer belongs to `PROOF-SPEC-003`.

### Required path matrix

| ID | Path family | Required positive and negative coverage |
| --- | --- | --- |
| `TP1-PATH-001` | Interactive record command/query | Own-tenant allowed case where policy permits; other tenant, absent context, wrong scope, stale membership, and identifier-enumeration denial |
| `TP1-PATH-002` | Data-access/repository boundary | Tenant predicate/context cannot be omitted or substituted; cross-tenant join/reference/result is denied or impossible under the frozen mechanism |
| `TP1-PATH-003` | Background/queued operation | Job identity, tenant, purpose, retry, and payload reference remain bound; replay or tenant substitution denies safely |
| `TP1-PATH-004` | Search/cache/report/export | Keying, hydration, aggregation, cache reuse, generated export, and download authorization never cross tenant or scope |
| `TP1-PATH-005` | Evidence metadata/reference | Create/read/replace/reference authorization follows owning business context; guessed identifiers and cross-tenant bindings deny |
| `TP1-PATH-006` | Platform organization directory | Authorized platform discovery exposes only permitted directory/control metadata and does not expose tenant operational records |
| `TP1-PATH-007` | Support session | Valid grant is scoped/time-bound/attributed; absent, expired, revoked, wrong-tenant, write-with-read-only, and scope-expansion attempts deny |
| `TP1-PATH-008` | Audit/log/error path | Allowed/denied/privileged outcomes are attributable while protected payloads, secrets, and unrelated tenant data are absent |

The later execution package must turn every combination required by the policy/path matrix into a
stable case ID and expected result before the first run. Adding a case after observing failure is a
new revision and must remain visible.

### Pass, fail, and non-passing outcomes

| ID | Outcome rule |
| --- | --- |
| `TP1-OUT-001` | Pass requires every authorized matrix case to return only its permitted synthetic result and every unauthorized matrix case to disclose/mutate zero protected cross-tenant or out-of-scope data. |
| `TP1-OUT-002` | Any unauthorized disclosure, mutation, export, cache/search result, evidence binding, support action, or background effect is an immediate Fail. |
| `TP1-OUT-003` | Any accepted operation with missing, conflicting, stale, or only client-asserted tenant context is an immediate Fail. |
| `TP1-OUT-004` | Missing audit attribution for privileged/support/machine activity, or sensitive content leakage through logs/errors, is a Fail for its governing control. |
| `TP1-OUT-005` | Skipped, flaky, non-deterministic, unreviewed, changed-after-run, or unreproducible cases make the result Inconclusive rather than Pass. |
| `TP1-OUT-006` | Environment, dependency, fixture, or harness deviation outside the frozen authorization aborts the run and returns it for review. |

Performance may be recorded only as diagnostic information; TP-01 does not prove `QBD-001/002/009`
or production capacity.

## Proposed later execution-package inventory

The following must be explicit before the owner can authorize execution.

| ID | Required frozen execution input |
| --- | --- |
| `TP1-AUTH-001` | Exact repository proof-only path and confirmation that application paths remain untouched |
| `TP1-AUTH-002` | Exact supported runtime, framework/test tools, database, data-access candidate(s), versions, lockfile, licenses, vulnerability review, and download authority |
| `TP1-AUTH-003` | Exact local environment mechanism, ports, filesystem paths, process/container limits, CPU/memory/storage ceiling, and cleanup commands |
| `TP1-AUTH-004` | Exact generated fixture schema, generator version/seed, full stable case list, expected oracle, and prohibition on customer/live data |
| `TP1-AUTH-005` | Proof owner, operator, independent validator, security reviewer, conflicts, availability, and sign-off method |
| `TP1-AUTH-006` | Exact commands, allowed network access, duration/stop limits, evidence manifest/path, redaction, retention, and sanitized-summary format |
| `TP1-AUTH-007` | Failure/abort escalation, issue classification, permitted repair/re-run count, revision rules, and evidence supersession |
| `TP1-AUTH-008` | Cleanup verification for processes, services/containers, generated files, caches, credentials, downloads, and residual state |
| `TP1-AUTH-009` | Separate explicit owner statement authorizing technical-proof execution and the exact dependencies/artifacts above |

WP-17 freezes none of the versions, tools, paths, commands, people, or execution resources in this
table. They remain inputs to the later execution-authorization gate.

## Stop conditions

Stop before authorization or execution if:

- `TP1-POLICY-*`, path coverage, or expected outcomes would silently decide final product roles;
- the proof requires a hosted provider, paid service, managed identity, production/shared
  credential, external integration, or customer/live data;
- a dependency/version, proof path, operator, validator, security reviewer, or cleanup procedure is
  not frozen;
- exact evidence cannot be retained privately and reproduced without secrets;
- the operator is also the only validator;
- a proposed repair would expand beyond the authorized proof boundary;
- a result is presented as architecture acceptance, production readiness, or implementation
  permission.

## Decision and open-question consequences

| Input | Consequence if recommendations are accepted |
| --- | --- |
| `OPEN-087` | Resolved for proof evidence-state transitions by `PGD-001/002/007/009`; each ADR still requires its classified specialist and owner review. |
| `OPEN-097` | Reviewer role/capability model is resolved, but named people/agents and availability remain execution-package inputs. |
| `OPEN-098` | Not applicable to TP-01 because provider accounts and spend are prohibited; remains open for hosted proofs. |
| `OPEN-099` | Not applicable to TP-01; remains open for field/offline/localization proofs. |
| `OPEN-032` | Remains open; `TP1-POLICY-*` is a proof-only oracle, not the product permission matrix. |
| `OPEN-094/095/096` | Remain open; TP-01 does not select managed identity, media profile, database-access library, or offline library. |
| `ADR-READY-001/003` | Remain `NOT_READY` until TP-01 is authorized, executed, independently reviewed, and accepted as decision input together with remaining policy/review evidence. |

## Risks and controls

| ID | Risk | Control |
| --- | --- | --- |
| `PGA-RISK-001` | “First proof authorization” is mistaken for execution permission | Proposed-only status, `TP1-AUTH-009`, and explicit separate execution package |
| `PGA-RISK-002` | Proof-only policy becomes the final role model | Explicit `OPEN-032` preservation and narrow invariant language |
| `PGA-RISK-003` | Local harness success is generalized to hosted/provider paths | Provider-neutral scope and explicit later provider/identity/recovery proofs |
| `PGA-RISK-004` | Operator confirms their own design | Independent reproduction plus specialist security review |
| `PGA-RISK-005` | Matrix misses a side path | Mandatory path-family inventory, adversarial gap review, and inconclusive outcome for skipped paths |
| `PGA-RISK-006` | A test-specific tenant filter is mistaken for defense in depth | Record mechanism and limitations; TP-01 informs but does not accept the architecture |
| `PGA-RISK-007` | Proof dependencies become production dependencies | Proof-only path, disposable classification, separate implementation authorization |
| `PGA-RISK-008` | Sensitive failure evidence becomes public | Private raw evidence and sanitized public conclusion under `DEC-125` |
| `PGA-RISK-009` | Zero provider cost hides owner time or local resource use | Record elapsed operator/reviewer time and local resource envelope even though provider spend is zero |
| `PGA-RISK-010` | A pass becomes permanent despite change | Provenance, expiry triggers, and re-proof on material mechanism/context change |

## Readiness verdict and next gate

WP-17 is `READY_FOR_OWNER_DECISION` as documentation and
`NOT_AUTHORIZED_FOR_TECHNICAL_PROOF_EXECUTION`.

If the owner accepts the recommendations, WP-17 may be published without executing a proof. The
next separately authorized package should be `WP-18 TP-01 Exact Execution Contract and Technical
Proof`, but it must begin with an authorization-readiness check. If any `TP1-AUTH-*` input is not
available, WP-18 must remain planning-only and must not create proof artifacts.

An owner instruction to accept and publish WP-17 does not authorize WP-18 or TP-01 execution. A
future execution instruction must explicitly authorize the frozen proof-only paths, exact
dependencies, local environment, commands, named operator/validator/reviewer roles, evidence,
resource limits, and cleanup. Final architecture selection, application coding, infrastructure,
provider accounts, paid services, deployment, migration, and customer/live data remain separate
closed gates.

## WP-17 acceptance criteria

WP-17 is ready for owner decision when:

- evidence acceptance, independent review, and owner decision roles are distinct;
- each `OPEN-087/097/098/099` consequence is explicit;
- the first proof is justified by risk and dependency order rather than technology preference;
- TP-01 has a bounded objective, proof-only policy, synthetic fixtures, path matrix, pass/fail
  outcomes, evidence/review requirements, stop conditions, and failure consequences;
- exact execution inputs and the later authorization statement are visible but not invented;
- `OPEN-032`, named candidates, final architecture, and production readiness remain unresolved; and
- no proof, harness, schema, dependency, local service, provider account, cost, infrastructure,
  code, deployment, data access, or external mutation occurs.

## Acceptance record

The owner accepted all WP-17 recommendations and dispositions exactly as recorded on 2026-10-07
and authorized publication. `PGD-001` through `PGD-010` and `DEC-128` through `DEC-134` are
accepted proof-governance and TP-01 authorization-planning baselines. `OPEN-087` is resolved for
proof evidence-state transitions; classified specialist and owner review remain required for each
architecture decision. TP-01 remains `SPECIFIED_ONLY` and not authorized to run. No exact proof
dependency, version, path, command, operator, validator, specialist reviewer, environment, or
resource has been authorized. Final architecture selection, proof execution, dependency
installation, application coding, infrastructure, deployment, and customer/live-data use remain
closed.
