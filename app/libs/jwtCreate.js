const jwt = require('jsonwebtoken');
require('dotenv').config()

function createToken(payload) {
    const jwtExp = process.env.JWT_EXP || '10min'
    return jwt.sign({ ...payload }, process.env.JWT_TOKEN, { expiresIn: jwtExp, algorithm: 'HS384' })

}

module.exports = { createToken }
