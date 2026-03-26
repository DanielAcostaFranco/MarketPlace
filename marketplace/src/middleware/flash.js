// Flash Middleware for Express.js

// Initialize flash messages if they don't exist
const flash = (req, res, next) => {
    if (!req.session.flash) {
        req.session.flash = {
            success: [],
            error: [],
        };
    }
    req.flash = function (type, message) {
        if (type && message) {
            req.session.flash[type].push(message);
            return;
        }
        if (type) {
            const messages = req.session.flash[type] || [];
            req.session.flash[type] = [];
            return messages;
        }

        const all = { ...req.session.flash };
        req.session.flash = { success: [], error: [] };
        return all;
    }
    res.locals.flash = req.flash.bind(req);
    next();
};

export default flash;
