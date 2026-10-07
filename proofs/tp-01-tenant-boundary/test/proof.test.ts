import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test, { after, before } from "node:test";
import { type INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ProofModule } from "../src/app.js";
import { ProofAuditWriter } from "../src/audit.js";
import { BackgroundAuthorizationAdapter } from "../src/background.js";
import { SecurityContextResolver } from "../src/context.js";
import { ProofDatabase } from "../src/database.js";
import { assertExecutionAuthorized } from "../src/execution-authorization.js";
import { MachineAuthorityVerifier } from "../src/machine.js";
import { ProofPathExecutor } from "../src/path-executor.js";
import { PlatformDirectoryRepository } from "../src/platform-directory.js";
import { TenantResourceRepository } from "../src/repository.js";
import { SupportGrantVerifier } from "../src/support.js";
import type { ProofObservation, SecurityContext } from "../src/types.js";
import {
  authorizationRequest,
  deniedProbeContext,
  httpHeaders,
  resolveCaseContext,
  targetDisplayKey,
} from "./case-input.js";
import type { ProofCase, ProofCaseManifest } from "./manifest-types.js";
import { appendAuditEvidence, appendProofResult } from "./result-writer.js";

assertExecutionAuthorized();
const manifest = JSON.parse(
  readFileSync(resolve("test/case-manifest.json"), "utf8"),
) as ProofCaseManifest;

let app: INestApplication;
let resolver: SecurityContextResolver;
let executor: ProofPathExecutor;
let database: ProofDatabase;
let background: BackgroundAuthorizationAdapter;
let resources: TenantResourceRepository;
let directory: PlatformDirectoryRepository;
let support: SupportGrantVerifier;
let audit: ProofAuditWriter;

before(async () => {
  app = await NestFactory.create(ProofModule, { logger: false });
  await app.listen(43101, "127.0.0.1");
  resolver = app.get(SecurityContextResolver);
  executor = app.get(ProofPathExecutor);
  database = app.get(ProofDatabase);
  background = app.get(BackgroundAuthorizationAdapter);
  resources = app.get(TenantResourceRepository);
  directory = app.get(PlatformDirectoryRepository);
  support = app.get(SupportGrantVerifier);
  audit = app.get(ProofAuditWriter);
});

after(async () => app.close());

function applicationObservation(
  context: SecurityContext | null,
  item: ProofCase,
  resolutionReason: string,
): ProofObservation {
  if (!context) {
    return {
      mode: "APPLICATION_ONLY",
      outcome: "DENY",
      reason: resolutionReason,
      returnedSyntheticIds: [],
      mutationBeforeHash: "CONTEXT_REJECTED_BEFORE_MUTATION",
      mutationAfterHash: "CONTEXT_REJECTED_BEFORE_MUTATION",
      auditReference: null,
      databaseRole: null,
      durationMs: 0,
    };
  }
  const request = authorizationRequest(item);
  const decision =
    item.path === "background"
      ? background.authorize(context, request.resourceId ?? item.id, request.resourceOrganizationId ?? "")
      : executor.evaluateApplication(context, request);
  return {
    mode: "APPLICATION_ONLY",
    outcome: decision.outcome,
    reason: decision.reason,
    returnedSyntheticIds: [],
    mutationBeforeHash: "APPLICATION_POLICY_NO_MUTATION",
    mutationAfterHash: "APPLICATION_POLICY_NO_MUTATION",
    auditReference: null,
    databaseRole: null,
    durationMs: 0,
  };
}

async function httpPathResult(item: ProofCase) {
  const request = authorizationRequest(item);
  const suffix = request.write ? "/touch" : "";
  const response = await fetch(
    `http://127.0.0.1:43101/tp01/resources/by-key/${encodeURIComponent(targetDisplayKey(item))}${suffix}`,
    {
      method: request.write ? "POST" : "GET",
      headers: httpHeaders(item),
      signal: AbortSignal.timeout(2_000),
    },
  );
  return { adapter: "HTTP_CONTROLLER", status: response.status, outcome: response.ok ? "ALLOW" : "DENY" };
}

async function namedPathResult(context: SecurityContext | null, item: ProofCase) {
  if (item.path === "interactive") return httpPathResult(item);
  if (!context) return { adapter: "CONTEXT_RESOLVER", outcome: "DENY" };
  const request = authorizationRequest(item);
  const key = targetDisplayKey(item);
  switch (item.path) {
    case "repository": {
      const allowed = request.write
        ? await resources.touchByDisplayKey(context, key)
        : Boolean(await resources.findByDisplayKey(context, key));
      return { adapter: "TENANT_RESOURCE_REPOSITORY", outcome: allowed ? "ALLOW" : "DENY" };
    }
    case "background": {
      const decision = background.authorize(
        context,
        request.resourceId ?? item.id,
        request.resourceOrganizationId ?? "",
      );
      const db = await executor.evaluateDatabase(context, request, item.path, key);
      return {
        adapter: "BACKGROUND_AUTHORIZATION_ADAPTER",
        outcome: decision.outcome === "ALLOW" && db.outcome === "ALLOW" ? "ALLOW" : "DENY",
      };
    }
    case "search-cache-report-export": {
      const values = await resources.listProjection(context, key);
      return { adapter: "PROJECTION_REPOSITORY", outcome: values.length ? "ALLOW" : "DENY" };
    }
    case "evidence-metadata": {
      const allowed = request.write
        ? await resources.touchEvidenceByResourceKey(context, key)
        : Boolean(await resources.evidenceMetadataByResourceKey(context, key));
      return { adapter: "EVIDENCE_METADATA_REPOSITORY", outcome: allowed ? "ALLOW" : "DENY" };
    }
    case "platform-directory": {
      if (request.resourceKind !== "ORGANIZATION_DIRECTORY") {
        const decision = executor.evaluateApplication(context, request);
        return { adapter: "DIRECTORY_TO_TENANT_NEGATIVE", outcome: decision.outcome };
      }
      const values = await directory.list(context);
      const targetPresent = values.some((row) => row.id === request.resourceOrganizationId);
      return { adapter: "PLATFORM_DIRECTORY_REPOSITORY", outcome: targetPresent ? "ALLOW" : "DENY" };
    }
    case "support-session": {
      if (context.authoritySource !== "SUPPORT_GRANT") {
        const value = await resources.findByDisplayKey(context, key);
        return { adapter: "ORDINARY_TENANT_SUPPORT_PATH", outcome: value ? "ALLOW" : "DENY" };
      }
      const active = await support.isActiveReadGrant(context, request.resourceKind, request.write);
      return { adapter: "SUPPORT_GRANT_VERIFIER", outcome: active ? "ALLOW" : "DENY" };
    }
    case "audit-log-error": {
      const decision = executor.evaluateApplication(context, request);
      const auditReference = await audit.record(context, request, decision);
      return { adapter: "AUDIT_WRITER", outcome: decision.outcome, auditReference };
    }
  }
}

async function runSimpleCase(item: ProofCase) {
  const resolved = resolveCaseContext(resolver, item);
  const appObservation = applicationObservation(resolved.context, item, resolved.resolutionReason);
  const databaseContext = resolved.context ?? deniedProbeContext(item);
  const request = authorizationRequest(item);
  const displayKey = targetDisplayKey(item);
  const namedAdapter = await namedPathResult(resolved.context, item);
  const rls = await executor.evaluateDatabase(databaseContext, request, item.path, displayKey);
  const negative = await executor.evaluateControlledNegative(
    databaseContext,
    request,
    item.path,
    displayKey,
  );
  let combined: ProofObservation;
  if (resolved.context) {
    combined = await executor.evaluateCombined(resolved.context, request, item.path, displayKey);
  } else {
    const auditReference = await executor.recordResolutionDenial(
      databaseContext,
      request,
      resolved.resolutionReason,
    );
    combined = {
      ...appObservation,
      mode: "COMBINED",
      databaseRole: "tp01_runtime",
      auditReference,
    };
  }
  const retries = [];
  if (item.contextVariant === "retry-same-correlation" && resolved.context) {
    retries.push(combined);
    retries.push(await executor.evaluateCombined(resolved.context, request, item.path, displayKey));
    assert.equal(retries[0]?.outcome, retries[1]?.outcome);
    assert.equal(resolved.context.correlationId, resolveCaseContext(resolver, item).context?.correlationId);
  }

  assert.equal(combined.outcome, item.expected, `${item.id} combined oracle`);
  assert.equal(namedAdapter.outcome, item.expected, `${item.id} named adapter oracle`);
  if (item.expected === "ALLOW") assert.equal(appObservation.outcome, "ALLOW", `${item.id} app oracle`);
  if (item.group === "TP1-CASE-002") assert.equal(rls.outcome, "DENY", `${item.id} RLS oracle`);
  assert.equal(rls.mutationBeforeHash, rls.mutationAfterHash, `${item.id} state integrity`);
  assert.ok(combined.auditReference, `${item.id} audit reference`);
  assert.equal(await executor.auditExists(databaseContext, combined.auditReference), true);
  const auditEvent = await audit.readSanitized(databaseContext, combined.auditReference);
  assert.ok(auditEvent, `${item.id} audit persistence`);
  assert.equal(auditEvent.case_id, item.id);
  assert.equal(auditEvent.decision, combined.outcome);
  assert.deepEqual(Object.keys(auditEvent.details).sort(), ["reason", "synthetic"]);
  appendAuditEvidence(auditEvent);
  appendProofResult({
    caseId: item.id,
    expected: item.expected,
    actual: combined.outcome,
    actor: item.actor,
    sourceOrganization: item.sourceOrganization,
    targetOrganization: item.targetOrganization,
    path: item.path,
    policyTrace: item.policyTrace,
    namedAdapter,
    authoritativeContext: resolved.context
      ? {
          organizationId: resolved.context.activeOrganizationId,
          authoritySource: resolved.context.authoritySource,
          purpose: resolved.context.purpose,
          correlationId: resolved.context.correlationId,
        }
      : { resolutionDenied: resolved.resolutionReason },
    observations: [appObservation, rls, combined, negative],
    retries,
    cleanupReset: "PER_CASE_TRANSACTION_ROLLBACK_AND_AUDIT_APPEND",
  });
}

async function probePoolPath(
  context: SecurityContext,
  item: ProofCase,
  dedicatedClient?: import("pg").PoolClient,
) {
  const displayKey = targetDisplayKey(item);
  const request = authorizationRequest(item);
  const operation = async (client: import("pg").PoolClient) => {
    let result;
    switch (item.path) {
      case "background":
        result = await client.query<{ id: string }>(
          `SELECT b.id FROM tenant.background_jobs b
            JOIN tenant.resources r
              ON (r.id, r.organization_id) = (b.target_resource_id, b.organization_id)
           WHERE r.display_key = $1`,
          [displayKey],
        );
        break;
      case "search-cache-report-export":
        result = await client.query<{ id: string }>(
          `SELECT p.id FROM tenant.projection_rows p
            JOIN tenant.resources r
              ON (r.id, r.organization_id) = (p.source_resource_id, p.organization_id)
           WHERE r.display_key = $1`,
          [displayKey],
        );
        break;
      case "evidence-metadata":
        result = await client.query<{ id: string }>(
          `SELECT e.id FROM tenant.evidence_metadata e
            JOIN tenant.resources r
              ON (r.id, r.organization_id) = (e.owning_resource_id, e.organization_id)
           WHERE r.display_key = $1`,
          [displayKey],
        );
        break;
      case "platform-directory":
        result = await client.query<{ id: string }>(
          "SELECT id FROM platform.organizations WHERE id = $1",
          [request.resourceOrganizationId],
        );
        break;
      case "support-session":
        result = await client.query<{ id: string }>(
          `SELECT $1::uuid AS id
           WHERE security.can_access_tenant($1, 'READ', 'JOB', false)`,
          [request.resourceOrganizationId],
        );
        break;
      case "audit-log-error":
        result = await client.query<{ id: string }>(
          "SELECT id FROM security.audit_events WHERE case_id = $1",
          [`seed-${item.targetOrganization}`],
        );
        break;
      case "interactive":
      case "repository":
        result = await client.query<{ id: string }>(
          "SELECT id FROM tenant.resources WHERE display_key = $1",
          [displayKey],
        );
        break;
    }
    return result.rows.map((row) => row.id);
  };
  return dedicatedClient
    ? database.inContextOnClient(dedicatedClient, context, operation)
    : database.inContext(context, operation);
}

async function runPoolCase(item: ProofCase) {
  assert.ok(item.organizationSequence);
  const [source, cross, restored] = item.organizationSequence;
  assert.ok(source && cross && restored);
  const sourceCase = { ...item, sourceOrganization: source, targetOrganization: source };
  const crossCase = { ...item, sourceOrganization: source, targetOrganization: cross };
  const restoredCase = { ...item, sourceOrganization: restored, targetOrganization: restored };
  const concurrentCase = { ...item, sourceOrganization: cross, targetOrganization: cross };
  const sourceContext = resolveCaseContext(resolver, sourceCase, source).context;
  const restoredContext = resolveCaseContext(resolver, restoredCase, restored).context;
  const concurrentContext = resolveCaseContext(resolver, concurrentCase, cross).context;
  assert.ok(sourceContext && restoredContext && concurrentContext);
  const sourceStateBefore = await database.tenantStateHash(sourceContext);
  const concurrentStateBefore = await database.tenantStateHash(concurrentContext);

  const sequential = await database.withDedicatedClient(async (client) => [
    await probePoolPath(sourceContext, sourceCase, client),
    await probePoolPath(sourceContext, crossCase, client),
    await probePoolPath(restoredContext, restoredCase, client),
  ]);
  assert.deepEqual(sequential.map((ids) => (ids.length ? "ALLOW" : "DENY")), [
    "ALLOW",
    "DENY",
    "ALLOW",
  ]);
  const concurrent = await Promise.all([
    probePoolPath(sourceContext, sourceCase),
    probePoolPath(concurrentContext, concurrentCase),
  ]);
  assert.ok(concurrent.every((ids) => ids.length === 1));
  const sourceStateAfter = await database.tenantStateHash(sourceContext);
  const concurrentStateAfter = await database.tenantStateHash(concurrentContext);
  assert.equal(sourceStateBefore, sourceStateAfter);
  assert.equal(concurrentStateBefore, concurrentStateAfter);
  const pathBoundary =
    item.path === "interactive"
      ? await Promise.all([
          httpPathResult(sourceCase),
          httpPathResult(crossCase),
          httpPathResult(restoredCase),
        ])
      : [
          await namedPathResult(sourceContext, sourceCase),
          await namedPathResult(sourceContext, crossCase),
          await namedPathResult(restoredContext, restoredCase),
        ];
  assert.deepEqual(pathBoundary.map((result) => result.outcome), ["ALLOW", "DENY", "ALLOW"]);
  const auditReference = await audit.record(sourceContext, authorizationRequest(sourceCase), {
    outcome: "ALLOW",
    reason: "TENANT_MEMBER_SCOPE",
  });
  assert.equal(await executor.auditExists(sourceContext, auditReference), true);
  const auditEvent = await audit.readSanitized(sourceContext, auditReference);
  assert.ok(auditEvent);
  assert.equal(auditEvent.case_id, item.id);
  assert.deepEqual(Object.keys(auditEvent.details).sort(), ["reason", "synthetic"]);
  appendAuditEvidence(auditEvent);
  appendProofResult({
    caseId: item.id,
    expected: item.expected,
    actual: "DENY_ON_CROSS_CONTEXT_AND_ALLOW_ON_RESTORED_CONTEXT",
    actor: item.actor,
    sourceOrganization: item.sourceOrganization,
    targetOrganization: item.targetOrganization,
    organizationSequence: item.organizationSequence,
    path: item.path,
    policyTrace: item.policyTrace,
    namedAdapter: {
      adapter: `DEDICATED_POOL_REUSE_CONCURRENT_AND_${item.path.toUpperCase()}`,
      outcome: "ALLOW",
      pathBoundary,
    },
    authoritativeContext: {
      source: sourceContext.activeOrganizationId,
      concurrent: concurrentContext.activeOrganizationId,
      restored: restoredContext.activeOrganizationId,
    },
    auditReference,
    observations: [
      {
        mode: "COMBINED",
        sequence: sequential.map((ids) => ids.length),
        sameConnection: true,
        mutationBeforeHash: sourceStateBefore,
        mutationAfterHash: sourceStateAfter,
      },
      {
        mode: "CONTROLLED_NEGATIVE",
        sequence: concurrent.map((ids) => ids.length),
        concurrent: true,
        mutationBeforeHash: concurrentStateBefore,
        mutationAfterHash: concurrentStateAfter,
      },
    ],
    retries: [],
    cleanupReset: "SAME_CONNECTION_TRANSACTION_CONTEXT_RESET_AND_CONCURRENT_ISOLATION",
  });
}

test("TP-01 contract has the exact executable case inventory", () => {
  assert.equal(manifest.caseCount, 222);
  assert.equal(manifest.cases.length, 222);
  assert.deepEqual(manifest.enforcementModes, [
    "APPLICATION_ONLY",
    "RLS_ONLY",
    "COMBINED",
    "CONTROLLED_NEGATIVE",
  ]);
});

for (const item of manifest.cases) {
  test(item.id, { concurrency: 1 }, async () => {
    if (item.expected === "DENY_ON_CROSS_CONTEXT_AND_ALLOW_ON_RESTORED_CONTEXT") {
      await runPoolCase(item);
    } else {
      await runSimpleCase(item);
    }
  });
}
