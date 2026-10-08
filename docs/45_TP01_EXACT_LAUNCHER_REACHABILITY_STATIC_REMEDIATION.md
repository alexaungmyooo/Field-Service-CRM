# TP-01 Exact Launcher and Reachability Command Contract Static Remediation

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted, published, and closed |
| Work package | `WP-42 Exact Launcher and Reachability Command Contract Remediation` |
| Governing decision | `DEC-172` |
| Base publication | `1901f32e157f0fb70af0570dbd739f41dd18a49a` |
| Prior proof tree | `ad27a2c754b2f7352b3beff314a8e3349758e17a` |
| Owner | Aung Myo Oo |
| Date | 2026-10-07 |
| Runtime execution | Not authorized |
| Publication | Verified as `0f2100b869bbb8e466c906b3a0d4213e827ef4cf` |

## Objective and boundary

WP-42 implements the accepted `WP41-REM-001` through `007` controls inside the disposable TP-01
proof. It corrects the exact launcher/recorded reachability-command mismatch, makes the launcher
contract independently testable without dependencies, reconciles the governing sequence and
final-verifier requirement, renews the complete proof inventory, and obtains exactly one fresh
independent static validation after freeze.

Dependency or package-manager operations, preflight, images, Docker/Compose runtime, pull-token
creation, containers, databases, services, SQL, fixtures, listeners, cleanup execution,
proof/reproduction, execution-evidence verification, application coding, final architecture
selection, infrastructure, deployment, provider accounts/cost, customer/live data, network, and
publication remain closed.

## Static diagnosis

WP-41 followed the accepted controlled sequence through healthy database start. The next mandatory
command, `$TP01_NODE_BIN scripts/exact-pnpm.mjs run runtime:verify-reachability`, was already
defined in the package manifest and exact command catalogue but absent from the launcher's approved
run-script set. The launcher correctly rejected the unlisted name, so the reachability script did
not start and the run stopped before database reset.

The defect is therefore a bounded static command-contract inconsistency. WP-42 does not reinterpret
the cleanup-time listener observation as reachability evidence and does not retry or modify WP-41.

## Remediation controls

| ID | Implemented control | State |
| --- | --- | --- |
| `WP42-REM-001` | Preserve WP-41 and its 18-entry packet as immutable Inconclusive evidence with no retry or result reinterpretation. | Accepted |
| `WP42-REM-002` | Add exactly `runtime:verify-reachability` to the approved launcher run-script set without adding another name or widening the exact two-argument shape. | Accepted |
| `WP42-REM-003` | Extract the command-classification and dependency-marker rules into a dependency-free contract module used by the real launcher. | Accepted |
| `WP42-REM-004` | Require every launcher-approved script to exist in `package.json` and require the reachability script to resolve exactly to `node scripts/runtime-reachability.mjs`. | Accepted |
| `WP42-REM-005` | Prove exact-command acceptance and reject extra arguments, whitespace drift, underscore substitution, and the direct-Node-only final-verifier name. | Accepted |
| `WP42-REM-006` | Preserve fail-closed missing-dependency behavior and before/after dependency-marker integrity enforcement. | Accepted |
| `WP42-REM-007` | Reconcile the controlled order as database start, exact three-view reachability gate, then database reset; retain cleanup and final verification as direct exact-Node interfaces. | Accepted |
| `WP42-REM-008` | Run exact-Node syntax and dependency-free tests, renew the full proof inventory, and obtain exactly one fresh independent static validator after freeze. | Accepted; independent `PASS` |

## Exact command-contract effect

The launcher now accepts `run runtime:verify-reachability` under the same strict two-argument rule
as every other approved script. It continues to reject unlisted names, extra arguments, and altered
spellings. Before any dependency-reading command can inspect or invoke pnpm, the launcher requires
an existing dependency directory and verifies that every approved name is backed by the package
manifest. After the child returns, the launcher compares the exact dependency-marker state and
fails if it changed.

Neither cleanup nor final complete-packet verification is routed through pnpm. They remain direct
exact-Node commands because cleanup intentionally removes dependencies and the final verifier must
not rematerialize them. A later separately authorized run must still produce accepted,
run/package-bound three-view reachability evidence before database reset or final PASS.

## Static validation

The authoritative absolute Node v22.23.1 launcher passed syntax checks for the contract module,
contract test, and real launcher. The built-in-only contract test passed the exact full allowlist,
all prior command shapes, exact reachability-command acceptance, variant rejection, package
agreement, missing-dependency failure, unchanged marker state, and changed-marker rejection.

The hashing command then renewed a complete 62-file non-dependency proof inventory. No dependency,
package-manager, preflight, image, Docker/Compose, container, database, service, listener, cleanup,
evidence-verification, proof/reproduction, network, or external-system command ran.

## Renewed binding

| Binding ID | Item | SHA-256 / value |
| --- | --- | --- |
| `WP42-BIND-001` | WP-41 base publication | `1901f32e157f0fb70af0570dbd739f41dd18a49a` |
| `WP42-BIND-002` | Prior proof tree | `ad27a2c754b2f7352b3beff314a8e3349758e17a` |
| `WP42-BIND-003` | Proof file count | `62` |
| `WP42-BIND-004` | Artifact inventory | `3aed6426332e6b50ae566184d1efa8c9a762819bafc5a817d6530f5ea7377d6f` |
| `WP42-BIND-005` | Proof content set | `4bbea5208cc343d79576437537873df07ad9f76019096b536d92b5110c2b322e` |
| `WP42-BIND-006` | Package manifest | `eaf81dc87f1afdf95f42880bcfb60ce744b7ba70e3856d89866905bc510dffc0` — unchanged |
| `WP42-BIND-007` | Lockfile | `752d4154434adc69d6f18021555a368dbfd2d764bf7ed6c37810371b93f6e1af` — unchanged |
| `WP42-BIND-008` | 222-case manifest | `de4e412a27f35bc96a3858174bcf186ae02f84c08a0e94b28771e3db78a2665f` — unchanged |
| `WP42-BIND-009` | Proof README | `ed3bef93ba3ca304f444880c7dd28bd365b9e630794cb6d20a631954771da46a` |
| `WP42-BIND-010` | Exact launcher | `4f4d8d4751e9a295c8b890a4f7e89d6653e363ec6a81b0ceef7b088491a1cf9a` |
| `WP42-BIND-011` | Exact launcher contract | `41b39f515e7a50f5dfec4d6ef23f4414b8e60629333392f2d94d0ca4a8d1b205` |
| `WP42-BIND-012` | Exact launcher contract test | `efde8268280a93d2882ecc4df1dc40c0e0699bf3287309f343becdc8b5e4dc9e` |
| `WP42-BIND-013` | Reachability runner | `5791a504f55f327a2fc8c0a46a758f026fc980371d9de71688406ced02110140` — unchanged |
| `WP42-BIND-014` | Database-reset reachability gate | `11d1e439049a686689591b2e415da66ca0264f323febd5769c2aba83e6082824` — unchanged |
| `WP42-BIND-015` | Final evidence verifier | `b3d93ea7b02bcd77b53bd27abe549e4e4969a3d5ec1a44d4289d446d059544fe` — unchanged |
| `WP42-BIND-016` | Cleanup | `91f6fd348db531edfa10b5f28ee2a76337f3af09fa3913c4ad524bd1fd8917ce` — unchanged |

These are static candidate bindings. They are not execution authorization, runtime evidence,
security acceptance, or an architecture decision.

## Independent validation

Exactly one fresh independent read-only static validator, `/root/wp42_static_validator`, returned
`PASS` with zero critical, high, medium, or low findings. It independently confirmed exactly nine
public paths, empty staging, `git diff --check`, preservation of all eleven prior approved scripts,
addition of exactly `runtime:verify-reachability`, and no widening of the run, install, list, or
version command shapes.

Using the exact Node v22.23.1 binary, the validator reproduced all three syntax checks and the
dependency-free contract test. An independent proof walk matched all 62 stored paths, byte counts,
and hashes with zero difference. It reproduced the artifact-inventory digest, canonical
content-set digest, and `WP42-BIND-001` through `016`, and found the governing documents and proof
README consistent.

This was static/source validation only. No pnpm child, dependency, preflight, image,
Docker/Compose, reachability, cleanup, evidence verification, proof/reproduction, network, or
runtime behavior was exercised. The validator made zero public, proof, private, Git, dependency,
package-manager, Docker, runtime, network, cleanup, proof, or reproduction mutation; only
self-cleaned operating-system temporary fixtures existed transiently.

## Recommended owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP42-DEC-001` | Accept `WP42-REM-001` through `008` as the bounded correction of `WP41-DEV-001`. | Accepted |
| `WP42-DEC-002` | Accept `WP42-BIND-001` through `016` only as a static proof candidate binding. | Accepted |
| `WP42-DEC-003` | Accept the single fresh independent static result only after its identity, methods, findings, limitations, and zero-mutation statement are recorded. | Accepted |
| `WP42-DEC-004` | Preserve WP-41 as immutable Inconclusive evidence and prohibit retry or reinterpretation. | Accepted |
| `WP42-DEC-005` | After verified WP-42 publication, activate WP-43 for exact published rebinding and reauthorization-readiness documentation only. | Accepted |
| `WP42-DEC-006` | Keep dependencies, preflight, images, Docker/Compose runtime, containers, databases, services, cleanup execution, proof/reproduction, application coding, final architecture selection, infrastructure, deployment, provider accounts/cost, customer/live data, and network closed. | Accepted |

## Frozen WP-42 public inventory

Owner review and any later publication authorization apply only to these nine paths:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/21_TP01_EXACT_EXECUTION_CONTRACT.md`
4. `docs/44_TP01_CONTROLLED_REACHABILITY_EXECUTION_RESULT.md`
5. `docs/45_TP01_EXACT_LAUNCHER_REACHABILITY_STATIC_REMEDIATION.md`
6. `proofs/tp-01-tenant-boundary/README.md`
7. `proofs/tp-01-tenant-boundary/scripts/exact-pnpm.mjs`
8. `proofs/tp-01-tenant-boundary/scripts/exact-pnpm-contract.mjs`
9. `proofs/tp-01-tenant-boundary/scripts/exact-pnpm-contract.test.mjs`

Private authorization, static evidence, validator records, and the renewed artifact inventory
remain ignored under `internal-local/` and must not be published.

## Acceptance, publication, and next gate

The owner accepted all eight remediation controls, all sixteen bindings, all six recommendations,
the renewed 62-file inventory, and the independent static-validation `PASS`. The exact nine-path
inventory was committed as `0f2100b WP-42: accept launcher reachability remediation` and pushed to
`origin/main`; local `HEAD`, cached `origin/main`, and live remote main matched
`0f2100b869bbb8e466c906b3a0d4213e827ef4cf`. The committed proof tree is
`1777020c393fd3a63134eac99d878b66261523eb`. WP-42 is `VERIFIED_AND_CLOSED`.

WP-43 is active for exact published rebinding and reauthorization-readiness owner-decision
documentation only. Execution and WP-43 publication remain closed.
