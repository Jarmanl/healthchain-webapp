'use strict';

//import angular from 'angular';
var angular = require('angular');

export default angular.module('healthchainWebApp.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;
