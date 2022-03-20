import { request, gql } from "graphql-request";
import { ChainId } from "@sushiswap/core-sdk";
import XLSX from "xlsx";
import { readFileSync } from "fs";

const THE_GRAPH = "https://api.thegraph.com";
const HYPER_GRAPH = "https://q.hg.network";

export const GRAPH_HOST: Partial<Record<ChainId, string>> = {
  [ChainId.ETHEREUM]: THE_GRAPH,
  [ChainId.XDAI]: THE_GRAPH,
  [ChainId.MATIC]: THE_GRAPH,
  [ChainId.FANTOM]: THE_GRAPH,
  [ChainId.BSC]: THE_GRAPH,
  [ChainId.AVALANCHE]: THE_GRAPH,
  [ChainId.CELO]: THE_GRAPH,
  [ChainId.ARBITRUM]: THE_GRAPH,
  [ChainId.HARMONY]: "https://sushi.graph.t.hmny.io",
  [ChainId.OKEX]: HYPER_GRAPH,
  [ChainId.HECO]: HYPER_GRAPH,
  [ChainId.MOONRIVER]: THE_GRAPH,
  [ChainId.TELOS]: THE_GRAPH,
  [ChainId.KOVAN]: THE_GRAPH,
  [ChainId.FUSE]: THE_GRAPH,
  [ChainId.MOONBEAM]: THE_GRAPH,
};

export const BLOCKS: Partial<Record<ChainId, string>> = {
  [ChainId.ETHEREUM]: "blocklytics/ethereum-blocks",
  [ChainId.XDAI]: "matthewlilley/xdai-blocks",
  [ChainId.MATIC]: "matthewlilley/polygon-blocks",
  [ChainId.FANTOM]: "matthewlilley/fantom-blocks",
  [ChainId.BSC]: "matthewlilley/bsc-blocks",
  [ChainId.HARMONY]: "sushiswap/harmony-blocks",
  [ChainId.AVALANCHE]: "matthewlilley/avalanche-blocks",
  [ChainId.CELO]: "ubeswap/celo-blocks",
  [ChainId.ARBITRUM]: "sushiswap/arbitrum-blocks",
  [ChainId.OKEX]: "okexchain-blocks/oec",
  [ChainId.HECO]: "hecoblocks/heco",
  [ChainId.MOONRIVER]: "sushiswap/moonriver-blocks",
  [ChainId.FUSE]: "sushiswap/fuse-blocks",
  [ChainId.KOVAN]: "blocklytics/kovan-blocks",
  [ChainId.MOONBEAM]: "sushiswap/moonbeam-blocks",
};

export const EXCHANGE: Partial<Record<ChainId, string>> = {
  [ChainId.ETHEREUM]: "sushiswap/exchange",
  [ChainId.XDAI]: "sushiswap/xdai-exchange",
  [ChainId.MATIC]: "sushiswap/matic-exchange",
  [ChainId.FANTOM]: "sushiswap/fantom-exchange",
  [ChainId.BSC]: "sushiswap/bsc-exchange",
  [ChainId.HARMONY]: "sushiswap/harmony-exchange",
  [ChainId.AVALANCHE]: "sushiswap/avalanche-exchange",
  [ChainId.CELO]: "jiro-ono/sushitestsubgraph",
  [ChainId.ARBITRUM]: "sushiswap/arbitrum-exchange",
  [ChainId.MOONRIVER]: "sushiswap/moonriver-exchange",
  [ChainId.FUSE]: "sushiswap/fuse-exchange",
  [ChainId.MOONBEAM]: "sushiswap/moonbeam-exchange",
};

const blockQuery = gql`
  query blockQuery(
    $where: Block_filter
    $orderBy: Block_orderBy! = "timestamp"
    $orderDirection: OrderDirection! = "desc"
  ) {
    blocks(
      first: 1
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      number
    }
  }
`;

const tokenVolumesQuery = gql`
  query volumeQuery($tokens: [String]!, $block: Block_height) {
    tokens(first: 1000, where: { id_in: $tokens }, block: $block) {
      id
      volumeUSD
      symbol
    }
  }
`;

main();

async function main() {
  const workbook = XLSX.utils.book_new();

  for (const chainId of Object.keys(EXCHANGE) as unknown as ChainId[]) {
    try {
      const tokenList: { address: string }[] = (function () {
        let chain = ChainId[chainId].toLowerCase();
        chain = chain === "ethereum" ? "mainnet" : chain;
        return JSON.parse(
          readFileSync(`./tokens/${chain}.json`, { encoding: "utf-8" })
        );
      })();

      const tokenAddresses = tokenList.reduce(
        (acc, cur) => [...acc, cur.address.toLowerCase()],
        [] as string[]
      );

      const blockUrl = `${GRAPH_HOST[chainId]}/subgraphs/name/${BLOCKS[chainId]}`;
      const exchangeUrl = `${GRAPH_HOST[chainId]}/subgraphs/name/${EXCHANGE[chainId]}`;
      const block30d = Number(
        (
          await request(blockUrl, blockQuery, {
            where: { timestamp_lt: Math.floor(Date.now() / 1000) - 86400 * 30 },
          })
        ).blocks[0].number
      );
      const { tokens } = await request(exchangeUrl, tokenVolumesQuery, {
        tokens: tokenAddresses,
      });
      const { tokens: tokens30d } = await request(
        exchangeUrl,
        tokenVolumesQuery,
        {
          tokens: tokenAddresses,
          block: { number: block30d },
        }
      );

      const formatted = tokens30d
        .map((token30d: any) => {
          const token = tokens.find((token: any) => token.id === token30d.id);

          return {
            symbol: token.symbol,
            volume30d: token.volumeUSD - token30d.volumeUSD,
          };
        })
        .sort((a: any, b: any) => b.volume30d - a.volume30d)
        .map((token: any) => ({
          Token: token.symbol,
          "Volume 30d": Number(token.volume30d.toFixed(2)).toLocaleString(
            undefined,
            { style: "currency", currency: "USD" }
          ),
        }));

      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.json_to_sheet(formatted),
        ChainId[chainId]
      );
    } catch {}
  }

  XLSX.writeFile(workbook, "volumes.xlsx");
}
