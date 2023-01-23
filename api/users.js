const express = require('express');
const usersRouter = express.Router();
const { getAllUsers,
        getUserByUsername,
        createUser
       } = require('../db');
// username was not defined because getUserByUsername was not imported from ../db

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


// json web token stuff!
const jwt = require('jsonwebtoken');


usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "You need both a username and a password!"
        });
    };

    try {
        const user = await getUserByUsername(username);
    
        if (user && user.password == password) {
          // create token & return to user
          const token = jwt.sign({ id: user.id, username: username }, process.env.JWT_SECRET);


          res.send({ message: "you're logged in!", token: token });
        } else {
          next({ 
            name: 'IncorrectCredentialsError', 
            message: 'Username or password is incorrect'
          });
        }
      } catch(error) {
        console.log(error);
        next(error);
      }
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, name, location } = req.body;

  try {

    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists!"
      });
    };

    const user = await createUser({
      username,
      password,
      name,
      location,
    });

    const token = jwt.sign({
      id: user.id,
      username
    }, process.env.JWT_SECRET, {
      expiresIn: "1w"
    });

    res.send({
      message: "Thank you for signing up!",
      token
    });

  } catch ({ name, message }) {
    next({ name, message });
  };
});




module.exports = usersRouter;

