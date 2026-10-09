# TP-01 Primary-Handoff Seal Interface and Operational-Stop Consistency Static Remediation

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted under standing completion authority — independent static validation PASS; publication authorized |
| Work package | `WP-77 Primary-Handoff Seal Interface and Operational-Stop Consistency Static Remediation` |
| Governing decision | `DEC-210` — Accepted |
| Governing findings | `WP76-DEV-001` through `WP76-DEV-004` |
| Governing controls | `WP76-REM-001` through `WP76-REM-008` |
| Base publication | `db7a6113ca5455cda0193efc6fa2e6ae3f76ad98` |
| Base repository tree | `0805d0f655b8e23cfb6f4a2ebdea1ba21c3a8784` |
| Accepted proof revision | `052b6b7855bd726d5fe1de44db0067ba54eb23ff` |
| Accepted proof tree | `c2cbcb3f117653d2f42f0ee688dab5baf0055c8f` |
| Owner | Aung Myo Oo |
| Date | 2026-10-09 |
| Runtime result | None — WP-77 is static-only |

## Objective and authority

WP-77 repairs the exact control defects that stopped immutable WP-76 after its PRIMARY packet was
created. It corrects the private handoff tools' Node exclusive-copy interface, adds dependency-free
module-instantiation and no-overwrite coverage, gives the proof a typed PRIMARY-handoff stop
contract, and reconciles final verification so that one exact recognized handoff stop can close
only as Inconclusive without being misreported as missing reproduction-phase reachability.

The owner has granted standing completion authority for the bounded authorized work. That
authority may accept and publish this exact candidate only after complete hash and inventory
renewal and exactly one fresh independent static validator returns `PASS` over the frozen bytes.
It does not permit a partial package, a package with findings, or any runtime action.

WP-77 authorizes no dependency restore or invocation, credential or private-environment creation,
preflight, image inspection or retrieval, Docker/Compose operation, pull token, container,
database, service, SQL, fixture, cleanup execution, proof, handoff, reproduction, network access,
application coding, final architecture selection, infrastructure, deployment, provider
account/cost, or customer/live-data action. Static PASS is not a TP-01 result and authorizes no
retry.

## Immutable WP-76 evidence

WP-76 run `wp76-2026-10-09-01` remains `INCONCLUSIVE_CLOSED_NO_RETRY`. Its complete PRIMARY
packet contains 222 unique results, 222 exact actual/expected matches, 222 audit records, and
unchanged tracked state. Those measurements remain preliminary PRIMARY observations only.

The private handoff-seal tool failed during Node module instantiation because it requested a named
`COPYFILE_EXCL` export that `node:fs` does not provide. No handoff seal, handoff verification,
collaboration-provenance attestation, or reproduction authority existed. Reproduction correctly
did not run. The accepted deviation contract could not encode the exact private handoff stage and
run pair, while the final verifier reported absent reproduction reachability before it could
classify the preserved handoff stop.

WP-77 must not edit, resume, replay, reinterpret, or replace WP-76 evidence. Its three role
reviews, 20-entry role-review seal, final 23-entry private inventory, cleanup, residual absence,
removed private material and dependencies, checkout removal, and fail-closed final-verifier result
remain immutable.

## Remediation controls

| ID | Control | Candidate state |
| --- | --- | --- |
| `WP77-REM-001` | Preserve WP-76 and every earlier stopped run as immutable, expired, non-resumable Inconclusive evidence; never convert PRIMARY observations into a TP-01 PASS. | Required |
| `WP77-REM-002` | In both run-bound private handoff tools, obtain exclusive-copy behavior only through `constants.COPYFILE_EXCL`; retain explicit source/destination checks and atomic no-overwrite behavior. | Satisfied |
| `WP77-REM-003` | Make both private handoff tools safely importable by exporting a synchronous `main()` and executing only behind an exact direct-entry guard; importing either module must perform no I/O or mutation. | Satisfied |
| `WP77-REM-004` | Add a dependency-free exact-Node contract and test that instantiate both private modules, prove no invalid named export exists, prove first-copy identity and read-only mode, and prove existing-file and symlink destinations fail without overwrite. | Satisfied |
| `WP77-REM-005` | Extend the typed deviation contract with exactly `PRIMARY_HANDOFF / SEAL_PRIMARY_HANDOFF_READ_ONLY` and exactly one minimized `handoff-seal-failure.json` artifact; reject variants, duplicates, and unknown stops. | Satisfied |
| `WP77-REM-006` | Define one dependency-free handoff-stop contract that validates minimized run-bound failure evidence, false reproduction/retry/secret/raw-data flags, and required absence of seal, verification, provenance, and reproduction artifacts. | Satisfied |
| `WP77-REM-007` | Reconcile final verification so a complete zero-stop reproduction remains the only PASS path, while one exact PRIMARY-handoff stop may validate only an `INCONCLUSIVE` final closure with nonzero exit after cleanup and three standardized reviews. | Satisfied |
| `WP77-REM-008` | Keep the reproduction guard's zero-operational-stop requirement unchanged and fail closed for malformed, multiple, contradictory, or unaccepted stop evidence. | Satisfied |
| `WP77-REM-009` | Renew every affected public/proof and private-control hash, the complete sorted proof inventory, artifact-inventory hash, canonical content-set hash, syntax count, and dependency-free test-suite count after final freeze; obtain exactly one fresh independent static validator. | Satisfied |
| `WP77-REM-010` | Keep dependencies, materials, runtime, cleanup execution, proof/reproduction, network, application, architecture, infrastructure, deployment, provider, and customer/live-data gates closed. | Required |

## Exact interface and stop semantics

The corrected private exclusive-copy form is:

```js
import { constants, copyFileSync } from "node:fs";

copyFileSync(sourcePath, destinationPath, constants.COPYFILE_EXCL);
```

An explicit pre-existence check may improve diagnostics, but only the `COPYFILE_EXCL` flag is the
atomic no-overwrite control. A successful first copy must preserve exact bytes and must be made
read-only under the existing handoff contract. A second copy to the same regular file, or a copy
to a symlink destination, must fail without changing the existing destination. Importing either
private tool must not execute its command path.

The only newly accepted operational-stop pair is:

| Field | Exact value |
| --- | --- |
| Phase | `PRIMARY_HANDOFF` |
| Operation | `SEAL_PRIMARY_HANDOFF_READ_ONLY` |
| Minimized artifact | `handoff-seal-failure.json` |
| Reproduction authorized | `false` |
| Retry authorized | `false` |
| Final disposition | `INCONCLUSIVE` only |
| Final exit | Nonzero |
| PASS eligibility | Never |

The recognized-stop final branch requires valid PRIMARY reachability and a complete PRIMARY
packet, exact stop and minimized failure evidence, cleanup, and all three role reviews using the
standard colon-form review schema with `Recommendation: INCONCLUSIVE`. It also requires the
handoff seal, handoff verification, provenance attestation, reproduction reachability,
reproduction reset, and reproduction results to be absent. Missing reproduction reachability is
therefore expected evidence in this one branch, not its first error. Any other absence or
contradiction remains fail-closed.

## Protected unchanged semantics

WP-77 must leave these controls and meanings unchanged unless a contradiction is recorded before
freeze and reauthorized:

- exact Node `v22.23.1`, pnpm `11.25.0`, package lock and dependency versions;
- the PostgreSQL image digest/platform, Compose definition, local-first registry gate, ports, and
  resource limits;
- all SQL, the acyclic forced-RLS graph, role ownership and grants, security-definer/invoker
  controls, and transaction-local context;
- the exact `$12::text` audit-detail parameter contract and minimized audit JSON meaning;
- all 222 cases, expected outcomes, manifest, path families, support/machine/lifecycle/pool
  semantics, zero-leakage assertions, and state-integrity rules;
- the exact pnpm and private-environment launchers, reachability, reset, database-evidence,
  proof-run, cleanup, and network interfaces;
- the successful complete-reproduction verifier path, role separation, immutable handoff meaning,
  and the rule that reproduction requires a verified seal and provenance attestation; and
- evidence minimization, credential handling, mandatory cleanup, dedicated checkout, zero provider
  cost, and prohibition on customer/live data.

## Candidate bindings

Every binding below was measured after the final proof/private-control freeze and independently
reproduced. No runtime result is inferred from these static values.

| ID | Bound fact | Candidate state |
| --- | --- | --- |
| `WP77-BIND-001` | Base publication is `db7a6113ca5455cda0193efc6fa2e6ae3f76ad98`; base repository tree is `0805d0f655b8e23cfb6f4a2ebdea1ba21c3a8784`. | Bound |
| `WP77-BIND-002` | Governing run `wp76-2026-10-09-01` is immutable `INCONCLUSIVE_CLOSED_NO_RETRY`; its authorization is consumed and non-reusable. | Bound |
| `WP77-BIND-003` | Accepted proof revision remains `052b6b7855bd726d5fe1de44db0067ba54eb23ff`; accepted base proof tree is `c2cbcb3f117653d2f42f0ee688dab5baf0055c8f`. | Bound |
| `WP77-BIND-004` | Corrected private handoff-seal tool SHA-256 is `e394659ccf8968cdf927f3ba2e0388c97a219a43eb9a94df627b276ccb331b3b`. | Bound |
| `WP77-BIND-005` | Corrected private handoff-verification tool SHA-256 is `44b3feccbb05f873d6a8126a124f98dccdf36b39783c9055b387f37baa552410`. | Bound |
| `WP77-BIND-006` | Private handoff tools use `constants.COPYFILE_EXCL`, export sync `main()`, and have exact direct-entry guards with no import-time effect. | Passed root static validation |
| `WP77-BIND-007` | `scripts/handoff-stop-contract.mjs` SHA-256 is `76aa5d7d2a38f8cb8b46131d5d8844120609a9a4785725aa8059c8114713e740`. | Bound and passed |
| `WP77-BIND-008` | `scripts/handoff-stop-contract.test.mjs` SHA-256 is `941ff30f76448c3502d64e36f23c691cecc5a60f50cc36bd7d5366543eaa2372`. | Bound and passed |
| `WP77-BIND-009` | `scripts/deviation-contract.mjs` SHA-256 is `e643c98dc47d66b9199085a39d68e90e977ce93007595d778c0d10d0bcb0dd66`. | Bound and passed |
| `WP77-BIND-010` | `scripts/deviation-contract.test.mjs` SHA-256 is `a132ad95f25eb2943cb227fc1df8df61df2067a391699269d722a603e341b874`. | Bound and passed |
| `WP77-BIND-011` | `scripts/evidence-verify.mjs` SHA-256 is `23cab7b2cec98046c5a77d72b76cf0d25ed39a864ea471f4be38732cda47dec5`. | Bound and passed static contracts |
| `WP77-BIND-012` | `README.md` SHA-256 is `641e906891b35a2513607d3344dcfbd557b2061c5052afbff8a292444c2da580`. | Bound |
| `WP77-BIND-013` | The exact recognized stop pair and artifact are `PRIMARY_HANDOFF / SEAL_PRIMARY_HANDOFF_READ_ONLY / handoff-seal-failure.json`; variants and duplicates fail closed. | Passed root static validation |
| `WP77-BIND-014` | The recognized handoff-stop branch requires complete PRIMARY evidence, exact absence of handoff/reproduction artifacts, cleanup, and three standardized Inconclusive reviews. | Passed root static validation |
| `WP77-BIND-015` | The recognized branch can emit only `INCONCLUSIVE` with nonzero exit; the complete zero-stop reproduction branch is the only final-PASS path. | Passed root static validation |
| `WP77-BIND-016` | The reproduction guard continues to require zero operational stops. | Passed root static validation |
| `WP77-BIND-017` | The renewed proof inventory contains 84 sorted unique files. | Bound |
| `WP77-BIND-018` | Artifact-inventory SHA-256 is `366724187427dfa9e4eb0e1ff0e2ad882e786077943e4d8324eaec0204d40a39`; canonical no-terminal-LF content-set SHA-256 is `4763359c30e1914f2257b0da6bc7345c4b877fe47e3852354a1b2452bdcdd45d`. | Bound |
| `WP77-BIND-019` | Exact Node `v22.23.1` syntax passes for all 51 proof scripts. | Passed |
| `WP77-BIND-020` | All 17 dependency-free `scripts/*.test.mjs` suites pass. | Passed |
| `WP77-BIND-021` | Protected SQL, audit typing, RLS graph, 222-case manifest/oracles, dependencies, image, Compose, launchers, reachability/reset/database-evidence, cleanup, and network semantics remain byte-identical except the exact accepted eight-path proof delta. | Passed root comparison |
| `WP77-BIND-022` | No dependency, credential/environment, preflight, image, Docker/Compose runtime, container, database, service, SQL, fixture, cleanup, proof, handoff, reproduction, or network action occurs during WP-77. | Attested |
| `WP77-BIND-023` | No application, architecture, infrastructure, deployment, provider-account/cost, customer/live-data, or external-system action occurs during WP-77. | Attested |
| `WP77-BIND-024` | Fresh independent validator `/root/wp77_static_validator` reproduced the thirteen-path scope, eight-path proof delta, 84-entry inventory, both aggregate hashes, all 51 syntax checks, all 17 proof suites, all three private module/copy tests, protected-path state, empty index, and closed authority boundary; it returned `PASS` with zero findings and zero candidate mutation. Private report SHA-256 is `cd1f0f437ed4c825ac57168334997196cdcb52d015154c0067dc8f6c4d27ed7c`. | Satisfied |
| `WP77-BIND-025` | `scripts/audit-detail-parameter-contract.mjs` renews only its evidence-verifier hash pin and has SHA-256 `c478621a9818383b1600c078a5ef08a924fc7922c9fab78fb96fd239503775af`; the typed `$12::text` query and every other protected hash remain unchanged. | Bound and passed |
| `WP77-BIND-026` | `scripts/runtime-reachability-remediation.test.mjs` SHA-256 is `dd816f3e21fa0246943eb7ac2669722b99457ffdec82bbb26f9112871dff7b7d`; it requires operational-stop classification before phase-specific reachability and preserves REPRODUCTION for the zero-stop path. | Bound and passed |

The canonical content-set checksum uses sorted inventory order with each entry rendered as
`path + NUL + bytes + NUL + sha256`, joined by LF with no terminal LF, consistent with the
accepted TP-01 inventory contract.

## Static validation contract

Root validation must remain built-in-only and source/static:

1. confirm the diff is confined to the exact thirteen-path publication candidate and ignored
   private WP-77 controls;
2. import both corrected private handoff modules with exact Node `v22.23.1` and prove zero
   import-time effects;
3. test successful exclusive copy, exact byte identity, read-only destination mode, second-copy
   rejection, and symlink-destination rejection without overwrite;
4. run positive and fail-closed mutation cases for the exact handoff stop pair, artifact, minimized
   schema, absence requirements, classification, non-PASS disposition, and reproduction guard;
5. prove final-verifier branch ordering recognizes the exact stop before requiring reproduction-
   phase reachability and still rejects malformed, multiple, or contradictory evidence;
6. run exact-Node syntax checks for every proof `scripts/*.mjs` file and all dependency-free
   `scripts/*.test.mjs` suites;
7. prove protected artifacts and semantics remain unchanged against the accepted proof baseline;
8. regenerate the complete sorted proof inventory and both aggregate hashes;
9. run `git diff --check`, confirm no staged files before the publication gate, and scan the public
   candidate for secrets or private paths; and
10. obtain exactly one fresh independent static validation over the final frozen bytes, rejecting
    the package for any finding, mutation, incomplete inventory, or authority-boundary violation.

These checks may not install or invoke dependencies, run build/typecheck commands that load proof
packages, create credentials, use network access, invoke Docker/Compose, or execute any runtime,
cleanup, proof, handoff, or reproduction operation.

## Owner dispositions under standing completion authority

| ID | Recommendation | Current state |
| --- | --- | --- |
| `WP77-DEC-001` | Accept `WP77-REM-001` through `WP77-REM-010` after final freeze and exactly one fresh independent static validator returns `PASS`. | Accepted |
| `WP77-DEC-002` | Accept `WP77-BIND-001` through `WP77-BIND-026` after every value is replaced and independently reproduced. | Accepted |
| `WP77-DEC-003` | Accept `constants.COPYFILE_EXCL`, import-safe private modules, and dependency-free exclusive-copy coverage as the exact prospective handoff-tool correction. | Accepted |
| `WP77-DEC-004` | Accept only the exact typed PRIMARY-handoff stop and minimized artifact; preserve zero-stop reproduction as the only PASS-eligible final path. | Accepted |
| `WP77-DEC-005` | Preserve WP-76 and all prior stopped attempts as immutable Inconclusive evidence and accept no retry, runtime result, or architecture inference from WP-77. | Accepted |
| `WP77-DEC-006` | Treat static PASS as source/control evidence only; accept no tenant-isolation, zero-leakage, audit, reproduction, dependency, implementation, or production-security result. | Accepted |
| `WP77-DEC-007` | After final hash renewal and independent PASS, authorize commit and push only for the exact frozen thirteen-path WP-77 public/proof inventory. | Accepted |
| `WP77-DEC-008` | After verified publication, activate only WP-78 published rebinding and reauthorization-readiness documentation; keep identities, private draft, materials, runtime, proof/reproduction, product, architecture, infrastructure, deployment, provider, network, and customer/live-data gates closed. | Accepted |

Standing completion authority permits these dispositions to become Accepted automatically only
when every condition is satisfied. It does not permit bypassing a failed validator, publishing
placeholders, expanding the frozen scope, or inferring execution authority.

## Candidate frozen public/proof inventory

The frozen publication inventory is exactly these thirteen paths. All bindings are final and the
one fresh independent static validator returned `PASS`; publication is authorized.

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/21_TP01_EXACT_EXECUTION_CONTRACT.md`
4. `docs/79_TP01_CONTROLLED_AUDIT_PARAMETER_EXECUTION_RESULT.md`
5. `docs/80_TP01_PRIMARY_HANDOFF_SEAL_OPERATIONAL_STOP_STATIC_REMEDIATION.md`
6. `proofs/tp-01-tenant-boundary/README.md`
7. `proofs/tp-01-tenant-boundary/scripts/audit-detail-parameter-contract.mjs`
8. `proofs/tp-01-tenant-boundary/scripts/deviation-contract.mjs`
9. `proofs/tp-01-tenant-boundary/scripts/deviation-contract.test.mjs`
10. `proofs/tp-01-tenant-boundary/scripts/evidence-verify.mjs`
11. `proofs/tp-01-tenant-boundary/scripts/handoff-stop-contract.mjs`
12. `proofs/tp-01-tenant-boundary/scripts/handoff-stop-contract.test.mjs`
13. `proofs/tp-01-tenant-boundary/scripts/runtime-reachability-remediation.test.mjs`

No other public or proof path may be committed or pushed with WP-77. Corrected private handoff
tools, evidence, inventory, validator records, and work-package controls remain ignored under
`internal-local/` and must never be published.

## Next gate

WP-77 ends at proof-only static remediation. After exact final freeze, complete hash and inventory
renewal, root validation, exactly one fresh independent static-validator PASS, standing-authority
acceptance, exact-scope commit and push, and live-remote verification, WP-78 may perform published
rebinding and reauthorization-readiness documentation only.

WP-78 may bind the exact publication, immutable stopped history, private-tool hashes, proof tree,
inventory, static result, and later workspace/candidate options. It may not create an execution
identity or private authorization draft, restore or invoke dependencies, create credentials or
environments, run preflight, inspect or retrieve images, invoke Docker/Compose, create containers,
databases, or services, execute SQL, cleanup, handoff, proof, or reproduction, use network access,
change application code, select architecture, create infrastructure, deploy, incur provider cost,
or access customer/live data. Any later execution requires a new identity and separately accepted
authorization chain; WP-77 and WP-78 do not authorize it.
