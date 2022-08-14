import { Request, Response, NextFunction } from "express";
import pool from "../database/db";
import { QueryResult } from "pg";
import getCurrMaxBlock from "../utils/getCurrMaxHeight";

// Get multiple coinbase transactions given a starting and ending block height
// Providing only hstart will give the next 25 transactions from hstart
// Providing only hend will give the prev 25 transactions from hend
export const getCoinbaseTxs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Set default hstart parameter
  let maxCurrentBlockHeight: any[] = await getCurrMaxBlock();
  let sHeightDefault: number = Number(maxCurrentBlockHeight[0]["height"]);

  // Set query params
  let hend = Number(req.query.hend); // If no hend - use the current max block height
  let hstart = Number(req.query.hstart);

  // To avoid pulling hundreds of thousands of coinbase txs if start begins at 0 with no hend query parameter
  if (Number.isInteger(hstart) && Number.isNaN(hend)) {
    hend = hstart + 25;
  } else if (Number.isNaN(hend) && Number.isNaN(hstart)) {
    hend = sHeightDefault;
  }

  if (Number.isNaN(hstart)) {
    hstart = hend - 25;
  }

  // query to get all coinbase header info ordered by block height height desc
  const coinbase_query = `
    SELECT
      ct.txid
      , ct.version
      , ct.locktime
      , ct.size
      , ct.weight
      , ct.weight
    FROM
      bitcoin.coinbase_txs as ct
      inner join bitcoin.block_headers as bh on ct.block_hash = bh.hash
    WHERE
      bh.height BETWEEN ${hstart} AND ${hend}
    ORDER BY bh.height DESC
  `;

  console.log(coinbase_query);

  // get data for a specific block header
  let pgResult: QueryResult<any> = await pool.query(coinbase_query);
  let coinbaseData: any[] = pgResult.rows;

  return res.status(200).json({
    message: coinbaseData,
  });
};

// getting a single coinbase tx with details (i.e. outputs)
const getCoinbaseTx = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get the block hash from the req
  let id: string = String(req.params.id);

  // query to get specific coinbase tx by txid
  const coinbase_query = `
    SELECT
      ct.*
    FROM
      bitcoin.coinbase_txs as ct
    WHERE
      txid = '${id}'
  `;

  // get data for a specific coinbase tx
  let pgResult: QueryResult<any> = await pool.query(coinbase_query);
  let coinbaseData: any[] = pgResult.rows;

  return res.status(200).json({
    message: coinbaseData,
  });
};

const getCoinbaseTxByBlockHeight = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get the blockheight from the req
  let blockheight: number = Number(req.params.blockheight);

  // query to get coinbase TX data
  const coinbase_query = `
    SELECT
      ct.*
    FROM
      bitcoin.coinbase_txs as ct
    JOIN bitcoin.block_headers as bh ON ct.block_hash = bh.hash
    WHERE
      bh.height = ${blockheight}
  `;

  return res.status(200).json({
    message: coinbase_query,
  });
};

export default {
  getCoinbaseTxs,
  getCoinbaseTx,
  getCoinbaseTxByBlockHeight,
};
