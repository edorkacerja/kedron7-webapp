/**
 * Created by test most on 2/7/2016.
 */
(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('HouseholdFilterController', HouseholdFilterController );

  function HouseholdFilterController( $scope, toastr , $rootScope , $timeout) {
    var vm = this;
    // set available range
    $scope.$on('isPaid:changed',function(event,args){
      //returns true or false
      //true - the items are paid, false - the items are not paid yet
      vm.isPaid = args;
    });
    vm.minLowerBoundaryPrice = 0;
    vm.maxUpperBoundaryPrice = 1000;

    // default the user's values to the available range
    vm.lowerBoundaryPrice = vm.minLowerBoundaryPrice;
    vm.upperBoundaryPrice = vm.maxUpperBoundaryPrice;




    vm.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };


    var timeoutPromise;
    $scope.$watchGroup(['hfdetail.lowerBoundaryPrice','hfdetail.upperBoundaryPrice' , 'hfdetail.toDateMade', 'hfdetail.fromDateMade',
     'hfdetail.fromDatePaid', 'hfdetail.toDatePaid'], function() {

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

    });

  }

})();
