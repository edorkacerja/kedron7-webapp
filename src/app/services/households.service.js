(function() {
  'use strict';

  angular
    .module('kedron')
    .factory('Household', household);


   function household($resource , auth, api ) {
     return $resource(api +"/households/:id", { id: '@_id'}, {
        get: {
          method: 'GET',
          headers: { 'Authorization': 'Bearer '+  auth.currentUser().accessToken }
        },
        query: {
          method: 'GET',
          headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken },
          isArray:true
        },
        delete: {
          method: 'DELETE',
          headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken }
        },
        save: {
         method: 'POST',
         headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken }
       },
        update: {
          method: 'PUT'
        }
     });
   }


  })();
