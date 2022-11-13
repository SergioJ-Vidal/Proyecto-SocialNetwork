const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

name: String,

email: String,

password: String,

age: Number,

role: String,

posts: Array,

tokens: []

}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;