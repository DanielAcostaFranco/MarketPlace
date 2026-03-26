import { findUserByEmail, findUserByUsername, createUser } from '../../models/forms/registration.js';
import { validationResult } from 'express-validator';

// Show the registration form
async function showRegistrationForm(req, res) {
    res.render('forms/registration/form');
}

async function handleRegistration(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => req.flash('error', error.msg));
        return res.redirect('/register');
    }

    const { username, email, password } = req.body;


    try {
        const existingEmail = await findUserByEmail(email);
        if (existingEmail) {
            req.flash('error', 'Email already in use. Please choose another one.');
            return res.redirect('/register');
        }

        const existingUsername = await findUserByUsername(username);
        if (existingUsername) {
            req.flash('error', 'Username already taken. Please choose another one.');
            return res.redirect('/register');
        }

        await createUser(username, email, password);
        req.flash('success', 'Registration successful! You can now log in.');
        res.redirect('/login');

    } catch (error) {
        console.error('Error during registration:', error);
        req.flash('error', 'An error occurred during registration. Please try again.');
        res.redirect('/register');
    }
}

export { showRegistrationForm, handleRegistration };
