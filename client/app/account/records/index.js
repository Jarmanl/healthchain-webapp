'use strict';

//import angular from 'angular';
var angular = require('angular');
//import uiRouter from 'angular-ui-router';
var uiRouter = require('angular-ui-router');
//import RecordsController from './records.controller';
var RecordsController = require('./records.controller');

export default angular.module('healthchainWebApp.records', [uiRouter])
  .controller('RecordsController', RecordsController)
  .name;
