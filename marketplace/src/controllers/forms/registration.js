const { findUserByEmail, findUserByUsername, createUser } = require('../../models/forms/registration');

// Show the registration form
async function showRegistrationForm(req, res) {
    res.render('forms/registration/form');
}

async function handleRegistration(req, res) {
    const { username, email, password } = req.body

    try {
        // Check if email already exists
        const existingEmail = await findUserByEmail(email);
        if (existingEmail) {
            req.session.errorMessage = 'Email already in use. Please choose another one.';
            return res.redirect('/register');
        }

        //Check if username already exists
        const existingUsername = await findUserByUsername(username);
        if (existingUsername) {
            req.session.errorMessage = 'Username already taken. Please choose another one.';
            return res.redirect('/register');
        }

        await createUser(username, email, password);
        req.session.successMessage = 'Registration successful! You can now log in.';
        res.redirect('/login');

    } catch (error) {
        console.error('Error during registration:', error);
        req.session.errorMessage = 'An error occurred during registration. Please try again.';
        res.redirect('/register');
    }
}

module.exports = { showRegistrationForm, handleRegistration };