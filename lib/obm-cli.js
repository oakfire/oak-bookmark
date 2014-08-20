var program = require('commander');
var colors = require('colors');
var mongoose = require('mongoose');
var logger = require('./logger')('oak-bookmark');

program
.command('user-add <email> <password>')
.description('Add account by email and password')
.action(function(email, password) {
    if(!email.match(/^.+@.+$/)) {
        console.log('email 格式不正确'.red);
        return 
    }
    var user = require('./modules/user.js');
    var userinfo = {};
    userinfo.email = email;
    userinfo.password = password;
    console.log(userinfo);

    user.obmAddAccount(userinfo, function(err, newUser) {
        if (err) {
            console.log('error!'.red, err);
        }else {
            logger.info('CLI user-add Done!');
        }
        require('./db').close();
    });
});


program.parse(process.argv);
