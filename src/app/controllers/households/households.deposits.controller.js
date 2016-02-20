/**
 * Created by test most on 2/19/2016.
 */
(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('HouseholdDepositsController', HouseholdDepositsController );

  function HouseholdDepositsController( Deposit, QueryConstructor, $stateParams , toastr , $scope) {
    var vm = this;
    vm.deposit = new Deposit();




  }

})();
