(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('HouseholdDebtsController', HouseholdDebtsController );

  function HouseholdDebtsController( Debt,  QueryConstructor, $stateParams , $rootScope, toastr , $window, $scope) {
    var vm = this;
    vm.top = 10;
    vm.isPaid = true;

    //use to change ispaid
    $scope.$watch('hddetail.isPaid',function(){
      loadDebts();
      $rootScope.$broadcast('isPaid:changed', vm.isPaid);//broadcast to filter
    });



    //listen to the filter and when the deposit gets successfully added
    $scope.$on('filterUpdate', function (event, arg) {
      vm.lowerBoundaryPrice = arg['lowerBoundary'];
      vm.upperBoundaryPrice = arg['upperBoundary'];
      vm.dateMadeLowerBoundary = arg['fromDateMade'];
      vm.dateMadeUpperBoundary = arg['toDateMade'];
      vm.datePaidUpperBoundary = arg['toDatePaid'];
      vm.datePaidLowerBoundary = arg['fromDatePaid'];

      loadDebts();
    });

    //coming from addDeposit
    $scope.$on('deposit:added', function (event, arg) {
      loadDebts();
    });


    //household debts
    vm.onServerSideDebtsReq = function(currentPage, pageItems, orderBy, orderByReverse) {
          loadDebts(currentPage, pageItems, orderBy, orderByReverse)
    };



    //delete debt
    vm.deleteDebt = function(id) {
      if($window.confirm('Сигурни ли сте, че искате да изтриете това жилище?')) {
        Debt.delete({debtId: id}, function () {
          loadDebts();
          toastr.success('Изтриването протече успешно.');
        }, function(response){
          toastr.error("Не успя да се установи връзка с базата данни:" , response);
        });
      }
    };



    var loadDebts = function(currentPage, pageItems, orderBy, orderByReverse) {

      Debt.query({id: $stateParams.householdId ,top: vm.top, skip: QueryConstructor.skip(currentPage, vm.top), orderBy: QueryConstructor.order(orderBy, orderByReverse),
        lowerBoundaryPrice: vm.lowerBoundaryPrice , upperBoundaryPrice: vm.upperBoundaryPrice, dateMadeLowerBoundary: vm.dateMadeLowerBoundary , dateMadeUpperBoundary: vm.dateMadeUpperBoundary,
        datePaidLowerBoundary: vm.datePaidLowerBoundary , datePaidUpperBoundary: vm.datePaidUpperBoundary, isPaid: vm.isPaid},

        function(response) {
          vm.debts = response.Items;
          vm.totalHouseholds = response.Count;
        },
        function(response) {
          toastr.error("Не успя да се установи връзка с базата данни:" , response );
        });
    }

  }

})();
