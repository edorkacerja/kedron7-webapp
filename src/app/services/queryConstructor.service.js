/**
 * Created by test most on 1/23/2016.
 */
(function() {
  'use strict';

  angular
    .module('kedron')
    .service('QueryConstructor', queryConstructor);


  function queryConstructor() {
      this.order = function(orderBy, orderByReverse) {
        if(orderByReverse && typeof orderBy !== 'undefined') {
          return orderBy + ' ' + 'desc';
        } else if(typeof orderBy !== 'undefined') {
          return orderBy + ' ' + 'asc';
        }
      };

     this.skip = function(currentPage, top) {
       if(currentPage == 0 ){
         return 0;
       } else {
         return currentPage*top;
       }
     };

    this.filter = function(filterByFields) {
      var string = '';
      for (var key in filterByFields) {
        if (filterByFields.hasOwnProperty(key)) {
          var val = filterByFields[key];
          string +=  key + ":" + val + ',';
        }
      }
      return string;
    };

  }




})();

