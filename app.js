// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const favicon = require('serve-favicon');
// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

// Middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

//set login variable
app.use(function(req, res, next) {
    res.locals.isAuthenticated = (req.body) ? true : false
    console.log(req.body.user)
    console.log(res.locals.isAuthenticated)
    next()
})
hbs.localsAsTemplateData(app);

// session configuration
const session = require('express-session');
// session store using mongo
const MongoStore = require('connect-mongo')(session)

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        saveUninitialized: false,
        resave: true,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    })
)
// end of session configuration


// default value for title local
const projectName = "march-version";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with IronGenerator`;
console.log(app.locals)

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const editorial = require("./routes/editorial");
app.use("/", editorial);

const auth = require("./routes/auth");
app.use("/", auth);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
