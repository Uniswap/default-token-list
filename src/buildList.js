const { version } = require('../package.json');
const mainnet = require('./tokens/mainnet.json');
const amber = require('./tokens/amber.json');

module.exports = function buildList() {
  const parsed = version.split('.');
  return {
    name: 'SmartBCH Tokens List',
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI: 'ipfs://QmbBKPZyi1N3bkc5uywVRGagkHCLMiR8QX6Nh2CxWRDhsw',
    keywords: ['smartbch', 'sep20'],
    tokens: [...mainnet, ...amber]
      // sort them by symbol for easy readability
      .sort((t1, t2) => {
        if (t1.chainId === t2.chainId) {
          return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
        }
        return t1.chainId < t2.chainId ? -1 : 1;
      }),
  };
};
