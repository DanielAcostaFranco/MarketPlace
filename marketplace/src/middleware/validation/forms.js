// Validation middleware for forms

import { body } from 'express-validator';


// Validation middleware for forms
const loginValidation = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .isLength({ max: 255 })
        .withMessage('Email address is too long')
        .normalizeEmail(),

    body('password')
        .notEmpty()
        .isLength({ min: 8, max: 128 })
        .withMessage('Password must be between 8 and 128 characters')
];


const registrationValidation = [
    body('username')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Username must be between 2 and 50 characters')
        .matches(/^[a-zA-Z0-9\s'-]+$/)
        .withMessage('Username can only contain letters, numbers, spaces, hyphens and apostrophes'),
    body('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Must be a valid email address')
        .isLength({ max: 255 })
        .withMessage('Email address is too long'),
    body('password')
        .isLength({ min: 8, max: 128 })
        .withMessage('Password must be between 8 and 128 characters')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one number')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter')
        .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)
        .withMessage('Password must contain at least one special character')
];


const updateAccountValidation = [
    body('username')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Username must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s'-]+$/)
        .withMessage('Username can only contain letters, spaces, hyphens, and apostrophes'),
    body('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Must be a valid email address')
        .isLength({ max: 255 })
        .withMessage('Email address is too long')
];

const contactValidation = [
    body('subject')
        .trim()
        .isLength({ min: 2, max: 255 })
        .withMessage('Subject must be between 2 and 255 characters')
        .matches(/^[a-zA-Z0-9\s\-.,!?]+$/)
        .withMessage('Subject contains invalid characters'),
    body('message')
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('Message must be between 10 and 2000 characters')
        .custom((value) => {
            const words = value.split(/\s+/);
            const uniqueWords = new Set(words);
            if (words.length > 20 && uniqueWords.size / words.length < 0.3) {
                throw new Error('Message appears to be spam');
            }
            return true;
        })
];

const reviewValidation = [
    body('rating')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be an integer between 1 and 5'),
    body('comment')
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('Comment must be between 10 and 2000 characters')
];


export {
    contactValidation,
    registrationValidation,
    loginValidation,
    updateAccountValidation,
    reviewValidation
};
