import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { ProofDatabase } from "./database.js";
import type {
  AuthorizationDecision,
  AuthorizationRequest,
  SecurityContext,
} from "./types.js";

@Injectable()
export class ProofAuditWriter {
  constructor(private readonly database: ProofDatabase) {}

  async record(
    context: SecurityContext,
    request: AuthorizationRequest,
    decision: AuthorizationDecision,
  ): Promise<string> {
    const auditId = randomUUID();
    await this.database.inContext(context, async (client) => {
      await client.query(
        `INSERT INTO security.audit_events (
           id, organization_id, subject_id, authority_source, action,
           resource_kind, resource_id, decision, purpose, correlation_id, case_id, details
         ) VALUES (
           $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
           jsonb_build_object('reason', $12::text, 'synthetic', true)
         )`,
        [
          auditId,
          context.activeOrganizationId,
          context.subjectId,
          context.authoritySource,
          request.action,
          request.resourceKind,
          request.resourceId,
          decision.outcome,
          context.purpose,
          context.correlationId,
          context.caseId,
          decision.reason,
        ],
      );
    }, "COMMIT", false);
    return auditId;
  }

  async readSanitized(context: SecurityContext, auditId: string) {
    return this.database.inContext(
      context,
      async (client) => {
        const result = await client.query<{
          id: string;
          organization_id: string | null;
          subject_id: string;
          authority_source: string;
          action: string;
          resource_kind: string;
          resource_id: string | null;
          decision: "ALLOW" | "DENY";
          purpose: string;
          correlation_id: string;
          case_id: string;
          details: { reason?: string; synthetic?: boolean };
        }>(
          `SELECT id, organization_id, subject_id, authority_source, action, resource_kind,
                  resource_id, decision, purpose, correlation_id, case_id, details
             FROM security.audit_events
            WHERE id = $1`,
          [auditId],
        );
        return result.rows[0] ?? null;
      },
      "ROLLBACK",
      false,
    );
  }
}
