(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingsController', BuildingsController);

  /** @ngInject */
  function BuildingsController(Building) {
      var vm = this;
       Building.query( function(res) {
        vm.buildings =  chunk(res , 5);
      });




     //Divide the data into arays of 5
      function chunk(arr, size) {  //chunk the data into rows
          var newArr = [];

          for (var i=0; i<arr.length; i+=size) {
            newArr.push(arr.slice(i, i+size));
          }
          return newArr;
      }

  }
})();
