'use strict';

//import angular from 'angular';
var angular = require('angular');
//import LoginController from './login.controller';
var LoginController = require('./login.controller');

export default angular.module('healthchainWebApp.login', [])
  .controller('LoginController', LoginController)
  .name;
