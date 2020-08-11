const { version } = require('../package.json');
const tokens = require('./tokens.json');

module.exports = function buildList() {
  const parsed = version.split('.');
  return {
    'name': 'Uniswap Default List',
    'timestamp': (new Date().toISOString()),
    'version': {
      'major': +parsed[ 0 ],
      'minor': +parsed[ 1 ],
      'patch': +parsed[ 2 ]
    },
    'tags': {},
    'logoURI': 'ipfs://QmZgpZq1HkVS7YCThNJeR51KFVo5AL8P3ThA2y9wcw53p9',
    'keywords': [
      'uniswap',
      'default'
    ],
    tokens
  };
};