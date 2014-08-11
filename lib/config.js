var path = require('path');
var file_path = path.join(__dirname, '../config/',   (process.env.NODE_ENV || 'default') + '.js');
var Config = require(file_path);

module.exports = Config;
