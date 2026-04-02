import pool from '../db.js';

async function getReviewsByProductId(productId) {
    const result = await pool.query(
        'SELECT r.*, u.username FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.product_id = $1 ORDER BY r.created_at DESC',
        [productId]
    );
    return result.rows;
}

async function createReview(productId, userId, rating, comment) {
    const result = await pool.query(
        `INSERT INTO reviews (product_id, user_id, rating, comment)
         VALUES ($1, $2, $3, $4)
        RETURNING id, product_id, user_id, rating, comment, created_at`,
        [productId, userId, rating, comment]
    );
    return result.rows[0];
}

async function deleteReview(reviewId) {
    await pool.query('DELETE FROM reviews WHERE id = $1', [reviewId]);
}

async function getReviewById(reviewId) {
    const result = await pool.query('SELECT * FROM reviews WHERE id = $1', [reviewId]);
    return result.rows[0];
}

async function updateReview(reviewId, userId, rating, comment) {
    await pool.query(
        'UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 AND user_id = $4',
        [rating, comment, reviewId, userId]
    );
}

export { getReviewsByProductId, createReview, deleteReview, getReviewById, updateReview };

