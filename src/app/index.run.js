(function() {
  'use strict';

  angular
    .module('kedron')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
