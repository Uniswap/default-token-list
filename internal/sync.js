const XLSX = require("xlsx");

const { Octokit } = require("@octokit/rest");

const octokit = new Octokit();

const { ChainId } = require("@sushiswap/core-sdk");

const fs = require("fs");

const { resolve } = require("path");

const NAME = {
  [ChainId.ARBITRUM]: "arbitrum",
  [ChainId.AVALANCHE]: "avalanche",
  [ChainId.AVALANCHE_TESTNET]: "fuji",
  [ChainId.BSC]: "bsc",
  [ChainId.BSC_TESTNET]: "bsc-testnet",
  [ChainId.ETHEREUM]: "mainnet",
  [ChainId.CELO]: "celo",
  // [ChainId.CLOVER]: "clover",
  [ChainId.FANTOM]: "fantom",
  [ChainId.AVALANCHE_TESTNET]: "fuji",
  [ChainId.FUSE]: "fuse",
  [ChainId.GÖRLI]: "gorli",
  [ChainId.HARMONY]: "harmony",
  [ChainId.HARMONY_TESTNET]: "harmony-testnet",
  [ChainId.HECO]: "heco",
  [ChainId.HECO_TESTNET]: "heco-testnet",
  [ChainId.KOVAN]: "kovan",
  [ChainId.MATIC]: "matic",
  [ChainId.MATIC_TESTNET]: "matic-testnet",
  [ChainId.MOONRIVER]: "moonriver",
  [ChainId.MOONBEAM_TESTNET]: "moonbase",
  [ChainId.OKEX]: "okex",
  [ChainId.OKEX]: "okex-testnet",
  [ChainId.PALM]: "palm",
  [ChainId.RINKEBY]: "rinkeby",
  [ChainId.ROPSTEN]: "ropsten",
  [ChainId.TELOS]: "telos",
  [ChainId.XDAI]: "xdai",
  [ChainId.MOONBEAM]: "moonbeam",
};

(async () => {
  try {
    const book = XLSX.utils.book_new();

    for (const key of Object.keys(ChainId)) {
      const path = resolve(__dirname, `../tokens/${NAME[key]}.json`);

      if (!fs.existsSync(path)) {
        continue;
      }

      const tokens = require(path);

      // Grab file file names of the sushiswap/icons repo at the token path
      // we can use this to see if our default list is missing icons
      const { data } = await octokit.rest.repos.getContent({
        owner: "sushiswap",
        repo: "icons",
        path: "token",
      });

      const icons = data.map((data) => data.name.replace(".jpg", ""));

      const json = [];

      for (const token of tokens) {
        const listIcon = icons.find(
          (icon) => icon === token.symbol.toLowerCase()
        );

        // TODO: Check Figma and get icon if available
        const figmaIcon = undefined;

        const icon = listIcon || figmaIcon;

        if ((!token.logoURI && !icon) || !icon) {
          json.push({
            network: NAME[key],
            address: token.address,
            name: token.name,
            symbol: token.symbol,
            logoURI: token?.logoURI || "",
          });
          console.log("Add to list to send to chester");
          continue;
        }

        // Check if logoURI has correct path
        if (!token.logoURI.includes("sushiswap/icons")) {
          // TODO: Automate this part...
          const logoURI = `https://raw.githubusercontent.com/sushiswap/icons/master/token/${icon}.jpg`;

          console.log(`Update Logo URI for ${token.symbol} with ${logoURI}`);
        } else {
          console.log(`Logo URI for ${token.symbol} is correct`);
        }
      }

      const sheet = XLSX.utils.json_to_sheet(json);

      XLSX.utils.book_append_sheet(book, sheet, NAME[key]);
    }

    XLSX.writeFile(book, resolve(__dirname, `../generated/missing-icons.xlsx`));
  } catch (error) {
    console.error(error);
  }
})();
