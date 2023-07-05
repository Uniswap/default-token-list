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

const bridgeUtils = require('@uniswap/token-list-bridge-utils');

function buildTokenMap(tokens) {
  const tokenMap = {};
  if (tokens && tokens.length > 0) {
    tokens.forEach((token) => {
      tokenMap[`${token.chainId}_${token.address}`] = token;
    });
  }
  return tokenMap;
}

async function buildList() {
  const parsed = version.split(".");
  const l1List = {
    name: "Uniswap Labs Default",
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI: "ipfs://QmNa8mQkrNKp1WEEeGjFezDmDeodkWRevGFN8JCV7b4Xir",
    keywords: ["uniswap", "default"],
    tokens: [...mainnet, ...ropsten, ...goerli, ...kovan, ...rinkeby, ...polygon, ...mumbai, ...optimism, ...celo, ...arbitrum, ...bnb, ...sepolia, ...avalanche]
      // sort them by symbol for easy readability
      .sort((t1, t2) => {
        if (t1.chainId === t2.chainId) {
          return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
        }
        return t1.chainId < t2.chainId ? -1 : 1;
      }),
  };
  const chainifiedList = await bridgeUtils.chainify(l1List);
  const tokenMap = buildTokenMap(chainifiedList.tokens);
  chainifiedList['tokenMap'] = tokenMap;

  return chainifiedList;
};


module.exports = buildList;
