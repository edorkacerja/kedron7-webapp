(function() {
  'use strict';


  angular
    .module('kedron')
    .controller('AddHouseholdController', AddHouseholdController );
  /** @ngInject */
  function AddHouseholdController(Household , buildingId , $modalInstance, $rootScope, toastr) {
    var vm = this;
    vm.newHousehold = new Household();

    vm.add = function() {

      vm.newHousehold.BuildingId = buildingId;
      vm.newHousehold.$save(function(data){
           $rootScope.$broadcast('household:added' , data);
           toastr.success('Household created', "Household with id " + data.HouseholdId + " added");
           $modalInstance.dismiss();
         });
   }

   vm.cancel = function() {
     $modalInstance.dismiss();
   }
  }

})();
