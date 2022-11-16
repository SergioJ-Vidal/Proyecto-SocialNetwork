const express = require('express');

const router = express.Router()

const UserController = require('../controllers/UserController');

const { authentication, isAdmin } = require("../middleware/authentication");

router.post('/create',UserController.register)
router.get('/confirm/:emailToken',UserController.confirm)
router.post('/login',UserController.login)
router.delete('/logout',authentication, UserController.logout)
router.get('/find', UserController.getAll)
router.get('/findId',authentication, UserController.getById)
router.get('/findbyId/:_id', UserController.findbyId)
router.get('/findByName/:_name', UserController.getByName)
router.put('/follow/:_id', authentication, UserController.giveFollow)
router.delete('/unfollow/:_id', authentication, UserController.deleteFollow)

module.exports = router;