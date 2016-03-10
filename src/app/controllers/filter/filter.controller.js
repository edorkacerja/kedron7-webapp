/**
 * Created by test most on 2/7/2016.
 */
(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('FilterController', FilterController );
  //this filter is used for household debts, deposits and building expenses and deposits
  function FilterController( $scope, toastr , $rootScope , $timeout) {
    var vm = this;
    // set available range
    $scope.$on('isPaid:changed',function(event,args){
      //returns true or false
      //true - the items are paid, false - the items are not paid yet
      vm.isPaid = args;
    });
    vm.minLowerBoundaryPrice = 0;
    vm.maxUpperBoundaryPrice = 10000;

    // default the user's values to the available range
    vm.lowerBoundaryPrice = vm.minLowerBoundaryPrice;
    vm.upperBoundaryPrice = vm.maxUpperBoundaryPrice;




    vm.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };


    var timeoutPromise;
    $scope.$watchGroup(['filter.lowerBoundaryPrice','filter.upperBoundaryPrice' , 'filter.toDateMade', 'filter.fromDateMade',
      'filter.fromDatePaid', 'filter.toDatePaid'], function(newValue, oldValue) {
     if(newValue !== oldValue) {
       $timeout.cancel(timeoutPromise);
       var timeoutPromise = $timeout(function() {

         $rootScope.$broadcast('filterUpdate', {
           'lowerBoundary': vm.lowerBoundaryPrice,
           'upperBoundary': vm.upperBoundaryPrice ,
           'fromDateMade': vm.fromDateMade,
           'toDateMade': vm.toDateMade,
           'fromDatePaid': vm.fromDatePaid,
           'toDatePaid':  vm.toDatePaid
         });
       }, 500);

     }

    });

  }

})();