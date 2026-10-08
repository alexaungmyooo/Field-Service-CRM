# TP-01 Execution Identity and Launcher Authorization Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted, published, and closed — WP-45 authorization consumed |
| Work package | `WP-44 TP-01 Execution Identity and Private Authorization Readiness` |
| Governing decision | `DEC-174` |
| Governance publication | `85308d2a56993feebd2d10bb97d45aff0735775a` |
| WP-44 publication | `7c27bb50f1becd4b5c808f30aab7d68c277d2458` |
| Accepted proof revision | `0f2100b869bbb8e466c906b3a0d4213e827ef4cf` |
| Proof tree | `1777020c393fd3a63134eac99d878b66261523eb` |
| Owner | Aung Myo Oo |
| Date | 2026-10-08 |
| TP-01 execution | WP-45 ended Inconclusive; authorization expired; no retry |
| Publication | Verified as `7c27bb50f1becd4b5c808f30aab7d68c277d2458` |

## Objective and authority boundary

WP-44 records exactly one fresh reproduction-validator identity and prepares an explicitly
ineffective private authorization model for a later owner decision. It preserves the distinction
between the WP-43 governance publication and the accepted WP-42 proof revision. A future dedicated
execution checkout would use the accepted proof revision, not the later documentation-only
revision.

WP-44 does not create a checkout, change the proof, inspect or operate dependencies, create an
effective `authorization.json`, create a run ID, run preflight, inspect or retrieve an image,
create pull-token material, invoke Docker/Compose or cleanup, start a resource, execute or
reproduce TP-01, access the network after publication verification, select architecture, write
application code, create infrastructure, deploy, or use customer/live data.

## Exact execution and role binding

| ID | Exact identity | WP-44 state |
| --- | --- | --- |
| `TP1-EXEC-LAUNCH-BIND-001` | Accepted proof revision `0f2100b869bbb8e466c906b3a0d4213e827ef4cf` | Accepted by WP-43 |
| `TP1-EXEC-LAUNCH-BIND-002` | Proof Git tree `1777020c393fd3a63134eac99d878b66261523eb` | Accepted by WP-43 |
| `TP1-EXEC-LAUNCH-BIND-003` | WP-43 governance publication `85308d2a56993feebd2d10bb97d45aff0735775a` | Live-remote verified |
| `TP1-EXEC-LAUNCH-BIND-004` | Artifact inventory `3aed6426332e6b50ae566184d1efa8c9a762819bafc5a817d6530f5ea7377d6f` | Accepted by WP-43 |
| `TP1-EXEC-LAUNCH-BIND-005` | Content set `4bbea5208cc343d79576437537873df07ad9f76019096b536d92b5110c2b322e` | Accepted by WP-43 |
| `TP1-EXEC-LAUNCH-BIND-006` | Published WP-43 document SHA-256 `bb275b71fbde5b8cd8fa188238fc30225eabda1b5fd8cd6c862d4507dd360e5e` | Committed byte identity |
| `TP1-EXEC-LAUNCH-BIND-007` | WP-43 validation SHA-256 `f9ef404d5942ab193f66b4984256c325b93127daedc3bf10e693131ae46ef349` | Private documentation evidence |
| `TP1-EXEC-LAUNCH-BIND-008` | Fresh reproduction validator `/root/wp44_reproduction_validator` | Fresh identity; owner acceptance pending |
| `TP1-EXEC-LAUNCH-BIND-009` | Reproduction-validator attestation SHA-256 `0505fbcd1f173fbca6da54bbb9c2086392a5b55073452a07cdfe64c55c434a6d` | Private identity evidence |
| `TP1-EXEC-LAUNCH-BIND-010` | Ineffective authorization draft SHA-256 `5eb0cff9bf6bf0eb472f12bf1c720bf9f05cdd1aa231c3a051c705236a14028a` | Private; never executable |
| `TP1-EXEC-LAUNCH-BIND-011` | Exact launcher `4f4d8d4751e9a295c8b890a4f7e89d6653e363ec6a81b0ceef7b088491a1cf9a`, contract `41b39f515e7a50f5dfec4d6ef23f4414b8e60629333392f2d94d0ca4a8d1b205`, test `efde8268280a93d2882ecc4df1dc40c0e0699bf3287309f343becdc8b5e4dc9e` | Accepted static identities; runtime unmeasured |
| `TP1-EXEC-LAUNCH-BIND-012` | Runtime reachability `NOT_AUTHORIZED`; package/run absent, `runtimeMeasured: false`, bypass false | Closed runtime gate |
| `TP1-EXEC-LAUNCH-BIND-013` | Conditional pull `NOT_AUTHORIZED`; package/run/token/token-hash absent | Closed network gate |
| `TP1-EXEC-LAUNCH-BIND-014` | Six immutable stopped attempts: WP-24, WP-27, WP-30, WP-33, WP-37, and WP-41 | Expired; none may resume |

Any future execution must use a separately authorized dedicated checkout whose `HEAD` and proof
tree match bindings `001` and `002`. The governance publication in binding `003` is decision
provenance and is not the future execution checkout. WP-44 creates no checkout.

## Fresh identity and independence attestation

The owner authorized exactly one fresh identity. `/root/wp44_reproduction_validator` returned
`PASS` and attested that it is distinct from:

- primary operator `/root`;
- technical security reviewer `/root/tp01_security_review`;
- WP-42 static validator `/root/wp42_static_validator`; and
- every previously assigned reproduction validator.

It did not author WP-42 or WP-43 proof or governance changes and did not operate or reproduce any
prior TP-01 run. It has zero current proof-execution, dependency, repository, authorization,
runtime, infrastructure, network, or data-mutation authority. A future reproduction role would be
read-only regarding primary evidence and could activate only after sealed handoff, fresh reset, and
a separately effective authorization.

The attestation establishes identity separation only. It is not execution authorization, proof
reproduction, documentation validation, human security qualification, or a proof-result review.

## Exact role proposal

| Role | Canonical identity | WP-44 state |
| --- | --- | --- |
| Proof owner | Aung Myo Oo | Accepted owner; controls future authorization and evidence disposition |
| Primary operator | `/root` | Proposed for one later exact package/run; no current authority |
| Reproduction validator | `/root/wp44_reproduction_validator` | Fresh and attested; no current authority |
| Technical security reviewer | `/root/tp01_security_review` | Proposed; later read-only reconfirmation required |
| WP-42 static validator | `/root/wp42_static_validator` | Static role complete; ineligible for reproduction |
| Production/real-data reviewer | Named qualified human | Deferred mandatory gate before production or real/customer data |

## Launcher, reachability, and image gates

The accepted exact launcher must invoke `run runtime:verify-reachability` through the reviewed
two-argument command shape. Its static acceptance is not runtime evidence. A later run must still
record all three reachability views before the primary reset and again before the reproduction
reset:

1. Docker inspect reports exactly one `5432/tcp -> 127.0.0.1:55432` binding;
2. Compose reports one running, healthy `postgres` service with that exact publisher; and
3. direct bounded TCP reachability to `127.0.0.1:55432` passes.

WP-44 records `runtimeMeasured: false` and `bypassAuthorized: false`; it performs no measurement.

Image verification remains local-first for the exact accepted digest and platform. Only measured
absence during a separately authorized run could permit creation of a private run-bound pull token
and exact Docker-registry retrieval. WP-44 creates no token and grants no registry authority.

## Prepared private authorization model

WP-44 prepares
`internal-local/work-packages/WP-44/checkpoint2-authorization-draft.json`. It is not named
`authorization.json`; has `DRAFT_NOT_AUTHORIZED`, `effective: false`, and
`checkpoint2Authorized: false`; and cannot satisfy the execution, image, or reachability guards.

The draft contains no proposed execution package, run ID, checkout, token, token hash, or
credential. Seventeen action-authority flags and both effectiveness gates are false.
`roleAttestationOnly: true` records the sole completed role action without granting execution
authority. It preserves six immutable stopped attempts and proposes 23 future stages only for a
later exact owner decision.

Draft SHA-256: `5eb0cff9bf6bf0eb472f12bf1c720bf9f05cdd1aa231c3a051c705236a14028a`.

## Proposed later controlled boundary

A later exact owner authorization would need to permit, in order:

1. create a clean dedicated checkout at the accepted proof revision;
2. revalidate every governance, proof, role, runtime, command, and absence binding;
3. reconfirm the primary operator, fresh reproduction validator, and security reviewer;
4. restore exact dependencies offline/frozen/ignore-scripts from the existing local store;
5. create a new run directory and effective private authorization;
6. run preflight and inspect the exact accepted image locally first;
7. only if absent, create and bind a private run-specific pull token under explicit registry
   authority, then retrieve and verify the exact digest/platform;
8. start the bounded database and pass the exact-launcher three-view reachability gate;
9. reset the database, verify the 222-case manifest, and run the primary proof;
10. seal primary evidence and hand it off read-only;
11. pass the exact-launcher three-view reachability gate again before a fresh reproduction reset;
12. reproduce once as `/root/wp44_reproduction_validator`;
13. perform interim evidence verification and mandatory cleanup under every outcome;
14. obtain operator, reproduction-validator, and technical-security reviews;
15. run fail-closed final evidence verification; and
16. stop for owner evidence disposition without selecting architecture or implementation.

No part of this sequence is authorized by WP-44. A future owner statement must supply a new
package/run ID, exact checkout and restoration boundary, effective private authorization,
conditional token rule, commands, cleanup, stop, and no-retry controls.

## Readiness decision

| Input | State | Remaining gate |
| --- | --- | --- |
| Accepted proof binding | Complete | Reverify in a clean exact-revision checkout |
| Governance publication | Verified | Preserve as decision provenance, not execution `HEAD` |
| Primary operator | Proposed exact identity | Owner acceptance for one later run |
| Reproduction validator | Fresh identity and attestation recorded | Owner acceptance for one later run |
| Security reviewer | Proposed prior identity | Reconfirm after sealed evidence exists |
| Private authorization draft | Complete and ineffective | Owner decision; later create a new effective record |
| Dedicated checkout | Absent | Later exact creation authority |
| Dependencies | Not inspected or operated | Later exact offline restoration authority |
| Conditional pull token | Absent and unauthorized | Create only after measured absence under later exact authority |
| Runtime launcher/reachability | Unmeasured | Later controlled exact-launcher and three-view measurement only |
| Cleanup/proof/security evidence | Absent by design | Later controlled execution only |

Verdict: identity and authorization preparation are `READY_FOR_OWNER_DECISION`; checkpoint 2 is
`NOT_AUTHORIZED`.

## Recommended owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP44-DEC-001` | Accept `TP1-EXEC-LAUNCH-BIND-001` through `014` as the exact candidate binding for one later new attempt. | Accepted |
| `WP44-DEC-002` | Accept `/root` as the proposed primary operator for one later exact package/run only. | Accepted |
| `WP44-DEC-003` | Accept `/root/wp44_reproduction_validator` as the fresh reproduction identity and accept its independence attestation. | Accepted |
| `WP44-DEC-004` | Preserve `/root/tp01_security_review` as the proposed separate local synthetic technical reviewer, subject to later reconfirmation. | Accepted |
| `WP44-DEC-005` | Accept the private draft as complete but ineffective; never rename or copy it to `authorization.json`. | Accepted |
| `WP44-DEC-006` | Require exact offline/frozen/ignore-scripts dependency restoration in a later dedicated checkout and prohibit npm/version changes. | Accepted |
| `WP44-DEC-007` | Require local-first image verification and separate run-bound token authority only after measured absence. | Accepted |
| `WP44-DEC-008` | Require the exact launcher and three-view reachability gate before each reset, mandatory cleanup, role-separated reviews, fail-closed final verification, and no retry under every later outcome. | Accepted |
| `WP44-DEC-009` | Require a separate explicit owner authorization before checkout creation, dependency restoration, effective authorization, token creation, or any checkpoint-2 command. | Accepted |
| `WP44-DEC-010` | Keep application coding, final architecture selection, provider accounts/cost, infrastructure, deployment, customer/live data, and network closed. | Accepted |

## Frozen WP-44 public inventory

Owner review and any later publication authorization apply only to these four paths:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/46_TP01_EXACT_LAUNCHER_REBINDING_REAUTHORIZATION_READINESS.md`
4. `docs/47_TP01_EXECUTION_IDENTITY_LAUNCHER_AUTHORIZATION_READINESS.md`

Private identity, authorization, and validation records remain ignored under `internal-local/` and
must not be published.

## Next gate

The owner accepted WP-44 exactly as recorded and authorized its four-path publication. Commit
`7c27bb50f1becd4b5c808f30aab7d68c277d2458` was verified on live `origin/main`. WP-44 then closed
and its accepted identities and controls governed the separately authorized WP-45 attempt.

WP-45 ended `INCONCLUSIVE_CLOSED_NO_RETRY`; see
`docs/48_TP01_CONTROLLED_EXACT_LAUNCHER_EXECUTION_RESULT.md`. WP-44 grants no reusable execution
authority. Any remediation or later run requires a new explicit owner gate.
