# TP-01 Tenant Boundary and Authorization Contract

> Disposable technical-proof material. Not application code. Not authorized to execute.

This directory materializes checkpoint 1 of the accepted TP-01 contract in
`docs/21_TP01_EXACT_EXECUTION_CONTRACT.md`.

## Current authorization

WP-93 authorizes proof-only static remediation of the reproduction-context and post-PRIMARY
finalization gaps exposed by immutable WP-92. It permits exact validator-context readiness
contracts, immutable PRIMARY handoff/deviation custody, append-only run-level stop accounting,
truthful post-PRIMARY non-PASS finalization, dependency-free tests, governing documentation,
affected hash/inventory renewal, ignored private static evidence, and one fresh independent
read-only static validation after freeze.

WP-93 does **not** authorize dependencies or package-manager operations, credential or environment
generation/use, preflight, image inspection or retrieval, Docker/Compose commands, pull-token
creation, containers, databases, services, SQL execution, fixtures, listeners, cleanup execution,
a TP-01 case, handoff, reproduction, execution-evidence verification, application code,
architecture selection, infrastructure, deployment, provider accounts or cost, customer/live data,
or network access.

The execution-facing scripts remain closed. They require later owner acceptance, publication,
rebinding, role assignment, and a new effective private authorization before any execution-facing
command may run.

## WP-93 reproduction-context and post-PRIMARY finalization contract

The independent reproduction-validator context must produce two fresh, single-use readiness
receipts: one before PRIMARY and one before REPRODUCTION. Each is valid for no more than 15
minutes and binds the exact package, run, stage, validator identity, operator UID, absolute Docker
executable path and hash, local `desktop-linux` context, local Unix endpoint, and exact Docker
client/server `29.7.2` handshake. The probe permits no network, registry, image, runtime-resource,
credential, or proof access. Because the probe cannot authenticate a collaboration-task identity,
each receipt also requires a separate exact-hash external task attestation with zero mutation.
The effective execution-authorization validator enforces the same host-access binding before any
proof command, and the final verifier requires the applicable receipt and attestation again.

At PRIMARY handoff, the raw `deviations.json` bytes are copied to the sealed read-only artifact
`primary-deviations.json`. The mutable live `deviations.json` and `runtime.env` are excluded from
the handoff seal. Later deviation evidence must be a strict append-only extension of the PRIMARY
snapshot: accepted deviations cannot change and existing operational stops cannot be removed,
reordered, or mutated.

The only newly recognized post-PRIMARY stop is:

```text
REPRODUCTION / RUNTIME_REACHABILITY /
RUNTIME_REACHABILITY_FAILED / runtime-reachability-failure.json
```

The handoff verifier requires the exact 16-entry inventory and recomputes every retained byte/hash
and the canonical aggregate. The failure artifact is created exclusively and cannot be overwritten
or retried in the same run.
For this exact single stop, final verification consumes PRIMARY reachability and the verified
read-only handoff, rejects all reproduction-result artifacts, requires cleanup plus three
role-bound `INCONCLUSIVE` reviews, emits a truthful `INCONCLUSIVE` packet, and exits 2. Zero operational
stops plus complete independent reproduction remains the only PASS path.

WP-93 dependency-free public static checks include exact-Node syntax validation for every
`scripts/*.mjs` module and direct exact-Node execution of every `scripts/*.test.mjs` suite. They do
not invoke dependencies, pnpm/npm, credentials, private environments, preflight, images,
Docker/Compose, containers, databases, services, cleanup, evidence verification, proof,
reproduction, or network access. Static PASS establishes only a prospective control contract.

## WP-81 primary-result context and reset contract

The emitted proof result remains unchanged. `TP1-CASE-008` pool-reuse cases must retain the exact
cleanup marker `SAME_CONNECTION_TRANSACTION_CONTEXT_RESET_AND_CONCURRENT_ISOLATION`, their frozen
three-organization sequence, and authoritative `source`, `concurrent`, and `restored` synthetic
organization identities. Every other case must retain
`PER_CASE_TRANSACTION_ROLLBACK_AND_AUDIT_APPEND`, must not carry an organization sequence, and
must carry either the exact resolved context shape or one minimized resolution-denied reason.

The final evidence verifier applies this contract to both PRIMARY and REPRODUCTION result files.
Its stable semantic comparison now includes `cleanupReset` and `organizationSequence`, so a
reproduction cannot claim a match after changing either reset meaning or the pool-reuse sequence.
Structured validation failures expose only an error code, case ID, and semantic-check identifier;
they retain no credential, URL, path, raw output, or context value.

The handoff-stop contract preserves immutable schema-version-1 WP-80 evidence and adds a version-2
creation path for future controls. Version 2 carries exactly one nested `semanticFailure` object
with `errorCode`, `caseId`, and `semanticCheck`; unknown errors collapse to three explicit
`UNAVAILABLE`/generic values. The builder consumes the result-context minimizer directly, and the
prospective private failure writer retains the validated record with exclusive-create semantics.

WP-81 dependency-free public static checks are:

```text
$TP01_NODE_BIN --check scripts/primary-result-context-contract.mjs
$TP01_NODE_BIN --check scripts/primary-result-context-contract.test.mjs
$TP01_NODE_BIN --check scripts/evidence-verify.mjs
$TP01_NODE_BIN scripts/primary-result-context-contract.test.mjs
$TP01_NODE_BIN scripts/handoff-stop-contract.test.mjs
```

Complete validation syntax-checks every `scripts/*.mjs` file and executes every built-in-only
`scripts/*.test.mjs` suite. These checks do not invoke dependencies, pnpm/npm, credentials,
preflight, images, Docker/Compose, a database, SQL, cleanup, proof, handoff, reproduction, or
network access. Static PASS establishes only the prospective proof-control contract.

## WP-77 primary-handoff stop consistency contract

The operational-stop ledger accepts exactly one new stop identity:

```text
PRIMARY_HANDOFF / SEAL_PRIMARY_HANDOFF_READ_ONLY /
PRIMARY_HANDOFF_SEAL_TOOL_FAILED / handoff-seal-failure.json
```

The pure stop classifier returns `COMPLETE_REPRODUCTION` only for a zero-stop ledger and
`PRIMARY_HANDOFF_INCONCLUSIVE` only for that single exact record. Any unknown or multiple stop
fails closed. The minimized failure artifact binds the package and run, exact phase/stage/code, the
private seal-tool hash, explicit absence of a seal, verification, validator attestation,
reproduction authorization and execution, and false retry/raw-diagnostic/secret retention flags.

Final verification classifies the stop before validating REPRODUCTION reachability or reading any
reproduction file. The exact handoff-stop branch is available only for `--final`; it requires
PRIMARY reachability, complete 222-case primary result/audit/state evidence, mandatory cleanup,
three standardized reviews that each recommend `INCONCLUSIVE`, and absence of every handoff and
reproduction artifact. It emits only an `INCONCLUSIVE` stop-packet report and exit code 2. The
zero-stop complete-reproduction path and its PASS conditions remain unchanged.

WP-77 dependency-free public static checks are:

```text
$TP01_NODE_BIN --check scripts/deviation-contract.mjs
$TP01_NODE_BIN --check scripts/deviation-contract.test.mjs
$TP01_NODE_BIN --check scripts/handoff-stop-contract.mjs
$TP01_NODE_BIN --check scripts/handoff-stop-contract.test.mjs
$TP01_NODE_BIN --check scripts/evidence-verify.mjs
$TP01_NODE_BIN scripts/deviation-contract.test.mjs
$TP01_NODE_BIN scripts/handoff-stop-contract.test.mjs
```

These checks do not invoke dependencies, a package manager, private environments, preflight,
images, Docker/Compose, containers, databases, services, SQL, cleanup, evidence verification,
proof/handoff/reproduction, or network access. Static PASS establishes only the prospective proof
control contract.

## WP-73 audit-detail parameter contract

The audit insert retains its exact twelve-column and twelve-value order. All values remain query
parameters; slot 12 remains `decision.reason` and is now explicitly cast as `$12::text` inside
`jsonb_build_object`. The details object remains minimized to exactly the `reason` and `synthetic`
keys, with `synthetic` fixed to `true`.

The WP-73 contract hash-pins the unchanged schema, execution-evidence verifier, proof oracle, RLS,
database boundary, proof runner, Compose definition, case manifest, proof types, and runtime
contract. It rejects an absent or different cast, interpolation, slot or value reordering, added or
changed detail keys, and any drift in those preserved artifacts.

WP-73 dependency-free static checks are:

```text
$TP01_NODE_BIN --check scripts/audit-detail-parameter-contract.mjs
$TP01_NODE_BIN --check scripts/audit-detail-parameter-contract.test.mjs
$TP01_NODE_BIN scripts/audit-detail-parameter-contract.test.mjs
```

These checks do not invoke dependencies, pnpm/npm, credentials, a private runtime environment,
preflight, images, Docker/Compose, containers, databases, services, SQL, cleanup,
proof/reproduction, or network access. Static PASS establishes only the exact prospective source
contract; it is not a runtime tenant-isolation result.

## WP-69 recursive authorization/state-path contract

WP-68 established one exact recursive path: forced RLS on `platform.organizations` invoked
`organization_authority_policy`, which called `can_discover_organization`, which called
`can_access_tenant`, whose active-organization lookup selected `platform.organizations` and
re-entered the same forced policy. PostgreSQL stopped all 222 cases with `54001` before any case
oracle could pass.

The remediated graph preserves forced RLS and separates authority from lifecycle lookup:

```text
tenant/audit policies -> can_access_tenant
can_access_tenant -> has_tenant_authority + platform.organizations
platform.organizations policy -> organization_row_visible
organization_row_visible -> can_discover_organization (runtime caller only)
can_discover_organization -> has_tenant_authority
```

`has_tenant_authority` validates transaction-local organization and subject context and the exact
membership, support-grant, or machine-identity authority without querying the organization table.
`organization_row_visible` is security-invoker: it admits the non-login `tp01_owner` only for the
internal security-definer lifecycle lookup and otherwise delegates direct runtime visibility to
bounded organization discovery. Direct runtime remains non-owner, non-superuser, and
`NOBYPASSRLS`; all six protected tables retain both `ENABLE` and `FORCE ROW LEVEL SECURITY`.
Organization discovery preserves the platform-directory role path and requires an active
organization plus valid tenant authority for tenant-scoped discovery.

The final evidence verifier now requires the new authority helper as an owned security definer and
the row-visibility function as an owned security invoker, both with fixed search paths. The public
roles, case manifest, 222 case oracles, state hashing, proof runner, database-evidence capture,
dependency versions, Compose definition, and all execution controls are unchanged.

WP-69 dependency-free static checks are:

```text
$TP01_NODE_BIN --check scripts/rls-authorization-graph-contract.mjs
$TP01_NODE_BIN --check scripts/rls-authorization-graph-contract.test.mjs
$TP01_NODE_BIN --check scripts/evidence-verify.mjs
$TP01_NODE_BIN scripts/rls-authorization-graph-contract.test.mjs
$TP01_NODE_BIN scripts/hash-inventory.mjs
```

Complete validation syntax-checks every `scripts/*.mjs` file and executes every built-in-only
`scripts/*.test.mjs` suite. These checks do not invoke dependencies, pnpm/npm, credentials,
preflight, images, Docker/Compose, a database, SQL, cleanup, proof/reproduction, or network access.
Static PASS establishes only that the prospective graph is acyclic and the frozen controls are
preserved; it is not a runtime tenant-isolation result.

## WP-57 reachability interpolation and operational-stop contract

The private-environment launcher continues to pass no credential, database URL, or pull token to
`runtime:verify-reachability`. The reachability script creates a fresh random value used only to
allow Compose to parse the already accepted configuration for the exact read-only command
`docker compose ps --format json postgres`. The helper removes every proof credential and URL from
the child environment, rejects reuse of a real bootstrap value, prohibits service-changing
arguments, retains no interpolation value in evidence, and clears the ephemeral value immediately
after the child returns.

Successful evidence is schema version 2 and records whether the gate applies to `PRIMARY` or
`REPRODUCTION`, the three required publisher observations, and a non-secret interpolation record.
The record must prove that the real bootstrap credential was absent before inspection, no runtime
credential, URL, or pull token propagated, service mutation was prohibited, and the synthetic value
was not retained.

If the reachability gate fails, the script writes minimized failure evidence and appends a formal
`PRIMARY` or `REPRODUCTION` / `RUNTIME_REACHABILITY` operational stop to `deviations.json`.
Complete primary result, state, and audit artifacts are required before the second gate can be
classified as reproduction; a partial primary packet fails closed. Operational stops remain
distinct from owner-accepted contract deviations and prevent final `PASS`.

Before each database reset, the reset command independently derives the expected reachability
phase from the evidence directory and rejects a stale or wrong-phase gate. Final verification
requires the retained successful reachability evidence to be the `REPRODUCTION` gate, so a primary
gate cannot be reused as the complete-packet reachability result.

WP-57 dependency-free static checks are:

```text
$TP01_NODE_BIN --check scripts/runtime-reachability-contract.mjs
$TP01_NODE_BIN --check scripts/runtime-reachability.mjs
$TP01_NODE_BIN --check scripts/runtime-reachability-contract.test.mjs
$TP01_NODE_BIN --check scripts/runtime-reachability-remediation.test.mjs
$TP01_NODE_BIN --check scripts/deviation-contract.mjs
$TP01_NODE_BIN --check scripts/deviation-contract.test.mjs
$TP01_NODE_BIN --check scripts/db-reset.mjs
$TP01_NODE_BIN --check scripts/evidence-verify.mjs
$TP01_NODE_BIN scripts/runtime-reachability-contract.test.mjs
$TP01_NODE_BIN scripts/runtime-reachability-remediation.test.mjs
$TP01_NODE_BIN scripts/deviation-contract.test.mjs
$TP01_NODE_BIN scripts/private-environment-launcher.test.mjs
$TP01_NODE_BIN scripts/hash-inventory.mjs
```

These checks do not invoke dependencies, pnpm/npm, credentials, a private runtime environment,
preflight, images, Docker/Compose, containers, databases, services, cleanup, evidence verification,
proof/reproduction, or network access.

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

## WP-65 database-evidence Compose interpolation continuity remediation

WP-61 introduced the first reset-only static interpolation contract, but immutable WP-64 showed
that its historical “four exact calls” boundary omitted reset-time fixture and database-security
evidence capture. WP-65 prospectively supersedes that incomplete call boundary without rewriting
WP-61 or the stopped WP-64 evidence.

Every database-evidence Compose call now requires an explicit operation-scoped environment. A
reset invocation creates one fresh random non-secret interpolation value and threads it through the
four ordered SQL calls, fixture state capture, fixture count capture, and database-security capture.
Each primary or reproduction proof invocation creates a distinct fresh value and threads it through
both before and after state snapshots. No database-evidence helper may fall back to raw
`process.env`.

The Compose environment removes every `TP01_*` value and ambient `PGPASSWORD`, retains only bound
non-proof context such as `DOCKER_CONTEXT`, and adds the synthetic interpolation value. The runtime
security query separately clones that minimized environment, adds only the required temporary
`PGPASSWORD` for the exact `-e PGPASSWORD` existing-service command, and clears it on success or
failure. The real bootstrap credential, runtime `TP01_*` value, database URL, and pull token remain
excluded from Compose parsing. All calls remain exact `docker compose exec -T`; no lifecycle
operation is permitted.

Reset failures retain ordered SQL and post-SQL stage progress, conservative partial-mutation state,
and the exact PRIMARY/REPRODUCTION `DB_RESET` operational stop. Before/after proof-state snapshot
failures write minimized typed evidence and append the exact `STATE_SNAPSHOT_BEFORE` or
`STATE_SNAPSHOT_AFTER` operational stop. The final verifier continues to reject every operational
stop. Every synthetic value is absent from evidence and cleared in `finally`.

WP-65 validation is dependency-free and static only. It does not install or invoke dependencies,
generate credentials, execute preflight, inspect or start images/containers/services, connect to a
database, apply SQL, mutate fixtures, run cleanup, execute/reproduce TP-01, or use network access.
