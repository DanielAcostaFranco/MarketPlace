import { getOrdersByUser } from '../../models/orders/orders.js'

async function showDashboard(req, res) {
    try {
        const orders = await getOrdersByUser(req.session.user.id)
        res.render('dashboard/index', { orders })
    } catch (error) {
        console.error('Error loading dashboard:', error)
        res.status(500).render('errors/500')
    }
}

export { showDashboard }
