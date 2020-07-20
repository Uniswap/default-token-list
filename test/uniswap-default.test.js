const schema = require('@uniswap/token-lists/src/tokenlist.schema.json')
const {expect} = require('chai')
const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true, format: 'full' });
const validator = ajv.compile(schema);
const defaultList = require('../uniswap-default.tokenlist.json')

describe('list', () => {
  it('validates', () => {
    expect(validator(defaultList)).to.equal(true);
  })
})