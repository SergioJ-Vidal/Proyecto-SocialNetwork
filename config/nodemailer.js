const nodemailer = require('nodemailer');

require("dotenv").config();

let transporter = nodemailer.createTransport({

host: 'smtp.gmail.com',

port: 465,

secure: true,

auth: {

user: 'juanvidal.sergio@gmail.com',

pass: process.env.NODEMAILER,

}

});

module.exports = transporter;