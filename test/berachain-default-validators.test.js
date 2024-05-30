const packageJson = require("../package.json");
const { expect } = require("chai");
const fetch = require("node-fetch");
const defaultValidatorList = require("../src/validators/testnet/defaultValidatorList.json");

before(async function () {
  this.timeout(120000);
});

describe("validator list test suite", () => {
  it("contains no duplicate index", () => {
    const map = {};
    for (let validator of defaultValidatorList.validators) {
      let index = validator.id.toString();
      const key = `${validator.name}-${index}`;
      expect(typeof map[key]).to.equal(
        "undefined",
        `duplicate symbol: ${index}`
      );
      map[key] = true;
    }
  });

  it("all logo links are valid", async () => {
    await defaultValidatorList.validators.map((validator) =>
      fetch(validator.logoURI).then((response) => {
        expect(response.status).to.equal(200);
      })
    );
  }, 30000);
});
