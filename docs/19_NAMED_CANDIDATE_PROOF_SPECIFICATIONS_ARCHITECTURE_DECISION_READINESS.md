# Named Candidate Proof Specifications and Architecture Decision Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted proof-planning baseline |
| Work package | `WP-16 Named Candidate Proof Specifications and Architecture Decision Readiness` |
| Owner | Aung Myo Oo |
| Governing shortlist | Accepted WP-13, WP-14, and WP-15 evaluation baselines |
| Final architecture selection | Not authorized |
| Technical-proof execution | Not authorized |
| Application coding/dependencies/infrastructure/deployment | Not authorized |
| Last updated | 2026-10-07 |

## Purpose and authority boundary

This package translates the accepted named shortlist into falsifiable proof specifications and an
architecture-decision readiness ledger. It defines what later evidence must show, how candidates
must be compared, who must review the result, and which outcome returns a candidate for revision or
removes it from consideration.

This document is not proof authorization or a proof result. It creates no executable prototype,
test environment, provider account, credential, cost, dependency, schema, API, infrastructure, or
deployment. All named technologies and providers remain unselected. Each proof remains
`SPECIFIED_ONLY` until a later owner-authorized package freezes its exact inventory and permits
execution.

## Governing inputs

- `PD-001` through `PD-012`, accepted business rules, and accepted system requirements remain
  authoritative product behavior.
- `QBD-001` through `QBD-015` are evaluation targets, not customer SLAs.
- `EVAL-BASE-001` through `EVAL-BASE-012`, `SHORTLIST-001/002`, and `ADR-DISP-001` through
  `ADR-DISP-015` define the evaluation envelope.
- `TECH-CAT-*`, `TECH-SET-*`, `CAND-GOV-*`, `PROOF-ENTRY-*`, and accepted WP-15 budget,
  geography, team, client, named-candidate, cost, and risk dispositions govern proof planning.
- `NAMED-SET-001` and `NAMED-SET-002` advance to comparable proof planning;
  `NAMED-SET-003` remains comparative. No set is selected.
- Tenant isolation, server-authoritative authorization, recoverable offline intent and evidence,
  external-MMQR evidence boundaries, one maintained product, and explicit release compatibility
  are mandatory gates.

## Proof-state model

| ID | State | Meaning and permitted transition |
| --- | --- | --- |
| `PSP-STATE-001` | `SPECIFIED_ONLY` | Scope and criteria exist; no execution authority exists. |
| `PSP-STATE-002` | `AUTHORIZED_NOT_STARTED` | A later owner package freezes exact inventory, accounts, cost, duration, evidence, and reviewers. |
| `PSP-STATE-003` | `EXECUTING` | Only the frozen package may run; deviations stop or return for authorization. |
| `PSP-STATE-004` | `MEASURED_UNREVIEWED` | Raw evidence exists but makes no accepted architecture claim. |
| `PSP-STATE-005` | `REVIEWED` | Required reviewers signed pass, fail, inconclusive, or exception findings. |
| `PSP-STATE-006` | `DECISION_INPUT_ACCEPTED` | The owner accepts a reviewed conclusion as an architecture-decision input. |
| `PSP-STATE-007` | `SUPERSEDED_OR_EXPIRED` | Candidate, version, configuration, target, or evidence age changed materially. |

No state may be skipped. A successful measurement is not an architecture decision; an accepted
architecture decision is not permission to implement it.

## Common proof contract

Every later proof authorization must satisfy all of these controls before execution.

| ID | Required control |
| --- | --- |
| `PSP-CTRL-001` | Freeze one stable package ID, hypothesis, candidates, exact versions/configurations, owner, operator, reviewers, and start/end dates. |
| `PSP-CTRL-002` | Freeze exact repository paths, commands, non-production accounts/projects, regions, credentials custody, and prohibited resources. |
| `PSP-CTRL-003` | Use only synthetic tenants, identities, customers, equipment, jobs, inventory, payment evidence, audit events, and media; live/customer data is prohibited. |
| `PSP-CTRL-004` | Freeze fixture generator/version, seed, volume, workload, device/network matrix, measurement clock, repetitions, and warm/cold conditions. |
| `PSP-CTRL-005` | Map every pass/fail threshold to an accepted `QBD-*`, `SEL-GATE-*`, risk, threat, recovery, privacy, or cost baseline. |
| `PSP-CTRL-006` | Define pass, fail, inconclusive, partial, exception, and aborted outcomes before observing results. |
| `PSP-CTRL-007` | Set maximum elapsed duration, provider spend, resource count, data volume, egress, and automatic cost alerts; any paid action requires separate owner approval. |
| `PSP-CTRL-008` | Capture reproducible commands/configuration hashes, timestamps, raw outputs, failures, limitations, and candidate/version provenance without storing secrets. |
| `PSP-CTRL-009` | Store raw evidence privately under the authorized `internal-local/` package; publish only reviewed, sanitized conclusions. |
| `PSP-CTRL-010` | Define stop, cleanup, resource deletion, credential rotation/revocation, billing verification, evidence retention, and residual-risk checks. |
| `PSP-CTRL-011` | Declare operator conflicts of interest and require the `ADR-DISP-*` reviewer roles to sign the result independently where specified. |
| `PSP-CTRL-012` | Re-run or expire evidence when a material candidate version, provider service, topology, target, workload, region, or security control changes. |

## Comparable candidate envelope

| ID | Candidate set | Proof treatment | Constant comparison boundary |
| --- | --- | --- | --- |
| `PSP-CAND-001` | `NAMED-SET-001` DigitalOcean Singapore candidate | Advance to later authorization | Same portable application boundary, PostgreSQL semantics, synthetic fixtures, workload, targets, and evidence schema |
| `PSP-CAND-002` | `NAMED-SET-002` Google Cloud Singapore candidate | Advance to later authorization | Same boundary and method as `PSP-CAND-001`; provider-native conveniences cannot replace mandatory evidence |
| `PSP-CAND-003` | `NAMED-SET-003` AWS Singapore candidate | Comparative only | Run only when authorized comparison value justifies cost; same mandatory gates and normalized cost lines |

Identity may be evaluated separately from hosting. A provider bundle does not gain a pass because
its identity, database, object, runtime, or telemetry components are sold together. Likewise, a
portable component does not gain a pass merely because the team already knows it.

## Synthetic evidence fixture

| ID | Required fixture class | Minimum proof meaning |
| --- | --- | --- |
| `PSP-FIX-001` | Three ordinary tenants plus one intentionally similar cross-tenant corpus | Positive and negative tenant-isolation checks across identifiers, search, export, media, logs, queues, and caches |
| `PSP-FIX-002` | Platform users, tenant users, multi-membership user, workers without login, customers, support grant, and machine identities | Identity, active-tenant, delegation, support, revocation, and attribution paths |
| `PSP-FIX-003` | Crew jobs with multiple visits/equipment, changing scope, approvals, mixed outcomes, inventory, and external MMQR receipt photos | Myanmar field workflow, authorization, history, and evidence boundaries |
| `PSP-FIX-004` | Offline assignment set matching `QBD-004`, including duplicate, conflict, stale, revoked, and damaged/corrupt local cases | Deterministic synchronization and recovery evidence |
| `PSP-FIX-005` | Media set through the `QBD-006` item/visit limits with interruption and replacement variants | Resumability, integrity, privacy, lifecycle, and cost evidence |
| `PSP-FIX-006` | Initial and growth portfolios from `QBD-009` plus `QBD-010` large-tenant skew | Performance, fairness, reporting, storage, and unit-cost evidence |
| `PSP-FIX-007` | Myanmar/English Unicode, address, currency/time, long-label, low-vision, screen-reader, and low-literacy task corpus | Localization, accessibility, rendering, and field-usability evidence |

Exact generated record counts outside accepted QBD limits, file corpus, Android devices, OS
versions, and network profiles must be frozen by the later proof authorization. `OPEN-099` remains
blocking for field/client execution.

## Proof specification register

All specifications below are `SPECIFIED_ONLY`.

| ID | Objective and falsifiable hypothesis | Candidates | Mandatory result |
| --- | --- | --- | --- |
| `PROOF-SPEC-001` | Tenant context and authorization cannot be bypassed through interactive, background, media, search, export, support, audit, cache, or offline paths. | Portable core plus every identity/hosting candidate | Zero unauthorized cross-tenant or out-of-scope disclosure/mutation in the frozen attack and negative-test corpus |
| `PROOF-SPEC-002` | Flutter with the shortlisted SQLite access candidates can preserve a 48-hour assignment-scoped working set and safely reconcile valid, duplicate, conflicting, stale, and revoked intent. | `NAMED-TECH-003`, `012`, comparative `013` | Meet `QBD-003/004/005`; no silent loss, unauthorized acceptance, false completion, or unrecoverable queue state |
| `PROOF-SPEC-003` | Evidence and external-MMQR receipt photos can transfer privately and resumably while preserving integrity, authorization, replacement history, and recovery. | Portable media contract across `PSP-CAND-001/002`, optionally `003` | Meet `QBD-006`; no public-by-default object, broken job/payment binding, or untraceable replacement |
| `PROOF-SPEC-004` | The first field/client family is usable for Myanmar/English work on the accepted Android/network/accessibility matrix. | React/Vite web and Flutter Technician | Mandatory localization/accessibility corpus passes; camera/background/network failures have safe, visible recovery |
| `PROOF-SPEC-005` | Shared subdomains, verified custom domains, and shared/branded artifacts preserve server-authoritative tenant routing and compatible rollback/revocation. | Portable delivery model across advancing provider candidates | No hostname/branding authority escalation; meet `QBD-013`; demonstrate attributable signing/configuration and safe rollback design |
| `PROOF-SPEC-006` | The portable application/database boundary meets initial and growth performance/fairness targets without weakening tenant enforcement. | PostgreSQL and portable server/API on `PSP-CAND-001/002`; `003` comparative | Meet `QBD-001/002/009/010` under frozen load; report saturation, noisy-neighbor, queue, and derived-freshness limits |
| `PROOF-SPEC-007` | A declared provider topology can restore authoritative records and evidence within accepted recovery targets from independently inventoried backups. | Each provider candidate that may advance | Meet `QBD-008` RPO/RTO with integrity, tenant-boundary, key, audit, and reconciliation evidence; document unavailable regional guarantees |
| `PROOF-SPEC-008` | Singapore-hosted candidate paths remain safe and usable across representative Myanmar fixed/mobile impairment profiles. | `PSP-CAND-001/002`; `003` comparative | Measured latency/loss/interruption results satisfy later accepted `OPEN-092` threshold; offline/degraded outcomes never masquerade as success |
| `PROOF-SPEC-009` | Each candidate fits the accepted cost/operations envelope under idle, expected, burst, retention, failure, restore, and exit scenarios. | All candidates retained after mandatory gates | Complete `COST-LINE-001` through `010`; normalized monthly/unit costs; proof spend within `BUDGET-BASE-002`; production target/review thresholds visible |
| `PROOF-SPEC-010` | Authoritative and required historical data can leave each candidate without losing tenant identity, provenance, evidence binding, audit meaning, or usable formats. | Identity, PostgreSQL, object, configuration, audit, and provider candidates | Versioned export plus restore/import rehearsal design; completeness checks, duration/cost, proprietary gaps, and deletion verification |
| `PROOF-SPEC-011` | Managed identity candidates fail safely for tenant mapping, recovery, revocation, session expiry, export, support elevation, and provider outage. | `NAMED-TECH-014`, comparative `015` | Product organization authority stays server-owned; required identity/session tests pass; export/recovery and pricing gaps are explicit |
| `PROOF-SPEC-012` | Telemetry and release candidates provide useful incident/release evidence without tenant leakage, uncontrolled cardinality/cost, or unverifiable artifacts. | `NAMED-TECH-017/018` across retained providers | Redaction/isolation, provenance, rollback, alert usefulness, retention, and cost controls pass the frozen exercise |

### WP-15 proof traceability

| ID | Accepted WP-15 need | WP-16 specification |
| --- | --- | --- |
| `PROOF-MAP-001` | `NAMED-PROOF-001` tenant context and authorization | `PROOF-SPEC-001`, with identity-specific cases in `PROOF-SPEC-011` |
| `PROOF-MAP-002` | `NAMED-PROOF-002` offline queue, migration, conflict, revocation, loss, and working set | `PROOF-SPEC-002` |
| `PROOF-MAP-003` | `NAMED-PROOF-003` private/resumable evidence and receipt-photo binding | `PROOF-SPEC-003` |
| `PROOF-MAP-004` | `NAMED-PROOF-004` Myanmar/English, accessibility, camera, background, and weak network | `PROOF-SPEC-004`, with connectivity measurements in `PROOF-SPEC-008` |
| `PROOF-MAP-005` | `NAMED-PROOF-005` domains, branded artifacts, compatibility, revocation, and rollback | `PROOF-SPEC-005`, with release evidence in `PROOF-SPEC-012` |
| `PROOF-MAP-006` | `NAMED-PROOF-006` initial/growth workload, tenant enforcement, and freshness | `PROOF-SPEC-006` |
| `PROOF-MAP-007` | `NAMED-PROOF-007` backup/restore RPO and RTO | `PROOF-SPEC-007` |
| `PROOF-MAP-008` | `NAMED-PROOF-008` Singapore-to-Myanmar network and degraded behavior | `PROOF-SPEC-008` |
| `PROOF-MAP-009` | `NAMED-PROOF-009` provider and unit cost | `PROOF-SPEC-009` |
| `PROOF-MAP-010` | `NAMED-PROOF-010` identity/data/evidence/configuration/audit exit | `PROOF-SPEC-010`, with identity-specific exit in `PROOF-SPEC-011` |

## Per-proof evidence and review plan

| Proof | Required private evidence | Independent review | Failure consequence |
| --- | --- | --- | --- |
| `PROOF-SPEC-001` | Threat corpus, request/job matrices, negative results, logs with redaction, authorization explanations | Security and tenant-isolation review | Candidate cannot advance; design returns to architecture analysis |
| `PROOF-SPEC-002` | Device/OS matrix, seeded operation log, sync trace, before/after authoritative state, corruption/recovery record | Security plus field-device/offline review | Offline candidate or policy is revised/rejected; online-only fallback requires a new owner decision |
| `PROOF-SPEC-003` | Object policy, transfer trace, hashes, interruption runs, access-negative tests, lifecycle/cost samples | Security and privacy review | Media/storage path cannot advance |
| `PROOF-SPEC-004` | Corpus results, accessibility outputs, task observations, screenshots/videos without personal data, recovery cases | Domain, accessibility, and field-device review | Client candidate or supported matrix is revised |
| `PROOF-SPEC-005` | Routing matrix, ownership checks, signing/config provenance, compatibility and rollback scenarios | Security and release/operations review | Custom-domain/branded option remains unavailable |
| `PROOF-SPEC-006` | Load definition, raw timings, plans/profiles, resource curves, fairness/errors, freshness and cost samples | Architecture, data, and operations review | Candidate fails horizon or requires explicit target/profile revision |
| `PROOF-SPEC-007` | Backup inventory, timestamps, restore transcript, integrity/reconciliation checks, failure and cleanup record | Independent recovery, security, and privacy review | Provider topology cannot advance |
| `PROOF-SPEC-008` | Network profile provenance, timings, loss/retry traces, user-visible state, resumed outputs | Myanmar field/network review | Geography/provider remains blocked by `OPEN-092` |
| `PROOF-SPEC-009` | Versioned calculator/input sheet, invoices if authorized, assumptions, unit costs, sensitivity and alert evidence | Owner/finance and operations review | Candidate is rejected or requires an explicit budget-baseline decision |
| `PROOF-SPEC-010` | Export manifest, hashes/counts, formats, elapsed time, cost, import/restore checks, deletion evidence | Data, privacy, and operations review | Candidate fails reversibility gate |
| `PROOF-SPEC-011` | Identity-state matrix, recovery/session/revocation traces, outage cases, export and cost evidence | Independent security/privacy review | Identity candidate cannot advance |
| `PROOF-SPEC-012` | Redaction/cardinality tests, incident timeline, artifact provenance/signature, rollback and cost evidence | Security and operations review | Telemetry/release candidate remains unaccepted |

## Proof waves and authorization boundaries

| ID | Planned wave | Dependencies | Authorization effect |
| --- | --- | --- | --- |
| `PSP-WAVE-000` | Resolve proof governance inputs | `OPEN-087`, `097`, `098`, `099`; qualified legal input remains separate under `OPEN-093` | Documentation decision only; no execution |
| `PSP-WAVE-001` | Tenant/identity threat and test design | Accepted permission matrix or explicit bounded test policy; exact identity candidates | Later execution package required |
| `PSP-WAVE-002` | Field/offline/media/localization design | Accepted device/network/corpus; evidence and conflict policies | Later execution package required |
| `PSP-WAVE-003` | Comparable provider performance, recovery, connectivity, cost, and exit design | Waves 001/002 fixture contracts; authorized isolated accounts and spend | Later execution package required |
| `PSP-WAVE-004` | Branded delivery, observability, release, and incident design | Store/domain ownership and release-governance inputs | Later execution package required |
| `PSP-WAVE-005` | Reviewed synthesis and ADR evidence packets | Applicable proof results and independent reviews | Later owner architecture-selection package required |

Waves express dependency order, not permission or a delivery date. A later owner may authorize one
proof at a time, revise the sequence, or stop after a failed mandatory gate.

## Cost and cleanup planning baseline

| ID | Planning control |
| --- | --- |
| `PSP-COST-001` | The combined average proof/development/test provider spend remains at or below USD 100/month under `BUDGET-BASE-002`; this is a ceiling, not spending permission. |
| `PSP-COST-002` | Every hosted proof states a smaller per-package maximum, estimated worst case, billing owner, alert thresholds, automatic expiry, and who may approve overrun. |
| `PSP-COST-003` | Provider comparisons normalize all ten `COST-LINE-*` values and distinguish observed proof invoices, current list prices, calculator estimates, and projections. |
| `PSP-COST-004` | Cleanup evidence includes resource inventory before/after, deletion status, snapshots/backups/logs/artifacts retained, credential revocation, final charge window, and residual recurring cost. |
| `PSP-COST-005` | A proof stops before expansion when cost visibility fails, alerts cannot be configured, account ownership is unclear, or deletion cannot be verified. |

## Architecture-decision readiness ledger

`READY` means evidence is complete enough to place a decision before the owner; it does not mean
the architecture is accepted. Every row is currently `NOT_READY`.

| ID | Decision group | Required evidence/review | Current blocker | Readiness |
| --- | --- | --- | --- | --- |
| `ADR-READY-001` | Tenant context/isolation (`ADR-DISP-001`) | `PROOF-SPEC-001`, independent security review | No executed proof; permission matrix remains open | `NOT_READY` |
| `ADR-READY-002` | Identity/session (`ADR-DISP-002`) | `PROOF-SPEC-011`, policy plus security/privacy review | `OPEN-045/046/047/094` | `NOT_READY` |
| `ADR-READY-003` | Authorization/support (`ADR-DISP-003`) | `PROOF-SPEC-001`, support threat cases, security review | `OPEN-008/013/032/087` | `NOT_READY` |
| `ADR-READY-004` | Data/consistency (`ADR-DISP-004`) | `PROOF-SPEC-006/010`, data/domain review | Consistency/correction policies and measured evidence absent | `NOT_READY` |
| `ADR-READY-005` | Offline (`ADR-DISP-005`) | `PROOF-SPEC-002`, field/security review | `OPEN-021/047/096/099` | `NOT_READY` |
| `ADR-READY-006` | Evidence/media (`ADR-DISP-006`) | `PROOF-SPEC-003`, privacy/security review | `OPEN-028/033/095` | `NOT_READY` |
| `ADR-READY-007` | Inventory (`ADR-DISP-007`) | Invariant test design plus domain/accounting review | `OPEN-027` and no invariant evidence | `NOT_READY` |
| `ADR-READY-008` | Reporting (`ADR-DISP-008`) | `PROOF-SPEC-006`, KPI/freshness decision | `OPEN-036/055` | `NOT_READY` |
| `ADR-READY-009` | Integration/notification (`ADR-DISP-009`) | Per-contract analysis and authorized integration proof where applicable | `OPEN-035/069/070`; no initial integration selected | `NOT_READY` |
| `ADR-READY-010` | Custom domains (`ADR-DISP-010`) | `PROOF-SPEC-005`, security/operations review | `OPEN-066` | `NOT_READY` |
| `ADR-READY-011` | Branded delivery (`ADR-DISP-011`) | `PROOF-SPEC-005/012`, ownership/release review | `OPEN-003/004/065` | `NOT_READY` |
| `ADR-READY-012` | Deployment/recovery (`ADR-DISP-012`) | `PROOF-SPEC-007/008/009/010`, legal and operations review | `OPEN-071/072/074/092/093/098` | `NOT_READY` |
| `ADR-READY-013` | Audit/observability (`ADR-DISP-013`) | `PROOF-SPEC-012`, incident exercise, security/privacy/operations review | `OPEN-050/075/076/080` | `NOT_READY` |
| `ADR-READY-014` | Localization/accessibility (`ADR-DISP-014`) | `PROOF-SPEC-004`, domain/accessibility review | `OPEN-068/099` | `NOT_READY` |
| `ADR-READY-015` | Surface/navigation (`ADR-DISP-015`) | Client usability/security evidence and authorization review | Surface policies and executed evidence absent | `NOT_READY` |

## Architecture evidence packet

Every later decision packet must contain:

| ID | Required content |
| --- | --- |
| `ADR-PACKET-001` | Decision ID, owner, status, date, alternatives, exact candidate/version/configuration, and superseded records |
| `ADR-PACKET-002` | Governing product/workflow/rule/requirement/quality traces and mandatory-gate matrix |
| `ADR-PACKET-003` | Sanitized proof conclusions linked to private raw evidence manifests and reviewer sign-off |
| `ADR-PACKET-004` | Pass, fail, inconclusive, exceptions, assumptions, evidence age, and limits on generalization |
| `ADR-PACKET-005` | Security/privacy/data/offline/recovery/operability/cost consequences and residual risks |
| `ADR-PACKET-006` | Reversal/exit cost, migration path, proprietary dependencies, trigger to revisit, and evidence expiry |
| `ADR-PACKET-007` | Explicit accepted/rejected/deferred/conditional disposition; no aggregate score may hide a failed mandatory gate |
| `ADR-PACKET-008` | Separate next authorization: another proof, architecture selection, roadmap work, or one frozen implementation package |

## Selection-readiness rules

| ID | Rule |
| --- | --- |
| `PSP-GATE-001` | Mandatory tenant, authorization, evidence, offline, recovery, privacy/legal, and reversibility failures cannot be traded for lower cost or team familiarity. |
| `PSP-GATE-002` | Weighted comparison may begin only after applicable mandatory gates have reviewed results using the same declared method. |
| `PSP-GATE-003` | Inconclusive evidence keeps the decision open; it is not a pass. A conditional exception requires named owner, expiry, consequence, compensating control, and later gate. |
| `PSP-GATE-004` | A candidate failing an accepted gate is revised, narrowed, deferred, or rejected before any final architecture recommendation. |
| `PSP-GATE-005` | Legal/privacy review under `OPEN-093` is required before production geography/residency approval and cannot be replaced by a technical proof. |
| `PSP-GATE-006` | Exact dependencies and versions remain unselected until the architecture decision and later implementation package explicitly freeze them. |
| `PSP-GATE-007` | Architecture acceptance does not authorize application coding, infrastructure, provider purchase, deployment, migration, or customer-data use. |
| `PSP-GATE-008` | Material new requirements, provider changes, evidence expiry, or proof-method defects return affected decisions to analysis or proof. |

## Risks and controls

| ID | Risk | Control |
| --- | --- | --- |
| `PSP-RISK-001` | Proof code becomes an unauthorized application scaffold | Freeze disposable paths in a later package; prohibit moving artifacts into product code without implementation authorization |
| `PSP-RISK-002` | A familiar candidate receives weaker scrutiny | Common fixtures, gates, and evidence schema across candidates |
| `PSP-RISK-003` | Provider demo or advertised feature is recorded as proof | Accept only reproduced measurements and reviewed evidence from the frozen configuration |
| `PSP-RISK-004` | Synthetic data misses sensitive boundary failures | Use adversarial cross-tenant, support, export, media, log, cache, and offline cases; independent security review |
| `PSP-RISK-005` | Proof spending or resources continue unnoticed | Per-package cap, alerts, expiry, cleanup manifest, billing verification, and explicit paid-action approval |
| `PSP-RISK-006` | Aggregate scoring hides a trust/recovery failure | Mandatory-gate precedence and explicit fail/inconclusive disposition |
| `PSP-RISK-007` | Raw evidence leaks secrets or exploitable detail | Private evidence, secret scanning/redaction, restricted review, sanitized public conclusions |
| `PSP-RISK-008` | Old results survive material candidate changes | Provenance, evidence age, expiry triggers, and targeted re-proof |
| `PSP-RISK-009` | Reviewer independence exists only on paper | Name reviewers before execution and record conflicts, scope, date, and sign-off |
| `PSP-RISK-010` | Proof success is mistaken for implementation permission | Separate proof, architecture-selection, roadmap, implementation, publication, and deployment gates |

## Unresolved inputs and stop conditions

- `OPEN-087` and `OPEN-097` block acceptance of the reviewer/evidence threshold.
- `OPEN-098` blocks any hosted or paid proof.
- `OPEN-099` blocks field/offline/localization proof execution.
- `OPEN-092` blocks a connectivity pass/fail conclusion until its measured acceptance threshold is
  accepted.
- `OPEN-093` blocks production residency approval regardless of technical results.
- `OPEN-094`, `OPEN-095`, and `OPEN-096` remain candidate/dependency decision inputs.
- Domain policy openings referenced in `ADR-READY-*` remain blockers for the affected decision,
  even if a technology measurement succeeds.

Stop and return for owner decision when a proof would require live/customer data, an unapproved
paid action, production or shared credentials, a new candidate outside the accepted shortlist, an
unfrozen dependency, a changed business rule, acceptance-threshold invention, missing independent
review, or scope beyond the authorized package.

## Readiness verdict and next gate

WP-16 is `READY_FOR_OWNER_REVIEW` as a proof-planning package and
`NOT_READY_FOR_PROOF_EXECUTION_OR_FINAL_ARCHITECTURE_SELECTION`.

The next recommended package is `WP-17 Proof Governance Decisions and First Technical Proof
Authorization`. It should first resolve or disposition `OPEN-087`, `OPEN-097`, `OPEN-098`, and the
inputs needed by one highest-risk proof; freeze exactly one proof inventory; and explicitly decide
whether execution, cost, accounts, dependencies, and disposable proof artifacts are authorized.
Authorization should start with `PROOF-SPEC-001` only if its permission/test policy and independent
security reviewer are ready. Otherwise WP-17 should remain an owner-decision package and authorize
no execution.

WP-17 must not be activated, and no proof may run, until the owner accepts or revises this package
and separately authorizes the next gate. Final architecture selection, application coding,
dependencies, infrastructure, deployment, migration, live/customer data, and external-system
changes remain closed.

## WP-16 acceptance criteria

WP-16 is ready for owner review when:

- every accepted `NAMED-PROOF-*` need maps to a bounded, falsifiable proof specification;
- every proof states candidates, common controls, synthetic evidence, mandatory outcome, private
  evidence, reviewers, failure consequence, cost/cleanup, and later authorization boundary;
- every `ADR-DISP-*` has an explicit readiness row and blocker;
- proof result, reviewer conclusion, owner decision, and implementation permission stay separate;
- advancing candidates use a comparable envelope and mandatory gates outrank weighted preference;
- unresolved policy, legal, reviewer, account, device, network, dependency, and cost inputs remain
  visible; and
- no proof, code, dependency, account, infrastructure, cost, deployment, data access, or external
  mutation occurs.

## Acceptance record

The owner accepted this complete WP-16 proof-planning package on 2026-10-07 and authorized
publication. `DEC-123` through `DEC-126` are accepted as proof-governance baselines. Every proof
remains `SPECIFIED_ONLY`, every architecture decision remains `NOT_READY`, all named candidates
remain unselected, and all unresolved inputs and stop conditions remain open. Acceptance does not
authorize proof execution, executable artifacts, dependency installation, accounts, credentials,
spending, infrastructure, final architecture selection, application coding, deployment,
migration, live/customer data, or external-system mutation.
