var express = require('express');
var router = express.Router();
var config = require('../lib/config');
var bookmark = require('../lib/modules/bookmark');

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
    var bkModel = bookmark(req.user.account);
    bkModel.find().limit(10).exec(function(err, result){
        if(err) {
            res.status(500);
            res.render('error', {message:'Find bookmark fail', error:err});
        }else {
            data.bookmarks = result;
            res.render('index', data);
        }
    })
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
