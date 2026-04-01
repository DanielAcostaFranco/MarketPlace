import pool from '../db.js';

async function getAllProducts() {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
}

async function deleteProduct(id) {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
}

export { getAllProducts, deleteProduct };