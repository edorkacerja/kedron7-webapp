(function() {
  'use strict';


  angular
    .module('kedron')
    .controller('AddHouseholdController', AddHouseholdController );
  /** @ngInject */
  function AddHouseholdController(Household , buildingId , floorsCount, $uibModalInstance, $rootScope, toastr) {
    var vm = this;
    vm.newHousehold = new Household();
    vm.newHousehold.Floor = floorsCount;
    vm.floorsCount = floorsCount;
    vm.add = function() {

      vm.newHousehold.BuildingId = buildingId;
      vm.newHousehold.$save({building_id: buildingId} ,function(response){
           vm.householdForm.$setPristine();
           $rootScope.$broadcast('household:added' , response);
           toastr.success('Създадено жилище:', "Жилище с име " + response.Name + " бе добавено!");
           $uibModalInstance.dismiss();
         });
   };

   vm.cancel = function() {
     $uibModalInstance.dismiss();
   }
  }

})();
