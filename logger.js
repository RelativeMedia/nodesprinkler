var winston = require('winston');
var logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: nodesprinkler.config.log.level,
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ]
});

module.exports = logger;
