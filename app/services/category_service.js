const db = require('./../configs/dbconfig');

class CategoryService {
    constructor() {

    }
    async cekExists(id) {
        let cek = false
        const sql = "select * from category where id_category= ?"
        const res = await db.query(sql, [id]);

        if (res.rowCount != 0) { cek = true }
        return cek
    }
    async add(params) {
        const { category_name } = params
        const sql = "INSERT INTO category (category_name) VALUES (?)"
        await db.query(sql, [category_name]);
    }

    async edit(params) {
        const { category_name } = params
        const sql = "update category set updated=datetime('now','localtime'),category_name=? where id_category=?"
        await db.query(sql, [category_name, id_category]);
    }

    async delete(params) {
        const { id } = params
        const sql = "delete from category where id_category= ?"
        await db.query(sql, [id]);
    }

    async getCategoryById(params) {
        const { id } = params
        const sql = "select * from category where id_category= ?"
        const { rows } = await db.query(sql, [id]);
        return rows
    }

    async getCategoryAll() {
        const sql = "select * from category"
        const { rows } = await db.query(sql, []);
        return rows
    }
}

module.exports = { CategoryService }
