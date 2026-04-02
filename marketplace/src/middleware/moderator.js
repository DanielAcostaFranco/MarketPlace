// Moderator middleware 

const isModerator = (req, res, next) => {
    if (req.session.isLoggedIn &&
        (req.session.user.role === 'admin' || req.session.user.role === 'moderator')) {
        return next();
    }
    // Not a moderator or admin, send back to home
    req.flash('error', 'You do not have permission to access that page.');
    res.redirect('/');
}

export default isModerator;
