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
        method: 'GET',
        headers: { 'Authorization': 'Bearer '+  auth.currentUser().accessToken }
      },
      query: {
        method: 'GET',
        headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken }
      },
      delete: {
        url: api + "/debts/:debtId",
        method: 'DELETE',
        headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken }
      },
      save: {
        method: 'POST',
        headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken }
      },
      update: {
        url: api +"/debts/:debtId/pay",
        method: 'PUT',
        headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken }
      }
    });
  }


})();
