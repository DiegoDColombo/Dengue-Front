'use strict';

/**
 * @ngdoc function
 * @name dengueFrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dengueFrontApp
 */
angular.module('dengueFrontApp')
  .controller('LoginCtrl', function ($scope,$http,API_URL,$auth,$state) {

  	$scope.user = {
      email:null,
      password: null
    };

    $scope.login = function() {
      delete $scope.error;
      delete $scope.errorMessage;
      $auth.login({
        email: $scope.user.email,
        password: $scope.user.password
      })
      .then(function(response){
          $state.go('main');
          return response;
        })
      .catch(function(response){
        $scope.error = true;
        switch(response.status) {
          case 404:
            $scope.errorMessage = "Usuário não cadastrado.";
            break;
          default:
            $scope.errorMessage = "Não foi possível conectar com o servidor. Por favor, tente novamente mais tarde.";
        }
      });
    };

    // $scope.forgotPassword = function() {
    //   $state.go('emailPasswordReset');
    // };

    $scope.register = function() {
      $state.go('signUp');
    };

  });
