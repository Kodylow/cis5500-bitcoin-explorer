import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import pool from '../database/db';
import { QueryResult } from 'pg';

// TODO: switch to BlockHeadersController

// helper function that returns maximum height of bitcoin blockchain (used in couple controllers)
const currMaxBlock = async () => {
  let maxblock_query = `
    SELECT
      MAX(height) as height
    FROM
      bitcoin.block_headers
  `
  // get data for a specific block header
  let pgResult: QueryResult<any> = await pool.query(maxblock_query);
  let blockHeight: any[] = pgResult.rows;

  return blockHeight;
}

// get maximum block height of bitcoin blockchain
const getMaxBlockHeight = async (req: Request, res: Response, next: NextFunction) => {
  let maxCurrentBlockHeight: any[] = await currMaxBlock();

  return res.status(200).json({
    message: maxCurrentBlockHeight,
  });
}

// getting multiple blockheaders given a starting and ending block height
// Providing only hstart will give the next 25 blocks from hstart
// Providing only hend will give the prev 25 blocks from hend
const getBlocks = async (req: Request, res: Response, next: NextFunction) => {
  // Set default hstart parameter
  let maxCurrentBlockHeight: any[] = await currMaxBlock();
  let sHeightDefault: number = Number(maxCurrentBlockHeight[0]['height']);

  // Set query params
  let hend = Number(req.query.hend); // If no hend - use the current max block height
  let hstart = Number(req.query.hstart);

  // To avoid pull hundreds of thousands of blocks if start begins at 0 with no hend query parameter
  if (Number.isInteger(hstart) && Number.isNaN(hend)) {
    hend = hstart + 25;
  } else if (Number.isNaN(hend) && Number.isNaN(hstart)) {
    hend = sHeightDefault;
  }

  if (Number.isNaN(hstart)) {
    hstart = hend - 25;
  };

  // query to get all block headers ordered by height desc
  const blockheader_query = `
    SELECT
      hash AS hash
      , height
      , version
      , prev_block_hash AS prev_hash
      , timestamp
      , bits
      , nonce
      , size
      , weight
      , num_tx
      , confirmations
    FROM
      bitcoin.block_headers
    WHERE
      height BETWEEN ${hstart} AND ${hend}
    ORDER BY height DESC
  `;

  // get data for a specific block header
  let pgResult: QueryResult<any> = await pool.query(blockheader_query);
  let blockHeaders: any[] = pgResult.rows;

  return res.status(200).json({
    message: blockHeaders,
  });
};

// getting a single block
const getBlock = async (req: Request, res: Response, next: NextFunction) => {
  // get the block hash from the req
  let id: string = String(req.params.id);

  // query to get blockheader data
  const blockheader_query = `
  SELECT
    hash AS hash
    , height
    , version
    , prev_block_hash AS prev_hash
    , timestamp
    , bits
    , nonce
    , size
    , weight
    , num_tx
    , confirmations
  FROM
    bitcoin.block_headers
  WHERE
    hash = '${id}'
  `;

  // get data for a specific block header
  let pgResult: QueryResult<any> = await pool.query(blockheader_query);
  let blockHeaderData: any[] = pgResult.rows;

  return res.status(200).json({
    message: blockHeaderData,
  });
};

// getting a single block
const getBlockTxs = async (req: Request, res: Response, next: NextFunction) => {
  // get the block hash from the req
  let id: string = String(req.params.id);

  // query to get blockheader data
  let txidsResponse: AxiosResponse = await axios.get(
    `https://blockstream.info/api/block/${id}/txids`
  );
  let txids: any = txidsResponse.data;

  return res.status(200).json({
    message: txids,
  });
};


export default { getBlocks, getMaxBlockHeight, getBlock, getBlockTxs };
