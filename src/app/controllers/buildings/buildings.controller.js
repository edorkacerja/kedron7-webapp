(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingsController', BuildingsController);

  /** @ngInject */
  function BuildingsController( QueryConstructor,Building, $modal , $scope, toastr ) {
      var vm = this;
        vm.top = 10 ; //number of items per page -> 10;

      //Called from on-data-required directive.
        vm.onServerSideItemsRequested = function(currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
          Building.query({top: vm.top, skip: QueryConstructor.skip(currentPage, vm.top), filter:QueryConstructor.filter(filterByFields), orderBy: QueryConstructor.order(orderBy, orderByReverse)},
           function(response) {
             vm.buildings = response.Items;
             vm.totalBuildings = response.Count;
           },
          function(response) {
            toastr.error("Не успя да се установи връзка с базата данни:" , response );
          })
        };



      //add a new building
      vm.add= function() {
          $modal.open({
          templateUrl: 'app/views/buildings/addBuilding.html',
          controller: 'AddBuildingController',
          controllerAs: 'adb'
        });
      };

     $scope.$on('building:added' , reloadCollection);


    function reloadCollection(event, data) {
      Building.query( function(response) {
        vm.buildings = response.Items;
        vm.totalBuildings = response.Count;
      }, function(response) {
        toastr.error("Не успя да се установи връзка с базата данни:" , response );
      });
    }


  }
})();
