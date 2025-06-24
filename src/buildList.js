const { version } = require("../package.json");
const mainnet = require("./tokens/mainnet.json");
const ropsten = require("./tokens/ropsten.json");
const rinkeby = require("./tokens/rinkeby.json");
const goerli = require("./tokens/goerli.json");
const kovan = require("./tokens/kovan.json");
const polygon = require("./tokens/polygon.json");
const mumbai = require("./tokens/mumbai.json");
const optimism = require("./tokens/optimism.json");
const celo = require("./tokens/celo.json");
const arbitrum = require("./tokens/arbitrum.json");
const bnb = require("./tokens/bnb.json");
const sepolia = require("./tokens/sepolia.json");
const avalanche = require("./tokens/avalanche.json");
const base = require("./tokens/base.json");
const blast = require("./tokens/blast.json");
const zksync = require("./tokens/zksync.json");
const worldchain = require("./tokens/worldchain.json");
const zora = require("./tokens/zora.json");
const bridgeUtils = require("@uniswap/token-list-bridge-utils");

module.exports = function buildList() {
  const parsed = version.split(".");
  const l1List = {
    name: "Kittycorn Labs Default",
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI: "ipfs://QmNa8mQkrNKp1WEEeGjFezDmDeodkWRevGFN8JCV7b4Xir",
    keywords: ["kittycorn", "tokenize", "default"],
    tokens: [
      // ...mainnet,
      // ...ropsten,
      // ...goerli,
      // ...kovan,
      // ...rinkeby,
      // ...polygon,
      // ...mumbai,
      // ...optimism,
      // ...celo,
      // ...arbitrum,
      // ...bnb,
      ...sepolia,
      // ...avalanche,
      // ...base,
      // ...blast,
      // ...zksync,
      // ...worldchain,
      // ...zora,
    ]
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
