var config = require('./config.json');

exports.db = config.database.db;
exports.port = config.port;
exports.cryptkey = config.cryptkey;
exports.smtp = config.smtp;
exports.secret = config.secret;
exports.conekta = config.conekta;