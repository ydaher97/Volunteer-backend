const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Authorization header not provided');
        error.statusCode = 401;
        throw error;
    }
    
    const token = authHeader.split(' ')[1];
    let decodedToken;
    
    try {
        decodedToken = jwt.verify(token, process.env.JWTPRIVATEKEY);
    } catch (err) {
        err.statusCode = 401;
        throw err;
    }
    
    if (!decodedToken) {
        const error = new Error('Invalid token');
        error.statusCode = 401;
        throw error;
    }
    console.log('Auth Middleware Triggered');
     console.log('Token:', token);
    console.log('Decoded Token:', decodedToken);
    
    req.isLoggedIn = true;
    req.userId = decodedToken.userId;
    req.email = decodedToken.email;
    console.log(req.userId)
    next();
};
