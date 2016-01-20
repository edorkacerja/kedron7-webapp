(function() {
  'use strict';

  angular
    .module('kedron')
    .factory('Expense',expense);


  function expense($resource , auth, api ) {
    return $resource(api +"/buildings/:id/expenses", { id: '@id'}, {
      get: {
        method: 'GET',
        headers: { 'Authorization': 'Bearer '+  auth.currentUser().accessToken }
      },
      query: {
        method: 'GET',
        headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken },
        isArray:true
      },
      delete: {
        method: 'DELETE',
        headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken }
      },
      save: {
        method: 'POST',
        headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken }
      },
      update: {
        method: 'PUT',
        headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken }
      }
    });
  }


})();
