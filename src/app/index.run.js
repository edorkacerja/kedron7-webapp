(function() {
  'use strict';

  angular
    .module('kedron')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log , auth, $state , $rootScope , PermissionStore ) {
    //
    PermissionStore.definePermission('anonymous', function () {
        return !auth.currentUser();
    });
    PermissionStore.definePermission('admin', function () {
        return auth.currentUser().userRoles.indexOf('Admin') != -1;
    });
    PermissionStore.definePermission('cashier', function () {
      return auth.currentUser().userRoles.indexOf('Cashier') != -1;
    });





    $log.debug('runBlock end');

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
