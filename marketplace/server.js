
// ================================
// Imports of modules and configuration
// ================================

const express = require('express')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const path = require('path')
require('dotenv').config()

const pool = require('./src/models/db')
const { setupDatabase, testConnection } = require('./src/models/setup')

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

// Global variables 
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn || false
    res.locals.user = req.session.user || null
    res.locals.successMessage = req.session.successMessage || null
    res.locals.errorMessage = req.session.errorMessage || null
    // Clear messages after they've been displayed
    delete req.session.successMessage
    delete req.session.errorMessage
    next()
})



// ================================
// Routes 
// ================================
app.use('/', require('./src/controllers/routes'))


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