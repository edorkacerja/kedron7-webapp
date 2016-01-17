(function(){
  'use strict'

  angular
    .module('kedron')
    .controller('HouseholdController', HouseholdController );

    function HouseholdController(Household , $stateParams) {
       var vm = this;
       Household.get({id: $stateParams.householdId} ,
         function(response) {
           vm.household = response;
         });
    }

})();
