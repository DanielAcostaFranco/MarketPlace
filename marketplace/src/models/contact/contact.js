// Contact model 

import pool from '../db.js';

// Save a new contact message
async function createContactMessage(userId, reason, message) {
    await pool.query(
        'INSERT INTO contact_messages (user_id, reason, message) VALUES ($1, $2, $3)',
        [userId, reason, message]
    );
}

// Get all messages for a user
async function getContactMessagesByUser(userId) {
    const result = await pool.query(
        'SELECT * FROM contact_messages WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
    );
    return result.rows;
}

// Get all messages 
async function getAllContactMessages() {
    const result = await pool.query(
        `SELECT contact_messages.*, users.username
        FROM contact_messages
        JOIN users ON contact_messages.user_id = users.id
        ORDER BY contact_messages.created_at DESC`
    );
    return result.rows;
}

// Update status
async function updateContactMessage(id, status, notes) {
    await pool.query(
        'UPDATE contact_messages SET status = $1, notes = $2 WHERE id = $3',
        [status, notes, id]
    );
}

export { createContactMessage, getContactMessagesByUser, getAllContactMessages, updateContactMessage };
