const { getAllProducts } = require('../../models/products/products');

async function showProducts(req, res) {
    const products = await getAllProducts();
    res.render('products/index', { products });
}

module.exports = { showProducts };
