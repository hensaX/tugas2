const myFn = require('./../libs/myFunction');
const stdMsg = require('./../libs/standartMessage');
const { CategoryService } = require('./../services/category_service');
const CategorySv = new CategoryService()


const addCategory = async (req, res) => {
    const { category_name } = req.body

    // cek kelengkapan data
    const validation = myFn.isRequired({ category_name })
    if (validation) return stdMsg.msg(res, req, 400, 'R01', { message: 'Incomplete Data', ...validation })

    try {
        await CategorySv.add({ category_name });
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
    const cek = await CategorySv.cekExists(id_category)
    if (!cek) return stdMsg.msg(res, req, 400, 'R03', { message: 'Data Not Exists' })

    // update
    try {
        await CategorySv.add({ category_name });
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
    const cek = await CategorySv.cekExists(id)
    if (!cek) return stdMsg.msg(res, req, 400, 'R03', { message: 'Data Not Exists' })

    // delete    
    try {
        await CategorySv.delete({ id })
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
        const rows = await CategorySv.getCategoryById({ id })
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull', data: rows })
    } catch (err) {
        stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }

}

const getCategoryAll = async (req, res) => {
    try {
        const rows = await CategorySv.getCategoryAll()
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull', data: rows })
    } catch (err) {
        stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }

}



module.exports = { addCategory, editCategory, deleteCategory, getCategoryById, getCategoryAll }
