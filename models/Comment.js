const mongoose = require('mongoose');

const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema({

    title:  {
        type: String,
        required: [true, "Por favor rellena el título"]
      },

    body:  {
        type: String,
        required: [true, "Por favor rellena el comentario"]
      },

    userId: {
        type: ObjectId,
        ref: 'User'
    },

    postId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Post'
     },

}, { timestamps: true });


CommentSchema.index({

    title: "text",

});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;