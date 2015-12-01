(function(){
  'use strict'

  angular
    .module('kedron')
    .controller('HouseholdController', HouseholdController );

    function HouseholdController(Household , toastr, $stateParams) {
       var vm = this;
       vm.household = Household.get({id: $stateParams.householdId});
    }

})();
