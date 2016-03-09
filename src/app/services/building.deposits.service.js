/**
 * Created by test most on 2/24/2016.
 */

(function() {
  'use strict';

  angular
    .module('kedron')
    .factory('BuildingDeposit',deposit);


  function deposit($resource , api ) {
    return $resource(api +"/buildings/:building_id/deposits", { building_id: '@buildingId' }, {
      get: {
        method: 'GET'
      },
      query: {
        method: 'GET'
      },
      delete: {
        url: api + '/deposits/:id',
        method: 'DELETE'
      }
    });
  }


})();
