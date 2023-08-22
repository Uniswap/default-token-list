const { version } = require("../package.json");
const mainnet = require("./tokens/mainnet.json");
const goerli = require("./tokens/goerli.json");
const polygon = require("./tokens/polygon.json");
const optimism = require("./tokens/optimism.json");
const arbitrum = require("./tokens/arbitrum.json");
const bnb = require("./tokens/bnb.json");
const base = require("./tokens/base.json");

const bridgeUtils = require('@uniswap/token-list-bridge-utils');

module.exports = function buildList() {
  const parsed = version.split(".");
  const l1List = {
    name: "Rigoblock Pools",
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI: "ipfs://QmNa8mQkrNKp1WEEeGjFezDmDeodkWRevGFN8JCV7b4Xir",
    keywords: ["rigoblock", "smart pools"],
    tokens: [...mainnet, ...goerli, ...polygon, ...optimism, ...arbitrum, ...bnb, ...base]
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
