(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('HouseholdDebtsController', HouseholdDebtsController );

  function HouseholdDebtsController( Debt,  QueryConstructor, $stateParams , toastr) {
    var vm = this;
    vm.top = 10;

    //household debts
    vm.onServerSideDebtsReq = function(currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
      Debt.query({id: $stateParams.householdId ,top: vm.top, skip: QueryConstructor.skip(currentPage, vm.top), filter:QueryConstructor.filter(filterByFields), orderBy: QueryConstructor.order(orderBy, orderByReverse)},
        function(response) {
          vm.debts = response.Items;
          vm.totalHouseholds = response.Count;
        },
        function(response) {
          toastr.error("Не успя да се установи връзка с базата данни:" , response );
        })
    };


    //pay debt
    vm.payDebt = function(id) {
      Debt.update({debtId: id}, {id: id} ,function() {
        Debt.query({id: $stateParams.householdId} , function(response) {
          vm.debts = response.Items;
          vm.totalDebts = response.Count;
        });
        toastr.success('Заплащането протече успешно.');

      })
    };


  }

})();
