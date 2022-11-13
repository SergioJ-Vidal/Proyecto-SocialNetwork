const mongoose = require('mongoose');

const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({

    title: String,

    body: String,

    userId: {

        type: ObjectId,

        ref: 'User'

    },

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],

}, { timestamps: true });

PostSchema.index({

    title: "text",

});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;