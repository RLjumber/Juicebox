const express = require('express');
const usersRouter = express.Router();
const { getAllUsers } = require('../db');


usersRouter.use((req, res, next) =>
{
    console.log('a request is being made to /users');

    next();
});


usersRouter.get('/', async (req, res) => {
    const users = await getAllUsers();

    res.send({
        users
    });
});


module.exports = usersRouter;

