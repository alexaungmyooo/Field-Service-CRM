# Operating Model, Provider-Proof Entry and Specialist Assignment Baseline

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — verified and closed |
| Work package | `WP-102 Operating Model, Provider-Proof Entry and Specialist Assignment Baseline` |
| Owner | Aung Myo Oo |
| Governing sequence | `DEC-233`, `WP98-SEQ-004` — Accepted |
| Governing policy baselines | `DEC-234` through `DEC-236` — Accepted |
| Published WP-101 revision | `d906640863092e80b85cc1855dc74f4f210394c0` |
| Repository tree | `7292dea18c6ef5854fef7679a8ede1ac20a2ff39` |
| Proof tree | `1e9f75fdc1b221009bc691f54d24ca63f02c8038` |
| Governing decision | `DEC-237` — Accepted |
| Provider account, cost, network, proof execution | Not authorized |
| Architecture selection/application coding/deployment | Not authorized |
| Date | 2026-10-10 |

## Objective and authority boundary

WP-102 proposes the first operating model for a lean owner-led team: separated environments,
release and change governance, service/support targets, recovery, observability, incidents,
continuity, privileged operations, capacity/cost, dependency lifecycle, hosted-proof controls,
and specialist-review assignments.

This package makes later proof and architecture decisions possible without pretending the team has
24/7 operations, qualified specialists who have not been appointed, or provider accounts that do
not exist. It creates no account, billing relationship, credential, infrastructure, environment,
network access, dependency, proof artifact, application code, deployment, or customer/live-data
use. Every hosted or paid proof still requires a separate exact owner authorization.

## Governing inputs

- `BUDGET-BASE-001` through `006`, `GEO-BASE-001` through `006`, `TEAM-BASE-001` through `006`,
  and `CLIENT-BASE-001` through `005` remain accepted evaluation baselines.
- `ENV-CTRL-*`, `RELEASE-CTRL-*`, `DEGRADE-CTRL-*`, `AVAIL-GATE-*`, `RECOV-CTRL-*`,
  `OBS-CTRL-*`, `OPS-CTRL-*`, `CAPACITY-CTRL-*`, and `SUPPLY-CTRL-*` define the accepted proposal
  envelope without selecting services or topology.
- `QBD-001/002/007` through `015` are evaluation targets, not contractual production SLAs.
- `PROOF-ENTRY-001` through `006` and `PSP-CTRL-001` through `012` remain mandatory proof gates.
- `OPEN-071` through `082`, `OPEN-092`, `OPEN-093`, `OPEN-097`, and `OPEN-098` are addressed only
  to the extent recorded below.

## Lean operating-model baseline

| ID | Proposed policy |
| --- | --- |
| `OPERATING-BASE-001` | Plan for one owner-led small engineering/operations team using managed capabilities where they reduce undifferentiated operations without transferring product accountability. |
| `OPERATING-BASE-002` | Initial supported hours are Monday through Saturday, 08:00–18:00 Myanmar time, excluding published holidays. No 24/7 response or contractual SLA is promised without new staffing and budget. |
| `OPERATING-BASE-003` | A named service owner is accountable for each production capability and dependency even when the provider operates underlying infrastructure. |
| `OPERATING-BASE-004` | Every operational dependency has an owner, purpose, criticality, data/privilege class, support path, runbook, version/support status, cost owner, recovery role, and exit treatment. |
| `OPERATING-BASE-005` | Product, security, data, release, incident, and billing decisions remain attributable to named people; shared credentials or provider custody never replace responsibility. |
| `OPERATING-BASE-006` | Business-hours support prioritizes tenant isolation, authorization, data integrity, evidence preservation, field continuity, recovery, and customer-impacting failures before cosmetic defects. |
| `OPERATING-BASE-007` | A tenant-specific dedicated placement, multi-region service, 24/7 support, or contractual SLA requires a separately accepted operating and cost baseline. |
| `OPERATING-BASE-008` | Runbooks are versioned, tested for their authorized environment, and include preconditions, safe stop, verification, escalation, rollback/recovery, cleanup, and evidence. |
| `OPERATING-BASE-009` | Operational custody permits only the exact action and evidence needed; it never grants routine tenant-content browsing. |
| `OPERATING-BASE-010` | Monthly operations review covers incidents, availability, queue age, backups/restores, vulnerabilities, dependency health, capacity, cost, access grants, and unresolved corrective actions. |

## Environment and data separation baseline

| Environment | Purpose | Permitted data | Authority and lifecycle |
| --- | --- | --- | --- |
| Development | Local/unit/component development | Synthetic fixtures only | Developer-local identities; no provider production credentials or callbacks |
| Test/CI | Repeatable automated validation | Synthetic, generated, or explicitly sanitized fixtures | Ephemeral or controlled shared test authority; immutable inputs/results where required |
| Technical proof | One separately authorized candidate hypothesis | Synthetic proof fixture only | Exact package/account/region/cost/duration/evidence; mandatory expiry and cleanup |
| Staging | Release-candidate compatibility and operational rehearsal | Synthetic representative data by default; no production copy | Production-like controls by declared concern, different identities/credentials/endpoints |
| Production | Authorized tenant service | Real tenant/customer data under accepted policy | Strongest access, change, audit, recovery, residency, retention, and incident controls |
| Recovery isolation | Restore and invariant verification | Exact authorized protected recovery copy | No ordinary users, callbacks, notifications, or provider effects before resumption approval |

| ID | Proposed policy |
| --- | --- |
| `ENVIRONMENT-BASE-001` | Every environment has explicit owner, purpose, lifecycle, exposure, allowed data class, identities, credentials, endpoints, domains, storage, callbacks, and evidence. |
| `ENVIRONMENT-BASE-002` | Production content is never copied into development, test, proof, support, or staging by default. Any exceptional minimized copy requires a separate privacy/security authorization and verified deletion. |
| `ENVIRONMENT-BASE-003` | Human and workload identities, secrets, keys, provider projects/accounts, queues, storage, callbacks, and backups are environment-specific. |
| `ENVIRONMENT-BASE-004` | Cross-environment data, network, callback, queue, backup, and credential paths fail closed unless explicitly authorized and verified. |
| `ENVIRONMENT-BASE-005` | Staging parity is declared per concern and never claims production scale, provider behavior, legal residency, or recovery assurance it did not reproduce. |
| `ENVIRONMENT-BASE-006` | Environment identity is visible in tools and evidence; destructive/privileged commands verify the intended environment before action. |
| `ENVIRONMENT-BASE-007` | Configuration promotion excludes credentials and revalidates environment-specific references, compatibility, tenancy, and policy. |
| `ENVIRONMENT-BASE-008` | Environment creation, refresh, suspension, expiry, and destruction retain inventory, authority, cost, and cleanup evidence. |
| `ENVIRONMENT-BASE-009` | Backup and restore cannot silently change environment or tenant semantics. Restored state remains non-authoritative until accepted verification. |
| `ENVIRONMENT-BASE-010` | A result from one environment is evidence only for the conditions represented there. |

## Release and change-governance baseline

| ID | Proposed policy |
| --- | --- |
| `RELEASE-BASE-001` | Every release/change identifies owner, purpose, risk, affected capabilities/tenants/surfaces/data/integrations, dependencies, compatibility, and recovery limits. |
| `RELEASE-BASE-002` | Promote an immutable/versioned attributable artifact or configuration revision with source, build, dependency, signing, and validation provenance. |
| `RELEASE-BASE-003` | Build, signing, store, deployment, provider, and production-change credentials remain distinct from ordinary development and tenant administration. |
| `RELEASE-BASE-004` | Validate tenant isolation, authorization, business invariants, client/config/data/integration compatibility, observability, and recovery according to risk. |
| `RELEASE-BASE-005` | Old and new server/client/configuration versions coexist safely within the accepted support window; no release assumes instant field-client upgrade. |
| `RELEASE-BASE-006` | Normal production changes occur during supported hours with owner/operator availability and an observation window. Emergency change follows the incident path. |
| `RELEASE-BASE-007` | Use bounded progressive scope where supported; abort thresholds, pause/disable, rollback limit, safe roll-forward, and manual recovery are declared before promotion. |
| `RELEASE-BASE-008` | Rollback is used only when stored data, contracts, external effects, clients, and pending work remain compatible. Otherwise execute the reviewed roll-forward/recovery plan. |
| `RELEASE-BASE-009` | Failed or partial deployment records exact units, versions, configuration, effects, deviations, and pending treatment; it never reports fleet-wide success. |
| `RELEASE-BASE-010` | Post-change verification covers critical workflows, tenant isolation, authorization, evidence, queues, integrations, derived freshness, capacity, and diagnostics. |
| `RELEASE-BASE-011` | Temporary feature/configuration controls are versioned, authorized, auditable, safe when unavailable, and expire or receive explicit renewal. |
| `RELEASE-BASE-012` | Obsolete artifacts, clients, configuration, and credentials retire only after pending work, recovery, investigation, and supported-version obligations are addressed. |

## Service, availability, and continuity baseline

These are architecture-evaluation objectives, not contractual SLAs.

| ID | Proposed policy |
| --- | --- |
| `SERVICE-BASE-001` | Evaluate core online service against 99.5% monthly availability with measurement method and dependency exclusions declared. Multi-region or 99.9% claims require a new operating/cost decision. |
| `SERVICE-BASE-002` | Planned maintenance may be excluded only when announced at least 72 hours in advance, limited to four hours per calendar month, and accompanied by affected workflows and continuity guidance. |
| `SERVICE-BASE-003` | Interactive operations retain `QBD-001` p95 2.5-second and p99 5-second evaluation targets; dashboard/search retains visible five-minute freshness. |
| `SERVICE-BASE-004` | Healthy-provider ordinary queued effects target 99% first attempt within five minutes; delayed, terminal, and unknown outcomes remain visible. |
| `SERVICE-BASE-005` | During supported hours, critical platform/security conditions target detection within five minutes and human acknowledgment within fifteen minutes. There is no 24/7 acknowledgment promise. |
| `SERVICE-BASE-006` | The Technician client retains the accepted 48-hour assignment-scoped offline path when core online service or field network is unavailable. Authority/evidence rules do not weaken. |
| `SERVICE-BASE-007` | Identity/authorization failure blocks protected online action; core-data failure blocks unsafe mutation; evidence failure preserves pending capture; notification/integration/reporting failure preserves truth and shows delay/staleness. |
| `SERVICE-BASE-008` | Manual continuity may use tenant-controlled phone/paper/spreadsheet capture only with tenant, actor/custodian, timestamp, purpose, scope, protection, and later reconciliation. It cannot create authoritative approval/payment/stock truth by itself. |
| `SERVICE-BASE-009` | After recovery, queued, unknown, duplicate, expired, stale, offline, and manually handled work reconciles before normal-success claims. |
| `SERVICE-BASE-010` | A continuity exercise covers office dispatch, field work, evidence, customer communication, and later reconciliation before production launch and at least annually thereafter. |

## Singapore-to-Myanmar acceptance baseline

| ID | Proposed policy |
| --- | --- |
| `NETWORK-PROOF-BASE-001` | Measure from at least three representative Myanmar access paths or clearly documented substitutes across morning, business-peak, and evening windows to the exact Singapore candidate endpoint. |
| `NETWORK-PROOF-BASE-002` | A stable-profile candidate target is p95 round-trip latency at or below 300 ms and packet loss below 2%; raw network result supplements, not replaces, end-to-end application targets. |
| `NETWORK-PROOF-BASE-003` | Under WP-100 weak/severe profiles, allowed local field capture remains within its one-second target and every unavailable/pending/degraded state remains truthful. |
| `NETWORK-PROOF-BASE-004` | After stable recovery, 200 non-media operations meet the two-minute sync target, and interrupted media resumes without duplicate evidence or false availability. |
| `NETWORK-PROOF-BASE-005` | Admin/customer workflows must meet accepted end-to-end targets on declared stable conditions; weak/severe conditions must fail safely or present accepted degraded behavior. |
| `NETWORK-PROOF-BASE-006` | A candidate failing raw latency may advance only through an explicit evidence-backed exception showing accepted end-to-end behavior; a candidate meeting latency still fails if business or recovery behavior is unsafe. |

## Backup and recovery baseline

| ID | Proposed policy |
| --- | --- |
| `RECOVERY-OPS-BASE-001` | Evaluate core authoritative records and required evidence against a 15-minute recovery-point objective and four-hour recovery-time objective. Unsynchronized device capture is governed separately. |
| `RECOVERY-OPS-BASE-002` | The recovery inventory includes authoritative data, evidence, audit, configuration, identity/secret/key dependencies, queues/effects, derived rebuild sources, application artifacts, and external obligations. |
| `RECOVERY-OPS-BASE-003` | Candidate protection evaluates at least seven days of point-in-time recovery where supported, 35 days of daily recovery points, and 12 monthly recovery points; provider cost and legal/privacy review may revise this before production. |
| `RECOVERY-OPS-BASE-004` | Backup custody is separate from ordinary tenant browsing and production mutation authority; keys and recovery credentials have explicit owners and recovery treatment. |
| `RECOVERY-OPS-BASE-005` | Restore first into isolation with callbacks, notifications, integrations, and real-world effects disabled. |
| `RECOVERY-OPS-BASE-006` | Validate tenant links, identity/authority, lifecycle/hold/deletion, audit, evidence, stock/custody, idempotency, pending effects, derived rebuild, and post-point changes before resumption. |
| `RECOVERY-OPS-BASE-007` | Restored state cannot replay notification, payment claim, stock movement, integration, or other external effect merely because the data returned. |
| `RECOVERY-OPS-BASE-008` | A named owner accepts exact loss window, unresolved divergence, limitations, monitoring, and resumption; component health alone is insufficient. |
| `RECOVERY-OPS-BASE-009` | Complete an independently reviewed restore before production launch, after material recovery/topology change, and at least quarterly during production operation. |
| `RECOVERY-OPS-BASE-010` | Tenant-specific restore is not promised initially; tenant recovery requests require separately proved isolation and reconciliation or controlled record-level reconstruction. |

## Observability, incident, and privileged-operation baseline

| ID | Proposed policy |
| --- | --- |
| `OBSERVABILITY-BASE-001` | Observe critical workflows through customer/business impact, not infrastructure health alone; monitor tenant-isolation denials, authorization, queues, evidence, sync, integrations, derived freshness, backups, releases, and cost. |
| `OBSERVABILITY-BASE-002` | Correlate request, job, operation/effect, media, sync, integration, release, and incident identities while minimizing customer content and separating audit/security evidence. |
| `OBSERVABILITY-BASE-003` | Logs contain no credentials, tokens, keys, raw receipt/evidence content, or unnecessary personal/business payloads; exceptional diagnostic elevation is authorized, expiring, and cleaned up. |
| `OBSERVABILITY-BASE-004` | Initial evaluation retention is 30 days for operational logs, 90 days for metrics, seven days for sampled traces, and at least 365 days for privileged/support/security evidence; exact production policy remains cost/legal review dependent. |
| `OBSERVABILITY-BASE-005` | Detect monitoring-pipeline absence or failure; silence is never accepted as service health. |
| `OBSERVABILITY-BASE-006` | Dashboard/alert definitions, thresholds, routing, suppression, ownership, false-positive/negative review, and change history are versioned. |
| `OBSERVABILITY-BASE-007` | Tenant/support visibility uses authorized minimized views and never permits another tenant's counts, identifiers, content, or internal secrets/topology. |
| `OBSERVABILITY-BASE-008` | Provider telemetry custody, residency, export, deletion, breach, cost, and exit are reviewed like other controlled copies. |

| Severity | Initial meaning | Supported-hours response target |
| --- | --- | --- |
| `SEV-1` | Cross-tenant exposure/mutation, active compromise, unrecoverable integrity risk, or widespread core-service outage | Immediate triage; acknowledge within 15 minutes; contain first |
| `SEV-2` | Major tenant or critical workflow unavailable/degraded with no safe normal path | Acknowledge within 30 minutes; workaround/owner within one hour |
| `SEV-3` | Limited tenant/workflow impact with safe workaround and no known security/integrity harm | Acknowledge by next business day |
| `SEV-4` | Minor defect, question, cosmetic issue, or improvement | Triage within three business days |

| ID | Proposed policy |
| --- | --- |
| `INCIDENT-BASE-001` | Every incident moves through detected, triaged, contained, investigating, mitigating, communicating, recovering, monitoring, resolved, reviewed, follow-up, and closed states as applicable. |
| `INCIDENT-BASE-002` | Severity reflects tenant breadth, customer/business, security/privacy, data integrity, safety, financial-evidence, and recovery impact. |
| `INCIDENT-BASE-003` | After-hours monitoring may notify the owner, but response remains best effort unless a later funded on-call decision is accepted. |
| `INCIDENT-BASE-004` | Communication states confirmed facts, affected scope, workaround, next update, and resolution without exposing another tenant or unsafe technical detail. |
| `INCIDENT-BASE-005` | Legal/regulatory/customer notification timing is not guessed; qualified legal/privacy review is mandatory where applicable. |
| `INCIDENT-BASE-006` | Emergency deviation is time-bounded, attributable, reviewed next business day, and followed by access/configuration/telemetry cleanup and corrective action. |
| `INCIDENT-BASE-007` | Resolution requires business/security verification and known residual risk; closure requires evidence, required communication, and corrective-action disposition. |
| `INCIDENT-BASE-008` | Material incidents receive a review within five business days unless active investigation requires a documented delay. |

| ID | Proposed policy |
| --- | --- |
| `PRIVILEGED-BASE-001` | Production, provider, database/storage, network, backup, key/secret, build/signing, identity, deletion, and recovery operations use named least-privilege identities and stronger assurance. |
| `PRIVILEGED-BASE-002` | Cross-tenant investigation, break-glass, key/secret recovery, backup restore/resumption, ownership recovery, bulk export, legal deletion, and production access-policy change require dual control. |
| `PRIVILEGED-BASE-003` | A privileged grant identifies case/change, environment, purpose, scope, actions, start/expiry, approver, operator, and review; standing broad access is prohibited. |
| `PRIVILEGED-BASE-004` | Provider or infrastructure administration does not grant routine tenant-data access. Content access requires the separate WP-99 support/privacy path. |
| `PRIVILEGED-BASE-005` | Record privileged attempts/results and changed resource identifiers without copying secrets or unnecessary tenant content. |
| `PRIVILEGED-BASE-006` | Interactive session recording is required only where a later selected tool can protect secrets/privacy; otherwise use command/change evidence, approval, and independent review. |
| `PRIVILEGED-BASE-007` | Tenant notification applies to support-content access and confirmed impact, not every infrastructure operation; exceptions and legal restrictions remain reviewable. |
| `PRIVILEGED-BASE-008` | Emergency access and credentials expire, revoke, rotate where required, and receive residual-access verification. |

## Capacity, cost, and dependency lifecycle baseline

| ID | Proposed policy |
| --- | --- |
| `CAPACITY-BASE-001` | Retain the initial horizon of 50 organizations, 1,000 active users, 200 concurrent users, 500,000 work orders, and five million evidence items for architecture evaluation. |
| `CAPACITY-BASE-002` | Retain the large-tenant case of 100 branches, 5,000 workers, and 1,000 concurrent users without changing canonical business meaning. It is a validation case, not initial committed capacity. |
| `CAPACITY-BASE-003` | Model interactive peaks, offline sync, media, reports, imports/exports, notifications/integrations, backups, restores, one noisy tenant, and provider throttling. |
| `CAPACITY-BASE-004` | Define ceilings, headroom, saturation, scale lead time, quotas, backpressure, queue expiry, and safe failure for each constrained resource. |
| `CAPACITY-BASE-005` | One tenant or background workload cannot starve authorization, safety, evidence preservation, recovery, or unrelated tenant work. |
| `CAPACITY-BASE-006` | Cost visibility covers all `COST-LINE-001` through `010` and normalizes per tenant, active user, work order, evidence item/GiB, and transfer. |
| `CAPACITY-BASE-007` | Retain the USD 300/month initial recurring-provider target, USD 500 owner-review threshold, and 20% recurring-revenue target after subscriptions, without treating any amount as spending permission. |
| `CAPACITY-BASE-008` | Cost optimization cannot weaken accepted isolation, durability, evidence, recovery, observability, or service behavior without an explicit owner trade-off. |
| `CAPACITY-BASE-009` | Growth, abusive retry, storage leakage, backup expansion, telemetry cardinality, and provider-price change trigger alerts and reforecasting. |
| `CAPACITY-BASE-010` | Re-baseline before growth horizon, dedicated placement, multi-region, 24/7 support, or contractual SLA. |

| ID | Proposed policy |
| --- | --- |
| `SUPPLY-BASE-001` | Inventory every runtime/build dependency, external service, artifact, version, owner, purpose, environment, data/privilege, license, support status, and exit path. |
| `SUPPLY-BASE-002` | Accepted inputs have controlled provenance and integrity/signing evidence; mutable or unknown inputs cannot support a trusted release. |
| `SUPPLY-BASE-003` | Monitor vulnerability, exploitation, end-of-life, provider change, certificate/credential expiry, quota, pricing, and support changes. |
| `SUPPLY-BASE-004` | Actively exploited or exposed critical findings receive immediate containment/triage and target mitigation within 72 hours; other critical findings target seven days, high 30 days, and medium 90 days. |
| `SUPPLY-BASE-005` | A missed target requires named owner, exposure/risk analysis, compensating control, expiry, approval, and verification; severity cannot be silently downgraded. |
| `SUPPLY-BASE-006` | Updates validate compatibility, migration, pending work, rollback limits, and recovery before promotion. |
| `SUPPLY-BASE-007` | Preserve supported artifacts and dependency evidence required for recovery/investigation without retaining prohibited secrets or tenant content. |
| `SUPPLY-BASE-008` | Provider/component termination covers export, deletion, credentials, configuration/mapping, unresolved effects, support, substitution, and residual cost. |

## Provider-proof account, billing, and execution-entry baseline

No item below creates or authorizes an account, credential, purchase, resource, network call, or
proof. It defines what a later exact authorization must bind.

| ID | Proposed policy |
| --- | --- |
| `PROVIDER-PROOF-BASE-001` | Use a dedicated non-production provider project/account boundary for each authorized provider proof; never use a customer or production account. |
| `PROVIDER-PROOF-BASE-002` | Aung Myo Oo is the proposed proof sponsor and billing approver. Account ownership should use an owner-controlled business identity with recoverable custody, not an agent or disposable personal identity. |
| `PROVIDER-PROOF-BASE-003` | Each proof names one primary operator, one independent reproduction/validation identity, required specialist reviewers, and prohibits undeclared role substitution. |
| `PROVIDER-PROOF-BASE-004` | Default hosted-proof maximum is seven elapsed days, USD 25 worst-case provider spend, ten billable resource instances, 10 GiB retained proof data, and zero customer/live data; any increase requires separate owner approval. |
| `PROVIDER-PROOF-BASE-005` | Combined proof/development/test provider spend remains within the accepted USD 100/month ceiling, which is not permission to spend. |
| `PROVIDER-PROOF-BASE-006` | Configure cost visibility before resources: budget alerts at 50%, 80%, and 100% of the exact proof ceiling and an expiry/cleanup trigger independent of successful proof completion. |
| `PROVIDER-PROOF-BASE-007` | Provider/account, region, services, SKUs, versions, quotas, support tier, billing currency, tax/exchange assumptions, and every `COST-LINE-*` input are frozen before execution. |
| `PROVIDER-PROOF-BASE-008` | Credentials are environment/purpose bound, least-privilege, short-lived where possible, stored only in approved private custody, never committed, and revoked/rotated during cleanup. |
| `PROVIDER-PROOF-BASE-009` | Network access is deny-by-default except exact provider control/data endpoints and artifact sources separately authorized by the proof contract. Registry/package access requires exact digest/version and supply-chain evidence. |
| `PROVIDER-PROOF-BASE-010` | The proof freezes repository revision, candidate/configuration, fixture/seed, workload, commands, evidence paths, clocks, repetitions, pass/fail/inconclusive rules, stop conditions, and prohibited actions. |
| `PROVIDER-PROOF-BASE-011` | Raw evidence remains private; public conclusions are sanitized, reviewed, and distinguish observation from owner-accepted architecture decision. |
| `PROVIDER-PROOF-BASE-012` | Mandatory cleanup inventories before/after resources, retained snapshots/backups/logs/artifacts, credential revocation, deletion status, final billing window, recurring charges, and residual risk under every outcome. |
| `PROVIDER-PROOF-BASE-013` | Stop before expansion if cost visibility, owner custody, isolation, cleanup, deletion verification, or required reviewer independence cannot be established. |
| `PROVIDER-PROOF-BASE-014` | Any material provider, region, service, version, topology, workload, or security-control change expires the relevant evidence unless an accepted review proves continued applicability. |

## Specialist assignment and authority baseline

| ID | Role | Initial assignment/disposition | Authority boundary |
| --- | --- | --- | --- |
| `REVIEW-ROLE-001` | Product owner/proof sponsor/domain/finance | Aung Myo Oo | May accept product policy, budget, proof/result, and architecture gates; cannot fabricate specialist qualification |
| `REVIEW-ROLE-002` | Primary documentation/proof operator | `/root` only when separately authorized | Executes exact bounded package; cannot independently validate its own result or approve architecture |
| `REVIEW-ROLE-003` | Independent reproduction/static validator | One fresh subagent identity per authorized package | Reproduces/validates exact evidence with zero business/provider authority; not automatically a qualified security/legal/accounting reviewer |
| `REVIEW-ROLE-004` | Technical security reviewer | Must be independent of operator/reproducer and explicitly accepted per proof | Agent-based review is bounded technical evidence only; qualified human review remains mandatory before production or real/customer data |
| `REVIEW-ROLE-005` | Privacy/legal and cross-border reviewer | Qualified Myanmar/Singapore human or firm not yet named | Mandatory before production residency, real/customer data, legal notices, deletion/hold, or regulated notification claims |
| `REVIEW-ROLE-006` | Accounting/tax reviewer | Qualified human/accounting firm not yet named | Mandatory before statutory accounting, tax, valuation, audited margin, or accounting-system authority claims |
| `REVIEW-ROLE-007` | Field-device/Myanmar-domain reviewer | Aung Myo Oo for domain/locale plus a fresh independent technical validator | May review realistic workflows/devices; does not replace security, accessibility, or legal qualification |
| `REVIEW-ROLE-008` | Accessibility reviewer | Qualified human reviewer not yet named; automated/agent checks are supporting evidence | Mandatory before public claim of conformance; Myanmar-language task review remains required |
| `REVIEW-ROLE-009` | Recovery/operations reviewer | Fresh independent technical validator plus owner; qualified specialist required for production acceptance when risk warrants | Must not operate the primary restore it independently validates |
| `REVIEW-ROLE-010` | Data/architecture reviewer | Fresh independent technical validator; owner accepts final decision | Reviews traceability, invariants, workload, reversibility, and evidence without selecting by preference |

| ID | Proposed policy |
| --- | --- |
| `REVIEW-BASE-001` | Reviewer identity, qualification basis, independence, scope, conflicts, evidence access, findings, and sign-off are frozen before execution where required. |
| `REVIEW-BASE-002` | A subagent can provide independent technical/reproduction evidence but cannot be represented as a licensed, legally qualified, or professionally certified human. |
| `REVIEW-BASE-003` | No absent person's name or qualification is fabricated. A required unnamed qualified reviewer keeps only the affected production/claim gate closed. |
| `REVIEW-BASE-004` | The TP-01 security-subagent exception does not automatically authorize the same substitution for later proofs; each later proof must bind its accepted review authority. |
| `REVIEW-BASE-005` | Reviewer findings are resolved, accepted as explicit residual risk by the authorized owner, or cause fail/inconclusive; they are never silently omitted. |
| `REVIEW-BASE-006` | Qualified human security and privacy/legal review remain mandatory before production deployment or any real/customer data. |
| `REVIEW-BASE-007` | Owner/domain review cannot replace technical reproduction; technical reproduction cannot replace product acceptance. |
| `REVIEW-BASE-008` | Architecture selection requires complete evidence packets and owner decision, not reviewer recommendation alone. |

## Open-item disposition

| Open item | Proposed WP-102 disposition | Remaining boundary |
| --- | --- | --- |
| `OPEN-071` | Resolve the initial environment model with the environment matrix and `ENVIRONMENT-BASE-*`. | Selected provider/topology/pipeline implementation remains. |
| `OPEN-072` | Resolve change/compatibility/rollback policy with `RELEASE-BASE-*`. | Deployable units and selected technical mechanisms remain. |
| `OPEN-073` | Resolve initial evaluation availability/support/degraded targets with `OPERATING-BASE-*` and `SERVICE-BASE-*`. | Contractual SLA and 24/7 staffing remain explicitly absent. |
| `OPEN-074` | Resolve initial backup inventory/RPO/RTO/retention/restore targets with `RECOVERY-OPS-BASE-*`. | Provider topology, key mechanism, tenant restore, legal review, and measured proof remain. |
| `OPEN-075` | Resolve initial telemetry/access/retention/alert policy with `OBSERVABILITY-BASE-*`. | Named tooling, exact cost, and leakage/incident proof remain. |
| `OPEN-076` | Resolve initial severity, supported-hours response, lifecycle, communication, and review policy with `INCIDENT-BASE-*`. | Regulatory/legal notification and funded after-hours/on-call remain. |
| `OPEN-077` | Resolve evaluation workload/cost/capacity baseline with `CAPACITY-BASE-*`. | Forecast commitment and measured candidate limits remain. |
| `OPEN-078` | Resolve release approval/progressive/emergency/evidence policy with `RELEASE-BASE-*`. | Named pipeline/signing/store/provider mechanisms remain. |
| `OPEN-079` | Resolve initial manual/degraded/reconciliation treatment with `SERVICE-BASE-006` through `010`. | Tenant-specific continuity procedures and exercises remain. |
| `OPEN-080` | Resolve initial privileged-operation/dual-control policy with `PRIVILEGED-BASE-*`. | Named production tools and qualified security/privacy review remain. |
| `OPEN-081` | Resolve the initial ownership/support/runbook model with `OPERATING-BASE-*`. | Named vendors and production dependency inventory remain. |
| `OPEN-082` | Resolve initial provenance/vulnerability/patch/exception/exit policy with `SUPPLY-BASE-*`. | Selected dependency inventory and operational evidence remain. |
| `OPEN-092` | Resolve initial Singapore-to-Myanmar proof thresholds with `NETWORK-PROOF-BASE-*`. | Exact candidate endpoints and measured physical-network results remain. |
| `OPEN-093` | Keep production residency approval open and bind it to `REVIEW-ROLE-005`. | Qualified Myanmar/Singapore legal/privacy review is not yet named or performed. |
| `OPEN-097` | Partially resolve role classes and current assignments with `REVIEW-ROLE-*` and `REVIEW-BASE-*`. | Required qualified human identities remain unnamed; each exact proof still needs accepted roles. |
| `OPEN-098` | Resolve provider-proof account/billing/cleanup policy with `PROVIDER-PROOF-BASE-*`. | No account, cost, credential, or provider action is authorized; exact account identity is later. |

## Architecture and proof impact

| Decision/proof | Proposed effect after owner acceptance |
| --- | --- |
| `ADR-READY-010/011` | Release/delivery operating inputs improve; exact store/domain/signing ownership and proof remain. |
| `ADR-READY-012` | Environment/recovery/network/cost proof entry becomes defined; provider, legal/privacy, and measured proof remain. |
| `ADR-READY-013` | Observability/incident/privileged policy becomes defined; tooling, leakage exercise, reviewer, and proof remain. |
| `ADR-READY-014/015` | Field/accessibility review ownership improves; exact reviewer/device execution remains. |
| `WP98-PROOF-WAVE-001` through `007` | Common operating and reviewer-entry policy becomes available for later priority/authorization decisions; no proof preparation or execution is authorized. |

## Options considered

| ID | Option | Recommendation | Reason |
| --- | --- | --- | --- |
| `WP102-OPT-001` | Advance a business-hours, owner-led managed-service operating model with explicit environments, bounded service targets, verified recovery, purpose-scoped operations, cost controls, and separately authorized proofs. | Advance | Fits the accepted team/budget while keeping operational obligations visible and testable. |
| `WP102-OPT-002` | Promise 24/7 support, multi-region continuity, and enterprise SLA before staffing or revenue. | Reject initially | Creates an unfunded and unprovable obligation. |
| `WP102-OPT-003` | Create shared provider accounts and run broad experiments under the USD 100 ceiling. | Reject | A ceiling is not permission; shared authority and unbounded resources undermine cost/security evidence. |
| `WP102-OPT-004` | Treat agent review as qualified legal, accounting, accessibility, or production-security approval. | Reject | Fabricates qualification and creates unacceptable production risk. |

## Risks and proof obligations

| ID | Risk | Required control/evidence |
| --- | --- | --- |
| `WP102-RISK-001` | Business-hours model leaves serious after-hours impact. | Honest no-24/7 statement, offline/manual continuity, owner alert, re-baseline trigger. |
| `WP102-RISK-002` | Recovery target is assumed from backup configuration. | Independently reviewed isolated restore and invariant/external-effect reconciliation. |
| `WP102-RISK-003` | Logs create a second sensitive data store. | Redaction/minimization, access/retention/cost controls, leakage testing. |
| `WP102-RISK-004` | Hosted proof leaves recurring cost or credentials. | Preconfigured alerts/expiry plus mandatory residual and final-billing verification. |
| `WP102-RISK-005` | Owner fills too many roles and misses control failures. | Fixed dual control, fresh technical validation, declared conflicts, qualified humans at production gates. |
| `WP102-RISK-006` | Numeric targets become customer promises. | Label evaluation targets; contractual SLA requires separate operating/budget acceptance. |
| `WP102-RISK-007` | Vulnerability targets exceed small-team capacity. | Managed/supported dependencies, exposure-based containment, explicit exception/expiry, staffing re-baseline. |

## Accepted owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP102-DEC-001` | Accept `OPERATING-BASE-001` through `010`, the environment matrix, and `ENVIRONMENT-BASE-001` through `010`. | Accepted |
| `WP102-DEC-002` | Accept `RELEASE-BASE-001` through `012`, `SERVICE-BASE-001` through `010`, and `NETWORK-PROOF-BASE-001` through `006` as evaluation policy. | Accepted |
| `WP102-DEC-003` | Accept `RECOVERY-OPS-BASE-001` through `010`, `OBSERVABILITY-BASE-001` through `008`, the severity matrix, and `INCIDENT-BASE-001` through `008`. | Accepted |
| `WP102-DEC-004` | Accept `PRIVILEGED-BASE-001` through `008`, `CAPACITY-BASE-001` through `010`, and `SUPPLY-BASE-001` through `008`. | Accepted |
| `WP102-DEC-005` | Accept `PROVIDER-PROOF-BASE-001` through `014` as readiness policy only; authorize no account, cost, credential, resource, network, or proof. | Accepted |
| `WP102-DEC-006` | Accept `REVIEW-ROLE-001` through `010` and `REVIEW-BASE-001` through `008`, including truthful unassigned qualified-human gates. | Accepted |
| `WP102-DEC-007` | Resolve or partially resolve the sixteen open items exactly as recorded without presenting unmeasured or unreviewed obligations as complete. | Accepted |
| `WP102-DEC-008` | Advance `WP102-OPT-001`; reject `WP102-OPT-002`, `WP102-OPT-003`, and `WP102-OPT-004`. | Accepted |
| `WP102-DEC-009` | Keep all affected ADR rows `NOT_READY`; authorize no proof preparation/execution, architecture selection, provider/cost action, or implementation. | Accepted |
| `WP102-DEC-010` | Freeze the four-path WP-102 public candidate inventory and, after verified publication, activate WP-103 Architecture Proof-Wave Priority and Authorization Sequence for owner-decision documentation only. | Accepted |

## Frozen candidate inventory and next gate

The candidate WP-102 public inventory is exactly:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/104_DATA_CONSISTENCY_INVENTORY_REPORTING_INTEGRATION_POLICY_BASELINE.md`
4. `docs/105_OPERATING_MODEL_PROVIDER_PROOF_ENTRY_SPECIALIST_ASSIGNMENT_BASELINE.md`

The owner accepted `DEC-237`, every baseline and matrix in this document, all recorded open-item
dispositions, and `WP102-DEC-001` through `010`; advanced `WP102-OPT-001`; rejected
`WP102-OPT-002` through `004`; and authorized commit and push only for the exact four paths above.
After verified publication, WP-103 may decide which proof waves are necessary, which can be
combined, their priority, exact remaining blockers, and the sequence of later separate
authorizations. Proof preparation/execution, final architecture selection, application coding,
infrastructure, deployment, provider accounts/cost, and customer/live data remain closed.

## Verified publication and successor activation

The exact four-path WP-102 public inventory was committed and published at
`f02196a02f4b3e4ba71a8608c330cecc7f310eb9`, repository tree
`c689b548023bada8a6fca452153a331830669fa0`, with unchanged proof tree
`1e9f75fdc1b221009bc691f54d24ca63f02c8038`. Local `HEAD`, fetched `origin/main`, and live remote
main matched. WP-102 is verified and closed; its publication authority is consumed.

WP-103 is active for proof-wave priority and authorization-sequence documentation only. It does
not authorize proof preparation/materialization/execution, dependencies, devices, provider or
network action, cost, architecture selection, application coding, infrastructure, deployment, or
customer/live data.
