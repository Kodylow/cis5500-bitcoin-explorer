
import pg from 'pg';
import 'dotenv/config';

// Placeholder database - this has the basic data that I parsed playing around with bitcoin blockchain data
// Talk with the team about creating a new database?
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
