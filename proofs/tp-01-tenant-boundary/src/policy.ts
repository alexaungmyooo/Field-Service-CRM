import { Injectable } from "@nestjs/common";
import type {
  AuthorizationDecision,
  AuthorizationRequest,
  SecurityContext,
} from "./types.js";

@Injectable()
export class ProofAuthorizationPolicy {
  decide(context: SecurityContext, request: AuthorizationRequest): AuthorizationDecision {
    if (!context.purpose || !context.caseId || !context.correlationId) {
      return { outcome: "DENY", reason: "MISSING_CONTEXT" };
    }

    switch (context.authoritySource) {
      case "MEMBERSHIP":
        if (!context.activeOrganizationId || context.authorityRevision < 1) {
          return { outcome: "DENY", reason: "STALE_OR_REVOKED_AUTHORITY" };
        }
        if (context.activeOrganizationId !== request.resourceOrganizationId) {
          return { outcome: "DENY", reason: "ORGANIZATION_MISMATCH" };
        }
        return { outcome: "ALLOW", reason: "TENANT_MEMBER_SCOPE" };

      case "PLATFORM_DIRECTORY":
        if (
          request.action === "DISCOVER" &&
          request.resourceKind === "ORGANIZATION_DIRECTORY" &&
          !request.write
        ) {
          return { outcome: "ALLOW", reason: "PLATFORM_DIRECTORY_SCOPE" };
        }
        return { outcome: "DENY", reason: "AUTHORITY_SCOPE_MISMATCH" };

      case "SUPPORT_GRANT":
        if (
          !context.supportGrantId ||
          !context.activeOrganizationId ||
          context.authorityRevokedAt ||
          !context.authorityValidFrom ||
          !context.authorityValidUntil ||
          context.proofClock < context.authorityValidFrom ||
          context.proofClock >= context.authorityValidUntil
        ) {
          return { outcome: "DENY", reason: "STALE_OR_REVOKED_AUTHORITY" };
        }
        if (
          context.authorityOrganizationId !== context.activeOrganizationId ||
          context.activeOrganizationId !== request.resourceOrganizationId ||
          (request.write && context.authorityAccessMode !== "READ_WRITE") ||
          !context.authorityResourceKinds.includes(request.resourceKind)
        ) {
          return { outcome: "DENY", reason: "AUTHORITY_SCOPE_MISMATCH" };
        }
        return { outcome: "ALLOW", reason: "SUPPORT_GRANT_SCOPE" };

      case "MACHINE_IDENTITY":
        if (
          !context.machineJobId ||
          !context.activeOrganizationId ||
          context.authorityRevokedAt ||
          context.machinePurpose !== context.purpose
        ) {
          return { outcome: "DENY", reason: "STALE_OR_REVOKED_AUTHORITY" };
        }
        if (
          context.authorityOrganizationId !== context.activeOrganizationId ||
          context.activeOrganizationId !== request.resourceOrganizationId
        ) {
          return { outcome: "DENY", reason: "ORGANIZATION_MISMATCH" };
        }
        return { outcome: "ALLOW", reason: "MACHINE_SCOPE" };
    }
  }
}
