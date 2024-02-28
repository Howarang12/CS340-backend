const express = require('express')
const router = express.Router()
const UserGroupsController = require('../controller/UserGroupsController')

router.get('/', UserGroupsController.getAllUserGroups)
router.post('/', UserGroupsController.addUserGroup)


module.exports = router