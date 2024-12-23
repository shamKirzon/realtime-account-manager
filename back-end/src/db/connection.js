import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "realtime_account_manager",
  password: "ymmahs13",
  port: 5432,
});

export default pool;
