/**
 * Created by test most on 2/19/2016.
 */
(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('HouseholdDepositsController', HouseholdDepositsController );

  function HouseholdDepositsController( HouseholdDeposit, QueryConstructor, $stateParams , toastr , $scope, $window , $rootScope) {
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

    $scope.$on('balance:update', function () {
      loadDeposits();
    });



    vm.onServerSideItemsRequested = function(currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
      vm.currentPage = currentPage;
      if(!vm.filterUpdate){
        loadDeposits(currentPage, pageItems,  filterByFields, orderBy, orderByReverse);
        vm.filterUpdate = false;
      }

    };


    //delete deposit
    vm.deleteDeposit = function(id) {
        HouseholdDeposit.delete({depositId: id}, function (response) {
          loadDeposits();
          console.log(response);
          toastr.success('Депозитът със стойност ' + response.Deposit.Value + 'лв. бе изтрит успешно.');
          $rootScope.$broadcast('balance:update' , response.BuildingBalance);//broadcast to update balance
        }, function(response){
          toastr.error("Не успя да се установи връзка с базата данни:" , response);
        });

    };


    var loadDeposits = function(currentPage, pageItems,  filterByFields, orderBy, orderByReverse) {
       HouseholdDeposit.query({household_id: $stateParams.householdId ,top: vm.top, skip: QueryConstructor.skip(vm.currentPage, vm.top), orderBy: QueryConstructor.order(orderBy, orderByReverse),
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
