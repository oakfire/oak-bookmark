var db = require('../db');
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var logger = require('../logger')('oak-bookmark');

var bookmarkSchema = new schema({
    _id: schema.Types.ObjectId,
    url: String,
    title: String,
    desc: String,
    class: String,
    read_level: { type: Number, default: 0 },
    timeCreate: { type: Date, default: Date.now }
});


bookmarkSchema.statics.addBookmark = function(info, cb) {
    if(!info.url) {
        return cb('params error');
    }
    this.find({url: info.url}, function(err, results) {
        if(err) {
            logger.error('find bookmark', err);
            return cb(err);
        }

        if(results.length > 0 ) {
            return cb('exists', results);
        }
        var newbm = new bookmarkModel();
        newbm._id = new mongoose.Types.ObjectId;
        newbm.url = info.url;
        if(info.title) newbm.title = info.title;
        if(info.desc) newbm.desc = info.desc;
        if(info.class) newbm.class = info.class;
        if(info.read_level) newbm.read_level = info.read_level;
        newbm.save(cb);
    });        
};

bookmarkSchaema.statics.delBookmark = function(info, cb) {
    var url_del = undefined;
    if(typeof(info) == String) {
        url_del = info;
    else if(typeof(info) == Object && info.url) {
        url_del = info.url
    }
    if(!url_del) {
        return cb('params error');
    }
    this.find({ url: url }, function(err, results) {
        //results.remove
    }

};

function updateBookmark() {
};

var bookmarkModel = db.model('bookmark', bookmarkSchema);

module.exports = bookmarkModel;

