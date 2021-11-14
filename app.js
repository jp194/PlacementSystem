var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var homeRouter = require('./routes/home');
var aboutRouter = require('./routes/about');
var preparationRouter = require('./routes/preparation');
var contactRouter = require('./routes/contact');
var logoutRouter = require('./routes/logout');
var addCompanyRouter=  require('./routes/addCompany');
var applyRouter=  require('./routes/apply');

var app = express();

require('dotenv').config()

const mongoose=require('mongoose');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register',registerRouter);
app.use('/login',loginRouter);
app.use('/home',homeRouter);
app.use('/about',aboutRouter);
app.use('/preparation',preparationRouter);
app.use('/contact',contactRouter);
app.use('/addCompany',addCompanyRouter);
app.use('/logout',logoutRouter);
app.use('/apply',applyRouter);


mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
 
  useUnifiedTopology: true
})
.then((db)=>{
   console.log("Succesfully connected to database");
},(err)=>{
  console.log(err);
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
