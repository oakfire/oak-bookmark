var express = require('express');
var router = express.Router();
var config = require('../lib/config');

/* GET home page. */

function _doNormal(res) {
  var data = { title: config.site_name,
      login: false,
      page_name: 'home'
  };
  res.render('index', data);
}

router.get('/', function(req, res) {
    _doNormal(res);
});

router.get('/index', function(req, res) {
    _doNormal(res);
});

router.get('/about', function(req, res) {  
  var data = { title: config.site_name,
      login: false,
      page_name: 'about'
  };
  res.render('about', data);
});

module.exports = router;
