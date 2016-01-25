/**
 * Created by test most on 1/20/2016.
 */
(function() {
  'use strict';

  angular
    .module('kedron')
    .factory('ExpenseType',expenseType);

  function expenseType($resource , auth, api ) {
      return $resource( api+"/expenseTypes/:id", { bulding_id: '@buildingid' , id: '@id'}, {
        get: {
          method: 'GET',
          headers: { 'Authorization': 'Bearer '+  auth.currentUser().accessToken }
        },
        query: {
          url:api +"/buildings/:building_id/households/:id",
          method: 'GET',
          headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken }
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
          method: 'PUT'
        }
      });
  }

})();
