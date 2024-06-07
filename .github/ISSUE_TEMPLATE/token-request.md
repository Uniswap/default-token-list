---
name: Token Request
about: Request a token addition
title: "Add {TOKEN_SYMBOL}: {TOKEN_NAME}"
labels: token request
assignees: ""
---

- [ ] I understand that token listing is not required to use the Berachain DEX with a token.
- [ ] I understand that filing an issue or adding liquidity does not guarantee addition to the Berachain default token list.
- [ ] I will not ping the Discord about this listing request.

**Please follow the format for adding your token.**

```json
{
    "chainId": 80086,
    "address": "0x0D4cfB3dF14Cf9eC9A2B56551d3d6b1b9d21AeB0",
    "symbol": "WBERA",
    "name": "Wrapped Berachain Token",
    "decimals": 18,
    "logoURI": "https://res.cloudinary.com/duv0g402y/raw/upload/src/assets/wbera.png",
    "tags": ["featured"]
},
```

- chainId: chainId of the chain
- address: token address
- symbol: token symbol
- name: token name
- decimals: token decimals
- logoURI: path to token icon in default-list repo
- tags: [(optional)] leave empty array if not tags

this repository is uploaded to cloudinary for improved availability. Please upload your relevant assets under the `assets/` folder and prefix the path in this json file with `https://res.cloudinary.com/duv0g402y/raw/upload/`.

an example :
`https://res.cloudinary.com/duv0g402y/raw/upload/src/assets/${asset_file_name}`

ℹ️ AFTER OPENING AN ISSUE, CREATE A BRANCH AND ADD YOUR CHANGES. WHEN READY, CREATE A PR AND LINK YOUR ISSUE IN THE PR 🚀
