'use strict';

//import angular from 'angular';
var angular = require('angular');

//import {
  //UtilService
//} from './util.service';
var UtilService = require('./util.service');

export default angular.module('healthchainWebApp.util', [])
  .factory('Util', UtilService)
  .name;
