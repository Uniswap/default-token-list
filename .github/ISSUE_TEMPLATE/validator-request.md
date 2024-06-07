---
name: Validator Request
about: Request a validator addition
title: Add {VALIDATOR_NAME}
labels: validator request
assignees: ""
---

- [ ] I understand that filing an issue does not guarantee addition to the Berachain default validator list.
- [ ] I will not ping the Discord about this listing request.

**Please follow the format for your validator.**

```json
{
    "id": "0xB32C788C293e7779DB63bb3342F3dF59BdF7D6e5",
    "logoURI": "https://res.cloudinary.com/duv0g402y/raw/upload/src/assets/infrared.jpg",
    "name": "Validator One",
    "description": "ooga booga validator one",
    "website": "https://www.google.com",
    "twitter": "https://www.twitter.com"
},
```

- id: validator fee recipient
- logoURI: path to validator icon in default-list repo
- name: validator name
- description (optional): a short description for the validator
- website (optional): a validator's website
- twitter (optiona): a validator's twitter account url

this repository is uploaded to cloudinary for improved availability. Please upload your relevant assets under the `assets/` folder and prefix the path in this json file with `https://res.cloudinary.com/duv0g402y/raw/upload/`.

an example :
`https://res.cloudinary.com/duv0g402y/raw/upload/src/assets/${asset_file_name}`
ℹ️ AFTER OPENING AN ISSUE, CREATE A BRANCH AND ADD YOUR CHANGES. WHEN READY, CREATE A PR AND LINK YOUR ISSUE IN THE PR 🚀
