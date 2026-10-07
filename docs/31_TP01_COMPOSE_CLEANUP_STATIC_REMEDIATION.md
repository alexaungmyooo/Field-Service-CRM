# TP-01 Compose and Cleanup Static Remediation

## Document control

| Field | Value |
| --- | --- |
| Status | Ready for Owner Review — independent static validation PASS |
| Work package | `WP-28 Compose Version Normalization and Cleanup Interface Remediation` |
| Governing decision | `DEC-158` |
| Repository base | `6985851328c86fbe99c1f7a1cb6da615edf7e7c9` plus uncommitted WP-28 inventory |
| Owner | Aung Myo Oo |
| Date | 2026-10-07 |
| Technical-proof execution | Closed |
| Publication | Not authorized |

## Objective and boundary

WP-28 corrects only the two static defects discovered by WP-27:

1. normalize exactly one optional leading lowercase `v` in the Compose version while still
   requiring exact normalized semantic version `5.4.0`; and
2. let cleanup satisfy Compose-file interpolation with an ephemeral in-memory value when the
   preflight bootstrap credential does not exist.

Authorized validation is limited to exact-Node syntax, dependency-free pure-contract tests,
hash/inventory renewal, documentation checks, and one fresh independent static validator.

WP-28 does not authorize a dependency operation, preflight, Docker/Compose invocation, image,
container, database, service, SQL, fixture, listener, cleanup invocation, proof/reproduction,
execution-evidence verification, application code, final architecture selection, infrastructure,
deployment, provider account/cost, customer/live data, publication, or external-system change.

## Remediation record

| ID | Implemented control | Static result |
| --- | --- | --- |
| `WP28-REM-001` | Capture exact Compose stdout, remove at most one terminal LF/CRLF transport delimiter, parse only `5.4.0` or `v5.4.0`, normalize to `5.4.0`, and reject multiple lines, extra prefix, suffix, semantic whitespace, or version drift. | Pure-contract cases pass |
| `WP28-REM-002` | Preserve exact stdout and its raw semantic line in `environment.json.rawTools` and the preflight result while retaining the normalized value in `tools.compose`. | Source inspection and syntax pass |
| `WP28-REM-003` | When the bootstrap value is absent, generate a 32-byte random base64url value and pass it only in the environment of `docker compose down`. | Pure-contract environment cases pass; Docker not invoked |
| `WP28-REM-004` | Preserve an existing run credential, clear and delete the command-environment value in `finally`, and retain only the source class plus `valueRetained: false`. | Source inspection and pure-contract cases pass |
| `WP28-REM-005` | Keep the helper, test, preflight, and cleanup on Node built-ins only so cleanup remains callable without proof dependencies. | Import review passes |
| `WP28-REM-006` | Renew the complete proof inventory after the two changed scripts, new helper/test, and proof README correction. | 54-file inventory generated |

The synthetic interpolation value is not a database credential and never authorizes service start.
It exists only to let Compose parse the file for teardown after an early stop. Cleanup still
requires a separately accepted run authorization, exact reviewed hashes, and the exact runtime.

## Dependency-free validation

Exact Node `v22.23.1` passed syntax checks for the helper, helper test, preflight, and cleanup. The
pure-contract suite passed these cases:

- LF/CRLF-framed single-line output is parsed without semantic trimming;
- `5.4.0` and `v5.4.0` normalize to the exact accepted value;
- empty/multiline output, uppercase/duplicate prefixes, semantic whitespace, truncated values,
  prerelease suffixes, and `5.4.1` fail closed;
- an absent bootstrap value receives only the supplied ephemeral test value without mutating the
  source environment;
- an existing value is preserved; and
- an empty synthetic value is rejected.

The package, lockfile, dependency versions, SQL/schema/seed, and 222-case manifest did not change.
No dependency, preflight, Docker, cleanup, or proof command ran.

## Rematerialized binding proposal

| ID | Exact value | State |
| --- | --- | --- |
| `WP28-BIND-001` | Repository base `6985851328c86fbe99c1f7a1cb6da615edf7e7c9` plus uncommitted WP-28 inventory | Proposed; Git identity pending publication |
| `WP28-BIND-002` | Proof file count `54` | Proposed |
| `WP28-BIND-003` | Artifact-inventory SHA-256 `739e5b95b340b2cfb751248e9981cb86c6bda031b6e02f9a12a6aee1772d81d2` | Proposed |
| `WP28-BIND-004` | Proof content-set SHA-256 `90ce82c5a31f647d2b5e3ad71cda67621fe9dbb895c41fb3d69b11b252cfddfe` | Proposed |
| `WP28-BIND-005` | Package SHA-256 `d10a8e2e5bfeb170cfb6f29485a5376689ad4e73dcbc68c62cc7348ffc4dcc1e` | Proposed; unchanged |
| `WP28-BIND-006` | Lockfile SHA-256 `752d4154434adc69d6f18021555a368dbfd2d764bf7ed6c37810371b93f6e1af` | Proposed; unchanged |
| `WP28-BIND-007` | 222-case manifest SHA-256 `de4e412a27f35bc96a3858174bcf186ae02f84c08a0e94b28771e3db78a2665f` | Proposed; unchanged |
| `WP28-BIND-008` | Preflight SHA-256 `3a6101bad323294b0d7b76b7fe3f90fd163096e017a76fea451892b3a58a72c9` | Proposed |
| `WP28-BIND-009` | Cleanup SHA-256 `91f6fd348db531edfa10b5f28ee2a76337f3af09fa3913c4ad524bd1fd8917ce` | Proposed |
| `WP28-BIND-010` | Remediation contract SHA-256 `cf4d85ce867058548cce99e66008fc12504f1b884e6e2b33c44bb308c7e54f46` | Proposed |
| `WP28-BIND-011` | Remediation contract test SHA-256 `945af17b180b4fef91283d8d8b5e4d6d4f09dc08574ea546562fe0e739c5aaf4` | Proposed |
| `WP28-BIND-012` | Proof README SHA-256 `eca856aac8b05f8f2809ae2481cb26ed76cf3b941c255167ef5daeb15ac068b7` | Proposed |

The content-set checksum uses the accepted WP-21 canonical algorithm. The complete private
inventory and its hash remain authoritative; a later publication must separately bind the Git
revision and proof tree.

## Independent static review

Exactly one fresh read-only validator, `/root/wp28_static_validator`, reviewed the frozen proof.
Its first pass returned `FAIL` with one high-severity finding: the generic preflight command helper
trimmed Compose stdout before validation, which could erase semantic whitespace and prevented the
evidence field from retaining exact stdout.

The proof was corrected to capture exact stdout separately, remove at most one terminal LF/CRLF
transport delimiter, preserve both exact stdout and the raw semantic line, and expand pure tests for
empty, multiline, whitespace, LF, and CRLF inputs. All affected hashes were renewed.

The same validator then returned `PASS` with no unresolved high, medium, or low findings. It
reproduced the 54-entry inventory and content-set hashes, confirmed package/lock/manifest
stability, exact-Node syntax and pure tests, built-in-only imports, the exact nine-path public
scope, no staged files, and preservation of every closed gate. It made zero file, dependency, Git,
network, or external-system mutation.

The review is static only. Neither the initial failure nor the revalidation ran preflight,
Docker/Compose, cleanup, a dependency operation, or any proof/reproduction command.

## Recommended owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP28-DEC-001` | Accept `WP28-REM-001` through `WP28-REM-006` as the bounded correction of both WP-27 defects. | Proposed |
| `WP28-DEC-002` | Accept `WP28-BIND-001` through `WP28-BIND-012` and the 54-file proof inventory for publication. | Proposed |
| `WP28-DEC-003` | Treat static validation as remediation evidence only; it establishes no TP-01 tenant-boundary, database, runtime, or architecture result. | Proposed |
| `WP28-DEC-004` | Preserve WP-27 and its stop packet as immutable Inconclusive evidence; no prior authorization or run may be resumed. | Proposed |
| `WP28-DEC-005` | After verified WP-28 publication, activate WP-29 for exact published rebinding and owner-decision/private reauthorization preparation only. | Proposed |
| `WP28-DEC-006` | Keep dependencies, preflight, images, containers, databases, services, cleanup execution, proof/reproduction, application coding, final architecture selection, infrastructure, deployment, provider accounts/cost, and customer/live data closed in WP-29. | Proposed |

## Frozen WP-28 public inventory

Owner review and any later publication authorization apply only to these nine paths:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/30_TP01_CONTROLLED_REAUTHORIZATION_EXECUTION_RESULT.md`
4. `docs/31_TP01_COMPOSE_CLEANUP_STATIC_REMEDIATION.md`
5. `proofs/tp-01-tenant-boundary/README.md`
6. `proofs/tp-01-tenant-boundary/scripts/cleanup.mjs`
7. `proofs/tp-01-tenant-boundary/scripts/preflight.mjs`
8. `proofs/tp-01-tenant-boundary/scripts/remediation-contract.mjs`
9. `proofs/tp-01-tenant-boundary/scripts/remediation-contract.test.mjs`

Private authorization, static command evidence, renewed artifact inventory, and independent review
remain ignored under `internal-local/` and must not be published.

## Next gate

WP-28 is ready for owner review and stops here. No commit, push, proof execution, or later package
is authorized.
