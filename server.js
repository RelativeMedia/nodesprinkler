'use strict';

// server.js

// BASE SETUP
// ============================================================================
var express    = require('express');
var multer     = require('multer');
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var path       = require('path');
var db         = require('./api/models');
var routes     = require('./api/routes');
var server     = express();


server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(multer());

server.use(express.static(path.join(__dirname, 'public')));
server.use(function(req, res, next){
  req.db    = db;
  next();
});

server.use('/api', routes());
// HTML5 Pushstate mode
server.get('*', function(req, res) {
  res.sendFile('./public/index.html');
});

nodesprinkler.emitter.once('db:ready', function(){
  nodesprinkler.log.debug('got db:ready event firing up the server');

  server.listen(nodesprinkler.config.server.port, nodesprinkler.config.server.ip, function() {
    console.log('==============================================\n===============================================');
    nodesprinkler.log.info('Nodesprinkler is running from \'' + __dirname + '\'');
    nodesprinkler.log.info('Visit it at: http://%s:%s', nodesprinkler.config.server.ip, nodesprinkler.config.server.port);
    nodesprinkler.log.info('To shutdown Nodesprinkler, press <CTRL> + C at any time\n');
    nodesprinkler.log.info('---------------------------------------------------------');
    nodesprinkler.log.info('Environment:', server.get('env'));
    nodesprinkler.log.info('IP:', nodesprinkler.config.server.ip);
    nodesprinkler.log.info('Port:', nodesprinkler.config.server.port);
  });

});
