const Post = require("../models/Post");

const PostController = {

    async create(req, res) {

        try {

            const post = await Post.create({...req.body, userId: req.user._id})

            res.status(201).send(post)

        } catch (error) {

            console.error(error)

            res.status(500).send({ message: 'Ha habido un problema al crear el Post' })

        }

    },

    async getAll(req, res) {

        try {

            const posts = await Post.find()

            res.send(posts)

        } catch (error) {

            console.error(error);

            res.status(500).send({ message: 'Ha habido un problema al obtener los Posts' })

        }

    },

    async getById(req, res) {

        try {

            const post = await Post.findById(req.params._id)

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

            const post = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true })

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

}

module.exports = PostController;