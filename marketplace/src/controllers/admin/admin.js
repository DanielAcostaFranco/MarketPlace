// Admin controller - handles all admin dashboard actions

import { createProduct, getAllProducts, getProductById, updateProduct } from '../../models/products/products.js';
import { getAllOrders, updateOrderStatus } from '../../models/orders/orders.js';
import { getAllUsers, updateUserRole, deleteUser } from '../../models/users/users.js';

// Show the main admin dashboard page
async function showAdminDashboard(_req, res) {
    try {
        res.render('admin/index');
    } catch (error) {
        console.error('Error loading admin dashboard:', error);
        res.status(500).render('errors/500');
    }
}

// Show all products in a table
async function showAdminProducts(req, res) {
    try {
        const products = await getAllProducts();
        res.render('admin/products', { products });
    } catch (error) {
        console.error('Error loading products:', error);
        res.status(500).render('errors/500');
    }
}

// Show all orders with username from the join
async function showAdminOrders(req, res) {
    try {
        const orders = await getAllOrders();
        res.render('admin/orders', { orders });
    } catch (error) {
        console.error('Error loading orders:', error);
        res.status(500).render('errors/500');
    }
}

// Show all users in a table
async function showAdminUsers(req, res) {
    try {
        const users = await getAllUsers();
        res.render('admin/users', { users });
    } catch (error) {
        console.error('Error loading users:', error);
        res.status(500).render('errors/500');
    }
}

// Update order status (pending, shipped, delivered)
async function handleUpdateOrderStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await updateOrderStatus(id, status);
        req.flash('success', 'Order status updated successfully.');
        res.redirect('/admin/orders');
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).render('errors/500');
    }
}

// Change a user's role (buyer, moderator, admin)
async function handleUpdateUserRole(req, res) {
    try {
        const { id } = req.params;
        const { role } = req.body;
        await updateUserRole(id, role);
        req.flash('success', 'User role updated successfully.');
        res.redirect('/admin/users');
    } catch (error) {
        console.error('Error updating user role: ', error);
        res.status(500).render('errors/500');
    }
}

// Delete a user from the database
async function handleDeleteUser(req, res) {
    try {
        const { id } = req.params;
        await deleteUser(id);
        req.flash('success', 'User was deleted successfully');
        res.redirect('/admin/users');
    } catch (error) {
        console.error('Error trying to delete user:', error);
        res.status(500).render('errors/500');
    }
}

// Show the add product form
function showAddProductForm(_req, res) {
    res.render('admin/add-product');
}

// Save new product to the database
async function handleAddProduct(req, res) {
    try {
        const { name, description, price, category, image_url } = req.body;
        await createProduct(name, description, price, category, image_url);
        req.flash('success', 'Product added successfully');
        res.redirect('/admin/products');
    } catch (error) {
        console.error('Error adding the product:', error);
        res.status(500).render('errors/500');
    }
}

// Show the edit form with the current product data
async function showEditProductForm(req, res) {
    try {
        const { id } = req.params;
        const product = await getProductById(id);
        res.render('admin/edit-product', { product });
    } catch (error) {
        console.error('Error loading form', error);
        res.status(500).render('errors/500');
    }
}

// Save the updated product info
async function handleEditProduct(req, res) {
    try {
        const { id } = req.params;
        const { name, description, price, category, image_url } = req.body;
        await updateProduct(id, name, description, price, category, image_url);
        req.flash('success', 'Product updated successfully.');
        res.redirect('/admin/products');
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).render('errors/500');
    }
}

export {
    showAdminDashboard, showAdminProducts, showAdminUsers,
    showAdminOrders, handleUpdateOrderStatus, handleUpdateUserRole,
    handleDeleteUser, showAddProductForm, handleAddProduct,
    showEditProductForm, handleEditProduct
};
