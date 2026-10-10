import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const HASH = /^[a-f0-9]{64}$/;
const CLASSES = new Set(["EXECUTABLE_CANDIDATE", "SOURCE_REVIEW_ONLY", "REJECTED"]);

export function validateArtifactManifest(manifest) {
  if (manifest?.schema !== "wave-a-offline-artifact-manifest-v1") {
    throw new Error("MANIFEST_SCHEMA");
  }
  if (manifest.classification !== "PROOF_ONLY_NOT_APPLICATION_DEPENDENCIES") {
    throw new Error("MANIFEST_CLASSIFICATION");
  }
  if (!manifest.bundleId || !Array.isArray(manifest.artifacts) || manifest.artifacts.length === 0) {
    throw new Error("MANIFEST_SHAPE");
  }
  const identities = new Set();
  for (const artifact of manifest.artifacts) {
    const identity = `${artifact.id}@${artifact.version}`;
    if (identities.has(identity)) throw new Error("MANIFEST_DUPLICATE");
    identities.add(identity);
    if (!artifact.id || !artifact.version || !artifact.source || !artifact.license) {
      throw new Error("MANIFEST_REQUIRED_FIELD");
    }
    if (!HASH.test(artifact.sha256) || !Number.isInteger(artifact.size) || artifact.size < 1) {
      throw new Error("MANIFEST_INTEGRITY");
    }
    if (!CLASSES.has(artifact.class)) throw new Error("MANIFEST_ARTIFACT_CLASS");
  }
  return true;
}

function main() {
  if (process.argv.slice(2).join(" ") !== "--self-test") throw new Error("ARGUMENTS");
  const synthetic = {
    schema: "wave-a-offline-artifact-manifest-v1",
    bundleId: "synthetic-wp108",
    classification: "PROOF_ONLY_NOT_APPLICATION_DEPENDENCIES",
    artifacts: [
      {
        id: "synthetic-artifact",
        version: "0.0.0-test",
        source: "synthetic://wp108",
        sha256: "0".repeat(64),
        size: 1,
        class: "SOURCE_REVIEW_ONLY",
        license: "SYNTHETIC-NOT-A-REAL-ARTIFACT",
      },
    ],
  };
  validateArtifactManifest(synthetic);
  process.stdout.write(`${JSON.stringify({ result: "PASS", synthetic: true })}\n`);
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}
