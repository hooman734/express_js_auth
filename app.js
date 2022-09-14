const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');


// make accesible the environment variables
require('dotenv').config();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// serve static folder
app.use('/static', express.static(path.resolve(__dirname, 'Public')));

// set the template engine
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'Views'));

// make session store ready
const MemoryStore = require('memorystore')(session);

// set session
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
}));

// insert controllers
const welcomeRouter = require(path.resolve(__dirname, 'Controllers', 'welcome.route.js'));
const authRouter = require(path.resolve(__dirname, 'Controllers', 'auth.route.js'));
app.use(welcomeRouter);
app.use(authRouter);

// set serving port
const port = process.env.PORT;

// initialise the server
app.listen(port, () => {
  console.log(`serving on http://localhost:${port}`);
});