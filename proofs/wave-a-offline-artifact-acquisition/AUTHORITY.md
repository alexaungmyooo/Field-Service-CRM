# WP-111 authority boundary

Authority derives from the owner's acceptance and verified publication of WP-110 at revision
`cb8be3d04f31126f80c2dec3ae961a65911033a8`, tree
`b223a909b96d1c55d7fbe8783be535983d874f97`, including `DEC-243` and the exact WP-110
contract.

Allowed:

- create files only under `proofs/wave-a-offline-artifact-acquisition/` and ignored private
  evidence under `internal-local/work-packages/WP-111/`;
- bind an already-present Node executable by exact path, version and SHA-256;
- record other already-present tool observations as non-executable planning evidence;
- run dependency-free synthetic static tests and the public verifier through the exact launcher;
- inventory, seal and obtain exactly one fresh zero-authority independent static validation.

Closed:

- network, DNS, redirects, metadata retrieval, downloads and artifact acquisition;
- SDK/cache mutation, dependencies, lockfiles, package-manager or resolver use;
- builds, devices/emulators, runtime, services, databases and proof execution/reproduction;
- application coding, architecture selection, infrastructure, deployment, provider accounts/cost,
  and customer/live data;
- commit or push before later owner acceptance.

Only the exact Node binding may execute, and only the `STATIC_TESTS` and `STATIC_VERIFY` command
tuples may run. The source policy, command policy and future-tool records are inert data. A static
PASS does not convert them into effective network authority.

