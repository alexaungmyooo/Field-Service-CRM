# TP-01 Execution Identities and Checkpoint-2 Authorization Decision

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted for publication — checkpoint 2 not yet activated |
| Work package | `WP-23 TP-01 Execution Identity Instantiation and Checkpoint-2 Authorization` |
| Governing decisions | `DEC-128`, `DEC-147`, `DEC-150`, `DEC-152`, `DEC-153` |
| Accepted binding | `TP1-REBIND-001` through `TP1-REBIND-010` |
| Governance publication | `291aedd07c35991c7c677d9e7f94f5f3bc444e61` |
| Owner | Aung Myo Oo |
| Date | 2026-10-07 |
| TP-01 execution | Not authorized |

## Objective

Freeze the exact checkpoint-2 role identities, independence attestations, proposed execution
checkout, private authorization shape, network/dependency boundary, and owner decision needed
before a later package may create an effective authorization and execute TP-01.

WP-23 is documentation and private authorization preparation only. It does not create the effective
`authorization.json`, prepare an execution checkout, run preflight, acquire an image, use a
container/database/service, execute or reproduce TP-01, or accept a proof or architecture result.

## Published and proof identities

| ID | Exact identity | State |
| --- | --- | --- |
| `TP1-EXEC-BIND-001` | Accepted proof revision `e824139d3050e98c06e39d3663ddcae6ac1d02db` | Accepted by WP-22 |
| `TP1-EXEC-BIND-002` | Proof Git tree `48ef14bb579d0e4b620dad7c7ef6f8c409445050` | Accepted by WP-22 |
| `TP1-EXEC-BIND-003` | WP-22 governance publication `291aedd07c35991c7c677d9e7f94f5f3bc444e61` | Verified |
| `TP1-EXEC-BIND-004` | Artifact inventory `adc82a94eb98d4cd76227de3d963c80e386cf5c7927be3487b2cb5a54ce73547` | Accepted by WP-22 |
| `TP1-EXEC-BIND-005` | Content set `ed1f8c66a7d37ef5921dd5bcf81a13d6fb305be64bd45a27fc6c1dee4d05b7d0` | Accepted by WP-22 |

The current documentation revision is not the accepted proof revision. Any later execution must use
a separately authorized clean checkout whose `HEAD` is exactly `TP1-EXEC-BIND-001`, or the proof's
fail-closed revision check will and must stop. WP-23 does not create that checkout.

## Exact role proposal and attestations

| Role | Canonical identity | WP-23 state |
| --- | --- | --- |
| Proof owner | Aung Myo Oo | Identified; owns authorization and final evidence disposition |
| `TP1-OPERATOR-PRIMARY` | `/root` | Accepted for the exact later execution turn only |
| `TP1-VALIDATOR-REPRO` | `/root/tp01_reproduction_validator` | Accepted fresh identity with recorded independent attestation |
| TP-01 technical security reviewer | `/root/tp01_security_review` | Previously assigned; separate read-only post-execution role |
| Production/real-data security reviewer | Named qualified human | Deferred mandatory gate before production or real/customer data |

The reproduction-validator attested that it:

- did not author or materialize TP-01;
- did not act as primary operator, WP-19 validator, WP-21 validator, or security reviewer;
- accepts the future role only under an exact later owner-authorized checkpoint-2 contract;
- requires sealed primary evidence handoff and a fresh reset before reproduction; and
- performed no prohibited action during identity instantiation.

## Prepared private authorization model

WP-23 prepares an ignored private draft named `checkpoint2-authorization-draft.json`. It is not
named `authorization.json`, has status `DRAFT_NOT_AUTHORIZED`, is explicitly ineffective, and
cannot satisfy the proof's execution guard.

The draft binds the accepted revision/tree/inventory/content/package/lock/manifest/static/image and
runtime values; all exact roles; the 13-step command/evidence order; `TP1-LIMIT-001` through `010`;
mandatory cleanup; review disposition propagation; stop conditions; and every non-scope closure.
Its hash may identify the proposal, but owner acceptance must precede generation of a fresh
effective record in a newly authorized private run directory.

Prepared private identities:

- reproduction-validator attestation SHA-256
  `26833e8d6ecbf8bc086075cb327fb6e422a06c3152b1a2c5a7054ecc7681373b`; and
- ineffective checkpoint-2 authorization draft SHA-256
  `ecbbce37c1cbc9149b810afb303d47c6ee1f33f39228503f34f0484b8b955f03`.

## Proposed later checkpoint-2 boundary

A later owner authorization would need to permit, in order:

1. create a clean, dedicated local execution checkout at accepted proof revision
   `e824139d3050e98c06e39d3663ddcae6ac1d02db`;
2. revalidate every accepted binding, exact identity, version, port, limit, and absence condition;
3. create a new private run directory and effective `authorization.json` with status
   `ACCEPTED_FOR_EXECUTION`;
4. run `pnpm run preflight`;
5. run `pnpm run db:verify-image`, allowing Docker-registry retrieval only if the accepted digest
   is not already local;
6. run `docker compose up -d --wait postgres`, `pnpm run db:reset`, and
   `pnpm run matrix:verify`;
7. run `pnpm run proof:run` once as `/root`, seal primary evidence, and hand it off read-only;
8. perform a fresh `pnpm run db:reset`, then run `pnpm run proof:reproduce` once as
   `/root/tp01_reproduction_validator`;
9. run `pnpm run evidence:verify` for an interim, never-final disposition;
10. run `pnpm run cleanup` under Pass, Fail, Inconclusive, abort, timeout, or any stop;
11. obtain the operator, reproduction-validator, and `/root/tp01_security_review` reviews;
12. run `pnpm run evidence:verify-final`; and
13. stop for owner evidence disposition without selecting architecture or implementation.

No dependency installation or change is proposed. Existing proof-only dependencies must exactly
match the accepted lock and inventory; absence or drift stops checkpoint 2 and requires a new owner
decision. npm registry access remains prohibited. Proof-run networking remains loopback plus the
isolated local Docker bridge only.

## Stop and expiry conditions

The authorization must fail closed before or during execution for any revision/tree/file/hash,
dependency, image/platform, runtime, role, command, limit, port, network, case/oracle, evidence,
review, cleanup, or scope mismatch. It must also stop for any customer/live data, cross-tenant
disclosure or mutation, unsafe evidence, missing sealed handoff, uncontrolled retry, timeout, or
unremovable residue.

Any changed accepted value, task identity, or command expires the proposed authorization. A stopped
or failed run grants no retry; a new explicit owner authorization is required after evidence and
cleanup are recorded.

## Readiness decision

| Input | State | Remaining gate |
| --- | --- | --- |
| Accepted proof binding | Complete | Reverify in clean exact-revision checkout |
| Governance publication | Verified | Preserve as decision provenance, not execution `HEAD` |
| Primary operator | Proposed exact identity | Owner acceptance and later exact execution turn |
| Reproduction validator | Fresh identity and attestation recorded | Owner acceptance |
| Security reviewer | Assigned | Reconfirm read-only availability after sealed evidence exists |
| Private authorization draft | Prepared and ineffective | Owner decision; later generate effective record |
| Dependencies | Existing reviewed set only | Verify exact presence; stop if absent/drifted |
| Image/runtime/environment | Static identities only | Later image verification and preflight |
| Runtime evidence | Absent by design | Authorized checkpoint 2 only |

Verdict: execution identities and authorization proposal are `READY_FOR_OWNER_DECISION`.
Checkpoint 2 remains `NOT_AUTHORIZED`.

## Accepted owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP23-DEC-001` | Accept `/root` as the exact later `TP1-OPERATOR-PRIMARY` identity. | Accepted |
| `WP23-DEC-002` | Accept `/root/tp01_reproduction_validator` as the fresh exact `TP1-VALIDATOR-REPRO` identity and accept its independence attestation. | Accepted |
| `WP23-DEC-003` | Preserve `/root/tp01_security_review` as the separate local synthetic technical reviewer and the qualified-human production/real-data gate. | Accepted |
| `WP23-DEC-004` | Accept `TP1-EXEC-BIND-001` through `005` and require a clean dedicated checkout at the accepted proof revision for execution. | Accepted |
| `WP23-DEC-005` | Accept the private draft shape as authorization-ready but ineffective; never treat it as `authorization.json`. | Accepted |
| `WP23-DEC-006` | Accept the 13-step later command/evidence/review/cleanup boundary and no-retry fail-closed behavior. | Accepted |
| `WP23-DEC-007` | Permit a later checkpoint-2 package to use Docker-registry retrieval only for the accepted image digest if absent; prohibit npm and all proof-run internet access. | Accepted |
| `WP23-DEC-008` | Prohibit dependency installation/change; stop and return for owner decision if accepted dependencies are absent or drifted. | Accepted |
| `WP23-DEC-009` | Require a separate explicit owner authorization before creating the effective private record, execution checkout, or running any checkpoint-2 command. | Accepted |
| `WP23-DEC-010` | Keep application coding, final architecture selection, provider accounts/cost, infrastructure, deployment, and customer/live data closed. | Accepted |

## Owner acceptance

On 2026-10-07, the owner accepted `WP23-DEC-001` through `WP23-DEC-010`,
`TP1-EXEC-BIND-001` through `TP1-EXEC-BIND-005`, the reproduction-validator attestation, and the
ineffective private authorization draft exactly as recorded. Publication is authorized only for
the frozen seven-path WP-23 public inventory. Checkpoint 2 activates only after verified
publication under the separately stated WP-24 boundary.

## Next gate

After verified WP-23 publication, WP-24 may create the effective private authorization, enter the
accepted clean checkout, and run the exact accepted checkpoint-2 sequence. Until remote
publication is verified, no effective authorization, checkout, preflight, dependency, image,
container, database, service, proof, application, architecture, infrastructure, deployment, or
customer/live-data action is authorized.

## WP-24 outcome and superseded launcher assumption

WP-24 stopped at its first preflight before any security measurement because the ambient launcher
selected Node versions outside the accepted contract. Its later pnpm final-verifier interface also
materialized dependencies from the local store before the verifier ran. The run is closed
`INCONCLUSIVE` without retry, and its ambient `pnpm run ...` command assumption is superseded for
future consideration by the WP-25 exact-launcher proposal in document 28.
