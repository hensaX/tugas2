const express = require('express')
const router = express.Router()
const author = require('./../controllers/author_controller')

router.post('/addAuthor', author.addAuthor)
router.put('/editAuthor', author.editAuthor)
router.delete('/deleteAuthor/:id', author.deleteAuthor)
router.get('/getAuthorById/:id', author.getAuthorById)
router.get('/getAuthorAll', author.getAuthorAll)

module.exports = router