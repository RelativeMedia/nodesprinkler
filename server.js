'use strict';

// server.js

// BASE SETUP
// ============================================================================
var express    = require('express');
var multer     = require('multer');
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var path       = require('path');
var mongoose   = require('mongoose');
var config     = require('./config');
var log        = require('./logger');
var utils      = require('./utils');
var app        = express();


app.set('jwtTokenSecret', 'sdfjksdhflkjdsahfiulh325lkuh');

mongoose.connect(config.db.uri, config.db.options, function(err) {
	if (err) {
		log.error('Could not connect to MongoDB!');
		log.log(err);
	}
});

mongoose.connection.on('error', function(err) {
	log.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);

// Globbing model files
utils.getGlobbedFiles('./api/models/**/*.js').forEach(function(modelPath) {
  require(path.resolve(modelPath));
});

var Passport   = require('passport');
var passport   = require('./passport')();

app.use(morgan('dev'));

// // use passport session
 app.use(Passport.initialize());
 app.use(Passport.session());

var router  = express.Router();

utils.getGlobbedFiles('./api/routes/**/*.js').forEach(function(routePath) {
	// var arr = routePath.split('/');
	// var name = arr[3].substr( 0, arr[3].indexOf('.js') );

	router = require(path.resolve(routePath))(router);
	return router;

});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use('/api', router);

app.use(express.static(path.join(__dirname, 'public')));

// HTML5 Pushstate mode
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

log.debug('got db:ready event firing up the server');

app.listen(config.server.port, config.server.ip, function() {
  console.log('==============================================\n===============================================');
  log.info('Nodesprinkler is running from \'' + __dirname + '\'');
  log.info('Visit it at: http://%s:%s', config.server.ip, config.server.port);
  log.info('To shutdown Nodesprinkler, press <CTRL> + C at any time\n');
  log.info('---------------------------------------------------------');
  log.info('Environment:', app.get('env'));
  log.info('IP:', config.server.ip);
  log.info('Port:', config.server.port);
});
