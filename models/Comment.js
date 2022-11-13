const mongoose = require('mongoose');

const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema({

    title: String,

    body: String,

    userId: {

        type: ObjectId,

        ref: 'User'

    },

    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
     },

}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;