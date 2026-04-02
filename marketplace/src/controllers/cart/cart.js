// Cart controller 
import { getCartByUser, addToCart, removeFromCart } from "../../models/cart/cart.js";

// Show the cart page with items and total
async function showCart(req, res) {
    try {
        const items = await getCartByUser(req.session.user.id);
        // Add up all item prices for the total
        const total = items.reduce((sum, item) => sum + parseFloat(item.price), 0);
        res.render('cart/index', { items, total });
    } catch (error) {
        console.error('Error loading cart:', error);
        res.status(500).render('errors/500');
    }
}

// Add a product to the cart
async function handleAddToCart(req, res) {
    try {
        const { product_id } = req.body;
        await addToCart(req.session.user.id, product_id);
        req.flash('success', 'Product added to cart');
        res.redirect('/cart');
    } catch (error) {
        console.error('Error adding to cart:', error);
        req.flash('error', 'Failed to add product to cart');
        res.redirect('/products');
    }
}

// Remove one item from the cart
async function handleRemoveFromCart(req, res) {
    try {
        const { cart_id } = req.body;
        await removeFromCart(cart_id, req.session.user.id);
        req.flash('success', 'Product removed from cart');
        res.redirect('/cart');
    } catch (error) {
        console.error('Error removing from cart:', error);
        req.flash('error', 'Failed to remove product from cart');
        res.redirect('/cart');
    }
}

export { showCart, handleAddToCart, handleRemoveFromCart };
