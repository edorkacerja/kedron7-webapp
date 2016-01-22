(function() {
  'use strict';

  angular
    .module('kedron')
    .factory('Household', household);


   function household($resource , auth, api ) {
     return $resource(api +"/buildings/:building_id/households/:id", { bulding_id: '@buildingid' , id: '@id'}, {
        get: {
          method: 'GET',
          headers: { 'Authorization': 'Bearer '+  auth.currentUser().accessToken }
        },
        query: {
          method: 'GET',
          headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken },
          //isArray:true
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
