# TP-01 Execution Roles and Checkpoint-2 Authorization

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted for publication; checkpoint 2 remains closed |
| Work package | `WP-20 TP-01 Execution Roles and Checkpoint-2 Authorization` |
| Governing proof | `TP-01 Tenant Boundary and Authorization Contract` |
| Checkpoint-1 baseline | WP-19 `VERIFIED_AND_CLOSED` |
| Evidence snapshot | 2026-10-07 |
| TP-01 execution | Not authorized |
| Proof/application/infrastructure mutation | Not authorized |
| Owner | Aung Myo Oo |

## Purpose and authority boundary

WP-20 prepares the owner decisions required before TP-01 checkpoint 2 can be authorized. It binds
the published checkpoint-1 revision and hashes, proposes explicit operator and independent
reproduction assignments, preserves the qualified-security-review requirement, defines conflicts
and sign-off order, and states the exact later authorization gate.

This is owner decision documentation only. It does not create or change proof artifacts or private
execution authorization, run preflight, verify or pull the database image, start a container,
apply SQL, bind a port, start HTTP/background processes, execute a case, produce a proof result,
or accept an architecture.

## Governing requirements

- `PGD-002`, `PGD-007`, `PGD-009`, and `PGD-010` require separated roles, independent
  reproduction, specialist review, and an exact execution package.
- `PGR-001` through `PGR-007` define proof-owner, operator, validator, specialist, and decision
  responsibilities.
- `TP1-DEC-008` through `TP1-DEC-010` require checkpoint review, explicit roles, and expiry on
  contract drift.
- `TP1-AUTH-001` through `TP1-AUTH-009` define execution-authorization inputs.
- `WP19-DEC-001` through `WP19-DEC-005` accept only the materialized inventory and checkpoint-1
  validation.
- `DEC-145` authorizes this documentation package only.

## Exact checkpoint-1 binding

The following values are the only revision and artifact set proposed for checkpoint-2 owner
acceptance:

> **Expired for execution:** WP-21 changes the disposable proof evidence mechanics. The values
> below remain the accepted historical WP-20 record but cannot authorize the rematerialized proof.
> A later package must replace every affected binding with owner-accepted values from an exact
> published revision.

| Binding ID | Exact value | Meaning |
| --- | --- | --- |
| `TP1-BIND-001` | `01bc6d58fb2c8d1c255e79ebf031faaf53fbb304` | Published repository revision |
| `TP1-BIND-002` | `93a6d10f1fa1627b351920e998c3199c97bdeb47` | Git tree for `proofs/tp-01-tenant-boundary/` |
| `TP1-BIND-003` | `04e932e37c06e2becdbc6c6255585f8a9f602e474facfe73872583a9aba61c75` | `package.json` SHA-256 |
| `TP1-BIND-004` | `752d4154434adc69d6f18021555a368dbfd2d764bf7ed6c37810371b93f6e1af` | `pnpm-lock.yaml` SHA-256 |
| `TP1-BIND-005` | `de4e412a27f35bc96a3858174bcf186ae02f84c08a0e94b28771e3db78a2665f` | 222-case manifest SHA-256 |
| `TP1-BIND-006` | `16cf0da8b4283a6080bb068d4cfbf89ee413e07ed7ffb65370d16ae96c8da58c` | Private 50-entry artifact-hash inventory SHA-256 |
| `TP1-BIND-007` | `sha256:afc7e2d441324c0388fa80c3d24f733b4194a4eb7f47dd8ee2b08eb1a24a647c` | Contracted PostgreSQL OCI index digest; still requires execution-day verification |

`TP1-BIND-006` binds every accepted proof artifact digest recorded in the ignored private
`artifact-hashes.json`; it is not a substitute for verifying those 50 entries before execution.
Any changed byte, path, lock resolution, case, governing policy, direct/transitive dependency,
runtime, image digest/platform, or role assignment expires the proposed authorization and returns
the package to owner review.

## Role assignments and blocker

| Role ID | Role | Proposed assignment | Independence and scope | State |
| --- | --- | --- | --- | --- |
| `TP1-ROLE-001` | Proof owner | Aung Myo Oo | Owns authorization, stop decisions, time/cost boundary, reviewer acceptance, and final evidence disposition; does not replace independent or specialist review | Identified |
| `TP1-ROLE-002` | Proof operator | `TP1-OPERATOR-PRIMARY`: the primary repository agent in the explicitly authorized execution turn, whose task/run identity is recorded before preflight | May run only the frozen commands, preserve raw evidence, report deviations, and perform cleanup; may not independently validate its own result | Accepted role class; execution not authorized |
| `TP1-ROLE-003` | Independent reproduction validator | `TP1-VALIDATOR-REPRO`: one separately authorized subagent with canonical task identity recorded before the primary run and no participation in materialization or primary operation | Reproduces from reset after primary evidence is sealed; reviews missing/adversarial paths and differences; may not edit the frozen package or accept security | Accepted role class; canonical identity pending |
| `TP1-ROLE-004` | TP-01 technical security reviewer | `/root/tp01_security_review`, an independent security-review subagent | Reviews threat/path coverage, context authority, RLS/application enforcement, support access, audit/error leakage, failures, and residual risk; may not operate, reproduce, or mutate TP-01 | Owner-assigned and scope-confirmed; static evidence blockers reported |
| `TP1-ROLE-005` | Owner decision | Aung Myo Oo | Accepts Pass/Fail/Inconclusive evidence only after operator, validator, and security reviews; cannot convert a failed mandatory tenant outcome into a weighted pass | Identified |
| `TP1-ROLE-006` | Production/real-data security reviewer | Named qualified human reviewer | Performs security acceptance before production deployment or real/customer data; TP-01 subagent review cannot satisfy this release gate | Deferred; mandatory production gate |

The checkpoint-1 inventory subagent is not silently assigned as the reproduction validator. A
fresh validator identity and availability must be recorded before checkpoint-2 authorization.
`TP1-GOV-EX-001` and `DEC-147` supersede WP-20's human-reviewer requirement only for local
synthetic TP-01. The assigned security subagent must confirm its scope and limitations before a new
checkpoint-2 authorization. The qualified human gate moves to `TP1-ROLE-006` and may not be waived
for production or real/customer data.

## Required sign-off and evidence order

| Order | Control | Required evidence/state |
| ---: | --- | --- |
| 1 | Owner accepts exact binding and all role assignments | Accepted WP-20 dispositions name every role and exact binding |
| 2 | Owner separately authorizes checkpoint 2 | Exact authorization names revision, hashes, roles, limits, and permitted commands |
| 3 | Operator preflight | Clean bound revision/tree; renewed hashes; exact Node/pnpm/Docker/Compose; ports/resources clear; dedicated environment/manifest/supply-chain/deviation evidence; image not yet trusted until verified |
| 4 | Image verification and bounded environment start | Accepted digest/platform resolves exactly; one local container; synthetic-only fixture |
| 5 | Primary execution and evidence sealing | Exactly 222 primary records plus audit/state evidence; deviations visible; primary files sealed before handoff |
| 6 | Independent reproduction | Reset/reproduction by the validator with sealed primary evidence preserved |
| 7 | Interim evidence verification | Both 222-record sets, audits, measured database security, hashes, zero skipped cases, per-tenant state, deviations, and semantic difference report verified together without final PASS |
| 8 | Verified cleanup | No listener, process, container, network, volume, credential, provider resource, or unaccepted residue |
| 9 | Role-separated reviews | Operator, reproduction validator, and independent TP-01 technical security reviewer record evidence inspected, findings, limitations, residual risk, and recommendation |
| 10 | Final complete-packet verification | Revalidate authorization through cleanup and all reviews; seal hashes and final Pass/Fail/Inconclusive evidence status |
| 11 | Owner evidence disposition | Owner accepts, rejects, or requests remediation; no architecture choice is automatic |

Failure or deviation at any stage stops progression. Cleanup is mandatory after Pass, Fail,
Inconclusive, abort, or timeout.

## Checkpoint-2 command boundary

Only a later explicit execution authorization may permit the already materialized interfaces in
this order:

1. `pnpm run preflight`
2. `pnpm run db:verify-image`
3. `docker compose up -d --wait postgres`
4. `pnpm run db:reset`
5. `pnpm run matrix:verify`
6. `pnpm run proof:run`
7. `pnpm run db:reset` under the independent-validator handoff
8. `pnpm run proof:reproduce` under the independent validator
9. `pnpm run evidence:verify` after both result sets exist
10. `pnpm run cleanup`
11. role-separated operator, reproduction-validator, and technical-security review records
12. `pnpm run evidence:verify-final` after cleanup and all three reviews

This list is a future authorization boundary, not permission to run any command. The later package
must clarify operator handoff and evidence-verifier arguments without changing a script or case;
if a command interface must change, the artifact binding expires and rematerialization review is
required.

## `TP1-AUTH-*` readiness assessment

| Input | State | Remaining action |
| --- | --- | --- |
| `TP1-AUTH-001` proof identity/scope | Ready | Accepted TP-01 scope and proof-only policy |
| `TP1-AUTH-002` revision/artifact versions | Expired by WP-21 drift | Renew every affected binding after rematerialization review and publication |
| `TP1-AUTH-003` environment/tool preflight | Materialized, not proven | WP-21 emits dedicated environment/binding evidence; later execution must measure it |
| `TP1-AUTH-004` commands/resources/network | Accepted contract boundary | No command authorized until all remaining inputs pass |
| `TP1-AUTH-005` roles/conflicts/availability | Partially ready | Security subagent assigned/confirmed; fresh reproduction-validator canonical identity remains required |
| `TP1-AUTH-006` fixture/cases/oracles | Ready | Accepted 222-case manifest; reverify hash before execution |
| `TP1-AUTH-007` evidence/retention/privacy | Materialized, not proven | Interim/final verifier split covers the complete packet and bounded credential scan; later execution/review required |
| `TP1-AUTH-008` stop/cleanup/recovery | Materialized, not proven | Cleanup records pre/post state and final verification rejects residuals; later execution required |
| `TP1-AUTH-009` exact owner execution statement | Not ready | Requires accepted bindings, all roles, and separate explicit authorization |

## Owner decision sheet

The owner accepted every recommendation exactly as recorded on 2026-10-07. Acceptance of
`WP20-DEC-004` and `WP20-DEC-007` preserves the missing-reviewer blocker and closed execution gate.

| ID | Recommendation | Effect if accepted | Status |
| --- | --- | --- | --- |
| `WP20-DEC-001` | Accept `TP1-BIND-001` through `007` as the only checkpoint-2 revision/artifact proposal. | Any drift expires authorization readiness. | Accepted |
| `WP20-DEC-002` | Assign `TP1-OPERATOR-PRIMARY` as proof operator under the stated limits. | Names the operating role without granting execution. | Accepted |
| `WP20-DEC-003` | Assign a fresh `TP1-VALIDATOR-REPRO` subagent under the stated independence and handoff controls. | Names the reproduction role class; canonical task identity must be recorded before execution. | Accepted |
| `WP20-DEC-004` | Require a named qualified human security reviewer and keep that role unassigned until the owner supplies name and qualification. | Prevents automated or self-review from becoming security acceptance. | Accepted |
| `WP20-DEC-005` | Accept the ten-stage sign-off/evidence order and fail-closed stop/cleanup rule. | Keeps execution and review attributable and recoverable. | Accepted |
| `WP20-DEC-006` | Accept the ten-step command boundary only as a future checkpoint-2 interface. | Does not authorize any command in WP-20. | Accepted |
| `WP20-DEC-007` | Keep checkpoint 2 `NOT_READY` until all `TP1-AUTH-*` inputs are ready and separately authorized. | Prevents partial owner acceptance from starting TP-01. | Accepted |
| `WP20-DEC-008` | Require a new materialization review for any revision, tree, artifact, dependency, case, command, runtime, image, policy, or role change. | Preserves exact evidence provenance. | Accepted |

WP-21 is the separately authorized rematerialization required by `WP20-DEC-008`. It adds a final
complete-packet verifier command and splits interim verification from final PASS. The historical
ten-step interface and old bindings above therefore cannot authorize execution; every unchanged
role-separation, stop, cleanup, and non-scope control remains in force.

## Superseded later authorization statement

The following historical template must not be used because WP-20A changed the reviewer model and
the security review found evidence-completeness blockers:

```text
I accept WP-20 dispositions and TP1-BIND-001 through TP1-BIND-007 exactly as recorded.
Assign TP1-OPERATOR-PRIMARY as proof operator and TP1-VALIDATOR-REPRO as independent
reproduction validator. Assign [full name] as qualified security reviewer; qualification:
[tenant-isolation/authorization review evidence]. Authorize commit and push of the frozen WP-20
documentation inventory. After verified publication, activate WP-21 TP-01 Controlled Execution
and Independent Reproduction and authorize checkpoint 2 against revision
01bc6d58fb2c8d1c255e79ebf031faaf53fbb304 and the accepted artifact hashes only, subject to
preflight, stop, evidence, review, and cleanup controls. Keep application coding, final
architecture selection, provider accounts, paid services, infrastructure, deployment, and
customer/live data closed.
```

No exact checkpoint-2 authorization statement is valid until the evidence gaps are remediated,
rehashed, independently inventory-reviewed, accepted, and published. An authorization containing
placeholders, omitting a role, or naming the old hashes after remediation must not start checkpoint
2.

## Risks and limitations

| ID | Risk/limitation | Required treatment |
| --- | --- | --- |
| `WP20-RISK-001` | Role labels are mistaken for current execution authority | Separate exact owner authorization after all decisions |
| `WP20-RISK-002` | A future subagent is treated as independent without identity/conflict evidence | Record canonical task identity and no-author/no-operator attestation before primary run |
| `WP20-RISK-003` | Automated TP-01 review is treated as production security acceptance | Preserve automated/limited label and mandatory qualified human pre-production/real-data gate |
| `WP20-RISK-004` | Clean commit hides local dependency/evidence drift | Verify Git tree plus every private artifact digest and lock integrity during preflight |
| `WP20-RISK-005` | Registry or image state changes after the dated snapshot | Recheck without accepting changed content; drift returns to owner review |
| `WP20-RISK-006` | Command interface requires a code change during execution | Stop; rematerialize, hash, independently review, and obtain new authorization |
| `WP20-RISK-007` | Local proof result is generalized to production/provider security | Limit conclusion to exact synthetic local paths and preserve later proof/ADR gates |

## Readiness verdict and next gate

WP-20 is accepted and published as role and authorization documentation, but checkpoint 2 is
`NOT_READY` and `NOT_AUTHORIZED`. The old revision/artifact bindings are expired by WP-21. The
operator/independent-validator role classes remain accepted, and `DEC-147` assigns
`/root/tp01_security_review` for bounded local proof review. WP-21 has materialized corrections for
the three static blockers, but fresh independent inventory validation, owner acceptance,
publication, a committed revision/Git-tree binding, a fresh reproduction-validator identity, and
a valid checkpoint-2 authorization remain pending.

The next action is WP-21 inventory validation and owner review, not checkpoint-2 execution.
Qualified human review remains mandatory before production or real/customer data.

## Acceptance record and invalid execution attempt

The owner accepted `WP20-DEC-001` through `WP20-DEC-008` and `TP1-BIND-001` through
`TP1-BIND-007` exactly as recorded and authorized commit/push on 2026-10-07. The operator and
independent-validator role classes are accepted under the documented controls.

The owner message retained `[full name]` and `[tenant-isolation/authorization review experience]`
as literal placeholders. Under the accepted validity rule above, that was not a reviewer assignment
and could not authorize checkpoint 2 at the time. The later `DEC-147` amendment and `DEC-149` WP-21
activation supersede only that historical WP-21-inactive state; every proof command remains closed.

## WP-20A scoped amendment

The owner accepted `DEC-147` on 2026-10-07. For TP-01 only,
`/root/tp01_security_review` replaces the unresolved human placeholder as the independent technical
security-review role. It is distinct from `TP1-OPERATOR-PRIMARY` and the future
`TP1-VALIDATOR-REPRO`, and it may not author, operate, reproduce, or mutate the proof.

The amendment does not grant qualified human or production security acceptance. Human review is
deferred to a mandatory gate before production deployment or any real/customer data. All other
WP-20 bindings, commands, evidence, independence, stop, cleanup, and non-scope controls remain
unchanged. At amendment publication, WP-21 and checkpoint 2 remained inactive pending separate
valid authorization. `DEC-149` later activated WP-21 remediation only; checkpoint 2 remains closed.

## Independent security-assignment confirmation and static findings

`/root/tp01_security_review` confirmed that it did not author/materialize the proof, performed no
operation or reproduction, made no file/Git/dependency/environment/external change, and will remain
separate from the operator and reproduction validator. It classified the scoped assignment as
conditionally acceptable for local synthetic TP-01 only.

| Finding | Evidence | Consequence |
| --- | --- | --- |
| `TP1-SEC-STATIC-001` | WP-21 materializes a runtime `current_user` query for database-backed observations plus dedicated role/catalog/control evidence. | Materialized but not executed; later runtime evidence and security review remain required. |
| `TP1-SEC-STATIC-002` | WP-21 binds the full authorization-through-review packet and prevents interim verification from emitting final PASS. | Materialized but not executed; complete-packet behavior remains a later proof result. |
| `TP1-SEC-STATIC-003` | WP-21 explicitly materializes `environment.json`, `fixture.json`, per-run state snapshots, and derived `state-integrity.json`. | Materialized but not executed; artifact existence/content remain later runtime evidence. |

Unless these gaps are closed under a newly accepted artifact binding, the technical security
review must return `INCONCLUSIVE` even if all 222 case outputs appear to pass. Correcting the
frozen harness changes artifact hashes and requires rematerialization plus renewed owner
authorization.

The owner accepted this scoped amendment and all three static findings for publication on
2026-10-07. This acceptance authorizes documentation publication and later bounded remediation,
not checkpoint-2 execution.

## WP-21 publication and replacement-binding gate

WP-21 was published and remotely verified at
`e824139d3050e98c06e39d3663ddcae6ac1d02db`, with proof tree
`48ef14bb579d0e4b620dad7c7ef6f8c409445050`. The old `TP1-BIND-*` values remain historical only.
WP-22 records the proposed replacement binding and exact owner decision; this document does not
itself restore checkpoint-2 readiness or authorize execution.

The owner accepted the complete WP-22 replacement binding and dispositions on 2026-10-07. That
acceptance supersedes the old binding values but does not authorize checkpoint 2. The fresh
reproduction-validator identity and effective private execution authorization remain later gates.

## WP-23 fresh reproduction-validator instantiation

The single owner-authorized fresh subagent `/root/tp01_reproduction_validator` accepted the future
`TP1-VALIDATOR-REPRO` role only under a later exact owner-authorized checkpoint-2 contract. It
attested that it did not author or materialize TP-01 and did not act as primary operator, WP-19
validator, WP-21 validator, or technical security reviewer. It requires sealed primary evidence
handoff and a fresh database reset before any future reproduction.

The subagent performed identity/independence attestation only: no file, Git, dependency, image,
container, database, service, evidence, cleanup, external-system, or customer/live-data change and
no preflight, proof, or reproduction command occurred. The exact role assignment remains Proposed
until the WP-23 owner decision recorded below.

The owner accepted the exact assignment and attestation on 2026-10-07. Execution authority remains
conditional on verified WP-23 publication and the separately authorized WP-24 effective private
record and command boundary.
