var express=require('express');
var path=require('path')
var index=require('./routes/index');
var app = express();

var passport = require('passport') //passport module add
  , LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(3000, () => {
	console.log('server is running on port 3000');
});


app.use('/', index);
/*
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

*/
module.exports = app;