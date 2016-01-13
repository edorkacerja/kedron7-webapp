(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingController', BuildingController );

  /** @ngInject */
  function BuildingController(Building, Household,  $state, $stateParams, $modal, $scope, toastr) {
       var vm = this;
       vm.editMode = false;
       vm.building = Building.get({ id: $stateParams.buildingId});


       vm.edit = function() {
         vm.editMode = true;
         vm.newHousehold =  new Household();
       };

       vm.update = function() {
         Building.update({id: vm.building.BuildingId}, vm.building , function() {
           vm.editMode = false;
           toastr.success('Building updated.');
         })

       };

       vm.delete = function(){
         Building.delete({id: vm.building.BuildingId},function() {
           $state.go('buildings');
           toastr.warning('Building deleted');
         }, function(error){
           alert(error);
         });
       };

       vm.addHousehold = function() {
             $modal.open({
             templateUrl: 'app/views/buildings/addHousehold.html',
             controller: 'AddHouseholdController',
             controllerAs: 'adh',
             resolve: {
                 buildingId: function() {
                 return  vm.building.BuildingId
               },
               floorsCount:function() {
                return vm.building.FloorsCount
               }
             }
           });

       };

       $scope.$on('household:added', function(event,data) {
          vm.building.Households.push(data)
       })
  }
})();
