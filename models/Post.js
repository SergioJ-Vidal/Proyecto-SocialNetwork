const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

    title: String,

    body: String,

}, { timestamps: true });

PostSchema.index({

    title: "text",

});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;