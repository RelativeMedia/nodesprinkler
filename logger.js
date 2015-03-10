var winston = require('winston');
var config  = require('./config');

var logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: config.log.level,
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ]
});

module.exports = logger;
