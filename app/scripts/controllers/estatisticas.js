'use strict';

/**
 * @ngdoc function
 * @name dengueFrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dengueFrontApp
 */
angular.module('dengueFrontApp')
  .controller('EstatCtrl', function ($scope,$rootScope,$auth,$http,API_URL,$timeout) {

	  var getDenunciaData = function(){
    	$http({
                method: 'GET',
                url: API_URL+'api/getAllDenuncias',
              }).then(function successCallback(response){
                	$scope.stats = response.data;
                	return response.data;
                }, function errorCallback(response) {
                  return -1;
            });
    };

	getDenunciaData();

  	$scope.options = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',')(d);
                },
                duration: 500,
                xAxis: {
                    axisLabel: 'Estado'
                },
                yAxis: {
                    axisLabel: 'Total de Casos',
                    axisLabelDistance: -10
                }
            }
        };
        $timeout(function() {
        $scope.data = [
            {
                key: "Cumulative Return",
                values:$scope.stats,
            }
        ];
    }, 800);



  });