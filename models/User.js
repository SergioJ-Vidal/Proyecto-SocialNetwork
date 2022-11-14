const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true
  },

  role: {
    type: String,
    required: true
  },

  posts: [{
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