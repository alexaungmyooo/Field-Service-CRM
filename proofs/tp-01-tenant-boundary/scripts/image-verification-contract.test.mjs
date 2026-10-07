import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  acceptedImageDigest,
  acceptedImagePlatform,
  acceptedImageReference,
  assertAcceptedImageInspection,
  assertImageEvidence,
  decideImageAcquisition,
} from "./image-verification-contract.mjs";

const packageId = "WP-STATIC-TEST";
const runId = "static-image-contract-test-01";
const pullToken = "static-test-run-bound-token-0000000000000001";
const authorization = {
  packageId,
  runId,
  conditionalImagePull: {
    status: "AUTHORIZED_IF_ACCEPTED_DIGEST_ABSENT",
    packageId,
    runId,
    image: acceptedImageReference,
    platform: acceptedImagePlatform,
    tokenSha256: createHash("sha256").update(pullToken).digest("hex"),
  },
};
const inspection = {
  RepoDigests: [acceptedImageReference],
  Os: "linux",
  Architecture: "arm64",
  Variant: "v8",
};

assert.deepEqual(
  decideImageAcquisition({
    authorization,
    localImagePresent: true,
    packageId,
    pullToken: undefined,
    runId,
  }),
  { source: "LOCAL_CACHE", registryAccessOccurred: false },
);
assert.deepEqual(
  decideImageAcquisition({ authorization, localImagePresent: false, packageId, pullToken, runId }),
  { source: "CONDITIONAL_REGISTRY_PULL", registryAccessOccurred: true },
);
assert.throws(
  () => decideImageAcquisition({
    authorization,
    localImagePresent: false,
    packageId,
    pullToken: undefined,
    runId,
  }),
  /no matching run-bound pull token/,
);
assert.throws(
  () => decideImageAcquisition({
    authorization,
    localImagePresent: false,
    packageId,
    pullToken: `${pullToken}-wrong`,
    runId,
  }),
  /no matching run-bound pull token/,
);
assert.throws(
  () => decideImageAcquisition({
    authorization,
    localImagePresent: true,
    packageId,
    pullToken,
    runId: `${runId}-wrong`,
  }),
  /not bound/,
);

assert.deepEqual(assertAcceptedImageInspection(inspection), {
  repoDigests: [acceptedImageReference],
  os: "linux",
  architecture: "arm64",
  variant: "v8",
});
assert.throws(
  () => assertAcceptedImageInspection({ ...inspection, RepoDigests: ["postgres@sha256:bad"] }),
  /accepted digest\/platform/,
);
assert.throws(
  () => assertAcceptedImageInspection({ ...inspection, Architecture: "amd64" }),
  /accepted digest\/platform/,
);

const localEvidence = {
  schemaVersion: 2,
  proof: "TP-01",
  packageId,
  runId,
  image: acceptedImageReference,
  digest: `sha256:${acceptedImageDigest}`,
  platform: acceptedImagePlatform,
  source: "LOCAL_CACHE",
  registryAccessOccurred: false,
  localPresenceBefore: true,
  inspection: {
    repoDigests: inspection.RepoDigests,
    os: inspection.Os,
    architecture: inspection.Architecture,
    variant: inspection.Variant,
  },
};
assert.equal(assertImageEvidence(localEvidence, authorization), localEvidence);
assert.throws(
  () => assertImageEvidence({ ...localEvidence, registryAccessOccurred: true }, authorization),
  /source or authorization binding/,
);

process.stdout.write("WP-34 image verification contract static tests passed\n");
