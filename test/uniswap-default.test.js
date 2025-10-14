const packageJson = require('../package.json');
const schema = require('@uniswap/token-lists/src/tokenlist.schema.json');
const { expect } = require('chai');
const { getAddress } = require('@ethersproject/address');
// bs58 v6 uses ES modules, so we need to access the default export
const bs58 = require('bs58').default;
const Ajv = require('ajv');
const buildList = require('../src/buildList');

const ajv = new Ajv({ allErrors: true, format: 'full' });
const validator = ajv.compile(schema);
let defaultTokenList;

before(async function () {
  this.timeout(250000);
  defaultTokenList = await buildList();
});

describe('buildList', () => {

  it.skip('validates', () => {
    // Note: Schema validation is skipped because the @uniswap/token-lists schema
    // only supports EVM chains with Ethereum-style addresses (0x...).
    // This list now includes Solana tokens with base58 addresses.
    // TODO: Update the schema to support Solana addresses.
    expect(validator(defaultTokenList)).to.equal(true);
  });

  it('contains no duplicate addresses', () => {
    const map = {};
    for (let token of defaultTokenList.tokens) {
      const key = `${token.chainId}-${token.address}`;
      expect(typeof map[key])
        .to.equal('undefined');
      map[key] = true;
    }
  });

  it('contains no duplicate symbols', () => {
    // manual override to approve certain tokens with duplicate symbols
    const approvedDuplicateSymbols = ["ust", "sol", "jup", 'wbtc'];

    const map = {};
    for (let token of defaultTokenList.tokens) {
      let symbol = token.symbol.toLowerCase();
      if (approvedDuplicateSymbols.includes(symbol)) {
        continue;
      } else {
        const key = `${token.chainId}-${symbol}`;
        expect(typeof map[key])
          .to.equal('undefined', `duplicate symbol: ${symbol}`);
        map[key] = true;
      }
    }
  })

  it('contains no duplicate names', () => {
    const approvedDuplicateNames = ["solana", "jupiter"];
    const map = {};
    for (let token of defaultTokenList.tokens) {
      const key = `${token.chainId}-${token.name.toLowerCase()}`;
      if (approvedDuplicateNames.includes(token.name.toLowerCase())) {
        continue;
      } else {
      expect(typeof map[key])
        .to.equal('undefined', `duplicate name: ${token.name}`);
        map[key] = true;
      }
    }
  })

  it('all addresses are valid and checksummed', () => {
    const SOLANA_CHAIN_ID = 501000101;
    for (let token of defaultTokenList.tokens) {
      if (token.chainId === SOLANA_CHAIN_ID) {
        // Validate Solana addresses using bs58
        expect(token.address).to.be.a('string');
        expect(token.address).to.not.be.null;
        expect(token.address).to.not.be.undefined;
        
        // Decode and validate the address
        let decoded;
        try {
          decoded = bs58.decode(token.address);
        } catch (e) {
          throw new Error(`Invalid Solana address for ${token.symbol}: ${token.address}`);
        }
        
        // Solana addresses must decode to exactly 32 bytes
        expect(decoded.length).to.eq(32, `Invalid Solana address length for ${token.symbol}: ${token.address}`);
      } else {
        // EVM chains - validate Ethereum address checksum
        expect(getAddress(token.address)).to.eq(token.address);
      }
    }
  });

  it('version matches package.json', () => {
    expect(packageJson.version).to.match(/^\d+\.\d+\.\d+$/);
    expect(packageJson.version).to.equal(`${defaultTokenList.version.major}.${defaultTokenList.version.minor}.${defaultTokenList.version.patch}`);
  });

  it('all tokens have valid decimals', () => {
    for (let token of defaultTokenList.tokens) {
      expect(token.decimals).to.be.a('number');
      expect(token.decimals).to.be.gte(0);
      expect(token.decimals).to.be.lte(18);
    }
  });
});
