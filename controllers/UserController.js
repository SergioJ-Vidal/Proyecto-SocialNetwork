const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys.js')

const UserController = {

    async register(req, res) {

        try {

            const password = await bcrypt.hash(req.body.password, 10)

            const user = await User.create({ ...req.body, password: password });

            res.status(201).send({ message: "Usuario registrado con exito", user });

        } catch (error) {

            console.error(error);

            res.status(500).send({ message: 'Ha habido un problema al registrar el Usuario' })

        }

    },

    async login(req, res) {

        try {

            const user = await User.findOne({

                email: req.body.email,

            })

            if(!user){
               return res.status(400).send("Usuario o contraseña incorrectos")
            }

            const isMatch = bcrypt.compare(req.body.password,user.password)

            if(!isMatch){
               return res.status(400).send("Usuario o contraseña incorrectos")
            }

            const token = jwt.sign({ _id: user._id }, jwt_secret);

            if (user.tokens.length > 4) user.tokens.shift();

            user.tokens.push(token);

            await user.save();

            res.send({ message: 'Bienvenid@ ' + user.name, token });

        } catch (error) {

            console.error(error);

            res.status(500).send({ message: 'Ha habido un problema al logearte' })

        }

    },



};

module.exports = UserController;