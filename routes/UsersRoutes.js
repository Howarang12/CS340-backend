const express = require('express')
const router = express.Router()
const UsersController = require('../controller/UsersController')

router.get('/', UsersController.getAllUsers)
router.get('/:id', UsersController.getUserByID)
router.post('/', UsersController.addUser)
router.delete('/:id', UsersController.deleteUserByID)
router.put('/:id', UsersController.updateUserByID)

module.exports = router