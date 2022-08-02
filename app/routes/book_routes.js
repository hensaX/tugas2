const express = require('express')
const router = express.Router()
const book = require('./../controllers/book_controller')

router.post('/addBook', book.addBook)
router.put('/editBook', book.editBook)
router.delete('/deleteBook/:id', book.deleteBook)
router.get('/getBookById/:id', book.getBookById)
router.get('/getBookAll', book.getBookAll)
router.get('/getBookFilter', book.getBookFilter)

module.exports = router