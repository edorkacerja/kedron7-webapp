(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingController', BuildingController );

  /** @ngInject */
  function BuildingController(Building, Household,  $state, $stateParams, $modal, $scope, toastr) {
       var vm = this;
       vm.top = 10 ; //number of items per page -> 10;
        //trNgGrid
       vm.onServerSideItemsRequested = function(currentPage, filterBy, filterByFields, orderBy, orderByReverse) {
         if(currentPage == 0 ){
           vm.skip = 0;
         } else {
           vm.skip = currentPage*vm.top;
         }
         Household.query({top: vm.top, skip: vm.skip, filterBy: filterBy, filterByFields: filterByFields, orderBy: orderBy, orderByReverse: orderByReverse},
           function(response) {
             vm.households = response.Households;
             vm.totalHouseholds = response.Count;
           },
           function(response) {
             toastr.error("Не успя да се установи връзка с базата данни:" , response );
           })

      };



       vm.editMode = false;
        Building.get({ id: $stateParams.buildingId} , function(response) {
         vm.building = response;
       });



       vm.edit = function() {
         vm.editMode = true;
         vm.newHousehold =  new Household();
       };

       vm.update = function() {
         Building.update({id: vm.building.Id}, vm.building , function() {
           vm.editMode = false;
           toastr.success('Building updated.');
         })

       };

       vm.delete = function(){
         if($window.confirm('Сигурни ли сте, че искате да изтриете тази сграда?')) {
           Building.delete({id: vm.building.BuildingId},function() {
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
           vm.households = response.Households;
           vm.totalHouseholds = response.Count;
         }, function(response) {
           toastr.error("Не успя да се установи връзка с базата данни:" , response );
         });
       });




  }
})();
