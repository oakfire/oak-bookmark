
/**
 * bookmark collection:
 * bid
 * name
 * url
 * uid
 * class
 * desc
 */

/**
 * user collection:
 * uid:
 * account:
 * email:
 * password: 
 * admin: 
 */

/**
 * tag collection:
 * tag:
 * bid:
 */

/**
 * class collection:
 * cid:
 * name:
 * parent: [ ]
 * childs: [ ]
 */
var logger =  require('./logger')('oak-bookmark');
var config = require('./config');
var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', config.db_name);

db.on('error', function(err) {
    logger.error('db error: ', err.toString());
});

db.on('close', function(err) {
    logger.info('db closed.', err ? err.toString() : '');
});

db.once('open', function () {
    logger.info('db open successfully.');
});

module.exports = db;


