var logger = require('./logger')('oak-bookmark');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var userModel = require('./modules/user');

passport.use( new localStrategy(function(username, password, done) {
    logger.debug('account to auth:', username); 
    userModel.findOne({'account': username})
    .select('name account password')
    .exec(function(err, user) {
        if(err) {
            return done(null, false, {message: 'Interval error'});
        }
        if(!user) {
            return done(null, false, {message: 'Incorrect username'});
        }
        var md5 = require('crypto').createHash('md5');
        md5.update(password);
        if( user.password !== md5.digest('hex')) {
            return done(null, false, {message: 'Incorrect password'});
        }
        
        logger.info('account [', user.account, '] Signed in.');
        return done(null, user);
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    userModel.findOne({'_id': id}, function(err, user) {
        logger.debug('deserialize user', user.account);
        done(err, user);
    });
});

module.exports = passport;
