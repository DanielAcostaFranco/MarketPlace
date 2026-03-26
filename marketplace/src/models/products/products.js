import pool from '../db.js';

async function getAllProducts() {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
}

export { getAllProducts };