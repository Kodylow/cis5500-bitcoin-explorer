import pool from '../database/db';
import { QueryResult } from 'pg';

// helper function that returns maximum height of bitcoin blockchain (used in couple controllers)
const getCurrMaxBlock = async () => {
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

export default getCurrMaxBlock;
