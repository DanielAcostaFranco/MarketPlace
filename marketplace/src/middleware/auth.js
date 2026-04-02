// Auth middleware 

const isLoggedIn = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return next();
    }
    // Not logged in, send to login page
    req.flash('error', 'You must be logged in to perform this action.');
    res.redirect('/login');
};

export default isLoggedIn;
