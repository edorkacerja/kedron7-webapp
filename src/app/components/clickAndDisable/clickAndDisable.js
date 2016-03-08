/**
 * Created by test most on 3/8/2016.
 */
(function() {
  'use strict';
  angular
    .module('kedron')
    .directive('clickAndDisable', function () {
      return {
        scope: {
          clickAndDisable: '&'
        },
        link: function (scope, iElement, iAttrs) {
          iElement.bind('click', function () {
            iElement.prop('disabled', true);
            scope.clickAndDisable().finally(function () {
              iElement.prop('disabled', false);
            })
          });
        }
      };
    });
})();
