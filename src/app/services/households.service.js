(function() {
  'use strict';

  angular
    .module('kedron')
    .factory('Household', household);


   function household($resource , auth, api ) {
     return $resource( api+"/households/:id", { building_id: '@buildingid' , id: '@id'}, {
        get: {
          method: 'GET',
          headers: { 'Authorization': 'Bearer '+  auth.currentUser().accessToken }
        },
        query: {
          url:api +"/buildings/:building_id/households/:id",
          method: 'GET',
          headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken }
        },
        delete: {
          method: 'DELETE',
          headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken }
        },
        save: {
         method: 'POST',
         url:api +"/buildings/:building_id/addhousehold",
         headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken }
       },
        update: {
          method: 'PUT'
        }
     });
   }


  })();
