(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('HouseholdDebtsController', HouseholdDebtsController );

  function HouseholdDebtsController( Debt,  QueryConstructor, $stateParams , toastr , $window, $scope) {
    var vm = this;
    vm.top = 10;

    //listen to the filter and when the deposit gets successfully added
    $scope.$on('filterUpdate', function (event, arg) {
      vm.lowerBoundaryPrice = arg['lowerBoundary'];
      vm.upperBoundaryPrice = arg['upperBoundary'];
      vm.dateMadeLowerBoundary = arg['fromDate'];
      vm.dateMadeUpperBoundary = arg['toDate'];

      loadDebts();
    });

    //todo refactor?
    $scope.$on('deposit:added', function (event, arg) {
      vm.lowerBoundaryPrice = arg['lowerBoundary'];
      vm.upperBoundaryPrice = arg['upperBoundary'];
      vm.dateMadeLowerBoundary = arg['fromDate'];
      vm.dateMadeUpperBoundary = arg['toDate'];

      loadDebts();
    });
    //household debts
        vm.onServerSideDebtsReq = function(currentPage, pageItems, orderBy, orderByReverse) {
          vm.currentPage = currentPage;
          loadDebts(currentPage, pageItems, orderBy, orderByReverse)
    };


    //pay debt
    vm.payDebt = function(id) {
      Debt.update({debtId: id}, {id: id} ,function() {
        loadDebts();
        toastr.success('Заплащането протече успешно.');

      })
    };


    //delete debt
    vm.deleteDebt = function(id) {
      if($window.confirm('Сигурни ли сте, че искате да изтриете това жилище?')) {

        Debt.delete({debtId: id}, function () {

          loadDebts();
          toastr.success('Заплащането протече успешно.');

        }, function(response){
          toastr.error("Не успя да се установи връзка с базата данни:" , response);
        });
      }
    };


   //
    var loadDebts = function(currentPage, pageItems, orderBy, orderByReverse) {

      Debt.query({id: $stateParams.householdId ,top: vm.top, skip: QueryConstructor.skip(vm.currentPage, vm.top), orderBy: QueryConstructor.order(orderBy, orderByReverse),
        lowerBoundaryPrice: vm.lowerBoundaryPrice , upperBoundaryPrice: vm.upperBoundaryPrice, dateMadeLowerBoundary: vm.dateMadeLowerBoundary , dateMadeUpperBoundary: vm.dateMadeUpperBoundary},

        function(response) {
          vm.debts = response.Items;
          vm.totalHouseholds = response.Count;
        },
        function(response) {
          toastr.error("Не успя да се установи връзка с базата данни:" , response );
        })
    }

  }

})();
