/**
 * Sequelize initialization module
 */

'use strict';

//import path from 'path';
var path = require('path');
//import config from '../config/environment';
var config = require('../config/environment');
//import Sequelize from 'sequelize';
var Sequelize = require('sequelize');

var db = {
  sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Record = db.sequelize.import('../api/record/record.model');
// db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');
db.Record.belongsTo(db.User);
db.User.hasMany(db.Record);
module.exports = db;
