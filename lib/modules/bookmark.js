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
    var self = this;
    this.find({url: info.url}, function(err, results) {
        if(err) {
            logger.error('find bookmark', err);
            return cb(err);
        }

        if(results.length > 0 ) {
            return cb('exists', results);
        }

        var bm = db.model('bookmark_'+ self.bookmark_user, bookmarkSchema);
        var newbm = new bm();
        newbm._id = new mongoose.Types.ObjectId();
        newbm.url = info.url;
        if(info.title) newbm.title = info.title;
        if(info.desc) newbm.desc = info.desc;
        if(info.class) newbm.class = info.class;
        if(info.read_level) newbm.read_level = info.read_level;
        newbm.save(cb);
    });        
};

bookmarkSchema.statics.delBookmark = function(info, cb) {
    var url_del;
    if(typeof info === 'string') {
        url_del = info;
    }else if((typeof info === 'object') && info.url) {
        url_del = info.url;
    }
    if(!url_del) {
        return cb('params error');
    }
    this.find({ url: url_del }, function(err, results) {
        if(results.length === 0) {
            return cb('not find');
        }
        results[0].remove(cb);
    });

};

var getBookmarkModel = function(user){
    var bookmarkModel =  db.model('bookmark_'+user, bookmarkSchema);
    bookmarkModel.bookmark_user = user;
    return bookmarkModel;
};

module.exports = getBookmarkModel;

