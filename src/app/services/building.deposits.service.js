/**
 * Created by test most on 2/24/2016.
 */

(function() {
  'use strict';

  angular
    .module('kedron')
    .factory('BuildingDeposit',deposit);


  function deposit($resource , auth, api ) {
    return $resource(api +"/buildings/:building_id/deposits", { building_id: '@building_id' , id: '@id' }, {
      get: {
        method: 'GET'
      },
      query: {
        method: 'GET'
      },
      delete: {
        url: api + '/Deposits/:id',
        method: 'DELETE'
      }
    });
  }


})();
