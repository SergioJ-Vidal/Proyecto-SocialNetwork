const mongoose = require('mongoose');

const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({

    title:  {
        type: String,
        required: [true, "Por favor rellena el título"]
      },

    body:  {
        type: String,
        required: [true, "Por favor rellena el post"]
      },

    userId: {
        type: ObjectId,
        ref: 'User'
    },

    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comment'
    }],

    likes: [{type: ObjectId}]

}, { timestamps: true });

PostSchema.index({

    title: "text",

});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;