(function() {
 'use strict';
  angular
    .module('kedron')
    .controller('addExpenseController', addExpenseController );

  function addExpenseController($stateParams,$state,  Expense, toastr) {
    var vm = this;
    vm.filters = {};
    vm.newExpense = new Expense();

    vm.noExpenseTypes = true;
    Expense.payers({id: $stateParams.buildingId} ,
      function(response) {
        vm.households = response;
      },
      function(response) {
          toastr.error("Не успя да се установи връзка с базата данни:" , response );
      });


     //manual mode
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
      vm.isFiltering = false;
      vm.householdPerson = null;
      for(var i = 0; i < vm.households.length ; i++ ){
        vm.total += vm.households[i].Value;
      }
    }

    //custom mode
    vm.filters.fromToFilters = [];
    vm.addFromToFilter = function(filter) {
      var newItemNo = vm.filters.fromToFilters.length + 1;
      filter['id'] = 'choice'+ newItemNo;
      vm.filters.fromToFilters.push(filter);
      vm.updateFilters();
    };
    vm.removeFromToFilter = function(index) {
        vm.filters.fromToFilters.splice(index, 1);
        vm.updateFilters();
    };

    var filterString = '';
    vm.updateFilters = function() {
      var filterString = '';
      for (var j = 0; j < vm.filters.fromToFilters.length; j++){
        filterString += vm.filters.fromToFilters[j].attribute + vm.filters.fromToFilters[j].condition + vm.filters.fromToFilters[j].value + ' , '
      }
      vm.sendReq(filterString);
    };


    vm.sendReq = function(filterString) {
      Expense.payers({id: $stateParams.buildingId , value: vm.total, method: vm.filters.householdPerson , filter: filterString } ,
        function(response) {
          console.log(response);
          vm.households = response;
        },
        function(response) {
          toastr.error("Не успя да се установи връзка с базата данни:" , response );
        });
    };


    //add expense
    vm.addExpense = function() {
      vm.newExpense.ExpensePayersInformation = vm.households;
      vm.newExpense.$save({id: $stateParams.buildingId},function(data) {
        toastr.success('Разходът бе добавен', "Име: " + data.Name );
        $state.go('cashbook', {buildingId: $stateParams.buildingId});
      })
    }




    }
})();
