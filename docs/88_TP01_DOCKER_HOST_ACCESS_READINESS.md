# TP-01 Docker Host Access Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — planning contract; exact publication authorized |
| Work package | `WP-85 Docker Host Access Readiness` |
| Governing decision | `DEC-219`; `DEC-220` — Accepted |
| WP-84 publication | `c7a4bd57a8d94dd60014d2b0f1217ab5008ad2eb` |
| WP-84 repository tree | `91791ebd8ea0812a869a1e80a81a1b1e747582a5` |
| Accepted proof revision | `ecc2db47c4395d19962adcf21f45bf3ff0a0932f` |
| Proof tree | `45369309793a803e761ace440c291c7d1ebdfe37` |
| WP-84 result document SHA-256 | `7ceae08f3a0cb119bce1e992f14304f304c28e0b397f68015480a9dcfa069e60` |
| Planned local Docker context | `desktop-linux` |
| Owner | Aung Myo Oo |
| Date | 2026-10-09 |
| Docker/runtime authority | Closed |

## Objective

WP-85 designs a narrow gate that can later prove the intended operator context can reach the exact
local Docker API before a future proof run consumes its run ID, dependencies, credentials, or
effective authorization. It separates host-access readiness from TP-01 preflight and from every
image, Compose, service, database, or proof action.

WP-85 records no measured Docker result. Static planning does not establish that Docker is running,
that the socket is accessible, that an image exists, or that TP-01 can execute.

## Scope and non-scope

Authorized scope is limited to:

- binding the verified WP-84 result and exact stop;
- comparing readiness-gate options;
- specifying a future read-only access probe, evidence schema, freshness, stop behavior, roles,
  and authority boundaries;
- preparing one ignored, explicitly ineffective private planning draft;
- static validation of documentation and draft consistency.

WP-85 does not authorize Docker API access, socket probing, image inspection or retrieval, a pull
token, Compose, containers, networks, volumes, databases, services, dependency restoration,
credentials, environment generation, effective authorization, preflight, cleanup execution,
proof, handoff, reproduction, network, application code, architecture selection, infrastructure,
deployment, provider accounts/cost, or customer/live data.

## Root-cause boundary

WP-84 failed because the exact preflight process lacked permission to access the selected local
Docker Unix socket. Later mandatory cleanup succeeded only when invoked with the required host
permission. This establishes an execution-context mismatch, not a proof-code, database, tenant-
isolation, image, or Docker-daemon defect.

Cleanup success cannot retroactively validate preflight and cannot authorize reuse of the consumed
WP-84 run. A future gate must test the same intended operator and permission context that would
launch preflight, but it must do so before a proof run is created or authorized.

## Option analysis

| Option | Description | Disposition | Reason |
| --- | --- | --- | --- |
| `WP85-OPT-001` | Separate, read-only host-access probe before future proof-run materialization. | Advance | Detects the exact failure without consuming a proof run or granting broader authority. |
| `WP85-OPT-002` | Let the next proof preflight discover access failure again. | Reject | Repeats WP-84 and consumes fresh material and authorization before a known prerequisite is proved. |
| `WP85-OPT-003` | Treat successful cleanup access as sufficient readiness evidence. | Reject | Cleanup used a different permission context and cannot prove future preflight access. |
| `WP85-OPT-004` | Broadly authorize Docker commands for convenience. | Reject | Expands authority beyond the one prerequisite and weakens image/runtime/network separation. |

## Accepted readiness contract

The future probe is a separate authorization package, not a TP-01 execution stage. Its only
purpose is to return `READY` or a minimized typed stop.

| ID | Exact binding |
| --- | --- |
| `WP85-BIND-001` | Bind the future probe to one package ID, probe ID, intended operator identity, host identity, and exact local Docker context `desktop-linux`. |
| `WP85-BIND-002` | The intended operator must be the same effective execution context later proposed for TP-01 preflight. |
| `WP85-BIND-003` | Remove ambient `DOCKER_*` and `TP01_*` values and select the accepted local context explicitly. |
| `WP85-BIND-004` | Require a local Unix-socket endpoint; reject TCP, SSH, remote, or unrecognized endpoints. |
| `WP85-BIND-005` | Bind the endpoint only by minimized type and SHA-256; do not publish or retain its absolute path. |
| `WP85-BIND-006` | Permit only context inspection and one Docker client/server version handshake in the future probe. |
| `WP85-BIND-007` | Prohibit image, registry, pull, build, Compose, container, network, volume, secret, database, and service commands. |
| `WP85-BIND-008` | Prohibit npm, internet, provider account, cost, credential, and customer/live-data access. |
| `WP85-BIND-009` | Require exact command allowlisting with no shell evaluation or user-supplied command fragments. |
| `WP85-BIND-010` | Record client and server semantic versions, context name, operator identity, host identity hash, endpoint type/hash, timestamp, and result code only. |
| `WP85-BIND-011` | Retain no raw stdout/stderr, socket path, environment dump, credential, URL, image inventory, container inventory, or host process listing. |
| `WP85-BIND-012` | `READY` requires a successful daemon handshake through the exact selected local context under the intended operator permission context. |
| `WP85-BIND-013` | Any nonzero, permission, endpoint, version, context, or evidence failure returns a typed fail-closed stop and grants no later authority. |
| `WP85-BIND-014` | A readiness receipt expires after 15 minutes and immediately on detected or operator-observed operator, host, context, endpoint-hash, client/server-version, or Docker-daemon restart/change. |
| `WP85-BIND-015` | A receipt is single-use input to later owner-decision readiness; it is not an effective proof authorization. |
| `WP85-BIND-016` | No dependency, credential, environment, checkout, proof run ID, or pull token may be created before a fresh `READY` receipt is independently validated. |
| `WP85-BIND-017` | Probe failure does not consume or authorize a TP-01 run because no TP-01 run may yet exist. |
| `WP85-BIND-018` | The probe needs an operator and an independent static/evidence validator distinct from any later reproduction role. |
| `WP85-BIND-019` | Private probe authorization, raw operational evidence, and endpoint identity remain under ignored `internal-local/`; public documents retain only minimized hashes and disposition. |
| `WP85-BIND-020` | Qualified human production security review remains mandatory before production or real/customer data. |
| `WP85-BIND-021` | Application coding, architecture selection, infrastructure, deployment, provider accounts/cost, and customer/live data remain closed. |
| `WP85-BIND-022` | WP-85 itself performs no probe and creates no executable or effective authorization. |

## Evidence and stop model

A later authorized probe would produce one private immutable receipt containing only the fields in
`WP85-BIND-010`, an authorization hash, and the exact control hash. Failure evidence would contain
only the stage, typed code, timestamp, and non-sensitive check identifier.

Accepted typed failures are:

- `DOCKER_CONTEXT_NOT_LOCAL_UNIX`;
- `DOCKER_OPERATOR_CONTEXT_MISMATCH`;
- `DOCKER_API_SOCKET_ACCESS_DENIED`;
- `DOCKER_DAEMON_UNREACHABLE`;
- `DOCKER_VERSION_BINDING_MISMATCH`;
- `DOCKER_READINESS_EVIDENCE_INVALID`.

No failure permits fallback to another context, broader command, registry, image, Compose, or
proof operation. No cleanup command is required because the future probe is forbidden from
creating runtime state.

## Private planning draft

WP-85 creates one ignored `DRAFT_NOT_AUTHORIZED` planning record. It has null package/probe IDs,
no operator assignment, no endpoint, no control path/hash, no receipt, and every action-authority
flag false. It may not be copied, renamed, promoted, or interpreted as an authorization.

## Accepted owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP85-DEC-001` | Accept `WP85-OPT-001`; reject `WP85-OPT-002` through `004`. | Accepted |
| `WP85-DEC-002` | Accept `WP85-BIND-001` through `022` as one indivisible readiness contract. | Accepted |
| `WP85-DEC-003` | Classify Docker host access as a separately authorized prerequisite, not proof execution or architecture evidence. | Accepted |
| `WP85-DEC-004` | Accept the 15-minute freshness window and immediate invalidation conditions. | Accepted |
| `WP85-DEC-005` | Accept the minimized receipt and typed-failure model; prohibit raw output and private endpoint publication. | Accepted |
| `WP85-DEC-006` | Accept the private draft only as ineffective and non-promotable. | Accepted |
| `WP85-DEC-007` | After verified WP-85 publication, activate only owner-decision documentation and private ineffective-authorization preparation for a future read-only host-access probe. | Accepted |
| `WP85-DEC-008` | Keep Docker/API execution and every runtime, proof, network, product, architecture, infrastructure, deployment, provider/cost, and customer/live-data gate closed. | Accepted |

## Validation and frozen inventory

WP-85 validation must confirm exact WP-84 publication/result bindings, option dispositions,
bindings `001` through `022`, all-null/all-false private draft state, absence of executable controls
or operational evidence, closed gates, no private paths or secrets in public documents, empty Git
index, whitespace validity, and exact public scope.

The authorized public inventory is exactly:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/87_TP01_CONTROLLED_SEMANTIC_REMEDIATION_EXECUTION_RESULT.md`
4. `docs/88_TP01_DOCKER_HOST_ACCESS_READINESS.md`

## Next gate

The owner accepted the option dispositions, `DEC-220`, all 22 bindings, all eight decisions, the
ineffective private draft, and static-validation `PASS`. WP-85 grants no Docker or proof authority.
Commit and push are authorized only for the exact frozen inventory after final static validation.
After verified publication, WP-86 may prepare owner-decision documentation and a new explicitly
ineffective private authorization draft for the read-only host-access probe. Probe execution still
requires a separate exact owner authorization.

## Verified publication and successor readiness boundary

The exact four-path WP-85 public inventory was published at
`b5d3e3a6e1ad68101017a92f22ed95d9f745093d`, with repository tree
`f04c446c754c4ddfa88519553980f4e71928d609`; local `HEAD`, cached `origin/main`, and live remote
main matched. WP-85 is `VERIFIED_AND_CLOSED` with planning evidence only.

WP-86 is active only for owner-decision documentation and one private explicitly ineffective
authorization draft. It grants no validator instantiation, executable control, Docker/API access,
runtime, dependency, credential, proof, network, product, architecture, infrastructure,
deployment, provider/cost, or customer/live-data authority.
