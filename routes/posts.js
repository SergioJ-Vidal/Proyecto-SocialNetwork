const express = require('express');

const router = express.Router()

const PostController = require('../controllers/PostController');

router.post('/create',PostController.create)
router.get('/find',PostController.getAll)
router.get('/find/id/:_id',PostController.getById)
router.get('/find/title/:title',PostController.getPostsByTitle)
router.put('/update/:_id', PostController.update)
router.delete('/delete/id/:_id',PostController.delete)

module.exports = router;