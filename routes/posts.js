const Posts = require("../schemas/post");

const listPost = async (req, res) => {
    const post = await Posts.find().sort({postsId: -1});
    res.json({
        posts: post
    });
};

const addPost = async (req, res) => {
    const { dateofcreate, title, authorname, password, content } = req.body;
    const data = await Posts.find().sort({dateofcreate: -1});
    const postsId = data.length ? data[0].postsId + 1 : 1;
    const createdPosts = await Posts.create({
        postsId:postsId, dateofcreate:dateofcreate, title:title, authorname:authorname, password:password, content:content
    });
    res.json({ posts: createdPosts });
};


const searchPost = async (req, res) => {
    const { search } = req.params;
    const onlyNum = /^[0-9]+$/;
    if (search.match(onlyNum)){
        const data = await Posts.find({ postsId: search });
        res.json({ data });
    } else {
        const result = await Posts.find({"$or": [
            {"title": {'$regex': search, "$options": "i"}}, 
            {"authorname": {'$regex': search, "$options": "i"}},
            {"content": {'$regex': search, "$options": "i"}}
        ]});
	    res.json({ result });
    }
};

const editPost = async (req, res) => {
    const { postsId } = req.params;
    const quantity = req.body;
  
    const existsPosts = await Posts.find({ postsId: Number(postsId) });
    if (existsPosts.length) {
        if ( existsPosts[0].password === req.body.password ) {
            await Posts.updateOne({ postsId: Number(postsId) }, { $set: { title: quantity.title, authorname: quantity.authorname, content: quantity.content } });
            res.json({ success: "Data has change"});
        } else {
            res.json({failed: "Password is Wrong"});
        }
    } else { 
        res.json({failed: "Data not found"});
    };
};

const removePost = async (req, res) => {
    const { postsId } = req.params;

    const existsPosts = await Posts.find({ postsId: Number(postsId) });
    if (existsPosts.length) {
        if ( existsPosts[0].password === req.body.password ) {
            await Posts.deleteOne({ postsId: Number(postsId) });
            res.json({ success: "Data has been delete"});
        } else {
            res.json({failed: "Password is Wrong"});
        }
    } else { 
        res.json({failed: "Data not found"});
    };
};

module.exports = { listPost, addPost, searchPost, removePost, editPost };