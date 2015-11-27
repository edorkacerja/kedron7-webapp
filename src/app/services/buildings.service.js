(function() {
  'use strict';

  angular
    .module('kedron')
    .factory('Building', building);


   function building($resource , auth ) {
     return $resource("http://kedron.azurewebsites.net/api/buildings/:id", { id: '@_id'}, {
        get: {
            method: 'GET',
            headers: { 'Authorization': 'anything'+ + auth.currentUser().accessToken }

        },
        query: {
          method: 'GET',
          headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken },
          isArray:true
        }
     });
   }


  })();
