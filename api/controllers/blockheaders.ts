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

// getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  // get some posts
  let result: AxiosResponse = await axios.get(
    `https://jsonplaceholder.typicode.com/posts`
  );
  let posts: [Post] = result.data;
  return res.status(200).json({
    message: posts,
  });
};

// getting a single block
const getBlock = async (req: Request, res: Response, next: NextFunction) => {
  // get the block hash from the req
  let id: string = String(req.params.id);

  // query to get blockheader data
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

export default { getPosts, getBlock, updatePost, deletePost, addPost };
