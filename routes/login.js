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

  var data = { title: config.site_name,
      login: false,
      page_name: 'login'
  };
  if(req.session.messages){
      logger.debug(req.session.messages);
      data.message = req.session.messages.shift();
  }
  res.render('login', data);
});

router.post('/', passport.authenticate('local', {
      successRedirect: '/', 
      failureRedirect: '/login',
      failureMessage: true
}));

module.exports = router;
