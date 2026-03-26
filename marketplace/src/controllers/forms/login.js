import { loginUser } from '../../models/forms/login.js';

// Show login form
async function showLoginForm(req, res) {
    res.render('forms/login/form');
}

// Handle login form submission
async function handleLogin(req, res) {
    const { email, password } = req.body;

    try {
        // Verify email and password
        const user = await loginUser(email, password);

        // If user was not found or password is incorrect
        if (!user) {
            req.session.errorMessage = 'Invalid email or password. Please try again.';
            return res.redirect('/login');
        }

        // Save user info in session
        req.session.isLoggedIn = true;
        req.session.user = user

        req.session.successMessage = `Welcome back, ${user.username}!`;
        res.redirect('/');

    } catch (error) {
        console.error('Error during login:', error);
        req.session.errorMessage = 'An error occurred during login. Please try again.';
        res.redirect('/login');
    }
}

async function handleLogout(req, res) {
    req.session.destroy(err => {
        res.redirect('/login');
    });

}

export { showLoginForm, handleLogin, handleLogout };
