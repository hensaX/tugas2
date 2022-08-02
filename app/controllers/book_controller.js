const myFn = require('./../libs/myFunction');
const stdMsg = require('./../libs/standartMessage');
const { BookService } = require('./../services/book_service');
const BookSv = new BookService()

const addBook = async (req, res) => {
    const { title, pub_year, price, notes, id_author, id_category } = req.body

    // cek kelengkapan data
    const validation = myFn.isRequired({ title, pub_year, price, id_author, id_category })
    if (validation) return stdMsg.msg(res, req, 400, 'R01', { message: 'Incomplete Data', ...validation })

    try {
        await BookSv.add({ title, pub_year, price, notes, id_author, id_category })
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
    const cek = await BookSv.cekExists(id_book)
    if (!cek) return stdMsg.msg(res, req, 400, 'R03', { message: 'Data Not Exists' })

    // update
    try {
        await BookSv.edit({ id_book, title, pub_year, price, notes, id_author, id_category })
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
    const cek = await BookSv.cekExists(id)
    if (!cek) return stdMsg.msg(res, req, 400, 'R03', { message: 'Data Not Exists' })

    // delete
    try {
        await BookSv.delete({ id })
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
        const rows = await BookSv.getBookById({ id })
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull', data: rows })
    } catch (err) {
        stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }

}

const getBookAll = async (req, res) => {
    try {
        const rows = await BookSv.getBookAll()
        stdMsg.msg(res, req, 200, 'R00', { message: 'Successfull', data: rows })
    } catch (err) {
        stdMsg.msg(res, req, 400, 'R99', { message: err.message })
    }

}



module.exports = { addBook, editBook, deleteBook, getBookById, getBookAll }
