(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('HouseholdController', HouseholdController );

    function HouseholdController(Household , $stateParams , toastr, $state, $window , $modal) {
      var vm = this;

      vm.editMode = false;

      //household
      Household.get({id: $stateParams.householdId},
        function (response) {
          vm.household = response;
        }, function() {
          toastr.error("Не успя да се установи връзка с базата данни:" , response );
        });


      vm.edit = function () {
        vm.editMode = true;
        //if(!vm.floorsCount) {
        //  vm.editMode = false;
        //}

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
      };

      vm.addDeposit = function() {
        $modal.open({
          templateUrl: 'app/views/households/addDeposit.html',
          controller: 'AddDepositController',
          controllerAs: 'adp',
          resolve: {
            householdId: function() {
              return  vm.household.Id;
            }
          }
        });
      }


  }

})();
