const jwt = require('jsonwebtoken');

async function identifyUser( req, res, next ){

    // Support token in cookie (`req.cookies.token`) or Authorization header (`Bearer <token>`)
    let token = req.cookies && req.cookies.token ? req.cookies.token : null;

    if (!token) {
        const authHeader = req.headers && (req.headers.authorization || req.headers.Authorization);
        if (authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
    }

    if(!token) {
        return res.status(401).json({
            message:"Token not provided, Unauthorized access"
        })
    }

    let decoded;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message:"Token Invalid"
        })
    }

    req.user = decoded
    next();
}
module.exports = identifyUser;