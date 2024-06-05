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
    "logoURI": "https://res.cloudinary.com/duv0g402y/image/upload/v1717433827/src/assets/wbera.png",
    "tags": ["featured"]
},
```

Token Address:
Token Name (from contract):
Token Decimals (from contract):
Token Symbol (from contract):
Token Logo URI:
Tags:
Please add your token icon to the src/assets folder and structure the logoURI field in the format of `https://res.cloudinary.com/duv0g402y/image/upload/v1717433827/src/assets/${token_name}.png`.
