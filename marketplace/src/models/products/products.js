const pool = require('../db');

async function getAllProducts() {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
}

module.exports = { getAllProducts };