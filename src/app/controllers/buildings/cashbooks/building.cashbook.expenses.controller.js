(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingCashbookExpensesController', BuildingCashbookExpensesController );

  function BuildingCashbookExpensesController(Expense,toastr, QueryConstructor, $stateParams , $scope , $timeout) {
    var vm = this;
    vm.top = 10 ; //number of items per page -> 10;
    // set available range
    vm.minLowerBoundaryPrice = 0;
    vm.maxUpperBoundaryPrice = 1000;

    // default the user's values to the available range
    vm.lowerBoundaryPrice = vm.minLowerBoundaryPrice;
    vm.upperBoundaryPrice = vm.maxUpperBoundaryPrice;

    var timeoutPromise;
    $scope.$watchGroup(['cbe.lowerBoundaryPrice','cbe.upperBoundaryPrice' ], function() {
      $timeout.cancel(timeoutPromise);
      var timeoutPromise = $timeout(function() {
        loadExpenses();
      }, 500);

    });


    vm.buildingId = $stateParams.buildingId;
    vm.onServerSideItemsRequested = function(currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
      vm.currentPage = currentPage;
      loadExpenses(currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse);
    };

    var loadExpenses = function(currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
      Expense.query({building_id: $stateParams.buildingId ,top: vm.top, skip: QueryConstructor.skip(vm.currentPage, vm.top), filter:QueryConstructor.filter(filterByFields), orderBy: QueryConstructor.order(orderBy, orderByReverse),
          upperBoundaryPrice: vm.upperBoundaryPrice , lowerBoundaryPrice: vm.lowerBoundaryPrice } ,
        function(response) {
          vm.expenses= response.Items;
          vm.totalExpenses = response.Count;
        }, function(response){
          toastr.error("Не успя да се установи връзка с базата данни:" , response );
        });
    };

  }

})();
