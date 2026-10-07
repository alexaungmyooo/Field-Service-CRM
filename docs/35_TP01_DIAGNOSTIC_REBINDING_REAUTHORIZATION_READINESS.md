# TP-01 Diagnostic Rebinding and Reauthorization Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Ready for Owner Decision — not authorized for execution |
| Work package | `WP-32 TP-01 Remediated Rebinding and Reauthorization Readiness` |
| Governing decisions | `DEC-128`, `DEC-147`, `DEC-155`, `DEC-158`, `DEC-160`, `DEC-161`, `DEC-162` |
| Published remediation | WP-31 `VERIFIED_AND_CLOSED` |
| Owner | Aung Myo Oo |
| Date | 2026-10-07 |
| TP-01 execution | Not authorized |
| Publication | Not authorized |

## Objective and authority boundary

WP-32 binds the exact published WP-31 revision, proof tree, 55-file inventory, diagnostic-retention
contract, final-verifier Compose contract, unchanged dependency/runtime/image identities, role
status, future workspace needs, and an ineffective private authorization shape for owner decision.

WP-32 does not create a checkout, operate dependencies, instantiate a reproduction validator,
create an effective `authorization.json`, run preflight, inspect/retrieve an image, invoke
Docker/Compose or cleanup, start a runtime resource, execute/reproduce TP-01, select architecture,
write application code, deploy, or publish this package.

## Preserved stop history

| Record | Disposition |
| --- | --- |
| WP-24 run `wp24-2026-10-07-01` | `INCONCLUSIVE_CLOSED_NO_RETRY`; expired and never resumable |
| WP-27 run `wp27-2026-10-07-01` | `INCONCLUSIVE_CLOSED_NO_RETRY`; expired and never resumable |
| WP-30 run `wp30-2026-10-07-01` | `INCONCLUSIVE_CLOSED_NO_RETRY`; expired and never resumable |
| All three private stop packets | Immutable historical evidence; none establishes a tenant-boundary result |
| WP-31 remediation | Accepted static prerequisite; not runtime, cleanup, diagnostic-capture, or security evidence |

Any future attempt requires a new run ID, new effective private authorization, new dedicated
checkout, and freshly accepted execution roles. It is not a retry or continuation of a stopped
run, and the unknown WP-30 assertion must not be inferred.

## Published candidate binding

These values form one indivisible candidate binding. They are not execution authorization.

| Binding ID | Exact value | WP-32 state |
| --- | --- | --- |
| `TP1-DIAGNOSTIC-BIND-001` | Published revision `f1705e93ec6e3e1433e7ec1aba5fd803bb312b2c` | Proposed execution revision |
| `TP1-DIAGNOSTIC-BIND-002` | Proof Git tree `d360f992f0e082e80dded4de790efe3511546c77` | Proposed |
| `TP1-DIAGNOSTIC-BIND-003` | Proof file count `55` | Proposed |
| `TP1-DIAGNOSTIC-BIND-004` | Artifact-inventory SHA-256 `0ca441d9a0f54f376a261eb7cfd31da87b446ac7661e22b844a85e200ac40dba` | Proposed |
| `TP1-DIAGNOSTIC-BIND-005` | Content-set SHA-256 `6aed9d69542495dda673d1b8adc524e949642f63d8ba15bda63cea536a62ba56` | Proposed |
| `TP1-DIAGNOSTIC-BIND-006` | Package SHA-256 `d10a8e2e5bfeb170cfb6f29485a5376689ad4e73dcbc68c62cc7348ffc4dcc1e` | Proposed; unchanged |
| `TP1-DIAGNOSTIC-BIND-007` | Lockfile SHA-256 `752d4154434adc69d6f18021555a368dbfd2d764bf7ed6c37810371b93f6e1af` | Proposed; unchanged |
| `TP1-DIAGNOSTIC-BIND-008` | 222-case manifest SHA-256 `de4e412a27f35bc96a3858174bcf186ae02f84c08a0e94b28771e3db78a2665f` | Proposed; unchanged |
| `TP1-DIAGNOSTIC-BIND-009` | Preflight SHA-256 `3a6101bad323294b0d7b76b7fe3f90fd163096e017a76fea451892b3a58a72c9` | Proposed; unchanged |
| `TP1-DIAGNOSTIC-BIND-010` | Cleanup SHA-256 `91f6fd348db531edfa10b5f28ee2a76337f3af09fa3913c4ad524bd1fd8917ce` | Proposed; unchanged |
| `TP1-DIAGNOSTIC-BIND-011` | Command wrapper SHA-256 `3a1149eb6ae712e3cdcbbc48badb0b0f7886b4bfc5e6f45bb0cf000af204ed53` | Proposed |
| `TP1-DIAGNOSTIC-BIND-012` | Command static test SHA-256 `e7109c1cc87721a9c60771f156709c685b2af26d4d7fa185e0cdd04cd7a49ca0` | Proposed |
| `TP1-DIAGNOSTIC-BIND-013` | Proof runner SHA-256 `91ddcad8f13550b17c4636105e5e61a8cc5c685986ec93e56f51fbc4e5c0c8e6` | Proposed |
| `TP1-DIAGNOSTIC-BIND-014` | Final verifier SHA-256 `0d8b9f10037532a7821a308cbd636dd09ab5df3595bcb8175191e27e1f68ee2a` | Proposed |
| `TP1-DIAGNOSTIC-BIND-015` | Compose/cleanup contract SHA-256 `e373176ac130b6d559b902ca8972cf0fb671d796211ba44a122970863c03348b` | Proposed |
| `TP1-DIAGNOSTIC-BIND-016` | Contract-test SHA-256 `56f72f01bb3a433ff9f0a5caf32fb688aa45efd5caacf3d960e7c874a66554a6` | Proposed |
| `TP1-DIAGNOSTIC-BIND-017` | Exact-launcher SHA-256 `a7cd0550fd3b4b8093fcb7837e9d6acfbd1b81b68aba3ea2c3a10c29167dc071` | Proposed |
| `TP1-DIAGNOSTIC-BIND-018` | Runtime-contract SHA-256 `b2bc0284616389e112f22197b2c7a699a322bab6d29d0950dd39108b661555ff` | Proposed |
| `TP1-DIAGNOSTIC-BIND-019` | Static-evidence script SHA-256 `4751b3c119c3537352bb57cfa1b8270778623a8d9be40c6adb18654e8f515c63` | Proposed |
| `TP1-DIAGNOSTIC-BIND-020` | Node `v22.23.1`, binary SHA-256 `2e3f1286a7eb3736346ed1803e458a0ff909e2b2d5bc746144dcb76970e9b99d` | Proposed; execution-host recheck required |
| `TP1-DIAGNOSTIC-BIND-021` | pnpm `11.25.0`, entry SHA-256 `ff3224d46b47fbb24a7e9fe15fededef7e00892d07d4e376b6762d4899906bfd` | Proposed; hash-before-execution required |
| `TP1-DIAGNOSTIC-BIND-022` | Compose normalized `5.4.0`; raw `5.4.0` or `v5.4.0`; exact stdout/raw/normalized agreement | Proposed; future measurement required |
| `TP1-DIAGNOSTIC-BIND-023` | PostgreSQL OCI index `sha256:afc7e2d441324c0388fa80c3d24f733b4194a4eb7f47dd8ee2b08eb1a24a647c`, `linux/arm64/v8` | Proposed; future verification required |
| `TP1-DIAGNOSTIC-BIND-024` | Proof README SHA-256 `0bed641fe471eebac246afb92686acca918920f8af791caf1d6f94d70b9c58fb` | Proposed |
| `TP1-DIAGNOSTIC-BIND-025` | WP-31 independent review SHA-256 `e93e95ff786c122b8c8627093254e0246a50471fa979bc36b80c54354d4fcd52` | Proposed; private static evidence |
| `TP1-DIAGNOSTIC-BIND-026` | WP-31 static-validation SHA-256 `9d1ca49a79d4ca85df5f53624f7c45e64da85ba0aa7d600f8a2e66ad08b4155c` | Proposed; private static evidence |
| `TP1-DIAGNOSTIC-BIND-027` | Ineffective WP-32 draft SHA-256 `81dde63eeef258bdc4334614d62cae4580b75da4fe0161748b7f975d3b1c4627` | Proposed; private, never executable |

Any drift in revision, proof tree, proof byte, inventory, dependency, launcher, version contract,
image, role, command, limit, evidence, cleanup, network, or non-scope expires the full candidate
binding.

## Diagnostic and verifier meaning

The new diagnostic path is statically reviewed only. A future failure artifact must remain private,
synthetic-only, bounded to 8,192 UTF-16 code units per stream, contain no argument values, redact
known proof credentials before bounding, and identify `TYPESCRIPT_COMPILE` or `PROOF_TEST`.
Pattern sanitization cannot guarantee removal of every unforeseen sensitive form; future execution
must keep secrets out of child output and stop if synthetic-only assumptions fail.

The final verifier now shares the accepted Compose contract with preflight, but neither path has
run at the published WP-31 revision. Static consistency is not evidence completeness or a proof
result.

## Workspace and dependency readiness

WP-32 does not inspect or operate ignored dependencies. A clean future checkout will exclude them.

| Option ID | Approach | Benefit | Risk and disposition |
| --- | --- | --- | --- |
| `WP32-WS-001` | Create a dedicated checkout at binding `001`, then restore exact dependencies offline/frozen/ignore-scripts from the existing local store under later authority. | Preserves revision custody and reproducible dependency evidence. | Advance; stop on missing local content or any drift. |
| `WP32-WS-002` | Execute from the current main checkout. | Avoids restoration. | Reject; governance changes and ignored state weaken exact-revision custody. |
| `WP32-WS-003` | Install from npm or another registry. | Conventional setup. | Reject; violates the closed network/supply-chain boundary. |

No checkout is created and no dependency or store path is read, copied, restored, or changed.

## Role readiness

| Role | Current state | Required future treatment |
| --- | --- | --- |
| Proof owner | Aung Myo Oo | Retain owner authorization and evidence-disposition authority |
| Primary operator | `/root`; operator of stopped WP-30 | Reaccept only for a new exact package/run |
| WP-30 reproduction validator | `/root/wp30_reproduction_validator` | Expired with WP-30; never reuse |
| WP-31 static validator | `/root/wp31_static_validator` | Static review only; cannot silently become reproduction identity |
| Future reproduction validator | Not instantiated in WP-32 | Create exactly one fresh identity only under later owner authority |
| Technical security reviewer | `/root/tp01_security_review` | Reconfirm read-only availability and independence for new evidence |
| Production/real-data reviewer | Qualified human not assigned | Mandatory before production or any real/customer data |

WP-32 creates no subagent, role attestation, execution identity, or authority.

## Ineffective private draft

WP-32 prepares
`internal-local/work-packages/WP-32/checkpoint2-reauthorization-draft.json`. It is not named
`authorization.json`; has `DRAFT_NOT_AUTHORIZED`, `effective: false`, and
`checkpoint2Authorized: false`; contains no run ID or fresh reproduction identity; and keeps every
role, checkout, dependency, preflight, runtime, cleanup, proof, product, and deployment authority
false. It cannot satisfy the proof execution guard.

Draft SHA-256: `81dde63eeef258bdc4334614d62cae4580b75da4fe0161748b7f975d3b1c4627`.

## Readiness verdict

| Input | Current state | Remaining gate |
| --- | --- | --- |
| WP-31 publication | Live-remote verified | Preserve revision/tree as one complete binding |
| Proof/static identities | Exact candidate binding recorded | Owner acceptance and future no-drift checks |
| Dedicated checkout | Absent | Later explicit creation authority |
| Dependencies in future checkout | Absent by construction | Later exact offline restoration authority |
| Primary operator | Prior identity known | New package/run acceptance |
| Fresh reproduction validator | Absent | Later owner-authorized creation and attestation |
| Security reviewer | Prior independent identity known | Reconfirmation for new packet |
| Effective private authorization | Absent | Later owner authority after roles/workspace exist |
| Runtime/image/cleanup/diagnostic evidence | Absent by design | Later controlled execution only |

Verdict: `READY_FOR_OWNER_DECISION`, but `NOT_READY_FOR_EXECUTION_AUTHORIZATION` and
`NOT_AUTHORIZED`.

## Recommended owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP32-DEC-001` | Accept `TP1-DIAGNOSTIC-BIND-001` through `027` only as one candidate binding for a completely new attempt. | Proposed |
| `WP32-DEC-002` | Preserve WP-24, WP-27, and WP-30 as separate immutable Inconclusive runs with expired authorizations and no retry. | Proposed |
| `WP32-DEC-003` | Accept the diagnostic-retention and verifier-consistency contracts without treating static validation as runtime evidence. | Proposed |
| `WP32-DEC-004` | Advance `WP32-WS-001`; reject `WP32-WS-002` and `WP32-WS-003`. | Proposed |
| `WP32-DEC-005` | Require exactly one fresh reproduction-validator identity under later owner authority; do not reuse any prior run or static-validator identity. | Proposed |
| `WP32-DEC-006` | Retain `/root` and `/root/tp01_security_review` only as proposed roles subject to new-package reconfirmation. | Proposed |
| `WP32-DEC-007` | Accept the private draft shape as complete but ineffective; never rename or copy it to `authorization.json`. | Proposed |
| `WP32-DEC-008` | Require exact offline/frozen/ignore-scripts dependency restoration in a dedicated checkout under later authority; prohibit npm and version change. | Proposed |
| `WP32-DEC-009` | Permit a later WP-33 owner statement, only after verified WP-32 publication, to authorize a new run ID, dedicated checkout, fresh validator, exact offline restoration, effective authorization, and one fail-closed checkpoint-2 attempt. | Proposed |
| `WP32-DEC-010` | Keep application coding, final architecture selection, infrastructure, deployment, provider accounts/cost, and customer/live data closed. | Proposed |

## Frozen WP-32 public inventory

Owner review and any later publication authorization apply only to these four paths:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/34_TP01_FAILURE_DIAGNOSTIC_FINAL_VERIFIER_STATIC_REMEDIATION.md`
4. `docs/35_TP01_DIAGNOSTIC_REBINDING_REAUTHORIZATION_READINESS.md`

Private authorization and validation records remain ignored under `internal-local/` and must not be
published.

## Next gate

WP-32 stops at owner decision. No commit, push, role creation, checkout, dependency operation,
preflight, runtime action, cleanup, proof/reproduction, or WP-33 action is authorized.
