(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('AddDepositController', AddDepositController );

  function AddDepositController( $scope ,$uibModalInstance, $rootScope , $stateParams,HouseholdDeposit, Debt,  toastr) {
    var vm = this;
    if($scope.debt) {
      vm.isPayingDebt = true;
      vm.deposit = $scope.debt;
    } else {
      vm.isPayingDebt = false;
      vm.deposit = new HouseholdDeposit();
    }

    vm.add = function() {
      if(vm.isPayingDebt) {//if there is a debtId, the modal is opened from payDebt - this will make a deposit for paying a particular debt
        Debt.update({debt_id: $scope.debt.Id} ,  {debt_id: $scope.debt.Id},  function(response) {
          vm.depositForm.$setPristine();
          console.log(response);
          $rootScope.$broadcast("balance:update" , response.HouseholdBalance);
          toastr.success('Успешно платено задължение');
          $uibModalInstance.dismiss();
        });
      } else if(!vm.isPayingDebt) {//if not, a new deposit will be added
        vm.deposit.$save({householdId: $stateParams.householdId} ,function(response) {
          vm.depositForm.$setPristine();
          console.log(response);
          $rootScope.$broadcast("balance:update" , response.HouseholdBalance);
          toastr.success('Успешен депозит', "Сума: " + response.Value + " лв." );
          $uibModalInstance.dismiss();
        });
      }
    };


    vm.cancel = function() {
      $uibModalInstance.dismiss();
    }
  }

})();
