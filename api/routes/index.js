'use strict';

// index.js

// BOOTSTRAP & AUTOLOAD CONTROLLERS
// =============================================================================
var fs     = require('fs');
var express = require('express');
var router  = express.Router();

module.exports = function(){

  fs.readdirSync(__dirname)
  .filter(function(file){
    return( (file.indexOf('.') !== 0 ) && (file !=='index.js') && (file.slice(-3) === '.js'));
  })
  .forEach(function(file){
    var name = file.substr(0, file.indexOf('.'));

    try {
      router = require('./' + name)(router);
    } catch(e) {
      throw new Error('Error when loading route file '+file);
    }
  });
  
  return router;
};
