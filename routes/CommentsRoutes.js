const express = require('express')
const router = express.Router()
const CommentsController = require('../controller/CommentsController')

router.get('/', CommentsController.getAllComments)
router.post('/', CommentsController.addComment)
router.delete('/:id', CommentsController.deleteCommentByID)
router.put('/:id', CommentsController.editCommentByID)

module.exports = router