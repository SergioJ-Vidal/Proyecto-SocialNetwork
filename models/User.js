const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, "Por favor rellena tu nombre"]
  },

  email: {
    type: String,
    // match: [/.+\@.+\..+/, "Este correo no es válido"],
    match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Este correo no es válido"],
    unique: true,
    required: [true, "Por favor rellena tu email"]
  },

  password: {
    type: String,
    required: [true, "Por favor rellena tu contraseña"]
  },

  image: {
    type: String,
  },

  age: {
    type: Number,
    required: [true, "Por favor rellena tu edad"]
  },

  role: {
    type: String,
    required: true
  },

  confirmed: {
    type: Boolean,
  },

  posts: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Post'
  }],

  followers: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  }],

  following: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  }],

  postsFollowed: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Post'
  }],

  tokens: []

}, { timestamps: true });

UserSchema.methods.toJSON = function () {

  const user = this._doc;

  delete user.tokens;

  delete user.password;

  return user;

}

const User = mongoose.model('User', UserSchema);

module.exports = User;