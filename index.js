const PORT = 3000;
const express = require('express');
const server = express();

// connect our client
const { client } = require('./db');
client.connect();

// logs our middleware
const morgan = require('morgan');
server.use(morgan('dev'));

// parses our data into json format
server.use(express.json());

// makes a request using apiRouter to /api/users
const apiRouter = require('./api');
server.use('/api', apiRouter);


server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
  });


server.listen(PORT, () => {
  console.log('The server is up on port', PORT);
});



