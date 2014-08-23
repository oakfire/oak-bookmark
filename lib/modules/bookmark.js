var db = require('../db');
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var logger = require('../logger')('oak-bookmark');

var bookmarkSchema = new schema({
    _id: schema.Types.ObjectId,
    url: String,
    title: String,
    desc: String,
    timeCreate: { type: Date, default: Date.now }
});


bookmarkSchema.statics.addBookmark = function(info, cb) {
    this.find({url: info.url}, function(err, results) {
        if(err) {
            logger.error('find bookmark', err);
            return cb(err);
        }

        if(results.length > 0 ) {
            return cb('exists');
        }
        var bookmark = new bookmarkModel();//todo modify这里的名字要怎么解决?

    });        
};

function delBookmark() {
};

function updateBookmark() {
};

module.exports = function(name) {
    var bookmarkModel = db.model('bookmark_' + name, bookmarkSchema);
    return bookmarkModel;
};

