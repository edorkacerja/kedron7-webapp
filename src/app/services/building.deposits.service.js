/**
 * Created by test most on 2/24/2016.
 */

(function() {
  'use strict';

  angular
    .module('kedron')
    .factory('BuildingDeposit',deposit);


  function deposit($resource , auth, api ) {
    return $resource(api +"/buildings/:building_id/deposits", { id: '@id'}, {
      get: {
        method: 'GET',
        headers: { 'Authorization': 'Bearer '+  auth.currentUser().accessToken }
      },
      query: {
        method: 'GET',
        headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken }
      }
    });
  }


})();
