(function() {
  'use strict';

  angular
    .module('kedron')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(auth, $state ) {
      var vm = this;
      vm.profile = auth.currentUser();

      vm.logout = function() {
        auth.logout().then(
           function() {
             vm.profile = null;
             $state.go('home');
           }
        )
      }

    }
  }

})();
