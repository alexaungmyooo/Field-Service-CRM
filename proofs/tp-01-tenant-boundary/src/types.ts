export type OrganizationKey =
  | "org-alpha"
  | "org-bravo"
  | "org-charlie"
  | "org-suspended";

export type AuthoritySource =
  | "MEMBERSHIP"
  | "PLATFORM_DIRECTORY"
  | "SUPPORT_GRANT"
  | "MACHINE_IDENTITY";

export type ProofAction = "READ" | "CREATE" | "UPDATE" | "EXPORT" | "DISCOVER";

export type ProofPath =
  | "interactive"
  | "repository"
  | "background"
  | "search-cache-report-export"
  | "evidence-metadata"
  | "platform-directory"
  | "support-session"
  | "audit-log-error";

export type ProofResourceKind =
  | "ORGANIZATION_DIRECTORY"
  | "CUSTOMER"
  | "SITE"
  | "EQUIPMENT"
  | "JOB"
  | "VISIT"
  | "WORKER"
  | "INVENTORY"
  | "EVIDENCE_METADATA"
  | "PROJECTION"
  | "BACKGROUND_JOB"
  | "AUDIT_EVENT";

export interface SecurityContext {
  readonly subjectId: string;
  readonly subjectKey: string;
  readonly activeOrganizationId: string | null;
  readonly activeOrganizationKey: OrganizationKey | null;
  readonly authoritySource: AuthoritySource;
  readonly authorityRevision: number;
  readonly authorityOrganizationId: string | null;
  readonly authorityAccessMode: "READ_ONLY" | "READ_WRITE" | null;
  readonly authorityResourceKinds: ReadonlyArray<ProofResourceKind>;
  readonly authorityValidFrom: string | null;
  readonly authorityValidUntil: string | null;
  readonly authorityRevokedAt: string | null;
  readonly machinePurpose: string | null;
  readonly purpose: string;
  readonly proofClock: string;
  readonly correlationId: string;
  readonly caseId: string;
  readonly supportGrantId: string | null;
  readonly machineJobId: string | null;
}

export interface AuthorizationRequest {
  readonly action: ProofAction;
  readonly resourceKind: ProofResourceKind;
  readonly resourceId: string | null;
  readonly resourceOrganizationId: string | null;
  readonly write: boolean;
}

export interface AuthorizationDecision {
  readonly outcome: "ALLOW" | "DENY";
  readonly reason:
    | "TENANT_MEMBER_SCOPE"
    | "PLATFORM_DIRECTORY_SCOPE"
    | "SUPPORT_GRANT_SCOPE"
    | "MACHINE_SCOPE"
    | "MISSING_CONTEXT"
    | "ORGANIZATION_MISMATCH"
    | "AUTHORITY_SCOPE_MISMATCH"
    | "STALE_OR_REVOKED_AUTHORITY";
}

export interface SyntheticRequestInput {
  readonly token: string | null;
  readonly requestedOrganizationKey: string | null;
  readonly hostOrganizationKey: string | null;
  readonly purpose: string | null;
  readonly correlationId: string | null;
  readonly caseId: string | null;
  readonly supportGrantClaim: string | null;
  readonly machineJobClaim: string | null;
}

export interface TenantResourceRecord {
  readonly id: string;
  readonly organizationId: string;
  readonly resourceKind: ProofResourceKind;
  readonly displayKey: string;
  readonly payload: Readonly<Record<string, unknown>>;
}

export interface ProofObservation {
  readonly mode: import("./proof-contract.js").EnforcementMode;
  readonly outcome: "ALLOW" | "DENY";
  readonly reason: string;
  readonly returnedSyntheticIds: ReadonlyArray<string>;
  readonly mutationBeforeHash: string;
  readonly mutationAfterHash: string;
  readonly auditReference: string | null;
  readonly databaseRole: string | null;
  readonly durationMs: number;
}
