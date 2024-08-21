const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    filename: {
        type: String,
    },
    user: {
        type: String
    },
    description: {
        type: String,
    },
    likes: {
        type: String,
    },
    comments: {
        type: String,
    }
})

const post = new mongoose.model("post", postSchema);
module.exports = post;