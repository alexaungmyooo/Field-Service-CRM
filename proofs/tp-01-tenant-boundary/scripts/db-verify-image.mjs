import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { CommandExecutionError, run } from "./command.mjs";
import { assertExecutionAuthorized } from "./execution-authorization.mjs";
import {
  acceptedImageDigest,
  acceptedImagePlatform,
  acceptedImageReference,
  assertAcceptedImageInspection,
  decideImageAcquisition,
} from "./image-verification-contract.mjs";

const { authorization, evidenceDirectory, packageId } = assertExecutionAuthorized();
const runId = process.env.TP01_RUN_ID;
const { TP01_IMAGE_PULL_AUTHORIZATION_TOKEN: pullToken, ...dockerEnvironment } = process.env;
const inspectArgs = [
  "image",
  "inspect",
  acceptedImageReference,
  "--format",
  "{{json .}}",
];

function inspectLocalImage() {
  const result = spawnSync("docker", inspectArgs, {
    encoding: "utf8",
    env: dockerEnvironment,
    maxBuffer: 32 * 1024 * 1024,
  });
  if (result.error) throw new CommandExecutionError("docker", inspectArgs, result, dockerEnvironment);
  if (result.status === 0) return JSON.parse(result.stdout.trim());
  if (
    result.status === 1 &&
    /(?:no such image|no such object)/i.test(`${result.stdout ?? ""}\n${result.stderr ?? ""}`)
  ) {
    return null;
  }
  throw new CommandExecutionError("docker", inspectArgs, result, dockerEnvironment);
}

const localInspection = inspectLocalImage();
const acquisition = decideImageAcquisition({
  authorization,
  localImagePresent: localInspection !== null,
  packageId,
  pullToken,
  runId,
});
if (acquisition.registryAccessOccurred) {
  run("docker", ["pull", "--platform", acceptedImagePlatform, acceptedImageReference], {
    env: dockerEnvironment,
  });
}
const inspection = assertAcceptedImageInspection(localInspection ?? inspectLocalImage());
mkdirSync(evidenceDirectory, { recursive: true });
writeFileSync(
  resolve(evidenceDirectory, "image.json"),
  `${JSON.stringify({
    schemaVersion: 2,
    proof: "TP-01",
    packageId,
    runId,
    image: acceptedImageReference,
    digest: `sha256:${acceptedImageDigest}`,
    platform: acceptedImagePlatform,
    source: acquisition.source,
    registryAccessOccurred: acquisition.registryAccessOccurred,
    localPresenceBefore: localInspection !== null,
    inspection,
  }, null, 2)}\n`,
);
