(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('HouseholdDebtsController', HouseholdDebtsController );

  function HouseholdDebtsController( Debt,  QueryConstructor, $stateParams , $rootScope, toastr , $modal, $scope) {
    var vm = this;
    vm.top = 10;
    vm.isPaid = true;

    //use to change ispaid
    $scope.$watch('hddetail.isPaid',function(newValue, oldValue){
      if (newValue !== oldValue) {
        loadDebts();
        $rootScope.$broadcast('isPaid:changed', vm.isPaid);//broadcast to filter
      }
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
    $scope.$on('balance:update', function (event, arg) {
      loadDebts();
    });


    //household debts
    vm.onServerSideDebtsReq = function(currentPage, pageItems, orderBy, orderByReverse) {
          vm.currentPage = currentPage;
          loadDebts(currentPage, pageItems, orderBy, orderByReverse);

    };



    //delete debt
    vm.deleteDebt = function(id) {
        Debt.delete({debt_id: id}, function () {
          loadDebts();
          $rootScope.$broadcast('balance:update');//broadcast to update balance
          toastr.success('Изтриването протече успешно.');
        }, function(response){
          toastr.error("Не успя да се установи връзка с базата данни:" , response);
        });
      };

   //pay debt - make a deposit for paying a particular debt
    vm.payDebt = function(debt) {
      $scope.debt = debt;
      $modal.open({
        templateUrl: 'app/views/households/addDeposit.html',
        controller: 'AddDepositController',
        controllerAs: 'adp',
        size: 'sm',
        scope: $scope
      });

    };



    var loadDebts = function(currentPage, pageItems, orderBy, orderByReverse) {
      Debt.query({household_id: $stateParams.householdId ,top: vm.top, skip: QueryConstructor.skip(vm.currentPage, vm.top), orderBy: QueryConstructor.order(orderBy, orderByReverse),
        lowerBoundaryPrice: vm.lowerBoundaryPrice , upperBoundaryPrice: vm.upperBoundaryPrice, dateMadeLowerBoundary: vm.dateMadeLowerBoundary , dateMadeUpperBoundary: vm.dateMadeUpperBoundary,
        datePaidLowerBoundary: vm.datePaidLowerBoundary , datePaidUpperBoundary: vm.datePaidUpperBoundary, isPaid: vm.isPaid},

        function(response) {
          vm.debts = response.Items;
          console.log(response.Items);
          vm.totalHouseholds = response.Count;
        },
        function(response) {
          toastr.error("Не успя да се установи връзка с базата данни:" , response );
        });
    }

  }

})();
