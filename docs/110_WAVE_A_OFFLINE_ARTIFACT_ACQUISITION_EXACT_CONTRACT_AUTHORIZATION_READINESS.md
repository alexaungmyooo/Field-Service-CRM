# Wave A Offline Artifact Acquisition Exact Contract and Authorization Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — exact publication authorized |
| Work package | `WP-110 Wave A Offline Artifact Acquisition Exact Contract and Authorization Readiness` |
| Owner | Aung Myo Oo |
| Governing baseline | `DEC-239` through `DEC-242`, `WP107-ACQ-001` through `012` — Accepted |
| Published control revision | `a073206520caacc26c2ea5a45bd884b09a11251b` |
| Published repository tree | `2e2668933493eb4e034854dd66e799f9c9f95383` |
| Published control inventory | 12 paths; WP-109 independent static validation PASS |
| Recommendation | `DEC-243` — Accepted |
| Network/download/artifact acquisition | Not authorized |
| SDK/cache/dependency/build/device/runtime/proof | Not authorized |
| Architecture selection/application/infrastructure/deployment | Not authorized |
| Provider account/cost/customer or live data | Not authorized |
| Date | 2026-10-10 |

## Objective and authority boundary

WP-110 converts the accepted acquisition principles into an exact later-gate contract. It records
which artifacts, sources, paths, stages, tools, limits, evidence and stops a future acquisition
control must enforce. It also prepares one private all-false ineffective authorization draft.

WP-110 does not contact a source, resolve metadata, download bytes, create an acquisition
controller, instantiate a validator, create a quarantine bundle, restore a dependency, mutate an
SDK/cache, build, touch a device, start a runtime, execute a proof, select architecture, implement
the product, create infrastructure, incur provider cost, deploy, or use customer/live data.

The published WP-109 control is accepted static evidence, not a network-capable acquisition tool.
Its consumed authority cannot be reused, and its deliberate network denial must not be bypassed.

## Truthful starting facts

| ID | Fact |
| --- | --- |
| `WP110-FACT-001` | WP-106 remains immutable `STOPPED_STATIC_FINDING` evidence with underlying `STOPPED_DEPENDENCY_ABSENT`; it cannot be retried. |
| `WP110-FACT-002` | WP-108 remains immutable `STOPPED_CONTROL_EVIDENCE`; its validator authority violation was cleaned and accepted. |
| `WP110-FACT-003` | WP-109 resolved `WP108-VAL-001` through `007`, passed 18/18 dependency-free tests and independent validation, and was published as the exact 12-path control tree at `a073206520caacc26c2ea5a45bd884b09a11251b`. |
| `WP110-FACT-004` | The WP-109 effective authority is consumed; neither it nor its private evidence grants later execution authority. |
| `WP110-FACT-005` | No accepted Flutter `3.47.0` SDK archive, exact package archive, transitive closure, native binary, lockfile or sealed offline bundle is locally established. |
| `WP110-FACT-006` | The current host is macOS `26.6.2` build `25G83` on `arm64`; this is an observation, not a Wave A device or production support decision. |
| `WP110-FACT-007` | Existing `/usr/bin/curl`, `shasum`, `tar`, `file`, and `unzip` were observed locally without network use; observations are not future executable bindings. |
| `WP110-FACT-008` | Exact upstream response hashes, artifact sizes, redirects, Flutter/Dart revision closure and complete pub/native dependency closure remain unknown because WP-110 prohibits network access. |
| `WP110-FACT-009` | `sqflite_sqlcipher 3.4.1` remains source-review-only and cannot enter an executable candidate manifest until its High provenance finding is separately cleared. |
| `WP110-FACT-010` | A future acquisition success may establish a sealed proof-only offline bundle; it cannot accept a dependency, select architecture, or authorize materialization or execution. |

## Proposed acquisition-state model

| State | Meaning | Permitted transition |
| --- | --- | --- |
| `CONTRACT_PROPOSED` | This document and ineffective draft exist; no acquisition control or authority exists. | Owner acceptance and publication only |
| `CONTROL_MATERIALIZED_STATIC` | A separately authorized network-capable acquisition extension has been created and independently validated without using a network. | Separate execution-readiness decision |
| `METADATA_CAPTURED_UNCOMMITTED` | A later run has fetched only authorized immutable metadata into quarantine. | Validate and bind exact artifact identities or stop |
| `ARTIFACT_SET_COMMITTED` | Exact source-derived names, versions, hashes, sizes and closure are sealed in the live ledger before artifact retrieval. | Retrieve only the committed set or stop |
| `QUARANTINE_COMPLETE_UNVALIDATED` | All committed bytes exist only in acquisition-owned quarantine. | Static inspection and sealing only |
| `OFFLINE_BUNDLE_READY_FOR_OWNER_REVIEW` | Primary and independent validation pass and authority is consumed. | Separate owner bundle-acceptance package |
| `STOPPED_ACQUISITION` | A typed stop occurred; cleanup and minimized evidence are sealed. | No resume or substitution |

No state permits installation, dependency restoration, build, device use, runtime, proof execution,
application use or publication of private acquisition evidence.

## Exact artifact classes

| ID | Required identity | Later acquisition disposition |
| --- | --- | --- |
| `WP110-ART-001` | Flutter `3.47.0` stable macOS arm64 archive | Executable candidate only after official release metadata, archive hash/size, Flutter/engine revisions, bundled Dart exact version and license inventory are bound |
| `WP110-ART-002` | Bundled Dart `3.13` exact patch within the accepted Flutter archive | Must be derived from and cross-checked against the sealed Flutter archive; never separately substituted |
| `WP110-ART-003` | Drift `2.35.2` | Direct package candidate with exact archive hash, publisher/source, license, SDK constraints and dependency edges |
| `WP110-ART-004` | drift_dev `2.35.0` | Proof-only generator candidate; no generator or build hook may execute during acquisition |
| `WP110-ART-005` | sqlite3 `3.7.0` | Candidate with native/build-hook/source declarations; no native download, hook, link or load may execute |
| `WP110-ART-006` | flutter_secure_storage `11.2.0` | Candidate with Android platform/native declarations and license/source evidence |
| `WP110-ART-007` | sqflite `2.4.4+1` | Non-encryption comparison candidate only |
| `WP110-ART-008` | sqflite_sqlcipher `3.4.1` | `SOURCE_REVIEW_ONLY`; separate quarantine class; prohibited from executable manifest and later restoration |
| `WP110-ART-009` | Complete transitive pub package closure | Exact version/archive hash/source/license/SDK constraint/reason for inclusion for every node |
| `WP110-ART-010` | Native or binary references reachable from any package | Platform/architecture/source revision/hash/signature/license/build provenance and execution classification |
| `WP110-ART-011` | Existing Android/Java components proposed for reuse | Read/hash/provenance inventory only; no update, acceptance or reuse until later materialization review |
| `WP110-ART-012` | Canonical sealed offline bundle | Sorted manifest, aggregate hash, custody, source receipts, classes and explicit proof-only non-reuse marking |

No unlisted artifact, version, platform, mutable latest reference or resolver-selected substitution
may enter the committed set.

## Source and network contract

| ID | Proposed requirement |
| --- | --- |
| `WP110-SOURCE-001` | Allow only HTTPS on port 443 to exact authoritative hosts frozen by the later owner authorization; IP literals, local/private/link-local destinations and alternate ports are denied. |
| `WP110-SOURCE-002` | Flutter metadata and archive retrieval may use only the exact official Flutter archive/release-metadata endpoints derived from accepted `WAVEA-SRC-001`; the later control must freeze full URLs before execution authority becomes effective. |
| `WP110-SOURCE-003` | Pub package metadata and archives may use only exact `pub.dev` API/archive endpoints for the accepted direct versions and the metadata-derived transitive closure. |
| `WP110-SOURCE-004` | No Git host, mirror, CDN alias, search engine, package proxy, arbitrary website, mutable branch, release-latest endpoint or user-supplied URL is authorized. |
| `WP110-SOURCE-005` | Redirects default to denied. A later authorization may allow at most three redirects only when every destination host and path prefix is frozen in the signed command manifest. |
| `WP110-SOURCE-006` | TLS verification remains enabled with the host trust store; insecure flags, custom trust bypass, certificate suppression and plaintext fallback are prohibited. |
| `WP110-SOURCE-007` | Proxy variables, cookies, netrc, client credentials, authorization headers and persisted session state are prohibited; only public unauthenticated sources are in scope. |
| `WP110-SOURCE-008` | Metadata responses are stored and hashed before parsing. Artifact retrieval begins only after the exact committed-set record is appended and flushed. |
| `WP110-SOURCE-009` | Each response records URL, final URL, redirect chain, status, content type, declared and received bytes, start/end UTC time, TLS summary and SHA-256 without sensitive headers. |
| `WP110-SOURCE-010` | Metadata may supply an expected artifact hash only when source identity and field semantics are statically validated; otherwise the artifact remains unverified and acquisition stops. |

## Resource and cost limits

| ID | Proposed limit |
| --- | --- |
| `WP110-LIMIT-001` | Zero paid service, provider account, subscription or credential use. |
| `WP110-LIMIT-002` | Maximum one acquisition run and no resume; any stop consumes the run. |
| `WP110-LIMIT-003` | Maximum one active network request; no parallel downloads. |
| `WP110-LIMIT-004` | Maximum three same-request attempts only for transport failure before any bytes are accepted; HTTP/content/integrity failures are not retried. |
| `WP110-LIMIT-005` | Maximum 45 minutes from first network operation to mandatory stop/cleanup. |
| `WP110-LIMIT-006` | Maximum 4 GiB total received bytes and 2 GiB for any single response; lower source-specific limits must be frozen when metadata is known. |
| `WP110-LIMIT-007` | Maximum 2,000 package/metadata objects; exceeding the limit stops rather than truncates closure. |
| `WP110-LIMIT-008` | No background process, daemon, listener, mount, service or scheduled continuation. |

These are safety ceilings, not expected sizes or cost estimates.

## Proposed path boundary

| ID | Exact later path | Purpose |
| --- | --- | --- |
| `WP110-PATH-001` | `proofs/wave-a-artifact-acquisition-control/` | Published, read-only static control baseline |
| `WP110-PATH-002` | `proofs/wave-a-offline-artifact-acquisition/` | Prospective disposable acquisition-extension source; not created by WP-110 |
| `WP110-PATH-003` | `internal-local/work-packages/WP-111/` | Prospective ignored static-materialization evidence root; no network or acquisition state |
| `WP110-PATH-004` | `internal-local/work-packages/WP-112/` | Prospective later controlled-acquisition execution/evidence root; not created by WP-110 or WP-111 |
| `WP110-PATH-005` | `internal-local/work-packages/WP-112/quarantine/metadata/` | Raw authorized metadata responses |
| `WP110-PATH-006` | `internal-local/work-packages/WP-112/quarantine/artifacts/` | Untrusted downloaded bytes before validation |
| `WP110-PATH-007` | `internal-local/work-packages/WP-112/quarantine/source-review-only/` | Conditional/rejected non-executable source-review material |
| `WP110-PATH-008` | `internal-local/work-packages/WP-112/sealed-bundle/` and `evidence/` | Successful proof-only bundle candidate plus private receipts, ledger, manifests, validation and cleanup |
| `WP110-PATH-009` | Existing Flutter/Dart/Android/Java SDKs | Read/hash only; never an acquisition target |
| `WP110-PATH-010` | Existing pub, Gradle, OS and package-manager caches | Read/hash only; never an acquisition target |
| `WP110-PATH-011` | `proofs/wave-a-field-offline/` | Prohibited during acquisition |
| `WP110-PATH-012` | Application, infrastructure, deployment and customer/live-data paths | Prohibited |

All WP-111 and WP-112 paths are prospective names only. WP-110 creates none of them. WP-111 is
reserved for static acquisition-extension materialization; only a separately authorized WP-112
could later receive network and acquisition authority.

## Command and executable contract

Observed local tools are planning evidence only:

| Executable | Observed version | Observed SHA-256 |
| --- | --- | --- |
| `/usr/bin/curl` | `8.7.1` | `b636262803922ee1dd0fbf614818473ffa53c811e44fd3278c2270d3af4759d3` |
| `/usr/bin/shasum` | `6.02` | `0812595f981a26f813d98dc380af14d4af427626c9339eda29eb849ae13de1e3` |
| `/usr/bin/tar` | `bsdtar 3.5.3` / libarchive `3.7.4` | `f96200d5be4a3f99cdbc88892a2e26f14d501d354c72b224472462cc67fa271d` |
| `/usr/bin/file` | `5.41` | `71b961b48f02422bb2e7f653be4e1de9af1527a91e9e1a614c6bc7855cf45f7c` |
| `/usr/bin/unzip` | `6.00` Apple build | `ac11fac62707aecdaa68513e82cad1d9a96d4c1206318d07fae680dd2a5a1e16` |

| ID | Proposed later rule |
| --- | --- |
| `WP110-CMD-001` | A later static-materialization package must bind every executable by fresh path/version/hash and independently review every exact argument template before network authority. |
| `WP110-CMD-002` | The published WP-109 launcher remains read-only evidence; its closed network flag and consumed authorization may not be altered or reused. |
| `WP110-CMD-003` | The acquisition extension must use a finite stage/command allowlist and prohibit shell evaluation, package managers, interpreters with arbitrary expressions, user startup files and environment-supplied options. |
| `WP110-CMD-004` | Metadata retrieval and artifact retrieval are separate stages; artifact commands cannot be constructed until the committed-set ledger entry exists. |
| `WP110-CMD-005` | Static listing and safe-extraction analysis must reject absolute paths, traversal, links escaping quarantine, devices, sockets, duplicate normalized paths, unreasonable expansion and executable invocation. |
| `WP110-CMD-006` | Extraction, if later authorized, is quarantine-only and cannot set ownership, privileged modes, extended attributes or write outside the acquisition root. |
| `WP110-CMD-007` | No downloaded executable, script, package hook, build tool, SDK binary, native library, proof code or application code may run. |
| `WP110-CMD-008` | Every intended command requires a pre-process ledger intent and every outcome records exit status, minimized output hashes, network receipts and path mutations. |
| `WP110-CMD-009` | Cleanup is evidence-independent and may remove only acquisition-owned partial/unsealed state. |
| `WP110-CMD-010` | Command mismatch, executable drift, stage drift, environment-option drift or unrecorded mutation is a typed stop. |

## Authorization-readiness contract

| ID | Required before any later effective acquisition authorization |
| --- | --- |
| `WP110-AUTH-001` | Owner acceptance and verified publication of WP-110. |
| `WP110-AUTH-002` | Separate static materialization and independent validation of the acquisition extension; WP-110 documentation alone is insufficient. |
| `WP110-AUTH-003` | Exact published revision/tree and complete public control inventory hashes. |
| `WP110-AUTH-004` | Fresh run ID, primary operator, exactly one fresh zero-authority post-seal validator and truthful independence attestation. |
| `WP110-AUTH-005` | Fresh executable paths, versions and hashes plus exact stage/argument allowlist. |
| `WP110-AUTH-006` | Exact source host, URL/path-prefix, redirect, TLS, byte, time, retry and object-count bounds. |
| `WP110-AUTH-007` | Exact allowed/private/quarantine/sealed-bundle paths and explicit forbidden global SDK/cache/proof/application paths. |
| `WP110-AUTH-008` | Effective machine-readable authorization with owner hash, start, maximum expiry, single-use state and all non-acquisition flags false. |
| `WP110-AUTH-009` | Pre-action clean/revision/path/mode/ownership/ACL/environment/process/runtime/cache/SDK residual receipt. |
| `WP110-AUTH-010` | Append-only ledger bound to effective authorization before the first network operation. |
| `WP110-AUTH-011` | No credential, provider account, paid service, customer/live data or application secret. |
| `WP110-AUTH-012` | Mandatory stop, cleanup, residual verification, final inventory and authority consumption under every outcome. |
| `WP110-AUTH-013` | A result vocabulary limited to `OFFLINE_BUNDLE_READY_FOR_OWNER_REVIEW`, `STOPPED_ACQUISITION`, or `AUTHORITY_VIOLATION`. |
| `WP110-AUTH-014` | Explicit owner authorization of the later controlled acquisition after all preceding fields are frozen; publication or an ineffective draft is not sufficient. |

## Evidence, stop and cleanup contract

| ID | Requirement |
| --- | --- |
| `WP110-EVID-001` | Owner text/hash, effective authorization/hash, identities, revision/tree, time window and action flags |
| `WP110-EVID-002` | Pre-action repository/path/mode/ownership/ACL/environment/network/process/runtime/cache/SDK receipt |
| `WP110-EVID-003` | Executable and acquisition-extension inventory with source hashes and static review |
| `WP110-EVID-004` | Hash-chained operation ledger with exact stages, commands, outputs and path mutations |
| `WP110-EVID-005` | Per-request destination/redirect/TLS/status/type/byte/time/hash receipt |
| `WP110-EVID-006` | Raw metadata hashes, normalized parsed identities and committed-set seal |
| `WP110-EVID-007` | Complete direct/transitive/native graph and reason/class for every object |
| `WP110-EVID-008` | License, source/publisher, SDK/platform constraint, advisory-review date and unresolved finding inventory |
| `WP110-EVID-009` | Safe archive listing/extraction report and proof that no downloaded code executed |
| `WP110-EVID-010` | Sealed-bundle manifest, aggregate hash, custody path and proof-only non-reuse classification |
| `WP110-EVID-011` | Cleanup and final residual receipts, including unchanged global SDK/cache hashes |
| `WP110-EVID-012` | Fresh independent validation, final inventory and minimized owner-review summary |

| ID | Mandatory stop |
| --- | --- |
| `WP110-STOP-001` | Missing, expired, consumed, malformed, mismatched or incompletely closed authority |
| `WP110-STOP-002` | Revision/tree/path/mode/ownership/ACL/environment/executable/command drift |
| `WP110-STOP-003` | Unapproved destination, redirect, port, protocol, proxy, credential or TLS weakening |
| `WP110-STOP-004` | Missing version, mutable reference, source ambiguity, unexpected response type or metadata inconsistency |
| `WP110-STOP-005` | Hash/size/signature mismatch, incomplete closure, duplicate identity or uncommitted artifact request |
| `WP110-STOP-006` | Unsafe archive entry, unexpected executable/native behavior, package hook or global SDK/cache mutation |
| `WP110-STOP-007` | License/provenance/advisory gap, including unresolved `sqflite_sqlcipher` provenance |
| `WP110-STOP-008` | Byte/time/retry/object limit reached or evidence cannot be written, flushed, mode-checked or hashed |
| `WP110-STOP-009` | Validator independence failure, inventory mismatch or residual acquisition state |
| `WP110-STOP-010` | Any request to install, restore, build, use a device/runtime, execute proof/application code or continue after stop |

| ID | Cleanup requirement |
| --- | --- |
| `WP110-CLEAN-001` | Remove only acquisition-owned partial, temporary, rejected and unsealed state. |
| `WP110-CLEAN-002` | Preserve a complete sealed bundle only for owner review; otherwise preserve only minimized stop evidence. |
| `WP110-CLEAN-003` | Remove run-bound network-authority material and verify authority consumption. |
| `WP110-CLEAN-004` | Verify no process, listener, mount, device session, service, database, network shaper or credential remains. |
| `WP110-CLEAN-005` | Re-hash pre-existing SDKs/caches observed before the run and stop on mutation. |
| `WP110-CLEAN-006` | Archive/remove the disposable acquisition workspace only after evidence and residual verification are sealed. |

## Current blockers and disposition

| ID | Blocker | Disposition |
| --- | --- | --- |
| `WP110-BLOCK-001` | No network-capable acquisition extension has been materialized or independently reviewed. | Blocking before execution; authorize static materialization separately |
| `WP110-BLOCK-002` | Exact upstream URLs, redirect paths, response sizes and metadata hashes are not locally verified. | Resolve only inside a later authorized metadata stage |
| `WP110-BLOCK-003` | Complete transitive/native dependency closure is unknown. | Derive from captured metadata, commit before artifact retrieval, stop if incomplete |
| `WP110-BLOCK-004` | Current tool observations are not run-bound executable bindings. | Rebind in the later effective authorization |
| `WP110-BLOCK-005` | No fresh acquisition validator or run identity exists. | Instantiate only under later explicit authority |
| `WP110-BLOCK-006` | No network or acquisition authority exists. | Preserve; the private draft remains all false |

Readiness classification:

| Item | Classification |
| --- | --- |
| Acquisition policy and artifact classes | `READY_FOR_OWNER_DECISION` |
| Source/network/resource/path/command contract | `READY_FOR_OWNER_DECISION` |
| Acquisition extension | `NOT_MATERIALIZED` |
| Effective authorization | `NOT_CREATED` |
| Network and artifact acquisition | `NOT_AUTHORIZED` |
| Offline bundle | `ABSENT` |
| Proof materialization/execution | `CLOSED` |

## Options and recommendation

| ID | Option | Recommendation | Reason |
| --- | --- | --- | --- |
| `WP110-OPT-001` | Accept this exact contract, then statically materialize and independently validate a separate acquisition extension before any network execution. | Advance | Preserves the validated WP-109 core while preventing documentation or static success from becoming network authority. |
| `WP110-OPT-002` | Use an owner-supplied sealed offline bundle with evidence equivalent to every artifact/source/closure/custody control. | Retain fallback | Avoids agent network use but cannot weaken provenance, integrity, independence or non-reuse requirements. |
| `WP110-OPT-003` | Directly authorize `/usr/bin/curl` acquisition from this document without a reviewed acquisition extension. | Reject | Exact commands, metadata commitment, ledger integration and safe archive handling are not materialized. |
| `WP110-OPT-004` | Allow package managers or the materialization run to resolve/download dependencies. | Reject | Would execute resolver behavior, mutate caches and collapse acquisition into dependency restoration. |

### Proposed decision `DEC-243`

Adopt the exact two-stage metadata-then-artifact acquisition contract, preserve the published
WP-109 control as immutable static evidence, require a separately materialized and independently
validated acquisition extension before network authority, and retain owner-supplied evidence-
equivalent bundles only as a fallback. No network or acquisition authority follows from DEC-243.

## Proposed owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP110-DEC-001` | Accept `WP110-FACT-001` through `010` as the truthful starting state. | Accepted |
| `WP110-DEC-002` | Accept `DEC-243` and the acquisition-state model without authorizing a transition beyond `CONTRACT_PROPOSED`. | Accepted |
| `WP110-DEC-003` | Accept `WP110-ART-001` through `012` as the exact artifact-class boundary. | Accepted |
| `WP110-DEC-004` | Accept `WP110-SOURCE-001` through `010` and `WP110-LIMIT-001` through `008`. | Accepted |
| `WP110-DEC-005` | Accept `WP110-PATH-001` through `012` and `WP110-CMD-001` through `010`. | Accepted |
| `WP110-DEC-006` | Accept `WP110-AUTH-001` through `014` as mandatory later execution prerequisites. | Accepted |
| `WP110-DEC-007` | Accept `WP110-EVID-001` through `012`, `WP110-STOP-001` through `010`, and `WP110-CLEAN-001` through `006`. | Accepted |
| `WP110-DEC-008` | Advance `WP110-OPT-001`, retain option 002 only as an evidence-equivalent fallback, and reject options 003 and 004. | Accepted |
| `WP110-DEC-009` | Accept every current blocker and keep acquisition execution `NOT_AUTHORIZED`; a private ineffective draft grants no authority. | Accepted |
| `WP110-DEC-010` | Freeze the exact four-path WP-110 public candidate inventory and require later owner acceptance before commit, push or successor activation. | Accepted |

## Private ineffective authorization draft

`internal-local/work-packages/WP-110/ineffective-authorization.json` is ignored and mode-restricted.
It binds the published revision, planning identities and closed actions, but deliberately has:

- state `INEFFECTIVE_OWNER_DECISION_DRAFT`;
- no run ID, valid-from or expiry;
- no executable authority or command allowlist;
- no instantiated validator;
- every network, acquisition, mutation, dependency, build, device, runtime, proof, product,
  architecture, infrastructure, deployment, provider/cost and data flag false.

It cannot be promoted, patched or executed. A later package must create new control material.

## Frozen candidate inventory and next gate

The WP-110 public candidate inventory is exactly:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/109_WAVE_A_MATERIALIZATION_CONTROL_REMEDIATION_OFFLINE_ARTIFACT_ACQUISITION_READINESS.md`
4. `docs/110_WAVE_A_OFFLINE_ARTIFACT_ACQUISITION_EXACT_CONTRACT_AUTHORIZATION_READINESS.md`

WP-110 stops at owner review. If accepted and published, a later package may be authorized to
materialize and independently validate only the prospective acquisition extension and exact
run-control templates without network use. Network access and artifact acquisition require a
separate later owner execution authorization.

## Owner acceptance

The owner accepted `DEC-243`, all WP-110 facts, contracts, blockers and decisions exactly as
recorded; advanced option 001, retained option 002 only as an evidence-equivalent fallback,
rejected options 003 and 004, accepted the private ineffective draft and observed-tool limitations,
and authorized publication of the exact four-path inventory. After verified publication, WP-111
may perform only static, dependency-free, network-disabled acquisition-extension materialization
and exactly one fresh independent validation under its separately accepted path boundary.
