# Multi-Organization Model

## Document control

| Field | Value |
| --- | --- |
| Status | Draft |
| Work package | `WP-02 Multi-Organization Foundation` |
| Last updated | 2026-09-30 |

## Purpose

Define how independent service organizations use one platform without losing data ownership,
privacy, operational independence, or configuration control.

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

### Organization / tenant

An independent service business with its own customers, workers, configurations, operational
records, and data-ownership boundary.

### Branch

An optional operating subdivision that may have its own crews, service area, stock, price lists,
documents, MMQR image, and approval hierarchy.

### Membership

The relationship between a user identity and an organization. A single identity may later hold
memberships in multiple organizations, but permissions and data context remain separate.

### Team and crew

A team is a continuing organizational grouping. A crew is the actual set of workers assigned to a
job or period. A permanent team may be reused as a crew; an ad-hoc crew may cross team boundaries.

## Tenant isolation principles

1. Every tenant-owned record has an authoritative tenant boundary.
2. Authorization is enforced by trusted backend behavior, not hidden UI controls.
3. Tenant context is explicit for every state-changing operation.
4. Cross-tenant queries are denied by default.
5. Platform support access is exceptional, time-bounded, attributable, and auditable.
6. Tenant exports do not expose another tenant's identifiers or records.
7. Tenant configuration cannot weaken platform security invariants.
8. Shared reference catalogs, if introduced, remain distinct from tenant-owned operational data.

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

## Open decisions

- Whether one user identity may belong to multiple organizations in the first release.
- Whether organizations can share an equipment passport with customer consent.
- Whether branches may use separate legal identities or only operational subdivisions.
- Whether plan limits are enforced by users, crews, jobs, branches, storage, or capabilities.
- Which platform-operator support actions are permitted and how approval is obtained.
- Whether branded applications are published through platform-owned or organization-owned store
  accounts, and which option is supported first.
- Whether a shared generic customer or technician application is offered alongside white-label
  applications.
- How many concurrently supported branded application versions and release channels are allowed.
