(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('RegistrationController', RegistrationController);

  /** @ngInject */
  function RegistrationController( $state,auth) {
    var vm = this;
    vm.status = '';
      vm.register = function(user) {
            auth.register(user).then(
              function() {
                $state.go('login');
              },
              function(error){
                  vm.status = error;
              }
            );
    }


  }

})();
