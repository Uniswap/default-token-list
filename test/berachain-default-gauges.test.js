const packageJson = require("../package.json");
const { expect } = require("chai");
const fetch = require("node-fetch");
const { getAddress } = require("@ethersproject/address");
const defaultGaugeList = require("../src/gauges/testnet/defaultGaugeList.json");

before(async function () {
  this.timeout(120000);
});

describe("gauge list test suite", () => {
  it("contains no duplicate addresses", () => {
    const map = {};
    for (let gauge of defaultGaugeList.gauges) {
      const key = gauge.address;
      expect(typeof map[key]).to.equal("undefined");
      map[key] = true;
    }
  });

  it("contains no duplicate names", () => {
    const map = {};
    for (let gauge of defaultGaugeList.gauges) {
      const key = gauge.name;
      expect(typeof map[key]).to.equal(
        "undefined",
        `duplicate name: ${gauge.name}`
      );
      map[key] = true;
    }
  });

  it("all addresses are valid and checksummed", () => {
    for (let gauge of defaultGaugeList.gauges) {
      expect(getAddress(gauge.address)).to.eq(gauge.address);
    }
  });

  it("all logo links are valid", async () => {
    await defaultGaugeList.gauges.map((gauge) =>
      fetch(gauge.logoURI).then((response) => {
        expect(response.status).to.equal(200);
      })
    );
  }, 30000);

  it("version matches package.json", () => {
    expect(packageJson.version).to.match(/^\d+\.\d+\.\d+$/);
    expect(packageJson.version).to.equal(
      `${defaultGaugeList.version.major}.${defaultGaugeList.version.minor}.${defaultGaugeList.version.patch}`
    );
  });
});
