(function() {
  'use strict';

  angular
    .module('kedron')
    .directive('acmeSidebar', acmeSidebar);

  /** @ngInject */
  function acmeSidebar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/sidebar/sidebar.html',
      controller: SidebarController,
      controllerAs: 'sidebar',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function SidebarController() {
      var vm = this;

    }
  }

})();
