import pool from '../db.js';

async function getAllProducts() {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
}

async function deleteProduct(id) {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
}

async function createProduct(name, description, price, category, image_url) {
    await pool.query(
        'INSERT INTO products (name, description, price, category, image_url) VALUES ($1, $2, $3, $4, $5)',
        [name, description, price, category, image_url]
    );
}

export { getAllProducts, deleteProduct, createProduct };