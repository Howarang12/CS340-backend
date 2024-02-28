const express = require('express')
const router = express.Router()
const GroupsController = require('../controller/GroupsController')


router.get('/', GroupsController.getAllGroups)
router.get('/:id', GroupsController.getGroupByID)
router.post('/', GroupsController.addGroup)
router.delete('/:id', GroupsController.deleteGroupByID)
router.put('/:id', GroupsController.updateGroupByID)


module.exports = router