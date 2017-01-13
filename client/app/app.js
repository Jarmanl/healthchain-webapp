'use strict';

//import angular from 'angular';
var angular = require('angular');
//import ngCookies from 'angular-cookies';
var ngCookies = require('angular-cookies');
//import ngSanitize from 'angular-sanitize';
var ngSanitize = require('angular-sanitize');
//import ngResource from 'angular-resource';
var ngResource = require('angular-resource');
//import uiRouter from 'angular-ui-router';
var uiRouter = require('angular-ui-router');
//import uiBootstrap from 'angular-ui-bootstrap';
var uiBootstrap = require('angular-ui-bootstrap');
//import {routeConfig} from './app.config';
var routeConfig = require('./app.config');
//import _Auth from '../components/auth/auth.module';
var _Auth = require('../components/auth/auth.module');
//import account from './account';
var account = require('./account');
//import navbar from '../components/navbar/navbar.component';
var navbar = require('../components/navbar/navbar.component');
//import footer from '../components/footer/footer.component';
var footer = require('../components/footer/footer.component');
//import main from './main/main.component';
var main = require('./main/main.component');
//import constants from './app.constants';
var constants = require('./app.constants');
//import util from '../components/util/util.module';
var util = require('../components/util/util.module');
//import admin from './admin';
var admin = require('./admin');

// import './app.scss';

angular.module('healthchainWebApp', [ngCookies, ngResource, ngSanitize, uiRouter, uiBootstrap,
    _Auth, account, admin, navbar, footer, main, constants, util
  ])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });
  
angular.element(document)
    .ready(() => {
      angular.bootstrap(document, ['healthchainWebApp'], {
        strictDi: true
    });
});
