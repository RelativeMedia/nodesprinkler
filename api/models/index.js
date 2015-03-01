'use strict';

// models/index.js

// BOOTSTRAP DB & AUTOLOAD MODELS
// =============================================================================

var fs        = require('fs'),
    path      = require('path'),
    Sequelize = require('sequelize'),
    lodash    = require('lodash'),
    db        = {},
    sequelize = new Sequelize('database', 'username', 'password', {
      dialect: 'sqlite',
      storage: 'memory',
      logging: ''
    });

nodesprinkler.log.debug('autoloading models in api/models/*');
fs.readdirSync(__dirname)
  .filter(function(file){
    return( (file.indexOf('.') !== 0 ) && (file !=='index.js') && (file.slice(-3) === '.js'));
  })
  .forEach(function(file){
    var model = sequelize.import(path.join(__dirname, file));

    nodesprinkler.log.debug('autoloaded model', model.name);

    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName){
  if(db[modelName].options.hasOwnProperty('associate')) {
    db[modelName].options.associate(db);
  }
});


(function(done){
  if(nodesprinkler.config.db.forceSync === true){
    nodesprinkler.log.debug('Forcing sync of database');
    sequelize.sync({ force: true }).complete(function(err){
      nodesprinkler.log.debug('database sync complete, emitting db:ready');
      if (err) {
        throw err;
      }
      done();
    });
  }else{
    done();
  }
})(function(){
  nodesprinkler.emitter.emit('db:ready');
});

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);
