(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('HouseholdController', HouseholdController );

    function HouseholdController(Household , $stateParams , toastr, $state, $window) {
      var vm = this;
      vm.editMode = false;
      vm.buildingId = $stateParams.buildingId;
      Household.get({id: $stateParams.householdId, building_id: $stateParams.buildingId},
        function (response) {
          vm.household = response;
        });

      vm.edit = function () {
        vm.editMode = true;
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
            $state.go('buildings');//todo go to building detail with ID
            toastr.warning('Жилището бе изтрито успешно.');
          }, function(error){
            toastr.warning(error);
          });
        }
      }


  }

})();
