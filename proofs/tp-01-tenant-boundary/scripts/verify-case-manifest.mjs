import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { assertExactNode } from "./runtime-contract.mjs";
import { serializeCaseManifest } from "./case-contract.mjs";

assertExactNode();
const bytes = readFileSync(resolve("test/case-manifest.json"));
const expected = Buffer.from(serializeCaseManifest());
if (!bytes.equals(expected)) {
  throw new Error(
    "case manifest differs from the complete accepted generator: outcomes, combinations, actors, " +
      "organizations, variants, sequences, policy traces, and metadata must match byte-for-byte",
  );
}
process.stdout.write(
  `${JSON.stringify({
    status: "PASS",
    caseCount: 222,
    sha256: createHash("sha256").update(bytes).digest("hex"),
  })}\n`,
);
