/**
 * Created by test most on 2/19/2016.
 */
(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('HouseholdDepositsController', HouseholdDepositsController );

  function HouseholdDepositsController( HouseholdDeposit, QueryConstructor, $stateParams , toastr , $scope, $window) {
    var vm = this;

    vm.top = 10;



    //listen to the filter and when the deposit gets successfully added

    $scope.$on('filterUpdate', function (event, arg) {
      vm.lowerBoundaryPrice = arg['lowerBoundary'];
      vm.upperBoundaryPrice = arg['upperBoundary'];
      vm.dateMadeLowerboundary = arg['fromDate'];
      vm.dateMadeUpperboundary = arg['toDate'];
      loadDeposits();
    });
    $scope.$on('deposit:added', function (event, arg) {
      vm.lowerBoundaryPrice = arg['lowerBoundary'];
      vm.upperBoundaryPrice = arg['upperBoundary'];
      vm.dateMadeLowerboundary = arg['fromDate'];
      vm.dateMadeUpperboundary = arg['toDate'];

      loadDeposits();
    });



    vm.onServerSideItemsRequested = function(currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
      vm.currentPage = currentPage;
      loadDeposits(currentPage, pageItems,  filterByFields, orderBy, orderByReverse)
    };


    //delete deposit
    vm.deleteDeposit = function(id) {

      if($window.confirm('Сигурни ли сте, че искате да изтриете това жилище?')) {

        HouseholdDeposit.delete({depositId: id}, function () {
          loadDeposits();
          toastr.success('Заплащането протече успешно.');

        }, function(response){
          toastr.error("Не успя да се установи връзка с базата данни:" , response);
        });
      }
    };


    var loadDeposits = function(currentPage, pageItems,  filterByFields, orderBy, orderByReverse) {
       HouseholdDeposit.query({id: $stateParams.householdId ,top: vm.top, skip: QueryConstructor.skip(vm.currentPage, vm.top), orderBy: QueryConstructor.order(orderBy, orderByReverse),
           lowerBoundaryPrice: vm.lowerBoundaryPrice , upperBoundaryPrice: vm.upperBoundaryPrice, dateMadeLowerboundary: vm.dateMadeLowerboundary , dateMadeUpperboundary: vm.dateMadeUpperboundary},
         function(response) {
         vm.deposits = response.Items;
         vm.totalDeposits = response.Count;
       },
         function(response) {
           toastr.error("Не успя да се установи връзка с базата данни:" , response );
       })

    }



  }

})();
