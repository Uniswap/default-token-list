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
const solana = require("./tokens/solana.json");
const bridgeUtils = require("@uniswap/token-list-bridge-utils");
const unichain = require("./tokens/unichain.json");
const xlayer = require("./tokens/xlayer.json");

module.exports = async function buildList() {
  const parsed = version.split(".");

  // EVM chains only for bridgeUtils.chainify (which validates Ethereum addresses)
  const evmTokens = [
    ...mainnet,
    ...ropsten,
    ...goerli,
    ...kovan,
    ...rinkeby,
    ...polygon,
    ...mumbai,
    ...optimism,
    ...celo,
    ...arbitrum,
    ...bnb,
    ...sepolia,
    ...avalanche,
    ...base,
    ...blast,
    ...zksync,
    ...worldchain,
    ...zora,
    ...unichain,
    ...xlayer,
  ]
    // sort them by symbol for easy readability
    .sort((t1, t2) => {
      if (t1.chainId === t2.chainId) {
        return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
      }
      return t1.chainId < t2.chainId ? -1 : 1;
    });

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
    tokens: evmTokens,
  };

  // Apply bridge utils to EVM chains only
  const listWithBridgeInfo = await bridgeUtils.chainify(l1List);

  listWithBridgeInfo.tokens.push(...solana);

  // Re-sort all tokens by chainId first, then symbol
  listWithBridgeInfo.tokens.sort((t1, t2) => {
    if (t1.chainId === t2.chainId) {
      return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
    }
    return t1.chainId < t2.chainId ? -1 : 1;
  });

  return listWithBridgeInfo;
};
