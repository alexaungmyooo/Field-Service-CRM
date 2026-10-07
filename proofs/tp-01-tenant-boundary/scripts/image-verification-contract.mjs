import { createHash } from "node:crypto";

export const acceptedImageDigest =
  "afc7e2d441324c0388fa80c3d24f733b4194a4eb7f47dd8ee2b08eb1a24a647c";
export const acceptedImageReference = `postgres@sha256:${acceptedImageDigest}`;
export const acceptedImagePlatform = "linux/arm64/v8";

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function assertImageRunBinding({ authorization, packageId, runId }) {
  if (
    authorization?.packageId !== packageId ||
    typeof authorization.runId !== "string" ||
    authorization.runId.length === 0 ||
    runId !== authorization.runId
  ) {
    throw new Error("image verification is not bound to the authorized package and run");
  }
  return authorization.runId;
}

export function decideImageAcquisition({
  authorization,
  localImagePresent,
  packageId,
  pullToken,
  runId,
}) {
  assertImageRunBinding({ authorization, packageId, runId });
  if (localImagePresent === true) {
    return Object.freeze({ source: "LOCAL_CACHE", registryAccessOccurred: false });
  }
  if (localImagePresent !== false) {
    throw new Error("local image presence must be measured before acquisition is decided");
  }

  const conditional = authorization.conditionalImagePull;
  if (
    conditional?.status !== "AUTHORIZED_IF_ACCEPTED_DIGEST_ABSENT" ||
    conditional.runId !== runId ||
    conditional.packageId !== packageId ||
    conditional.image !== acceptedImageReference ||
    conditional.platform !== acceptedImagePlatform ||
    !/^[a-f0-9]{64}$/.test(conditional.tokenSha256 ?? "") ||
    typeof pullToken !== "string" ||
    pullToken.length < 32 ||
    sha256(pullToken) !== conditional.tokenSha256
  ) {
    throw new Error("accepted image is absent and no matching run-bound pull token exists");
  }

  return Object.freeze({ source: "CONDITIONAL_REGISTRY_PULL", registryAccessOccurred: true });
}

export function assertAcceptedImageInspection(inspection) {
  const repoDigests = inspection?.RepoDigests;
  if (
    !Array.isArray(repoDigests) ||
    !repoDigests.includes(acceptedImageReference) ||
    inspection.Os !== "linux" ||
    inspection.Architecture !== "arm64" ||
    inspection.Variant !== "v8"
  ) {
    throw new Error("image inspection differs from the accepted digest/platform");
  }
  return Object.freeze({
    repoDigests: [...repoDigests].sort(),
    os: inspection.Os,
    architecture: inspection.Architecture,
    variant: inspection.Variant,
  });
}

export function assertImageEvidence(image, authorization) {
  if (
    image?.schemaVersion !== 2 ||
    image.proof !== "TP-01" ||
    image.packageId !== authorization?.packageId ||
    image.runId !== authorization?.runId ||
    image.image !== acceptedImageReference ||
    image.digest !== `sha256:${acceptedImageDigest}` ||
    image.platform !== acceptedImagePlatform ||
    image.localPresenceBefore !== (image.source === "LOCAL_CACHE") ||
    !["LOCAL_CACHE", "CONDITIONAL_REGISTRY_PULL"].includes(image.source) ||
    image.registryAccessOccurred !== (image.source === "CONDITIONAL_REGISTRY_PULL")
  ) {
    throw new Error("image evidence source or authorization binding differs");
  }
  assertAcceptedImageInspection({
    RepoDigests: image.inspection?.repoDigests,
    Os: image.inspection?.os,
    Architecture: image.inspection?.architecture,
    Variant: image.inspection?.variant,
  });
  return image;
}
