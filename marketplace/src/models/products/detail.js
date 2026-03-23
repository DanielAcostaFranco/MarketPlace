const pool = require('../db');

async function getProductDetail(id) {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
}

module.exports = { getProductDetail };