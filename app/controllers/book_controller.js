const db = require('./../configs/dbconfig');
const myFn = require('./../libs/myFunction');
const stdMsg = require('./../libs/standartMessage');


// fungsi cek exists
const cekExists = async (id) => {
    let cek = false
    let sql = "select * from books where id_book= ?"
    const res = await db.query(sql, [id]);

    if (res.rowCount != 0) { cek = true }
    return cek

}

const addBook = async (req, res) => {
    const { title, pub_year, price, notes, id_author, id_category } = req.body

    // cek kelengkapan data
    const validation = myFn.isRequired({ title, pub_year, price, id_author, id_category })
    if (validation) return stdMsg.msg(res, req, 400, 'R01', { message: 'Incomplete Data', ...validation })

    try {
        let sql = "INSERT INTO books (title, pub_year, price,notes, id_author, id_category) VALUES (?,?,?,?,?,?)"
        const { rows } = await db.query(sql, [title, pub_year, price, notes, id_author, id_category]);
        stdMsg.msg(res, req, 201, 'R00', { message: 'Successfull 1 record inserted' })
    } catch (err) {
        if (err) return stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }

}

const editBook = async (req, res) => {
    const { id_book, title, pub_year, price, notes, id_author, id_category } = req.body

    // cek kelengkapan data
    const validation = myFn.isRequired({ id_book, title, pub_year, price, id_author, id_category })
    if (validation) return stdMsg.msg(res, req, 400, 'R01', { message: 'Incomplete Data', ...validation })

    // cek exists
    const cek = await cekExists(id_book)
    if (!cek) return stdMsg.msg(res, req, 400, 'R03', { message: 'Data Not Exists' })

    // update
    try {
        let sql = `update books set updated=datetime('now','localtime')
        ,title=?, pub_year=?, price=?, notes=?, id_author=?, id_category=? where id_book=?`
        await db.query(sql, [title, pub_year, price, notes, id_author, id_category, id_book]);
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull 1 record updated', data: [] })
    } catch (err) {
        if (err) return stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }
}

const deleteBook = async (req, res) => {
    const { id } = req.params
    // cek kelengkapan data
    const validation = myFn.isRequired({ id })
    if (validation) return stdMsg.msg(res, req, 400, 'R01', { message: 'Incomplete Data', ...validation })

    // cek exists
    const cek = await cekExists(id)
    if (!cek) return stdMsg.msg(res, req, 400, 'R03', { message: 'Data Not Exists' })

    // delete
    try {
        let sql = "delete from books where id_book= ?"
        await db.query(sql, [id]);
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull 1 record deleted', data: [] })
    } catch (err) {
        if (err) return stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }



}

const getBookById = async (req, res) => {
    const { id } = req.params

    // cek kelengkapan data
    const validation = myFn.isRequired({ id })
    if (validation) return stdMsg.msg(res, req, 400, 'R01', { message: 'Incomplete Data', ...validation })

    try {
        let sql = "select * from books where id_book= ?"
        const { rows } = await db.query(sql, [id]);
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull', data: rows })
    } catch (err) {
        stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }

}

const getBookAll = async (req, res) => {
    try {
        let sql = "select * from books"
        const { rows } = await db.query(sql, []);
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull', data: rows })
    } catch (err) {
        stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }

}



module.exports = { addBook, editBook, deleteBook, getBookById, getBookAll }
