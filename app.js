// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");
const User = require('./models/User.model')
// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();
bodyParser = require("body-parser");
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const favicon = require('serve-favicon');
// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

//Authentication Packages
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const passport = require('passport') 
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy({
    usernameField: 'email',
    },
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
));

// Middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));


// Express View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

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
passport.serializeUser(function(user, done) {
    done(null, user._id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id)
    .then(dbUser => {
      done(null, dbUser)
    })
    .catch(err => {
      done(err)
    })
});

app.use(passport.initialize());
app.use(passport.session());

// set registerHelper to parse date
const moment = require('moment') 
const dateFormat = {
  short: 'DD.MM.YYYY'
}
hbs.registerHelper('formatDate', function(datetime, format) {
  if (moment) {
    format = dateFormat[format] || format;
    return moment(datetime).format(format);
  }
  else {
    return datetime;
  }
})
//set login variable
app.use(function(req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated()
  console.log(req.body.user)
  console.log(res.locals.isAuthenticated)
  next()
})

hbs.localsAsTemplateData(app);

// default value for title local
const projectName = "ora-arts";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${projectName} | developed by core and pat`
console.log(app.locals)

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const editorial = require("./routes/editorial");
app.use("/", editorial);

const auth = require("./routes/auth");
const { DefaultDeserializer } = require("v8");
app.use("/", auth);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
