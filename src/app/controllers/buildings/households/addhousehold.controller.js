(function() {
  'use strict';


  angular
    .module('kedron')
    .controller('AddHouseholdController', AddHouseholdController );
  /** @ngInject */
  function AddHouseholdController(Household , buildingId , floorsCount, $modalInstance, $rootScope, toastr) {
    var vm = this;
    vm.newHousehold = new Household();
    vm.newHousehold.Floor = floorsCount;
    vm.floorsCount = floorsCount;
    vm.add = function() {

      vm.newHousehold.BuildingId = buildingId;
      vm.newHousehold.$save({building_id: buildingId} ,function(data){
           vm.householdForm.$setPristine();
           $rootScope.$broadcast('household:added' , data);
           toastr.success('Създадено жилище:', "Жилище с име " + data.Name + " бе добавено!");
           $modalInstance.dismiss();
         });
   };

   vm.cancel = function() {
     $modalInstance.dismiss();
   }
  }

})();
