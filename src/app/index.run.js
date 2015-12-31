(function() {
  'use strict';

  angular
    .module('kedron')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log , auth, $state , $rootScope) {


    $log.debug('runBlock end');
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
      //can be used with the 'data' variable on each route definition for conditional routes
      //not needed atm as all routes require a login
      //var requireLogin = toState.data.requireLogin;

      if (!auth.currentUser()) {
        event.preventDefault();
        $state.go('login');
      }
    });

    var bgTranslation = angular.extend({},
      {
        "Search": "Търси",
        "Page":"Страница",
        "First Page": "Първа страница",
        "Next Page": "Следваща страница",
        "Previous Page": "Предишна страница",
        "Last Page": "Последна страница",
        "Sort": "Сортиране",
        "No items to display": "Тази таблица е празна.",
        "displayed": "видими",
        "in total": "общо"
      });
    TrNgGrid.translations["bg"] = bgTranslation;
  }

})();
