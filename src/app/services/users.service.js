(function() {
  'use strict';

  angular
    .module('kedron')
    .factory('Users', users);


  function users($resource , api ) {
    return $resource(api +"/Account/users", null, {
      get: {
        method: 'GET'
      },
      query: {
        method: 'GET', isArray:true
      },
      delete: {
        method: 'DELETE'
      },
      save: {
        method: 'POST'
      },
      update: {
        method: 'PUT'
      }
    });
  }


})();
