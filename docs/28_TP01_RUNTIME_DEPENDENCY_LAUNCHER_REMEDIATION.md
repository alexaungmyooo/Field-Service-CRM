# TP-01 Runtime and Dependency Launcher Remediation

## Document control

| Field | Value |
| --- | --- |
| Status | Verified and Closed — published; execution remains closed |
| Work package | `WP-25 TP-01 Runtime and Dependency Launcher Remediation` |
| Governing decision | `DEC-155` |
| Predecessor | WP-24 `INCONCLUSIVE_CLOSED_FOR_OWNER_REVIEW` |
| Owner | Aung Myo Oo |
| Date | 2026-10-07 |
| TP-01 execution | Not authorized |

## Accepted WP-24 disposition

The owner accepted `WP24-DEV-001` through `WP24-DEV-003`, all three role reviews, mandatory
cleanup, the nine-file stop packet, and the `INCONCLUSIVE` disposition. WP-24 is closed without
retry and establishes no tenant-boundary or architecture result.

The accepted blocking causes are:

- the ambient launcher reported Node `v24.19.0` and ran the proof process as `v26.3.1` instead of
  accepted `v22.23.1`;
- execution stopped before any image, database, fixture, case, or security measurement; and
- after cleanup, the ambient pnpm final-verifier interface unexpectedly rematerialized 115 packages
  from the local store before the incomplete packet was rejected.

## WP-25 objective and boundary

WP-25 may restore the unchanged reviewed dependencies from the existing local content-addressed
store using offline, frozen-lockfile, ignore-scripts controls; repair the disposable proof launcher
and static evidence mechanics; renew proof and private hashes; and obtain exactly one fresh
independent static validation.

WP-25 may not run preflight, inspect or retrieve an image, start a container/database/service,
apply SQL, create a fixture, bind a listener, run or reproduce a proof case, execute interim/final
evidence verification, run cleanup, use registry/network access, change a dependency version, write
application code, select architecture, create infrastructure, deploy, create provider accounts or
cost, use customer/live data, commit, push, or merge.

## Proposed remediation controls

| ID | Control | Status |
| --- | --- | --- |
| `WP25-REM-001` | Require one explicitly selected Node binary reporting `v22.23.1`; never rely on ambient `node`. | Proposed |
| `WP25-REM-002` | Hash-verify an absolute pnpm entry before executing it through that same `process.execPath`; then require pnpm `11.25.0` and record its path/hash. | Proposed |
| `WP25-REM-003` | Force pnpm offline and lifecycle scripts disabled, and prepend the exact Node directory to child `PATH`. | Proposed |
| `WP25-REM-004` | Permit dependency restoration only for the exact offline/frozen/ignore-scripts argument vector and separate WP-25 authorization token. | Proposed |
| `WP25-REM-005` | Refuse pnpm run commands when `node_modules` is absent and fail if dependency metadata changes. | Proposed |
| `WP25-REM-006` | Run cleanup and final verification directly through exact Node after dependencies may be absent; never use pnpm for those stages. | Proposed |
| `WP25-REM-007` | Make preflight measure the exact pnpm entry through the exact Node process and record both launcher identities. | Proposed |
| `WP25-REM-008` | Renew the complete proof inventory, content checksum, static evidence, and all affected binding hashes after remediation. | Proposed |
| `WP25-REM-009` | Require one fresh read-only static validator and preserve all WP-24 runtime and product closures. | Proposed |

## Fixed environment inputs under review

| Input | Exact observed value |
| --- | --- |
| Node version | `v22.23.1` |
| Node binary SHA-256 | `2e3f1286a7eb3736346ed1803e458a0ff909e2b2d5bc746144dcb76970e9b99d` |
| pnpm version | `11.25.0` |
| pnpm entry SHA-256 | `ff3224d46b47fbb24a7e9fe15fededef7e00892d07d4e376b6762d4899906bfd` |
| Lockfile SHA-256 | `752d4154434adc69d6f18021555a368dbfd2d764bf7ed6c37810371b93f6e1af` |
| Restoration network | Offline; existing local store only |
| Lifecycle scripts | Disabled |

The absolute host paths are private environment evidence, not portable product configuration. Any
future execution authorization must bind the measured paths and hashes for that execution host.

## Rematerialized binding proposal

| Binding | Exact value | State |
| --- | --- | --- |
| `WP25-BIND-001` | Repository base `73b12c2b66b898eb9a43e34d08c6f7d07e84dc43` plus uncommitted WP-25 inventory | Proposed; Git identity pending publication |
| `WP25-BIND-002` | Proof file count `52` | Proposed |
| `WP25-BIND-003` | Artifact-inventory SHA-256 `0209ca15cc412e6c0f4d7ef06a7ecb4e74e756c678449f0801deb40c1000ac69` | Proposed |
| `WP25-BIND-004` | Proof content-set SHA-256 `052c2349f79ef36a06d8619a0747588b353d67d5b0c9df9e1735474d6f8d4d2d` | Proposed |
| `WP25-BIND-005` | Package SHA-256 `d10a8e2e5bfeb170cfb6f29485a5376689ad4e73dcbc68c62cc7348ffc4dcc1e` | Proposed; unchanged |
| `WP25-BIND-006` | Lockfile SHA-256 `752d4154434adc69d6f18021555a368dbfd2d764bf7ed6c37810371b93f6e1af` | Proposed; unchanged |
| `WP25-BIND-007` | 222-case manifest SHA-256 `de4e412a27f35bc96a3858174bcf186ae02f84c08a0e94b28771e3db78a2665f` | Proposed; unchanged |
| `WP25-BIND-008` | Static-validation SHA-256 `4d4e42dc006d9fc63d007c47b823c3e5b33feddb2b8415e590f51ed1db450eca` | Proposed |
| `WP25-BIND-009` | Exact launcher SHA-256 `a7cd0550fd3b4b8093fcb7837e9d6acfbd1b81b68aba3ea2c3a10c29167dc071` | Proposed |
| `WP25-BIND-010` | Runtime contract SHA-256 `b2bc0284616389e112f22197b2c7a699a322bab6d29d0950dd39108b661555ff` | Proposed |
| `WP25-BIND-011` | Preflight SHA-256 `c5388d1370b8ce959966c5e175c784169bb2037499c3cee5c9c279e542ae565a` | Proposed |
| `WP25-BIND-012` | Static-evidence script SHA-256 `4751b3c119c3537352bb57cfa1b8270778623a8d9be40c6adb18654e8f515c63` | Proposed |

The package, lockfile, dependency versions, SQL/schema/seed files, case manifest, and proof behavior
did not change. The inventory added one proof-only launcher and changed four existing proof files.
No runtime or security behavior was measured.

## Local validation before independent review

- Exact Node syntax passed for the runtime contract, launcher, preflight, and static-evidence script.
- Exact launcher version check returned pnpm `11.25.0` under Node `v22.23.1`.
- The first sandboxed offline restoration attempt could not open the external local-store database
  and left no partial `node_modules`; the same authorized command succeeded with local-store read
  access and ran no lifecycle scripts. A retained, idempotent rerun of the exact offline command
  reports the frozen dependencies already up to date under pnpm `11.25.0`.
- Restored dependency versions match the previously reviewed dependency tree; package and lockfile
  hashes are unchanged.
- Missing-dependency run-command refusal passed in an isolated empty temporary directory.
- Present-dependency matrix, TypeScript, static-evidence, and hashing commands passed without
  changing pnpm metadata.
- The exact manifest remains 222 cases with its accepted hash.
- No preflight, image, container, database, service, listener, fixture, proof, reproduction,
  evidence-verification, or cleanup command ran.

## Independent-review remediation

The one authorized validator's first pass returned `FAIL` because the pnpm entry was executed for
its version before its hash was checked, raw WP-25 command evidence had not been retained, and two
README statements still described historical WP-21/ambient-pnpm controls. The same inventory was
corrected as follows:

- the pnpm entry is now hashed and rejected before any version execution;
- raw private logs retain the exact offline/frozen/ignore-scripts rerun and isolated
  missing-dependency refusal;
- the README now states WP-25 as the current authority and uses only the exact launcher for current
  pnpm operations; and
- the old ambient lock-materialization command is explicitly historical and closed.

All affected hashes were renewed after these corrections. The same single validator
`/root/wp25_static_validator` returned `PASS` with no unresolved high, medium, or low finding and
made zero mutations; no second validator was used.

## Frozen WP-25 public inventory

Owner review and any later publication authorization apply only to these 11 paths:

1. `AGENTS.md`
2. `docs/00_PROJECT_START_HERE.md`
3. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
4. `docs/21_TP01_EXACT_EXECUTION_CONTRACT.md`
5. `docs/27_TP01_EXECUTION_IDENTITIES_CHECKPOINT2_AUTHORIZATION.md`
6. `docs/28_TP01_RUNTIME_DEPENDENCY_LAUNCHER_REMEDIATION.md`
7. `proofs/tp-01-tenant-boundary/README.md`
8. `proofs/tp-01-tenant-boundary/scripts/checkpoint-static-evidence.mjs`
9. `proofs/tp-01-tenant-boundary/scripts/exact-pnpm.mjs`
10. `proofs/tp-01-tenant-boundary/scripts/preflight.mjs`
11. `proofs/tp-01-tenant-boundary/scripts/runtime-contract.mjs`

No file is staged. Commit and push remain unauthorized until later owner acceptance.

## Recommended owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP25-DEC-001` | Accept `WP25-REM-001` through `WP25-REM-009` as the remediated launcher controls. | Proposed |
| `WP25-DEC-002` | Accept `WP25-BIND-001` through `WP25-BIND-012` only after the independent static review passes. | Proposed |
| `WP25-DEC-003` | Supersede ambient `pnpm run` interfaces for TP-01 with the exact launcher and direct-Node cleanup/final interfaces. | Proposed |
| `WP25-DEC-004` | Treat the restored dependencies as reviewed local proof material, not permission for any execution or network operation. | Proposed |
| `WP25-DEC-005` | Require a new exact revision/tree binding and fresh private authorization before any later preflight. | Proposed |
| `WP25-DEC-006` | Preserve WP-24 as Inconclusive and non-retryable; do not reinterpret launcher remediation as a proof result. | Proposed |
| `WP25-DEC-007` | Keep every application, architecture, provider, infrastructure, deployment, and customer/live-data gate closed. | Proposed |

## Validation and next gate

The corrected frozen inventory passed revalidation by the same single independent static reviewer.
WP-25 stops at `READY_FOR_OWNER_REVIEW`. Publication and any new checkpoint-2 attempt require
separate owner gates.

## Owner acceptance and publication result

On 2026-10-07, the owner accepted `WP25-REM-001` through `WP25-REM-009`, `WP25-BIND-001` through
`WP25-BIND-012`, `WP25-DEC-001` through `WP25-DEC-007`, the 52-file inventory, and the independent
static-validation `PASS`, then authorized commit and push of exactly the frozen 11 public paths.

The inventory was committed as `c588ac4 WP-25: accept TP-01 launcher remediation`. Local `HEAD`,
cached `origin/main`, and live remote main were verified at
`c588ac4e5b4d3307fbc99ffeadbbc3bbaa27bf6b`; the committed proof tree is
`0e6b579811f59e13ff869ec40ea1e3bfd4edea49`. WP-25 is `VERIFIED_AND_CLOSED`.

WP-26 is activated for reauthorization-readiness documentation and ineffective private
authorization preparation only. It does not reopen WP-24, authorize dependencies or preflight, or
grant any TP-01 execution authority.
