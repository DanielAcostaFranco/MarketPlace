// Detail controller for products

import { getProductDetail } from '../../models/products/detail.js';
import { getReviewsByProductId } from '../../models/reviews/reviews.js';


// Show product detail page
async function showProductDetail(req, res) {
    const { id } = req.params;
    try {
        const product = await getProductDetail(id);
        const reviews = await getReviewsByProductId(id);
        res.render('products/detail', { product, reviews });
    } catch (error) {
        console.error('Error loading product detail:', error);
        res.status(500).render('errors/500');
    }
}


export { showProductDetail };
