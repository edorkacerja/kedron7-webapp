(function() {
  'use strict';
  angular
    .module('kedron')
    .filter('attribute', attribute);
   //returns a translated attribute from an ng-model.
  //used until translations are needed (if they will be needed)
  function attribute() {
    return function(input) {
      switch (input) {
        case 'Floor':
          return 'Етаж';
          break;
        case 'Number':
          return 'Апартамент';
          break;
        default:
          return 'Атрибут'
      }
    };

  }

})();
