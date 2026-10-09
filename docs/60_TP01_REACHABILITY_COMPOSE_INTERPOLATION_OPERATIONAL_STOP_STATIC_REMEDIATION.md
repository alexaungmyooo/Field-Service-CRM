# TP-01 Reachability Compose Interpolation and Operational-Stop Static Remediation

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — static remediation and independent validation complete; publication authorized |
| Work package | `WP-57 Reachability Compose Interpolation and Operational-Stop Accounting Remediation` |
| Governing decisions | `DEC-187`; `DEC-188` |
| Verified base publication | `dca083c1a531ae05961e0822089ce0c674ad770e` |
| Base repository tree | `bd539ddd07827f9f2754c964723719092d3ecef8` |
| Base proof tree | `356ed3d79707ba3b7c77db8c09f80cc26b2ffd54` |
| Owner | Aung Myo Oo |
| Date | 2026-10-09 |
| TP-01 execution | Not authorized and not performed |
| Publication | Authorized for the frozen fourteen-path public/proof inventory; verification pending |

## Objective and authority boundary

WP-57 statically closes `WP56-DEV-001` and `WP56-DEV-002`. It keeps the real bootstrap credential
out of the reachability child, supplies only a fresh non-secret value for Compose configuration
interpolation during an exact read-only publisher inspection, records minimized non-secret
evidence, and adds formal primary/reproduction reachability stops to `deviations.json`.

WP-57 authorizes only changes within the disposable TP-01 proof, governing documentation, ignored
private static evidence, dependency-free exact-Node syntax and pure tests, affected hash renewal,
and exactly one fresh independent static validator after freeze.

It does not authorize dependency installation or inspection, credential or private-environment
generation/use, preflight, image inspection/retrieval, Docker/Compose runtime, containers,
databases, services, SQL, fixtures, listeners, cleanup execution, proof/reproduction,
execution-evidence verification, network access, application coding, architecture selection,
infrastructure, deployment, provider accounts/cost, customer/live data, commit, push, merge, or
external-system mutation.

## Remediation record

| ID | Implemented control | Static result |
| --- | --- | --- |
| `WP57-REM-001` | Fix the Compose inspection command as exactly `docker compose ps --format json postgres`; no `up`, `down`, recreate, or other service-changing argument is accepted. | Immutable argument vector and source test pass |
| `WP57-REM-002` | Generate a fresh strong single-line interpolation value inside the reachability script and reject an empty, weak, multiline, or real-bootstrap-equal value. | Pure helper tests pass |
| `WP57-REM-003` | Remove bootstrap/runtime credentials, database URL, image pull token, and `PGPASSWORD` from the Compose child environment before adding only the synthetic interpolation value. | Exact exclusion tests pass without shell evaluation |
| `WP57-REM-004` | Clear the synthetic value immediately after the child returns and retain only typed evidence of source, purpose, exclusion, non-mutation, and non-retention. | Source and evidence-contract tests pass |
| `WP57-REM-005` | Classify the gate as `PRIMARY` until a complete primary result/state/audit packet exists, then as `REPRODUCTION`; reject a partial primary packet. | Pure phase tests pass |
| `WP57-REM-006` | On reachability failure, write bounded failure evidence and append an exact phase / `RUNTIME_REACHABILITY` operational stop that remains distinct from accepted deviations. | Deviation-contract tests pass for both phases and reject invalid pairs |
| `WP57-REM-007` | Upgrade successful reachability evidence to schema version 2; require all three publisher observations and the exact non-secret interpolation record; independently enforce the expected phase before each reset and require `REPRODUCTION` at final verification. | Reset, verifier, contract, and source tests pass |
| `WP57-REM-008` | Add one dependency-free remediation suite, extend two existing pure suites, and renew the complete proof inventory without changing dependencies, SQL, schema, fixture, or case manifest. | 72-file inventory regenerated; independent validation PASS |

## Exact interpolation contract

The private launcher continues to pass no credential, database URL, or pull token to
`runtime:verify-reachability`. The reachability child derives its Compose environment from the
already minimized process environment, defensively removes every proof secret key, and supplies a
fresh random value only under the variable name Compose requires to parse `compose.yaml`.

That value is not the database's configured credential, is never used for authentication, cannot
reach `docker compose up` or another service-changing command, is cleared after `compose ps`, and
is absent from evidence. The evidence retains only these assertions:

- source is `EPHEMERAL_SYNTHETIC_REACHABILITY_ONLY`;
- purpose is read-only Compose configuration interpolation;
- the real bootstrap credential was absent before inspection and not propagated;
- runtime credential, database URL, and pull token were not propagated;
- service mutation was not allowed; and
- the interpolation value was not retained.

## Operational-stop contract

The formal stop schema now accepts `RUNTIME_REACHABILITY` only with `PRIMARY` or `REPRODUCTION`.
It still rejects that stage under `PREFLIGHT`, rejects unknown phase/stage pairs, and keeps
operational stops separate from owner-accepted deviations. A complete primary result, state, and
audit triple is required before a reachability invocation can be classified as reproduction.

Any reachability failure writes `runtime-reachability-failure.json`, appends
`RUNTIME_REACHABILITY_FAILED` with that artifact reference, stops before database reset, and causes
the unchanged final-verifier rule requiring zero operational stops to reject `PASS`.

The database-reset path independently classifies the expected gate from the evidence directory and
requires the reachability artifact to carry that exact phase. The complete-packet verifier requires
`REPRODUCTION`, preventing a valid primary gate from being reused for the reproduction reset or
final disposition.

## Renewed static binding

| ID | Exact value | WP-57 state |
| --- | --- | --- |
| `WP57-BIND-001` | Verified base publication `dca083c1a531ae05961e0822089ce0c674ad770e` | Satisfied |
| `WP57-BIND-002` | Base repository tree `bd539ddd07827f9f2754c964723719092d3ecef8` | Satisfied |
| `WP57-BIND-003` | Base proof tree `356ed3d79707ba3b7c77db8c09f80cc26b2ffd54` | Satisfied |
| `WP57-BIND-004` | Renewed proof file count `72` | Satisfied |
| `WP57-BIND-005` | Renewed artifact-inventory SHA-256 `246c43ce20f738ef8fb4c3912d766815fb26755d1e666f805f5140e8a669509f` | Satisfied |
| `WP57-BIND-006` | Canonical no-terminal-LF content-set SHA-256 `b5abb799e925888919594a840271c4486ebd7e01ba8abbfacda058996da86f65` | Satisfied |
| `WP57-BIND-007` | Package SHA-256 `eaf81dc87f1afdf95f42880bcfb60ce744b7ba70e3856d89866905bc510dffc0` | Unchanged |
| `WP57-BIND-008` | Lockfile SHA-256 `752d4154434adc69d6f18021555a368dbfd2d764bf7ed6c37810371b93f6e1af` | Unchanged |
| `WP57-BIND-009` | 222-case manifest SHA-256 `de4e412a27f35bc96a3858174bcf186ae02f84c08a0e94b28771e3db78a2665f` | Unchanged |
| `WP57-BIND-010` | Proof README SHA-256 `4c2bb352711d4748c4e91a23ebd51a126c55b4524c0498ba7c55e5c581c34b77` | Renewed |
| `WP57-BIND-011` | Reachability contract SHA-256 `13ffe053111aeac54cd350caca05865ec7f9554e02ca5f8f54b94767bccff1a4` | Renewed |
| `WP57-BIND-012` | Reachability runner SHA-256 `fb7c6281319b356818ebd46769632cfc3f2aac0915dbc07dbe3b8260b56f992a` | Renewed |
| `WP57-BIND-013` | Reachability contract test SHA-256 `c8404e01a7aa20ca29fc07fbf3f8708e6e277f4b73ef497129ee0db5ccb8ab2d` | Renewed |
| `WP57-BIND-014` | New remediation test SHA-256 `28bd003fafb4df270e22884252127d08eba3e65e9c09b7b8fbf8fab7f2fb8c6e` | Added |
| `WP57-BIND-015` | Deviation contract SHA-256 `d21c2b29f2a8499cdc56a6a1700c9c3f5222217f793ebc72601fbb619267e61a` | Renewed |
| `WP57-BIND-016` | Deviation test SHA-256 `642258615b9edf19a4fee58df5450db19b0e72555a5d81337cb6d41bcd1623c0` | Renewed |
| `WP57-BIND-017` | Database reset SHA-256 `b663cfac11a59f22fec0c59d11533941c3fa9c0828b7ddab2e0f0d200d58db83` | Renewed |
| `WP57-BIND-018` | Final evidence verifier SHA-256 `7d5a06bef38806796f2a450d7e749d8cba4ae94697a12dbc9c437d73b01cde02` | Renewed |
| `WP57-BIND-019` | Exact read-only five-argument Compose vector and explicit service-mutation prohibition | Satisfied |
| `WP57-BIND-020` | Actual bootstrap/runtime credentials, database URL, pull token, and `PGPASSWORD` excluded from the inspection child | Satisfied |
| `WP57-BIND-021` | Synthetic value cleared after the child and absent from pass/failure evidence | Satisfied statically |
| `WP57-BIND-022` | Primary/reproduction classification requires zero or all three primary packet artifacts; partial state fails closed | Satisfied |
| `WP57-BIND-023` | Each reset requires its independently derived expected phase and final verification requires `REPRODUCTION` | Satisfied statically |
| `WP57-BIND-024` | Reachability failure appends exact formal operational-stop evidence; final verifier continues to require zero stops | Satisfied |
| `WP57-BIND-025` | Exact Node `v22.23.1` syntax and five dependency-free suites pass | Satisfied |
| `WP57-BIND-026` | No dependency, credential/environment, runtime, cleanup, proof/reproduction, network, product, architecture, infrastructure, deployment, provider, or customer/live-data action occurred | Satisfied |
| `WP57-BIND-027` | Exactly one fresh independent static validator after freeze | Satisfied — `/root/wp57_static_validator` PASS |

The content-set checksum uses sorted inventory order with each entry rendered as
`path + NUL + bytes + NUL + sha256`, joined by LF with no terminal LF.

## Primary dependency-free validation

Exact Node `v22.23.1` passed syntax checks for all eight changed or added executable/test modules.
The Compose evidence, deviation, reachability contract, WP-57 remediation, and full-sequence
private-launcher suites passed. Tests prove the exact read-only argument vector, actual-secret
exclusion, synthetic-value validation and non-retention evidence, unchanged input environment,
primary/reproduction classification, partial-packet rejection, formal reachability stops, and
continued launcher-level zero-private-value propagation. They also prove reset-time expected-phase
enforcement and final-verifier rejection of a retained primary-only gate.

No dependency, package-manager, credential/environment, preflight, image, Docker/Compose,
container, database, service, listener, cleanup, proof/reproduction, execution-evidence, network,
application, architecture, infrastructure, deployment, provider, or customer/live-data command
ran.

## Independent static review

`/root/wp57_static_validator`, the sole fresh independent validator, returned `PASS` with no
critical, high, medium, or low findings. The validator reproduced the exact fourteen-path scope,
all 72 governed proof entries, both aggregate hashes, every renewed proof-file hash, exact Node
`v22.23.1`, eight syntax checks, five dependency-free suites, all eight remediation controls, and
all 27 bindings. The Git index was empty and `git diff --check` passed before and after validation.

The validator confirmed the exact non-mutating Compose argument vector, private-value exclusion,
synthetic-value clearing and non-retention, primary/reproduction classification, partial-packet
rejection, reset-time phase enforcement, final `REPRODUCTION` enforcement, formal operational-stop
accounting, and unchanged dependency/lockfile/Compose/SQL/fixture/case-manifest inputs. No file or
external state was changed; authorized pure tests used and removed only temporary files outside the
repository.

### Validation finding resolution

`WP57-VAL-001` identified that an interim canonical content-set checksum had been calculated after
locale-aware re-sorting instead of preserving the inventory's canonical sorted order. The binding
and private records were corrected to
`b5abb799e925888919594a840271c4486ebd7e01ba8abbfacda058996da86f65`; independent Ruby and
Node/default-order calculations agreed. The artifact inventory itself was unchanged and remained
fully valid.

The pre-existing ignored proof-root `.DS_Store` is excluded by both `.gitignore` and the inventory
generator and remains non-governed metadata. WP-57 neither created nor changed it.

## Owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP57-DEC-001` | Accept `WP57-REM-001` through `008` as the bounded static correction of `WP56-DEV-001` and `WP56-DEV-002`. | Accepted |
| `WP57-DEC-002` | Accept `WP57-BIND-001` through `027` and the renewed 72-file inventory after one fresh independent static `PASS`. | Accepted |
| `WP57-DEC-003` | Treat the ephemeral value as Compose interpolation data only, never a credential, authorization value, database input, or service-mutation permission. | Accepted |
| `WP57-DEC-004` | Preserve zero real-secret propagation to reachability and zero operational stops as mandatory final-PASS conditions. | Accepted |
| `WP57-DEC-005` | After verified publication, require a new exact published rebinding package before any execution-identity or controlled-run decision. | Accepted |
| `WP57-DEC-006` | Keep dependencies, credentials/environments, preflight, images, Docker/Compose runtime, containers, databases, services, cleanup execution, proof/reproduction, application coding, architecture selection, infrastructure, deployment, provider accounts/cost, customer/live data, and network closed. | Accepted |

## Frozen WP-57 public/proof inventory

Owner review and any later publication authorization apply only to these fourteen paths:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/21_TP01_EXACT_EXECUTION_CONTRACT.md`
4. `docs/59_TP01_CONTROLLED_FULL_SEQUENCE_EXECUTION_RESULT.md`
5. `docs/60_TP01_REACHABILITY_COMPOSE_INTERPOLATION_OPERATIONAL_STOP_STATIC_REMEDIATION.md`
6. `proofs/tp-01-tenant-boundary/README.md`
7. `proofs/tp-01-tenant-boundary/scripts/deviation-contract.mjs`
8. `proofs/tp-01-tenant-boundary/scripts/deviation-contract.test.mjs`
9. `proofs/tp-01-tenant-boundary/scripts/db-reset.mjs`
10. `proofs/tp-01-tenant-boundary/scripts/evidence-verify.mjs`
11. `proofs/tp-01-tenant-boundary/scripts/runtime-reachability-contract.mjs`
12. `proofs/tp-01-tenant-boundary/scripts/runtime-reachability-contract.test.mjs`
13. `proofs/tp-01-tenant-boundary/scripts/runtime-reachability.mjs`
14. `proofs/tp-01-tenant-boundary/scripts/runtime-reachability-remediation.test.mjs`

Ignored inventory, validation, and independent-review records remain under `internal-local/` and
must not be published.

## Next gate

WP-57 is `OWNER_ACCEPTED_PUBLICATION_AUTHORIZED`. Commit and push are authorized only for the exact
frozen fourteen-path public/proof inventory. After verified publication, activate WP-58 for
published-revision rebinding and reauthorization-readiness documentation only; runtime and all
other closed boundaries remain closed.
