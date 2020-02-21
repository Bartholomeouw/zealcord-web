require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var botsRouter = require('./routes/bots');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', indexRouter);
app.get('/bots', botsRouter);
app.get('/bots/:page', botsRouter);
app.get("/discord", (req, res) => {
  res.status(200);
  res.redirect("https://discordapp.com/invite/nEFuEvA");
});

app.get("/invite", (req, res) => {
  res.status(200);
  res.redirect("https://discordapp.com/invite/nEFuEvA");
});

app.get("/mee6", (req, res) => {
  res.status(200);
  res.redirect("https://bit.ly/zcRanks");
});

app.get("/leaderboard", (req, res) => {
  res.status(200);
  res.redirect("https://bit.ly/zcRanks");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
