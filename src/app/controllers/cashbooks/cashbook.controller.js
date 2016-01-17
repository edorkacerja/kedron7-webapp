(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('CashbookController', CashbookController );

  function CashbookController(Building,toastr, $stateParams) {
    var vm = this;
   Building.get({id: $stateParams.buildingId} ,
     function(response) {
     vm.building = response;
   });
  }

})();
