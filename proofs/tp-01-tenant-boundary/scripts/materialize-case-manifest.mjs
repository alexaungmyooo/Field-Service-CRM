import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { assertExactNode } from "./runtime-contract.mjs";
import { buildCaseManifest, serializeCaseManifest } from "./case-contract.mjs";

assertExactNode();
const manifest = buildCaseManifest();
writeFileSync(resolve("test/case-manifest.json"), serializeCaseManifest(manifest));
process.stdout.write(`materialized ${manifest.caseCount} cases\n`);
