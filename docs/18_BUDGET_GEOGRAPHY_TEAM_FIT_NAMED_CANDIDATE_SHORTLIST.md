# Budget, Geography, Team Fit and Named Candidate Shortlist

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted owner-decision and shortlist baseline |
| Work package | `WP-15 Budget, Geography, Team Fit and Named Candidate Shortlist` |
| Owner | Aung Myo Oo |
| Evidence snapshot | 2026-10-07 |
| Final architecture selection | Not authorized |
| Technical-proof execution | Not authorized |
| Application coding/dependencies/deployment | Not authorized |
| Last updated | 2026-10-07 |

## Purpose and authority boundary

This package recommends explicit planning dispositions for `OPEN-088` through `OPEN-091` and uses
them to compare a small named technology and provider shortlist. It is an owner-decision document
and option analysis, not a final architecture decision, dependency manifest, price quote, proof
result, or implementation plan.

Named candidates remain unselected. “Advance” means retain for later decision/proof planning;
“comparative” means keep as a bounded alternative; “defer” and “reject initial” have the meanings
accepted in WP-13. No product account, trial, calculator estimate, infrastructure, dependency,
schema, API, application, or deployment is created by this package.

## Governing inputs

- `QBD-001` through `QBD-015` are architecture-evaluation baselines.
- `EVAL-BASE-001` through `EVAL-BASE-012` govern the initial operating envelope.
- `SHORTLIST-001` is the primary architecture profile and `SHORTLIST-002` is comparative.
- `SHORTLIST-003` is deferred and `SHORTLIST-004` is rejected for the initial architecture.
- `TECH-CAT-001` through `TECH-CAT-020` and `TECH-SET-001/002` are the accepted
  provider-neutral evaluation baseline.
- Tenant isolation, server-authoritative permission, assignment-scoped offline work, recoverable
  evidence, one maintained product, and “no photo, no paid” remain mandatory gates.

## Evidence and confidence method

| Evidence class | Meaning |
| --- | --- |
| `OFFICIAL-CURRENT` | Dated vendor/project documentation or pricing page read for this package |
| `LOCAL-DEMONSTRATED` | Existing owner-operated repository manifest, build, or validation workflow |
| `PLANNING-ASSUMPTION` | Explicit planning input whose accepted status is recorded separately |
| `PROOF-REQUIRED` | Suitability cannot be established by documentation analysis |

Vendor pages establish advertised availability, lifecycle, and pricing mechanics only. They do not
prove Myanmar connectivity, tenant safety, recovery, production cost, support quality, device
behavior, or fitness for this product. All prices are USD list-price observations on the evidence
date, exclude tax and contract discounts, and may change.

## Recommended owner decisions

### Budget and commercial control

| ID | Recommended disposition | Status | Consequence |
| --- | --- | --- | --- |
| `BUDGET-BASE-001` | Use USD as provider-comparison currency and also record paid MMK plus exchange rate/date in actual cost reports. | Accepted | Comparable provider analysis without hiding Myanmar cash exposure |
| `BUDGET-BASE-002` | Keep combined proof, development, and test provider spend at or below USD 100/month on average until a separately authorized production package. | Accepted | Experiments cannot create an unnoticed permanent cost base |
| `BUDGET-BASE-003` | For `PLAN-H-001` and the accepted `QTB-009` initial horizon of up to 50 organizations, target recurring production provider spend at or below USD 300/month and require owner review before exceeding USD 500/month. | Accepted | Concrete rejection/review boundary for the initial commercial system |
| `BUDGET-BASE-004` | Once subscriptions are collected, target recurring provider spend at or below 20% of recurring software revenue; re-evaluate by tenant, active user, work order, stored GiB, and transferred GiB. | Accepted | Cost must follow revenue and expose expensive workloads |
| `BUDGET-BASE-005` | Exclude salaries, devices, internet, taxes, domains, app-store memberships, SMS/OTP, customer-specific integrations, and one-time migration/support from the USD 300/500 infrastructure envelope; approve them separately. | Accepted | The infrastructure number is not mistaken for total business cost |
| `BUDGET-BASE-006` | Do not set a growth/enterprise budget now; re-baseline before `PLAN-H-002`, any dedicated tenant placement, 24/7 support, multi-region service, or contractual SLA. | Accepted | Early architecture does not promise enterprise operations without revenue |

The USD 300 target is a planning ceiling, not permission to spend it and not proof that
`QTB-009` fits it. A provider candidate must still produce a versioned cost model containing
compute, database, backup, evidence storage, retrieval/egress, identity, logs/metrics, build,
domains/certificates, support, and failure/recovery capacity.

### Geography, residency, and recovery

| ID | Recommended disposition | Status | Consequence |
| --- | --- | --- | --- |
| `GEO-BASE-001` | Use Singapore as the primary initial hosting and tenant-data residency geography for candidate evaluation. | Accepted | Common nearby comparison point across the strongest shortlisted providers |
| `GEO-BASE-002` | Keep operational database, private evidence objects, queue state, logs containing tenant data, and primary backups in the declared Singapore boundary unless a later decision authorizes otherwise. | Accepted | Data location is explicit and reviewable |
| `GEO-BASE-003` | Evaluate one Singapore region with multiple failure domains where the provider supports them; do not claim multi-region continuity. | Accepted | Matches lean operations while making regional outage limitation visible |
| `GEO-BASE-004` | Treat Thailand and Jakarta as comparison/future-recovery locations, not production destinations, until service coverage, cost, legal, and recovery evidence is reviewed. | Accepted | Nearby location availability cannot silently move tenant data |
| `GEO-BASE-005` | Require measured Myanmar fixed/mobile network tests to Singapore before provider selection. | Accepted | Geographic proximity is not accepted latency or weak-network evidence |
| `GEO-BASE-006` | Require qualified Myanmar/Singapore privacy and cross-border review before production data is hosted. | Accepted | Architecture analysis does not provide legal approval |

Official region lists currently show AWS Singapore and Thailand regions, Google Cloud Run and Cloud
SQL in Singapore, Azure Southeast Asia in Singapore, and DigitalOcean `SGP1`. No shortlisted
provider evidence identifies a Myanmar cloud region. Singapore is therefore the common evaluation
baseline, not a legally accepted production location or proven network winner.

### Team fit and operating capacity

| ID | Recommended disposition | Status | Consequence |
| --- | --- | --- | --- |
| `TEAM-BASE-001` | Treat TypeScript/Node.js/React and Dart/Flutter as demonstrated team families. | Accepted | Reuses current owner-operated build and validation knowledge |
| `TEAM-BASE-002` | Limit the initial maintained product to those two application-language families; SQL and infrastructure configuration do not create another application stack. | Accepted | Controls cognitive and hiring burden |
| `TEAM-BASE-003` | Use a modular monolith and bounded workers before independently deployed domain services. | Accepted | Preserves `SHORTLIST-001` and clear extraction seams |
| `TEAM-BASE-004` | Assume one owner-led small engineering team, business-hours support, and no dedicated database, security, SRE, mobile-release, or 24/7 on-call role. | Accepted | Managed capability and simple recovery remain strong evaluation preferences |
| `TEAM-BASE-005` | Require reproducible automation, managed backups, cost alerts, supported runtime versions, and documented rollback/restore; managed service ownership does not replace product accountability. | Accepted | Small-team fit is operational discipline, not absence of operations |
| `TEAM-BASE-006` | Defer a new core language or self-managed platform unless it demonstrates a mandatory-gate advantage that exceeds learning and support cost. | Accepted | Popularity alone cannot expand the stack |

`LOCAL-DEMONSTRATED` evidence comes from the existing owner-operated Dhammadhara repository inspected
on 2026-10-07: its manifests and validation commands use Node.js, pnpm, TypeScript, React, and
Flutter/Dart across server, web, administration, and mobile work. This proves workflow familiarity,
not mastery of every candidate framework or this product’s correctness.

### Client platforms and distribution

| ID | Recommended disposition | Status | Consequence |
| --- | --- | --- | --- |
| `CLIENT-BASE-001` | Require an installed Android Technician client for the initial field release. | Accepted | Camera, assignment-scoped offline storage, background transfer, and device recovery can be proved on target devices |
| `CLIENT-BASE-002` | Keep the same Flutter client build-compatible with iOS, but make iOS commercial release conditional on customer demand, device proof, signing ownership, and store operations. | Accepted | Preserves cross-platform design without doubling launch work |
| `CLIENT-BASE-003` | Deliver Customer access as responsive/installable web first. | Accepted | Avoids mandatory customer store installation while preserving later shared app evaluation |
| `CLIENT-BASE-004` | Deliver Admin and the role-aware Management Dashboard through responsive web first. | Accepted | Management gets quick mobile visibility without a mandatory separate Boss app |
| `CLIENT-BASE-005` | Keep tenant-branded Technician/Customer artifacts optional and later; never create tenant source forks. | Accepted | Preserves the accepted white-label capability and one maintained product |

Exact Android OS/device support, app-store account ownership, sideload policy, iOS launch timing,
push-notification provider, and branded release limits remain later proof and owner decisions.

## Effect on open decisions

| Open item | WP-15 recommendation | Closure condition |
| --- | --- | --- |
| `OPEN-088` budget | Accept `BUDGET-BASE-001` through `006` for architecture evaluation | Owner accepts or revises the complete budget set |
| `OPEN-089` geography/residency | Accept `GEO-BASE-001` through `006` for evaluation; legal approval remains separate | Owner accepts the set; `OPEN-093` remains for production |
| `OPEN-090` team fit | Accept `TEAM-BASE-001` through `006` | Owner confirms current capacity and support assumption |
| `OPEN-091` client platforms | Accept `CLIENT-BASE-001` through `005` | Owner accepts the initial platform/distribution set |

The owner accepted these recommendations on 2026-10-07, resolving `OPEN-088` through `OPEN-091`
for architecture evaluation. They are evaluation baselines rather than provider, dependency,
proof, legal/privacy, production-hosting, or release decisions.

## Named technology shortlist

| ID | Category | Named candidate | Disposition | Fit | Principal gap or later evidence |
| --- | --- | --- | --- | --- | --- |
| `NAMED-TECH-001` | Admin/Management/Customer web | React with TypeScript and Vite | Advance | Demonstrated family; static delivery; shared component/testing ecosystem | Accessibility, Myanmar text, PWA update, custom-domain proof |
| `NAMED-TECH-002` | Web alternative | Next.js with React/TypeScript | Comparative | Adds server rendering and integrated routing when a public/SSR need exists | Extra server/runtime surface is unjustified for authenticated portals today |
| `NAMED-TECH-003` | Technician client | Flutter/Dart for Android first and iOS-compatible source | Advance | Demonstrated family; installed multi-platform client; official offline guidance | `TP-CAND-002/003/004/005`, background/device/store proof |
| `NAMED-TECH-004` | Mobile alternative | React Native/TypeScript | Defer | Could reduce language count | No demonstrated repository evidence; migration/plugin/device proof cost |
| `NAMED-TECH-005` | Server runtime | A supported Node.js LTS line | Advance | Demonstrated TypeScript runtime with published lifecycle | Exact LTS version waits for implementation and dependency compatibility gate |
| `NAMED-TECH-006` | Server framework | NestJS on Node.js | Advance | TypeScript modules, guards, validation, testing, and conventional boundaries fit modular monolith analysis | Team proof, tenancy/context discipline, cold/start/resource measurements |
| `NAMED-TECH-007` | Server alternative | ASP.NET Core on supported .NET | Defer | Mature runtime and enterprise support market | Adds an unproven core language/toolchain with no mandatory-gate advantage yet |
| `NAMED-TECH-008` | API | HTTP JSON resource/command API described by OpenAPI | Advance | Explicit versioning, idempotency, validation, client generation, and bounded operations | Contract/error/pagination/compatibility design and proof |
| `NAMED-TECH-009` | API alternative | GraphQL | Comparative | Demonstrated team exposure and useful bounded aggregation | Query cost, authorization, caching, offline commands, and unrestricted-query controls |
| `NAMED-TECH-010` | Operational database | PostgreSQL on a currently supported major version | Advance | Transactions, constraints, indexing, portability, managed availability, and long support policy | Tenant enforcement, RLS/application interaction, restore, scale proof |
| `NAMED-TECH-011` | Database alternative | MySQL 8 family | Comparative | Demonstrated adjacent MariaDB experience and broad managed availability | Weaker fit to proposed defense-in-depth tenant-policy evaluation; compare objectively |
| `NAMED-TECH-012` | Flutter offline store | SQLite with Drift | Advance to proof planning | Typed queries, migrations, transactions, reactive access, and SQLite portability | Encryption/key handling, background isolates, migration and corruption recovery proof |
| `NAMED-TECH-013` | Flutter offline alternative | SQLite with sqflite | Comparative | Smaller abstraction and broad familiarity | More application-owned mapping/migration discipline; encryption still unresolved |
| `NAMED-TECH-014` | Managed identity | Google Cloud Identity Platform | Advance | Demonstrated Firebase Authentication client exposure; standards and B2B tenant capability available | IdP tenant is not product organization authority; recovery/export/pricing/security proof |
| `NAMED-TECH-015` | Managed identity alternative | Amazon Cognito user pools | Comparative | OIDC provider, managed user directory, usage pricing, AWS bundle fit | Tenant mapping, UX, recovery, export, regional continuity, and advanced-feature cost |
| `NAMED-TECH-016` | Self-operated identity | Keycloak | Defer | Open standards and greater control | Patching, availability, backup, incident, and security operations exceed current team baseline |
| `NAMED-TECH-017` | Telemetry convention | OpenTelemetry SDKs/semantic conventions | Advance | Keeps instrumentation portable across provider backends | Cardinality, redaction, retention, and incident usefulness proof |
| `NAMED-TECH-018` | Build/release | GitHub Actions plus OCI container images and signed mobile artifacts | Advance to later design | Repository fit and portable server artifact | Supply-chain, secret, provenance, signing, branded matrix, rollback design |

No ORM/query builder, migration library, encryption package, policy engine, push provider, or exact
version is selected here. `OPEN-096` deliberately preserves that dependency-level decision until
the tenant, migration, offline, and encryption proof packages are defined.

## Licensing, lifecycle, security, and support posture

| ID | Candidate group | Recorded posture | Remaining selection gate |
| --- | --- | --- | --- |
| `CAND-GOV-001` | React and Vite | Current project repositories state MIT licenses; exact versions are not selected. | Exact-version notices, dependency inventory, security policy, and maintenance cadence |
| `CAND-GOV-002` | Flutter | Current framework repository uses a BSD-style three-clause license; supported platform versions change with Flutter releases. | Exact SDK/plugin licenses, release support, device floor, signing, and security response |
| `CAND-GOV-003` | Node.js and NestJS | Node.js publishes an LTS/EOL schedule and a project/third-party license file; NestJS currently states MIT. | Exact supported LTS, framework/dependency compatibility, advisories, and upgrade ownership |
| `CAND-GOV-004` | PostgreSQL | PostgreSQL uses the PostgreSQL License and supports each major for five years. | Provider engine-version schedule, extension policy, upgrades, backup/export, and security patch timing |
| `CAND-GOV-005` | Drift and sqflite | Current repositories state MIT and BSD 2-Clause respectively. | Exact package/plugin versions, transitive licenses, maintenance, encryption dependency, and platform support |
| `CAND-GOV-006` | OpenTelemetry | The specification repository is Apache-2.0 licensed; each language SDK/exporter remains a separate dependency. | Exact SDK/exporter maturity, notices, security handling, backend terms, and upgrade policy |
| `CAND-GOV-007` | Google Cloud, AWS, DigitalOcean, Azure, GitHub, and managed identity | Commercial service terms, data-processing terms, support tiers, SLAs, deprecation policies, and security-response commitments vary by service/account/region. | Legal/security review and a service-by-service contract/support worksheet before selection |
| `CAND-GOV-008` | Deferred React Native, ASP.NET Core, and Keycloak | No license or support disposition is accepted because these candidates do not advance. | Refresh authoritative license/lifecycle/security evidence if a trigger returns one to evaluation |

Permissive source licensing does not imply dependency approval, warranty, commercial support, or
security fitness. A software-bill-of-materials and exact-version license/security review remain
mandatory at a later dependency gate.

## Named provider bundles

### `NAMED-PROV-001` — DigitalOcean Singapore simplicity candidate

| Concern | Analysis |
| --- | --- |
| Candidate components | App Platform, Managed PostgreSQL, Spaces in/with `SGP1`; application outbox/worker; separately evaluated managed identity |
| Disposition | Advance as the transparent-cost/small-team comparison |
| Strong fit | Simple PaaS, Singapore region, managed PostgreSQL, S3-compatible object storage, low advertised entry prices |
| Material gaps | No same-bundle managed customer identity; queue can remain application/database-backed initially; exact database standby, backup RPO, log retention, egress, and regional recovery cost unresolved |
| Reversal/exit | OCI application artifact, PostgreSQL export/restore, S3-compatible object interface; provider configuration and operational procedures still require migration |
| Required evidence | Tenant isolation, production topology/cost worksheet, backup restore, private media transfer, custom domain, failure/degraded behavior, Singapore-Myanmar network |

The advertised minimums are not a production design: App Platform paid compute starts at USD 5,
Managed PostgreSQL currently starts at USD 15.15/month, and Spaces at USD 5/month. Redundancy,
database size/standby, logs, identity, transfer, backup, worker, domains, and support increase the
actual cost.

### `NAMED-PROV-002` — Google Cloud Singapore managed/serverless candidate

| Concern | Analysis |
| --- | --- |
| Candidate components | Cloud Run, Cloud SQL for PostgreSQL, Cloud Storage, Identity Platform, Cloud Tasks or Pub/Sub only when needed, Cloud Monitoring |
| Disposition | Advance as the managed-breadth/scale-to-zero comparison |
| Strong fit | Cloud Run and Cloud SQL availability in Singapore; managed identity; usage-based application compute; broad managed operations |
| Material gaps | Cloud SQL creates a persistent cost floor; Tier 2 Cloud Run region pricing, networking, logs, storage/egress, and identity costs need one calculator model; higher platform surface area |
| Reversal/exit | OCI application artifact and PostgreSQL/data exports are portable; IAM, identity tenancy, monitoring, task/queue, and storage controls are provider-specific |
| Required evidence | Same mandatory proofs as `NAMED-PROV-001`, plus scale-to-zero latency, connection management, IAM/service identity, cost-alert, and provider-specific exit rehearsal design |

Cloud Run documentation states that Singapore is a Tier 2 pricing location and that billing depends
on allocated resources, request/instance mode, minimum instances, networking, and related services.
Cloud SQL for PostgreSQL is available in Singapore. A saved, reviewed calculator scenario is
required later; this document does not invent a total from partial rates.

### `NAMED-PROV-003` — AWS Singapore managed/container candidate

| Concern | Analysis |
| --- | --- |
| Candidate components | ECS on Fargate, RDS for PostgreSQL, S3, Cognito, SQS only when needed, CloudWatch |
| Disposition | Comparative for managed breadth, regional maturity, and growth/enterprise evidence |
| Strong fit | Singapore has three Availability Zones; mature managed database, object, identity, queue, observability, and recovery capabilities; Thailand is a later geography comparison |
| Material gaps | More services, IAM policy surface, configuration, and cost dimensions for a small team; RDS and continuously running Fargate establish cost floors; Cognito tiers/features require care |
| Reversal/exit | OCI/PostgreSQL/object exports help; IAM, Cognito, queue, monitoring, and infrastructure definitions remain provider-specific |
| Required evidence | Mandatory proofs plus least-privilege IAM, task/database networking, Cognito recovery/export, multi-AZ cost/recovery, logs/egress, and operating runbook review |

AWS documents Singapore as `ap-southeast-1` with three Availability Zones and Thailand as
`ap-southeast-7`. Fargate and RDS pricing are configuration/region based; Cognito is MAU and
feature-tier based. An architecture calculator model is required before any cost comparison.

### Deferred and rejected provider paths

| ID | Candidate | Disposition | Reason and reconsideration trigger |
| --- | --- | --- | --- |
| `NAMED-PROV-004` | Microsoft Azure Southeast Asia using Container Apps, Azure Database for PostgreSQL, Blob Storage, identity, and Monitor | Defer after availability comparison | Singapore and serverless containers are credible, but a fourth hyperscaler adds evaluation and skills cost without a current gate advantage; reconsider for a Microsoft-centered enterprise customer |
| `NAMED-PROV-005` | Self-managed VPS database/object/identity/queue stack | Reject for initial architecture | Lowest advertised compute is outweighed by patching, HA, backup, security, and incident custody; reconsider only with staffed operations and measured managed-service budget failure |
| `NAMED-PROV-006` | Kubernetes-first platform on any provider | Reject for initial architecture | Violates current simplicity/team baseline without proven workload or isolation need; reconsider at an accepted Profile 002/003 trigger |

## Coherent unselected candidate sets

| ID | Shared application candidates | Provider bundle | Disposition |
| --- | --- | --- | --- |
| `NAMED-SET-001` | React/Vite web; Flutter Technician; Node.js LTS/NestJS modular monolith; OpenAPI HTTP; PostgreSQL; Drift/SQLite; OpenTelemetry | `NAMED-PROV-001` DigitalOcean Singapore plus separately evaluated managed identity | Advance to later proof-plan comparison; not selected |
| `NAMED-SET-002` | Same portable application boundary | `NAMED-PROV-002` Google Cloud Singapore managed bundle | Advance to later proof-plan comparison; not selected |
| `NAMED-SET-003` | Same portable application boundary | `NAMED-PROV-003` AWS Singapore managed bundle | Comparative growth/enterprise evidence; not selected |

Keeping the application boundary constant prevents the provider comparison from becoming three
different products. Provider-native identity, queue, logs, secrets, and recovery mechanisms may be
compared, but they may not become business authority or erase portability and reconciliation.

## Comparison without a winner

| Criterion | DigitalOcean set | Google Cloud set | AWS set |
| --- | --- | --- | --- |
| Singapore service coverage | Good for the bounded initial components; identity external | Strong for the proposed complete managed bundle | Strong for the proposed complete managed bundle |
| Advertised cost transparency | Strong entry-price visibility | Usage/configuration calculator required | Usage/configuration calculator required |
| Small-team operations | Simpler surface; more application-owned bounded work | Managed breadth and scale-to-zero; more platform concepts | Mature breadth; highest current IAM/service-operation burden |
| Growth/enterprise breadth | Moderate; prove limits and evolution | Strong candidate | Strong candidate |
| Current team adjacency | High for generic container/PostgreSQL and Firebase identity | High where Firebase/Google identity experience transfers | Medium; no equivalent repository evidence recorded |
| Lock-in concentration | Lower platform breadth but external identity may split custody | Higher for identity/queue/IAM/monitoring | Higher for identity/queue/IAM/monitoring |
| Cost confidence | Low until production worksheet | Low until calculator worksheet | Low until calculator worksheet |
| Mandatory-gate confidence | Unproven | Unproven | Unproven |

No weighted score or preferred provider is declared because all three still lack executable tenant,
offline, media, recovery, network, identity, and production-cost evidence.

## Cost worksheet required for each advancing set

| ID | Required line item |
| --- | --- |
| `COST-LINE-001` | Always-on and burst application/worker compute by environment |
| `COST-LINE-002` | Primary database, standby/HA, storage, I/O, backup, and restore testing |
| `COST-LINE-003` | Evidence storage by class, operations, retrieval, CDN if any, and internet egress |
| `COST-LINE-004` | Identity MAU, federation, MFA/OTP, machine identity, and advanced security |
| `COST-LINE-005` | Queue/task, scheduled work, retries, dead-letter/reconciliation storage |
| `COST-LINE-006` | Logs, metrics, traces, alerts, retention, and incident export |
| `COST-LINE-007` | Build minutes, artifact/container storage, signing, app stores, domains/certificates |
| `COST-LINE-008` | Support plan, tax, exchange-rate buffer, and provider price-change reserve |
| `COST-LINE-009` | Per-tenant, active-user, work-order, evidence-item/GiB, and transfer unit economics |
| `COST-LINE-010` | Failure capacity, restore environment, data export, and provider-exit exercise |

## Later proof packages required before selection

These are proof definitions only; execution remains closed.

### Proof-entry contract

| ID | Required condition before any proof authorization |
| --- | --- |
| `PROOF-ENTRY-001` | Freeze exact candidate, version, configuration, owner, authorized paths/accounts, cost ceiling, duration, stop/cleanup procedure, and evidence location. |
| `PROOF-ENTRY-002` | Use isolated non-production resources and synthetic tenant, identity, customer, job, payment-evidence, inventory, audit, and media data; customer/live data is prohibited. |
| `PROOF-ENTRY-003` | Map quantitative pass/fail criteria to accepted `QBD-*`, `SEL-GATE-*`, threat, recovery, privacy, and cost requirements before execution. |
| `PROOF-ENTRY-004` | Keep combined authorized proof resources inside `BUDGET-BASE-002`; require explicit approval before opening a paid account/service or incurring cost. |
| `PROOF-ENTRY-005` | Store raw private evidence under the authorized `internal-local/` package location; publish only reviewed, sanitized conclusions. |
| `PROOF-ENTRY-006` | Name independent security, privacy/legal, field-device, recovery, or operations review wherever the accepted `ADR-DISP-*` requires it. |

| ID | Required evidence | Governing trace |
| --- | --- | --- |
| `NAMED-PROOF-001` | All data paths enforce tenant context and record authorization, including jobs, media, exports, logs, workers, and support access. | `SEL-GATE-001/002`, `TP-CAND-001/009` |
| `NAMED-PROOF-002` | Flutter/SQLite offline queue, migration, conflict, revocation, device-loss, and 48-hour working-set behavior on target Android devices. | `QBD-003/004/005`, `TP-CAND-002` |
| `NAMED-PROOF-003` | Private direct/resumable evidence transfer, replacement, receipt-photo binding, recovery, and storage/egress measurements. | `QBD-006`, `SEL-GATE-005`, `TP-CAND-003` |
| `NAMED-PROOF-004` | Myanmar/English text, accessibility, camera, background work, and weak-network corpus on target devices. | `QBD-014`, `TP-CAND-004` |
| `NAMED-PROOF-005` | Custom domains and shared/branded artifact signing, routing, compatibility, revocation, and rollback. | `QBD-013`, `TP-CAND-005/006` |
| `NAMED-PROOF-006` | Initial and growth query/report workload with tenant enforcement and declared derived-state freshness. | `QBD-001/002/009/010`, `TP-CAND-007` |
| `NAMED-PROOF-007` | Backup/restore meets the 15-minute RPO and four-hour RTO evaluation targets with attributable evidence. | `QBD-008`, `TP-CAND-008` |
| `NAMED-PROOF-008` | Singapore-to-Myanmar latency, loss, interruption, upload resumption, and degraded/offline behavior across representative networks. | `GEO-BASE-005`, `OPEN-092` |
| `NAMED-PROOF-009` | Versioned provider cost model at idle, expected, burst, evidence-retention, and failure/recovery scenarios. | `QBD-015`, `BUDGET-BASE-*`, `COST-LINE-*` |
| `NAMED-PROOF-010` | Export/exit rehearsal design for identity, PostgreSQL, evidence objects, configuration, audit, and operational records. | `SEL-GATE-010`, `TECH-IN-005` |

## Risks and controls

| ID | Risk | Control |
| --- | --- | --- |
| `NAMED-RISK-001` | USD 300 becomes a target to spend rather than a ceiling | Require cost owner, alerts, monthly unit-cost report, and review at USD 500 |
| `NAMED-RISK-002` | Singapore recommendation is mistaken for legal approval | Keep `OPEN-093`; prohibit production data before qualified review |
| `NAMED-RISK-003` | Familiar technology bypasses security proof | Mandatory gates outrank team fit and popularity |
| `NAMED-RISK-004` | Managed identity tenant becomes product organization authority | Map immutable external subject to server-owned membership/role/scope facts |
| `NAMED-RISK-005` | Cheapest provider floor omits redundancy, logs, transfer, or recovery | Use complete `COST-LINE-*` worksheet and failure scenarios |
| `NAMED-RISK-006` | Flutter cross-platform claim hides Android device/background failures | Require `NAMED-PROOF-002/003/004` before selection |
| `NAMED-RISK-007` | Provider bundle spreads proprietary APIs through the core | Adapter boundaries, OCI artifact, PostgreSQL/object exports, exit evidence |
| `NAMED-RISK-008` | Shortlist language is treated as final stack approval | Separate WP-15 owner decision, proof authorization, architecture selection, and implementation gates |

## Official source register

All sources were accessed on 2026-10-07. Pricing and availability must be refreshed at the later
selection and implementation gates.

| ID | Source | Fact used |
| --- | --- | --- |
| `SRC-001` | [AWS Regions and Availability Zones](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html) | Singapore and Thailand region codes, geography, and Availability Zone count |
| `SRC-002` | [AWS Fargate pricing](https://aws.amazon.com/fargate/pricing/) | Resource/configuration-based container billing and calculator requirement |
| `SRC-003` | [Amazon RDS for PostgreSQL pricing](https://aws.amazon.com/rds/postgresql/pricing/) | Configuration/region pricing and Multi-AZ cost dimension |
| `SRC-004` | [Amazon Cognito pricing](https://aws.amazon.com/cognito/pricing/) | MAU, feature-tier, federation, and advanced-security pricing dimensions |
| `SRC-005` | [Google Cloud Run locations](https://cloud.google.com/run/docs/locations) | Cloud Run availability in Singapore |
| `SRC-006` | [Google Cloud Run pricing](https://cloud.google.com/run/pricing) | Usage, billing-mode, region, networking, free-tier, and minimum-instance dimensions |
| `SRC-007` | [Cloud SQL for PostgreSQL region availability](https://cloud.google.com/sql/docs/postgres/region-availability-overview) | PostgreSQL availability in Singapore |
| `SRC-008` | [Identity Platform multi-tenancy](https://cloud.google.com/identity-platform/docs/multi-tenancy) | B2B identity tenant capability and limitations |
| `SRC-009` | [DigitalOcean regional availability](https://docs.digitalocean.com/platform/regional-availability/) | `SGP1` and product region matrix |
| `SRC-010` | [DigitalOcean App Platform pricing](https://www.digitalocean.com/pricing/app-platform) | Entry compute, transfer, scaling, rollback, and development-database pricing |
| `SRC-011` | [DigitalOcean Managed Databases pricing](https://www.digitalocean.com/pricing/managed-databases) | PostgreSQL entry price and node/storage dimensions |
| `SRC-012` | [DigitalOcean Spaces pricing](https://docs.digitalocean.com/products/spaces/details/pricing/) | Object-storage base subscription, included storage, and overage dimensions |
| `SRC-013` | [Azure regions list](https://learn.microsoft.com/azure/reliability/availability-zones-region-support) | Southeast Asia physical location and availability zones in Singapore |
| `SRC-014` | [Azure Container Apps pricing](https://azure.microsoft.com/pricing/details/container-apps/) | Consumption, request, scale-to-zero, idle, and calculator pricing dimensions |
| `SRC-015` | [Node.js release policy](https://nodejs.org/en/about/previous-releases) | LTS lifecycle and production guidance |
| `SRC-016` | [NestJS documentation](https://docs.nestjs.com/first-steps) | TypeScript/Node runtime and module-oriented application structure |
| `SRC-017` | [React TypeScript guide](https://react.dev/learn/typescript) | Official React/TypeScript support guidance |
| `SRC-018` | [Flutter supported platforms](https://docs.flutter.dev/reference/supported-platforms) | Supported Android/iOS deployment families |
| `SRC-019` | [Flutter offline-first guidance](https://docs.flutter.dev/app-architecture/design-patterns/offline-first) | Local/remote state and synchronization concerns |
| `SRC-020` | [PostgreSQL versioning policy](https://www.postgresql.org/support/versioning/) | Five-year major-version support and minor security/fix policy |
| `SRC-021` | [React license](https://github.com/react/react/blob/main/LICENSE) | MIT license in the current project repository |
| `SRC-022` | [Vite license](https://github.com/vitejs/vite/blob/main/LICENSE) | MIT license in the current project repository |
| `SRC-023` | [Flutter license](https://github.com/flutter/flutter/blob/master/LICENSE) | BSD-style redistribution terms in the current framework repository |
| `SRC-024` | [Node.js license](https://github.com/nodejs/node/blob/main/LICENSE) | Project and bundled third-party licensing record |
| `SRC-025` | [NestJS license](https://github.com/nestjs/nest/blob/master/LICENSE) | MIT license in the current framework repository |
| `SRC-026` | [Drift license](https://github.com/simolus3/drift/blob/develop/LICENSE) | MIT license in the current project repository |
| `SRC-027` | [sqflite license](https://github.com/tekartik/sqflite/blob/master/sqflite/LICENSE) | BSD 2-Clause license in the current project repository |
| `SRC-028` | [OpenTelemetry specification license](https://github.com/open-telemetry/opentelemetry-specification/blob/main/LICENSE) | Apache-2.0 license in the current specification repository |
| `SRC-029` | [PostgreSQL licence](https://www.postgresql.org/about/licence/) | PostgreSQL License terms |
| `SRC-030` | [Vite guide](https://vite.dev/guide/) | React/TypeScript template support and static production build behavior |
| `SRC-031` | [Next.js documentation](https://nextjs.org/docs) | Server/client rendering, routing, static export, and deployment surface |
| `SRC-032` | [React Native documentation](https://reactnative.dev/docs/getting-started) | Current React Native platform and development documentation |
| `SRC-033` | [.NET support policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core) | Current LTS/STS lifecycle policy for the deferred server alternative |
| `SRC-034` | [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) | Language-agnostic HTTP API description, versioning, and tooling basis |
| `SRC-035` | [GraphQL Specification](https://spec.graphql.org/) | Authoritative specification entry point for the comparative API candidate |
| `SRC-036` | [Drift documentation](https://drift.simonbinder.eu/) | Flutter/Dart SQLite persistence and typed query/migration capabilities |
| `SRC-037` | [sqflite package](https://pub.dev/packages/sqflite) | Flutter SQLite plugin documentation and current package metadata |
| `SRC-038` | [Keycloak documentation](https://www.keycloak.org/documentation) | Self-operated server, administration, security, and upgrade responsibilities |
| `SRC-039` | [OpenTelemetry documentation](https://opentelemetry.io/docs/) | Signals, semantic conventions, language SDKs, exporters, and maturity surface |
| `SRC-040` | [GitHub Actions documentation](https://docs.github.com/actions) | Repository automation candidate capabilities |
| `SRC-041` | [OCI Image Format](https://github.com/opencontainers/image-spec) | Portable container image specification candidate |

## Readiness verdict and next gate

The owner accepted the following WP-15 dispositions exactly as recorded on 2026-10-07:

- `BUDGET-BASE-001` through `006`;
- `GEO-BASE-001` through `006`;
- `TEAM-BASE-001` through `006`;
- `CLIENT-BASE-001` through `005`;
- `NAMED-TECH-001` through `018` dispositions;
- `NAMED-PROV-001` through `006` dispositions; and
- `NAMED-SET-001` through `003` dispositions.

The `NAMED-TECH-*`, `NAMED-PROV-*`, and `NAMED-SET-*` records retain their recorded Advance,
Comparative, Defer, or Reject-initial meaning. No candidate is selected. Acceptance authorizes
WP-16 documentation and proof planning only after verified publication; it does not authorize
proof execution, install a dependency, select the final architecture, write application code,
create infrastructure, deploy, access customer data, or change an external system.
