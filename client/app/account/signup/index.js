'use strict';

//import angular from 'angular';
var angular = require('angular');
//import SignupController from './signup.controller';
var SignupController = require('./signup.controller');

export default angular.module('healthchainWebApp.signup', [])
  .controller('SignupController', SignupController)
  .name;
