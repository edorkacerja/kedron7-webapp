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
                 toastr.success("Влязохте успешно!" );
               },
               function(error) {
                 toastr.error("Неуспешно влизане в системата" , error );
               }
            );

    }


  }
// grant_type=password&username=senart@ymail.co&password=123456Senart#
})();
