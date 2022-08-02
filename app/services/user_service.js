const db = require('./../configs/dbconfig');

class UserService {
    constructor() {

    }
    async cekExists(userid) {
        let cek = false
        let sql = "select * from user where userid= ?"
        const res = await db.query(sql, [userid]);

        if (res.rowCount != 0) { cek = true }
        return cek

    }
    async add(params) {
        const { userid, pwdEncrypt, username } = params
        const sql = "INSERT INTO user (userid, password,username) VALUES (?,?,?)"
        await db.query(sql, [userid, pwdEncrypt, username]);
    }

    async edit(params) {
        const { userid, pwdEncrypt, username } = params
        const sql = "update user set password= ? ,username= ? where userid= ?"
        await db.query(sql, [pwdEncrypt, username, userid]);
    }

    async delete(params) {
        const { userid } = params
        const sql = "delete from user where userid= ?"
        await db.query(sql, [userid]);
    }

    async getUserId(params) {
        const { userid } = params
        const sql = "select * from user where userid= ?"
        const { rows } = await db.query(sql, [userid]);
        return rows
    }

}

module.exports = { UserService }
