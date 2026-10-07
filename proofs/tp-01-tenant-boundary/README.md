# TP-01 Tenant Boundary and Authorization Contract

> Disposable technical-proof material. Not application code. Not authorized to execute.

This directory materializes checkpoint 1 of the accepted TP-01 contract in
`docs/21_TP01_EXACT_EXECUTION_CONTRACT.md`.

## Current authorization

WP-38 authorizes proof-only host-port publication, runtime-reachability, and diagnostic-minimization
remediation with dependency-free static validation. It permits:

- correcting the disposable Compose publication interface while preserving exact loopback-only
  exposure and disabled bridge masquerading;
- adding exact Docker and Compose publisher-mapping checks plus a bounded TCP reachability gate;
- requiring accepted run-bound reachability evidence before database reset and final evidence
  verification;
- redacting local home/worktree paths from bounded failed-child diagnostics;
- built-in-only syntax, pure-contract, hashing, inventory, and scope checks;
- renewing static evidence and artifact hashes; and
- one fresh independent read-only static validation after the inventory is frozen.

WP-38 does **not** authorize dependencies, package-manager operations, preflight, Docker/Compose
commands, image inspection or retrieval, containers, databases, services, SQL, fixtures,
listeners, cleanup execution, a TP-01 case or reproduction, execution-evidence verification,
application code, architecture selection, infrastructure, deployment, provider accounts or cost,
customer/live data, or network access.

The execution-facing scripts fail closed. They require later-package environment controls and a
matching private `authorization.json` with status `ACCEPTED_FOR_EXECUTION`. The remediated
inventory must be independently reviewed, owner-accepted, committed, published, and bound to a
later exact execution revision before any execution-facing command may run.

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
