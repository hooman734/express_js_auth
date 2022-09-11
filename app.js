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

// make session store ready
const sqlite = require("better-sqlite3");
const SqliteStore = require("better-sqlite3-session-store")(session);

const db = new sqlite("sessions.db");

// set session
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  store: new SqliteStore({
    client: db,
    expired: {
      clear: true,
      intervalMs: 900000 //ms = 15min
    }
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