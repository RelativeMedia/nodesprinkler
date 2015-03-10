'use strict';

// controllers/user.js

// User Controller
// =============================================================================
var mongoose = require('mongoose');
var User     = mongoose.model('User');
var moment   = require('moment');
var passport = require('passport');
var jwt      = require('jsonwebtoken');
var url = require('url');
var log      = require('../../logger');
var config   = require('../../config');


exports.list = function(req, res){
  User.find().sort('-created').exec(function(err, users){
    if(err){
      return res.status(400).send({
        message: err
      });
    }else{
      res.json(users);
    }
  });
};


exports.login = function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
    if (err || !user) {
      res.status(400).send(info);
    } else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      req.login(user, function(err) {
        if (err) {
          res.status(400).send(err);
        } else {
          var token = jwt.sign(
            {
            user: user
            },
            config.server.token.secret,
            {
              expiresInSeconds: config.server.token.expires
            }
          );

          res.json(token);
        }
      });
    }
  })(req, res, next);
};


/**
 * Signout
 */
exports.logout = function(req, res, next) {

	req.logout();
	res.redirect('/');
};


exports.register = function(req, res){
    // Init Variables
  var user = new User(req.body);
  var message = null;

  // Add missing user fields
  user.provider = 'local';
  user.displayName = user.firstName + ' ' + user.lastName;

  // Then save the user
  user.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      req.login(user, function(err) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
    }
  });
};


exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}

	next();
};

exports.requiresToken = function(req, res, next){

  // Parse the URL, we might need this
  var parsedUrl = url.parse(req.url, true);
  var token = (req.body && req.body.access_token) || parsedUrl.query.access_token || req.headers['x-access-token'];

  if (!token) {
    next();
  }

  jwt.verify(token, config.server.token.secret, function(err, decoded){

    if(err){
      log.error(err);
      res.status(401).send(err);
      return next();
    }

  	User.findOne({ '_id': decoded.user._id }, function(err, user){
  		if (err) {
        log.error('whoa there, we got an error');
        log.error(err);
  			return next();
  		}else{
        log.debug('found valid user');
        req.user = user;
        next();
      }
  	});
  });
};
