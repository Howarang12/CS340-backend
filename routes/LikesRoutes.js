const express = require('express')
const router = express.Router()
const LikesController = require('../controller/LikesController')


router.get('/', LikesController.getLikes)
router.post('/', LikesController.addLike)
router.delete('/dislike/:id', LikesController.deleteLikeByID)


module.exports = router