import { appendFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

export function appendProofResult(value: unknown): void {
  const evidenceDirectory = process.env.TP01_EVIDENCE_DIR;
  if (!evidenceDirectory || !evidenceDirectory.includes("internal-local/work-packages/TP-01/evidence/")) {
    throw new Error("TP01_EVIDENCE_DIR must be the later-authorized private TP-01 evidence path");
  }
  mkdirSync(evidenceDirectory, { recursive: true });
  const filename = process.env.TP01_RESULT_FILE ?? "primary-results.jsonl";
  if (!["primary-results.jsonl", "reproduction-results.jsonl"].includes(filename)) {
    throw new Error("invalid TP01_RESULT_FILE");
  }
  appendFileSync(resolve(evidenceDirectory, filename), `${JSON.stringify(value)}\n`, {
    encoding: "utf8",
    flag: "a",
  });
}

export function appendAuditEvidence(value: unknown): void {
  const evidenceDirectory = process.env.TP01_EVIDENCE_DIR;
  const filename = process.env.TP01_AUDIT_FILE;
  if (
    !evidenceDirectory?.includes("internal-local/work-packages/TP-01/evidence/") ||
    !filename ||
    !["primary-audit-events.jsonl", "reproduction-audit-events.jsonl"].includes(filename)
  ) {
    throw new Error("authorized TP-01 audit evidence destination is required");
  }
  appendFileSync(resolve(evidenceDirectory, filename), `${JSON.stringify(value)}\n`, {
    encoding: "utf8",
    flag: "a",
  });
}
