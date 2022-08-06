import { Request, Response, NextFunction } from "express";
import pool from "../database/db";
import { QueryResult } from "pg";


export const getTxsOverTime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  let { startDate, endDate } = req.query;

  // query to get all coinbase header info ordered by block height height desc
  const txs_over_time_query = `
    select
      date_trunc('month', bh.timestamp::date)::date as "date"
      , sum(bh.num_tx) as "value"
    from
      bitcoin.block_headers AS bh
    WHERE
      bh.timestamp BETWEEN '${startDate}'  AND '${endDate}'
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

  let { startDate, endDate } = req.query;

  // query to get all coinbase header info ordered by block height height desc
  const btc_mined_query = `
    with btc_mined as (
      select
        date_trunc('year', bh.timestamp::date) as "date"
        , sum(ct.btc_mined) as btc_mined
      from
        bitcoin.coinbase_txs as ct
        inner join bitcoin.block_headers as bh on ct.block_hash = bh.hash
      group by 1
    ), btc_mined_cumulative as (
        select
            "date"
            , sum(btc_mined) OVER (order by "date" asc) as value
        from btc_mined order by 1 asc
    )
    select * from btc_mined_cumulative
    where date BETWEEN '${startDate}'  AND '${endDate}';

  `;

  // get data for a specific block header
  let pgResult: QueryResult<any> = await pool.query(btc_mined_query);
  let btcMined: any[] = pgResult.rows;

  return res.status(200).json({
    message: btcMined,
  });
};

export const getDifficultyDataByMonth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { startDate, endDate } = req.query;

  // query to get difficulty by month
  // divided by trillion (the size of difficulty is too large to display unless divided here)
  const difficulty_over_time_query = `
    select
      date_trunc('month', bh.timestamp::date)::date as "date"
      , sum(bh.difficulty) / 1000000000000 as "value"
    from
      bitcoin.block_headers AS bh
    WHERE
      bh.timestamp BETWEEN '${startDate}'  AND '${endDate}'
    group by 1 order by 1 asc;
  `;

  // get data for a specific block header
  let pgResult: QueryResult<any> = await pool.query(difficulty_over_time_query);
  let difficultyData: any[] = pgResult.rows;

  return res.status(200).json({
    message: difficultyData,
  });
};

export const getAvgWeight = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { startDate, endDate } = req.query;

  // query to get avg weight
  const avg_weight_query = `
    select
      ROUND(avg(bh.weight)) as "value"
    from
      bitcoin.block_headers AS bh
    WHERE
      bh.timestamp BETWEEN '${startDate}'  AND '${endDate}'
  `;

  let pgResult: QueryResult<any> = await pool.query(avg_weight_query);
  let avgWeightData: any[] = pgResult.rows;

  return res.status(200).json({
    message: avgWeightData,
  });
};

export const getAvgTxs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { startDate, endDate } = req.query;

  // query to get average transactions
  const avg_txs_query = `
    select
      ROUND(avg(bh.num_tx)) as "value"
    from
      bitcoin.block_headers AS bh
    WHERE
      bh.timestamp BETWEEN '${startDate}'  AND '${endDate}'
  `;

  let pgResult: QueryResult<any> = await pool.query(avg_txs_query);
  let avgTxData: any[] = pgResult.rows;

  return res.status(200).json({
    message: avgTxData,
  });
};

export const getAvgDifficulty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { startDate, endDate } = req.query;

  // query to get avg difficulty given a time range
  // divided by trillion (the size of difficulty is too large to display unless divided here)
  const avg_difficulty_query = `
    select
      ROUND(avg(bh.difficulty) / 1000000000000)  as "value"
    from
      bitcoin.block_headers AS bh
    WHERE
      bh.timestamp BETWEEN '${startDate}'  AND '${endDate}'
  `;

  let pgResult: QueryResult<any> = await pool.query(avg_difficulty_query);
  let avgDifficultyData: any[] = pgResult.rows;

  return res.status(200).json({
    message: avgDifficultyData,
  });
};



export default {
  getTxsOverTime,
  getBTCMinedOverTime,
  getDifficultyDataByMonth,
  getAvgWeight,
  getAvgTxs,
  getAvgDifficulty
}
