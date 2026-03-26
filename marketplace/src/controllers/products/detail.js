import { getProductDetail } from '../../models/products/detail.js';

async function showProductDetail(req, res) {
    const { id } = req.params;
    const product = await getProductDetail(id);
    res.render('products/detail', { product });
}

export { showProductDetail };
