(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingController', BuildingController );

  /** @ngInject */
  function BuildingController(QueryConstructor,Building, Household,  $state, $stateParams, $modal, $scope, toastr , $window) {
       var vm = this;


      //editing mode for the building
       vm.editMode = false;
        Building.get({ id: $stateParams.buildingId} , function(response) {
         vm.building = response;
       });



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
             toastr.warning('Сградата бе изтрита успешно.');
           }, function(error){
             toastr.warning(error);
           });
         }
       };
       //add a household


       vm.gotoCashbook = function() {
         $state.go('cashbook' , {buildingId: vm.building.Id})
       };







  }
})();
