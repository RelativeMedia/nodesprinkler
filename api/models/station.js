'use strict';
// models/station.js

// STATION MODEL
// =============================================================================
module.exports = function(sequelize, DataTypes){
  var Station = sequelize.define('Station', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // ARE WE ALLOWED TO RUN THIS STATION
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },

    // IS THE STATION RUNNING?
    status: {
      type: DataTypes.BOOLEAN,
      defaultvalue: false,
      allowNull: false,
    }


  });

  return Station;
};
