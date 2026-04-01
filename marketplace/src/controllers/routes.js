import express from 'express';
import { showRegistrationForm, handleRegistration } from './forms/registration.js';
import { showLoginForm, handleLogin, handleLogout } from './forms/login.js';
import { showProducts, handleDeleteProduct } from './products/products.js';
import { showProductDetail } from './products/detail.js';
import { registrationValidation, loginValidation } from '../middleware/validation/forms.js';
import isAdmin from '../middleware/admin.js';

const router = express.Router();

// Home Page
router.get('/', (req, res) => {
    res.render('home');
})

// Registration Page
router.get('/register', showRegistrationForm)
router.post('/register', registrationValidation, handleRegistration)

// Login Page
router.get('/login', showLoginForm)
router.post('/login', loginValidation, handleLogin)
router.get('/logout', handleLogout)

// Products Page
router.get('/products', showProducts)

// Detail Page
router.get('/products/:id', showProductDetail)

// Delete Product (admin only)
router.post('/products/:id/delete', isAdmin, handleDeleteProduct)

// Admin Page
router.get('/admin', isAdmin, (req, res) => {
    res.render('admin')
})

export default router;
