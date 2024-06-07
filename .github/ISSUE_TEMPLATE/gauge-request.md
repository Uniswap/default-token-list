---
name: Gauge Request
about: Request a gauge addition
title: Add {GAUGE_NAME}
labels: gauge request
assignees: ""
---

- [ ] I understand that gauge listing is not required to use the Berachain DEX.
- [ ] I understand that filing an issue or adding liquidity does not guarantee addition to the Berachain default gauge list.
- [ ] I will not ping the Discord about this listing request.

**Please follow the following format for your gauge.**

```json
{
    "address": "0x0000746573745F5F5F5F5f726563656976657231",
    "name": "DEFAULT GAUGE 2",
    "logoURI": "https://res.cloudinary.com/duv0g402y/raw/upload/src/assets/bera.png",
    "url": "",
    "categoryName": "BEX Liquidity Pool",
    "categoryIcon": "https://res.cloudinary.com/duv0g402y/raw/upload/src/assets/bera.png"
},
```

- Gauge Address:
- Gauge Name:
- Gauge Logo:
- Gauge URL:
- Gauge Category Name (i.e. BEX Liquidity Pool):
- Gauge Category Icon:

this repository is uploaded to cloudinary for improved availability. Please upload your relevant assets under the `assets/` folder and prefix the path in this json file with `https://res.cloudinary.com/duv0g402y/raw/upload/`.

an example :
`https://res.cloudinary.com/duv0g402y/raw/upload/src/assets/${asset_file_name}`

ℹ️ AFTER OPENING AN ISSUE, CREATE A BRANCH AND ADD YOUR CHANGES. WHEN READY, CREATE A PR AND LINK YOUR ISSUE IN THE PR 🚀
