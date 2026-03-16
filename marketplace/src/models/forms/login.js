const pool = require('../db');
const bcrypt = require('bcryptjs');

// Find user by email and passwod
async function loginUser(email, password) {
    //Find user by email
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    )
    const user = result.rows[0];

    if (!user) {
        return null;
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        return null;
    }

    return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    }
}

module.exports = { loginUser };