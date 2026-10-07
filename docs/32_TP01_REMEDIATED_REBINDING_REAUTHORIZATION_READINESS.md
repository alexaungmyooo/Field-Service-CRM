# TP-01 Remediated Rebinding and Reauthorization Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted, published, and closed — superseded by stopped WP-30 run |
| Work package | `WP-29 TP-01 Remediated Rebinding and Reauthorization Readiness` |
| Governing decisions | `DEC-128`, `DEC-147`, `DEC-155`, `DEC-157`, `DEC-158`, `DEC-159` |
| Published remediation | WP-28 `VERIFIED_AND_CLOSED` |
| Owner | Aung Myo Oo |
| Date | 2026-10-07 |
| TP-01 execution | Not authorized |
| Publication | Not authorized |

## Objective and authority boundary

WP-29 binds the exact published WP-28 revision, proof tree, 54-file inventory, corrected Compose
contract, corrected cleanup interface, existing runtime/dependency identities, role status, future
workspace needs, and an ineffective private authorization shape for owner decision.

WP-29 does not create an execution checkout, operate dependencies, instantiate a reproduction
validator, create an effective `authorization.json`, run preflight, inspect or retrieve an image,
invoke Docker/Compose or cleanup, start a runtime resource, execute/reproduce TP-01, select
architecture, write application code, or publish this package.

## Preserved stop history

| Record | Disposition |
| --- | --- |
| WP-24 run `wp24-2026-10-07-01` | `INCONCLUSIVE_CLOSED_NO_RETRY`; authorization expired; never resumable |
| WP-27 run `wp27-2026-10-07-01` | `INCONCLUSIVE_CLOSED_NO_RETRY`; authorization expired; never resumable |
| WP-24 and WP-27 private stop packets | Immutable historical evidence; neither establishes a tenant-boundary result |
| WP-25 launcher remediation | Accepted static prerequisite; superseded binding values where WP-28 changed the proof |
| WP-28 Compose/cleanup remediation | Accepted static prerequisite; not runtime or security evidence |

Any future attempt must use a new run ID, new effective private authorization, new dedicated
checkout, and freshly accepted execution roles. It is not a retry or continuation of either
stopped run.

## Published candidate binding

These values form one indivisible candidate binding. They are not execution authorization.

| Binding ID | Exact value | WP-29 state |
| --- | --- | --- |
| `TP1-REMEDIATED-BIND-001` | Published revision `8b4ad940ed2b1266b89cbd04f006873d4fe8b407` | Proposed execution revision |
| `TP1-REMEDIATED-BIND-002` | Proof Git tree `26e1ebf2572b24064fa61963d6db6f656fdc6d09` | Proposed |
| `TP1-REMEDIATED-BIND-003` | Proof file count `54` | Proposed |
| `TP1-REMEDIATED-BIND-004` | Artifact-inventory SHA-256 `739e5b95b340b2cfb751248e9981cb86c6bda031b6e02f9a12a6aee1772d81d2` | Proposed |
| `TP1-REMEDIATED-BIND-005` | Content-set SHA-256 `90ce82c5a31f647d2b5e3ad71cda67621fe9dbb895c41fb3d69b11b252cfddfe` | Proposed |
| `TP1-REMEDIATED-BIND-006` | Package SHA-256 `d10a8e2e5bfeb170cfb6f29485a5376689ad4e73dcbc68c62cc7348ffc4dcc1e` | Proposed; unchanged |
| `TP1-REMEDIATED-BIND-007` | Lockfile SHA-256 `752d4154434adc69d6f18021555a368dbfd2d764bf7ed6c37810371b93f6e1af` | Proposed; unchanged |
| `TP1-REMEDIATED-BIND-008` | 222-case manifest SHA-256 `de4e412a27f35bc96a3858174bcf186ae02f84c08a0e94b28771e3db78a2665f` | Proposed; unchanged |
| `TP1-REMEDIATED-BIND-009` | Preflight SHA-256 `3a6101bad323294b0d7b76b7fe3f90fd163096e017a76fea451892b3a58a72c9` | Proposed |
| `TP1-REMEDIATED-BIND-010` | Cleanup SHA-256 `91f6fd348db531edfa10b5f28ee2a76337f3af09fa3913c4ad524bd1fd8917ce` | Proposed |
| `TP1-REMEDIATED-BIND-011` | Compose/cleanup contract SHA-256 `cf4d85ce867058548cce99e66008fc12504f1b884e6e2b33c44bb308c7e54f46` | Proposed |
| `TP1-REMEDIATED-BIND-012` | Contract-test SHA-256 `945af17b180b4fef91283d8d8b5e4d6d4f09dc08574ea546562fe0e739c5aaf4` | Proposed |
| `TP1-REMEDIATED-BIND-013` | Exact-launcher SHA-256 `a7cd0550fd3b4b8093fcb7837e9d6acfbd1b81b68aba3ea2c3a10c29167dc071` | Proposed |
| `TP1-REMEDIATED-BIND-014` | Runtime-contract SHA-256 `b2bc0284616389e112f22197b2c7a699a322bab6d29d0950dd39108b661555ff` | Proposed |
| `TP1-REMEDIATED-BIND-015` | Static-evidence script SHA-256 `4751b3c119c3537352bb57cfa1b8270778623a8d9be40c6adb18654e8f515c63` | Proposed |
| `TP1-REMEDIATED-BIND-016` | Node `v22.23.1`, binary SHA-256 `2e3f1286a7eb3736346ed1803e458a0ff909e2b2d5bc746144dcb76970e9b99d` | Proposed; execution-host recheck required |
| `TP1-REMEDIATED-BIND-017` | pnpm `11.25.0`, entry SHA-256 `ff3224d46b47fbb24a7e9fe15fededef7e00892d07d4e376b6762d4899906bfd` | Proposed; hash-before-execution required |
| `TP1-REMEDIATED-BIND-018` | Compose semantic version `5.4.0`; accepted raw semantic forms `5.4.0` or `v5.4.0`; exact stdout preserved | Proposed; future preflight measurement required |
| `TP1-REMEDIATED-BIND-019` | PostgreSQL OCI index digest `sha256:afc7e2d441324c0388fa80c3d24f733b4194a4eb7f47dd8ee2b08eb1a24a647c`, platform `linux/arm64/v8` | Proposed; future verification required |
| `TP1-REMEDIATED-BIND-020` | WP-28 independent static review SHA-256 `014ab19acd58094a9a3b58d39f6cd63e6c8b318e950b6e1be726a451914eda01` | Proposed; private static evidence only |

Any drift in revision, proof tree, proof byte, inventory, dependency, launcher, version contract,
image, role, command, limit, evidence, cleanup, network, or non-scope expires the full candidate
binding.

## Workspace and dependency readiness

Ignored proof dependencies are present in the current main checkout, based on a read-only existence
check. They are not published and will not appear in a new checkout. WP-29 performs no dependency
command and grants no authority to reuse the current checkout for execution.

| Option ID | Approach | Benefit | Risk and disposition |
| --- | --- | --- | --- |
| `WP29-WS-001` | Create a dedicated checkout at `TP1-REMEDIATED-BIND-001`, then restore exact dependencies offline/frozen/ignore-scripts from the existing local store under later authority. | Preserves revision custody and reproducible dependency evidence. | Advance; stop if local content is missing or any hash/metadata drifts. |
| `WP29-WS-002` | Execute from the current main checkout. | Avoids restoration. | Reject; governance changes and ignored local state weaken exact-revision custody. |
| `WP29-WS-003` | Install from npm or another registry. | Conventional setup. | Reject; violates the closed network/supply-chain boundary. |

No checkout is created and no store or dependency directory is read, copied, restored, or changed
in WP-29.

## Role readiness

| Role | Current state | Required future treatment |
| --- | --- | --- |
| Proof owner | Aung Myo Oo | Retain owner authorization and evidence-disposition authority |
| Primary operator | `/root`; operator of stopped WP-27 | Reaccept only for a new exact package and run |
| WP-27 reproduction validator | `/root/wp27_reproduction_validator`; reviewed the stopped packet | Expired with WP-27; never silently reuse |
| Future reproduction validator | Not instantiated in WP-29 | Create exactly one fresh independent identity only under later owner authority |
| Technical security reviewer | `/root/tp01_security_review` | Reconfirm read-only availability and independence for new sealed evidence |
| Production/real-data reviewer | Qualified human not assigned | Mandatory before production deployment or any real/customer data |

WP-29 creates no subagent, role attestation, execution identity, or authority.

## Proposed future execution envelope

A later owner statement would need to authorize all preparation and checkpoint-2 actions explicitly:

1. create a clean dedicated checkout at `TP1-REMEDIATED-BIND-001`;
2. instantiate and attest exactly one fresh reproduction-validator identity;
3. restore the exact lock-bound dependencies offline/frozen/ignore-scripts from the existing local
   store, with zero registry access and no lifecycle scripts;
4. bind a new run ID, roles, checkout, exact hashes, limits, evidence directory, expiry, stop
   conditions, and mandatory cleanup in a new effective private `authorization.json`;
5. run preflight exactly once through the accepted exact launcher;
6. verify the accepted image and use Docker registry only if the exact digest is absent and the
   later authorization permits it;
7. start/reset the bounded database and verify the frozen 222-case matrix;
8. run the primary proof once as `/root` and seal its evidence;
9. hand off sealed evidence read-only, fresh-reset, and reproduce once as the fresh validator;
10. run interim evidence verification;
11. invoke cleanup directly with exact Node under every outcome;
12. collect operator, reproduction-validator, and technical-security reviews;
13. run final verification directly with exact Node; and
14. stop for owner evidence disposition without architecture selection or implementation.

Any missing input, drift, unauthorized network need, resource breach, unsafe evidence,
cross-tenant disclosure or mutation, review failure, cleanup failure, or unremovable residue stops
the attempt. No automatic retry is permitted.

## Ineffective private draft

WP-29 prepares the ignored file
`internal-local/work-packages/WP-29/checkpoint2-reauthorization-draft.json`. It has status
`DRAFT_NOT_AUTHORIZED`, `effective: false`, and `checkpoint2Authorized: false`; contains no run ID
or fresh reproduction identity; and records every dependency, preflight, runtime, and product gate
as false. It is not named `authorization.json` and cannot satisfy the proof execution guard.

Its SHA-256 is `cd810a7d42d9f3a45dbe812e24cc618ac886a9b8b3d1c7ff86b520b86efe16d2`.

## Readiness verdict

| Input | Current state | Remaining gate |
| --- | --- | --- |
| WP-28 publication | Live-remote verified | Preserve exact revision/tree as one complete binding |
| Proof/static identities | Exact candidate binding recorded | Owner acceptance and future no-drift verification |
| Dedicated execution checkout | Absent | Later explicit creation authority |
| Dependencies in that checkout | Absent by construction | Later exact offline restoration authority |
| Primary operator | Prior identity known | New package/run acceptance |
| Fresh reproduction validator | Absent | Later owner-authorized instantiation and attestation |
| Technical security reviewer | Prior independent identity known | Reconfirmation for new packet |
| Effective private authorization | Absent | Later owner authority after exact roles/workspace exist |
| Runtime/image/cleanup evidence | Absent by design | Later controlled execution only |

Verdict: `READY_FOR_OWNER_DECISION`, but `NOT_READY_FOR_EXECUTION_AUTHORIZATION` and
`NOT_AUTHORIZED`.

## Recommended owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP29-DEC-001` | Accept `TP1-REMEDIATED-BIND-001` through `020` only as one candidate binding for a completely new attempt. | Proposed |
| `WP29-DEC-002` | Preserve WP-24 and WP-27 as separate immutable Inconclusive runs with expired authorizations and no retry. | Proposed |
| `WP29-DEC-003` | Accept the corrected Compose raw/normalized contract and dependency-free cleanup interface without treating static validation as runtime evidence. | Proposed |
| `WP29-DEC-004` | Advance `WP29-WS-001`; reject `WP29-WS-002` and `WP29-WS-003`. | Proposed |
| `WP29-DEC-005` | Require exactly one fresh reproduction-validator identity under later owner authority; do not reuse a prior run identity. | Proposed |
| `WP29-DEC-006` | Retain `/root` and `/root/tp01_security_review` only as proposed future roles subject to new-package reconfirmation. | Proposed |
| `WP29-DEC-007` | Accept the private draft shape as complete but ineffective; never rename or copy it to `authorization.json`. | Proposed |
| `WP29-DEC-008` | Require exact offline/frozen/ignore-scripts dependency restoration in a dedicated checkout under later explicit authority; prohibit npm and dependency-version change. | Proposed |
| `WP29-DEC-009` | Permit a later WP-30 owner statement, only after verified WP-29 publication, to authorize a new run ID, dedicated checkout, fresh validator, exact offline restoration, effective authorization, and one fail-closed checkpoint-2 attempt. | Proposed |
| `WP29-DEC-010` | Keep application coding, final architecture selection, infrastructure, deployment, provider accounts/cost, and customer/live data closed. | Proposed |

## Frozen WP-29 public inventory

Owner review and any later publication authorization apply only to these four paths:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/31_TP01_COMPOSE_CLEANUP_STATIC_REMEDIATION.md`
4. `docs/32_TP01_REMEDIATED_REBINDING_REAUTHORIZATION_READINESS.md`

Private authorization and validation records remain ignored under `internal-local/` and must not be
published.

## Next gate

The owner accepted all twenty bindings, all ten recommendations, workspace option `WP29-WS-001`,
rejection of `WP29-WS-002/003`, and the ineffective private draft. The frozen four-path inventory
was committed as `258c225 WP-29: accept TP-01 remediated rebinding` and pushed to `origin/main`.
Local `HEAD`, cached `origin/main`, and live remote main matched
`258c2252769d8a046769ae66f315e6db580464c1`. WP-29 is `VERIFIED_AND_CLOSED`.

The owner separately activated WP-30 run `wp30-2026-10-07-01` under the exact dedicated-checkout,
fresh-role, offline-dependency, authorization, network, sequence, cleanup, stop, and non-scope
controls recorded here. WP-30 stopped Inconclusive during its primary proof and is documented in
document 33. No WP-29 draft or prior authorization remains effective.
