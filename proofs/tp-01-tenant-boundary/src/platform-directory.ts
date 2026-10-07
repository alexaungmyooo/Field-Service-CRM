import { Injectable } from "@nestjs/common";
import { ProofDatabase } from "./database.js";
import { ProofAuthorizationPolicy } from "./policy.js";
import type { SecurityContext } from "./types.js";

@Injectable()
export class PlatformDirectoryRepository {
  constructor(
    private readonly database: ProofDatabase,
    private readonly policy: ProofAuthorizationPolicy,
  ) {}

  async list(context: SecurityContext) {
    const decision = this.policy.decide(context, {
      action: "DISCOVER",
      resourceKind: "ORGANIZATION_DIRECTORY",
      resourceId: null,
      resourceOrganizationId: context.activeOrganizationId,
      write: false,
    });
    if (decision.outcome !== "ALLOW") return [];
    return this.database.inContext(
      context,
      async (client) => {
        const result = await client.query<{
          id: string;
          display_key: string;
          lifecycle_state: string;
        }>("SELECT id, display_key, lifecycle_state FROM platform.organizations ORDER BY display_key");
        return result.rows;
      },
      "ROLLBACK",
      false,
    );
  }
}
