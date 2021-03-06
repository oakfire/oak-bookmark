var program = require('commander');
var colors = require('colors');
var mongoose = require('mongoose');
var logger = require('./logger')('oak-bookmark');
var Table = require('cli-table-zh');

program
.command('user-add <email> <password>')
.description('Add account by email and password')
.action(function(email, password) {
    if(!email.match(/^.+@.+$/)) {
        console.log('Email 格式不正确'.red);
        return; 
    }
    var user = require('./modules/user');
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

program
.command('bk-add <email> <title> <url>')
.description('Add bookmark')
.action(function(email, title, url)  {
    if(!email.match(/^.+@.+$/)) {
        console.log('Email 格式不正确'.red);
        return;
    }

    var bookmark = require('./modules/bookmark')(email);
    var info = {};
    info.title = title;
    info.url = url;
    bookmark.addBookmark(info, function(err, newbk) {
        if(err) {
            console.log('error!'.red, err);
        }else {
            logger.info('CLI bk-add Done!');
        }
        require('./db').close();
    });
});

program
.command('bk-list <email> [count]')
.description('List bookmarks of <email>')
.action(function(email, count) {
    if(!email.match(/^.+@.+$/)) {
        console.log('Email 格式不正确'.red);
        return;
    }
    var bookmark = require('./modules/bookmark')(email);
    var limit_num = 10;
    if(count){
        limit_num = count; 
    }
    bookmark.find().limit(limit_num).exec(function(err, result){
        if (err) {
            console.log('error!'.red, err);
        }else{
            var table = new Table({head:['title', 'url']});
            for(var child in result){
                var bk = result[child];
                table.push([bk.title, bk.url]);
                console.log('title:[' + bk.title + '] url:[' + bk.url + ']'); 
            }
            console.log(table.toString());
        }
        require('./db').close();
    });
});

program
.command('bk-del <email> <url>')
.description('Delete <url> of <email>')
.action(function(email, url) {
    if(!email.match(/^.+@.+$/)) {
        console.log('Email 格式不正确'.red);
        return;
    }
    var bookmark = require('./modules/bookmark')(email);
    bookmark.delBookmark(url, function(err, result){
        if(err) {
            console.log('error!'.red, err);
        }else{
            console.log('done'.green);
        }
        require('./db').close();
    });
});


program
.command('*')
.action(function() { program.help(); });

module.exports = program;

