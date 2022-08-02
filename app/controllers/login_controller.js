const bcrypt = require('bcrypt');
const myFn = require('./../libs/myFunction');
const stdMsg = require('./../libs/standartMessage');
const { createToken } = require('./../libs/jwtCreate');
const { LoginService } = require('./../services/login_service');
const LoginSv = new LoginService()

const loginAuth = async (req, res) => {
    const { userid, password } = req.body
    // cek kelengkapan data
    const validation = myFn.isRequired({ userid, password })
    if (validation) return stdMsg.msg(res, req, 400, 'R01', { message: 'Incomplete Data', ...validation })

    try {
        const { rows, rowCount } = await LoginSv.cekUser({ userid })
        if (rowCount == 0) return stdMsg.msg(res, req, 400, 'R06', { message: 'User or Password Invalid' })
        // salah password
        const validPass = await bcrypt.compare(password, rows[0].password);
        if (!validPass) return stdMsg.msg(res, req, 400, 'R06', { message: 'User or Password Invalid' })

        // berhasil login
        const tokenId = createToken({ userid })
        return res.status(200).json({ resCode: 'R00', message: 'Successfull', tokenId })


    } catch (e) {
        stdMsg.msg(res, req, 400, 'R99', { message: e.message })
    }


}

module.exports = { loginAuth }
