const Comment = require("../models/Comment");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys.js')

const CommentController = {

    async createComment(req, res) {

        try {

            const comment = await Post.findById(req.params._id)

            res.send(comment)

        } catch (error) {

            console.error(error);

            res.status(500).send({ message: 'Ha habido un problema al publicar el comentario' })

        }

    }

};

module.exports = CommentController;