/**
 * Created by test most on 2/19/2016.
 */
(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('HouseholdDepositsController', HouseholdDepositsController );

  function HouseholdDepositsController( Deposit, QueryConstructor, $stateParams , toastr , $scope) {
    var vm = this;

    vm.top = 10;
    vm.totalDeposits = 10; //change when the API is ready
    vm.onServerSideItemsRequested = function(currentPage, pageItems, filterByFields, orderBy, orderByReverse) {
      vm.currentPage = currentPage;
      loadDeposits(pageItems, filterByFields, orderBy, orderByReverse)
    };

    //listen to the filter and when the deposit gets successfully added

    //$scope.$on('filterUpdate', function (event, arg) {
    //  vm.lowerBoundaryPrice = arg['lowerBoundary'];
    //  vm.upperBoundaryPrice = arg['upperBoundary'];
    //  vm.datePaidLowerBoundary = arg['fromDate'];
    //  vm.datePaidUpperBoundary = arg['toDate'];
    //
    //  loadPayments();
    //});
    //todo refactor?
    $scope.$on('deposit:added', function (event, arg) {
      //vm.lowerBoundaryPrice = arg['lowerBoundary'];
      //vm.upperBoundaryPrice = arg['upperBoundary'];
      //vm.datePaidLowerBoundary = arg['fromDate'];
      //vm.datePaidUpperBoundary = arg['toDate'];

      loadDeposits();
    });

    function loadDeposits(pageItems, filterBy, filterByFields, orderBy, orderByReverse) {//todo change when the API is ready
       Deposit.query({id: $stateParams.householdId} ,function(response) {
         vm.deposits = response;
       },function(response) {
           toastr.error("Не успя да се установи връзка с базата данни:" , response );
       })

    }



  }

})();
