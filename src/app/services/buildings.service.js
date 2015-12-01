(function() {
  'use strict';

  angular
    .module('kedron')
    .factory('Building', building);


   function building($resource , auth, api) {
     return $resource(api +"/buildings/:id", { id: '@_id'}, {
        get: {
            method: 'GET',
            headers: { 'Authorization': 'Bearer '+  auth.currentUser().accessToken },
            isArray: true
        },
        query: {
          method: 'GET',
          headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken },
          isArray:true
        },
        delete: {
          method: 'DELETE',
          headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken }
        }
     });
   }


  })();
