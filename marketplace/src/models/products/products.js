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

async function getProductById(id) {
    const result = await pool.query(
        'SELECT * FROM products WHERE id=$1',
        [id]);
    return result.rows[0];
}

async function updateProduct(id, name, description, price, category, image_url) {
    await pool.query(
        'UPDATE products SET name=$1, description=$2, price=$3, category=$4, image_url=$5 WHERE id=$6',
        [name, description, price, category, image_url, id]
    );
}


export { getAllProducts, deleteProduct, createProduct, getProductById, updateProduct };