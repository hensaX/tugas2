const db = require('./../configs/dbconfig');
const myFn = require('./../libs/myFunction');
const stdMsg = require('./../libs/standartMessage');


// fungsi cek exists
const cekExists = async (id) => {
    let cek = false
    let sql = "select * from category where id_category= ?"
    const res = await db.query(sql, [id]);

    if (res.rowCount != 0) { cek = true }
    return cek

}

const addCategory = async (req, res) => {
    const { category_name } = req.body

    // cek kelengkapan data
    const validation = myFn.isRequired({ category_name })
    if (validation) return stdMsg.msg(res, req, 400, 'R01', { message: 'Incomplete Data', ...validation })

    try {
        let sql = "INSERT INTO category (category_name) VALUES (?)"
        const { rows } = await db.query(sql, [category_name]);
        stdMsg.msg(res, req, 201, 'R00', { message: 'Successfull 1 record inserted' })
    } catch (err) {
        if (err) return stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }


}

const editCategory = async (req, res) => {
    const { id_category, category_name } = req.body

    // cek kelengkapan data
    const validation = myFn.isRequired({ id_category, category_name })
    if (validation) return stdMsg.msg(res, req, 400, 'R01', { message: 'Incomplete Data', ...validation })

    // cek exists
    const cek = await cekExists(id_category)
    if (!cek) return stdMsg.msg(res, req, 400, 'R03', { message: 'Data Not Exists' })

    // update
    try {
        let sql = "update category set updated=datetime('now','localtime'),category_name=? where id_category=?"
        await db.query(sql, [category_name, id_category]);
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull 1 record updated', data: [] })
    } catch (err) {
        if (err) return stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params
    // cek kelengkapan data
    const validation = myFn.isRequired({ id })
    if (validation) return stdMsg.msg(res, req, 400, 'R01', { message: 'Incomplete Data', ...validation })

    // cek exists
    const cek = await cekExists(id)
    if (!cek) return stdMsg.msg(res, req, 400, 'R03', { message: 'Data Not Exists' })

    // delete
    try {
        let sql = "delete from category where id_category= ?"
        await db.query(sql, [id]);
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull 1 record deleted', data: [] })
    } catch (err) {
        if (err) return stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }



}

const getCategoryById = async (req, res) => {
    const { id } = req.params


    // cek kelengkapan data
    const validation = myFn.isRequired({ id })
    if (validation) return stdMsg.msg(res, req, 400, 'R01', { message: 'Incomplete Data', ...validation })

    try {
        let sql = "select * from category where id_category= ?"
        const { rows } = await db.query(sql, [id]);
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull', data: rows })
    } catch (err) {
        stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }

}

const getCategoryAll = async (req, res) => {


    try {
        let sql = "select * from category"
        const { rows } = await db.query(sql, []);
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull', data: rows })
    } catch (err) {
        stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }

}



module.exports = { addCategory, editCategory, deleteCategory, getCategoryById, getCategoryAll }
