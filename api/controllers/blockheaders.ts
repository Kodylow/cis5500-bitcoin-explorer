import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import pool from '../database/db';
import { QueryResult } from 'pg';

// TODO: switch to BlockHeadersController

interface Post {
  userId: Number;
  id: Number;
  title: String;
  body: String;
}

// helper function that returns maximum height of bitcoin blockchain (used in couple controllers)
const currMaxBlock = async () => {
  let maxblock_query = `
    SELECT
      MAX(height) as height
    FROM
      bitcoin.blocks
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
const getBlocks = async (req: Request, res: Response, next: NextFunction) => {
  // Set default hstart parameter
  let maxCurrentBlockHeight: any[] = await currMaxBlock();
  let sHeightDefault: number = Number(maxCurrentBlockHeight[0]['height']);

  // Set query params
  let hend = Number(req.query.hend) || sHeightDefault; // If no hend - use the current max block height
  let hstart = Number(req.query.hstart) || hend - 25; // If no start - use hend - 25

  // query to get all block headers ordered by height desc
  // Using encode(hash, 'escape') allows to turn bytea into text:
    // \\x30303030303030303030303030303030303030383438386361636339323863353635366431333263353632353130623734633934626136316235363236366566
    // 00000000000000000008488cacc928c5656d132c562510b74c94ba61b56266ef
  // However, depending on how we are storing hash - this may not be needed
  const blockheader_query = `
    SELECT
      /*  hash is stored as bytea, escape turns it into a string instead of getting the hash as raw bytes */
      encode(hash, 'escape')::text AS hash
      , height
      , version
      /*  hash is stored as bytea, escape turns it into a string instead of getting the hash as raw bytes */
      , encode(prev_hash, 'escape')::text AS prev_hash
      , timestamp
      , bits
      , nonce
      , size
      , weight
      , num_tx
      , confirmations
    FROM
      bitcoin.blocks
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
  // using encode(hash, 'escape') allows to turn bytea into text:
    // \\x30303030303030303030303030303030303030383438386361636339323863353635366431333263353632353130623734633934626136316235363236366566
    // 00000000000000000008488cacc928c5656d132c562510b74c94ba61b56266ef
  const blockheader_query = `
  SELECT
    /*  hash is stored as bytea, escape turns it into a string instead of getting the hash as raw bytes */
    encode(hash, 'escape')::text AS hash
    , height
    , version
    /*  hash is stored as bytea, escape turns it into a string instead of getting the hash as raw bytes */
    , encode(prev_hash, 'escape')::text AS prev_hash
    , timestamp
    , bits
    , nonce
    , size
    , weight
    , num_tx
    , confirmations
  FROM
    bitcoin.blocks
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

// updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  // get the post id from the req.params
  let id: string = req.params.id;
  // get the data from req.body
  let title: string = req.body.title ?? null;
  let body: string = req.body.body ?? null;
  // update the post
  let response: AxiosResponse = await axios.put(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      ...(title && { title }),
      ...(body && { body }),
    }
  );
  // return response
  return res.status(200).json({
    message: response.data,
  });
};

// deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  // get the post id from req.params
  let id: string = req.params.id;
  // delete the post
  let response: AxiosResponse = await axios.delete(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  // return response
  return res.status(200).json({
    message: "post deleted successfully",
  });
};

// adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
  // get the data from req.body
  let title: string = req.body.title;
  let body: string = req.body.body;
  // add the post
  let response: AxiosResponse = await axios.post(
    `https://jsonplaceholder.typicode.com/posts`,
    {
      title,
      body,
    }
  );
  // return response
  return res.status(200).json({
    message: response.data,
  });
};

export default { getBlocks, getMaxBlockHeight, getBlock, updatePost, deletePost, addPost };
