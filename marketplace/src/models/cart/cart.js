import pool from '../db.js';

async function getCartByUser(userId) {
    const result = await pool.query(
        `SELECT cart.id, products.id AS product_id,
         products.name, products.price, products.image_url
         FROM cart JOIN products ON cart.product_id = products.id
         WHERE cart.user_id = $1`,
        [userId]
    );
    return result.rows;
}

async function addToCart(userId, productId) {
    await pool.query(
        'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, 1)',
        [userId, productId]
    );
}

async function removeFromCart(cartId, userId) {
    await pool.query(
        'DELETE FROM cart WHERE id = $1 AND user_id = $2',
        [cartId, userId]
    );
}

export { getCartByUser, addToCart, removeFromCart };
