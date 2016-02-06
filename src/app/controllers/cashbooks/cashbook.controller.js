(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('CashbookController', CashbookController );

  function CashbookController(Expense,toastr, QueryConstructor, $stateParams , $scope) {
    var vm = this;
    vm.top = 10 ; //number of items per page -> 10;
    // set available range
    vm.minLowerBoundaryPrice = 0;
    vm.maxUpperBoundaryPrice = 1000;

    // default the user's values to the available range
    vm.lowerBoundaryPrice = vm.minLowerBoundaryPrice;
    vm.upperBoundaryPrice = vm.maxUpperBoundaryPrice;

    $scope.$watch('cb.lowerBoundaryPrice' , function() {
        loadExpenses();
    });
    $scope.$watch('cb.upperBoundaryPrice' , function() {
        loadExpenses();
    });


    vm.buildingId = $stateParams.buildingId;
    vm.onServerSideItemsRequested = function(currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
       vm.currentPage = currentPage;
       loadExpenses(vm.currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse);
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
