const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    commentsId: {
        type: Number,
        required: true,
        unique: true
    },
    postsId: {
        type: Number,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },

});

module.exports = mongoose.model("Comment", commentSchema);