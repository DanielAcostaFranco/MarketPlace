
// ================================
// Imports of modules and configuration
// ================================

import express from 'express'
import session from 'express-session'
import connectPgSimple from 'connect-pg-simple'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'
import flash from './src/middleware/flash.js'


import pool from './src/models/db.js'
import { setupDatabase, testConnection } from './src/models/setup.js'
import router from './src/controllers/routes.js'

const pgSession = connectPgSimple(session)

// ESM replacement for __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// App initialization
const app = express()
const PORT = process.env.PORT || 3000

// EJS setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src', 'views'))

// ================================
// Middleware
// ================================

// Static files, CSS, JS, images, etc.
app.use(express.static(path.join(__dirname, 'public')))
// Read data from forms
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Session management with PostgreSQL (remember who has logged in)
app.use(session({
    store: new pgSession({
        pool: pool,                // Connection pool
        tableName: 'session'       // Table to store sessions
    }),
    secret: process.env.SESSION_SECRET, // Secret key for signing the session ID cookie
    resave: false,              // Don't save session if unmodified
    saveUninitialized: false,   // Don't create session until something stored
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // Session expires in 30 days
}))

// ================================
// Flash Messages
// ================================
app.use(flash);

// Global variables
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn || false
    res.locals.user = req.session.user || null
    next()
})




// ================================
// Routes
// ================================
app.use('/', router)


// ================================
// Error Handling
// ================================

app.use((req, res) => {
    res.status(404).render('errors/404')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.locals.isLoggedIn = res.locals.isLoggedIn || false
    res.locals.user = res.locals.user || null
    res.locals.successMessage = null
    res.locals.errorMessage = null
    res.status(500).render('errors/500')
})
// ================================
// Start the server
// ================================
async function startServer() {
    await testConnection()
    await setupDatabase()

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
        console.log(`Enter here http://localhost:${PORT} to view the application`)
    })
}

startServer()
