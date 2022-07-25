import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import pool from '../database/db';
import { QueryResult } from 'pg';
import getBlockHash from '../utils/getBlockHash';
import trace from '../utils/traceTx';

// Given a uxto - returns the vins associated with the given uxto
// With the query parameters it also takes in multiple uxtos (vouts) and returns associated vins
export const getTracedTxs = async (req: Request, res: Response, next: NextFunction) => {
  let id: string = String(req.params.id);
  let queryParams = req.query.vouts!;  // ['bb96c4db56d88ac077ea191b493357f3fc8b1e56eae2f9b53b23570f16064244:1', 'b41d54a2680f9f2e06271610cbce51d3c10f1d0d61ad6d95a693348b7405f553:1']
  let results;

  // Additional work to do:
  // 1. The specifc properties (naming of properties needs work)
  // 2. The data returned in vin
  if (queryParams) {
    // Test: http://localhost:5010/utxos/c3322d6cf29ffbf96908467bd22cc147d8a6a2949710f07f0c27da91b153954f:0?vouts=bb96c4db56d88ac077ea191b493357f3fc8b1e56eae2f9b53b23570f16064244:1&vouts=b41d54a2680f9f2e06271610cbce51d3c10f1d0d61ad6d95a693348b7405f553:1
    results = await trace.getUtxos(queryParams as String[]);
  } else {
    // Test: http://localhost:5010/utxos/c3322d6cf29ffbf96908467bd22cc147d8a6a2949710f07f0c27da91b153954f:0
    results = await trace.getUtxo(id);
  }

  return res.status(200).json({
    message: results
  })
};

// To do later - add a router and controller for whether a transaction was part of an exchange or unknown (i.e. timed out)

export default {
  getTracedTxs
};
