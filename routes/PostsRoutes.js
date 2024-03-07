const express = require('express')
const router = express.Router()
const PostsController = require('../controller/PostsController')

router.get('/', PostsController.getAllPosts)
router.post('/', PostsController.addPost)
router.delete('/:id', PostsController.deletePostByID)
router.put('/:id', PostsController.updatePostByID)

module.exports = router