import { createReview, deleteReview } from '../../models/reviews/reviews.js';
import { validationResult } from 'express-validator';

async function handleCreateReview(req, res) {
    const productId = req.params.id;
    const userId = req.session.user.id;
    const { rating, comment } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error', 'Please fill in all required fields.');
        res.redirect(`/products/${productId}`);
        return;
    }

    try {
        await createReview(productId, userId, rating, comment);
        req.flash('success', 'Review submitted successfully!');
        res.redirect(`/products/${productId}`);
    }
    catch (error) {
        console.error('Error creating review:', error);
        req.flash('error', 'An error occurred while submitting your review. Please try again.');
        res.redirect(`/products/${productId}`);
    }
}

async function handleDeleteReview(req, res) {
    const productId = req.body.productId;
    const reviewId = req.params.id;

    try {
        await deleteReview(reviewId);
        req.flash('success', 'Review deleted successfully!');
        res.redirect(`/products/${productId}`);
    }
    catch (error) {
        console.error('Error deleting review:', error);
        req.flash('error', 'An error occurred while deleting the review. Please try again.');
        res.redirect(`/products/${productId}`);
    }
}

export { handleCreateReview, handleDeleteReview };