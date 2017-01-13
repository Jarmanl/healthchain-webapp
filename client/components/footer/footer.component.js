//import angular from 'angular';
var angular = require('angular');

export class FooterComponent {}

export default angular.module('directives.footer', [])
  .component('footer', {
    template: require('./footer.html'),
    controller: FooterComponent
  })
  .name;
