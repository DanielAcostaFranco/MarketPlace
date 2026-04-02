import { getAllProducts } from '../../models/products/products.js';
import { getAllOrders, updateOrderStatus } from '../../models/orders/orders.js';
import { getAllUsers, updateUserRole, deleteUser } from '../../models/users/users.js';

async function showAdminDashboard(_req, res) {
    try {
        res.render('admin/index');
    } catch (error) {
        console.error('Error loading admin dashboard:', error);
        res.status(500).render('errors/500');
    }
}

async function showAdminProducts(req, res) {
    try {
        const products = await getAllProducts();
        res.render('admin/products', { products });
    } catch (error) {
        console.error('Error loading products:', error);
        res.status(500).render('errors/500');
    }
}

async function showAdminOrders(req, res) {
    try {
        const orders = await getAllOrders();
        res.render('admin/orders', { orders });
    } catch (error) {
        console.error('Error loading orders:', error);
        res.status(500).render('errors/500');
    }
}

async function showAdminUsers(req, res) {
    try {
        const users = await getAllUsers();
        res.render('admin/users', { users });
    } catch (error) {
        console.error('Error loading users:', error);
        res.status(500).render('errors/500');
    }
}

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




export { showAdminDashboard, showAdminProducts, showAdminUsers, showAdminOrders, handleUpdateOrderStatus, handleUpdateUserRole, handleDeleteUser };
