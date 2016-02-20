(function() {
 'use strict';
  angular
    .module('kedron')
    .controller('addExpenseController', addExpenseController );

  function addExpenseController($stateParams,$state,  Expense, households, toastr) {
    var vm = this;
    vm.buildingId = $stateParams.buildingId;
    vm.filters = {};
    vm.newExpense = new Expense();

    vm.noExpenseTypes = true;
    vm.households = households;


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
       vm.households[index].Value > 0 ? vm.households[index].IsPaying = true : vm.households[index].IsPaying = false;
      updateTotal();
    };

    function updateTotal() {
      //nullify filters and reinitialize the total
      vm.total = 0;
      vm.isFiltering = false;
      vm.filters = {fromToFilters: []};
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
      vm.filters.fromToFilters.push( angular.copy(filter));//prevent model binding
      vm.updateFilters();
    };
    vm.removeFromToFilter = function(index) {
        vm.filters.fromToFilters.splice(index, 1);
        vm.updateFilters();
    };

    //construct a query string
    vm.updateFilters = function() {
      var filterString = '';
      for (var j = 0; j < vm.filters.fromToFilters.length; j++){
        if(j == (vm.filters.fromToFilters.length - 1)) {
          filterString += vm.filters.fromToFilters[j].attribute + vm.filters.fromToFilters[j].condition + vm.filters.fromToFilters[j].value;
        } else {
          filterString += vm.filters.fromToFilters[j].attribute + vm.filters.fromToFilters[j].condition + vm.filters.fromToFilters[j].value + ','
        }
      }

      vm.sendReq(filterString);
    };

    //send request to teh server to get the values that have to be paid
    vm.sendReq = function(filterString) {
      if(!filterString) {
        vm.filters.fromToFilters = [];
      }
      Expense.payers({building_id: $stateParams.buildingId , value: vm.total, method: vm.filters.householdPerson , filter: filterString } ,
        function(response) {
          vm.households = response;
        },
        function(response) {
          toastr.error("Не успя да се установи връзка с базата данни:" , response );
        });
    };


    //add expense
    vm.addExpense = function() {
         var result = [];
         for(var i = 0; i < vm.households.length ; i++) {
            result.push({HouseholdId: vm.households[i].Id , Value: vm.households[i].Value});
         }
      vm.newExpense.ExpensePayersInformation = result;


        vm.newExpense.$save({building_id: $stateParams.buildingId},function(data) {
        toastr.success('Разходът бе добавен', "Име: " + data.Name );
        $state.go('cashbook', {buildingId: $stateParams.buildingId});
      })
    }




    }
})();
