import pool from '../db.js';


async function getAllUsers() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
}

async function updateUserRole(userId, role) {
    await pool.query(
        'UPDATE users SET role =$1 WHERE id=$2',
        [role, userId]
    );
}

async function deleteUser(userId) {
    await pool.query(
        'DELETE FROM users WHERE id=$1',
        [userId]
    );
}


export { getAllUsers, updateUserRole, deleteUser };