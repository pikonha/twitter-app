const jwt = require("jsonwebtoken")

function validateToken (req, res, next) {
    const token = req.header('auth-token')
    if (!token) return res.status(400).send({error: 'Access denied.'})

    try {        
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        
        next();
    } catch (err) {
        res.status(400).send({error: 'Invalid token.'})
    }
}


module.exports = validateToken