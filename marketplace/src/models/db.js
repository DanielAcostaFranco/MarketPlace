// Importing PG library
const { Pool } = require('pg');

// Load env files
require('dotenv').config();

// Create a new pool instance. Note for myself: The pool is the place where we
//  manage our connections to the database. It allows us to reuse connections and manage them efficiently.
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    }
})

// Export pool for others files or services to use
module.exports = pool;

