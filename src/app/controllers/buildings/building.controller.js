(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingController', BuildingController );

  /** @ngInject */
  function BuildingController(Building, $state, toastr , building, $window , $scope ) {
       var vm = this;


      //editing mode for the building
       vm.editMode = false;
       vm.building = building;



       vm.edit = function() {
         vm.editMode = true;
       };

       vm.update = function() {
         Building.update({id: vm.building.Id}, vm.building , function() {
           vm.editMode = false;
           vm.editForm.$setPristine();
           toastr.success('Сградата бе актуализирана успешно.');
         })

       };

       vm.delete = function(){
         if($window.confirm('Сигурни ли сте, че искате да изтриете тази сграда?')) {
           Building.delete({id: vm.building.Id},function() {
             $state.go('buildings');
             toastr.success('Сградата бе изтрита успешно.');
           }, function(error){
             toastr.warning(error);
           });
         }
       };

      //fired on model delete
      $scope.$on("balance:update" , function( event , data) {
          Building.getBalance({id: vm.building.Id} , function(response) {
            vm.building.Balance = response.Value;
            }, function(error) {
            toastr.warning(error);

          })
      });

  }
})();
