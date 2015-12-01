(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('AddBuildingController', AddBuildingController );

  /** @ngInject */
  function AddBuildingController(Building, $modalInstance, $rootScope , toastr) {
       var vm = this;

       vm.building= new Building();


       vm.add = function() {
           vm.building.$save(function(data) {
              $rootScope.$broadcast('building:added' , data);
              toastr.success('Building created', "Building at " + data.Address + " added");
              $modalInstance.dismiss()
           })
       }



       vm.cancel = function() {

         $modalInstance.dismiss();
       }


  }
})();
