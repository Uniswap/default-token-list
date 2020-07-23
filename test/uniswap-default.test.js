const schema = require('@uniswap/token-lists/src/tokenlist.schema.json')
const {expect} = require('chai')
const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true, format: 'full' });
const validator = ajv.compile(schema);
const packageJson = require('../package.json')
const defaultList = require('../uniswap-default.tokenlist.json')

describe('list', () => {
  it('validates', () => {
    expect(validator(defaultList)).to.equal(true);
  })

  it('contains no duplicates', () => {
    const map = {}
    for (let token of defaultList.tokens) {
      const key = `${token.chainId}-${token.address}`
      expect(typeof map[`${token.chainId}-${token.address}`])
        .to.equal('undefined')
      map[key] = true
    }
  })

  it('version matches package.json', () => {
    expect(packageJson.version).to.match(/^\d+\.\d+\.\d+$/)
    expect(packageJson.version).to.equal(`${defaultList.version.major}.${defaultList.version.minor}.${defaultList.version.patch}`)
  })
})