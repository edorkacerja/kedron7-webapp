(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('AddBuildingController', AddBuildingController );

  /** @ngInject */
function AddBuildingController(Building, $uibModalInstance, $rootScope , toastr) {
  var vm = this;

  vm.building= new Building();


  vm.add = function() {

    vm.building.$save(function(data) {
      vm.buildingForm.$setPristine();
      $rootScope.$broadcast('building:added' , data);
      toastr.success('Сградата бе добавена', "Адрес: " + data.Address );
      $uibModalInstance.dismiss();
    } )// todo add a failure function
  };



  vm.cancel = function() {
    $uibModalInstance.dismiss();
  }


}
})();
