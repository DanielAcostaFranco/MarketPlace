import express from 'express';
import { showRegistrationForm, handleRegistration } from './forms/registration.js';
import { showLoginForm, handleLogin, handleLogout } from './forms/login.js';
import isLoggedIn from '../middleware/auth.js';
import { showProducts, handleDeleteProduct } from './products/products.js';
import { showProductDetail } from './products/detail.js';
import { registrationValidation, loginValidation, reviewValidation } from '../middleware/validation/forms.js';
import { handleCreateReview, handleDeleteReview } from './reviews/reviews.js';
import { handleCheckout } from './orders/orders.js';
import isAdmin from '../middleware/admin.js';
import { showDashboard } from './dashboard/dashboard.js';
import { showCart, handleAddToCart, handleRemoveFromCart } from './cart/cart.js';
import { showAdminDashboard, showAdminOrders, showAdminProducts, showAdminUsers, handleUpdateOrderStatus, handleUpdateUserRole, handleDeleteUser } from './admin/admin.js';

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

// Reviews Page
router.post('/products/:id/review', isLoggedIn, reviewValidation, handleCreateReview)
router.post('/reviews/:id/delete', isAdmin, handleDeleteReview)

// My Orders Page
router.get('/my-orders', isLoggedIn, showDashboard)

// Cart Page 
router.get('/cart', isLoggedIn, showCart)
router.post('/cart/add', isLoggedIn, handleAddToCart)
router.post('/cart/remove', isLoggedIn, handleRemoveFromCart)

// Orders Page
router.get('/orders', isLoggedIn, (req, res) => {
    res.redirect('/my-orders')
})

// Checkout Page
router.post('/checkout', isLoggedIn, handleCheckout)

// Admin Pages
router.get('/admin', isAdmin, showAdminDashboard)
router.get('/admin/products', isAdmin, showAdminProducts)
router.get('/admin/users', isAdmin, showAdminUsers)
router.get('/admin/orders', isAdmin, showAdminOrders)
router.post('/admin/orders/:id/status', isAdmin, handleUpdateOrderStatus)
router.post('/admin/users/:id/role', isAdmin, handleUpdateUserRole)
router.post('/admin/users/:id/delete', isAdmin, handleDeleteUser)

export default router;
