import type { EnforcementMode } from "../src/proof-contract.js";
import type { ProofPath } from "../src/types.js";

export interface ProofCase {
  readonly id: string;
  readonly group: string;
  readonly path: ProofPath;
  readonly expected: "ALLOW" | "DENY" | "DENY_ON_CROSS_CONTEXT_AND_ALLOW_ON_RESTORED_CONTEXT";
  readonly actor: string;
  readonly sourceOrganization: string;
  readonly targetOrganization: string;
  readonly contextVariant: string;
  readonly policyTrace: ReadonlyArray<string>;
  readonly organizationSequence?: ReadonlyArray<string>;
}

export interface ProofCaseManifest {
  readonly schemaVersion: 1;
  readonly contract: "TP-01";
  readonly workPackage: "WP-19";
  readonly status: "MATERIALIZED_NOT_EXECUTED";
  readonly generatedFrom: "scripts/case-contract.mjs";
  readonly fixtureSeed: "tp01-fixture-v1";
  readonly proofClock: "2026-10-07T12:00:00.000Z";
  readonly enforcementModes: ReadonlyArray<EnforcementMode>;
  readonly caseCount: 222;
  readonly groupCounts: Readonly<Record<string, number>>;
  readonly cases: ReadonlyArray<ProofCase>;
}
