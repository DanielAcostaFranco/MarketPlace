// Users model 

import pool from '../db.js';

// Get all users
async function getAllUsers() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
}

// Change a user's role
async function updateUserRole(userId, role) {
    await pool.query(
        'UPDATE users SET role =$1 WHERE id=$2',
        [role, userId]
    );
}

// Delete a user by id
async function deleteUser(userId) {
    await pool.query(
        'DELETE FROM users WHERE id=$1',
        [userId]
    );
}

export { getAllUsers, updateUserRole, deleteUser };
