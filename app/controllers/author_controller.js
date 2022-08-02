const db = require('./../configs/dbconfig');
const myFn = require('./../libs/myFunction');
const stdMsg = require('./../libs/standartMessage');


// fungsi cek exists
const cekExists = async (id) => {
    let cek = false
    let sql = "select * from authors where id_author= ?"
    const res = await db.query(sql, [id]);

    if (res.rowCount != 0) { cek = true }
    return cek

}

const addAuthor = async (req, res) => {
    const { author_name, penname, gender } = req.body

    // cek kelengkapan data
    const validation = myFn.isRequired({ author_name, gender })
    if (validation) return stdMsg.msg(res, req, 400, 'R01', { message: 'Incomplete Data', ...validation })

    if (!(['female', 'male'].includes(gender.toLowerCase()))) return stdMsg.msg(res, req, 400, 'R01', { message: 'Gender Must female or male' })

    try {
        let sql = "INSERT INTO authors (author_name, penname, gender) VALUES (?,?,?)"
        const { rows } = await db.query(sql, [author_name, penname, gender]);
        stdMsg.msg(res, req, 201, 'R00', { message: 'Successfull 1 record inserted' })
    } catch (err) {
        if (err) return stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }

}

const editAuthor = async (req, res) => {
    const { id_author, author_name, penname, gender } = req.body

    // cek kelengkapan data
    const validation = myFn.isRequired({ id_author, author_name })
    if (validation) return stdMsg.msg(res, req, 400, 'R01', { message: 'Incomplete Data', ...validation })

    // cek exists
    const cek = await cekExists(id_author)
    if (!cek) return stdMsg.msg(res, req, 400, 'R03', { message: 'Data Not Exists' })

    // update
    try {
        let sql = "update authors set updated=datetime('now','localtime'),author_name=?,penname=?,gender=? where id_author=?"
        await db.query(sql, [author_name, penname, gender, id_author]);
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull 1 record updated', data: [] })
    } catch (err) {
        if (err) return stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }
}

const deleteAuthor = async (req, res) => {
    const { id } = req.params
    // cek kelengkapan data
    const validation = myFn.isRequired({ id })
    if (validation) return stdMsg.msg(res, req, 400, 'R01', { message: 'Incomplete Data', ...validation })

    // cek exists
    const cek = await cekExists(id)
    if (!cek) return stdMsg.msg(res, req, 400, 'R03', { message: 'Data Not Exists' })

    // delete
    try {
        let sql = "delete from authors where id_author= ?"
        await db.query(sql, [id]);
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull 1 record deleted', data: [] })
    } catch (err) {
        if (err) return stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }



}

const getAuthorById = async (req, res) => {
    const { id } = req.params


    // cek kelengkapan data
    const validation = myFn.isRequired({ id })
    if (validation) return stdMsg.msg(res, req, 400, 'R01', { message: 'Incomplete Data', ...validation })

    try {
        let sql = "select * from authors where id_author= ?"
        const { rows } = await db.query(sql, [id]);
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull', data: rows })
    } catch (err) {
        stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }

}

const getAuthorAll = async (req, res) => {


    try {
        let sql = "select * from authors"
        const { rows } = await db.query(sql, []);
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull', data: rows })
    } catch (err) {
        stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }

}



module.exports = { addAuthor, editAuthor, deleteAuthor, getAuthorById, getAuthorAll }
