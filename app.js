const express = require('express')
const app = express()
require('dotenv').config()
const { AuthToken } = require('./app/middlewares/jwtAuth')


// middleware
app.use(express.json())

// add all router
app.use('/api/login', require('./app/routes/login_routes'))
app.use('/api/user', AuthToken, require('./app/routes/user_routes'))
app.use('/api/category', AuthToken, require('./app/routes/category_routes'))
app.use('/api/author', AuthToken, require('./app/routes/author_routes'))
app.use('/api/book', AuthToken, require('./app/routes/book_routes'))
app.use('/api/*', (req, res) => { res.status(404).json({ message: 'invalid Url' }) })

module.exports = app;