(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingsController', BuildingsController);

  /** @ngInject */
  function BuildingsController( Building) {
      var vm = this;
      vm.buildings = Building.query();

  }
})();
