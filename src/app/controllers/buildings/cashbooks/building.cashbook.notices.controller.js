/**
 * Created by test most on 3/7/2016.
 */
(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingCashbookNoticesController', BuildingCashbookNoticesController );

  function BuildingCashbookNoticesController(Households) {
    var vm = this;
    vm.households = [];
    vm.date = Date.now();
    Households.$promise.then( function(response) {
      angular.forEach(response.Items, function(value, key) {
        if(value.Balance < 0 ) {
          vm.households.push(response.Items[key]);
        }
      });

    });



  }

  })();
