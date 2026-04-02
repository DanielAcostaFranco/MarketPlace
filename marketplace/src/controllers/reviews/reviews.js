// Reviews controller 
import { createReview, deleteReview, getReviewById, updateReview } from '../../models/reviews/reviews.js';
import { validationResult } from 'express-validator';

// Submit a new review
async function handleCreateReview(req, res) {
    const productId = req.params.id;
    const userId = req.session.user.id;
    const { rating, comment } = req.body;

    // Check validation errors first
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

// Delete a review - owner, moderator, or admin can do this
async function handleDeleteReview(req, res) {
    const productId = req.body.productId;
    const reviewId = req.params.id;
    const { role, id: userId } = req.session.user;

    try {
        const review = await getReviewById(reviewId);
        const isOwner = review.user_id === userId;
        const isModOrAdmin = role === 'admin' || role === 'moderator';

        // Block if not the owner and not mod/admin
        if (!isOwner && !isModOrAdmin) {
            req.flash('error', 'You do not have permission to delete this review.');
            return res.redirect(`/products/${productId}`);
        }

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

// Show the edit review form - only the owner can see this
async function showEditReview(req, res) {
    try {
        const review = await getReviewById(req.params.id);
        if (!review || review.user_id !== req.session.user.id) {
            req.flash('error', 'You do not have permission to edit this review.');
            return res.redirect('/products');
        }
        res.render('reviews/edit', { review });
    } catch (error) {
        console.error('Error loading review:', error);
        res.status(500).render('errors/500');
    }
}

// Save the updated review
async function handleEditReview(req, res) {
    try {
        const { rating, comment, productId } = req.body;
        const userId = req.session.user.id;
        await updateReview(req.params.id, userId, rating, comment);
        req.flash('success', 'Review updated successfully!');
        res.redirect(`/products/${productId}`);
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).render('errors/500');
    }
}

export { handleCreateReview, handleDeleteReview, showEditReview, handleEditReview };
