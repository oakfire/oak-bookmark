var express = require('express');
var router = express.Router();
var config = require('../lib/config');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: config.site_name });
});

module.exports = router;
