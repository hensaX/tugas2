const db = require('./../configs/dbconfig');

class LoginService {
    constructor() {

    }
    async cekUser(params) {
        const { userid } = params
        let sql = "select * from user where userid= ?"
        const res = await db.query(sql, [userid]);
        return res
    }

}

module.exports = { LoginService }
