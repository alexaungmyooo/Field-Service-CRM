# TP-01 Private Environment Activation and Preflight Launcher Static Remediation

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted, published, and closed |
| Work package | `WP-50 Private Environment Activation and Preflight Launcher Remediation` |
| Governing decision | `DEC-180`; proposed `DEC-181` |
| Base publication | `f1f17f1bef03d74d46efa6f3acfb18a29a50249d` |
| Owner | Aung Myo Oo |
| Date | 2026-10-09 |
| Runtime result | None; static remediation only |
| Publication | Verified as `35776fb5baf18e9230fe2a1bd4d41689949a42b7` |

## Objective and authority boundary

WP-50 repairs the exact private-environment activation defect that stopped WP-49. It replaces
shell sourcing with a non-evaluating data parser and a tightly bounded preflight launcher, adds
dependency-free tests for spaces and credential metacharacters, extends formal operational-stop
evidence to cover activation failure, and renews the complete proof inventory.

WP-50 does not authorize dependency or package-manager operations, credential generation or use,
preflight, images, Docker/Compose runtime, containers, databases, services, cleanup execution,
proof/reproduction, execution-evidence verification, application coding, final architecture
selection, infrastructure, deployment, provider accounts/cost, customer/live data, network, or
publication. Static validation is not a measured runtime result and does not authorize another
TP-01 attempt.

## Remediation result

The private environment is now governed as literal data. The parser:

- accepts only the exact reviewed required keys and one optional conditional-pull token key;
- splits each non-empty line at its first `=` and preserves the remaining value byte-for-byte;
- performs no shell invocation, quote removal, variable expansion, command substitution, escape
  processing, or mutation of the current process environment;
- rejects malformed, blank, unknown, duplicate, empty, missing, relative-path, invalid-context,
  carriage-return, and NUL cases; and
- removes all ambient `TP01_*` values before constructing the explicit child environment.

The launcher accepts only an absolute environment-file path and the single operation `preflight`.
It requires `TP01_NODE_BIN` to equal the already running exact Node process, reuses the complete
effective-authorization check against the exact revision, clean proof, and reviewed inventory,
requires the authorization-bound Node and pnpm paths to match the parsed data, and maps the
operation to `exact-pnpm.mjs run preflight`. It never places private values in command arguments
or output. No general command, shell, arbitrary script name, relative environment path, proof
command, Docker command, cleanup command, or final verifier is exposed.

If activation fails after package, run, and absolute evidence-directory context can be safely
validated without evaluating values, the launcher writes a minimized
`private-environment-activation-failure.json` and adds a formal `PREFLIGHT` /
`PRIVATE_ENVIRONMENT_ACTIVATION` record to `deviations.json`. The artifacts contain no credential,
database URL, raw environment value, or absolute path. If the evidence context itself cannot be
validated, the launcher fails closed with only a typed status because it cannot safely select an
evidence location.

## Exact remediation bindings

| ID | Binding | State |
| --- | --- | --- |
| `WP50-BIND-001` | WP-49 remains immutable `INCONCLUSIVE_CLOSED_NO_RETRY`; its consumed authorization and evidence are never reused. | Satisfied |
| `WP50-BIND-002` | The parser treats the private environment as data and never invokes a shell, `eval`, expansion, or command substitution. | Satisfied |
| `WP50-BIND-003` | Each line splits only at the first `=`, preserving spaces, additional equals signs, quotes, dollar signs, backticks, semicolons, ampersands, pipes, hashes, and backslashes literally. | Satisfied |
| `WP50-BIND-004` | Required and optional key sets are explicit; unknown, duplicate, missing, or empty keys fail closed. | Satisfied |
| `WP50-BIND-005` | Embedded NUL, embedded carriage return, blank line, malformed key, or malformed assignment fails closed. | Satisfied |
| `WP50-BIND-006` | Package and run identifiers plus evidence, Node, and pnpm paths are validated before launch. | Satisfied |
| `WP50-BIND-007` | The evidence, Node, and pnpm paths must be absolute; paths containing spaces remain literal and valid. | Satisfied |
| `WP50-BIND-008` | Parsing does not mutate `process.env`. | Satisfied |
| `WP50-BIND-009` | Every ambient `TP01_*` variable is removed before only allowlisted parsed values are added to the child environment. | Satisfied |
| `WP50-BIND-010` | The launcher accepts only `--environment <absolute-path> preflight`. | Satisfied |
| `WP50-BIND-011` | The launcher exposes no arbitrary executable, argument, package script, proof, Docker, cleanup, or verifier interface. | Satisfied |
| `WP50-BIND-012` | `TP01_NODE_BIN` must equal the exact Node process already running the launcher. | Satisfied |
| `WP50-BIND-013` | The launcher revalidates the effective authorization, exact revision, clean proof, complete artifact inventory, and authorization-bound Node/pnpm paths before any child. | Satisfied |
| `WP50-BIND-014` | The sole child command is exact Node plus the reviewed exact-pnpm launcher and `run preflight`. | Satisfied |
| `WP50-BIND-015` | Private values are passed only in the explicit child environment, never command arguments or output. | Satisfied |
| `WP50-BIND-016` | Activation failure has a stable uppercase typed code and fail-closed status. | Satisfied |
| `WP50-BIND-017` | A fully authorization-validated evidence context receives a minimized typed activation-failure artifact. | Satisfied |
| `WP50-BIND-018` | Formal deviation evidence permits exactly the new `PREFLIGHT` / `PRIVATE_ENVIRONMENT_ACTIVATION` pair in addition to the existing primary/reproduction pairs. | Satisfied |
| `WP50-BIND-019` | Activation-failure artifacts retain no credential, database URL, raw environment value, or absolute path. | Satisfied |
| `WP50-BIND-020` | Invalid or unauthorized evidence context produces no guessed or attacker-selected evidence write. | Satisfied |
| `WP50-BIND-021` | Dependency-free tests cover paths with spaces, inert credential metacharacters, literal preservation, ambient-value removal, malformed/missing/duplicate/unknown values, launch-shape rejection, exact child mapping, and failure-evidence minimization. | Satisfied |
| `WP50-BIND-022` | WP-50 performs no dependency, credential, preflight, Docker/runtime, cleanup, proof/reproduction, network, product, infrastructure, deployment, provider, or customer/live-data operation. | Satisfied |
| `WP50-BIND-023` | The complete proof inventory is renewed after all proof changes and must be reproduced by one fresh independent static validator. | Satisfied |
| `WP50-BIND-024` | WP-50 remains unpublished and cannot authorize execution, architecture selection, or implementation. | Satisfied |

These 24 bindings are indivisible for owner review. A later correction requires complete hash
renewal and revalidation.

## Primary static validation

Exact Node `v22.23.1` syntax checks passed for all seven changed or added executable/test modules.
The following built-in-only suites passed:

1. `scripts/private-environment-contract.test.mjs`;
2. `scripts/private-environment-launcher.test.mjs`; and
3. `scripts/deviation-contract.test.mjs`.

The tests use inert synthetic literals in memory and a deleted operating-system temporary
directory. They do not create or use a runtime credential, call a dependency, invoke preflight,
start Docker, or access the network.

The renewed proof inventory contains 71 files. Artifact-inventory SHA-256 is
`65ef00e2fa9e2807b2831be9588345174dcd05f78ce612e6fe8c0223458af506`; canonical content-set
SHA-256 is `62106e09e4b6d25081e321d840f95e1f7b4645869674fa0e8877e8ab36d81ddf`.

## Independent static validation

The sole fresh validator `/root/wp50_static_validator` initially found `WP50-VAL-001` (`MEDIUM`):
the primary content-set calculation joined canonical entries with LF and also appended a terminal
LF, contrary to the governing no-terminal-LF algorithm. The 71 proof entries and artifact-inventory
SHA were correct and proof content did not change. All WP-50 content-set claims were corrected to
the digest above. The validator also found `WP50-VAL-002` (`LOW`): private primary-validation text
incorrectly claimed dependency absence even though an ignored dependency directory from 2026-10-07
still exists. The wording now records that the pre-existing ignored state was not invoked or
changed. Both corrections preserved the proof inventory.

The same sole validator then reproduced the corrected twelve-path scope, empty index, clean diff,
all 71 paths/byte counts/file hashes, both aggregate identities, all seven syntax checks, all three
built-in-only suites, and `WP50-BIND-001` through `024`. Final result: `PASS`, with no remaining
critical, high, medium, or low finding. The validator attested independence and zero mutation.
Runtime behavior and the TP-01 outcome remain unmeasured.

## Remediation controls

| ID | Control | Status |
| --- | --- | --- |
| `WP50-REM-001` | Preserve WP-49 and every earlier stopped run as immutable evidence. | Implemented |
| `WP50-REM-002` | Replace shell sourcing with exact non-evaluating parsing and explicit environment propagation. | Implemented |
| `WP50-REM-003` | Restrict the new launcher to an absolute private file and the preflight operation only. | Implemented |
| `WP50-REM-004` | Cover spaces and credential metacharacters without executing or normalizing them. | Implemented |
| `WP50-REM-005` | Emit minimized typed activation-failure and formal operational-stop evidence when safe evidence context exists. | Implemented |
| `WP50-REM-006` | Fail without an evidence write when even the destination context is not safely validated. | Implemented |
| `WP50-REM-007` | Renew the complete proof inventory and obtain exactly one fresh independent static validation. | Implemented |
| `WP50-REM-008` | Keep every runtime, product, architecture, infrastructure, deployment, provider, data, network, and publication gate closed. | Implemented |

## Owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP50-DEC-001` | Accept `WP50-REM-001` through `008` and `WP50-BIND-001` through `024` after independent validation passes. | Accepted |
| `WP50-DEC-002` | Accept the 71-file renewed proof inventory only if the independent validator reproduces every entry and both aggregate identities. | Accepted |
| `WP50-DEC-003` | Accept the launcher as a narrow preflight transport repair, not as runtime proof or permission to execute. | Accepted |
| `WP50-DEC-004` | Require any later reauthorization package to bind the published WP-50 revision/tree and exact renewed artifact inventory. | Accepted |
| `WP50-DEC-005` | Require a later execution-readiness package and a new effective private authorization before any preflight or runtime command. | Accepted |
| `WP50-DEC-006` | Keep application coding and final architecture selection closed regardless of WP-50 acceptance. | Accepted |
| `WP50-DEC-007` | Authorize no WP-50 commit or push until the owner separately accepts the frozen public inventory. | Accepted |

## Frozen WP-50 public inventory

Owner acceptance and publication were limited to these twelve paths:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/52_TP01_CONTROLLED_DATABASE_CONNECTION_EXECUTION_RESULT.md`
4. `docs/53_TP01_PRIVATE_ENVIRONMENT_PREFLIGHT_LAUNCHER_STATIC_REMEDIATION.md`
5. `proofs/tp-01-tenant-boundary/README.md`
6. `proofs/tp-01-tenant-boundary/scripts/deviation-contract.mjs`
7. `proofs/tp-01-tenant-boundary/scripts/deviation-contract.test.mjs`
8. `proofs/tp-01-tenant-boundary/scripts/execution-authorization.mjs`
9. `proofs/tp-01-tenant-boundary/scripts/private-environment-contract.mjs`
10. `proofs/tp-01-tenant-boundary/scripts/private-environment-contract.test.mjs`
11. `proofs/tp-01-tenant-boundary/scripts/private-environment-launcher.mjs`
12. `proofs/tp-01-tenant-boundary/scripts/private-environment-launcher.test.mjs`

Private authorization, renewed hashes, validation evidence, and independent-validator records
remain ignored under `internal-local/` and must not be published.

## Next gate

The owner accepted the complete WP-50 package, both resolved findings, 71-file inventory,
independent `PASS`, all eight remediation controls, all 24 bindings, and all seven recommendations.
Commit and push are authorized only for the frozen twelve-path inventory. After verified
publication, WP-51 may begin private-environment remediation rebinding and reauthorization-
readiness owner-decision documentation only. Every execution, dependency, credential, product,
architecture, infrastructure, deployment, provider, network, and customer/live-data gate remains
closed.

The exact frozen twelve-path inventory was committed as
`35776fb WP-50: accept private environment remediation` and pushed to `origin/main`. Local `HEAD`,
cached `origin/main`, and live remote main matched
`35776fb5baf18e9230fe2a1bd4d41689949a42b7`; the published proof tree is
`52cf1ab1f936614551285ebf6c85462042daba89`. WP-50 is `VERIFIED_AND_CLOSED`.

WP-51 is active for exact published rebinding and reauthorization-readiness owner-decision
documentation only. It does not authorize proof changes, roles, private authorization preparation,
checkout, dependencies, credentials, preflight, runtime operations, product work, architecture
selection, infrastructure, deployment, provider activity, network access, or customer/live data.

The owner accepted the complete WP-51 candidate binding, advanced its dedicated-workspace and new
raw-literal private-environment choices, rejected all four alternatives, and accepted its
no-private-draft disposition. Publication is authorized only for WP-51's frozen four-path public
inventory. WP-52 remains closed until that publication is live-remote verified.
