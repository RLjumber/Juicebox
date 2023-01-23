const express = require('express');
const postsRouter = express.Router();
const { getAllPosts, createPost } = require('../db')
const { requireUser } = require("./utils");


postsRouter.post("/", requireUser, async (req, res, next) => {
    console.log("requireUser was passed");
    const { title, content, tags = "" } = req.body;

    const tagArr = tags.trim().split(/\s+/)
    const postData = {};

    // send the tags into tagArr/postData if there are tags to send
    if (tagArr.length) {
        postData.tags = tagArr;
    }

    try {
        // add authorId, title, content to postData object
        postData.authorId = req.user.id;
        postData.title = title;
        postData.content = content;

        const post = await createPost(postData);

        if (post) {
            res.send({ post });
        } else({ name: "error", message: "Error, post not created!"});

    } catch ({ name, message }) {
        next({ name, message });
    }
});


postsRouter.use((req, res, next) =>
{
    console.log('a request is being made to /posts');

    next();
});


postsRouter.get('/', async (req, res) => {
    const posts = await getAllPosts();

    res.send({
        posts
    });
});


module.exports = postsRouter;