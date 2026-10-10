# Wave A Exact Contract and Proof-Only Materialization Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — verified and closed |
| Work package | `WP-104 Wave A Exact Contract and Proof-Only Materialization Readiness` |
| Owner | Aung Myo Oo |
| Governing priority | `DEC-238`, `PROOF-WAVE-PRIORITY-001` — Accepted |
| Governing proof specifications | `PROOF-SPEC-002`, local portion of `PROOF-SPEC-003`, and `PROOF-SPEC-004` |
| Published WP-103 revision | `e9b0e78e54ccec48b8de4b5731431e2e12ea5f8c` |
| Repository tree | `0171012ac9424f70824a3406ba41feba8e84d1c6` |
| Governing decision | `DEC-239` — Accepted |
| Proof files/dependencies/materialization | Not authorized |
| Devices/emulators/network/proof execution | Not authorized |
| Provider account/cost/infrastructure | Not authorized |
| Architecture selection/application coding/deployment | Not authorized |
| Date | 2026-10-10 |

## Objective and authority boundary

WP-104 specifies the exact falsifiable Wave A contract and the conditions under which a later
owner may authorize a disposable proof to be materialized. It binds candidate versions, comparison
scope, synthetic fixtures, device and network profiles, case families, evidence, reviewers,
pass/fail oracles, stop conditions, cleanup, proposed paths, and the wording of the next gate.

This package creates documentation only. It does not create `proofs/wave-a-field-offline/`, a
Flutter project, a manifest, lockfile, fixture, dependency, cache entry, emulator, device session,
certificate, network impairment, server, credential, proof run, measured result, provider
resource, application code, or architecture decision.

## Wave A decision question

Can an Android-first Flutter field client, using the advancing Drift/SQLite access path and a
strictly bounded comparative sqflite path, preserve an assignment-scoped 48-hour working set;
record crew, changed-scope, material, evidence, and external-MMQR receipt-photo intent safely;
recover from interruption, migration, corruption, expiry, revocation, and conflict; and remain
usable in Myanmar and English on the accepted physical-device and network profiles without silent
loss, false business success, cross-tenant exposure, or unrecoverable capture?

Wave A evaluates a disposable client and synthetic authority boundary. It does not implement the
product Technician application and does not prove hosted media storage, production connectivity,
provider fitness, final local-store selection, or production accessibility conformance.

## Exact candidate and toolchain proposal

The versions below are evaluation candidates only. Owner acceptance would freeze them for a later
materialization decision; it would not accept them as application dependencies.

| ID | Candidate/version | Treatment | Exact boundary and reason |
| --- | --- | --- | --- |
| `WAVEA-CAND-001` | Flutter `3.47.0` stable with bundled Dart `3.13` line | Common harness candidate | One Android-first client harness; the exact bundled Dart patch/hash is bound from the reviewed Flutter archive before materialization; no iOS build, store, signing, or product package identity |
| `WAVEA-CAND-002` | Android compile/target API `36`; exercised OS APIs `34`, `35`, and `36` | Common device boundary | Implements the accepted current-plus-two-prior-major evaluation window; commercial release support is refreshed later |
| `WAVEA-CAND-003` | Drift `2.35.2` and `drift_dev` `2.35.0` | Advancing persistence candidate | Typed schema, transactions, migration and reactive access; remains unselected pending measured proof and review |
| `WAVEA-CAND-004` | `sqlite3` `3.7.0`, configured with its exact `sqlcipher` build-hook source | Advancing encrypted engine candidate | Replaces the EOL `sqlcipher_flutter_libs`; runtime version/source ID and packaged-binary hash must be recorded |
| `WAVEA-CAND-005` | `flutter_secure_storage` `11.2.0` | Advancing key-wrapping/custody candidate | Android protected storage evaluation only; migration, reset, lock-screen and device-loss behavior are mandatory cases |
| `WAVEA-CAND-006` | `sqflite` `2.4.4+1` | Comparative access candidate | May compare mapping, transaction, migration and queue behavior using synthetic non-sensitive state only; it cannot satisfy encrypted-store acceptance alone |
| `WAVEA-CAND-007` | `sqflite_sqlcipher` `3.4.1` | Conditional comparative encryption candidate | May be materialized only if later supply-chain review accepts its unverified-publisher provenance, exact archive/integrity and SQLCipher/runtime equivalence limits |
| `WAVEA-CAND-008` | Generated deterministic local authority stub; no hosted service | Common authority boundary | Supplies versioned current-state, revocation, conflict and idempotency responses without provider/network authority |

`WAVEA-CAND-006/007` are not equal substitutes for the advancing Drift path. The comparison may
measure the same observable contract, fixture and case IDs, but must disclose different engine,
code-generation, encryption, migration and supply-chain behavior. If `WAVEA-CAND-007` fails later
static review, the comparative encrypted branch is omitted rather than silently using plaintext or
weakening the advancing candidate's security oracle.

### Dated candidate evidence

| ID | Authoritative source reviewed on 2026-10-10 | Planning use |
| --- | --- | --- |
| `WAVEA-SRC-001` | [Flutter 3.47.0 release notes](https://docs.flutter.dev/release/release-notes/release-notes-3.47.0), [Flutter archive](https://docs.flutter.dev/install/archive), [Dart 3.13 announcement](https://dart.dev/blog/announcing-dart-3-13), and [supported platforms](https://docs.flutter.dev/reference/supported-platforms) | Stable SDK/language family and Android support evidence; exact archive/bundled-patch hash remains a later materialization binding |
| `WAVEA-SRC-002` | [Android 16 platform documentation](https://developer.android.com/about/versions/16) | Current API/behavior family for the device matrix |
| `WAVEA-SRC-003` | [Drift versions](https://pub.dev/packages/drift/versions) and [drift_dev](https://pub.dev/packages/drift_dev) | Exact advancing access/code-generation candidates and Dart constraints |
| `WAVEA-SRC-004` | [sqlite3 versions](https://pub.dev/packages/sqlite3/versions) and [build-hook options](https://pub.dev/documentation/sqlite3/latest/topics/hook-topic.html) | Exact native package plus SQLCipher source option and integrity behavior |
| `WAVEA-SRC-005` | [sqflite versions](https://pub.dev/packages/sqflite/versions) | Exact comparative access candidate |
| `WAVEA-SRC-006` | [sqflite_sqlcipher versions](https://pub.dev/packages/sqflite_sqlcipher/versions) | Conditional comparative encrypted candidate and unverified-publisher risk |
| `WAVEA-SRC-007` | [flutter_secure_storage versions](https://pub.dev/packages/flutter_secure_storage/versions) and [changelog](https://pub.dev/packages/flutter_secure_storage/changelog) | Exact protected key-storage candidate, Android SDK floor and migration/reset risks |

Source pages advertise package metadata; they do not replace archive hashes, lockfile integrity,
license review, vulnerability review, transitive inventory, build-hook binary hashes, or static
validation. Those are mandatory before later materialization can be accepted.

## Falsifiable contract

| ID | Required proposition |
| --- | --- |
| `WAVEA-CONTRACT-001` | Every locally accepted intent receives a stable effect ID, tenant, subject, assignment, actor/worker, captured-at time, observed version/policy, dependency set and visible lifecycle before success is shown. |
| `WAVEA-CONTRACT-002` | Ordinary local capture completes at or below one second at p95 on every supported physical profile; no failed write is presented as saved. |
| `WAVEA-CONTRACT-003` | A full 48-hour, 20-assignment, 200-operation and 100-media working set survives restart, process death, reboot, clock skew, storage pressure and allowed offline work without silent loss. |
| `WAVEA-CONTRACT-004` | After stable recovery-network return, all 200 non-media operations reach an explicit accepted, rejected, conflicted, superseded or quarantined outcome within two minutes; no item disappears or retries forever. |
| `WAVEA-CONTRACT-005` | Duplicate submission or lost acknowledgment never duplicates an authoritative effect; the same effect ID converges to the same disposition. |
| `WAVEA-CONTRACT-006` | Stale, revoked, expired, wrong-tenant, wrong-assignment and permission-lost intent is preserved for explanation/recovery but is never admitted as authoritative success. |
| `WAVEA-CONTRACT-007` | Concurrent field/office changes follow the accepted conflict matrix; no last-write-wins path silently overrides governed business meaning. |
| `WAVEA-CONTRACT-008` | Database schema upgrade, downgrade refusal, interrupted migration, corrupt copy and recovery preserve or explicitly quarantine every pending effect and evidence binding. |
| `WAVEA-CONTRACT-009` | Local database/content is unreadable without the run-bound key under the advancing encrypted candidate; keys are absent from logs, fixtures, source, evidence and ordinary backup. |
| `WAVEA-CONTRACT-010` | Organization/account switching cannot display or operate another tenant's cached working set; revoked/expired sets become inaccessible before cleanup. |
| `WAVEA-CONTRACT-011` | Camera/evidence capture does not enter the public gallery, clipboard, notification preview or broad share path, and insufficient storage/camera denial produces a visible safe outcome. |
| `WAVEA-CONTRACT-012` | Media queue identity, content hash, subject binding, replacement chain and resumable offset survive interruption; local completion never claims hosted availability. |
| `WAVEA-CONTRACT-013` | External-MMQR receipt capture without a qualifying photo never becomes `PAID`; offline capture remains `PAYMENT_EVIDENCE_CAPTURED_PENDING_SYNC`. |
| `WAVEA-CONTRACT-014` | Crew participation, per-equipment outcomes, changed scope, approval candidate, materials, readings, incomplete work and follow-up remain distinguishable offline and after synchronization. |
| `WAVEA-CONTRACT-015` | Myanmar and English content, names, addresses, currency, dates, long labels and mixed scripts preserve data and task meaning without truncation-driven error. |
| `WAVEA-CONTRACT-016` | Critical tasks remain operable with TalkBack, external keyboard where supported, 200% font scaling, high contrast and denied permission; no critical unlabeled or focus-inaccessible control remains. |
| `WAVEA-CONTRACT-017` | Weak, severe-intermittent, offline, recovery, network-switch, captive/no-internet and acknowledgment-loss states never masquerade as success. |
| `WAVEA-CONTRACT-018` | Diagnostics and proof evidence contain stable IDs, timings, typed states and minimized error categories—not keys, tokens, full customer content, unrestricted media or unnecessary device identifiers. |
| `WAVEA-CONTRACT-019` | Drift and any admitted comparative branch execute identical candidate-neutral case IDs and output the same normalized result schema; candidate-specific omissions are explicit failures or exclusions. |
| `WAVEA-CONTRACT-020` | No proof source, generated model, schema, fixture, dependency or design decision becomes application code or an accepted dependency without a later implementation package. |

## Exact synthetic fixture

All persons, phone numbers, addresses, equipment identifiers, receipt images and content are
synthetic. No customer or employee data is permitted.

| ID | Frozen fixture requirement |
| --- | --- |
| `WAVEA-FIX-001` | Four tenants: three ordinary organizations plus one deliberately similar cross-tenant corpus; two branches per ordinary tenant and one branch for the adversarial tenant. |
| `WAVEA-FIX-002` | Twelve login identities, twenty-four non-login workers, six multi-worker crews, one multi-membership identity, revoked/expired members and one wrong-tenant actor. |
| `WAVEA-FIX-003` | Twenty active assignments spanning inspection, service, repair, gas/leak, installation, removal/workshop and follow-up; at least two assignments have multiple visits and five contain multiple equipment units. |
| `WAVEA-FIX-004` | Exactly 200 queued non-media operations: 45 checklist/activity, 25 notes, 20 participant/time, 20 equipment reading/outcome, 20 material-use intent, 20 evidence metadata, 15 changed-scope proposal, 10 customer-acknowledgment candidate, 10 completion intent, 10 MMQR evidence and 5 follow-up. |
| `WAVEA-FIX-005` | Exactly 100 media queue items: 50 work-condition/result photos, 15 equipment label/serial photos, 10 external-MMQR receipt photos, 10 installation/context photos, 5 signature/document items, and 10 malformed/oversize/wrong-subject/duplicate/replacement adversarial items. |
| `WAVEA-FIX-006` | Media covers 25 photos in one visit, a 15 MiB source item, 1–2 MiB normalized ordinary targets, interruption at multiple offsets, same-hash duplicate, different-content same-name, replacement and orphan recovery. |
| `WAVEA-FIX-007` | Every conflict class in the WP-100 conflict matrix plus duplicate, stale version, dependency inversion, membership revocation, assignment transfer, completion/closure, wrong branch, wrong MMQR version and clock-skew cases. |
| `WAVEA-FIX-008` | Three schema generations: clean install, supported upgrade, interrupted upgrade; plus truncated database, altered page, unavailable key, rotated key, low-storage write and recovery-copy cases. |
| `WAVEA-FIX-009` | Myanmar/English corpus includes mixed Unicode, long names/addresses, currency/time, air-conditioning terminology, approval/payment states, low-literacy labels and prohibited-action explanations. |
| `WAVEA-FIX-010` | Accessibility corpus covers receive/switch assignment, identify units, record crew, diagnose, propose scope, capture approval candidate, record materials/readings, receipt capture, incomplete/complete intent, reconnect and conflict resolution. |
| `WAVEA-FIX-011` | Deterministic authority stub begins from a signed fixture manifest and returns versioned accepted/rejected/conflict/revoked/idempotent responses; reset reproduces byte-identical starting state. |
| `WAVEA-FIX-012` | Expected oracle declares every operation/media final disposition, authoritative side effect, visible client state, retained recovery record, and prohibited disclosure before execution. |

## Physical device and environment gate

No model, build, serial or owner is invented. The following exact capability slots must be filled
with real available devices and recorded privately before execution authorization.

| Slot | Mandatory physical profile | Required OS/API | Minimum capability |
| --- | --- | --- | --- |
| `WAVEA-DEVICE-001` | Supported floor | Android 14 / API 34 | 3 GiB RAM, 32 GiB storage, at least 2 GiB free, entry camera, screen lock and hardware-backed keystore when reported |
| `WAVEA-DEVICE-002` | Typical field device | Android 15 / API 35 | 4–6 GiB RAM, 64–128 GiB storage, autofocus camera, battery saver/background restriction controls |
| `WAVEA-DEVICE-003` | Current platform | Android 16 / API 36 | At least 6 GiB RAM and 128 GiB storage, current permission/background behavior |
| `WAVEA-DEVICE-004` | Degraded exercise | One of slots 001–003 | Low storage, denied camera, battery saver, background restriction, clock skew, process death and reboot are reproducible without harming personal data |

Emulators may run deterministic regression cases but cannot replace slots 001–003 for performance,
camera, protected-storage, background, accessibility or recovery acceptance. A device must be
factory/test dedicated or demonstrably free of personal/customer data. Exact private inventory,
custodian, build fingerprint hash, free storage and reset procedure are later execution bindings.

## Frozen network profiles

Wave A reuses `NETWORK-BASE-001` through `005` exactly: stable 10/5 Mbit/s at 100 ms; weak
512/256 kbit/s at 400 ms/2% loss; severe 128/128 kbit/s at 800 ms/5% loss with a 30-second outage
every two minutes; no connectivity for 48 hours; and recovery 2/2 Mbit/s at 200 ms/1% loss.
Network switch, captive/no-internet, timeout, lost acknowledgment and restart-during-transfer cases
are mandatory. This is local impairment testing and does not authorize external network access or
resolve Singapore-to-Myanmar provider connectivity.

## Case and oracle structure

| Family | Minimum cases | Mandatory oracle |
| --- | ---: | --- |
| `WAVEA-CASE-QUEUE` | 30 | Durable stable IDs, order/dependency, restart/reboot, bounded retry, terminal state and no disappearance |
| `WAVEA-CASE-AUTH` | 24 | Tenant/assignment/lease/permission/revocation admission and cross-tenant zero disclosure/mutation |
| `WAVEA-CASE-CONFLICT` | 24 | Every accepted conflict row produces the declared auto/human treatment and visible explanation |
| `WAVEA-CASE-MIGRATION` | 18 | Clean/upgrade/interrupted/corrupt/key-loss paths preserve, quarantine or fail closed exactly |
| `WAVEA-CASE-EVIDENCE` | 30 | Private capture, hash/binding, interruption/resume, duplicate/replacement, cleanup and false-availability prevention |
| `WAVEA-CASE-MMQR` | 18 | No-photo-no-paid, wrong MMQR/branch/amount, duplicate/replacement and pending-sync semantics |
| `WAVEA-CASE-WORKFLOW` | 24 | Crew, multi-unit, changed scope, materials, readings, mixed outcomes and incomplete/follow-up meaning |
| `WAVEA-CASE-L10N-A11Y` | 30 | Myanmar/English fidelity, TalkBack/focus/labels, font scaling, contrast, permission and recovery tasks |
| `WAVEA-CASE-NETWORK` | 24 | All five profiles plus switching/captive/timeout/ack-loss produce truthful state and convergence |
| `WAVEA-CASE-LIFECYCLE` | 18 | Switching, sign-out, device loss, expiry, sync acknowledgment, 24-hour cleanup and seven-day quarantine policy |

The later materialized catalogue must contain unique stable case IDs and at least 240 cases. A case
may cover multiple contracts, but no mandatory contract or fixture row may rely only on narrative
review. Expected results are frozen before execution.

## Measurement and result rules

| ID | Proposed rule |
| --- | --- |
| `WAVEA-MEASURE-001` | Use monotonic elapsed time for performance and trusted fixture time for business timestamps; record device/profile/candidate/case and warm/cold state. |
| `WAVEA-MEASURE-002` | Run ordinary-save measurements at least 100 times per candidate/device; pass requires p95 at or below one second and zero false-save outcomes. |
| `WAVEA-MEASURE-003` | Drain the exact 200-operation queue three times per candidate/device under the recovery profile; every run must finish within two minutes and converge to the oracle. |
| `WAVEA-MEASURE-004` | Report median, p95, maximum, retry count, queue age, database size, media bytes, CPU/memory/battery observation method and every excluded sample; no cherry-picking. |
| `WAVEA-MEASURE-005` | Security/integrity rules are zero-tolerance: any unauthorized disclosure/mutation, plaintext protected content, key leakage, silent loss, false paid/completed/available state or irrecoverable pending capture is FAIL. |
| `WAVEA-MEASURE-006` | Accessibility pass requires all critical corpus tasks completed under the recorded method with no critical unlabeled, unreachable, order-breaking or meaning-losing defect; qualified review remains required before a public conformance claim. |
| `WAVEA-MEASURE-007` | Candidate-specific unsupported cases are reported as unsupported, not passed. A comparative candidate cannot advance by omitting a mandatory encrypted, migration, background or recovery case. |
| `WAVEA-MEASURE-008` | Overall result is PASS only when every mandatory family passes on every required physical slot and all required reviews/final verification pass; otherwise use FAIL or INCONCLUSIVE with typed reasons. |

## Proposed disposable materialization boundary

The only proposed public proof root is `proofs/wave-a-field-offline/`. Nothing is created by
WP-104. A later materialization authorization may create only the following logical inventory,
with exact filenames and hashes frozen before installation:

| ID | Proposed path group | Permitted later content |
| --- | --- | --- |
| `WAVEA-PATH-001` | root README, contract and provenance files | Authority boundary, exact commands, sources/licenses and generated inventory |
| `WAVEA-PATH-002` | `pubspec.yaml`, lockfile and analysis configuration | Proof-only exact direct/transitive dependencies and integrity evidence |
| `WAVEA-PATH-003` | `lib/contract/` | Candidate-neutral intent, lifecycle, authority-stub and normalized-result interfaces |
| `WAVEA-PATH-004` | `lib/candidates/drift/` | Advancing Drift/SQLCipher adapter only |
| `WAVEA-PATH-005` | `lib/candidates/sqflite/` | Conditional comparative adapter only; no silent plaintext fallback |
| `WAVEA-PATH-006` | `lib/harness/` | Disposable UI/test controls necessary for physical task execution; no product branding or production navigation |
| `WAVEA-PATH-007` | `fixtures/` | Deterministic synthetic manifests, media and expected oracles only |
| `WAVEA-PATH-008` | `test/` and `integration_test/` | Dependency-free contract/static checks plus later Flutter/unit/device cases |
| `WAVEA-PATH-009` | `scripts/` | Exact allowlisted verify/reset/run/export/cleanup launchers without implicit dependency retrieval |
| `WAVEA-PATH-010` | `schemas/` | Public evidence/result JSON schemas with no raw private evidence |

Generated dependency directories, SDKs, caches, build products, device receipts, screenshots,
videos, raw results, keys and effective authorization remain ignored/private. Application folders,
shared production packages, provider directories and existing TP-01 paths are outside scope.

## Dependency and supply-chain readiness

| ID | Required before later materialization |
| --- | --- |
| `WAVEA-SUPPLY-001` | Freeze the exact Flutter archive URL, platform archive SHA-256, bundled Dart version, Android command-line/build tools, Java/Gradle versions and license evidence. |
| `WAVEA-SUPPLY-002` | Freeze every direct/transitive pub package version, archive URL/hash, publisher/provenance, license and supported-platform constraint in a generated lockfile and inventory. |
| `WAVEA-SUPPLY-003` | Review build hooks and native binary retrieval separately; no hook may fetch or execute an unbound asset during validation or proof execution. |
| `WAVEA-SUPPLY-004` | Record exact SQLite/SQLCipher library version/source ID and binary hash per candidate/ABI; fail if runtime differs from the reviewed inventory. |
| `WAVEA-SUPPLY-005` | Treat `sqflite_sqlcipher` unverified-publisher provenance as a blocking High finding until exact source/archive/native-library review passes; omission is safer than substitution. |
| `WAVEA-SUPPLY-006` | Perform dated vulnerability/advisory, maintenance, license and Android 16/16-KiB-page compatibility review for every native dependency. |
| `WAVEA-SUPPLY-007` | Dependency restoration must later be offline, frozen-lockfile and script/hook controlled from a reviewed local store; absent or drifted material causes a typed stop. |
| `WAVEA-SUPPLY-008` | No proof dependency is accepted for application use. A later implementation package repeats selection, inventory and supply-chain review. |

WP-104 does not claim that any archive, SDK, dependency or native binary is locally present.

## Evidence contract

Private evidence uses a run-bound directory outside Git. Public result documents may contain only
reviewed summaries and hashes.

| ID | Required private artifact |
| --- | --- |
| `WAVEA-EVID-001` | Effective authorization, accepted revision/tree, proof inventory/hashes, toolchain/dependency/native inventory and role attestations |
| `WAVEA-EVID-002` | Device capability receipts with minimized identifiers, OS/build hash, storage state, reset proof and custody |
| `WAVEA-EVID-003` | Fixture manifest and expected-oracle hash; no real/customer data |
| `WAVEA-EVID-004` | Per-case normalized NDJSON result with candidate, device/profile, timing, state transition, expected/actual and evidence references |
| `WAVEA-EVID-005` | Append-only operation ledger, before/after authoritative snapshots and idempotency/conflict/revocation dispositions |
| `WAVEA-EVID-006` | Media manifest with synthetic subject binding, hashes, sizes, offsets, retry/replacement chain and cleanup outcome |
| `WAVEA-EVID-007` | Migration/corruption/key lifecycle receipts, database/native version receipts and encrypted-at-rest negative inspection |
| `WAVEA-EVID-008` | Network-profile provenance and traces, queue-drain metrics and visible-state observations |
| `WAVEA-EVID-009` | Myanmar/English/accessibility task results and minimized screenshots/videos that contain only synthetic content |
| `WAVEA-EVID-010` | Primary report, independent reproduction report, specialist findings, deviation/stop ledger, final verifier and complete packet inventory/hashes |
| `WAVEA-EVID-011` | Cleanup/residual report for devices, local processes/files, keys, caches, dependency state and any authorized network shaping |
| `WAVEA-EVID-012` | Public sanitized result/disposition proposal created only after separate result acceptance |

## Roles and independence

| Role | WP-104 disposition |
| --- | --- |
| Owner/domain/Myanmar terminology reviewer | Aung Myo Oo may be proposed later; no execution role is assigned here |
| Primary proof operator | Unassigned; exact identity accepted only in a later authorization-readiness package |
| Independent reproduction validator | Unassigned and fresh; must have zero primary-operation or result-edit authority |
| Technical security reviewer | Unassigned; the TP-01 subagent exception does not automatically apply to Wave A |
| Qualified accessibility reviewer | Unassigned; required before a public accessibility/conformance claim |
| Field-device reviewer | Unassigned; must understand Android background, storage, camera and field recovery behavior |
| Final verifier | Unassigned and read-only after sealed evidence handoff |

Missing qualified security or accessibility review may not be concealed through an agent label.
The owner may later define a bounded non-production exception only through an explicit governance
decision, while qualified human review remains mandatory before production or customer/live data.

## Stop and cleanup contract

| ID | Mandatory control |
| --- | --- |
| `WAVEA-STOP-001` | Stop before materialization if any version, archive, hash, license, build hook, native binary, path, device or required static reviewer is unresolved. |
| `WAVEA-STOP-002` | Stop before execution if authorization, role independence, device custody/reset, fixture/oracle hash, effective expiry, network profile or cleanup command is absent or drifted. |
| `WAVEA-STOP-003` | Stop on the first unauthorized network/dependency action, real-data discovery, cross-tenant disclosure/mutation, key leak, silent loss, false paid/completed/available state or unsafe device condition. |
| `WAVEA-STOP-004` | Stop a candidate branch when runtime engine/source, encrypted behavior or case coverage differs; do not continue it as a weaker comparison. |
| `WAVEA-STOP-005` | A stopped run is immutable and non-resumable; preserve a minimized stop packet, execute cleanup and require a new package/run identity after remediation. |
| `WAVEA-CLEAN-001` | Cleanup must work without the authority stub, dependency network, successful test completion or surviving key/environment state. |
| `WAVEA-CLEAN-002` | Remove proof app/data/keys from authorized test devices, stop local processes and impairment controls, remove run-bound temporary state and verify no proof package/process remains. |
| `WAVEA-CLEAN-003` | Preserve only the sealed private evidence packet and reviewed public source; dependency caches or SDKs are removed only when the later authorization explicitly makes them run-owned. |
| `WAVEA-CLEAN-004` | Cleanup never erases pre-existing personal/device content; ambiguous device ownership or reset scope causes a stop before execution. |

## Readiness classification

| Area | State | Remaining condition |
| --- | --- | --- |
| Hypothesis, scope and oracles | `READY_FOR_OWNER_DECISION` | Accept or revise this exact contract |
| Candidate/version proposal | `READY_FOR_OWNER_DECISION` | Later archive/transitive/native integrity review remains mandatory |
| Fixture, cases and evidence schema | `READY_FOR_OWNER_DECISION` | Materialized bytes/hashes do not yet exist |
| Disposable path boundary | `READY_FOR_OWNER_DECISION` | No path/file creation authorized |
| Dependency supply chain | `NOT_MATERIALIZED` | Exact lock/inventory/archive hashes and independent static review required |
| Physical devices | `IDENTITIES_UNASSIGNED` | Record real available models/builds/custody privately; never invent them |
| Security/accessibility/device reviewers | `UNASSIGNED` | Exact accepted identities/qualifications or explicit bounded governance decision |
| Proof execution | `CLOSED` | Requires materialization acceptance, roles, effective authorization and separate run gate |

Overall WP-104 recommendation: `READY_FOR_PROOF_ONLY_MATERIALIZATION_AUTHORIZATION_DECISION`, not
ready for materialization, device operation or execution.

## Options considered

| ID | Option | Recommendation | Reason |
| --- | --- | --- | --- |
| `WP104-OPT-001` | Advance the exact Drift/SQLCipher primary contract and retain sqflite/sqflite_sqlcipher only as a conditional same-oracle comparison after supply-chain clearance. | Advance | Measures the accepted advancing path while preserving comparison without weakening encryption or provenance gates. |
| `WP104-OPT-002` | Materialize only Drift and remove all comparison now. | Reject for this gate | Eliminates useful reversal evidence before static cost/risk is known. |
| `WP104-OPT-003` | Materialize both candidates regardless of publisher/native-library findings. | Reject | Comparison value cannot justify unresolved supply-chain or encryption risk. |
| `WP104-OPT-004` | Build the real Technician application as the proof harness. | Reject | Violates the application-coding gate and contaminates disposable evidence with product commitment. |

## Risks and open blockers

| ID | Risk/blocker | Required treatment |
| --- | --- | --- |
| `WP104-RISK-001` | Flutter/archive or package metadata changes before materialization. | Bind exact archives/hashes at the later authorization or return for a documented version amendment. |
| `WP104-RISK-002` | Different encrypted engines confound Drift/sqflite comparison. | Compare normalized observable contracts, disclose runtime differences and never infer engine equality. |
| `WP104-RISK-003` | Conditional sqflite encryption candidate has unverified-publisher provenance. | High blocking static review; omit the branch if unresolved. |
| `WP104-RISK-004` | No real device inventory exists in public documentation. | Use real private inventory before execution; do not fabricate models/serials. |
| `WP104-RISK-005` | Qualified security/accessibility reviewers are unnamed. | Keep affected execution/public claims closed until identities and authority are accepted. |
| `WP104-RISK-006` | Forty-eight-hour cases encourage an impractical wall-clock proof. | A later plan may use trusted time control for expiry scenarios, but at least one real restart/reboot/recovery sequence and all time assumptions must be explicit. |
| `WP104-RISK-007` | Disposable harness grows into undeclared product code. | Enforce the proof root, synthetic UI, no product branding, no shared app packages and later implementation reauthorization. |

## Accepted owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP104-DEC-001` | Accept the Wave A decision question, explicit scope/non-scope and `WAVEA-CONTRACT-001` through `020`. | Accepted |
| `WP104-DEC-002` | Accept `WAVEA-CAND-001` through `008` as exact evaluation candidates only, subject to later byte/integrity binding. | Accepted |
| `WP104-DEC-003` | Accept `WAVEA-FIX-001` through `012`, the exact 200-operation/100-media distribution and the case/oracle structure. | Accepted |
| `WP104-DEC-004` | Accept `WAVEA-DEVICE-001` through `004` as mandatory real-device capability slots without inventing actual device identities. | Accepted |
| `WP104-DEC-005` | Accept `WAVEA-MEASURE-001` through `008`, `WAVEA-PATH-001` through `010`, and `WAVEA-SUPPLY-001` through `008`. | Accepted |
| `WP104-DEC-006` | Accept `WAVEA-EVID-001` through `012`, the unassigned role matrix and the qualified-review boundaries. | Accepted |
| `WP104-DEC-007` | Accept `WAVEA-STOP-001` through `005` and `WAVEA-CLEAN-001` through `004`. | Accepted |
| `WP104-DEC-008` | Advance `WP104-OPT-001`; reject `WP104-OPT-002`, `WP104-OPT-003`, and `WP104-OPT-004`. | Accepted |
| `WP104-DEC-009` | Accept the readiness classifications and keep proof materialization, dependencies, devices, execution, provider/network/cost, architecture selection and coding closed. | Accepted |
| `WP104-DEC-010` | Freeze the four-path WP-104 candidate inventory and, after verified publication, activate WP-105 Wave A Proof-Only Materialization Authorization Decision for owner-decision documentation only. | Accepted |

## Frozen candidate inventory and next gate

The candidate WP-104 public inventory is exactly:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/106_ARCHITECTURE_PROOF_WAVE_PRIORITY_AUTHORIZATION_SEQUENCE.md`
4. `docs/107_WAVE_A_EXACT_CONTRACT_PROOF_ONLY_MATERIALIZATION_READINESS.md`

The owner accepted `DEC-239`, every candidate/contract/fixture/device/network/case/measurement/
path/supply/evidence/role/stop/cleanup/readiness disposition, and `WP104-DEC-001` through `010`;
advanced `WP104-OPT-001`; rejected `WP104-OPT-002` through `004`; and authorized commit and push
only for the exact four paths above. After verified publication, WP-105 may decide whether to
authorize creation of the exact disposable proof root, dependency manifests/lockfile, synthetic
fixtures, public schemas/static tests and
private supply-chain evidence needed for independent static validation. WP-105 must freeze exact
paths, dependency sources/integrity, permitted network or offline source, validator identity,
evidence, cleanup and stop conditions. Devices, proof execution, provider/network/cost, final
architecture selection, application coding, infrastructure, deployment and customer/live data
remain closed unless separately and explicitly authorized.

## Verified publication and successor activation

The exact four-path WP-104 public inventory was committed and published at
`fb797037abf430c7b78630924231b69c7c9fb0e1`, repository tree
`7c551c9a661b465ab49a6b5c9968f971e13235ef`. Local `HEAD`, fetched `origin/main`, and live remote
main matched. WP-104 is verified and closed; its publication authority is consumed.

WP-105 is active for the Wave A proof-only materialization authorization decision as documentation
only. It does not authorize proof files, dependencies, materialization, devices/emulators, builds,
runs, provider/network/cost, architecture selection, application coding, infrastructure,
deployment or customer/live data.
