var express = require('express');
var router = express.Router();
var config = require('../lib/config');

/* GET home page. */

function _doNormal(req, res) {
    var data = { 
        title: config.site_name,
        login: req.isAuthenticated()
    };
    if(req.user) {
        data.user = req.user;
    }
    return data;
}

router.get('/', function(req, res) {
    res.redirect('/index');
});

router.get('/index', function(req, res) {
    var data = _doNormal(req, res);
    data.page_name = 'home';
    res.render('index', data);
});

router.get('/about', function(req, res) {  
    var data = _doNormal(req, res);
    data.page_name = 'about';
    res.render('about', data);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

module.exports = router;
