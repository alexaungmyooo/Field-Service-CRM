# TP-01 Docker Host Access Probe Authorization Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — authorization readiness only; exact publication authorized |
| Work package | `WP-86 Docker Host Access Probe Authorization Readiness` |
| Governing decisions | `DEC-220`; `DEC-221` — Accepted |
| WP-85 publication | `b5d3e3a6e1ad68101017a92f22ed95d9f745093d` |
| WP-85 repository tree | `f04c446c754c4ddfa88519553980f4e71928d609` |
| Proof tree | `45369309793a803e761ace440c291c7d1ebdfe37` |
| WP-85 document SHA-256 | `5b05a08bd4c4580c28deae842b941ece866645b1effba7ae124927edc8a9189f` |
| Owner | Aung Myo Oo |
| Date | 2026-10-09 |
| Probe execution | Not authorized |

## Objective and authority boundary

WP-86 binds the accepted readiness contract to one prospective read-only probe and prepares an
ignored, explicitly ineffective authorization draft. It defines the exact future command classes,
role separation, evidence, expiry, stop conditions, and forbidden actions needed for a later owner
execution decision.

WP-86 performs no probe and measures no host or Docker property. It does not instantiate the
proposed validator, create executable controls, assign a probe ID, contact a socket or daemon,
create a receipt, or authorize any Docker, proof, network, product, or deployment action.

## Exact published baseline

| ID | Binding |
| --- | --- |
| `WP86-BIND-001` | WP-85 publication is `b5d3e3a6e1ad68101017a92f22ed95d9f745093d`. |
| `WP86-BIND-002` | WP-85 repository tree is `f04c446c754c4ddfa88519553980f4e71928d609`. |
| `WP86-BIND-003` | Accepted proof tree remains `45369309793a803e761ace440c291c7d1ebdfe37`; WP-86 does not inspect or change it. |
| `WP86-BIND-004` | Published WP-85 document SHA-256 is `5b05a08bd4c4580c28deae842b941ece866645b1effba7ae124927edc8a9189f`. |
| `WP86-BIND-005` | `DEC-220`, `WP85-BIND-001` through `022`, and `WP85-DEC-001` through `008` are inherited without weakening. |
| `WP86-BIND-006` | WP-84 run `wp84-2026-10-09-01` remains immutable, Inconclusive, closed, and non-reusable. |

## Proposed roles

| Role | Proposed identity | Current authority |
| --- | --- | --- |
| Owner | Aung Myo Oo | Retains acceptance and later probe-execution authority |
| Probe operator | `/root` | Proposed only; no Docker authority |
| Independent receipt validator | `/root/wp86_docker_access_validator` | Reserved proposed identity; not instantiated or attested |
| Later TP-01 reproduction validator | Unassigned fresh identity | Must be distinct from the probe validator |
| Qualified production security reviewer | Named qualified human | Still required before production or real/customer data |

Role names in documentation are not assignments. A later package must explicitly authorize exactly
one fresh probe validator to be created and attested before probe execution can be considered.

## Exact future probe contract

The future probe is limited to two semantic operations under the intended operator host-permission
context. Exact executable paths and hashes remain null until a later materialization package.

| ID | Exact requirement |
| --- | --- |
| `WP86-BIND-007` | Probe package ID and probe ID must be fresh, explicit, single-use, and hash-bound. |
| `WP86-BIND-008` | Operator is proposed as `/root`; the validator must be the fresh attested `/root/wp86_docker_access_validator`. |
| `WP86-BIND-009` | Select context `desktop-linux` explicitly after removing ambient `DOCKER_*` and `TP01_*` variables. |
| `WP86-BIND-010` | Operation one may inspect only the selected context endpoint and must require a local Unix-socket scheme. |
| `WP86-BIND-011` | Operation two may perform only one Docker client/server version handshake through `desktop-linux`. |
| `WP86-BIND-012` | No fallback context, endpoint, permission mode, command, or shell evaluation is allowed. |
| `WP86-BIND-013` | Image, registry, pull, build, Compose, container, network, volume, secret, database, service, process-list, and host-environment inventory operations are forbidden. |
| `WP86-BIND-014` | npm, internet, provider account/cost, credential, customer/live-data, dependency, checkout, and proof operations are forbidden. |
| `WP86-BIND-015` | A successful handshake is necessary but grants no image, runtime, proof, architecture, or product authority. |
| `WP86-BIND-016` | Receipt fields are limited to schema/package/probe IDs, operator and validator identities, context name, local endpoint type/hash, host-identity hash, client/server versions, timestamps, expiry, control/authorization hashes, and `READY`. |
| `WP86-BIND-017` | Raw stdout/stderr, absolute endpoint path, environment values, credentials, URLs, image/container inventories, host process data, and customer data are prohibited from evidence. |
| `WP86-BIND-018` | Receipt validity is 15 minutes, single-use, and invalidated by any known operator, host, context, endpoint, version, permission-context, or daemon change. |
| `WP86-BIND-019` | The independent validator must verify authorization/control hashes, exact command/evidence shape, `READY`, freshness, identity/context continuity, and forbidden-field absence. |
| `WP86-BIND-020` | Any failure creates only a minimized typed stop and no readiness receipt. |
| `WP86-BIND-021` | Probe failure never consumes a TP-01 run because dependency, credential, checkout, and proof-run creation remain prohibited. |
| `WP86-BIND-022` | No cleanup operation is authorized or required because the probe may create no runtime state. |

## Typed stop contract

The only planned failure codes are:

- `DOCKER_CONTEXT_NOT_LOCAL_UNIX`;
- `DOCKER_OPERATOR_CONTEXT_MISMATCH`;
- `DOCKER_API_SOCKET_ACCESS_DENIED`;
- `DOCKER_DAEMON_UNREACHABLE`;
- `DOCKER_VERSION_BINDING_MISMATCH`;
- `DOCKER_READINESS_EVIDENCE_INVALID`.

Failure evidence may contain only schema/package/probe IDs, stage, code, non-sensitive check ID,
timestamp, authorization/control hashes, and `NOT_READY`. It may not retain raw command output,
absolute paths, endpoint values, environment values, credentials, or host/runtime inventories.

## Ineffective private draft

The WP-86 draft is `DRAFT_NOT_AUTHORIZED`. It records the accepted baseline, planned context,
proposed roles, 15-minute expiry, two planned operation names, six typed failures, and every action-
authority flag as false. Probe/package IDs, executable/control path and hash, authorization time,
endpoint identity, host identity, client/server versions, receipt, stop evidence, and validation are
null. The draft is non-promotable and cannot be renamed or interpreted as effective authorization.

## Accepted owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP86-DEC-001` | Accept bindings `WP86-BIND-001` through `022` as indivisible. | Accepted |
| `WP86-DEC-002` | Accept `/root` only as proposed future probe operator with zero current Docker authority. | Accepted |
| `WP86-DEC-003` | Reserve `/root/wp86_docker_access_validator` only as a proposed fresh independent validator; do not instantiate it yet. | Accepted |
| `WP86-DEC-004` | Require any later reproduction validator to be fresh and distinct from the probe validator. | Accepted |
| `WP86-DEC-005` | Accept exactly two future semantic operations and six minimized typed failure codes. | Accepted |
| `WP86-DEC-006` | Accept the 15-minute single-use receipt and all invalidation conditions. | Accepted |
| `WP86-DEC-007` | Accept the private draft only as ineffective, all-false, null-material, and non-promotable. | Accepted |
| `WP86-DEC-008` | Require a later package to materialize and statically validate exact controls before probe execution authorization. | Accepted |
| `WP86-DEC-009` | After verified WP-86 publication, permit only owner-decision documentation, exact control materialization, and one fresh validator instantiation/attestation; keep probe execution closed. | Accepted |
| `WP86-DEC-010` | Keep Docker/API execution and every image, runtime, dependency, credential, proof, network, product, architecture, infrastructure, deployment, provider/cost, and customer/live-data gate closed. | Accepted |

## Validation and frozen inventory

Static validation must confirm the exact publication/tree/document hashes, 22 sequential bindings,
ten Accepted decisions, role separation, two planned operations, six failure codes, all null
material/evidence fields, all false action flags, non-promotable draft, absence of executable
controls and operational evidence, public secret/path absence, exact scope, empty index, and
whitespace validity.

The authorized public inventory is exactly:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/88_TP01_DOCKER_HOST_ACCESS_READINESS.md`
4. `docs/89_TP01_DOCKER_HOST_ACCESS_PROBE_AUTHORIZATION_READINESS.md`

## Next gate

The owner accepted the exact bindings, decisions, roles, ineffective draft, and static-validation
`PASS`. WP-86 grants no probe authority. Commit and push are authorized only for the exact frozen
inventory after final static validation. After verified publication, WP-87 may materialize exact
private static controls, instantiate exactly one fresh independent validator, record its zero-
authority attestation, and prepare another ineffective execution draft. Actual Docker/API probing
still requires a separate exact owner authorization.

## Verified publication and WP-87 boundary

The exact four-path WP-86 public inventory was published as
`211cf95249afc7e75263bbe9ca41aae905888964`, with repository tree
`249949d8480da21bafd3516e2dec8989b24d1e61`. Local `HEAD`, cached `origin/main`, and live remote
main matched. The proof tree remained `45369309793a803e761ace440c291c7d1ebdfe37`, and this
published document hashes to
`e31413257c688a496efd8872cf43cf5671ea487d4db691a7ee390cd1637fe40a`.

WP-86 is `VERIFIED_AND_CLOSED` without a Docker/API probe, context inspection, version handshake,
readiness receipt, or proof result. WP-87 may materialize only ignored private static controls,
dependency-free tests, one all-false ineffective authorization draft, and exactly one fresh
zero-authority validator attestation. Docker/API execution and every other closed gate remain
closed until a later exact owner authorization.
