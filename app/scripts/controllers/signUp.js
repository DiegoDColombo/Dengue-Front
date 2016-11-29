'use strict';

/**
 * @ngdoc function
 * @name dengueFrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dengueFrontApp
 */
angular.module('dengueFrontApp')
  .controller('SignUpCtrl', function ($scope,$rootScope,$http,API_URL,$state,viaCEP) {
 
    $scope.denunciante = {
      photo: null
    };

    $scope.photoIsSet = false;

    document.getElementById('uploadBtn').addEventListener('change', handleFileSelect, false);

    function handleFileSelect(evt) {
      var reader = new FileReader();      
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = function(e) {     
        $scope.denunciante.photo = e.target.result;
        $scope.$digest();
      };

      $scope.photoIsSet = true;
    }

    function formDataUser(){
      
      var data = new FormData();
      
      if($scope.photoIsSet){
        data.append("photo", new Blob([imageURItoBlob($scope.denunciante.photo)], { type: "multipart/form-data" }));
      }
      data.append("name", $scope.denunciante.name);
      data.append("cpf", $scope.denunciante.cpf);
      data.append("email", $scope.denunciante.email);
      data.append("password", $scope.denunciante.password);
      data.append("street", $scope.address.street);
      data.append("number", $scope.address.number);
      data.append("complement", $scope.address.complement);
      data.append("cep", $scope.address.cep);
      
      
      return data;
    }

    function imageURItoBlob(data){
      var byteString = atob(data.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return ab;
    }

    $scope.signUp = function(){

      var form = formDataUser();
        $http({
                method: 'POST',
                url: API_URL+'Auth/signUp',
                data: form,
                transformRequest: angular.identity,
                headers: {
                'Content-Type': undefined
                }
              }).then(function successCallback(response) {
                $state.go('login');
                return response;
                }, function errorCallback(response) {
                  return -1;
            });
    };

    $scope.checkCEP = function(){
      viaCEP.get($scope.location.cep).then(function(response){
            console.log(response);
            //$scope.location.full = response;
        });

    };
});