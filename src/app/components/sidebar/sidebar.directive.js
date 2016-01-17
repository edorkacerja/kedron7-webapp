(function() {
  'use strict';

  angular
    .module('kedron')
    .directive('acmeSidebar', acmeSidebar);

  /** @ngInject */
  function acmeSidebar() {
    var directive = {
      restrict: 'E',
      scope: {
        objid: '@'
      },
      templateUrl: 'app/components/sidebar/sidebar.html',
      controller: SidebarController,
      controllerAs: 'sidebar',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function SidebarController($location) {
      var sm = this;
      sm.isActive = function (viewLocation) {
          var active = (viewLocation === $location.path());
          return active;

        };

    }
  }

})();
