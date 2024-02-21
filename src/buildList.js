const { version } = require("../package.json");
const testnet = require("./tokens/testnet/defaultTokenList.json");
const devnet = require("./tokens/devnet/defaultTokenList.json");
const bridgeUtils = require("@uniswap/token-list-bridge-utils");

module.exports = function buildList() {
  const parsed = version.split(".");
  const l1List = {
    name: "Berachain Default",
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    // logoURI: "ipfs://QmNa8mQkrNKp1WEEeGjFezDmDeodkWRevGFN8JCV7b4Xir",
    logoURI: "", // TODO: Add IPFS Logo
    keywords: ["berachain", "default"],
    tokens: [...testnet, ...devnet]
      // sort them by symbol for easy readability
      .sort((t1, t2) => {
        if (t1.chainId === t2.chainId) {
          return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
        }
        return t1.chainId < t2.chainId ? -1 : 1;
      }),
  };
  return bridgeUtils.chainify(l1List);
};
