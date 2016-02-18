(function() {
  'use strict';

  angular
    .module('kedron')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider , toastrConfig , cfpLoadingBarProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    //toastr
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 2000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
    $httpProvider.defaults.useXDomain = true;
    //loading bar
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;



    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }

})();
