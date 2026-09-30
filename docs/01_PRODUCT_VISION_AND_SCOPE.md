# Product Vision and Scope

## Document control

| Field | Value |
| --- | --- |
| Status | Draft |
| Work package | `WP-01 Product Vision and Boundaries` |
| Owner | Aung Myo Oo |
| Last updated | 2026-09-30 |

## Vision

Provide service organizations with one operational system that connects customer relationships,
customer locations, installed equipment, service requests, crews, field execution, materials,
commercial approvals, service history, and management control.

The platform should be easy enough for a small organization to adopt without becoming a separate,
limited product that cannot support larger organizations.

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

## Current non-goals

- Processing, holding, or settling customer funds
- Replacing a complete general ledger or statutory accounting system
- Sharing one tenant's private customer or job data with another tenant by default
- Assuming that the current service provider installed the equipment
- Requiring every organization to use identical statuses, approvals, or workflows
- Maintaining independent source-code forks for each organization's branded application
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
