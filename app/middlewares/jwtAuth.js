const jwt = require('jsonwebtoken');
require('dotenv').config()

const AuthToken = (req, res, next) => {
    try {
        if (process.env.JWT_ACTIVE == 0) return next()
        const token = req.header('auth-token')
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        if (decoded) {
            req.mySession = decoded;
            return next()
        }
    } catch (err) {
        //msg if token failed or expaired
        res.status(404).json({ rsCode: 'R98', message: 'Anauthorized invalid token ' })
    }
}

module.exports = { AuthToken }
