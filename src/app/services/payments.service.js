/**
 * Created by test most on 1/26/2016.
 */
(function() {
  'use strict';

  angular
    .module('kedron')
    .factory('Payment',payment);


  function payment($resource , auth, api ) {
    return $resource(api +"/households/:id/payments", { id: '@id'}, {
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
