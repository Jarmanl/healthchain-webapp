'use strict';

//import angular from 'angular';
var angular = require('angular');
//import constants from '../../app/app.constants';
var constants = require('../../app/app.constants');
//import util from '../util/util.module';
var util = require('../util/util.module');
//import ngCookies from 'angular-cookies';
var ngCookies = require('angular-cookies');
//import {
  //authInterceptor
//} from './interceptor.service';
var authInterceptor = require('./interceptor.service');
//import {
  //routerDecorator
//} from './router.decorator';
var routerDecorator = require('./router.decorator');
//import {
  //AuthService
//} from './auth.service';
var AuthService = require('./auth.service');
//import {
  //UserResource
//} from './user.service';
var UserResource = require('./user.service');
//import uiRouter from 'angular-ui-router';
var uiRouter = require('angular-ui-router');

function addInterceptor($httpProvider) {
  'ngInject';

  $httpProvider.interceptors.push('authInterceptor');
}

angular.module('healthchainWebApp.auth', [constants, util, ngCookies, uiRouter])
  .factory('authInterceptor', authInterceptor)
  .run(routerDecorator)
  .factory('Auth', AuthService)
  .factory('User', UserResource)
  .config(['$httpProvider', addInterceptor])
  .name;
