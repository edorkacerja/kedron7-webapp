(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('HouseholdPaymentsController', HouseholdPaymentsController );

  function HouseholdPaymentsController( Payment, QueryConstructor, $stateParams , toastr) {
    var vm = this;
    vm.top = 10;

    //household payments
    vm.onServerSidePaymentsReq = function(currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
      Payment.query({id: $stateParams.householdId ,top: vm.top, skip: QueryConstructor.skip(currentPage, vm.top), filter:QueryConstructor.filter(filterByFields), orderBy: QueryConstructor.order(orderBy, orderByReverse)},
        function(response) {
          vm.payments = response.Items;
          vm.totalPayments = response.Count;
        },
        function(response) {
          toastr.error("Не успя да се установи връзка с базата данни:" , response );
        })
    };



  }

})();
