(function() {
 'use strict';
 angular
   .module('kedron')
   .service('auth', auth);

   function auth($http, $rootScope, $window ,  $q , api ) {

     //LOG IN
     this.login = function(user) {
        var deferred = $q.defer();
        $http.post(api +"/token", "grant_type=password&username=" + user.email +
                             "&password=" + user.password,

                             {
                               headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
                                  }
                              }
        ).then(
           function(response) {
                var  userInfo = {//generate an access token on the server for the user
                  accessToken: response.data.access_token,
                  userName: response.data.username
                };
              $rootScope.$emit('user:loggedin', userInfo); //broadcast to all controllers that  the user has logged in
              $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);//store the data on the client
              deferred.resolve();
           },
           function(error) {
              deferred.reject(error);
           })

           return deferred.promise;
     }
     //REGISTER
     this.register = function(user) {
       var deferred = $q.defer();
       $http.defaults.useXDomain = true;
       delete $http.defaults.headers.common['X-Requested-With'];
       $http.post( api +"/account/register", {"Email": user.email , "Password": user.password , "ConfirmPassword": user.confirmPassword })
       .then(
         function() {
            deferred.resolve();
         },
         function(error){
            deferred.reject(error.data.ModelState[''][0]);
         });

        return deferred.promise;
     }


     //currentUser
     this.currentUser = function() {
       if ($window.sessionStorage["userInfo"]) {
           return JSON.parse($window.sessionStorage["userInfo"]);
       } else {
          return null;
       }
     }


      //run on page reload to reinitialize the user info
      function initf() {
          if ($window.sessionStorage["userInfo"]) {
              $rootScope.userInfo = JSON.parse($window.sessionStorage["userInfo"]);
          }
      }
      initf();
   }


})();
