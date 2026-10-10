# Wave A Artifact Acquisition Control

Disposable proof-governance controls for a later, separately authorized artifact-acquisition
checkpoint. This tree is not application code, does not contain acquired artifacts, and grants no
network, download, dependency, build, device, runtime, proof-execution, or publication authority.

WP-109 remediates and statically validates only:

- an effective-authorization contract;
- a pre-action receipt contract;
- a hash-chained operation ledger;
- an artifact/offline-bundle manifest contract;
- a final-inventory contract;
- a fail-closed launcher and dependency-free static verifiers/tests.

The launcher accepts only an exact authorization path, ledger path, stage, executable and argument
tuple listed in the private effective authorization. Every command receives an intent entry before
process creation and a result entry with resulting path mutations afterward. The ledger is chained
to the effective-authorization hash; sealing consumes the single-use authority. Private
authorization, receipts, ledgers, outputs and inventories remain under
`internal-local/work-packages/WP-109/` and must never be committed.

Result meanings:

- `STATIC_CONTROL_REMEDIATED`: exact public tree, private evidence and independent validation pass;
  no acquisition or network action occurred.
- `STOPPED_CONTROL_EVIDENCE`: authority, receipt, ledger, mode, path or validation evidence is
  absent or inconsistent.
- `STOPPED_TOOL_BINDING`: exact existing Node path/version/hash cannot be bound.
- `AUTHORITY_VIOLATION`: a command, path or action exceeds the accepted WP-108 boundary.

No successful WP-109 result accepts a dependency or authorizes artifact acquisition.
