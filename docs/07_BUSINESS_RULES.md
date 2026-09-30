# Business Rules

## Document control

| Field | Value |
| --- | --- |
| Status | Draft rule register |
| Work package | `WP-05 Business Rules and System Requirements` |
| Last updated | 2026-09-30 |

## Rule language

Rules marked Owner-stated preserve directly supplied product behavior. Proposed rules require
owner review before they govern architecture or implementation.

## Organization and security

| ID | Rule | Status |
| --- | --- | --- |
| `BR-ORG-001` | Every tenant-owned operational record must have one authoritative organization boundary. | Proposed |
| `BR-ORG-002` | A user may act inside an organization only through an active authorized membership. | Proposed |
| `BR-ORG-003` | Tenant configuration must not weaken platform isolation, audit, or security invariants. | Proposed |
| `BR-ORG-004` | Branch restrictions and cross-branch access must be explicit and attributable. | Proposed |
| `BR-ORG-005` | One shared administration portal may serve many organizations, but every operation must remain tenant-authorized. | Owner-stated |

## Tenant delivery and branding

| ID | Rule | Status |
| --- | --- | --- |
| `BR-DELIVERY-001` | An organization may use a product subdomain or a verified custom domain. | Owner-stated |
| `BR-DELIVERY-002` | An organization may have separately branded customer and technician applications. | Owner-stated |
| `BR-DELIVERY-003` | Branded applications must be generated from shared maintained product code, not independently modified tenant forks. | Proposed |
| `BR-DELIVERY-004` | Domain, brand, or application identity must not replace authenticated tenant authorization. | Proposed |
| `BR-DELIVERY-005` | A branded application artifact must be bound to one intended organization unless explicitly designed as a shared multi-organization application. | Proposed |
| `BR-DELIVERY-006` | Brand configuration changes and application releases must be versioned and attributable. | Proposed |
| `BR-DELIVERY-007` | Signing material, provider credentials, and store credentials must not be exposed as ordinary tenant-editable configuration. | Proposed |
| `BR-DELIVERY-008` | The product must provide a role-aware, mobile-optimized Management Dashboard; a separate branded Manager app is optional. | Accepted |
| `BR-DELIVERY-009` | Management summaries and links must respect tenant, branch, role, and record-level authorization. | Proposed |

## Customer, site, and equipment

| ID | Rule | Status |
| --- | --- | --- |
| `BR-ASSET-001` | Equipment registration must not require the current tenant to be the installer. | Owner-stated |
| `BR-ASSET-002` | Installer, installation date, model, and serial number may initially be unknown. | Proposed |
| `BR-ASSET-003` | Tenant-performed history, customer-reported history, imported evidence, and technician observation must remain distinguishable. | Proposed |
| `BR-ASSET-004` | Moving equipment between sites must preserve its identity and movement history. | Proposed |
| `BR-ASSET-005` | A warranty record must identify responsible provider, covered work or part, term, and status. | Proposed |

## Crew and assignment

| ID | Rule | Status |
| --- | --- | --- |
| `BR-CREW-001` | A work order may be assigned to two or more workers. | Owner-stated |
| `BR-CREW-002` | Every active crew assignment must identify one responsible leader. | Proposed |
| `BR-CREW-003` | Assigned and actually participating workers must be distinguishable. | Proposed |
| `BR-CREW-004` | Crew membership changes after assignment must retain actor, time, and reason. | Proposed |
| `BR-CREW-005` | Scheduling must identify conflicts for workers and other reserved operational resources. | Proposed |

## Work order and field execution

| ID | Rule | Status |
| --- | --- | --- |
| `BR-WO-001` | A service request may be created without a final diagnosis, service type, price, or complete equipment identity. | Owner-stated |
| `BR-WO-002` | One visit may contain multiple services, repairs, materials, and equipment units. | Owner-stated |
| `BR-WO-003` | Proposed, approved, performed, and tested work must remain distinguishable. | Proposed |
| `BR-WO-004` | Additional chargeable work requires customer approval according to tenant policy. | Proposed |
| `BR-WO-005` | Partial approval must not authorize rejected proposal items. | Proposed |
| `BR-WO-006` | A visit may close with a controlled incomplete outcome only when its required follow-up or disposition is recorded. | Proposed |
| `BR-WO-007` | Reopening a closed job requires authorization, reason, and audit history. | Proposed |
| `BR-WO-008` | Required evidence and checklists depend on job template and tenant policy. | Proposed |

## Inventory

| ID | Rule | Status |
| --- | --- | --- |
| `BR-INV-001` | A stock transaction belongs to one tenant and cannot move quantity across tenants. | Proposed |
| `BR-INV-002` | Reservation, issue, consumption, return, transfer, damage, and adjustment are distinct stock meanings. | Proposed |
| `BR-INV-003` | Material recorded as consumed by work must reference its work context and stock source when inventory tracking is enabled. | Proposed |
| `BR-INV-004` | Negative stock behavior is a tenant policy bounded by platform integrity rules. | Proposed |

## External payment evidence

| ID | Rule | Status |
| --- | --- | --- |
| `BR-PAYEVID-001` | The platform records external payment evidence but does not process the payment. | Owner-stated |
| `BR-PAYEVID-002` | When tenant policy requires a receipt photo, paid status cannot be recorded without one. | Owner-stated |
| `BR-PAYEVID-003` | Evidence submission and payment verification are separate states when verification is enabled. | Proposed |
| `BR-PAYEVID-004` | Payment evidence replacement or removal after job closure requires authorization and audit history. | Proposed |
| `BR-PAYEVID-005` | Full, partial, pending, credit, rejected-evidence, adjustment, and refund meanings must remain distinguishable. | Proposed |

## Audit and history

| ID | Rule | Status |
| --- | --- | --- |
| `BR-AUD-001` | Significant status, assignment, scope, approval, financial-evidence, warranty, and stock changes must be attributable. | Proposed |
| `BR-AUD-002` | Corrections must not erase the historical fact that an earlier value or decision existed. | Proposed |
| `BR-AUD-003` | Platform-support access to tenant data must be exceptional and auditable. | Proposed |
