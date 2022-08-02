const db = require('./../configs/dbconfig');

class AuthorService {
    constructor() {

    }
    async cekExists(id) {
        let cek = false
        let sql = "select * from authors where id_author= ?"
        const res = await db.query(sql, [id]);

        if (res.rowCount != 0) { cek = true }
        return cek

    }
    async add(params) {
        const { author_name, penname, gender } = params
        const sql = "INSERT INTO authors (author_name, penname, gender) VALUES (?,?,?)"
        await db.query(sql, [author_name, penname, gender]);
    }

    async edit(params) {
        const { author_name, penname, gender, id_author } = params
        const sql = "update authors set updated=datetime('now','localtime'),author_name=?,penname=?,gender=? where id_author=?"
        await db.query(sql, [author_name, penname, gender, id_author]);
    }

    async delete(params) {
        const { id } = params
        const sql = "delete from authors where id_author= ?"
        await db.query(sql, [id]);
    }

    async getAuthorById(params) {
        const { id } = params
        const sql = "select * from authors where id_author= ?"
        const { rows } = await db.query(sql, [id]);
        return rows
    }

    async getAuthorAll() {
        const sql = "select * from authors"
        const { rows } = await db.query(sql, []);
        return rows
    }
}

module.exports = { AuthorService }
