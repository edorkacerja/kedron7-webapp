/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('kedron')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('api', "http://kedronka.azurewebsites.net/api");


})();
