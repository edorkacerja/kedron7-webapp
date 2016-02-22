(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingCashbookController', BuildingCashbookController );

  function BuildingCashbookController($stateParams) {
    var vm = this;
    vm.buildingId = $stateParams.buildingId;


  }

})();
