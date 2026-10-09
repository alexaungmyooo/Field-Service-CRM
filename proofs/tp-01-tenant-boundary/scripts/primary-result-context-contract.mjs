const ordinaryCleanupReset = "PER_CASE_TRANSACTION_ROLLBACK_AND_AUDIT_APPEND";
const poolCleanupReset = "SAME_CONNECTION_TRANSACTION_CONTEXT_RESET_AND_CONCURRENT_ISOLATION";
const uuidPattern =
  /^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const organizationIds = Object.freeze({
  "org-alpha": "00000000-0000-4000-8000-000000000001",
  "org-bravo": "00000000-0000-4000-8000-000000000002",
  "org-charlie": "00000000-0000-4000-8000-000000000003",
  "org-suspended": "00000000-0000-4000-8000-000000000004",
});

function fail(caseId, semanticCheck) {
  const error = new Error(`${caseId ?? "UNKNOWN_CASE"} failed ${semanticCheck}`);
  error.name = "PrimaryResultContextError";
  error.code = "TP1_PRIMARY_RESULT_CONTEXT_INVALID";
  error.caseId = caseId ?? "UNKNOWN_CASE";
  error.semanticCheck = semanticCheck;
  throw error;
}

function hasExactKeys(value, keys) {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    JSON.stringify(Object.keys(value).sort()) === JSON.stringify([...keys].sort())
  );
}

export function assertPrimaryResultContext(expected, record) {
  const caseId = expected?.id ?? record?.caseId;
  if (!expected || !record || record.caseId !== expected.id) {
    fail(caseId, "CASE_BINDING");
  }

  if (expected.group === "TP1-CASE-008") {
    if (record.cleanupReset !== poolCleanupReset) {
      fail(caseId, "POOL_CLEANUP_RESET");
    }
    if (
      !Array.isArray(expected.organizationSequence) ||
      expected.organizationSequence.length !== 3 ||
      JSON.stringify(record.organizationSequence) !== JSON.stringify(expected.organizationSequence)
    ) {
      fail(caseId, "POOL_ORGANIZATION_SEQUENCE");
    }
    if (!hasExactKeys(record.authoritativeContext, ["source", "concurrent", "restored"])) {
      fail(caseId, "POOL_CONTEXT_KEYS");
    }
    const [source, concurrent, restored] = expected.organizationSequence.map(
      (organization) => organizationIds[organization],
    );
    if (
      !source ||
      !concurrent ||
      !restored ||
      source !== restored ||
      source === concurrent ||
      record.authoritativeContext.source !== source ||
      record.authoritativeContext.concurrent !== concurrent ||
      record.authoritativeContext.restored !== restored
    ) {
      fail(caseId, "POOL_CONTEXT_VALUES");
    }
  } else {
    if (record.cleanupReset !== ordinaryCleanupReset) {
      fail(caseId, "ORDINARY_CLEANUP_RESET");
    }
    if (record.organizationSequence !== undefined) {
      fail(caseId, "ORDINARY_ORGANIZATION_SEQUENCE_ABSENT");
    }
    if (record.authoritativeContext?.resolutionDenied !== undefined) {
      if (
        !hasExactKeys(record.authoritativeContext, ["resolutionDenied"]) ||
        typeof record.authoritativeContext.resolutionDenied !== "string" ||
        record.authoritativeContext.resolutionDenied.length === 0
      ) {
        fail(caseId, "ORDINARY_DENIED_CONTEXT");
      }
    } else {
      if (
        !hasExactKeys(record.authoritativeContext, [
          "organizationId",
          "authoritySource",
          "purpose",
          "correlationId",
        ])
      ) {
        fail(caseId, "ORDINARY_CONTEXT_KEYS");
      }
      const activeOrganizationId =
        organizationIds[expected.sourceOrganization] ?? organizationIds[expected.targetOrganization];
      const organizationMatches =
        record.authoritativeContext.authoritySource === "PLATFORM_DIRECTORY"
          ? record.authoritativeContext.organizationId === null
          : Boolean(activeOrganizationId) &&
            record.authoritativeContext.organizationId === activeOrganizationId;
      if (
        !organizationMatches ||
        typeof record.authoritativeContext.authoritySource !== "string" ||
        record.authoritativeContext.authoritySource.length === 0 ||
        typeof record.authoritativeContext.purpose !== "string" ||
        record.authoritativeContext.purpose.length === 0 ||
        !uuidPattern.test(record.authoritativeContext.correlationId ?? "")
      ) {
        fail(caseId, "ORDINARY_CONTEXT_VALUES");
      }
    }
  }

  return Object.freeze({
    cleanupReset: record.cleanupReset,
    organizationSequence: record.organizationSequence ?? null,
    authoritativeContext: Object.freeze({ ...record.authoritativeContext }),
  });
}

export function minimizePrimaryResultContextFailure(error) {
  if (
    error?.name !== "PrimaryResultContextError" ||
    error.code !== "TP1_PRIMARY_RESULT_CONTEXT_INVALID" ||
    typeof error.caseId !== "string" ||
    typeof error.semanticCheck !== "string"
  ) {
    return Object.freeze({
      errorCode: "PRIMARY_RESULT_SEMANTIC_VALIDATION_FAILED",
      caseId: "UNAVAILABLE",
      semanticCheck: "UNAVAILABLE",
    });
  }
  return Object.freeze({
    errorCode: error.code,
    caseId: error.caseId,
    semanticCheck: error.semanticCheck,
  });
}

export const primaryResultContextMarkers = Object.freeze({
  ordinaryCleanupReset,
  poolCleanupReset,
});
