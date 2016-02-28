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
                 console.log(error.data.error_description);
                 alert(error.data.error_description);
                 vm.errorMessage = error.data.error_description;
               }
            );

    }

    //Handling the error message of form validation




  }
})();
