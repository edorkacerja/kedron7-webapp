(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController( auth, $state) {
    var vm = this;
    vm.login = function(user) {
            auth.login(user).then(
               function() {
                 $state.go('home');

               },
               function(error) {
                 vm.status = error;
               }
            );

    }


  }

})();
