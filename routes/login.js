var express = require('express');
var router = express.Router();
var config = require('../lib/config');
var passport = require('../lib/obm-pass');
var logger = require('../lib/logger')('oak-bookmark');

router.get('/', function(req, res) {
    if(req.isAuthenticated()) {
        res.redirect('/');
        return;
    }

    var data = { 
        title: config.site_name,
        login: false,
        page_name: 'login',
        last_rememberme: false
    };

    if(req.session.messages){
        logger.debug(req.session.messages);
        logger.debug(req.session);
        data.message = req.session.messages.shift();
        data.last_tried_name = req.session.last_tried_name ? req.session.last_tried_name : null;
        data.last_rememberme = !!req.session.last_rememberme;
    }
    res.render('login', data);
});

router.post('/', function(req, res, next) {
    logger.info(req.body);
    req.session.last_tried_name = req.body.username ? req.body.username : null;
    req.session.last_rememberme = req.body.rememberme ? true : false;
    next();
});

router.post('/', passport.authenticate('local', {
      successRedirect: '/', 
      failureRedirect: '/login',
      failureMessage: true
}));

module.exports = router;
