(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingController', BuildingController );

  /** @ngInject */
  function BuildingController(Building, Household,  $state, $stateParams) {
       var vm = this;
       vm.editMode = false;
       vm.building = Building.get({ id: $stateParams.buildingId});


       vm.edit = function() {
         vm.editMode = true;
         vm.newHousehold =  new Household();
       }

       vm.update = function() {
         Building.update({id: vm.building.BuildingId}, vm.building , function() {
           vm.editMode = false;
         })

       }

       vm.delete = function(){
         Building.delete({id: vm.building.BuildingId},function() {
           $state.go('buildings');
         }, function(error){
           alert(error);
         });
       };

       vm.addHousehold = function() {


       }
  }
})();
