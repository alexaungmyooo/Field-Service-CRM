# TP-01 Docker Host Access Probe Execution Authorization Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — execution authorization readiness; exact publication authorized |
| Work package | `WP-88 Docker Host Access Probe Execution Authorization Readiness` |
| Governing decisions | `DEC-220`; `DEC-221`; `DEC-222`; `DEC-223` — Accepted |
| WP-87 publication | `e5f19a3ebe9d6657f8af0a5a63e74ef2b2681489` |
| WP-87 repository tree | `502b629c155ca15fbbe01b240c41675b66f2462f` |
| Proof tree | `45369309793a803e761ace440c291c7d1ebdfe37` |
| Published WP-87 document SHA-256 | `3464ed853e9e950db6b4647b7c149c0afa22f004266df57394f376005c82db86` |
| Proposed later execution package | `WP-89` |
| Proposed later probe ID | `wp89-2026-10-09-01` |
| Owner | Aung Myo Oo |
| Date | 2026-10-09 |
| Probe execution | Not authorized |

## Objective and authority boundary

WP-88 binds one possible later read-only Docker host-access probe to the published WP-87 static
candidate and prepares one ignored, explicitly ineffective, run-specific private draft for owner
decision. The draft records proposed package/probe IDs and accepted static paths/hashes but grants
no authority.

WP-88 does not discover or bind the operator process UID or Docker executable; create an effective
authorization, authorization timestamp, expiry, receipt path, or stop path; contact Docker; inspect
a context; perform a version handshake; create operational evidence; restore dependencies; create
credentials; execute preflight/proof/reproduction/cleanup; use network; change application code;
select architecture; create infrastructure; deploy; incur provider cost; or access customer/live
data.

## Exact readiness bindings

The following bindings are indivisible and grant no probe authority.

| ID | Binding |
| --- | --- |
| `WP88-BIND-001` | WP-87 publication is `e5f19a3ebe9d6657f8af0a5a63e74ef2b2681489`. |
| `WP88-BIND-002` | WP-87 repository tree is `502b629c155ca15fbbe01b240c41675b66f2462f`. |
| `WP88-BIND-003` | Accepted proof tree remains `45369309793a803e761ace440c291c7d1ebdfe37`; WP-88 neither inspects nor changes it. |
| `WP88-BIND-004` | Published WP-87 document SHA-256 is `3464ed853e9e950db6b4647b7c149c0afa22f004266df57394f376005c82db86`. |
| `WP88-BIND-005` | `DEC-220` through `DEC-222`, `WP87-BIND-001` through `028`, `WP87-DEC-001` through `008`, and resolved `WP87-VAL-001` through `003` are inherited without weakening. |
| `WP88-BIND-006` | WP-84 run `wp84-2026-10-09-01` remains immutable, Inconclusive, closed, and non-reusable. |
| `WP88-BIND-007` | Proposed later execution package is `WP-89`; proposed single-use probe ID is `wp89-2026-10-09-01`. Neither exists as an authorized execution. |
| `WP88-BIND-008` | Proposed operator remains `/root`; current Docker/API authority is zero. |
| `WP88-BIND-009` | Independent probe validator remains `/root/wp86_docker_access_validator`, distinct from the operator and permanently TP-01-reproduction-ineligible. |
| `WP88-BIND-010` | Validator independence-attestation SHA-256 is `2bb57b38513cec5a461b809cd1a03602a460aafc58b505bf2f9c847eff41df90`. |
| `WP88-BIND-011` | Receipt/stop contract SHA-256 is `c716dd1728f6e0570f88b672c243c87579596349f2a2167dae39f16f12ef695c`. |
| `WP88-BIND-012` | Probe controller SHA-256 is `e87ca5cad5c7af3025096266f5aae02a0e345c7b16d931860b665e9e82763881`. |
| `WP88-BIND-013` | Receipt verifier SHA-256 is `d320ca2d0b477121d64d6e378efbed673b720634043582d228e1989ad642f0f8`. |
| `WP88-BIND-014` | The exact private controller, contract, and verifier paths are bound in the ineffective draft and currently reproduce the accepted hashes. |
| `WP88-BIND-015` | Private ineffective draft SHA-256 is `6549e86ec00ca23db3d1ae82ee128af51c2b86bd98c698aecb41d48b79af0b9e`. |
| `WP88-BIND-016` | The draft is `DRAFT_NOT_AUTHORIZED`; `effective`, `probeAuthorized`, `retryAuthorized`, and `networkAllowed` are false. |
| `WP88-BIND-017` | All 29 action-authority flags are false. |
| `WP88-BIND-018` | Context is exactly `desktop-linux`; ambient `DOCKER_*` and `TP01_*` values remain inadmissible to the future child environment. |
| `WP88-BIND-019` | Expected Docker client and server versions are each exactly `29.7.2`. |
| `WP88-BIND-020` | The only proposed operations are `INSPECT_LOCAL_DOCKER_CONTEXT` and `HANDSHAKE_DOCKER_CLIENT_SERVER_VERSION`, in that order. |
| `WP88-BIND-021` | The only proposed typed failures are the six accepted `DOCKER_*` readiness codes; raw diagnostics remain prohibited. |
| `WP88-BIND-022` | Proposed receipt validity is at most 15 minutes, single-use, and invalid on any accepted continuity change. |
| `WP88-BIND-023` | Operator process UID, Docker executable path/hash, authorization path/time/expiry, receipt/stop paths, endpoint/host observations, observed versions, and independent operational validation remain null. |
| `WP88-BIND-024` | Exact operator process UID must be captured and matched before either Docker call in any later effective package. |
| `WP88-BIND-025` | Exact Docker executable path and SHA-256 must be bound before either Docker call; no PATH lookup or shell evaluation is allowed. |
| `WP88-BIND-026` | A later authorization must be created fresh, use `ACCEPTED_FOR_PROBE`, set `effective` and `probeAuthorized` true, retain `retryAuthorized` and `networkAllowed` false, bind private evidence paths, and expire within 15 minutes. |
| `WP88-BIND-027` | The ineffective draft is non-promotable and non-reusable; a later effective authorization must be a newly created file, not a rename, copy, or mutation of this draft. |
| `WP88-BIND-028` | Receipt and stop paths must be new, exclusive, private, same-directory paths under the accepted evidence root; neither exists now. |
| `WP88-BIND-029` | A successful receipt grants only transient Docker host-access readiness and no image, registry, Compose, runtime, dependency, proof, product, architecture, or deployment authority. |
| `WP88-BIND-030` | Probe failure creates only one minimized typed stop, no receipt, no retry, and consumes no TP-01 run. |
| `WP88-BIND-031` | A qualified human security review remains mandatory before production deployment or real/customer data. |
| `WP88-BIND-032` | Docker/API execution, context inspection, version handshake, images, registry, Compose, containers, networks, volumes, databases, services, dependencies, credentials, preflight, proof/reproduction, application coding, architecture selection, infrastructure, deployment, provider accounts/cost, network, and customer/live data remain closed. |

## Proposed roles and exact later sequence

| Role | Proposed identity | WP-88 authority |
| --- | --- | --- |
| Owner | Aung Myo Oo | Retains later execution and result-disposition authority |
| Probe operator | `/root` | Proposed only; zero Docker/API authority |
| Independent receipt validator | `/root/wp86_docker_access_validator` | Attested and reserved for the exact later receipt; zero current authority |
| Later TP-01 reproduction validator | Unassigned fresh identity | Must be distinct from the probe validator |
| Qualified production security reviewer | Named qualified human | Mandatory before production or real/customer data |

Any separately authorized WP-89 package would be limited to: create one new effective private
authorization; bind current operator UID and exact Docker executable; inspect the exact selected
local endpoint; perform one exact client/server handshake; create either one minimized receipt or
one typed stop; independently verify any receipt; and terminate. This paragraph is planning only
and does not authorize any step.

## Ineffective private draft

The ignored private draft is run-specific to proposed `WP-89` / `wp89-2026-10-09-01`, binds the
published WP-87 revision and accepted static control paths/hashes, and preserves the exact roles,
context, versions, operations, failures, and receipt window. It remains non-executable: status is
`DRAFT_NOT_AUTHORIZED`; every action flag is false; execution-only fields are null; and promotion
or reuse is prohibited.

## Accepted owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP88-DEC-001` | Accept `WP88-BIND-001` through `032` as indivisible. | Accepted |
| `WP88-DEC-002` | Accept `WP-89` and `wp89-2026-10-09-01` only as proposed later package/probe identities. | Accepted |
| `WP88-DEC-003` | Accept `/root` only as proposed operator and `/root/wp86_docker_access_validator` only as the independent receipt validator. | Accepted |
| `WP88-DEC-004` | Accept the exact contract, controller, verifier, and attestation hashes as the only later control candidate. | Accepted |
| `WP88-DEC-005` | Accept the private draft only as ineffective, all-false, partially bound, non-promotable, and non-reusable. | Accepted |
| `WP88-DEC-006` | Require a newly created effective authorization with fresh OS-identity, executable, time, and evidence bindings before execution. | Accepted |
| `WP88-DEC-007` | Preserve the exact two-operation, six-stop, minimized-evidence, 15-minute, single-use contract. | Accepted |
| `WP88-DEC-008` | Require a separate exact owner authorization before any Docker/API operation or effective authorization creation. | Accepted |
| `WP88-DEC-009` | Permit a later WP-89 only as a non-proof readiness probe; success or failure cannot select architecture or authorize TP-01. | Accepted |
| `WP88-DEC-010` | Keep every runtime, proof, product, architecture, infrastructure, deployment, provider/cost, network, and customer/live-data gate closed. | Accepted |

## Validation and frozen inventory

Static validation must reproduce the publication/tree/document hashes, control and draft hashes,
32 sequential bindings, ten Proposed decisions, proposed identities, exact package/probe IDs,
two operations, six failure codes, 29 false action flags, every required null execution field,
non-promotability, ignored private custody, four-path public scope, whitespace validity, and zero
Docker/network/runtime/proof operation.

The proposed WP-88 public inventory is exactly:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/90_TP01_DOCKER_HOST_ACCESS_PROBE_CONTROL_MATERIALIZATION.md`
4. `docs/91_TP01_DOCKER_HOST_ACCESS_PROBE_EXECUTION_AUTHORIZATION_READINESS.md`

The owner accepted the exact bindings, decisions, proposed roles and probe identity, static control
hashes, ineffective draft, and root static-validation `PASS`. Commit and push are authorized only
for the exact four-path WP-88 public inventory after final validation. After verified publication,
the separately authorized WP-89 probe may create one new effective authorization and execute only
the accepted two-operation contract. No other authority is granted.

## Verified publication and WP-89 result boundary

The exact four-path WP-88 public inventory was published as
`5cba0a4489edab6d149e882ee9f48c912e7a0ea3`, with repository tree
`4936db70020b0e5de256ae509d772f4dea2a51ba`. Local `HEAD`, cached `origin/main`, and live remote
main matched. The proof tree remained `45369309793a803e761ace440c291c7d1ebdfe37`, and this
published document hashes to
`d925ed3a1c58f9e1c53eefca7c6f717799a0b3236f27b9ee5288d8e9eb88cac0`.

The separately authorized WP-89 probe produced one independently validated `READY` receipt and no
typed stop. The single-use receipt is consumed and non-reusable. It records host-access readiness
only and grants no TP-01, runtime, architecture, product, deployment, network, or customer-data
authority. WP-89 result documentation is pending owner review and is not authorized for commit or
push.
