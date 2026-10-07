import { Injectable } from "@nestjs/common";
import { ProofDatabase } from "./database.js";
import type { SecurityContext } from "./types.js";

@Injectable()
export class MachineAuthorityVerifier {
  constructor(private readonly database: ProofDatabase) {}

  async isActive(context: SecurityContext, targetOrganizationId: string | null): Promise<boolean> {
    if (!context.machineJobId || !context.activeOrganizationId) return false;
    if (!targetOrganizationId) return false;
    return this.database.inContext(context, async (client) => {
      const result = await client.query<{ active: boolean }>(
        "SELECT security.can_access_tenant($1, 'UPDATE', 'BACKGROUND_JOB', true) AS active",
        [targetOrganizationId],
      );
      return result.rows[0]?.active ?? false;
    });
  }
}
