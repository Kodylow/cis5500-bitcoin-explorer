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
      , sum(bh.num_tx) as "value"
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

export const getBTCMinedOverTime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // query to get all coinbase header info ordered by block height height desc
  const txs_over_time_query = `
    with btc_mined_pre as (
      select txid
        , block_hash
        , cast(element -> 'value' as bigint) / cast(100000000 as bigint) as coinbase_btc_amount
      from
        bitcoin.coinbase_txs
        , jsonb_array_elements(outputs) element
    ), btc_mined as (
      select
        date_trunc('month', bh.timestamp::date) as "date"
        , sum(btc.coinbase_btc_amount) as "btc_mined"
      from
        btc_mined_pre as btc
        inner join bitcoin.block_headers AS bh on btc.block_hash = bh.hash
      group by 1
    ), btc_mined_cumulative as (
        select
            "date"
            , sum(btc_mined) OVER (order by "date" asc) as value
        from btc_mined order by 1 asc
    )
    select * from btc_mined_cumulative
    where date BETWEEN '2015-01-01' AND '2022-08-01'
  `;

  // get data for a specific block header
  let pgResult: QueryResult<any> = await pool.query(txs_over_time_query);
  let txsOverTime: any[] = pgResult.rows;

  return res.status(200).json({
    message: txsOverTime,
  });
};

export const getDifficultyDataByMonth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // query to get difficulty by month
  // divided by trillion (the size of difficulty is too large to display unless divided here)
  const difficulty_over_time_query = `
    select
      date_trunc('month', bh.timestamp::date)::date as "date"
      , sum(bh.difficulty) / 1000000000000 as "value"
    from
      bitcoin.block_headers AS bh
    WHERE
      bh.timestamp BETWEEN '2015-01-01' AND '2022-08-01'
    group by 1 order by 1 asc;
  `;

  // get data for a specific block header
  let pgResult: QueryResult<any> = await pool.query(difficulty_over_time_query);
  let difficultyData: any[] = pgResult.rows;

  return res.status(200).json({
    message: difficultyData,
  });
};



export default {
  getTxsOverTime,
  getBTCMinedOverTime,
  getDifficultyDataByMonth
}
