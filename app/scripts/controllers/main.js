'use strict';

/**
 * @ngdoc function
 * @name dengueFrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dengueFrontApp
 */
angular.module('dengueFrontApp')
  .controller('MainCtrl', function ($scope,$state,$auth) {
   	
  	$scope.isAuthenticated = function() {
  		return $auth.isAuthenticated();
	};

    $scope.logout = function() {
      $auth.logout();
      $state.go('login');
    };

  });
