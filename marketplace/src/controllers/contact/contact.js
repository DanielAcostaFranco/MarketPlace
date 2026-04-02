// Contact controller \

import { createContactMessage, getContactMessagesByUser, getAllContactMessages, updateContactMessage } from '../../models/contact/contact.js';
import { validationResult } from 'express-validator';

// Show the contact form and the previous messages
async function showContactForm(req, res) {
    try {
        const messages = await getContactMessagesByUser(req.session.user.id);
        res.render('contact/index', { messages });
    } catch (error) {
        console.error('Error loading contact page:', error);
        res.status(500).render('errors/500');
    }
}

// Save a new message
async function handleContactSubmit(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => req.flash('error', error.msg));
        return res.redirect('/contact');
    }

    try {
        const { reason, message } = req.body;
        await createContactMessage(req.session.user.id, reason, message);
        req.flash('success', 'Your message was sent successfully!');
        res.redirect('/contact');
    } catch (error) {
        console.error('Error submitting contact message:', error);
        res.status(500).render('errors/500');
    }
}

// Show all messages
async function showAdminContact(req, res) {
    try {
        const messages = await getAllContactMessages();
        res.render('admin/contact', { messages });
    } catch (error) {
        console.error('Error loading admin contact page:', error);
        res.status(500).render('errors/500');
    }
}

// Update status
async function handleUpdateContact(req, res) {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;
        await updateContactMessage(id, status, notes);
        req.flash('success', 'Message updated successfully.');
        res.redirect('/admin/contact');
    } catch (error) {
        console.error('Error updating contact message:', error);
        res.status(500).render('errors/500');
    }
}

export { showContactForm, handleContactSubmit, showAdminContact, handleUpdateContact };
