'use strict';

// controllers/station.js

// Station Controller
// =============================================================================
var mongoose = require('mongoose');
var Station  = mongoose.model('Station');
var log      = require('../../logger');
var config   = require('../../config');

exports.list = function(req, res){
  Station.find().sort('-created').exec(function(err, stations){
    if(err){
      return res.status(400).send({
        message: err
      });
    }else{
      res.json(stations);
    }
  });
};


exports.find = function (req, res){
  Station.find(req.params.id)
  .then(function(station){
    if(station === null){
      nodesprinkler.log.error('GET /station/' + req.params.id, 'no station found');
      res.status(404).json({ message: 'No Station By That ID' });
    }else{
      nodesprinkler.log.debug('GET /station/' + req.params.id, 'found a station');
      res.json(station);
    }
  });
};


exports.create = function(req, res){
    res.send('This Feature is Not Available yet');
};

exports.update = function (req, res){
  res.send('This Feature Is Not Available yet');
};


exports.delete = function (req, res){
  res.send('This Feature Is Not Available yet');
};
