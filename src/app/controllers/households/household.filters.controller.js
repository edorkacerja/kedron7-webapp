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
    vm.minLowerBoundaryPrice = 0;
    vm.maxUpperBoundaryPrice = 1000;

    // default the user's values to the available range
    vm.lowerBoundaryPrice = vm.minLowerBoundaryPrice;
    vm.upperBoundaryPrice = vm.maxUpperBoundaryPrice;

    vm.fromDatePopup = {
      opened: false
    };


    vm.toDatePopup = {
      opened: false
    };



    vm.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    vm.openFromDatePopup = function() {
      vm.fromDatePopup.opened = true;
    };

    vm.openToDatePopup = function() {
      vm.toDatePopup.opened = true;
    };

    var timeoutPromise;
    $scope.$watchGroup(['hfdetail.lowerBoundaryPrice','hfdetail.upperBoundaryPrice' , 'hfdetail.toDate', 'hfdetail.fromDate'], function() {
      $timeout.cancel(timeoutPromise);
      var timeoutPromise = $timeout(function() {
        $rootScope.$broadcast('filterUpdate', {
          'lowerBoundary': vm.lowerBoundaryPrice,
          'upperBoundary': vm.upperBoundaryPrice ,
          'fromDate': vm.fromDate,
          'toDate': vm.toDate
        });
      }, 500);

    });

  }

})();
