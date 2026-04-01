import pool from '../db.js';

async function getOrdersByUser(userId) {
    const result = await pool.query(
        'SELECT * FROM orders WHERE buyer_id = $1 ORDER BY created_at DESC',
        [userId]
    );
    return result.rows;
}

async function createOrder(userId, total) {
    const result = await pool.query(
        `INSERT into orders (buyer_id, total, status) VALUES ($1, $2, 'pending') RETURNING *`,
        [userId, total]
    );
    return result.rows[0];
}

async function clearCart(userId) {
    const result = await pool.query(
        `DELETE FROM cart WHERE user_id = $1`,
        [userId]
    );
    return result;
}

async function getAllOrders() {
    const result = await pool.query(
        `SELECT orders.id, orders.total, orders.status, orders.created_at, users.username
        FROM orders
        JOIN users ON orders.buyer_id = users.id
        ORDER BY orders.created_at DESC`
    );
    return result.rows;
}

async function updateOrderStatus(orderId, status) {
    await pool.query(
        'UPDATE orders SET status = $1 WHERE id =$2',
        [status, orderId]
    );
}


export { getOrdersByUser, createOrder, clearCart, getAllOrders, updateOrderStatus };