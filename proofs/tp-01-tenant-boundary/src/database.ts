import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { createHash } from "node:crypto";
import { Pool, type PoolClient } from "pg";
import type { SecurityContext } from "./types.js";

@Injectable()
export class ProofDatabase implements OnModuleDestroy {
  private static requiredDatabaseUrl(): string {
    const value = process.env.TP01_DATABASE_URL;
    const runtimePassword = process.env.TP01_RUNTIME_PASSWORD;
    const packageId = process.env.TP01_EXECUTION_PACKAGE;
    const runId = process.env.TP01_RUN_ID;
    const authorizationBinding = process.env.TP01_DATABASE_AUTHORIZATION_BINDING_SHA256;
    const validationMarker = process.env.TP01_DATABASE_CONNECTION_VALIDATED;
    const expectedMarker = createHash("sha256").update([
      "TP01_DATABASE_CHILD_V1",
      packageId,
      runId,
      value,
      runtimePassword,
      authorizationBinding,
    ].join("\0")).digest("hex");
    if (
      !value ||
      !runtimePassword ||
      !packageId ||
      !runId ||
      !/^[a-f0-9]{64}$/.test(authorizationBinding ?? "") ||
      validationMarker !== expectedMarker
    ) {
      throw new Error(
        "validated TP01_DATABASE_URL is required; node-postgres defaults and fallbacks are prohibited",
      );
    }
    return value;
  }

  private readonly pool = new Pool({
    connectionString: ProofDatabase.requiredDatabaseUrl(),
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

  async inContextWithIdentity<T>(
    context: SecurityContext,
    operation: (client: PoolClient) => Promise<T>,
    completion: "ROLLBACK" | "COMMIT" = "ROLLBACK",
    requireOrganization = true,
  ): Promise<{ readonly value: T; readonly databaseRole: string }> {
    const client = await this.pool.connect();
    try {
      return await this.inContextOnClientWithIdentity(
        client,
        context,
        operation,
        completion,
        requireOrganization,
      );
    } finally {
      client.release();
    }
  }

  async inContextOnClientWithIdentity<T>(
    client: PoolClient,
    context: SecurityContext,
    operation: (client: PoolClient) => Promise<T>,
    completion: "ROLLBACK" | "COMMIT" = "ROLLBACK",
    requireOrganization = true,
  ): Promise<{ readonly value: T; readonly databaseRole: string }> {
    return this.inContextOnClient(
      client,
      context,
      async (connectedClient) => {
        const identity = await connectedClient.query<{ current_user: string }>("SELECT current_user");
        const databaseRole = identity.rows[0]?.current_user;
        if (!databaseRole) throw new Error("database did not report the connected role");
        const value = await operation(connectedClient);
        return { value, databaseRole };
      },
      completion,
      requireOrganization,
    );
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

  async currentDatabaseRole(context: SecurityContext): Promise<string> {
    const measured = await this.inContextWithIdentity(
      context,
      async () => undefined,
      "ROLLBACK",
      false,
    );
    return measured.databaseRole;
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }
}
