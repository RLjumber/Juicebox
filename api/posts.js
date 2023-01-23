const express = require('express');
const postsRouter = express.Router();
const { getAllPosts } = require('../db')
const { requireUser } = require("./utils");


postsRouter.post("/", requireUser, async (req, res, next) => {
    console.log("this worked!")
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