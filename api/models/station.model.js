'use strict';
// models/station.js

// STATION MODEL
// =============================================================================

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var StationSchema = new Schema ({

  /**
   * Friendly name of the station
   * @type {Object}
   */
  name: {
    type: String,
    default: 'Station',
  },


  /**
   * whether the station is able to be toggled,
   * or used
   * @type {Object}
   */
  enabled: {
    type: Boolean,
    default: true,
  },


  /**
   * whether the station is currently running
   * @type {Object}
   */
  status: {
    type: Boolean,
    default: false
  },


  /**
   * Date object of the last run start for the station
   * @type {Object}
   */
  lastRunStart: {
    type: Date,
    default: '',
  },


  /**
   * Date object of the last run stop for the station
   * @type {Object}
   */
  lastRunStop: {
    type: Date,
    default: '',
  },

  createdAt: { type: Date },
  updatedAt: { type: Date }

});

StationSchema.pre('save', function(next){
  var now = new Date();
  this.updatedAt = now;

  if ( !this.createdAt ) {
    this.createdAt = now;
  }

  next();
});

mongoose.model('Station', StationSchema);
