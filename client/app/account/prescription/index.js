'use strict';

//import angular from 'angular';
var angular = require('angular');
//import uiRouter from 'angular-ui-router';
var uiRouter = require('angular-ui-router');
//import PrescriptionController from './prescription.controller';
var PrescriptionController = require('./prescription.controller');

export default angular.module('healthchainWebApp.prescription', [uiRouter])
  .controller('PrescriptionController', PrescriptionController)
  .name;
