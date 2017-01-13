/**
 * Main application file
 */

'use strict';

//import express from 'express';
var express = require('express');
//import sqldb from './sqldb';
var sqldb = require('./sqldb');
//import config from './config/environment';
var config = require('./config/environment');
//import http from 'http';
var http = require('http');

// Populate databases with sample data
if(config.seedDB) {
  require('./config/seed');
}

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

sqldb.sequelize.sync()
  .then(startServer)
  .catch(function(err) {
    console.log('Server failed to start due to error: %s', err);
  });

// Expose app
exports = module.exports = app;