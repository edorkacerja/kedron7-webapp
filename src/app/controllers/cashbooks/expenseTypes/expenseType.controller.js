(function() {
 'use strict';
  angular
    .module('kedron')
    .controller('ExpenseTypeController', ExpenseTypeController );

  function ExpenseTypeController($stateParams,$state, Household , Expense, toastr) {
    var vm = this;
    vm.payers = [];

    vm.newExpense = new Expense();
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



    vm.isPayingChecked = function(index) {
      if(vm.households[index].isPaying) {
        vm.households[index].Value = 1;
      } else {
        vm.households[index].Value = 0;
      }
      updateTotal();
    };

    vm.changePaymentStatus = function(index){
      if(vm.households[index].Value > 0) {
        vm.households[index].isPaying = true;
      } else {
        vm.households[index].isPaying = false;
      }
      updateTotal();
    };

    function updateTotal() {
      vm.total = 0;
      for(var i = 0; i < vm.households.length ; i++ ){
        vm.total += vm.households[i].Value;
      }
    }


    //add expense
    vm.addExpense = function() {
      vm.newExpense.ExpensePayersInformation = vm.payers;
      vm.newExpense.$save({id: $stateParams.buildingId},function(data) {
        toastr.success('Разходът бе добавен', "Име: " + data.Name );
        $state.go('cashbook', {buildingId: $stateParams.buildingId});
      })
    }




    }
})();
