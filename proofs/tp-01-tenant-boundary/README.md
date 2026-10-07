# TP-01 Tenant Boundary and Authorization Contract

> Disposable technical-proof material. Not application code. Not authorized to execute under
> WP-19.

This directory materializes checkpoint 1 of the accepted TP-01 contract in
`docs/21_TP01_EXACT_EXECUTION_CONTRACT.md`.

## Current authorization

WP-19 authorizes:

- creation of this exact proof-only inventory;
- generation of the 222-case manifest;
- generation of `pnpm-lock.yaml` and installation of exact proof-only dependencies with lifecycle
  scripts disabled;
- static type/inventory checks and private supply-chain evidence; and
- independent read-only checkpoint-1 validation.

WP-19 does **not** authorize:

- pulling or starting PostgreSQL;
- applying SQL, creating a database, or binding ports;
- starting HTTP or background processes;
- running any TP-01 case or claiming a proof result;
- using customer, live, or production-derived data; or
- reusing these artifacts in application code.

The execution-facing scripts are fully materialized but fail closed while WP-19 is active. They
require both later-package environment controls and a matching private `authorization.json` with
status `ACCEPTED_FOR_EXECUTION`. Any script, schema, manifest, dependency, or hash change after
checkpoint-1 review requires a new reviewed materialization revision.

## Frozen environment

- Node.js `22.23.1`
- pnpm `11.25.0`
- Docker Engine `29.7.2` and Compose `5.4.0` (execution remains closed)
- PostgreSQL image `postgres:18.6-bookworm` at OCI index digest
  `sha256:afc7e2d441324c0388fa80c3d24f733b4194a4eb7f47dd8ee2b08eb1a24a647c`
- `linux/arm64/v8`

## Checkpoint-1 commands

Only these non-proof actions are authorized in WP-19:

```text
pnpm install --lockfile-only --ignore-scripts
pnpm install --frozen-lockfile --ignore-scripts
pnpm run matrix:materialize
pnpm run matrix:verify
pnpm run typecheck
pnpm run evidence:supply-chain
pnpm run evidence:hash
```

`scripts/materialize-dependencies.mjs` and `scripts/checkpoint-static-evidence.mjs` retain the raw
checkpoint evidence for the exact commands above. Commands beginning with `db:` or `proof:`, plus
`preflight`, `evidence:verify`, and `cleanup`, are later-execution commands and reject WP-19 because
the required private execution authorization record does not exist.

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
