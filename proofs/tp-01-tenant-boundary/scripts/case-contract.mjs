export const proofClock = "2026-10-07T12:00:00.000Z";
export const fixtureSeed = "tp01-fixture-v1";

const organizations = ["org-alpha", "org-bravo", "org-charlie"];
const paths = [
  "interactive",
  "repository",
  "background",
  "search-cache-report-export",
  "evidence-metadata",
  "platform-directory",
  "support-session",
  "audit-log-error",
];
const contextFaults = [
  "missing-organization",
  "malformed-identifier",
  "client-server-conflict",
  "stale-membership",
  "spoofed-host",
  "cached-prior-organization",
  "cross-organization-resource-reference",
  "missing-authority-or-purpose",
];
const supportVariants = [
  ["active-correct-tenant-read", "ALLOW", "org-alpha"],
  ["no-grant", "DENY", "org-alpha"],
  ["expired-grant", "DENY", "org-alpha"],
  ["revoked-grant", "DENY", "org-alpha"],
  ["wrong-organization", "DENY", "org-bravo"],
  ["write-with-read-only", "DENY", "org-alpha"],
  ["resource-outside-scope", "DENY", "org-alpha"],
  ["unverified-client-grant", "DENY", "org-alpha"],
];

export function buildCaseManifest() {
  const cases = [];
  function add(group, path, expected, detail) {
    const sequence = String(cases.length + 1).padStart(3, "0");
    cases.push({
      id: `TP1-C${sequence}`,
      group,
      path,
      expected,
      policyTrace: detail.policyTrace ?? ["TP1-POLICY-001", "TP1-POLICY-002"],
      ...detail,
    });
  }

  for (const organization of organizations) {
    for (const path of paths) {
      add("TP1-CASE-001", path, "ALLOW", {
        actor: `member-${organization}`,
        sourceOrganization: organization,
        targetOrganization: organization,
        contextVariant: "valid",
        policyTrace: ["TP1-POLICY-001", "TP1-POLICY-003"],
      });
    }
  }
  for (const sourceOrganization of organizations) {
    for (const targetOrganization of organizations) {
      if (sourceOrganization === targetOrganization) continue;
      for (const path of paths) {
        add("TP1-CASE-002", path, "DENY", {
          actor: `member-${sourceOrganization}`,
          sourceOrganization,
          targetOrganization,
          contextVariant: "cross-tenant",
          policyTrace: ["TP1-POLICY-003", "TP1-POLICY-008"],
        });
      }
    }
  }
  for (const contextVariant of contextFaults) {
    for (const path of paths) {
      add("TP1-CASE-003", path, "DENY", {
        actor: "member-org-alpha",
        sourceOrganization: "org-alpha",
        targetOrganization: contextVariant.includes("resource") ? "org-bravo" : "org-alpha",
        contextVariant,
        policyTrace: ["TP1-POLICY-001", "TP1-POLICY-002", "TP1-POLICY-010"],
      });
    }
  }
  for (const [contextVariant, expected, targetOrganization] of supportVariants) {
    for (const path of ["interactive", "repository", "evidence-metadata", "support-session"]) {
      add("TP1-CASE-004", path, expected, {
        actor: "support-operator",
        sourceOrganization: "platform",
        targetOrganization,
        contextVariant,
        policyTrace: ["TP1-POLICY-005", "TP1-POLICY-006", "TP1-POLICY-009"],
      });
    }
  }
  for (const [contextVariant, expected] of [
    ["platform-directory-list", "ALLOW"],
    ["platform-directory-status", "ALLOW"],
    ["tenant-customer-read", "DENY"],
    ["tenant-job-read", "DENY"],
    ["tenant-evidence-read", "DENY"],
    ["tenant-export-read", "DENY"],
  ]) {
    add("TP1-CASE-005", "platform-directory", expected, {
      actor: "platform-directory-operator",
      sourceOrganization: "platform",
      targetOrganization: "org-alpha",
      contextVariant,
      policyTrace: ["TP1-POLICY-005", "TP1-POLICY-009"],
    });
  }
  for (const [contextVariant, expected] of [
    ["valid-job-context", "ALLOW"],
    ["missing-machine-identity", "DENY"],
    ["missing-organization", "DENY"],
    ["missing-purpose", "DENY"],
    ["payload-tenant-substitution", "DENY"],
    ["replay-after-revocation", "DENY"],
    ["retry-same-correlation", "ALLOW"],
    ["wrong-resource-organization", "DENY"],
  ]) {
    add("TP1-CASE-006", "background", expected, {
      actor: "machine-worker-alpha",
      sourceOrganization: "org-alpha",
      targetOrganization:
        contextVariant.includes("wrong") || contextVariant.includes("substitution")
          ? "org-bravo"
          : "org-alpha",
      contextVariant,
      policyTrace: ["TP1-POLICY-007", "TP1-POLICY-009"],
    });
  }
  for (const contextVariant of ["removed-membership", "suspended-organization"]) {
    for (const path of paths) {
      add("TP1-CASE-007", path, "DENY", {
        actor: contextVariant === "removed-membership" ? "removed-member" : "member-org-suspended",
        sourceOrganization: contextVariant === "removed-membership" ? "org-alpha" : "org-suspended",
        targetOrganization: contextVariant === "removed-membership" ? "org-alpha" : "org-suspended",
        contextVariant,
        policyTrace: ["TP1-POLICY-002", "TP1-POLICY-003"],
      });
    }
  }
  for (const sequence of [
    ["org-alpha", "org-bravo", "org-alpha"],
    ["org-bravo", "org-charlie", "org-bravo"],
    ["org-charlie", "org-alpha", "org-charlie"],
  ]) {
    for (const path of paths) {
      add("TP1-CASE-008", path, "DENY_ON_CROSS_CONTEXT_AND_ALLOW_ON_RESTORED_CONTEXT", {
        actor: "multi-org-member",
        sourceOrganization: sequence[0],
        targetOrganization: sequence[1],
        contextVariant: "pool-reuse-concurrent-context",
        organizationSequence: sequence,
        policyTrace: ["TP1-POLICY-004", "TP1-POLICY-008"],
      });
    }
  }
  if (cases.length !== 222) throw new Error(`expected 222 cases, generated ${cases.length}`);
  return {
    schemaVersion: 1,
    contract: "TP-01",
    workPackage: "WP-19",
    status: "MATERIALIZED_NOT_EXECUTED",
    generatedFrom: "scripts/case-contract.mjs",
    fixtureSeed,
    proofClock,
    enforcementModes: ["APPLICATION_ONLY", "RLS_ONLY", "COMBINED", "CONTROLLED_NEGATIVE"],
    caseCount: cases.length,
    groupCounts: Object.fromEntries(
      [...new Set(cases.map((item) => item.group))].map((group) => [
        group,
        cases.filter((item) => item.group === group).length,
      ]),
    ),
    cases,
  };
}

export function serializeCaseManifest(manifest = buildCaseManifest()) {
  return `${JSON.stringify(manifest, null, 2)}\n`;
}
