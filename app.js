const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mySQLStore = require('express-mysql-session')(session);

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

// set session store
const options = {
  host: process.env.MYSQl_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
};

// make session store ready
const sessionStore = new mySQLStore(options);

// set session
app.use(session({
  secret: process.env.SESSION_KEY,
  // store: sessionStore,
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
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