# TP-01 Execution Identity and Reachability Authorization Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Ready for Owner Decision — identity attestation only |
| Work package | `WP-40 TP-01 Execution Identity and Reachability Authorization Readiness` |
| Governing decision | `DEC-170` |
| Governance publication | `c120f0d738c93e7ceff75630a5dc678157ff98db` |
| Accepted proof revision | `ce851445a485883fb6f3ec5572508fb0902a4656` |
| Proof tree | `ad27a2c754b2f7352b3beff314a8e3349758e17a` |
| Owner | Aung Myo Oo |
| Date | 2026-10-07 |
| TP-01 execution | Not authorized |
| Publication | Not authorized |

## Objective and authority boundary

WP-40 records exactly one fresh reproduction-validator identity and prepares the exact private
authorization shape for a later owner decision. It preserves the distinction between the WP-39
governance publication and the accepted WP-38 proof revision. A future dedicated execution
checkout would use the accepted proof revision, not the later documentation-only revision.

WP-40 does not create a checkout, change the proof, inspect or operate dependencies, create an
effective `authorization.json`, run preflight, inspect or retrieve an image, create pull-token
material, invoke Docker/Compose or cleanup, start a resource, execute or reproduce TP-01, select
architecture, write application code, create infrastructure, deploy, or use customer/live data.

## Exact execution and role binding

| ID | Exact identity | WP-40 state |
| --- | --- | --- |
| `TP1-EXEC-REACH-BIND-001` | Accepted proof revision `ce851445a485883fb6f3ec5572508fb0902a4656` | Accepted by WP-39 |
| `TP1-EXEC-REACH-BIND-002` | Proof Git tree `ad27a2c754b2f7352b3beff314a8e3349758e17a` | Accepted by WP-39 |
| `TP1-EXEC-REACH-BIND-003` | WP-39 governance publication `c120f0d738c93e7ceff75630a5dc678157ff98db` | Live-remote verified |
| `TP1-EXEC-REACH-BIND-004` | Artifact inventory `2b87f65acbde27aa63c72a4f752f00f66f1333e01d94d6c2c7f5c0784e8c9114` | Accepted by WP-39 |
| `TP1-EXEC-REACH-BIND-005` | Content set `c44b2035b558c373eeea9e606a6dc2ac0373dab309d4d984f8ac70ec12637919` | Accepted by WP-39 |
| `TP1-EXEC-REACH-BIND-006` | Published WP-39 document SHA-256 `68041008e259e8a435540d893bdebc30c1839e665d465f980089920db1720f6e` | Committed byte identity |
| `TP1-EXEC-REACH-BIND-007` | Fresh reproduction validator `/root/wp40_reproduction_validator` | Attested; owner acceptance pending |
| `TP1-EXEC-REACH-BIND-008` | Reproduction-validator attestation SHA-256 `3b7b8490166490f3a2735a306d7bfaa9a9d0a1180e66b0c1716dd0ca3c10638b` | Private identity evidence |
| `TP1-EXEC-REACH-BIND-009` | Ineffective authorization draft SHA-256 `549e94666ffe2b47a8efb380b67bf2eab97cc46c20c8f04ee3fc7f45d00c9370` | Private; never executable |
| `TP1-EXEC-REACH-BIND-010` | Runtime reachability status `NOT_AUTHORIZED`; run/package absent, `runtimeMeasured: false`, bypass false | Closed runtime gate |
| `TP1-EXEC-REACH-BIND-011` | Conditional pull status `NOT_AUTHORIZED`; run/package/token/token-hash absent | Closed network gate |

Any future execution must use a separately authorized dedicated checkout whose `HEAD` and proof
tree match bindings `001` and `002`. The governance publication in binding `003` is decision
provenance and is not the future execution checkout. WP-40 creates no checkout.

## Fresh identity and independence attestation

The owner authorized exactly one fresh identity. `/root/wp40_reproduction_validator` attested that
it is distinct from:

- primary operator `/root`;
- prior reproduction validators `/root/tp01_reproduction_validator`,
  `/root/wp27_reproduction_validator`, `/root/wp30_reproduction_validator`,
  `/root/wp33_reproduction_validator`, and `/root/wp36_reproduction_validator`; and
- every prior TP-01 inventory/static validator, including `/root/wp25_static_validator`,
  `/root/wp28_static_validator`, `/root/wp31_static_validator`, `/root/wp34_static_validator`, and
  `/root/wp38_static_validator`.

The identity has zero current proof or execution authority. It may perform one future read-only
reproduction only after separate explicit owner authorization, receipt of a sealed primary
evidence handoff, and a verified fresh reset. It read only governing records and performed zero
filesystem, Git, dependency, runtime, proof, network, or external mutation.

## Exact role proposal

| Role | Canonical identity | WP-40 state |
| --- | --- | --- |
| Proof owner | Aung Myo Oo | Accepted; owns future authorization and evidence disposition |
| Primary operator | `/root` | Proposed for one later exact package/run; no current authority |
| Reproduction validator | `/root/wp40_reproduction_validator` | Fresh and attested; no current authority |
| Technical security reviewer | `/root/tp01_security_review` | Proposed; later read-only reconfirmation required |
| WP-38 static validator | `/root/wp38_static_validator` | Static role complete; ineligible for reproduction |
| Production/real-data reviewer | Named qualified human | Deferred mandatory gate before production or real/customer data |

## Reachability and image gates

The accepted reachability control remains a three-view runtime requirement:

1. Docker inspect must show exactly one `5432/tcp -> 127.0.0.1:55432` binding;
2. Compose must report one running, healthy `postgres` service with that exact publisher; and
3. direct bounded TCP reachability to `127.0.0.1:55432` must pass.

The gate is required before the primary database reset and again before the reproduction reset.
WP-40 records `runtimeMeasured: false` and `bypassAuthorized: false`; it performs no measurement.

Image verification remains local-first for the exact accepted digest and platform. Only measured
absence during a separately authorized run could permit creation of a private run-bound pull token
and exact Docker-registry retrieval. WP-40 creates no token and grants no registry authority.

## Prepared private authorization model

WP-40 prepares
`internal-local/work-packages/WP-40/checkpoint2-authorization-draft.json`. It is not named
`authorization.json`; has `DRAFT_NOT_AUTHORIZED`, `effective: false`, and
`checkpoint2Authorized: false`; and cannot satisfy the execution, conditional-image, or
reachability guards.

The draft contains no execution package, run ID, checkout, token, or token hash. All 18 runtime,
role-execution, infrastructure, product, and data authorization fields are false.
`roleAttestationOnly: true` records the sole completed action without granting execution authority.
It preserves five immutable stopped attempts and proposes 22 future stages only for a later exact
owner decision.

Draft SHA-256: `549e94666ffe2b47a8efb380b67bf2eab97cc46c20c8f04ee3fc7f45d00c9370`.

## Proposed later controlled boundary

A later exact owner authorization would need to permit, in order:

1. create a clean dedicated checkout at the accepted proof revision;
2. revalidate every accepted proof, role, runtime, command, and absence binding;
3. reconfirm the primary operator, fresh reproduction validator, and security reviewer;
4. restore exact dependencies offline/frozen/ignore-scripts from the existing local store;
5. create a new run directory and effective private authorization;
6. run preflight and inspect the exact accepted image locally;
7. only if absent, create and bind a private run-specific pull token under explicit registry
   authority, then retrieve and verify the exact digest/platform;
8. start the bounded database and pass the exact three-view reachability gate;
9. reset the database, verify the 222-case manifest, and run the primary proof;
10. seal primary evidence and hand it off read-only;
11. pass the exact three-view reachability gate again before a fresh reproduction reset;
12. reproduce once as `/root/wp40_reproduction_validator`;
13. perform interim evidence verification and mandatory cleanup under every outcome;
14. obtain operator, reproduction-validator, and technical-security reviews;
15. run fail-closed final evidence verification; and
16. stop for owner evidence disposition without selecting architecture or implementation.

No part of this sequence is authorized by WP-40. A future owner statement must supply a new
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
| Runtime reachability | Unmeasured | Later controlled three-view measurement only |
| Cleanup/proof/security evidence | Absent by design | Later controlled execution only |

Verdict: identity and authorization preparation are `READY_FOR_OWNER_DECISION`; checkpoint 2 is
`NOT_AUTHORIZED`.

## Recommended owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP40-DEC-001` | Accept `TP1-EXEC-REACH-BIND-001` through `011` as the exact candidate binding for one later new attempt. | Proposed |
| `WP40-DEC-002` | Accept `/root` as the proposed primary operator for one later exact package/run only. | Proposed |
| `WP40-DEC-003` | Accept `/root/wp40_reproduction_validator` as the fresh reproduction identity and accept its independence attestation. | Proposed |
| `WP40-DEC-004` | Preserve `/root/tp01_security_review` as the proposed separate local synthetic technical reviewer, subject to later reconfirmation. | Proposed |
| `WP40-DEC-005` | Accept the private draft as complete but ineffective; never rename or copy it to `authorization.json`. | Proposed |
| `WP40-DEC-006` | Require exact offline/frozen/ignore-scripts dependency restoration in a later dedicated checkout and prohibit npm/version changes. | Proposed |
| `WP40-DEC-007` | Require local-first image verification and separate run-bound token authority only after measured absence. | Proposed |
| `WP40-DEC-008` | Require the three-view reachability gate before each reset, mandatory cleanup, role-separated reviews, fail-closed final verification, and no retry under every later outcome. | Proposed |
| `WP40-DEC-009` | Require a separate explicit owner authorization before checkout creation, dependency restoration, effective authorization, token creation, or any checkpoint-2 command. | Proposed |
| `WP40-DEC-010` | Keep application coding, final architecture selection, provider accounts/cost, infrastructure, deployment, and customer/live data closed. | Proposed |

## Frozen WP-40 public inventory

Owner review and any later publication authorization apply only to these four paths:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/42_TP01_HOST_PORT_REMEDIATION_REBINDING_REAUTHORIZATION_READINESS.md`
4. `docs/43_TP01_EXECUTION_IDENTITY_REACHABILITY_AUTHORIZATION_READINESS.md`

Private identity, authorization, and validation records remain ignored under `internal-local/` and
must not be published.

## Next gate

WP-40 stops at owner decision. The identity attestation grants no execution authority. Commit,
push, checkout creation, dependency restoration, effective authorization, token creation,
Docker/Compose, cleanup, proof/reproduction, and every later-package gate remain closed until a
later explicit owner statement.
