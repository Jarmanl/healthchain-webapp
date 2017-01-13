'use strict';

//import angular from 'angular';
var angular = require('angular');
//import uiRouter from 'angular-ui-router';
var uiRouter = require('angular-ui-router');
//import ngCookies from 'angular-cookies';
var ngCookies = require('angular-cookies');
//import routing from './account.routes';
var routing = require('./account.routes');
//import login from './login';
var login = require('./login');
//import settings from './settings';
var settings = require('./settings');
//import signup from './signup';
var signup = require('./signup');
//import records from './records';
var records = require('./records');
//import prescription from './prescription';
var prescription = require('./prescription');

export default angular.module('healthchainWebApp.account', [uiRouter, ngCookies, login, settings, signup,records, prescription])
  .config(routing)
  .run(function($rootScope) {
    'ngInject';

    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if(next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  })
  .name;
