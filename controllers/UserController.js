const User = require("../models/User");
const transporter = require("../config/nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

require("dotenv").config();

const UserController = {

    async register(req, res) {
        if (req.file) req.body.image = req.file.filename

        try {

            const password = await bcrypt.hash(req.body.password, 10)

            const user = await User.create({ ...req.body, password: password, role: "user", confirmed: false });

            const emailToken = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, { expiresIn: '48h' })

            const url = 'http://localhost:8080/users/confirm/' + emailToken

            console.log(url)

            await transporter.sendMail({

                to: req.body.email,

                subject: "Confirme su registro",

                html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
                
                <a href="${url}"> Click para confirmar tu registro</a>
                
                `,

            });

            res.status(201).send({ message: "Usuario registrado con exito", user });

        } catch (error) {

            console.error(error);

            res.status(500).send({ message: 'Ha habido un problema al registrar el Usuario' })

        }

    },

    async confirm(req, res) {

        try {

            const token = req.params.emailToken

            const payload = jwt.verify(token, process.env.JWT_SECRET)

            await User.updateOne({ email: payload.email }, { confirmed: true, })

            res.status(201).send("Usuario confirmado con éxito");

        } catch (error) {

            console.error(error)

        }

    },

    async login(req, res) {

        try {

            const user = await User.findOne({ email: req.body.email, })
            .populate({ path: "posts" })

            if (!user) {
                return res.status(400).send("Usuario o contraseña incorrectos")
            }

            const isMatch = bcrypt.compare(req.body.password, user.password)

            if (!isMatch) {
                return res.status(400).send("Usuario o contraseña incorrectos")
            }

            if (!user.confirmed) {

                return res.status(400).send({ message: "Debes confirmar tu correo" })

            }

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

            if (user.tokens.length > 4) user.tokens.shift();

            user.tokens.push(token);

            await user.save();

            res.send({ message: 'Bienvenid@ ' + user.name, token, user });

        } catch (error) {

            console.error(error);

            res.status(500).send({ message: 'Ha habido un problema al logearte' })

        }

    },

    async logout(req, res) {

        try {

            await User.findByIdAndUpdate(req.user._id, {

                $pull: { tokens: req.headers.authorization },

            });

            res.send({ message: "Desconectado con éxito" });

        } catch (error) {

            console.error(error);

            res.status(500).send({

                message: "Hubo un problema al intentar conectar al usuario",

            });

        }

    },

    async getAll(req, res) {

        try {

            const users = await User.find()
                .limit(req.query.limit)
                .skip((req.query.page - 1) * req.query.limit)
            res.send(users)

        } catch (error) {

            console.error(error);

            res.status(500).send({ message: 'Ha habido un problema al obtener los Posts' })

        }

    },

    async getById(req, res) {

        try {

            const user = await User.findById(req.user._id)
                .populate({ path: "posts" })

            res.send(user)

        } catch (error) {

            console.error(error);

            res.status(500).send({ message: 'Ha habido un problema al obtener el Usuario' })

        }

    },

    async getByName(req, res) {

        try {

            const users = await User.find({

                $text: {

                    $search: req.params.name,

                },

            });

            res.send(users);

        } catch (error) {

            console.log(error);

            res.status(500).send({ message: 'Ha habido un problema al obtener el Usuario' })

        }

    },

    async findbyId(req, res) {

        try {

            const user = await User.findById(req.params._id)
            .populate({ path: "posts" })

            res.send(user)

        } catch (error) {

            console.error(error);

            res.status(500).send({ message: 'Ha habido un problema al obtener el Post' })

        }

    },

    async giveFollow(req, res) {

        try {

            const userRelated = await User.findByIdAndUpdate(req.params._id, { new: true });

            userRelated.followers.push(req.user._id);

            await userRelated.save()

            const myUser = await User.findByIdAndUpdate(req.user._id);

            myUser.following.push(req.params._id)

            await myUser.save()

            res.send({ message: 'Has dado follow' })  //postRelated.likes.count()

        } catch (error) {

            console.error(error);

            res.status(500).send({ message: 'Ha habido un problema al dar follow' })

        }

    },

    async deleteFollow(req, res) {

        try {

            await User.findByIdAndUpdate(req.params._id, {

                $pull: { followers: req.user._id },

            }, { new: true });

            await User.findByIdAndUpdate(req.user._id, {

                $pull: { following: req.params._id },

            });

            res.send({ message: "Follow eliminado" });

        } catch (error) {

            console.error(error);

            res.status(500).send({

                message: "Hubo un problema al intentar eliminar el follow",

            });

        }

    },

    async favPosts(req, res) {

        try {

            const userRelated = await User.findByIdAndUpdate(req.user._id);

            userRelated.postsFollowed.push(req.params._id);

            await userRelated.save()

        } catch (error) {

            console.error(error);

            res.status(500).send({

                message: "Hubo un problema al intentar seguir el post.",

            });

        }

    },

}

module.exports = UserController;