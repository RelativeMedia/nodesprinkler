// index.js

// BOOTSTRAP THE APP
// =============================================================================
var EventEmitter = require('events').EventEmitter;
nodesprinkler = {};



nodesprinkler.emitter = new EventEmitter();
nodesprinkler.config  = require('./config');
nodesprinkler.log     = require('./logger');

nodesprinkler.log.info('Starting app...');

nodesprinkler.server  = require('./server');
nodesprinkler.emitter.emit('ready');
