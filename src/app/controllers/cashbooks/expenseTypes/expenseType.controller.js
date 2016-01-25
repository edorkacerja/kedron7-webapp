(function() {
 'use strict';
  angular
    .module('kedron')
    .controller('ExpenseTypeController', ExpenseTypeController );

  function ExpenseTypeController($stateParams, Household , toastr) {
    var vm = this;
    vm.payers = [];
    //assuming there are no expense types(for now)
    //todo make a request to actually see if they are no expense types added

    vm.noExpenseTypes = true;
    Household.query({building_id: $stateParams.buildingId, top: 9999 , skip:0} ,
      function(response) {//get all the households for the building
        vm.households = response.Items;
        vm.totalHouseholds = response.Count;
      },
      function(response) {
          toastr.error("Не успя да се установи връзка с базата данни:" , response );
      });

    vm.addPayer = function(newPayer, index) {
      newPayer.payerId = vm.households[index].Id;
       var isExisting = false;
       newPayer.Value === 0 ? newPayer.DoesPay = false : newPayer.DoesPay = true;
      if(vm.payers.length === 0) {
        vm.payers.push(newPayer);
      }
      for(var i = 0 ; i < vm.payers.length ; i++ ) {
        if(vm.payers[i].Id == newPayer.Id) {
          vm.payers[i].Value = newPayer.Value;
          isExisting = true;
        }
      }

      if(!isExisting) {
        vm.payers.push(newPayer);
      }
    }


  }
})();
