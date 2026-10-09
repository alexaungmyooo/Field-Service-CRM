# TP-01 Primary-Result Semantic Alignment Static Remediation

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted under standing completion authority — independent static validation PASS; exact publication authorized |
| Work package | `WP-81 Primary-Result Semantic Alignment and Handoff Diagnostic Remediation` |
| Governing decisions | `DEC-214`; `DEC-215`; `DEC-216` |
| Base publication | `93295af37df943c4f7810ef245c41294ffaea2fc` |
| Base repository tree | `ef13e09ebd4a09cff05e70c08d2518658bad8a38` |
| Base proof tree | `b5f144de1e948030e0c61aaeae90d36b79f0466a` |
| Owner | Aung Myo Oo |
| Date | 2026-10-09 |
| Runtime | Not authorized and not executed |
| Publication | Authorized only for the exact eleven-path frozen inventory after final disposition-delta validation |

## Objective and authority boundary

WP-81 statically corrects the semantic-control mismatch that stopped immutable WP-80 run 02 at
`TP1-C199`. It preserves the emitted proof result and frozen manifest, introduces one group-aware
result-context contract, applies that contract to PRIMARY and REPRODUCTION verification, includes
cleanup-reset and organization-sequence evidence in cross-run comparison, provides minimized typed
semantic-failure metadata, and renews every affected proof/private-control identity.

WP-81 cannot restore or invoke dependencies; create or use credentials, environments, or tokens;
run preflight, image inspection/retrieval, Docker/Compose, containers, databases, services, SQL,
cleanup, proof, handoff, reproduction, or network; modify application code; select architecture;
create infrastructure; deploy; incur provider cost; or access customer/live data. All WP-80 runs,
controls, and evidence remain immutable.

## Confirmed root cause

The WP-80 private handoff semantic contract required
`PER_CASE_TRANSACTION_ROLLBACK_AND_AUDIT_APPEND` for every result before it branched by case group.
The 24 frozen `TP1-CASE-008` pool-reuse cases, `TP1-C199` through `TP1-C222`, correctly emit
`SAME_CONNECTION_TRANSACTION_CONTEXT_RESET_AND_CONCURRENT_ISOLATION`, their three-organization
sequence, and source/concurrent/restored authoritative context. The first valid pool record was
therefore deterministically rejected even though its evidence shape matched the proof emitter and
manifest.

The proof emitter and manifest are unchanged. The defect was in the later semantic control.

## Remediated contract

The new pure dependency-free contract requires:

- the concurrency-reset marker, exact three-organization sequence, and exact synthetic source,
  concurrent, and restored identities for every `TP1-CASE-008` result;
- the per-case rollback marker, no organization sequence, and exact resolved or minimized denied
  context shape for every other result;
- a typed failure carrying only `TP1_PRIMARY_RESULT_CONTEXT_INVALID`, case ID, and semantic-check
  identifier;
- a safe generic minimized failure when an error does not originate from that contract; and
- application of the same contract to PRIMARY and REPRODUCTION result files before comparison.

The stable PRIMARY/REPRODUCTION comparison now includes `cleanupReset` and
`organizationSequence`. A reproduction cannot claim `MATCH` after changing reset meaning or the
pool-reuse organization sequence.

The first independent review found `WP81-VAL-001`: the minimizer had no formal retained-evidence
caller, and the legacy exact handoff-stop schema rejected case/check metadata. The renewed
candidate preserves immutable schema-version-1 WP-80 evidence and adds a schema-version-2 formal
builder that consumes the minimizer directly. Version 2 permits exactly one nested semantic-
failure object. A new private exclusive-create writer validates the record, rejects contradictory
handoff/reproduction artifacts, refuses overwrite, writes mode `0400`, and retains no raw error.

The new prospective private semantic contract does not modify WP-80. It validates every original
result through the new helper, then supplies an isolated compatibility view only to reuse the
remaining already reviewed WP-80 audit, fixture, and state checks. The compatibility view cannot
weaken or replace validation of the original group-specific marker.

## Exact candidate binding

| ID | Exact binding | State |
| --- | --- | --- |
| `WP81-BIND-001` | Base publication `93295af37df943c4f7810ef245c41294ffaea2fc` | Exact |
| `WP81-BIND-002` | Base repository tree `ef13e09ebd4a09cff05e70c08d2518658bad8a38` | Exact |
| `WP81-BIND-003` | Base proof tree `b5f144de1e948030e0c61aaeae90d36b79f0466a` | Exact |
| `WP81-BIND-004` | Both WP-80 runs and all earlier stopped runs remain immutable and non-reusable | Preserved |
| `WP81-BIND-005` | Proof emitter `test/proof.test.ts` and manifest `test/case-manifest.json` | Byte-unchanged |
| `WP81-BIND-006` | New result-context contract SHA-256 `b2f422d29b38388784840aa896c8eeff33b7a968a942c18bfb874bc6df41554f` | Renewed |
| `WP81-BIND-007` | New result-context tests SHA-256 `0571a19469ee809ea6c4e5d17b7d5bc9701c9331bcca74b95ab548c4faf15b1d` | Renewed |
| `WP81-BIND-008` | Evidence verifier SHA-256 `7b8f9987c65e51d7c61c76e63d7b85a4d62e2726dfc81496f8a4980bf18612ef` | Renewed |
| `WP81-BIND-009` | Audit-detail compatibility pin SHA-256 `a850fd11d7145059cc82de87b52aa826e6301f49c8d3de5b61a5d6e530f06dfc` | Renewed only for verifier identity |
| `WP81-BIND-010` | Proof README SHA-256 `b031d855f044e4d7f80018de36b3c257fd0bf61de8107fdb397afa959ea36ede` | Renewed |
| `WP81-BIND-011` | Prospective private semantic contract SHA-256 `4aeb6fcfa7657ecd56a835207baa7de7bd9044c9bb29857497eb0b1b2cf73bc2` | Ignored/private |
| `WP81-BIND-012` | Private semantic test SHA-256 `a879d82de2385b514001091bb7377af2c080011a37ec6cc9239ef176b7d9ef23` | Ignored/private |
| `WP81-BIND-013` | Proof inventory contains 86 sorted unique files | Renewed |
| `WP81-BIND-014` | Artifact-inventory SHA-256 `c3f843736e6dc9024928ed9b37f19a143bd2c872f266e48d76fe51c2c8e3936f` | Renewed |
| `WP81-BIND-015` | Canonical no-terminal-LF content-set SHA-256 `b13af7f9221cad17474d3a3d2c30216410f51407d0af07c55c79c6c9b0603fe3` | Renewed |
| `WP81-BIND-016` | Exact Node `/Users/aungmyooo/.nvm/versions/node/v22.23.1/bin/node`, version `v22.23.1` | Verified |
| `WP81-BIND-017` | All 53 proof `scripts/*.mjs` exact-Node syntax checks | `PASS` |
| `WP81-BIND-018` | All 18 dependency-free proof `scripts/*.test.mjs` suites | `PASS` |
| `WP81-BIND-019` | Private semantic syntax and retained 222-record semantic suite | `PASS` |
| `WP81-BIND-020` | All 24 pool cases accepted with group-specific marker and context | Static `PASS` |
| `WP81-BIND-021` | Wrong ordinary/pool markers, sequence, context keys, and context values fail closed | Static `PASS` |
| `WP81-BIND-022` | Stable comparison includes cleanup reset and organization sequence | Static `PASS` |
| `WP81-BIND-023` | Exact public/proof candidate is eleven paths; every other tracked path is unchanged | Frozen candidate |
| `WP81-BIND-024` | No dependency, runtime, proof, network, product, architecture, infrastructure, deployment, provider, or customer-data action | Closed |
| `WP81-BIND-025` | One fresh independent static validator must reproduce the entire candidate without mutation | Renewed freeze `PASS`; zero mutation |
| `WP81-BIND-026` | Handoff-stop contract SHA-256 `e38c6f3ef73118b0e1958d525229ab11ec71b141357afef288b6f40397277a21` | Renewed; v1 preserved, v2 added |
| `WP81-BIND-027` | Handoff-stop tests SHA-256 `266cfabc18eb8f4e09401f655bb1eb95c7ef20be11562dcdc64b45b708af67c9` | Renewed |
| `WP81-BIND-028` | Private failure-evidence control SHA-256 `db920054de8b25b52202f76c24d4e0fb564d9494b016d819684e9f0c34ee2c2e` | Ignored/private |
| `WP81-BIND-029` | Private failure-evidence test SHA-256 `1bf0c9c9af13eb5c4172de9f93d4191c6e865c22cd907a586a32f0da4563c32b` | Ignored/private |
| `WP81-BIND-030` | `WP81-VAL-001` formal diagnostic-integration finding | Resolved and independently revalidated |
| `WP81-BIND-031` | Independent static-validation report SHA-256 `6fccd4e70621fe34b35405ec4e69dc6e6ae5d58aad6d392c2ee21f5b3a1c30ea` | `PASS`; ignored/private |

## Primary validation

Root validation used exact Node v22.23.1. All 53 proof-script syntax checks and all 18 built-in-only
proof suites passed. The private semantic suite reproduced the immutable WP-80 `TP1-C199` failure,
accepted the retained 222-record PRIMARY packet, and rejected wrong marker and sequence mutations.
The private failure-control suite created and removed only an OS temporary directory, retained the
exact typed case/check metadata without raw context, and rejected overwrite. `git diff --check` and
the final exact-scope checks remain required at freeze.

Two non-mutating validation-launch deviations are retained. The first aggregate test invocation
ran from the repository root and stopped on existing relative-path assumptions. The second ran
from the proof directory but resolved Node v26.3.1 and stopped on the expected pre-renewal verifier
hash pin. The final authoritative validation used the exact v22.23.1 binary after the required pin
renewal. Neither earlier command invoked dependencies, runtime, proof, or network or changed the
candidate.

## Remediation controls

| ID | Control | Candidate state |
| --- | --- | --- |
| `WP81-REM-001` | Preserve every WP-80 run, control, stop, review, and packet as immutable evidence. | Satisfied |
| `WP81-REM-002` | Preserve the proof emitter and manifest; correct only later semantic validation. | Satisfied |
| `WP81-REM-003` | Enforce exact ordinary-versus-pool cleanup-reset meaning and context shape. | Satisfied |
| `WP81-REM-004` | Include reset meaning and organization sequence in PRIMARY/REPRODUCTION comparison. | Satisfied |
| `WP81-REM-005` | Minimize future semantic diagnostics to code, case ID, and semantic check only, and connect them to a formal exclusively created stop-evidence path. | Satisfied after `WP81-VAL-001` remediation |
| `WP81-REM-006` | Add dependency-free positive and fail-closed regression coverage, including all 24 pool cases. | Satisfied |
| `WP81-REM-007` | Renew all affected proof/private-control hashes and the complete proof inventory. | Satisfied |
| `WP81-REM-008` | Obtain exactly one fresh independent static validator before acceptance/publication. | Satisfied; initial finding resolved and renewed freeze `PASS` |
| `WP81-REM-009` | Keep every dependency, runtime, product, architecture, infrastructure, deployment, provider, network, and customer-data gate closed. | Satisfied |

## Owner dispositions under standing completion authority

| ID | Recommendation | State |
| --- | --- | --- |
| `WP81-DEC-001` | Accept the confirmed group-insensitive WP-80 semantic-control defect and preserve the emitted result/manifest. | Accepted |
| `WP81-DEC-002` | Accept `WP81-REM-001` through `009` and `WP81-BIND-001` through `031` after the sole fresh validator reproduced the renewed freeze without mutation. | Accepted |
| `WP81-DEC-003` | Accept the renewed 86-file proof identity only as a prospective static candidate, not a proof result or dependency selection. | Accepted |
| `WP81-DEC-004` | Accept the compatibility-view approach after independent confirmation that original records are validated first and WP-80 remains immutable. | Accepted |
| `WP81-DEC-005` | After exact publication, activate only WP-82 remediated rebinding and reauthorization readiness documentation; create no execution identity or draft. | Accepted |
| `WP81-DEC-006` | Keep application coding, final architecture selection, dependencies/runtime, infrastructure, deployment, provider/cost, network, and customer/live data closed. | Accepted |

## Frozen candidate inventory

The candidate is limited to exactly:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/83_TP01_CONTROLLED_PRIMARY_HANDOFF_EXECUTION_RESULT.md`
4. `docs/84_TP01_PRIMARY_RESULT_SEMANTIC_ALIGNMENT_STATIC_REMEDIATION.md`
5. `proofs/tp-01-tenant-boundary/README.md`
6. `proofs/tp-01-tenant-boundary/scripts/audit-detail-parameter-contract.mjs`
7. `proofs/tp-01-tenant-boundary/scripts/evidence-verify.mjs`
8. `proofs/tp-01-tenant-boundary/scripts/handoff-stop-contract.mjs`
9. `proofs/tp-01-tenant-boundary/scripts/handoff-stop-contract.test.mjs`
10. `proofs/tp-01-tenant-boundary/scripts/primary-result-context-contract.mjs`
11. `proofs/tp-01-tenant-boundary/scripts/primary-result-context-contract.test.mjs`

Private scope, validation, semantic-control, test, and materialization inventory remain ignored
under `internal-local/` and must never be published.

## Next gate

The same sole fresh independent validator reproduced the renewed eleven-path scope, all 86 file
identities, both aggregate hashes, seven proof-delta hashes, four private-control hashes, 53 syntax
checks, 18 public suites, both private suites, immutable emitter/manifest and WP-80 evidence,
schema-v1 compatibility, schema-v2 formal diagnostic creation, comparison strengthening, secret
absence, closed gates, and zero mutation. Its private report SHA-256 is
`6fccd4e70621fe34b35405ec4e69dc6e6ae5d58aad6d392c2ee21f5b3a1c30ea`.

Under standing completion authority, `DEC-216`, `WP81-REM-001` through `009`, `WP81-BIND-001`
through `031`, `WP81-DEC-001` through `006`, resolved `WP81-VAL-001`, and the exact eleven-path
inventory are accepted. The same validator must confirm this final disposition-only delta before
commit/push. After verified publication, only WP-82 documentation-only rebinding may activate.

## Verified publication and WP-82 activation

The exact eleven-path WP-81 inventory was committed as
`ecc2db4 WP-81: align primary result semantics` and published at
`ecc2db47c4395d19962adcf21f45bf3ff0a0932f`, with repository tree
`5992d550601c451104f7d40e13000e0c109d7f31` and proof tree
`45369309793a803e761ace440c291c7d1ebdfe37`. Local `HEAD`, cached `origin/main`, and live remote
main matched that publication. WP-81 is `VERIFIED_AND_CLOSED` with no runtime result.

WP-82 may only bind the exact published candidate, immutable stopped history, workspace and
semantic options, identity prerequisites, and closed gates in owner-decision documentation. It may
not create an identity or authorization draft, restore dependencies, create materials, run
preflight or runtime, execute proof/reproduction, use network, change application code, select
architecture, create infrastructure, deploy, incur provider cost, or access customer/live data.
