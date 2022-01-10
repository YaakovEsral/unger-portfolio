var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();


var indexRouter = require('./routes/index');
const portfolioRouter = require('./routes/portfolio');
const adminRouter = require('./routes/admin');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')), express.static(path.join(__dirname, 'node_modules')));

app.use((req, res, next) => {
    res.locals.path = req.path;
    res.locals.extname = require('path').extname;
    res.locals.constants = require('./constants');
    res.locals.generateFileURL = require('./utils/generateFileURL');
    next();
})

app.use('/', indexRouter);
app.use('/portfolio', portfolioRouter);
app.use('/admin', adminRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// **** MIGHT NEED MORE TESTING
// error handler
app.use(function (err, req, res, next) {

    if (err.type === 'add-project-form') {
        res.statusCode = 400;
        return res.end(err.message);
    }

    // set locals, only providing error in development
    //   console.log('message', err.message);
    //   console.log('error field', err.field);
    res.locals.message = err.message;
    //   res.locals.error = req.app.get('env') === 'development' ? err : {};


    // console.log(err.status);

    // render the error page
    res.status(err.status || 500);

    if (res.status === 404)
        res.render('error', { error: err });
    else
        res.end(err.message || 'Unknown error occurred. Please contact your administrator.')
});

module.exports = app;
