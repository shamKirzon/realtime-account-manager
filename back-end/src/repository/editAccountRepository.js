import pool from "../db/connection.js";

async function editAccountRepository(id, username, password) {
  const query = `UPDATE users
                    SET username = $1, password = $2
                    WHERE id = $3 `;
  const values = [username, password, id];

  try {
    const result = await pool.query(query, values);
    return result;
  } catch (err) {
    throw new Error("error in updating account" + err.message);
  }
}

export default editAccountRepository;
