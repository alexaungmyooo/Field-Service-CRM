# System Requirements

## Document control

| Field | Value |
| --- | --- |
| Status | Draft initial requirement baseline |
| Work package | `WP-05 Business Rules and System Requirements` |
| Last updated | 2026-09-30 |

## Requirement language

- **MUST**: required for conformance.
- **MUST NOT**: prohibited for conformance.
- **SHOULD**: expected unless a documented reason justifies deviation.
- **MAY**: optional behavior.

All requirements in this document remain Draft until accepted through the Product Discovery gate.

## Actors

- Platform operator
- Organization owner
- Organization administrator
- Branch manager
- Dispatcher or office staff
- Supervisor
- Crew leader
- Technician or helper
- Storekeeper
- Commercial approver
- Payment-evidence verifier
- Customer contact
- Integration system

One person may hold several roles. Authorization must evaluate permissions and scope, not job title
alone.

## Multi-tenancy and organization

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-ORG-001` | The system MUST isolate tenant-owned operational data by organization. | `PD-001`, `BR-ORG-001` |
| `SR-ORG-002` | The system MUST authorize organization access through active membership and permission scope. | `BR-ORG-002` |
| `SR-ORG-003` | The system MUST support optional branches under an organization. | `CAP-ORG` |
| `SR-ORG-004` | The system MUST support tenant-specific operational configuration without weakening platform invariants. | `BR-ORG-003` |
| `SR-ORG-005` | The system MUST preserve audit evidence for privileged platform-support access to tenant data. | `BR-AUD-003` |

## Tenant delivery and white-label applications

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-DELIVERY-001` | The product MUST provide one shared tenant-aware administration portal rather than requiring a separate admin deployment for every organization. | `PD-010`, `BR-ORG-005` |
| `SR-DELIVERY-002` | The product MUST support mapping an organization to a product subdomain. | `PD-009`, `BR-DELIVERY-001` |
| `SR-DELIVERY-003` | The product MUST support controlled mapping of a verified organization-owned custom domain or subdomain. | `PD-009`, `BR-DELIVERY-001` |
| `SR-DELIVERY-004` | Domain mapping MUST NOT replace authenticated tenant authorization. | `DEC-007`, `BR-DELIVERY-004` |
| `SR-DELIVERY-005` | The product MUST support optional separately branded customer and technician application artifacts for an organization. | `PD-011`, `BR-DELIVERY-002` |
| `SR-DELIVERY-006` | Branded application artifacts MUST derive from shared maintained product code and versioned tenant delivery configuration. | `DEC-006`, `BR-DELIVERY-003`, `BR-DELIVERY-006` |
| `SR-DELIVERY-007` | A branded application MUST resolve its intended tenant safely and MUST NOT permit branding or client configuration to bypass backend authorization. | `BR-DELIVERY-004`, `BR-DELIVERY-005` |
| `SR-DELIVERY-008` | Signing material, provider credentials, and store credentials MUST be stored and operated outside ordinary tenant-editable configuration. | `BR-DELIVERY-007` |
| `SR-DELIVERY-009` | The product MUST provide a role-aware Management Dashboard optimized for quick mobile access. | `PD-012`, `DEC-008`, `BR-DELIVERY-008` |
| `SR-DELIVERY-010` | The Management Dashboard MUST restrict summaries and navigation according to tenant, branch, role, and record authorization. | `BR-DELIVERY-009` |
| `SR-DELIVERY-011` | The Management Dashboard SHOULD provide secure navigation to the relevant detailed Admin Portal view when the authorized user requires more information. | `PD-012` |
| `SR-DELIVERY-012` | The platform MAY distribute the Management Dashboard as a separately branded Manager application without creating a separate management system. | `DEC-008`, `BR-DELIVERY-008` |

## Customer, site, and equipment

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-CRM-001` | Authorized users MUST be able to create and maintain customer accounts and contacts. | `CAP-CRM` |
| `SR-SITE-001` | A customer MUST support multiple service sites and site-specific access information. | `CAP-SITE` |
| `SR-ASSET-001` | Authorized users MUST be able to register equipment without knowing or owning its installation record. | `PD-005`, `BR-ASSET-001` |
| `SR-ASSET-002` | Equipment MUST support partial identity with later controlled enrichment or reconciliation. | `BR-ASSET-002` |
| `SR-ASSET-003` | Equipment history MUST identify the source and confidence of historical information. | `BR-ASSET-003` |
| `SR-ASSET-004` | Equipment movement between sites MUST preserve equipment identity and movement history. | `BR-ASSET-004` |
| `SR-ASSET-005` | The system MUST connect lifecycle events to equipment, site, responsible provider context, and originating work. | `WF-001`, `CAP-ASSET` |

## Requests, work orders, and visits

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-WO-001` | Authorized users MUST be able to capture a service request without a final diagnosis, scope, price, or job type. | `PD-003`, `BR-WO-001`, `WF-002` |
| `SR-WO-002` | A work order MUST support multiple equipment units, visits, service activities, and materials. | `PD-004`, `BR-WO-002` |
| `SR-WO-003` | The system MUST distinguish proposed, approved, performed, and tested work. | `BR-WO-003` |
| `SR-WO-004` | The system MUST support full approval, partial approval, rejection, and revision of proposed work. | `WF-002`, `WF-015` |
| `SR-WO-005` | The system MUST support completed, partial, inspection-only, declined, parts-pending, workshop, replacement-recommended, unresolved, disputed, and follow-up outcomes. | `WF-002` |
| `SR-WO-006` | Controlled reopening MUST record authorizer, reason, time, and affected state. | `BR-WO-007` |
| `SR-WO-007` | The system MUST support configurable job templates, forms, checklists, and required evidence. | `DEC-002`, `BR-WO-008` |

## Crew, scheduling, and field operation

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-CREW-001` | A work assignment MUST support multiple workers and one responsible crew leader. | `PD-002`, `BR-CREW-001`, `BR-CREW-002` |
| `SR-CREW-002` | The system MUST distinguish assigned workers from workers who actually participated. | `BR-CREW-003` |
| `SR-CREW-003` | Crew changes MUST retain history, actor, time, and reason. | `BR-CREW-004` |
| `SR-SCHED-001` | Authorized users MUST be able to schedule, dispatch, reassign, reschedule, and cancel work. | `WF-013`, `WF-018` |
| `SR-SCHED-002` | Scheduling SHOULD identify conflicts for workers, crews, vehicles, and other configured resources. | `BR-CREW-005` |
| `SR-FIELD-001` | Field users MUST be able to record arrival, inspection, diagnosis, proposals, activities, materials, evidence, tests, outcomes, and follow-up needs according to permission. | `CAP-FIELD`, `WF-002` |
| `SR-FIELD-002` | Essential field capture SHOULD remain usable during temporary network loss and synchronize safely later. | `PA-003` |

## Commercial approval

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-COMM-001` | The system MUST support tenant service catalogs and price lists. | `CAP-COMM` |
| `SR-COMM-002` | A quotation MUST preserve revisions and the exact revision approved or rejected. | `WF-015` |
| `SR-COMM-003` | The system MUST support configurable internal approval thresholds for price, discount, and scope. | `PA-004` |
| `SR-COMM-004` | Customer approval MUST identify approved items, actor or evidence, time, and applicable proposal revision. | `BR-WO-004`, `BR-WO-005` |

## Inventory

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-INV-001` | The system MUST support tenant stock locations such as warehouse, branch, vehicle, and crew when enabled. | `CAP-INV` |
| `SR-INV-002` | The system MUST distinguish reservation, issue, consumption, return, transfer, damage, receipt, and adjustment. | `BR-INV-002` |
| `SR-INV-003` | Consumed materials SHOULD connect the work context, equipment when relevant, quantity, cost context, and stock source. | `BR-INV-003` |
| `SR-INV-004` | Cross-tenant stock transactions MUST be prohibited. | `BR-INV-001` |

## External payment evidence

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-PAYEVID-001` | The system MUST NOT claim to initiate, process, hold, or settle an external customer payment. | `PD-006`, `BR-PAYEVID-001` |
| `SR-PAYEVID-002` | Authorized administrators MUST be able to configure approved organization or branch MMQR images. | `WF-017` |
| `SR-PAYEVID-003` | When evidence is mandatory, the system MUST prevent a paid outcome until required evidence is attached. | `PD-007`, `BR-PAYEVID-002` |
| `SR-PAYEVID-004` | The system MUST support tenant policy for direct marking or separate office verification. | `DEC-003`, `BR-PAYEVID-003` |
| `SR-PAYEVID-005` | Payment evidence MUST support amount, method, time, reference when available, image, submitter, verifier, and status. | `WF-017` |
| `SR-PAYEVID-006` | Evidence replacement or removal after closure MUST require authorization and audit history. | `BR-PAYEVID-004` |

## Contracts, warranty, and follow-up

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-CONTRACT-001` | The system MUST support contracts covering customers, sites, equipment, included work, schedules, and service commitments. | `WF-008`, `CAP-CONTRACT` |
| `SR-WARRANTY-001` | Warranty coverage MUST identify responsible provider, covered work or part, dates, terms, and current status. | `BR-ASSET-005` |
| `SR-REWORK-001` | Complaints and rework MUST link to originating work and equipment when known. | `WF-011` |
| `SR-FOLLOW-001` | Follow-up work MUST preserve its reason and relationship to originating work. | `WF-019` |

## Audit, security, and privacy

| ID | Requirement | Trace |
| --- | --- | --- |
| `SR-AUD-001` | The system MUST preserve attributable history for significant status, assignment, scope, approval, evidence, warranty, and stock changes. | `BR-AUD-001` |
| `SR-AUD-002` | Corrections MUST NOT silently erase historical business decisions or values. | `BR-AUD-002` |
| `SR-SEC-001` | Authorization MUST be enforced in trusted service boundaries and MUST NOT rely on client visibility. | `BR-ORG-002` |
| `SR-SEC-002` | Photos, documents, signatures, and payment evidence MUST be accessible only to authorized tenant-scoped users and controlled support roles. | `CAP-DOC`, `CAP-IAM` |
| `SR-PRIV-001` | The system MUST minimize unnecessary personal information in logs, exports, tests, and operational evidence. | `CAP-PLATFORM` |

## Quality requirements requiring measurable targets

The following areas are mandatory but do not yet have accepted quantitative targets:

- performance and response time;
- tenant and record scalability;
- availability and reliability;
- offline duration and synchronization behavior;
- photo upload size, compression, and retry;
- backup and recovery objectives;
- retention and deletion;
- localization and Myanmar text fidelity;
- accessibility;
- browser and device compatibility;
- observability and incident response;
- import, export, and integration limits.

Targets must be established through architecture analysis and technical proofs rather than guessed
inside application code.

## Current architecture blockers

- Accepted tenant and membership model
- Accepted workflow and state semantics
- Offline conflict policy
- Attachment security and retention
- Equipment identity and duplicate reconciliation
- Commercial document and numbering rules
- Inventory costing and negative-stock policy
- Payment-evidence verification and privacy policy
- Multi-organization platform administration boundary
- White-label build, signing, store ownership, release, upgrade, and support model
- Custom-domain verification, certificate lifecycle, and tenant-routing model
- Initial release capability disposition
