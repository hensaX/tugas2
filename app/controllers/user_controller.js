const db = require('./../configs/dbconfig');
const bcrypt = require('bcrypt');
const myFn = require('./../libs/myFunction');
const stdMsg = require('./../libs/standartMessage');


// fungsi cek userid
const cekUserExists = async (id) => {
    let cek = false
    let sql = "select * from user where userid= ?"
    const res = await db.query(sql, [id]);

    if (res.rowCount != 0) { cek = true }
    return cek

}

const addUser = async (req, res) => {
    const { userid, password, username } = req.body

    // cek kelengkapan data
    const validation = myFn.isRequired({ userid, password, username })
    if (validation) return stdMsg.msg(res, req, 400, 'R01', { message: 'Incomplete Data', ...validation })

    // cek exists
    const cek = await cekUserExists(userid)
    if (cek) return stdMsg.msg(res, req, 400, 'R02', { message: 'Data Already Exists' })

    // encrypt pas
    const salt = await bcrypt.genSalt(10);
    const pwdEncrypt = await bcrypt.hash(password, salt);


    try {
        let sql = "INSERT INTO user (userid, password,username) VALUES (?,?,?)"
        await db.query(sql, [userid, pwdEncrypt, username]);
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
    const cek = await cekUserExists(userid)
    if (!cek) return stdMsg.msg(res, req, 400, 'R03', { message: 'Data Not Exists' })

    // encrypt pas
    const salt = await bcrypt.genSalt(10);
    const pwdEncrypt = await bcrypt.hash(password, salt);

    // update
    try {
        let sql = "update user set password= ? ,username= ? where userid= ?"
        await db.query(sql, [pwdEncrypt, username, userid]);
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull 1 record updated', data: [] })
    } catch (err) {
        if (err) return stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }


}

const deleteUser = async (req, res) => {
    const { userid } = req.params
    // cek exists
    const cek = await cekUserExists(userid)
    if (!cek) return stdMsg.msg(res, req, 400, 'R03', { message: 'Data Not Exists' })

    // delete
    try {
        let sql = "delete from user where userid= ?"
        await db.query(sql, [userid]);
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
    const cek = await cekUserExists(userid)
    if (!cek) return stdMsg.msg(res, req, 400, 'R03', { message: 'Data Not Exists' })

    try {
        let sql = "select * from user where userid= ?"
        const { rows } = await db.query(sql, [userid]);
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull', data: rows })
    } catch (err) {
        stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }

}


module.exports = { addUser, editUser, deleteUser, getUserId }
