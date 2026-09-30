# Field, Offline, Evidence and Client Delivery Architecture

## Document control

| Field | Value |
| --- | --- |
| Status | Draft architecture proposal — owner review required |
| Work package | `WP-10 Field, Offline, Evidence and Client Delivery Architecture` |
| Phase | Solution Architecture |
| Owner | Aung Myo Oo |
| Confidence | `CONF-1` — reasoned and traceable, not proven or selected |
| Architecture selection | Not authorized |
| Technical-proof execution | Not authorized |
| Application coding | Not authorized |
| Deployment | Not authorized |
| Last updated | 2026-09-30 |

## Purpose

This document proposes technology-neutral boundaries and behavior for field clients, temporary
offline work, evidence and media, customer and technician experiences, tenant-aware domains, and
shared or branded application delivery. It describes what a later architecture must preserve and
what evidence is required before selection. It does not select an architecture, technology,
provider, application framework, storage mechanism, synchronization library, build system, or
distribution channel.

Every proposal in this document remains Proposed at `CONF-1`. A proposal does not become an
Accepted architecture decision merely because it is documented here.

## Authorized scope

WP-10 covers:

- responsibility boundaries for Admin, Management, Technician, Customer, organization web, and
  branded client surfaces;
- assignment-scoped field working sets and temporary offline availability;
- provisional local actions, synchronization admission, ordering, idempotency, conflicts,
  revocation, recovery, and cleanup;
- evidence metadata, capture, upload, safety, availability, replacement, redaction, retention, and
  external-payment evidence behavior;
- device, network, local-data, notification, localization, and compatibility concerns;
- product subdomain and verified custom-domain routing without treating routing as authorization;
- shared generic clients and optional organization-branded artifacts from one maintained product;
- delivery-profile, release, configuration, and client-version compatibility;
- threat cases, unresolved inputs, proposed ADR subjects, and bounded technical-proof plans.

## Explicit non-scope

WP-10 does not:

- accept an architecture, ADR, product option, or initial-release commitment;
- choose web or mobile frameworks, local databases, synchronization protocols, media/object
  storage, malware-scanning, notification, analytics, build, signing, app-store, domain,
  certificate, identity, or cloud products;
- define executable APIs, schemas, events, queues, services, source code, build pipelines, or
  deployment topology;
- execute device, network, synchronization, media, custom-domain, branded-build, security, or
  compatibility proofs;
- configure domains, certificates, stores, signing identities, provider accounts, or customer
  environments;
- authorize application coding, dependencies, migration, publication, deployment, or live-data
  access.

## Governing baseline

This proposal is constrained by:

- owner-stated constraints `PD-002` through `PD-007` and `PD-009` through `PD-012`;
- architecture constraints `ARC-C-001`, `ARC-C-003` through `ARC-C-006`, `ARC-C-008` through
  `ARC-C-015`, and `ARC-C-018` through `ARC-C-020`;
- trust boundaries `TB-01`, `TB-02`, `TB-04`, `TB-05`, `TB-07`, and `TB-09`;
- capability families `CAP-CREW`, `CAP-SCHED`, `CAP-WO`, `CAP-FIELD`, `CAP-DOC`,
  `CAP-PAYEVID`, `CAP-CX`, `CAP-DELIVERY`, `CAP-NOTIFY`, `CAP-IAM`, `CAP-ORG`, and
  `CAP-PLATFORM`;
- field, crew, scheduling, evidence, external-payment, notification, offline, security, and client
  delivery rules and requirements;
- workflows `WF-002` through `WF-013` and `WF-015` through `WF-020`, including field execution,
  installation, multi-worker dispatch, changed scope/approval, completion, payment evidence,
  rescheduling, follow-up, and multi-site work;
- `AR-ART-007`, `AR-ART-008`, `AR-ART-010`, `ADR-CAND-005`, `ADR-CAND-006`,
  `ADR-CAND-010`, `ADR-CAND-011`, and `ADR-CAND-015`;
- `OPT-CLI-*`, `OPT-OFF-*`, `OPT-EVD-*`, `OPT-WL-*`, and applicable cross-option dependency
  rules from WP-07;
- `OFF-AUTH-001` through `OFF-AUTH-008`, `DATA-AUTH-001` through `DATA-AUTH-009`,
  `TEN-PATH-005`, `TEN-PATH-009`, and the WP-08 security control families;
- `CONS-CLASS-005`, `XCHG-DATA-001` through `XCHG-DATA-006`, `EVD-DATA-001` through
  `EVD-DATA-010`, and `RECON-STATE-001` through `RECON-STATE-012` from WP-09; and
- unresolved `OPEN-002` through `OPEN-004`, `OPEN-007`, `OPEN-021`, `OPEN-028`,
  `OPEN-030`, `OPEN-033` through `OPEN-035`, `OPEN-038` through `OPEN-042`,
  `OPEN-045` through `OPEN-050`, and `OPEN-059` through `OPEN-068` where applicable.

## Architecture objectives

| ID | Objective | Governing trace |
| --- | --- | --- |
| `FIELD-OBJ-001` | Preserve identical tenant, authorization, validation, business, evidence, and audit meaning across shared and branded clients. | `ARC-C-001`, `SR-DELIVERY-015` |
| `FIELD-OBJ-002` | Support crews with multiple workers, one responsible leader, assignment changes, and actual participation without assuming one login per worker. | `ARC-C-004`, `SR-CREW-001` through `SR-CREW-005` |
| `FIELD-OBJ-003` | Support inspection-led and changing on-site scope per equipment unit without treating a request as fixed work. | `ARC-C-005`, `ARC-C-006`, `ARC-C-008` |
| `FIELD-OBJ-004` | Keep essential field capture usable during temporary network loss while retaining the online trust boundary. | `ARC-C-014`, `SR-FIELD-002`, `SR-OFFLINE-*` |
| `FIELD-OBJ-005` | Limit offline data to the minimum authorized assignment working set and protect it through expiry, revocation, loss, and cleanup. | `SR-OFFLINE-001`, `OFF-AUTH-001`, `OFF-AUTH-002` |
| `FIELD-OBJ-006` | Make every retryable field or media operation attributable, idempotent, observable, and recoverable. | `SR-OFFLINE-004`, `DEC-077`, `DEC-084` |
| `FIELD-OBJ-007` | Separate captured content from valid evidence and from the business fact or decision it may support. | `EVD-DATA-002`, `DEC-078` |
| `FIELD-OBJ-008` | Preserve mandatory receipt-photo behavior while never claiming that the platform processed or settled payment. | `ARC-C-009`, `ARC-C-010`, `SR-PAYEVID-*` |
| `FIELD-OBJ-009` | Treat domain, brand, application identity, deep link, and cached organization as presentation/routing hints, never final authorization. | `ARC-C-011`, `ARC-C-013`, `DEC-080` |
| `FIELD-OBJ-010` | Produce shared and optional branded artifacts from one maintained product without tenant source forks. | `DEC-006`, `SR-DELIVERY-005`, `SR-DELIVERY-006` |
| `FIELD-OBJ-011` | Make client, delivery-profile, configuration, and supported-release compatibility explicit and fail-safe. | `BR-DELIVERY-012`, `DEC-081` |
| `FIELD-OBJ-012` | Keep all architecture choices reversible and blocked until target devices, workloads, service levels, cost, skills, and operating ownership are known and proven. | `ARC-C-020`, `OPEN-038` through `OPEN-042` |

## Client surface responsibilities

Each surface is a delivery boundary, not a separate source of business truth.

| ID | Surface | Primary responsibility | Explicit boundary |
| --- | --- | --- | --- |
| `CLIENT-SURF-001` | Shared Admin Portal | Detailed tenant administration, dispatch, customers, work, commercial records, inventory, projects, reporting, configuration, and audit-appropriate operations | Does not gain platform or another tenant's authority; not required to be the offline field client |
| `CLIENT-SURF-002` | Management Dashboard | Role-aware mobile summaries, alerts, permitted approvals, operational exceptions, trends, and secure navigation to Admin detail | Summary visibility never exceeds underlying record scope; not a second management system |
| `CLIENT-SURF-003` | Technician experience | Assignment working set, crew/site/equipment context, arrival, inspection, diagnosis, proposals, activities, materials, photos, readings, tests, outcomes, and follow-up | No broad tenant browsing or offline high-risk administration merely because the user is a technician |
| `CLIENT-SURF-004` | Customer experience | Delegated requests, appointments, exact-scope approvals, progress, permitted equipment/documents, acknowledgment, communication, and external-payment evidence | No internal notes, hidden prices/costs, unrelated contacts, worker-private data, or authority inferred from matching contact details |
| `CLIENT-SURF-005` | Organization web identity | Product subdomain or verified custom-domain presentation, tenant discovery hint, public information, and bounded continuation into authenticated experiences | Hostname alone does not authorize a tenant, record, user, or action |
| `CLIENT-SURF-006` | Optional branded artifacts | Organization-branded Customer, Technician, and optional Manager identities generated from shared maintained product behavior | Branding cannot fork business/security behavior, embed privileged secrets, or create unsupported release drift |
| `CLIENT-SURF-007` | Platform operations surface | Organization directory, delivery state, application identity, compatible release, domain state, service health, support cases, and controlled support-session entry | Routine platform visibility excludes private operational records; tenant content requires the WP-08 support grant model |

### Client authority invariants

| ID | Proposed invariant |
| --- | --- |
| `CLIENT-INV-001` | The trusted boundary resolves current identity, organization, membership or delegation, action, resource tenant, scope, record state, policy, and purpose for every protected operation. |
| `CLIENT-INV-002` | A client-supplied organization, branch, role, worker, brand, application, hostname, route, record identifier, or cached grant is never sufficient authority. |
| `CLIENT-INV-003` | Switching organization context re-evaluates authority and partitions data, cache, search, notification, and navigation state; contexts are never silently combined. |
| `CLIENT-INV-004` | One surface cannot call a capability with broader authority merely because another surface exposes that action. |
| `CLIENT-INV-005` | Shared and branded artifacts enforce equivalent business validation, tenant isolation, audit, and failure behavior for the same action. |
| `CLIENT-INV-006` | Secure navigation carries only a bounded continuation hint; the destination independently authenticates, authorizes, and resolves current state. |
| `CLIENT-INV-007` | Client display success, message delivery, local save, upload completion, or generated document never implies approval, completion, acceptance, paid status, or settlement. |
| `CLIENT-INV-008` | Sensitive summaries are authorized before aggregation and do not reveal hidden records through totals, counts, labels, timing, or cached results. |
| `CLIENT-INV-009` | Local and client logs minimize tenant/customer content and exclude credentials, temporary access material, evidence bodies, and signing secrets. |
| `CLIENT-INV-010` | Unsupported, incompatible, revoked, suspended, or untrusted client contexts fail closed for protected mutation and explain the recoverable next action. |
| `CLIENT-INV-011` | Localization, labels, branding, and tenant-configured workflow depth do not change canonical business meaning. |
| `CLIENT-INV-012` | Client accessibility and weak-network behavior are part of acceptance evidence, not cosmetic follow-up work. |

## Client and delivery option position

WP-10 carries forward `OPT-CLI-01`, `OPT-CLI-02`, `OPT-CLI-04`, `OPT-OFF-01`,
`OPT-OFF-02`, `OPT-EVD-02`, `OPT-WL-01`, and `OPT-WL-02` for later comparison. It does not
select among them. `OPT-CLI-03` and `OPT-WL-03` remain excluded because independently modified
tenant codebases violate the shared-product constraint. `OPT-OFF-03` remains deferred unless
accepted field evidence proves that an assignment-scoped working set cannot meet the required
offline duration and workflow.

## Assignment-scoped field working set

The working set is a time-bounded projection for permitted field work, not an offline tenant
database or portable authority grant.

| ID | Proposed working-set content or rule |
| --- | --- |
| `FIELD-SET-001` | One organization context and the authenticated subject/linked worker facts required for attribution. |
| `FIELD-SET-002` | Assigned work orders, visits, crew/leader, planned resources, assignment lifecycle, and actual-participation capture applicable to the user. |
| `FIELD-SET-003` | Minimum permitted customer, contact, service-site, address/landmark, access, safety, and communication details for the assignment. |
| `FIELD-SET-004` | Assigned equipment identities, relevant history summaries, warranties/relationships, and source/provenance needed for current service decisions. |
| `FIELD-SET-005` | Current reported problem, inspection plan, job template, approved proposal revision, work items, constraints, and unresolved outcomes. |
| `FIELD-SET-006` | Permitted price, charge, tax, discount, quotation, or approval facts only when required for field duties and allowed by role/policy. |
| `FIELD-SET-007` | Evidence/checklist requirements, types, subjects, quality rules, signatures/readings, and completion dependencies effective for the assignment. |
| `FIELD-SET-008` | Permitted material availability, reservations, issued custody, serialized identity, and capture rules without copying broad inventory. |
| `FIELD-SET-009` | Effective organization or branch MMQR presentation needed for the obligation, including configuration identity/version, without payment-provider credentials. |
| `FIELD-SET-010` | Permitted customer approvals, acknowledgment methods, follow-up options, safety treatment, and exception outcomes. |
| `FIELD-SET-011` | Current canonical statuses, tenant labels, policy/configuration versions, capability flags, and client compatibility limits needed to interpret the work. |
| `FIELD-SET-012` | Stable local operation identities, dependencies, preconditions, capture times, and synchronization results for pending field actions. |
| `FIELD-SET-013` | Explicit issue/expiry time, refresh status, completeness/degraded indicators, and removal obligations for every prepared working set. |
| `FIELD-SET-014` | No unrelated customers, workers, jobs, evidence, reports, exports, support data, credentials, or platform data are included for convenience. |
| `FIELD-SET-015` | Every prepared set can be attributed to the tenant, subject, authorized device/client context, assignment, policy, and preparation decision. |

## Offline action classification

Offline availability does not mean every online action is permitted offline. The final action
matrix is blocked by `OPEN-061`.

| ID | Class | Candidate examples | Required synchronization treatment |
| --- | --- | --- | --- |
| `OFF-CLASS-001` | Cached read | Assignment, site directions, equipment summary, approved scope, checklist | Display age/completeness; refresh before decisions that require current truth |
| `OFF-CLASS-002` | Provisional capture | Arrival, inspection, diagnosis, notes, readings, actual participants, photos, tests, follow-up need | Durable local capture; current validation before authoritative effect |
| `OFF-CLASS-003` | Replay-safe field intent | Activity performed, per-unit outcome, material-use proposal, customer acknowledgment candidate | Stable operation identity, preconditions, ordered dependencies, per-effect idempotency |
| `OFF-CLASS-004` | Media transfer | Photo, receipt, signature image, document, supporting attachment | Separate metadata/content/finalization state, resumable retry, safety and availability checks |
| `OFF-CLASS-005` | Conditional commercial intent | Changed scope proposal, charge candidate, payment-evidence claim | Remains pending; no approval, paid, verified, or settlement meaning until current policy succeeds |
| `OFF-CLASS-006` | Prohibited high-risk action | Membership/role change, platform/support elevation, tenant switch, broad export, deletion, credential/signing change, unsupported approval | No offline simulation; require current trusted online authority and stronger controls |
| `OFF-CLASS-007` | Human-resolution conflict | Stale assignment, incompatible scope/approval, stock/custody collision, closed work, disputed evidence | Preserve capture and exact conflict; named authorized resolver selects governed treatment |

## Provisional operation envelope

Every locally captured operation should retain enough meaning to validate and recover it without
trusting mutable client state.

| ID | Proposed operation fact |
| --- | --- |
| `OFF-OP-001` | Stable operation identity and originating client/session/device context. |
| `OFF-OP-002` | Organization, assignment, resource identity, action, and intended business subject. |
| `OFF-OP-003` | Authenticated acting identity and actual worker/participant when different. |
| `OFF-OP-004` | Local capture time, ordering evidence, and trusted receipt/synchronization time kept distinct. |
| `OFF-OP-005` | Observed source/resource version, state, policy/configuration version, and required preconditions. |
| `OFF-OP-006` | Explicit dependency identities for prerequisite actions or media. |
| `OFF-OP-007` | Minimal submitted business intent and evidence references; no authority token is treated as a lasting business fact. |
| `OFF-OP-008` | Local lifecycle, attempt count, last result, retry eligibility, and user-visible recovery guidance. |
| `OFF-OP-009` | Authoritative result identity/state when accepted, or stable conflict/rejection reason when not accepted. |
| `OFF-OP-010` | Audit-safe diagnostics sufficient to investigate without copying credentials or unnecessary evidence content. |

## Synchronization lifecycle

```text
Prepared working set
  -> Available locally
  -> Provisional action captured
  -> Queued with dependencies
  -> Synchronization admission
      -> Accepted authoritatively
      -> Duplicate / prior result reused
      -> Pending dependency / retry
      -> Conflict requiring resolution
      -> Authority or policy rejected
      -> Evidence quarantined for controlled recovery
  -> Reconciled and acknowledged locally
  -> Expired and cleaned according to policy
```

| ID | State | User/system meaning |
| --- | --- | --- |
| `SYNC-STATE-001` | Prepared | Authorized working-set candidate was produced for a specific assignment/client context. |
| `SYNC-STATE-002` | Available locally | Protected working data is usable within stated age, completeness, and expiry limits. |
| `SYNC-STATE-003` | Captured | User intent or evidence is durable locally but not authoritative. |
| `SYNC-STATE-004` | Queued | Operation has identity, required facts, and unresolved or satisfied dependencies. |
| `SYNC-STATE-005` | Synchronizing | A bounded attempt is in progress; repeated initiation must not create a second effect. |
| `SYNC-STATE-006` | Accepted | Current authorization and business validation succeeded and an authoritative result is linked. |
| `SYNC-STATE-007` | Duplicate/no-op | The same intended effect was already handled; the prior result is linked. |
| `SYNC-STATE-008` | Pending/retryable | A temporary dependency or transfer condition prevents completion without invalidating capture. |
| `SYNC-STATE-009` | Conflicted | Current authoritative facts are incompatible and a safe automatic treatment is unavailable. |
| `SYNC-STATE-010` | Rejected | Tenant, authority, assignment, policy, state, quality, or business validation blocks the effect. |
| `SYNC-STATE-011` | Quarantined/recoverable | Captured content is protected for controlled review but is not attached as accepted business evidence. |
| `SYNC-STATE-012` | Reconciled/cleaned | Final result is acknowledged, required history remains, and temporary local data is removed by policy. |

### Synchronization controls

| ID | Proposed control |
| --- | --- |
| `SYNC-CTRL-001` | Establish current trusted session and resolve server-authoritative organization, subject, membership/delegation, assignment, scope, and action permission. |
| `SYNC-CTRL-002` | Validate operation tenant and resource tenant before looking up or applying any business effect. |
| `SYNC-CTRL-003` | Validate assignment state, policy/configuration version, record state/version, evidence requirement, and business preconditions at synchronization time. |
| `SYNC-CTRL-004` | Process dependencies explicitly; do not mark a dependent action successful because its transfer was attempted. |
| `SYNC-CTRL-005` | Apply idempotency per intended business effect, not only per network request or upload attempt. |
| `SYNC-CTRL-006` | Return a durable result for every operation: accepted, prior result, pending, conflicted, rejected, or quarantined. |
| `SYNC-CTRL-007` | Never report a partially handled batch as global success; show exact per-operation outcomes and remaining obligations. |
| `SYNC-CTRL-008` | Preserve original local capture time while using trusted receipt/effective times for authoritative ordering and policy. |
| `SYNC-CTRL-009` | Bound automatic retry and expose terminal or human-review state; endless hidden retry is prohibited. |
| `SYNC-CTRL-010` | Refresh only affected working-set data after resolution and avoid broad data expansion as a recovery shortcut. |
| `SYNC-CTRL-011` | Retain attribution and prior meaning for rejected, superseded, corrected, or reconciled operations according to audit/retention policy. |
| `SYNC-CTRL-012` | Ensure a client crash, duplicate submission, upload restart, or acknowledgment loss cannot duplicate a business effect. |
| `SYNC-CTRL-013` | Make stale-client or incompatible-policy failure explicit before mutation and preserve safe export/recovery of unsynchronized capture. |
| `SYNC-CTRL-014` | Reconcile local state only from authoritative per-operation results, not from optimistic screen state. |
| `SYNC-CTRL-015` | Observe queue age, retry, transfer progress, conflicts, rejections, quarantine, and cleanup without exposing tenant content in diagnostics. |

## Conflict classes and treatments

| ID | Conflict | Proposed safe treatment |
| --- | --- | --- |
| `SYNC-CONFLICT-001` | Tenant mismatch | Reject before effect; security signal; never remap client content automatically. |
| `SYNC-CONFLICT-002` | Revoked or inactive subject/membership | Reject authoritative mutation; preserve eligible capture in controlled recovery. |
| `SYNC-CONFLICT-003` | Reassigned, expired, cancelled, or completed assignment | Reject or route to named review according to accepted policy; do not silently restore assignment. |
| `SYNC-CONFLICT-004` | Stale policy/configuration/client capability | Fail closed for affected mutation; refresh or require compatible client and deliberate resubmission. |
| `SYNC-CONFLICT-005` | Scope or proposal revision changed | Keep original captured intent; require comparison and new governed approval where chargeable scope changed. |
| `SYNC-CONFLICT-006` | Concurrent work/equipment outcome | Preserve both claims and their provenance; authorized domain resolution decides supersession/correction. |
| `SYNC-CONFLICT-007` | Stock, serialization, or custody collision | Do not create negative, duplicate, or cross-tenant movement; quarantine for inventory reconciliation. |
| `SYNC-CONFLICT-008` | Evidence missing, unreadable, unsafe, or wrong subject | Keep claim pending/rejected; request qualifying replacement without erasing prior evidence history. |
| `SYNC-CONFLICT-009` | Payment claim duplicates or differs from obligation | Do not mark paid/verified; compare obligation, amount, method, receipt, submitter, and prior claim. |
| `SYNC-CONFLICT-010` | Work closed/reopened/corrected while offline | Require current lifecycle authority and reason; preserve both earlier closure and captured field evidence. |
| `SYNC-CONFLICT-011` | Missing prerequisite or unavailable dependency | Keep pending with bounded retry or named follow-up; do not fabricate prerequisite success. |
| `SYNC-CONFLICT-012` | Duplicate operation or media | Link the prior accepted/pending/rejected result; avoid a second activity, file, claim, notification, or stock effect. |

## Device, session, and local-data controls

Exact device controls remain blocked by `OPEN-047`, `OPEN-059`, and `OPEN-063`.

| ID | Proposed control |
| --- | --- |
| `DEVICE-CTRL-001` | Bind local state to one resolved organization, authorized subject, client/device context, and working-set lifecycle; avoid shared unpartitioned caches. |
| `DEVICE-CTRL-002` | Store only the minimum assignment data and evidence required for permitted work and remove it after accepted expiry/cleanup conditions. |
| `DEVICE-CTRL-003` | Protect local data and authentication material using capabilities appropriate to the accepted device risk; exact mechanisms await selection. |
| `DEVICE-CTRL-004` | Re-establish current authentication and authorization for synchronization and sensitive online continuation; cached access is not perpetual authority. |
| `DEVICE-CTRL-005` | Lock or revoke future server access when membership, device trust, assignment, session, or organization access is revoked. |
| `DEVICE-CTRL-006` | Treat device time as capture evidence, not unquestioned authoritative order or policy time. |
| `DEVICE-CTRL-007` | Prevent ordinary device backup, sharing, export, gallery exposure, notification preview, clipboard, or logs from becoming an uncontrolled evidence/data copy where policy requires. |
| `DEVICE-CTRL-008` | Detect and surface insufficient storage, unavailable camera, denied permission, weak network, power/background limits, and interrupted transfer before false completion. |
| `DEVICE-CTRL-009` | Lost-device response preserves security evidence, revokes future authority, and performs supported policy-driven cleanup without claiming guaranteed remote erasure. |
| `DEVICE-CTRL-010` | Account or device recovery never silently attaches old local data to another identity or organization. |
| `DEVICE-CTRL-011` | Offline expiry/degraded mode identifies which reads remain informational and which mutations are blocked pending refresh. |
| `DEVICE-CTRL-012` | Local cleanup is observable and testable across accepted, rejected, quarantined, expired, signed-out, and removed-client states. |

## Evidence and media lifecycle

Evidence content, evidence metadata, safety/quality acceptance, business attachment, and the
business decision supported by evidence are separate states.

```text
Expected or required
  -> Captured locally
  -> Queued / Uploading / Retryable failure
  -> Received under tenant and subject metadata
  -> Quarantined for safety and quality checks
  -> Available as governed evidence
  -> Linked to an explicit business fact or decision
  -> Retained / Replaced / Redacted / Deleted under policy
```

| ID | State | Meaning |
| --- | --- | --- |
| `MEDIA-STATE-001` | Expected/required | Policy identifies evidence type, subject, quality, timing, and blocking effect. |
| `MEDIA-STATE-002` | Captured locally | Content and capture metadata are durable on the client but not yet trusted evidence. |
| `MEDIA-STATE-003` | Queued | Stable upload/evidence identities and business context exist; transfer has not finalized. |
| `MEDIA-STATE-004` | Uploading | A resumable transfer attempt is active and progress is observable. |
| `MEDIA-STATE-005` | Retryable failure | Content remains locally recoverable and retry does not duplicate the evidence item. |
| `MEDIA-STATE-006` | Received/quarantined | Content is in controlled custody but unavailable for ordinary business use. |
| `MEDIA-STATE-007` | Rejected | Type, size, safety, quality, tenant, subject, or policy validation failed with a visible reason. |
| `MEDIA-STATE-008` | Available | Metadata, tenant/subject binding, transfer finalization, and required safety/quality checks succeeded. |
| `MEDIA-STATE-009` | Linked/finalized | Available evidence is explicitly associated with a governed work, approval, acknowledgment, or claim fact. |
| `MEDIA-STATE-010` | Replacement pending | A proposed replacement exists but the prior governed evidence remains identifiable until accepted treatment. |
| `MEDIA-STATE-011` | Replaced/redacted | Prior reference, actor, reason, time, authority, and affected decision remain governed. |
| `MEDIA-STATE-012` | Retention/deletion state | Hold, expiry, archive, deletion, or unresolved-copy obligations are explicit and verifiable. |

### Evidence and media controls

| ID | Proposed control |
| --- | --- |
| `MEDIA-CTRL-001` | Assign stable evidence and upload operation identities before transfer so restart/retry can reuse state safely. |
| `MEDIA-CTRL-002` | Bind metadata to organization, underlying subject, assignment/work context, type, actor/source, capture/import time, sensitivity, and retention class. |
| `MEDIA-CTRL-003` | Authorize create, upload, preview, download, export, replace, redact, and delete through current authority to the business subject and requested action. |
| `MEDIA-CTRL-004` | Validate declared and detected content characteristics, accepted size/type, required quality, and context before ordinary availability. |
| `MEDIA-CTRL-005` | Keep unsafe, mismatched, unfinalized, orphaned, rejected, or expired content unavailable and reconcilable rather than silently attaching it. |
| `MEDIA-CTRL-006` | Support resumable bounded transfer without treating a transferred chunk or locally displayed preview as completed evidence. |
| `MEDIA-CTRL-007` | Preserve original capture/content provenance; compression, transformation, thumbnail, annotation, or redaction produces attributable derived versions according to policy. |
| `MEDIA-CTRL-008` | Do not allow filenames, storage keys, public URLs, temporary links, cached previews, or application identity to bypass business-record authorization. |
| `MEDIA-CTRL-009` | Detect duplicate attempts using stable operation/content evidence without merging different tenant ownership or business meaning. |
| `MEDIA-CTRL-010` | Finalization is idempotent and verifies the content under authoritative metadata before making it available. |
| `MEDIA-CTRL-011` | Required evidence blocks the governed outcome until qualifying evidence is available and linked, not merely selected or uploaded. |
| `MEDIA-CTRL-012` | Replacement, removal, redaction, or reclassification after approval/closure requires current authority and preserves impact on dependent decisions. |
| `MEDIA-CTRL-013` | Retention, hold, export, anonymization, deletion, backup, offline, and derived-copy obligations follow the governing evidence class. |
| `MEDIA-CTRL-014` | User-visible states distinguish capture saved, transfer queued, upload progress, retry, quarantine, rejection, availability, and accepted business use. |
| `MEDIA-CTRL-015` | Operational diagnostics expose identifiers, state, age, and error category while minimizing private content and excluding credentials or temporary grants. |

## External MMQR payment-evidence behavior

The platform does not initiate, process, hold, or settle payment. A displayed MMQR remains an
organization or branch configuration used for an external transaction.

| ID | Proposed field behavior |
| --- | --- |
| `PAY-FIELD-001` | The client shows only the effective approved MMQR configuration for the relevant obligation and makes its organization/branch context clear. |
| `PAY-FIELD-002` | Amount, method, time, reference when available, receipt image, submitter, obligation, and verification state remain distinct facts. |
| `PAY-FIELD-003` | When the effective policy requires a receipt photo, no qualifying available photo means no authoritative paid state. |
| `PAY-FIELD-004` | Offline receipt capture and paid intent remain provisional/pending until synchronization validates tenant, obligation, policy, evidence availability, authority, and duplicate/conflict state. |
| `PAY-FIELD-005` | A successful upload does not prove that payment occurred, that the amount matches, or that a provider settled funds. |
| `PAY-FIELD-006` | Direct marking and separate office verification may differ by accepted tenant policy, but both preserve submitter and any separate verifier decision. |
| `PAY-FIELD-007` | Unreadable, duplicate, mismatched, replaced, removed, rejected, disputed, partial, credit, adjustment, and refund-related meanings remain explicit. |
| `PAY-FIELD-008` | Correction or rejection preserves the prior claim/evidence/decision and never retroactively claims platform settlement. |

## Field environment and degraded behavior

| ID | Concern | Required proposal evidence before selection |
| --- | --- | --- |
| `FIELD-ENV-001` | Browser/OS/device range | Supported combinations, minimum versions, screen classes, memory/storage expectations, and test matrix |
| `FIELD-ENV-002` | Camera and file capture | Permission, orientation, metadata, quality, multiple-photo, low-light, retake, and failure behavior |
| `FIELD-ENV-003` | Weak/intermittent network | Latency/loss/outage profiles, queue behavior, resume, retry limits, progress, and user recovery |
| `FIELD-ENV-004` | Local storage pressure | Required working-set/media volume, reservation behavior, low-space warning, partial capture, and cleanup |
| `FIELD-ENV-005` | Background limits | Accepted behavior when the app is suspended, killed, power constrained, or background work is restricted |
| `FIELD-ENV-006` | Multiple workers/devices | Crew-leader and individual attribution, concurrent capture, handoff, duplicate prevention, and conflict treatment |
| `FIELD-ENV-007` | Localization | Myanmar/English Unicode, terminology, address/landmark, date/time, number/currency, and document fidelity corpus |
| `FIELD-ENV-008` | Accessibility and field usability | Touch target, contrast, text scaling, assistive technology, glare, gloves, one-hand use, and error-recovery criteria |
| `FIELD-ENV-009` | Privacy and device loss | Enrollment/trust, local protection, lock, backup/share, screenshot, revoke, wipe limits, and incident treatment |
| `FIELD-ENV-010` | Supportability | Version/config identification, safe diagnostics, queue/evidence recovery, consented support, and escalation ownership |

## Tenant routing and custom domains

| ID | Proposed control |
| --- | --- |
| `ROUTE-CTRL-001` | Maintain one authoritative mapping between a verified delivery identity and its intended organization/delivery profile; never infer ownership from a name alone. |
| `ROUTE-CTRL-002` | Verify product-subdomain uniqueness and organization-owned custom-domain control before activation; exact method awaits selection. |
| `ROUTE-CTRL-003` | Resolve hostname, application identity, or deep link as a tenant/presentation hint, then independently authenticate and authorize current access. |
| `ROUTE-CTRL-004` | Reject unknown, ambiguous, conflicting, expired, suspended, or removed mappings without falling back to another tenant. |
| `ROUTE-CTRL-005` | Keep domain/certificate lifecycle, verification evidence, activation, renewal, failure, suspension, rotation, and removal attributable. |
| `ROUTE-CTRL-006` | Prevent a tenant administrator from claiming another tenant's product subdomain, custom domain, application identity, or deep-link association. |
| `ROUTE-CTRL-007` | Secure navigation/deep links carry bounded route intent and recheck identity, tenant, record, action, expiry, and current state at the destination. |
| `ROUTE-CTRL-008` | Partition and invalidate presentation/configuration caches by authoritative mapping version; stale cache never grants data access. |
| `ROUTE-CTRL-009` | Domain, brand, or application removal does not move, delete, or reassign tenant business records. |
| `ROUTE-CTRL-010` | Domain-routing diagnostics identify mapping/profile/version and failure category without revealing tenant-private data. |
| `ROUTE-CTRL-011` | Certificate, DNS, and provider credentials remain outside ordinary tenant-editable delivery configuration and client artifacts. |
| `ROUTE-CTRL-012` | A shared product domain remains a safe recovery path only when current authentication and organization-selection policy permit it. |

## Delivery profile proposal

A delivery profile is governed configuration for presentation and release binding. It is not an
authorization policy, tenant record store, or container for signing/provider secrets.

| ID | Proposed delivery-profile fact |
| --- | --- |
| `DELIV-PROFILE-001` | Stable profile identity, intended organization, lifecycle state, owner, and attributable version history. |
| `DELIV-PROFILE-002` | Surface and artifact purpose: Customer, Technician, Manager, organization web, or shared experience. |
| `DELIV-PROFILE-003` | Product/application identity and whether it is shared multi-organization or bound to one intended organization. |
| `DELIV-PROFILE-004` | Approved names, marks, colors, icons, text, and fallback presentation with validation and ownership evidence. |
| `DELIV-PROFILE-005` | Product subdomains, verified custom domains, deep/universal-link associations, and their lifecycle states. |
| `DELIV-PROFILE-006` | Permitted public contact, support, privacy, legal, and store-listing information. |
| `DELIV-PROFILE-007` | Enabled surface capabilities and tenant-configurable presentation, constrained by platform and release compatibility. |
| `DELIV-PROFILE-008` | Language/localization selection and canonical translation/version references. |
| `DELIV-PROFILE-009` | Notification presentation/sender references without provider secrets or authority-bearing credentials. |
| `DELIV-PROFILE-010` | Configuration version, compatible product/client range, activation time, supersession, rollback target, and support state. |
| `DELIV-PROFILE-011` | Distribution/release channel references and operational ownership without embedding store/signing credentials. |
| `DELIV-PROFILE-012` | Analytics/diagnostic consent and configuration constrained by privacy, tenant scope, and accepted provider policy. |
| `DELIV-PROFILE-013` | Review/approval evidence for protected brand, domain, legal, privacy, capability, and compatibility changes. |
| `DELIV-PROFILE-014` | Emergency disable/suspension behavior that preserves records and provides a safe support/recovery route. |
| `DELIV-PROFILE-015` | Explicit exclusion of user passwords, session secrets, signing keys, store/provider credentials, and private tenant business data. |

## Shared and branded artifact lifecycle

| ID | Proposed control |
| --- | --- |
| `BRAND-CTRL-001` | Begin from an approved organization request and identify artifact purpose, intended tenant binding, owner, distribution ownership, and support obligation. |
| `BRAND-CTRL-002` | Validate brand/domain/application identity ownership and collisions before producing or activating an artifact. |
| `BRAND-CTRL-003` | Produce shared and branded artifacts from the same maintained application behavior and governed delivery configuration. |
| `BRAND-CTRL-004` | Keep signing identities, store credentials, provider credentials, and protected build authority outside tenant-editable profile data and generated client content. |
| `BRAND-CTRL-005` | Bind artifact identity to the intended delivery profile and supported product/client versions in observable release metadata. |
| `BRAND-CTRL-006` | Verify tenant routing, authorization equivalence, capability compatibility, branding, localization, privacy/legal metadata, and upgrade behavior before release. |
| `BRAND-CTRL-007` | Do not permit tenant-specific source changes; a needed behavior change enters the shared product and its normal governance. |
| `BRAND-CTRL-008` | Preserve attributable request, review, build, signing, submission, approval/rejection, release, suspension, and retirement states. |
| `BRAND-CTRL-009` | Make store/provider rejection or delay a delivery state, not a reason to fork security or business behavior. |
| `BRAND-CTRL-010` | Define support ownership for tenant configuration, product defects, store/distribution issues, credentials, certificates/domains, and customer communication. |
| `BRAND-CTRL-011` | Maintain release parity policy and observable exceptions; unsupported drift blocks protected operations according to compatibility policy. |
| `BRAND-CTRL-012` | Support rollback or emergency disable without reassigning tenant data or accepting incompatible local actions. |
| `BRAND-CTRL-013` | Treat analytics/crash diagnostics as tenant-scoped, privacy-governed data paths rather than unrestricted provider access. |
| `BRAND-CTRL-014` | Retirement removes routing/distribution according to policy while preserving business records, audit meaning, and controlled customer transition. |
| `BRAND-CTRL-015` | One organization may have several approved artifacts/surfaces, but each has explicit identity, purpose, profile, version, and support state. |

## Client and configuration compatibility

| ID | Proposed control |
| --- | --- |
| `COMPAT-CTRL-001` | Every protected client operation identifies client release, surface/artifact identity, delivery-profile version, configuration/policy version, and supported capability set as required. |
| `COMPAT-CTRL-002` | The trusted boundary evaluates current compatibility; the client cannot declare itself supported. |
| `COMPAT-CTRL-003` | Distinguish supported, update recommended, mutation restricted, security update required, expired, suspended, and unknown client states. |
| `COMPAT-CTRL-004` | Incompatible clients fail before protected mutation and provide a recoverable route for locally captured unsynchronized evidence. |
| `COMPAT-CTRL-005` | A profile/configuration rollout declares compatible release range, activation, rollback, and behavior when some devices remain offline. |
| `COMPAT-CTRL-006` | Backward-compatible server behavior never weakens current tenant, authorization, evidence, or business invariants for an old client. |
| `COMPAT-CTRL-007` | New optional capability is discoverable and safely absent on older clients; required capability blocks incompatible work explicitly. |
| `COMPAT-CTRL-008` | Offline operations preserve the versions under which they were captured and are revalidated against current policy rather than silently reinterpreted. |
| `COMPAT-CTRL-009` | Upgrade or local-state conversion is interruption-safe, recoverable, and proven against pending operations/media before acceptance. |
| `COMPAT-CTRL-010` | Shared and branded artifacts use the same compatibility rules and business meanings even when distribution timing differs. |
| `COMPAT-CTRL-011` | Deprecation names owner, affected artifacts/tenants, notice, support window, security exception, migration/recovery path, and end behavior. |
| `COMPAT-CTRL-012` | Operations can identify active versions, incompatible attempts, queued old-version work, failure rates, and release parity without reading tenant content. |

## Technician experience proposal

| ID | Proposed responsibility or boundary |
| --- | --- |
| `TECH-CTRL-001` | Present assigned crew, leader, site/equipment, safety/access, appointment, reported issue, and current working-set freshness before field action. |
| `TECH-CTRL-002` | Support arrival, inspection, diagnosis, proposed scope, approval state, performed activity, materials, tests, evidence, per-unit outcome, and follow-up as distinct capture steps. |
| `TECH-CTRL-003` | Preserve actual participants separately from planned crew and attribute authenticated actions to the acting identity. |
| `TECH-CTRL-004` | Show proposed, approved, performed, tested, declined, unresolved, failed, and pending meanings without collapsing them into completion. |
| `TECH-CTRL-005` | Allow multiple equipment units and mixed outcomes within one visit while retaining a visit summary. |
| `TECH-CTRL-006` | Make offline/queued/uploading/conflicted/rejected/available states visible so the crew does not leave believing evidence or work is synchronized when it is not. |
| `TECH-CTRL-007` | Require changed chargeable scope to follow the governed proposal/approval path; capture alone is not customer approval. |
| `TECH-CTRL-008` | Respect policy-driven checklists/photos/readings/signatures without allowing tenant configuration to weaken fixed safety/integrity rules. |
| `TECH-CTRL-009` | Represent no-access, unsafe, delayed, weather-blocked, customer-cancelled, incomplete, and follow-up outcomes explicitly with accountable next action. |
| `TECH-CTRL-010` | Keep broad customer, commercial, worker, inventory, audit, platform, and tenant-administration data outside the technician surface unless current duty requires it. |

## Customer experience proposal

| ID | Proposed responsibility or boundary |
| --- | --- |
| `CUST-CTRL-001` | Derive access from an explicit delegated relationship to customer/site/equipment/action, not from matching phone/email or possession of a generic link. |
| `CUST-CTRL-002` | Support household and company contacts with separate requester, viewer, payer, approver, owner, occupant, and site-contact scopes where accepted. |
| `CUST-CTRL-003` | Show only authorized requests, appointments, proposal revisions, work progress, equipment, evidence/documents, and communication. |
| `CUST-CTRL-004` | Bind approval to the exact proposal revision, acting identity/delegation, method, time, and evidence; changed scope requires a new governed decision. |
| `CUST-CTRL-005` | Distinguish appointment/work status, customer acknowledgment, external-payment evidence, payment verification, and settlement claims. |
| `CUST-CTRL-006` | Prevent exposure of internal notes, costs, unrelated contacts/sites/equipment, worker-private data, security/audit evidence, or other tenants. |
| `CUST-CTRL-007` | Treat forwarded, expired, reused, wrong-tenant, or wrong-recipient links as untrusted and require current bounded proof/authorization. |
| `CUST-CTRL-008` | Preserve revocation, dispute, correction, and prior attributable decisions without silently merging customer identities or relationships. |
| `CUST-CTRL-009` | Make unavailable, delayed, stale, rejected, and support-required states clear without inventing successful request, approval, payment, or completion. |
| `CUST-CTRL-010` | Apply the same secure business behavior in shared and branded customer artifacts regardless of presentation. |

## Notifications and deep links

| ID | Proposed control |
| --- | --- |
| `CLIENT-NOTIFY-001` | Preserve organization, purpose, recipient/context, channel, template/version, trigger, requested delivery time, and result. |
| `CLIENT-NOTIFY-002` | Evaluate current consent, preference, privacy, quiet period, authority, and sensitive-content rules before generation/delivery. |
| `CLIENT-NOTIFY-003` | Minimize lock-screen, email, message, and push content; avoid sensitive details when recipient/device assurance is insufficient. |
| `CLIENT-NOTIFY-004` | Deep links contain or reference only bounded, expiring continuation state and reauthorize at destination. |
| `CLIENT-NOTIFY-005` | Brand/domain/application routing failure does not fall through to another organization's content. |
| `CLIENT-NOTIFY-006` | Retry is idempotent and duplicate delivery does not duplicate business state. |
| `CLIENT-NOTIFY-007` | Delivery, read, click, or application open does not create approval, attendance, acceptance, paid, verification, or completion state. |
| `CLIENT-NOTIFY-008` | Expired, revoked, forwarded, wrong-recipient, incompatible-client, and deleted-record continuations fail safely with an appropriate recovery path. |
| `CLIENT-NOTIFY-009` | Notification provider identifiers and delivery evidence do not become customer identity or tenant authority. |
| `CLIENT-NOTIFY-010` | Channel/background behavior, consent, quiet periods, retry, delivery evidence, and sensitive-content policy remain blocked by `OPEN-035` and `OPEN-067`. |

## Threat and failure register

| ID | Threat or failure | Required treatment before architecture acceptance |
| --- | --- | --- |
| `FIELD-THREAT-001` | Client forges organization, branch, role, assignment, brand, hostname, or application identity | Server-authoritative context and negative tenant-path proof |
| `FIELD-THREAT-002` | Cached data from one tenant appears after tenant/account switch | Partition, clear, rebind, and negative cache/navigation tests |
| `FIELD-THREAT-003` | Revoked worker synchronizes old assignment changes | Current admission checks plus recoverable evidence quarantine |
| `FIELD-THREAT-004` | Retry duplicates activities, stock, claims, approvals, notifications, or files | Stable per-effect identity and replay proof |
| `FIELD-THREAT-005` | Concurrent office/field changes silently overwrite each other | Preconditions, conflict classification, preserved claims, and governed resolution |
| `FIELD-THREAT-006` | Device clock manipulates order, policy, or approval validity | Separate capture and trusted receipt/effective time |
| `FIELD-THREAT-007` | Local save or optimistic UI is mistaken for authoritative completion | Explicit provisional states and result acknowledgment |
| `FIELD-THREAT-008` | Partial batch/upload appears globally successful | Per-operation/media result and visible remaining obligations |
| `FIELD-THREAT-009` | Evidence URL/key/preview bypasses record authorization | Underlying-subject authorization and temporary-purpose bounds |
| `FIELD-THREAT-010` | Unsafe, active, mislabeled, oversized, or malformed content becomes available | Quarantine, validation, safety controls, and rejection/reconciliation |
| `FIELD-THREAT-011` | Receipt photo alone creates paid/settled meaning | Separate evidence, claim, verification, and external settlement meanings |
| `FIELD-THREAT-012` | Branded client drifts from shared security/business behavior | One maintained product, compatibility rules, parity evidence, and release governance |
| `FIELD-THREAT-013` | Domain/DNS/certificate collision routes presentation incorrectly | Verified ownership, collision prevention, lifecycle control, and safe failure |
| `FIELD-THREAT-014` | Deep/notification link is forwarded or opened under wrong tenant | Bounded continuation plus destination reauthorization |
| `FIELD-THREAT-015` | Signing/store/provider secret enters tenant config, build output, logs, or client | Separated privileged credential custody and leakage tests |
| `FIELD-THREAT-016` | Lost/shared/backup-restored device exposes working data | Minimized local scope, policy protection, revoke/cleanup, and incident evidence |
| `FIELD-THREAT-017` | Unsupported old client performs reinterpreted or weakened mutation | Trusted compatibility admission and fail-safe recovery |
| `FIELD-THREAT-018` | Weak network/storage/background limits lose capture silently | Durable local state, progress, recovery, storage checks, and target-device proof |
| `FIELD-THREAT-019` | Localization/accessibility error changes price, date, state, equipment, or instruction meaning | Accepted bilingual/usability corpus and semantic fidelity proof |
| `FIELD-THREAT-020` | Diagnostics/analytics expose private data across tenants/providers | Minimized tenant-scoped telemetry, purpose controls, and privacy/security review |

## Proposed architecture decision records

These are decision subjects for later owner review. None is an accepted ADR.

| ID | Decision subject | Current proposal direction | Confidence | Blocking evidence |
| --- | --- | --- | --- | --- |
| `FIELD-ADR-PROP-001` | Client surface boundaries | Distinct Admin, Management, Technician, Customer, organization web, and platform responsibilities over shared governed capabilities | `CONF-1` | `OPEN-002`, `OPEN-007`, target workflows |
| `FIELD-ADR-PROP-002` | Field working set | Assignment-scoped, minimized, versioned, expiring working set before any broad replica | `CONF-1` | `OPEN-059`, `OPEN-060`, `TP-CAND-002` |
| `FIELD-ADR-PROP-003` | Offline operation and conflict model | Provisional operation log with dependencies, idempotency, current admission, and explicit conflict/recovery states | `CONF-1` | `OPEN-021`, `OPEN-061`, `TP-CAND-002` |
| `FIELD-ADR-PROP-004` | Evidence/media lifecycle | Separate business metadata, content transfer, safety/quality, availability, attachment, replacement, and retention | `CONF-1` | `OPEN-028`, `OPEN-033`, `OPEN-062`, `TP-CAND-003` |
| `FIELD-ADR-PROP-005` | Device and local-data protection | Minimized tenant/subject/device-bound local state with expiry, revoke, loss, and cleanup controls | `CONF-1` | `OPEN-047`, `OPEN-063`, target platform evidence |
| `FIELD-ADR-PROP-006` | Tenant routing and custom domains | Verified authoritative mapping for presentation/routing followed by independent authorization | `CONF-1` | `OPEN-066`, `TP-CAND-006` |
| `FIELD-ADR-PROP-007` | Shared and branded artifact model | Shared generic plus optional branded artifacts from one maintained product and governed delivery profiles | `CONF-1` | `OPEN-003`, `OPEN-004`, `OPEN-065`, `TP-CAND-005` |
| `FIELD-ADR-PROP-008` | Client/release/profile compatibility | Explicit compatibility contract with fail-safe mutation blocking and offline-capture recovery | `CONF-1` | `OPEN-064`, release/support operating model |
| `FIELD-ADR-PROP-009` | Client notifications and navigation | Consent/privacy-aware delivery plus bounded deep-link continuation and destination authorization | `CONF-1` | `OPEN-035`, `OPEN-067`, provider choices |
| `FIELD-ADR-PROP-010` | Localization, accessibility, and field usability | One canonical business vocabulary rendered through accepted Myanmar/English and accessibility corpus | `CONF-1` | `OPEN-068`, `TP-CAND-004` |

## Technical-proof plans — execution closed

These plans define evidence needed later. They do not authorize prototypes, providers, test data,
devices, domains, stores, credentials, builds, or proof execution.

### `FIELD-TP-PLAN-001` — offline synchronization and revocation proof

| Field | Plan |
| --- | --- |
| Maps to | `TP-CAND-002`, `FIELD-ADR-PROP-002`, `FIELD-ADR-PROP-003` |
| Claim | Target field workflows survive accepted outages and retries without duplicate or unauthorized business effects. |
| Cases | Multi-worker assignment; offline inspection/work/evidence; office reschedule/reassignment/closure; membership revocation; stale policy; duplicate retry; missing dependency; stock/payment/evidence conflict; device/app interruption. |
| Required input | Accepted device matrix, offline duration/volume, action matrix, conflict owners, sync target, local protection, and recovery policy. |
| Evidence | Per-operation traces/results, authoritative record comparison, duplicate counts, conflict/rejection visibility, recovered evidence, local cleanup, tenant-negative tests. |
| Pass gate | No cross-tenant or unauthorized effect; no duplicate governed effect; every capture has an accepted, prior-result, pending, conflicted, rejected, or quarantined outcome within accepted limits. |

### `FIELD-TP-PLAN-002` — field media capture and evidence lifecycle proof

| Field | Plan |
| --- | --- |
| Maps to | `TP-CAND-003`, `FIELD-ADR-PROP-004` |
| Claim | Required photos/documents can be captured and finalized under target devices/networks without false availability or loss of business context. |
| Cases | Multiple photos, receipt, low light, orientation, large file, weak/lost network, restart/resume, duplicate retry, insufficient storage, denied permission, unsafe/mismatched content, replacement/redaction, expired local copy. |
| Required input | Evidence types/counts/quality/sizes, compression/transform rules, network/device matrix, scan/safety policy, retention and receipt-photo rules. |
| Evidence | Capture/transfer timings, resume behavior, quality results, state transitions, tenant/subject binding, rejection/quarantine, duplicate/orphan reconciliation, local/controlled-copy cleanup. |
| Pass gate | Required evidence meets accepted quality/time targets, retry is idempotent, unsafe/unfinalized content is unavailable, and no paid/complete state occurs before required evidence availability. |

### `FIELD-TP-PLAN-003` — shared and branded artifact parity proof

| Field | Plan |
| --- | --- |
| Maps to | `TP-CAND-005`, `FIELD-ADR-PROP-007`, `FIELD-ADR-PROP-008` |
| Claim | Shared maintained behavior can produce supported organization-branded artifacts with secure tenant binding and controlled parity. |
| Cases | Shared/generic and two branded profiles; brand/config change; wrong artifact/tenant; old client/new profile; staggered distribution; rejection; rollback; emergency disable; credential-leak inspection. |
| Required input | Target surfaces/platforms, store/signing ownership, release window, compatibility policy, build/review/support model, legal/privacy listings. |
| Evidence | Reproducible artifact/profile identity, equivalent authorization/business test results, secret exclusion, compatibility outcomes, parity report, rollback/retirement evidence. |
| Pass gate | No tenant/source fork, no secret leakage, wrong tenant/profile cannot authorize access, and supported artifacts preserve equivalent business/security behavior. |

### `FIELD-TP-PLAN-004` — subdomain and custom-domain routing proof

| Field | Plan |
| --- | --- |
| Maps to | `TP-CAND-006`, `FIELD-ADR-PROP-006` |
| Claim | Product subdomains and verified custom domains resolve intended presentation without becoming authorization. |
| Cases | Correct, unknown, ambiguous, conflicting, expired, suspended, removed, cached-old, wrong-certificate/domain, deep link, authenticated wrong-tenant user, and domain transfer. |
| Required input | Domain/DNS/certificate ownership, verification, renewal, collision, suspension, support, and routing-failure policy. |
| Evidence | Mapping lifecycle and audit, routing results, cache invalidation, certificate/DNS failure outcomes, cross-tenant negative tests, destination authorization results. |
| Pass gate | No ambiguous fallback or cross-tenant data effect; every invalid mapping fails safely; valid presentation still requires current tenant/record authorization. |

### `FIELD-TP-PLAN-005` — client compatibility, interruption, and recovery proof

| Field | Plan |
| --- | --- |
| Maps to | `FIELD-ADR-PROP-005`, `FIELD-ADR-PROP-008` |
| Claim | Version/profile/policy changes, upgrades, interruption, revocation, and device loss fail safely while preserving eligible unsynchronized capture. |
| Cases | Supported/old/unknown client, forced security update, profile activation/rollback, offline upgrade with queued operations/media, app crash, account switch, revoked device, lost device, low storage, cleanup failure. |
| Required input | Support/deprecation window, upgrade policy, device controls, local retention, recovery ownership, compatibility targets. |
| Evidence | Mutation admission results, capture recovery, conversion/rollback behavior, partition/cleanup tests, revocation latency, unsupported-client observability. |
| Pass gate | Incompatible mutation is blocked, eligible capture remains recoverable without cross-context attachment, and local tenant data meets accepted cleanup/revocation behavior. |

## Unresolved inputs and stop conditions

| ID | Required input | Stop condition |
| --- | --- | --- |
| `FIELD-IN-001` | Supported client surfaces, browser/OS/device/camera/storage/background matrix | Do not select client technology or promise compatibility without `OPEN-059`. |
| `FIELD-IN-002` | Offline duration, assignment/media volume, storage, sync-time, and degraded behavior | Do not select offline strategy or local-data shape without `OPEN-060`. |
| `FIELD-IN-003` | Per-action offline auto-apply/conflict/prohibit matrix and resolution owners | Do not accept synchronization/conflict behavior without `OPEN-021` and `OPEN-061`. |
| `FIELD-IN-004` | Evidence types/counts/metadata/quality/size/transform/safety/retention requirements | Do not select media/upload/storage architecture without `OPEN-028`, `OPEN-033`, and `OPEN-062`. |
| `FIELD-IN-005` | Device enrollment, protection, lock, backup/share, screen, revoke/wipe, and loss policy | Do not accept local sensitive-data handling without `OPEN-047` and `OPEN-063`. |
| `FIELD-IN-006` | Client support, compatibility, forced update, deprecation, and offline upgrade policy | Do not accept release architecture without `OPEN-064`. |
| `FIELD-IN-007` | Store/signing/release/support/legal/analytics ownership | Do not accept branded delivery architecture without `OPEN-003`, `OPEN-004`, and `OPEN-065`. |
| `FIELD-IN-008` | Domain/DNS/certificate/deep-link ownership and lifecycle policy | Do not accept tenant-routing architecture without `OPEN-066`. |
| `FIELD-IN-009` | Notification channels, consent, privacy, quiet period, background, retry, and evidence policy | Do not accept client notification behavior without `OPEN-035` and `OPEN-067`. |
| `FIELD-IN-010` | Myanmar/English, address, time/currency, accessibility, document, and field-usability corpus | Do not accept client experience fidelity without `OPEN-068`. |
| `FIELD-IN-011` | Performance, availability, recovery, upload, compatibility, scale, geography, budget, skill, and support targets | Do not select technologies/providers without `OPEN-038` through `OPEN-042`. |
| `FIELD-IN-012` | Authentication, customer delegation, data classification/masking, security response, and legal/privacy rules | Do not accept field/customer security or evidence exposure without applicable `OPEN-028`, `OPEN-030`, and `OPEN-045` through `OPEN-050`. |

## Architecture-artifact coverage

| Required artifact | WP-10 contribution | Still required |
| --- | --- | --- |
| `AR-ART-002` | Field/client/media/domain/artifact threat and failure register | Selected design threat model, abuse cases, independent security/privacy review, proof results |
| `AR-ART-007` | Working set, offline classes, operation envelope, state machine, sync controls, conflicts, device/recovery controls | Accepted action matrix, selected mechanism, executable design, `TP-CAND-002` evidence |
| `AR-ART-008` | Media states, controls, payment-evidence behavior, and field-environment evidence questions | Accepted limits/policy, selected storage/upload/safety design, `TP-CAND-003` evidence |
| `AR-ART-009` | Notification/deep-link boundary and idempotent delivery constraints | Integration/provider proposal, consent policy, selected retry/reconciliation design |
| `AR-ART-010` | Routing, delivery profile, branded lifecycle, compatibility, parity, support, and retirement controls | Accepted ownership/policy, selected build/domain/distribution design, `TP-CAND-005` and `TP-CAND-006` evidence |
| `AR-ART-012` | Device/network/media/offline/compatibility/localization/accessibility measurement questions | Numeric target matrix and accepted pass/fail measures |
| `AR-ART-013` | Ten proposed field/client ADR subjects at `CONF-1` with blockers | Alternatives, consequences, reversal cost, reviewers, evidence, and accepted decisions |
| `AR-ART-014` | Five bounded proof plans with claims, cases, inputs, evidence, and pass gates | Separate execution authorization, executable designs/environments, proof results |

## Recommended next package

After WP-10 owner acceptance and verified publication, the recommended next package is
`WP-11 Integration, Deployment, Resilience and Operations Architecture` for documentation and
architecture proposal only. It should connect notification/integration boundaries, deployment and
geography options, availability/degraded behavior, observability, incident response, backup,
restore, recovery, operational ownership, and cost/capacity inputs without selecting technologies
or executing proofs.

Architecture selection, technical-proof execution, application coding, dependencies, deployment,
external-system mutation, and live-data access must remain separately authorized gates.

## WP-10 acceptance criteria

WP-10 is ready for owner review when:

- client surfaces have distinct responsibilities over the same governed business capabilities and
  do not gain authority from presentation or distribution identity;
- offline scope is assignment-limited, minimized, expiring, attributable, provisional, and
  revalidated against current authority, assignment, state, policy, evidence, and consistency;
- local action, dependency, synchronization, retry, duplicate, conflict, rejection, quarantine,
  revocation, recovery, and cleanup meanings are explicit;
- evidence metadata, content, transfer, safety/quality, availability, business attachment,
  replacement, redaction, retention, and deletion are separated;
- mandatory external-payment receipt evidence preserves “no qualifying photo, no authoritative
  paid state” without claiming platform payment processing or settlement;
- weak network, device limitations, storage pressure, background restriction, multiple workers,
  lost devices, unsupported clients, and partial failures have visible safe outcomes;
- product/custom-domain routing and deep links never become tenant or record authorization;
- shared and optional branded artifacts use one maintained product behavior, governed delivery
  profiles, separated credentials, explicit compatibility, parity, support, and retirement;
- unresolved device, offline, media, security, store/signing, domain, notification, localization,
  accessibility, target, cost, skill, and operating inputs remain explicit stop conditions;
- proposed ADRs, threats, artifact coverage, and unexecuted proof plans trace to the governing
  baseline; and
- no architecture, technology, provider, client framework, local database, media/storage, build,
  signing, store, domain, certificate, or deployment approach is selected; no proof is executed;
  and no application code, dependency, publication, deployment, live-data access, or external
  change occurs.

## Acceptance record

The owner accepted WP-10 and authorized publication on 2026-09-30. This acceptance freezes the
field/offline/evidence/client-delivery proposal baseline while every `FIELD-ADR-PROP-*`, option,
open question, proof plan, and unresolved input retains its recorded non-final status. It does not
accept an architecture or ADR, select a client, local-data, synchronization, media, build, signing,
store, domain, certificate, notification, analytics, or deployment technology, execute a proof,
access or mutate data, or authorize application coding, dependencies, deployment, or
external-system changes.
