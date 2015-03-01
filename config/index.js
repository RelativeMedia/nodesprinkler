'use strict';

// config/index.js

// BOOTSTRAP & AUTOLOAD CONFIGS
// =============================================================================
var fs        = require('fs'),
    config    = {};

fs.readdirSync(__dirname)
  .filter(function(file){
    return( (file.indexOf('.') !== 0 ) && (file !=='index.js') && (file.slice(-3) === '.js'));
  })
  .forEach(function(file){
    var name = file.substr(0, file.indexOf('.'));
    config[name] = require('./' + name);
  });


module.exports = config;
