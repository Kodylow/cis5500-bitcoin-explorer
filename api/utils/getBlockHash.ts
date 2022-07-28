import pool from '../database/db';
import { QueryResult } from 'pg';

// helper function that returns maximum height of bitcoin blockchain (used in couple controllers)
const getCurrMaxBlock = async (height: Number) => {
  let maxblock_query = `
    SELECT
      hash
    FROM
      bitcoin.block_headers
    where height = ${height}
  `
  // get data for a specific block header
  let pgResult: QueryResult<any> = await pool.query(maxblock_query);
  let blockHash: any[] = pgResult.rows;

  return blockHash[0]['hash'];
}

export default getCurrMaxBlock;
