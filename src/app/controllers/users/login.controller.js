(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController( auth, $state, toastr) {
    var vm = this;
    if (auth.currentUser()) {
      $state.go('buildings');
    }
    vm.login = function(user) {
            auth.login(user).then(
               function() {
                 $state.go('buildings');
                 toastr.success("Влязохте успешно!" );
               },
               function(error) {
                 toastr.error("Неуспешно влизане в системата" , error );
               }
            );

    }


  }
})();
