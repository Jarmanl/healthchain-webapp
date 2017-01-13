//import angular from 'angular';
var angular = require('angular');
//import uiRouter from 'angular-ui-router';
var uiRouter = require('angular-ui-router');
//import routing from './main.routes';
var routing = require('./main.routes');

export class MainController {
  $http;

  awesomeThings = [];
  newThing = '';

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    // this.$http.get('/api/things')
    this.$http.get('/api/user/me')
      .then(response => {
        this.user = response.data;
        // this.awesomeThings = response.data;
        console.log(this.user);
      });
  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}

export default angular.module('healthchainWebApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
