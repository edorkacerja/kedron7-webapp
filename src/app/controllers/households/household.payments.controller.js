(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('HouseholdPaymentsController', HouseholdPaymentsController );

  function HouseholdPaymentsController( Payment, QueryConstructor, $stateParams , toastr , $scope) {
    var vm = this;
    vm.top = 10;

    //listen to the filter
    $scope.$on('filterUpdate', function (event, arg) {
      vm.lowerBoundaryPrice = arg['lowerBoundary'];
      vm.upperBoundaryPrice = arg['upperBoundary'];
      vm.datePaidLowerBoundary = arg['fromDate'];
      vm.datePaidUpperBoundary = arg['toDate'];

      loadPayments();
    });

    //household payments
    vm.onServerSidePaymentsReq = function(currentPage, pageItems, orderBy, orderByReverse) {
        vm.currentPage = currentPage;
        loadPayments(currentPage, pageItems,  orderBy, orderByReverse)
    };


   var loadPayments = function(currentPage, pageItems,  orderBy, orderByReverse) {
     //fix typo bondary to boudnary when fixed
     Payment.query({id: $stateParams.householdId ,top: vm.top, skip: QueryConstructor.skip(vm.currentPage, vm.top), orderBy: QueryConstructor.order(orderBy, orderByReverse),
         lowerBoundaryPrice: vm.lowerBoundaryPrice , upperBoundaryPrice: vm.upperBoundaryPrice, datePaidLowerBondary: vm.datePaidLowerBoundary , datePaidUpperBoundary: vm.datePaidUpperBoundary},
       function(response) {
         vm.payments = response.Items;
         vm.totalPayments = response.Count;
       },
       function(response) {
         toastr.error("Не успя да се установи връзка с базата данни:" , response );
       })
   }


  }

})();
