const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postsId: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: false
    },
    authorname: {
        type: String,
        required: true,
    },
    dateofcreate: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Post", postSchema);