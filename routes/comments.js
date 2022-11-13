const express = require('express');

const router = express.Router()

const CommentController = require('../controllers/CommentController');

const { authentication, isAdmin } = require("../middleware/authentication");

router.post('/create/:_id/comment', authentication, CommentController.createComment)

module.exports = router;