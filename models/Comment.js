const mongoose = require('mongoose');

const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema({

    title: String,

    body: String,

    userId: {

        type: ObjectId,

        ref: 'User'

    },

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
     },

}, { timestamps: true });

PostSchema.index({

    title: "text",

});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;