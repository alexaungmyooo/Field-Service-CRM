# Security, Tenancy, Identity and Access Architecture

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — WP-08 proposal baseline; conceptual proposals remain Proposed |
| Work package | `WP-08 Security, Tenancy, Identity and Access Architecture` |
| Owner | Aung Myo Oo |
| Last updated | 2026-09-30 |
| Architecture selection | Not authorized |
| Technical-proof execution | Not authorized |
| Application coding | Not authorized |
| Deployment | Not authorized |

## Purpose

Propose a technology-neutral security architecture for a multi-tenant field-service platform. The
proposal explains how identities and authority relationships remain separate, how organization
context and resource scope constrain every operation, how platform support enters a tenant boundary,
how privileged actions and security evidence are controlled, and what later proofs must establish.

Every `SEC-PROP-*` record in this document is **Proposed** at `CONF-1`. It may guide later analysis
but is not an accepted architecture decision and cannot authorize implementation.

## Authorized scope

- tenant security and authority boundaries;
- human, customer, platform, support, and machine identity relationships;
- authentication, session, recovery, and revocation concerns;
- server-resolved organization and authorization context;
- role, permission, scope, record, state, sensitivity, purpose, and policy evaluation;
- platform organization discovery and controlled support access;
- customer delegation and membership separation;
- offline, evidence, export, reporting, integration, and background-work access implications;
- security/audit evidence and privileged investigation boundaries;
- threat/abuse cases, conceptual controls, and technical-proof plans.

## Explicit non-scope

- accepting a final security, tenancy, identity, or authorization architecture;
- selecting an identity provider, policy engine, authentication library, database, cloud, key
  service, monitoring product, or deployment topology;
- defining executable tokens, claims, wire protocols, APIs, schemas, tables, services, migrations,
  secrets, or infrastructure configuration;
- fixing authentication factors, credential rules, token lifetimes, retention periods, or
  vulnerability-response times before owner/security review;
- executing penetration tests, isolation tests, prototypes, benchmarks, or technical proofs;
- application code, dependencies, deployment, live-data access, or third-party configuration.

## Governing baseline

This proposal elaborates but does not replace:

- `ARC-C-001`, `ARC-C-002`, `ARC-C-011` through `ARC-C-018`, and `ARC-C-020`;
- `TB-01` through `TB-05`, `TB-07`, and `TB-09`;
- `CAP-ORG`, `CAP-IAM`, `CAP-PLATFORM`, `CAP-AUDIT`, `CAP-DOC`, `CAP-CX`,
  `CAP-INTEGRATE`, and `CAP-DELIVERY`;
- `SR-ORG-001` through `SR-ORG-016`, `SR-SEC-001` through `SR-SEC-005`,
  `SR-PRIV-002`, `SR-AUD-005`, `SR-AUD-006`, `SR-DOC-001` through `SR-DOC-003`,
  `SR-OFFLINE-001` through `SR-OFFLINE-005`, `SR-INTEGRATE-003`,
  `SR-INTEGRATE-005`, and `SR-DELIVERY-004`, `SR-DELIVERY-007`,
  `SR-DELIVERY-010`, `SR-DELIVERY-015`, `SR-DELIVERY-016`;
- `ADR-CAND-001` through `ADR-CAND-003`, `ADR-CAND-013`;
- `TP-CAND-001`, `TP-CAND-009`, `SHORT-002`, and `SHORT-003`;
- unresolved `OPEN-008`, `OPEN-011`, `OPEN-013`, `OPEN-021`, `OPEN-028`,
  `OPEN-030`, `OPEN-032`, `OPEN-038` through `OPEN-043`, and `OPEN-045` through
  `OPEN-050`.

## Security objectives

| ID | Objective | Governing trace |
| --- | --- | --- |
| `SEC-OBJ-001` | Prevent one organization from reading, changing, linking, inferring, exporting, receiving, or synchronizing another organization's private data. | `ARC-C-001`, `SR-ORG-001`, `TB-02` |
| `SEC-OBJ-002` | Keep platform authority, tenant membership, customer delegation, worker participation, support access, and machine authority distinct. | `ARC-C-002`, `SR-ORG-007`, domain invariants 3–6 |
| `SEC-OBJ-003` | Make every allow/deny/elevate decision attributable and explainable from authoritative facts and policy. | `SR-SEC-003`, `BR-AUD-007` |
| `SEC-OBJ-004` | Deny operations when organization, subject, resource, permission, or purpose context is absent, inconsistent, expired, or unverifiable. | `SR-SEC-001`, `SR-SEC-004` |
| `SEC-OBJ-005` | Limit compromise impact through least privilege, short-lived elevation, revocation, separation of duties, and bounded data exposure. | `SR-ORG-009`, `SR-ORG-013`, `SR-PRIV-002` |
| `SEC-OBJ-006` | Apply equivalent authorization across Admin, Management, Technician, Customer, shared-domain, custom-domain, and branded experiences. | `ARC-C-011` through `ARC-C-013`, `SR-DELIVERY-015` |
| `SEC-OBJ-007` | Preserve authorization and tenant isolation for background, search, file, report, export, notification, integration, cache, and offline paths. | `SR-ORG-014`, `OPT-DEP-RULE-001` |
| `SEC-OBJ-008` | Protect evidence and documents according to their tenant, subject, sensitivity, lifecycle, and underlying business authority. | `ARC-C-015`, `SR-DOC-001` through `SR-DOC-003` |
| `SEC-OBJ-009` | Permit platform support only through explicit, temporary, purpose-limited, reviewable grants. | `ARC-C-002`, `SR-ORG-012`, `SR-ORG-013` |
| `SEC-OBJ-010` | Preserve useful security and audit evidence without turning logs or support diagnostics into a privacy or cross-tenant data channel. | `SR-DATA-005`, `SR-AUD-005`, `SR-AUD-006` |
| `SEC-OBJ-011` | Fail offline synchronization safely after membership, assignment, policy, or tenant context changes while retaining recoverable user evidence. | `SR-OFFLINE-001` through `SR-OFFLINE-005` |
| `SEC-OBJ-012` | Make high-risk claims testable through negative isolation, policy coverage, revocation, support, and audit proof plans before selection. | `TP-CAND-001`, `TP-CAND-009`, `RISK-AR-002` |

## Authority subject model

An authenticated principal is not automatically an authorized business actor. Authority comes from
one or more explicit relationships evaluated for the requested operation.

| ID | Subject or relationship | Authority meaning | Must not imply |
| --- | --- | --- | --- |
| `SEC-SUBJ-001` | Human identity | Authenticated person with assurance and session context | Organization membership, worker status, customer delegation, or platform role |
| `SEC-SUBJ-002` | Organization membership | Time-bounded relationship between one human identity and one organization with roles/scopes | Authority in another membership or ownership of the worker's historical acts |
| `SEC-SUBJ-003` | Worker | Person participating in tenant operations, with or without login identity | Login authority merely because the worker exists or is assigned |
| `SEC-SUBJ-004` | Customer/delegate relationship | Authority for a person to view or act for defined customer accounts, sites, equipment, or actions | Tenant staff membership or access to all records sharing contact details |
| `SEC-SUBJ-005` | Platform role assignment | Authority over named platform-control functions and bounded organization metadata | Tenant membership or routine private operational-data access |
| `SEC-SUBJ-006` | Support-session grant | Temporary authority for named platform actor, case, organization, purpose, records/actions, mode, and time | Permanent tenant role, silent impersonation, or authority outside the grant |
| `SEC-SUBJ-007` | Machine/workload identity | Non-human principal for one trusted workload or integration with explicit purpose and allowed operations | Human authority, unrestricted tenant access, or reuse across unrelated workloads |
| `SEC-SUBJ-008` | External principal/source | Identified outside system, provider, import, link recipient, or webhook sender | Internal identity, tenant context, correctness, or authorization without controlled mapping |

### Authority invariants

| ID | Invariant |
| --- | --- |
| `SEC-INV-001` | One human identity may hold several organization memberships, but one operation uses one explicit organization context unless a separately accepted platform-control operation is inherently cross-organization. |
| `SEC-INV-002` | A membership, customer delegation, platform role, support grant, and machine grant has its own lifecycle and revocation meaning. |
| `SEC-INV-003` | Removing access never deletes historical actor, worker, approval, participation, or audit attribution. |
| `SEC-INV-004` | A worker record may exist without login authority; authenticated actions identify the acting identity and, where relevant, the worker represented. |
| `SEC-INV-005` | A customer contact match, email, phone number, domain, application brand, hostname, link, or external identifier is never sufficient authorization. |
| `SEC-INV-006` | Platform Super Admin is not an unrestricted tenant-data browsing role. Platform-control actions and tenant-data access use different authority paths. |
| `SEC-INV-007` | A support session never changes the support actor into a tenant worker or member and cannot outlive its case, scope, mode, or expiry. |
| `SEC-INV-008` | Roles may group permissions, but resource ownership, tenant, branch/assignment scope, sensitivity, lifecycle state, purpose, and separation-of-duty rules still apply. |
| `SEC-INV-009` | Tenant configuration may make controls stronger but cannot weaken fixed tenant isolation, privileged-access, audit, secret, or platform security constraints. |
| `SEC-INV-010` | Resource references are resolved and checked within authoritative tenant context; possession or guessability of an identifier grants nothing. |
| `SEC-INV-011` | Derived views, files, caches, search results, notifications, exports, and logs cannot expose broader scope than their governed source records. |
| `SEC-INV-012` | Machine identities do not share human credentials and cannot infer tenant context from untrusted payload alone. |

## Trust-boundary elaboration

| Boundary | Principal risks | Proposed control direction | Required later evidence |
| --- | --- | --- | --- |
| `TB-01` client to trusted boundary | Forged tenant/role/branch/record, stolen session, modified client, unsafe link | Authenticate subject, resolve authority server-side, validate intent/resource, minimize client trust, bind sensitive continuations to purpose | Hostile-client and session misuse cases; `QR-SEC-001` targets |
| `TB-02` organization to organization | Direct lookup, search leakage, cache mix-up, file URL reuse, export/report/background leakage | Explicit organization context, resource-tenant match, scoped query/write boundary, deny missing context, negative cross-path tests | `TP-CAND-001` plan and execution under later gate |
| `TB-03` platform to tenant | Admin role used as universal data access, silent impersonation, unbounded troubleshooting | Separate platform-control authority, controlled support grant, read-only default, expiry, elevation, notice/review policy | Support abuse cases and accepted `OPEN-008`/`OPEN-013` |
| `TB-04` online to offline | Stale assignment, revoked member, device loss, cached data spill, replay/duplicate effects | Minimal assignment-scoped working set, protected local state, authorization lease, sync revalidation, conflict/recovery path | `OPEN-021`, `OPEN-047`, `TP-CAND-002` |
| `TB-05` operational record to evidence | Guessable object reference, reusable URL, orphan file, unsafe content, overbroad preview/export | Authoritative evidence metadata, subject-derived authorization, short-purpose delivery, scan/status controls, lifecycle reconciliation | Media threat model and `TP-CAND-003` |
| `TB-07` shared product to branded delivery | Malicious/misconfigured tenant binding, credential leak, stale build, deep-link crossover | Treat delivery identity as hint, verify tenant and compatibility, keep secrets outside tenant config, enforce identical backend policy | `TP-CAND-005`, `TP-CAND-006` |
| `TB-09` ordinary to privileged/audit operation | Privilege escalation, log tampering, secret exposure, export/delete misuse, investigation overreach | Separate permission and purpose, step-up/elevation, dual control where accepted, append/protected evidence, scoped investigation | Accepted risk matrix and independent security review |

## Identity lifecycle proposal

| ID | Lifecycle concern | Proposed behavior | Status |
| --- | --- | --- | --- |
| `SEC-PROP-001` | Identity establishment | Record the identity's verification source and assurance separately from memberships and customer relationships. | Proposed `CONF-1` |
| `SEC-PROP-002` | Membership invitation | Bind invitation to intended organization, recipient, inviter, role/scope proposal, expiry, and single controlled acceptance path. | Proposed `CONF-1` |
| `SEC-PROP-003` | Membership activation/change | Require authoritative active state and auditable role/scope/branch changes before new authority is effective. | Proposed `CONF-1` |
| `SEC-PROP-004` | Suspension/revocation | Stop prohibited future sessions/actions and synchronization without removing prior attribution or worker history. | Proposed `CONF-1` |
| `SEC-PROP-005` | Customer linking/delegation | Establish explicit customer-account/site/equipment/action relationships; never auto-grant from a contact match alone. | Proposed `CONF-1` |
| `SEC-PROP-006` | Platform-role lifecycle | Use separately governed assignments with stronger assurance, review, expiry where appropriate, and no implicit tenant membership. | Proposed `CONF-1` |
| `SEC-PROP-007` | Recovery and identity change | Treat recovery, primary-identifier changes, factor reset, and ownership transfer as high-risk, attributable flows with policy-defined notice/delay/approval. | Proposed `CONF-1` |
| `SEC-PROP-008` | Machine identity lifecycle | Establish named owner, purpose, allowed tenant scope, credentials/trust basis, rotation, revocation, and usage evidence per workload/integration. | Proposed `CONF-1` |

Exact authentication methods, assurance levels, factors, recovery evidence, and lifecycle timing
remain blocked by `OPEN-045` through `OPEN-048`.

## Authentication boundary options

These options concern where human authentication responsibility sits. They do not select a vendor,
protocol, credential type, or final account model.

| ID | Option | Strengths | Costs and risks | Analysis status |
| --- | --- | --- | --- | --- |
| `IAM-OPT-01` | Use a managed identity boundary for primary human authentication while the product owns business authority relationships | Reduces direct credential handling; may provide mature factor, recovery, and threat controls | Provider fit, availability, cost, data residency, account linking, branded-surface behavior, and migration remain material | Retain for comparison; no provider selected |
| `IAM-OPT-02` | Operate human authentication and recovery fully within the product boundary | Maximum control over local workflows and data location | Highest credential, recovery, abuse, monitoring, patching, and security-operations burden | Retain as contrary comparison; current team fit unproven |
| `IAM-OPT-03` | Hybrid boundary supporting a common primary identity plus controlled enterprise federation where justified | Can serve small tenants and enterprise identity requirements without separate product semantics | Identity linking, assurance normalization, tenant discovery, support, logout/revocation, and complexity | Retain pending enterprise and first-market evidence |

Regardless of option, authentication establishes a principal; organization membership, customer
delegation, platform role, support scope, and resource authorization remain product-governed facts.

## Session, device, and recovery proposal

| ID | Proposed control | Required behavior | Blocked input |
| --- | --- | --- | --- |
| `SEC-PROP-009` | Session context | Associate a session with subject, authentication time/assurance, issuance source, current validity, security events, and bounded client/device context without treating a device label as identity. | `OPEN-045`, `OPEN-047` |
| `SEC-PROP-010` | Revocation | Permit identity, platform role, membership, customer delegation, support grant, device/session, and machine grant revocation to independently remove future authority. | Revocation target and latency in `QR-SEC-001` |
| `SEC-PROP-011` | Step-up | Require stronger recent assurance for policy-defined high-risk actions such as ownership, privileged role, credential, export, deletion, support elevation, secret, or recovery changes. | `OPEN-045`, `OPEN-046` |
| `SEC-PROP-012` | Recovery separation | Do not let ordinary tenant support or platform support silently satisfy account-recovery proof; record the recovery authority and evidence independently. | `OPEN-046` |
| `SEC-PROP-013` | Session switching | When one identity has several memberships, switch through an explicit organization selection and re-resolve authority; never merge permissions across memberships. | `OPEN-011`, `SR-ORG-008` |
| `SEC-PROP-014` | Sensitive continuation | Recheck current authority before approval, export, evidence access, privileged mutation, or synchronization even if navigation began under a valid earlier session. | Risk/action matrix under `OPEN-032` |
| `SEC-PROP-015` | Offline authorization lease | Treat cached field authority as bounded by assignment, tenant, subject, device/session, policy version, and expiry; synchronization uses current authoritative checks. | `OPEN-021`, `OPEN-047` |
| `SEC-PROP-016` | Compromise response | Support policy-driven session/grant invalidation, evidence preservation, investigation scope, and tenant/user notification without silently deleting history. | `OPEN-050` |

## Conceptual security context

The following is an information model for reasoning, not an API, token, claim set, database schema,
or implementation contract. Trusted behavior resolves authoritative values and treats client-supplied
values only as untrusted selection hints.

| ID | Context fact | Authoritative source expectation | Failure treatment |
| --- | --- | --- | --- |
| `SEC-CTX-001` | Operation/correlation identity | Trusted request or job boundary | Reject or quarantine effects that cannot be attributed/reconciled |
| `SEC-CTX-002` | Subject identity and subject type | Validated human, support, machine, or external trust boundary | Deny authenticated-only operations when absent/invalid |
| `SEC-CTX-003` | Authentication assurance and recency | Trusted authentication/session boundary | Deny or require accepted step-up for higher-risk action |
| `SEC-CTX-004` | Platform role assignments | Authoritative platform-control records | No platform action outside active assignment |
| `SEC-CTX-005` | Organization identity | Server-resolved membership, support grant, machine grant, or public unauthenticated context | Deny tenant operation when missing or inconsistent |
| `SEC-CTX-006` | Membership/customer/support/machine grant | Authoritative relationship with active state and validity | Deny when absent, revoked, expired, or wrong organization |
| `SEC-CTX-007` | Permissions and governed scopes | Effective policy from fixed constraints plus active grant/role/scope facts | Deny when action or record scope is not covered |
| `SEC-CTX-008` | Resource tenant, branch, assignment, owner, state, and sensitivity | Authoritative resource and related business records | Deny mismatch; never repair by silently changing tenant context |
| `SEC-CTX-009` | Purpose/support case/business action | Requested action plus accepted purpose or case where required | Deny privileged or purpose-limited access without valid purpose |
| `SEC-CTX-010` | Policy/configuration versions | Trusted platform and tenant policy sources | Use safe current policy; block when compatibility cannot be established |
| `SEC-CTX-011` | Client/delivery/device/network hints | Untrusted or risk-supporting context | Never use alone to grant; may restrict, challenge, or add evidence |
| `SEC-CTX-012` | Decision/result and reason code | Trusted authorization boundary | Record according to risk without leaking sensitive policy/resource facts |

### Context propagation rules

| ID | Rule |
| --- | --- |
| `SEC-CTX-RULE-001` | Resolve context at every trusted entry point, including interactive request, scheduled work, queue/message, file operation, report/export, notification, integration, webhook, and synchronization. |
| `SEC-CTX-RULE-002` | Carry immutable identifiers for the acting subject, effective organization, authority relationship, purpose, and operation; do not carry an unverified client role as authority. |
| `SEC-CTX-RULE-003` | A downstream boundary revalidates facts needed for its action and rejects missing, stale, malformed, or cross-tenant context. |
| `SEC-CTX-RULE-004` | A resource lookup is constrained by organization before returning business content; a later authorization check does not excuse an unscoped lookup. |
| `SEC-CTX-RULE-005` | Creation stamps authoritative organization from trusted context, not from an unrestricted client field. |
| `SEC-CTX-RULE-006` | Cross-organization platform operations use an explicitly different platform-control path and never masquerade as tenant operations. |
| `SEC-CTX-RULE-007` | Retries preserve operation identity and original authority/purpose evidence but re-evaluate current validity when business effect occurs. |
| `SEC-CTX-RULE-008` | Logs, metrics, and traces may carry bounded correlation and tenant-security labels but minimize direct personal or business content. |

## Tenant-isolation enforcement proposal

`SEC-PROP-017` proposes defense in depth without selecting a database or physical tenancy pattern.
Every applicable path must satisfy all relevant layers below.

| Layer | Proposed responsibility | Failure outcome |
| --- | --- | --- |
| Trusted entry | Authenticate/identify the principal, classify operation, resolve organization and authority relationship | Deny or treat only as explicitly public operation |
| Authorization | Evaluate action, permission, scope, resource, state, sensitivity, purpose, policy, and separation of duties | Deny, require stronger assurance, or route to explicit approval; never silently widen |
| Resource access | Constrain reads/writes by authoritative organization and verify referenced resources belong to the same permitted context | Return no private content and record risk-appropriate denial evidence |
| Business integrity | Enforce cross-record tenant consistency for links, merges, imports, stock, evidence, notifications, and derived effects | Reject or enter explicit controlled resolution; never auto-reassign tenant ownership |
| Async propagation | Persist attributable operation/tenant/purpose context and validate it at consumption/effect time | Quarantine/fail safely; no default/global tenant fallback |
| Evidence/file delivery | Resolve metadata and underlying business authority before upload finalization, preview, download, export, replacement, or deletion | Deny; prevent reusable storage reference from becoming authority |
| Derived/read paths | Preserve source tenant and record scope in search, cache, dashboards, reports, indexes, and analytics | Omit unauthorized data; invalidate unsafe derived state |
| Audit/monitoring | Detect missing context, tenant mismatch, repeated denials, support/elevation misuse, and cross-boundary anomalies | Alert/escalate according to accepted policy without exposing tenant content |

### Path coverage matrix

| ID | Path | Mandatory tenant/authority evidence | Negative case required later |
| --- | --- | --- | --- |
| `TEN-PATH-001` | Interactive create/read/update | Subject, organization, active authority relationship, action, resource tenant/scope | Foreign identifier, forged organization, inactive membership |
| `TEN-PATH-002` | List/search/autocomplete | Organization and record scope applied before results/counts/facets | Query/count/timing leakage across tenant boundary |
| `TEN-PATH-003` | Background/scheduled work | Named machine/workload, origin/purpose, organization, allowed effect | Missing/default tenant, stale grant, replayed work |
| `TEN-PATH-004` | Queue/event/notification | Attributable origin, organization, recipient authority/consent, idempotency | Cross-tenant consumer state, wrong recipient, duplicate delivery |
| `TEN-PATH-005` | Evidence/file/object | Organization metadata, underlying subject, action, sensitivity/lifecycle | Reused URL/key, metadata mismatch, orphan object, unsafe preview |
| `TEN-PATH-006` | Dashboard/report/derived view | Source organization, branch/record scope, measure definition, viewer authority | Cached result reuse, hidden-row aggregation leakage |
| `TEN-PATH-007` | Export/import | Requester, organization, approved scope/purpose, source/provenance, output custody | Mixed-tenant file, guessed external ID, unauthorized field |
| `TEN-PATH-008` | Integration/webhook | Machine/external trust, source, mapped organization, purpose, signature/trust evidence | Payload-selected tenant, replay, wrong source mapping |
| `TEN-PATH-009` | Offline download/sync | Subject, organization, assignment, working set, policy/version, authorization lease | Revoked membership, changed assignment, foreign cached record |
| `TEN-PATH-010` | Platform organization directory | Platform role and metadata-purpose permission | Private tenant record appears in directory/search |
| `TEN-PATH-011` | Support session | Platform actor, case, target tenant, approved scope/mode, purpose, start/expiry | Tenant hopping, scope escalation, expired session, silent impersonation |
| `TEN-PATH-012` | Audit/security investigation | Restricted audit authority, tenant/case/purpose scope, evidence class | Ordinary admin edits or browses protected evidence |
| `TEN-PATH-013` | Backup/recovery/operations | Named operational authority, controlled procedure, environment/tenant scope, evidence | Restore into wrong tenant/environment or unreviewed browsing |

## Authorization decision proposal

`SEC-PROP-018` proposes one explainable decision contract across product surfaces. It does not
select whether policy is implemented in-process, through a policy component, or by a later
combination of trusted controls.

### Decision question

```text
May this subject, under this active authority relationship and organization context,
perform this action on this resource (or resource class), for this purpose,
given its scope, state, sensitivity, policy, assurance, and separation-of-duty constraints?
```

### Evaluation sequence

| ID | Evaluation | Deny or defer when |
| --- | --- | --- |
| `AUTH-CTRL-001` | Validate subject/session or machine/external trust | Missing, invalid, expired, revoked, or insufficient for the action |
| `AUTH-CTRL-002` | Resolve exactly one authority path for the operation | Ambiguous, mixed, or unintended platform/tenant/customer/support authority |
| `AUTH-CTRL-003` | Resolve effective organization context | Missing, inconsistent, or not covered by the authority path |
| `AUTH-CTRL-004` | Check organization and authority lifecycle | Tenant/membership/delegation/support/machine grant is restricted beyond the requested action |
| `AUTH-CTRL-005` | Check action permission/capability | No explicit effective permission; default is deny |
| `AUTH-CTRL-006` | Check branch/team/assignment/self/customer/record scope | Resource is outside every permitted scope |
| `AUTH-CTRL-007` | Match resource and related references to organization | Any record or relationship crosses tenant without separately accepted controlled behavior |
| `AUTH-CTRL-008` | Check resource lifecycle and business preconditions | State makes action invalid, requires reopening/approval, or would erase historical meaning |
| `AUTH-CTRL-009` | Check sensitivity, purpose, minimization, and channel | Purpose or delivery path does not justify the requested fields/evidence/action |
| `AUTH-CTRL-010` | Check separation of duties and prior participation | Same actor cannot initiate/approve/verify or lacks independent approval under effective policy |
| `AUTH-CTRL-011` | Check assurance, recency, session/device risk, and elevation | Accepted step-up or privileged grant is absent |
| `AUTH-CTRL-012` | Produce bounded decision and audit evidence | Decision cannot be explained or recorded at the risk-required level |

### Decision outcomes

| Outcome | Meaning |
| --- | --- |
| Allow | This exact action on this exact governed scope is permitted now; it grants no future or adjacent authority. |
| Deny | Action is not permitted. User-facing output must avoid confirming inaccessible resources or sensitive policy facts. |
| Stronger assurance required | Current identity/session proof is insufficient; successful step-up still requires the full decision again. |
| Independent approval required | Business/security policy requires a separately authorized actor or grant; the current actor is not provisionally allowed. |
| Controlled resolution required | Offline/conflict/lifecycle or data-integrity condition prevents automatic effect while recoverable evidence is retained. |

### Permission and scope vocabulary

| Dimension | Examples | Rule |
| --- | --- | --- |
| Action | view, create, assign, update, approve, verify, export, download, delete, administer, support | Use business-meaningful actions rather than one broad edit permission |
| Resource class | organization, membership, customer, job, evidence, stock, report, audit, delivery profile | Permission on one class does not imply linked-class access |
| Organization scope | one active tenant, platform-control metadata, one support target | Cross-tenant tenant-operation scope is denied by default |
| Operational scope | organization, branches, teams, assignments, self, delegated customer records, explicit records | Effective scope is the bounded union/intersection defined by accepted policy, never role title alone |
| Record conditions | state, owner, assignment, sensitivity, evidence class, project/contract relation | Must be resolved from authoritative records |
| Purpose | ordinary work, customer self-service, audit, support case, incident, export request | Required purpose narrows authority; it never widens base permission |
| Control condition | step-up, independent approval, dual control, notification, reason | Satisfying a condition does not bypass tenant/resource checks |

## Role and separation-of-duty proposal

Roles remain configurable permission bundles inside fixed security constraints. The following is a
responsibility analysis, not the accepted role-permission matrix required by `OPEN-032`.

| Responsibility family | Typical role holders | Security boundary |
| --- | --- | --- |
| Organization ownership | Organization Owner | Ownership transfer, last-owner removal, high-risk policy, and deletion/export authority require stronger controls than ordinary administration |
| Membership and configuration | Organization Administrator | Cannot create platform roles or weaken fixed tenant/security/audit constraints |
| Branch operations | Branch Manager, Dispatcher, Supervisor | Limited to permitted branches/teams/records; does not imply organization-wide evidence/export access |
| Commercial approval | Owner, Manager, Commercial Approver | Applies to exact proposal/revision/threshold and does not prove performed work or payment settlement |
| Field execution | Crew Leader, Technician/Helper | Limited to assigned/authorized work and evidence; assignment alone does not grant broad customer history |
| Stock custody | Storekeeper, authorized field custodian | Controlled locations/movements; cross-tenant movement prohibited |
| Payment-evidence review | Submitter and/or Payment-Evidence Verifier under tenant policy | Evidence capture, paid marking, and independent verification remain distinguishable |
| Audit/viewing | Tenant Auditor/Viewer | Purpose- and scope-limited read access; no ordinary mutation or security-evidence editing |
| Platform lifecycle | Platform Super Admin, Platform Operations | Organization control metadata and named lifecycle/operational functions; no routine tenant browsing |
| Tenant assistance | Platform Support under support grant | Case-bound temporary access, read-only by default, no password request or silent impersonation |
| Security investigation | Platform Security/Auditor under investigation authority | Restricted evidence access; does not imply ordinary tenant operational authority |

### Separation-of-duty candidates

| ID | Candidate control | Small-organization treatment | Enterprise treatment | Status |
| --- | --- | --- | --- | --- |
| `SOD-001` | Membership/role change versus approval | Owner may perform both with step-up and explicit evidence if accepted policy permits | Independent approver for privileged or bulk changes | Proposed; blocked by `OPEN-032` |
| `SOD-002` | Payment-evidence submission versus verification | Direct marking may be allowed by tenant policy | Separate verifier/reconciler | Product behavior accepted; exact risk thresholds open |
| `SOD-003` | Proposal/discount creation versus exceptional approval | Owner may combine roles within approved thresholds | Independent commercial approver above thresholds | Proposed; commercial thresholds open |
| `SOD-004` | Stock movement versus adjustment/reconciliation | Combined role may require reason/evidence | Independent review for high-value or discrepancy actions | Proposed; inventory policy open |
| `SOD-005` | Support request versus approval/elevation | Read-only low-risk case may use policy-defined approval | Independent approval/tenant notice for elevated/high-risk access | Proposed; blocked by `OPEN-008`, `OPEN-013` |
| `SOD-006` | Export/deletion request versus execution | Owner may request with step-up; execution/recovery window remains controlled | Dual control and independent review for broad or irreversible scope | Proposed; blocked by `OPEN-028`, `OPEN-040` |
| `SOD-007` | Security-event investigation versus audit-evidence alteration | Investigator may annotate a separate case | Protected evidence cannot be rewritten by investigator | Proposed |

`SEC-PROP-019` proposes configurable governance depth: small organizations may combine operational
responsibilities, but combining roles never removes tenant checks, step-up, attribution, explicit
reason, protected history, or any fixed independent-control rule later accepted for high-risk acts.

## Platform authority proposal

| ID | Platform function | Proposed accessible information | Explicit exclusion |
| --- | --- | --- | --- |
| `PLAT-AUTH-001` | Organization directory | Stable organization ID/name, lifecycle/commercial service state, owner/admin contact needed for service, bounded counts, delivery/release state, health/incidents/support cases | Ordinary customer, worker, job, stock, evidence, payment, document, or report content |
| `PLAT-AUTH-002` | Organization lifecycle | Provision/restrict/suspend/resume/cancellation controls and required platform evidence | Reassigning tenant data or becoming tenant owner/member |
| `PLAT-AUTH-003` | Delivery operations | Domain/application identity, compatible release, signing/distribution operational state | Tenant business records or tenant-editable exposure of credentials/secrets |
| `PLAT-AUTH-004` | Reliability operations | Service health, backup/recovery job metadata, environment/release diagnostics | Uncontrolled restore, browse, download, or tenant-content inspection |
| `PLAT-AUTH-005` | Support case | Case identity, tenant, requester, severity, purpose, status, assigned staff | Private operational records before an active support grant |
| `PLAT-AUTH-006` | Security/audit operations | Purpose-limited security events, support-access evidence, privileged change evidence, incident case | General operational browsing or ordinary business editing |

`SEC-PROP-020` proposes that each platform function have its own permission and evidence boundary.
The label “Super Admin” may group exceptional platform permissions but must not implement an
unlogged universal bypass of tenant authorization.

## Controlled support-session proposal

### Lifecycle

```text
Requested
  -> Approved or Rejected
  -> Active (read-only by default)
      -> Elevated for approved actions when separately granted
      -> Revoked, Expired, or Closed
  -> Reviewed when policy requires
```

| ID | Required support-session fact/control | Proposed meaning |
| --- | --- | --- |
| `SUP-CTRL-001` | Named case/incident and purpose | Access exists only to resolve the recorded need; generic curiosity/training is insufficient |
| `SUP-CTRL-002` | Named support actor | Shared support accounts and invisible impersonation are prohibited |
| `SUP-CTRL-003` | One target organization | Changing tenants requires a separate grant/evaluation; no tenant hopping inside one session |
| `SUP-CTRL-004` | Record/action scope | Grant identifies permitted resource classes, records/branches where applicable, and actions |
| `SUP-CTRL-005` | Mode | Read-only is default; mutation/export/identity/ownership/deletion/recovery require explicit elevated scope |
| `SUP-CTRL-006` | Requester/approver/tenant involvement | Captured according to accepted risk policy; unresolved rules remain visible |
| `SUP-CTRL-007` | Start, expiry, revocation, closure | Authority cannot continue past its bounded lifetime or explicit revocation |
| `SUP-CTRL-008` | Support-session indication | Trusted surfaces and audit evidence distinguish support activity from tenant-member activity |
| `SUP-CTRL-009` | Sensitive access/mutation evidence | Record risk-appropriate views/actions, decisions, reason, result, and affected scope without unsafe content duplication |
| `SUP-CTRL-010` | Independent elevation | High-risk access does not inherit merely because a read-only session exists |
| `SUP-CTRL-011` | Notification/review | Tenant/platform notification and later review follow accepted policy and cannot be silently skipped |
| `SUP-CTRL-012` | Emergency break-glass | Separately governed, time-limited, reasoned, alerted, and mandatorily reviewed; not ordinary support shortcut |

### Support modes

| Mode | Permitted concept | Prohibited without separate control |
| --- | --- | --- |
| Diagnostic metadata | Service/config/version/error metadata with minimized tenant content | Private record content, files, broad search/export |
| Read-only tenant support | Specifically approved records/fields for the case | Mutation, identity change, ownership transfer, export, deletion |
| Elevated corrective support | Exact approved corrective actions with stronger assurance/approval | Unrelated records/actions, permanent role, bulk access beyond grant |
| Emergency break-glass | Immediate bounded action when accepted emergency criteria are met | Continuing access after emergency, hidden use, absent review |

Exact approval, tenant notification, masking, view logging, retention, elevation, and emergency rules
remain blocked by `OPEN-008` and `OPEN-013`. `SUP-CTRL-*` records are minimum proposal constraints,
not acceptance of those unresolved policy choices.

## Customer identity and delegation proposal

Customer access must represent relationships, not assume that a contact detail owns every record
where it appears.

| ID | Proposed control | Security meaning |
| --- | --- | --- |
| `CUST-AUTH-001` | Separate human identity from customer account/contact | Authentication does not auto-create authority over a matching customer/contact record |
| `CUST-AUTH-002` | Explicit delegated relationship | Grant identifies customer account and, when needed, sites, equipment, documents, actions, role, validity, and grant source |
| `CUST-AUTH-003` | Relationship-specific actions | Requester, viewer, payer, approver, owner, occupant, facilities manager, and site contact may have different permissions |
| `CUST-AUTH-004` | Controlled invitation/claim | Linking uses accepted proof and conflict treatment; ambiguous or reused email/phone cannot silently merge authority |
| `CUST-AUTH-005` | Organization separation | A customer identity interacting with several service organizations has separate delegated relationships and contexts |
| `CUST-AUTH-006` | Minimized view | Customer surface exposes only permitted customer/site/equipment/work/evidence fields and avoids internal notes, costs, worker data, or unrelated contacts |
| `CUST-AUTH-007` | Approval attribution | Customer approval records exact acting identity/delegation, revision/scope, method, time, and evidence; view access alone is not approval authority |
| `CUST-AUTH-008` | Revocation/dispute | Tenant or authorized customer action may suspend/revoke delegation while preserving prior attributable decisions and dispute evidence |
| `CUST-AUTH-009` | Delegated organization actor | A company customer may authorize several people with different sites/actions; no single shared customer login is assumed |
| `CUST-AUTH-010` | Link/message safety | A notification or link establishes only a bounded continuation after current proof and authorization; forwarding must not widen access |

Identity proof, delegation eligibility, household/company authority, shared contacts, recovery, and
portable cross-provider equipment history remain blocked by `OPEN-006`, `OPEN-024`, `OPEN-025`,
`OPEN-030`, `OPEN-045`, and `OPEN-046`.

## Machine identity and external trust proposal

| ID | Proposed control | Required meaning |
| --- | --- | --- |
| `MACH-CTRL-001` | One named workload/integration identity per bounded purpose | Ownership, purpose, environment, allowed actions, and expected callers are reviewable |
| `MACH-CTRL-002` | Explicit tenant derivation | Tenant context comes from trusted scheduled configuration, governed mapping, or signed/validated relationship—not an arbitrary payload field |
| `MACH-CTRL-003` | Least privilege | Grant covers only required operations/resource classes and does not reuse platform or human superuser authority |
| `MACH-CTRL-004` | Credential/trust lifecycle | Establishment, storage, rotation, expiry, revocation, recovery, and compromise evidence are controlled outside ordinary tenant settings |
| `MACH-CTRL-005` | Replay/idempotency control | Repeated input cannot duplicate business effects or silently switch organization/purpose |
| `MACH-CTRL-006` | External mapping/provenance | External identity/identifier is source-qualified and organization-scoped; it grants no internal authority by itself |
| `MACH-CTRL-007` | Egress restriction | Workload can send only approved minimized content to an accepted destination under consent/privacy policy |
| `MACH-CTRL-008` | Usage evidence and anomaly detection | Calls/effects can be attributed, rate/behavior anomalies detected, and access revoked without losing business history |

Exact workload identities, external trust methods, secret handling, federation, and rotation targets
remain blocked by `OPEN-037`, `OPEN-048`, `QR-INTEGRATE-001`, and `QR-SEC-001`.

## Offline authorization proposal

| ID | Phase | Proposed control |
| --- | --- | --- |
| `OFF-AUTH-001` | Working-set preparation | Include only authorized assignment/customer/site/equipment/work/evidence context needed for permitted field tasks. |
| `OFF-AUTH-002` | Local protection | Bind cached state to organization, subject/worker, assignment, authorized client/device context, policy/version, and lifecycle; minimize sensitive data. |
| `OFF-AUTH-003` | Local action capture | Preserve acting identity, worker where different, organization, assignment/resource, operation identity, capture time, policy version, and evidence source. |
| `OFF-AUTH-004` | Local decision limits | Permit only explicitly offline-capable actions; do not simulate high-risk approvals, membership changes, support elevation, export, or deletion without accepted policy. |
| `OFF-AUTH-005` | Synchronization admission | Reauthenticate/re-establish trusted session as required and re-resolve active membership, assignment, resource tenant, current policy, and action permission. |
| `OFF-AUTH-006` | Conflict/revocation | Block authoritative effect when access is revoked, tenant mismatches, assignment expires, policy is stale, or conflict needs human resolution. |
| `OFF-AUTH-007` | Evidence recovery | Preserve user-captured evidence in a controlled quarantine/recovery path without attaching it to the wrong tenant/record or treating work as accepted. |
| `OFF-AUTH-008` | Device/session loss | Revoke future authority, protect/delete cached data according to accepted device policy, and retain security evidence needed for response. |

This proposal narrows access behavior but does not select an offline architecture or execute
`TP-CAND-002`.

## Evidence, export, reporting, and audit access

| ID | Area | Proposed access rule |
| --- | --- | --- |
| `DATA-AUTH-001` | Evidence/file | Authorize metadata and content through the underlying business subject plus evidence sensitivity, state, and requested action. |
| `DATA-AUTH-002` | Temporary delivery | Any temporary link or delivery grant is short-purpose, bounded, revocable where supported, and never becomes general record authority. |
| `DATA-AUTH-003` | Export | Treat selection, generation, storage, download, delivery, expiry, and deletion as one controlled chain with tenant/scope/purpose evidence. |
| `DATA-AUTH-004` | Report/dashboard | Apply record-level scope before measures/details; aggregated output must not reveal hidden tenants, branches, workers, customers, or sensitive categories. |
| `DATA-AUTH-005` | Search/cache | Partition and invalidate by authoritative security context; never reuse tenant/user results solely because a query or URL matches. |
| `DATA-AUTH-006` | Audit evidence | Protect from ordinary editing; separate tenant-audit, platform-audit, support, and security-investigation purposes and views. |
| `DATA-AUTH-007` | Logs/traces/diagnostics | Minimize direct personal/business content, protect access, record purpose, and avoid secrets/tokens/evidence bodies. |
| `DATA-AUTH-008` | Deletion/redaction | Require accepted authority/lifecycle policy, preserve required protected evidence, and prevent deletion from becoming a cross-tenant or history-erasing operation. |
| `DATA-AUTH-009` | Backup/recovery | Operational custody does not grant browsing authority; recovery is controlled, evidenced, and scoped to correct environment/tenant semantics. |

Field-level masking, download restrictions, audit views, retention, legal hold, and investigation
policy remain blocked by `OPEN-028`, `OPEN-040`, `OPEN-049`, and `OPEN-050`.

## Cross-cutting security control families

These are minimum proposal concerns, not selected products, algorithms, protocols, or configuration
values.

| ID | Control family | Proposed outcome | Unresolved evidence/target |
| --- | --- | --- | --- |
| `SEC-BASE-001` | Communication protection | Protect confidentiality, integrity, peer identity, and downgrade resistance across client, service, provider, administrative, and operational paths. | Supported clients/providers, geography, certificate/key operations, `QR-SEC-001` |
| `SEC-BASE-002` | Stored-data and key protection | Protect sensitive operational, evidence, audit, backup, offline, and credential material with separated key authority and controlled recovery. | Data classification, device/platform capability, backup/recovery model |
| `SEC-BASE-003` | Secret and credential handling | Keep secrets out of tenant configuration, source, logs, evidence, exports, diagnostics, and client bundles; control creation, access, rotation, revocation, and emergency recovery. | `OPEN-048`, provider/operations model, rotation targets |
| `SEC-BASE-004` | Input and output safety | Treat user, import, integration, filename, document, rich text, search, address, and provider data as untrusted; validate business shape and prevent executable/rendering interpretation. | Technical surfaces and content formats not selected |
| `SEC-BASE-005` | Media/file safety | Validate type/size/context, quarantine until accepted safety checks, prevent active-content execution, and reconcile rejected/orphaned content. | `QR-MEDIA-001`, required evidence types, scanning approach |
| `SEC-BASE-006` | Request integrity and replay defense | Protect state-changing and privileged actions from cross-context request forgery, replay, duplicated effect, stale continuation, and confused-deputy behavior. | Client/session/integration protocols and idempotency targets |
| `SEC-BASE-007` | Abuse and automation resistance | Detect and bound authentication, recovery, invitation, search, export, evidence, notification, integration, and public-request abuse without leaking tenant existence. | Volume/rate targets, actor risk, customer-access methods |
| `SEC-BASE-008` | Safe failure and error disclosure | Fail closed for security context while returning usable non-sensitive outcomes; never expose secrets, private record existence, internal topology, or unsafe diagnostics. | Product error taxonomy and support-diagnostic design |
| `SEC-BASE-009` | Configuration/change integrity | Review, version, validate, authorize, audit, and safely roll back security, role, domain, delivery, integration, and privileged operational configuration. | Change/release authority and environment model |
| `SEC-BASE-010` | Environment and data separation | Prevent production credentials/data from entering unauthorized development, test, support, analytics, or proof environments; clearly bind operations to environment. | Deployment topology, test-data policy, proof authorization |
| `SEC-BASE-011` | Vulnerability and supply-chain control | Inventory maintained components/artifacts, assess updates and disclosed weaknesses, protect build/release provenance, and define response/remediation evidence. | Technology stack, severity/response targets, release process |
| `SEC-BASE-012` | Detection, response, and recovery | Detect suspicious authentication, isolation, privilege, support, secret, export, integration, and evidence activity; contain, investigate, notify, recover, and review under accepted policy. | `OPEN-050`, `QR-OBS-001`, `QR-RECOVERY-001`, `QR-SEC-001` |

`SEC-PROP-022` proposes that later technical designs map every exposed surface and privileged
operation to these control families, with explicit owners and verification evidence. WP-08 does not
claim the controls are implemented or proven.

## Threat and abuse-case register

This is a product-level threat register, not a completed threat model or security test result.

| ID | Abuse or failure case | Affected boundary | Proposed prevention/detection direction | Required later evidence |
| --- | --- | --- | --- | --- |
| `THREAT-001` | Actor changes organization/record identifier to access another tenant | `TB-01`, `TB-02` | Server-resolved organization, scoped lookup, resource-tenant match, non-enumerating denial | Negative tests across `TEN-PATH-001`/`002` |
| `THREAT-002` | Query, count, facet, autocomplete, or timing reveals another tenant | `TB-02`, `TB-08` | Apply scope before result/aggregate, safe response behavior, bounded performance analysis | Search/report isolation proof |
| `THREAT-003` | Background job or message runs with missing/default/wrong tenant | `TB-02`, `TB-06` | Required immutable origin/tenant/purpose, consumer validation, quarantine, no global fallback | Async-path isolation tests |
| `THREAT-004` | File URL/key is reused across users or tenants | `TB-05` | Metadata/subject authorization per action, bounded delivery, storage reference not authority | Evidence access tests and lifecycle reconciliation |
| `THREAT-005` | Platform role silently browses private tenant data | `TB-03`, `TB-09` | Separate platform metadata path and support grant; no universal tenant bypass | Organization-directory and support negative tests |
| `THREAT-006` | Support actor expands scope, switches tenant, or continues after expiry | `TB-03`, `TB-09` | One-tenant grant, explicit scope/mode, current-time validation, revocation, visible evidence | Support state/scope/expiry proof |
| `THREAT-007` | Support or admin silently impersonates a tenant/customer | `TB-03` | Preserve actor and authority path; prohibit credential request/shared identity; distinct support indication | Audit-attribution review |
| `THREAT-008` | Membership revoked while session/offline client continues operating | `TB-01`, `TB-04` | Independent revocation, current checks at sensitive action/sync, bounded offline lease | Revocation-latency and offline-sync proof |
| `THREAT-009` | User combines memberships or cached contexts and links tenants | `TB-02`, `TB-04` | One explicit tenant per operation, context-bound cache, cross-record invariant | Multi-membership context-switch tests |
| `THREAT-010` | Customer gains access through matching/reused contact detail | `TB-01`, `TB-02` | Explicit delegation/claim proof, ambiguity resolution, separate tenant relationships | Customer-linking abuse cases |
| `THREAT-011` | Forwarded customer link reveals or permits sensitive action | `TB-01` | Bounded continuation, current identity/authority check, expiry/one-purpose treatment | Link-forwarding and replay tests |
| `THREAT-012` | Role grants more scope than intended or bypasses record state/SoD | `TB-09` | Explainable decision sequence, resource conditions, independent controls, policy coverage test | `TP-CAND-009` |
| `THREAT-013` | Recovery resets a privileged account under weak proof | `TB-01`, `TB-09` | Risk-based proof, notification/delay/dual control where accepted, revoke old sessions, audit | Accepted recovery policy and scenario tests |
| `THREAT-014` | Branded app/domain claims the wrong tenant or stale policy | `TB-01`, `TB-07` | Treat brand/host/app ID as hint, authoritative binding/compatibility, backend authorization | `TP-CAND-005`, `TP-CAND-006` |
| `THREAT-015` | Integration trusts payload tenant/external ID or replays effect | `TB-06` | Validate external trust, governed source mapping, organization-scoped IDs, replay/idempotency controls | Integration threat and reconciliation tests |
| `THREAT-016` | Report/export/cache mixes tenants or hidden record scopes | `TB-02`, `TB-08` | Source-scope preservation, cache partition/invalidation, export chain controls | Derived-data isolation and reconciliation tests |
| `THREAT-017` | Logs, metrics, traces, audit, or support diagnostics leak secrets/private content | `TB-09` | Data minimization, redaction, protected access, purpose/retention controls, secret exclusion | Logging corpus review and access tests |
| `THREAT-018` | Ordinary administrator alters/deletes security or audit evidence | `TB-09`, `TB-10` | Protected evidence boundary, append/correction semantics, separate audit authority | Tamper and privileged-access review |
| `THREAT-019` | Machine credential is reused across tenants/workloads or stolen | `TB-06`, `TB-09` | Purpose-specific identities, least privilege, rotation/revocation, anomaly detection, egress bounds | Machine-identity inventory and compromise drill plan |
| `THREAT-020` | Backup/restore or incident tooling exposes/restores data to wrong tenant/environment | `TB-03`, `TB-09`, `TB-10` | Controlled operational identity, environment/tenant validation, custody evidence, restore verification | `TP-CAND-008` and security review |

## Security and audit evidence proposal

Security evidence should answer who/what acted, under which authority, on which tenant/resource
scope, for what purpose, with what decision/result, while minimizing copied business content.

| ID | Event family | Minimum conceptual evidence | Access boundary |
| --- | --- | --- | --- |
| `AUD-EVT-001` | Authentication/session/recovery | Subject, event type, assurance/source, time, result/reason category, bounded client/risk context | Security operations; limited self/admin visibility by policy |
| `AUD-EVT-002` | Membership/delegation lifecycle | Organization/customer scope, subject, grantor/approver, roles/scopes, before/after, time, reason | Authorized tenant/security roles |
| `AUD-EVT-003` | Platform-role lifecycle | Platform subject, assignment/scope, grantor/approver, before/after, expiry, reason | Restricted platform security/audit |
| `AUD-EVT-004` | Authorization denial/elevation | Subject/authority path, tenant/resource class, action, decision/reason category, policy version, time | Security/audit; content minimized |
| `AUD-EVT-005` | Support session | Case, actor, target tenant, purpose, scope/mode, request/approval, start/expiry/closure, sensitive access/actions | Restricted support/security plus tenant view per accepted policy |
| `AUD-EVT-006` | Export/download/evidence access | Actor, tenant, subject/scope, action, purpose, result, output custody/expiry where applicable | Tenant audit/privacy/security by policy |
| `AUD-EVT-007` | Privileged mutation | Actor/authority, tenant/resource, exact action, before/after reference, reason, approval/elevation, result | Protected tenant/platform audit |
| `AUD-EVT-008` | Machine/integration use | Machine identity, owner/purpose, source, tenant mapping, operation/effect, result/retry/reconciliation | Platform operations/security and authorized tenant integration view |
| `AUD-EVT-009` | Offline synchronization | Subject/worker, tenant/assignment, operation IDs, capture/sync time, policy versions, decisions/conflicts/recovery | Tenant operational audit/security as applicable |
| `AUD-EVT-010` | Security incident/investigation | Incident/case, authority/purpose, evidence references, actions, containment, notification/review | Restricted security/privacy governance |
| `AUD-EVT-011` | Audit-evidence access/correction | Viewer/editor authority, case/purpose, scope, action, reason, preserved prior reference | Restricted audit-of-audit boundary |
| `AUD-EVT-012` | Backup/recovery/security operation | Operational actor/machine, environment/tenant scope, procedure, approvals, result/verification, custody | Restricted platform operations/security |

`SEC-PROP-021` proposes protected, queryable security evidence with policy-defined retention and
access separation. It does not select an audit store, immutability mechanism, log product, retention
period, or monitoring platform.

## Proposed architecture decision records

These are proposals for later owner/security review. They do not accept or replace the candidate
ADRs in WP-06.

| ID | Proposed decision subject | Proposal summary | Confidence | Acceptance blockers |
| --- | --- | --- | --- | --- |
| `ADR-PROP-001` | Subject and authority separation | Preserve identity, membership, worker, customer delegation, platform role, support grant, and machine identity as distinct concepts. | `CONF-1` | `OPEN-011`, `OPEN-030`, `OPEN-045` through `OPEN-048` |
| `ADR-PROP-002` | Security-context envelope | Resolve and propagate subject, authority path, organization, scope, purpose, policy, resource, and decision evidence at every trusted path. | `CONF-1` | Technical boundary proposal and `TP-CAND-001` |
| `ADR-PROP-003` | Authorization decision model | Use one explainable subject-action-resource-context decision contract with default deny and explicit elevation/approval outcomes. | `CONF-1` | `OPEN-032`, risk matrix, `TP-CAND-009` |
| `ADR-PROP-004` | Tenant enforcement | Require defense-in-depth organization constraints at entry, resource access, business integrity, async, evidence, derived, and audit layers. | `CONF-1` | Physical/logical tenancy option remains unselected; `TP-CAND-001` |
| `ADR-PROP-005` | Platform/support boundary | Separate platform-control metadata from tenant operations and require an expiring scoped support grant for private access. | `CONF-1` | `OPEN-008`, `OPEN-013`, independent security review |
| `ADR-PROP-006` | Customer delegation | Grant customer actions through explicit tenant-specific relationships and minimized resource/action scope. | `CONF-1` | `OPEN-006`, `OPEN-024`, `OPEN-025`, `OPEN-030` |
| `ADR-PROP-007` | Machine authority | Use purpose-specific least-privilege machine identities with explicit trusted tenant derivation and lifecycle evidence. | `CONF-1` | `OPEN-037`, `OPEN-048`, integration architecture |
| `ADR-PROP-008` | Security/audit evidence boundary | Protect and purpose-limit authentication, authorization, support, privileged, and incident evidence separately from ordinary business editing. | `CONF-1` | `OPEN-028`, `OPEN-040`, `OPEN-049`, `OPEN-050` |

No proposal selects `OPT-TEN-01` through `OPT-TEN-04`, `OPT-AUTH-01` or `OPT-AUTH-02`, or any
authentication, policy, storage, logging, cryptographic, or infrastructure product.

## Technical-proof plans — execution closed

The following plans define future evidence only. WP-08 does not create a prototype, test harness,
environment, dataset, credential, provider account, or executable security test.

### `SEC-TP-PLAN-001` — tenant-context non-bypass proof

| Field | Plan |
| --- | --- |
| Maps to | `TP-CAND-001`, `ADR-CAND-001`, `ADR-PROP-002`, `ADR-PROP-004` |
| Claim | No supported path can read, mutate, link, infer, deliver, export, or synchronize unauthorized cross-tenant data or effect. |
| Coverage | All `TEN-PATH-001` through `TEN-PATH-013`; direct IDs, relationships, counts, files, cache, reports, background, integration, offline, support, audit, restore |
| Negative cases | Missing tenant; forged tenant/branch/role; foreign direct/related ID; stale grant; default tenant; mixed batch; reused file reference; wrong cache key; replayed message; tenant switch |
| Evidence | Automated negative/positive results, control coverage matrix, logs/alerts, false-positive review, unresolved gaps, independent reviewer conclusion |
| Entry gate | Chosen architecture proposal, executable boundary, isolated non-customer environment, accepted test inventory/data handling |
| Pass gate | Every supported path has a positive owner test and negative foreign/missing/stale-context tests; no unexplained content/effect leakage |

### `SEC-TP-PLAN-002` — authorization expressiveness and consistency proof

| Field | Plan |
| --- | --- |
| Maps to | `TP-CAND-009`, `ADR-CAND-003`, `ADR-PROP-003` |
| Claim | The proposed policy model can consistently express organization, branch, assignment, self, customer delegation, record state/sensitivity, separation of duties, and support scope. |
| Coverage | Representative Admin, Management, Technician, Customer, platform directory, support, export, evidence, payment-verification, stock, and offline-sync actions |
| Cases | Allow, deny, step-up, independent approval, revoked/expired authority, multiple memberships, conflicting roles, exact-resource scope, small/enterprise governance depth |
| Evidence | Traceable decision table, automated policy conformance results, explanation/reason review, change-impact tests, latency target results after targets exist |
| Entry gate | Accepted `OPEN-032` matrix and risk controls; proposed technical policy boundary; accepted performance/security targets |
| Pass gate | Required cases are expressible without role-name shortcuts or tenant bypass, with consistent decisions across surfaces and reviewable reasons |

### `SEC-TP-PLAN-003` — support-session containment proof

| Field | Plan |
| --- | --- |
| Maps to | `ADR-CAND-003`, `ADR-CAND-013`, `ADR-PROP-005` |
| Claim | Platform actors cannot access private tenant data without a valid one-tenant support grant and cannot exceed scope, mode, purpose, or lifetime. |
| Coverage | Directory versus tenant data, request/approval, read-only, elevated action, tenant switch, expiry, revocation, closure, notification, evidence, break-glass |
| Evidence | State/scope tests, forced expiry/revocation, negative tenant-switch cases, actor attribution, audit review, security reviewer conclusion |
| Entry gate | Accepted `OPEN-008`/`OPEN-013` policy and executable support boundary |
| Pass gate | No universal bypass; every sensitive support effect identifies true actor/grant/case/tenant/purpose and invalid grants fail closed |

### `SEC-TP-PLAN-004` — revocation and offline containment proof

| Field | Plan |
| --- | --- |
| Maps to | `TP-CAND-002`, `ADR-CAND-005`, `SEC-PROP-010`, `SEC-PROP-015` |
| Claim | Membership, assignment, delegation, support, session, or machine revocation prevents prohibited future effects within accepted targets, including delayed/offline work. |
| Coverage | Active session, queued action, cached read, evidence upload, synchronization retry, changed branch/assignment, device loss, recovery quarantine |
| Evidence | Revocation-timing results, stale-context denial, duplicate-effect checks, recoverable-evidence review, audit/alert evidence |
| Entry gate | Accepted `OPEN-021`, `OPEN-047`, revocation targets, and authorized offline proof environment |
| Pass gate | Prohibited effects are blocked within target and recoverable evidence cannot attach to the wrong tenant/resource or become accepted work automatically |

## Unresolved inputs and stop conditions

| ID | Required input | Governing questions | Stop condition |
| --- | --- | --- | --- |
| `SEC-IN-001` | Actor authentication assurance and step-up matrix | `OPEN-045`, `QR-SEC-001` | No authentication boundary or factor policy acceptance |
| `SEC-IN-002` | Recovery, identity-change, ownership-transfer, and compromise policy | `OPEN-046`, `OPEN-050` | No privileged recovery architecture acceptance |
| `SEC-IN-003` | Session/device/offline lifetime and revocation targets | `OPEN-047`, `OPEN-021`, `QR-OFFLINE-001`, `QR-SEC-001` | No session/offline authority acceptance or revocation proof |
| `SEC-IN-004` | Role-permission, record scope, and separation-of-duty matrix | `OPEN-032` | No authorization architecture acceptance or `TP-CAND-009` execution |
| `SEC-IN-005` | Support approval, notification, masking, logging, elevation, and break-glass policy | `OPEN-008`, `OPEN-013` | No support architecture acceptance or support proof |
| `SEC-IN-006` | Customer identity, delegation, shared-contact, and relationship authority rules | `OPEN-006`, `OPEN-024`, `OPEN-025`, `OPEN-030` | No customer-access architecture acceptance |
| `SEC-IN-007` | Data sensitivity, masking, export/download, retention, legal hold, and deletion policy | `OPEN-028`, `OPEN-040`, `OPEN-049` | No field/evidence/audit/data lifecycle architecture acceptance |
| `SEC-IN-008` | Machine workloads, integrations, external trust, and secret lifecycle | `OPEN-037`, `OPEN-048` | No machine-identity or integration-security acceptance |
| `SEC-IN-009` | Security detection, incident, tenant notification, evidence access, and retention | `OPEN-050`, `QR-OBS-001`, `QR-SEC-001` | No security-operations/audit architecture acceptance |
| `SEC-IN-010` | Geography, provider availability, team skills, budget, volumes, and independent-review authority | `OPEN-038`, `OPEN-039`, `OPEN-041` through `OPEN-043` | No technology/vendor selection, final scoring, or accepted security architecture |

## Architecture-artifact coverage

| Artifact | WP-08 contribution | Remaining work |
| --- | --- | --- |
| `AR-ART-002` | Trust-boundary elaboration and twenty product-level threat/abuse cases | Detailed threat model, risk rating, control ownership, vendor/deployment threats, independent review |
| `AR-ART-005` | Subject/authority model, identity lifecycle, security context, authorization sequence, platform/support, customer delegation, sessions, machine authority | Accepted policy matrices, technical boundaries, protocols, executable controls |
| `AR-ART-006` | Tenant-path coverage, evidence/export/report/audit access, lifecycle dependencies | Full data classification, retention/deletion/legal-hold, physical/logical tenancy and migration model |
| `AR-ART-013` | Eight proposed ADR subjects with blockers and confidence | Consequences, reversal cost, chosen alternatives, owner/security acceptance |
| `AR-ART-014` | Four bounded proof plans with claims, coverage, evidence, entry/pass gates | Authorization and execution of proofs; environments and results |

## Recommended next package

After WP-08 owner acceptance and verified publication, the recommended next package is
`WP-09 Data Ownership, Lifecycle and Consistency Architecture` for documentation and architecture
proposal only. It should elaborate `AR-ART-004`, `AR-ART-006`, operational/evidence ownership,
transactional boundaries, cross-record tenant invariants, retention/export/deletion, inventory and
equipment identity consistency, derived data, correction/reversal, and migration/reconciliation
risks.

WP-09 should not select a database, storage product, service topology, migration technology, or
final architecture, execute proofs, add dependencies, create application code, or deploy unless the
owner separately changes those gates.

## WP-08 acceptance criteria

WP-08 is ready for owner review when:

- identity, membership, worker, customer delegation, platform role, support grant, machine identity,
  and external principal remain distinct;
- tenant and authorization context is explicit across all thirteen interactive/non-interactive
  path classes and missing/mismatched context fails closed;
- authorization evaluates subject, authority path, organization, action, resource, scope, state,
  sensitivity, purpose, policy, assurance, and separation of duties rather than role name alone;
- platform metadata access does not become routine tenant-data access, and support is scoped,
  expiring, attributable, read-only by default, and separately elevated;
- customer delegation, offline revocation, evidence/file access, reports/exports, integrations,
  machine identities, audit evidence, and backup/recovery implications are represented;
- cross-cutting communication, stored-data, secret, input/media, replay, abuse, failure,
  configuration, environment, vulnerability, detection, response, and recovery concerns are explicit;
- threats, controls, audit evidence, proposed ADRs, unresolved inputs, and proof plans are traceable;
- all conceptual proposals retain Proposed `CONF-1` status and name their acceptance blockers; and
- no architecture or technology is selected, no proof is executed, and no code, dependency,
  publication, deployment, live-data access, or external-system change occurs.

## Acceptance record

The owner accepted WP-08 and authorized publication on 2026-09-30. This acceptance freezes the
security/tenancy/identity/access proposal baseline while every `SEC-PROP-*`, `ADR-PROP-*`, option,
open question, proof plan, and unresolved input retains its recorded non-final status. It does not
accept an architecture or ADR, select a provider or technology, execute a proof, or authorize
application coding, dependencies, deployment, or external-system changes.
