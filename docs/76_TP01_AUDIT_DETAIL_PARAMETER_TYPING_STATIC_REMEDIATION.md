# TP-01 Audit-Detail Parameter Typing Static Remediation

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted under standing completion authority — independent static validation PASS; publication authorized |
| Work package | `WP-73 Audit-Detail Parameter Typing Static Remediation` |
| Governing decision | `DEC-203` |
| Governing findings | `WP72-DEV-001` through `WP72-DEV-003` |
| Governing controls | `WP72-REM-001` through `WP72-REM-007` |
| Base publication | `9abe1c36fd307da136284969f7805067bd92ceda` |
| Base repository tree | `fb29597108583f3cb4eea62ae8a82fc0c0d3f63d` |
| Base proof tree | `7542b7459c0296dbbc6cf74636b0efb97201968a` |
| Owner | Aung Myo Oo |
| Date | 2026-10-09 |
| Runtime result | None — WP-73 is static-only |

## Objective and authority

WP-73 prospectively corrects the single audit-detail parameter typing defect exposed by immutable
WP-72. It changes only the disposable TP-01 audit writer, its dependency-free static contract and
test, the proof README, governing documentation, and ignored private static evidence needed to
specify, validate, hash, and independently review that correction.

The exact candidate SQL expression is:

```sql
jsonb_build_object('reason', $12::text, 'synthetic', true)
```

The explicit `::text` cast gives PostgreSQL a concrete type for parameter `$12` before the
polymorphic `jsonb_build_object` call. It preserves the existing parameterized query and JSON
shape; it does not interpolate the reason into SQL, widen the accepted reason set, change an
allow/deny outcome, or change audit visibility.

The owner has granted standing completion authority to finish the bounded authorized work without
repeated acceptance prompts. That authority permits this static-remediation package and its exact
later publication only after the package is frozen and the required fresh independent validator
returns `PASS`. It does not expand any runtime or product gate.

WP-73 authorizes no package-manager or dependency operation, credential or private-environment
generation/use, preflight, image inspection or retrieval, Docker/Compose command, pull token,
container, database, service, SQL execution, fixture, cleanup execution, proof or reproduction,
execution-evidence verification, network access, application coding, final architecture
selection, infrastructure, deployment, provider account/cost, or customer/live-data action.
Static PASS will not be a TP-01 runtime result and will not authorize a retry.

## Immutable WP-72 evidence and root cause

WP-72 run `wp72-2026-10-09-01` remains `INCONCLUSIVE_CLOSED_NO_RETRY`. Its manifest-inventory
test passed, but every executable case `TP1-C001` through `TP1-C222` stopped with PostgreSQL
`42P18`, `could not determine data type of parameter $12`, before any case oracle completed. The
sanitized stack consistently located the failure at the insert performed by `src/audit.ts`.

The audit query supplied `$12` only as an argument to the polymorphic `jsonb_build_object` call.
PostgreSQL therefore lacked a concrete parameter type during statement analysis. The supplied
value is `AuthorizationDecision.reason`, a non-null string-literal union. Casting that already
parameterized value to `text` is the smallest source correction and preserves the JSON string
meaning expected by the existing audit reader and case oracles.

WP-73 does not rewrite or reinterpret the WP-72 packet. In particular:

- the 17-entry role-review seal and final 21-entry private evidence inventory remain immutable;
- all 222 executable cases remain stopped, not passed;
- absence of the earlier PostgreSQL `54001` error remains diagnostic progress only;
- unchanged PRIMARY state remains bounded integrity evidence only;
- no tenant-isolation, zero-leakage, audit-behavior, reproduction, architecture, dependency, or
  implementation result is inferred from WP-72 or from this static correction.

## Remediation controls

| ID | Control | Candidate state |
| --- | --- | --- |
| `WP73-REM-001` | Preserve WP-72, its stopped cases, three role reviews, 17-entry seal, 21-entry private inventory, fail-closed final-verifier outcome, cleanup, and residual verification as immutable Inconclusive evidence; never resume or rewrite that run. | Required |
| `WP73-REM-002` | Change only the audit-detail reason parameter at the exact polymorphic JSON-construction boundary from `$12` to `$12::text`. | Satisfied |
| `WP73-REM-003` | Preserve parameterization, the exact `reason` and `synthetic` JSON keys, JSON string/boolean value types, the non-null reason-domain contract, and all current audit allow/deny meanings. | Satisfied |
| `WP73-REM-004` | Add `scripts/audit-detail-parameter-contract.mjs` as a dependency-free static contract that verifies the exact safe audit query and rejects the untyped polymorphic parameter or broader semantic drift. | Satisfied |
| `WP73-REM-005` | Add `scripts/audit-detail-parameter-contract.test.mjs` with positive and fail-closed mutation cases for missing cast, changed cast, parameter interpolation, changed JSON keys/types, changed placeholder/parameter order, and unreviewed audit-query drift. | Satisfied |
| `WP73-REM-006` | Preserve every protected runtime, tenancy, authorization, RLS, role/grant, case-oracle, manifest, launcher, evidence, handoff, stop, cleanup, and network semantic outside this exact audit typing boundary. | Satisfied |
| `WP73-REM-007` | Renew every affected artifact hash, the complete sorted proof inventory, artifact-inventory hash, canonical content-set hash, syntax count, and dependency-free test-suite count after the final candidate freeze. | Satisfied |
| `WP73-REM-008` | Obtain exactly one fresh independent static validator after final freeze; accept no package with a finding, mutation, incomplete inventory, or authority-boundary violation. | Satisfied |
| `WP73-REM-009` | Keep all dependency, material, runtime, proof, network, product, architecture, infrastructure, deployment, provider, and customer/live-data gates closed. | Required |

## Exact candidate change

The sole executable-source change is in `proofs/tp-01-tenant-boundary/src/audit.ts`:

```diff
- jsonb_build_object('reason', $12, 'synthetic', true)
+ jsonb_build_object('reason', $12::text, 'synthetic', true)
```

The parameter array remains unchanged. Position 12 remains `decision.reason`; positions 1 through
11 and their meanings remain unchanged. The insert target, columns, transaction behavior, commit
mode, sanitized read path, and returned audit identifier remain unchanged.

The expected new dependency-free contract paths are:

1. `proofs/tp-01-tenant-boundary/scripts/audit-detail-parameter-contract.mjs`
2. `proofs/tp-01-tenant-boundary/scripts/audit-detail-parameter-contract.test.mjs`

The contract must use only Node built-ins. It must inspect source bytes without building,
transpiling, installing, importing application dependencies, connecting to PostgreSQL, or running
the proof. The README change may describe this prospective static contract but must not claim a
runtime resolution.

## Protected unchanged artifacts and semantics

Unless final static evidence discovers a contradiction and records it before freeze, WP-73 must
leave the following unchanged:

- `sql/001_roles.sql`, `sql/002_schema.sql`, `sql/003_rls.sql`, `sql/004_fixture.sql`, and every
  other SQL artifact;
- the accepted acyclic forced-RLS graph, all six `ENABLE` and `FORCE ROW LEVEL SECURITY` controls,
  security-definer/invoker boundaries, fixed search paths, ownership, public revocation, and exact
  runtime grants;
- both proof roles, including the non-login owner and non-superuser, `NOBYPASSRLS` runtime role;
- `src/types.ts`, policy evaluation, path execution, database context, and audit read behavior;
- all 222 case definitions, expected allow/deny outcomes, zero-leakage and audit assertions, and
  the frozen case manifest;
- package manifest, lockfile, dependency versions, Compose definition, database image digest and
  platform, and every dependency-supply-chain binding;
- preflight, launcher allowlists, private-environment parsing, conditional image gate,
  reachability, database-reset, database-evidence, proof-run, handoff, stop, deviation, diagnostic,
  final-verifier, and authorization-independent cleanup interfaces;
- evidence minimization, credential handling, no-egress rules, dedicated-checkout requirement,
  role independence, mandatory cleanup, and fail-closed verification.

The cast is a PostgreSQL statement-typing correction only. It must not become an application
architecture decision, production schema decision, general audit format, provider selection, or
proof-result claim.

## Candidate bindings

| ID | Bound fact | State |
| --- | --- | --- |
| `WP73-BIND-001` | Base publication is `9abe1c36fd307da136284969f7805067bd92ceda`. | Bound |
| `WP73-BIND-002` | Base repository tree is `fb29597108583f3cb4eea62ae8a82fc0c0d3f63d`; base proof tree is `7542b7459c0296dbbc6cf74636b0efb97201968a`. | Bound |
| `WP73-BIND-003` | Governing run `wp72-2026-10-09-01` is immutable `INCONCLUSIVE_CLOSED_NO_RETRY`; its execution authorization is consumed and non-reusable. | Bound |
| `WP73-BIND-004` | The exact source candidate is `$12::text` only at the audit-detail `jsonb_build_object` reason value; `src/audit.ts` SHA-256 is `bb4edf166e9f0c288467f3e1e1cc39cd577a60ea1e13e53ea401d98ae860d23e`. | Bound |
| `WP73-BIND-005` | `decision.reason` remains the existing non-null string-literal union; no domain value or allow/deny meaning changes. | Bound |
| `WP73-BIND-006` | The audit query remains parameterized with 12 placeholders and the existing ordered 12-value parameter array. | Bound and tested |
| `WP73-BIND-007` | Audit JSON remains exactly `reason` as a JSON string and `synthetic` as JSON boolean `true`. | Bound and tested |
| `WP73-BIND-008` | `audit-detail-parameter-contract.mjs` is dependency-free and accepts only the exact candidate source shape and frozen semantic context; SHA-256 is `02f997e6a6abc0dcd1037eda0ad17217c16f30c4eaf07d6c4040f0b4ecfa6763`. | Bound and passed |
| `WP73-BIND-009` | `audit-detail-parameter-contract.test.mjs` proves positive acceptance and fail-closed rejection of untyped, interpolated, reordered, re-keyed, retyped, or otherwise drifted variants; SHA-256 is `a534406c19964658f34ca2d97f2fb41d77616be8bbf7083528894679f402f1e0`. | Bound and passed |
| `WP73-BIND-010` | README language distinguishes static typing remediation from runtime proof; SHA-256 is `79e73ac1fb4387441e7146dba81365064761cd2ee493a86ff8705d1ca9e755c3`. | Bound |
| `WP73-BIND-011` | The renewed proof inventory contains 82 sorted unique files. | Bound |
| `WP73-BIND-012` | Artifact-inventory SHA-256 is `93d1e7975dc13d3f1bd5e5471473b3008dd99df56630447ce78779ecfa12a759`; canonical no-terminal-LF content-set SHA-256 is `89f63f1749ac20a453f0c45923e2d7de3b8a722541d9fb872650c7a2facae222`. | Bound |
| `WP73-BIND-013` | The four-path proof delta is exactly README, `src/audit.ts`, and the two new audit-detail contract files; every entry is included in the renewed 82-file inventory. | Bound |
| `WP73-BIND-014` | Exact Node `v22.23.1` syntax passed for all 49 `scripts/*.mjs` files. | Passed |
| `WP73-BIND-015` | All 16 dependency-free `scripts/*.test.mjs` suites passed. | Passed |
| `WP73-BIND-016` | Package manifest, lockfile, dependency versions, Compose, image, SQL, RLS graph, evidence verifier, proof cases, case manifest, proof runner, and every protected operational control remain byte-identical. | Bound and checked |
| `WP73-BIND-017` | No dependency, credential/environment, preflight, image, Docker/Compose runtime, container, database, service, SQL, fixture, cleanup, proof/reproduction, or network action occurred during WP-73. | Attested |
| `WP73-BIND-018` | No application, architecture, infrastructure, deployment, provider-account/cost, customer/live-data, or external-system action occurred during WP-73. | Attested |
| `WP73-BIND-019` | Fresh independent validator `/root/wp73_static_validator` reproduced the exact nine-path scope, 82 entries, both aggregate hashes, 49 syntax checks, 16 suites, query/parameter/JSON contract, eleven protected hashes, leakage absence, clean index and whitespace, and every closed gate; it returned `PASS` with zero findings and zero candidate mutation. Private validation SHA-256 is `ceca7aebce165c284a2c75f0516f41e23e318e113862e8275133d0bd82ba2001`. | Satisfied |

The canonical content-set checksum must use sorted inventory order with each entry rendered as
`path + NUL + bytes + NUL + sha256`, joined by LF with no terminal LF, consistent with the
accepted TP-01 inventory contract.

## Primary static validation

Primary validation was dependency-free and limited to source/static operations:

1. confirm the diff is confined to the accepted WP-73 path boundary;
2. verify the exact `$12::text` source correction and unchanged 12-value parameter order;
3. run the new audit-detail parameter contract and all of its built-in-only mutation tests;
4. run exact Node `v22.23.1` syntax checks for every `scripts/*.mjs` file;
5. run every dependency-free `scripts/*.test.mjs` suite with exact Node `v22.23.1`;
6. confirm protected files and semantics remain unchanged against the accepted base proof tree;
7. regenerate the complete sorted artifact inventory and both aggregate hashes;
8. run `git diff --check` and confirm the Git index is empty before the publication gate;
9. obtain exactly one fresh independent static validation over the final frozen bytes; and
10. reject the package if validation runs any dependency, build, database, Docker, proof,
    cleanup, network, or external-system operation.

All 49 exact-Node syntax checks and all 16 built-in-only suites passed. The new mutation suite
accepted only the exact typed query and rejected the untyped reason, wrong cast, interpolation,
detail-key/value drift, placeholder/value reordering, and changes to eleven protected source
artifacts. Inventory renewal produced exactly 82 sorted entries and both aggregate hashes recorded
in `WP73-BIND-012`. `git diff --check` passed and the Git index remained empty.

Static validation does not claim PostgreSQL accepted the corrected statement. Only a separately
authorized later controlled execution could measure that behavior and the 222 case oracles.

## Recommended owner dispositions under standing completion authority

| ID | Recommendation | Current state |
| --- | --- | --- |
| `WP73-DEC-001` | Accept `WP73-REM-001` through `WP73-REM-009` only after the fresh independent static validator returns `PASS` over the frozen candidate. | Accepted |
| `WP73-DEC-002` | Accept `WP73-BIND-001` through `WP73-BIND-019`, the renewed inventory, and all final hashes only after complete root and independent reproduction. | Accepted |
| `WP73-DEC-003` | Accept `$12::text` as a TP-01-only prospective PostgreSQL parameter-typing correction that preserves the existing parameterized audit JSON semantics. | Accepted |
| `WP73-DEC-004` | Preserve WP-72 and all earlier stopped attempts as immutable, expired, non-resumable Inconclusive evidence. | Accepted |
| `WP73-DEC-005` | Treat static PASS as source evidence only; accept no runtime, tenant-isolation, zero-leakage, audit, reproduction, architecture, dependency, implementation, or production-security result. | Accepted |
| `WP73-DEC-006` | After final hash renewal and independent PASS, authorize commit and push only for the exact frozen WP-73 public/proof inventory. | Accepted |
| `WP73-DEC-007` | After verified publication, activate one documentation-only published rebinding and reauthorization-readiness package as the next gate. | Accepted |
| `WP73-DEC-008` | Keep dependencies, materials, runtime, proof/reproduction, network, application coding, final architecture selection, infrastructure, deployment, provider accounts/cost, and customer/live data closed through the next gate. | Accepted |

Standing completion authority permits these dispositions to advance automatically only when all
their stated evidence conditions are satisfied. It does not permit bypassing a failed validator,
changing the frozen scope, or inferring execution authority.

## Candidate frozen public/proof inventory

The exact accepted publication boundary is listed below. The one fresh independent static
validator returned `PASS`; publication is authorized only for these nine paths.

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/21_TP01_EXACT_EXECUTION_CONTRACT.md`
4. `docs/75_TP01_CONTROLLED_RECURSIVE_RLS_EXECUTION_RESULT.md`
5. `docs/76_TP01_AUDIT_DETAIL_PARAMETER_TYPING_STATIC_REMEDIATION.md`
6. `proofs/tp-01-tenant-boundary/README.md`
7. `proofs/tp-01-tenant-boundary/src/audit.ts`
8. `proofs/tp-01-tenant-boundary/scripts/audit-detail-parameter-contract.mjs`
9. `proofs/tp-01-tenant-boundary/scripts/audit-detail-parameter-contract.test.mjs`

No other public/proof path may be included in publication.

Ignored private inventory, static evidence, validator records, and work-package controls remain
under `internal-local/` and must never be published.

## Next gate

WP-73 ends at proof-only static remediation. After final freeze, renewed inventory and hashes,
root validation, exactly one fresh independent static-validator `PASS`, standing-authority
acceptance, exact-scope commit and push, and live-remote verification, the next package may perform
published rebinding and reauthorization-readiness documentation only.

That next package may bind the exact published candidate and preserved stopped history and analyze
later workspace/execution options. It may not create an execution identity or authorization draft,
restore or invoke dependencies, generate credentials or environments, inspect or retrieve images,
invoke Docker/Compose, create containers/databases/services, execute SQL, cleanup, proof, or
reproduction, use network access, change application code, select architecture, create
infrastructure, deploy, incur provider cost, or access customer/live data. Any later execution
would require new identities and a separate exact authorization chain; it is not authorized by
WP-73.

## Verified publication and WP-74 activation

The exact frozen WP-73 inventory was published at
`052b6b7855bd726d5fe1de44db0067ba54eb23ff` with repository tree
`fef38848093945a7a69bec8b882f1233493da139` and proof tree
`c2cbcb3f117653d2f42f0ee688dab5baf0055c8f`. This document's committed SHA-256 is
`218d4c7eb28dd04fe4dcf6db545c6a0aff36f6ffaaae8e605717fdada707fab3`. WP-73 is
`VERIFIED_AND_CLOSED`.

WP-74 is activated only for documentation-only published rebinding and reauthorization readiness.
It may record the exact candidate, stopped history, workspace and candidate choices, role/no-draft
state, and later gates. It may not change the proof, instantiate identities, prepare a private
authorization draft, create material or runtime state, execute TP-01, use network access, or open
any product, architecture, infrastructure, deployment, provider, or customer-data gate.
