# smartbch-token-list

[![Tests](https://github.com/Uniswap/token-lists/workflows/Tests/badge.svg)](https://github.com/Uniswap/default-token-list/actions?query=workflow%3ATests)
[![npm](https://img.shields.io/npm/v/@uniswap/default-token-list)](https://unpkg.com/@uniswap/default-token-list@latest/)

This NPM module and GitHub repo contains the tokens list used in the SmartBCH universe.

## Usage

Install required dependencies:

```sh
yarn insatll
```

Edit token lists in `src/` directory and build the complete list:

```sh
yarn build
```
The complete list will be `build/smartbch.tokenlist.json` .

Test if the list is in the proper format, acording to the [Tokenlist JSON schema](https://uniswap.org/tokenlist.schema.json):

```sh
yarn test
``` 

## Adding a token

To request that we add a token to the list, 
[file an issue](https://github.com/zh/smart-token-list/issues/new?assignees=&labels=token+request&template=token-request.md&title=Add+%7BTOKEN_SYMBOL%7D%3A+%7BTOKEN_NAME%7D).

### Disclaimer

Note filing an issue does not guarantee addition to this default token list.
We do not review token addition requests in any particular order, and we do not
guarantee that we will review your request to add the token to the default list.

