import pool from '../db.js';
import bcrypt from 'bcryptjs';

// Check if email exists in the database
async function findUserByEmail(email) {
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    )
    return result.rows[0];
}

// Check if username exists in the database
async function findUserByUsername(username) {
    const result = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
    )
    return result.rows[0];
}

// Save the new user in the database
async function createUser(username, email, password, role = 'buyer') {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        `INSERT INTO users (username, email, password_hash, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, username, email, role`,
        [username, email, hashedPassword, role]
    )
    return result.rows[0];
}

export { findUserByEmail, findUserByUsername, createUser };
