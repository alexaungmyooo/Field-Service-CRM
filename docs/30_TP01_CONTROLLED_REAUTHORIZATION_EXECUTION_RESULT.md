# TP-01 Controlled Reauthorization Execution Result

## Document control

| Field | Value |
| --- | --- |
| Status | Ready for Owner Review — Inconclusive; execution closed |
| Work package | `WP-27 Controlled TP-01 Reauthorization and Execution` |
| Run ID | `wp27-2026-10-07-01` |
| Governing decision | `DEC-157` |
| Execution revision | `c588ac4e5b4d3307fbc99ffeadbbc3bbaa27bf6b` |
| Proof tree | `0e6b579811f59e13ff869ec40ea1e3bfd4edea49` |
| Owner | Aung Myo Oo |
| Date | 2026-10-07 |
| Final disposition | `INCONCLUSIVE — STOPPED AT PREFLIGHT` |

## Authorized boundary

WP-27 authorized one new local synthetic attempt with:

- a dedicated exact-revision checkout;
- primary operator `/root`;
- fresh reproduction validator `/root/wp27_reproduction_validator`;
- technical security reviewer `/root/tp01_security_review`;
- exact offline/frozen/ignore-scripts dependency restoration from the existing local store;
- a new run-bound effective private authorization;
- conditional Docker-registry retrieval only if the accepted image digest was absent;
- the accepted command/evidence/review order and mandatory cleanup; and
- no npm/other internet, application coding, architecture selection, infrastructure, deployment,
  provider account/cost, or customer/live data.

The effective authorization SHA-256 is
`387cfd6177b072bc1291c63e6bf4c015f733a582fe3a1e7a2c54965df4fbe04e`.

## Preparation result

| Control | Result |
| --- | --- |
| Dedicated checkout revision | Exact match |
| Proof tree | Exact match |
| Proof path | Clean |
| Fresh reproduction identity | Attested; zero action before sealed handoff |
| Dependency source | Existing local content-addressed store only |
| Dependency restoration | 115 reused, zero downloaded, no lifecycle scripts |
| Package/root lock/restored lock | Exact accepted hashes |
| 52-file artifact inventory | Exact match |
| Effective private authorization | Created and bound to the exact run/revision/roles/hashes |

Preparation did not access an image or start a runtime resource.

## Preflight stop

The first and only preflight invocation stopped before emitting `environment.json`:

```text
compose mismatch: expected v5.4.0, observed 5.4.0
```

Node `v22.23.1`, pnpm `11.25.0`, and Docker `29.7.2` matched. The installed Compose semantic
version matched `5.4.0`; only the optional leading `v` differed. The accepted contract compared the
raw string exactly, so fail-closed behavior was correct under the frozen revision. No retry was
authorized.

## Cleanup outcome

The first cleanup invocation could not reach teardown because `docker compose down` interpolated
the Compose file and required `TP01_BOOTSTRAP_PASSWORD`, even though no service had started. This
is a cleanup-interface defect because the earliest stop may occur before credentials exist.

Mandatory cleanup was rerun with a synthetic interpolation-only value. It started no service and
passed. Final checks confirmed:

- restored dependencies removed from the dedicated execution checkout;
- generated/dist files absent;
- credential file absent;
- ports `43101` and `55432` closed;
- proof processes absent;
- TP-01 container, network, and volume absent; and
- no provider account or cost.

After the ignored private packet was copied to the repository's retained evidence area and matched,
the disposable dedicated checkout was archived. It is no longer an active execution workspace.
The separately reviewed, ignored WP-25 dependency material in the main repository was outside the
WP-27 execution checkout and was not changed by WP-27.

## Recorded deviations

| ID | Severity | Deviation | Effect |
| --- | --- | --- | --- |
| `WP27-DEV-001` | Blocking | Preflight compared Compose `v5.4.0` to observed `5.4.0` without normalizing the optional prefix. | Stopped before environment/runtime evidence |
| `WP27-DEV-002` | High | Cleanup required Compose secret interpolation even when no service had started. | First cleanup invocation stopped; interpolation-only retry was required |

## Role reviews and final verification

| Role | Canonical identity | Recommendation |
| --- | --- | --- |
| Primary operator | `/root` | `INCONCLUSIVE` |
| Fresh reproduction validator | `/root/wp27_reproduction_validator` | `INCONCLUSIVE` |
| Technical security reviewer | `/root/tp01_security_review` | `INCONCLUSIVE` |

Reproduction correctly did not run because no sealed primary evidence existed. The direct-Node
final verifier exited nonzero on missing `environment.json`, correctly refusing to manufacture a
complete-packet result.

## Private stop packet

The retained private packet contains 16 inventoried artifacts plus its inventory file. Every entry
byte count and SHA-256 was recalculated and matched. Inventory SHA-256:

`56bb6c0ad8c5ebbc654ed8230ef3220cdf160cb3d10b6cbf875cc05932bf6836`

No password, customer data, production data, or runtime tenant data is included.

## Security meaning

WP-27 establishes no evidence about tenant isolation, authorization policy, PostgreSQL RLS,
support access, audit attribution, pool reuse/concurrency, mutation integrity, or reproduction.
It neither passes nor fails TP-01's security hypothesis. WP-24 remains historically Inconclusive,
and WP-27 is a separate Inconclusive run.

The effective WP-27 authorization expired at the stop. WP-27 is non-retryable.

## Proposed remediation controls

| ID | Control | Status |
| --- | --- | --- |
| `WP27-REM-001` | Parse Docker Compose output by accepting one optional leading `v`, then require the exact numeric semantic version `5.4.0`. | Proposed |
| `WP27-REM-002` | Preserve the raw observed Compose string in environment evidence in addition to the normalized comparison value. | Proposed |
| `WP27-REM-003` | Make cleanup supply a private synthetic interpolation-only bootstrap value internally when no run credential exists; never print or retain it. | Proposed |
| `WP27-REM-004` | Ensure cleanup can run before preflight environment/credential generation and after dependency removal. | Proposed |
| `WP27-REM-005` | Renew proof/static hashes and independently review the two bounded script changes before any new execution decision. | Proposed |
| `WP27-REM-006` | Preserve WP-27 as immutable Inconclusive evidence and require a completely new run/authorization for any future attempt. | Proposed |

## Recommended owner dispositions

| ID | Recommendation | Status |
| --- | --- | --- |
| `WP27-DEC-001` | Accept `WP27-DEV-001` and `WP27-DEV-002` exactly as recorded. | Proposed |
| `WP27-DEC-002` | Accept the three `INCONCLUSIVE` role reviews and fail-closed final-verifier outcome. | Proposed |
| `WP27-DEC-003` | Accept cleanup as ultimately passed while retaining the first cleanup failure as a high-severity defect. | Proposed |
| `WP27-DEC-004` | Close WP-27 without retry and accept that it establishes no tenant-boundary or architecture result. | Proposed |
| `WP27-DEC-005` | Accept `WP27-REM-001` through `WP27-REM-006` as the next bounded remediation proposal. | Proposed |
| `WP27-DEC-006` | Permit a later WP-28 package to change only the disposable proof's Compose-version comparison, cleanup interface, governing documentation, and private static evidence; require renewed hashes and one independent static validator. | Proposed |
| `WP27-DEC-007` | Keep dependencies, preflight, images, containers, databases, services, proof/reproduction, application coding, final architecture selection, infrastructure, deployment, provider accounts/cost, and customer/live data closed during WP-28. | Proposed |

## Frozen WP-27 public inventory

Owner review and any later publication authorization apply only to these five paths:

1. `AGENTS.md`
2. `docs/00_PROJECT_START_HERE.md`
3. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
4. `docs/29_TP01_REAUTHORIZATION_READINESS.md`
5. `docs/30_TP01_CONTROLLED_REAUTHORIZATION_EXECUTION_RESULT.md`

## Next gate

WP-27 stops at owner review. No commit or push is authorized. A later owner statement may accept
the stop packet, authorize publication of only the frozen five paths, and then activate WP-28 for
proof-only static remediation. It must not authorize another execution attempt.
