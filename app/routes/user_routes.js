const express = require('express')
const router = express.Router()
const user = require('./../controllers/user_controller')

router.post('/addUser', user.addUser)
router.put('/editUser', user.editUser)
router.delete('/deleteUser/:userid', user.deleteUser)
router.get('/getUserId/:userid', user.getUserId)



module.exports = router