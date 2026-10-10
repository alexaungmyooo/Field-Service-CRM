# Authority boundary

Authority derives from the owner's accepted WP-108 stopped result and explicit WP-109 static
remediation authorization, together with accepted `DEC-242`, `WP107-CTRL-001` through `016`,
`WP107-PATH-001` through `014`, and `WP107-CMD-001` through `006` at published revision
`f17ba0474d3a40f7f46aab05226b67f720f0d574`.

Allowed in WP-109:

- remediate only this exact public control tree and create the ignored WP-109 private evidence root;
- bind one already-present Node executable by exact path, semantic version and SHA-256;
- execute only dependency-free synthetic static verifiers/tests through the fail-closed launcher;
- hash, inventory, validate, clean checkpoint-owned temporary state, and obtain exactly one fresh
  zero-authority independent static validation after sealing.

Closed in WP-109:

- network, redirects, downloads and artifact acquisition;
- SDK/cache mutation, package-manager use, dependencies and lockfiles;
- Wave A proof materialization, Flutter/Dart/Gradle/native operations and database access;
- builds, devices/emulators, services, runtime proof/reproduction and measurements;
- application coding, architecture selection, infrastructure, deployment, provider/cost and
  customer/live data;
- commit or push before later owner acceptance.

The launcher binds the exact authorization path, ledger path, stage and command tuple. Every ledger
entry binds the effective-authorization hash and carries a resulting-path mutation array. Sealing
consumes the single-use authority. Any ambiguity, evidence-write failure, expiry, consumption,
mode/path drift, unexpected file, command mismatch, network-capable import, dependency import or
validator remediation request fails closed.
