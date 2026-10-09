# TP-01 Docker Host Access Probe Control Materialization

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — static materialization complete; exact publication authorized |
| Work package | `WP-87 Docker Host Access Probe Control Materialization and Validator Instantiation` |
| Governing decisions | `DEC-220`; `DEC-221`; `DEC-222` — Accepted |
| WP-86 publication | `211cf95249afc7e75263bbe9ca41aae905888964` |
| WP-86 repository tree | `249949d8480da21bafd3516e2dec8989b24d1e61` |
| Proof tree | `45369309793a803e761ace440c291c7d1ebdfe37` |
| Published WP-86 document SHA-256 | `e31413257c688a496efd8872cf43cf5671ea487d4db691a7ee390cd1637fe40a` |
| Owner | Aung Myo Oo |
| Date | 2026-10-09 |
| Probe execution | Not authorized |

## Objective and authority boundary

WP-87 materializes the exact ignored private controls needed to inspect a later Docker host-access
probe before any execution decision. It instantiates exactly one fresh independent validator for a
zero-authority attestation and prepares one explicitly ineffective private authorization draft.

WP-87 does not contact Docker, inspect a context, perform a version handshake, create a readiness
receipt or operational stop, restore dependencies, generate credentials, execute preflight or
TP-01, use network, alter the proof tree, change application code, select architecture, create
infrastructure, deploy, incur provider cost, or access customer/live data.

## Exact materialized candidate

The following ignored private artifacts form one indivisible static candidate:

| Artifact | SHA-256 |
| --- | --- |
| Receipt and typed-stop contract | `c716dd1728f6e0570f88b672c243c87579596349f2a2167dae39f16f12ef695c` |
| Import-safe probe controller | `e87ca5cad5c7af3025096266f5aae02a0e345c7b16d931860b665e9e82763881` |
| Import-safe receipt verifier | `d320ca2d0b477121d64d6e378efbed673b720634043582d228e1989ad642f0f8` |
| Contract tests | `5e54d6508428ed2a81104b5222000ec6c0ec892734a5ae4a3923c6bb97dd71c1` |
| Module-instantiation tests | `dc00fa5a8c29541b1fb42e7e6538859f016f02b30cc6dd2bacfb2b96c9fab6e8` |
| Fresh validator independence attestation | `2bb57b38513cec5a461b809cd1a03602a460aafc58b505bf2f9c847eff41df90` |

These artifacts are private proof-governance controls. They are not application code, an accepted
dependency, a Docker result, or an architecture decision.

## Exact bindings

| ID | Binding |
| --- | --- |
| `WP87-BIND-001` | WP-86 publication is `211cf95249afc7e75263bbe9ca41aae905888964` and repository tree is `249949d8480da21bafd3516e2dec8989b24d1e61`. |
| `WP87-BIND-002` | The accepted proof tree remains `45369309793a803e761ace440c291c7d1ebdfe37`; WP-87 neither reads through Docker nor changes that tree. |
| `WP87-BIND-003` | Published WP-86 document SHA-256 is `e31413257c688a496efd8872cf43cf5671ea487d4db691a7ee390cd1637fe40a`. |
| `WP87-BIND-004` | `DEC-220`, `DEC-221`, `WP86-BIND-001` through `022`, and `WP86-DEC-001` through `010` are inherited without weakening. |
| `WP87-BIND-005` | `/root/wp86_docker_access_validator` is the exactly one fresh validator instantiated for WP-87 and is independent from `/root`, every TP-01 reproduction validator, and the technical security reviewer. |
| `WP87-BIND-006` | The fresh validator attestation SHA-256 is `2bb57b38513cec5a461b809cd1a03602a460aafc58b505bf2f9c847eff41df90`; it grants zero probe or reproduction authority. |
| `WP87-BIND-007` | The minimized receipt and typed-stop contract SHA-256 is `c716dd1728f6e0570f88b672c243c87579596349f2a2167dae39f16f12ef695c`. |
| `WP87-BIND-008` | The import-safe probe controller SHA-256 is `e87ca5cad5c7af3025096266f5aae02a0e345c7b16d931860b665e9e82763881`. |
| `WP87-BIND-009` | The import-safe receipt verifier SHA-256 is `d320ca2d0b477121d64d6e378efbed673b720634043582d228e1989ad642f0f8`. |
| `WP87-BIND-010` | Contract-test SHA-256 is `5e54d6508428ed2a81104b5222000ec6c0ec892734a5ae4a3923c6bb97dd71c1`; module-instantiation-test SHA-256 is `dc00fa5a8c29541b1fb42e7e6538859f016f02b30cc6dd2bacfb2b96c9fab6e8`. |
| `WP87-BIND-011` | Static validation uses exact local Node.js `v22.23.1` without dependency installation, npm, registry, or network access. |
| `WP87-BIND-012` | The controller is import-safe and can enter its operational path only by direct execution with exactly `--authorization` and one absolute private path; shell evaluation is disabled. |
| `WP87-BIND-013` | A future effective authorization must bind the controller, contract, verifier, Docker executable, identities, actual operator process UID, context, versions, package/probe IDs, evidence paths, and a maximum 15-minute validity window by exact paths and hashes. |
| `WP87-BIND-014` | The future child environment removes ambient `DOCKER_*` and `TP01_*`, sets only `DOCKER_CONTEXT=desktop-linux` for Docker selection, and uses no shell. |
| `WP87-BIND-015` | The only future Docker operations are exact context-endpoint inspection and exact client/server version handshake. |
| `WP87-BIND-016` | The endpoint must be a local Unix socket and both Docker client and server versions must equal `29.7.2`. |
| `WP87-BIND-017` | A successful receipt contains only the accepted minimized fields, hashes endpoint and host identity, and never retains their raw values. |
| `WP87-BIND-018` | A future receipt or typed stop must be created exclusively with mode `0400`; overwrite is prohibited. |
| `WP87-BIND-019` | Docker output is classified in memory; raw stdout, stderr, endpoints, hostnames, environment values, inventories, credentials, and customer data are never written to evidence. |
| `WP87-BIND-020` | Invalid command output maps to `DOCKER_READINESS_EVIDENCE_INVALID`; unequal versions map to `DOCKER_VERSION_BINDING_MISMATCH`. |
| `WP87-BIND-021` | The receipt verifier performs no Docker operation and binds authorization, controller, contract, verifier, receipt mode, identities, operator process UID, host identity, context, versions, and content hashes. |
| `WP87-BIND-022` | The verifier rejects expired receipts and cannot extend, refresh, rename, promote, or consume them. |
| `WP87-BIND-023` | A later receipt is single-use and may be consumed only by a separately authorized later gate; WP-87 creates no receipt. |
| `WP87-BIND-024` | No cleanup control is materialized because the probe contract permits no Docker or other runtime mutation. |
| `WP87-BIND-025` | All materialized controls and evidence remain ignored/private and are not reusable as application implementation. |
| `WP87-BIND-026` | A qualified human security review remains mandatory before production deployment or real/customer data use. |
| `WP87-BIND-027` | No effective authorization, probe package/probe ID, Docker executable binding, receipt, stop evidence, operational validation, or readiness result exists. |
| `WP87-BIND-028` | Docker/API execution, context inspection, version handshake, images, registry, Compose, runtime resources, databases, services, dependencies, credentials, preflight, proof/reproduction, application coding, architecture selection, infrastructure, deployment, provider accounts/cost, network, and customer/live data remain closed. |

## Fresh validator attestation

Exactly one fresh validator, `/root/wp86_docker_access_validator`, was instantiated. Its private
attestation confirms that it is distinct from the proposed operator, all TP-01 reproduction
validators, and the technical security reviewer; performed no Docker/API or proof action; received
no reproduction authority; and changed only its own attestation. The attestation is not an
independent execution result or a qualified human production-security review.

## Static validation result

Exact Node.js `v22.23.1` completed syntax checks for the contract, controller, verifier, and two
test modules. The two dependency-free test suites passed all six tests. Coverage verifies strict
receipt/stop shapes, forbidden-field rejection, import safety, exact command templates, stripped
ambient Docker/TP-01 variables, shell-free execution, exclusive private evidence, exact versions,
and absence of side effects during import. No Docker executable or API was invoked.

`WP87-VAL-001` was resolved before owner review: root static review found that the receipt verifier
compared the controller hash from authorization and receipt but did not independently re-hash the
bound controller path. The verifier now validates the absolute controller path and current file
hash, authorization path, authorization/receipt timestamps, and false network authority. The
affected verifier, test, and draft hashes were renewed and the complete six-test suite passed.

Independent review then raised `WP87-VAL-002` and `WP87-VAL-003`: the planned operator identity
was not bound to the actual process permission identity, leaving
`DOCKER_OPERATOR_CONTEXT_MISMATCH` unreachable, and the authorization-time predicate could accept
a future start or reversed interval. Both are resolved. A future authorization must bind the
operator process UID; mismatch creates the exact typed stop before Docker invocation; the verifier
also checks current UID and host identity. Authorization now requires finite timestamps,
`authorizedAt <= now < expiresAt`, `expiresAt > authorizedAt`, and a maximum 15-minute interval.
All affected hashes were renewed and the six-test suite passed again.

## Ineffective private authorization state

The private draft remains `DRAFT_NOT_AUTHORIZED`, with `effective`, `probeAuthorized`, every
action-authority flag, and network authority false. Package/probe IDs, operator process UID, effective authorization
path and time, Docker executable path/hash, receipt/stop paths, observations, and independent
execution validation remain null. The draft is non-promotable and cannot be interpreted as a
probe authorization.

## Accepted owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP87-DEC-001` | Accept `WP87-BIND-001` through `028` as indivisible. | Accepted |
| `WP87-DEC-002` | Accept the six private materialized artifact hashes as one static candidate. | Accepted |
| `WP87-DEC-003` | Accept `/root/wp86_docker_access_validator` as the exactly one fresh, independent, zero-authority validator instantiated for this gate. | Accepted |
| `WP87-DEC-004` | Accept exact Node.js syntax validation and all six dependency-free tests as static `PASS`, without treating them as Docker readiness. | Accepted |
| `WP87-DEC-005` | Accept the private authorization draft only as ineffective, all-false, null-operational-material, and non-promotable. | Accepted |
| `WP87-DEC-006` | Require any later probe decision to create a fresh run-specific effective authorization binding all accepted identities, hashes, paths, timestamps, and the exact two-operation contract. | Accepted |
| `WP87-DEC-007` | After verified publication, permit only owner-decision documentation and private authorization-readiness preparation; actual probe execution remains a separate owner gate. | Accepted |
| `WP87-DEC-008` | Keep every Docker/API, proof, runtime, product, architecture, infrastructure, deployment, provider/cost, network, and customer/live-data gate closed. | Accepted |

## Frozen inventory and next gate

The proposed WP-87 public inventory is exactly:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/89_TP01_DOCKER_HOST_ACCESS_PROBE_AUTHORIZATION_READINESS.md`
4. `docs/90_TP01_DOCKER_HOST_ACCESS_PROBE_CONTROL_MATERIALIZATION.md`

The owner accepted the bindings, artifacts, validator attestation, ineffective draft, resolved
findings, decisions, and independent static-validation `PASS`. Commit and push are authorized only
for the exact four-path WP-87 public inventory after final validation. After verified publication,
WP-88 may prepare owner-decision documentation and a private ineffective run-specific
authorization candidate. Actual Docker/API probing still requires its own later exact owner
authorization.
