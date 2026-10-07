# TP-01 Conditional Image Verification and Registry-Gate Static Remediation

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted, published, and closed — independent static validation PASS |
| Work package | `WP-34 Conditional Image Verification and Registry-Gate Remediation` |
| Governing decisions | `DEC-164`, `WP33-REM-001` through `WP33-REM-007` |
| Published base | `56d3a1f5c59080ab87fa82cdc4a67d418983b75c` |
| Owner | Aung Myo Oo |
| Date | 2026-10-07 |
| Proof execution | Not authorized |
| Publication | Verified at `7fd5f57a2c121dbaa35995501e019a8609a6b0a3` |

## Objective and authority boundary

WP-34 corrects the static image-verification control exposed by `WP33-DEV-001`. The verifier must
use an already-present exact accepted image without registry access and must make a registry pull
reachable only when the image is absent and a matching private, run-bound pull token is accepted.

Authorized work is limited to the disposable TP-01 proof, governing documentation, private static
evidence, complete hash renewal, and exactly one fresh independent static validator. Dependencies,
package-manager operations, preflight, Docker/Compose, image inspection or retrieval, containers,
databases, services, cleanup execution, proof/reproduction, application coding, architecture
selection, infrastructure, deployment, provider accounts/cost, and customer/live data remain
closed.

## Implemented remediation

| ID | Control | Result |
| --- | --- | --- |
| `WP34-REM-001` | Inspect the exact accepted digest locally before making any retrieval decision. | Implemented statically |
| `WP34-REM-002` | Select `LOCAL_CACHE` without a token or registry access when the accepted local inspection exists. | Implemented statically |
| `WP34-REM-003` | When absent, require package/run/image/platform authorization plus a private token whose SHA-256 matches the run-bound authorization record. | Implemented statically |
| `WP34-REM-004` | Remove the pull token from the Docker child environment and redact its value from failed-child diagnostics. | Implemented statically |
| `WP34-REM-005` | After either path, reject digest, OS, architecture, or variant drift. | Implemented statically |
| `WP34-REM-006` | Record minimized package/run/source/network/local-presence/digest/platform/inspection evidence without recording the token. | Implemented statically |
| `WP34-REM-007` | Make final evidence verification enforce the new schema and source/network consistency. | Implemented statically |
| `WP34-REM-008` | Cover local-present, absent-with-token, absent-without-token, wrong-token, wrong-run, digest-mismatch, platform-mismatch, and evidence-consistency cases with built-in-only tests. | Implemented statically |

The cleanup interface was not changed. It remains independent of image-verification completion and
does not remove the accepted shared image cache.

## Static validation

Exact Node `v22.23.1` syntax checks passed for all changed and new scripts. The dependency-free
image contract, command-diagnostic, and Compose-contract tests passed. No dependency, preflight,
Docker/Compose, image, container, database, service, cleanup, evidence-verification, proof, or
reproduction command ran.

## Renewed binding

The proof inventory contains 57 non-dependency files.

| Binding ID | Item | SHA-256 / value |
| --- | --- | --- |
| `WP34-BIND-001` | Proof file count | `57` |
| `WP34-BIND-002` | Artifact inventory | `8867a18fd7dfbba0d74450b5218b95546b1f9230234bd653a7e9c299db0e484a` |
| `WP34-BIND-003` | Proof content set | `fb02cb587008a159bcd80b5b9f43f045f57783a83f07ee2023caacf84731ce2b` |
| `WP34-BIND-004` | Package manifest | `d10a8e2e5bfeb170cfb6f29485a5376689ad4e73dcbc68c62cc7348ffc4dcc1e` — unchanged |
| `WP34-BIND-005` | Lockfile | `752d4154434adc69d6f18021555a368dbfd2d764bf7ed6c37810371b93f6e1af` — unchanged |
| `WP34-BIND-006` | 222-case manifest | `de4e412a27f35bc96a3858174bcf186ae02f84c08a0e94b28771e3db78a2665f` — unchanged |
| `WP34-BIND-007` | Proof README | `3cf59fbed3898d9c74e5774d6f51614d6bcd95f732b39bd41eba470e81150c3d` |
| `WP34-BIND-008` | Image verifier | `4f3c1bb68f2144c4c2a51c45a6651df7e8bf2701c3a72a71e078b51fb9411e78` |
| `WP34-BIND-009` | Image contract | `6617566201082fc907a025468e4261df5fe19368bd3b8fdebbb74fd79e9b52c3` |
| `WP34-BIND-010` | Image contract test | `afcbdb2bdde259b028fa5bfb2a3a88903bb2335fdd0bb7ad93c43076b46935ea` |
| `WP34-BIND-011` | Execution authorization | `6fb06ce12ce572b5856ec05d58084d19c466a15eb2ae1ab43bc6870c0dc807e8` |
| `WP34-BIND-012` | Command wrapper | `5448d35b1f40b336c1f46b11a901f9c2eb50baabfae9e1f2aad094ccdcb7f587` |
| `WP34-BIND-013` | Command test | `a04d01d07fc573db14b8bf5f0054ccc01c648b6efe842d6de4a4798f0b6eade8` |
| `WP34-BIND-014` | Evidence verifier | `0276198b6a0f1c269ef2dcfd01ab3ee3f13fa1fcef1053d49927f4254c80b921` |
| `WP34-BIND-015` | Environment example | `d7aab6853127a7626c2f414ff6588df06d9458325e72331957310f89660f58dd` |

These are static candidate bindings. They are not execution authorization, runtime evidence, or an
architecture decision.

## Independent validation

Exactly one fresh independent read-only static validator, `/root/wp34_static_validator`, returned
`PASS` with no high, medium, or low finding and zero mutation. The validator reproduced all 57
inventory entries, byte counts, file hashes, the artifact-inventory and content-set hashes, and the
unchanged package, lockfile, case-manifest, and cleanup hashes. Exact syntax and all three permitted
dependency-free tests passed. The validator confirmed the exact fourteen-path public scope and
that nothing is staged.

The review was static only. It ran no dependency, package-manager, preflight, Docker/Compose,
image, container, database, service, cleanup, evidence-verification, proof/reproduction, network,
or external-system action.

## Recommended owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP34-DEC-001` | Accept `WP34-REM-001` through `WP34-REM-008` as the bounded correction of `WP33-DEV-001`. | Accepted |
| `WP34-DEC-002` | Accept `WP34-BIND-001` through `WP34-BIND-015` only as a static proof candidate binding. | Accepted |
| `WP34-DEC-003` | Accept the independent static result only after its exact identity, method, findings, limitations, and zero-mutation statement are recorded. | Accepted |
| `WP34-DEC-004` | Preserve WP-33 as immutable Inconclusive evidence and prohibit retry or reinterpretation. | Accepted |
| `WP34-DEC-005` | Require a later owner package to bind a published revision/tree, fresh execution roles, effective authorization, and private pull token before any runtime action can be considered. | Accepted |
| `WP34-DEC-006` | Keep dependencies, preflight, images, containers, databases, services, cleanup execution, proof/reproduction, application coding, final architecture selection, infrastructure, deployment, provider accounts/cost, and customer/live data closed. | Accepted |

## Frozen WP-34 public inventory

Owner review and any later publication authorization apply only to these fourteen paths:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/21_TP01_EXACT_EXECUTION_CONTRACT.md`
4. `docs/36_TP01_CONTROLLED_DIAGNOSTIC_EXECUTION_RESULT.md`
5. `docs/37_TP01_CONDITIONAL_IMAGE_REGISTRY_GATE_STATIC_REMEDIATION.md`
6. `proofs/tp-01-tenant-boundary/.env.example`
7. `proofs/tp-01-tenant-boundary/README.md`
8. `proofs/tp-01-tenant-boundary/scripts/command.mjs`
9. `proofs/tp-01-tenant-boundary/scripts/command.test.mjs`
10. `proofs/tp-01-tenant-boundary/scripts/db-verify-image.mjs`
11. `proofs/tp-01-tenant-boundary/scripts/evidence-verify.mjs`
12. `proofs/tp-01-tenant-boundary/scripts/execution-authorization.mjs`
13. `proofs/tp-01-tenant-boundary/scripts/image-verification-contract.mjs`
14. `proofs/tp-01-tenant-boundary/scripts/image-verification-contract.test.mjs`

Private static evidence and the renewed artifact inventory remain ignored under `internal-local/`
and must not be published.

## Acceptance, publication, and next gate

The owner accepted the complete remediation, all 15 bindings, all six recommendations, the
57-file inventory, and the independent static-validation `PASS`. The exact fourteen-path public
inventory was committed as `7fd5f57 WP-34: accept conditional image gate remediation` and pushed
to `origin/main`. Local `HEAD`, cached `origin/main`, and live remote main matched
`7fd5f57a2c121dbaa35995501e019a8609a6b0a3`; committed proof tree is
`a0e146ec6cf5759b08346d8f6ac9bc1dfeee215b`. WP-34 is `VERIFIED_AND_CLOSED`.

WP-35 is active for owner-decision documentation and an ineffective private draft only. Runtime
actions and WP-35 publication remain closed.
