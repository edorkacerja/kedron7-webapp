/**
 * Created by test most on 1/26/2016.
 */
(function() {
  'use strict';

  angular
    .module('kedron')
    .factory('Deposit',deposit);


  function deposit($resource , auth, api ) {
    return $resource(api +"/households/:id/deposits", { id: '@id'}, {
      get: {
        method: 'GET',
        headers: { 'Authorization': 'Bearer '+  auth.currentUser().accessToken }
      },
      query: {
        method: 'GET',
        headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken },
        isArray: true //todo remove when API is ready
      },
      delete: {
        method: 'DELETE',
        headers: { 'Authorization': "Bearer " + auth.currentUser().accessToken }
      },
      save: {
        url:api +"/households/:id/adddeposit",
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
