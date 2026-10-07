import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { run } from "./command.mjs";
import { assertExecutionAuthorized } from "./execution-authorization.mjs";

const { evidenceDirectory } = assertExecutionAuthorized();
const image =
  "postgres@sha256:afc7e2d441324c0388fa80c3d24f733b4194a4eb7f47dd8ee2b08eb1a24a647c";
run("docker", ["pull", "--platform", "linux/arm64/v8", image]);
const inspected = run("docker", ["image", "inspect", image, "--format", "{{json .RepoDigests}}"]);
if (!inspected.includes("afc7e2d441324c0388fa80c3d24f733b4194a4eb7f47dd8ee2b08eb1a24a647c")) {
  throw new Error("pulled image does not expose the accepted TP-01 digest");
}
mkdirSync(evidenceDirectory, { recursive: true });
writeFileSync(
  resolve(evidenceDirectory, "image.json"),
  `${JSON.stringify({ image, platform: "linux/arm64/v8", inspected }, null, 2)}\n`,
);
