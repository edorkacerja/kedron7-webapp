/**
 * Created by test most on 3/3/2016.
 */
(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingCashbookReportsController', BuildingCashbookReportsController );

  function BuildingCashbookReportsController(Expense , Deposit , QueryConstructor , $scope) {
    var vm = this;


    $scope.$watch('cbr.Date', function() {
      if(vm.Date) {
        vm.toDate = vm.Date;
        vm.toDate.setMonth(vm.Date.getMonth() + 1);
        console.log(vm.toDate);
      }

    });





  }
})();
