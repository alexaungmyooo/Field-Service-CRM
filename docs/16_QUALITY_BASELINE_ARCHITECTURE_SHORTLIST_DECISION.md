# Quality Baseline and Architecture Shortlist Decision

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted owner-decision baseline |
| Work package | `WP-13 Quality Baseline and Architecture Shortlist Decision` |
| Owner | Aung Myo Oo |
| Decision state | Owner dispositions recorded; final architecture remains unselected |
| Final architecture selection | Not authorized |
| Technical-proof execution | Not authorized |
| Application coding | Not authorized |
| Deployment | Not authorized |
| Last updated | 2026-10-01 |

## Purpose

This package turns WP-12 analysis into explicit decisions that the owner may accept, revise, defer,
or reject. It narrows what should be evaluated next; it does not choose a technology stack or final
architecture and does not authorize proofs or implementation.

## Decision language

| Disposition | Meaning |
| --- | --- |
| Accept as evaluation baseline | Use for architecture comparison and proof design; not a customer SLA or production commitment |
| Advance | Include in the next bounded technology-category evaluation |
| Comparative only | Evaluate as an alternative/evolution trigger, not presumed initial design |
| Defer | Retain for a named later trigger; exclude from initial evaluation |
| Reject for initial architecture | Do not evaluate for the initial design unless governing evidence materially changes |
| Proof required | Analysis alone cannot close the decision |
| Independent review required | Named domain/security/privacy/operations expertise must review before acceptance |

## Recommended quality-baseline decisions

| ID | WP-12 target | Recommended disposition | Decision effect | Still not decided |
| --- | --- | --- | --- | --- |
| `QBD-001` | `QTB-001` interactive response | Accept as evaluation baseline | Candidate must evaluate p95 2.5 s/p99 5 s under declared load | Final operation SLAs |
| `QBD-002` | `QTB-002` dashboard/search | Accept as evaluation baseline | Evaluate p95 5 s and visible freshness normally within 5 min | KPI definitions and exceptions |
| `QBD-003` | `QTB-003` local capture | Accept as evaluation baseline | Target ordinary local save at or below 1 s | Device matrix |
| `QBD-004` | `QTB-004` offline working set | Accept as evaluation baseline | Evaluate 48 h, 20 assignments, 200 operations, 100 media | Per-action conflict/prohibition policy |
| `QBD-005` | `QTB-005` synchronization | Accept as evaluation baseline | Evaluate 200 non-media operations within 2 min after stable network | Network profile and conflict cases |
| `QBD-006` | `QTB-006` media | Accept as evaluation baseline | Evaluate 25 photos/visit, 15 MiB source item, resumability | Quality/safety/retention rules |
| `QBD-007` | `QTB-007` availability | Accept for initial evaluation | Compare against 99.5% monthly with declared exclusions/degradation | Commercial SLA and 99.9% trigger |
| `QBD-008` | `QTB-008` recovery | Accept for initial evaluation | Compare core RPO 15 min/RTO 4 h and verified restore | Regional and tenant-specific recovery |
| `QBD-009` | `QTB-009` portfolio scale | Accept as two evaluation horizons | Initial and growth loads become capacity inputs | Forecast commitment |
| `QBD-010` | `QTB-010` large tenant | Accept as enterprise validation case | Test one large tenant without changing business meaning | Dedicated placement need |
| `QBD-011` | `QTB-011` integration effects | Accept as generic evaluation baseline | Queue timeliness and terminal visibility required | Provider-specific contracts |
| `QBD-012` | `QTB-012` detection/response | Accept for supported operating window | Evaluate detection/acknowledgment and staffing implications | 24/7 service obligation |
| `QBD-013` | `QTB-013` client compatibility | Accept as evaluation baseline | Current/previous supported releases must fail safely | Exact support days/store delay |
| `QBD-014` | `QTB-014` localization/accessibility | Accept as mandatory evaluation gate | Myanmar/English and accessibility corpus required | Final corpus/devices |
| `QBD-015` | `QTB-015` cost/operations | Accept qualitative gate; monetary value deferred | Candidate must fit lean team and expose workload cost | `OPEN-088` monetary budget |

### Quality decision consequence

Accepting `QBD-001` through `QBD-015` would resolve `OPEN-083` for architecture evaluation only.
It would not create production SLAs, customer promises, capacity commitments, or proof results.
Materially different measured evidence may return a target for revision with attribution.

## Recommended initial evaluation envelope

| ID | Recommended assumption | Status if owner accepts |
| --- | --- | --- |
| `EVAL-BASE-001` | Myanmar is the initial market; Myanmar/English and local connectivity/device behavior are first-class. | Evaluation baseline |
| `EVAL-BASE-002` | First evaluation horizon uses `PLAN-H-001` and `QTB-009` initial load; growth uses `PLAN-H-002`. | Evaluation baseline |
| `EVAL-BASE-003` | One maintained multi-tenant product serves small through enterprise organizations; no tenant source forks. | Governing constraint |
| `EVAL-BASE-004` | Shared Admin Portal and mobile Management Dashboard are required product surfaces. | Governing constraint |
| `EVAL-BASE-005` | Evaluate a shared generic Technician and Customer delivery path first; branded artifacts remain required optional capability subject to proof/ownership. | Evaluation sequencing |
| `EVAL-BASE-006` | Essential field work evaluates the accepted assignment-scoped offline baseline. | Evaluation baseline |
| `EVAL-BASE-007` | No payment-provider integration; external MMQR receipt evidence remains the payment boundary. | Governing scope |
| `EVAL-BASE-008` | Accounting, mapping, messaging, and other provider integrations are not initial mandatory dependencies until individually prioritized. | Minimal integration envelope |
| `EVAL-BASE-009` | Prefer low fixed operational burden and managed capabilities where gates, geography, cost, skills, and exit requirements pass. | Evaluation preference, not provider choice |
| `EVAL-BASE-010` | No 24/7 staffed support assumption; candidates must state supported hours, automation, and the cost of stronger service. | Operating baseline pending budget |
| `EVAL-BASE-011` | Deployment geography/residency remains a blocking input before provider shortlisting. | `OPEN-089` remains open |
| `EVAL-BASE-012` | Monetary budget remains open; compare cost transparently and reject options that require enterprise operations before revenue evidence. | `OPEN-088` remains open |

## Recommended architecture-profile dispositions

| ID | WP-12 profile | Recommendation | Rationale | Trigger to change |
| --- | --- | --- | --- | --- |
| `SHORTLIST-001` | `SYN-PROFILE-001` operationally simple governed platform | Advance as primary evaluation profile | Best current fit for small team, strong consistency, low fixed operations, and initial market | Fails a mandatory gate or accepted target/proof |
| `SHORTLIST-002` | `SYN-PROFILE-002` selective separated workloads | Advance as comparative/evolution profile | Tests scale/isolation benefits and creates measured extraction path | Select separated workload only where target/evidence justifies it |
| `SHORTLIST-003` | `SYN-PROFILE-003` enterprise isolation variants | Defer | Useful only with accepted tenant, residency, isolation, or workload need | Named enterprise requirement plus cost/operations proof |
| `SHORTLIST-004` | `SYN-PROFILE-004` highly distributed independent domains | Reject for initial architecture | Complexity and consistency/operations burden lack current evidence | Reconsider only if Profiles 001/002 fail accepted gates at proven scale |

Accepting this table resolves `OPEN-085` for the next evaluation only. It does not select Profile
001 as the final architecture.

## Decision and proof classification

| Group | Candidate decisions | Recommended evidence before final acceptance |
| --- | --- | --- |
| `ADR-DISP-001` | Tenant context/isolation `ADR-CAND-001` | Analysis plus independent security review and `TP-CAND-001` |
| `ADR-DISP-002` | Identity/session `ADR-CAND-002` | Policy resolution, security/privacy review, targeted authentication/session evidence |
| `ADR-DISP-003` | Authorization/support `ADR-CAND-003` | Accepted permission matrix, independent security review, `TP-CAND-009` |
| `ADR-DISP-004` | Data/consistency `ADR-CAND-004` | Analysis plus domain/data review; `TP-CAND-010` for volume-sensitive identity/history |
| `ADR-DISP-005` | Offline `ADR-CAND-005` | `TP-CAND-002` required |
| `ADR-DISP-006` | Evidence/media `ADR-CAND-006` | Security/privacy review and `TP-CAND-003` required |
| `ADR-DISP-007` | Inventory `ADR-CAND-007` | Domain/accounting review and invariant tests in later proof/implementation design |
| `ADR-DISP-008` | Reporting `ADR-CAND-008` | Accepted KPI/freshness plus `TP-CAND-007` |
| `ADR-DISP-009` | Integration/notification `ADR-CAND-009` | Per-contract review and `OPS-TP-PLAN-001` for initial integrations |
| `ADR-DISP-010` | Custom domains `ADR-CAND-010` | Security/operations review and `TP-CAND-006` |
| `ADR-DISP-011` | Branded delivery `ADR-CAND-011` | Store/signing/operations ownership and `TP-CAND-005` |
| `ADR-DISP-012` | Deployment/recovery `ADR-CAND-012` | Budget/geography/targets plus `TP-CAND-008` and failure proof |
| `ADR-DISP-013` | Audit/observability `ADR-CAND-013` | Security/privacy/operations review and incident exercise |
| `ADR-DISP-014` | Localization `ADR-CAND-014` | Domain/accessibility review and `TP-CAND-004` |
| `ADR-DISP-015` | Surface/navigation `ADR-CAND-015` | Analysis, authorization review, and client usability/security evidence |

This classification proposes that all fifteen candidate ADRs need at least traceable analysis;
eleven have explicit technical-proof dependencies, and affected decisions still require the named
independent review. Exact `CONF-2` evidence packages remain to be defined, so `OPEN-086` and
`OPEN-087` are only partially resolved.

## Next evaluation gates

| Gate | Required owner disposition | Result if accepted |
| --- | --- | --- |
| `NEXT-GATE-001` | Accept/revise/defer each `QBD-*` | Quality evaluation baseline frozen |
| `NEXT-GATE-002` | Accept/revise `EVAL-BASE-*` | Initial operating envelope frozen, except explicit opens |
| `NEXT-GATE-003` | Accept/revise `SHORTLIST-*` | Profiles authorized for technology-category evaluation only |
| `NEXT-GATE-004` | Accept/revise `ADR-DISP-*` | Review/proof dependency plan frozen |
| `NEXT-GATE-005` | Keep `OPEN-088` and `OPEN-089` visible | Monetary budget and geography remain provider-shortlist blockers |

## Recommended next package

If the owner accepts the recommended dispositions, activate `WP-14 Technology Category and
Provider-Neutral Candidate Evaluation` for documentation and option analysis only. It should
evaluate client, server/runtime, operational data, media, identity, messaging/background,
observability, deployment, and backup technology categories against the accepted baseline and
Profiles 001/002, while remaining provider-neutral until budget and geography are resolved.

Final architecture selection, named-provider commitment, technical-proof execution, application
coding, dependencies, and deployment must remain separately authorized.

## WP-13 acceptance criteria

WP-13 is ready for owner decision when:

- every `QTB-*` target has a recommended explicit disposition and consequence;
- the initial evaluation envelope states what is fixed, assumed, preferred, deferred, and open;
- every profile advances, remains comparative, is deferred, or is rejected with a trigger;
- every candidate ADR has an analysis/review/proof classification;
- final selection remains closed and no recommendation is misrepresented as an accepted decision;
- budget and geography blockers remain explicit; and
- no technology/provider is selected, no proof is executed, and no code, dependency, publication,
  deployment, data access, or external change occurs.

## Acceptance record

The owner accepted the full WP-13 disposition package on 2026-10-01: `QBD-001` through `QBD-015`,
`EVAL-BASE-001` through `EVAL-BASE-012`, `SHORTLIST-001` as advanced, `SHORTLIST-002` as
comparative, `SHORTLIST-003` as deferred, `SHORTLIST-004` as rejected for the initial architecture,
and `ADR-DISP-001` through `ADR-DISP-015`. `OPEN-088`, `OPEN-089`, final architecture selection,
proof execution, technology/provider commitment, application coding, dependencies, deployment, and
external-system changes remain open or closed as previously stated.
