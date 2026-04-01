import { createOrder, clearCart } from '../../models/orders/orders.js';
import { getCartByUser } from '../../models/cart/cart.js';
import { updateOrderStatus } from '../../models/orders/orders.js';

async function handleCheckout(req, res) {
    try {
        const userId = req.session.user.id;
        const cartItems = await getCartByUser(userId);
        if (cartItems.length === 0) {
            req.flash('error', 'Your cart is empty. Please add items before checking out.');
            return res.redirect('/cart');
        }
        const total = cartItems.reduce((sum, item) => (sum + parseFloat(item.price)), 0);
        await createOrder(userId, total);
        await clearCart(userId);
        req.flash('success', 'Checkout successful! Your order has been placed.');
        res.redirect('/my-orders');
    } catch (error) {
        console.error('Error during checkout:', error);
        req.flash('error', 'An error occurred during checkout. Please try again.');
        res.redirect('/cart');
    }
}
async function handleUpdateOrderStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await updateOrderStatus(id, status);
        res.redirect('/admin/orders');
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).render('errors/500');
    }
}

export { handleCheckout, handleUpdateOrderStatus };