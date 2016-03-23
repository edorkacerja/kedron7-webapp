(function() {
 'use strict';
 angular
   .module('kedron')
   .service('auth', auth);

   function auth( $http, $window ,  $q , api , $rootScope ) {


     //LOG IN
     this.login = function(user) {
        var deferred = $q.defer();
        $http.post("http://centroida5.azurewebsites.net/token", "grant_type=password&username=" + user.email +
                             "&password=" + user.password,

                             {
                               headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
                                  }
                              }
        ).then(
           function(response) {

             if(response.status == 200) {

               var userInfo = {//generate an access token on the server for the user
                 accessToken: response.data.access_token,
                 userName: response.data.userName,
                 userRoles: response.data.userRoles.split(',')
               };
               $rootScope.$emit('user:loggedin', userInfo); //broadcast to all controllers that  the user has logged in
               $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);//store the data on the client
               deferred.resolve();
             } else {
               deferred.reject(response);
             }
           },
           function(error) {
              deferred.reject(error);
           });

           return deferred.promise;
     };

     //LOG OUT
     this.logout = function() {
       var deferred = $q.defer();
       $http({
               url: api + '/account/logout' ,
               method: 'POST',
               headers:  {'Authorization': 'Bearer '+  JSON.parse($window.sessionStorage["userInfo"]).accessToken }

           }).then( function(){
           $window.sessionStorage["userInfo"]  = null;
           $rootScope.$emit('user:loggedout'); //broadcast to all controllers that  the user has logged out
         deferred.resolve();
       }, function(error) {
         deferred.reject();
       });
       return deferred.promise;
     };
     //REGISTER
     this.register = function(user) {
       var deferred = $q.defer();
       $http.post( api +"/account/register", {"First_Name": user.first_name, "Last_Name": user.last_name, "Email": user.email , "Password": user.password , "ConfirmPassword": user.confirmPassword })
       .then(
         function() {
            deferred.resolve();
         },
         function(error){
            deferred.reject(error.data.ModelState[0]);
         });

        return deferred.promise;
     };


     //currentUser
     this.currentUser = function() {
       if ($window.sessionStorage["userInfo"] != null) {
           return JSON.parse($window.sessionStorage["userInfo"]);
       } else {
          return null;
       }
     };


      //run on page reload to reinitialize the user info
       function initf() {
           if ($window.sessionStorage["userInfo"] != null) {
               $rootScope.userInfo = JSON.parse($window.sessionStorage["userInfo"]);
           }
       }
       initf();
   }


})();

