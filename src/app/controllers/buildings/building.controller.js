(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingController', BuildingController );

  /** @ngInject */
  function BuildingController(Building, $state, $stateParams) {
       var vm = this;
       vm.building = Building.get($stateParams.buildingId);


       vm.delete = function(id){
         Building.delete({id: id},function() {
           $state.go('buildings');
         }, function(error){
           console.log(error);
         });

       };
  }
})();
