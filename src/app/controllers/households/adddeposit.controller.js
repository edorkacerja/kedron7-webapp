(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('AddDepositController', AddDepositController );

  function AddDepositController(Deposit, $modalInstance, householdId) {
    var vm = this;

    console.log(householdId)
  }

})();
