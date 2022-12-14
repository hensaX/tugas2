const db = require('./../configs/dbconfig');

class BookService {
    constructor() {

    }
    async cekExists(id) {
        let cek = false
        let sql = "select * from books where id_book= ?"
        const res = await db.query(sql, [id]);

        if (res.rowCount != 0) { cek = true }
        return cek

    }
    async add(params) {
        const { title, pub_year, price, notes, id_author, id_category } = params
        const sql = "INSERT INTO books (title, pub_year, price,notes, id_author, id_category) VALUES (?,?,?,?,?,?)"
        await db.query(sql, [title, pub_year, price, notes, id_author, id_category]);
    }

    async edit(params) {
        const { id_book, title, pub_year, price, notes, id_author, id_category } = params
        const sql = `update books set updated=datetime('now','localtime')
        ,title=?, pub_year=?, price=?, notes=?, id_author=?, id_category=? where id_book=?`
        await db.query(sql, [title, pub_year, price, notes, id_author, id_category, id_book]);
    }

    async delete(params) {
        const { id } = params
        const sql = "delete from books where id_book= ?"
        await db.query(sql, [id]);
    }

    async getBookById(params) {
        const { id } = params
        const sql = "select * from books where id_book= ?"
        const { rows } = await db.query(sql, [id]);
        return rows
    }

    async getBookAll() {
        const sql = "select * from books"
        const { rows } = await db.query(sql, []);
        return rows
    }

    async getBookFilter(params) {
        let arr = []
        let where = ''
        if (params.author_name) {
            arr.push(`%${params.author_name.toLowerCase()}%`)
            where += where ? ` and ` : ` where `
            where += `lower(c.author_name) like $${arr.length}`

        }
        if (params.category_name) {
            arr.push(`%${params.category_name.toLowerCase()}%`)
            where += where ? ` and ` : ` where `
            where += `lower(b.category_name) like $${arr.length}`
        }
        const sql = `select b.category_name,c.author_name,c.penname,c.gender,a.* from books a 
        left join category b on a.id_category=b.id_category
        left join authors c on a.id_author=c.id_author 
        ${where}`

        const { rows } = await db.query(sql, arr);
        return rows
    }
}

module.exports = { BookService }
