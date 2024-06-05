---
name: Validator Request
about: Request a validator addition
title: Add {VALIDATOR_NAME}
labels: validator request
assignees: ''

---

- [ ] I understand that filing an issue does not guarantee addition to the Berachain default validator list.
- [ ] I will not ping the Discord about this listing request.

**Please follow the format for your validator.**

```json
{
    "id": "0xB32C788C293e7779DB63bb3342F3dF59BdF7D6e5",
    "logoURI": "https://res.cloudinary.com/duv0g402y/image/upload/v1717433827/src/assets/infrared.jpg",
    "name": "Validator One",
    "description": "ooga booga validator one",
    "website": "https://www.google.com",
    "twitter": "https://www.twitter.com"
},
```

Validator ID:
Validator Name:
Validator Logo URI:
Validator Description:
Link to website:
Link to twitter:

this repository is uploaded to cloudinary for improved availability. Please upload your relevant assets under the `assets/` folder and prefix the path in this json file with `https://res.cloudinary.com/duv0g402y/image/upload/v1717433827`.

an example :
`https://res.cloudinary.com/duv0g402y/image/upload/v1717433827/src/assets/${asset_file_name}`
