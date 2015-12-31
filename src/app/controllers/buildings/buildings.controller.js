(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingsController', BuildingsController);

  /** @ngInject */
  function BuildingsController(Building, $modal , $scope, $state) {
      var vm = this;
       Building.query( function(response) {
        vm.buildings = response;
      });

      vm.goto = function(index) {

        $state.go('buildingDetail', {'buildingId': vm.buildings[index].id});
      };

      vm.add= function() {
        $modal.open({
        templateUrl: 'app/views/buildings/addBuilding.html',
        controller: 'AddBuildingController',
        controllerAs: 'adb'
      });


      };


     $scope.$on('building:added' , function(event, data) {

       vm.buildings.push(data);

     });

  }
})();
