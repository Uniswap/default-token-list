# CLAUDE.md - Uniswap Default Token List

## Project Overview

This is the **Uniswap Default Token List** (`@uniswap/default-token-list`) — the curated list of tokens shown by default in the Uniswap interface. It is a small, single-package Node.js repo.

- **Package manager**: yarn (`yarn install --frozen-lockfile`)
- **Test runner**: Mocha + Chai (`yarn test`)
- **Build**: `yarn build` (generates `build/uniswap-default.tokenlist.json`)
- **Versioning**: `npm version minor` (additions) / `npm version major` (removals/updates)
- **Main branch**: `main`

## Repository Structure

```
default-token-list/
├── src/
│   ├── buildList.js           # Combines per-chain JSON files into final token list
│   ├── write.js               # Writes built list to stdout
│   └── tokens/                # Per-chain token JSON files
│       ├── mainnet.json       # Ethereum (chainId: 1)
│       ├── polygon.json       # Polygon (chainId: 137)
│       ├── arbitrum.json      # Arbitrum (chainId: 42161)
│       ├── optimism.json      # Optimism (chainId: 10)
│       ├── base.json          # Base (chainId: 8453)
│       ├── bnb.json           # BNB Chain (chainId: 56)
│       ├── avalanche.json     # Avalanche (chainId: 43114)
│       ├── worldchain.json    # World Chain (chainId: 480)
│       ├── unichain.json      # Unichain (chainId: 130)
│       ├── solana.json        # Solana (chainId: 501000101)
│       ├── blast.json         # Blast (chainId: 81457)
│       ├── celo.json          # Celo (chainId: 42220)
│       ├── zksync.json        # zkSync (chainId: 324)
│       ├── zora.json          # Zora (chainId: 7777777)
│       ├── xlayer.json        # X Layer (chainId: 196)
│       ├── sepolia.json       # Sepolia testnet
│       ├── goerli.json        # Goerli testnet (deprecated)
│       ├── kovan.json         # Kovan testnet (deprecated)
│       ├── rinkeby.json       # Rinkeby testnet (deprecated)
│       ├── ropsten.json       # Ropsten testnet (deprecated)
│       └── mumbai.json        # Mumbai testnet (deprecated)
├── test/
│   └── uniswap-default.test.js  # Mocha tests (checksums, duplicates, schema)
├── package.json
└── yarn.lock
```

## Supported Chains (Production)

| Chain | chainId | Token File |
|-------|---------|------------|
| Ethereum | 1 | `mainnet.json` |
| Optimism | 10 | `optimism.json` |
| BNB Chain | 56 | `bnb.json` |
| Polygon | 137 | `polygon.json` |
| X Layer | 196 | `xlayer.json` |
| zkSync | 324 | `zksync.json` |
| World Chain | 480 | `worldchain.json` |
| Unichain | 130 | `unichain.json` |
| Base | 8453 | `base.json` |
| Arbitrum | 42161 | `arbitrum.json` |
| Celo | 42220 | `celo.json` |
| Avalanche | 43114 | `avalanche.json` |
| Blast | 81457 | `blast.json` |
| Zora | 7777777 | `zora.json` |
| Solana | 501000101 | `solana.json` |

## Token Entry Format

Each token is a JSON object in the per-chain file:

```json
{
  "chainId": 1,
  "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "name": "Wrapped Ether",
  "symbol": "WETH",
  "decimals": 18,
  "logoURI": "https://..."
}
```

**Required fields**: `chainId`, `address`, `name`, `symbol`, `decimals`
**Optional fields**: `logoURI`, `extensions` (bridgeInfo)

New tokens are appended to the **end** of the appropriate chain JSON file.

## EIP-55 Address Checksum (MANDATORY)

**ALWAYS** verify EVM addresses are EIP-55 checksummed before adding them. This repo has `@ethersproject/address` installed:

```bash
node scripts/checksum.js 0xADDRESS1 0xADDRESS2
```

Solana addresses (chainId 501000101) use base58 and do NOT need checksumming.

The test suite (`yarn test`) validates that all EVM addresses are correctly checksummed.

## Linear Integration

Token requests come from Linear tickets in the **CX Token Requests** project under the **Consumer Engagement** team.

- **Project URL**: https://linear.app/uniswap/project/cx-token-requests-488bbdeafd01/overview
- Each ticket specifies: chain, token contract address, token name, symbol, decimals, and a logo URI
- **Always use the logoURI from the ticket** — do not replace it with a CoinGecko lookup

### Preferred: Linear MCP tools

If the Linear MCP server is connected (tools prefixed with `mcp__` are available), use MCP tools for Linear operations:

```
# Query open issues
list_issues(project: "CX Token Requests", state: "unstarted")
list_issues(project: "CX Token Requests", state: "started")

# Comment PR link
save_comment(issueId: "CONS-1234", body: "PR opened: <PR_URL>")
```

> **Note (autonomous workflow):** When running as part of the Claude Auto Tasks workflow, Linear ticket status updates (In Progress, In Review, Done) are handled by the workflow infrastructure via `linear-task-utils`. Do NOT update ticket status yourself — focus only on reading ticket details and making code changes. You may still comment on tickets if you need to ask for clarification.

**Do NOT use curl to access the Linear API.** The `LINEAR_API_KEY` environment variable is not available to you. All Linear operations must go through the MCP tools listed above. If MCP tools are not available, note the issue in the PR description.

## Token Metadata

**Always use metadata from the Linear ticket** — especially the `logoURI` and `decimals`. If any required field is missing from the ticket, do NOT guess or look it up elsewhere. Use `mcp__linear__linear_add_comment` to comment on the Linear ticket asking for the missing information, then skip that token.

## Standardized Workflow: Adding Tokens

1. **Move Linear ticket(s) to "In Progress"**
2. `git checkout main && git pull`
3. Create branch: `add-SYMBOL-YYYY-MM-DD` (see Branch Naming below)
4. Validate each token:
   - EIP-55 checksummed address (or valid base58 for Solana)
   - Valid chainId (must be a supported chain)
   - Valid decimals (0-18)
   - No duplicate entry (same chainId + address)
5. Add token entries to the **end** of the appropriate chain JSON file, including `logoURI` from ticket
6. Commit: `add: SYMBOL (YYYY-MM-DD)` (or `add: SYM1, SYM2 (YYYY-MM-DD)`)
7. `npm version minor`
8. Push branch and create PR (see PR Templates below)
9. **Move ticket(s) to "In Review"** and comment the PR link

## Standardized Workflow: Removing/Blocking Tokens

1. Find and remove the token entry matching chainId and address
2. Verify the token was actually found
3. Commit: `remove: SYMBOL (YYYY-MM-DD)` or `block: SYMBOL (YYYY-MM-DD)`
4. `npm version major` (removals/updates use major bumps)

## Versioning Rules (Critical)

- **Minor**: `npm version minor` — for **additions** only
- **Major**: `npm version major` — for **deletions** or **updates** to existing entries
- Never use patch version bumps for list changes
- Always run the version command AFTER committing the list change

## Branch Naming Convention

Up to 3 token symbols in the branch name. If 4+, append `etc`:

- `add-fidd-2026-03-27`
- `add-fidd-xaut-2026-03-27`
- `add-fidd-xaut-pepe-2026-03-27`
- `add-fidd-xaut-pepe-etc-2026-03-27`

Prefixes: `add-` for additions, `block-` for unsupported list, `remove-` for removals.

## Handling Multiple Tokens

When processing multiple token requests of the same operation type, **group them into a single branch and PR**:

- Combine all tokens into one commit with comma-separated symbols
- Link all related Linear tickets in the PR description

## Quality Checks

Before committing:
1. **Validate JSON**: Ensure modified file is valid JSON
2. **Address validation**: EIP-55 checksummed (EVM) or valid base58 (Solana)
3. **No duplicates**: No duplicate entries (same chainId + address)
4. **Required fields**: chainId, address, name, symbol, decimals all present
5. **Run tests**: `yarn test` must pass

## PR Description Templates

### 1-5 tokens

```
gh pr create --title "add: SYM1, SYM2 (YYYY-MM-DD)" --body "$(cat <<'EOF'
## Summary
Add N token(s) to the default list.

| Symbol | Chain | Address | Decimals |
|--------|-------|---------|----------|
| SYM1 | Ethereum | `0x...` | 18 |

## Verification
- [x] EIP-55 checksums verified
- [x] No duplicate entries
- [x] `yarn test` passes

## Linear tickets
- [CONS-1234](https://linear.app/uniswap/issue/CONS-1234/...)
EOF
)"
```

### 6+ tokens

```
gh pr create --title "add: SYM1, SYM2, SYM3, etc (YYYY-MM-DD)" --body "$(cat <<'EOF'
## Summary
Add N tokens across M chain(s) to the default list.

<details>
<summary>Token details (N tokens)</summary>

| Symbol | Chain | Address | Decimals |
|--------|-------|---------|----------|
| SYM1 | Ethereum | `0x...` | 18 |
| ... | ... | ... | ... |

</details>

## Verification
- [x] EIP-55 checksums verified
- [x] No duplicate entries
- [x] `yarn test` passes

## Linear tickets
- [CONS-1234](https://linear.app/uniswap/issue/CONS-1234/...)
EOF
)"
```

## Git Workflow

1. Always pull latest main before starting
2. Create a branch using the naming convention
3. Make changes to the per-chain token JSON file
4. Stage only the relevant files
5. Commit with the standardized message format
6. Run the appropriate `npm version` command (creates commit + git tag)
7. Push and create a PR linking all relevant Linear tickets

## Error Handling

- If a token address doesn't match expected format, flag it
- If the token already exists in the list, inform and ask how to proceed
- If a token to be removed is not found, inform clearly
- If git working directory is dirty with unrelated changes, warn before proceeding
