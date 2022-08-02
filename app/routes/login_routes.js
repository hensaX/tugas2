const express = require('express')
const router = express.Router()
const user = require('./../controllers/login_controller')

router.post('/loginAuth', user.loginAuth)



module.exports = router