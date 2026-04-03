#!/usr/bin/env node
// EIP-55 checksum verification for token addresses.
// Usage: node scripts/checksum.js 0xAddress1 0xAddress2 ...
// Exits 0 if all OK, 1 if any mismatch or invalid.

const { getAddress } = require("@ethersproject/address");

let hasError = false;

for (const addr of process.argv.slice(2)) {
  try {
    const checksummed = getAddress(addr);
    if (addr === checksummed) {
      console.log(`OK ${checksummed}`);
    } else {
      console.log(`MISMATCH input=${addr} expected=${checksummed}`);
      hasError = true;
    }
  } catch (e) {
    console.error(`INVALID ${addr}: ${e.message}`);
    hasError = true;
  }
}

if (process.argv.length <= 2) {
  console.error("Usage: node scripts/checksum.js <address> [address...]");
  process.exit(1);
}

process.exit(hasError ? 1 : 0);
