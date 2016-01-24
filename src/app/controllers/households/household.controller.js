(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('HouseholdController', HouseholdController );

    function HouseholdController(Household , $stateParams) {
       var vm = this;
       vm.editMode = false;
       vm.buildingId = $stateParams.buildingId;
       Household.get({id: $stateParams.householdId , building_id: $stateParams.buildingId} ,
         function(response) {
           vm.household = response;
       });

      //
      //Name: "Георгиеви"
      //Number: 12
      //Floor: 4
      //AdultsCount: 3
      //ChildrenCount: 0
      //BuildingAddress: "Rakovska 50"
      //Payments: Array[0]
    }

})();
