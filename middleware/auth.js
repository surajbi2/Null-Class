module.exports = function (req, res, next) {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Allow the request to proceed without authentication
    next();
};
