# Multi-Organization Model

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted foundation — proposed and open items retain their recorded status |
| Work package | `WP-02 Multi-Organization Foundation` |
| Last updated | 2026-09-30 |

## Purpose

Define how independent service organizations use one platform without losing data ownership,
privacy, operational independence, or configuration control.

## Objectives

The model must:

- serve a one-branch owner-operated business without artificial hierarchy;
- expand to many branches, teams, warehouses, delivery identities, and controlled roles;
- preserve one authoritative tenant boundary for operational data;
- separate platform authority from organization authority;
- support workers who do not yet have application accounts;
- support explicit cross-branch and possible multi-organization access without data leakage;
- keep organization configuration flexible without making security configurable;
- allow platform support without permanent unrestricted tenant-data access.

## Non-scope

This document does not select:

- authentication provider;
- authorization library or policy engine;
- database tenancy pattern;
- domain, certificate, mobile-build, or app-store technology;
- subscription pricing;
- exact data-retention periods;
- exact support-session approval mechanics.

Those decisions follow accepted product requirements and security architecture.

## Organizational hierarchy

```text
Platform
  -> Organization / Tenant
      -> Branch or operating unit
          -> Team / Crew
              -> Assigned workers
```

The hierarchy is not always rigid. A user may operate across branches, and an ad-hoc crew may be
assembled for one work order. Access must be determined by explicit organization membership,
permissions, and assigned scope rather than hierarchy alone.

## Core concepts

### Platform

The SaaS product and its trusted administration boundary. Platform operators do not become tenant
employees and must not receive routine access to tenant business data.

The platform owns service operation, tenant lifecycle controls, shared product releases, fixed
security invariants, and platform-level operational evidence. It does not become the business owner
of a tenant's customers, jobs, crews, evidence, or commercial records merely because it hosts them.

### Organization / tenant

An independent service business with its own customers, workers, configurations, operational
records, and data-ownership boundary.

An organization has one stable identity independent of its display name, domain, subscription,
brand, branches, or app distribution. Renaming, suspending, or changing a delivery profile must not
create a different tenant.

### Branch

An optional operating subdivision that may have its own crews, service area, stock, price lists,
documents, MMQR image, and approval hierarchy.

Branches are optional. A small organization may operate entirely through its root scope without
seeing branch-management complexity. A larger organization may introduce branches and assign
records, people, resources, and permissions to one or more branch scopes.

### Membership

The relationship between a user identity and an organization. A single identity may later hold
memberships in multiple organizations, but permissions and data context remain separate.

A membership has its own lifecycle, roles, branch scope, activation state, and audit history. A
user identity with two memberships does not create a relationship between the organizations.

### User identity and worker

A user identity represents an authenticated person. A worker represents a person participating in
an organization's operation. They are distinct but linkable:

- a technician or helper may be scheduled before receiving a user account;
- a former worker's operational history must remain after login access is removed;
- one identity may hold different organization memberships and roles;
- disabling a membership must not delete the worker's historical participation.

### Team and crew

A team is a continuing organizational grouping. A crew is the actual set of workers assigned to a
job or period. A permanent team may be reused as a crew; an ad-hoc crew may cross team boundaries.

### Service group and parent organization

Groups, franchises, subsidiaries, and related legal entities are not silently modeled as ordinary
branches. A future parent/group relationship requires explicit data-sharing and authority rules.
Until accepted, separate organizations remain isolated even if the same owner operates them.

## Tenant isolation principles

1. Every tenant-owned record has an authoritative tenant boundary.
2. Authorization is enforced by trusted backend behavior, not hidden UI controls.
3. Tenant context is explicit for every state-changing operation.
4. Cross-tenant queries are denied by default.
5. Platform support access is exceptional, time-bounded, attributable, and auditable.
6. Tenant exports do not expose another tenant's identifiers or records.
7. Tenant configuration cannot weaken platform security invariants.
8. Shared reference catalogs, if introduced, remain distinct from tenant-owned operational data.
9. Organization selection, hostname, branding, or client configuration is context—not proof of
   authorization.
10. Background work, reports, exports, notifications, search, files, and audit queries preserve the
    same tenant boundary as interactive requests.
11. Tenant suspension does not transfer ownership or permit platform staff to browse private data.
12. Cross-tenant aggregate analysis, if introduced, requires a separately accepted privacy and
    anonymization model.

## Information ownership classes

| Class | Examples | Controlling boundary |
| --- | --- | --- |
| Platform control data | Organization ID, lifecycle state, entitlements, service health, release state | Platform-authorized roles |
| Tenant operational data | Customers, sites, jobs, workers, stock, contracts, evidence, reports | Organization membership and scope |
| Customer-provided data | Contact details, locations, equipment details, approvals, signatures, receipt evidence | Tenant custody plus privacy rules |
| Shared reference data | Supported countries, currencies, equipment categories, public service taxonomy | Platform governance |
| Derived tenant analytics | Tenant dashboards, KPIs, forecasts, operational summaries | Same tenant scope as source records |
| Security and audit evidence | Authentication, authorization, support-session, mutation, and incident evidence | Restricted platform/tenant audit roles |

An item does not become platform-visible merely because the platform generated or stored it. Data
classification and permission remain explicit.

## Configurable organization behavior

Candidate tenant or branch configuration includes:

- business identity and branding;
- language, timezone, currency, and numbering;
- branches and service areas;
- roles and permission assignments;
- job types, status display names, and checklists;
- crew and scheduling rules;
- service catalog and price lists;
- discount and approval thresholds;
- stock locations and material policies;
- quotation, service-report, and invoice formats;
- official MMQR images and payment-evidence policy;
- warranty defaults;
- notification preferences;
- contract and service-level policies;
- retention and export settings within platform limits.

## Configuration layers

Configuration follows three conceptual layers:

1. **Platform constraints:** fixed security, isolation, audit, compatibility, and service limits
   that tenants cannot weaken.
2. **Organization defaults:** branding, language, workflow, pricing, approval, evidence, inventory,
   notification, and document defaults for the tenant.
3. **Branch overrides:** explicitly permitted differences for a branch, such as operational hours,
   service area, price list, MMQR, stock policy, or document identity.

An effective configuration must be explainable: users and auditors should be able to determine
whether a value came from platform constraint, organization default, or branch override. Removing
an override restores inheritance; it must not copy an obsolete hidden value.

## Tenant delivery surfaces

The product supports one shared platform and several optional tenant-facing delivery identities.

### Shared administration portal

The administration and operations portal is one maintained platform application. Organization
owners, office staff, dispatchers, supervisors, storekeepers, and other authorized users enter the
same portal and operate only inside organizations and branches permitted by their memberships.

The shared portal may apply organization identity after tenant selection, but it is not separately
forked or deployed for every tenant.

### Management Dashboard

The shared administration experience includes a role-aware Management Dashboard optimized for
quick use on a phone. It summarizes operational health, exceptions, approvals, service progress,
payment-evidence status, complaints, stock warnings, and other authorized management indicators.

Summary cards may provide limited detail and secure navigation into the applicable full Admin
Portal view. The dashboard does not create a separate source of business truth.

### Organization web identity

An organization may use:

- a product subdomain, such as `organization.product-domain.example`;
- a verified custom domain or subdomain owned by the organization; or
- the shared product domain where separate public identity is unnecessary.

Domain mapping selects the intended organization experience. It does not grant access or replace
backend tenant authorization. Custom-domain activation requires proof of control, safe certificate
management, collision prevention, and controlled removal.

### White-label customer application

An organization may request a separately branded customer application using its own name, icon,
colors, store listing, links, and tenant configuration. Candidate behavior includes customer
requests, appointments, equipment visibility, approvals, service status, documents, reminders,
and external payment instructions.

### White-label technician application

An organization may request a separately branded technician application using its own application
identity and tenant configuration while preserving the common field-service behavior, security,
offline rules, and release baseline.

### Optional white-label manager application

An organization may later request a separately branded Manager application. This is a delivery and
commercial option, not a prerequisite for the required Management Dashboard. It must reuse the
shared management capabilities and authorization model rather than becoming a separate management
system.

### Shared-product rule

White-label delivery means separately configured and distributed application artifacts from one
maintained product codebase. It must not create an independently modified source fork for every
organization. Tenant-specific business differences belong in governed configuration, feature
entitlements, templates, and extensions.

## Delivery profile

Each organization may have a delivery profile containing:

- approved brand name, colors, logos, and icons;
- product subdomain and verified custom domains;
- customer and technician application enablement;
- optional manager application enablement;
- application display names and immutable distribution identifiers;
- supported languages and contact details;
- deep-link and universal-link domains;
- notification sender configuration;
- privacy, support, and store-listing URLs;
- enabled capabilities and organization-specific configuration version;
- release channel and supported application versions.

Secrets, signing material, provider credentials, and store credentials are platform-controlled
operational data and must not be exposed as ordinary tenant configuration.

## Platform organization administration

### Organization directory

Authorized platform roles may list and locate every organization using bounded platform metadata:

- stable organization ID and display identity;
- lifecycle and commercial service state;
- primary owner/admin contact metadata required for platform operation;
- branch, membership, storage, delivery, and capability summaries;
- assigned domains and branded application release state;
- service health, last platform activity, incidents, and support cases.

The organization directory must not expose ordinary customer, employee, job, evidence, stock, or
payment data as list columns or unrestricted search results.

### Platform roles

| Role | Intended authority |
| --- | --- |
| Platform Super Admin | Exceptional platform governance, organization lifecycle, and controlled high-risk operations |
| Platform Support | Organization discovery, support cases, diagnostics, and approved support sessions |
| Platform Operations | Service health, delivery, releases, monitoring, backup, and recovery metadata |
| Platform Security/Auditor | Restricted read access to security, support-access, and platform audit evidence |

Platform roles do not automatically create organization memberships.

### Support session

A support session is an explicit temporary grant into one organization. It records:

- support case or incident reference;
- requesting and approving actors;
- target organization;
- reason and permitted purpose;
- allowed record and action scope;
- read-only or elevated mode;
- start and expiry;
- tenant notification or approval when policy requires it;
- every sensitive read and mutation required by later security policy;
- closure and review outcome.

Support is read-only by default. Modification, data export, identity changes, ownership transfer,
deletion, and emergency break-glass actions require stronger independent controls. Support staff
must not use or request a tenant administrator's password.

## Organization roles and access scopes

Candidate organization roles include:

| Role | Typical responsibility |
| --- | --- |
| Organization Owner | Highest tenant business authority and ownership-sensitive decisions |
| Organization Administrator | Memberships, configuration, branches, and broad operations within granted scope |
| Branch Manager | Branch people, resources, work, approvals, and reporting |
| Dispatcher / Office Staff | Requests, customers, scheduling, assignment, and coordination |
| Supervisor | Crew oversight, work review, exceptions, quality, and escalation |
| Storekeeper | Stock, issue, receipt, transfer, reservation, and reconciliation |
| Commercial Approver | Quotations, discounts, scope, contracts, and commercial exceptions |
| Payment-Evidence Verifier | Receipt-evidence review and external reconciliation status |
| Crew Leader | Field responsibility for assigned work and crew reporting |
| Technician / Helper | Authorized field participation and evidence capture |
| Tenant Auditor / Viewer | Restricted read-only operational or audit visibility |

Roles group permissions; they are not the final authorization decision. Effective access also
depends on organization, branch scope, assignment, record sensitivity, lifecycle state, and support
or approval context.

Candidate access scopes are:

- entire organization;
- selected branches;
- own team or supervised teams;
- assigned jobs and related customer/site/equipment context;
- self-only workforce information;
- explicitly approved records or actions.

Custom roles may be considered later, but platform invariants and separation-of-duty controls must
remain enforceable.

## Membership lifecycle

```text
Invited
  -> Active
  -> Suspended or access-limited
  -> Revoked
```

Required lifecycle meaning includes:

- invitation and acceptance are attributable;
- roles and scopes are explicit before access;
- membership suspension stops access without deleting business history;
- role and branch changes are auditable;
- revocation invalidates future access while preserving prior attribution;
- organization ownership cannot be removed without a controlled transfer or replacement rule;
- a user leaving one organization does not affect memberships in another organization.

## Small and enterprise configurations

| Concern | Small organization | Larger organization |
| --- | --- | --- |
| Branches | One implicit branch | Multiple controlled branches |
| Crew | Stable working groups | Permanent and ad-hoc crews |
| Approval | Owner decides directly | Threshold and role-based approval |
| Inventory | One stock location | Warehouses, branches, vehicles, and crew stock |
| Payment evidence | Technician may mark paid | Office verification and reconciliation |
| Scheduling | Owner or office staff | Dispatchers and supervisors by region |
| Customers | Residential and small commercial | Multi-site corporate accounts and contracts |
| Reporting | Operational summary | Branch, contract, SLA, margin, and audit views |
| Roles | Owner may hold several operational roles | Specialized roles, separation of duties, and controlled approvers |
| Platform support | Simple case-based read-only assistance | Formal approval, masking, notification, and security review policies |

## Organization lifecycle

The target model must later define:

- organization creation and ownership;
- initial administrator establishment;
- trial or subscription state;
- member invitation and removal;
- branch creation and closure;
- data import and export;
- organization suspension;
- retention after cancellation;
- secure deletion or anonymization;
- ownership transfer;
- platform-support access and audit.

Commercial subscription behavior is not yet accepted.

### Candidate lifecycle states

| State | Product meaning |
| --- | --- |
| Provisioning | Stable organization identity exists; setup is incomplete |
| Trial | Authorized evaluation under trial limits |
| Active | Normal organization operation is permitted |
| Restricted | Specific capabilities are limited while controlled access remains |
| Suspended | New operational activity is blocked according to policy; data is preserved |
| Cancellation Pending | Service end is scheduled and export/retention actions remain available |
| Retained | Operational access has ended; data remains under the accepted retention policy |
| Deletion Pending | Authorized deletion workflow and recovery window are active |
| Deleted / Anonymized | Retained data has been deleted or anonymized according to policy and audit requirements |

These states are proposed semantics, not an accepted commercial lifecycle. Suspension, retention,
export, recovery, and deletion behavior require later requirements and legal/privacy review.

## Organization boundary invariants

1. Stable tenant identity survives name, brand, domain, branch, subscription, and delivery changes.
2. Tenant records cannot be reassigned to another organization through an ordinary edit.
3. Organization ownership transfer does not rewrite historical actors or audit evidence.
4. Closing a branch does not delete its customers, jobs, stock history, or worker participation.
5. Removing a member does not remove their historical work or decisions.
6. A support session does not make the support user a tenant employee or permanent member.
7. Domain mapping and branded applications cannot grant cross-tenant access.
8. Exports and reports contain data only from the authorized organization and scope.
9. Tenant-scoped identifiers must not be accepted without rechecking their tenant ownership.
10. Background and offline operations must fail safely when organization context is absent or
    inconsistent.

## Open decisions

- `OPEN-003`: branded application store-account ownership.
- `OPEN-004`: shared generic Technician app alongside branded apps.
- `OPEN-005`: subscription, limits, modules, and white-label commercial packaging.
- `OPEN-006`: customer-owned portable equipment history across providers.
- `OPEN-008`: support-session approval, notification, masking, logging, retention, and break-glass.
- `OPEN-009`: first-release organization lifecycle and suspension behavior.
- `OPEN-010`: whether a branch may be a separate legal entity.
- `OPEN-011`: first-release multi-organization membership.
- `OPEN-012`: branch-overridable configuration.
- `OPEN-013`: support actions requiring tenant or dual platform approval.

## WP-02 acceptance criteria

WP-02 is ready for owner review when:

- platform and organization authority are distinct;
- stable organization identity and tenant boundaries are explicit;
- optional branches serve small and enterprise organizations without changing tenant identity;
- user identity, membership, worker, team, and crew meanings are distinguishable;
- platform organization discovery is separated from private tenant-data access;
- support sessions are exceptional, scoped, temporary, and auditable;
- organization roles and access scopes are represented without claiming final authorization design;
- configuration inheritance and non-overridable platform constraints are explicit;
- delivery profiles remain configuration over one maintained product;
- organization and membership lifecycle preserve historical attribution;
- unresolved security, commercial, identity, branch, and delivery decisions remain visible;
- no implementation technology or application code is selected.
