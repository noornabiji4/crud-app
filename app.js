var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var passport = require('passport')
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require("passport-local-mongoose")


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var profileRouter = require('./routes/profile');
// var newProfileRouter = require('./routes/newProfile')

var session = require("express-session")

var app = express();

// Passport Configure
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "ast u",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const db = require('./models');


// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(db.User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// requires the model with Passport-Local Mongoose plugged in



//Parsar application json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))



app.use(flash());
app.locals.moment = require('moment');
// parse application/json
app.use(bodyParser.json())

//middleware using
app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})




app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);
// app.use('/newProfile', newProfileRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
