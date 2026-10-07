# TP-01 Execution Identity and Conditional Pull Authorization Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Ready for Owner Decision — ineffective draft only |
| Work package | `WP-36 TP-01 Execution Identity and Conditional Pull Authorization Readiness` |
| Governing decision | `DEC-166` |
| Governance publication | `9719c73208be5870ef1f4a0f03d6c4d7d79435f6` |
| Accepted proof revision | `7fd5f57a2c121dbaa35995501e019a8609a6b0a3` |
| Proof tree | `a0e146ec6cf5759b08346d8f6ac9bc1dfeee215b` |
| Owner | Aung Myo Oo |
| Date | 2026-10-07 |
| TP-01 execution | Not authorized |
| Publication | Not authorized |

## Objective and boundary

WP-36 records exactly one fresh reproduction-validator identity and prepares the exact private
authorization shape needed for a later owner decision. The governance publication is not the
execution revision: any later dedicated checkout must use the accepted WP-34 proof revision above.

WP-36 does not create a checkout, operate dependencies, create an effective `authorization.json`,
run preflight, inspect/retrieve an image, create pull-token material, invoke Docker/Compose or
cleanup, start a resource, execute/reproduce TP-01, select architecture, write application code,
deploy, or publish this package.

## Exact execution binding

| ID | Exact identity | State |
| --- | --- | --- |
| `TP1-EXEC-IMAGE-BIND-001` | Accepted proof revision `7fd5f57a2c121dbaa35995501e019a8609a6b0a3` | Accepted by WP-35 |
| `TP1-EXEC-IMAGE-BIND-002` | Proof Git tree `a0e146ec6cf5759b08346d8f6ac9bc1dfeee215b` | Accepted by WP-35 |
| `TP1-EXEC-IMAGE-BIND-003` | WP-35 governance publication `9719c73208be5870ef1f4a0f03d6c4d7d79435f6` | Verified |
| `TP1-EXEC-IMAGE-BIND-004` | Artifact inventory `8867a18fd7dfbba0d74450b5218b95546b1f9230234bd653a7e9c299db0e484a` | Accepted by WP-35 |
| `TP1-EXEC-IMAGE-BIND-005` | Content set `fb02cb587008a159bcd80b5b9f43f045f57783a83f07ee2023caacf84731ce2b` | Accepted by WP-35 |
| `TP1-EXEC-IMAGE-BIND-006` | Fresh reproduction validator `/root/wp36_reproduction_validator` | Attested; owner acceptance pending |
| `TP1-EXEC-IMAGE-BIND-007` | Reproduction-validator attestation SHA-256 `faeb54f72f718abdc80f1401a12a1f813936a5c03282e44d0232c1e7d6a102c2` | Private identity evidence |
| `TP1-EXEC-IMAGE-BIND-008` | Ineffective authorization draft SHA-256 `5d8b80212482681abe8640beef732ba22a0a7822c4aa457b91ce11018dfdda7e` | Private; never executable |
| `TP1-EXEC-IMAGE-BIND-009` | Conditional pull status `NOT_AUTHORIZED`; run/package/token/token-hash absent | Preserved closed gate |

Any later execution must use a separately authorized dedicated checkout whose `HEAD` and proof tree
match bindings `001` and `002`. WP-36 creates no checkout.

## Exact role proposal and attestation

| Role | Canonical identity | WP-36 state |
| --- | --- | --- |
| Proof owner | Aung Myo Oo | Identified; owns authorization and evidence disposition |
| Primary operator | `/root` | Proposed for one later exact run; not yet accepted for execution |
| Reproduction validator | `/root/wp36_reproduction_validator` | Fresh identity with recorded attestation; not yet accepted for execution |
| Technical security reviewer | `/root/tp01_security_review` | Proposed separate read-only post-execution reviewer; reconfirmation pending |
| Production/real-data reviewer | Named qualified human | Deferred mandatory gate before production or real/customer data |

The reproduction validator attested that it is distinct from every prior TP-01 reproduction and
static validator, performed zero TP-01 action, accepts only a future read-only role after separate
owner authorization, sealed primary handoff, and fresh reset, and holds no present authority.

## Prepared private authorization model

WP-36 prepares
`internal-local/work-packages/WP-36/checkpoint2-authorization-draft.json`. It is not named
`authorization.json`; has `DRAFT_NOT_AUTHORIZED`, `effective: false`, and
`checkpoint2Authorized: false`; and cannot satisfy either the execution guard or conditional-pull
gate.

The draft contains no run ID, effective role acceptance, checkout, dependency authority, image
authority, token, or token hash. Conditional pull remains `NOT_AUTHORIZED`. All 17 runtime,
infrastructure, product, and data authority flags are false. `roleAttestationOnly: true` records the
sole completed action without granting execution authority.

## Proposed later controlled boundary

A later exact owner authorization would need to permit, in order:

1. create a clean dedicated checkout at the accepted proof revision;
2. revalidate every accepted proof, role, runtime, command, and absence binding;
3. restore exact dependencies offline/frozen/ignore-scripts from the existing local store;
4. create a new run directory and effective private authorization;
5. run preflight;
6. inspect the exact accepted image locally;
7. only if absent, create and bind a private run-specific pull token under explicit registry
   authority, then verify the exact digest/platform;
8. start and reset the bounded database, verify the 222-case matrix, and run the primary proof;
9. seal primary evidence, perform a fresh reset, and hand off read-only;
10. reproduce once as `/root/wp36_reproduction_validator`;
11. perform interim evidence verification;
12. run mandatory cleanup under every outcome;
13. obtain operator, reproduction-validator, and technical-security reviews;
14. run final evidence verification; and
15. stop for owner evidence disposition without selecting architecture or implementation.

No part of this sequence is authorized by WP-36. A future owner statement must supply the run ID,
exact checkout and restoration boundary, effective private authorization, conditional token rule,
commands, cleanup, and no-retry controls.

## Readiness decision

| Input | State | Remaining gate |
| --- | --- | --- |
| Accepted proof binding | Complete | Reverify in a clean exact-revision checkout |
| Governance publication | Verified | Preserve as decision provenance, not execution `HEAD` |
| Primary operator | Proposed exact identity | Owner acceptance for one later run |
| Reproduction validator | Fresh identity and attestation recorded | Owner acceptance |
| Security reviewer | Proposed prior identity | Reconfirm read-only availability after sealed evidence exists |
| Private authorization draft | Complete and ineffective | Owner decision; later generate a new effective record |
| Conditional pull token | Absent and unauthorized | Create only after measured absence under later exact authority |
| Dependencies | Not inspected or operated | Later exact offline restoration authority |
| Runtime evidence | Absent by design | Later controlled execution only |

Verdict: identity and authorization preparation are `READY_FOR_OWNER_DECISION`; checkpoint 2 is
`NOT_AUTHORIZED`.

## Recommended owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP36-DEC-001` | Accept `/root` as the proposed primary operator for one later exact run only. | Proposed |
| `WP36-DEC-002` | Accept `/root/wp36_reproduction_validator` as the fresh reproduction identity and accept its independence attestation. | Proposed |
| `WP36-DEC-003` | Preserve `/root/tp01_security_review` as the proposed separate local synthetic technical reviewer, subject to later reconfirmation. | Proposed |
| `WP36-DEC-004` | Accept `TP1-EXEC-IMAGE-BIND-001` through `009` as the exact future-run candidate binding. | Proposed |
| `WP36-DEC-005` | Accept the private draft as complete but ineffective; never rename or copy it to `authorization.json`. | Proposed |
| `WP36-DEC-006` | Accept the local-first image rule and require separate run-bound token authority only after measured absence. | Proposed |
| `WP36-DEC-007` | Require exact offline/frozen/ignore-scripts dependency restoration in a later dedicated checkout and prohibit npm/version changes. | Proposed |
| `WP36-DEC-008` | Require mandatory cleanup, role-separated reviews, fail-closed final verification, and no retry under every later outcome. | Proposed |
| `WP36-DEC-009` | Require a separate explicit owner authorization before checkout creation, dependency restoration, effective authorization, token creation, or any checkpoint-2 command. | Proposed |
| `WP36-DEC-010` | Keep application coding, final architecture selection, provider accounts/cost, infrastructure, deployment, and customer/live data closed. | Proposed |

## Frozen WP-36 public inventory

Owner review and any later publication authorization apply only to these four paths:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/38_TP01_CONDITIONAL_IMAGE_REBINDING_REAUTHORIZATION_READINESS.md`
4. `docs/39_TP01_EXECUTION_IDENTITY_CONDITIONAL_PULL_AUTHORIZATION_READINESS.md`

Private identity, authorization, and validation records remain ignored under `internal-local/` and
must not be published.

## Next gate

WP-36 stops at owner decision. No commit, push, checkout, dependency operation, effective
authorization, token creation, preflight, image/runtime action, cleanup, proof/reproduction, or
later package is authorized.
