import { Injectable } from "@nestjs/common";
import { ProofAuditWriter } from "./audit.js";
import { ProofDatabase } from "./database.js";
import { MachineAuthorityVerifier } from "./machine.js";
import { ProofAuthorizationPolicy } from "./policy.js";
import { SupportGrantVerifier } from "./support.js";
import type {
  AuthorizationDecision,
  AuthorizationRequest,
  ProofObservation,
  ProofPath,
  SecurityContext,
} from "./types.js";

function expectedRlsDenial(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "42501";
}

@Injectable()
export class ProofPathExecutor {
  constructor(
    private readonly database: ProofDatabase,
    private readonly policy: ProofAuthorizationPolicy,
    private readonly audit: ProofAuditWriter,
    private readonly support: SupportGrantVerifier,
    private readonly machine: MachineAuthorityVerifier,
  ) {}

  evaluateApplication(
    context: SecurityContext,
    request: AuthorizationRequest,
  ): AuthorizationDecision {
    return this.policy.decide(context, request);
  }

  async recordResolutionDenial(
    context: SecurityContext,
    request: AuthorizationRequest,
    reason: string,
  ): Promise<string> {
    void reason;
    const auditId = await this.audit.record(context, request, {
      outcome: "DENY",
      reason: "MISSING_CONTEXT",
    });
    return auditId;
  }

  async auditExists(context: SecurityContext, auditId: string): Promise<boolean> {
    return this.database.inContext(
      context,
      async (client) => {
        const result = await client.query<{ present: boolean }>(
          "SELECT EXISTS (SELECT 1 FROM security.audit_events WHERE id = $1) AS present",
          [auditId],
        );
        return result.rows[0]?.present ?? false;
      },
      "ROLLBACK",
      false,
    );
  }

  async evaluateDatabase(
    context: SecurityContext,
    request: AuthorizationRequest,
    path: ProofPath,
    targetDisplayKey: string,
  ): Promise<ProofObservation> {
    const started = performance.now();
    const before = await this.database.tenantStateHash(context);
    let ids: ReadonlyArray<string> = [];

    if (path === "platform-directory" && request.resourceKind === "ORGANIZATION_DIRECTORY") {
      ids = await this.database.inContext(
        context,
        async (client) => {
          const result = await client.query<{ id: string }>(
            "SELECT id FROM platform.organizations WHERE ($1::uuid IS NULL OR id = $1)",
            [request.resourceOrganizationId],
          );
          return result.rows.map((row) => row.id);
        },
        "ROLLBACK",
        false,
      );
    } else if (path === "support-session" && context.authoritySource === "SUPPORT_GRANT") {
      ids = (await this.support.isActiveReadGrant(context, request.resourceKind, request.write))
        ? [context.supportGrantId!]
        : [];
    } else if (path === "background" && context.authoritySource === "MACHINE_IDENTITY") {
      ids = (await this.machine.isActive(context, request.resourceOrganizationId))
        ? [context.machineJobId!]
        : [];
    } else {
      ids = await this.database.inContext(context, async (client) => {
        if (path === "background") {
          const result = await client.query<{ id: string }>(
            `SELECT b.id FROM tenant.background_jobs b
              JOIN tenant.resources r
                ON (r.id, r.organization_id) = (b.target_resource_id, b.organization_id)
             WHERE r.display_key = $1`,
            [targetDisplayKey],
          );
          return result.rows.map((row) => row.id);
        }
        if (path === "evidence-metadata") {
          if (request.write) {
            const result = await client.query<{ id: string }>(
              `UPDATE tenant.evidence_metadata e
                  SET object_reference = e.object_reference
                 FROM tenant.resources r
                WHERE (r.id, r.organization_id) = (e.owning_resource_id, e.organization_id)
                  AND r.display_key = $1
              RETURNING e.id`,
              [targetDisplayKey],
            ).catch((error: unknown) => {
              if (!expectedRlsDenial(error)) throw error;
              return { rows: [] as Array<{ id: string }> };
            });
            return result.rows.map((row) => row.id);
          }
          const result = await client.query<{ id: string }>(
            `SELECT e.id FROM tenant.evidence_metadata e
              JOIN tenant.resources r
                ON (r.id, r.organization_id) = (e.owning_resource_id, e.organization_id)
             WHERE r.display_key = $1`,
            [targetDisplayKey],
          );
          return result.rows.map((row) => row.id);
        }
        if (path === "search-cache-report-export") {
          const result = await client.query<{ id: string }>(
            `SELECT p.id FROM tenant.projection_rows p
              JOIN tenant.resources r
                ON (r.id, r.organization_id) = (p.source_resource_id, p.organization_id)
             WHERE r.display_key = $1`,
            [targetDisplayKey],
          );
          return result.rows.map((row) => row.id);
        }
        if (path === "audit-log-error") {
          const result = await client.query<{ id: string }>(
            "SELECT id FROM security.audit_events WHERE case_id = $1",
            [`seed-${targetDisplayKey.split("-").slice(0, 2).join("-")}`],
          );
          return result.rows.map((row) => row.id);
        }
        const result = request.write
          ? await client.query<{ id: string }>(
              "UPDATE tenant.resources SET payload = payload WHERE display_key = $1 RETURNING id",
              [targetDisplayKey],
            ).catch((error: unknown) => {
              if (!expectedRlsDenial(error)) throw error;
              return { rows: [] as Array<{ id: string }> };
            })
          : await client.query<{ id: string }>(
              "SELECT id FROM tenant.resources WHERE display_key = $1",
              [targetDisplayKey],
            );
        return result.rows.map((row) => row.id);
      }, "ROLLBACK", false);
    }

    const outcome = ids.length > 0 ? "ALLOW" : "DENY";
    const after = await this.database.tenantStateHash(context);
    return {
      mode: "RLS_ONLY",
      outcome,
      reason: outcome === "ALLOW" ? "DATABASE_PATH_VISIBLE" : "DATABASE_PATH_HIDDEN",
      returnedSyntheticIds: ids,
      mutationBeforeHash: before,
      mutationAfterHash: after,
      auditReference: null,
      databaseRole: "tp01_runtime",
      durationMs: performance.now() - started,
    };
  }

  async evaluateCombined(
    context: SecurityContext,
    request: AuthorizationRequest,
    path: ProofPath,
    targetDisplayKey: string,
  ): Promise<ProofObservation> {
    const started = performance.now();
    const application = this.evaluateApplication(context, request);
    if (application.outcome === "DENY") {
      const auditReference = await this.audit.record(context, request, application);
      return {
        mode: "COMBINED",
        outcome: "DENY",
        reason: application.reason,
        returnedSyntheticIds: [],
        mutationBeforeHash: await this.database.tenantStateHash(context),
        mutationAfterHash: await this.database.tenantStateHash(context),
        auditReference,
        databaseRole: "tp01_runtime",
        durationMs: performance.now() - started,
      };
    }
    const database = await this.evaluateDatabase(context, request, path, targetDisplayKey);
    const combined: AuthorizationDecision = {
      outcome: database.outcome,
      reason: database.outcome === "ALLOW" ? application.reason : "ORGANIZATION_MISMATCH",
    };
    const auditReference = await this.audit.record(context, request, combined);
    return {
      ...database,
      mode: "COMBINED",
      reason: combined.reason,
      auditReference,
      durationMs: performance.now() - started,
    };
  }

  async evaluateControlledNegative(
    context: SecurityContext,
    request: AuthorizationRequest,
    path: ProofPath,
    targetDisplayKey: string,
  ): Promise<ProofObservation> {
    const result = await this.evaluateDatabase(context, request, path, targetDisplayKey);
    return { ...result, mode: "CONTROLLED_NEGATIVE", reason: `APPLICATION_BYPASSED:${result.reason}` };
  }
}
