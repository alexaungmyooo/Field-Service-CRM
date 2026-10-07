import type { AuthoritySource, OrganizationKey } from "./types.js";

export interface SyntheticPrincipal {
  readonly subjectId: string;
  readonly subjectKey: string;
  readonly authoritySource: AuthoritySource;
  readonly memberships: ReadonlyArray<{
    readonly organizationId: string;
    readonly organizationKey: OrganizationKey;
    readonly state: "ACTIVE" | "REMOVED";
    readonly revision: number;
  }>;
  readonly platformDirectory: boolean;
  readonly supportGrantIds: ReadonlyArray<string>;
  readonly machineJobIds: ReadonlyArray<string>;
}

export interface SyntheticSupportGrant {
  readonly id: string;
  readonly subjectId: string;
  readonly organizationId: string;
  readonly accessMode: "READ_ONLY" | "READ_WRITE";
  readonly resourceKinds: ReadonlyArray<
    "CUSTOMER" | "SITE" | "EQUIPMENT" | "JOB" | "EVIDENCE_METADATA"
  >;
  readonly validFrom: string;
  readonly validUntil: string;
  readonly revokedAt: string | null;
}

export interface SyntheticMachineAuthority {
  readonly id: string;
  readonly subjectId: string;
  readonly organizationId: string;
  readonly purpose: string;
  readonly revokedAt: string | null;
}

export const organizations: Readonly<Record<OrganizationKey, { id: string; state: "ACTIVE" | "SUSPENDED" }>> =
  Object.freeze({
    "org-alpha": { id: "00000000-0000-4000-8000-000000000001", state: "ACTIVE" },
    "org-bravo": { id: "00000000-0000-4000-8000-000000000002", state: "ACTIVE" },
    "org-charlie": { id: "00000000-0000-4000-8000-000000000003", state: "ACTIVE" },
    "org-suspended": { id: "00000000-0000-4000-8000-000000000004", state: "SUSPENDED" },
  });

function membership(
  organizationKey: OrganizationKey,
  state: "ACTIVE" | "REMOVED" = "ACTIVE",
  revision = 1,
) {
  return {
    organizationId: organizations[organizationKey].id,
    organizationKey,
    state,
    revision,
  } as const;
}

export const principals: Readonly<Record<string, SyntheticPrincipal>> = Object.freeze({
  "token-member-alpha": {
    subjectId: "10000000-0000-4000-8000-000000000001",
    subjectKey: "member-org-alpha",
    authoritySource: "MEMBERSHIP",
    memberships: [membership("org-alpha")],
    platformDirectory: false,
    supportGrantIds: [],
    machineJobIds: [],
  },
  "token-member-bravo": {
    subjectId: "10000000-0000-4000-8000-000000000002",
    subjectKey: "member-org-bravo",
    authoritySource: "MEMBERSHIP",
    memberships: [membership("org-bravo")],
    platformDirectory: false,
    supportGrantIds: [],
    machineJobIds: [],
  },
  "token-member-charlie": {
    subjectId: "10000000-0000-4000-8000-000000000003",
    subjectKey: "member-org-charlie",
    authoritySource: "MEMBERSHIP",
    memberships: [membership("org-charlie")],
    platformDirectory: false,
    supportGrantIds: [],
    machineJobIds: [],
  },
  "token-multi-member": {
    subjectId: "10000000-0000-4000-8000-000000000004",
    subjectKey: "multi-org-member",
    authoritySource: "MEMBERSHIP",
    memberships: [membership("org-alpha"), membership("org-bravo"), membership("org-charlie")],
    platformDirectory: false,
    supportGrantIds: [],
    machineJobIds: [],
  },
  "token-removed-member": {
    subjectId: "10000000-0000-4000-8000-000000000005",
    subjectKey: "removed-member",
    authoritySource: "MEMBERSHIP",
    memberships: [membership("org-alpha", "REMOVED", 2)],
    platformDirectory: false,
    supportGrantIds: [],
    machineJobIds: [],
  },
  "token-suspended-member": {
    subjectId: "10000000-0000-4000-8000-000000000006",
    subjectKey: "member-org-suspended",
    authoritySource: "MEMBERSHIP",
    memberships: [membership("org-suspended")],
    platformDirectory: false,
    supportGrantIds: [],
    machineJobIds: [],
  },
  "token-platform-directory": {
    subjectId: "10000000-0000-4000-8000-000000000007",
    subjectKey: "platform-directory-operator",
    authoritySource: "PLATFORM_DIRECTORY",
    memberships: [],
    platformDirectory: true,
    supportGrantIds: [],
    machineJobIds: [],
  },
  "token-support": {
    subjectId: "10000000-0000-4000-8000-000000000008",
    subjectKey: "support-operator",
    authoritySource: "SUPPORT_GRANT",
    memberships: [],
    platformDirectory: false,
    supportGrantIds: [
      "30000000-0000-4000-8000-000000000001",
      "30000000-0000-4000-8000-000000000002",
      "30000000-0000-4000-8000-000000000003",
    ],
    machineJobIds: [],
  },
  "token-machine-alpha": {
    subjectId: "10000000-0000-4000-8000-000000000009",
    subjectKey: "machine-worker-alpha",
    authoritySource: "MACHINE_IDENTITY",
    memberships: [],
    platformDirectory: false,
    supportGrantIds: [],
    machineJobIds: [
      "40000000-0000-4000-8000-000000000001",
      "40000000-0000-4000-8000-000000000002",
    ],
  },
});

export const supportGrants: Readonly<Record<string, SyntheticSupportGrant>> = Object.freeze({
  "30000000-0000-4000-8000-000000000001": {
    id: "30000000-0000-4000-8000-000000000001",
    subjectId: "10000000-0000-4000-8000-000000000008",
    organizationId: organizations["org-alpha"].id,
    accessMode: "READ_ONLY",
    resourceKinds: ["CUSTOMER", "SITE", "EQUIPMENT", "JOB", "EVIDENCE_METADATA"],
    validFrom: "2026-01-01T00:00:00.000Z",
    validUntil: "2027-01-01T00:00:00.000Z",
    revokedAt: null,
  },
  "30000000-0000-4000-8000-000000000002": {
    id: "30000000-0000-4000-8000-000000000002",
    subjectId: "10000000-0000-4000-8000-000000000008",
    organizationId: organizations["org-alpha"].id,
    accessMode: "READ_ONLY",
    resourceKinds: ["JOB"],
    validFrom: "2025-01-01T00:00:00.000Z",
    validUntil: "2025-12-31T00:00:00.000Z",
    revokedAt: null,
  },
  "30000000-0000-4000-8000-000000000003": {
    id: "30000000-0000-4000-8000-000000000003",
    subjectId: "10000000-0000-4000-8000-000000000008",
    organizationId: organizations["org-alpha"].id,
    accessMode: "READ_ONLY",
    resourceKinds: ["JOB"],
    validFrom: "2026-01-01T00:00:00.000Z",
    validUntil: "2027-01-01T00:00:00.000Z",
    revokedAt: "2026-10-01T00:00:00.000Z",
  },
});

export const machineAuthorities: Readonly<Record<string, SyntheticMachineAuthority>> =
  Object.freeze({
    "40000000-0000-4000-8000-000000000001": {
      id: "40000000-0000-4000-8000-000000000001",
      subjectId: "10000000-0000-4000-8000-000000000009",
      organizationId: organizations["org-alpha"].id,
      purpose: "SYNTHETIC_JOB_REFRESH",
      revokedAt: null,
    },
    "40000000-0000-4000-8000-000000000002": {
      id: "40000000-0000-4000-8000-000000000002",
      subjectId: "10000000-0000-4000-8000-000000000009",
      organizationId: organizations["org-alpha"].id,
      purpose: "SYNTHETIC_JOB_REFRESH",
      revokedAt: "2026-10-01T00:00:00.000Z",
    },
  });

export function isOrganizationKey(value: string): value is OrganizationKey {
  return Object.hasOwn(organizations, value);
}
