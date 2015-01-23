var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('./obm-pass');
var sessionStore = require('connect-mongo')(session);
var config = require('./config');

var routes = require('../routes/index');
var login = require('../routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, '..', 'public/favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());

// 置于session之前. 静态资源不需要认证
app.use(express.static(path.join(__dirname, '..', 'public'), {maxAge: 86400000 })); // one week cache

app.use(session({
    store: new sessionStore({db: config.db_name }),
    secret:'bm.oak71.com',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 }//one week
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/login', login);

app.all(/^(\/index|\/logout|)$/, function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }else {
        res.redirect('/login');
    }
});
app.use('/', routes);

/// catch 404 and forward to error handler

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
