const { createToken } = require('./../libs/jwtCreate');
require('dotenv').config()

const msg = (res, req, status, resCode, params) => {
    let msg = {
        status: (status) ? status : 400,
        message: 'Error',
        resCode: resCode,
        data: []
    }
    let joinMsg = { ...msg, ...params }


    if (joinMsg.status >= 200 && joinMsg.status < 300) {
        let cekSession = (process.env.JWT_ACTIVE == 0) ? { userid: 'hendra' } : req.mySession.userid
        joinMsg.tokenId = createToken(cekSession)
        return res.status(joinMsg.status).json(joinMsg)
    }
    res.status(joinMsg.status).json(joinMsg)

    const listRescode = {
        'R99': 'UnHandle Error',
        'R98': 'Authentification',
        'R00': 'Success',
        'R01': 'Incomplete Data',
        'R02': 'Already Exists',
        'R03': 'Data Not Found',
        'R04': 'Table or Field Not Found',
        'R05': 'Cant Delete',
        'R06': 'Invalid Password',
        'R07': 'Choose not in Defind data',
        'R08': 'Value Can not Minus',
        'R09': 'Over Budget',
        'R10': 'Unsuficient Fund',
    }
}



module.exports = { msg }