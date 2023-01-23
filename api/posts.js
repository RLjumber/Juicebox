const express = require('express');
const postsRouter = express.Router();
const { getAllPosts, createPost } = require('../db')
const { requireUser } = require("./utils");


postsRouter.post("/", requireUser, async (req, res, next) => {
    console.log("this worked!");
    const { title, content, tags = "" } = req.body;

    const tagArr = tags.trim().split(/\s+/)
    const postData = {};

// STOPPED HERE!!!! Cant figure out how to get this to get hit as above issue

    res.send({ message: "under construction!" });
})

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