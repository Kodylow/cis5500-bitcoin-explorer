
import pg from 'pg';
import 'dotenv/config';

const pool = new pg.Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: Number(process.env.port),
  ssl: {
    rejectUnauthorized: false,
  }
});

export default pool;
