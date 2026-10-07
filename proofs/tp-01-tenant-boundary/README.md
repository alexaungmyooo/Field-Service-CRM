# TP-01 Tenant Boundary and Authorization Contract

> Disposable technical-proof material. Not application code. Not authorized to execute.

This directory materializes checkpoint 1 of the accepted TP-01 contract in
`docs/21_TP01_EXACT_EXECUTION_CONTRACT.md`.

## Current authorization

WP-21 authorizes bounded evidence-completeness remediation and rematerialization only. It permits:

- measuring the connected database identity when a later package runs the proof;
- materializing dedicated environment, fixture, database-security, state-integrity, cleanup, and
  complete-packet evidence mechanics;
- renewing static validation and exact artifact hashes; and
- one fresh independent read-only inventory validation.

WP-21 does **not** authorize:

- pulling or starting PostgreSQL;
- applying SQL, creating a database, or binding ports;
- starting HTTP or background processes;
- running any TP-01 case or claiming a proof result;
- using customer, live, or production-derived data; or
- reusing these artifacts in application code.

The execution-facing scripts fail closed. They require later-package environment controls and a
matching private `authorization.json` with status `ACCEPTED_FOR_EXECUTION`. The remediated
inventory must be independently reviewed, owner-accepted, committed, published, and bound to a
later exact execution revision before any execution-facing command may run.

## Frozen environment

- Node.js `22.23.1`
- pnpm `11.25.0`
- Docker Engine `29.7.2` and Compose `5.4.0` (execution remains closed)
- PostgreSQL image `postgres:18.6-bookworm` at OCI index digest
  `sha256:afc7e2d441324c0388fa80c3d24f733b4194a4eb7f47dd8ee2b08eb1a24a647c`
- `linux/arm64/v8`

## WP-21 static commands

Only manifest verification, TypeScript static checking, syntax checking, artifact hashing, and
private inventory validation are authorized in WP-21. No dependency or runtime command is opened.

```text
pnpm run matrix:verify
pnpm run typecheck
pnpm run evidence:hash
```

Commands beginning with `db:` or `proof:`, plus `preflight`, `evidence:verify`,
`evidence:verify-final`, and `cleanup`, are later-execution commands and reject WP-21 because the
required private execution authorization record does not exist.

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
