import { Injectable } from "@nestjs/common";
import { ProofAuthorizationPolicy } from "./policy.js";
import { ProofDatabase } from "./database.js";
import type { ProofResourceKind, SecurityContext, TenantResourceRecord } from "./types.js";

@Injectable()
export class TenantResourceRepository {
  constructor(
    private readonly database: ProofDatabase,
    private readonly policy: ProofAuthorizationPolicy,
  ) {}

  async findById(context: SecurityContext, id: string): Promise<TenantResourceRecord | null> {
    return this.database.inContext(context, async (client) => {
      const lookup = await client.query<{
        id: string;
        organization_id: string;
        resource_kind: ProofResourceKind;
        display_key: string;
        payload: Record<string, unknown>;
      }>(
        `SELECT id, organization_id, resource_kind, display_key, payload
           FROM tenant.resources
          WHERE id = $1`,
        [id],
      );
      const row = lookup.rows[0];
      if (!row) return null;
      const decision = this.policy.decide(context, {
        action: "READ",
        resourceKind: row.resource_kind,
        resourceId: row.id,
        resourceOrganizationId: row.organization_id,
        write: false,
      });
      if (decision.outcome !== "ALLOW") return null;
      return {
        id: row.id,
        organizationId: row.organization_id,
        resourceKind: row.resource_kind,
        displayKey: row.display_key,
        payload: row.payload,
      };
    });
  }

  async findByDisplayKey(
    context: SecurityContext,
    displayKey: string,
  ): Promise<TenantResourceRecord | null> {
    return this.database.inContext(context, async (client) => {
      const result = await client.query<{
        id: string;
        organization_id: string;
        resource_kind: ProofResourceKind;
        display_key: string;
        payload: Record<string, unknown>;
      }>(
        `SELECT id, organization_id, resource_kind, display_key, payload
           FROM tenant.resources
          WHERE display_key = $1`,
        [displayKey],
      );
      const row = result.rows[0];
      if (!row) return null;
      const decision = this.policy.decide(context, {
        action: "READ",
        resourceKind: row.resource_kind,
        resourceId: row.id,
        resourceOrganizationId: row.organization_id,
        write: false,
      });
      return decision.outcome === "ALLOW"
        ? {
            id: row.id,
            organizationId: row.organization_id,
            resourceKind: row.resource_kind,
            displayKey: row.display_key,
            payload: row.payload,
          }
        : null;
    });
  }

  async touchByDisplayKey(context: SecurityContext, displayKey: string): Promise<boolean> {
    return this.database.inContext(context, async (client) => {
      const lookup = await client.query<{
        id: string;
        organization_id: string;
        resource_kind: ProofResourceKind;
      }>("SELECT id, organization_id, resource_kind FROM tenant.resources WHERE display_key = $1", [
        displayKey,
      ]);
      const row = lookup.rows[0];
      if (!row) return false;
      const decision = this.policy.decide(context, {
        action: "UPDATE",
        resourceKind: row.resource_kind,
        resourceId: row.id,
        resourceOrganizationId: row.organization_id,
        write: true,
      });
      if (decision.outcome !== "ALLOW") return false;
      const update = await client.query<{ id: string }>(
        "UPDATE tenant.resources SET payload = payload WHERE id = $1 RETURNING id",
        [row.id],
      );
      return update.rowCount === 1;
    });
  }

  async listProjection(context: SecurityContext, searchKey: string): Promise<ReadonlyArray<string>> {
    return this.database.inContext(context, async (client) => {
      const result = await client.query<{ id: string }>(
        `SELECT r.id
           FROM tenant.projection_rows p
           JOIN tenant.resources r
             ON r.id = p.source_resource_id
            AND r.organization_id = p.organization_id
          WHERE p.payload ->> 'searchKey' = $1
          ORDER BY r.id`,
        [searchKey],
      );
      return result.rows.map((row) => row.id);
    });
  }

  async evidenceMetadata(context: SecurityContext, id: string): Promise<string | null> {
    return this.database.inContext(context, async (client) => {
      const result = await client.query<{ object_reference: string }>(
        `SELECT object_reference
           FROM tenant.evidence_metadata
          WHERE id = $1`,
        [id],
      );
      return result.rows[0]?.object_reference ?? null;
    });
  }

  async evidenceMetadataByResourceKey(
    context: SecurityContext,
    displayKey: string,
  ): Promise<string | null> {
    return this.database.inContext(context, async (client) => {
      const result = await client.query<{ object_reference: string }>(
        `SELECT e.object_reference
           FROM tenant.evidence_metadata e
           JOIN tenant.resources r
             ON (r.id, r.organization_id) = (e.owning_resource_id, e.organization_id)
          WHERE r.display_key = $1`,
        [displayKey],
      );
      return result.rows[0]?.object_reference ?? null;
    });
  }

  async touchEvidenceByResourceKey(
    context: SecurityContext,
    displayKey: string,
  ): Promise<boolean> {
    return this.database.inContext(context, async (client) => {
      const lookup = await client.query<{ id: string; organization_id: string }>(
        `SELECT e.id, e.organization_id
           FROM tenant.evidence_metadata e
           JOIN tenant.resources r
             ON (r.id, r.organization_id) = (e.owning_resource_id, e.organization_id)
          WHERE r.display_key = $1`,
        [displayKey],
      );
      const row = lookup.rows[0];
      if (!row) return false;
      const decision = this.policy.decide(context, {
        action: "UPDATE",
        resourceKind: "EVIDENCE_METADATA",
        resourceId: row.id,
        resourceOrganizationId: row.organization_id,
        write: true,
      });
      if (decision.outcome !== "ALLOW") return false;
      const update = await client.query<{ id: string }>(
        "UPDATE tenant.evidence_metadata SET object_reference = object_reference WHERE id = $1 RETURNING id",
        [row.id],
      );
      return update.rowCount === 1;
    });
  }
}
