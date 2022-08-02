const bcrypt = require('bcrypt');
const myFn = require('./../libs/myFunction');
const stdMsg = require('./../libs/standartMessage');
const { UserService } = require('./../services/user_service');
const UserSv = new UserService()


const addUser = async (req, res) => {
    const { userid, password, username } = req.body

    // cek kelengkapan data
    const validation = myFn.isRequired({ userid, password, username })
    if (validation) return stdMsg.msg(res, req, 400, 'R01', { message: 'Incomplete Data', ...validation })

    // cek exists
    const cek = await UserSv.cekExists(userid)
    if (cek) return stdMsg.msg(res, req, 400, 'R02', { message: 'Data Already Exists' })

    // encrypt pas
    const salt = await bcrypt.genSalt(10);
    const pwdEncrypt = await bcrypt.hash(password, salt);


    try {
        await UserSv.add({ userid, pwdEncrypt, username })
        stdMsg.msg(res, req, 201, 'R00', { message: 'Successfull 1 record updated' })
    } catch (err) {
        if (err) return stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }

}

const editUser = async (req, res) => {
    const { userid, password, username } = req.body

    // cek kelengkapan data
    const validation = myFn.isRequired({ userid, password, username })
    if (validation) return stdMsg.msg(res, req, 400, 'R01', { message: 'Incomplete Data', ...validation })

    // cek exists
    const cek = await UserSv.cekExists(userid)
    if (!cek) return stdMsg.msg(res, req, 400, 'R03', { message: 'Data Not Exists' })

    // encrypt pas
    const salt = await bcrypt.genSalt(10);
    const pwdEncrypt = await bcrypt.hash(password, salt);

    // update
    try {
        await UserSv.edit({ userid, pwdEncrypt, username })
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull 1 record updated', data: [] })
    } catch (err) {
        if (err) return stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }


}

const deleteUser = async (req, res) => {
    const { userid } = req.params
    // cek exists
    const cek = await UserSv.cekExists(userid)
    if (!cek) return stdMsg.msg(res, req, 400, 'R03', { message: 'Data Not Exists' })

    // delete
    try {
        await UserSv.delete({ userid })
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull 1 record deleted', data: [] })
    } catch (err) {
        if (err) return stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }



}

const getUserId = async (req, res) => {
    const { userid } = req.params

    // cek kelengkapan data
    const validation = myFn.isRequired({ userid })
    if (validation) return stdMsg.msg(res, req, 400, 'R01', { message: 'Incomplete Data', ...validation })

    // cek exists
    const cek = await UserSv.cekExists(userid)
    if (!cek) return stdMsg.msg(res, req, 400, 'R03', { message: 'Data Not Exists' })

    try {
        const rows = await UserSv.getUserId({ userid })
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull', data: rows })
    } catch (err) {
        stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }

}


module.exports = { addUser, editUser, deleteUser, getUserId }
