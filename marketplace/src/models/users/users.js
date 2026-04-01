import pool from '../db.js';


async function getAllUsers() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
}

export { getAllUsers };