var logger = require('./logger')('oak-bookmark');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var userModel = require('./modules/user');

passport.use( new localStrategy(function(username, password, done) {
    logger.debug('account:', username, 'password:', password); 
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
    })
}));

passport.serializeUser(function(user, done) {
    logger.debug('serialize user');
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    logger.debug('deserialize user');
    done(null, user);
});

module.exports = passport;
