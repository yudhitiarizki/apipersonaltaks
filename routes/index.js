const express = require("express");
const router = express.Router();

const { listPost, addPost, searchPost, editPost, removePost } = require("./posts");
const { listComment, addComment, editComment, removeComment } = require("./comments");

router.get('/posts', listPost);
router.post('/posts', addPost);
router.get('/posts/:search', searchPost);
router.put('/posts/:postsId', editPost);
router.delete('/posts/:postsId', removePost);

router.get('/comments/:postsId', listComment);
router.post('/comments/:postsId', addComment);
router.put('/comments/:commentsId', editComment);
router.delete('/comments/:commentsId', removeComment);

module.exports = router;
