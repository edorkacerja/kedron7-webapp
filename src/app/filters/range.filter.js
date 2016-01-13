(function() {
  'use strict';
  angular
    .module('kedron')
    .filter('range', range);
  //returns a range of numbers to an input field.
  // Used to extract the floor count from the building model and put it into an input
  function range() {
    return function(input, min, max) {
      min = parseInt(min); //Make string input int
      max = parseInt(max);
      for (var i=min; i<max; i++)
        input.push(i);
      return input;
    };

  }

})();
