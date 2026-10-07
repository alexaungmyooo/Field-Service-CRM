# TP-01 Reauthorization Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Ready for Owner Decision — execution not authorized |
| Work package | `WP-26 TP-01 Reauthorization Readiness` |
| Governing decisions | `DEC-128`, `DEC-147`, `DEC-154`, `DEC-155`, `DEC-156` |
| Published remediation | WP-25 `VERIFIED_AND_CLOSED` |
| Owner | Aung Myo Oo |
| Date | 2026-10-07 |
| TP-01 execution | Not authorized |

## Objective

Bind the published WP-25 proof revision, tree, hashes, launcher controls, roles, workspace needs,
and ineffective private authorization shape needed for an owner to decide whether a completely new
checkpoint-2 attempt may later be authorized.

WP-26 is documentation and private preparation only. It does not resume WP-24, create an execution
checkout, operate dependencies, instantiate a future reproduction validator, create an effective
`authorization.json`, or run preflight or any runtime command.

## Accepted history and authority boundary

- WP-24 remains `INCONCLUSIVE_CLOSED_NO_RETRY`; its run and effective authorization are expired and
  may never be resumed or reinterpreted as tenant-boundary evidence.
- WP-25 corrected the exact Node/pnpm launcher, restored and statically checked the reviewed
  dependencies, renewed all affected proof hashes, passed independent static validation, and was
  published.
- WP-25 measured no database, service, proof case, authorization path, or tenant isolation.
- A later checkpoint-2 attempt must be a new run with a new effective authorization, not a retry of
  `wp24-2026-10-07-01`.
- WP-26 does not accept architecture, application dependencies, infrastructure, production
  security, or customer-data use.

## Published candidate binding

These values are exact inputs for owner consideration. They are not an execution authorization.

| Binding ID | Exact value | WP-26 state |
| --- | --- | --- |
| `TP1-REAUTH-BIND-001` | Published revision `c588ac4e5b4d3307fbc99ffeadbbc3bbaa27bf6b` | Proposed execution revision |
| `TP1-REAUTH-BIND-002` | Proof Git tree `0e6b579811f59e13ff869ec40ea1e3bfd4edea49` | Proposed |
| `TP1-REAUTH-BIND-003` | Proof file count `52` | Proposed |
| `TP1-REAUTH-BIND-004` | Artifact inventory SHA-256 `0209ca15cc412e6c0f4d7ef06a7ecb4e74e756c678449f0801deb40c1000ac69` | Proposed |
| `TP1-REAUTH-BIND-005` | Content-set SHA-256 `052c2349f79ef36a06d8619a0747588b353d67d5b0c9df9e1735474d6f8d4d2d` | Proposed |
| `TP1-REAUTH-BIND-006` | Package SHA-256 `d10a8e2e5bfeb170cfb6f29485a5376689ad4e73dcbc68c62cc7348ffc4dcc1e` | Proposed; unchanged |
| `TP1-REAUTH-BIND-007` | Lockfile SHA-256 `752d4154434adc69d6f18021555a368dbfd2d764bf7ed6c37810371b93f6e1af` | Proposed; unchanged |
| `TP1-REAUTH-BIND-008` | 222-case manifest SHA-256 `de4e412a27f35bc96a3858174bcf186ae02f84c08a0e94b28771e3db78a2665f` | Proposed; unchanged |
| `TP1-REAUTH-BIND-009` | Static-validation SHA-256 `4d4e42dc006d9fc63d007c47b823c3e5b33feddb2b8415e590f51ed1db450eca` | Proposed |
| `TP1-REAUTH-BIND-010` | Exact-launcher SHA-256 `a7cd0550fd3b4b8093fcb7837e9d6acfbd1b81b68aba3ea2c3a10c29167dc071` | Proposed |
| `TP1-REAUTH-BIND-011` | Runtime-contract SHA-256 `b2bc0284616389e112f22197b2c7a699a322bab6d29d0950dd39108b661555ff` | Proposed |
| `TP1-REAUTH-BIND-012` | Preflight SHA-256 `c5388d1370b8ce959966c5e175c784169bb2037499c3cee5c9c279e542ae565a` | Proposed |
| `TP1-REAUTH-BIND-013` | Static-evidence script SHA-256 `4751b3c119c3537352bb57cfa1b8270778623a8d9be40c6adb18654e8f515c63` | Proposed |
| `TP1-REAUTH-BIND-014` | Node `v22.23.1`, binary SHA-256 `2e3f1286a7eb3736346ed1803e458a0ff909e2b2d5bc746144dcb76970e9b99d` | Proposed; host-bound recheck required |
| `TP1-REAUTH-BIND-015` | pnpm `11.25.0`, entry SHA-256 `ff3224d46b47fbb24a7e9fe15fededef7e00892d07d4e376b6762d4899906bfd` | Proposed; hash-before-execution required |
| `TP1-REAUTH-BIND-016` | PostgreSQL OCI index digest `sha256:afc7e2d441324c0388fa80c3d24f733b4194a4eb7f47dd8ee2b08eb1a24a647c`, platform `linux/arm64/v8` | Proposed; future verification required |

Any changed revision, proof byte, inventory entry, dependency, launcher identity, image, role,
command, limit, or evidence contract expires the complete candidate binding.

## Superseded and preserved records

| Record | Disposition |
| --- | --- |
| WP-22/WP-23 proof revision `e824139...` and proof tree `48ef14b...` | Historical; superseded for any future attempt by the complete proposed reauthorization binding |
| WP-23 ineffective private draft | Historical; never effective and not reusable |
| WP-24 effective authorization | Expired stop evidence; may not authorize or resume anything |
| WP-24 run `wp24-2026-10-07-01` | Permanently closed without retry |
| WP-24 nine-file stop packet | Preserved as the authoritative Inconclusive record |
| WP-25 static validation and private materialization evidence | Preserved input to reauthorization; not runtime evidence |

## Execution-workspace and dependency analysis

Git does not place ignored `node_modules` into a new checkout. Therefore the earlier requirement for
a clean dedicated execution checkout and the requirement for exact present dependencies cannot be
satisfied together without an explicit dependency-provisioning decision.

| Option ID | Approach | Benefit | Risk/reversal cost | Recommendation |
| --- | --- | --- | --- | --- |
| `WP26-WS-001` | Create a dedicated checkout at `TP1-REAUTH-BIND-001`, then perform the exact offline/frozen/ignore-scripts restoration from the existing local content store under new authority. | Preserves revision isolation and produces auditable dependency metadata without registry use. | Requires a separately authorized local materialization step; stops if store content is missing or hashes drift. | Advance |
| `WP26-WS-002` | Reuse the current repository because its ignored dependencies are present. | Avoids restoration. | It is not a dedicated execution checkout and will contain later governance-document changes; weakens custody and reproduction boundaries. | Reject for the new attempt |
| `WP26-WS-003` | Install from a registry in the new checkout. | Simple conventional setup. | Violates the no-registry boundary, introduces mutable external state, and is unnecessary while accepted local content exists. | Reject |

`WP26-WS-001` is the recommended future path. WP-26 does not create the checkout or operate the
local store. A future owner statement must explicitly authorize that exact restoration and must
stop before preflight if any package, lockfile, metadata, or store-content check fails.

## Role readiness

| Role | Current state | Proposed future treatment |
| --- | --- | --- |
| Proof owner | Aung Myo Oo | Retain owner authorization and evidence-disposition authority |
| Primary operator | `/root`; operated the stopped WP-24 preflight | Retain only under a new exact execution package and new run identity |
| Prior reproduction validator | `/root/tp01_reproduction_validator`; performed no reproduction but reviewed the WP-24 stop | Treat the WP-24 role binding as expired; do not silently carry it into a new attempt |
| Future reproduction validator | No new identity authorized in WP-26 | Instantiate exactly one fresh independent identity only under later owner authority |
| Technical security reviewer | `/root/tp01_security_review`; independent reviewer of the stopped packet | May be proposed again, but must reconfirm read-only availability and independence for the new sealed packet |
| Production/real-data reviewer | Qualified human not yet assigned | Still mandatory before production deployment or any real/customer data; not a local synthetic-proof substitute |

WP-26 creates no subagent and no role attestation.

## Proposed future command boundary

All pnpm-backed stages must use the exact launcher. Cleanup and final verification must use exact
Node directly because dependencies may be removed during cleanup.

1. create a dedicated checkout at `TP1-REAUTH-BIND-001`;
2. instantiate and attest one fresh reproduction-validator identity;
3. under explicit future authority, restore dependencies using only
   `$TP01_NODE_BIN scripts/exact-pnpm.mjs install --offline --frozen-lockfile --ignore-scripts`;
4. bind a new run ID, roles, checkout, exact paths/hashes, limits, and expiry in a fresh effective
   private `authorization.json`;
5. run `$TP01_NODE_BIN scripts/exact-pnpm.mjs run preflight` once;
6. verify the accepted image and start the bounded database only under the future network/resource
   authorization;
7. reset the fixture, verify the 222-case matrix, and run the primary proof once through the exact
   launcher;
8. seal primary evidence, hand it off read-only, fresh-reset, and reproduce once through the exact
   launcher;
9. perform interim evidence verification through the exact launcher;
10. run `$TP01_NODE_BIN scripts/cleanup.mjs` under every outcome;
11. collect operator, reproduction-validator, and technical-security reviews;
12. run `$TP01_NODE_BIN scripts/evidence-verify.mjs --final`; and
13. stop for owner evidence disposition without selecting architecture or implementation.

Any deviation, missing dependency/store object, drift, unauthorized network need, stale role,
cross-tenant disclosure or mutation, unsafe evidence, resource breach, or cleanup failure stops the
new attempt. No automatic retry is permitted.

## Ineffective private draft

WP-26 prepares
`internal-local/work-packages/WP-26/checkpoint2-reauthorization-draft.json`, SHA-256
`8a7dd58652f06747c4fc85497a98fa120b5776559a6aa652db354ee4ec19a977`.

The draft has status `DRAFT_NOT_AUTHORIZED`, `effective: false`, and
`checkpoint2Authorized: false`. It deliberately leaves the fresh reproduction-validator identity
pending and records that the dedicated checkout does not yet exist or contain dependencies. It is
not named `authorization.json` and cannot satisfy the proof execution guard.

## Readiness verdict

| Input | Current state | Remaining gate |
| --- | --- | --- |
| WP-25 publication | Verified | Preserve exact revision/tree as one complete binding |
| Proof/static identities | Exact proposal recorded | Owner acceptance and future no-drift verification |
| Dedicated execution checkout | Absent | Later explicit creation authority |
| Dependencies in that checkout | Absent by construction | Later explicit exact offline restoration authority |
| Primary operator | Known prior operator | New package/run acceptance |
| Fresh reproduction validator | Absent | Later owner-authorized instantiation and attestation |
| Technical security reviewer | Prior independent identity exists | Reconfirmation for new evidence packet |
| Effective private authorization | Absent | Later owner authorization after exact roles/workspace exist |
| Runtime/image/environment evidence | Absent by design | Authorized preflight/runtime only |

Verdict: `READY_FOR_OWNER_DECISION`, but `NOT_READY_FOR_EXECUTION_AUTHORIZATION` until the owner
accepts a complete published binding, dedicated-checkout dependency plan, fresh reproduction role,
new effective authorization, and exact future execution boundary.

## Recommended owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP26-DEC-001` | Accept `TP1-REAUTH-BIND-001` through `TP1-REAUTH-BIND-016` only as the complete candidate binding for a new attempt. | Proposed |
| `WP26-DEC-002` | Supersede the old WP-22/WP-23 execution binding for future attempts while preserving it as historical governance. | Proposed |
| `WP26-DEC-003` | Preserve WP-24 as Inconclusive, expired, closed without retry, and never resumable; require a new run ID and authorization. | Proposed |
| `WP26-DEC-004` | Accept only the exact-launcher pnpm interfaces and direct-Node cleanup/final interfaces for any future attempt. | Proposed |
| `WP26-DEC-005` | Advance `WP26-WS-001`; reject current-checkout reuse and registry installation for the new attempt. | Proposed |
| `WP26-DEC-006` | Require exactly one fresh reproduction-validator identity under later owner authority; do not silently reuse the expired WP-24 role binding. | Proposed |
| `WP26-DEC-007` | Retain `/root` as proposed primary operator and `/root/tp01_security_review` as proposed technical reviewer only after new-package reconfirmation. | Proposed |
| `WP26-DEC-008` | Accept the private draft shape as complete but ineffective; never rename or copy it to `authorization.json`. | Proposed |
| `WP26-DEC-009` | Allow a later WP-27 owner statement, only after verified WP-26 publication, to authorize the dedicated checkout, fresh validator, exact offline restoration, new effective authorization, and one fail-closed checkpoint-2 attempt. | Proposed |
| `WP26-DEC-010` | Keep application coding, final architecture selection, infrastructure, deployment, provider accounts/cost, and customer/live data closed. | Proposed |

## Frozen WP-26 public inventory

Owner review and any later publication authorization apply only to these five paths:

1. `AGENTS.md`
2. `docs/00_PROJECT_START_HERE.md`
3. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
4. `docs/28_TP01_RUNTIME_DEPENDENCY_LAUNCHER_REMEDIATION.md`
5. `docs/29_TP01_REAUTHORIZATION_READINESS.md`

## Next gate

WP-26 stops at owner decision. Acceptance may authorize publication of only the frozen five-path
inventory. Publication does not authorize the recommended WP-27 actions; those require a later
explicit owner statement that names the revision, roles, dependency restoration, runtime sequence,
network boundary, evidence, cleanup, stop, non-scope, and no-retry controls.

## Owner acceptance, publication, and WP-27 activation

On 2026-10-07, the owner accepted `WP26-DEC-001` through `WP26-DEC-010`,
`TP1-REAUTH-BIND-001` through `TP1-REAUTH-BIND-016`, advanced `WP26-WS-001`, rejected
`WP26-WS-002/003`, and accepted the ineffective draft. The exact five public paths were committed
as `e6ab556 WP-26: accept TP-01 reauthorization readiness` and remotely verified at
`e6ab556642a2150acaa2002f77fd56b76f24ad6b`. WP-26 is `VERIFIED_AND_CLOSED`.

The owner separately activated WP-27 run `wp27-2026-10-07-01` under the exact dedicated-checkout,
fresh-role, offline-dependency, effective-authorization, runtime, evidence, review, cleanup,
network, stop, and non-scope controls recorded here. That authority applied only to the one new run
and granted no application, architecture, infrastructure, deployment, provider, or customer-data
authority.
