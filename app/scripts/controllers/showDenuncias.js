'use strict';

/**
 * @ngdoc function
 * @name dengueFrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dengueFrontApp
 */
angular.module('dengueFrontApp')
  .controller('ShowDenunciasCtrl', function ($scope,$state,$auth,$http,API_URL,viaCEP) {

  	var getDenuncias = function(){
  		$http({
	                method: 'GET',
	                url: API_URL+'api/getDenuncias',
	              }).then(function successCallback(response) {
	                	return $scope.denuncias = response.data;
	                }, function errorCallback(response) {
	                  return -1;
	            });
  	};

  	getDenuncias();

	$scope.statusModal = function() {

	};

  });
