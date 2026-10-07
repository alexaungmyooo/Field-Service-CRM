import { Injectable } from "@nestjs/common";
import {
  isOrganizationKey,
  machineAuthorities,
  organizations,
  principals,
  supportGrants,
  type SyntheticPrincipal,
} from "./synthetic-directory.js";
import { PROOF_CLOCK } from "./proof-contract.js";
import type { SecurityContext, SyntheticRequestInput } from "./types.js";

export class ContextResolutionError extends Error {}

@Injectable()
export class SecurityContextResolver {
  resolve(input: SyntheticRequestInput): SecurityContext {
    if (!input.token || !input.purpose || !input.correlationId || !input.caseId) {
      throw new ContextResolutionError("required authoritative context is missing");
    }
    const principal = principals[input.token];
    if (!principal) throw new ContextResolutionError("synthetic principal is not verified");

    switch (principal.authoritySource) {
      case "MEMBERSHIP":
        return this.resolveMembership(principal, input);
      case "PLATFORM_DIRECTORY":
        if (!principal.platformDirectory) throw new ContextResolutionError("platform role missing");
        return this.context(principal, input, null, null, 1, null, null, null);
      case "SUPPORT_GRANT":
        if (!input.supportGrantClaim || !principal.supportGrantIds.includes(input.supportGrantClaim)) {
          throw new ContextResolutionError("support grant is absent or unverified");
        }
        return this.resolveBoundOrganization(
          principal,
          input,
          1,
          supportGrants[input.supportGrantClaim] ?? null,
          null,
        );
      case "MACHINE_IDENTITY":
        if (!input.machineJobClaim || !principal.machineJobIds.includes(input.machineJobClaim)) {
          throw new ContextResolutionError("machine job is absent or unverified");
        }
        return this.resolveBoundOrganization(
          principal,
          input,
          1,
          null,
          machineAuthorities[input.machineJobClaim] ?? null,
        );
    }
  }

  private resolveMembership(principal: SyntheticPrincipal, input: SyntheticRequestInput) {
    if (!input.requestedOrganizationKey || !isOrganizationKey(input.requestedOrganizationKey)) {
      throw new ContextResolutionError("requested organization is missing or invalid");
    }
    if (
      input.hostOrganizationKey &&
      input.hostOrganizationKey !== input.requestedOrganizationKey
    ) {
      throw new ContextResolutionError("host and requested organization conflict");
    }
    const membership = principal.memberships.find(
      (item) => item.organizationKey === input.requestedOrganizationKey,
    );
    if (!membership || membership.state !== "ACTIVE") {
      throw new ContextResolutionError("active membership is missing");
    }
    if (organizations[membership.organizationKey].state !== "ACTIVE") {
      throw new ContextResolutionError("organization is not active");
    }
    return this.context(
      principal,
      input,
      membership.organizationId,
      membership.organizationKey,
      membership.revision,
      null,
      null,
      membership.organizationId,
    );
  }

  private resolveBoundOrganization(
    principal: SyntheticPrincipal,
    input: SyntheticRequestInput,
    revision: number,
    supportGrant: (typeof supportGrants)[string] | null,
    machineAuthority: (typeof machineAuthorities)[string] | null,
  ) {
    if (!input.requestedOrganizationKey || !isOrganizationKey(input.requestedOrganizationKey)) {
      throw new ContextResolutionError("bounded authority requires a valid organization");
    }
    return this.context(
      principal,
      input,
      organizations[input.requestedOrganizationKey].id,
      input.requestedOrganizationKey,
      revision,
      supportGrant,
      machineAuthority,
      supportGrant?.organizationId ?? machineAuthority?.organizationId ?? null,
    );
  }

  private context(
    principal: SyntheticPrincipal,
    input: SyntheticRequestInput,
    organizationId: string | null,
    organizationKey: SecurityContext["activeOrganizationKey"],
    revision: number,
    supportGrant: (typeof supportGrants)[string] | null,
    machineAuthority: (typeof machineAuthorities)[string] | null,
    authorityOrganizationId: string | null,
  ): SecurityContext {
    return {
      subjectId: principal.subjectId,
      subjectKey: principal.subjectKey,
      activeOrganizationId: organizationId,
      activeOrganizationKey: organizationKey,
      authoritySource: principal.authoritySource,
      authorityRevision: revision,
      authorityOrganizationId,
      authorityAccessMode: supportGrant?.accessMode ?? null,
      authorityResourceKinds: supportGrant?.resourceKinds ?? [],
      authorityValidFrom: supportGrant?.validFrom ?? null,
      authorityValidUntil: supportGrant?.validUntil ?? null,
      authorityRevokedAt: supportGrant?.revokedAt ?? machineAuthority?.revokedAt ?? null,
      machinePurpose: machineAuthority?.purpose ?? null,
      purpose: input.purpose!,
      proofClock: PROOF_CLOCK,
      correlationId: input.correlationId!,
      caseId: input.caseId!,
      supportGrantId: supportGrant?.id ?? null,
      machineJobId: machineAuthority?.id ?? null,
    };
  }
}
