(function() {
 'use strict';
  angular
    .module('kedron')
    .controller('addExpenseController', addExpenseController );

  function addExpenseController($stateParams,$state, $scope,  Expense, toastr ) {
    var vm = this;
    vm.buildingId = $stateParams.buildingId;
    vm.filters = {};
    vm.newExpense = new Expense();






     //make an array of household expense values that are fixed.
     //the list is used to avoid changing the values of the households with custom expenses
     var fixedList = [];
     //a variable that stores the total of all fixed items
     var fixedTotal = 0;

    vm.checkFixDebt = function(index) {
      console.log('upcall');
      if(vm.households[index].isFixed) {
        fixedList.push(vm.households[index]);
      } else {
        vm.households[index].isFixed = 0;
        fixedList.splice(index,1);
      }
    };
     //change to manual mode
    //triggered when the user manually changes the Value
    vm.fixDebt = function(index){
      if(!vm.households[index].isFixed) {
        //if it is not fixed, set it to fixed and put into the fixedList
        vm.households[index].isFixed = 1;
        fixedList.push(vm.households[index]);
      }
      updateFixedTotal();
      updateTotal();
    };

    //calculate the sum of the fixed items
    function updateFixedTotal() {
      fixedTotal = 0;
      console.log(fixedList);
      angular.forEach(fixedList, function(value, key) {
        fixedTotal += value.Value;
      })
    }
    //calculate the remainder of the sum without the fixed items

    function updateTotal() {
      //nullify filters
      vm.isFiltering = false;
      vm.filters = {fromToFilters: []};
      vm.householdPerson = null;
      //find the differences
      var remainderTotal = vm.total - fixedTotal;
      var diffCount = vm.households.length - fixedList.length;
      //return if the remainder is a fixed value
      if (remainderTotal < 0) return;
      var avgRemainder = remainderTotal/diffCount;

      //this won't be good for large buildings
      for(var i = 0 ; i < vm.households.length ; i ++) {
        var isFixed = false;
        for( var f = 0 ; f < fixedList.length ; f ++ ) {
          if(fixedList[f].Id === vm.households[i].Id) {
            console.log('identical!');
            isFixed = true;
            break;
          }
        }
        if(!isFixed) vm.households[i].Value = avgRemainder;

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
          if( j == 0) {
            filterString += vm.filters.fromToFilters[j].attribute + vm.filters.fromToFilters[j].comparison + vm.filters.fromToFilters[j].value;
        } else  {
            filterString += ' ' +  vm.filters.fromToFilters[j].logical + ' ' + vm.filters.fromToFilters[j].attribute + vm.filters.fromToFilters[j].comparison + vm.filters.fromToFilters[j].value ;
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
