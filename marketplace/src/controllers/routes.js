const express = require('express');
const router = express.Router();

//Home Page 
router.get('/', (req, res) => {
    res.render('home');
})

const { showRegistrationForm, handleRegistration } = require('./forms/registration');
router.get('/register', showRegistrationForm)
router.post('/register', handleRegistration)

const { showLoginForm, handleLogin, handleLogout } = require('./forms/login');
router.get('/login', showLoginForm)
router.post('/login', handleLogin)
router.get('/logout', handleLogout)

module.exports = router;