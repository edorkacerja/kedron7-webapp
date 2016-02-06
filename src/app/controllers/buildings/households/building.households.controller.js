(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingHouseholdsController', BuildingHouseholdsController );

  /** @ngInject */
  function BuildingHouseholdsController(QueryConstructor, Household,  $state, $stateParams, $modal, $scope, toastr ) {
    var vm = this;
    vm.top = 10 ; //number of items per page -> 10;
    //trNgGrid
    //Called from on-data-required directive.
    vm.onServerSideItemsRequested = function(currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
      Household.query({building_id: $stateParams.buildingId ,top: vm.top, skip: QueryConstructor.skip(currentPage, vm.top), filter:QueryConstructor.filter(filterByFields), orderBy: QueryConstructor.order(orderBy, orderByReverse)},
        function(response) {
          vm.households = response.Items;
          vm.totalHouseholds = response.Count;
        },
        function(response) {
          toastr.error("Не успя да се установи връзка с базата данни:" , response );
        })
    };



    //add a household
    vm.addHousehold = function() {
      $modal.open({
        templateUrl: 'app/views/buildings/households/addHousehold.html',
        controller: 'AddHouseholdController',
        controllerAs: 'adh',
        resolve: {
          buildingId: function() {
            return  $scope.bdetail.building.Id
          },
          floorsCount:function() {
            return $scope.bdetail.building.FloorsCount
          }
        }
      });

    };

    vm.gotoHousehold = function(id) {
      $state.go('householdDetail',{ householdId: id , buildingId: $scope.bdetail.building.Id})
    };

    $scope.$on('household:added', function(event,data) {
      Household.query({building_id: $stateParams.buildingId} , function(response) {
        vm.households = response.Items;
        vm.totalHouseholds = response.Count;
      }, function(response) {
        toastr.error("Не успя да се установи връзка с базата данни:" , response );
      });
    });




  }
})();
