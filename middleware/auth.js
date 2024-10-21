const jwt = require('jsonwebtoken'); 

module.exports = function (req, res, next) {
     res.setHeader('X-Content-Type-Options', 'nosniff');

    const token = req.header('x-auth-token');
    if (!token) {
         return res.redirect('/video');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
         return res.redirect('/video');
    }
};
