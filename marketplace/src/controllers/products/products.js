// Products controller

import { getAllProducts, deleteProduct } from '../../models/products/products.js';

// Show all products on the products page
async function showProducts(req, res) {
    const products = await getAllProducts();
    res.render('products/index', { products });
}

// Delete a product (admin only)
async function handleDeleteProduct(req, res) {
    const { id } = req.params;
    try {
        await deleteProduct(id);
        req.flash('success', 'Product deleted successfully.');
    } catch (error) {
        req.flash('error', 'Could not delete product.');
    }
    res.redirect('/admin/products');
}

export { showProducts, handleDeleteProduct };
