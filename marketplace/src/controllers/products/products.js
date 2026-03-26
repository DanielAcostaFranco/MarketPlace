import { getAllProducts } from '../../models/products/products.js';

async function showProducts(req, res) {
    const products = await getAllProducts();
    res.render('products/index', { products });
}

export { showProducts };
