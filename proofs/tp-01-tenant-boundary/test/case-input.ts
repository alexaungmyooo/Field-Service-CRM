import { randomUUID } from "node:crypto";
import { ContextResolutionError, SecurityContextResolver } from "../src/context.js";
import { DENIED_PROBE_SUBJECT_ID, PROOF_CLOCK } from "../src/proof-contract.js";
import { organizations } from "../src/synthetic-directory.js";
import type {
  AuthorizationRequest,
  ProofResourceKind,
  SecurityContext,
  SyntheticRequestInput,
} from "../src/types.js";
import type { ProofCase } from "./manifest-types.js";

const tokenByActor: Readonly<Record<string, string>> = {
  "member-org-alpha": "token-member-alpha",
  "member-org-bravo": "token-member-bravo",
  "member-org-charlie": "token-member-charlie",
  "multi-org-member": "token-multi-member",
  "removed-member": "token-removed-member",
  "member-org-suspended": "token-suspended-member",
  "platform-directory-operator": "token-platform-directory",
  "support-operator": "token-support",
  "machine-worker-alpha": "token-machine-alpha",
};

function baseInput(item: ProofCase, organization = item.sourceOrganization): SyntheticRequestInput {
  const stableCorrelation = `50000000-0000-4000-8000-${item.id.slice(-3).padStart(12, "0")}`;
  return {
    token: tokenByActor[item.actor] ?? null,
    requestedOrganizationKey: organization === "platform" ? null : organization,
    hostOrganizationKey: organization === "platform" ? null : organization,
    purpose: item.group === "TP1-CASE-006" ? "SYNTHETIC_JOB_REFRESH" : "SYNTHETIC_PROOF",
    correlationId: item.contextVariant === "retry-same-correlation" ? stableCorrelation : randomUUID(),
    caseId: item.id,
    supportGrantClaim: null,
    machineJobClaim: null,
  };
}

export function requestInput(item: ProofCase, organization = item.sourceOrganization) {
  const input = { ...baseInput(item, organization) };
  switch (item.contextVariant) {
    case "missing-organization":
      input.requestedOrganizationKey = null;
      break;
    case "malformed-identifier":
      input.requestedOrganizationKey = "not-an-organization";
      break;
    case "client-server-conflict":
    case "spoofed-host":
      input.hostOrganizationKey = "org-bravo";
      break;
    case "stale-membership":
    case "removed-membership":
      input.token = "token-removed-member";
      break;
    case "cached-prior-organization":
      input.token = "token-member-bravo";
      input.requestedOrganizationKey = "org-alpha";
      input.hostOrganizationKey = "org-alpha";
      break;
    case "missing-authority-or-purpose":
    case "missing-purpose":
      input.purpose = null;
      break;
    case "active-correct-tenant-read":
    case "write-with-read-only":
    case "resource-outside-scope":
    case "wrong-organization":
      input.requestedOrganizationKey = item.targetOrganization;
      input.hostOrganizationKey = item.targetOrganization;
      input.supportGrantClaim = "30000000-0000-4000-8000-000000000001";
      break;
    case "expired-grant":
      input.requestedOrganizationKey = "org-alpha";
      input.hostOrganizationKey = "org-alpha";
      input.supportGrantClaim = "30000000-0000-4000-8000-000000000002";
      break;
    case "revoked-grant":
      input.requestedOrganizationKey = "org-alpha";
      input.hostOrganizationKey = "org-alpha";
      input.supportGrantClaim = "30000000-0000-4000-8000-000000000003";
      break;
    case "unverified-client-grant":
      input.supportGrantClaim = "30000000-0000-4000-8000-999999999999";
      break;
    case "valid-job-context":
    case "retry-same-correlation":
    case "payload-tenant-substitution":
    case "wrong-resource-organization":
      input.requestedOrganizationKey = "org-alpha";
      input.hostOrganizationKey = "org-alpha";
      input.machineJobClaim = "40000000-0000-4000-8000-000000000001";
      break;
    case "replay-after-revocation":
      input.requestedOrganizationKey = "org-alpha";
      input.hostOrganizationKey = "org-alpha";
      input.machineJobClaim = "40000000-0000-4000-8000-000000000002";
      break;
    case "missing-machine-identity":
      input.token = null;
      break;
  }
  return input;
}

export function httpHeaders(item: ProofCase): Record<string, string> {
  const input = requestInput(item);
  const pairs: ReadonlyArray<[string, string | null]> = [
    ["x-tp01-token", input.token],
    ["x-tp01-organization", input.requestedOrganizationKey],
    ["x-tp01-host-organization", input.hostOrganizationKey],
    ["x-tp01-purpose", input.purpose],
    ["x-tp01-correlation-id", input.correlationId],
    ["x-tp01-case-id", input.caseId],
    ["x-tp01-support-grant", input.supportGrantClaim],
    ["x-tp01-machine-job", input.machineJobClaim],
  ];
  return Object.fromEntries(pairs.filter((entry): entry is [string, string] => entry[1] !== null));
}

export function resolveCaseContext(
  resolver: SecurityContextResolver,
  item: ProofCase,
  organization = item.sourceOrganization,
): { context: SecurityContext | null; resolutionReason: string } {
  try {
    return { context: resolver.resolve(requestInput(item, organization)), resolutionReason: "RESOLVED" };
  } catch (error) {
    if (!(error instanceof ContextResolutionError)) throw error;
    return { context: null, resolutionReason: error.message };
  }
}

export function deniedProbeContext(item: ProofCase): SecurityContext {
  const target = item.targetOrganization as keyof typeof organizations;
  return {
    subjectId: DENIED_PROBE_SUBJECT_ID,
    subjectKey: "denied-probe",
    activeOrganizationId: organizations[target]?.id ?? null,
    activeOrganizationKey: organizations[target] ? target : null,
    authoritySource: "MEMBERSHIP",
    authorityRevision: 0,
    authorityOrganizationId: null,
    authorityAccessMode: null,
    authorityResourceKinds: [],
    authorityValidFrom: null,
    authorityValidUntil: null,
    authorityRevokedAt: null,
    machinePurpose: null,
    purpose: "DENIED_CONTEXT_PROBE",
    proofClock: PROOF_CLOCK,
    correlationId: randomUUID(),
    caseId: item.id,
    supportGrantId: null,
    machineJobId: null,
  };
}

function resourceKind(item: ProofCase): ProofResourceKind {
  if (item.contextVariant === "resource-outside-scope") return "INVENTORY";
  if (item.path === "background") return "BACKGROUND_JOB";
  if (item.path === "search-cache-report-export") return "PROJECTION";
  if (item.path === "evidence-metadata") return "EVIDENCE_METADATA";
  if (item.path === "support-session") return "JOB";
  if (item.path === "audit-log-error") return "AUDIT_EVENT";
  if (
    item.path === "platform-directory" &&
    !item.contextVariant.startsWith("tenant-")
  ) return "ORGANIZATION_DIRECTORY";
  if (item.contextVariant === "tenant-job-read") return "JOB";
  if (item.contextVariant === "tenant-evidence-read") return "EVIDENCE_METADATA";
  if (item.contextVariant === "tenant-export-read") return "PROJECTION";
  return "CUSTOMER";
}

export function authorizationRequest(item: ProofCase): AuthorizationRequest {
  const kind = resourceKind(item);
  const target = item.targetOrganization as keyof typeof organizations;
  const write = item.contextVariant === "write-with-read-only" || item.path === "background";
  return {
    action: kind === "ORGANIZATION_DIRECTORY" ? "DISCOVER" : write ? "UPDATE" : "READ",
    resourceKind: kind,
    resourceId: null,
    resourceOrganizationId: organizations[target]?.id ?? null,
    write,
  };
}

export function targetDisplayKey(item: ProofCase): string {
  const suffix =
    item.contextVariant === "resource-outside-scope"
      ? "inventory"
      : item.path === "evidence-metadata" ||
    item.path === "support-session" ||
    item.path === "background" ||
    item.contextVariant === "tenant-job-read" ||
    item.contextVariant === "tenant-evidence-read"
      ? "job"
      : "customer";
  return `${item.targetOrganization}-${suffix}`;
}
