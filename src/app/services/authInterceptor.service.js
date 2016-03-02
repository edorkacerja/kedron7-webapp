(function() {
  'use strict';
  angular
    .module('kedron')
    .service('authInterceptor', authInterceptor);

  function authInterceptor($q, $window, $rootScope) {
    return {
      request: function (config) {
        config.headers = config.headers || {};

        if($window.sessionStorage["userInfo"] != null  || $window.sessionStorage["userInfo"] != undefined) {
          config.headers.Authorization = 'Bearer ' + JSON.parse($window.sessionStorage["userInfo"]).accessToken;
        }
        return config;
      },
      response: function (response) {
        return response || $q.when(response);
      },
      responseError: function (rejection) {
        //todo add an error handling for unauthorized users
      }
    };
  }

})();
