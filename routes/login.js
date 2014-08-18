var express = require('express');
var router = express.Router();
var config = require('../lib/config');

/* GET home page. */
router.get('/', function(req, res) {
  var data = { title: config.site_name,
      login: false,
      page_name: 'login'
  };
  res.render('login', data);
});

module.exports = router;
