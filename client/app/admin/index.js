'use strict';

//import angular from 'angular';
var angular = require('angular');
//import routes from './admin.routes';
var routes = require('./admin.routes');
//import AdminController from './admin.controller';
var AdminController = require('./admin.controller');

export default angular.module('healthchainWebApp.admin', ['healthchainWebApp.auth', 'ui.router'])
  .config(routes)
  .controller('AdminController', AdminController)
  .name;
