const express = require('express')
const app = express()
require('dotenv').config()



// middleware
app.use(express.json())

// add all router

app.use('/api/*', (req, res) => { res.status(404).json({ message: 'invalid Url' }) })

module.exports = app;