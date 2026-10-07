# TP-01 Host-Port Remediation Rebinding and Reauthorization Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Ready for Owner Decision — ineffective draft only |
| Work package | `WP-39 TP-01 Host-Port Remediation Rebinding and Reauthorization Readiness` |
| Governing decision | `DEC-169` |
| Governance publication | `ce851445a485883fb6f3ec5572508fb0902a4656` |
| Accepted proof revision | `ce851445a485883fb6f3ec5572508fb0902a4656` |
| Proof tree | `ad27a2c754b2f7352b3beff314a8e3349758e17a` |
| Owner | Aung Myo Oo |
| Date | 2026-10-07 |
| TP-01 execution | Not authorized |
| Publication | Not authorized |

## Objective and authority boundary

WP-39 binds the verified WP-38 publication, exact proof tree, renewed 60-file inventory,
host-publication and runtime-reachability contracts, unchanged dependency/image/runtime controls,
private static-review evidence, stopped-run history, workspace and role choices, and one
explicitly ineffective private reauthorization draft for owner decision.

WP-39 does not change the proof, create a role or subagent, create a checkout, inspect or operate
dependencies, run preflight, inspect or retrieve an image, create pull-token material, invoke
Docker/Compose or cleanup, start a resource, execute or reproduce TP-01, select architecture,
write application code, create infrastructure, deploy, use customer/live data, or publish this
package.

## Preserved stopped-run history

| Record | Disposition |
| --- | --- |
| WP-24 run `wp24-2026-10-07-01` | `INCONCLUSIVE_CLOSED_NO_RETRY`; expired and never resumable |
| WP-27 run `wp27-2026-10-07-01` | `INCONCLUSIVE_CLOSED_NO_RETRY`; expired and never resumable |
| WP-30 run `wp30-2026-10-07-01` | `INCONCLUSIVE_CLOSED_NO_RETRY`; expired and never resumable |
| WP-33 run `wp33-2026-10-07-01` | `INCONCLUSIVE_CLOSED_NO_RETRY`; expired and never resumable |
| WP-37 run `wp37-2026-10-07-01` | `INCONCLUSIVE_CLOSED_NO_RETRY`; expired and never resumable |
| All five private stop packets | Immutable historical evidence; none establishes a tenant-boundary result |
| WP-38 remediation | Accepted static prerequisite; not Docker, reachability, no-egress, cleanup, proof, or security evidence |

Any future attempt requires a new package and run ID, an effective private authorization, a clean
dedicated checkout, freshly accepted execution roles, exact offline dependency restoration, and a
private run-bound pull token only if the accepted image is measured absent and registry retrieval
is separately authorized. It is not a retry or continuation of a stopped run.

## Published candidate binding

These values form one indivisible candidate binding. They are not execution authorization.

| Binding ID | Exact value | WP-39 state |
| --- | --- | --- |
| `TP1-REACHABILITY-REMEDIATED-BIND-001` | Published revision `ce851445a485883fb6f3ec5572508fb0902a4656` | Proposed execution revision |
| `TP1-REACHABILITY-REMEDIATED-BIND-002` | Proof Git tree `ad27a2c754b2f7352b3beff314a8e3349758e17a` | Proposed |
| `TP1-REACHABILITY-REMEDIATED-BIND-003` | Proof file count `60` | Proposed |
| `TP1-REACHABILITY-REMEDIATED-BIND-004` | Artifact-inventory SHA-256 `2b87f65acbde27aa63c72a4f752f00f66f1333e01d94d6c2c7f5c0784e8c9114` | Proposed |
| `TP1-REACHABILITY-REMEDIATED-BIND-005` | Content-set SHA-256 `c44b2035b558c373eeea9e606a6dc2ac0373dab309d4d984f8ac70ec12637919` | Proposed |
| `TP1-REACHABILITY-REMEDIATED-BIND-006` | Package SHA-256 `eaf81dc87f1afdf95f42880bcfb60ce744b7ba70e3856d89866905bc510dffc0` | Proposed |
| `TP1-REACHABILITY-REMEDIATED-BIND-007` | Lockfile SHA-256 `752d4154434adc69d6f18021555a368dbfd2d764bf7ed6c37810371b93f6e1af` | Proposed; unchanged |
| `TP1-REACHABILITY-REMEDIATED-BIND-008` | 222-case manifest SHA-256 `de4e412a27f35bc96a3858174bcf186ae02f84c08a0e94b28771e3db78a2665f` | Proposed; unchanged |
| `TP1-REACHABILITY-REMEDIATED-BIND-009` | Preflight SHA-256 `3a6101bad323294b0d7b76b7fe3f90fd163096e017a76fea451892b3a58a72c9` | Proposed; unchanged |
| `TP1-REACHABILITY-REMEDIATED-BIND-010` | Cleanup SHA-256 `91f6fd348db531edfa10b5f28ee2a76337f3af09fa3913c4ad524bd1fd8917ce` | Proposed; unchanged |
| `TP1-REACHABILITY-REMEDIATED-BIND-011` | Compose source SHA-256 `e35dd7d5302c064b365c3030ad02fb8c44e456bbb421ec6d9dd130ebabb01cae` | Proposed |
| `TP1-REACHABILITY-REMEDIATED-BIND-012` | Command wrapper SHA-256 `3eea84eb9c13fb508e4196726fc24a94fca721336094e8f71b979866aca14039` | Proposed |
| `TP1-REACHABILITY-REMEDIATED-BIND-013` | Command test SHA-256 `22158ea9c4518f3e88838d3f958dc5ac74acdc1c071e97be533c238f53b8bc12` | Proposed |
| `TP1-REACHABILITY-REMEDIATED-BIND-014` | Reachability contract SHA-256 `7940c7f7687ea82e0f54ebbf01d964b9ecaa6b2687231f27ba16afb4ff42ec1b` | Proposed |
| `TP1-REACHABILITY-REMEDIATED-BIND-015` | Reachability-contract test SHA-256 `e2600c125513c34fe07287ee5eb3be5bb1b091e82b33630e2979ac765638e126` | Proposed |
| `TP1-REACHABILITY-REMEDIATED-BIND-016` | Reachability runner SHA-256 `5791a504f55f327a2fc8c0a46a758f026fc980371d9de71688406ced02110140` | Proposed |
| `TP1-REACHABILITY-REMEDIATED-BIND-017` | Database-reset gate SHA-256 `11d1e439049a686689591b2e415da66ca0264f323febd5769c2aba83e6082824` | Proposed |
| `TP1-REACHABILITY-REMEDIATED-BIND-018` | Final verifier SHA-256 `b3d93ea7b02bcd77b53bd27abe549e4e4969a3d5ec1a44d4289d446d059544fe` | Proposed |
| `TP1-REACHABILITY-REMEDIATED-BIND-019` | Exact launcher SHA-256 `a7cd0550fd3b4b8093fcb7837e9d6acfbd1b81b68aba3ea2c3a10c29167dc071` | Proposed; unchanged |
| `TP1-REACHABILITY-REMEDIATED-BIND-020` | Runtime contract SHA-256 `b2bc0284616389e112f22197b2c7a699a322bab6d29d0950dd39108b661555ff` | Proposed; unchanged |
| `TP1-REACHABILITY-REMEDIATED-BIND-021` | Compose/cleanup contract SHA-256 `e373176ac130b6d559b902ca8972cf0fb671d796211ba44a122970863c03348b` | Proposed; unchanged |
| `TP1-REACHABILITY-REMEDIATED-BIND-022` | Compose-contract test SHA-256 `56f72f01bb3a433ff9f0a5caf32fb688aa45efd5caacf3d960e7c874a66554a6` | Proposed; unchanged |
| `TP1-REACHABILITY-REMEDIATED-BIND-023` | Proof runner SHA-256 `91ddcad8f13550b17c4636105e5e61a8cc5c685986ec93e56f51fbc4e5c0c8e6` | Proposed; unchanged |
| `TP1-REACHABILITY-REMEDIATED-BIND-024` | Image verifier SHA-256 `4f3c1bb68f2144c4c2a51c45a6651df7e8bf2701c3a72a71e078b51fb9411e78` | Proposed; unchanged |
| `TP1-REACHABILITY-REMEDIATED-BIND-025` | Image contract SHA-256 `6617566201082fc907a025468e4261df5fe19368bd3b8fdebbb74fd79e9b52c3` | Proposed; unchanged |
| `TP1-REACHABILITY-REMEDIATED-BIND-026` | Image-contract test SHA-256 `afcbdb2bdde259b028fa5bfb2a3a88903bb2335fdd0bb7ad93c43076b46935ea` | Proposed; unchanged |
| `TP1-REACHABILITY-REMEDIATED-BIND-027` | Execution-authorization SHA-256 `6fb06ce12ce572b5856ec05d58084d19c466a15eb2ae1ab43bc6870c0dc807e8` | Proposed; unchanged |
| `TP1-REACHABILITY-REMEDIATED-BIND-028` | Static-evidence script SHA-256 `4751b3c119c3537352bb57cfa1b8270778623a8d9be40c6adb18654e8f515c63` | Proposed; unchanged |
| `TP1-REACHABILITY-REMEDIATED-BIND-029` | Proof README SHA-256 `39e16c8eff5a015256327bee633c30f2f2ef297425f30a1bdc160240380d435f` | Proposed |
| `TP1-REACHABILITY-REMEDIATED-BIND-030` | Environment-example SHA-256 `d7aab6853127a7626c2f414ff6588df06d9458325e72331957310f89660f58dd` | Proposed; unchanged |
| `TP1-REACHABILITY-REMEDIATED-BIND-031` | WP-38 independent-review SHA-256 `ec853f9848cb8d82b794a4dc21e3310fb144bb516052c9803961d8731e24a1c6` | Proposed; private static evidence |
| `TP1-REACHABILITY-REMEDIATED-BIND-032` | WP-38 static-validation SHA-256 `f888cd53931af3c7a879f3cbce6fb05a64278f4d34b9f152ca16380ab10e5931` | Proposed; private static evidence |
| `TP1-REACHABILITY-REMEDIATED-BIND-033` | Published WP-38 document SHA-256 `e45b7187ac08412682caba4e05aed7bdeb152f4f883c61071fbe53fbcccd60ac` | Proposed; committed byte identity |
| `TP1-REACHABILITY-REMEDIATED-BIND-034` | Ineffective WP-39 draft SHA-256 `62c463d965c6ce6421399f3b95b6530b50ec602e6c1d557ae43ce2a6cceafc39` | Proposed; private, never executable |
| `TP1-REACHABILITY-REMEDIATED-BIND-035` | Five stopped attempts: WP-24, WP-27, WP-30, WP-33, and WP-37 | Proposed immutable history |
| `TP1-REACHABILITY-REMEDIATED-BIND-036` | Exact three-view reachability contract is statically accepted; `runtimeMeasured: false`; bypass unauthorized | Proposed closed runtime gate |

Any drift in revision, proof tree, proof byte, inventory, dependency, launcher, version contract,
image, token contract, reachability contract, role, command, limit, evidence, cleanup, network, or
non-scope expires the full candidate binding.

## Reachability contract meaning

The candidate requires agreement among exactly three runtime views before database mutation:

1. Docker inspect reports exactly one `5432/tcp -> 127.0.0.1:55432` binding;
2. Compose reports one healthy running `postgres` service with that exact publisher; and
3. a bounded direct TCP connection to `127.0.0.1:55432` succeeds.

The accepted source and static tests establish only that the proof is designed to require those
views. They do not establish that Docker Desktop will publish the port, that the listener will be
reachable, that disabled masquerading blocks egress at runtime, or that TP-01 will pass.

## Workspace and dependency choices

| Option ID | Approach | Benefit | Risk and disposition |
| --- | --- | --- | --- |
| `WP39-WS-001` | Under later authority, create a dedicated checkout at binding `001`, then restore exact dependencies offline/frozen/ignore-scripts from the existing local store. | Preserves revision custody and reproducible dependency evidence. | Recommend advance; stop on missing local content or drift. |
| `WP39-WS-002` | Execute from the current main checkout. | Avoids restoration. | Recommend reject; owner-review documentation and ignored state weaken exact-revision custody. |
| `WP39-WS-003` | Reuse a prior archived execution checkout or stopped run. | Appears to preserve prior preparation. | Recommend reject; expired authority and historical state cannot become a new attempt. |

No checkout is created and no dependency or store path is read, copied, restored, or changed.

## Reachability choices

| Option ID | Approach | Disposition |
| --- | --- | --- |
| `WP39-REACH-001` | Require exact Docker-inspect, Compose-publisher, and direct-TCP agreement before database reset and again after the reproduction reset. | Recommend advance for a future separately authorized attempt. |
| `WP39-REACH-002` | Omit or bypass the reachability gate and rely on internal health. | Recommend reject; repeats the WP-37 failure mode. |
| `WP39-REACH-003` | Treat static source/test acceptance as runtime reachability evidence. | Recommend reject; confuses proposal evidence with measured proof evidence. |

## Role readiness

| Role | Current state | Required future treatment |
| --- | --- | --- |
| Proof owner | Aung Myo Oo | Retain owner authorization and evidence-disposition authority |
| Primary operator | `/root` proposed only | Reaccept for one new exact package/run |
| Prior reproduction validator | `/root/wp36_reproduction_validator` | Expired with WP-37; never reuse |
| WP-38 static validator | `/root/wp38_static_validator` | Static review only; cannot become reproduction identity |
| Future reproduction validator | Not instantiated in WP-39 | Create exactly one fresh identity only under later owner authority |
| Technical security reviewer | `/root/tp01_security_review` proposed only | Reconfirm read-only availability and independence for new evidence |
| Production/real-data reviewer | Qualified human not assigned | Mandatory before production or any real/customer data |

WP-39 creates no subagent, role attestation, execution identity, or authority.

## Ineffective private draft

WP-39 prepares
`internal-local/work-packages/WP-39/checkpoint2-reauthorization-draft.json`. It is not named
`authorization.json`; has `DRAFT_NOT_AUTHORIZED`, `effective: false`, and
`checkpoint2Authorized: false`; contains no proposed execution package, run ID, fresh reproduction
identity, pull token, token hash, or checkout; and keeps all 18 authority flags false. It cannot
satisfy the execution guard, image gate, or reachability evidence gate.

Draft SHA-256: `62c463d965c6ce6421399f3b95b6530b50ec602e6c1d557ae43ce2a6cceafc39`.

## Readiness verdict

| Input | Current state | Remaining gate |
| --- | --- | --- |
| WP-38 publication | Live-remote verified | Preserve revision/tree as one complete binding |
| Proof/static identities | Exact 60-file candidate binding recorded | Owner acceptance and future no-drift checks |
| Stopped-run history | Five attempts immutable and non-retryable | Use a new package/run only |
| Dedicated checkout | Absent | Later explicit creation authority |
| Dependencies in future checkout | Absent by construction | Later exact offline restoration authority |
| Primary operator | Prior identity proposed | New package/run acceptance |
| Fresh reproduction validator | Absent | Later owner-authorized creation and attestation |
| Security reviewer | Prior independent identity proposed | Reconfirmation for new packet |
| Effective private authorization | Absent | Later owner authority after roles/workspace exist |
| Conditional pull token | Absent | Create only after measured image absence and explicit authority |
| Runtime reachability | Unmeasured | Later exact three-view runtime gate |
| Cleanup/proof/security evidence | Absent by design | Later controlled execution only |

Verdict: `READY_FOR_OWNER_DECISION`, but `NOT_READY_FOR_EXECUTION_AUTHORIZATION` and
`NOT_AUTHORIZED`.

## Recommended owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP39-DEC-001` | Accept `TP1-REACHABILITY-REMEDIATED-BIND-001` through `036` only as one candidate binding for a completely new attempt. | Proposed |
| `WP39-DEC-002` | Preserve WP-24, WP-27, WP-30, WP-33, and WP-37 as separate immutable Inconclusive runs with expired authorizations and no retry. | Proposed |
| `WP39-DEC-003` | Accept the source-level host-publication and three-view reachability contracts without treating static validation as runtime evidence. | Proposed |
| `WP39-DEC-004` | Advance `WP39-WS-001`; reject `WP39-WS-002` and `WP39-WS-003`. | Proposed |
| `WP39-DEC-005` | Advance `WP39-REACH-001`; reject `WP39-REACH-002` and `WP39-REACH-003`. | Proposed |
| `WP39-DEC-006` | Require exactly one fresh reproduction-validator identity under later owner authority; do not reuse any prior run or static-validator identity. | Proposed |
| `WP39-DEC-007` | Retain `/root` and `/root/tp01_security_review` only as proposed roles subject to new-package reconfirmation. | Proposed |
| `WP39-DEC-008` | Accept the private draft shape as complete but ineffective; never rename or copy it to `authorization.json`, and create no token under WP-39. | Proposed |
| `WP39-DEC-009` | Require a later explicit owner statement after verified WP-39 publication before any role creation, checkout, dependency restoration, token creation, effective authorization, or runtime action. | Proposed |
| `WP39-DEC-010` | Keep proof execution, application coding, final architecture selection, infrastructure, deployment, provider accounts/cost, and customer/live data closed. | Proposed |

## Frozen WP-39 public inventory

Owner review and any later publication authorization apply only to these four paths:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/41_TP01_HOST_PORT_RUNTIME_REACHABILITY_STATIC_REMEDIATION.md`
4. `docs/42_TP01_HOST_PORT_REMEDIATION_REBINDING_REAUTHORIZATION_READINESS.md`

Private authorization and validation records remain ignored under `internal-local/` and must not
be published.

## Next gate

WP-39 stops at owner decision. No role or runtime action occurred. Commit, push, role creation,
checkout creation, dependency restoration, effective authorization, token creation, Docker/Compose,
cleanup, proof/reproduction, and every later-package gate remain closed until a later explicit
owner statement. If the owner accepts and publishes WP-39, the recommended next package is an
execution-identity and reachability-authorization readiness package—not TP-01 execution itself.
