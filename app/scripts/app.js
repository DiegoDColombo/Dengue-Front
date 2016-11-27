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
    //'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'config',
    'satellizer',
    'ui.bootstrap'
  ])
  .config(function ($stateProvider,$urlRouterProvider,$authProvider,API_URL) {
    
    $urlRouterProvider.otherwise('/main');
    $authProvider.baseUrl = API_URL;
    $authProvider.loginUrl = 'Auth/login';
    $authProvider.logoutRedirect = ('/login');

    $authProvider.withCredentials = false;
    $authProvider.authHeader = 'Authorization';

    $authProvider.tokenRoot = 'data'; // set the token parent element if the token is not the JSON root
    $authProvider.tokenName = 'access_token';


    $stateProvider
      .state('main',{
        url: '/main',
        views:
        {
            '': {
                  templateUrl: 'views/main.html',
                  controller: 'MainCtrl'
                }
        }
      }).state('signUp',{
        url: '/signUp',
        views:
        {
            '': {
                  templateUrl: 'views/signUp.html',
                  controller: 'SignUpCtrl'
                }
        }
      }).state('login',{
        url: '/login',
        views:
        {
            '':{
                  templateUrl:'views/auth/login.html',
                  controller: 'LoginCtrl'
            }
        }
      }).state('createDenuncia',{
        url: '/criarDenuncia',
        views:
        {
            '': {
                  templateUrl: 'views/criarDenuncia.html',
                  controller: 'DenunciaCtrl'
                }
        },resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();
            
            if (!$auth.isAuthenticated())
            {
              $location.path('/login');
            }
            else
            {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }
      });
  });
