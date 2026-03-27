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
node -e "const{getAddress}=require('@ethersproject/address');process.argv.slice(1).forEach(a=>{try{const c=getAddress(a);console.log(a===c?'OK':'MISMATCH',c)}catch(e){console.error('INVALID',a,e.message)}})" 0xADDRESS1 0xADDRESS2
```

Solana addresses (chainId 501000101) use base58 and do NOT need checksumming.

The test suite (`yarn test`) validates that all EVM addresses are correctly checksummed.

## Linear Integration

Token requests come from Linear tickets in the **CX Token Requests** project under the **Consumer Engagement** team.

- **Project URL**: https://linear.app/uniswap/project/cx-token-requests-488bbdeafd01/overview
- Each ticket specifies: chain, token contract address, token name, symbol, decimals, and a logo URI
- **Always use the logoURI from the ticket** — do not replace it with a CoinGecko lookup

### Preferred: Linear MCP tools

If the Linear MCP server is connected (tools prefixed with `mcp__` are available), use MCP tools for all Linear operations:

```
# Query open issues
list_issues(project: "CX Token Requests", state: "unstarted")
list_issues(project: "CX Token Requests", state: "started")

# Move ticket to In Progress
save_issue(id: "CONS-1234", state: "In Progress")

# Move ticket to In Review
save_issue(id: "CONS-1234", state: "In Review")

# Move ticket to Done
save_issue(id: "CONS-1234", state: "Done")

# Comment PR link
save_comment(issueId: "CONS-1234", body: "PR opened: <PR_URL>")
```

### Fallback: Linear GraphQL API via curl

If Linear MCP is not available, use the GraphQL API:

- **API key**: `${LINEAR_API_KEY}` environment variable
- **Endpoint**: `https://api.linear.app/graphql`

```bash
# Fetch a single issue
curl -s -X POST 'https://api.linear.app/graphql' \
  -H 'Content-Type: application/json' \
  -H "Authorization: ${LINEAR_API_KEY}" \
  -d '{"query":"{ issue(id: \"CONS-1234\") { title description url } }"}'
```

### CONS Team State IDs (for curl fallback)

- **In Progress**: `9b144292-8c1f-4ecd-af6c-a60b37b90a43`
- **In Review**: `8bd1b7f3-29b5-4de8-b93a-2f168d93d585`
- **Done**: `bb9c8b31-7908-45db-9ac5-d5667a500e9e`

## Token Metadata Lookup

**Always prefer metadata from the Linear ticket** — especially the `logoURI`. Only fall back to CoinGecko if the ticket is missing fields:

```
https://tokens.coingecko.com/uniswap/all.json
```

Filter by address (case-insensitive), then always re-checksum the address from the result.

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
9. Close any auto-created PRs for the same tokens
10. **Move ticket(s) to "In Review"** and comment the PR link
11. **Run the merge watcher** (see below)

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
- After creating the combined PR, close any auto-created PRs with "Superseded by #NNN"

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

## Merge Watcher

The merge watcher checks "In Review" tickets to see if their PRs have been merged, then moves them to "Done".

1. Query all "In Review" tickets in CX Token Requests
2. For each ticket, find the PR URL from comments
3. Check PR state: `gh pr view <URL> --json state --jq '.state'`
4. If `MERGED`, move ticket to "Done"

## Git Workflow

1. Always pull latest main before starting
2. Create a branch using the naming convention
3. Make changes to the per-chain token JSON file
4. Stage only the relevant files
5. Commit with the standardized message format
6. Run the appropriate `npm version` command (creates commit + git tag)
7. Push and create a PR linking all relevant Linear tickets
8. Close any auto-created PRs for the same tokens with "Superseded by #NNN"

## Error Handling

- If a token address doesn't match expected format, flag it
- If the token already exists in the list, inform and ask how to proceed
- If a token to be removed is not found, inform clearly
- If git working directory is dirty with unrelated changes, warn before proceeding
