var express = require('express');
var router = express.Router();
var config = require('../lib/config');
var passport = require('../lib/obm-pass');
var logger = require('../lib/logger')('oak-bookmark');
var bodyParser = require('body-parser');

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
        data.last_rememberme = !!req.session.rememberme;
    }
    res.render('login', data);
});

var urleParser = bodyParser.urlencoded({ extended: false });

router.post('/', urleParser, function(req, res, next) {
    if (!req.body) return res.sendStatus(400);
    logger.info(req.body);
    req.session.last_tried_name = req.body.username ? req.body.username : null;
    req.session.rememberme = req.body.rememberme ? true : false;
    if(!req.session.rememberme){
        req.session.cookie.expires = false; //虽然客户端cookie存活时间为浏览器关闭, 但是 connect-mongo 会在数据库里存留失效session 两周.
    }
    next();
});

router.post('/', passport.authenticate('local', {
      successRedirect: '/', 
      failureRedirect: '/login',
      failureMessage: true
}));

module.exports = router;
