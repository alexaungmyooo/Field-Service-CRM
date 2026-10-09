# TP-01 Tenant Boundary and Authorization Contract

> Disposable technical-proof material. Not application code. Not authorized to execute.

This directory materializes checkpoint 1 of the accepted TP-01 contract in
`docs/21_TP01_EXACT_EXECUTION_CONTRACT.md`.

## Current authorization

WP-53 authorizes proof-only static remediation of the private-environment command-continuity gap.
It permits the exact launcher operation map, built-in-only syntax and launcher tests, governing
documentation, affected hash/inventory renewal, ignored private static evidence, and exactly one
fresh independent read-only static validation after freeze.

WP-53 does **not** authorize dependencies or package-manager operations, credential or environment
generation/use, preflight, image inspection or retrieval, Docker/Compose commands, pull-token
creation, containers, databases, services, SQL, fixtures, listeners, cleanup execution, a TP-01
case or reproduction, execution-evidence verification, application code, architecture selection,
infrastructure, deployment, provider accounts or cost, customer/live data, or network access.

The execution-facing scripts remain closed. They require later owner acceptance, publication,
rebinding, role assignment, and a new effective private authorization before any execution-facing
command may run.

## WP-53 full-sequence private-environment command contract

The launcher accepts exactly an absolute private-environment path and one of these operation names:

```text
preflight
db:verify-image
db:start
runtime:verify-reachability
db:reset
matrix:verify
proof:run
proof:reproduce
evidence:verify
cleanup
evidence:verify-final
```

Each name maps to one immutable child executable and argument vector. Package-script operations
remain behind the unchanged exact-pnpm allowlist. `db:start` maps only to
`docker compose up -d --wait postgres`. Cleanup and final verification map to direct exact-Node
children and never pass through pnpm. No operation accepts user-supplied child arguments.

Before every child, the launcher parses literal private data without shell evaluation, removes
ambient `TP01_*` entries, validates the effective authorization, revision, clean proof inventory,
and bound Node/pnpm paths, and supplies only authorization context plus the operation-specific
private values required by that exact child. In particular, the pull token reaches image
verification only, while cleanup and final verification receive no credential, database URL, or
token value. The direct exact-Node cleanup interface remains available for early-stop cleanup and stays
dependency-free; the cleanup script still generates its own ephemeral Compose-interpolation value
when the bootstrap value is absent.

WP-53 dependency-free static checks are:

```text
$TP01_NODE_BIN --check scripts/private-environment-launcher.mjs
$TP01_NODE_BIN --check scripts/private-environment-launcher.test.mjs
$TP01_NODE_BIN scripts/private-environment-launcher.test.mjs
$TP01_NODE_BIN scripts/hash-inventory.mjs
```

These checks do not invoke dependencies, pnpm/npm, a private runtime environment, preflight,
images, Docker/Compose, cleanup, evidence verification, proof/reproduction, or network access.

## WP-50 private-environment activation contract

The future private environment is data, not shell source. Each non-empty line is one
`KEY=literal value` assignment. The parser splits only on the first `=`, preserves every remaining
byte literally, accepts only the exact reviewed key set, and rejects blank lines, malformed keys,
unknown or duplicate keys, empty values, embedded carriage returns or NULs, missing keys, invalid
package/run context, and non-absolute evidence, Node, or pnpm paths. It performs no quote removal,
variable expansion, command substitution, escape processing, or shell evaluation and does not
mutate `process.env`.

The launcher removes every ambient `TP01_*` entry, adds only parsed allowlisted values to the child
environment, requires its configured Node binary to equal the already running exact Node process,
requires the matching effective authorization, revision, clean proof, complete reviewed inventory,
and authorization-bound Node/pnpm paths, and maps exactly this interface to the already reviewed
exact-pnpm launcher:

```text
$TP01_NODE_BIN scripts/private-environment-launcher.mjs \
  --environment /absolute/private/runtime.env preflight
```

No other operation or relative environment path is accepted. The launcher does not print the
private values or place them in command arguments. A fail-closed activation with a separately
validated package, run, and absolute evidence directory writes only
`private-environment-activation-failure.json` plus a `PREFLIGHT` /
`PRIVATE_ENVIRONMENT_ACTIVATION` operational stop in `deviations.json`. Neither artifact retains a
credential, database URL, environment value, or absolute path. If even that non-secret context is
unavailable, the launcher emits only a typed stderr status and cannot safely select an evidence
directory.

WP-50 dependency-free static checks are:

```text
$TP01_NODE_BIN --check scripts/private-environment-contract.mjs
$TP01_NODE_BIN --check scripts/private-environment-contract.test.mjs
$TP01_NODE_BIN --check scripts/private-environment-launcher.mjs
$TP01_NODE_BIN --check scripts/private-environment-launcher.test.mjs
$TP01_NODE_BIN --check scripts/deviation-contract.mjs
$TP01_NODE_BIN --check scripts/deviation-contract.test.mjs
$TP01_NODE_BIN --check scripts/execution-authorization.mjs
$TP01_NODE_BIN scripts/private-environment-contract.test.mjs
$TP01_NODE_BIN scripts/private-environment-launcher.test.mjs
$TP01_NODE_BIN scripts/deviation-contract.test.mjs
$TP01_NODE_BIN scripts/hash-inventory.mjs
```

These commands do not invoke dependencies, a package manager, preflight, images, Docker/Compose,
cleanup, evidence verification, or any proof/reproduction path. Test credentials are inert literal
strings held only in the dependency-free test process; they are not runtime credentials.

## WP-46 database-connection and diagnostic contract

Every later execution path must receive both a run-specific `TP01_RUNTIME_PASSWORD` and the exact
canonical `TP01_DATABASE_URL` built from that same credential. The contract accepts only
`postgresql`, `127.0.0.1`, port `55432`, database `tp01`, role `tp01_runtime`, no query/fragment,
and an exact credential match. Missing or altered values fail before service use; node-postgres
defaults and fallbacks are prohibited.

The effective private authorization must bind its exact package and run IDs plus SHA-256 digests
of the run credential and canonical URL under `databaseConnection`. Validation requires the
environment package/run to match that record and both secret-derived values to match their
authorized digests. The public environment example deliberately leaves the password and URL
empty; it cannot be copied into a passing execution environment.

Preflight and database-security evidence retain only non-secret contract metadata. The proof child
environment is derived through the same validated contract and receives a dynamic marker over the
package, run, URL, credential, and authorization-binding digest. The database client recomputes
that marker before pool creation. Final verification checks both non-secret evidence records
against the effective authorization and requires them to agree exactly.

`deviations.json` now distinguishes owner-accepted contract variances from operational stops.
Both lists must be empty for successful evidence verification. A failed primary or reproduction
child appends a minimized operational-stop record instead of leaving an empty deviation artifact.

Command diagnostics retain only the executable basename and a path classification. They do not
retain an absolute launcher path, argument values, credentials, connection URLs, or local
home/worktree paths.

WP-46 dependency-free static checks are:

```text
$TP01_NODE_BIN --check scripts/database-connection-contract.mjs
$TP01_NODE_BIN --check scripts/database-connection-contract.test.mjs
$TP01_NODE_BIN --check scripts/deviation-contract.mjs
$TP01_NODE_BIN --check scripts/deviation-contract.test.mjs
$TP01_NODE_BIN --check scripts/execution-environment-contract.test.mjs
$TP01_NODE_BIN --check scripts/command.mjs
$TP01_NODE_BIN --check scripts/command.test.mjs
$TP01_NODE_BIN --check scripts/preflight.mjs
$TP01_NODE_BIN --check scripts/database-evidence.mjs
$TP01_NODE_BIN --check scripts/db-reset.mjs
$TP01_NODE_BIN --check scripts/proof-run.mjs
$TP01_NODE_BIN --check scripts/evidence-verify.mjs
$TP01_NODE_BIN scripts/database-connection-contract.test.mjs
$TP01_NODE_BIN scripts/deviation-contract.test.mjs
$TP01_NODE_BIN scripts/command.test.mjs
$TP01_NODE_BIN scripts/execution-environment-contract.test.mjs
$TP01_NODE_BIN scripts/hash-inventory.mjs
```

These commands do not invoke dependencies, pnpm, preflight, images, Docker/Compose, cleanup,
execution-evidence verification, or any proof/reproduction path.

## WP-42 exact launcher and reachability-command contract

WP-41 stopped before database reset because the frozen exact launcher rejected the already
recorded `runtime:verify-reachability` package script. WP-42 adds that one name to the approved
run-script set and does not widen the two-argument `run <script>` shape or any install, list, or
version shape.

The launcher and its dependency-free contract test now establish that:

- `run runtime:verify-reachability` is accepted exactly once in the allowlist;
- extra arguments, whitespace drift, underscore substitution, and the direct-Node-only
  `evidence:verify-final` name remain rejected;
- every launcher-approved name exists in `package.json`, and the reachability script resolves
  exactly to `node scripts/runtime-reachability.mjs`;
- run/list commands still fail before pnpm inspection when `node_modules` is absent; and
- dependency-marker hashes are captured before a dependency-reading command and must remain
  unchanged afterward.

The controlled order remains database start, exact three-view reachability verification, then
database reset. Cleanup and final complete-packet verification remain direct exact-Node commands;
neither is added to the launcher allowlist. A later run must still produce accepted, run-bound
`runtime-reachability.json` before reset or final PASS is possible.

WP-42 dependency-free static checks are:

```text
$TP01_NODE_BIN --check scripts/exact-pnpm-contract.mjs
$TP01_NODE_BIN --check scripts/exact-pnpm-contract.test.mjs
$TP01_NODE_BIN --check scripts/exact-pnpm.mjs
$TP01_NODE_BIN scripts/exact-pnpm-contract.test.mjs
$TP01_NODE_BIN scripts/hash-inventory.mjs
```

These commands do not invoke dependencies, the package manager, preflight, images,
Docker/Compose, cleanup, evidence verification, or a proof/reproduction path.

## WP-38 publication and runtime-reachability contract

WP-37 measured an internally healthy PostgreSQL container whose accepted host endpoint was absent.
The prior Compose source combined an internal-only network with a required host publication; the
runtime reported target port `5432` but `PublishedPort: 0`. WP-38 removes that contradictory
interface, uses explicit long-form loopback publication, and disables bridge IP masquerading to
retain a no-egress proof network.

A later authorized execution must run `runtime:verify-reachability` immediately after Compose
reports healthy and before `db:reset`. The gate requires all three independent observations:

- Docker inspect contains exactly `5432/tcp -> 127.0.0.1:55432`;
- Compose reports exactly one healthy running `postgres` publisher with the same mapping; and
- a bounded TCP connection to `127.0.0.1:55432` succeeds.

Failure writes a minimized `runtime-reachability-failure.json` and stops before fixture mutation.
Success writes run/package-bound `runtime-reachability.json`; both `db:reset` and the final evidence
verifier reject missing, stale, wildcard, wrong-port, zero-port, unhealthy, or unreachable state.
Static validation cannot establish that Docker Desktop will publish the corrected interface; that
remains a separately authorized runtime measurement.

Failed-child sanitization now removes the local home/worktree path before bounded retention, in
addition to the existing credential, bearer, connection-string, and secret-shaped redactions.

WP-38 dependency-free static checks are:

```text
$TP01_NODE_BIN --check scripts/runtime-reachability-contract.mjs
$TP01_NODE_BIN --check scripts/runtime-reachability-contract.test.mjs
$TP01_NODE_BIN --check scripts/runtime-reachability.mjs
$TP01_NODE_BIN --check scripts/command.mjs
$TP01_NODE_BIN --check scripts/command.test.mjs
$TP01_NODE_BIN --check scripts/db-reset.mjs
$TP01_NODE_BIN --check scripts/evidence-verify.mjs
$TP01_NODE_BIN scripts/runtime-reachability-contract.test.mjs
$TP01_NODE_BIN scripts/command.test.mjs
$TP01_NODE_BIN scripts/hash-inventory.mjs
```

These commands do not invoke dependencies, preflight, Docker/Compose, cleanup, evidence
verification, or a proof/reproduction path.

## WP-34 conditional image-verification contract

The image verifier first inspects the exact accepted digest in the local cache. A valid local
inspection selects `LOCAL_CACHE`, performs no registry operation, and does not require a pull
token. If and only if the digest is absent, the verifier requires all of these controls before
`docker pull` is reachable:

- the effective private authorization and environment identify the same package and run;
- `conditionalImagePull` is `AUTHORIZED_IF_ACCEPTED_DIGEST_ABSENT` for that package/run;
- the authorization binds the exact accepted image reference and `linux/arm64/v8` platform; and
- the private `TP01_IMAGE_PULL_AUTHORIZATION_TOKEN` hashes to the authorization's run-bound token
  digest.

The pull token is removed from the Docker child environment, never written to evidence, and is
included in failed-child redaction. An absent digest without the complete binding fails closed.
After either allowed path, exact repo digest, OS, architecture, and variant inspection must pass.
`image.json` records `LOCAL_CACHE` or `CONDITIONAL_REGISTRY_PULL`, whether registry access occurred,
the pre-decision local-presence result, and the minimized accepted inspection fields.

WP-34 dependency-free static checks are:

```text
$TP01_NODE_BIN --check scripts/image-verification-contract.mjs
$TP01_NODE_BIN --check scripts/image-verification-contract.test.mjs
$TP01_NODE_BIN --check scripts/db-verify-image.mjs
$TP01_NODE_BIN --check scripts/execution-authorization.mjs
$TP01_NODE_BIN --check scripts/command.mjs
$TP01_NODE_BIN --check scripts/command.test.mjs
$TP01_NODE_BIN --check scripts/evidence-verify.mjs
$TP01_NODE_BIN scripts/image-verification-contract.test.mjs
$TP01_NODE_BIN scripts/command.test.mjs
$TP01_NODE_BIN scripts/hash-inventory.mjs
```

These commands do not invoke dependencies, preflight, Docker/Compose, cleanup, evidence
verification, or a proof/reproduction path.

## WP-31 failure-diagnostic contract

If the authorized Node test child exits nonzero, the command wrapper constructs a typed diagnostic
without retaining command arguments. Known proof credential values, secret-shaped key/value pairs,
bearer values, and PostgreSQL URL passwords are redacted before bounding. Each stream retains at
most 8,192 UTF-16 code units,
using bounded head/tail context when truncation is required, with original/retained size metadata.

The proof runner covers both the TypeScript compilation child and the Node test child. It writes
the diagnostic and failed phase to `primary-execution-failure.json` or
`reproduction-execution-failure.json` before rethrowing the failure. The artifact is explicitly
classified as synthetic-proof diagnostic evidence and records that customer/live data is not
authorized. Successful children produce no failure artifact, and each run removes any stale
artifact for its role before starting.

The final verifier imports the same Compose contract as preflight. It requires exact agreement
between preserved stdout, its single raw semantic line, and normalized `5.4.0`; both `5.4.0` and
`v5.4.0` raw forms are accepted, while malformed framing, whitespace, value drift, or field
disagreement fails closed.

## WP-31 dependency-free static checks

WP-31 authorizes syntax and pure-contract checks only. These commands do not invoke dependencies,
preflight, Docker, cleanup, evidence verification, or any proof/reproduction path:

```text
$TP01_NODE_BIN --check scripts/command.mjs
$TP01_NODE_BIN --check scripts/command.test.mjs
$TP01_NODE_BIN --check scripts/proof-run.mjs
$TP01_NODE_BIN --check scripts/remediation-contract.mjs
$TP01_NODE_BIN --check scripts/remediation-contract.test.mjs
$TP01_NODE_BIN --check scripts/evidence-verify.mjs
$TP01_NODE_BIN scripts/command.test.mjs
$TP01_NODE_BIN scripts/remediation-contract.test.mjs
$TP01_NODE_BIN scripts/hash-inventory.mjs
```

## WP-25 exact launcher remediation

WP-24 stopped at preflight because the ambient pnpm/Node launcher selected Node versions outside
the accepted contract. After cleanup removed dependencies, a later ambient pnpm final-verifier
command also restored dependencies from the local store before executing the verifier. WP-25
repairs those launcher controls without authorizing preflight or proof execution.

Every future pnpm operation must start from an explicitly selected Node `v22.23.1` binary and an
absolute `TP01_PNPM_ENTRY` whose accepted hash is verified before it is executed and whose version
is then verified as `11.25.0`:

```text
$TP01_NODE_BIN scripts/exact-pnpm.mjs --version
$TP01_NODE_BIN scripts/exact-pnpm.mjs run <authorized-script>
```

The launcher refuses run commands when dependencies are absent, forces pnpm offline with lifecycle
scripts disabled, executes pnpm through the same exact Node process, and rejects dependency-metadata
mutation. The only dependency-restoration shape it accepts is separately authorized:

```text
TP01_DEPENDENCY_RESTORE_AUTHORIZATION=WP-25_OFFLINE_FROZEN_IGNORE_SCRIPTS \
  $TP01_NODE_BIN scripts/exact-pnpm.mjs install --offline --frozen-lockfile --ignore-scripts
```

Cleanup and final verification must run directly under `$TP01_NODE_BIN`, not through pnpm, because
cleanup intentionally removes `node_modules`:

```text
$TP01_NODE_BIN scripts/cleanup.mjs
$TP01_NODE_BIN scripts/evidence-verify.mjs --final
```

WP-25 permits exact offline dependency restoration and static checks only. Preflight, image,
container, database, service, proof, reproduction, and evidence execution remain closed.

## Frozen environment

- Node.js `22.23.1`
- pnpm `11.25.0`
- Docker Engine `29.7.2` and Compose `5.4.0` (execution remains closed)
- PostgreSQL image `postgres:18.6-bookworm` at OCI index digest
  `sha256:afc7e2d441324c0388fa80c3d24f733b4194a4eb7f47dd8ee2b08eb1a24a647c`
- `linux/arm64/v8`

Compose version evidence preserves both exact `docker compose version --short` stdout and its
single semantic output line. Parsing removes at most one terminal LF or CRLF transport delimiter;
it does not trim semantic whitespace. Comparison accepts exactly one optional leading lowercase
`v`, then requires the normalized value to equal `5.4.0`; it does not accept a different semantic
version, extra prefix, suffix, whitespace, empty output, or multiple output lines.

Cleanup supplies an ephemeral synthetic `TP01_BOOTSTRAP_PASSWORD` only to Compose interpolation
when no run credential exists. The value is generated in memory, is not printed or retained, and
is removed from the cleanup command environment immediately after the Compose call. This keeps
cleanup callable after an early stop, before preflight credential generation, and without proof
dependencies. Cleanup still requires a separately authorized run and remains closed in WP-28.

## WP-28 dependency-free static checks

WP-28 authorizes syntax and pure-contract checks only. These commands do not invoke dependencies,
preflight, Docker, cleanup, or any proof/reproduction path:

```text
$TP01_NODE_BIN --check scripts/remediation-contract.mjs
$TP01_NODE_BIN --check scripts/remediation-contract.test.mjs
$TP01_NODE_BIN --check scripts/preflight.mjs
$TP01_NODE_BIN --check scripts/cleanup.mjs
$TP01_NODE_BIN scripts/remediation-contract.test.mjs
$TP01_NODE_BIN scripts/hash-inventory.mjs
```

## WP-25 static commands

Only manifest verification, TypeScript static checking, syntax checking, artifact hashing, and
private inventory validation are authorized after the bounded dependency restoration. Each pnpm
operation uses the exact launcher; ambient pnpm commands are historical and closed.

```text
$TP01_NODE_BIN scripts/exact-pnpm.mjs run matrix:verify
$TP01_NODE_BIN scripts/exact-pnpm.mjs run typecheck
$TP01_NODE_BIN scripts/exact-pnpm.mjs run evidence:hash
```

Commands beginning with `db:` or `proof:`, plus `preflight`, `evidence:verify`,
`evidence:verify-final`, and `cleanup`, remain closed because WP-25 is not an execution package.

## Remediated evidence flow

When a later package explicitly authorizes execution, the scripts are designed to:

1. emit `environment.json`, a private case-manifest copy, supply-chain bindings, and an explicit
   deviation record during preflight;
2. emit `fixture.json` and `database-security.json` after deterministic reset, including measured
   runtime identity, role attributes, ownership, grants, forced-RLS policies, security-definer
   controls, safe search paths, and transaction-local context;
3. capture per-organization before/after counts and hashes around primary and reproduction runs;
4. generate `state-integrity.json`, combined sanitized audit evidence, and the semantic difference
   report during interim evidence verification;
5. record pre/post cleanup state in `cleanup.json`; and
6. issue a final `PASS` only when cleanup and all three role-separated review records are also
   present and verified by `evidence:verify-final`.

Each review Markdown file must contain single-line `Reviewer identity`, `Canonical task identity`,
`Review date`, `Method`, `Evidence inspected`, `Findings by severity`, `Unresolved risks`,
`Recommendation`, and `Limitations` fields. Recommendation must be exactly `PASS`, `FAIL`, or
`INCONCLUSIVE`. The final verifier propagates the strongest non-passing recommendation and exits
nonzero; it cannot convert a reviewer FAIL or INCONCLUSIVE to PASS. The interim verifier cannot
issue a final `PASS`.

## Materialized enforcement modes

- `APPLICATION_ONLY` evaluates server-resolved synthetic context and the proof policy without
  relying on database visibility.
- `RLS_ONLY` deliberately bypasses application policy and probes the least-privilege runtime role.
- `COMBINED` requires both application and database controls and appends attributable audit
  evidence.
- `CONTROLLED_NEGATIVE` records the declared application-bypass fault and the database result.

The 222-case test harness emits one result per frozen case with per-mode observations. It has been
statically type-checked only; no test case, SQL file, image, container, listener, or proof process
has run in WP-19.

## Evidence

Raw materialization evidence belongs under the ignored path
`internal-local/work-packages/TP-01/evidence/materialization/`. Do not commit raw package-manager,
advisory, environment, or review evidence.
