# TP-01 Host-Port Publication and Runtime Reachability Static Remediation

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted, published, and closed |
| Work package | `WP-38 Host-Port Publication and Runtime Reachability Remediation` |
| Governing decision | `DEC-168` |
| Base publication | `6482489284daef2f7f250912a94aec9819e10a88` |
| Prior proof tree | `a0e146ec6cf5759b08346d8f6ac9bc1dfeee215b` |
| Owner | Aung Myo Oo |
| Date | 2026-10-07 |
| Runtime execution | Not authorized |
| Publication | Verified as `ce851445a485883fb6f3ec5572508fb0902a4656` |

## Objective and boundary

WP-38 implements the accepted `WP37-REM-001` through `007` controls inside the disposable TP-01
proof. It corrects the source-level publication interface, adds exact publisher/reachability gates,
minimizes retained local-path diagnostics, renews the proof inventory, and obtains exactly one fresh
independent static validation after freeze.

Dependencies, package-manager operations, preflight, images, Docker/Compose commands, containers,
databases, services, SQL, fixtures, listeners, cleanup execution, proof/reproduction,
execution-evidence verification, application coding, final architecture selection,
infrastructure, deployment, provider accounts/cost, customer/live data, network, and publication
remain closed.

## Static diagnosis

WP-37 measured an internally healthy PostgreSQL container but no accepted host endpoint. Compose
reported target `5432`, `PublishedPort: 0`, and no `127.0.0.1:55432` listener. The frozen source
combined a required host publication with an `internal: true` network. This source-level conflict
is the bounded WP-38 remediation target.

WP-38 replaces short-form publication with an explicit long-form
`127.0.0.1:55432 -> 5432/tcp` contract. It replaces the internal-only network flag with a dedicated
bridge whose IP masquerading is disabled, preserving the proof's no-egress intent. Static analysis
cannot prove Docker Desktop runtime behavior; later controlled measurement remains mandatory.

## Remediation controls

| ID | Implemented control | State |
| --- | --- | --- |
| `WP38-REM-001` | Preserve WP-37 as immutable Inconclusive evidence and never retry its expired run. | Accepted |
| `WP38-REM-002` | Express the required host publication in explicit long form and reject any `internal: true` publication source. | Accepted |
| `WP38-REM-003` | Disable bridge IP masquerading so correction of host ingress does not silently grant proof-container internet egress. | Accepted |
| `WP38-REM-004` | Require Docker inspect to contain exactly one `5432/tcp -> 127.0.0.1:55432` binding. | Accepted |
| `WP38-REM-005` | Require Compose to report one running, healthy `postgres` service with the same exact publisher and no wildcard, zero, wrong-port, extra, or wrong-protocol mapping. | Accepted |
| `WP38-REM-006` | Require direct bounded TCP reachability before database reset; write run/package-bound PASS evidence or minimized fail-closed evidence. | Accepted |
| `WP38-REM-007` | Make database reset and final evidence verification reject missing, stale-run, or inconsistent reachability evidence. | Accepted |
| `WP38-REM-008` | Redact local home/worktree paths from failed-child output before the existing 8,192-character bounded retention. | Accepted |
| `WP38-REM-009` | Add dependency-free source/contract/path-redaction tests and renew the complete proof inventory. | Accepted |

## Exact runtime contract for a later package

The accepted command catalogue now proposes `TP1-CMD-006A` immediately after healthy database
start and before `db:reset`. The command uses the exact Node/pnpm launcher and records
`TP1-EVID-016` only when all three views agree:

1. Docker inspect contains the exact target and loopback host binding;
2. Compose reports the exact publisher on one healthy running service; and
3. a TCP connection to `127.0.0.1:55432` succeeds within the bounded timeout.

Any mismatch writes `runtime-reachability-failure.json`, stops before fixture mutation, and cannot
be converted into accepted proof evidence. `db:reset` and `evidence-verify` import the same pure
contract and fail closed on missing or inconsistent PASS evidence.

## Diagnostic minimization

The command wrapper continues to redact exact proof credentials, secret-shaped values, bearer
tokens, and PostgreSQL URL passwords before bounding stdout/stderr. WP-38 additionally removes the
local home directory, current worktree path, and its file-URL form before retention. Static tests
prove that the retained diagnostic reports redaction and contains no original local path.

## Static validation

The authoritative checks use the accepted absolute Node v22.23.1 launcher. Syntax checks pass for
the three new reachability files and every changed execution-facing script. The dependency-free
runtime-reachability and command-diagnostic tests pass.

The ambient `node` command reported v26.3.1 during an initial non-authoritative check. No dependency
or runtime action occurred; that result was discarded, and every recorded acceptance check was
rerun with the exact v22.23.1 launcher.

No dependency, preflight, Docker/Compose, image, container, database, service, listener, cleanup,
evidence-verification, proof, reproduction, network, or external-system command ran.

## Renewed binding

The proof inventory contains 60 non-dependency files.

| Binding ID | Item | SHA-256 / value |
| --- | --- | --- |
| `WP38-BIND-001` | WP-37 base publication | `6482489284daef2f7f250912a94aec9819e10a88` |
| `WP38-BIND-002` | Prior proof tree | `a0e146ec6cf5759b08346d8f6ac9bc1dfeee215b` |
| `WP38-BIND-003` | Proof file count | `60` |
| `WP38-BIND-004` | Artifact inventory | `2b87f65acbde27aa63c72a4f752f00f66f1333e01d94d6c2c7f5c0784e8c9114` |
| `WP38-BIND-005` | Proof content set | `c44b2035b558c373eeea9e606a6dc2ac0373dab309d4d984f8ac70ec12637919` |
| `WP38-BIND-006` | Package manifest | `eaf81dc87f1afdf95f42880bcfb60ce744b7ba70e3856d89866905bc510dffc0` |
| `WP38-BIND-007` | Lockfile | `752d4154434adc69d6f18021555a368dbfd2d764bf7ed6c37810371b93f6e1af` — unchanged |
| `WP38-BIND-008` | 222-case manifest | `de4e412a27f35bc96a3858174bcf186ae02f84c08a0e94b28771e3db78a2665f` — unchanged |
| `WP38-BIND-009` | Proof README | `39e16c8eff5a015256327bee633c30f2f2ef297425f30a1bdc160240380d435f` |
| `WP38-BIND-010` | Compose source | `e35dd7d5302c064b365c3030ad02fb8c44e456bbb421ec6d9dd130ebabb01cae` |
| `WP38-BIND-011` | Command wrapper | `3eea84eb9c13fb508e4196726fc24a94fca721336094e8f71b979866aca14039` |
| `WP38-BIND-012` | Command test | `22158ea9c4518f3e88838d3f958dc5ac74acdc1c071e97be533c238f53b8bc12` |
| `WP38-BIND-013` | Reachability contract | `7940c7f7687ea82e0f54ebbf01d964b9ecaa6b2687231f27ba16afb4ff42ec1b` |
| `WP38-BIND-014` | Reachability contract test | `e2600c125513c34fe07287ee5eb3be5bb1b091e82b33630e2979ac765638e126` |
| `WP38-BIND-015` | Reachability runner | `5791a504f55f327a2fc8c0a46a758f026fc980371d9de71688406ced02110140` |
| `WP38-BIND-016` | Database reset gate | `11d1e439049a686689591b2e415da66ca0264f323febd5769c2aba83e6082824` |
| `WP38-BIND-017` | Evidence verifier | `b3d93ea7b02bcd77b53bd27abe549e4e4969a3d5ec1a44d4289d446d059544fe` |
| `WP38-BIND-018` | Cleanup | `91f6fd348db531edfa10b5f28ee2a76337f3af09fa3913c4ad524bd1fd8917ce` — unchanged |

These are static candidate bindings. They are not execution authorization, runtime evidence, or an
architecture decision.

## Independent validation

Exactly one fresh independent read-only static validator, `/root/wp38_static_validator`, returned
`PASS` with no high, medium, or low finding. The validator independently reproduced the exact Node
v22.23.1 syntax checks, both permitted dependency-free tests, all 60 inventory paths/byte
counts/hashes, the artifact-inventory/content-set/package/lock/case/cleanup bindings, the exact
fifteen-path public scope, empty staging, `git diff --check`, and the trailing-whitespace check.

The validator confirmed source-level removal of the internal-network/publication conflict, exact
publisher rejection cases, run-bound reachability evidence gating, and local path plus credential
diagnostic redaction. It made zero public/proof mutation; its only mutation was the authorized
ignored private attestation.

The review was static only. Docker publication, disabled-masquerade no-egress behavior, TCP
reachability, database behavior, and proof behavior remain unmeasured until separately authorized.

## Recommended owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP38-DEC-001` | Accept `WP38-REM-001` through `009` as the bounded correction of `WP37-DEV-001` and the diagnostic-minimization finding. | Accepted |
| `WP38-DEC-002` | Accept `WP38-BIND-001` through `018` only as a static proof candidate binding. | Accepted |
| `WP38-DEC-003` | Accept the independent static result only after its exact identity, methods, findings, limitations, and zero-mutation statement are recorded. | Accepted |
| `WP38-DEC-004` | Preserve WP-37 as immutable Inconclusive evidence and prohibit retry or reinterpretation. | Accepted |
| `WP38-DEC-005` | After verified WP-38 publication, activate WP-39 for exact published rebinding, stopped-run preservation, workspace/role/dependency/reachability readiness analysis, and explicitly ineffective private reauthorization preparation only. | Accepted |
| `WP38-DEC-006` | Do not treat static source correction as proof that Docker will publish the endpoint; require separately authorized runtime measurement. | Accepted |
| `WP38-DEC-007` | Keep dependencies, preflight, images, Docker/Compose runtime, containers, databases, services, cleanup execution, proof/reproduction, application coding, final architecture selection, infrastructure, deployment, provider accounts/cost, and customer/live data closed. | Accepted |

## Frozen WP-38 public inventory

Owner review and any later publication authorization apply only to these fifteen paths:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/21_TP01_EXACT_EXECUTION_CONTRACT.md`
4. `docs/40_TP01_CONTROLLED_CONDITIONAL_IMAGE_EXECUTION_RESULT.md`
5. `docs/41_TP01_HOST_PORT_RUNTIME_REACHABILITY_STATIC_REMEDIATION.md`
6. `proofs/tp-01-tenant-boundary/README.md`
7. `proofs/tp-01-tenant-boundary/compose.yaml`
8. `proofs/tp-01-tenant-boundary/package.json`
9. `proofs/tp-01-tenant-boundary/scripts/command.mjs`
10. `proofs/tp-01-tenant-boundary/scripts/command.test.mjs`
11. `proofs/tp-01-tenant-boundary/scripts/db-reset.mjs`
12. `proofs/tp-01-tenant-boundary/scripts/evidence-verify.mjs`
13. `proofs/tp-01-tenant-boundary/scripts/runtime-reachability-contract.mjs`
14. `proofs/tp-01-tenant-boundary/scripts/runtime-reachability-contract.test.mjs`
15. `proofs/tp-01-tenant-boundary/scripts/runtime-reachability.mjs`

Private static evidence and the renewed artifact inventory remain ignored under `internal-local/`
and must not be published.

## Acceptance, publication, and next gate

The owner accepted all nine remediation controls, all eighteen bindings, all seven decisions, the
renewed 60-file inventory, and the independent static-validation `PASS`. The exact fifteen-path
inventory was committed as `ce85144 WP-38: accept host-port reachability remediation` and pushed
to `origin/main`; local `HEAD`, cached `origin/main`, and live remote main matched
`ce851445a485883fb6f3ec5572508fb0902a4656`. The committed proof tree is
`ad27a2c754b2f7352b3beff314a8e3349758e17a`. WP-38 is `VERIFIED_AND_CLOSED`.

WP-39 is active for exact published rebinding, readiness analysis, and an explicitly ineffective
private reauthorization draft only. Runtime action and WP-39 publication remain closed.
