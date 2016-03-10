(function() {
  'use strict';
  angular
    .module('kedron')
    .service('authInterceptor', authInterceptor);

  function authInterceptor($q,$window, $rootScope , $location) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if($window.sessionStorage["userInfo"] == "null" ) {
        } else{
          config.headers.Authorization = 'Bearer ' + JSON.parse($window.sessionStorage["userInfo"]).accessToken;
        }


        return config;
      },
      response: function (response) {
        return response || $q.when(response);
      },
      responseError: function (rejection) {
        console.log('ad');
        $location.path('/login');
        return rejection;

      }
    };
  }

})();
