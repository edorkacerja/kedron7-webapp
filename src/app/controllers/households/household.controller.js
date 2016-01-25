(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('HouseholdController', HouseholdController );

    function HouseholdController(Household , Building, $stateParams , toastr, $state, $window) {
      var vm = this;
      vm.editMode = false;

      Household.get({id: $stateParams.householdId},
        function (response) {
          vm.household = response;
          Building.get({ id: vm.household.BuildingId} , function(response) {
            vm.floorsCount = response.FloorsCount;
          }, function() {
            //todo add error
          });
        }, function() {
          //todo add error
        });


      vm.edit = function () {
        vm.editMode = true;
        if(!vm.floorsCount) {
          vm.editMode = false;
        }

      };

      vm.update = function () {
        Household.update({id: vm.household.Id}, vm.household, function () {
          vm.editMode = false;
          vm.editForm.$setPristine();
          toastr.success('Жилището бе актуализирано успешно.');
        })
      };

      vm.delete = function() {
        if($window.confirm('Сигурни ли сте, че искате да изтриете това жилище?')) {
          Household.delete({id: vm.household.Id},function() {
            $state.go('buildingDetail', {buildingId: vm.household.BuildingId});//todo go to building detail with ID
            toastr.warning('Жилището бе изтрито успешно.');
          }, function(error){
            toastr.warning(error);
          });
        }
      }


  }

})();
