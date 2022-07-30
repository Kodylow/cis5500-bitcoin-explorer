import { Request, Response, NextFunction } from "express";
import pool from "../database/db";
import { QueryResult } from "pg";


export const getTxsOverTime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // query to get all coinbase header info ordered by block height height desc
  const txs_over_time_query = `
    select
      date_trunc('month', bh.timestamp::date)::date as "date"
      , sum(bh.num_tx) as "num_of_txs"
    from
      bitcoin.block_headers AS bh
    WHERE
      bh.timestamp BETWEEN '2020-01-01' AND '2022-08-01'
    group by 1 order by 1 asc;
  `;

  // get data for a specific block header
  let pgResult: QueryResult<any> = await pool.query(txs_over_time_query);
  let txsOverTime: any[] = pgResult.rows;

  return res.status(200).json({
    message: txsOverTime,
  });
};

export default {
  getTxsOverTime
}
