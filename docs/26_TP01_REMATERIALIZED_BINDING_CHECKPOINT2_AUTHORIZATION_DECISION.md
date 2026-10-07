# TP-01 Rematerialized Binding and Checkpoint-2 Authorization Decision

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted for publication — checkpoint 2 not authorized |
| Work package | `WP-22 TP-01 Rematerialized Binding and Checkpoint-2 Authorization Decision` |
| Governing decisions | `DEC-128`, `DEC-147`, `DEC-150`, `DEC-151` |
| Governing proof | `TP-01 Tenant Boundary and Authorization Contract` |
| Published remediation | WP-21 `VERIFIED_AND_CLOSED` |
| Owner | Aung Myo Oo |
| Date | 2026-10-07 |
| TP-01 execution | Not authorized |

## Objective

Replace the expired WP-20 execution-binding proposal with the exact published WP-21 revision,
proof tree, hashes, role requirements, command/evidence order, and owner decision needed before any
checkpoint-2 authorization can be considered.

WP-22 is documentation and owner-decision work only. It does not create the private execution
authorization record, instantiate an execution or reproduction task, run any command, or accept a
proof or architecture result.

## Accepted replacement binding

| Binding ID | Exact value | State |
| --- | --- | --- |
| `TP1-REBIND-001` | Repository revision `e824139d3050e98c06e39d3663ddcae6ac1d02db` | Accepted |
| `TP1-REBIND-002` | Proof Git tree `48ef14bb579d0e4b620dad7c7ef6f8c409445050` | Accepted |
| `TP1-REBIND-003` | 51-entry artifact inventory SHA-256 `adc82a94eb98d4cd76227de3d963c80e386cf5c7927be3487b2cb5a54ce73547` | Accepted |
| `TP1-REBIND-004` | Proof content-set SHA-256 `ed1f8c66a7d37ef5921dd5bcf81a13d6fb305be64bd45a27fc6c1dee4d05b7d0` | Accepted |
| `TP1-REBIND-005` | `package.json` SHA-256 `d10a8e2e5bfeb170cfb6f29485a5376689ad4e73dcbc68c62cc7348ffc4dcc1e` | Accepted |
| `TP1-REBIND-006` | `pnpm-lock.yaml` SHA-256 `752d4154434adc69d6f18021555a368dbfd2d764bf7ed6c37810371b93f6e1af` | Accepted; unchanged from WP-19 |
| `TP1-REBIND-007` | 222-case manifest SHA-256 `de4e412a27f35bc96a3858174bcf186ae02f84c08a0e94b28771e3db78a2665f` | Accepted; unchanged from WP-19 |
| `TP1-REBIND-008` | Static-validation SHA-256 `b6ec96149fc497e197854e261fb154818cdf1a4cd378d3003532fdb89ff6caa6` | Accepted |
| `TP1-REBIND-009` | PostgreSQL OCI index digest `sha256:afc7e2d441324c0388fa80c3d24f733b4194a4eb7f47dd8ee2b08eb1a24a647c`, platform `linux/arm64/v8` | Accepted; execution-day verification required |
| `TP1-REBIND-010` | Node `22.23.1`, pnpm `11.25.0`, Docker `29.7.2`, Compose `5.4.0`; exact contract limits and local synthetic-only scope | Accepted; preflight verification required |

The old `TP1-BIND-001` through `TP1-BIND-006` values are superseded only if the owner accepts this
complete replacement set. Any later changed byte, path, revision, tree, lock, case, dependency,
runtime, image, role, command, or evidence contract expires the replacement set.

## Role and independence proposal

| Role | Proposed disposition | Remaining control |
| --- | --- | --- |
| Proof owner | Aung Myo Oo | Owns authorization, stops, evidence disposition; cannot replace independent review |
| Primary operator | `TP1-OPERATOR-PRIMARY`, canonical execution task `/root` | Exact execution turn and authorization record must be captured before preflight |
| Reproduction validator | One fresh `TP1-VALIDATOR-REPRO` subagent | Owner must explicitly authorize creation; canonical identity and no-author/no-primary-operation attestation recorded before preflight |
| TP-01 technical security reviewer | `/root/tp01_security_review` | Remains separate from author/operator/reproducer; later read-only evidence review only |
| Production/real-data security reviewer | Named qualified human, deferred | Mandatory before production deployment or any real/customer data |
| Owner evidence decision | Aung Myo Oo | Occurs only after complete verified packet; no automatic architecture decision |

The WP-21 inventory validator is not the checkpoint-2 reproduction validator. Reusing it would
violate the accepted fresh-identity requirement.

## Checkpoint-2 command and evidence boundary

If a later explicit owner authorization is valid, it may permit only this fail-closed order:

1. create the private `authorization.json` bound to every accepted `TP1-REBIND-*` value and role;
2. `pnpm run preflight`;
3. `pnpm run db:verify-image`;
4. `docker compose up -d --wait postgres`;
5. `pnpm run db:reset`;
6. `pnpm run matrix:verify`;
7. `pnpm run proof:run` by the primary operator;
8. seal primary evidence and hand off to the independent validator;
9. `pnpm run db:reset` and `pnpm run proof:reproduce` by that validator;
10. `pnpm run evidence:verify` for interim results only;
11. `pnpm run cleanup` under every outcome;
12. operator, reproduction-validator, and independent technical-security reviews; and
13. `pnpm run evidence:verify-final`, which propagates reviewer FAIL/INCONCLUSIVE and cannot select
    architecture.

Any mismatch, missing role, missing artifact, cross-tenant disclosure/mutation, live/customer data,
network/provider drift, resource-limit breach, uncontrolled retry, unsafe evidence, timeout, or
cleanup failure stops the sequence. Cleanup remains mandatory after Pass, Fail, Inconclusive,
abort, or timeout.

## Readiness assessment

| Input | Current state | Required before execution |
| --- | --- | --- |
| Published revision/tree | Exact proposal ready | Owner accepts complete replacement set |
| Package/lock/case/inventory/static hashes | Exact proposal ready | Reverify during authorization/preflight; no drift |
| Runtime/image/resource contract | Exact proposal ready | Owner accepts; execution-day preflight/image verification passes |
| Primary operator | Role and canonical task proposed | Owner accepts exact assignment |
| Reproduction validator | Fresh role required; canonical identity absent | Owner authorizes one fresh subagent; identity/independence recorded before preflight |
| Technical security reviewer | Assigned and scope-confirmed | Reconfirm later read-only evidence-review availability |
| Human production/real-data reviewer | Deferred | Not a local synthetic TP-01 blocker; mandatory release/data gate |
| Private `authorization.json` | Absent | May be created only by later explicit checkpoint-2 authorization |
| Runtime evidence | Absent by design | Generated only during authorized checkpoint 2 |
| Owner execution statement | Absent | Owner must accept WP-22 dispositions and separately authorize exact checkpoint 2 |

Verdict: `READY_FOR_OWNER_DECISION`, but checkpoint 2 remains `NOT_AUTHORIZED`.

## Accepted owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP22-DEC-001` | Accept `TP1-REBIND-001` through `010` as the complete replacement binding proposal. | Accepted |
| `WP22-DEC-002` | Supersede the expired WP-20 execution-binding values only when the complete replacement set is accepted; preserve their historical record. | Accepted |
| `WP22-DEC-003` | Accept `/root` as `TP1-OPERATOR-PRIMARY` for a later explicitly authorized execution turn. | Accepted |
| `WP22-DEC-004` | Require and authorize one fresh reproduction-validator subagent only in a later explicit checkpoint-2 package, with canonical identity recorded before preflight. | Accepted |
| `WP22-DEC-005` | Retain `/root/tp01_security_review` as the independent local synthetic technical reviewer and the qualified-human production/real-data gate. | Accepted |
| `WP22-DEC-006` | Accept the 13-step fail-closed command/evidence boundary and mandatory cleanup under every outcome. | Accepted |
| `WP22-DEC-007` | Keep application code, architecture selection, providers/cost, infrastructure, deployment, and customer/live data outside TP-01. | Accepted |
| `WP22-DEC-008` | Keep checkpoint 2 closed until the owner separately authorizes the exact accepted binding, identities, private authorization record, commands, limits, evidence, reviews, stop conditions, and cleanup. | Accepted |

## Owner decision boundary

Accepting and publishing WP-22 would freeze the replacement proposal; it would not itself execute
TP-01. A separate exact owner statement must explicitly authorize the fresh reproduction validator,
private authorization record, and checkpoint-2 sequence. Placeholder identities, partial binding
acceptance, or generic permission must fail closed.

## Validation result

Bounded documentation validation passed. Local `HEAD` and `origin/main` match the published WP-21
revision; the proof Git tree, 51-entry inventory, content-set, package, lockfile, case-manifest, and
static-validation identities match the proposed replacement bindings. All 51 inventory entries
match their recorded byte counts and SHA-256 values. The public WP-22 working inventory is limited
to the seven authorized paths, is unstaged, and has no whitespace error.

No private authorization record, generated runtime evidence, dependency action, image, container,
database, service, proof execution, application work, architecture selection, infrastructure,
deployment, or customer/live-data action occurred. Runtime behavior and checkpoint-2 outcomes
remain unverified by design.

## Owner acceptance

On 2026-10-07, the owner accepted `WP22-DEC-001` through `WP22-DEC-008` and
`TP1-REBIND-001` through `TP1-REBIND-010` exactly as recorded and authorized publication of the
frozen seven-path WP-22 inventory. This acceptance freezes the replacement binding but does not
authorize checkpoint 2 or any runtime action.

## Next gate

After verified publication, WP-23 may instantiate and record exactly one fresh reproduction-validator
identity and prepare a private checkpoint-2 authorization decision for owner review. It may not
create the effective `authorization.json` or run preflight, dependencies, images, containers,
databases, services, TP-01, application work, architecture selection, infrastructure, deployment,
or customer/live-data actions.
