# TP-01 Failure-Diagnostic Retention and Final-Verifier Consistency Remediation

## Document control

| Field | Value |
| --- | --- |
| Status | Ready for Owner Review — independent static validation PASS |
| Work package | `WP-31 Failure-Diagnostic Retention and Final-Verifier Consistency Remediation` |
| Governing decision | `DEC-161` |
| Owner | Aung Myo Oo |
| Date | 2026-10-07 |
| Runtime execution | Closed |
| Publication | Not authorized |

## Objective

Correct only the two accepted WP-30 harness defects without rerunning or reinterpreting WP-30:

1. retain bounded and sanitized stdout/stderr when the proof test child exits nonzero; and
2. make final-verifier Compose checks consume the same preserved-raw and normalized contract as
   preflight.

The work package adds dependency-free static tests, renews every affected proof hash, and requires
one fresh independent static validator. It does not establish any tenant-boundary, database-policy,
cleanup, reproduction, security, performance, architecture, or implementation result.

## Authorized and closed boundary

Authorized paths are limited to the disposable TP-01 proof, this governing documentation, and
ignored private WP-31 static evidence. Authorized commands are exact Node syntax checks, the two
built-in-only contract tests, the built-in-only inventory generator, and read-only repository/file
validation.

Dependencies, preflight, Docker/Compose commands, images, containers, databases, services, SQL,
fixtures, listeners, cleanup execution, proof/reproduction, execution-evidence verification,
application coding, final architecture selection, infrastructure, deployment, provider
accounts/cost, customer/live data, commit, push, merge, and unrelated external changes remain
closed.

## Remediation controls

| ID | Control | Static acceptance |
| --- | --- | --- |
| `WP31-REM-001` | A nonzero or spawn-failed child produces a typed `CommandExecutionError` with separate stdout/stderr diagnostics and no retained argument values. | Nonzero, missing-executable, and argv-only-secret cases pass |
| `WP31-REM-002` | Redact known proof credential values, PostgreSQL URL passwords, bearer values, and secret-shaped key/value fields before any diagnostic is bounded or written. | Representative labelled and unlabelled secret corpus is absent after sanitization |
| `WP31-REM-003` | Bound each stream to 8,192 UTF-16 code units, retain head/tail context, mark truncation, and record original/retained character and UTF-8 byte counts. | Oversized-output case passes |
| `WP31-REM-004` | Before propagating a failed TypeScript-compile or Node-test child, write the role-specific `primary-execution-failure.json` or `reproduction-execution-failure.json`, record the failed phase, and classify it as synthetic-proof diagnostic evidence. | Source inspection and syntax pass; proof is not run |
| `WP31-REM-005` | Final verification imports the shared Compose contract and requires agreement across exact stdout, raw semantic line, normalized value, and expected normalized value. | Compose contract cases pass |
| `WP31-REM-006` | Accept raw `5.4.0` or `v5.4.0` only; fail on framing, whitespace, version, raw-field, or normalized-field drift. | Positive and negative pure cases pass |
| `WP31-REM-007` | Renew the complete proof inventory after all static changes and obtain exactly one fresh read-only independent validator. | Inventory and independent report match |

## Evidence semantics

Failure artifacts are diagnostic evidence only. They cannot substitute for result/audit streams,
state-integrity evidence, reproduction, role review, cleanup, or final verification. Their
`customerOrLiveDataAuthorized: false` field is a boundary assertion, not a content-classification
engine; the proof remains synthetic-only, and future execution must stop if that premise is false.

Sanitization is intentionally layered and bounded, but no finite pattern set proves absence of all
possible sensitive text. Future authorization must keep secrets out of child output and treat the
private evidence directory as restricted. WP-31 neither opens nor validates a future execution.

## Static binding

| ID | Binding | Value |
| --- | --- | --- |
| `WP31-BIND-001` | Baseline revision | `138ff4ae8548d9ee61707a1c714a352e6af9d320` |
| `WP31-BIND-002` | Exact Node runtime | `v22.23.1` |
| `WP31-BIND-003` | Diagnostic limit | 8,192 UTF-16 code units per stream |
| `WP31-BIND-004` | Argument retention | Count only; values excluded |
| `WP31-BIND-005` | Failure files | `primary-execution-failure.json`, `reproduction-execution-failure.json` |
| `WP31-BIND-006` | Accepted normalized Compose value | `5.4.0` |
| `WP31-BIND-007` | Accepted raw Compose lines | `5.4.0`, `v5.4.0` |
| `WP31-BIND-008` | Proof inventory count | 55 files |
| `WP31-BIND-009` | Artifact inventory SHA-256 | `0ca441d9a0f54f376a261eb7cfd31da87b446ac7661e22b844a85e200ac40dba` |
| `WP31-BIND-010` | Proof content-set SHA-256 | `6aed9d69542495dda673d1b8adc524e949642f63d8ba15bda63cea536a62ba56` |
| `WP31-BIND-011` | Package SHA-256 | `d10a8e2e5bfeb170cfb6f29485a5376689ad4e73dcbc68c62cc7348ffc4dcc1e` — unchanged |
| `WP31-BIND-012` | Lockfile SHA-256 | `752d4154434adc69d6f18021555a368dbfd2d764bf7ed6c37810371b93f6e1af` — unchanged |
| `WP31-BIND-013` | 222-case manifest SHA-256 | `de4e412a27f35bc96a3858174bcf186ae02f84c08a0e94b28771e3db78a2665f` — unchanged |
| `WP31-BIND-014` | Command wrapper SHA-256 | `3a1149eb6ae712e3cdcbbc48badb0b0f7886b4bfc5e6f45bb0cf000af204ed53` |
| `WP31-BIND-015` | Command static test SHA-256 | `e7109c1cc87721a9c60771f156709c685b2af26d4d7fa185e0cdd04cd7a49ca0` |
| `WP31-BIND-016` | Proof runner SHA-256 | `91ddcad8f13550b17c4636105e5e61a8cc5c685986ec93e56f51fbc4e5c0c8e6` |
| `WP31-BIND-017` | Final verifier SHA-256 | `0d8b9f10037532a7821a308cbd636dd09ab5df3595bcb8175191e27e1f68ee2a` |
| `WP31-BIND-018` | Compose remediation contract SHA-256 | `e373176ac130b6d559b902ca8972cf0fb671d796211ba44a122970863c03348b` |
| `WP31-BIND-019` | Compose contract test SHA-256 | `56f72f01bb3a433ff9f0a5caf32fb688aa45efd5caacf3d960e7c874a66554a6` |
| `WP31-BIND-020` | Proof README SHA-256 | `0bed641fe471eebac246afb92686acca918920f8af791caf1d6f94d70b9c58fb` |
| `WP31-BIND-021` | Independent validator | `/root/wp31_static_validator` — PASS after remediation revalidation |

## Independent static validation

Exactly one fresh read-only validator, `/root/wp31_static_validator`, reviewed the frozen package.
Its first pass found a high-severity gap because TypeScript compilation sat outside the dedicated
failure-artifact boundary. It later identified missing spawn-failure/argv-secret coverage and a
short-known-credential redaction exception. The proof was corrected after each finding and the
complete inventory was renewed; no proof runtime action occurred.

The same validator's final revalidation returned `PASS` with no unresolved high, medium, or low
finding. It independently reproduced all 55 file hashes, artifact-inventory SHA-256
`0ca441d9a0f54f376a261eb7cfd31da87b446ac7661e22b844a85e200ac40dba`, and content-set SHA-256
`6aed9d69542495dda673d1b8adc524e949642f63d8ba15bda63cea536a62ba56`. Exact Node syntax and both
dependency-free tests passed. The validator made zero mutation.

## Recommended owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP31-DEC-001` | Accept `WP31-REM-001` through `WP31-REM-007` as the bounded correction of `WP30-DEV-002/003`. | Proposed |
| `WP31-DEC-002` | Accept the renewed proof inventory and independent static-validation result exactly as recorded after freeze. | Proposed |
| `WP31-DEC-003` | Preserve WP-30 as immutable Inconclusive evidence; do not infer the former failing assertion or retry that run. | Proposed |
| `WP31-DEC-004` | Treat WP-31 as static harness evidence only, with no tenant-boundary, architecture, dependency, or execution result. | Proposed |
| `WP31-DEC-005` | Require a later owner package to bind any future decision to the published WP-31 revision/tree and renewed hashes; do not authorize execution here. | Proposed |
| `WP31-DEC-006` | Keep every dependency, runtime-resource, application, architecture-selection, infrastructure, deployment, provider, and customer/live-data gate closed. | Proposed |

## Frozen public inventory

Owner review and any later publication authorization apply only to these eleven paths:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/33_TP01_CONTROLLED_REMEDIATED_EXECUTION_RESULT.md`
4. `docs/34_TP01_FAILURE_DIAGNOSTIC_FINAL_VERIFIER_STATIC_REMEDIATION.md`
5. `proofs/tp-01-tenant-boundary/README.md`
6. `proofs/tp-01-tenant-boundary/scripts/command.mjs`
7. `proofs/tp-01-tenant-boundary/scripts/command.test.mjs`
8. `proofs/tp-01-tenant-boundary/scripts/proof-run.mjs`
9. `proofs/tp-01-tenant-boundary/scripts/remediation-contract.mjs`
10. `proofs/tp-01-tenant-boundary/scripts/remediation-contract.test.mjs`
11. `proofs/tp-01-tenant-boundary/scripts/evidence-verify.mjs`

Private authorization and validation evidence remain ignored under `internal-local/` and must not
be published.

## Next gate

WP-31 stops after renewed hash binding and one fresh independent static validation. Commit, push,
execution, or any later binding package requires a new owner acceptance.
