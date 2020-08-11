const packageJson = require('../package.json');
const schema = require('@uniswap/token-lists/src/tokenlist.schema.json');
const { expect } = require('chai');

const Ajv = require('ajv');
const buildList = require('../src/buildList');

const ajv = new Ajv({ allErrors: true, format: 'full' });
const validator = ajv.compile(schema);

describe('buildList', () => {
  const defaultTokenList = buildList();

  it('validates', () => {
    expect(validator(defaultTokenList)).to.equal(true);
  });

  it('contains no duplicates', () => {
    const map = {};
    for (let token of defaultTokenList.tokens) {
      const key = `${token.chainId}-${token.address}`;
      expect(typeof map[ `${token.chainId}-${token.address}` ])
        .to.equal('undefined');
      map[ key ] = true;
    }
  });

  it('version matches package.json', () => {
    expect(packageJson.version).to.match(/^\d+\.\d+\.\d+$/);
    expect(packageJson.version).to.equal(`${defaultTokenList.version.major}.${defaultTokenList.version.minor}.${defaultTokenList.version.patch}`);
  });
});