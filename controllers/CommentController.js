const Comment = require("../models/Comment");
const Post = require("../models/Post")

const CommentController = {

    async createComment(req, res) {

        try {

            const comment = await Comment.create({...req.body, userId: req.user._id, postId: req.params._id})
            
            const postRelated = await Post.findByIdAndUpdate(req.params._id);
            
            postRelated.comments.push(comment);
            
            await postRelated.save()
            
            res.send(postRelated)

        } catch (error) {

            console.error(error);

            res.status(500).send({ message: 'Ha habido un problema al publicar el comentario' })

        }

    }

};

module.exports = CommentController;