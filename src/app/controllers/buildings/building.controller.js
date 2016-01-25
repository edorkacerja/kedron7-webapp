(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingController', BuildingController );

  /** @ngInject */
  function BuildingController(QueryConstructor,Building, Household,  $state, $stateParams, $modal, $scope, toastr , $window) {
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



      //editing mode for the building
       vm.editMode = false;
        Building.get({ id: $stateParams.buildingId} , function(response) {
         vm.building = response;
       });



       vm.edit = function() {
         vm.editMode = true;
       };

       vm.update = function() {
         Building.update({id: vm.building.Id}, vm.building , function() {
           vm.editMode = false;
           vm.editForm.$setPristine();
           toastr.success('Сградата бе актуализирана успешно.');
         })

       };

       vm.delete = function(){
         if($window.confirm('Сигурни ли сте, че искате да изтриете тази сграда?')) {
           Building.delete({id: vm.building.Id},function() {
             $state.go('buildings');
             toastr.warning('Сградата бе изтрита успешно.');
           }, function(error){
             toastr.warning(error);
           });
         }
       };
       //add a household
       vm.addHousehold = function() {
             $modal.open({
             templateUrl: 'app/views/buildings/addHousehold.html',
             controller: 'AddHouseholdController',
             controllerAs: 'adh',
             resolve: {
                 buildingId: function() {
                 return  vm.building.Id
               },
               floorsCount:function() {
                return vm.building.FloorsCount
               }
             }
           });

       };
       vm.gotoCashbook = function() {
         $state.go('cashbook' , {buildingId: vm.building.Id})
       };
       vm.gotoHousehold = function(id) {
         $state.go('householdDetail',{ householdId: id , buildingId: vm.building.Id})
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
