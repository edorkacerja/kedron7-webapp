(function() {
  'use strict';

  angular
    .module('kedron')
    .factory('Building', building);


   function building($resource , auth, api ) {
     return $resource(api +"/buildings/:id", { id: '@id'}, {
        get: {
          method: 'GET'
        },
        query: {
          method: 'GET'
        },
        delete: {
          method: 'DELETE'
        },
        save: {
         method: 'POST'
       },
        update: {
          method: 'PUT'
        },
       getBalance: {
         method: 'GET',
         url: api +"/buildings/:id/balance"
       }
     });
   }


  })();
