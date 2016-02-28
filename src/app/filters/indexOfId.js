(function() {
    'use strict';
    angular
      .module('kedron')
      .filter('indexOfId', indexOfId);

    function indexOfId(arr,obj) {
      console.log(obj);
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].Id == obj.Id) {
          return 1;
        }
      }
      return -1;
    }
  }

)();
