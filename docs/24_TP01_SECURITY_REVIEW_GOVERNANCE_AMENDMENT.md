# TP-01 Security Review Governance Amendment

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted for publication; execution remediation required |
| Work package | `WP-20A TP-01 Security Review Governance Amendment` |
| Governing decision | `DEC-147`, `TP1-GOV-EX-001` |
| Applies to | Local synthetic TP-01 only |
| TP-01 execution | Not authorized |
| Production/real-data human security review | Mandatory and deferred |
| Owner | Aung Myo Oo |
| Date | 2026-10-07 |

## Owner direction

The owner directed that an independent security-review subagent be assigned for TP-01 and that
qualified human security review be deferred until before production deployment or use of any
real/customer data. Every other WP-20 control remains unchanged.

## Scoped disposition

| ID | Disposition | Status |
| --- | --- | --- |
| `TP1-GOV-EX-001` | Permit a separate independent security-review subagent to perform the bounded technical security review for local synthetic TP-01. | Accepted |
| `TP1-GOV-EX-002` | Assign `/root/tp01_security_review`; prohibit it from authoring, operating, reproducing, or mutating TP-01. | Accepted; scope confirmed |
| `TP1-GOV-EX-003` | Treat its output as automated technical review with explicit limitations, not qualified human or production security acceptance. | Accepted |
| `TP1-GOV-EX-004` | Require a named qualified human security reviewer before production deployment or any real/customer data. | Accepted deferred gate |
| `TP1-GOV-EX-005` | Keep every other WP-20 binding, role separation, evidence, command, stop, cleanup, and non-scope control unchanged. | Accepted |

## Independence and review scope

The assigned security-review subagent is distinct from:

- `TP1-OPERATOR-PRIMARY`, which may operate the primary run only after authorization; and
- the future `TP1-VALIDATOR-REPRO`, which must independently reproduce the run.

The security-review subagent must not write proof code, change the case manifest, operate or
reproduce the proof, change raw evidence, or decide the owner's final disposition. After execution
and cleanup, it must inspect at least:

- all 222 primary and reproduction outcomes and semantic difference report;
- application-context, forced-RLS, combined, and controlled-fault observations;
- cross-tenant disclosure/mutation evidence and before/after state hashes;
- pool reuse/concurrency and retry/correlation evidence;
- platform directory, support grant, machine/background, evidence, projection/export, and audit
  paths;
- authoritative context provenance and runtime/database role evidence;
- persisted audit/error content for tenant, credential, or identity leakage;
- deviations, skipped cases, environment drift, cleanup, and residual state; and
- known omissions, threat coverage limits, false-confidence risks, and required follow-up.

Its review must record evidence inspected, method, findings by severity, Pass/Fail/Inconclusive
recommendation, unresolved risks, automation limitations, date, and canonical task identity. A
single unauthorized cross-tenant disclosure or mutation remains an automatic technical failure.

## Assignment confirmation

`/root/tp01_security_review` confirmed:

- it did not author or materialize TP-01;
- it performed no primary operation or reproduction;
- it made no file, Git, dependency, environment, or external-system change;
- it will remain separate from `TP1-OPERATOR-PRIMARY` and `TP1-VALIDATOR-REPRO`; and
- its output is operationally independent automated technical review, not professional,
  regulatory, organizational, human, or production-risk acceptance.

The subagent classified the assignment as conditionally acceptable for local synthetic TP-01.

## Static evidence blockers discovered

| Finding | Confirmed condition | Required remediation |
| --- | --- | --- |
| `TP1-SEC-STATIC-001` | `src/path-executor.ts` records `databaseRole: "tp01_runtime"` as a literal instead of measuring the connected role. | Query and retain actual `current_user`, role attributes, ownership, grants, RLS enable/force status, policy/security-definer ownership/search path, and transaction-local context. |
| `TP1-SEC-STATIC-002` | `scripts/evidence-verify.mjs` verifies result/audit/reproduction files but not the full accepted evidence packet. | Bind and validate authorization, environment, image, fixture, state integrity, cleanup, reviews, hashes, deviations, and privacy/secret scans in the final verification report. |
| `TP1-SEC-STATIC-003` | Dedicated `environment.json`, `fixture.json`, and `state-integrity.json` are required by the contract but are not clearly emitted. | Generate deterministic dedicated artifacts and include them in evidence verification. |

An `evidence:verify` PASS from the current frozen inventory would not be sufficient for technical
security acceptance. Without remediation, the security verdict must be `INCONCLUSIVE`. Any proof
artifact correction changes `TP1-BIND-002` through `006` as applicable and requires a new
materialization hash/inventory review and owner authorization.

## Human-review production gate

Before production deployment or any real/customer data, a named qualified human reviewer must
assess the selected architecture and implementation, identity/authorization design, tenant
isolation, support access, evidence/logging leakage, deployment configuration, threat model,
dependency posture, incident/recovery controls, and the accumulated proof limitations. Automated
TP-01 review cannot satisfy or waive this gate.

## Unchanged controls

This amendment does not change:

- `TP1-BIND-001` through `TP1-BIND-007`;
- the exact 50-file proof inventory or 222-case manifest;
- operator/validator separation or the future validator identity requirement;
- exact runtime, dependency, image, resource, network, duration, or synthetic-data limits;
- command order, evidence completeness, independent reproduction, stop, cleanup, or zero-tolerance
  tenant outcome;
- application coding, final architecture selection, providers, paid services, infrastructure,
  deployment, or customer/live-data closures; or
- the need for a separate explicit checkpoint-2 execution authorization.

## Readiness and next gate

The governance amendment, independent assignment, and static findings are owner-accepted, but
TP-01 remains `NOT_AUTHORIZED`. The static evidence blockers must be remediated before execution;
a fresh reproduction-validator identity must later be instantiated; the amended/rematerialized
inventory must be reviewed and published; and the owner must issue a new exact checkpoint-2
authorization. No proof command may run before those conditions are recorded.

## Recommended owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP20A-DEC-001` | Accept `TP1-GOV-EX-001` through `005` and the security subagent's independence/scope confirmation. | Accepted |
| `WP20A-DEC-002` | Accept `TP1-SEC-STATIC-001` through `003` as checkpoint-2 blockers. | Accepted |
| `WP20A-DEC-003` | Do not authorize current frozen TP-01 execution because its security review would be forced to Inconclusive. | Accepted |
| `WP20A-DEC-004` | After WP-20A publication, activate a bounded evidence-completeness remediation package that changes only the disposable proof/evidence mechanics and renews hashes/review. | Accepted |
| `WP20A-DEC-005` | Keep qualified human review mandatory before production or real/customer data and keep all other WP-20 closures unchanged. | Accepted |

## Acceptance record

The owner accepted `WP20A-DEC-001` through `WP20A-DEC-005`, `TP1-GOV-EX-001` through `005`, and
`TP1-SEC-STATIC-001` through `003` exactly as recorded and authorized commit/push on 2026-10-07.
After verified publication, WP-21 may change only the disposable proof/evidence mechanics,
governing documentation, and private evidence required to close the three findings, renew hashes,
and obtain one fresh independent inventory validation. TP-01 execution and every product,
infrastructure, deployment, and real-data gate remain closed.

## Post-publication activation

WP-20A was published and remotely verified at
`03f0425b4089ae1c0173ac911a2f23461eeb6a92`. The owner then activated WP-21 under the exact bounded
scope in the acceptance record. This activation expires the old proof-artifact binding for any
future execution; it does not authorize checkpoint 2 or any runtime command.
