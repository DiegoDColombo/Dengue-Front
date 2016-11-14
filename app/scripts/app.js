'use strict';

/**
 * @ngdoc overview
 * @name dengueFrontApp
 * @description
 * # dengueFrontApp
 *
 * Main module of the application.
 */
angular
  .module('dengueFrontApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
