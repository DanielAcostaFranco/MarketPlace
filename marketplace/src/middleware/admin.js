// Admin middleware 

const isAdmin = (req, res, next) => {
    if (req.session.isLoggedIn && req.session.user.role === 'admin') {
        return next()
    }
    // Not an admin, send back to home
    req.flash('error', 'You do not have permission to access that page.')
    res.redirect('/')
}

export default isAdmin
