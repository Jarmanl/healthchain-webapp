'use strict';
/* eslint no-sync: 0 */

//import angular from 'angular';
var angular = require('angular');

export class NavbarComponent {
  menu = [{
    title: 'Home',
    state: 'main',
    show: true
  },
  {
    title: 'Records',
    state: 'records',
    show: false
  },
  {
    title: 'Prescription',
    state: 'prescription',
    show: false
  }
];
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  isCollapsed = true;

  constructor(Auth) {
    'ngInject';

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
