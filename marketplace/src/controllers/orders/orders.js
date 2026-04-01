import { createOrder, clearCart } from '../../models/orders/orders.js';
import { getCartByUser } from '../../models/cart/cart.js';

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

export { handleCheckout };