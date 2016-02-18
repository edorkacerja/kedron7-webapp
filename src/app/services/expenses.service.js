(function() {
  'use strict';

  angular
    .module('kedron')
    .factory('Expense',expense);


  function expense($resource , auth, api ) {
    return $resource(api +"/buildings/:building_id/expenses", { building_id: '@buildingid'}, {
      get: {
        method: 'GET',
        headers: { 'Authorization': 'Bearer '+  auth.currentUser().accessToken }
      },
      query: {
        method: 'GET',
        headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken }
      },
      delete: {
        method: 'DELETE',
        headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken }
      },
      save: {
        url: api + "/buildings/:building_id/addexpense",
        method: 'POST',
        headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken }
      },
      update: {
        method: 'PUT',
        headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken }
      },
      payers: {
        url: api + "/buildings/:building_id/expensepayers",
        method: 'GET',
        transformRequest: [],
        headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken },
        isArray: true
      }
    });
  }


})();
