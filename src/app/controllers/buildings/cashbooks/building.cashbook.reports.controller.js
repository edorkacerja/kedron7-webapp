/**
 * Created by test most on 3/3/2016.
 */
(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingCashbookReportsController', BuildingCashbookReportsController );

  function BuildingCashbookReportsController(Expense , Deposit , QueryConstructor , $scope , $stateParams) {
    var vm = this;


    $scope.$watch('cbr.Date', function() {
      vm.depositsTotal = 0;
      vm.expensesTotal = 0;

      if(vm.Date) {
        vm.toDate = new Date(vm.Date.getFullYear(), vm.Date.getMonth() + 1, 0);

        var params  = { building_id: $stateParams.buildingId, dateMadeLowerBoundary: vm.Date , dateMadeUpperBoundary: vm.toDate};

        Deposit.query(params  , function(response) {
          vm.deposits = response.Items;
          angular.forEach(vm.deposits , function(value,key) {

            vm.depositsTotal += value.Value;
          });
          vm.totalDeposits = response.depositCount;
        });
        Expense.query(params , function(response) {
          vm.expenses = response.Items;
          angular.forEach(vm.expenses , function(value,key) {
            vm.expensesTotal += value.Value;
          });
          vm.totalExpenses = response.expenseCount;
        })

      }


    });





  }
})();
