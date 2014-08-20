var db = require('../db');
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var logger = require('../logger')('oak-bookmark');

var userSchema = new schema({
    _id: schema.Types.ObjectId,
    account: String,
    password: String,
    admin: Boolean,
    timeCreate: { type: Date, default: Date.now }
});

userSchema.statics.obmAddAccount = function(info, cb) {
    if(info.email) {
        this.find({account: info.email}, function(err, results) {
            if(err) {
                logger.error('find account', err);
                return cb(err);
            }
            
            if(results.length > 0 ) {
                return cb("此帐号已注册");
            }

            var md5 = require('crypto').createHash('md5');
            md5.update(info.password);
            var newAccount = new userModel();
            newAccount._id = new mongoose.Types.ObjectId;
            newAccount.account = info.email;
            newAccount.password = md5.digest('hex');
            logger.debug('account to save:', newAccount.account);
            newAccount.save(cb);
        });
    }
}

var userModel = db.model('user', userSchema);


module.exports = userModel;


