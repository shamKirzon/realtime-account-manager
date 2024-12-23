import pool from "../db/connection.js";

async function createAccountRepository(username, password) {
  const created_at = new Date();
  const updated_at = new Date();
  const query =
    "INSERT INTO users (username, password, created_at, updated_at) VALUES($1, $2, $3, $4) RETURNING * ";
  const values = [username, password, created_at, updated_at];
  const result = await pool.query(query, values);

  // retrieve from database:
  const {
    id,
    username: createdUsername,
    password: createdPassword,
  } = result.rows[0];

  return {
    id,
    username: createdUsername,
    password: createdPassword,
  };
}

export default createAccountRepository;
