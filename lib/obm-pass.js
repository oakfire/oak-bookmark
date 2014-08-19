var logger = require('./logger')('oak-bookmark');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
passport.use( new localStrategy(function(username, password, done) {
    logger.debug('account:', username, 'password:', password); 
    var user = { id:'1', username:'admin@admin', password:'admin'};
    if( username !== user.username) {
        return done(null, false, {message: 'Incorrect username'});
    }
    if( password !== user.password) {
        return done(null, false, {message: 'Incorrect password'});
    }

    return done(null, user);
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = passport;
