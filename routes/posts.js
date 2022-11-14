const express = require('express');

const router = express.Router()

const PostController = require('../controllers/PostController');

const { authentication, isAdmin } = require("../middleware/authentication");

router.post('/create',authentication,PostController.create)
router.get('/find', PostController.getAll)
router.get('/find/id/:_id',PostController.getById)
router.get('/find/title/:title',PostController.getPostsByTitle)
router.put('/update/:_id',authentication, PostController.update)
router.put('/givelike/:_id',authentication, PostController.giveLike)
router.delete('/deletelike/:_id',authentication, PostController.deleteLike)
router.delete('/delete/id/:_id',authentication, PostController.delete)

module.exports = router;