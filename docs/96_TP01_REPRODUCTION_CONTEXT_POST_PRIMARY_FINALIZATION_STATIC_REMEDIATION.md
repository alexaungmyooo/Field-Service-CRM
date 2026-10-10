# WP-93 TP-01 Reproduction Context and Post-Primary Finalization Static Remediation

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — exact publication authorized |
| Work package | `WP-93 Reproduction Context and Post-Primary Finalization Static Remediation` |
| Governing decision | `DEC-228` — Accepted |
| Owner | Aung Myo Oo |
| Base publication | `078e1aa2b097237e8b667ef087f4ea1b036309ad` |
| Application coding | Not authorized |
| Proof execution | Not authorized |
| Commit and push | Authorized only for the exact eighteen-path WP-93 inventory |
| Last updated | 2026-10-10 |

## Objective and boundary

WP-93 statically remediates only the two control gaps exposed by immutable WP-92: reproduction-
validator Docker-context readiness was not established in that validator's own execution context,
and the accepted finalization tools could not truthfully close a stop occurring after a verified
PRIMARY handoff but before reproduction reset or proof.

Authorized work is limited to the disposable TP-01 proof, governing documentation, ignored private
static controls/evidence, dependency-free tests, affected hash renewal, and one fresh independent
read-only static validation. Dependencies, credentials or environments, preflight, images,
Docker/Compose runtime, containers, databases, services, cleanup execution, proof/reproduction,
application coding, architecture selection, infrastructure, deployment, provider accounts/cost,
network access, and customer/live data remain closed.

## Immutable input

WP-92 remains `INCONCLUSIVE_CLOSED_NO_RETRY`. Its run, 222/222 preliminary PRIMARY observations,
verified handoff, reproduction-context reachability stop, three reviews, cleanup, residual checks,
21-entry stop seal, 32-entry inventory, and archived checkout are immutable evidence. WP-93 does
not repair, resume, reinterpret, or re-run WP-92.

## Accepted remediations

| ID | Remediation | State |
| --- | --- | --- |
| `WP93-REM-001` | Require fresh validator-context readiness before PRIMARY and again before REPRODUCTION, each bound to the exact run, stage, validator, UID, Docker executable path/hash, local context, endpoint, and client/server versions. | Accepted |
| `WP93-REM-002` | Require a separate collaboration-authenticated attestation over each readiness receipt because the local probe cannot authenticate task identity. | Accepted |
| `WP93-REM-003` | Preserve raw PRIMARY `deviations.json` as sealed `primary-deviations.json`; exclude mutable live `deviations.json` and `runtime.env` from the handoff seal. | Accepted |
| `WP93-REM-004` | Require the live deviation ledger to be an append-only extension of the immutable PRIMARY snapshot. | Accepted |
| `WP93-REM-005` | Create reproduction reachability failure evidence exclusively and prohibit same-run overwrite or retry. | Accepted |
| `WP93-REM-006` | Recognize exactly one post-PRIMARY reproduction-reachability stop and finalize it only as `INCONCLUSIVE` with exit code 2 after verified handoff, cleanup, and three Inconclusive reviews. | Accepted |
| `WP93-REM-007` | Keep zero-stop complete independent reproduction as the sole final-verifier PASS path. | Accepted |
| `WP93-REM-008` | Add dependency-free positive and fail-closed tests and renew every affected proof hash and inventory binding. | Accepted |

## Accepted bindings

| ID | Binding | State |
| --- | --- | --- |
| `WP93-BIND-001` | Base publication is exactly `078e1aa2b097237e8b667ef087f4ea1b036309ad`. | Accepted |
| `WP93-BIND-002` | WP-92 and its private evidence remain immutable and non-resumable. | Accepted |
| `WP93-BIND-003` | Readiness stages are exactly `PRE_PRIMARY` and `PRE_REPRODUCTION`. | Accepted |
| `WP93-BIND-004` | Each readiness receipt is single-use and valid for at most 900 seconds. | Accepted |
| `WP93-BIND-005` | Readiness binds the proposed reproduction-validator identity, process UID, absolute Docker executable path and SHA-256, `desktop-linux`, local Unix endpoint, and Docker client/server `29.7.2`. | Accepted |
| `WP93-BIND-006` | Readiness permits only context inspection and client/server version handshake. | Accepted |
| `WP93-BIND-007` | Readiness permits no network, registry, image, runtime-resource, credential, or proof access. | Accepted |
| `WP93-BIND-008` | Effective execution authorization and final verification both require each exact receipt; each receipt also requires an exact-hash external task attestation with collaboration-authenticated identity and zero mutation. | Accepted |
| `WP93-BIND-009` | PRIMARY handoff seals raw `primary-deviations.json`, not a metadata-only surrogate. | Accepted |
| `WP93-BIND-010` | The handoff seal excludes live `deviations.json` and `runtime.env`. | Accepted |
| `WP93-BIND-011` | Accepted deviations cannot change after handoff; existing operational stops cannot be removed, reordered, or mutated. | Accepted |
| `WP93-BIND-012` | The only added stop classification is `REPRODUCTION / RUNTIME_REACHABILITY / RUNTIME_REACHABILITY_FAILED / runtime-reachability-failure.json`. | Accepted |
| `WP93-BIND-013` | The reachability-failure artifact uses exclusive creation and blocks same-run overwrite/retry. | Accepted |
| `WP93-BIND-014` | The recognized stop branch reads PRIMARY reachability, recomputes every byte/hash and the aggregate for the exact 16-entry verified handoff, and rejects every reproduction result, audit, state, and comparison artifact. | Accepted |
| `WP93-BIND-015` | The recognized stop branch requires mandatory cleanup and operator, reproduction-validator, and technical-security reviews that each recommend `INCONCLUSIVE` and bind to their authorization role identities. | Accepted |
| `WP93-BIND-016` | The recognized stop branch emits no PASS claim and exits 2. | Accepted |
| `WP93-BIND-017` | Zero operational stops and complete matching independent reproduction remain the only PASS route. | Accepted |
| `WP93-BIND-018` | Public and private static tests run with exact Node.js `v22.23.1` and no dependency or runtime command. | Accepted |
| `WP93-BIND-019` | All affected artifact SHA-256 and canonical proof content-set bindings are renewed after candidate freeze. | Accepted |
| `WP93-BIND-020` | Exactly one fresh independent static validator reviews the frozen candidate after root validation. | Accepted |
| `WP93-BIND-021` | WP-93 grants no execution, application, architecture, infrastructure, deployment, provider/cost, network, or customer-data authority. | Accepted |

## Accepted owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP93-DEC-001` | Accept `DEC-228` and `WP93-REM-001` through `008`. | Accepted |
| `WP93-DEC-002` | Accept `WP93-BIND-001` through `021` and the renewed proof inventory/hashes exactly as recorded after final validation. | Accepted |
| `WP93-DEC-003` | Accept the two-stage validator-context readiness and external-attestation contract as prospective control only. | Accepted |
| `WP93-DEC-004` | Accept raw PRIMARY deviation custody and append-only live stop accounting. | Accepted |
| `WP93-DEC-005` | Accept the exact reproduction-reachability Inconclusive branch and preserve complete reproduction as the sole PASS path. | Accepted |
| `WP93-DEC-006` | Accept root and fresh independent static-validation results after candidate freeze. | Accepted |
| `WP93-DEC-007` | Authorize commit and push only through a later explicit owner acceptance of the final frozen inventory. | Accepted |

## Validation and next gate

Root static validation uses exact Node.js `v22.23.1`. All 57 proof `scripts/*.mjs` syntax checks and
all 20 dependency-free `scripts/*.test.mjs` suites pass. The five private control modules pass
syntax and the consolidated private mocked suite passes. The renewed proof inventory contains 90
sorted unique entries. Artifact-inventory SHA-256 is
`38b1619153b4802ce8effd4e92984bdf22dff370f3b9a35bca5d235a010d09ad`; canonical no-terminal-LF
content-set SHA-256 is `c0e6bd87042e31a2e44a6a816b4803bb0918073b3b0f169695d40e067f5d0af4`.

The exact frozen public/proof candidate is 18 paths:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/95_TP01_CONTROLLED_HOST_ACCESS_REMEDIATED_EXECUTION_RESULT.md`
4. `docs/96_TP01_REPRODUCTION_CONTEXT_POST_PRIMARY_FINALIZATION_STATIC_REMEDIATION.md`
5. `proofs/tp-01-tenant-boundary/README.md`
6. `proofs/tp-01-tenant-boundary/scripts/audit-detail-parameter-contract.mjs`
7. `proofs/tp-01-tenant-boundary/scripts/deviation-contract.mjs`
8. `proofs/tp-01-tenant-boundary/scripts/deviation-contract.test.mjs`
9. `proofs/tp-01-tenant-boundary/scripts/evidence-verify.mjs`
10. `proofs/tp-01-tenant-boundary/scripts/execution-authorization.mjs`
11. `proofs/tp-01-tenant-boundary/scripts/handoff-stop-contract.mjs`
12. `proofs/tp-01-tenant-boundary/scripts/handoff-stop-contract.test.mjs`
13. `proofs/tp-01-tenant-boundary/scripts/post-primary-stop-contract.mjs`
14. `proofs/tp-01-tenant-boundary/scripts/post-primary-stop-contract.test.mjs`
15. `proofs/tp-01-tenant-boundary/scripts/reproduction-context-contract.mjs`
16. `proofs/tp-01-tenant-boundary/scripts/reproduction-context-contract.test.mjs`
17. `proofs/tp-01-tenant-boundary/scripts/runtime-reachability.mjs`
18. `proofs/tp-01-tenant-boundary/scripts/runtime-reachability-remediation.test.mjs`

The ignored private candidate is exactly the six paths recorded by
`internal-local/work-packages/WP-93/static-scope.md`. Static validation invokes no probe, dependency,
credential, environment, preflight, image, Docker/Compose, container, database, service, cleanup,
evidence verifier, proof, reproduction, or network operation. No runtime or proof result is
claimed.

Fresh independent validator `/root/wp93_static_validator` first identified two High and one Medium
control gap. After remediation and renewed freeze, the same validator reproduced the exact
18-path scope, 90-entry inventory, both aggregate hashes, 57/57 proof syntax checks, 20/20 proof
suites, 5/5 private syntax checks, and the private mocked suite. Final result: `PASS`; Critical 0,
High 0, Medium 0, Low 0. It changed no candidate, runtime, dependency, Git, or external state.

The owner accepted the exact remediations, bindings, decisions, hashes, validation, and frozen
inventory and authorized commit and push only for the eighteen listed paths. Publication does not
authorize execution or reauthorization. After verified publication, WP-94 may begin owner-decision
readiness documentation only under a separate uncommitted gate.
