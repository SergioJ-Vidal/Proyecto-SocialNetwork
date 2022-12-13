const Comment = require("../models/Comment");
const Post = require("../models/Post")

const CommentController = {

    async createComment(req, res) {
        if (req.file) req.body.image = req.file.filename

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

    },

    async update(req, res) {

        try {

            const post = await Comment.findByIdAndUpdate(req.params._id, req.body, { new: true })

            res.send({ message: "Comentario actualizado", post });

        } catch (error) {

            console.error(error);

            res.status(500).send({ message: 'Ha habido un problema al actualizar el comentario' })

        }

    },

    async getById(req, res) {

        try {

            const comment = await Comment.findById(req.params._id)

            res.send(comment)

        } catch (error) {

            console.error(error);

            res.status(500).send({ message: 'Ha habido un problema al obtener el comentario' })

        }

    },

    async delete(req, res) {

        try {

            const comment = await Comment.findByIdAndDelete(req.params._id)

            res.send({ comment, message: 'Comentario borrado' })

        } catch (error) {

            console.error(error)

            res.status(500).send({ message: 'Ha habido un problema al eliminar el Post' })

        }

    },

    async giveLike(req, res) {

        try {

            const commentRelated = await Comment.findByIdAndUpdate(req.params._id,{ new: true });

            commentRelated.likes.push(req.user._id);

            await commentRelated.save()

            res.send(commentRelated)  //postRelated.likes.count()

        } catch (error) {

            console.error(error);

            res.status(500).send({ message: 'Ha habido un problema al publicar el comentario' })

        }

    },

    async deleteLike(req, res) {

        try {

            await Comment.findByIdAndUpdate(req.params._id, {

                $pull: { likes: req.user._id },

            },{ new: true });

            res.send({ message: "Like eliminado" });

        } catch (error) {

            console.error(error);

            res.status(500).send({

                message: "Hubo un problema al intentar eliminar el like",

            });

        }

    },

};

module.exports = CommentController;