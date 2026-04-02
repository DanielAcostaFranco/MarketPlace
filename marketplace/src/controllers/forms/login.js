// Login controller
import { loginUser } from '../../models/forms/login.js';
import { validationResult } from 'express-validator';

// Show login form
async function showLoginForm(req, res) {
    res.render('forms/login/form');
}

// Handle login form submission
async function handleLogin(req, res) {
    const { email, password } = req.body;

    // Check validation errors first
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => req.flash('error', error.msg));
        return res.redirect('/login');
    }

    try {
        // Verify email and password
        const user = await loginUser(email, password);

        // If user was not found or password is incorrect
        if (!user) {
            req.flash('error', 'Invalid email or password. Please try again.');
            return res.redirect('/login');
        }

        // Save user info in session
        req.session.isLoggedIn = true;
        req.session.user = user

        req.flash('success', `Welcome back, ${user.username}!`);
        res.redirect('/products');

    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'An error occurred during login. Please try again.');
        res.redirect('/login');
    }
}

async function handleLogout(req, res) {
    req.session.destroy(err => {
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });

}

export { showLoginForm, handleLogin, handleLogout };
