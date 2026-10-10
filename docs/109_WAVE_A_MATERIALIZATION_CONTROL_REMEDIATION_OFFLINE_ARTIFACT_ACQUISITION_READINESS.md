# Wave A Materialization Control Remediation and Offline Artifact Acquisition Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — exact publication authorized |
| Work package | `WP-107 Wave A Materialization Control Remediation and Offline Artifact Acquisition Readiness` |
| Owner | Aung Myo Oo |
| Governing exact contract | `DEC-239`, `DEC-240`, `WP105-DEP-001` through `010` — Accepted |
| Governing stopped result | `DEC-241`, `WP106-DEC-001` through `007` — Accepted |
| Published WP-106 revision | `133be6df2ed75b86c4b159e9034441eb6dbf9790` |
| Repository tree | `47142162d8c2b4c37e0456eaea64917875572c40` |
| Governing recommendation | `DEC-242` — Accepted |
| Network/download/dependency change | Not authorized |
| Proof materialization/build/device/runtime/execution | Not authorized |
| Architecture selection/application coding/deployment | Not authorized |
| Provider account/cost/customer or live data | Not authorized |
| Date | 2026-10-10 |

## Objective and authority boundary

WP-107 defines the prospective correction for the four WP-106 evidence findings and the minimum
contract for obtaining the exact missing toolchain/package artifacts as a sealed offline bundle.
It keeps evidence-control remediation, artifact acquisition, offline bundle acceptance, proof
materialization, proof execution, architecture selection, and application implementation as
separate gates.

This package is documentation and option analysis only. It does not create a controller, script,
manifest, lockfile, acquisition workspace, proof tree, cache entry, credential, allowlist, network
session, downloaded artifact, dependency directory, SDK installation, build output, device state,
database, service, provider resource, application code, or measured proof result.

## Accepted facts carried forward

| ID | Fact |
| --- | --- |
| `WP107-FACT-001` | WP-106 is immutable stopped evidence and cannot be resumed or reinterpreted as a static PASS. |
| `WP107-FACT-002` | Its first operational stop is `STOPPED_DEPENDENCY_ABSENT`; its final accepted classification is `STOPPED_STATIC_FINDING`. |
| `WP107-FACT-003` | The only observed local Flutter SDK was `3.44.3` with Dart `3.12.2`; the accepted candidate remains Flutter `3.47.0` with its bundled Dart `3.13` line. |
| `WP107-FACT-004` | Exact local directories for Drift `2.35.2`, drift_dev `2.35.0`, sqlite3 `3.7.0`, flutter_secure_storage `11.2.0`, sqflite `2.4.4+1`, and sqflite_sqlcipher `3.4.1` were absent. |
| `WP107-FACT-005` | No proof root, manifest, lockfile, dependency state, build/device/runtime state, application code, or customer/live data was created. |
| `WP107-FACT-006` | Permission hardening corrected present access safety but cannot reconstruct missing contemporaneous authorization, pre-action, or operation receipts. |
| `WP107-FACT-007` | Candidate/version substitution requires a new exact-contract decision; it is not a remediation of artifact absence. |
| `WP107-FACT-008` | `sqflite_sqlcipher` remains source-review-only and outside any executable manifest until its separate High provenance finding is cleared. |

## Prospective materialization-control remediation

The following controls apply to any later acquisition, bundle-validation, or rematerialization
checkpoint. They repair the process prospectively; they do not amend WP-106 evidence.

| ID | Proposed control |
| --- | --- |
| `WP107-CTRL-001` | Create a machine-readable effective authorization before any checkpoint-specific inventory or mutation. Bind owner text/hash, published revision/tree, checkpoint/run ID, operator, allowed roots, exact action flags, start, expiry, and single-use state. |
| `WP107-CTRL-002` | Use UTC timestamps with start not later than the first operation, a bounded expiry stated by the later package, and fail closed when not-yet-valid, expired, consumed, malformed, or hash-mismatched. |
| `WP107-CTRL-003` | Default every action flag to false. A later gate sets true only the exact inventory, control-materialization, acquisition, validation, cleanup, or publication actions it names. |
| `WP107-CTRL-004` | Create every private parent directory as `0700` and every private file as `0600` before content is written; reject symlinks, path traversal, unexpected ownership, ACL exposure, or mode drift. |
| `WP107-CTRL-005` | Seal a pre-action receipt containing clean Git status, exact revision/tree, allowed and forbidden paths, proof-root state, private-root state, environment/network boundary, and existing relevant process/runtime residuals. |
| `WP107-CTRL-006` | Start an append-only operation ledger before the first operational command. Record sequence number, UTC time, stage, exact executable hash, normalized arguments with secrets excluded, authority control, exit status, output hashes, and resulting path mutations. |
| `WP107-CTRL-007` | Hash-chain each ledger entry to the preceding entry and effective authorization. Any missing, reordered, duplicate, truncated, or invalid entry is a mandatory stop. |
| `WP107-CTRL-008` | Route all authorized commands through one fail-closed launcher that checks authorization, stage, command allowlist, paths, expiry, and ledger availability before process creation. Direct command bypass is prohibited. |
| `WP107-CTRL-009` | If evidence cannot be written, flushed, mode-checked, or hashed, do not execute the intended operation; record the smallest safe typed stop if possible and perform cleanup through an evidence-independent cleanup path. |
| `WP107-CTRL-010` | Seal before/after tracked, ignored, allowed-root, process, runtime, and network residual receipts. Current residual state supplements but never replaces contemporaneous operation evidence. |
| `WP107-CTRL-011` | Produce a complete final private inventory with path, type, size, mode, owner identity, SHA-256, authority class, stage, and publication class; verify the inventory from its own directory before handoff. |
| `WP107-CTRL-012` | Instantiate a fresh zero-authority validator only after the primary seal. It may independently read/hash/check and report, but cannot edit, acquire, restore, repair, execute a proof, or validate its own remediation. |
| `WP107-CTRL-013` | Any primary remediation after validator review invalidates the seal and requires a new final inventory plus a different fresh validator under separate capacity/authority. |
| `WP107-CTRL-014` | Preserve raw private receipts only under the ignored work-package root; publish only minimized non-sensitive decisions, aggregate identities, and accepted conclusions. |
| `WP107-CTRL-015` | Bind cleanup ownership before work starts. Cleanup may remove only checkpoint-created state and must never alter pre-existing SDKs, caches, devices, user files, earlier proof evidence, or unrelated repository state. |
| `WP107-CTRL-016` | Treat an incomplete evidence packet as `STOPPED_CONTROL_EVIDENCE`, never as dependency absence, acquisition success, materialization readiness, or proof evidence. |

## Proposed WP-108 static materialization boundary

The later WP-108 checkpoint may be authorized to create only the following dependency-free,
non-application control tree and private evidence root. WP-107 creates none of them.

| ID | Exact path | Proposed purpose |
| --- | --- | --- |
| `WP107-PATH-001` | `proofs/wave-a-artifact-acquisition-control/` | Disposable public/static controller root; no acquired artifact, dependency, credential or proof harness content |
| `WP107-PATH-002` | `README.md` | Authority, usage, non-scope, commands, result meanings and non-reuse warning |
| `WP107-PATH-003` | `AUTHORITY.md` | Human-readable mapping from accepted controls to fail-closed machine checks |
| `WP107-PATH-004` | `.gitignore` | Private evidence, temporary/quarantine data, acquired bundles and generated outputs |
| `WP107-PATH-005` | `schemas/effective-authorization.schema.json` | Pre-action identity, time, revision, path and action-flag contract |
| `WP107-PATH-006` | `schemas/pre-action-receipt.schema.json` | Clean/allowlist/mode/ownership/network/residual receipt contract |
| `WP107-PATH-007` | `schemas/operation-ledger-entry.schema.json` | Ordered hash-chain operation record contract |
| `WP107-PATH-008` | `schemas/artifact-manifest.schema.json` | Source, identity, integrity, provenance, license, class and custody contract |
| `WP107-PATH-009` | `schemas/final-inventory.schema.json` | Complete private packet and public-control-tree inventory contract |
| `WP107-PATH-010` | `tool/control-launcher.mjs` | Dependency-free fail-closed launcher template; no network capability is exercised in WP-108 |
| `WP107-PATH-011` | `tool/verify-control.mjs` | Dependency-free authorization/receipt/ledger/path/mode static verifier |
| `WP107-PATH-012` | `tool/verify-bundle.mjs` | Dependency-free manifest/inventory verifier using synthetic static fixtures only in WP-108 |
| `WP107-PATH-013` | `test/control-static.test.mjs` | Import-safety, allowlist, expiry, hash-chain, path, mode, fail-closed and cleanup static cases |
| `WP107-PATH-014` | `internal-local/work-packages/WP-108/` | Ignored mode-restricted authorization draft, inventory, test evidence, validation and cleanup records |

The `.mjs` choice is proof-control source format only, not an application runtime selection. A
later WP-108 authority must bind an already-present exact Node executable path/version/hash before
any verifier/test use and stop if it is absent or drifted. It may not install Node or any package.

Proposed WP-108 command classes:

| ID | Command class | Boundary |
| --- | --- | --- |
| `WP107-CMD-001` | Git revision/status/path inventory | Read-only except the exact public/private WP-108 roots |
| `WP107-CMD-002` | Existing Node version/path/hash and file hashing | No install, update, package manager, network or module retrieval |
| `WP107-CMD-003` | Dependency-free syntax/import/static tests against synthetic fixtures | No acquired artifact, package/native code, proof code, SDK/cache or device access |
| `WP107-CMD-004` | Formatting limited to the WP-108 public control root | No repository-wide or application rewrite |
| `WP107-CMD-005` | Private evidence mode/hash/inventory sealing | No publication of raw private receipts |
| `WP107-CMD-006` | Cleanup and residual verification | Only WP-108-owned temporary state; independent of credentials or network |

## Exact artifact-set requirements

The accepted versions do not change. A later acquisition contract must freeze the exact platform
and complete artifact closure before contacting a source.

| ID | Artifact class | Required identity/evidence |
| --- | --- | --- |
| `WP107-ART-001` | Flutter `3.47.0` SDK | Host-platform archive name/size/hash, authoritative release metadata, Flutter revision, engine revision, bundled Dart exact patch/hash, channel, license inventory, archive structure, and safe-extraction limits |
| `WP107-ART-002` | Android toolchain | Reuse only exact already-present Java/Android components after hash/provenance validation; separately acquire only a specifically identified missing component under a later gate |
| `WP107-ART-003` | Drift `2.35.2` | Exact archive/package hash, source/publisher, license, declared SDK constraints, package metadata, and full later-resolved transitive closure |
| `WP107-ART-004` | drift_dev `2.35.0` | Same evidence as `WP107-ART-003`; generator/code-generation dependencies remain proof-only and unexecuted during acquisition |
| `WP107-ART-005` | sqlite3 `3.7.0` | Same package evidence plus build-hook/native-source declarations; no hook, native download, link, load, or execution during acquisition |
| `WP107-ART-006` | flutter_secure_storage `11.2.0` | Same package evidence plus Android platform/native dependency declarations; no key-store or device operation |
| `WP107-ART-007` | sqflite `2.4.4+1` | Same package evidence; remains a non-encryption comparison and cannot satisfy encrypted-store acceptance |
| `WP107-ART-008` | sqflite_sqlcipher `3.4.1` | Source/archive provenance evidence only in a separately labelled quarantine class; excluded from executable manifest/lock until `WP104-RISK-003` is cleared |
| `WP107-ART-009` | Transitive package closure | Exact package/version/archive hashes, dependency edges, sources/publishers, licenses, SDK constraints, advisory-review date, and reason for inclusion |
| `WP107-ART-010` | Native/binary references | Platform, architecture, upstream source revision, expected hash/signature, license, build recipe/provenance, and explicit executable/non-executable status; no opaque binary is accepted by package name alone |
| `WP107-ART-011` | Offline bundle manifest | Canonical sorted inventory, aggregate hash, creation authority, acquisition receipt references, source class, expected target path, and explicit absence of credentials, real data, executables run from the bundle, or application artifacts |
| `WP107-ART-012` | Offline bundle acceptance | Two-person-equivalent primary/independent static review at the proof-governance level; acceptance means acquisition integrity only, not dependency or architecture selection |

## Proposed later acquisition contract

No item in this section is executable under WP-107.

| ID | Requirement for a separately authorized acquisition package |
| --- | --- |
| `WP107-ACQ-001` | Use a new dedicated acquisition workspace and private evidence root bound to an exact published revision; never use the application or proof-materialization root. |
| `WP107-ACQ-002` | Freeze authoritative source endpoints, redirect policy, TLS expectations, artifact names, expected metadata, network allowlist, maximum bytes, maximum duration, retry count, and zero-cost requirement before authorization becomes effective. |
| `WP107-ACQ-003` | Permit only public unauthenticated artifact retrieval unless a later owner package separately binds a credential and custodian; no provider account or paid service is implied. |
| `WP107-ACQ-004` | Resolve the complete dependency closure only through an exact reviewed acquisition method that cannot run build hooks, Gradle, native code, package scripts, proof code, or application code. |
| `WP107-ACQ-005` | Download into a new quarantine directory, never directly into a global Flutter/Dart/Android SDK or pub cache. Existing caches remain read-only. |
| `WP107-ACQ-006` | Hash and size-check every response before extraction; reject HTML/error bodies, redirects outside the allowlist, duplicate path identities, mutable-latest references, missing expected metadata, or archive traversal/symlink hazards. |
| `WP107-ACQ-007` | Perform only static archive/metadata/license/provenance/advisory inspection. Do not install, import, compile, generate, link, load, launch, open a database, or touch a device. |
| `WP107-ACQ-008` | Keep executable-candidate artifacts, conditional source-review artifacts, and rejected/unverified artifacts in distinct manifest classes and paths. |
| `WP107-ACQ-009` | Seal the complete offline bundle and private acquisition packet before independent validation; any later byte change invalidates acceptance. |
| `WP107-ACQ-010` | Record source failure, unavailable version, hash/signature mismatch, incomplete closure, license/provenance uncertainty, advisory threshold breach, unexpected executable behavior, or budget/network deviation as a typed stop. Never substitute. |
| `WP107-ACQ-011` | After validation, remove network-authority material and temporary/quarantine state not part of the accepted sealed bundle; verify no credential, listener, process, mounted image, SDK/cache mutation, or unbound artifact remains. |
| `WP107-ACQ-012` | A successful result is `OFFLINE_BUNDLE_READY_FOR_OWNER_REVIEW`; it grants no dependency restoration, proof materialization, build/device/runtime action, proof execution, architecture selection, or application coding. |

## Evidence and review requirements

| ID | Proposed evidence |
| --- | --- |
| `WP107-EVID-001` | Effective authorization, owner text/hash, identity, start/expiry, revision/tree, paths and exact action flags |
| `WP107-EVID-002` | Pre-action clean/allowlist/mode/ownership/network/residual receipt |
| `WP107-EVID-003` | Executable paths/hashes and launcher/configuration inventory |
| `WP107-EVID-004` | Append-only hash-chained operation ledger and minimized command outputs |
| `WP107-EVID-005` | Network destination, redirect, TLS, byte, duration and retry receipts with no credentials or sensitive headers |
| `WP107-EVID-006` | Response/archive identity, source metadata, hashes, sizes, signatures when available, and safe-extraction checks |
| `WP107-EVID-007` | Complete direct/transitive/native dependency graph, license/source/publisher and advisory-review inventory |
| `WP107-EVID-008` | Conditional/rejected artifact quarantine classification and non-executable proof |
| `WP107-EVID-009` | Canonical offline-bundle inventory, aggregate hash, storage path and target-use restrictions |
| `WP107-EVID-010` | Typed stop/deviation ledger and minimized failure diagnostics |
| `WP107-EVID-011` | Cleanup and final residual receipts, including unchanged pre-existing SDK/cache hashes where applicable |
| `WP107-EVID-012` | Fresh independent validation report, final private inventory, public result summary and owner-decision boundary |

## Stop and cleanup baseline

| ID | Proposed control |
| --- | --- |
| `WP107-STOP-001` | Stop before the first operation if authorization, expiry, identity, revision/tree, path, mode, ownership, clean status, allowlist or ledger initialization differs. |
| `WP107-STOP-002` | Stop if an authoritative artifact/version cannot be found, source identity changes, a redirect leaves the allowlist, expected hash/signature mismatches, or full transitive closure cannot be established. |
| `WP107-STOP-003` | Stop if any command would execute package/native/build/proof/application code, mutate a global SDK/cache, discover a device, open a database, or contact an unapproved endpoint. |
| `WP107-STOP-004` | Stop if a credential, customer/live data, secret, unexpected executable, unsafe archive path, license/provenance gap, or advisory above the later threshold is detected. |
| `WP107-STOP-005` | Stop if operation evidence is missing, unwritable, unflushed, unhashed, out of order, mode-exposed, or inconsistent with residual state. |
| `WP107-STOP-006` | Stop if the validator lacks independence, finds drift, or cannot reproduce the sealed inventory and all authority/absence assertions. |
| `WP107-CLEAN-001` | Remove only acquisition-owned temporary, partial, rejected and unsealed quarantine artifacts; preserve the minimized stop packet. |
| `WP107-CLEAN-002` | Preserve a completed sealed bundle only for owner review; do not install or copy it into SDKs/caches/proof/application paths. |
| `WP107-CLEAN-003` | Revoke/delete run-bound network authority and credentials, if any, and verify no process, listener, mount, device session, service, database or network shaper remains. |
| `WP107-CLEAN-004` | Confirm pre-existing repository, SDK, cache, toolchain, device and earlier evidence state is unchanged. |

## Options and sequence

| ID | Option | Recommendation | Reason |
| --- | --- | --- | --- |
| `WP107-OPT-001` | Use three later gates: static materialization of the remediated controller and exact acquisition contract; controlled exact-source acquisition into quarantine; then independent offline-bundle acceptance/rebinding before a new materialization attempt. | Advance | Repairs evidence before network use, isolates acquisition from proof creation, and prevents acquired bytes from silently becoming accepted dependencies. |
| `WP107-OPT-002` | Accept an owner-supplied offline bundle instead of network acquisition when it carries the same exact source, hash, provenance, license, closure and custody evidence. | Comparative fallback | May avoid agent network use, but it cannot weaken evidence or bypass independent validation. |
| `WP107-OPT-003` | Change the accepted candidates to locally available Flutter/package versions. | Reject | Version substitution would invalidate the exact Wave A contract and mask the absence finding. |
| `WP107-OPT-004` | Let a new materialization run fetch missing artifacts directly and continue into proof-tree creation. | Reject | Collapses supply-chain acquisition, validation and materialization, recreating uncontrolled evidence and fallback risk. |

Recommended sequence:

1. `WP-108 Wave A Acquisition Control Materialization and Exact Contract Readiness` — create and
   independently validate only the private/static controller, schemas, allowlist contract and
   ineffective authorization template; no network or artifact acquisition.
2. `WP-109 Controlled Wave A Offline Artifact Acquisition` — after separate owner authorization,
   retrieve only the exact frozen closure into quarantine and stop with a sealed bundle or typed
   failure; no dependency installation or proof materialization.
3. `WP-110 Wave A Offline Bundle Acceptance and Materialization Reauthorization Readiness` —
   independently disposition the bundle, rebind a later clean materialization checkpoint, and
   keep build/device/runtime/proof execution separately closed.

## Risks and reversal cost

| ID | Risk | Treatment |
| --- | --- | --- |
| `WP107-RISK-001` | Exact Flutter/package artifacts or immutable source metadata may be unavailable. | Typed acquisition stop; no substitution; owner may later reopen the exact candidate contract. |
| `WP107-RISK-002` | Resolver or package metadata can introduce an unreviewed transitive/native dependency. | Freeze complete closure before bundle acceptance and classify every addition by source, license, integrity and purpose. |
| `WP107-RISK-003` | Acquisition tooling may execute hooks or mutate global caches. | Quarantine-only paths, reviewed command allowlist, execution-denial controls and before/after hashes. |
| `WP107-RISK-004` | Hashes alone may authenticate corrupted or malicious upstream material. | Bind authoritative source metadata, signatures when available, provenance/license/advisory review and independent inventory reproduction. |
| `WP107-RISK-005` | The evidence controller may again be incomplete. | Materialize and independently validate it before any acquisition authorization is created. |
| `WP107-RISK-006` | A sealed proof-only bundle may be reused as an application dependency. | Explicit non-reuse classification; application dependency selection remains a later architecture/implementation decision. |

Reversal cost is low before acquisition because only documentation changes. A sealed acquisition
bundle may be discarded without product migration, but source-review and download effort is lost.
Candidate substitution has higher reversal cost because it invalidates the accepted exact contract
and requires re-review of cases, dependencies and expected evidence.

## Accepted owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP107-DEC-001` | Accept `DEC-242` and `WP107-FACT-001` through `008` as the truthful starting state. | Accepted |
| `WP107-DEC-002` | Accept `WP107-CTRL-001` through `016` as the prospective evidence-control remediation baseline. | Accepted |
| `WP107-DEC-003` | Accept `WP107-ART-001` through `012` as the minimum exact offline-bundle identity and acceptance contract. | Accepted |
| `WP107-DEC-004` | Accept `WP107-PATH-001` through `014` and `WP107-CMD-001` through `006` as the maximum later WP-108 static materialization boundary. | Accepted |
| `WP107-DEC-005` | Accept `WP107-ACQ-001` through `012` as requirements for a later separately authorized acquisition package. | Accepted |
| `WP107-DEC-006` | Accept `WP107-EVID-001` through `012`, `WP107-STOP-001` through `006`, and `WP107-CLEAN-001` through `004`. | Accepted |
| `WP107-DEC-007` | Advance `WP107-OPT-001`; retain `WP107-OPT-002` only as evidence-equivalent fallback; reject `WP107-OPT-003` and `WP107-OPT-004`. | Accepted |
| `WP107-DEC-008` | Preserve Flutter `3.47.0`, its bundled Dart `3.13` line, and all accepted package versions; authorize no substitution; keep sqflite_sqlcipher `3.4.1` source-review-only. | Accepted |
| `WP107-DEC-009` | Accept the three-gate WP-108 through WP-110 sequence without authorizing any network, acquisition, dependency, materialization, build/device/runtime or proof-execution action. | Accepted |
| `WP107-DEC-010` | Freeze the four-path WP-107 candidate inventory and require later owner acceptance before commit, push, controller creation, acquisition, or materialization. | Accepted |

## Frozen candidate inventory and next gate

The WP-107 public candidate inventory is exactly:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/108_WAVE_A_PROOF_ONLY_MATERIALIZATION_AUTHORIZATION_DECISION.md`
4. `docs/109_WAVE_A_MATERIALIZATION_CONTROL_REMEDIATION_OFFLINE_ARTIFACT_ACQUISITION_READINESS.md`

The owner accepted the complete WP-107 recommendation and exact four-path inventory and authorized
commit and push. After verified publication, WP-108 may perform only the accepted dependency-free
acquisition-control materialization and exact contract readiness checkpoint. Network access,
artifact retrieval, SDK/cache mutation,
dependency restoration, proof materialization, build, device/runtime operation, proof execution,
provider account/cost, architecture selection, application coding, infrastructure, deployment,
and customer/live data remain closed.
