/**
 * Created by test most on 3/24/2016.
 */
(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('UserController', UserController );

  function UserController(Deposit) {
    var vm = this;
    vm.top = 10;

//Called from on-data-required directive.
    vm.onServerSideItemsRequested = function(currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {

    };


    var loadDeposits = function(currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
      Deposit.query(
        {top: vm.top,
          skip: QueryConstructor.skip(currentPage, vm.top),
          filter:QueryConstructor.filter(filterByFields),
          orderBy: QueryConstructor.order(orderBy, orderByReverse)},

        function(response) {
          vm.deposits = response;
          vm.totalDeposits = response.Count;
        },

        function(response) {
          toastr.error("Не успя да се установи връзка с базата данни:" , response );
        })
    }
  }
})();
