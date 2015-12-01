(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('AddBuildingController', AddBuildingController );

  /** @ngInject */
  function AddBuildingController(Building, $modalInstance, $rootScope) {
       var vm = this;

       vm.building= new Building();


       vm.add = function() {
           vm.building.$save(function(res) {
              $rootScope.$broadcast('building:added' , res);
              $modalInstance.dismiss()
           })
       }



       vm.cancel = function() {
         $modalInstance.dismiss();
       }


  }
})();
