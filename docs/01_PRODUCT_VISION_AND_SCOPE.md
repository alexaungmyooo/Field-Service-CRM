# Product Vision and Scope

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — Product Vision baseline |
| Work package | `WP-01 Product Vision and Boundaries` |
| Owner | Aung Myo Oo |
| Last updated | 2026-09-30 |

## Vision

Provide service organizations with one operational system that connects customer relationships,
customer locations, installed equipment, service requests, crews, field execution, materials,
commercial approvals, service history, and management control.

The platform should be easy enough for a small organization to adopt without becoming a separate,
limited product that cannot support larger organizations.

## Product mission

Help a service organization replace fragmented notebooks, calls, chat messages, spreadsheets, and
unconnected applications with one trustworthy operational history from customer request through
service completion and future follow-up.

The system should make daily work easier for the field crew and office while giving management
timely control over exceptions, commitments, resources, and service quality.

## Product identity

`Field Service CRM` is the working product name. It describes a business-to-business platform with
customer-facing services rather than a consumer marketplace.

The product has two complementary responsibilities:

- **CRM responsibility:** understand the customer, contacts, sites, equipment, communication,
  commercial history, and ongoing relationship.
- **Field-service responsibility:** control requests, appointments, crews, visits, work scope,
  materials, evidence, outcomes, warranty, and follow-up.

Neither responsibility is complete without the other.

## Product positioning

Field Service CRM combines:

- customer relationship management;
- field service management;
- equipment and service-history management;
- crew scheduling and dispatch;
- field-work evidence;
- quotation and approval control;
- inventory and material usage;
- service contracts and preventive maintenance;
- external payment-evidence recording;
- operational reporting and organizational administration.

It is not merely a sales CRM, calendar, technician tracker, invoicing tool, or inventory system.

## Target organizations

The product must accommodate:

- small owner-operated service businesses;
- growing businesses with office staff and several crews;
- multi-branch service companies;
- enterprise service organizations with supervisors, approvals, contracts, warehouses, and large
  customer portfolios;
- later adaptation to other field-service industries through configuration rather than a separate
  platform.

### Organization profiles

| Profile | Typical operating need | Product response |
| --- | --- | --- |
| Owner-operated | One location, a few workers, direct decisions | Simple defaults and minimal mandatory administration |
| Growing service company | Office staff, several crews, stock, quotations, and follow-up | Coordinated scheduling, role separation, inventory, and management visibility |
| Multi-branch company | Branch managers, several warehouses, regional crews, and shared customers | Branch scope, cross-branch governance, transfers, consolidated reporting, and approvals |
| Enterprise service operation | Corporate contracts, many sites/assets, formal service commitments, and audit requirements | Contracts, service levels, projects, governed workflows, integrations, and advanced controls |

The product must not require a small organization to simulate enterprise structure. Enterprise
capability must be enabled through configuration and permissions over the same core domain.

## Customer profiles

The organization may serve:

- residential customers and households;
- small businesses;
- commercial customers with several contacts or locations;
- corporate accounts with many sites and equipment units;
- property, facility, or project stakeholders with different approval and service responsibilities.

The customer account, service site, contact, equipment owner, payer, approver, and person present at
the site may be different parties. Later domain work must preserve those distinctions.

## Supported operating models

The target product covers:

- on-demand service and repair;
- scheduled routine service;
- emergency work;
- inspection followed by on-site or later quotation;
- new installation and multi-unit installation projects;
- relocation, removal, workshop repair, and return visits;
- warranty, complaints, and rework;
- preventive-maintenance contracts and recurring visits;
- residential, commercial, and multi-site field operations.

## Initial domain

The initial validation domain is Myanmar air-conditioning service, including:

- inspection and diagnosis;
- cleaning and routine service;
- gas and leakage work;
- repair and part replacement;
- new installation;
- relocation and uninstallation;
- workshop repair;
- warranty and rework;
- preventive-maintenance contracts;
- emergency service;
- multi-unit and multi-site commercial work.

## Product principles

1. Simple defaults, configurable depth.
2. Complete customer-to-service-history journeys rather than disconnected features.
3. Crew-based work is a first-class model.
4. Field conditions may change the work scope.
5. Equipment history is independent of who installed the equipment.
6. Tenant isolation is a platform trust boundary.
7. Important work, approvals, evidence, and changes are auditable.
8. Weak connectivity must not make essential field recording unusable.
9. Myanmar language, currency, addresses, and operating practices are first-class concerns.
10. Advanced enterprise control must not burden a small tenant that does not enable it.
11. One maintained product serves all tenants; branding and configuration must not create divergent
    product forks.
12. Security, privacy, and tenant isolation are designed into business behavior rather than added
    after implementation.
13. Management sees concise operational truth; detailed administration remains available without
    forcing every manager into daily dispatch workflows.
14. Product completeness describes the accepted target capability, not a promise to deliver every
    capability in one release.

## Product surfaces

### Shared Admin Portal

The full tenant-aware operational workspace for authorized office staff, dispatchers, supervisors,
storekeepers, administrators, and management. It owns detailed configuration and operational work.

### Management Dashboard

A required role-aware experience optimized for quick mobile visibility into operational health,
exceptions, alerts, approvals, and trends. Detailed investigation continues in the Admin Portal.
A separately distributed branded Manager app is optional.

### Technician App

The field experience for crew leaders, technicians, and helpers. It supports assignments, site and
equipment context, inspection, diagnosis, proposals, work, materials, evidence, tests, outcomes,
and controlled offline behavior. An organization may request a branded application.

### Customer App or Portal

The customer-facing experience for service requests, appointments, equipment visibility,
approvals, progress, documents, reminders, and organization-approved communication. The exact
first-release boundary between mobile application and web portal remains undecided. An organization
may request branded delivery.

### Organization Web Identity

An organization may use the shared product domain, a product subdomain, or a verified custom domain
for applicable customer-facing experiences. Domain identity selects presentation and tenant
context; it is not an authorization mechanism.

### Platform Operations

A trusted internal operational surface may later support tenant lifecycle, delivery profiles,
support access, release control, monitoring, and recovery. It is not an organization admin portal
and does not grant routine access to tenant business data.

Authorized platform roles may discover and manage all organizations at the platform level using
organization metadata such as identity, lifecycle status, enabled capabilities, delivery state,
service health, and support cases. Discovering an organization does not grant routine access to its
customers, jobs, employees, evidence, payment records, or other private operational data.

Private tenant-data access is exceptional. It requires an explicit support session with an
organization, reason, permission scope, access mode, expiry, and complete audit history. Support
access is read-only by default. Elevated modification and emergency access require stronger
authorization and later security-architecture definition.

## In-scope product areas

- Multi-tenant organization administration
- One shared tenant-aware administration portal
- A role-aware Management Dashboard optimized for quick mobile access
- Optional organization subdomains or verified custom domains
- Optional white-label customer, technician, and manager applications per organization
- Branches, teams, crews, users, roles, and permissions
- Customers, contacts, sites, and equipment
- Service requests, appointments, work orders, and visits
- Dynamic inspection, diagnosis, service, repair, and installation activities
- Quotations, revisions, discounts, and approvals
- Price lists and service catalogs
- Materials, parts, warehouses, vehicles, and crew stock
- Completion evidence, customer confirmation, and service reports
- Warranty, complaints, rework, and follow-up jobs
- Maintenance contracts, schedules, and service commitments
- External MMQR and other payment-evidence recording
- Dashboards, operational reports, exports, and audit history
- Mobile field experience and offline coordination
- Configurable notifications and integrations

## Scope layers

### Core domain

Required foundation shared by organization sizes:

- tenant isolation and organization membership;
- customers, contacts, sites, and equipment;
- service requests, appointments, crews, work orders, and visits;
- dynamic service scope, approval, performed work, evidence, outcome, and history;
- role-aware authorization and auditability.

### Operational modules

Target product capabilities that may be enabled or introduced by controlled delivery stage:

- service catalogs, price lists, quotations, and commercial approvals;
- inventory, vehicles, warehouses, purchasing, and material usage;
- contracts, preventive maintenance, warranties, complaints, and rework;
- projects, multi-site work, customer experiences, notifications, reporting, and integrations;
- external payment evidence and verification.

### Delivery and enterprise options

- organization subdomains and verified custom domains;
- white-label customer, technician, and optional manager applications;
- multi-branch governance, advanced approvals, service commitments, integrations, and large-scale
  reporting.

These layers organize product scope. They do not yet define subscription tiers or release dates.

## Current non-goals

- Processing, holding, or settling customer funds
- Replacing a complete general ledger or statutory accounting system
- Sharing one tenant's private customer or job data with another tenant by default
- Assuming that the current service provider installed the equipment
- Requiring every organization to use identical statuses, approvals, or workflows
- Maintaining independent source-code forks for each organization's branded application
- Operating a public marketplace that assigns customer jobs across unrelated service organizations
- Treating employee payroll, full human-resources management, or statutory tax filing as core
  field-service responsibilities
- Promising a global cross-provider equipment history without explicit customer authorization and
  a separately accepted privacy model
- Allowing branding, custom domains, or client applications to bypass tenant authorization
- Selecting a technology stack during Product Discovery

## Product success

The product succeeds when an organization can reliably answer:

- Who requested service and for which location and equipment?
- Which crew is responsible and what is the current operational state?
- What was inspected, proposed, approved, performed, and tested?
- Which materials were reserved, used, returned, or still required?
- What evidence and customer confirmation exist?
- What remains unpaid, unverified, incomplete, disputed, under warranty, or awaiting follow-up?
- What is the complete service history and next required action?
- Can management trust that records are complete, attributable, and tenant-isolated?

### Adoption outcomes

- Office staff can capture and control work without maintaining a parallel notebook or spreadsheet
  as the real source of truth.
- Field crews can complete required records under realistic time and connectivity constraints.
- Small organizations can begin with simple defaults and progressively enable more control.

### Operational outcomes

- Requests, assignments, scope changes, approvals, materials, evidence, outcomes, and follow-up are
  visible and attributable.
- Management can identify exceptions and overdue responsibilities quickly.
- Equipment and customer history remains useful across repeated service visits.

### Platform outcomes

- Tenant data remains isolated across every delivery surface.
- Platform support can diagnose tenant incidents without receiving permanent unrestricted access
  to tenant business data.
- Branded delivery remains aligned with one maintained product.
- The system can grow from one branch and a few workers to multi-branch operations without changing
  the meaning of core records.

Quantitative targets will be established in system requirements and technical proofs; they must not
be invented during vision work.

## Open vision decisions

- The boundary between air-conditioning specialization and generic service-industry configuration
  requires a later accepted decision.
- Commercial packaging, subscriptions, and tenant limits are not yet defined.
- The exact boundary between customer mobile applications, customer web portals, and portable
  customer-owned equipment history remains to be defined.
- White-label distribution ownership, app-store accounts, release policy, and commercial packaging
  remain to be defined.
- A separately distributed Manager app is optional; the required Management Dashboard may be
  delivered through the responsive administration experience.
- SaaS billing is separate from customer payment-evidence recording and remains undefined.

## WP-01 acceptance criteria

WP-01 is ready for owner review when:

- the product mission and working identity are explicit;
- target organizations and customers include small through enterprise use;
- air-conditioning is the initial domain without becoming a permanent hard-coded product limit;
- shared and optional product surfaces are distinguishable;
- the shared Admin Portal and required Management Dashboard relationship is clear;
- subdomain, custom-domain, and white-label boundaries are clear without selecting technology;
- core scope, operational modules, delivery options, and non-goals are separated;
- product success is expressed as observable outcomes;
- unresolved commercial and delivery decisions remain visible;
- application coding and architecture remain closed.

## Acceptance record

The owner accepted this Product Vision and Boundaries baseline on 2026-09-30. Future material
changes require an identified decision and updates to affected governing documents before
implementation.
