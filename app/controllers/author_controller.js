const myFn = require('./../libs/myFunction');
const stdMsg = require('./../libs/standartMessage');
const { AuthorService } = require('./../services/author_service');
const AuthorSv = new AuthorService()

const addAuthor = async (req, res) => {
    const { author_name, penname, gender } = req.body

    // cek kelengkapan data
    const validation = myFn.isRequired({ author_name, gender })
    if (validation) return stdMsg.msg(res, req, 400, 'R01', { message: 'Incomplete Data', ...validation })

    if (!(['female', 'male'].includes(gender.toLowerCase()))) return stdMsg.msg(res, req, 400, 'R01', { message: 'Gender Must female or male' })

    try {
        await AuthorSv.add({ author_name, penname, gender })
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
    const cek = await AuthorSv.cekExists(id_author)
    if (!cek) return stdMsg.msg(res, req, 400, 'R03', { message: 'Data Not Exists' })

    // update
    try {
        await AuthorSv.edit({ author_name, penname, gender, id_author })
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
    const cek = await AuthorSv.cekExists(id)
    if (!cek) return stdMsg.msg(res, req, 400, 'R03', { message: 'Data Not Exists' })

    // delete
    try {
        await AuthorSv.delete({ id })
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
        const rows = await AuthorSv.getAuthorById({ id })
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull', data: rows })
    } catch (err) {
        stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }

}

const getAuthorAll = async (req, res) => {
    try {
        const rows = await AuthorSv.getAuthorAll()
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull', data: rows })
    } catch (err) {
        stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }

}



module.exports = { addAuthor, editAuthor, deleteAuthor, getAuthorById, getAuthorAll }
