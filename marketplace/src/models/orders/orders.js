import pool from '../db.js';

async function getOrdersByUser(userId) {
    const result = await pool.query(
        'SELECT * FROM orders WHERE buyer_id = $1 ORDER BY created_at DESC',
        [userId]
    );
    return result.rows;
}


export { getOrdersByUser };