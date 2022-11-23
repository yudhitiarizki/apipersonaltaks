const Posts = require("../schemas/post");
const Comments = require("../schemas/comment");

const listComment = async (req, res) => {
    const { postsId } = req.params;
    const comments = await Comments.find();

    const filteredData = comments.filter((comment) => Number(comment.postsId) === Number(postsId));
    if(filteredData.length){
        res.json({
            Comments: filteredData
        });
    } else {
        res.json({Ccomments: filteredData});
    }
};

const addComment = async (req, res) => {
    const { content } = req.body;
    const id = req.params.postsId;
    const postsId = Number(id);

    const commentsdata = await Comments.find().sort({commentsId: -1})
    const post = await Posts.find({postsId: postsId});
    if (post.length){
        if(content.trim() === ""){
            res.json({Error: "Content is black"});
        } else {
            const commentsId = commentsdata.length ? commentsdata[0].commentsId + 1 : 1;
            const createdComments = await Comments.create({
                commentsId:commentsId, postsId:postsId, content:content
            });
            res.json({ comments: createdComments });
        }
    } else {
        res.json({Error: "Post ID Not Found"});
    }
};

const editComment = async (req, res) => {
    const { content } = req.body;
    const { commentsId }= req.params;

    const data = await Comments.find({ commentsId: Number(commentsId) });
    if (data.length){
        if ( content.trim() !== "" ){
            await Comments.updateOne({ commentsId: Number(commentsId) }, { $set: { content: content } });
            res.json({ Message: "Success" });
        } else {
            res.json({Error: "Fill the input!"});
        }
    } else {
        res.json({ Error: 'Data not found' });
    }
};

const removeComment = async (req, res) => {
    const { commentsId }= req.params;

    const data = await Comments.find({ commentsId: Number(commentsId) });
    if (data.length){
        await Comments.deleteOne({ commentsId: Number(commentsId) });
        res.json({ Message: "Success" });
    } else {
        res.json({ Error: 'Data not found' });
    }
};

module.exports = { listComment, addComment, removeComment, editComment };