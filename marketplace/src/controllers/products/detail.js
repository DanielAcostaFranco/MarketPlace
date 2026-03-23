const { getProductDetail } = require('../../models/products/detail');

async function showProductDetail(req, res) {
    const { id } = req.params;
    const product = await getProductDetail(id);
    res.render('products/detail', { product });
}

module.exports = { showProductDetail };
