import { Injectable } from "@nestjs/common";
import { ProofDatabase } from "./database.js";
import type { ProofResourceKind, SecurityContext } from "./types.js";

@Injectable()
export class SupportGrantVerifier {
  constructor(private readonly database: ProofDatabase) {}

  async isActiveReadGrant(
    context: SecurityContext,
    resourceKind: ProofResourceKind,
    write: boolean,
  ): Promise<boolean> {
    if (!context.supportGrantId || !context.activeOrganizationId) return false;
    return this.database.inContext(context, async (client) => {
      const result = await client.query<{ active: boolean }>(
        "SELECT security.can_access_tenant($1, $2, $3, $4) AS active",
        [context.activeOrganizationId, write ? "UPDATE" : "READ", resourceKind, write],
      );
      return result.rows[0]?.active ?? false;
    });
  }
}
