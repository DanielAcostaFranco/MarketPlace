import express from 'express';
import { showRegistrationForm, handleRegistration } from './forms/registration.js';
import { showLoginForm, handleLogin, handleLogout } from './forms/login.js';
import { showProducts } from './products/products.js';
import { showProductDetail } from './products/detail.js';

const router = express.Router();

// Home Page
router.get('/', (req, res) => {
    res.render('home');
})

// Registration Page
router.get('/register', showRegistrationForm)
router.post('/register', handleRegistration)

// Login Page
router.get('/login', showLoginForm)
router.post('/login', handleLogin)
router.get('/logout', handleLogout)

// Products Page
router.get('/products', showProducts)

// Detail Page
router.get('/products/:id', showProductDetail)

export default router;
