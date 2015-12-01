(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingsController', BuildingsController);

  /** @ngInject */
  function BuildingsController(Building, $modal , $scope) {
      var vm = this;
       Building.query( function(res) {
        vm.buildings =  chunk(res , 5);
      });


      vm.add= function() {
        $modal.open({
        templateUrl: 'app/views/buildings/addBuilding.html',
        controller: 'AddBuildingController',
        controllerAs: 'adb'
      });


      }


     $scope.$on('building:added' , function(event, data) {
       if(vm.buildings.length <= 5) {
         chunk(vm.buildings[vm.buildings.length - 1].push(data));
       }
     })
     //Divide the data into arays of 5
      function chunk(arr, size) {  //chunk the data into rows
          var newArr = [];

          for (var i=0; i<arr.length; i+=size) {
            newArr.push(arr.slice(i, i+size));
          }
          return newArr;
      }

  }
})();
