'use strict';

//import angular from 'angular';
var angular = require('angular');
//import SettingsController from './settings.controller';
var SettingsController = require('./settings.controller');

export default angular.module('healthchainWebApp.settings', [])
  .controller('SettingsController', SettingsController)
  .name;
