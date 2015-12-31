(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController( auth, $state, toastr) {
    var vm = this;
    vm.login = function(user) {
            auth.login(user).then(
               function() {
                 $state.go('buildings');
                 toastr.success("Login successful!" );
               },
               function(error) {
                 toastr.error("Login failed" , error );
               }
            );

    }


  }
// grant_type=password&username=senart@ymail.co&password=123456Senart#
})();
