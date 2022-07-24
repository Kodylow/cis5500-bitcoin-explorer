import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import pool from '../database/db';
import { QueryResult } from 'pg';
import getBlockHash from '../utils/getBlockHash';
import trace from '../utils/traceTx';

// Trace the next set of transactions given a specific transaction id
export const getTracedTxs = async (req: Request, res: Response, next: NextFunction) => {
  let id: string = String(req.params.id);
  let results = await trace.bfsTxs(id);

  /*
    QA:
    1. Coinbase: https://blockstream.info/tx/1d8149eb8d8475b98113b5011cf70e0b7a4dccff71286d28b8b4b641f94f1e46?expand
    2. In block 700151 - it is used as vin of a tx: https://blockstream.info/tx/5944d4ff0e5620c7933c9a3c15c21f2dd33a6f8192a54109711a8a374a6bf1e3
    3. https://blockstream.info/tx/7d09a689bd03fd89c80ad94b9ea185b77ad5e99df0a5eed035a8a3cae25c7cc0 (block 705417)
  */

  return res.status(200).json({
    message: results
  })
};

export default {
  getTracedTxs
};
