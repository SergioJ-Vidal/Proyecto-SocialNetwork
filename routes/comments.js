const express = require('express');

const router = express.Router()

const CommentController = require('../controllers/CommentController');

const { authentication, isAdmin, isAuthorComment } = require("../middleware/authentication");

router.post('/create/:_id/comment', authentication, CommentController.createComment)
router.put('/update/:_id', authentication, isAuthorComment, CommentController.update)
router.get('/find/id/:_id', CommentController.getById)
router.put('/givelike/:_id',authentication, CommentController.giveLike)
router.delete('/deletelike/:_id',authentication, CommentController.deleteLike)
router.delete('/delete/id/:_id',authentication, isAuthorComment, CommentController.delete)

module.exports = router;