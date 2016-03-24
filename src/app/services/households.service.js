(function() {
  'use strict';

  angular
    .module('kedron')
    .factory('Household', household);


   function household($resource , api ) {
     return $resource( api+"/households/:id", { building_id: '@buildingid' , id: '@id'}, {
        get: {
          method: 'GET'
        },
        query: {
          url:api +"/buildings/:building_id/households/:id",
          method: 'GET'
        },
        delete: {
          method: 'DELETE'
        },
        save: {
         method: 'POST',
         url:api +"/buildings/:building_id/addhousehold",
       },
        update: {
          method: 'PUT'
        },
         getBalance: {
           method: 'GET',
           url: api +"/households/:id/balance"
         }
     });
   }


  })();
