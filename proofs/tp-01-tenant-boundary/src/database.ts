import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { createHash } from "node:crypto";
import { Pool, type PoolClient } from "pg";
import type { SecurityContext } from "./types.js";

@Injectable()
export class ProofDatabase implements OnModuleDestroy {
  private readonly pool = new Pool({
    connectionString: process.env.TP01_DATABASE_URL,
    max: 4,
    idleTimeoutMillis: 1_000,
    connectionTimeoutMillis: 2_000,
    application_name: "field-service-crm-tp01",
  });

  async inContext<T>(
    context: SecurityContext,
    operation: (client: PoolClient) => Promise<T>,
    completion: "ROLLBACK" | "COMMIT" = "ROLLBACK",
    requireOrganization = true,
  ): Promise<T> {
    if (requireOrganization && !context.activeOrganizationId) {
      throw new Error("database operation requires organization");
    }
    const client = await this.pool.connect();
    try {
      return await this.inContextOnClient(client, context, operation, completion, requireOrganization);
    } finally {
      client.release();
    }
  }

  async inContextOnClient<T>(
    client: PoolClient,
    context: SecurityContext,
    operation: (client: PoolClient) => Promise<T>,
    completion: "ROLLBACK" | "COMMIT" = "ROLLBACK",
    requireOrganization = true,
  ): Promise<T> {
    if (requireOrganization && !context.activeOrganizationId) {
      throw new Error("database operation requires organization");
    }
    try {
      await client.query("BEGIN");
      await client.query("SELECT set_config('app.organization_id', $1, true)", [
        context.activeOrganizationId ?? "",
      ]);
      await client.query("SELECT set_config('app.subject_id', $1, true)", [context.subjectId]);
      await client.query("SELECT set_config('app.case_id', $1, true)", [context.caseId]);
      await client.query("SELECT set_config('app.authority_source', $1, true)", [
        context.authoritySource,
      ]);
      await client.query("SELECT set_config('app.authority_revision', $1, true)", [
        String(context.authorityRevision),
      ]);
      await client.query("SELECT set_config('app.purpose', $1, true)", [context.purpose]);
      await client.query("SELECT set_config('app.proof_clock', $1, true)", [context.proofClock]);
      await client.query("SELECT set_config('app.support_grant_id', $1, true)", [
        context.supportGrantId ?? "",
      ]);
      await client.query("SELECT set_config('app.machine_job_id', $1, true)", [
        context.machineJobId ?? "",
      ]);
      const value = await operation(client);
      await client.query(completion);
      return value;
    } catch (error) {
      await client.query("ROLLBACK").catch(() => undefined);
      throw error;
    }
  }

  async withDedicatedClient<T>(operation: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    try {
      return await operation(client);
    } finally {
      client.release();
    }
  }

  async tenantStateHash(context: SecurityContext): Promise<string> {
    const state = await this.inContext(
      context,
      async (client) => {
        const result = await client.query<{ kind: string; id: string; value: string }>(`
          SELECT 'resource' AS kind, id::text, payload::text AS value FROM tenant.resources
          UNION ALL
          SELECT 'evidence', id::text, object_reference FROM tenant.evidence_metadata
          UNION ALL
          SELECT 'projection', id::text, payload::text FROM tenant.projection_rows
          UNION ALL
          SELECT 'background', id::text, lifecycle_state FROM tenant.background_jobs
          ORDER BY kind, id
        `);
        return result.rows;
      },
      "ROLLBACK",
      false,
    );
    return createHash("sha256").update(JSON.stringify(state)).digest("hex");
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }
}
