import { getAllProducts } from '../../models/products/products.js';
import { getAllOrders } from '../../models/orders/orders.js';
import { getAllUsers } from '../../models/users/users.js';

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
export { showAdminDashboard, showAdminProducts, showAdminUsers, showAdminOrders };
