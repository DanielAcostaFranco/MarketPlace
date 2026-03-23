const express = require('express');
const router = express.Router();

//Home Page 
router.get('/', (req, res) => {
    res.render('home');
})

// Registration Page

const { showRegistrationForm, handleRegistration } = require('./forms/registration');
router.get('/register', showRegistrationForm)
router.post('/register', handleRegistration)

// Login Page
const { showLoginForm, handleLogin, handleLogout } = require('./forms/login');
router.get('/login', showLoginForm)
router.post('/login', handleLogin)
router.get('/logout', handleLogout)

// Products Page 

const { showProducts } = require('./products/products');
router.get('/products', showProducts)

// Detail Page 

const { showProductDetail } = require('./products/detail');
router.get('/products/:id', showProductDetail)

module.exports = router;