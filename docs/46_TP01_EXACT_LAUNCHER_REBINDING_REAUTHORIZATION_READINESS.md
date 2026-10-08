# TP-01 Exact Launcher Rebinding and Reauthorization Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted, published, and closed — execution remains unauthorized |
| Work package | `WP-43 TP-01 Exact Published Rebinding and Reauthorization Readiness` |
| Governing decision | `DEC-173` |
| Governance publication | `0f2100b869bbb8e466c906b3a0d4213e827ef4cf` |
| Candidate proof revision | `0f2100b869bbb8e466c906b3a0d4213e827ef4cf` |
| Proof tree | `1777020c393fd3a63134eac99d878b66261523eb` |
| Owner | Aung Myo Oo |
| Date | 2026-10-07 |
| TP-01 execution | Not authorized |
| Private authorization draft | Not authorized and not created |
| Publication | Verified as `85308d2a56993feebd2d10bb97d45aff0735775a` |

## Objective and authority boundary

WP-43 binds the verified WP-42 publication, exact proof tree, renewed 62-file inventory, corrected
exact-launcher command contract, unchanged runtime/image/reachability controls, private static
review evidence, stopped-run history, workspace choices, role readiness, and remaining execution
gates for owner decision.

WP-43 is documentation only. It does not change the disposable proof; create an authorization
draft, role, subagent, run ID, token, checkout, credential, or dependency state; run preflight;
inspect or retrieve an image; invoke Docker/Compose or cleanup; start a resource; execute or
reproduce TP-01; select architecture; write application code; create infrastructure; deploy; use
customer/live data; access the network; or publish this package.

## Preserved stopped-run history

| Record | Disposition |
| --- | --- |
| WP-24 run `wp24-2026-10-07-01` | `INCONCLUSIVE_CLOSED_NO_RETRY`; expired and never resumable |
| WP-27 run `wp27-2026-10-07-01` | `INCONCLUSIVE_CLOSED_NO_RETRY`; expired and never resumable |
| WP-30 run `wp30-2026-10-07-01` | `INCONCLUSIVE_CLOSED_NO_RETRY`; expired and never resumable |
| WP-33 run `wp33-2026-10-07-01` | `INCONCLUSIVE_CLOSED_NO_RETRY`; expired and never resumable |
| WP-37 run `wp37-2026-10-07-01` | `INCONCLUSIVE_CLOSED_NO_RETRY`; expired and never resumable |
| WP-41 run `wp41-2026-10-07-01` | `INCONCLUSIVE_CLOSED_NO_RETRY`; expired and never resumable |
| All six private stop packets | Immutable historical evidence; none establishes a tenant-boundary result |
| WP-42 remediation | Accepted static prerequisite; not launcher-runtime, reachability, no-egress, cleanup, proof, or security evidence |

Any future attempt requires a new package and run ID, freshly accepted execution identities, a new
effective private authorization, a clean dedicated checkout, exact offline dependency restoration,
local-first image control, an explicit run-bound pull token only if the accepted image is absent,
the exact launcher and three-view reachability gate, and mandatory cleanup. It is not a retry or
continuation of a stopped run.

## Published candidate binding

These values form one indivisible candidate binding. They are not execution authorization.

| Binding ID | Exact value | WP-43 state |
| --- | --- | --- |
| `TP1-LAUNCHER-REMEDIATED-BIND-001` | Published revision `0f2100b869bbb8e466c906b3a0d4213e827ef4cf` | Proposed execution revision |
| `TP1-LAUNCHER-REMEDIATED-BIND-002` | Proof Git tree `1777020c393fd3a63134eac99d878b66261523eb` | Proposed |
| `TP1-LAUNCHER-REMEDIATED-BIND-003` | Proof file count `62` | Proposed |
| `TP1-LAUNCHER-REMEDIATED-BIND-004` | Artifact-inventory SHA-256 `3aed6426332e6b50ae566184d1efa8c9a762819bafc5a817d6530f5ea7377d6f` | Proposed |
| `TP1-LAUNCHER-REMEDIATED-BIND-005` | Content-set SHA-256 `4bbea5208cc343d79576437537873df07ad9f76019096b536d92b5110c2b322e` | Proposed |
| `TP1-LAUNCHER-REMEDIATED-BIND-006` | Package SHA-256 `eaf81dc87f1afdf95f42880bcfb60ce744b7ba70e3856d89866905bc510dffc0` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-007` | Lockfile SHA-256 `752d4154434adc69d6f18021555a368dbfd2d764bf7ed6c37810371b93f6e1af` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-008` | 222-case manifest SHA-256 `de4e412a27f35bc96a3858174bcf186ae02f84c08a0e94b28771e3db78a2665f` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-009` | Preflight SHA-256 `3a6101bad323294b0d7b76b7fe3f90fd163096e017a76fea451892b3a58a72c9` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-010` | Cleanup SHA-256 `91f6fd348db531edfa10b5f28ee2a76337f3af09fa3913c4ad524bd1fd8917ce` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-011` | Compose source SHA-256 `e35dd7d5302c064b365c3030ad02fb8c44e456bbb421ec6d9dd130ebabb01cae` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-012` | Command wrapper SHA-256 `3eea84eb9c13fb508e4196726fc24a94fca721336094e8f71b979866aca14039` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-013` | Command test SHA-256 `22158ea9c4518f3e88838d3f958dc5ac74acdc1c071e97be533c238f53b8bc12` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-014` | Reachability contract SHA-256 `7940c7f7687ea82e0f54ebbf01d964b9ecaa6b2687231f27ba16afb4ff42ec1b` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-015` | Reachability-contract test SHA-256 `e2600c125513c34fe07287ee5eb3be5bb1b091e82b33630e2979ac765638e126` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-016` | Reachability runner SHA-256 `5791a504f55f327a2fc8c0a46a758f026fc980371d9de71688406ced02110140` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-017` | Database-reset reachability gate SHA-256 `11d1e439049a686689591b2e415da66ca0264f323febd5769c2aba83e6082824` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-018` | Final verifier SHA-256 `b3d93ea7b02bcd77b53bd27abe549e4e4969a3d5ec1a44d4289d446d059544fe` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-019` | Exact launcher SHA-256 `4f4d8d4751e9a295c8b890a4f7e89d6653e363ec6a81b0ceef7b088491a1cf9a` | Proposed |
| `TP1-LAUNCHER-REMEDIATED-BIND-020` | Exact-launcher contract SHA-256 `41b39f515e7a50f5dfec4d6ef23f4414b8e60629333392f2d94d0ca4a8d1b205` | Proposed |
| `TP1-LAUNCHER-REMEDIATED-BIND-021` | Exact-launcher contract test SHA-256 `efde8268280a93d2882ecc4df1dc40c0e0699bf3287309f343becdc8b5e4dc9e` | Proposed |
| `TP1-LAUNCHER-REMEDIATED-BIND-022` | Runtime contract SHA-256 `b2bc0284616389e112f22197b2c7a699a322bab6d29d0950dd39108b661555ff` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-023` | Compose/cleanup contract SHA-256 `e373176ac130b6d559b902ca8972cf0fb671d796211ba44a122970863c03348b` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-024` | Compose-contract test SHA-256 `56f72f01bb3a433ff9f0a5caf32fb688aa45efd5caacf3d960e7c874a66554a6` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-025` | Proof runner SHA-256 `91ddcad8f13550b17c4636105e5e61a8cc5c685986ec93e56f51fbc4e5c0c8e6` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-026` | Image verifier SHA-256 `4f3c1bb68f2144c4c2a51c45a6651df7e8bf2701c3a72a71e078b51fb9411e78` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-027` | Image contract SHA-256 `6617566201082fc907a025468e4261df5fe19368bd3b8fdebbb74fd79e9b52c3` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-028` | Image-contract test SHA-256 `afcbdb2bdde259b028fa5bfb2a3a88903bb2335fdd0bb7ad93c43076b46935ea` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-029` | Execution-authorization guard SHA-256 `6fb06ce12ce572b5856ec05d58084d19c466a15eb2ae1ab43bc6870c0dc807e8` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-030` | Static-evidence script SHA-256 `4751b3c119c3537352bb57cfa1b8270778623a8d9be40c6adb18654e8f515c63` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-031` | Proof README SHA-256 `ed3bef93ba3ca304f444880c7dd28bd365b9e630794cb6d20a631954771da46a` | Proposed |
| `TP1-LAUNCHER-REMEDIATED-BIND-032` | Environment-example SHA-256 `d7aab6853127a7626c2f414ff6588df06d9458325e72331957310f89660f58dd` | Proposed; unchanged |
| `TP1-LAUNCHER-REMEDIATED-BIND-033` | WP-42 independent-review SHA-256 `adb62b6ee9e68ca694b285889845d39008ae72af332b862663501f3ca40642a1` | Proposed; private static evidence |
| `TP1-LAUNCHER-REMEDIATED-BIND-034` | WP-42 static-validation SHA-256 `94bea07219df6fd973677f9ddf13bb1e46a7fe3988e30af69c6db62978048526` | Proposed; private static evidence |
| `TP1-LAUNCHER-REMEDIATED-BIND-035` | Published WP-42 document SHA-256 `df37ebad39c7a846f800f35bd20ffafb208ef9e4777ec081e8cb043d0ede5e38` | Proposed; committed byte identity |
| `TP1-LAUNCHER-REMEDIATED-BIND-036` | Six stopped attempts: WP-24, WP-27, WP-30, WP-33, WP-37, and WP-41 | Proposed immutable history |
| `TP1-LAUNCHER-REMEDIATED-BIND-037` | Corrected exact launcher and three-view reachability contracts are statically accepted; runtime remains unmeasured and bypass is unauthorized | Proposed closed runtime gate |
| `TP1-LAUNCHER-REMEDIATED-BIND-038` | No WP-43 authorization draft, effective authorization, run ID, role instantiation, checkout, token, or credential exists | Proposed closed authorization gate |

Any drift in revision, proof tree, proof byte, inventory, dependency, launcher, version contract,
image, token contract, reachability contract, role, command, limit, evidence, cleanup, network, or
non-scope expires the full candidate binding.

## Launcher and reachability meaning

The published launcher now allows the exact two-argument
`run runtime:verify-reachability` shape while preserving all prior exact command shapes and
rejecting variants. Its package agreement, missing-dependency failure, and dependency-marker
integrity controls are statically reviewed.

A future attempt must still measure all three reachability views before each database reset:

1. Docker inspect reports exactly one `5432/tcp -> 127.0.0.1:55432` binding;
2. Compose reports one healthy running `postgres` service with that exact publisher; and
3. a bounded direct TCP connection to `127.0.0.1:55432` succeeds.

Static launcher and source acceptance proves neither pnpm-child behavior nor Docker publication,
TCP reachability, no-egress behavior, database enforcement, or tenant isolation.

## Workspace and dependency choices

| Option ID | Approach | Benefit | Owner disposition |
| --- | --- | --- | --- |
| `WP43-WS-001` | Under later authority, create a dedicated checkout at binding `001`, then restore exact dependencies offline/frozen/ignore-scripts from the existing local store. | Preserves revision custody and reproducible dependency evidence. | Accepted: advance; stop on missing local content or drift. |
| `WP43-WS-002` | Execute from the current main checkout. | Avoids restoration. | Accepted: reject; owner-review documentation and ignored state weaken exact-revision custody. |
| `WP43-WS-003` | Reuse a prior archived checkout or stopped run. | Appears to preserve prior preparation. | Accepted: reject; expired authority and historical state cannot become a new attempt. |

No checkout is created and no dependency or store path is read, copied, restored, or changed.

## Launcher and reachability choices

| Option ID | Approach | Owner disposition |
| --- | --- | --- |
| `WP43-LAUNCH-001` | Require the exact launcher command plus Docker-inspect, Compose-publisher, and direct-TCP agreement before every database reset. | Accepted: advance for a future separately authorized attempt. |
| `WP43-LAUNCH-002` | Bypass the launcher or invoke the reachability runner through an unrecorded interface. | Accepted: reject; defeats the published command contract and evidence custody. |
| `WP43-LAUNCH-003` | Treat static source/test acceptance or WP-41 cleanup observation as runtime reachability evidence. | Accepted: reject; neither is accepted three-view run-bound evidence. |

## Role readiness

| Role | Current state | Required future treatment |
| --- | --- | --- |
| Proof owner | Aung Myo Oo | Retain owner authorization and evidence-disposition authority |
| Primary operator | `/root` proposed only | Reaccept for one new exact package/run |
| Prior reproduction validator | `/root/wp40_reproduction_validator` | Expired with WP-41; never reuse |
| WP-42 static validator | `/root/wp42_static_validator` | Static review only; cannot become reproduction identity |
| Future reproduction validator | Not instantiated in WP-43 | Create exactly one fresh identity only under later owner authority |
| Technical security reviewer | `/root/tp01_security_review` proposed only | Reconfirm read-only availability and independence for new evidence |
| Production/real-data reviewer | Qualified human not assigned | Mandatory before production or any real/customer data |

WP-43 creates no subagent, role attestation, execution identity, or authority.

## Authorization-record status

No private authorization draft is created because WP-43 authority is owner-decision documentation
only. No `authorization.json`, draft substitute, run ID, role acceptance, checkout binding,
conditional pull token, token hash, or authority flag exists for a future attempt. A later package
must explicitly authorize any private preparation and must keep an ineffective draft distinct from
an effective execution record.

## Readiness verdict

| Input | Current state | Remaining gate |
| --- | --- | --- |
| WP-42 publication | Live-remote verified | Preserve revision/tree as one complete binding |
| Proof/static identities | Exact 62-file candidate binding recorded | Owner acceptance and future no-drift checks |
| Stopped-run history | Six attempts immutable and non-retryable | Use a new package/run only |
| Dedicated checkout | Absent | Later explicit creation authority |
| Dependencies in future checkout | Absent by construction | Later exact offline restoration authority |
| Primary operator | Prior identity proposed | New package/run acceptance |
| Fresh reproduction validator | Absent | Later owner-authorized creation and attestation |
| Security reviewer | Prior independent identity proposed | Reconfirmation for new packet |
| Private authorization draft | Absent by authority | Later explicit preparation authority |
| Effective private authorization | Absent | Later owner authority after roles/workspace exist |
| Conditional pull token | Absent | Create only after measured image absence and explicit authority |
| Runtime launcher/reachability | Unmeasured | Later exact launcher and three-view runtime gate |
| Cleanup/proof/security evidence | Absent by design | Later controlled execution only |

Verdict: `READY_FOR_OWNER_DECISION`, but `NOT_READY_FOR_EXECUTION_AUTHORIZATION` and
`NOT_AUTHORIZED`.

## Recommended owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP43-DEC-001` | Accept `TP1-LAUNCHER-REMEDIATED-BIND-001` through `038` only as one candidate binding for a completely new attempt. | Accepted |
| `WP43-DEC-002` | Preserve WP-24, WP-27, WP-30, WP-33, WP-37, and WP-41 as separate immutable Inconclusive runs with expired authorizations and no retry. | Accepted |
| `WP43-DEC-003` | Accept the corrected exact-launcher and three-view reachability contracts without treating static validation or cleanup diagnostics as runtime evidence. | Accepted |
| `WP43-DEC-004` | Advance `WP43-WS-001`; reject `WP43-WS-002` and `WP43-WS-003`. | Accepted |
| `WP43-DEC-005` | Advance `WP43-LAUNCH-001`; reject `WP43-LAUNCH-002` and `WP43-LAUNCH-003`. | Accepted |
| `WP43-DEC-006` | Require exactly one fresh reproduction-validator identity under later owner authority; do not reuse any prior run or static-validator identity. | Accepted |
| `WP43-DEC-007` | Retain `/root` and `/root/tp01_security_review` only as proposed roles subject to new-package reconfirmation. | Accepted |
| `WP43-DEC-008` | Accept that no private authorization draft exists under WP-43 and require separate later authority before any draft or effective record is created. | Accepted |
| `WP43-DEC-009` | After verified WP-43 publication, permit only a separately authorized WP-44 execution-identity and private-authorization-readiness package before any checkout, dependency, token, or runtime decision. | Accepted |
| `WP43-DEC-010` | Keep dependencies, preflight, images, Docker/Compose runtime, containers, databases, services, cleanup, proof/reproduction, application coding, final architecture selection, infrastructure, deployment, provider accounts/cost, customer/live data, and network closed. | Accepted |

## Frozen WP-43 public inventory

Owner review and any later publication authorization apply only to these four paths:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/45_TP01_EXACT_LAUNCHER_REACHABILITY_STATIC_REMEDIATION.md`
4. `docs/46_TP01_EXACT_LAUNCHER_REBINDING_REAUTHORIZATION_READINESS.md`

Private authorization and validation records remain ignored under `internal-local/` and must not
be published.

## Acceptance, publication, and next gate

The owner accepted all 38 bindings, all ten recommendations, advanced `WP43-WS-001` and
`WP43-LAUNCH-001`, rejected both alternative sets, and accepted the no-private-draft disposition.
The exact four-path inventory was committed as `85308d2 WP-43: accept exact launcher rebinding` and
pushed to `origin/main`; local `HEAD`, cached `origin/main`, and live remote main matched
`85308d2a56993feebd2d10bb97d45aff0735775a`. WP-43 is `VERIFIED_AND_CLOSED`.

WP-44 is active for one fresh reproduction-validator identity, owner-decision documentation, and
private ineffective authorization preparation only. Execution and WP-44 publication remain
closed.
