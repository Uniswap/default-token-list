const { getAddress } = require('@ethersproject/address');
const mainnet = require("../src/tokens/mainnet.json");

tokens = [...mainnet];

for (var token of tokens) {
  token.address = getAddress(token.address);
}

console.log(JSON.stringify(tokens, null, 2));
