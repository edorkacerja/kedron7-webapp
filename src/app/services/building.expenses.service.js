(function() {
  'use strict';

  angular
    .module('kedron')
    .factory('Expense',expense);


  function expense($resource , api ) {
    return $resource(api +"/buildings/:building_id/expenses", { building_id: '@buildingId'}, {
      get: {
        method: 'GET'
      },
      query: {
        method: 'GET'
      },
      delete: {
        url: api + '/expenses/:id',
        method: 'DELETE'
      },
      save: {
        url: api + "/buildings/:building_id/addexpense",
        method: 'POST'
      },
      update: {
        method: 'PUT'
      },
      payers: {
        url: api + "/buildings/:building_id/expensepayers",
        method: 'GET',
        transformRequest: [],
        isArray: true
      }
    });
  }


})();
