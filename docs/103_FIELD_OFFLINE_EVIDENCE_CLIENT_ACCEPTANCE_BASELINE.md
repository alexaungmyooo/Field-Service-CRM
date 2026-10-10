# Field, Offline, Evidence and Client Acceptance Baseline

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — exact publication authorized |
| Work package | `WP-100 Field, Offline, Evidence and Client Acceptance Baseline` |
| Owner | Aung Myo Oo |
| Governing sequence | `DEC-233`, `WP98-SEQ-002` — Accepted |
| Governing authorization baseline | `DEC-234` — Accepted |
| Published WP-99 revision | `4570ba6bd12b0d7cf72e15c23b52662c4c27f5fd` |
| Repository tree | `b6d18d43766c072ff83b98de975c3b03a0394fcb` |
| Proof tree | `1e9f75fdc1b221009bc691f54d24ca63f02c8038` |
| Governing decision | `DEC-235` — Accepted |
| Architecture/provider/dependency selection | Not authorized |
| Proof preparation/execution/application coding | Not authorized |
| Date | 2026-10-10 |

## Objective and authority boundary

WP-100 proposes the first testable field-client, offline-working-set, offline-action, conflict,
device, weak-network, evidence/media, external-MMQR receipt-photo, retention, Myanmar/English,
accessibility, and client-surface acceptance baseline.

The baseline reflects Myanmar field reality: crews commonly include two or more people; work scope
and price may change after on-site diagnosis; the servicing organization may not have installed the
equipment; connectivity may disappear; and external MMQR payment evidence is photographed rather
than processed by this product.

This package selects no client framework, local database, synchronization library, media store,
provider, image-processing dependency, device-management product, or implementation. It performs
no proof, dependency installation, network/device test, provider action, infrastructure,
application coding, deployment, spending, or customer/live-data use.

## Governing inputs

- `WF-002`, `WF-003`, `WF-013`, `WF-015` through `WF-018`, `BR-OFFLINE-*`, `BR-DOC-*`, and
  `BR-PAYEVID-*` define the field, evidence, payment-claim, and exception meanings.
- `FIELD-SET-001` through `015`, `OFF-CLASS-001` through `007`, `SYNC-CTRL-001` through `015`,
  `SYNC-CONFLICT-001` through `012`, `DEVICE-CTRL-001` through `012`, and `MEDIA-CTRL-001`
  through `015` define the accepted architecture proposal envelope.
- `QBD-003` through `006`, `QBD-013`, and `QBD-014` are evaluation baselines rather than customer
  SLAs.
- `DEC-234` supplies organization, role, assurance, online-session, and revocation policy. Offline
  authority remains provisional and is revalidated on synchronization.
- `OPEN-021`, `OPEN-028`, `OPEN-033`, `OPEN-059` through `064`, `OPEN-068`, `OPEN-095`,
  `OPEN-096`, and `OPEN-099` are addressed only to the extent recorded below.

## Field working-set baseline

| ID | Proposed policy |
| --- | --- |
| `FIELD-BASE-001` | Use an assignment-scoped, tenant/subject/device-bound working set; do not create a broad offline tenant replica for the initial field client. |
| `FIELD-BASE-002` | Include only assigned work orders/visits, crew and actual-participation context, minimum customer/site/access/safety details, assigned equipment and relevant history, approved scope, work requirements, permitted prices, evidence requirements, issued materials, effective MMQR presentation, and pending operation state. |
| `FIELD-BASE-003` | Exclude unrelated customers, jobs, workers, inventory, reports, exports, audit/support records, credentials, secrets, and platform data. |
| `FIELD-BASE-004` | Evaluate a 48-hour offline working period with up to 20 active assignments, 200 queued non-media operations, and 100 queued media items per field user/device. |
| `FIELD-BASE-005` | The working-set authorization lease expires no later than 48 hours after the last successful online authority/policy validation. It may be shortened by organization, assignment, or risk policy. |
| `FIELD-BASE-006` | The client displays issue time, last refresh, expiry, completeness, queued work, and stale/degraded state; it never presents an expired set as current. |
| `FIELD-BASE-007` | Planned crew and actual participants remain separate. One authenticated crew member may record another worker's participation but cannot impersonate that worker's authenticated actions. |
| `FIELD-BASE-008` | Equipment history distinguishes verified tenant work, customer-reported history, imported claims, and technician observation; third-party installation never blocks current service capture. |
| `FIELD-BASE-009` | Existing approved scope and job instructions may be performed offline under an unexpired assignment lease; changed chargeable scope remains a separately governed proposal/approval intent. |
| `FIELD-BASE-010` | Expiry blocks new authoritative claims and high-risk continuations. Unsynchronized capture remains locally recoverable and visibly pending rather than being deleted or reported as accepted. |
| `FIELD-BASE-011` | Revocation cannot be guaranteed while fully disconnected; on reconnection the server rejects unauthorized effects and routes eligible capture to controlled recovery. |
| `FIELD-BASE-012` | Synchronization refreshes only affected working-set records and never broadens scope as a recovery shortcut. |
| `FIELD-BASE-013` | A local save means durable provisional capture only. It never means server acceptance, customer approval, work completion, evidence availability, paid status, payment verification, or settlement. |
| `FIELD-BASE-014` | Assignment completion plus authoritative synchronization starts local cleanup; unresolved, rejected, or quarantined content follows its explicit recovery/retention state. |
| `FIELD-BASE-015` | Every prepared set and provisional action is attributable to organization, subject, linked worker when relevant, assignment, client/device context, policy/configuration version, and stable operation identity. |

## Offline action matrix

| Action family | Offline disposition | Required synchronization treatment |
| --- | --- | --- |
| View assigned site/equipment/approved-scope/checklist/material/MMQR context | Allowed from unexpired complete working set | Show age; refresh before current-sensitive continuation |
| Arrival, departure, inspection, diagnosis, notes, readings, tests, actual participants, safety/follow-up capture | Allowed as provisional capture | Revalidate authority, assignment, state, policy, and subject; accept or return exact conflict/rejection |
| Photos, signatures, documents, receipt photos | Allowed as protected provisional media | Resumable transfer, content/quality checks, authoritative metadata finalization, current record authorization |
| Perform already approved work and capture activities/per-unit outcomes | Allowed under unexpired assignment and cached approved revision | Validate revision, assignment, lifecycle, evidence, and outcome preconditions before authoritative effect |
| Material use/return from items already issued to the crew | Allowed as replay-safe intent | Validate custody, quantity, serialization, prior movement, and stock invariant; quarantine collision |
| Changed chargeable scope or additional-work proposal | Allowed as proposal draft | Requires current policy and exact customer/internal approval before authoritative approved meaning |
| Customer approval/acknowledgment | Capture candidate allowed for exact locally available revision | May permit on-site continuation only when cached tenant policy explicitly permits the action/risk/threshold; authoritative validation still occurs on sync |
| External-payment claim and receipt photo | Capture allowed | Remains `PENDING_SYNC`; required photo/metadata and current obligation/policy must validate before paid claim or verification |
| Direct paid marking | Never authoritative offline | May become paid only after synchronization when tenant direct-marking policy, permission, evidence, obligation, and duplicate checks pass |
| Payment-evidence verification/reversal | Prohibited offline | Current online authority, evidence availability, obligation, separation of duty, and audit required |
| Stock adjustment/reconciliation, bulk transfer, new procurement receipt | Prohibited offline initially | Current online inventory authority and invariant checks required |
| Membership/role/branch change, tenant switch, support/platform elevation, credential/recovery action | Prohibited offline | Current online stronger assurance and authorization required |
| Broad export, deletion, ownership transfer, high-risk commercial approval, tenant configuration | Prohibited offline | Current online privileged workflow required |

### Offline policy controls

| ID | Proposed policy |
| --- | --- |
| `OFFLINE-BASE-001` | Every offline intent has stable effect identity, tenant, assignment, resource, actor/worker, capture time, observed version/state/policy, dependencies, and user-visible lifecycle. |
| `OFFLINE-BASE-002` | Synchronization uses current server-authoritative identity, organization, membership, role/scope, assignment, policy, record state, and separation-of-duty checks. |
| `OFFLINE-BASE-003` | Per-effect idempotency prevents duplicate activity, stock, evidence, payment claim, approval, acknowledgment, notification, and outcome state. |
| `OFFLINE-BASE-004` | Dependencies are explicit: required media, approved scope, material custody, and prerequisite operations cannot be inferred from upload/order attempts. |
| `OFFLINE-BASE-005` | Each operation ends in accepted, prior-result/duplicate, pending/retryable, conflicted, rejected, or quarantined/recoverable state. Batch partial success is never shown as total success. |
| `OFFLINE-BASE-006` | Preserve device capture time and trusted server receipt/effective time separately; device time does not control policy, ordering, approval validity, or audit truth by itself. |
| `OFFLINE-BASE-007` | Retry uses bounded backoff and visible queue age/progress. Permanent or policy failures do not retry forever. |
| `OFFLINE-BASE-008` | An incompatible client or policy version blocks affected mutation before business effect and provides safe recovery/export of unsynchronized capture. |
| `OFFLINE-BASE-009` | Reassignment, cancellation, membership revocation, work closure, or policy change never silently restores old authority. |
| `OFFLINE-BASE-010` | Captured work from a later-revoked actor may be reviewed and re-entered/attached by an authorized resolver without attributing the authoritative action to the revoked actor or hiding original provenance. |
| `OFFLINE-BASE-011` | Changed chargeable scope preserves the field proposal, exact revision, customer response candidate, and whether local continuation was policy-permitted. Conflicts require new governed approval. |
| `OFFLINE-BASE-012` | Payment claims remain distinct from evidence availability, verifier decision, and provider settlement. Offline capture cannot collapse these states. |
| `OFFLINE-BASE-013` | Local pending content survives application restart, process termination, and temporary device reboot within accepted protected-storage behavior. |
| `OFFLINE-BASE-014` | A user can see which assignment/action/media needs connectivity, approval, conflict resolution, replacement, or support. |
| `OFFLINE-BASE-015` | Diagnostics record identifiers, state, age, attempts, error category, and correlation without credentials or unnecessary customer/evidence content. |
| `OFFLINE-BASE-016` | Ordinary capture saves locally within `QBD-003` target of one second under the supported-floor device profile. |
| `OFFLINE-BASE-017` | After stable network returns, 200 non-media operations meet the `QBD-005` two-minute synchronization evaluation target under the declared recovery network profile. |
| `OFFLINE-BASE-018` | Media transfer is measured separately from the non-media synchronization target and must remain resumable, observable, and non-duplicating. |

## Conflict-resolution baseline

| ID | Conflict | Default treatment and accountable resolver |
| --- | --- | --- |
| `CONFLICT-BASE-001` | Same effect/operation retried | Reuse prior result automatically; no second effect. |
| `CONFLICT-BASE-002` | Tenant mismatch or foreign resource | Reject, security-signal, never remap automatically; security/tenant-boundary review. |
| `CONFLICT-BASE-003` | Membership revoked or assignment removed | Reject effect; quarantine eligible capture; Supervisor/Branch Manager may attach it through a new attributable action after review. |
| `CONFLICT-BASE-004` | Office rescheduled/reassigned while crew captured arrival/work | Preserve both timelines; Dispatcher resolves schedule state, Supervisor resolves work/evidence meaning. |
| `CONFLICT-BASE-005` | Proposal/scope revision changed | Preserve field revision and response; Commercial Approver or authorized Manager issues/re-approves current revision. No automatic merge. |
| `CONFLICT-BASE-006` | Concurrent equipment diagnosis/outcome | Preserve both source-qualified claims; Supervisor resolves correction/supersession without deleting either. |
| `CONFLICT-BASE-007` | Stock quantity, serialization, or custody collision | Quarantine movement; Storekeeper/reconciliation authority resolves. Never create negative, duplicate, or cross-tenant stock. |
| `CONFLICT-BASE-008` | Missing/unreadable/wrong-subject/unsafe evidence | Keep dependent outcome pending or rejected; Crew Leader/Supervisor requests qualifying replacement; preserve prior evidence history. |
| `CONFLICT-BASE-009` | Duplicate/mismatched payment claim | Do not mark paid/verified; Payment-Evidence Verifier compares obligation, amount, method, receipt, submitter, and prior claim. |
| `CONFLICT-BASE-010` | Work closed/reopened/corrected while offline | Preserve offline capture; Supervisor with current lifecycle authority decides attach, correction, follow-up, or rejection. |
| `CONFLICT-BASE-011` | Missing prerequisite or temporary service failure | Keep pending with bounded retry and visible dependency; no human action unless terminal/expired. |
| `CONFLICT-BASE-012` | Policy/client version stale | Block incompatible effect, refresh policy/client, then require deliberate resubmission or named review; no silent reinterpretation. |

## Supported device and local-data baseline

Exact commercial device models are frozen only by the later proof authorization because market
availability changes. The accepted matrix uses physical performance/risk profiles that each later
named device must meet.

| Profile | Required proof device characteristics | Purpose |
| --- | --- | --- |
| `DEVICE-PROFILE-LOW` | Physical Android device at the oldest supported OS major, 3 GiB RAM, 32 GiB storage, at least 2 GiB free, entry camera, constrained CPU/battery | Supported-floor local save, queue, camera, storage, restart, and weak-network behavior |
| `DEVICE-PROFILE-TYPICAL` | Physical Android device within supported OS window, 4–6 GiB RAM, 64–128 GiB storage, common autofocus camera | Expected Myanmar field workflow and performance |
| `DEVICE-PROFILE-CURRENT` | Physical Android device on current accepted OS major, at least 6 GiB RAM and 128 GiB storage | Current platform behavior, permissions, background limits, and forward compatibility |
| `DEVICE-PROFILE-DEGRADED` | A supported physical device exercised with low storage, denied camera, background restriction, battery saver, clock skew, interruption, and process termination | Safe failure, recovery, and user-visible state |

| ID | Proposed policy |
| --- | --- |
| `DEVICE-BASE-001` | Initial Technician commercial release is Android; shared source remains iOS-compatible, but iOS release requires separate demand, device, signing, store, and background proof. |
| `DEVICE-BASE-002` | Support the current accepted Android major and the two prior majors where the required security, camera, protected-storage, background, and Flutter candidate capabilities remain available. The named versions are frozen at proof and refreshed at release. |
| `DEVICE-BASE-003` | Data at rest uses operating-system protected application storage plus an evaluated encrypted local database/content mechanism; exact library and key custody remain `OPEN-096`. |
| `DEVICE-BASE-004` | Tenant/subject working sets are logically and cryptographically separated as the selected mechanism permits; organization/account switching clears or rebinds caches before display. |
| `DEVICE-BASE-005` | Evidence capture does not place private content in the public gallery, ordinary backup, clipboard, notification preview, or share sheet unless a separately authorized user action/policy permits it. |
| `DEVICE-BASE-006` | The app detects screen lock absence, root/compromise indicators when reliably available, insufficient storage, camera denial, and unsafe backup configuration and applies risk-appropriate warning/restriction. It must not claim perfect device-compromise detection. |
| `DEVICE-BASE-007` | Local app access requires device/session re-unlock after 30 minutes of inactivity; sensitive online actions still use WP-99 assurance/step-up. Biometric/PIN mechanism remains platform-selection dependent. |
| `DEVICE-BASE-008` | Lost-device handling revokes future server authority, expires working sets, and requests supported cleanup; it never promises guaranteed remote deletion of an unreachable device. |
| `DEVICE-BASE-009` | Successfully synchronized local media content is removed within 24 hours after authoritative acknowledgment unless a visible pending/recovery need remains. |
| `DEVICE-BASE-010` | Reconciled assignment working data is removed within 24 hours after completion/closure acknowledgment; revoked/expired sets become inaccessible immediately and are cleaned when the client can enforce policy. |
| `DEVICE-BASE-011` | Quarantined or rejected unsynchronized capture remains recoverable for seven days by default, then requires explicit extension/export-to-controlled-support or secure deletion according to policy. |
| `DEVICE-BASE-012` | Sign-out/account removal cannot silently discard pending capture: it requires synchronization, controlled recovery handoff, or explicit authorized discard with evidence. |

## Network acceptance profiles

| ID | Profile | Frozen impairment baseline | Acceptance use |
| --- | --- | --- | --- |
| `NETWORK-BASE-001` | Stable office/mobile | 10 Mbit/s down, 5 Mbit/s up, 100 ms RTT, under 1% packet loss | Ordinary online behavior and baseline comparison |
| `NETWORK-BASE-002` | Weak Myanmar mobile | 512 kbit/s down, 256 kbit/s up, 400 ms RTT, 2% loss | Field reads, non-media sync, visible slow state, bounded retry |
| `NETWORK-BASE-003` | Severe intermittent | 128 kbit/s each direction, 800 ms RTT, 5% loss, recurring 30-second outage every two minutes | Capture durability, resumable media, timeout/retry, no false success |
| `NETWORK-BASE-004` | Offline | No connectivity for 48 hours | Complete allowed working-set behavior, expiry, recovery, and prohibited-action handling |
| `NETWORK-BASE-005` | Recovery | 2 Mbit/s down/up, 200 ms RTT, 1% loss after outage | `QBD-005` non-media drain and resumable queued-media recovery |

The proof must also exercise network switching, captive/no-internet state, request timeout,
duplicate acknowledgment loss, and application restart during transfer. These laboratory profiles
do not resolve Singapore-to-Myanmar production connectivity under `OPEN-092`.

## Evidence and media baseline

| ID | Proposed policy |
| --- | --- |
| `EVIDENCE-BASE-001` | Evidence content, metadata, transfer, safety/quality status, availability, business link, replacement, and retention remain separate states. |
| `EVIDENCE-BASE-002` | Every item records organization, governed subject/work item, type, actor/source, local capture/import time, trusted receipt time, assignment/visit, sensitivity, policy version, stable evidence/upload identity, and retention class. |
| `EVIDENCE-BASE-003` | Capture, upload, preview, download, export, replace, redact, and delete each require current authority to the underlying business subject and action. |
| `EVIDENCE-BASE-004` | Required evidence blocks the governed outcome until qualifying content is available and linked—not merely selected, locally saved, queued, or uploaded. |
| `EVIDENCE-BASE-005` | Evaluate up to 25 photos per visit and a 15 MiB source item. Ordinary normalized photo evidence targets 1–2 MiB while preserving readable detail; originals/derived versions retain provenance according to policy. |
| `EVIDENCE-BASE-006` | Initial accepted content classes are camera photo, signature image/stroke representation, PDF document, and structured reading/checklist data. Video and arbitrary office archives are outside the initial field baseline. |
| `EVIDENCE-BASE-007` | Accepted photo/document formats and transformations are explicitly allowlisted later; executable/active content and format mismatch are rejected or quarantined. |
| `EVIDENCE-BASE-008` | Field-photo quality requires correct subject, usable orientation, sufficient light/focus, and at least 1280 pixels on the long edge after accepted transformation unless a specialized document/label policy requires more. |
| `EVIDENCE-BASE-009` | Receipt, serial/label, measurement, and document evidence must preserve readable material information; a generic scene photo cannot satisfy a subject-specific requirement. |
| `EVIDENCE-BASE-010` | Crop, rotate, compression, thumbnail, annotation, redaction, and watermarking create attributable derived versions; they do not silently replace original provenance. Deceptive content editing is prohibited. |
| `EVIDENCE-BASE-011` | Transfer is resumable and idempotent; chunk/preview success is not evidence finalization. Duplicate attempts reuse stable identities without merging different tenant/subject meaning. |
| `EVIDENCE-BASE-012` | Unsafe, malformed, mismatched, oversized, unfinalized, orphaned, rejected, or expired content remains unavailable and reconcilable. Exact scanning mechanism remains a technology decision. |
| `EVIDENCE-BASE-013` | Replacement/removal after approval, closure, payment claim, or warranty decision requires permission, reason, impact review, preserved prior reference, and audit evidence. |
| `EVIDENCE-BASE-014` | GPS/location metadata is optional and purpose-limited; it is not required for ordinary evidence unless an accepted work/risk policy justifies it. |
| `EVIDENCE-BASE-015` | User-visible states distinguish locally saved, queued, uploading, retryable, quarantined, rejected, available, linked, replacement pending, and removed/retained. |
| `EVIDENCE-BASE-016` | Diagnostics contain IDs/state/age/error category, not credentials, temporary URLs, full evidence content, or unnecessary customer details. |

### Initial air-conditioning evidence templates

These are first-market defaults. Tenants may require more evidence but cannot remove fixed safety,
payment-photo, history, or integrity controls. A missing required item produces a visible exception
or incomplete outcome, never false completion.

| Work type | Initial required evidence baseline |
| --- | --- |
| Inspection/site survey | Equipment/site identity as available, observed condition/problem, access/safety constraints, measurements/readings required by template, recommendation and unresolved items; photos when needed to prove condition/site constraint |
| Routine service/cleaning | Equipment identity/context, before condition, performed checklist/activities, after condition, test/outcome, materials/gas if any, follow-up; default before/after photos |
| Repair | Fault/affected component evidence, diagnosis, approved scope revision, repair/component result, test evidence, per-unit outcome, unresolved/follow-up; default fault and after-repair photos |
| Gas/leak work | Equipment identity, gas type, pre/post readings, leakage/safety treatment, quantity/source when tracked, test/outcome, follow-up; required readings cannot be replaced by a generic photo |
| Installation | Site/pre-install condition, indoor/outdoor unit identities/labels, mounting/placement, piping/drain/electrical evidence as applicable, completed indoor/outdoor installation, commissioning/test, handover, warranty/punch-list; default at least six context-specific photos |
| Removal/replacement/workshop custody | Condition, equipment/component identity, accessories, handover/custody actors and times, destination, replacement/link, return/installation outcome |
| Customer acknowledgment | Exact visit/work/proposal revision, method, actor/relationship, time, accepted/declined/disputed items, visible exceptions; signature/photo only when policy requires it |
| External MMQR claim | Effective MMQR identity/version shown, obligation/amount/method/time/reference as available, receipt/success photo when required, submitter, claimed status, sync/verification outcome |

## External MMQR receipt-photo baseline

| ID | Proposed policy |
| --- | --- |
| `MMQR-BASE-001` | The product displays an administrator-approved organization/branch MMQR configuration and records the effective configuration identity/version; it never stores or uses the customer's wallet credentials. |
| `MMQR-BASE-002` | Payment occurs outside the product through KPay, CBPay, AYA Pay, or another MMQR-capable provider. The product does not initiate, hold, route, or settle funds. |
| `MMQR-BASE-003` | Capture obligation, claimed amount, method/provider as stated, payer/reference/time when available, submitter, receipt/success photo, and field note without asserting provider settlement. |
| `MMQR-BASE-004` | When tenant policy requires a receipt photo, no qualifying photo means no `PAID` claim: “no photo, no paid.” The visible state remains evidence missing/pending. |
| `MMQR-BASE-005` | Offline capture creates `PAYMENT_EVIDENCE_CAPTURED_PENDING_SYNC`; it never creates authoritative paid, verified, reconciled, or settled state. |
| `MMQR-BASE-006` | On sync, validate tenant/branch MMQR version, obligation, amount/currency, work/customer context, submitter permission, required photo availability/quality, duplicates, and current direct-marking/verification policy. |
| `MMQR-BASE-007` | Tenant direct-marking policy may accept a `PAID_REPORTED` state after successful sync by an authorized field/office actor. Independent-verification policy routes to `EVIDENCE_SUBMITTED` until a verifier acts. |
| `MMQR-BASE-008` | Verification means the recorded evidence is consistent with the obligation and policy. Without an accepted wallet/bank integration, it does not prove provider settlement. |
| `MMQR-BASE-009` | Full, partial, pending, credit, duplicate, mismatched, unreadable, rejected, disputed, adjusted, refunded, and replaced states remain distinguishable. |
| `MMQR-BASE-010` | Replacement/removal after closure requires current permission, reason, preserved prior evidence, dependent-status review, and audit history. |
| `MMQR-BASE-011` | The receipt photo inherits payment/evidence sensitivity and cannot be exposed through public URLs, notifications, ordinary reports, unrelated technicians, or broad support diagnostics. |
| `MMQR-BASE-012` | If an incorrect/expired/wrong-branch MMQR was displayed, record the configuration defect and claim context, keep payment/evidence states separate, and route to accountable review rather than silently changing the obligation. |

## Evidence volume and retention baseline

These retention periods are architecture-evaluation defaults, not qualified Myanmar/Singapore
legal or accounting advice. A later accepted legal/privacy rule may require longer, shorter,
anonymized, held, or prohibited retention.

| ID | Proposed policy |
| --- | --- |
| `RETENTION-BASE-001` | Ordinary service/repair evidence: retain three years after work closure or one year after warranty expiry, whichever is later. |
| `RETENTION-BASE-002` | Installation, commissioning, warranty, custody, and major replacement evidence: retain five years after work closure or two years after warranty expiry, whichever is later. |
| `RETENTION-BASE-003` | Customer approval/acknowledgment and external payment evidence: seven-year evaluation target after related commercial closure, subject to legal/accounting review. |
| `RETENTION-BASE-004` | Rejected/orphaned server-side uploads without a governed business link: quarantine no more than 30 days unless security/legal hold or active recovery requires extension. |
| `RETENTION-BASE-005` | Local synchronized media and assignment data follow `DEVICE-BASE-009/010`; rejected/quarantined unsynchronized capture follows the seven-day recovery window in `DEVICE-BASE-011`. |
| `RETENTION-BASE-006` | Replacement, redaction, deletion, legal hold, anonymization, export, backup, derived preview, and offline-copy obligations are explicit per evidence class; primary-record deletion alone is insufficient. |
| `RETENTION-BASE-007` | Initial storage/cost model uses ordinary service at 8 photos/approximately 10 MiB per job, repair at 12 photos/approximately 18 MiB, and heavy installation at 25 photos/approximately 50 MiB, plus documents and receipt evidence. These are planning profiles, not upload quotas. |
| `RETENTION-BASE-008` | Cost proof measures source, normalized, thumbnail/derived, retained, retrieved, restored, and egress volumes separately at expected and heavy profiles. |

## Client-surface and compatibility baseline

| ID | Proposed policy |
| --- | --- |
| `FIELD-CLIENT-BASE-001` | Technician: installed Android client for assignment-scoped field capture, camera, protected local state, queue, and background/resumable transfer. |
| `FIELD-CLIENT-BASE-002` | Admin, Dispatcher, and detailed Management: responsive web; the Management Dashboard is mobile-optimized but no separate Boss app is required initially. |
| `FIELD-CLIENT-BASE-003` | Customer: responsive/installable web first with delegated scope; no mandatory customer app-store installation. |
| `FIELD-CLIENT-BASE-004` | Shared generic and optional branded artifacts use one maintained product behavior; branding, app ID, or hostname never grants tenant authority. |
| `FIELD-CLIENT-BASE-005` | Only the Technician client requires initial offline mutation support. Web clients may cache presentation safely but require current online authority for governed mutation. |
| `FIELD-CLIENT-BASE-006` | iOS-compatible source is preserved, but iOS commercial release remains conditional on demand, device/background proof, signing/store ownership, and support capacity. |
| `FIELD-CLIENT-BASE-007` | Support the current and immediately previous client release for safe online use. An older incompatible client may recover/export pending local capture but cannot perform reinterpreted mutation. |
| `FIELD-CLIENT-BASE-008` | Critical security or data-integrity fixes may require an earlier forced upgrade with a protected pending-capture recovery path. |
| `FIELD-CLIENT-BASE-009` | Client compatibility includes policy/configuration schema, API contract, local-data migration, evidence format, background behavior, and delivery profile—not version number alone. |
| `FIELD-CLIENT-BASE-010` | Camera/storage/notification permissions are requested at the point of need with clear Myanmar/English recovery guidance; denial cannot create false completion. |
| `FIELD-CLIENT-BASE-011` | Deep links and notifications reauthorize at destination and fail safely for wrong tenant, recipient, device, client version, revoked relationship, or expired continuation. |
| `FIELD-CLIENT-BASE-012` | Analytics/crash diagnostics minimize tenant/customer/evidence content and remain separate from business audit evidence. |

## Myanmar/English and accessibility corpus

| ID | Proposed acceptance item |
| --- | --- |
| `L10N-BASE-001` | Store and render Unicode Myanmar text; preserve user input and provenance. Any legacy-encoding detection/conversion requires explicit preview/confirmation and cannot silently change business evidence. |
| `L10N-BASE-002` | Test mixed Myanmar/English names, air-conditioner brands/models/serials, addresses/landmarks, phone numbers, unit symbols, gas types, and technician notes. |
| `L10N-BASE-003` | Test amounts in MMK, large values, decimals where applicable, dates/times, Myanmar timezone, durations, measurement units, and English digits without changing numeric meaning. |
| `L10N-BASE-004` | Maintain one canonical status/action meaning with reviewed Myanmar and English labels for assignment, arrival, inspection, proposal, approval, work, test, completion, evidence, payment claim, sync, conflict, rejection, and follow-up. |
| `L10N-BASE-005` | Critical warnings and confirmations use text plus icon/structure, not color alone, and distinguish local save, pending sync, accepted, rejected, paid reported, verified, and settled meanings. |
| `L10N-BASE-006` | Critical field tasks support 200% text scaling, adequate contrast, logical focus/reading order, screen-reader labels, and touch targets suitable for field use. Exact conformance level is frozen with proof tooling. |
| `L10N-BASE-007` | Test long labels, narrow screens, landscape/portrait camera flows, low light, one-handed use, gloves/wet conditions as observational usability constraints, and low-literacy icon-plus-text guidance. |
| `L10N-BASE-008` | Error and recovery messages identify the affected assignment/action/media and safe next step without exposing inaccessible record existence or technical secrets. |
| `L10N-BASE-009` | The proof task corpus includes: receive/switch assignment, locate site, identify multiple units, record participants, diagnose, propose changed scope, capture approval candidate, perform work, record materials/tests, capture receipt, complete offline, reconnect, and resolve a conflict. |
| `L10N-BASE-010` | Test with Android screen reader, text scaling, contrast inspection, keyboard/switch behavior where relevant, and actual Myanmar-language review; automated checks alone are insufficient. |

## Open-item disposition

| Open item | Proposed WP-100 disposition | Remaining boundary |
| --- | --- | --- |
| `OPEN-021` | Resolve initial offline automatic/human treatment through the action and conflict matrices. | Proof may reveal a specific action needing revision. |
| `OPEN-028` | Partially resolve field/evidence/local-copy retention with `RETENTION-BASE-*`. | Full record-class/legal-hold/anonymization/deletion and qualified legal/privacy review remain Sequence C/D. |
| `OPEN-033` | Resolve initial air-conditioning evidence templates and fixed evidence rules for architecture evaluation. | Tenant/work-risk configuration and domain/safety review may add requirements. |
| `OPEN-047` | Resolve the remaining initial offline lease and field local-lock baseline with `FIELD-BASE-005` and `DEVICE-BASE-007`. | Provider/client implementation and proof remain. |
| `OPEN-059` | Resolve platform/profile support matrix for architecture evaluation. | Exact market device models/OS builds freeze at proof and release. |
| `OPEN-060` | Resolve initial duration/volume/sync targets through `FIELD-BASE-004`, `OFFLINE-BASE-016/017`, and `NETWORK-BASE-*`. | Production commitments await proof and customer contract. |
| `OPEN-061` | Resolve initial offline action/conflict policy through the matrices above. | Newly introduced actions require explicit classification. |
| `OPEN-062` | Resolve initial evidence types/counts/quality/size/transform/retry baseline. | Exact scanner/library/storage, safety mechanism, and tenant-specific additions remain. |
| `OPEN-063` | Partially resolve device/local-data/loss/backup controls. | Exact encryption, key, root-detection, MDM, remote-cleanup, and library choices remain architecture/proof decisions. |
| `OPEN-064` | Resolve initial current/previous client compatibility policy. | Exact support days and app-store delay remain release-governance inputs. |
| `OPEN-068` | Resolve initial Myanmar/English/accessibility corpus. | Qualified language/accessibility review and exact tooling/device proof remain. |
| `OPEN-095` | Resolve initial evidence volume/cost planning profiles. | Actual customer volumes, provider prices, retention law, and measured proof remain. |
| `OPEN-096` | Preserve exact database/local-store dependency selection as open. | Later proof must compare advancing SQLite candidates and encryption/migration behavior. |
| `OPEN-099` | Resolve test profile, network, corpus, and tooling classes; exact physical device models and OS builds remain proof-authorization bindings. | Named device inventory and reviewers required before execution. |

## Architecture and proof impact

| Decision/proof | Proposed effect after owner acceptance |
| --- | --- |
| `ADR-READY-005` | Offline policy/target blockers substantially satisfied; `OPEN-096`, exact devices, `PROOF-SPEC-002`, field/security review, and ADR packet remain. |
| `ADR-READY-006` | Initial media/evidence policy and planning volume available; `PROOF-SPEC-003`, full legal/privacy lifecycle, provider/storage choice, and review remain. |
| `ADR-READY-014/015` | Initial corpus, surface, compatibility, and device profiles available; `PROOF-SPEC-004`, exact devices/tools, domain/accessibility/security review, and ADR packets remain. |
| `WP98-PROOF-WAVE-002/003/004` | Policy oracles become available for later exact proof planning; no proof preparation or execution is authorized. |

## Options considered

| ID | Option | Recommendation | Reason |
| --- | --- | --- | --- |
| `WP100-OPT-001` | Advance assignment-scoped 48-hour offline field operation with provisional intent, current admission, explicit conflict/recovery, and governed media. | Advance | Fits Myanmar connectivity and crew work while minimizing tenant-data and stale-authority exposure. |
| `WP100-OPT-002` | Use an online-only Technician client. | Reject | Does not fit expected field connectivity or durable capture needs. |
| `WP100-OPT-003` | Replicate broad tenant data and permit most actions offline. | Reject initially | Excessive privacy, revocation, conflict, device-loss, and synchronization risk without demonstrated need. |
| `WP100-OPT-004` | Treat uploaded photos and receipt images as automatic completion/payment truth. | Reject | Violates evidence lifecycle, approval, external-payment, and “no false success” rules. |

## Risks and proof obligations

| ID | Risk | Required control/evidence |
| --- | --- | --- |
| `WP100-RISK-001` | 48-hour lease permits work after office change/revocation. | Current sync admission, conflict/quarantine, visible age, narrower tenant policy where needed. |
| `WP100-RISK-002` | Field continuation on captured approval later conflicts. | Exact revision/policy/threshold evidence, clear provisional state, accountable resolution. |
| `WP100-RISK-003` | Low-end device loses capture or becomes unusable. | Physical supported-floor proof, durable restart/recovery, storage/camera/background failure cases. |
| `WP100-RISK-004` | Media cost/retention becomes unaffordable. | Normal/heavy volume profiles, normalized derivatives, lifecycle measurement, cost proof, legal review. |
| `WP100-RISK-005` | Receipt photo is mistaken for settlement. | Separate claim/verification/settlement states and explicit product wording. |
| `WP100-RISK-006` | Myanmar text or accessibility defect changes business meaning. | Human-reviewed corpus plus device/accessibility proof of critical workflows. |
| `WP100-RISK-007` | Relative OS/device matrix becomes stale. | Freeze exact models/builds at proof and refresh at each release-support decision. |

## Accepted owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP100-DEC-001` | Accept `FIELD-BASE-001` through `015`, the offline action matrix, and `OFFLINE-BASE-001` through `018`. | Accepted |
| `WP100-DEC-002` | Accept `CONFLICT-BASE-001` through `012` and their accountable resolver baseline. | Accepted |
| `WP100-DEC-003` | Accept the four device profiles, `DEVICE-BASE-001` through `012`, and `NETWORK-BASE-001` through `005`. | Accepted |
| `WP100-DEC-004` | Accept `EVIDENCE-BASE-001` through `016` and the initial air-conditioning evidence templates. | Accepted |
| `WP100-DEC-005` | Accept `MMQR-BASE-001` through `012` and `RETENTION-BASE-001` through `008` as architecture-evaluation policy, not legal/accounting advice. | Accepted |
| `WP100-DEC-006` | Accept `FIELD-CLIENT-BASE-001` through `012` and `L10N-BASE-001` through `010`. | Accepted |
| `WP100-DEC-007` | Resolve or partially resolve the open items exactly as recorded; preserve `OPEN-096` and exact proof device/reviewer bindings. | Accepted |
| `WP100-DEC-008` | Advance `WP100-OPT-001`; reject `WP100-OPT-002`, `WP100-OPT-003`, and `WP100-OPT-004`. | Accepted |
| `WP100-DEC-009` | Keep `ADR-READY-005/006/014/015` `NOT_READY`; authorize no proof, architecture selection, or implementation. | Accepted |
| `WP100-DEC-010` | Freeze the four-path WP-100 public candidate inventory and, after verified publication, activate WP-101 Data, Consistency, Inventory, Reporting and Integration Policy Baseline documentation only. | Accepted |

## Frozen candidate inventory and next gate

The candidate WP-100 public inventory is exactly:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/102_AUTHORIZATION_IDENTITY_SUPPORT_POLICY_BASELINE.md`
4. `docs/103_FIELD_OFFLINE_EVIDENCE_CLIENT_ACCEPTANCE_BASELINE.md`

The owner accepted `DEC-235`, every baseline and matrix in this document, all recorded open-item
dispositions, and `WP100-DEC-001` through `010`; advanced `WP100-OPT-001`; rejected
`WP100-OPT-002` through `004`; and authorized commit and push only for the exact four paths above.
After verified publication, WP-101 may define data, consistency, inventory, reporting, and
integration policy. Proof preparation/execution, final architecture selection, application coding,
infrastructure, deployment, provider accounts/cost, and customer/live data remain closed.

## Verified publication and successor activation

The owner accepted the exact WP-100 recommendation and authorized only the frozen four-path public
inventory. It was committed as `48bdecc WP-100: accept field offline evidence client baseline`
and published at `48bdecc6adfe1c851bdf178e1fd7c10a5527ce88`, repository tree
`c2e9dfa81754d446df62a846670c6c65ad97d1a2`, with unchanged proof tree
`1e9f75fdc1b221009bc691f54d24ca63f02c8038`. Local `HEAD`, fetched `origin/main`, and the live
remote main matched. WP-100 is `VERIFIED_AND_CLOSED`; its publication authority is consumed.

WP-101 is active for owner-decision documentation and option analysis only. It may propose data
ownership, history/correction, consistency, inventory/costing, KPI/freshness, import/migration,
portability, copy-lifecycle, and integration-contract baselines. Proof preparation/execution,
final architecture selection, application coding, infrastructure, deployment, provider
accounts/cost, and customer/live data remain closed. No WP-101 commit or push is authorized
without later owner acceptance.
