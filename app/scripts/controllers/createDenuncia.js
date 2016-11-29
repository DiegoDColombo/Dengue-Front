'use strict';

/**
 * @ngdoc function
 * @name dengueFrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dengueFrontApp
 */
angular.module('dengueFrontApp')
  .controller('CreateDenunciaCtrl', function ($scope,$state,$auth,$http,API_URL,viaCEP) {
    
	  	$scope.denuncia = {
	      photo: null
	    };

	    $scope.photoIsSet = false;

	    document.getElementById('uploadBtn').addEventListener('change', handleFileSelect, false);

	    function handleFileSelect(evt) {
	      var reader = new FileReader();      
	      reader.readAsDataURL(evt.target.files[0]);
	      reader.onload = function(e) {     
	        $scope.denuncia.photo = e.target.result;
	        $scope.$digest();
	      };

	      $scope.photoIsSet = true;
	    }

	    function formDataDenuncia(){
	      
	      var data = new FormData();
	      
	      if($scope.photoIsSet){
	      	data.append("photo", new Blob([imageURItoBlob($scope.denuncia.photo)], { type: "multipart/form-data" }));
	      }
	      data.append("type", [$scope.denuncia.aedes, $scope.denuncia.focus]);
	      data.append("epidem_vigilance", $scope.denuncia.epidemVigilance);
	      data.append("diagnosticated_cases", $scope.denuncia.diagnCases);
	      data.append("street", $scope.location.street);
	      data.append("number", $scope.location.number);
	      data.append("complement", $scope.location.complement);
	      data.append("cep", $scope.location.cep);
	      
	      
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

	  	$scope.createDenuncia = function(){
	  		if($scope.denuncia.aedes){
	  			$scope.denuncia.aedes = "aedes";
	  		}	else{
	  				$scope.denuncia.aedes = null;
	  		}

	  		if($scope.denuncia.focus){
	  			$scope.denuncia.focus = "focus";
	  		}	else{
	  				$scope.denuncia.focus = null;
	  		}

	  		var form = formDataDenuncia();
 
	        $http({
	                method: 'POST',
	                url: API_URL+'api/createDenuncia',
	                data: form,
	                transformRequest: angular.identity,
	                headers: {
	                	'Content-Type': undefined
	                }
	              }).then(function successCallback(response) {
	                $state.go('main');
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