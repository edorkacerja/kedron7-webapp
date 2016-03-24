/**
 * Created by test most on 3/24/2016.
 */
/**
 * Created by test most on 1/26/2016.
 */
(function() {
  'use strict';

  angular
    .module('kedron')
    .factory('UserDeposit',deposit);


  function deposit($resource , api ) {
    return $resource(api +"/households/:household_id/deposits", { household_id: '@householdId'}, {
      get: {
        method: 'GET'
      },
      query: {
        method: 'GET'
      },
      delete: {
        url: api + "/deposits/:depositId",
        method: 'DELETE'
      },
      save: {
        url:api +"/households/:householdId/adddeposit",
        method: 'POST'
      },
      update: {
        method: 'PUT'
      }
    });
  }


})();
