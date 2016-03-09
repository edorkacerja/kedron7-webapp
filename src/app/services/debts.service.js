/**
 * Created by test most on 1/26/2016.
 */
(function() {
  'use strict';

  angular
    .module('kedron')
    .factory('Debt',debt);


  function debt($resource ,  api ) {
    return $resource(api +"/households/:household_id/debts", { household_id: '@householdId' }, {
      get: {
        method: 'GET'
      },
      query: {
        method: 'GET'
      },
      delete: {
        url: api + "/debts/:debt_id",
        method: 'DELETE'
      },
      save: {
        method: 'POST'
      },
      update: {
        url: api + "/debts/:debt_id/pay",
        method: 'PUT'
      }
    });
  }


})();
