const Post = require("../models/Post");
const User = require("../models/User")

const PostController = {

    async create(req, res) {
        if (req.file) req.body.image = req.file.filename

        try {

            const post = await Post.create({ ...req.body, userId: req.user._id })

            const userRelated = await User.findByIdAndUpdate(req.user._id);

            userRelated.posts.push(post);

            await userRelated.save()

            res.status(201).send(post)

        } catch (error) {

            console.error(error)

            res.status(500).send({ message: 'Ha habido un problema al crear el Post' })

        }

    },

    async getAll(req, res) {

        try {

            const posts = await Post.find()
                .populate({
                    path: "comments",
                    select: {title: 1, body: 1},

                    populate: {

                        path: "userId",
                        select: {name: 1, role: 1}
                    },
                })
                .populate({
                    path: "userId",
                    select: {name: 1, role: 1},
                })
                .limit(req.query.limit)
                .skip((req.query.page - 1) * req.query.limit)
            res.send(posts)

        } catch (error) {

            console.error(error);

            res.status(500).send({ message: 'Ha habido un problema al obtener los Posts' })

        }

    },

    async getById(req, res) {

        try {

            const post = await Post.findById(req.params._id)
            .populate({
                path: "userId",
                select: {name: 1, role: 1},
            }
            
            )
            .populate({
                path: "comments",
                select: {title: 1, body: 1},

                populate: {

                    path: "userId",
                    select: {name: 1, role: 1}
                },
            })

            res.send(post)

        } catch (error) {

            console.error(error);

            res.status(500).send({ message: 'Ha habido un problema al obtener el Post' })

        }

    },

    async getPostsByTitle(req, res) {

        try {

            const posts = await Post.find({

                $text: {

                    $search: req.params.title,

                },

            });

            res.send(posts);

        } catch (error) {

            console.log(error);

            res.status(500).send({ message: 'Ha habido un problema al obtener el Post' })

        }

    },

    async update(req, res) {

        try {
            console.log(req.body)
            const post = await Post.findByIdAndUpdate(req.params._id, req.body, {new:true})
            res.send({ message: "Post actualizado", post });

        } catch (error) {

            console.error(error);

            res.status(500).send({ message: 'Ha habido un problema al actualizar el Post' })

        }

    },

    async delete(req, res) {

        try {

            const post = await Post.findByIdAndDelete(req.params._id)

            res.send({ post, message: 'Post borrado' })

        } catch (error) {

            console.error(error)

            res.status(500).send({ message: 'Ha habido un problema al eliminar el Post' })

        }

    },

    async giveLike(req, res) {

        try {

            const postRelated = await Post.findByIdAndUpdate(req.params._id, { new: true })
            .populate({
                path: "comments",
                select: {title: 1, body: 1},

                populate: {

                    path: "userId",
                    select: {name: 1, role: 1}
                },
            })
            .populate({
                path: "userId",
                select: {name: 1, role: 1},
            })

            postRelated.likes.push(req.user._id);

            await postRelated.save()

            res.send(postRelated) 

        } catch (error) {

            console.error(error);

            res.status(500).send({ message: 'Ha habido un problema al publicar el comentario' })

        }

    },

    async deleteLike(req, res) {

        try {

            await Post.findByIdAndUpdate(req.params._id, {

                $pull: { likes: req.user._id },

            }, { new: true });

            res.send({ message: "Like eliminado" });

        } catch (error) {

            console.error(error);

            res.status(500).send({

                message: "Hubo un problema al intentar eliminar el like",

            });

        }

    },

}

module.exports = PostController;

