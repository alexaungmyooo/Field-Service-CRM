export const expectedNodeVersion = "v22.23.1";

export function assertExactNode() {
  if (process.version !== expectedNodeVersion) {
    throw new Error(
      `Node runtime mismatch: expected ${expectedNodeVersion}, received ${process.version}`,
    );
  }
}
