# TP-01 Controlled Reproduction-Context-Remediated Execution Result

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — PASS closed; exact publication authorized |
| Work package | `WP-96 Controlled TP-01 Reproduction-Context-Remediated Execution` |
| Governing decisions | `DEC-228` through `DEC-231` — Accepted |
| Accepted governance and proof revision | `a236b35a0f95c46d1bfd52305277afd92df41942` |
| Repository tree | `6c18cee66349bf02b77e6ed91f222b56a20a859b` |
| Proof tree | `1e9f75fdc1b221009bc691f54d24ca63f02c8038` |
| Run ID | `wp96-2026-10-10-01` |
| Owner | Aung Myo Oo |
| Date | 2026-10-10 |
| Final outcome | `PASS_CLOSED_SINGLE_USE_CONSUMED` |
| Commit/push | Authorized only for the exact frozen four-path public inventory |

## Objective and authority boundary

WP-96 authorized one controlled execution of the accepted 90-file TP-01 candidate. It permitted
one clean dedicated checkout, exact offline dependency restoration, fresh synthetic credentials
and private environment, exact run-bound controls, two stage-bound reproduction-validator context
receipts and attestations, one effective authorization, local-first image inspection, one bounded
local PostgreSQL runtime, one PRIMARY proof, one immutable handoff, one independent reproduction,
evidence verification, mandatory cleanup, residual verification, and three role reviews.

It did not authorize application coding, final architecture selection, infrastructure,
deployment, provider accounts/cost, or customer/live data. The run identity, authorization,
credentials, validator receipts, dependency state, and dedicated checkout are consumed and
non-reusable. No commit or push is authorized before later owner acceptance.

## Controlled execution results

| Control | Result |
| --- | --- |
| Dedicated checkout | Exact accepted revision, repository tree, and proof tree; tracked proof path clean |
| Proof identity | 90 sorted unique files; artifact-inventory SHA-256 `38b1619153b4802ce8effd4e92984bdf22dff370f3b9a35bca5d235a010d09ad`; content-set SHA-256 `c0e6bd87042e31a2e44a6a816b4803bb0918073b3b0f169695d40e067f5d0af4` |
| Dependencies | 115 packages reused from the existing local store; zero downloaded; frozen lockfile; scripts ignored |
| Validator context | Fresh `PRE_PRIMARY` and `PRE_REPRODUCTION` receipts and external task attestations passed in the accepted validator context |
| Preflight | Exact Node `v22.23.1`, pnpm `11.25.0`, Docker `29.7.2`, Compose `5.4.0`, revision, tree, proof, and initial-state controls passed |
| Image | Accepted PostgreSQL digest/platform present locally; no pull token, registry request, or other network access |
| PRIMARY | Three-view reachability and reset passed; 222/222 expected outcomes; 222 audit records; state unchanged |
| Handoff | Exact 16-entry read-only seal and aggregate independently verified; sealed artifacts remained unchanged |
| REPRODUCTION | Fresh validator-context gate, three-view reachability, fresh reset, and 222/222 independent cases passed |
| Cross-run comparison | Semantic result `MATCH`; 222 reproduction audit records; tracked state unchanged; zero unauthorized mutation |
| Deviations/stops | Zero accepted contract deviations and zero operational stops |
| Cleanup | Container, network, volume, proof dependencies, generated output, and private runtime environment removed |
| Residual verification | PASS; listeners closed; named runtime resources, proof processes, generated output, dependencies, credentials, and pull token absent |

PRIMARY and REPRODUCTION each covered all 222 manifest cases in exact order. The reproduction result
SHA-256 is `c3bcd57ecbed2c6dd4440ad7d50da934595cc4d7242d092833a56c5c7622f4e3`;
reproduction audit SHA-256 is
`e15e60fc802418b190a8669e68f0f6c92da5fb60d93516ada975d4efcfb8a6a4`; reproduction state
SHA-256 is `0440c0f9e92de050f629d6ba28faa1cb71e23633dc8c4b73b2abd578254a603d`.
The primary/reproduction state aggregate remained
`b4dda2b2df9cde6da699be2919744d15e91d051a830a7fcd34fad46515bb7f61`.

## Immutable handoff and review results

The 16-entry handoff aggregate is
`71e339c8e382fe13e4a435bcae128fb79e1fe0207f0b1d421fc9eb908be28941`; seal SHA-256 is
`39fd2cdbdaf1bc0372436191c4ca56382c88d023f9e892efa4be2b38431b94a2`; independent verification
SHA-256 is `29fa459e2c94ef150ba83dab1497c3911a226960bb8c383256c90897874d713b`;
and the collaboration-bound handoff attestation SHA-256 is
`74067a963004517850d9bae6506393cf4937bc9faeb680e97dfc06f6bad51e38`.

| Role | Identity | Recommendation |
| --- | --- | --- |
| Primary operator | `/root` | `PASS` |
| Independent reproduction validator | `/root/wp95_reproduction_validator` | `PASS` |
| Technical security reviewer | `/root/tp01_security_review` | `PASS`; bounded synthetic evidence only |

The public final verifier returned `PASS / FINAL_COMPLETE_PACKET / exit 0`. Final evidence-
verification SHA-256 is
`28a07359b2bd43fc47a50525986da696fa49d241acb9ca5f5e4b0af8be00b9f7`. Cleanup SHA-256 is
`dba38d4f3a7c9a35459d00bb950c14c7780985b1a8b55a3afdfbcd34ecd8d319`; final residual-
verification SHA-256 is
`c16092c4701e11601396cdbb9e6600a28ecb13160e7bedf91fd6a5a65dd0bc78`.

## Execution-control record and operator notes

The private packet formally records only item 4 below. Items 1 through 3 are contemporaneous root-
operator notes disclosed for transparency but are not independently reproducible from the frozen
40-entry packet, whose typed records retain only the corrected/successful state. None appears in
the proof deviation ledger, changes the 90-file proof candidate, or represents a proof/runtime
retry:

1. The first offline-restoration launcher invocation omitted its required exact pnpm environment;
   a second sandbox-contained invocation could not open the existing local-store database. No
   package was downloaded or installed by either failed invocation. The authorized host-context
   invocation then reused all 115 packages offline with frozen-lockfile and ignore-scripts
   controls.
2. The first operation-guard invocation exposed a missing duplicate preparation-controller alias
   in the newly materialized private authorization. The alias was added before preflight and bound
   to the already frozen preparation-controller path/hash; the public authorization validator
   passed before runtime and the final independent packet validator verified the final bytes.
3. The first sandbox-contained preflight process could not access the local Docker Unix socket and
   created no preflight result. The exact owner-authorized host-context invocation then passed.
4. The first final-verifier invocation rejected the reproduction review's Markdown list prefix.
   The review content was normalized without changing its recommendation, and the dependency-free,
   non-runtime final verifier reran and passed. `final-verifier-outcome.json` preserves both
   attempts and records that no proof or runtime retry occurred.

## Private packet and independent validation

The final inventory contains 40 entries, canonical aggregate SHA-256
`ebbf26542bd7b259216f4dbdff294e544cc8cc73e71376d6675f5b5fe7588f92`, and inventory-file
SHA-256 `97130c8ed6ed1aae5e76a1e1dabe0a9b6fbf8f152564a77b44c80da3ccfcf8a5`.
Fresh independent final-packet validation reproduced all 40 byte/hash entries, the exact handoff,
all three PASS reviews, zero deviations/stops, complete matching PRIMARY/REPRODUCTION evidence,
cleanup, residual absence, credential removal, and zero network/registry use. Its report SHA-256 is
`59c76ac3ecc4ceea59bb0879a43451f3ecc4aaf487d255838db41cde02b520cb`.

All private authorization, credentials, controls, receipts, attestations, runtime evidence,
reviews, inventories, and validation reports remain under ignored `internal-local/` custody and
must never be published. The dedicated checkout and its Git worktree metadata were removed after
validation.

## Accepted owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP96-DEC-001` | Accept run `wp96-2026-10-10-01` as `PASS_CLOSED_SINGLE_USE_CONSUMED`, with zero retry or reuse authority. | Accepted |
| `WP96-DEC-002` | Accept the exact 222-case PRIMARY and independent reproduction match, 222 audit records per run, unchanged tracked state, and zero unauthorized mutation as the bounded TP-01 result. | Accepted |
| `WP96-DEC-003` | Accept the two validator-context gates, exact 16-entry immutable handoff, three role reviews, final verifier PASS, and independent 40-entry packet validation exactly as recorded. | Accepted |
| `WP96-DEC-004` | Accept mandatory cleanup, credential/dependency removal, final residual PASS, checkout removal, zero registry/network use, zero provider cost, and zero customer/live-data access. | Accepted |
| `WP96-DEC-005` | Accept the formally recorded final-verifier format correction and acknowledge operator notes 1 through 3 only as unverified disclosures, not independently validated evidence or accepted proof facts. | Accepted |
| `WP96-DEC-006` | Treat TP-01 PASS as measured evidence for the exact candidate and synthetic fixture only; do not treat it as final architecture selection, production readiness, or qualified-human security approval. | Accepted |
| `WP96-DEC-007` | After verified result publication, activate a separate owner-decision package to disposition TP-01 evidence against the architecture shortlist; keep application coding and final architecture selection closed until separately authorized. | Accepted |

## Frozen candidate inventory and next gate

The candidate WP-96 public inventory is exactly:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/98_TP01_EXECUTION_IDENTITY_REPRODUCTION_CONTEXT_AUTHORIZATION_READINESS.md`
4. `docs/99_TP01_CONTROLLED_REPRODUCTION_CONTEXT_REMEDIATED_EXECUTION_RESULT.md`

The owner accepted the exact result, observations and operator-note limitations, private packet,
`DEC-231`, `WP96-DEC-001` through `007`, and the frozen four-path inventory. Commit and push are
authorized only for these four paths after final validation. After verified publication, WP-97 may
begin TP-01 architecture-evidence disposition for owner-decision documentation only. Application
coding, final architecture selection, infrastructure, deployment, provider accounts/cost, and
customer/live data remain closed.
