/**
 * Created by test most on 1/26/2016.
 */
(function() {
  'use strict';

  angular
    .module('kedron')
    .factory('Debt',debt);


  function debt($resource , auth, api ) {
    return $resource(api +"/households/:id/debts", { id: '@id'}, {
      get: {
        method: 'GET'
      },
      query: {
        method: 'GET'
      },
      delete: {
        url: api + "/debts/:debtId",
        method: 'DELETE'
      },
      save: {
        method: 'POST'
      }
    });
  }


})();
