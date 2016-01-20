(function(){
  'use strict'

  angular
    .module('kedron')
    .controller('HouseholdController', HouseholdController );

    function HouseholdController(Household , $stateParams) {
       var vm = this;

       Household.get({id: $stateParams.householdId , building_id: $stateParams.buildingId} ,
         function(response) {
           vm.household = response;
         });
    }

})();
