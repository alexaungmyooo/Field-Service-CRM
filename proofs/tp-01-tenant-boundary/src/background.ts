import { Injectable } from "@nestjs/common";
import { ProofAuthorizationPolicy } from "./policy.js";
import type { SecurityContext } from "./types.js";

@Injectable()
export class BackgroundAuthorizationAdapter {
  constructor(private readonly policy: ProofAuthorizationPolicy) {}

  authorize(context: SecurityContext, targetResourceId: string, organizationId: string) {
    return this.policy.decide(context, {
      action: "UPDATE",
      resourceKind: "BACKGROUND_JOB",
      resourceId: targetResourceId,
      resourceOrganizationId: organizationId,
      write: true,
    });
  }
}
