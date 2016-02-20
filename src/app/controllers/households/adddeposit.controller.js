(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('AddDepositController', AddDepositController );

  function AddDepositController(Deposit, $modalInstance, householdId, $rootScope , toastr) {
    var vm = this;
    vm.deposit = new Deposit();



    vm.add = function() {
      vm.deposit.$save({id: householdId} ,function(data) {
        vm.depositForm.$setPristine();
        $rootScope.$broadcast("deposit:added" , data);
        toastr.success('Успешен депозит', "Сума: " + data.Value + " лв." );
        $modalInstance.dismiss();
      });

    };
    vm.cancel = function() {
      $modalInstance.dismiss();
    }
  }

})();
