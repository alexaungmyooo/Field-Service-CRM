# Authorization, Identity and Support Policy Baseline

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — exact publication authorized |
| Work package | `WP-99 Authorization, Identity and Support Policy Baseline` |
| Owner | Aung Myo Oo |
| Governing sequence | `DEC-233`, `WP98-SEQ-001` — Accepted |
| Published WP-98 revision | `152c23ef1aed636aa7a7f07e2f86b7403b438cfb` |
| Repository tree | `ae3971f25dd60dfac2f7cedfbb41b0d9ab3c38bd` |
| Proof tree | `1e9f75fdc1b221009bc691f54d24ca63f02c8038` |
| Governing decision | `DEC-234` — Accepted |
| Architecture/provider/dependency selection | Not authorized |
| Proof preparation/execution/application coding | Not authorized |
| Date | 2026-10-10 |

## Objective and authority boundary

WP-99 proposes the first testable authorization, identity, session, recovery, machine-identity,
separation-of-duty, platform-role, and support-access policy baseline. It supplies the product
policy oracle that later architecture analysis and proof planning need without selecting an
identity provider, policy engine, protocol, framework, database library, or implementation.

The baseline is designed for both small owner-operated service businesses and larger multi-branch
organizations. Small organizations may combine roles; larger organizations may separate them.
Neither configuration may weaken tenant isolation, explicit organization context, attribution,
protected history, support controls, or fixed high-risk approval rules.

This package performs no proof, dependency, identity-provider, network, infrastructure,
application-code, deployment, provider-account, cost, or customer/live-data action.

## Governing product and security inputs

- `PD-001`, `PD-002`, `PD-007`, and `PD-008` require multi-tenant isolation, crew-based work,
  externally paid MMQR evidence, and small-to-enterprise configurability.
- `BR-ORG-006/007`, `SR-ORG-001` through `016`, and `SEC-INV-001` through `012` separate platform,
  membership, worker, support, customer, and machine authority.
- `SR-SEC-001` through `005`, `SR-AUD-001` through `006`, and `AUTH-CTRL-001` through `012`
  require trusted-boundary authorization, explicit scope, safe denial, and attributable evidence.
- `DEC-232` accepts TP-01 only as bounded tenant-boundary evidence; the product permission and
  separation-of-duty matrix remained open.
- `OPEN-008`, `OPEN-013`, `OPEN-032`, `OPEN-045`, `OPEN-046`, and `OPEN-047` are the primary
  policy questions addressed here. `OPEN-048`, `OPEN-050`, and `OPEN-080` are addressed only for
  machine identity, support, and privileged-access portions.

## Accepted core authorization baseline

| ID | Proposed policy |
| --- | --- |
| `AUTHZ-BASE-001` | Default deny. An action requires one valid authority path, one explicit organization context where applicable, an allowed business action, governed scope, valid resource state, sufficient assurance, and satisfied separation-of-duty conditions. |
| `AUTHZ-BASE-002` | Authentication identifies a principal; it never by itself grants organization membership, worker status, customer delegation, platform authority, or support access. |
| `AUTHZ-BASE-003` | One operation uses exactly one authority path: organization membership, customer delegation, platform control, support grant, machine grant, or explicitly public access. Paths cannot be combined to widen authority. |
| `AUTHZ-BASE-004` | A human with several memberships selects one active organization; permissions, branch scope, assignment scope, and policy are re-resolved after every switch. |
| `AUTHZ-BASE-005` | Roles are permission bundles, not final decisions. Effective access also checks organization, branch/team/assignment/self/record scope, resource tenant, lifecycle state, sensitivity, purpose, and prior participation. |
| `AUTHZ-BASE-006` | Platform roles and organization memberships are separate assignments. No platform title, including Super Admin, grants routine tenant-record browsing. |
| `AUTHZ-BASE-007` | A worker may exist and participate without login authority. Authenticated actions identify the acting identity and, when relevant, the represented worker. |
| `AUTHZ-BASE-008` | Membership, role, scope, support grant, customer delegation, session, device authorization, and machine grant have independent lifecycle and revocation. Historical attribution is never deleted by revocation. |
| `AUTHZ-BASE-009` | Client-supplied tenant, role, branch, hostname, app identity, assignment, record identifier, and permission claim are untrusted hints and cannot grant access. |
| `AUTHZ-BASE-010` | Search, cache, reports, exports, evidence delivery, notifications, background work, integration, logs, and offline synchronization may expose no broader scope than governed source records. |
| `AUTHZ-BASE-011` | Tenant configuration may combine roles and strengthen controls but cannot weaken platform tenant isolation, protected audit, support, secret, recovery, or fixed independent-control rules. |
| `AUTHZ-BASE-012` | High-risk authorization decisions return `allow`, `deny`, `stronger assurance required`, `independent approval required`, or `controlled resolution required`; missing context never falls back to broad access. |
| `AUTHZ-BASE-013` | Sensitive continuations recheck current authority before approval, export, evidence access, privileged mutation, payment verification, stock adjustment, support elevation, or synchronization. |
| `AUTHZ-BASE-014` | Role or scope changes take effect only after attributable approval where required and invalidate cached authorization within the accepted revocation target. |
| `AUTHZ-BASE-015` | Authorization evidence records organization, actor, authority relationship, action, resource class/identifier as permitted, scope, purpose/reason where required, outcome, time, source, and approval/step-up references without duplicating unnecessary private content. |
| `AUTHZ-BASE-016` | Custom roles may later compose accepted permission families but cannot create new platform powers, cross-tenant scopes, or bypass fixed control conditions. |
| `AUTHZ-BASE-017` | The same canonical permission and scope meanings apply to small and large organizations; governance depth changes through role combination, thresholds, approval, and review, not different business semantics. |
| `AUTHZ-BASE-018` | Production authorization acceptance still requires qualified human security review of the selected architecture and implementation before deployment or real/customer data. |

## Permission-family vocabulary

| ID | Permission family | Included business actions | Explicit exclusions |
| --- | --- | --- | --- |
| `PERM-FAM-001` | Organization ownership | Ownership policy, owner appointment/transfer, last-owner protection, tenant cancellation request | Platform lifecycle, silent data export/deletion, ordinary operations without added role |
| `PERM-FAM-002` | Membership and configuration | Invite, activate, suspend, role/scope/branch assignment, tenant configuration | Platform roles, fixed security/audit constraints, ownership transfer |
| `PERM-FAM-003` | Customer and equipment operations | Customer/contact/site/equipment create, view, update, controlled reconciliation | Cross-tenant merge, unrestricted export, historical erasure |
| `PERM-FAM-004` | Request, scheduling, and dispatch | Request intake, planning, crew/resource assignment, rescheduling, coordination | Field outcome falsification, commercial approval, stock adjustment |
| `PERM-FAM-005` | Field execution | Assigned-job context, inspection, diagnosis, proposal draft, activity/material/evidence capture, outcome/follow-up submission | Broad customer history, final exceptional approval, payment verification |
| `PERM-FAM-006` | Work review and exceptions | Review field submission, authorize reopening/correction within policy, quality/safety escalation | Ownership/security administration, unrelated branch records |
| `PERM-FAM-007` | Commercial preparation | Price-list use, quotation/proposal preparation, revision, contract draft | Own exceptional approval beyond threshold, payment settlement claim |
| `PERM-FAM-008` | Commercial approval | Exact revision/threshold approval, rejection, exception reason | Performed-work confirmation, external-payment verification |
| `PERM-FAM-009` | Stock custody | View/reserve/receive/issue/use/return/transfer in allowed locations | Unreviewed adjustment, historical movement editing, cross-tenant stock |
| `PERM-FAM-010` | Stock adjustment/reconciliation | Count, discrepancy, adjustment proposal/approval under policy | Silent balance rewrite or movement deletion |
| `PERM-FAM-011` | Evidence and documents | Governed view/capture/finalize/replace according to business context | Broader authority merely because a file exists or URL is known |
| `PERM-FAM-012` | Payment evidence | Capture receipt photo/reference and customer-paid claim; separately verify/reject/reconcile when assigned | Payment processing, bank-wallet control, settlement inference from photo alone |
| `PERM-FAM-013` | Reports and export | Role/scope-filtered dashboard/report; separately controlled export | Broader tenant scope than operational authority, unrestricted audit/security export |
| `PERM-FAM-014` | Tenant audit | Purpose-limited read of allowed operational/audit history | Ordinary mutation, audit-evidence alteration, platform security evidence by default |

## First organization role-permission matrix

Legend: `O` organization scope, `B` permitted branch/team scope, `A` assigned-work scope, `R`
read-only within recorded scope, `P` privileged action requiring the applicable stronger control,
and `—` no default permission. Multiple letters mean the bundle is constrained by both meanings.
A user may hold several roles, but every action records the effective permission and scope.

| Role | Ownership/config | Customer/equipment | Dispatch | Field | Work review | Commercial | Stock | Payment evidence | Reports/export | Audit |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Organization Owner | `O/P` ownership; config only with Admin role | `R/O` | `R/O` | `—` | `R/O` | `P/O` exceptional approval | `R/O` | `R/O` | reports `O`; export `P` | `R/O` |
| Organization Administrator | config/member `O/P`; no ownership transfer | `O` | `O` | `—` | `R/O` | `R/O` | `R/O` | `R/O` | reports `O`; export `P` | `R/O` admin history |
| Branch Manager | branch people/config `B` | `B` | `B` | optional only with field role | `B` | approve within branch threshold | `R/B` | `R/B` | reports `B`; export `P/B` | `R/B` |
| Dispatcher / Office Staff | `—` | `B` | `B` | `—` | status coordination only | prepare within scope | stock availability `R/B` | capture claim only when assigned | reports `R/B`; no default export | `—` |
| Supervisor | `—` | job-related `B` | crew coordination `B` | optional with field role | review/exception `B` | `R/B`; no exceptional approval | `R/B` | evidence `R/B`; no default verify | reports `B`; no default export | quality history `R/B` |
| Storekeeper | `—` | job/site reference only | `—` | material handoff only | `—` | `—` | custody `B`; adjustment `P` | `—` | inventory reports `B` | stock history `R/B` |
| Commercial Approver | `—` | proposal-related `R/B` | `—` | `—` | `—` | approval `P/B` | cost availability `R/B` | `—` | commercial reports `B`; export `P` | approval history `R/B` |
| Payment-Evidence Verifier | `—` | payment-context `R/B` | `—` | `—` | `—` | `R/B` approved amount | `—` | verify/reject/reconcile `P/B` | payment-evidence reports `B`; export `P` | verification history `R/B` |
| Crew Leader | `—` | assigned context `A` | crew progress only | execute/submit `A` | crew completeness before submit | proposal draft `A`; no exceptional approval | assigned issue/use/return `A` | capture claim/evidence `A`; no independent verify | assigned-job summary `R/A` | own crew history `R/A` |
| Technician / Helper | `—` | minimum assigned context `A` | `—` | execute/capture `A` | `—` | findings/proposal input only | assigned issue/use/return `A` when permitted | capture evidence `A`; no verify | own assigned summary `R/A` | own attributable events `R/A` |
| Tenant Auditor / Viewer | `—` | `R` when granted | `—` | `—` | `R` | `R` | `R` | `R` | reports `R`; export only separate `P` | `R` purpose-limited |

### Matrix rules

| ID | Proposed rule |
| --- | --- |
| `ROLE-PERM-001` | Organization Owner is an ownership/governance role, not an automatic universal operational bypass. A small-business owner receives additional explicit operational roles through the starter profile. |
| `ROLE-PERM-002` | The small-organization starter profile may combine Owner, Administrator, Branch Manager, Dispatcher, Supervisor, Commercial Approver, Storekeeper, and Payment-Evidence Verifier on one identity, but every privileged action still records its specific permission, reason, and step-up. |
| `ROLE-PERM-003` | The starter profile may use direct payment marking only when tenant policy explicitly allows capture and verification by the same actor; otherwise the verifier must be different. |
| `ROLE-PERM-004` | Large organizations separate branch management, dispatch, supervision, commercial approval, stock adjustment, payment verification, audit, and ownership according to accepted thresholds. |
| `ROLE-PERM-005` | Field authority is assignment-scoped by default. Crew leadership does not grant organization-wide customer, commercial, stock, payment, or reporting access. |
| `ROLE-PERM-006` | Branch roles may operate across multiple explicitly assigned branches; no role infers all branches merely from title. |
| `ROLE-PERM-007` | Read access to a job does not automatically grant sensitive evidence, commercial terms, payment evidence, workforce records, audit history, or export. |
| `ROLE-PERM-008` | Broad export, bulk membership change, ownership, credential/recovery, security policy, deletion, and support elevation are privileged actions outside ordinary role convenience. |
| `ROLE-PERM-009` | No actor may approve an action using authority that was revoked, expired, or obtained only after initiating an incompatible controlled action. |
| `ROLE-PERM-010` | Tenant-defined custom bundles are deferred until the fixed permission vocabulary, incompatibilities, and migration behavior are proven. |

## Separation-of-duty baseline

| ID | Controlled combination | Small-organization baseline | Larger-organization baseline |
| --- | --- | --- | --- |
| `SOD-BASE-001` | Ownership transfer or last-owner removal | Current owner may initiate; a second active owner approves where available. Sole-owner recovery uses delayed controlled recovery, never immediate self-removal. | Two distinct authorized owners/approvers; recent strong assurance required. |
| `SOD-BASE-002` | Privileged membership/role change | Owner/Admin may perform with recent strong assurance and explicit reason; own elevation to ownership is prohibited. | Requester and approver differ for ownership, bulk, auditor, and high-risk role changes. |
| `SOD-BASE-003` | Proposal preparation versus exceptional approval | Same owner may combine within recorded tenant threshold; above threshold requires explicit step-up and reason. | Different preparer and approver above configured threshold. |
| `SOD-BASE-004` | Stock custody versus adjustment | Same actor may propose low-risk correction with reason/evidence; completed adjustment is flagged for review. | Custodian and adjustment approver differ for material discrepancy/high-value thresholds. |
| `SOD-BASE-005` | Payment-evidence capture versus verification | Same actor only under explicit direct-marking policy; the system records combined responsibility. | Submitter and verifier differ; dispute/reversal requires independent review. |
| `SOD-BASE-006` | Support request, approval, and elevated action | Tenant Owner/Admin may approve read-only support; elevated support also needs an independent platform approver. | Tenant approver, platform approver, and support actor are distinct for elevated access. |
| `SOD-BASE-007` | Broad export or deletion | Owner may request with recent strong assurance; execution follows a separate controlled workflow and recovery window. | Requester, approver, and executor are separated according to scope/risk. |
| `SOD-BASE-008` | Security investigation versus evidence alteration | Investigator may add case notes separately but cannot rewrite protected source evidence. | Same fixed rule; no configurable bypass. |
| `SOD-BASE-009` | Platform privileged change | Super Admin cannot be sole requester, approver, and executor for tenant-data elevation, destructive recovery, or security-evidence alteration. | Independent Platform Security/Auditor approval and protected evidence required. |

Threshold values for money, bulk size, inventory value, and deletion scope remain separate
commercial/data decisions. Absence of a threshold means the stronger path applies; it never means
uncontrolled permission.

## Authentication and assurance baseline

| ID | Proposed policy |
| --- | --- |
| `ID-BASE-001` | Advance a managed primary human-authentication boundary for evaluation while the product remains authoritative for organizations, memberships, roles, scopes, support grants, customer delegation, and machine grants. No provider is selected. |
| `ID-BASE-002` | Retain controlled enterprise federation as a conditional later capability; reject self-operated product credential storage as the initial default unless managed-candidate proof fails a mandatory gate. |
| `ID-BASE-003` | Define `ASSURANCE-1` as current primary authentication suitable for ordinary scoped work, subject to full authorization. |
| `ID-BASE-004` | Define `ASSURANCE-2` as recent multi-factor or phishing-resistant step-up required for platform roles, ownership, privileged membership changes, broad export, stock adjustment approval, payment-evidence reversal, support approval/elevation, recovery, credential/factor change, and destructive requests. |
| `ID-BASE-005` | Define `ASSURANCE-3` as `ASSURANCE-2` plus an independent authorized approval for the exact high-risk action. It is a control condition, not a reusable permanent role. |
| `ID-BASE-006` | Platform Super Admin, Support, Operations, and Security/Auditor roles require multi-factor authentication for every active platform session; SMS alone is not sufficient for their privileged assurance. |
| `ID-BASE-007` | Organization Owner and Administrator require enrolled multi-factor capability before ownership, membership administration, broad export, support approval, recovery approval, or security-policy action. |
| `ID-BASE-008` | Ordinary office and field actions may use `ASSURANCE-1`; sensitive actions trigger step-up and then rerun the full authorization decision. |
| `ID-BASE-009` | Authentication factors, recovery secrets, provider tokens, and session credentials are never visible to tenant or platform support staff. |
| `ID-BASE-010` | Exact passkey, authenticator, recovery, phone/email, enterprise federation, and customer-login methods remain candidate-proof decisions; phone number, email, domain, or contact match alone never establishes business authority. |

### Action assurance matrix

| Action class | Minimum baseline | Additional condition |
| --- | --- | --- |
| Ordinary scoped CRM, dispatch, assigned field capture, and role-scoped reporting | `ASSURANCE-1` | Current membership, organization, scope, state, and policy checks |
| Platform-console access | `ASSURANCE-2` | Active platform-role assignment and purpose |
| Ownership, privileged/bulk role change, broad export, controlled deletion request, recovery/factor change | `ASSURANCE-2` | Explicit reason and protected audit; `ASSURANCE-3` where SOD matrix requires it |
| Support read-only approval | `ASSURANCE-2` for support actor and tenant approver | Exact case, tenant, scope, mode, expiry |
| Support elevation or break-glass | `ASSURANCE-3` | Exact action list, short expiry, alert, mandatory review |
| High-risk stock/payment/commercial reversal or exception | `ASSURANCE-2` | Threshold and independent approval according to tenant governance policy |

## Online session and revocation baseline

These are architecture-evaluation targets, not contractual SLAs. Field offline authorization and
device-local lock values remain for the field/client baseline.

| ID | Proposed policy |
| --- | --- |
| `SESSION-BASE-001` | Platform privileged sessions: 15-minute inactivity limit, eight-hour absolute limit, step-up recency of 15 minutes for privileged actions, and reauthorization after material role/risk change. |
| `SESSION-BASE-002` | Tenant Owner/Admin/Auditor and commercial/payment privileged web sessions: 30-minute inactivity limit and 12-hour absolute limit; sensitive actions require recent step-up. |
| `SESSION-BASE-003` | Standard office and customer web sessions: 60-minute inactivity limit and 12-hour absolute limit unless a later usability/security proof accepts a different target. |
| `SESSION-BASE-004` | Every session is bound to subject, issuance source, assurance, current validity, and bounded client/device risk context; a device label is not identity. |
| `SESSION-BASE-005` | Membership, platform role, support grant, identity, session, customer delegation, and machine grant can be revoked independently. |
| `SESSION-BASE-006` | Online membership/role/scope revocation and authorization-cache invalidation target is five minutes; support-grant and known-compromise revocation target is one minute where the trusted service is reachable. |
| `SESSION-BASE-007` | Organization switching creates a newly resolved organization context and cannot carry authorization cache, search results, files, or pending privileged continuations from the prior tenant. |
| `SESSION-BASE-008` | Offline clients synchronize only under current authority; exact offline lease duration, local unlock, device loss, and queued-intent behavior remain blocked by the later field/offline baseline. |

## Recovery and identity-change baseline

| ID | Proposed policy |
| --- | --- |
| `RECOVERY-BASE-001` | Ordinary tenant support and platform support cannot view credentials, request passwords, impersonate the user, or unilaterally satisfy identity-recovery proof. |
| `RECOVERY-BASE-002` | Ordinary member recovery uses the accepted identity boundary's verified recovery flow; tenant administrators may suspend, revoke, or re-invite membership but cannot take over the identity. |
| `RECOVERY-BASE-003` | Primary identifier or factor change verifies the current session at stronger assurance or uses controlled recovery, verifies the new identifier/factor, notifies established channels, records provenance, and revokes affected sessions. |
| `RECOVERY-BASE-004` | Organization-owner recovery requires stronger assurance, notice to every active owner, and approval by another active owner where one exists. |
| `RECOVERY-BASE-005` | When no other active owner exists, owner recovery uses a minimum 24-hour hold, platform Security/Auditor plus Super Admin dual approval, evidence of organization control, notice through every safe established channel, and mandatory post-event review. |
| `RECOVERY-BASE-006` | Platform-role recovery or factor reset requires a different Platform Security/Auditor or Super Admin approver, revokes existing privileged sessions, and triggers protected review evidence. |
| `RECOVERY-BASE-007` | Emergency compromise response may shorten a hold only to contain active harm; it cannot silently transfer ownership and requires immediate restriction plus later identity restoration review. |
| `RECOVERY-BASE-008` | Recovery evidence is purpose-limited, access-restricted, retained according to privileged-security evidence policy, and never exposed in ordinary tenant exports or support diagnostics. |

Exact organization-control documents and Myanmar legal identity evidence remain subject to later
qualified security/legal review; the system must not require more personal data than the accepted
recovery risk justifies.

## Machine-identity baseline

| ID | Proposed policy |
| --- | --- |
| `MACHINE-BASE-001` | Every workload, worker, scheduler, integration, migration, backup, and recovery process uses a distinct non-human identity or separately attributable execution grant. |
| `MACHINE-BASE-002` | A machine grant names owner, environment, purpose, allowed operations, tenant scope source, credential/trust basis, issue/expiry where applicable, rotation, revocation, and evidence requirements. |
| `MACHINE-BASE-003` | Machine identities never share human credentials and never infer tenant authority from an untrusted payload, queue message, hostname, or record ID alone. |
| `MACHINE-BASE-004` | Cross-tenant platform workloads require explicit platform purpose and per-operation tenant context; tenant-scoped workloads default to one organization. |
| `MACHINE-BASE-005` | Secrets and trust material are unavailable to ordinary tenant configuration, application logs, evidence, exports, or support sessions. |
| `MACHINE-BASE-006` | Machine-grant use is attributable and reviewable; unused, expired, compromised, or superseded grants are revoked without deleting historical actions. |

Exact workload-identity technology, federation, secret store, and rotation periods remain later
architecture and implementation decisions.

## Platform-role baseline

| Role | Default authority | Prohibited default authority |
| --- | --- | --- |
| Platform Super Admin | Platform governance, organization lifecycle control, exceptional platform-role administration, controlled high-risk approval | Routine customer/job/evidence/payment browsing; unlogged universal bypass; sole approval of own elevation |
| Platform Support | Organization directory metadata, support cases, minimized diagnostics, approved support sessions | Permanent tenant membership, password request, silent impersonation, ungranted private records |
| Platform Operations | Health, release, domain/application delivery state, backup/recovery job metadata, controlled operational procedures | Ordinary tenant browsing, uncontrolled restore/download, business-record editing |
| Platform Security/Auditor | Purpose-limited security/support/privileged-access evidence and approval/review functions | General tenant operations, audit-source alteration, unrelated customer content |

Platform roles are separately assigned, reviewed, and revoked. A person needing tenant operations
must use an explicit organization membership or support grant and cannot silently reuse platform
authority.

## Support-access baseline

| ID | Proposed policy |
| --- | --- |
| `SUPPORT-BASE-001` | Every support access has a named case/incident, named actor, one target organization, purpose, exact mode, resource/action scope, start, expiry, requester/approver evidence, and closure. |
| `SUPPORT-BASE-002` | Diagnostic-metadata mode may inspect minimized service/configuration/version/error metadata without private tenant record content. It requires a case and platform Support permission, expires within eight hours, and needs no tenant approval. |
| `SUPPORT-BASE-003` | Read-only tenant-support mode requires tenant Owner or Administrator approval, exact record/resource scope, support-actor `ASSURANCE-2`, visible support indication, and a maximum four-hour grant. |
| `SUPPORT-BASE-004` | Elevated corrective mode requires tenant Owner/Administrator approval plus a different Platform Super Admin or Security/Auditor approval, exact action list, support-actor step-up, and a maximum one-hour grant. |
| `SUPPORT-BASE-005` | Emergency break-glass is limited to active security, safety, data-integrity, or material service-continuity harm when ordinary approval cannot be obtained. It requires two platform actors including Super Admin or Security/Auditor, maximum 30 minutes, immediate alert/tenant notice when safe, and review within one business day. |
| `SUPPORT-BASE-006` | Break-glass cannot perform ownership transfer, ordinary account recovery, bulk export, tenant cancellation, legal deletion, credential disclosure, or unrestricted browsing. |
| `SUPPORT-BASE-007` | Read-only support cannot mutate, export, change identity/membership/ownership, delete, restore, mark payment, approve commercial work, adjust stock, or replace evidence. |
| `SUPPORT-BASE-008` | Elevated support permits only the individually approved corrective actions. A new action or tenant requires a new grant; scope never expands automatically. |
| `SUPPORT-BASE-009` | Support views apply field minimization and masking by default. Evidence files, customer contact details, commercial documents, and payment evidence require explicit case relevance and approved scope. |
| `SUPPORT-BASE-010` | Record grant lifecycle, sensitive record opens/downloads, every attempted mutation/export, authorization decisions, step-up/approval, affected scope, and result. Audit evidence must avoid unnecessary content duplication. |
| `SUPPORT-BASE-011` | Notify the tenant approver/requester when read-only/elevated access activates, elevates, is revoked, expires, or closes. Break-glass notice is immediate when safe and never omitted from later review. |
| `SUPPORT-BASE-012` | Privileged support-access and break-glass evidence has a 365-day minimum architecture-evaluation retention target, subject to longer legal/security policy; ordinary case content follows its accepted class policy. |
| `SUPPORT-BASE-013` | Support staff never ask for or receive tenant passwords, factors, recovery secrets, API secrets, signing material, or personal wallet credentials. |
| `SUPPORT-BASE-014` | The tenant can review support-session history relevant to its organization except narrowly withheld active-security details that require later disclosure/review. |

## Open-item disposition

| Open item | Proposed WP-99 disposition | Remaining boundary |
| --- | --- | --- |
| `OPEN-008` | Resolve for architecture evaluation with `SUPPORT-BASE-001` through `014`. | Final implementation and qualified human security/privacy review remain. |
| `OPEN-013` | Resolve for architecture evaluation with the support approval/elevation/break-glass matrix. | Provider/tool implementation and incident integration remain. |
| `OPEN-032` | Resolve as the first accepted matrix through `PERM-FAM-*`, the role matrix, `ROLE-PERM-*`, and `SOD-BASE-*`. | Commercial/inventory/data thresholds and custom-role implementation remain separate. |
| `OPEN-045` | Resolve for architecture evaluation with `ASSURANCE-1/2/3` and the action assurance matrix. | Exact factor/provider/user-experience selection remains proof-dependent. |
| `OPEN-046` | Resolve for architecture evaluation with `RECOVERY-BASE-001` through `008`. | Exact provider recovery and legally sufficient evidence remain proof/review-dependent. |
| `OPEN-047` | Resolve online session, switching, step-up, and revocation baselines; keep offline lease/device-local values open. | Sequence B field/offline/device policy must complete the remaining portion. |
| `OPEN-048` | Partially resolve common machine-grant invariants through `MACHINE-BASE-001` through `006`. | Integration-specific federation, trust, and rotation remain per contract/technology. |
| `OPEN-050` | Partially resolve support/recovery revocation and evidence. | Full incident detection, response, notification, and retention remain Sequence D. |
| `OPEN-080` | Partially resolve support and platform privileged-access controls. | Database/storage/network/build/provider operations remain Sequence D. |

## Architecture and proof impact

| Decision/proof | Proposed effect after owner acceptance |
| --- | --- |
| `ADR-READY-001` | Product-policy reconciliation component satisfied; complete tenancy ADR packet and owner decision still required. |
| `ADR-READY-002` | Identity/session policy blocker reduced; `OPEN-094`, named-candidate proof `PROOF-SPEC-011`, security/privacy review, and ADR packet remain. |
| `ADR-READY-003` | `OPEN-008/013/032` policy blockers satisfied for architecture evaluation; `TP-CAND-009`, identity dependencies, security review, and ADR packet remain. |
| `WP98-PROOF-WAVE-001` | Entry policy becomes available for later proof specification/authorization; no proof preparation or execution is authorized. |
| `ADR-READY-005` | Online/session side gains a baseline; offline lease, conflict, device, and field matrix remain open. |

## Options considered

| ID | Option | Recommendation | Reason |
| --- | --- | --- | --- |
| `WP99-OPT-001` | Advance a provider-neutral managed human-authentication boundary with product-owned business authority and conditional later enterprise federation. | Advance | Best fit for a small team while preserving server-owned tenant/permission truth and later enterprise needs. |
| `WP99-OPT-002` | Make the product initially own passwords, MFA, recovery, abuse detection, and credential security operations. | Reject initially | Adds high security/availability/operations burden without a demonstrated product advantage. |
| `WP99-OPT-003` | Treat platform Super Admin or tenant Owner as an unrestricted data/operation bypass. | Reject | Violates accepted tenant, support, attribution, and least-privilege boundaries. |
| `WP99-OPT-004` | Use one simple Technician/Admin role model for every organization. | Reject | Cannot represent crews, branch scope, commercial approval, stock custody, payment verification, audit, or enterprise separation of duty. |

## Risks and validation obligations

| ID | Risk | Required control/evidence |
| --- | --- | --- |
| `WP99-RISK-001` | Small-business role combination becomes invisible superuser behavior. | Effective-permission attribution, step-up, explicit combined-role profile, and fixed high-risk controls. |
| `WP99-RISK-002` | Matrix becomes screen-menu authorization. | Enforce business action/resource/scope/state/purpose in trusted service boundaries. |
| `WP99-RISK-003` | Managed identity becomes product organization authority. | External subject mapping only; product-owned memberships, roles, scopes, grants, and revocation. |
| `WP99-RISK-004` | Support approval becomes permanent tenant access. | One case/tenant/scope/mode/expiry, active checks, revocation, closure, and review. |
| `WP99-RISK-005` | Recovery allows takeover. | Strong assurance, notice, holds, dual approval for exceptional owner/platform recovery, session revocation. |
| `WP99-RISK-006` | Exact timings harm field usability or cannot be enforced. | Treat them as evaluation targets; validate provider/client behavior and keep offline/device targets in Sequence B. |
| `WP99-RISK-007` | Permission vocabulary omits a later domain action. | Add an explicit permission with migration and proof trace; never hide it under broad edit/admin. |

## Accepted owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP99-DEC-001` | Accept `AUTHZ-BASE-001` through `018` as the first authorization policy baseline. | Accepted |
| `WP99-DEC-002` | Accept `PERM-FAM-001` through `014`, the first role-permission matrix, and `ROLE-PERM-001` through `010`. | Accepted |
| `WP99-DEC-003` | Accept `SOD-BASE-001` through `009` as the small/large-organization separation-of-duty baseline. | Accepted |
| `WP99-DEC-004` | Accept `ID-BASE-001` through `010`, `SESSION-BASE-001` through `008`, and `RECOVERY-BASE-001` through `008` as architecture-evaluation policy. | Accepted |
| `WP99-DEC-005` | Accept `MACHINE-BASE-001` through `006`, the platform-role matrix, and `SUPPORT-BASE-001` through `014`. | Accepted |
| `WP99-DEC-006` | Resolve or partially resolve `OPEN-008/013/032/045/046/047/048/050/080` exactly as recorded, without expanding the resolved boundary. | Accepted |
| `WP99-DEC-007` | Advance `WP99-OPT-001`; reject `WP99-OPT-002`, `WP99-OPT-003`, and `WP99-OPT-004`. | Accepted |
| `WP99-DEC-008` | Keep `ADR-READY-001/002/003/005` `NOT_READY` with only the policy impacts recorded above; authorize no proof or architecture selection. | Accepted |
| `WP99-DEC-009` | Freeze the four-path WP-99 public candidate inventory below; keep `internal-local/` private and untracked. | Accepted |
| `WP99-DEC-010` | After verified WP-99 publication, activate WP-100 Field, Offline, Evidence and Client Acceptance Baseline for owner-decision documentation and option analysis only. | Accepted |

## Frozen candidate inventory and next gate

The candidate WP-99 public inventory is exactly:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/101_REMAINING_ARCHITECTURE_EVIDENCE_DECISION_SEQUENCE.md`
4. `docs/102_AUTHORIZATION_IDENTITY_SUPPORT_POLICY_BASELINE.md`

The owner accepted `DEC-234`, every policy and matrix in this document, all recorded open-item
dispositions, and `WP99-DEC-001` through `010`; advanced `WP99-OPT-001`; rejected
`WP99-OPT-002` through `004`; and authorized commit and push only for the exact four paths above.
After verified publication, WP-100 may define the field/offline/evidence/client acceptance matrix.
Proof preparation/execution, final architecture selection, application coding, infrastructure,
deployment, provider accounts/cost, and customer/live data remain closed.
